// pages/api/zoho.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, accessToken } = req.body;

    try {
      const apiUrl = `https://www.zohoapis.com/crm/v2/Contacts/${userId}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error making API request:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;