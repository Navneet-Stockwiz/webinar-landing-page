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
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import strykexblack from "../assets/svg/mainlogoblack.svg";
import safeicon from "../assets/svg/safeicon.svg";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useWebinar } from "../contexts/WebinarContext";
import { useLandingVariant } from "../contexts/LandingVariantContext.jsx";
import { createRegistration, resolveAgency } from "../api/api";
import { webinarNameFromVariant } from "../utils/webinarGtm.js";
import { getOrCreateVisitorUid } from "../utils/visitorUid.js";

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
  { code: "+385", country: "Croatia", flag: "🇭🇷" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+853", country: "Macau", flag: "🇲🇴" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+964", country: "Iraq", flag: "🇮🇶" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+218", country: "Libya", flag: "🇱🇾" },
  { code: "+20", country: "Sudan", flag: "🇸🇩" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+1", country: "Puerto Rico", flag: "🇵🇷" },
  { code: "+1", country: "Dominican Republic", flag: "🇩🇴" },
  { code: "+1", country: "Jamaica", flag: "🇯🇲" },
  { code: "+1", country: "Trinidad and Tobago", flag: "🇹🇹" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+375", country: "Belarus", flag: "🇧🇾" },
  { code: "+370", country: "Kazakhstan", flag: "🇰🇿" },
  { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
  { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+992", country: "Tajikistan", flag: "🇹🇯" },
  { code: "+993", country: "Turkmenistan", flag: "🇹🇲" },
  { code: "+374", country: "Armenia", flag: "🇦🇲" },
  { code: "+995", country: "Georgia", flag: "🇬🇪" },
  { code: "+994", country: "Azerbaijan", flag: "🇦🇿" },
];

/** Query keys aligned with landing URL tracking (utm_*, ad_name, gclid). */
const WEBINAR_LEAD_TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_ad_id",
  "utm_adgroup",
  "utm_adgroup_id",
  "utm_campaign_id",
  "utm_device",
  "utm_network",
  "utm_keyword",
  "utm_matchtype",
  "utm_content",
  "ad_name",
  "gclid",
];

function getWebinarLeadTrackingFromSearchParams(searchParams) {
  const out = {};
  for (const key of WEBINAR_LEAD_TRACKING_PARAMS) {
    const v = searchParams.get(key);
    if (v != null && v !== "") {
      out[key] = v;
    }
  }
  return out;
}

const StrykeXPopupDialog = ({ open, onClose, onSuccess, selectedLanguage }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { paymentSource, isPaid, channel } = useLandingVariant();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    state: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [loading, setLoading] = useState(false);
  const { webinarData } = useWebinar();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      phone: e.target.value,
    }));
  };

  const handleCountryCodeChange = (countryCode) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: countryCode,
    }));
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    const { name, email, phone, countryCode, state } = formData;
    if (!name || !email || !phone || !state) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullPhoneNumber = countryCode + phone;
    const phoneRegex = /^\+[1-9]\d{1,14}$/;

    if (!emailRegex.test(email)) {
      setSnackbar({
        open: true,
        message: "Enter a valid email address",
        severity: "error",
      });
      return;
    }

    if (!phoneRegex.test(fullPhoneNumber)) {
      setSnackbar({
        open: true,
        message: "Enter a valid phone number",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const source = paymentSource || `${window.location.origin}${window.location.pathname}`;
      let agencyId;
      try {
        const resolveResponse = await resolveAgency(source);
        agencyId = resolveResponse?.data?.data?.agency_id;
      } catch {
        // Keep registration flow non-blocking if agency mapping fails.
      }

      const visitorUid = getOrCreateVisitorUid();
      const zoomWebinarId = webinarData?.data?.zoom_webinar_id;
      const { data } = await createRegistration({
        ...getWebinarLeadTrackingFromSearchParams(searchParams),
        user_id: visitorUid,
        uid: visitorUid,
        name,
        email,
        phone: fullPhoneNumber,
        source,
        agency_id: agencyId,
        subscription_type: isPaid ? "PAID" : "FREE",
        language: selectedLanguage,
        state: state,
        webinar_type: isPaid ? "PAID" : "FREE",
        event: isPaid ? "webinar_purchase_paid" : undefined,
        webinar_name: webinarNameFromVariant(channel, isPaid),
        ...(!isPaid && zoomWebinarId ? { id: zoomWebinarId } : {}),
      });

      if (typeof window.pushECFormSubmit === "function") {
        window.pushECFormSubmit(email, fullPhoneNumber);
      }
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit",
          webinar_name: window.ACTIVE_WEBINAR?.topic ?? null,
          webinar_type: window.ACTIVE_WEBINAR?.webinar_type ?? null,
        });
      }
      setSnackbar({
        open: true,
        message: data?.message || "Details submitted successfully!",
        severity: "success",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        state: "",
      });

      onSuccess();
      onClose();
      setTimeout(() => {
        if (!isPaid) {
          navigate(channel === "meta" ? "/m-thankyou" : "/g-thankyou");
          return;
        }
        const isIOS =
          /iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        if (isIOS) {
          window.location.href = webinarData.data.agadh_thankyou;
        } else {
          window.open(webinarData.data.agadh_thankyou, "_blank");
        }
      }, 100);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error submitting details. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose()}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: "12px", sm: "16px" },
            p: 0,
            textAlign: "center",
            position: "relative",
            maxWidth: { xs: "95vw", sm: "500px" },
            margin: { xs: "8px", sm: "16px" },
            maxHeight: { xs: "95vh", sm: "90vh" },
            overflow: "auto",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={{
            position: "absolute",
            right: { xs: 12, sm: 16 },
            top: { xs: 12, sm: 16 },
            zIndex: 1500,
            color: "#9CA3AF",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            minWidth: { xs: "40px", sm: "44px" },
            minHeight: { xs: "40px", sm: "44px" },
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: { xs: 2, sm: 4 }, pb: { xs: 3, sm: 4 } }}>
          {/* Header Section */}
          <div className="flex flex-col justify-center items-center gap-3 mb-4 sm:gap-4 sm:mb-6">
            <img
              src={strykexblack}
              alt="StrykeX"
              className="h-[28px] sm:h-[32px] max-w-[60%]"
            />

            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: "20px", sm: "36px" },
                lineHeight: "134%",
                color: "#000000",
                textAlign: "center",
              }}
            >
              Confirm Your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90.98deg, #3FADFF -19.4%, #336CDC 42.55%, #47B4B4 105.78%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "700",
                }}
              >
                Details
              </span>
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
            className="flex flex-col gap-3 sm:gap-4"
          >
            <div className="flex flex-col gap-2">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#000000",
                  textAlign: "left",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Name <span style={{ color: "#EF4444" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Your Full Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: { xs: "44px", sm: "48px" },
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: "#E5E7EB",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D1D5DB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                  },
                  "& .MuiInputBase-input": {
                    height: { xs: "44px", sm: "48px" },
                    padding: { xs: "0 12px", sm: "0 14px" },
                    fontSize: { xs: "16px", sm: "14px" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#9CA3AF",
                    opacity: 1,
                  },
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#000000",
                  textAlign: "left",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Email <span style={{ color: "#EF4444" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Your Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: { xs: "44px", sm: "48px" },
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: "#E5E7EB",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D1D5DB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                  },
                  "& .MuiInputBase-input": {
                    height: { xs: "44px", sm: "48px" },
                    padding: { xs: "0 12px", sm: "0 14px" },
                    fontSize: { xs: "16px", sm: "14px" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#9CA3AF",
                    opacity: 1,
                  },
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#000000",
                  textAlign: "left",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Phone No. <span style={{ color: "#EF4444" }}>*</span>
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "44px", sm: "48px" },
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  "&:hover": {
                    borderColor: "#D1D5DB",
                  },
                  "&:focus-within": {
                    borderColor: "#3B82F6",
                    boxShadow: "0 0 0 1px #3B82F6",
                  },
                }}
              >
                {/* Country Code Autocomplete */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    borderRight: "1px solid #E5E7EB",
                    height: "100%",
                    minWidth: "120px",
                    cursor: "pointer",
                  }}
                >
                  <Autocomplete
                    value={
                      countryCodes.find(
                        (c) => c.code === formData.countryCode
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      if (newValue) {
                        handleCountryCodeChange(newValue.code);
                      }
                    }}
                    options={countryCodes}
                    getOptionLabel={(option) => {
                      const cleanCountryName = option.country
                        ?.replace(/\([^)]*\)/g, "")
                        ?.replace(/in\(IN\)/gi, "")
                        ?.trim();
                      return `${option.code} ${cleanCountryName}`;
                    }}
                    renderOption={(props, option) => {
                      const cleanCountryName = option.country
                        ?.replace(/\([^)]*\)/g, "")
                        ?.replace(/in\(IN\)/gi, "")
                        ?.trim();
                      return (
                        <Box
                          component="li"
                          {...props}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 12px",
                          }}
                        >
                          <span className="text-[12px] font-medium">
                            {option.code}
                          </span>
                          <span className="text-[12px] font-medium text-[#6B7280]">
                            {cleanCountryName}
                          </span>
                        </Box>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        sx={{
                          "& .MuiInput-underline:before": {
                            borderBottom: "none",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottom: "none",
                          },
                          "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                            {
                              borderBottom: "none",
                            },
                          "& .MuiInputBase-input": {
                            padding: "0",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#374151",
                          },
                          "& .MuiAutocomplete-input": {
                            padding: "0",
                          },
                        }}
                      />
                    )}
                    sx={{
                      minWidth: "100px",
                      "& .MuiOutlinedInput-root": {
                        padding: "0",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                    }}
                    disableClearable
                    autoComplete="off"
                    noOptionsText="No countries found"
                  />
                </Box>

                {/* Phone Number Input */}
                <Box
                  sx={{
                    flex: 1,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                  }}
                >
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter Phone Number"
                    autoComplete="off"
                    required
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      backgroundColor: "transparent",
                      color: "#374151",
                    }}
                  />
                </Box>
              </Box>
            </div>

            <div className="flex flex-col gap-2">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#000000",
                  textAlign: "left",
                  display: { xs: "none", sm: "block" },
                }}
              >
                State <span style={{ color: "#EF4444" }}>*</span>
              </Typography>
              <Autocomplete
                fullWidth
                options={states}
                value={formData.state}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    state: newValue || "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select..."
                    variant="outlined"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: { xs: "44px", sm: "48px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3B82F6",
                        },
                      },
                      "& .MuiInputBase-input": {
                        height: { xs: "44px", sm: "48px" },
                        padding: { xs: "0 12px", sm: "0 14px" },
                        fontSize: { xs: "16px", sm: "14px" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#9CA3AF",
                        opacity: 1,
                      },
                    }}
                  />
                )}
                sx={{
                  "& .MuiAutocomplete-inputRoot": {
                    height: { xs: "44px", sm: "48px" },
                  },
                }}
              />
            </div>

            {/* Information Section */}
            <div className="flex items-start gap-2 sm:gap-3 mt-2 mb-3 sm:mb-4">
              <div className="flex-shrink-0 mt-1">
                <img src={safeicon} alt="safe" className="w-4 h-4" />
              </div>
              <div className="text-left">
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "4px",
                  }}
                >
                  Don't worry, your details are safe.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    color: "##000000BF",
                  }}
                >
                  We just need this information so that we can share the event
                  details with you once you book successfully.
                </Typography>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: { xs: 1.25, sm: 1.5 },
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: { xs: "15px", sm: "16px" },
                textTransform: "none",
                minHeight: { xs: "44px", sm: "48px" },
                background:
                  "linear-gradient(90.59deg, #3F72FF -5.06%, #0036B2 52.68%, #47B4B4 111.62%)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                ":hover": {
                  background:
                    "linear-gradient(90.59deg, #355ee6 -5.06%, #002c8c 52.68%, #379d9d 111.62%)",
                },
                ":disabled": {
                  background: "#E5E7EB",
                  color: "#9CA3AF",
                },
              }}
            >
              {loading ? "Processing..." : "Initiate Booking"}
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

export default StrykeXPopupDialog;
