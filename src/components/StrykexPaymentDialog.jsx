import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useLandingVariant } from "../contexts/LandingVariantContext.jsx";
import popuplogo from "../assets/svg/popuplogo.svg";
import { startPaidWebinarCheckoutInNewTab } from "../utils/razorpayPaidWebinarFlow.js";

function getWebinarLeadTrackingFromSearchParams(searchParams) {
  const out = {};
  for (const [key, value] of searchParams.entries()) {
    const v = typeof value === "string" ? value.trim() : value;
    if (v != null && v !== "") {
      out[key] = v;
    }
  }
  return out;
}

const StrykexPaymentDialog = ({ open, handleClose, selectedLanguage }) => {
  const [searchParams] = useSearchParams();
  const { paymentSource, channel } = useLandingVariant();
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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

      const fullPhoneNumber = contact.startsWith("+91")
        ? contact
        : `+91${contact.replace(/\D/g, "")}`;

      const source =
        paymentSource ||
        `${window.location.origin}${window.location.pathname}`;

      await startPaidWebinarCheckoutInNewTab({
        name,
        email,
        fullPhone: fullPhoneNumber,
        paymentSource: source,
        channel,
        selectedLanguage,
        searchParams,
        leadParamsFromSearch: getWebinarLeadTrackingFromSearchParams,
      });

      setSnackbar({
        open: true,
        message: "Complete payment in the new tab.",
        severity: "info",
      });
      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error?.message ||
          (typeof error === "string" ? error : "Payment could not be completed."),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogContent sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3, sm: 4 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 3 },
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={popuplogo}
              alt="popup logo"
              sx={{ width: 120, mx: "auto", mb: 2, display: "block" }}
            />

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />

            <TextField
              fullWidth
              label="Mobile No."
              name="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
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
                  background:
                    "linear-gradient(to right,#3F72FF,#0036B2,#47B4B4)",
                },
              }}
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StrykexPaymentDialog;
