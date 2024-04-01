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
    // PRINT THE RESPONSE TO THE CONSOLE
    console.log('Access token:', response.data.access_token);

  return response.data;
};

export const makeApiRequest = async (url: string, accessToken: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    });
          // PRINT THE RESPONSE TO THE CONSOLE
    console.log('Record:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};