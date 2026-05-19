import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import WorkshopRegistration from '@/models/WorkshopRegistration';

export async function POST(request) {
  try {
    const { name, email, phone, interest, country, designation, workshopId, workshopTitle } = await request.json();

    if (!name || !email || !phone || !interest || !country || !designation || !workshopId || !workshopTitle) {
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
      global.mockRegistrations = global.mockRegistrations || [];
      const newRegistration = {
        _id: 'mock_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone,
        interest,
        country,
        designation,
        workshopId,
        workshopTitle,
        createdAt: new Date()
      };
      
      global.mockRegistrations.push(newRegistration);
      console.log('✅ Mock registration saved:', newRegistration);

      return NextResponse.json({
        success: true,
        message: 'Mock registration processed successfully',
        data: newRegistration
      });
    }

    // Production MongoDB Save
    const registration = await WorkshopRegistration.create({
      name,
      email,
      phone,
      interest,
      country,
      designation,
      workshopId,
      workshopTitle
    });

    return NextResponse.json({
      success: true,
      message: 'Registration registered successfully',
      data: registration
    });
  } catch (error) {
    console.error('Error in workshop registration:', error);
    return NextResponse.json(
      { error: error.message || 'Server error occurred during registration' },
      { status: 500 }
    );
  }
}
