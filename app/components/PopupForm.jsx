"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { usePopup } from "../context/PopupContext";

const PopupForm = () => {
  const { isOpen, openPopup, closePopup } = usePopup();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    // Open popup after 5 seconds on initial load - only once
    const hasAutoOpened = localStorage.getItem("popupAutoOpened");
    
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        if (!isOpen) {
          openPopup();
          localStorage.setItem("popupAutoOpened", "true");
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, openPopup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you! We'll call you soon.");
    setFormData({ name: "", phone: "", message: "" });
    closePopup();
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
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all"
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
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all"
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
              placeholder="Tell us about your requirement..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-darkGreen to-darkGreen-dark text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Get a Call Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;

