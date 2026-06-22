const { GoogleAuth } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    console.log("Original Length:", privateKey.length);

    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    console.log("Processed Length:", privateKey.length);
    console.log("Starts with:", privateKey.substring(0, 30));
    console.log("Ends with:", privateKey.substring(privateKey.length - 30));

    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();
    console.log("SUCCESS! Token received:", token.token.substring(0, 10) + "...");
  } catch (e) {
    console.error("FAILED:", e);
  }
}

test();
