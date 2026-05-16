// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
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

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    amount: "23999",
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
            source:"ai.stockwiz.in"
          }),
        }
      );

      const data = await res.json();
      if (data?.success) {
        setSnackbar({
          open: true,
          message: "Payment link created successfully! Opening now…",
          severity: "success",
        });
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
      {/* Background & logo */}
      <div
        className="h-screen w-full flex flex-col relative bg-cover bg-center overflow-x-hidden"
        style={{
          backgroundImage: `url(${isMobile ? mobilebg : bgImage})`,
          objectFit: "cover",
        }}
      >
        {/* top‑left logo */}
        <Box sx={{ position: "absolute", top: 24, left: 24 }}>
          <img
            src={mainlogo}
            alt="StrykeX"
            sx={{
              height: { xs: 64, md: 28 },
            }}
          />
        </Box>

        {/* centered card */}
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
          {/* card logo + caption */}
          <img src={logo} alt="StrykeX" className="md:h-[60px] h-[40px]" />

          {/* form fields */}
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
          {/* hidden amount (still editable via state if needed) */}
          <TextField
            name="amount"
            label="Amount (₹)"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            sx={{ display: "none" }}
          />

          {/* submit button */}
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

      {/* snackbar notifications */}
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
