// src/contexts/WebinarContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WebinarContext = createContext();

export const useWebinar = () => {
  const context = useContext(WebinarContext);
  if (!context) {
    throw new Error("useWebinar must be used within a WebinarProvider");
  }
  return context;
};

export const WebinarProvider = ({ children }) => {
  const [webinarData, setWebinarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWebinarData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "https://api.stockwiz.in/api/v2/auth/getWebinarData"
      );

      if (response?.status === 200) {
        setWebinarData(response?.data);
      } else {
        console.error("Unexpected response format:", response);
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching webinar data:", error);
      setError("Failed to fetch webinar data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinarData();
  }, []);

  const value = {
    webinarData,
    loading,
    error,
    refetch: fetchWebinarData,
  };

  return (
    <WebinarContext.Provider value={value}>{children}</WebinarContext.Provider>
  );
};

export default WebinarContext;
