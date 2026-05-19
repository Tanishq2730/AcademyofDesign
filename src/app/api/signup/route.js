import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
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

    if (useMock) {
      global.mockUsers = global.mockUsers || [];
      const existingUser = global.mockUsers.find(u => u.email === email);
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      global.mockUsers.push({
        name,
        email,
        password: hashedPassword,
        role: 'user'
      });

      return NextResponse.json(
        { message: 'User created successfully (Mock Mode)', success: true },
        { status: 201 }
      );
    }

    // Connect to database if not already connected
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
