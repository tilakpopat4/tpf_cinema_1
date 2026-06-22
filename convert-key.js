require('dotenv').config({ path: '.env.local' });

let pk = process.env.GOOGLE_PRIVATE_KEY;
if (pk.startsWith('"') && pk.endsWith('"')) pk = pk.slice(1, -1);
pk = pk.replace(/\\n/g, '\n');

const b64 = Buffer.from(pk).toString('base64');
console.log(b64);
