import React, { useEffect, useState } from "react";
import logofooter from "../assets/svg/logofooter.svg";
import verified from "../assets/svg/verified2.svg";
import whatsapp1 from "../assets/svg/whatsapp1.svg";
import hour from "../assets/svg/hour.svg";
import call from "../assets/svg/call.svg";
import email from "../assets/svg/email.svg";
import facebook from "../assets/svg/facebook1.svg";
import twitter from "../assets/svg/twitter.svg";
import instagram from "../assets/svg/instagram.svg";
import youtube from "../assets/svg/youtube.svg";
import linkedin from "../assets/svg/linkedin.svg";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import { useWebinar } from "../contexts/WebinarContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  getFormattedWebinarDates,
  getFormattedWebinarDatesDesktop,
} from "../utils/dateFormatter";
import StrykeXPopupDialog from "./StrykeXPopupDialog";

const Footer = () => {
  const [isIphone, setIsIphone] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const { webinarData } = useWebinar();
  const { selectedLanguage, selectLanguage, clearLanguage } = useLanguage();

  // Get formatted dates for both English and Hindi webinars
  const formattedDates = getFormattedWebinarDates(webinarData);
  const formattedDatesDesktop = getFormattedWebinarDatesDesktop(webinarData);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setIsIphone(true);
    }
  }, []);

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
    <footer
      className={`bg-[#010611] pt-20  ${isIphone ? "pb-40" : "pb-32"} relative`}
    >
      <div className="px-4">
        <div className="flex flex-col justify-center items-center rounded-[24px] bg-[#2323234D] w-full z-20 relative overflow-hidden">
          <div className="flex md:flex-row rounded-[24px]  flex-col md:justify-between md:items-center items-start  md:px-32  md:py-6 py-6 px-6 w-full relative  md:gap-2 gap-4  before:absolute before:inset-0 before:rounded-full before:border-b-[1px] before:border-transparent before:[border-image-source:linear-gradient(270.82deg,rgba(255,255,255,0.1)_2.68%,#ffffff_33.24%,rgba(255,255,255,0.1)_99.29%)] before:[border-image-slice:1] before:pointer-events-none">
            <AnimateFromInside>
              <div className="flex flex-col justify-start items-start gap-4">
                <div className="flex flex-col justify-start items-start w-full gap-4">
                  <div className="flex md:justify-start justify-center md:items-start items-center w-full">
                    <img
                      className="object-cover"
                      src={logofooter}
                      alt="logofooter"
                    />
                  </div>
                  <p className="md:block hidden font-light text-[14px] text-start leading-[22px] text-[#FFFFFF]">
                    Welcome to India's largest SEBI registered <br /> trading &
                    investing platform. We offer <br /> education, advisory &
                    research services.
                  </p>
                  <p className="md:hidden font-light text-[12px] md:text-start text-center leading-5 text-[#FFFFFF]">
                    Welcome to India's largest SEBI registered trading &
                    investing platform. We offer education, advisory & research
                    services.
                  </p>
                </div>
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <div className="flex w-full justify-start items-center gap-4 bg-[#FFFFFF05] p-4 rounded-xl">
                    <img className="" src={verified} alt="verified" />
                    <div className="flex flex-col items-start justify-start">
                      <p className="font-light text-[14px] leading-4 text-[#FFFFFF]">
                        SEBI Registered Research Analyst
                      </p>
                      <p className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        INH000013925
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-start items-start gap-4 bg-[#FFFFFF05] p-4 rounded-xl">
                    <p className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                      Compliance Info
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Compliance Officer:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        Parang Mehta
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Number:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        +91-6350670245
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Accessibility Nodal Officer:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        Madhur Sancheti
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Contact Number:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        +91-9414535030
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Email:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        parang@stockwiz.in
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimateFromInside>
            <AnimateFromInside>
              <div className="md:flex hidden flex-col justify-start items-start gap-8">
                <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                  Quick Links
                </p>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/about-us.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]"
                >
                  About Us
                </a>

                <a
                  href="#pricing"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Pricing
                </a>
                <a
                  href="#features"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Features
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/assets/pdf/SEBIAuditReport.pdf"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  SEBI Audit Report
                </a>

                <a
                  target="_blank"
                  href="https://www.stockwiz.in/investor-charter.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Investor Charter
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/complaint.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Complaints
                </a>
              </div>
            </AnimateFromInside>
            <AnimateFromInside>
              <div className="md:flex hidden flex-col justify-start items-start gap-8">
                <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                  Company
                </p>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/disclaimer.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Disclaimer
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/grievance_policy.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Grievance Policy
                </a>
                <a
                  target="_blank"
                  href="https://scores.sebi.gov.in/remote/login?lang=en"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  SEBI Scores
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/terms_nd_conditions.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Terms & Conditions
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/privacy_policy.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Privacy Policy
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/refund_policy.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Refund Policy
                </a>
              </div>
            </AnimateFromInside>
            <div className="flex flex-col items-start justify-start gap-8">
              <div className="md:hidden flex w-full justify-start gap-6 items-center">
                <AnimateFromInside>
                  <div className="flex flex-col justify-start items-start gap-8">
                    <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                      Quick Links
                    </p>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/about-us.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]"
                    >
                      About Us
                    </a>

                    <a
                      href="#pricing"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Pricing
                    </a>
                    <a
                      href="#features"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Features
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/assets/pdf/SEBIAuditReport.pdf"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      SEBI Audit Report
                    </a>

                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/investor-charter.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Investor Charter
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/complaint.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Complaints
                    </a>
                  </div>
                </AnimateFromInside>
                <AnimateFromInside>
                  <div className="flex flex-col justify-start items-start gap-8">
                    <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                      Company
                    </p>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/disclaimer.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Disclaimer
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/grievance_policy.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Grievance Policy
                    </a>
                    <a
                      target="_blank"
                      href="https://scores.sebi.gov.in/remote/login?lang=en"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      SEBI Scores
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/terms_nd_conditions.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Terms & Conditions
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/privacy_policy.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/refund_policy.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Refund Policy
                    </a>
                  </div>
                </AnimateFromInside>
              </div>
              <AnimateFromInside>
                <div className="md:mt-0 mt-4">
                  <div className="flex flex-col md:justify-center md:items-start justify-start items-start w-full gap-4">
                    <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                      Contact Us
                    </p>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Call Us:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={call} alt="call" />
                        <p className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8] ">
                          <a target="_blank" href="tel:+91-8065919278">
                            +91 - 8065919278
                          </a>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start border-t border-[#FFFFFF4D] w-12 "></div>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Working Hours:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={hour} alt="hour" />
                        <p className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8]">
                          09:00 AM to 9:00 PM (Mon - Sun)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start border-t border-[#FFFFFF4D] w-12 "></div>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Whatapp Us:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={whatsapp1} alt="whatsapp1" />
                        <a
                          target="_blank"
                          href="https://wa.me/+916350670245"
                          className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8]"
                        >
                          +91 - 6350670245
                        </a>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <img className="" src={whatsapp1} alt="whatsapp1" />
                        <a
                          target="_blank"
                          href="https://wa.me/+917850934946"
                          className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8] cursor-pointer"
                        >
                          +91 - 7850934946
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start justify-start border-t border-[#FFFFFF4D] w-12 "></div>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Email Us:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={email} alt="email" />
                        <a
                          target="_blank"
                          href="mailto:help@stockwiz.in"
                          className="font-medium text-[16px] leading-5 text-[#FFFFFF]/[0.8]"
                        >
                          help@stockwiz.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateFromInside>
            </div>
          </div>
          <div className="flex md:flex-row flex-col-reverse justify-between items-center md:px-32 px-4 gap-4 py-2 w-full">
            <AnimateFromInside>
              <p className="font-normal md:text-[16px] text-[14px] leading-4 text-[#FFFFFF] md:py-0 py-2">
                Copyright ©{Math.max(2026, new Date().getFullYear())} Stockwiz. All rights reserved.
              </p>
            </AnimateFromInside>
            <div className="md:hidden block border border-[#FFFFFF66]/[0.5] -mx-4 w-[calc(100%+32px)] opacity-50" />
            <AnimateFromInside>
              <div className="flex justify-center items-center gap-2">
                <a
                  target="_blank"
                  href="https://www.facebook.com/pmtradesofficial?mibextid=LQQJ4d"
                >
                  <img className="" src={facebook} alt="facebook" />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/stockwiz-technologies-llp/"
                >
                  <img className="" src={linkedin} alt="linkedin" />
                </a>
                <a target="_blank" href="https://www.instagram.com/pmtrades/">
                  <img className="" src={instagram} alt="instagram" />
                </a>
                <a target="_blank" href="https://www.youtube.com/@pmtrades">
                  <img className="" src={youtube} alt="youtube" />
                </a>
                <a
                  target="_blank"
                  href="https://x.com/i/flow/login?redirect_after_login=%2Fmehta_parang"
                >
                  <img className="" src={twitter} alt="twitter" />
                </a>
              </div>
            </AnimateFromInside>
          </div>
        </div>
      </div>
      <div
        className="font-inter mx-auto gap-3 justify-between md:flex hidden items-center px-28 py-4 w-screen fixed z-50 bottom-0"
        style={{
          background:
            "linear-gradient(90.62deg, #007AFF 21.32%, #81F0FF 129.21%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
        }}
      >
        <p className="font-inter text-[#FFFFFF] font-medium text-[24px] leading-[20px]">
          <span className="font-bold text-[40px] leading-[100%] ">Free</span>{" "}
          <span className="text-[24px] leading-[20px] line-through">₹499</span>{" "}
          Register Now (Limited Seats)
        </p>
        <div className="flex items-center justify-center md:w-[450px] gap-4">
          <button
            onClick={() => {
              handleButtonClick("english");
            }}
            className="bg-white font-inter font-bold w-[278px] h-[82px] leading-[100%] text-[#3E57DA] flex-1 flex flex-col items-center justify-center gap-1 rounded-[10px] text-[14px] md:text-[20px] hover:scale-105 transition-all duration-300"
          >
            <span className="font-semibold text-[23px] leading-[100%] text-[#3E57DA]">
              Register Now
            </span>
            <span className="font-medium text-[22px] leading-[120%] text-black">
              ({formattedDatesDesktop.english})
            </span>
          </button>
          <button
            onClick={() => {
              handleButtonClick("hindi");
            }}
            className="hidden bg-white  font-inter  font-bold leading-[100%] text-[#3E57DA] flex-1 w-[278px] h-[82px] flex-col items-center justify-center gap-1 rounded-[10px] text-[14px] md:text-[20px] hover:scale-105 transition-all duration-300"
          >
            <span className="font-semibold text-[23px] leading-[100%] text-[#3E57DA]">
              Hindi
            </span>
            <span className="font-medium text-[22px] leading-[120%] text-black">
              ({formattedDatesDesktop.hindi})
            </span>
          </button>
        </div>
      </div>
      <div
        className="font-inter mx-auto justify-between md:hidden px-4 flex flex-col items-center md:px-28 py-2 w-screen fixed z-50 bottom-0 gap-4"
        style={{
          background:
            "linear-gradient(92.5deg, #0073F0 46.71%, #81F0FF 120.89%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
        }}
      >
        <div className="flex items-center justify-center gap-2 text-white w-full">
          <div className="flex items-center justify-center gap-[6px]">
            <span className="font-bold font-inter text-[29px] leading-[100%]">
              Free
            </span>
            <span className="font-medium font-inter text-[18px] leading-[100%] line-through decoration-white decoration-1 flex items-center">
              ₹499
            </span>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                handleButtonClick("english");
              }}
              className="flex flex-col justify-center items-center py-2 px-4 bg-white rounded-[12px] cursor-pointer w-auto hover:bg-gray-50 active:bg-gray-100 transition-all duration-200  touch-manipulation"
            >
              <span className="font-semibold text-[18px] leading-[170%] text-[#0162CC]">
                Register Now
              </span>
              <div className="font-semibold text-[13px] leading-[170%] text-center text-black">
                ({formattedDates.english})
              </div>
            </button>
            <button
              onClick={() => {
                handleButtonClick("hindi");
              }}
              className="hidden flex-col justify-center items-center gap-1 bg-white p-3 sm:p-4 rounded-[12px] cursor-pointer w-full hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 min-h-[60px] sm:min-h-[70px] touch-manipulation"
            >
              <span className="font-semibold text-[16px] sm:text-[18px] leading-[100%] text-[#3E57DA]">
                Hindi
              </span>
              <div className="font-semibold text-[13px] sm:text-[10px] leading-[170%] text-center">
                ({formattedDates.hindi})
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Component */}
      <StrykeXPopupDialog
        open={showDialog}
        onClose={handleDialogClose}
        onSuccess={handleDialogSuccess}
        selectedLanguage={selectedLanguage}
      />
    </footer>
  );
};

export default Footer;
