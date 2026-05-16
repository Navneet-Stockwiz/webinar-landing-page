import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";

// Import SVG files
import DhanLogo from "../assets/svg/dhan.svg";
import CredLogo from "../assets/svg/Cred.svg";
import GrowwLogo from "../assets/svg/Groww.svg";
import NomuraLogo from "../assets/svg/Nomura.svg";
import SmallcaseLogo from "../assets/svg/Smallcase.svg";
import GoldmanSachsLogo from "../assets/svg/Goldman Sachs.svg";
import JPMorganLogo from "../assets/svg/JP Morgan.svg";
import MorganStanleyLogo from "../assets/svg/Morgan Stanley.svg";
import WellsFargoLogo from "../assets/svg/Wells Fargo.svg";
import BankOfAmericaLogo from "../assets/svg/Bank of America_idZSNC7EK__0 2.svg";
import ICICIDirectLogo from "../assets/svg/ICICI Direct.svg";
import IndMoneyLogo from "../assets/svg/IND MONEY.svg";
import AngelOneLogo from "../assets/svg/Angel_One_Logo 2.svg";
import Image483Logo from "../assets/svg/image 483.svg";
import Frame1686552669Logo from "../assets/svg/Frame 1686552669.svg";
import Image484Logo from "../assets/svg/image 484.svg";



const CompanyLogoMarquee = () => {
  const logos = [
    { icon: DhanLogo, name: "Dhan" },
    { icon: CredLogo, name: "Cred" },
    { icon: GrowwLogo, name: "Groww" },
    { icon: NomuraLogo, name: "Nomura" },
    { icon: SmallcaseLogo, name: "Smallcase" },
    { icon: GoldmanSachsLogo, name: "Goldman Sachs" },
    { icon: JPMorganLogo, name: "JP Morgan" },
    { icon: MorganStanleyLogo, name: "Morgan Stanley" },
    { icon: WellsFargoLogo, name: "Wells Fargo" },
    { icon: BankOfAmericaLogo, name: "Bank of America" },
    { icon: ICICIDirectLogo, name: "ICICI Direct" },
    { icon: IndMoneyLogo, name: "IND MONEY" },
    { icon: AngelOneLogo, name: "Angel One" },
    { icon: Image483Logo, name: "Image 483" },
    { icon: Frame1686552669Logo, name: "Frame 1686552669" },
    { icon: Image484Logo, name: "Image 484" },
  ];

  const logos1 = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="bg-[#010611] text-white flex flex-col items-center w-full px-4 md:px-80 3xl:px-[450px] pt-0 pb-8 md:pb-12 gap-6">
      <div className="flex flex-col md:gap-6 gap-4 justify-center items-center w-full md:py-5 py-2">
        <AnimateFromInside>
          <p className="text-center w-full font-medium md:text-[24px] text-[18px] leading-[28px]">
            Trusted by <span className="font-semibold">Professionals</span>{" "}
            Working At Top Companies Like
          </p>
        </AnimateFromInside>
        <div className="overflow-hidden group z-20 w-screen">
          <div className="flex items-center gap-12 h-auto md:animate-marquee animate-marquee1 group-hover:[animation-play-state:paused]">
            {logos1.map((logo, index) => (
              <div key={index} className="flex justify-center items-center shrink-0">
                <img
                  src={logo.icon}
                  alt={logo.name}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoMarquee;
