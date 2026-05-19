import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import * as jose from 'jose';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    let useMock = false;
    try {
      if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('cluster.mongodb.net/db')) {
        useMock = true;
      } else {
        await connectToDatabase();
      }
    } catch (e) {
      console.warn('⚠️ MongoDB connection failed. Falling back to local Mock Mode:', e.message);
      useMock = true;
    }

    let user;
    if (useMock) {
      global.mockUsers = global.mockUsers || [];
      
      // Auto-create a default demo account if no users registered in mock mode yet
      const defaultEmail = 'demo@nuvosid.design';
      const hasDemo = global.mockUsers.some(u => u.email === defaultEmail);
      if (!hasDemo) {
        const salt = await bcrypt.genSalt(10);
        const demoHashedPassword = await bcrypt.hash('password123', salt);
        global.mockUsers.push({
          name: 'Demo User',
          email: defaultEmail,
          password: demoHashedPassword,
          role: 'user',
          _id: 'mock_demo_user_id'
        });
      }

      user = global.mockUsers.find(u => u.email === email);
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password (Mock Mode)' },
          { status: 401 }
        );
      }
    } else {
      // Find user in DB
      user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT using jose
    const secretKey = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';
    const secret = new TextEncoder().encode(secretKey);

    const token = await new jose.SignJWT({ 
      id: user._id || 'mock_user_id', 
      role: user.role || 'user',
      name: user.name || 'Demo User'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(secret);

    const response = NextResponse.json(
      { message: 'Login successful', success: true },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
