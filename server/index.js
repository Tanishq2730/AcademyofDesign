require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jose = require('jose');

const connectToDatabase = require('./lib/db');
const User = require('./models/User');
const WorkshopRegistration = require('./models/WorkshopRegistration');

const app = express();
app.use(express.json());

// ── CORS ── allow the static frontend origin(s) from CLIENT_URL (comma-sep).
const CLIENT_URL = process.env.CLIENT_URL || '*';
app.use(
  cors({
    origin: CLIENT_URL === '*' ? true : CLIENT_URL.split(',').map((s) => s.trim()),
    credentials: true,
  })
);

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';
const secret = new TextEncoder().encode(JWT_SECRET);

// True when no real DB is configured — mirrors the original API's mock fallback.
function isMockConfigured() {
  return (
    !process.env.MONGODB_URI ||
    process.env.MONGODB_URI.includes('cluster.mongodb.net/db')
  );
}

async function resolveMode() {
  let useMock = false;
  try {
    if (isMockConfigured()) useMock = true;
    else await connectToDatabase();
  } catch (e) {
    console.warn('⚠️ MongoDB connection failed. Falling back to Mock Mode:', e.message);
    useMock = true;
  }
  return useMock;
}

async function signToken(user) {
  return new jose.SignJWT({
    id: user._id || 'mock_user_id',
    role: user.role || 'user',
    name: user.name || 'Demo User',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
}

// ─────────────────────────── Health ───────────────────────────
app.get('/', (_req, res) => res.json({ status: 'ok', service: 'nuvosid-api' }));

// ─────────────────────────── Signup ───────────────────────────
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const useMock = await resolveMode();

    if (useMock) {
      global.mockUsers = global.mockUsers || [];
      if (global.mockUsers.find((u) => u.email === email)) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      global.mockUsers.push({ name, email, password: hashedPassword, role: 'user' });
      return res
        .status(201)
        .json({ message: 'User created successfully (Mock Mode)', success: true });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await new User({ name, email, password: hashedPassword }).save();
    return res.status(201).json({ message: 'User created successfully', success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'An error occurred during signup' });
  }
});

// ─────────────────────────── Login ────────────────────────────
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const useMock = await resolveMode();

    let user;
    if (useMock) {
      global.mockUsers = global.mockUsers || [];
      const defaultEmail = 'demo@nuvosid.design';
      if (!global.mockUsers.some((u) => u.email === defaultEmail)) {
        const salt = await bcrypt.genSalt(10);
        global.mockUsers.push({
          name: 'Demo User',
          email: defaultEmail,
          password: await bcrypt.hash('password123', salt),
          role: 'user',
          _id: 'mock_demo_user_id',
        });
      }
      user = global.mockUsers.find((u) => u.email === email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password (Mock Mode)' });
      }
    } else {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = await signToken(user);
    return res.status(200).json({
      message: 'Login successful',
      success: true,
      token,
      user: { name: user.name || 'Demo User', role: user.role || 'user' },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'An error occurred during login' });
  }
});

// ─────────────────────────── Logout ───────────────────────────
// With bearer tokens the logout is client-side (token is dropped there);
// this endpoint stays for parity and future server-side revocation.
app.get('/api/logout', (_req, res) => {
  return res.status(200).json({ message: 'Logout successful', success: true });
});

// ───────────────────────── Auth check ─────────────────────────
app.get('/api/auth/check', async (req, res) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ authenticated: false });

    const { payload } = await jose.jwtVerify(token, secret);
    return res.status(200).json({
      authenticated: true,
      user: { id: payload.id, role: payload.role, name: payload.name },
    });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
});

// ────────────────────── Workshop registration ──────────────────────
app.post('/api/workshops/register', async (req, res) => {
  try {
    const {
      name, email, phone, interest, country, designation, workshopId, workshopTitle,
    } = req.body || {};

    if (!name || !email || !phone || !interest || !country || !designation || !workshopId || !workshopTitle) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const useMock = await resolveMode();

    if (useMock) {
      global.mockRegistrations = global.mockRegistrations || [];
      const newRegistration = {
        _id: 'mock_' + Math.random().toString(36).substr(2, 9),
        name, email, phone, interest, country, designation, workshopId, workshopTitle,
        createdAt: new Date(),
      };
      global.mockRegistrations.push(newRegistration);
      console.log('✅ Mock registration saved:', newRegistration);
      return res.json({
        success: true,
        message: 'Mock registration processed successfully',
        data: newRegistration,
      });
    }

    const registration = await WorkshopRegistration.create({
      name, email, phone, interest, country, designation, workshopId, workshopTitle,
    });
    return res.json({
      success: true,
      message: 'Registration registered successfully',
      data: registration,
    });
  } catch (error) {
    console.error('Error in workshop registration:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Server error occurred during registration' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Nuvosid API running on http://localhost:${PORT}`);
});
