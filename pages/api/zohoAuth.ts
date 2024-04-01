// zohoAuth.ts
import axios from 'axios';

const ZOHO_TOKEN_URL = 'https://accounts.zoho.com/oauth/v2/token';

const CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;

export const refreshAccessToken = async () => {
  const response = await axios.post(ZOHO_TOKEN_URL, {
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
  });

  return response.data;
};