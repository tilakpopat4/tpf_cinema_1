import { NextResponse } from 'next/server';
import { getDriveAccessToken } from '@/lib/gdrive';

export async function POST(req: Request) {
  try {
    const { filename, mimeType, title, contentType } = await req.json();
    
    // Choose parent folder based on content type
    const parentFolderId = contentType === 'series' 
      ? process.env.GOOGLE_DRIVE_SERIES_FOLDER_ID 
      : process.env.GOOGLE_DRIVE_FILMS_FOLDER_ID;

    if (!parentFolderId) {
      return NextResponse.json({ error: `Missing environment variable for ${contentType} folder ID` }, { status: 500 });
    }

    const token = await getDriveAccessToken();

    // 1. Create the Subfolder
    const folderMetadata = {
      name: title || 'Untitled Content',
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };

    const folderRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(folderMetadata),
    });

    if (!folderRes.ok) {
      throw new Error(`Failed to create subfolder: ${await folderRes.text()}`);
    }

    const folderData = await folderRes.json();
    const subfolderId = folderData.id;

    // 2. Initiate Resumable Upload inside the new subfolder
    const metadata = {
      name: filename,
      parents: [subfolderId],
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
