"use client";

import { FaWhatsapp, FaPhone } from "react-icons/fa";

const FloatingButtons = () => {
  const handleWhatsApp = () => {
    const phoneNumber = "919876543210"; // Replace with your WhatsApp number
    const message = "Hello, I'm interested in your services!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+919876543210"; // Replace with your phone number
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </button>

      {/* Call Button */}
      <button
        onClick={handleCall}
        className="w-14 h-14 bg-darkGreen hover:bg-darkGreen-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        aria-label="Call Now"
      >
        <FaPhone className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingButtons;

