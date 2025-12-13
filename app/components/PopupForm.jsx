"use client";

import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { usePopup } from "../context/PopupContext";

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyqRBhfFO0y2FZ_H83QHixRRNgyuYQd4EJjTfBozIeUWONvN4z6Q1zpRPyV-gWzcVes/exec";

const PopupForm = () => {
  const { isOpen, openPopup, closePopup, hasSubmitted, markAsSubmitted } = usePopup();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("success"); // 'success' or 'error'
  const popupTimerRef = useRef(null);
  const hasShownOnceRef = useRef(false);

  useEffect(() => {
    // Don't show popup if user has already submitted
    if (hasSubmitted) return;

    // Show popup after 5 seconds on initial load (only once)
    if (!hasShownOnceRef.current) {
      const initialTimer = setTimeout(() => {
        if (!hasSubmitted) {
          openPopup();
          hasShownOnceRef.current = true;
        }
      }, 5000);

      return () => clearTimeout(initialTimer);
    }
  }, [hasSubmitted, openPopup]);

  useEffect(() => {
    // Clear any existing timer
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }

    // If popup is closed (after being shown at least once) and form hasn't been submitted, show again after 10 seconds
    if (!isOpen && hasShownOnceRef.current && !hasSubmitted) {
      popupTimerRef.current = setTimeout(() => {
        if (!hasSubmitted) {
          openPopup();
        }
      }, 10000);
    }

    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
        popupTimerRef.current = null;
      }
    };
  }, [isOpen, hasSubmitted, openPopup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResponse(false);

    const now = new Date();
    const payload = {
      name: formData.name,
      phone: formData.phone,
      message: formData.message || "No message",
      date: now.toLocaleDateString("en-GB"), // dd/mm/yyyy
      time: now.toLocaleTimeString(), // hh:mm:ss
    };

    try {
      const res = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setIsLoading(false);

      if (data.success || res.ok) {
        setResponseMessage("Enquiry saved ✅");
        setResponseType("success");
        setShowResponse(true);
        setFormData({ name: "", phone: "", message: "" });
        markAsSubmitted();
        
        // Close popup after 2 seconds
        setTimeout(() => {
          setShowResponse(false);
          closePopup();
        }, 2000);
      } else {
        setResponseMessage("Error saving enquiry ❌");
        setResponseType("error");
        setShowResponse(true);
      }
    } catch (err) {
      setIsLoading(false);
      setResponseMessage("Server error ❌");
      setResponseType("error");
      setShowResponse(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoClose className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-darkBlue mb-2">
            Get a Call Back
          </h3>
          <p className="text-gray-600 text-sm">
            Fill in your details and we'll call you shortly
          </p>
        </div>

        {/* Response Popup */}
        {showResponse && (
          <div className={`mb-4 p-4 rounded-lg ${
            responseType === "success" 
              ? "bg-green-50 border-2 border-green-500 text-green-800" 
              : "bg-red-50 border-2 border-red-500 text-red-800"
          }`}>
            <p className="font-semibold text-center">{responseMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="popup-name" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="popup-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="popup-phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="popup-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="popup-message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              id="popup-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              disabled={isLoading}
              placeholder="Tell us about your requirement..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-darkGreen to-darkGreen-dark text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
  );
};

export default PopupForm;