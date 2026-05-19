import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: 'Logout successful', success: true },
      { status: 200 }
    );

    // Remove the cookie
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
