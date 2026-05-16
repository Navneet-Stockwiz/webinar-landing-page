import React, { useRef, useState, useEffect } from "react";
import bullish from "../assets/svg/bullish.svg";
import bearish from "../assets/svg/bearish.svg";

const BullishBearishToggle = ({ active, onChange }) => {
    
  const containerRef = useRef(null);
  const btnRefs = {
    Bullish: useRef(null),
    Bearish: useRef(null),
  };

  const [highlightLeft, setHighlightLeft] = useState(0);
  const [highlightWidth, setHighlightWidth] = useState(0);

  const updateHighlight = () => {
    const activeRef = btnRefs[active];
    if (activeRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = activeRef.current.getBoundingClientRect();
      setHighlightLeft(btnRect.left - containerRect.left);
      setHighlightWidth(btnRect.width);
    }
  };

  useEffect(() => {
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [active]);

  useEffect(() => {
    requestAnimationFrame(updateHighlight);
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative flex rounded-full overflow-hidden gap-2 p-1 cursor-pointer mt-4"
      style={{
        userSelect: "none",
        background:
          "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
      }}
    >
      {/* Bullish highlight */}
      <div
        className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out ${
          active === "Bullish" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${highlightLeft}px`,
          width: `${highlightWidth}px`,
          background:
            "linear-gradient(115.36deg, #0E6F2A 7.08%, #55EF3D 133.49%)",
        }}
      />

      {/* Bearish highlight */}
      <div
        className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out ${
          active === "Bearish" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${highlightLeft}px`,
          width: `${highlightWidth}px`,
          background:
            "linear-gradient(115.36deg, #6F0E10 7.08%, #EF3D3D 133.49%)",
        }}
      />

      <button
        ref={btnRefs["Bullish"]}
        onClick={() => onChange("Bullish")}
        className="relative flex justify-center items-center gap-2 z-10 md:px-12 px-4 md:py-3 py-[10px] md:text-base text-sm font-medium text-white rounded-full transition-all duration-300"
      >
        Bullish <img src={bullish} alt="bullish" />
      </button>

      <button
        ref={btnRefs["Bearish"]}
        onClick={() => onChange("Bearish")}
        className="relative flex justify-center items-center gap-2 z-10 md:px-12 px-4 md:py-3 py-[10px] md:text-base text-sm font-medium text-white rounded-full transition-all duration-300"
      >
        Bearish <img src={bearish} alt="bearish" />
      </button>
    </div>
  );
};

export default BullishBearishToggle;
