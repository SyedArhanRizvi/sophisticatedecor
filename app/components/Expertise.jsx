"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 10, suffix: "+", label: "Interior Projects" },
  { number: 500, suffix: "+", label: "Sofas Repaired" },
  { number: 300, suffix: "+", label: "New Sofas Built" },
  { number: 4, suffix: "", label: "Cities Served" },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Premium Materials",
    description: "We use only the finest fabrics, foams, and hardware for lasting quality.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Skilled Artisans",
    description: "Our master craftsmen bring decades of experience to every project.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "On-Time Delivery",
    description: "We respect your time and deliver projects as promised, every time.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Quality Guarantee",
    description: "We stand behind our work with comprehensive quality assurance.",
  },
];

const Expertise = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const statRefs = useRef([]);
  const featureRefs = useRef([]);

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

      // Animate stats with counter
      statRefs.current.forEach((stat, index) => {
        if (!stat) return;
        const numberElement = stat.querySelector(".stat-number");

        gsap.fromTo(
          stat,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        if (numberElement) {
          const statData = stats[index];
          const obj = { value: 0 };
          gsap.to(obj, {
            value: statData.number,
            duration: 2,
            delay: index * 0.1 + 0.3,
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              if (numberElement) {
                numberElement.textContent =
                  Math.round(obj.value) + statData.suffix;
              }
            },
          });
        }
      });

      // Animate features
      featureRefs.current.forEach((feature, index) => {
        if (!feature) return;

        gsap.fromTo(
          feature,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: feature,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="expertise" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
            Our Expertise
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Trusted across Noida, Gurugram, Greater Noida & Delhi for exceptional craftsmanship
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statRefs.current[index] = el)}
              className="text-center p-6 bg-mint rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-4xl md:text-5xl font-bold text-darkGreen mb-2">
                <span className="stat-number">{stat.number + stat.suffix}</span>
              </div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-darkGreen mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-darkBlue mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;

