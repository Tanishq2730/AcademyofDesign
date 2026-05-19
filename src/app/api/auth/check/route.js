import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';
    const secret = new TextEncoder().encode(secretKey);

    const { payload } = await jose.jwtVerify(token, secret);

    return NextResponse.json(
      { authenticated: true, user: { id: payload.id, role: payload.role, name: payload.name } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
