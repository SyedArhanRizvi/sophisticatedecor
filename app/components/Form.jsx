"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Form() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate right side
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate form fields
      gsap.fromTo(
        formRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call here to send the lead data
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", phone: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 bg-gray-900 overflow-hidden"
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Contact Information */}
            <div
              ref={leftRef}
              className="relative bg-mint p-8 lg:p-12 flex flex-col justify-between min-h-[600px]"
            >
              {/* Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-darkGreen/10 to-transparent"></div>
                {/* Map-like pattern */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 50 L350 50 L350 350 L50 350 Z"
                    stroke="#2d5016"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                  <path
                    d="M100 100 L300 100 L300 300 L100 300 Z"
                    stroke="#2d5016"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                  <circle cx="200" cy="200" r="30" fill="#2d5016" opacity="0.2" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
                  Let's get in touch
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  We're open for any suggestion or just to have a chat.
                </p>

                {/* Contact Details */}
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="bg-darkGreen/10 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-darkGreen"
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
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <div className="flex flex-col gap-1">
                        <a
                          href="tel:+919027418414"
                          className="text-darkBlue font-semibold hover:text-darkGreen transition-colors"
                        >
                          +91 90274 18414
                        </a>
                        <a
                          href="tel:+918791551332"
                          className="text-darkBlue font-semibold hover:text-darkGreen transition-colors"
                        >
                          +91 87915 51332
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="bg-darkGreen/10 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-darkGreen"
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
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a
                        href="mailto:info@sophisticatedecor.com"
                        className="text-darkBlue font-semibold hover:text-darkGreen transition-colors"
                      >
                        info@sophisticatedecor.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="bg-darkGreen/10 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-darkGreen"
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
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Location</p>
                      <p className="text-darkBlue font-semibold">
                        Noida, Gurugram, Greater Noida & Delhi
                        <br />
                        <span className="text-gray-700 text-sm font-normal">
                          Delhi-NCR, India
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="relative z-10 mt-8">
                <div className="flex items-center gap-2 text-darkGreen">
                  <div className="h-px flex-1 bg-darkGreen/30"></div>
                  <div className="w-2 h-2 rounded-full bg-darkGreen"></div>
                  <div className="h-px flex-1 bg-darkGreen/30"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div
              ref={rightRef}
              className="bg-darkGreen p-8 lg:p-12 flex flex-col justify-center min-h-[600px]"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-darkGreen border-2 border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-white/70"
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
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                      className="w-full pl-12 pr-4 py-4 bg-darkGreen border-2 border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full px-4 py-4 bg-darkGreen border-2 border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-darkGreen border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-darkGreen-dark transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>SEND MESSAGE</span>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Form;
