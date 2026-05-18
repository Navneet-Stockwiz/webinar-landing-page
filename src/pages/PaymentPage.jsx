import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import bgImage from "../assets/webp/bg.webp";
import mobilebg from "../assets/webp/mobilebg.webp";
import logo from "../assets/svg/popuplogo.svg";
import mainlogo from "../assets/svg/mainlogo.svg";
import { useLandingVariant } from "../contexts/LandingVariantContext.jsx";
import { startPaidWebinarCheckoutInNewTab } from "../utils/razorpayPaidWebinarFlow.js";
import { useLanguage } from "../contexts/LanguageContext";
import { useWebinar } from "../contexts/WebinarContext";

function leadParamsFromSearch(searchParams) {
  const out = {};
  for (const [key, value] of searchParams.entries()) {
    const v = typeof value === "string" ? value.trim() : value;
    if (v != null && v !== "") {
      out[key] = v;
    }
  }
  return out;
}

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const { paymentSource, channel } = useLandingVariant();
  const { selectedLanguage } = useLanguage();
  const { webinarData } = useWebinar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleSubmit = async () => {
    const { name, email, contact } = formData;
    if (!name || !email || !contact) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const fullPhone = contact.startsWith("+91")
        ? contact
        : `+91${contact.replace(/\D/g, "")}`;

      const source =
        paymentSource ||
        `${window.location.origin}${window.location.pathname}`;

      await startPaidWebinarCheckoutInNewTab({
        name,
        email,
        fullPhone,
        paymentSource: source,
        channel,
        selectedLanguage,
        searchParams,
        leadParamsFromSearch,
        zoomWebinarId: webinarData?.data?.zoom_webinar_id,
      });

      setSnackbar({
        open: true,
        message: "Complete payment in the new tab.",
        severity: "info",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message:
          err?.message ||
          (typeof err === "string" ? err : "Payment could not be completed."),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="h-screen w-full flex flex-col relative bg-cover bg-center overflow-x-hidden"
        style={{
          backgroundImage: `url(${isMobile ? mobilebg : bgImage})`,
        }}
      >
        <Box sx={{ position: "absolute", top: 24, left: 24 }}>
          <Box
            component="img"
            src={mainlogo}
            alt="StrykeX"
            sx={{ height: { xs: 64, md: 28 } }}
          />
        </Box>

        <Box
          sx={{
            m: "auto",
            bgcolor: "#fff",
            px: { xs: 3, sm: 4 },
            py: { xs: 3, sm: 4 },
            borderRadius: 3,
            width: "90%",
            maxWidth: 400,
            textAlign: "center",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <img src={logo} alt="StrykeX" className="md:h-[60px] h-[40px]" />

          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />
          <TextField
            name="contact"
            label="Mobile No."
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
              sx: { borderRadius: 1.5 },
            }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              background: "linear-gradient(to right,#3F72FF,#0036B2,#47B4B4)",
              borderRadius: 1,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(to right,#3F72FF,#0036B2,#47B4B4)",
              },
            }}
          >
            {loading ? "Processing…" : "Proceed to Pay"}
          </Button>
        </Box>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PaymentPage;
