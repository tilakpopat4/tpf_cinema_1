import { GoogleAuth } from 'google-auth-library';

export async function getDriveAccessToken() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Cloud Service Account credentials are not configured in environment variables.');
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}
