// components/chat/Load.tsx
import { useState } from "react";
import axios from "axios";
import { refreshAccessToken } from "@/pages/api/zohoAuth";

export const Load = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);

    try {
      const data = await refreshAccessToken();
      const accessToken = data.access_token;

      const response = await axios.post("/api/zoho", {
        userId,
        accessToken,
      });

      console.log("Record:", response.data);
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
