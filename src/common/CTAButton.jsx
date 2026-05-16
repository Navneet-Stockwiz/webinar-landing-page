import React, { useState } from "react";
import { motion } from "framer-motion";
import buttonarrow from "../assets/svg/buttonarrow.svg";
import buttonarrow1 from "../assets/svg/buttonarrow1.svg";
import { useWebinar } from "../contexts/WebinarContext";
import { useLanguage } from "../contexts/LanguageContext";
import StrykeXPopupDialog from "../components/StrykeXPopupDialog";

const CTAButton = ({ compact = false }) => {
  const { webinarData } = useWebinar();
  const { selectedLanguage, selectLanguage, clearLanguage } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleButtonClick = (language) => {
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
      {/* Temporarily hidden Hindi Button - keeping code for later reuse */}
      {/*
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
          ></motion.div>
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
          ></motion.div>
          <motion.button
            onClick={() => {
              handleButtonClick("hindi");
            }}
            className="relative font-degular bg-white text-black text-[20px] md:text-[23px] leading-[21px] md:leading-[22px] font-semibold rounded-full p-2 md:pl-6 flex items-center justify-center md:justify-start gap-2 md:gap-3 transition-all w-[345px] md:w-auto h-[45px] md:h-auto"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 32px rgba(76, 115, 255, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            Join Now (Hindi) - Free{" "}
            <span className="text-[#000000BF] text-[14px] font-medium line-through">₹499</span>
            <motion.div
              className="hidden md:flex items-center justify-center"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-black h-[45px] w-[45px] rounded-full flex items-center justify-center">
                <img src={buttonarrow} alt="arrow" />
              </div>
            </motion.div>
          </motion.button>
        </motion.div>
        <span className="font-medium text-[16px] leading-[28px] text-white text-center mt-2 hidden md:block">
          (Hurry Up! Limited Seats Only)
        </span>
      </div>
      */}

      {/* English Button */}
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
          ></motion.div>
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
          ></motion.div>
          <motion.button
            onClick={() => {
              handleButtonClick("english");
            }}
            className="relative font-degular bg-white border-[1px] border-[#000000] text-black text-[20px] md:text-[23px] leading-[21px] md:leading-[22px] font-semibold rounded-full p-2 md:pl-6 flex items-center justify-center md:justify-start gap-2 md:gap-3 transition-all w-[345px] md:w-auto h-[45px] md:h-auto"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 32px rgba(76, 115, 255, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            Join Now ({compact ? "English" : "Register Now"}) - Free{" "}
            <span className="text-[#000000BF] text-[14px] font-medium line-through">₹499</span>
            <motion.div
              className="hidden md:flex items-center justify-center"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-black h-[45px] w-[45px] rounded-full flex items-center justify-center">
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

      {/* Dialog Component */}
      <StrykeXPopupDialog
        open={showDialog}
        onClose={handleDialogClose}
        onSuccess={handleDialogSuccess}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
};

export default CTAButton;
