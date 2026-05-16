import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import CTAButton from "../common/CTAButton";

const ThreeMInutesVideo = () => {
  return (
    <div className="bg-[#010611] text-white flex flex-col items-center px-4 md:px-80 3xl:px-[450px] pt-20 pb-8 md:gap-6 gap-2 w-full">
      <AnimateFromInside>
        <p className="font-degular font-normal text-[32px] md:text-[64px] text-[#FFFFFF99] leading-[36px] md:leading-[72px] text-center">
          <span className="font-semibold text-white">
            Watch This Video
          </span>{" "}
          <br className="block md:hidden" /> To Know The{" "}
          <br className="hidden md:block" />
          Power of AI <br className="block md:hidden" /> Powered Algo Trading
        </p>
      </AnimateFromInside>
      <AnimateFromInside>
        <div className="rounded-2xl md:w-[1250px] w-[353px] md:h-[732px] h-[253px] relative px-4 mx-auto">
          <div>
            <iframe
              src="https://player.vimeo.com/video/1120387291?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;muted=1"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="Stryke Walkthrough Website"
              allowFullScreen
            />
          </div>
        </div>
      </AnimateFromInside>
      <AnimateFromInside>
        <div className="flex justify-center md:mt-0 mt-4">
          <CTAButton />
        </div>
      </AnimateFromInside>
    </div>
  );
};

export default ThreeMInutesVideo;
