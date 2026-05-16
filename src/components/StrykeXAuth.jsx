import React, { useState, useEffect, useRef } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import OtpInput from "react-otp-input";
import mainlogo from "../assets/svg/mainlogo.svg";
import whatsappnew from "../assets/svg/whatsappnew.svg";
import mailnew from "../assets/svg/mailnew.svg";
import phonenew from "../assets/svg/phonenew.svg";
import vector from "../assets/webp/vector.webp";
import video from "../assets/webp/video2.webp";
import { useNavigate } from "react-router-dom";
import DigioSigner from "./Digio/DigioSigner"; // ✅ ONLY NEW IMPORT ADDED

const StrykeXDesktopAuth = () => {
  const [step, setStep] = useState("mobile");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [mobile, setMobile] = useState(""); 
  const [userDocumentId, setUserDocumentId] = useState(null); // ✅ ONLY NEW STATE ADDED
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();
  const otpContainerRef = useRef(null);

  // ✅ ALL EXISTING LOGIC REMAINS EXACTLY THE SAME
  const mobileRegex = /^(?:\+91)?[6-9]\d{9}$/;

  const extractOTPFromText = (text) => {
    const otpRegex = /\b\d{6}\b/;
    const match = text.match(otpRegex);
    return match ? match[0] : null;
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const extractedOTP = extractOTPFromText(pastedData);

    if (extractedOTP && extractedOTP.length === 6) {
      setOtp(extractedOTP);
      setSnackbar({
        open: true,
        message: "OTP pasted successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Invalid OTP format. Please paste a 6-digit OTP.",
        severity: "error",
      });
    }
  };

  // ✅ ALL EXISTING useEffect HOOKS REMAIN EXACTLY THE SAME
  useEffect(() => {
    if (step === "otp" && "OTPCredential" in window) {
      const abortController = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: abortController.signal,
        })
        .then((otp) => {
          if (otp && otp.code) {
            setOtp(otp.code);
            setSnackbar({
              open: true,
              message: "OTP auto-filled from SMS",
              severity: "success",
            });
          }
        })
        .catch((err) => {
          console.log("OTP autofill not available or denied:", err);
        });

      return () => {
        abortController.abort();
      };
    }
  }, [step]);

  useEffect(() => {
    if (step === "otp" && otpContainerRef.current) {
      const container = otpContainerRef.current;
      container.addEventListener("paste", handleOTPPaste);
      return () => {
        container.removeEventListener("paste", handleOTPPaste);
      };
    }
  }, [step]);

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp(otp);
    }
  }, [otp]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // ✅ EXISTING sendOtp FUNCTION REMAINS EXACTLY THE SAME
  const sendOtp = async () => {
    if (!mobileRegex.test(mobile)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid mobile number",
        severity: "error",
      });
      return;
    }

    try {
      await fetch(
        "https://api.stockwiz.in/api/v2/auth/create-strykex-webpage-leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key":
              "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
          },
          body: JSON.stringify({ mobile_number: mobile }),
        }
      );

      const res = await fetch("https://api.stockwiz.in/api/v2/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
        },
        body: JSON.stringify({ mobile_number: mobile }),
      });

      const response = await res.json();

      if (response?.status) {
        setStep("otp");
        setTimer(60);
        setOtp("");
        setSnackbar({
          open: true,
          message: response?.message || "OTP sent successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: response.message || "Failed to send OTP",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error while sending OTP",
        severity: "error",
      });
      console.error(error);
    }
  };

  // ✅ EXISTING resendOtp FUNCTION REMAINS EXACTLY THE SAME
  const resendOtp = async () => {
    if (timer > 0) return;
    await sendOtp();
  };

  // ✅ ONLY SMALL MODIFICATION: Add Digio step after OTP verification
  const verifyOtp = async (enteredOtp = otp) => {
    if (enteredOtp.length !== 6) {
      setSnackbar({
        open: true,
        message: "Please enter the complete 6-digit OTP",
        severity: "error",
      });
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "api-key":
        "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
    };

    try {
      const verifyRes = await fetch(
        "https://api.stockwiz.in/api/v2/auth/verify-otp",
        {
          method: "POST",
          headers,
          body: JSON.stringify({ mobile_number: mobile, otp: enteredOtp }),
        }
      );

      const verifyData = await verifyRes.json();

      if (verifyData?.status) {
        setSnackbar({
          open: true,
          message: verifyData?.message || "OTP verified successfully",
          severity: "success",
        });

        // ✅ ONLY CHANGE: Instead of direct navigation, go to Digio step
        setUserDocumentId("DID" + Date.now()); // Generate demo document ID
        setStep("digio");
        
        // ✅ COMMENTED OUT EXISTING LOGIC (keeping it for reference)
        /*
        const accessRes = await fetch(
          "https://api.stockwiz.in/api/v2/auth/get-strykex-access",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ mobile_number: mobile }),
          }
        );

        const accessData = await accessRes.json();
        if (accessData?.status) {
          const response = await fetch(
            "https://api.stockwiz.in/api/v2/auth/get-dhan-mapped-user-status",
            {
              method: "POST",
              headers,
              body: JSON.stringify({ mobileNumber: mobile }),
            }
          );
          const jsonResponse = await response.json();
          if (jsonResponse?.status) {
            window.location.href = "https://strykex.stockwiz.in/dashboard";
          } else {
            navigate("/getstarted");
          }
        } else {
          sessionStorage.removeItem("hasAccess");
          navigate("/pricing");
        }
        */
      } else {
        setSnackbar({
          open: true,
          message: verifyData?.message || "OTP verification failed",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setSnackbar({
        open: true,
        message: "Network error during OTP verification",
        severity: "error",
      });
    }
  };

  // ✅ NEW FUNCTIONS ADDED FOR DIGIO (but existing logic preserved)
  const proceedWithExistingFlow = async () => {
    const headers = {
      "Content-Type": "application/json",
      "api-key":
        "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
    };

    try {
      const accessRes = await fetch(
        "https://api.stockwiz.in/api/v2/auth/get-strykex-access",
        {
          method: "POST",
          headers,
          body: JSON.stringify({ mobile_number: mobile }),
        }
      );

      const accessData = await accessRes.json();
      if (accessData?.status) {
        const response = await fetch(
          "https://api.stockwiz.in/api/v2/auth/get-dhan-mapped-user-status",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ mobileNumber: mobile }),
          }
        );
        const jsonResponse = await response.json();
        if (jsonResponse?.status) {
          window.location.href = "https://strykex.stockwiz.in/dashboard";
        } else {
          navigate("/getstarted");
        }
      } else {
        sessionStorage.removeItem("hasAccess");
        navigate("/pricing");
      }
    } catch (error) {
      console.error("Access check error:", error);
      setSnackbar({
        open: true,
        message: "Error checking access. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDigioSuccess = async (response) => {
    console.log("✅ Document signed successfully:", response);
    setSnackbar({
      open: true,
      message: "Document signed successfully! Proceeding to your account...",
      severity: "success",
    });
    
    setTimeout(() => {
      proceedWithExistingFlow();
    }, 2000);
  };

  const handleDigioError = (error) => {
    console.error("❌ Document signing failed:", error);
    setSnackbar({
      open: true,
      message: "Document signing failed. Proceeding without signing...",
      severity: "warning",
    });
    
    setTimeout(() => {
      proceedWithExistingFlow();
    }, 3000);
  };

  const handleDigioCancel = () => {
    setSnackbar({
      open: true,
      message: "Document signing cancelled. Proceeding to your account...",
      severity: "info",
    });
    
    setTimeout(() => {
      proceedWithExistingFlow();
    }, 2000);
  };

  return (
    <>
      {/* ✅ EXISTING SNACKBAR REMAINS EXACTLY THE SAME */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* ✅ EXISTING DESKTOP DESIGN REMAINS EXACTLY THE SAME */}
      <div className="md:flex hidden w-full min-h-screen max-h-screen overflow-hidden p-6 font-inter">
        <div
          className="flex flex-col justify-start items-start gap-[40px] flex-1 rounded-[33px] max-h-full w-full p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(333.37deg, #3370FF -19.48%, #000000 96.37%)",
          }}
        >
          <img
            src="/Frame 1686553781.png"
            alt=""
            className="absolute object-cover w-full h-full top-0 left-0 z-0"
          />
        </div>

        <div className="relative flex flex-1 flex-col justify-center items-center bg-white px-4 sm:px-10 py-8 overflow-y-auto">
          <div className="w-full max-w-[400px]">
            {/* ✅ ONLY ADDITION: Added digio case to existing step logic */}
            {step === "mobile" ? (
              <>
                <h2 className="text-[40px] font-bold text-[#111827]">
                  Login / Sign Up
                </h2>
                <p className="text-[18px] text-[#969696] mb-6">
                  Please enter your mobile number to continue.
                </p>

                <TextField
                  id="mobile"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  placeholder="+91XXXXXXXXXX"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#4B5563" },
                  }}
                  InputProps={{
                    style: {
                      borderRadius: "8px",
                    },
                  }}
                  sx={{
                    marginBottom: "16px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#D1D5DB",
                      },
                      "&:hover fieldset": {
                        borderColor: "#3370FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3370FF",
                      },
                    },
                  }}
                />

                <button
                  onClick={sendOtp}
                  className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[18px]"
                >
                  Get Started
                </button>
              </>
            ) : step === "otp" ? (
              <>
                <h2 className="text-[40px] font-bold text-[#111827]">
                  Enter OTP
                </h2>
                <p className="text-[18px] text-[#969696] mb-6">
                  We've sent it to {mobile}
                </p>

                <p className="text-[14px] text-[#000000] font-semibold leading-[20px] mb-2">
                  6-DIGIT
                </p>

                <div className="mb-4" ref={otpContainerRef}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span style={{ width: "8px" }}></span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        autoComplete="one-time-code"
                        style={{
                          width: "48px",
                          height: "48px",
                          border: "1px solid #D1D5DB",
                          borderRadius: "8px",
                          textAlign: "center",
                          fontSize: "24px",
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#367AFF";
                          e.target.style.boxShadow =
                            "0 0 0 2px rgba(54, 122, 255, 0.2)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#D1D5DB";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    )}
                    shouldAutoFocus
                    inputType="tel"
                  />
                </div>

                <div className="flex justify-between text-sm mb-6">
                  <span className="text-[14px] text-[#000000] font-normal leading-[20px]">
                    Didn't get it?{" "}
                    {timer === 0 ? (
                      <button
                        onClick={resendOtp}
                        className="text-[#367AFF] font-medium"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      "Resend OTP"
                    )}
                  </span>
                  <span className="text-[14px] text-[#000000] font-medium leading-[20px]">
                    {timer > 0 ? `Resend OTP in ${timer}s` : ""}
                  </span>
                </div>

                <button
                  onClick={() => verifyOtp()}
                  className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[18px]"
                >
                  Continue
                </button>
                <button
                  className="w-full text-[#367AFF] font-medium text-[14px] mt-2"
                  onClick={() => setStep("mobile")}
                >
                  Change Mobile Number
                </button>
              </>
            ) : step === "digio" ? (
              /* ✅ ONLY NEW SECTION ADDED - DIGIO STEP */
              <>
                <h2 className="text-[40px] font-bold text-[#111827]">
                  Digital Signature
                </h2>
                <p className="text-[18px] text-[#969696] mb-6">
                  Please complete the digital signature to secure your account.
                </p>

                <div className="mb-6">
                  <DigioSigner
                    documentIds={[userDocumentId]}
                    identifier={mobile}
                    environment="sandbox"
                    onSuccess={handleDigioSuccess}
                    onError={handleDigioError}
                    onCancel={handleDigioCancel}
                  />
                </div>

                <button
                  className="w-full text-[#367AFF] font-medium text-[14px] underline"
                  onClick={() => proceedWithExistingFlow()}
                >
                  Skip Digital Signature
                </button>
              </>
            ) : null}

            {/* ✅ EXISTING DIVIDER AND CONTACT INFO REMAINS EXACTLY THE SAME */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-sm text-gray-400">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <p className="text-[18px] text-[#969696] text-center">
              Need assistance?{" "}
              <a
                href="https://api.whatsapp.com/send?phone=918905939199&text=Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F"
                target="_blank"
                className="text-[#367AFF] font-medium"
              >
                Contact Us
              </a>
            </p>
          </div>

          <div className="absolute bottom-0 flex flex-wrap justify-center gap-4 items-center text-xs text-gray-500 mb-4">
            <a
              href="tel:+918065919278"
              className="flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <img src={phonenew} alt="phone" />
              </span>
              <span className="text-[14px] text-[#000000] font-normal leading-[150%]">
                +91 - 8065919278
              </span>
            </a>

            <a
              href="mailto:help@stockwiz.in"
              className="flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <img src={mailnew} alt="mail" />
              </span>
              <span className="text-[14px] text-[#000000] font-normal leading-[150%]">
                help@stockwiz.in
              </span>
            </a>

            <a
              href="https://wa.me/918905939199?text=Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F"
              className="flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <img src={whatsappnew} alt="whatsapp" />
              </span>
              <span className="text-[14px] text-[#000000] font-normal leading-[150%]">
                +91 - 8905939199
              </span>
            </a>
            <a
              href="https://wa.me/917850934748?text=Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F"
              className="flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <img src={whatsappnew} alt="whatsapp" />
              </span>
              <span className="text-[14px] text-[#000000] font-normal leading-[150%]">
                +91 - 7850934748
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ✅ EXISTING MOBILE DESIGN REMAINS EXACTLY THE SAME (just add digio case) */}
      <div className="flex justify-center items-center w-full h-full">
        <div className="md:hidden flex justify-center items-center relative w-full h-full">
          <div
            className="relative rounded-bl-xl rounded-br-xl h-[375px] overflow-hidden"
            style={{
              background:
                "linear-gradient(333.37deg, #3370FF -19.48%, #000000 96.37%)",
            }}
          >
            <img src="/Frame 1686553781.png" alt="vector" className="object-cover" />
          </div>

          <div className="absolute w-full h-full flex flex-col justify-start items-start gap-6 p-4">
            <div className="bg-white p-8 w-full rounded-t-[16px] z-50 mt-[18rem]">
              {step === "mobile" ? (
                <div className="flex flex-col justify-start items-start gap-2">
                  <h2 className="text-[20px] font-bold text-[#111827]">
                    Login / Sign Up
                  </h2>
                  <p className="text-[13px] text-[#969696] mb-4">
                    Please enter your mobile number to continue.
                  </p>

                  <TextField
                    id="mobile"
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    placeholder="+91XXXXXXXXXX"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    InputLabelProps={{ style: { color: "#4B5563" } }}
                    InputProps={{ style: { borderRadius: "8px" } }}
                    sx={{
                      marginBottom: "16px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#D1D5DB" },
                        "&:hover fieldset": { borderColor: "#3370FF" },
                        "&.Mui-focused fieldset": { borderColor: "#3370FF" },
                      },
                    }}
                  />

                  <button
                    onClick={sendOtp}
                    className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[14px]"
                  >
                    Get Started
                  </button>
                </div>
              ) : step === "otp" ? (
                <>
                  <h2 className="text-[20px] font-bold text-[#111827]">
                    Enter OTP
                  </h2>
                  <p className="text-[13px] text-[#969696] mb-4">
                    We've sent it to +91 {mobile}
                  </p>

                  <p className="text-[12px] text-[#000000] font-semibold leading-[20px] mb-2">
                    6-DIGIT
                  </p>

                  <div className="mb-4" ref={otpContainerRef}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span style={{ width: "4px" }}></span>}
                      renderInput={(props) => (
                        <input
                          {...props}
                          autoComplete="one-time-code"
                          style={{
                            width: "40px",
                            height: "48px",
                            border: "1px solid #D1D5DB",
                            borderRadius: "8px",
                            textAlign: "center",
                            fontSize: "20px",
                            outline: "none",
                            transition: "border-color 0.2s",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#367AFF";
                            e.target.style.boxShadow =
                              "0 0 0 2px rgba(54, 122, 255, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#D1D5DB";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      )}
                      shouldAutoFocus
                      inputType="tel"
                    />
                  </div>

                  <div className="flex justify-between text-[12px] mb-4">
                    <span className="text-black">
                      Didn't get it?{" "}
                      {timer === 0 ? (
                        <button
                          onClick={resendOtp}
                          className="text-[#367AFF] font-medium"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        "Resend OTP"
                      )}
                    </span>
                    <span className="font-medium text-black">
                      {timer > 0 ? `Resend OTP in ${timer}s` : ""}
                    </span>
                  </div>

                  <button
                    className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[18px]"
                    onClick={() => verifyOtp()}
                  >
                    Continue
                  </button>

                  <button
                    className="w-full text-[#367AFF] font-medium text-[14px] mt-2"
                    onClick={() => setStep("mobile")}
                  >
                    Change Mobile Number
                  </button>
                </>
              ) : step === "digio" ? (
                /* ✅ ONLY NEW SECTION ADDED FOR MOBILE - DIGIO STEP */
                <>
                  <h2 className="text-[20px] font-bold text-[#111827]">
                    Digital Signature
                  </h2>
                  <p className="text-[13px] text-[#969696] mb-4">
                    Please complete the digital signature to secure your account.
                  </p>

                  <div className="mb-4">
                    <DigioSigner
                      documentIds={[userDocumentId]}
                      identifier={mobile}
                      environment="sandbox"
                      onSuccess={handleDigioSuccess}
                      onError={handleDigioError}
                      onCancel={handleDigioCancel}
                    />
                  </div>

                  <button
                    className="w-full text-[#367AFF] font-medium text-[12px] underline"
                    onClick={() => proceedWithExistingFlow()}
                  >
                    Skip Digital Signature
                  </button>
                </>
              ) : null}

              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-sm text-gray-400">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              <p className="text-[14px] text-[#969696] text-center">
                Need assistance?{" "}
                <a
                  href="https://api.whatsapp.com/send?phone=918905939199&text=Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F"
                  target="_blank"
                  className="text-[#367AFF] font-medium"
                >
                  Contact Us
                </a>
              </p>

              <div className="flex flex-col justify-center items-center gap-2 mt-6 text-sm text-[#000000]">
                <div className="flex flex-col justify-start items-start gap-4">
                  <a
                    href="tel:+918065919278"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={phonenew} alt="phone" />
                    <span>+91 - 8065919278</span>
                  </a>

                  <a
                    href="mailto:help@stockwiz.in"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={mailnew} alt="mail" />
                    <span>help@stockwiz.in</span>
                  </a>

                  <a
                    href="https://wa.me/918905939199?text=Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={whatsappnew} alt="whatsapp" />
                    <span>+91 - 8905939199</span>
                  </a>
                  <a
                    href="https://wa.me/917850934748?text=Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={whatsappnew} alt="whatsapp" />
                    <span>+91 - 7850934748</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StrykeXDesktopAuth;
