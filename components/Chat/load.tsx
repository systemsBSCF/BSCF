// components/chat/Load.tsx
import { useState } from "react";
import { refreshAccessToken, makeApiRequest } from "@/pages/api/zohoAuth";

export const Load = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);

    try {
      // Generate a new access token using the refresh token
      const data = await refreshAccessToken();
      const accessToken = data.access_token;

      // Perform the GET request to fetch the record based on the user ID
      const apiUrl = `https://www.zohoapis.com/crm/v2/Leads/${userId}`;
      const response = await makeApiRequest(apiUrl, accessToken);

      // Print the response to the console
      console.log("Record:", response);
    } catch (error) {
      console.error("Error fetching record:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
      <button onClick={handleLoad} disabled={loading}>
        {loading ? "Loading..." : "Load"}
      </button>
    </div>
  );
};
