import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import strykexblack from "../assets/svg/strykexblack.svg";
import { getLandingApiV2Url } from "../api/landingApiBase.js";

const StrykeXPopupDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      setSnackbar({
        open: true,
        message: "Enter a valid email address",
        severity: "error",
      });
      return;
    }

    if (!phoneRegex.test(phone)) {
      setSnackbar({
        open: true,
        message: "Enter a valid 10-digit phone number",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(getLandingApiV2Url("strykex/createAlogoLead"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "https://algo.stockwiz.in",
        }),
      });

      const data = await response.json();

      if (data.status) {
        setSnackbar({
          open: true,
          message: "Details submitted",
          severity: "success",
        });
        setFormData({ name: "", email: "", phone: "" });
        onClose(true);
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Failed to create lead",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error creating lead. Please try again.",
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
        onClose={() => onClose(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 0.5,
            textAlign: "center",
            position: "relative",
          },
        }}
      >
        {/* Cross Close Button (UI unchanged, just iOS fix) */}
        <IconButton
          aria-label="close"
          onClick={() => onClose(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,

            zIndex: 1500, 
            color: (theme) => theme.palette.grey[500],
            cursor: "pointer", 
            WebkitTapHighlightColor: "transparent",

          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Header Section */}
          <div className="flex flex-col justify-center items-center md:gap-3 gap-2">
            <img
              src={strykexblack}
              alt="StrykeX"
              className="md:h-[30px] h-[26px] max-w-[60%]"
            />

            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                lineHeight: "134%",
              }}
            >
              Get{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90.98deg, #3FADFF -19.4%, #336CDC 42.55%, #47B4B4 105.78%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "700",
                }}
              >
                2 Months Extra Access
              </span>
              <br />
              + Special Discount Code
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                lineHeight: "150%",
                color: "#000000BF",
              }}
            >
              On First Come First Serve Basis
            </Typography>
          </div>

          {/* Form Section */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-3 mt-4 sm:mt-6"
          >
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Phone No."
              name="phone"
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            {/* Submit Button */}
            <div className="pt-2 sm:pt-3">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.2,
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: { xs: "14px", sm: "16px" },
                  textTransform: "none",
                  background:
                    "linear-gradient(90.59deg, #3F72FF -5.06%, #0036B2 52.68%, #47B4B4 111.62%)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  ":hover": {
                    background:
                      "linear-gradient(90.59deg, #355ee6 -5.06%, #002c8c 52.68%, #379d9d 111.62%)",
                  },
                }}
              >
                {loading ? "Processing…" : "Submit"}
              </Button>
            </div>
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

export default StrykeXPopupDialog;
