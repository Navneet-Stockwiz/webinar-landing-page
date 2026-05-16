import React, { useState } from "react";
import dhan from "../assets/svg/dhan.svg";
import dhanlogo from "../assets/svg/dhanlogo.svg";
import alreadydhan from "../assets/svg/alreadydhan.svg";
import sw from "../assets/svg/sw.svg";
import sw1 from "../assets/svg/sw1.svg";
import x from "../assets/svg/x.svg";
import dhan1 from "../assets/svg/dhan1.svg";
import stocks from "../assets/svg/stocks.svg";
import options from "../assets/svg/options.svg";
import commodity from "../assets/svg/commodity.svg";
import etfs from "../assets/svg/etfs.svg";
import mutualfunds from "../assets/svg/mutualfunds.svg";
import ipo from "../assets/svg/ipo.svg";
import nfo from "../assets/svg/nfo.svg";
import futures from "../assets/svg/futures.svg";
import iphone15 from "../assets/webp/iphone15.webp";
import dhanpay from "../assets/webp/dhanpay.webp";
import activeuser from "../assets/webp/activeuser.webp";
import position from "../assets/webp/position.webp";
import logoright from "../assets/webp/logoright.webp";
import ellipsedhan from "../assets/webp/ellipsedhan.webp";
import ellipsedhan1 from "../assets/webp/ellipse1dhan.webp";
import dhanallcard from "../assets/webp/dhanallcard.webp";
import dhanallcard1 from "../assets/webp/dhanallcard1.webp";
import { CircularProgress } from "@mui/material";
import DigioKYCModal from "../components/Digio/DigioKYCModal";

const categories = [
  { icon: stocks, label: "Stocks" },
  { icon: options, label: "Options" },
  { icon: futures, label: "Futures" },
  { icon: commodity, label: "Commodity" },
  { icon: etfs, label: "ETFs" },
  { icon: mutualfunds, label: "Mutual Funds" },
  { icon: ipo, label: "IPO" },
  { icon: nfo, label: "NFO" },
];

const LOCALBASEURL = "http://localhost:8000/api/v2";
const DEVBASEURL = "https://api.stockwiz.in/api/v2";
const PRODBASEURL = "https://api.stockwiz.in/api/v2";

export default function DhanUI() {
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [kycMessage, setKycMessage] = useState("");

  const apiKey =
    import.meta.env.VITE_API_KEY ||
    "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o";

  const checkKYCStatus = async (mobile) => {
    try {
      setIsLoading(true);
      console.log("Checking KYC status for:", mobile);

      const response = await fetch(`${PRODBASEURL}/kyc/getStrykexKycStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({ mobile_number: mobile }),
      });

      console.log("KYC Response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch KYC status");
      }

      const data = await response.json();

      if (data?.status && data?.data === true) {
        window.location.href = "https://strykex.stockwiz.in/dashboard";
      } else {
        setMobileNumber(mobile);
        setKycMessage(data?.message || "Please complete KYC verification");
        setShowKYCModal(true);
      }
    } catch (error) {
      console.error("KYC Check Error:", error);
      setKycMessage("Error verifying KYC status");
      setShowKYCModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlreadyHaveAccount = async () => {
    try {
      const storedMobile = localStorage.getItem("strykeX_mobile");

      if (storedMobile) {
        await checkKYCStatus(storedMobile);
      } else {
        window.open("https://strykex.stockwiz.in/dashboard", "_blank");
      }
    } catch (error) {
      console.error("Account Check Error:", error);
      window.open("https://strykex.stockwiz.in/dashboard", "_blank");
    }
  };

  const createDhanConsent = async () => {
    try {
      const response = await fetch(`${PRODBASEURL}/auth/dhan-generate-consent`, {
        method: "POST",
        headers: {
          "api-key": apiKey,
        },
      });
      if (!response.ok) throw new Error("Failed to generate consent");
      const json = await response.json();
      const consentId = json?.data?.consentId;
      if (consentId) {
        const dhanUrl = `https://auth.dhan.co/consent-login?consentId=${consentId}`;
        window.open(dhanUrl, "_self");
      } else {
        console.error("Consent ID missing in response:", json);
      }
    } catch (error) {
      console.error("Error generating Dhan consent:", error);
    }
  };

  return (
    <div className="bg-white md:min-h-screen h-auto md:p-6 p-4 text-gray-900 relative z-10 overflow-x-hidden font-inter">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CircularProgress style={{ color: "#46B48D" }} />
        </div>
      )}

      <DigioKYCModal
        mobileNumber={mobileNumber}
        open={showKYCModal}
        onClose={() => setShowKYCModal(false)}
        onSuccess={() =>
          (window.location.href = "https://strykex.stockwiz.in/dashboard")
        }
        onError={(error) => {
          console.error("KYC Error:", error);
          setKycMessage(error.message || "KYC process failed");
        }}
      />

      <header className="flex justify-between items-center md:mb-16 mb-4 md:px-20">
        <div className="flex items-center md:space-x-3">
          <img src={dhan} alt={dhan} className="md:block hidden object-cover" />
          <img
            src={dhanlogo}
            alt={dhanlogo}
            className="md:hidden block object-cover"
          />
        </div>

        <div className="md:flex hidden justify-center items-center space-x-4">
          <div
            className="p-[1px] rounded-[8px]"
            style={{
              backgroundImage:
                "linear-gradient(91.57deg, #000000 -15.26%, #46B48D 103.16%)",
            }}
          >
            <button
              onClick={handleAlreadyHaveAccount}
              className="font-semibold text-[16px] leading-[100%] flex items-center space-x-2 px-4 py-[10px] h-full hover:bg-green-50 transition bg-white"
              style={{ borderRadius: "7px" }}
            >
              <img
                src={alreadydhan}
                alt="Already have an account"
                className="object-cover"
              />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(92.17deg, #000000 2.52%, #3CFF49 173.31%)",
                }}
              >
                Already Have an Account
              </span>
            </button>
          </div>

          <button
            onClick={createDhanConsent}
            className="font-semibold text-[16px] leading-[100%] text-white px-4 py-3 rounded-[8px] flex items-center space-x-2 transition"
            style={{
              background:
                "linear-gradient(91.57deg, #000000 -15.26%, #46B48D 103.16%)",
            }}
          >
            <span>Create a Free Demat Account</span>
            <img src={sw} alt={sw} className="object-cover" />
            <img src={x} alt={x} className="object-cover" />
            <img src={dhan1} alt={dhan1} className="object-cover" />
          </button>
        </div>
      </header>
      {/* Main Section */}
      <main className="flex md:flex-row flex-col justify-center md:gap-20 gap-10 items-center">
        {/* Left text and awards */}
        <section className="md:space-y-8 space-y-4 flex-1 flex justify-start items-start flex-col md:px-20">
          <p className="font-bold md:text-[49px] text-[28px] md:leading-[64px] leading-[37px] tracking-normal text-black font-inter">
            Create Free{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(94.17deg, #46B48D 56.97%, #1E4E3D 101.62%)",
              }}
            >
              Dhan x
            </span>{" "}
            <span className="inline-flex items-center space-x-1">
              <img
                src={sw1}
                alt="SW Logo"
                className="md:h-auto h-9 object-cover"
              />
            </span>
            <br />
            Account with Us
          </p>

          <p className="font-normal md:text-[17px] text-[10px] md:leading-[24px] leading-[14px] text-[#8E8E8E]">
            Create your free account and access top-tier research,
            <br className="md:block hidden" /> strategy{" "}
            <br className="md:hidden block" /> support, and real-time tools
            powered by Dhan and <br className="md:block hidden" /> Stockwiz.
          </p>

          {/* Awards */}
          <img
            src={dhanallcard}
            alt={dhanallcard}
            className="object-cover md:block hidden"
          />
          <img
            src={dhanallcard1}
            alt={dhanallcard1}
            className="object-cover md:hidden block w-[353px]"
          />

          {/* Buttons under awards */}
          <div className="flex flex-col justify-start items-start space-y-4">
            {/* Create demat account button */}
            <button
              onClick={createDhanConsent}
              className="flex items-center justify-center gap-2 w-[353px] p-4 rounded-[8px] font-semibold text-[16px] leading-[100%] text-white transition"
              style={{
                background:
                  "linear-gradient(91.57deg, #000000 -15.26%, #46B48D 103.16%)",
              }}
            >
              <span>Create a Free Demat Account</span>
              <div className="flex items-center space-x-2">
                <img src={sw} alt="sw" className="object-cover" />
                <img src={x} alt="x" className="object-cover" />
                <img src={dhan1} alt="dhan logo" className="object-cover" />
              </div>
            </button>
            {/* Already have an account */}
            <button
              onClick={handleAlreadyHaveAccount}
              className="flex items-center justify-center space-x-2 px-4 py-[14px] w-[353px] font-semibold text-[16px] leading-[100%] bg-white hover:bg-green-50 transition rounded-[8px] border"
              style={{
                borderColor: "#00000029",
                borderWidth: "1px",
              }}
            >
              <img
                src={alreadydhan}
                alt="Already have an account"
                className="object-cover"
              />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(92.17deg, #000000 2.52%, #3CFF49 173.31%)",
                }}
              >
                Already Have an Account
              </span>
            </button>
          </div>
        </section>

        {/* Right mobile mockup with floating boxes */}
        <section className="space-y-8 flex-1 flex justify-start items-start flex-col px-20">
          <div className="relative bg-[linear-gradient(91.57deg,_#000000_-15.26%,_#46B48D_103.16%)] rounded-[15px] md:w-[470px] w-[353px] md:h-[570px] h-[408px]">
            <img
              src={iphone15}
              alt="iphone15"
              className="md:w:[335px] w-[240px] object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2"
            />
            <img
              src={dhanpay}
              alt="dhanpay"
              className="object-cover absolute md:-top-7 -top-4  md:-left-40 -left-4 md:w-auto w-[242px]"
            />
            <img
              src={activeuser}
              alt="activeuser"
              className="object-cover absolute md:block hidden bottom-16  -left-56"
            />
            <img
              src={position}
              alt="position"
              className="object-cover md:hidden block absolute md:top-20 top-64  md:-right-52  -left-6 md:h-[150px] h-[100px]"
            />
            <img
              src={position}
              alt="position"
              className="object-cover md:block hidden absolute md:top-20 top-64  md:-right-48  md:h-[150px] h-[100px]"
            />
            <img
              src={logoright}
              alt="logoright"
              className="object-cover md:hidden block absolute md:bottom-6 bottom-60 -right-2 md:h-36 h-[80px]"
            />
            <img
              src={logoright}
              alt="logoright"
              className="object-cover md:block hidden absolute md:bottom-6 bottom-60 -right-[75px] md:h-36"
            />
          </div>
        </section>
      </main>

      <nav className="md:flex hidden flex-wrap justify-center gap-x-6 w-full px-20 mt-16">
        {categories.map(({ icon, label }) => (
          <button
            key={label}
            className="flex items-center justify-center space-x-2 transition text-[20px] font-normal leading-[31px] border-[1.3px] rounded-[8px] px-4 py-2"
            style={{
              borderColor: "#00000029",
              borderWidth: "1px",
              backdropFilter: "blur(18.281660079956055px)",
              WebkitBackdropFilter: "blur(18.281660079956055px)",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <img src={icon} alt={icon} className="object-cover" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <img
        src={ellipsedhan}
        alt={ellipsedhan}
        className="absolute md:block hidden top-0 right-0 -z-10 h-[500px]"
      />
      <img
        src={ellipsedhan1}
        alt={ellipsedhan1}
        className="absolute md:block hidden bottom-0 left-0 -z-10 h-[500px]"
      />
    </div>
  );
}
