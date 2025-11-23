"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    image: "/sofa2.jpg",
    title: "Luxury Sofa Design - Noida",
  },
  {
    image: "/bed3.jpg",
    title: "Premium Bed Manufacturing - Gurugram",
  },
  {
    image: "/sofa5.jpg",
    title: "Elegant Sofa Manufacturing - Greater Noida",
  },
  {
    image: "/recliner1.jpg",
    title: "Luxury Recliner Design - Delhi",
  },
  {
    image: "/chair1.jpg",
    title: "Premium Chair Manufacturing - Noida",
  },
  {
    image: "/sofa4.jpg",
    title: "Custom Luxury Sofa Set - Gurugram",
  },
  {
    image: "/kitchen2.jpg",
    title: "Modern Kitchen Interior Design - Delhi",
  },
  {
    image: "/almirah1.jpg",
    title: "Premium Almirah/Wardrobe Design - Greater Noida",
  },
  {
    image: "/tv1.jpg",
    title: "Luxury TV Unit & Entertainment Center - Noida",
  },
];

const Gallery = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemRefs = useRef([]);

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

      // Animate gallery items with stagger
      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
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
    <section ref={sectionRef} id="gallery" className="py-20 bg-mint">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
            Our Work Gallery
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Showcasing our finest luxury furniture craftsmanship and completed projects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="relative h-64 sm:h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="w-full p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

