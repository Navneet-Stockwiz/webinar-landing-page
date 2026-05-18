// src/contexts/WebinarContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getWizopsApiRoot } from "../api/api";

const WebinarContext = createContext();
const ACTIVE_SESSION_API_BASE = getWizopsApiRoot();

const getSiteNameFromQuery = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const fullPathUrl = `${origin}${pathname}`;
  return fullPathUrl.replace(/\/$/, "");
};

const mapActiveSessionToWebinarData = (activeSessionResponse) => {
  const root = activeSessionResponse?.data?.data;
  const webinarSession = root?.webinar_session;
  const zoomWebinarId = webinarSession?.zoom_webinar_id;
  const scheduledAt = webinarSession?.scheduled_at;

  return {
    data: {
      zoom_webinar_id: zoomWebinarId || null,
      webinar_id: webinarSession?.webinar_id || null,
      webinar_name: webinarSession?.name || null,
      webinar_type: root?.access_tier || null,
      product: root?.product || null,
      strykex_free_english_date_time: scheduledAt || null,
      strykex_free_hindi_date_time: scheduledAt || null,
      strykex_english_date_time: scheduledAt || null,
      strykex_hindi_date_time: scheduledAt || null,
      agadh_thankyou: null,
    },
  };
};

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

      const siteName = getSiteNameFromQuery();
      const activeSessionResponse = await axios.get(
        `${ACTIVE_SESSION_API_BASE}/api/v1/site-product-mappings/webinar-session-active`,
        {
          params: { site_name: siteName },
        },
      );

      if (activeSessionResponse?.status === 200) {
        const webinarResponse = mapActiveSessionToWebinarData(activeSessionResponse);
        setWebinarData(webinarResponse);
      } else {
        console.error("Unexpected response format:", activeSessionResponse);
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching webinar data:", err);
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
