import { NextRequest, NextResponse } from 'next/server';
import { saveMessage } from '@/lib/sheets';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, type } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tagged = type === 'resume_request' ? `[RESUME REQUEST] ${message}` : message;
    await saveMessage(name, email, tagged);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
}
