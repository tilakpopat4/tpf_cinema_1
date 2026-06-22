import { NextResponse } from 'next/server';
import { getDriveAccessToken } from '@/lib/gdrive';

export async function POST(req: Request) {
  try {
    const { fileId } = await req.json();

    const token = await getDriveAccessToken();

    // Set permission to anyone with link (reader)
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'anyone',
        role: 'reader',
      }),
    });

    if (!res.ok) {
      throw new Error(`Google Drive API error: ${await res.text()}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Drive Finalize Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
