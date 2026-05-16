import { useEffect } from "react";

export default function WatiWidget() {
  useEffect(() => {
    if (window.__watiWidgetLoaded) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?72882";

    script.onload = () => {
      const isMobile = window.innerWidth <= 768;

      const options = {
        enabled: true,
        chatButtonSetting: {
          backgroundColor: "#0CD481",
          ctaText: "Chat With Us",
          borderRadius: "25",
          marginLeft: "0",
          marginRight: "20",
          marginBottom: isMobile ? "110" : "120",
          ctaIconWATI: false,
          position: "right",
        },
        brandSetting: {
          brandName: "Stockwiz",
          brandSubTitle: "undefined",
          brandImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4AU_CbyoPe43La6RFNa_A5m-jh4B42W2dKhjncwp_Q&s",
          welcomeText: "Hi. How can I help you?",
          messageText:
            "I just visited your StrykeX website and would like to know more about the features.",
          backgroundColor: "#0CD481",
          ctaText: "Chat With Us",
          borderRadius: "25",
          autoShow: false,
          phoneNumber: "916350670245",
        },
      };

      if (typeof window.CreateWhatsappChatWidget === "function") {
        window.CreateWhatsappChatWidget(options);
        window.__watiWidgetLoaded = true;
      }
    };

    document.body.appendChild(script);

    return () => {
      try {
        script.remove();
        const widget = document.querySelector("#whatsapp-chat-widget");
        if (widget) widget.remove();
        window.__watiWidgetLoaded = false;
      } catch (_) {}
    };
  }, []);

  return null;
}
