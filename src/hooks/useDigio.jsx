import { useState, useEffect, useCallback } from "react";

const useDigio = (options = {}) => {
  const [digioInstance, setDigioInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = {
    environment: "production",

    is_iframe: true,
    iframe_height: "600px",
    iframe_width: "100%",
    logo: null,

    popup_config: {
      width: 800,
      height: 600,
      centerBrowser: true,
      centerScreen: true,
      location: false,
      menubar: false,
      resizable: true,
      scrollbars: true,
      status: false,
      titlebar: false,
      toolbar: false,
    },
    ...options,
  };

  useEffect(() => {
    let scriptElement = null; // Track script for cleanup

    const loadDigioSDK = async () => {
      try {
        // Check if SDK already loaded
        if (window.Digio) {
          console.log("✅ DEBUG: Digio SDK already loaded");
          initializeDigio();
          return;
        }

        // ✅ FIXED: Correct base URLs
        const baseUrl =
          config.environment === "sandbox"
            ? "https://ext-gateway.digio.in"
            : "https://app.digio.in"; // ✅ CORRECTED: Use app.digio.in for production

        const sdkUrl = `${baseUrl}/sdk/v11/digio.js`;
        console.log("🔍 DEBUG: Loading Digio SDK from:", sdkUrl);

        // Load SDK dynamically
        const script = document.createElement("script");
        script.src = sdkUrl;
        script.async = true;
        scriptElement = script; // Store reference for cleanup

        script.onload = () => {
          console.log("✅ DEBUG: Digio SDK loaded successfully");
          initializeDigio();
        };

        script.onerror = (event) => {
          console.error("❌ DEBUG: Failed to load Digio SDK from:", sdkUrl);
          setError(`Failed to load Digio SDK from ${baseUrl}`);
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error("❌ DEBUG: SDK loading error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    const initializeDigio = () => {
      try {
        console.log("🔍 DEBUG: Initializing Digio with config:", config);

        const digio = new window.Digio({
          ...config,
          callback: handleCallback,
          event_listener: handleEvent,
        });

        console.log("✅ DEBUG: Digio instance created successfully");
        setDigioInstance(digio);
        setIsLoading(false);
      } catch (err) {
        console.error("❌ DEBUG: Digio initialization error:", err);
        setError(`Digio initialization failed: ${err.message}`);
        setIsLoading(false);
      }
    };

    loadDigioSDK();

    // ✅ CLEANUP: Remove script on unmount
    return () => {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
        console.log("🧹 DEBUG: Cleaned up Digio SDK script");
      }
    };
  }, [config.environment]); // Only depend on environment

  const handleCallback = useCallback(
    (response) => {
      console.log("🔍 DEBUG: Digio callback received:", response);

      if (response.error_code) {
        console.error("❌ DEBUG: Digio callback error:", response);
        config.onError?.(response);
      } else {
        console.log("✅ DEBUG: Digio callback success:", response);
        config.onSuccess?.(response);
      }
    },
    [config.onError, config.onSuccess]
  );

  const handleEvent = useCallback(
    (event) => {
      console.log("🔍 DEBUG: Digio event:", event);
      config.onEvent?.(event);

      // Handle specific events
      switch (event.event) {
        case "sign.cancelled":
          config.onCancel?.(event);
          break;
        default:
          break;
      }
    },
    [config.onEvent, config.onCancel]
  );

  // In your useDigio hook
  const startSigning = useCallback(
    (documentIds, identifier) => {
      console.log("🔍 DEBUG: Starting signing with:", {
        documentIds,
        identifier,
      });

      if (!digioInstance) {
        const errorMsg = "Digio SDK not initialized";
        console.error("❌ DEBUG:", errorMsg);
        setError(errorMsg);
        config.onError?.({ error: errorMsg });
        return;
      }

      try {
        console.log("🔍 DEBUG: Calling digio.init()...");
        digioInstance.init();

        // ✅ CORRECTED: Use token-based submit if access token is available
        if (config.accessToken) {
          console.log("🔍 DEBUG: Using token-based authentication");
          // Use 3-parameter method: digio.submit(requestId, identifier, token_id)
          digioInstance.submit(documentIds[0], identifier, config.accessToken);
        } else {
          console.log("🔍 DEBUG: Using standard authentication (with OTP)");
          // Use 2-parameter method: digio.submit(documentId, identifier)
          digioInstance.submit(documentIds[0], identifier);
        }

        console.log("✅ DEBUG: Digio signing process started successfully");
      } catch (err) {
        console.error("❌ DEBUG: Digio signing error:", err);
        setError(`Signing failed: ${err.message}`);
        config.onError?.(err);
      }
    },
    [digioInstance, config]
  );

  const cancelSigning = useCallback(() => {
    if (digioInstance) {
      try {
        console.log("🔍 DEBUG: Cancelling Digio signing process");
        digioInstance.cancel();
      } catch (err) {
        console.error("❌ DEBUG: Error cancelling signing:", err);
      }
    }
  }, [digioInstance]);

  return {
    isLoading,
    error,
    startSigning,
    cancelSigning,
    isReady: !isLoading && !error && digioInstance,
  };
};

export default useDigio;
