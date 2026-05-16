
// inside DigioKYCModal
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DigioSigner from "./DigioSigner";

const PRODBASEURL = "https://api.stockwiz.in/api/v2";
const LOCALBASEURL = "http://localhost:8000/api/v2";

const DigioKYCModal = ({
  mobileNumber,
  open,
  onClose,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [kycData, setKycData] = useState(null);
  const [error, setError] = useState(null);
  const signerRef = useRef(null);

  useEffect(() => {
    if (open && mobileNumber) initializeKYC();
  }, [open, mobileNumber]);

  const initializeKYC = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${PRODBASEURL}/kyc/initiateStrykexKYCRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
        },
        body: JSON.stringify({ mobile_number: mobileNumber }),
      });
      const data = await res.json();
      if (!data?.status)
        throw new Error(data?.message || "Failed to initiate KYC");
      setKycData(data.data);
    } catch (err) {
      setError(err.message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };


  const handleDigioSuccess = async () => {
    try {
      const updateRes = await fetch(
        `${PRODBASEURL}/kyc/updateStrykexKycStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "api-key":
              "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
          },
          body: JSON.stringify({ mobile_number: mobileNumber }),
        }
      );
      const verifyData = await updateRes.json();

      if (verifyData?.status) {
        // Fetch latest after update
        const finalDetailsRes = await fetch(
          `${PRODBASEURL}/kyc/getStrykexKycRequestDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key":
                "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o",
            },
            body: JSON.stringify({ mobile_number: mobileNumber }),
          }
        );
        const finalDetailsData = await finalDetailsRes.json();
        if (finalDetailsData?.status) {
          onSuccess?.(finalDetailsData.data);
        } else {
          onSuccess?.(verifyData.data);
        }
      } else {
        throw new Error(verifyData?.message || "KYC update failed");
      }
    } catch (err) {
      onError?.(err);
    }
  };

  const handleProceed = () => {
    // Trigger Digio from a user gesture for popup safety
    signerRef.current?.open();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          },
        }}
        BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.5)" } }}
      >
        <DialogContent
          sx={{ p: 0, position: "relative", backgroundColor: "#fff" }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              "&:hover": { backgroundColor: "#f8f9fa" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <div className="p-6">
            {/* Top illustration from public folder */}
            <div className="w-full flex items-center justify-center mb-4">
              <img
                src="/kyc_logo.png"
                alt="KYC"
                className="h-[189px] w-[286px]"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Title */}
            <h2 className="text-center text-[22px] font-extrabold text-gray-900 mb-2">
              Complete Your KYC
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600 text-sm leading-relaxed mx-3 mb-5">
              As per SEBI Guidelines and The Prevention of Money Laundering Act
              (PMLA) 2002, completing KYC is mandatory for all users to access
              our services.
            </p>

            {/* Loading / Error */}
            {loading && (
              <div className="flex items-center justify-center gap-2 pb-4">
                <CircularProgress size={20} />
                <span className="text-gray-700 text-sm">Preparing KYC…</span>
              </div>
            )}
            {error && (
              <div className="text-red-700 bg-red-100 border border-red-200 rounded-lg py-2.5 px-3 text-sm text-center mb-3">
                {error}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleProceed}
              disabled={loading || !kycData?.id || !kycData?.access_token}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-base shadow-md
                ${
                  loading || !kycData?.id || !kycData?.access_token
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-[#2563EB] hover:bg-[#1D4ED8]"
                }`}
            >
              Proceed to eSign
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Footer link */}
            <div className="text-center">
              <span className="text-gray-500 text-sm">
                Need assistance?
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
        </DialogContent>
      </Dialog>

      {/* Mount DigioSigner so it can initialize; hidden container */}
      {kycData && (
        <div style={{ height: 0, overflow: "hidden" }}>
          <DigioSigner
            ref={signerRef}
            documentIds={[kycData.id]}
            identifier={mobileNumber}
            environment="production"
            accessToken={kycData.access_token?.id ?? kycData.access_token}
            onSuccess={handleDigioSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      )}
    </>
  );
};

export default DigioKYCModal;
