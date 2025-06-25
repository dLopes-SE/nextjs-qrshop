import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  return axios
    .post('https://localhost:7256/user/register', { email, password, name })
    .then((response) => {
      return NextResponse.json({ success: true, user: response.data }, { status: 201 });
    })
    .catch((error) => {
      console.error('Registration error:', error.message);
      if (error.response && error.response.status === 400) {
        return NextResponse.json(
          { success: false, message: 'User already exists or invalid data.' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, message: 'Registration failed.' },
        { status: 500 }
      );
    });
}
