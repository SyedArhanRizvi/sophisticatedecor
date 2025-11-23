"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePopup } from "../context/PopupContext";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Sofa Repair & Re-Upholstery",
    description:
      "Expert sofa repair and re-upholstery services across Noida, Gurugram, Greater Noida, and Delhi. We restore your beloved sofas to their original glory using premium luxury fabrics and materials. Our skilled artisans ensure perfect fit and finish, giving your furniture a new lease on life. From minor repairs to complete re-upholstery, we handle all types of sofas with precision and care.",
    image: "/sofa3.jpg",
    reverse: true, // Odd position (1st) - image right, text left
  },
  {
    title: "New Sofa Manufacturing",
    description:
      "Custom luxury sofa manufacturing tailored to your preferences. From design consultation to final delivery, we create bespoke sofas that match your style and space requirements. Serving Noida, Gurugram, Greater Noida, and Delhi with premium craftsmanship and amazing furniture designs. Choose from various styles, fabrics, and sizes to create your perfect sofa.",
    image: "/sofa1.jpg",
    reverse: false, // Even position (2nd) - image left, text right
  },
  {
    title: "Chair Manufacturing",
    description:
      "Premium chair manufacturing services for your home and office. We create elegant and comfortable chairs from scratch, customized to your specifications. Whether you need dining chairs, office chairs, or accent chairs, our experienced team delivers quality workmanship. Available across Noida, Gurugram, Greater Noida, and Delhi with on-time delivery guarantee.",
    image: "/chair6.jpg",
    reverse: true, // Odd position (3rd) - image right, text left
  },
  {
    title: "Bed Manufacturing",
    description:
      "Custom luxury bed manufacturing services for your bedroom. We design and build premium beds that combine comfort, style, and functionality. From modern platform beds to classic wooden beds, our experienced team creates quality furniture that matches your interior design. Available across Noida, Gurugram, Greater Noida, and Delhi with exceptional craftsmanship.",
    image: "/bed5.jpg",
    reverse: false, // Even position (4th) - image left, text right
  },
  {
    title: "Interior Design Projects",
    description:
      "Complete interior design solutions for residential and commercial spaces. With 10+ major interior projects completed, we transform spaces with luxury furniture, custom designs, and comprehensive solutions. From living rooms to kitchens, bedrooms to offices, we provide end-to-end interior design services. Trusted across Noida, Gurugram, Greater Noida, and Delhi for exceptional interior design services.",
    image: "/living1.jpg",
    reverse: true, // Odd position (5th) - image right, text left
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const serviceRefs = useRef([]);
  const { openPopup } = usePopup();

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

      // Animate each service
      serviceRefs.current.forEach((service, index) => {
        if (!service) return;

        const image = service.querySelector(".service-image");
        const content = service.querySelector(".service-content");
        const isReverse = services[index]?.reverse;

        gsap.fromTo(
          image,
          { x: isReverse ? 100 : -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: service,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
              trigger: service,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-mint">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Premium furniture solutions and interior design services across Delhi-NCR
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (serviceRefs.current[index] = el)}
              className={`flex flex-col ${
                service.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-8 lg:gap-12`}
            >
              {/* Image */}
              <div className="service-image w-full lg:w-1/2 relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="service-content w-full lg:w-1/2">
                <h3 className="text-3xl font-bold text-darkBlue mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <button 
                  onClick={openPopup}
                  className="bg-darkGreen text-white px-6 py-3 rounded-lg hover:bg-darkGreen-dark transition-colors duration-200 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

