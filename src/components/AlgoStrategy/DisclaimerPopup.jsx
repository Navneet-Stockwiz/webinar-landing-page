import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import strykexblack from "../../assets/svg/strykexblack.svg";
import disclousureicon from "../../assets/svg/disclousureicon.svg";
import backtestnewicon from "../../assets/svg/backtestnewicon.svg";

const DisclaimerPopup = ({ open, onContinue, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      {/* Wrapper for left aligned content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3 }, // reduced gap on mobile
          px: 3,
          pt: 3,
        }}
      >
        {/* Logo */}
        <div className="flex justify-start items-start">
          <img src={strykexblack} alt="StrykeX" className="h-[24px]" />
        </div>

        {/* Content */}
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 }, // reduced gap on mobile
          }}
        >
          {/* Heading */}
          <div className="flex flex-col gap-1">
            <p className="font-medium text-[12px] leading-[160%] text-[#00000080]">
              Before you move ahead
            </p>
            <p className="font-semibold text-[20px] leading-[100%]">
              Understand Key Terms
            </p>
          </div>

          {/* Backtest / Live Performance */}
          <div className="flex gap-3">
            <img
              src={backtestnewicon}
              alt="Backtest Icon"
              className="md:h-10 h-6 md:w-10 w-6"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[14px] leading-[100%]">
                Backtest / Live Performance
              </p>
              <p className="font-medium text-[11px] leading-[150%] text-[#00000080]">
                It depicts the backtested or live returns of a algo strategy for
                a particular time period. These returns are not a guarantee of
                future returns or performance and are shown at the request of
                the user.
              </p>
            </div>
          </div>

          {/* Disclosure */}
          <div className="flex gap-3">
            <img
              src={disclousureicon}
              alt="Disclosure Icon"
              className="md:h-10 h-6 md:w-10 w-6"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[14px] leading-[100%]">
                Disclosure
              </p>
              <p className="font-medium text-[11px] leading-[150%] text-[#00000080]">
                By proceeding, you understand that investments are subject to
                market risks and agree that returns shown on the platform are
                only for educational purposes and were not used as an
                advertisement or promotion to influence your investment
                decisions.
              </p>
            </div>
          </div>
        </DialogContent>
      </Box>

      {/* Footer - Centered */}
      <DialogActions
        sx={{
          flexDirection: "column",
          alignItems: "center",
          px: 3,
          pt: { xs: 2, sm: 3 },
          pb: 3,
          gap: { xs: 1, sm: 1.5 }, // less gap on mobile
        }}
      >
        <Button
          onClick={onContinue}
          variant="contained"
          sx={{
            backgroundColor: "#407AFF",
            "&:hover": { backgroundColor: "#2F64E1" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            py: { xs: 1, sm: 1.5 }, // reduced height on mobile
            fontSize: { xs: "14px", sm: "16px" },
            width: "100%", // always full width
          }}
        >
          Continue
        </Button>
        <p className="font-medium text-[10px] leading-[150%] text-center">
          By continuing, you agree to our{" "}
          <span
            style={{
              color: "#1F7AE0",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Terms & Conditions
          </span>
        </p>
      </DialogActions>
    </Dialog>
  );
};

export default DisclaimerPopup;
