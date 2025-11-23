"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Noida",
    rating: 5,
    text: "Excellent service! They repaired my old sofa and it looks brand new. The team was professional, punctual, and the quality of work is outstanding. Highly recommend for sofa repair in Noida.",
  },
  {
    name: "Priya Sharma",
    location: "Gurugram",
    rating: 5,
    text: "Got a custom bed made for our new home. The craftsmanship is exceptional and they delivered exactly on time. The attention to detail is remarkable. Best furniture service in Gurugram!",
  },
  {
    name: "Amit Singh",
    location: "Delhi",
    rating: 5,
    text: "Had my recliner repaired and re-upholstered. The service was quick, affordable, and the results exceeded my expectations. Great value for money. Will definitely use their services again.",
  },
  {
    name: "Sunita Mehta",
    location: "Greater Noida",
    rating: 5,
    text: "Professional team, quality materials, and excellent workmanship. They transformed our living room with their custom sofa manufacturing service. Very satisfied with the entire process.",
  },
  {
    name: "Vikram Malhotra",
    location: "Noida",
    rating: 5,
    text: "Outstanding upholstery work on our dining chairs. The fabric selection was great and the finish is perfect. They truly understand quality and customer satisfaction. Top-notch service!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate card
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [currentIndex]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
            Client Feedback
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            What our satisfied customers say about us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div ref={cardRef} className="bg-mint rounded-lg p-8 md:p-12 shadow-lg relative">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p
              ref={textRef}
              className="text-lg md:text-xl text-gray-700 mb-6 text-center italic leading-relaxed"
            >
              "{currentTestimonial.text}"
            </p>

            {/* Author */}
            <div className="text-center">
              <p className="font-bold text-gray-900 text-lg">
                {currentTestimonial.name}
              </p>
              <p className="text-gray-600">{currentTestimonial.location}</p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-700"
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

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-darkGreen w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

