/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

let path = '.env';

const { parsed } = dotenv.config({ path });
for (const key in parsed) process.env[key] = parsed[key];
