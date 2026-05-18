import React, { useEffect, useState } from "react";
import successImg from "../assets/png/success.png";
import whatsappIcon from "../assets/svg/whatsapp1.svg";
import { useLandingVariant } from "../contexts/LandingVariantContext.jsx";
import { useWebinar } from "../contexts/WebinarContext.jsx";
import {
  gtmWebinarProduct,
  resolveWebinarId,
  webinarNameFromVariant,
} from "../utils/webinarGtm.js";

const WEBINAR_DATA_URL =
  "https://api.stockwiz.in/api/v2/auth/getWebinarData";

const WebinarThankYou = () => {
  const [thankyouWhatsappURL, setThankyouWhatsappURL] = useState("");
  const { channel, sourcePath } = useLandingVariant();
  const { webinarData } = useWebinar();

  useEffect(() => {
    async function fetchSuccessWhatsappLink() {
      try {
        const response = await fetch(WEBINAR_DATA_URL);
        const result = await response.json();
        if (result?.code === 200 && result?.data?.thankyou_whatsapp_url) {
          setThankyouWhatsappURL(result.data.thankyou_whatsapp_url);
        }
      } catch (error) {
        console.error("Failed to fetch success WhatsApp link:", error);
      }
    }
    fetchSuccessWhatsappLink();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "webinar_registration_free",
      channel,
      page_path: window.location.pathname,
      webinar_id: resolveWebinarId(webinarData, sourcePath),
      webinar_name: webinarNameFromVariant(channel, false),
      product: gtmWebinarProduct(),
    });
  }, [channel, sourcePath, webinarData]);

  function redirectToWhatsappGroup() {
    if (thankyouWhatsappURL) {
      window.location.href = thankyouWhatsappURL;
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-[540px] px-4">
        <div
          className="flex min-h-screen w-full flex-col items-center justify-center gap-4 max-sm:gap-3 px-[clamp(20px,4vw,60px)] py-[clamp(24px,5vh,48px)] max-sm:px-5 max-sm:py-6"
        >
          <div className="leading-[0]" aria-hidden>
            <img
              src={successImg}
              alt=""
              className="mx-auto block h-auto w-full max-w-[100px]"
            />
          </div>
          <h3 className="w-full text-center text-2xl font-semibold leading-snug tracking-tight text-black">
            Success!
          </h3>
          <p className="mx-auto max-w-[42em] text-center text-lg leading-normal text-black">
            You have successfully registered for the webinar. You&apos;ll get
            all the joining details shortly.
          </p>
          <span className="mx-auto block max-w-[42em] text-center text-sm leading-[1.55] text-black">
            For any questions or queries, please feel free to contact us on{" "}
            <a
              href="tel:+916350670245"
              className="text-[#1c1c1c] no-underline"
            >
              +91- 6350670245
            </a>{" "}
            (WhatsApp Helpline) or email us on{" "}
            <a
              href="mailto:help@stockwiz.in"
              className="text-[#1c1c1c] underline decoration-[#1c1c1c] underline-offset-2"
            >
              help@stockwiz.in
            </a>
          </span>
          <button
            type="button"
            onClick={redirectToWhatsappGroup}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border-0 bg-[#49ba43] px-6 py-3.5 text-lg font-medium leading-snug text-white transition-colors hover:bg-[#49ba43] max-sm:gap-3.5 max-sm:px-7 max-sm:py-3 max-sm:text-base sm:w-auto"
          >
            <img
              src={whatsappIcon}
              alt=""
              className="h-7 w-7 shrink-0 brightness-0 invert max-sm:h-8 max-sm:w-8"
            />
            Join WhatsApp Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebinarThankYou;
