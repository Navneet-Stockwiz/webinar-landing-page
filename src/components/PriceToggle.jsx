import { img } from "framer-motion/client";
import React, { useRef, useState, useEffect } from "react";
import star from "../assets/svg/star.svg";

const PriceToggle = ({ activePlan, onChange }) => {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});
  const plans = ["Yearly", "Half-Yearly", "Quarterly"];

  const [highlightLeft, setHighlightLeft] = useState(0);
  const [highlightWidth, setHighlightWidth] = useState(0);

  const updateHighlight = () => {
    const activeRef = buttonRefs.current[activePlan];
    if (activeRef && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = activeRef.getBoundingClientRect();
      setHighlightLeft(btnRect.left - containerRect.left);
      setHighlightWidth(btnRect.width);
    }
  };

  useEffect(() => {
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [activePlan]);

  // 🌈 Set background gradient for highlight if Yearly is active
  const highlightBg =
    activePlan === "Yearly"
      ? "linear-gradient(91.44deg, #3F72FF -4.99%, #0036B2 52.99%, #47B4B4 112.17%)"
      : "#FFFFFF";

  return (
    <div
      ref={containerRef}
      className="relative flex justify-between items-center p-1 w-full rounded-full bg-[#FFFFFF1A]"
    >
      {/* Animated highlight */}
      <div
        className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out"
        style={{
          left: `${highlightLeft}px`,
          width: `${highlightWidth}px`,
          background: highlightBg,
        }}
      />

      {plans.map((plan) => (
        <button
          key={plan}
          ref={(el) => (buttonRefs.current[plan] = el)}
          onClick={() => onChange(plan)}
          className={`relative z-10 inline-flex items-center justify-center gap-x-1 whitespace-nowrap font-medium text-[16px] leading-[100%] w-full rounded-full p-4 transition-all duration-300 ${
            activePlan === plan
              ? plan === "Yearly"
                ? "text-white"
                : "text-black"
              : "text-white"
          }`}
        >
          {plan}
          {plan === "Yearly" && activePlan === "Yearly" ? (
            <img src={star} alt="star" className="w-4 h-4" />
          ) : null}
        </button>
      ))}
    </div>
  );
};

export default PriceToggle;
