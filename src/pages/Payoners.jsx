import React, { useState, useEffect } from "react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import mainlogo from "../assets/svg/mainlogo.svg";
import vector from "../assets/webp/vector.webp";
import video from "../assets/webp/video2.webp";
import { useNavigate, useSearchParams } from "react-router-dom";
import payoners from "../assets/svg/39381456_9_sh_1_icons_03 1.svg";

const PRODBASEURL = "https://api.stockwiz.in/api/v2";
const LOCALBASEURL = "https://api.stockwiz.in/api/v2";
// Use LOCALBASEURL for development, PRODBASEURL for production
const BASEURL =
  window.location.hostname === "localhost" ? LOCALBASEURL : PRODBASEURL;

const Payoners = () => {
  const [searchParams] = useSearchParams();
  const mobile_number = searchParams.get("mobile_number");
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Load Razorpay script
  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    script.onerror = () => {
      setSnackbar({
        open: true,
        message: "Failed to load payment gateway",
        severity: "error",
      });
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Check if mobile_number is present
  useEffect(() => {
    if (!mobile_number) {
      setSnackbar({
        open: true,
        message: "Mobile number is required",
        severity: "error",
      });
      // Redirect to KYC page if mobile number is missing
      setTimeout(() => {
        navigate("/kyc");
      }, 2000);
    }
  }, [mobile_number, navigate]);

  // Handle payment
  const handlePayment = async () => {
    if (!mobile_number) {
      setSnackbar({
        open: true,
        message: "Mobile number is required",
        severity: "error",
      });
      return;
    }

    if (!razorpayLoaded) {
      setSnackbar({
        open: true,
        message: "Payment gateway is loading, please wait...",
        severity: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      // First API: Create Razorpay order
      const createOrderRes = await fetch(
        `${BASEURL}/razorpay/create-strykex-member-one-rs-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key":
              "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
          },
          body: JSON.stringify({
            mobile_number: mobile_number,
          }),
        }
      );

      const orderData = await createOrderRes.json();

      if (!orderData?.success || !orderData?.data) {
        throw new Error(orderData?.message || "Failed to create payment order");
      }

      const {
        key,
        amount,
        order_id,
        name,
        description,
        prefill,
        image,
        retry,
        send_sms_hash,
      } = orderData.data;

      // Initialize Razorpay checkout
      const options = {
        key: key,
        amount: amount, // Amount in paise
        currency: "INR",
        name: name || "Stockwiz Technologies LLP",
        description: description || "StrykeX Member Registration - Rs 1",
        order_id: order_id,
        image: image,
        prefill: {
          ...(prefill || {}),
          contact: prefill?.contact || mobile_number,
        },
        retry: retry || { enabled: true, max_count: 1 },
        send_sms_hash: send_sms_hash !== undefined ? send_sms_hash : true,
        handler: async function (response) {
          // Payment successful, call second API
          try {
            setLoading(true);

            const savePaymentRes = await fetch(
              `${BASEURL}/razorpay/save-strykex-member-payment-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "api-key":
                    "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  razorpay_order_id: response.razorpay_order_id,
                  mobile_number: mobile_number,
                }),
              }
            );

            const savePaymentData = await savePaymentRes.json();

            if (
              savePaymentData?.code === 200 &&
              savePaymentData?.data?.status === "completed"
            ) {
              setSnackbar({
                open: true,
                message:
                  savePaymentData?.message ||
                  "Payment successful! Redirecting to dashboard...",
                severity: "success",
              });
              // Redirect to dashboard after successful payment
              setTimeout(() => {
                window.location.href = "https://strykex.stockwiz.in/dashboard";
              }, 1500);
            } else {
              throw new Error(
                savePaymentData?.message || "Failed to save payment"
              );
            }
          } catch (err) {
            console.error("Error saving payment:", err);
            setSnackbar({
              open: true,
              message: err?.message || "Payment verification failed",
              severity: "error",
            });
          } finally {
            setLoading(false);
          }
        },
        theme: {
          color: "#407AFF",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setSnackbar({
              open: true,
              message: "Payment cancelled",
              severity: "info",
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (err) {
      console.error("Payment error:", err);
      setSnackbar({
        open: true,
        message: err?.message || "Error processing payment",
        severity: "error",
      });
      setLoading(false);
    }
  };

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

      {/* DESKTOP */}
      <div className="md:flex hidden w-full min-h-screen max-h-screen overflow-hidden p-6 font-inter">
        {/* Left Section - Same as login page */}
        <div
          className="flex flex-col justify-start items-start gap-[40px] flex-1 rounded-[33px] max-h-full w-full p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(333.37deg, #3370FF -19.48%, #000000 96.37%)",
          }}
        >
          <img
            src={vector}
            alt=""
            className="absolute object-cover w-full h-full top-0 left-0 z-0"
          />
          <img
            src={mainlogo}
            alt="Logo"
            className="h-[35px] z-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="font-semibold text-[28px] sm:text-[40px] md:text-[60px] lg:text-[85px] leading-[120%] text-left font-degular text-white z-10">
            Welcome <br /> To The Future <br /> Of{" "}
            <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
              Trading
            </span>
          </p>
          <img
            src={video}
            alt="Video preview"
            className="w-full object-cover rounded-xl z-10"
          />
        </div>

        {/* Right Section - Payment UI */}
        <div className="relative flex flex-1 flex-col justify-center items-center bg-white px-4 sm:px-10 py-8 overflow-y-auto">
          <div className="w-full max-w-[500px] flex flex-col items-center gap-0">
            {/* Payment Illustration */}
            <img src={payoners} alt="payoners" className="object-cover mb-4" />

            {/* Payment Text */}
            <h2 className="font-bold text-[32px] leading-[110%] text-black mb-4 text-center">
              Please Pay ₹1
            </h2>
            <p className="flex flex-col gap-2 font-normal text-[14px] leading-[150%] text-[#404040] text-center mb-4">
              <span className="font-bold text-[20px] text-orange-500">
                Authenticate your account
              </span>
              <span className="font-normal text-sm">
                Get access to pre built algos, strategy builder,<br/> backtest
               terminal and much more.
              </span>
            </p>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full max-w-[400px] bg-[#407AFF] hover:bg-[#367AFF] disabled:bg-[#9CA3AF] text-white font-semibold py-[10px] rounded-[8px] text-[18px] transition-all duration-200 flex items-center justify-center gap-2 mt-0"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} style={{ color: "#fff" }} />
                  <span>Processing...</span>
                </>
              ) : (
                "Pay"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex justify-center items-center w-full h-full">
        <div className="md:hidden flex justify-center items-center relative w-full h-full">
          <div
            className="relative rounded-bl-xl rounded-br-xl h-[375px] overflow-hidden"
            style={{
              background:
                "linear-gradient(333.37deg, #3370FF -19.48%, #000000 96.37%)",
            }}
          >
            <img src={vector} alt="vector" className="object-cover" />
          </div>

          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start gap-6 p-4">
            <img
              onClick={() => navigate("/")}
              src={mainlogo}
              alt="mainlogo"
              className="h-[21px] cursor-pointer"
            />
            <p className="font-semibold text-[38px] leading-[120%] text-left font-degular text-white mt-5">
              Welcome To The Future Of{" "}
              <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
                Trading
              </span>
            </p>

            <div className="bg-white p-6 w-full rounded-t-[16px] z-50 flex flex-col items-center gap-0">
              {/* Payment Illustration */}
              <img
                src={payoners}
                alt="payoners"
                className="object-cover mb-4"
              />

              {/* Payment Text */}
              <h2 className="font-bold text-[32px] leading-[110%] text-black mb-4 text-center">
                Please Pay ₹1
              </h2>
              <p className="flex flex-col gap-2 font-normal text-[14px] leading-[150%] text-[#404040] text-center mb-4">
                <span className="font-bold text-[20px] text-orange-500">
                  Authenticate your account
                </span>
                <span className="font-normal text-sm">
                Get access to pre built algos, strategy builder, backtest terminal and much more.
                </span>
              </p>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full max-w-[400px] bg-[#407AFF] hover:bg-[#367AFF] disabled:bg-[#9CA3AF] text-white font-semibold py-[10px] rounded-[8px] text-[18px] transition-all duration-200 flex items-center justify-center gap-2 mt-0"
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} style={{ color: "#fff" }} />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payoners;
