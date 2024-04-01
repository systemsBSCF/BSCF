// zohoAuth.ts
import axios from 'axios';

const ZOHO_OAUTH_URL = 'https://accounts.zoho.com/oauth/v2/auth';
const ZOHO_TOKEN_URL = 'https://accounts.zoho.com/oauth/v2/token';

const CLIENT_ID = '1000.HYJ53AS3JK7BKH1KDTIZT30ZO7K2FM';
const CLIENT_SECRET = 'c074cef884ce31fc3e7466a85c01f349ccad6068b7';
const REDIRECT_URI = 'https://bscf.vercel.app/';

export const getAuthorizationUrl = () => {
  const params = new URLSearchParams({
    scope: 'ZohoCRM.users.ALL',
    client_id: CLIENT_ID,
    response_type: 'code',
    access_type: 'offline',
    redirect_uri: REDIRECT_URI,
  });

  return `${ZOHO_OAUTH_URL}?${params.toString()}`;
};

export const getAccessToken = async (code: string) => {
  const response = await axios.post(ZOHO_TOKEN_URL, {
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code,
  });

  return response.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post(ZOHO_TOKEN_URL, {
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: refreshToken,
  });

  return response.data;
};