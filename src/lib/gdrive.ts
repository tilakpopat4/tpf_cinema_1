import { GoogleAuth } from 'google-auth-library';

export async function getDriveAccessToken() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY_BASE64) {
    throw new Error('Google Cloud Service Account credentials are not configured in environment variables.');
  }

  const privateKey = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, 'base64').toString('utf-8');

  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}
