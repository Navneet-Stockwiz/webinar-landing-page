import React, { useState, useRef, useEffect } from "react";
import arrow from "../assets/svg/arrow1.svg";
import { AnimateFromInside } from "../common/ScrollFadeIn";

const faqData = [
  {
    id: 1,
    question: "What all features are included in the membership plan?",
    answer:
      "Your plan includes access to StrykeX algo trading platform - which includes no code custom strategy builder, 15+ pre built algo strategies, algo trading course along with ready made option selling templates.",
  },
  {
    id: 2,
    question: "How many algo strategies can be deployed live?",
    answer:
      "You can deploy upto 4 live strategy deployments as a part of the membership plan, and if you wish to add more live deployments, you can request for increasing limits at a nominal charge of Rs 499/strategy/month.",
  },
  {
    id: 3,
    question: "How does back testing and forward testing work?",
    answer:
      "Back testing is a process where you can simulate your strategy performance using historical market data to judge its performance, and adjust your strategy parameters, if required. Forward testing on the other hand is a process where you can live test your strategy in real time market conditions to verify the success rate of any given strategy without using real funds - you're basically paper trading the strategy before going live.",
  },
  {
    id: 4,
    question:
      "Which segments can be traded on autopilot on the StrykeX platform?",
    answer:
      "You can trade all segments on the platform including - equity, option buying, option selling and the futures segment. Commodity segment shall be launched soon, and will be a part of the same package. We support all trading styles such as scalping, intraday trading, swing trading and positional trading.",
  },
  {
    id: 5,
    question:
      "Is this beginner friendly? I have no idea about algo trading, will it be suitable for me?",
    answer:
      "Absolutely yes! StrykeX is designed to make algo trading super simple for all - whether you are a beginner or an experienced trader. With our no code strategy builder and pre built algo strategies, all you need to do is 1 click, and you're now trading on autopilot. No coding skills required, no prior trading knowledge required.",
  },
  {
    id: 6,
    question: "How many indicators are available on StrykeX algos?",
    answer:
      "We have more than 80+ technical indicators which is the highest in the industry. We constantly add new indicators on the platform every month.",
  },
  {
    id: 7,
    question: "Can I manually close the positions executed by the algo?",
    answer:
      "Yes you can, however you will need to stop the live deployment from your dashboard before closing the position manually, since the system will still punch an order to close your position when an exit signal such as target hit or stop loss is met. Hence, we recommend you to first stop or pause the live deployment and then intervene manually.",
  },
  // {
  //   id: 8,
  //   question: "How can I contact the Stockwiz support team?",
  //   answer: `You can reach out to us through the following channels:<br/>
  //     ✉️ Email: <a href="mailto:help@stockwiz.in" class="text-blue-400 hover:text-blue-300 underline transition-colors duration-200">help@stockwiz.in</a><br/>
  //     📞 Phone: +91 7206533303`,
  // },
];

const FAQItem = ({ item, index, isActive, onToggle }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <AnimateFromInside>
      <div
        onClick={() => onToggle(index)}
        className={`w-full bg-white/5 backdrop-blur-sm cursor-pointer md:max-w-4xl rounded-2xl transition-all duration-500 ease-out hover:bg-white/8 hover:shadow-lg hover:shadow-white/5 ${
          isActive ? "bg-white/8 shadow-lg shadow-white/5" : ""
        }`}
      >
        <div className="md:p-6 p-4">
          <div className="flex items-start justify-between">
            <h3 className="md:font-medium font-semibold md:text-[24px] text-base md:leading-8 leading-7 text-white pr-4 flex-grow">
              {item.question}
            </h3>

            <button
              aria-expanded={isActive}
              aria-label={isActive ? "Collapse answer" : "Expand answer"}
              className="flex-shrink-0 p-1 rounded-full transition-all duration-300 ease-out"
            >
              <img
                src={arrow}
                alt=""
                className={`w-5 h-5 transition-transform duration-200 ease-out ${
                  isActive ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
          </div>

          <div
            className="overflow-hidden transition-all duration-500 ease-out"
            style={{ height: `${contentHeight}px` }}
          >
            <div
              ref={contentRef}
              className={`pt-4 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <p
                className="font-light md:text-[20px] text-sm md:leading-8 leading-6 text-[#FFFFFFBF]"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimateFromInside>
  );
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#01041A] text-white flex justify-center items-center md:pt-24 pb-12 w-full md:px-10 px-4">
      <div className="flex flex-col w-full max-w-6xl justify-center items-center gap-8">
        <AnimateFromInside>
          <div className="text-center">
            <p className="font-semibold text-[40px] md:text-[60px] leading-[140%] font-degular bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Frequently Asked Questions
            </p>
          </div>
        </AnimateFromInside>

        <div className="w-full flex justify-center">
          <div className="flex flex-col w-full max-w-4xl space-y-4">
            {faqData.map((item, index) => (
              <FAQItem
                key={item.id}
                item={item}
                index={index}
                isActive={activeIndex === index}
                onToggle={toggleFAQ}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
