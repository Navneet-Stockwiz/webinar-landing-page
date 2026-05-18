import React, { useState } from "react";
import { motion } from "framer-motion";
import buttonarrow from "../assets/svg/buttonarrow.svg";
import { useLanguage } from "../contexts/LanguageContext";
import { useLandingVariant } from "../contexts/LandingVariantContext.jsx";
import StrykeXPopupDialog from "../components/StrykeXPopupDialog";
import StrykexPaymentDialog from "../components/StrykexPaymentDialog";

const CTAButton = ({ compact = false }) => {
  const { selectedLanguage, selectLanguage, clearLanguage } = useLanguage();
  const { isPaid } = useLandingVariant();
  const [showDialog, setShowDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleButtonClick = (language) => {
    if (isPaid) {
      selectLanguage(language);
      setShowPaymentDialog(true);
      return;
    }
    selectLanguage(language);
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setPendingAction(null);
    clearLanguage();
  };

  const handleDialogSuccess = () => {
    if (pendingAction) {
      pendingAction();
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 ${compact ? "mt-0" : "md:flex-row md:items-start md:gap-8 mt-0 md:mt-8"}`}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute -top-0 -left-1 w-[90%] h-[40px] rounded-full blur-[15px]"
            style={{
              background: "rgba(76, 115, 255, 0.73)",
              backdropFilter: "blur(21.669902801513672px)",
            }}
            animate={{
              opacity: [0.7, 0.9, 0.7],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-0 -right-1 w-[90%] h-[40px] rounded-full blur-[15px]"
            style={{
              background:
                "linear-gradient(272.87deg, rgba(76, 115, 255, 0.73) 4.62%, rgba(0, 162, 183, 0.73) 95.32%)",
              backdropFilter: "blur(8px)",
            }}
            animate={{
              opacity: [0.7, 0.9, 0.7],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.button
            onClick={() => handleButtonClick("english")}
            className="relative font-degular bg-white border-[1px] border-[#000000] text-black text-[18px] md:text-[20px] leading-[21px] md:leading-[22px] font-semibold rounded-full px-3 py-1.5 md:px-4 md:py-2 md:pr-2 flex items-center justify-center md:justify-start gap-2 md:gap-2.5 transition-all w-[345px] md:w-auto"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 32px rgba(76, 115, 255, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            Join Now ({compact ? "English" : "Register Now"}) -{" "}
            {isPaid ? (
              <>
                <span className="inline-flex items-baseline">
                  <span className="text-[16px]">₹</span>
                  <span>199</span>
                </span>{" "}
                <span className="text-[#000000BF] text-[14px] font-medium line-through inline-flex items-baseline">
                  <span className="text-[12px]">₹</span>
                  <span>499</span>
                </span>
              </>
            ) : (
              <>
                Free{" "}
                <span className="text-[#000000BF] text-[14px] font-medium line-through">
                  ₹499
                </span>
              </>
            )}
            <motion.div
              className="hidden md:flex items-center justify-center"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-black h-[36px] w-[36px] md:h-[40px] md:w-[40px] rounded-full flex items-center justify-center shrink-0">
                <img src={buttonarrow} alt="arrow" />
              </div>
            </motion.div>
          </motion.button>
        </motion.div>
        {!compact && (
          <span className="font-medium text-[16px] leading-[28px] text-white text-center mt-2">
            (Hurry Up! Limited Seats Only)
          </span>
        )}
      </div>

      {!isPaid && (
        <StrykeXPopupDialog
          open={showDialog}
          onClose={handleDialogClose}
          onSuccess={handleDialogSuccess}
          selectedLanguage={selectedLanguage}
        />
      )}

      {isPaid && (
        <StrykexPaymentDialog
          open={showPaymentDialog}
          selectedLanguage={selectedLanguage}
          handleClose={() => {
            setShowPaymentDialog(false);
            clearLanguage();
          }}
        />
      )}
    </div>
  );
};

export default CTAButton;
