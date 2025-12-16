"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzLS7hIONLeu0FRHPix2yYu-yrhX84sGG_U1wvoNJ2qcojW5VoeHQPDaTmCZ_AOslfy/exec";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imagesRef = useRef(null);
  const statsRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("success"); // 'success' or 'error'

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResponse(false);

    if (!phone.trim()) {
      setResponseMessage("Please enter a phone number");
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    // Validate Indian phone number
    const validation = validateIndianPhone(phone);
    if (!validation.valid) {
      setResponseMessage(validation.message);
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    setIsLoading(true);

    const now = new Date();
    const payload = {
      name: "",
      phone: validation.cleaned,
      message: "",
      date: now.toLocaleDateString("en-GB"), // dd/mm/yyyy
      time: now.toLocaleTimeString(), // hh:mm:ss
    };

    try {
      await sendToGoogleSheet(payload);
      setResponseMessage("Phone number saved successfully! ✅");
      setResponseType("success");
      setShowResponse(true);
      setPhone("");
      
      // Hide response after 3 seconds
      setTimeout(() => {
        setShowResponse(false);
      }, 3000);
    } catch (err) {
      setResponseMessage("Error saving phone number. Please try again.");
      setResponseType("error");
      setShowResponse(true);
      
      // Hide response after 3 seconds
      setTimeout(() => {
        setShowResponse(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        imagesRef.current?.children || [],
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 1,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative bg-mint min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Main Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:space-y-8">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-darkBlue leading-tight"
            >
              Crafting Space for
              <br />
              Enhanced Living
            </h1>
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed"
            >
              Premium furniture craftsmanship in Delhi-NCR. Expert sofa repair, custom manufacturing, and interior design services. Serving Noida, Gurugram, Greater Noida & Delhi with luxury furniture solutions.
            </p>
            <div ref={ctaRef}>
              <button 
               onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="flex items-center gap-3 bg-gradient-to-r from-darkGreen to-darkGreen-dark hover:from-darkGreen-dark hover:to-darkGreen text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Get a Quote</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Images */}
          <div
            ref={imagesRef}
            className="grid grid-cols-2 gap-4 lg:gap-6 h-[500px] lg:h-[600px]"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/sofa4.jpg"
                alt="Luxury modern sofa in elegant living room"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl mt-8 lg:mt-12">
              <Image
                src="/kitchen1.jpg"
                alt="Premium luxury furniture design"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Email Signup & Statistics */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Phone Number Signup */}
          <div className="space-y-4">
            <p className="text-gray-700 text-base sm:text-lg">
              Transform your space with our premium furniture solutions. Get exclusive updates and design inspiration.
            </p>
            
            {/* Response Popup */}
            {showResponse && (
              <div className={`p-4 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                responseType === "success" 
                  ? "bg-green-50 border-2 border-green-500 text-green-800" 
                  : "bg-red-50 border-2 border-red-500 text-red-800"
              }`}>
                <div className="flex items-center gap-2">
                  {responseType === "success" ? (
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <p className="font-semibold text-sm">{responseMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210 or 9876543210"
                required
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent bg-white disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-12 h-12 bg-darkGreen hover:bg-darkGreen-dark text-white rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            </form>
            <p className="text-xs text-gray-500">Enter 10-digit Indian mobile number (starts with 6-9)</p>
          </div>

          {/* Right Side - Statistics */}
          <div
            ref={statsRef}
            className="grid grid-cols-4 gap-4 lg:gap-6"
          >
            <div className="bg-darkGreen text-white p-4 lg:p-6 rounded-lg text-center shadow-lg">
              <div className="text-3xl lg:text-4xl font-bold mb-1">10+</div>
              <div className="text-sm lg:text-base opacity-90">Interior Projects</div>
            </div>
            <div className="bg-white p-4 lg:p-6 rounded-lg text-center shadow-md">
              <div className="text-3xl lg:text-4xl font-bold text-darkBlue mb-1">
                500+
              </div>
              <div className="text-sm lg:text-base text-gray-700">Sofas Repaired</div>
            </div>
            <div className="bg-white p-4 lg:p-6 rounded-lg text-center shadow-md">
              <div className="text-3xl lg:text-4xl font-bold text-darkBlue mb-1">
                300+
              </div>
              <div className="text-sm lg:text-base text-gray-700">New Sofas Built</div>
            </div>
            <div className="bg-white p-4 lg:p-6 rounded-lg text-center shadow-md">
              <div className="text-3xl lg:text-4xl font-bold text-darkBlue mb-1">
                4
              </div>
              <div className="text-sm lg:text-base text-gray-700">Cities Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;