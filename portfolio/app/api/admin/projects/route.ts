import { NextRequest, NextResponse } from 'next/server';
import { upsertProject, upsertProjectDetails } from '@/lib/sheets';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { project, details } = await request.json();

    await Promise.all([
      upsertProject(project),
      upsertProjectDetails(details),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json(
      { error: 'Failed to save project' },
      { status: 500 }
    );
  }
}
