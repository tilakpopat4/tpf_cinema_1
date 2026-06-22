import { getDriveAccessToken } from './src/lib/gdrive.ts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function test() {
  try {
    const token = await getDriveAccessToken();
    console.log("SUCCESS! Token received:", token.substring(0, 10) + "...");
  } catch (e) {
    console.error("FAILED:", e);
  }
}

test();
