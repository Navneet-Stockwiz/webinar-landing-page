
import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextField, Snackbar, Alert, CircularProgress } from "@mui/material";
import OtpInput from "react-otp-input";
import whatsappnew from "../assets/svg/whatsappnew.svg";
import mailnew from "../assets/svg/mailnew.svg";
import phonenew from "../assets/svg/phonenew.svg";

const PRODBASEURL = "https://api.stockwiz.in/api/v2";
const LOCALBASEURL = "http://localhost:8000/api/v2";

const StrykeXDesktopAuth = () => {
  const [step, setStep] = useState("mobile");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Inline KYC (no popup) for both desktop and mobile
  const [showKYCInline, setShowKYCInline] = useState(false);
  const [mobileForKyc, setMobileForKyc] = useState("");
  const [kycLoading, setKycLoading] = useState(false);
  const [kycData, setKycData] = useState(null);
  const [kycError, setKycError] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const otpContainerRef = useRef(null);
  const mobileRegex = /^(?:\+91)?[6-9]\d{9}$/;

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOTPPaste = useCallback((e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const match = pasted.match(/\b\d{6}\b/);
    if (match?.[0]) {
      setOtp(match);
      setSnackbar({
        open: true,
        message: "OTP pasted successfully",
        severity: "success",
      });
    }
  }, []);

  useEffect(() => {
    if (step === "otp" && otpContainerRef.current) {
      const el = otpContainerRef.current;
      el.addEventListener("paste", handleOTPPaste);
      return () => el.removeEventListener("paste", handleOTPPaste);
    }
  }, [step, handleOTPPaste]);

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [step, timer]);

  useEffect(() => {
    if (otp.length === 6) verifyOtp(otp);
  }, [otp]);

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
      setIsLoading(true);

      const res = await fetch(`${PRODBASEURL}/auth/send-otp`, {
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
        try {
          localStorage.setItem("strykeX_mobile", mobile.replace(/^\+91/, ""));
        } catch {}
      } else {
        setSnackbar({
          open: true,
          message: response?.message || "Failed to send OTP",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error while sending OTP",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;
    await sendOtp();
  };

  const verifyOtp = async (enteredOtp = otp) => {
    if (enteredOtp.length !== 6) {
      setSnackbar({
        open: true,
        message: "Please enter the complete 6-digit OTP",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      // 1) Verify OTP
      const verifyRes = await fetch(`${PRODBASEURL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
        },
        body: JSON.stringify({ mobile_number: mobile, otp: enteredOtp }),
      });

      const data = await verifyRes.json();

      if (!data?.status) {
        setSnackbar({
          open: true,
          message: data?.message || "OTP verification failed",
          severity: "error",
        });
        return;
      }

      // 2) Check KYC status immediately after OTP success
      const kycRes = await fetch(`${PRODBASEURL}/kyc/getStrykexKycStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
        },
        body: JSON.stringify({ mobile_number: mobile }),
      });

      const kycData = await kycRes.json();

      if (kycData?.status && kycData?.data === true) {
        // KYC complete → go home
        window.location.href = "https://strykex.stockwiz.in/dashboard";
        return;
      }

      // 3) KYC not complete → show inline KYC pane and initialize KYC
      const normalized = mobile.replace(/^\+91/, "");
      setMobileForKyc(normalized);
      setShowKYCInline(true); // this renders your inline KYC UI (desktop/mobile)
      await initializeKYC(normalized);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Network error during OTP verification",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Inline KYC init (same as modal logic)
  const initializeKYC = async (m) => {
    setKycLoading(true);
    setKycError(null);
    try {
      const res = await fetch(`${PRODBASEURL}/kyc/initiateStrykexKYCRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
        },
        body: JSON.stringify({ mobile_number: m }),
      });
      const data = await res.json();
      if (!data?.status)
        throw new Error(data?.message || "Failed to initiate KYC");
      setKycData(data.data);
    } catch (err) {
      setKycError(err.message);
      setSnackbar({
        open: true,
        message: err.message || "Failed to initiate KYC",
        severity: "error",
      });
    } finally {
      setKycLoading(false);
    }
  };



  const proceedToApp = () => {
    window.location.href = "https://strykex.stockwiz.in/home";
  };

  // Reusable Inline KYC panel (desktop look)
  const InlineKYCPanel = () => (
    <div className="relative flex flex-1 flex-col justify-center items-center bg-white px-4 sm:px-10 py-8 overflow-y-auto">
      <div className="w-full max-w-[430px]">
        <div className="w-full flex items-center justify-center mb-4">
          <img
            src="/kyc_logo.png"
            alt="KYC"
            className="h-[189px] w-[286px]"
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2 className="text-center text-[22px] font-extrabold text-gray-900 mb-2">
          Complete Your KYC
        </h2>
        <p className="text-center text-gray-600 text-sm leading-relaxed mx-3 mb-5">
          As per SEBI Guidelines and The Prevention of Money Laundering Act
          (PMLA) 2002, completing KYC is mandatory for all users to access our
          services.
        </p>
        {kycLoading && (
          <div className="flex items-center justify-center gap-2 pb-4">
            <CircularProgress size={20} />
            <span className="text-gray-700 text-sm">Preparing KYC…</span>
          </div>
        )}
        {kycError && (
          <div className="text-red-700 bg-red-100 border border-red-200 rounded-lg py-2.5 px-3 text-sm text-center mb-3">
            {kycError}
          </div>
        )}
        <button
          onClick={handleProceedESign}
          disabled={kycLoading || !kycData?.id || !kycData?.access_token}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-base shadow-md
            ${
              kycLoading || !kycData?.id || !kycData?.access_token
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-[#2563EB] hover:bg-[#1D4ED8]"
            }`}
        >
          Proceed to eSign
        </button>
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="text-center">
          <span className="text-gray-500 text-sm">
            Need assistance?{" "}
            <button
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=917850934748&text=I%20need%20assistance%20with%20StrykeX%20KYC,%20please%20connect%20me%20to%20the%20support%20team",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="ml-1 text-[#2563EB] font-semibold bg-transparent border-none cursor-pointer underline underline-offset-2"
            >
              Contact Us
            </button>
          </span>
        </div>
      </div>
    </div>
  );

  // Mobile-optimized Inline KYC Panel (same functionality, mobile spacing)
  const InlineKYCPanelMobile = () => (
    <div className="bg-white p-8 w-full rounded-t-[16px] z-50">
      <div className="w-full flex items-center justify-center mb-4">
        <img
          src="/kyc_logo.png"
          alt="KYC"
          className="h-[160px] w-auto"
          style={{ objectFit: "contain" }}
        />
      </div>
      <h2 className="text-center text-[20px] font-extrabold text-gray-900 mb-2">
        Complete Your KYC
      </h2>
      <p className="text-center text-gray-600 text-sm leading-relaxed mx-3 mb-5">
        As per SEBI Guidelines and The Prevention of Money Laundering Act (PMLA)
        2002, completing KYC is mandatory for all users to access our services.
      </p>
      {kycLoading && (
        <div className="flex items-center justify-center gap-2 pb-4">
          <CircularProgress size={20} />
          <span className="text-gray-700 text-sm">Preparing KYC…</span>
        </div>
      )}
      {kycError && (
        <div className="text-red-700 bg-red-100 border border-red-200 rounded-lg py-2.5 px-3 text-sm text-center mb-3">
          {kycError}
        </div>
      )}
      <button
        onClick={handleProceedESign}
        disabled={kycLoading || !kycData?.id || !kycData?.access_token}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-base shadow-md
          ${
            kycLoading || !kycData?.id || !kycData?.access_token
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-[#2563EB] hover:bg-[#1D4ED8]"
          }`}
      >
        Proceed to eSign
      </button>
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-xs">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="text-center">
        <span className="text-gray-500 text-sm">
          Need assistance?{" "}
          <button
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send?phone=917850934748&text=I%20need%20assistance%20with%20StrykeX%20KYC,%20please%20connect%20me%20to%20the%20support%20team",
                "_blank",
                "noopener,noreferrer"
              )
            }
            className="ml-1 text-[#2563EB] font-semibold bg-transparent border-none cursor-pointer underline underline-offset-2"
          >
            Contact Us
          </button>
        </span>
      </div>

    </div>
  );

  return (
    <>
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

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress style={{ color: "#367AFF" }} />
        </div>
      )}

      {/* DESKTOP VERSION */}
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

        {/* Right: OTP or Inline KYC */}
        {showKYCInline ? (
          <InlineKYCPanel />
        ) : (
          <div className="relative flex flex-1 flex-col justify-center items-center bg-white px-4 sm:px-10 py-8 overflow-y-auto">
            <div className="w-full max-w-[400px]">
              {step === "mobile" ? (
                <>
                  <h2 className="text-[40px] font-bold text-[#111827]">
                    Complete KYC Process
                  </h2>
                  <p className="text-[18px] text-[#969696] mb-6">
                    Enter your details to begin secure digital verification.
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
                    disabled={isLoading}
                    className="w-full bg-[#367AFF] hover:bg-[#1F50CC] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg text-[18px] flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
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
                    disabled={isLoading}
                    className="w-full bg-[#367AFF] hover:bg-[#1F50CC] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg text-[18px] flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                  <button
                    className="w-full text-[#367AFF] font-medium text-[14px] mt-2"
                    onClick={() => setStep("mobile")}
                  >
                    Change Mobile Number
                  </button>
                </>
              ) : null}
              <div className="flex items-center my-6">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-sm text-gray-400">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <p className="text-[18px] text-[#969696] text-center">
                Need assistance?{" "}
                <a
                  href="https://api.whatsapp.com/send?phone=916350670245&text=I%20need%20assistance%20with%20StrykeX%2C%20please%20connect%20me%20to%20the%20support%20team"
                  target="_blank"
                  className="text-[#367AFF] font-medium"
                  rel="noreferrer"
                >
                  Contact Us
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE VERSION (now inline KYC too) */}
      <div className="md:hidden flex justify-center items-center relative w-full h-full">
        <div
          className="relative rounded-bl-xl rounded-br-xl h-[375px] overflow-hidden"
          style={{
            background:
              "linear-gradient(333.37deg, #3370FF -19.48%, #000000 96.37%)",
          }}
        >
          <img
            src="/Frame 1686553781.png"
            alt="vector"
            className="object-cover"
          />
        </div>

        <div className="absolute w-full h-full flex flex-col justify-start items-start gap-6 p-4">
          {/* If KYC inline is on, show the mobile KYC panel, else show the mobile OTP flow */}
          {showKYCInline ? (
            <InlineKYCPanelMobile />
          ) : (
            <div className="bg-white p-8 w-full rounded-t-[16px] z-50 mt-[18rem]">
              {step === "mobile" ? (
                <div className="flex flex-col justify-start items-start gap-2">
                  <h2 className="text-[20px] font-bold text-[#111827]">
                    Complete KYC Process
                  </h2>
                  <p className="text-[13px] text-[#969696] mb-4">
                    Enter your details to begin secure digital verification.
                  </p>
                  <TextField
                    id="mobile-mobile"
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
                    disabled={isLoading}
                    className="w-full bg-[#367AFF] hover:bg-[#1F50CC] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg text-[14px] flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              ) : step === "otp" ? (
                <>
                  <h2 className="text-[20px] font-bold text-[#111827]">
                    Enter OTP
                  </h2>
                  <p className="text-[13px] text-[#969696] mb-4">
                    We've sent it to {mobile}
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
                    onClick={() => verifyOtp()}
                    disabled={isLoading}
                    className="w-full bg-[#367AFF] hover:bg-[#1F50CC] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg text-[14px] flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                  <button
                    className="w-full text-[#367AFF] font-medium text-[12px] mt-2"
                    onClick={() => setStep("mobile")}
                  >
                    Change Mobile Number
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
                  href="https://api.whatsapp.com/send?phone=916350670245&text=I%20need%20assistance%20with%20StrykeX%2C%20please%20connect%20me%20to%20the%20support%20team"
                  target="_blank"
                  className="text-[#367AFF] font-medium"
                  rel="noreferrer"
                >
                  Contact Us
                </a>
              </p>

              <div className="flex flex-col justify-center items-center gap-2 mt-6 text-sm text-[#000000]">
                <div className="flex flex-col justify-start items-start gap-4">
                  <a
                    href="tel:+917850934748"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={phonenew} alt="phone" />
                    <span>+91-7850934748</span>
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
                    href="https://wa.me/+916350670245"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={whatsappnew} alt="whatsapp" />
                    <span>+91-6350670245</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StrykeXDesktopAuth;
