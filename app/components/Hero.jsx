"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imagesRef = useRef(null);
  const statsRef = useRef(null);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
          {/* Left Side - Email Signup */}
          <div className="space-y-4">
            <p className="text-gray-700 text-base sm:text-lg">
              Transform your space with our premium furniture solutions. Get exclusive updates and design inspiration.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-transparent bg-white"
              />
              <button className="w-12 h-12 bg-darkGreen hover:bg-darkGreen-dark text-white rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl">
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
              </button>
            </div>
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