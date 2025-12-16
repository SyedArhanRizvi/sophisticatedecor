"use client";

import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { usePopup } from "../context/PopupContext";

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzLS7hIONLeu0FRHPix2yYu-yrhX84sGG_U1wvoNJ2qcojW5VoeHQPDaTmCZ_AOslfy/exec";

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
  const [errors, setErrors] = useState({});
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

  // Name validation
  const validateName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return { valid: false, message: "Name is required" };
    }
    if (trimmed.length < 2) {
      return { valid: false, message: "Name must be at least 2 characters" };
    }
    if (trimmed.length > 50) {
      return { valid: false, message: "Name must be less than 50 characters" };
    }
    // Check if name contains only letters, spaces, and common name characters
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
      return { valid: false, message: "Name can only contain letters and spaces" };
    }
    return { valid: true, cleaned: trimmed };
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
    setErrors({});

    // Validate name
    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) {
      setErrors({ name: nameValidation.message });
      setResponseMessage(nameValidation.message);
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      setErrors({ phone: "Phone number is required" });
      setResponseMessage("Phone number is required");
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    const phoneValidation = validateIndianPhone(formData.phone);
    if (!phoneValidation.valid) {
      setErrors({ phone: phoneValidation.message });
      setResponseMessage(phoneValidation.message);
      setResponseType("error");
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    setIsLoading(true);

    const now = new Date();
    const payload = {
      name: nameValidation.cleaned,
      phone: phoneValidation.cleaned,
      message: formData.message.trim() || "No message",
      date: now.toLocaleDateString("en-GB"), // dd/mm/yyyy
      time: now.toLocaleTimeString(), // hh:mm:ss
    };

    try {
      const result = await sendToGoogleSheet(payload);

      setIsLoading(false);

      if (result.success) {
        setResponseMessage("Enquiry saved ✅");
        setResponseType("success");
        setShowResponse(true);
        setFormData({ name: "", phone: "", message: "" });
        setErrors({});
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
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
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
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="popup-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="popup-phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="popup-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="+91 87915 51332 or 8791551332"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">Enter 10-digit Indian mobile number (starts with 6-9)</p>
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