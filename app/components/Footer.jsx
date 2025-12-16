"use client";

import { useState } from "react";
import Logo from "./Logo";

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzLS7hIONLeu0FRHPix2yYu-yrhX84sGG_U1wvoNJ2qcojW5VoeHQPDaTmCZ_AOslfy/exec";

const Footer = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("success"); // 'success' or 'error'
  const [phoneError, setPhoneError] = useState("");
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Expertise", href: "#expertise" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "About", href: "#about" },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Indian phone number validation
  const validateIndianPhone = (phoneNumber) => {
    // Remove all spaces, dashes, and special characters except + and digits
    let cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    // Remove +91 or 91 prefix if present
    if (cleaned.startsWith('+91')) {
      cleaned = cleaned.substring(3);
    } else if (cleaned.startsWith('91') && cleaned.length === 12) {
      cleaned = cleaned.substring(2);
    } else if (cleaned.startsWith('0') && cleaned.length === 11) {
      cleaned = cleaned.substring(1);
    }
    
    // Check if it's exactly 10 digits
    if (cleaned.length !== 10) {
      return { valid: false, message: "Phone number must be 10 digits" };
    }
    
    // Check if all are digits
    if (!/^\d+$/.test(cleaned)) {
      return { valid: false, message: "Phone number must contain only digits" };
    }
    
    // Check if it starts with 6, 7, 8, or 9 (valid Indian mobile number prefixes)
    if (!/^[6-9]/.test(cleaned)) {
      return { valid: false, message: "Phone number must start with 6, 7, 8, or 9" };
    }
    
    return { valid: true, cleaned };
  };

  async function sendToGoogleSheet(formData) {
    const scriptURL = GOOGLE_SHEETS_URL;

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Success:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleCallBackSubmit = async (e) => {
    e.preventDefault();
    setShowResponse(false);
    setPhoneError("");

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      setResponseMessage("Phone number is required");
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    // Validate Indian phone number
    const phoneValidation = validateIndianPhone(phone);
    if (!phoneValidation.valid) {
      setPhoneError(phoneValidation.message);
      setResponseMessage(phoneValidation.message);
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    setIsLoading(true);

    const now = new Date();
    const payload = {
      name: "",
      phone: phoneValidation.cleaned,
      message: "",
      date: now.toLocaleDateString("en-GB"), // dd/mm/yyyy
      time: now.toLocaleTimeString(), // hh:mm:ss
      type: "callback_request",
    };

    try {
      const result = await sendToGoogleSheet(payload);

      setIsLoading(false);

      if (result.success) {
        setResponseMessage("Request submitted! We'll call you soon ✅");
        setResponseType("success");
        setShowResponse(true);
        setPhone("");
        
        // Hide response after 3 seconds
        setTimeout(() => {
          setShowResponse(false);
        }, 3000);
      } else {
        setResponseMessage("Error submitting request. Please try again.");
        setResponseType("error");
        setShowResponse(true);
        setTimeout(() => {
          setShowResponse(false);
        }, 3000);
      }
    } catch (err) {
      setIsLoading(false);
      setResponseMessage("Server error. Please try again.");
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => {
        setShowResponse(false);
      }, 3000);
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError("");
    }
  };

  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="default" variant="dark" />
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Premium luxury furniture craftsmanship and interior design services across Delhi-NCR. Serving Noida, Gurugram, Greater Noida & Delhi with quality and excellence.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1EDH1ve5JM/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-darkGreen transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sophisticatedecor?utm_source=qr&igsh=MTQxc3BmeXBwemwwYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-darkGreen transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="tel:+918791551332"
                className="text-gray-400 hover:text-darkGreen transition-colors duration-200"
                aria-label="Call"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>
              <a
                href="mailto:info@sophisticatedecor.com"
                className="text-gray-400 hover:text-darkGreen transition-colors duration-200"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-base">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-400 text-sm">
                  Noida, Gurugram, Greater Noida & Delhi
                  <br />
                  <span className="text-gray-500">Delhi-NCR, India</span>
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919027418414"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    +91 90274 18414
                  </a>
                  <a
                    href="tel:+918791551332"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    +91 87915 51332
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@sophisticatedecor.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  sophisticatedecor.site@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Get a Call Back */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Get a Call Back</h4>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Leave your phone number and we'll call you back to discuss your requirements.
            </p>
            
            {/* Response Popup */}
            {showResponse && (
              <div className={`mb-4 p-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                responseType === "success" 
                  ? "bg-green-50 border-2 border-green-500 text-green-800" 
                  : "bg-red-50 border-2 border-red-500 text-red-800"
              }`}>
                <div className="flex items-center gap-2">
                  {responseType === "success" ? (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <p className="font-semibold text-sm">{responseMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCallBackSubmit} className="flex flex-col gap-3">
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+91 98765 43210 or 9876543210"
                  required
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    phoneError ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                  }`}
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-400">{phoneError}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">Enter 10-digit Indian mobile number (starts with 6-9)</p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-darkGreen border-2 border-white text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold hover:bg-darkGreen-dark hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Get a Call Back"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Sophisticated Decor. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="https://sophisticatedecor.com" className="hover:text-white transition-colors">
                sophisticatedecor.com
              </a>
              <span>|</span>
              <span>Luxury Sofa Repair & Manufacturing</span>
              <span>|</span>
              <span>Noida, Gurugram, Greater Noida & Delhi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

