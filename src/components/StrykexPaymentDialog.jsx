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
import popuplogo from "../assets/svg/popuplogo.svg";

const StrykexPaymentDialog = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    amount: "79999", //79999 new pricing
  });
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success", "error", "warning", "info"
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
    const { name, email, contact, amount } = formData;
    if (!name || !email || !contact || !amount) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.stockwiz.in/api/v2/razorpay/create-strykex-payment-link",
        {
          method: "POST",
          headers: {
            "api-key":
              "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
            "accept-language": "en",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            contact,
            amount: parseInt(amount, 10),
            source: "algo.stockwiz.in",
          }),
        }
      );
      const data = await res.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);

      if (data?.success) {
        window.location.href = data.payment_link;
      } else {
        setSnackbar({
          open: true,
          message: "Failed to create payment link.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Error creating payment link",
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
            {/* Logo */}
            <Box
              component="img"
              src={popuplogo}
              alt="popup logo"
              sx={{ width: 120, mx: "auto", mb: 2, display: "block" }}
            />

            {/* Name */}
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />

            {/* Email */}
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

            {/* Mobile */}
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

            {/* Amount */}
            <TextField
              fullWidth
              sx={{ display: "none" }}
              label="Amount (₹)"
              name="amount"
              type="number"
              placeholder="Enter amount e.g. 79999"
              value={formData.amount}
              onChange={handleChange}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />

            {/* Submit Button */}
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
              {loading ? "Processing…" : "Proceed to Pay"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
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
