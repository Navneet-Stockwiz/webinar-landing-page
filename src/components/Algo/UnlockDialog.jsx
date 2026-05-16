import React from "react";
import {
  Dialog,
  DialogActions,
} from "@mui/material";
import newlogo from "../../assets/svg/newlogo.svg";
import backetest from "../../assets/svg/backtest.svg";
import disclouser from "../../assets/svg/disclouser.svg";

const UnlockDialog = ({ open, onClose, onContinue }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "md:p-6 p-4 w-full",
        style: { maxWidth: 480,borderRadius:"12px" },
      }}
    >
      <div className="flex flex-col items-start md:space-y-6 space-y-4 text-left">
        {/* Logo */}
        <img src={newlogo} alt="Logo" className="h-[25px] object-cover" />

        <div className="flex flex-col gap-3">
          {/* Subheading */}
          <p className="font-medium text-[12px] leading-[160%] text-[#00000080] font-inter">
            Before you move ahead
          </p>

          {/* Heading */}
          <p className="font-semibold md:text-[20px] text-[16px] leading-[100%] font-poppins text-black">
            Understand Key Terms
          </p>
        </div>

        {/* Terms Block */}
        <div className="flex flex-col space-y-6 text-sm text-[#4B4B4B]">
          {/* Backtest Info */}
          <div className="flex items-start gap-3">
            <img src={backetest} alt={backetest} />
            <div>
              <p className="font-semibold text-[14px] leading-[100%] font-poppins text-black mb-2">
                Backtest / Live Performance
              </p>
              <p className="font-medium md:text-[11px] text-[10px] md:leading-[150%] leading-[100%] text-[#00000080] font-inter">
                It depicts the backtested or live returns of an algo strategy
                for a particular time period. These returns are not a guarantee
                of future returns or performance and are shown at the request of
                the user.
              </p>
            </div>
          </div>

          {/* Disclosure */}
          <div className="flex items-start gap-3">
          <img src={disclouser} alt={disclouser} />
            <div>
              <p className="font-semibold text-[14px] leading-[100%] font-poppins text-black mb-2">
                Disclosure
              </p>
              <p className="font-medium md:text-[11px] text-[10px] md:leading-[150%] leading-[100%] text-[#00000080] font-inter">
                By proceeding, you understand that investments are subject to
                market risks and agree that returns shown on the platform are
                only for educational purposes and were not used as an
                advertisement or promotion to influence your investment
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button & Disclaimer */}
      <DialogActions className="flex flex-col items-center w-full mt-4 gap-2">
        <button
          onClick={onContinue}
          className="font-semibold text-[14px] leading-[100%] w-full md:py-4 py-3 rounded-lg text-white font-poppins"
          style={{
            background:
              "linear-gradient(141.14deg, #3FADFF 7.75%, #336CDC 49.32%, #47B4B4 91.74%)",
          }}
        >
          Continue
        </button>

        <p className="font-medium text-[10px] leading-[100%] font-inter text-[#00000080] text-center">
          By continuing, you agree to our{" "}
          <span className="text-[#1F7AE0] font-medium underline cursor-pointer">
            Terms & Conditions
          </span>
        </p>
      </DialogActions>
    </Dialog>
  );
};

export default UnlockDialog;
