import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arrow from "../assets/svg/arrow1.svg";

const faqData = [
  {
    id: 1,
    question: "Do I need coding skills to use StrykeX?",
    answer:
      "❌ Not at all! StrykeX is a no-code platform. You can build, backtest, and automate strategies in just a few clicks. Everything runs automatically—no coding required.",
  },
  {
    id: 2,
    question: "Who should attend this webinar?",
    answer:
      "This webinar is for beginners, retail traders, busy professionals, and even experienced investors who want to trade smarter using AI and automation.",
  },
  {
    id: 3,
    question: "Will I learn practical strategies or just theory?",
    answer:
      "This is a hands-on, practical session. You'll see real strategies, live examples, and pre-built bots that you can start using right away.",
  },
  {
    id: 4,
    question: "How do I join the webinar after registering?",
    answer:
      "Once you register, you'll get a confirmation email + WhatsApp/SMS reminder with the Zoom link and joining instructions.",
  },
  {
    id: 5,
    question: "How can I connect with the Stockwiz support team?",
    answer:
      "You can reach out to us via:<br/>✉️ Email: help@stockwiz.in<br/>📞 Phone: +91 6350670245",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-between bg-[#010611] w-full h-auto md:pt-28 pt-20 md:pb-8 px-4 md:px-80 3xl:px-[450px]">
      <div className="flex flex-col md:flex-row  w-full mx-auto">
        <div className="md:w-[40%] w-full flex md:justify-start justify-center md:items-start items-center flex-col md:mt-4 md:text-left text-center">
          <p className="font-normal md:text-[64px] text-[32px] text-[#FFFFFF99] md:leading-[74px] leading-[36px] font-degular md:text-left text-center">
            Frequently <br />
            <span className="font-semibold text-white"> Asked Questions</span>
          </p>
        </div>

        <div className="flex-1 mt-6 md:mt-0">
          <div className="flex flex-col w-full space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                onClick={() => toggleFAQ(index)}
                key={item.id}
                className={`w-full cursor-pointer md:max-w-[750px] rounded-[16px] md:p-6 p-4 bg-[#FFFFFF1F] text-white h-auto flex ${
                  activeIndex === index ? "items-start" : "items-center"
                }`}
                initial={false}
                animate={{
                  backgroundColor:
                    activeIndex === index
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(255, 255, 255, 0.12)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex flex-col flex-grow">
                  <h3 className="font-medium text-[16px] md:text-[20px] leading-[26px] md:leading-[27px] text-white mr-4">
                    {item.question}
                  </h3>

                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                          opacity: { duration: 0.3 },
                          height: { duration: 0.4 },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="font-normal md:text-[16px] text-[12px] md:leading-[25px] leading-[22px] text-[#FFFFFFBF]"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        ></p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  aria-expanded={activeIndex === index}
                  className="flex-shrink-0 self-start mt-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.img
                    src={arrow}
                    alt="arrow"
                    animate={{
                      rotate: activeIndex === index ? 0 : -180,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
