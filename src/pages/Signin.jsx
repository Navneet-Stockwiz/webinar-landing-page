import React, { useState, useEffect, useRef } from "react";
import { TextField, Snackbar, Alert, CircularProgress } from "@mui/material";
import OtpInput from "react-otp-input";
import mainlogo from "../assets/svg/mainlogo.svg";
import whatsappnew from "../assets/svg/whatsappnew.svg";
import mailnew from "../assets/svg/mailnew.svg";
import phonenew from "../assets/svg/phonenew.svg";
import vector from "../assets/webp/vector.webp";
import video from "../assets/webp/video2.webp";
import { useNavigate } from "react-router-dom";

const PRODBASEURL = "https://api.stockwiz.in/api/v2";
const DEVBASEURL = "https://api.stockwiz.in/api/v2";
const LOCALBASEURL = "http://localhost:8000/api/v2";


const Signin = () => {
  const [step, setStep] = useState("mobile");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [mobile, setMobile] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);

  const navigate = useNavigate();
  const otpContainerRef = useRef(null);
  const mobileRegex = /^(?:\+91)?[6-9]\d{9}$/;

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const match = pasted.match(/\b\d{6}\b/);
    if (match?.[0]) {
      setOtp(match[0]);
      setSnackbar({ open: true, message: "OTP pasted successfully", severity: "success" });
    }
  };

  useEffect(() => {
    if (step === "otp" && "OTPCredential" in window) {
      const abortController = new AbortController();
      navigator.credentials.get({ otp: { transport: ["sms"] }, signal: abortController.signal })
        .then((cred) => {
          if (cred?.code) setOtp(cred.code);
        })
        .catch(() => {});
      return () => abortController.abort();
    }
  }, [step]);

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

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const sendOtp = async () => {
    if (!mobileRegex.test(mobile)) {
      setSnackbar({ open: true, message: "Please enter a valid mobile number", severity: "error" });
      return;
    }
    try {
      await fetch(`${PRODBASEURL}/auth/create-strykex-webpage-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o" },
        body: JSON.stringify({ mobile_number: mobile }),
      });
      
      const res = await fetch(`${PRODBASEURL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o" },
        body: JSON.stringify({ mobile_number: mobile }),
      });
      
      const response = await res.json();
      
      if (response?.status) {
        setStep("otp");
        setTimer(60);
        setOtp("");
        setSnackbar({ open: true, message: "OTP sent successfully", severity: "success" });
      } else {
        setSnackbar({ open: true, message: response?.message || "Failed to send OTP", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Network error while sending OTP", severity: "error" });
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;
    await sendOtp();
  };

  const verifyOtp = async (enteredOtp = otp) => {
    if (enteredOtp.length !== 6) {
      setSnackbar({ open: true, message: "Please enter the complete 6-digit OTP", severity: "error" });
      return;
    }

    try {
      setKycLoading(true);
      
      // 1. Verify OTP
      const verifyRes = await fetch(`${PRODBASEURL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o" },
        body: JSON.stringify({ mobile_number: mobile, otp: enteredOtp }),
      });
      
      const verifyData = await verifyRes.json();
      if (!verifyData?.status) {
        setSnackbar({ open: true, message: verifyData?.message || "OTP verification failed", severity: "error" });
        return;
      }

      // 2. Check premium status
      const accessRes = await fetch(`${PRODBASEURL}/auth/get-strykex-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o" },
        body: JSON.stringify({ mobile_number: mobile }),
      });
      const accessData = await accessRes.json();

      if (!accessData?.status) {
        navigate("/pricing");
        return;
      }

      // 3. Check Dhan mapping
      const dhanRes = await fetch(`${PRODBASEURL}/auth/get-dhan-mapped-user-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o" },
        body: JSON.stringify({ mobileNumber: mobile }),
      });
      const dhanData = await dhanRes.json();

      if (!dhanData?.status) {
        navigate("/getstarted");
        return;
      }

      // 4. Check KYC status
      const kycRes = await fetch(`${PRODBASEURL}/kyc/getStrykexKycStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o" },
        body: JSON.stringify({ mobile_number: mobile }),
      });
      const kycData = await kycRes.json();

      if (kycData?.status && kycData?.data === true) {
        window.location.href = "https://strykex.stockwiz.in/home";
      } else {
        setShowKYCModal(true);
      }
      
    } catch (err) {
      setSnackbar({ open: true, message: "Network error during verification", severity: "error" });
    } finally {
      setKycLoading(false);
    }
  };

  const handleKYCSuccess = () => {
    window.location.href = "https://strykex.stockwiz.in/home";
  };

  const handleKYCError = (error) => {
    setSnackbar({ open: true, message: error.message || "KYC process failed", severity: "error" });
    setShowKYCModal(false);
  };
  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>




      {kycLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <CircularProgress style={{ color: '#367AFF' }} />
        </div>
      )}


      {/* DESKTOP */}
      <div className="md:flex hidden w/full min-h-screen max-h-screen overflow-hidden p-6 font-inter">
        <div
          className="flex flex-col justify-start items-start gap-[40px] flex-1 rounded-[33px] max-h-full w-full p-6 relative overflow-hidden"
          style={{ background: "linear-gradient(333.37deg, #3370FF -19.48%, #000000 96.37%)" }}
        >
          <img src={vector} alt="" className="absolute object-cover w-full h-full top-0 left-0 z-0" />
          <img src={mainlogo} alt="Logo" className="h-[35px] z-10 cursor-pointer" onClick={() => navigate("/")} />
          <p className="font-semibold text-[28px] sm:text-[40px] md:text-[60px] lg:text-[85px] leading-[120%] text-left font-degular text-white z-10">
            Welcome <br /> To The Future <br /> Of{" "}
            <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
              Trading
            </span>
          </p>
          <img src={video} alt="Video preview" className="w-full object-cover rounded-xl z-10" />
        </div>


        <div className="relative flex flex-1 flex-col justify-center items-center bg-white px-4 sm:px-10 py-8 overflow-y-auto">
          <div className="w-full max-w-[400px]">
            {step === "mobile" ? (
              <>
                <h2 className="text-[40px] font-bold text-[#111827]">Login / Sign Up</h2>
                <p className="text-[18px] text-[#969696] mb-6">Please enter your mobile number to continue.</p>


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


                <button onClick={sendOtp} className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[18px]">
                  Get Started
                </button>
              </>
            ) : (
              <>
                <h2 className="text-[40px] font-bold text-[#111827]">Enter OTP</h2>
                <p className="text-[18px] text-[#969696] mb-6">We've sent it to {mobile}</p>
                <p className="text-[14px] text-[#000000] font-semibold leading-[20px] mb-2">6-DIGIT</p>


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
                          e.target.style.boxShadow = "0 0 0 2px rgba(54, 122, 255, 0.2)";
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
                      <button onClick={resendOtp} className="text-[#367AFF] font-medium">
                        Resend OTP
                      </button>
                    ) : (
                      "Resend OTP"
                    )}
                  </span>
                  <span className="text-[14px] text-[#000000] font-medium leading-[20px]">{timer > 0 ? `Resend OTP in ${timer}s` : ""}</span>
                </div>


                <button onClick={() => verifyOtp()} className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[18px]">
                  Continue
                </button>
                <button className="w-full text-[#367AFF] font-medium text-[14px] mt-2" onClick={() => setStep("mobile")}>
                  Change Mobile Number
                </button>
              </>
            )}


            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-sm text-gray-400">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>


            <p className="text-[18px] text-[#969696] text-center">
              Need assistance?{" "}
              <a href="https://api.whatsapp.com/send?phone=916350670245&text=I%20need%20assistance%20with%20StrykeX%2C%20please%20connect%20me%20to%20the%20support%20team" target="_blank" className="text-[#367AFF] font-medium" rel="noreferrer">
                Contact Us
              </a>
            </p>
          </div>


          <div className="absolute bottom-0 flex flex-wrap justify-center gap-4 items-center text-xs text-gray-500 mb-4">
            <a href="tel:+917850934748" className="flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              <span>
                <img src={phonenew} alt="phone" />
              </span>
              <span className="text-[14px] text-[#000000] font-normal leading-[150%]">+91-7850934748</span>
            </a>


            <a href="mailto:help@stockwiz.in" className="flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              <span>
                <img src={mailnew} alt="mail" />
              </span>
              <span className="text-[14px] text-[#000000] font-normal leading-[150%]">help@stockwiz.in</span>
            </a>


            <a href="https://wa.me/+916350670245" className="flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              <span>
                <img src={whatsappnew} alt="whatsapp" />
              </span>
              <span className="text-[14px] text-[#000000] font-normal leading-[150%]">+91-6350670245</span>
            </a>
          </div>
        </div>
      </div>


      {/* MOBILE */}
      <div className="flex justify-center items-center w-full h-full">
        <div className="md:hidden flex justify-center items-center relative w-full h-full">
          <div className="relative rounded-bl-xl rounded-br-xl h-[375px] overflow-hidden" style={{ background: "linear-gradient(333.37deg, #3370FF -19.48%, #000000 96.37%)" }}>
            <img src={vector} alt="vector" className="object-cover" />
          </div>


          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start gap-6 p-4">
            <img onClick={() => navigate("/")} src={mainlogo} alt="mainlogo" className="h-[21px] cursor-pointer" />
            <p className="font-semibold text-[38px] leading-[120%] text-left font-degular text-white mt-5">
              Welcome To The Future Of{" "}
              <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">Trading</span>
            </p>


            <div className="bg-white p-4 w-full rounded-t-[16px] z-50">
              {step === "mobile" ? (
                <div className="flex flex-col justify-start items-start gap-2">
                  <h2 className="text-[20px] font-bold text-[#111827]">Login / Sign Up</h2>
                  <p className="text-[13px] text-[#969696] mb-4">Please enter your mobile number to continue.</p>


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


                  <button onClick={sendOtp} className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[14px]">
                    Get Started
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-[20px] font-bold text-[#111827]">Enter OTP</h2>
                  <p className="text-[13px] text-[#969696] mb-4">We've sent it to +91 {mobile}</p>
                  <p className="text-[12px] text-[#000000] font-semibold leading-[20px] mb-2">6-DIGIT</p>


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
                            e.target.style.boxShadow = "0 0 0 2px rgba(54, 122, 255, 0.2)";
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
                      Didn't get it? {timer === 0 ? <button onClick={resendOtp} className="text-[#367AFF] font-medium">Resend OTP</button> : "Resend OTP"}
                    </span>
                    <span className="font-medium text-black">{timer > 0 ? `Resend OTP in ${timer}s` : ""}</span>
                  </div>


                  <button className="w-full bg-[#367AFF] hover:bg-[#1F50CC] text-white font-semibold py-3 rounded-lg text-[18px]" onClick={() => verifyOtp()}>
                    Continue
                  </button>


                  <button className="w-full text-[#367AFF] font-medium text-[14px] mt-2" onClick={() => setStep("mobile")}>
                    Change Mobile Number
                  </button>
                </>
              )}


              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-sm text-gray-400">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>


              <p className="text-[14px] text-[#969696] text-center">
                Need assistance?{" "}
                <a href="https://api.whatsapp.com/send?phone=916350670245&text=I%20need%20assistance%20with%20StrykeX%2C%20please%20connect%20me%20to%20the%20support%20team" target="_blank" className="text-[#367AFF] font-medium" rel="noreferrer">
                  Contact Us
                </a>
              </p>


              <div className="flex flex-col justify-center items-center gap-2 mt-6 text-sm text-[#000000]">
                <div className="flex flex-col justify-start items-start gap-4">
                  <a href="tel:+917850934748" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    <img src={phonenew} alt="phone" />
                    <span>+91-7850934748</span>
                  </a>
                  <a href="mailto:help@stockwiz.in" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    <img src={mailnew} alt="mail" />
                    <span>help@stockwiz.in</span>
                  </a>
                  <a href="https://wa.me/+916350670245" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappnew} alt="whatsapp" />
                    <span>+91-6350670245</span>
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


export default Signin;