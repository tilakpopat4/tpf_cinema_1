import { NextResponse } from 'next/server';
import { getDriveAccessToken } from '@/lib/gdrive';

export async function POST(req: Request) {
  try {
    const { filename, mimeType } = await req.json();
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!folderId) {
      return NextResponse.json({ error: 'Missing GOOGLE_DRIVE_FOLDER_ID' }, { status: 500 });
    }

    const token = await getDriveAccessToken();

    const metadata = {
      name: filename,
      parents: [folderId],
    };

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': mimeType,
      },
      body: JSON.stringify(metadata),
    });

    if (!res.ok) {
      throw new Error(`Google Drive API error: ${await res.text()}`);
    }

    // The resumable upload URL is in the Location header
    const uploadUrl = res.headers.get('location');

    return NextResponse.json({ uploadUrl });
  } catch (error: any) {
    console.error("Drive Init Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
