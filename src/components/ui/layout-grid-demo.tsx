"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { LayoutGrid } from "@/components/ui/layout-grid";

// Import the new asset images with digits/letters
import image1 from "@/assets/66971fa7-cedb-4c2f-8201-1eafd603c1fc.jpg";
import image2 from "@/assets/cbec1a69-b126-4aba-acf0-b6114d2e3ebe.jpg";
import image3 from "@/assets/9274d091-96de-4d71-abd1-fe6214ea8876.jpg";
import image4 from "@/assets/b44e0f3b-584c-4942-8c19-35d2c7f11fbd.jpg";

export default function LayoutGridDemo() {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Create static cards with the new asset images
  const cards = [
    {
      id: "card1",
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            DESIGN
          </p>
          <p className="font-normal text-base text-white uppercase tracking-wide">CREATIVE SHOWCASE</p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Explore our stunning visual designs featuring unique combinations of letters and numbers
          </p>
          <div className="text-sm text-neutral-300 space-y-1">
            <p>Category: Visual Design</p>
            <p>Type: Digital Art</p>
            <p>Status: Featured</p>
          </div>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: image1,
    },
    {
      id: "card2", 
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            TYPOGRAPHY
          </p>
          <p className="font-normal text-base text-white uppercase tracking-wide">MODERN STYLE</p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Beautiful typographic compositions showcasing the perfect blend of text and imagery
          </p>
          <div className="text-sm text-neutral-300 space-y-1">
            <p>Category: Typography</p>
            <p>Type: Digital Art</p>
            <p>Status: Premium</p>
          </div>
        </div>
      ),
      className: "col-span-1",
      thumbnail: image2,
    },
    {
      id: "card3",
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            GRAPHICS
          </p>
          <p className="font-normal text-base text-white uppercase tracking-wide">ARTISTIC VISION</p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Innovative graphic designs that combine alphanumeric elements with visual storytelling
          </p>
          <div className="text-sm text-neutral-300 space-y-1">
            <p>Category: Graphics</p>
            <p>Type: Digital Art</p>
            <p>Status: Exclusive</p>
          </div>
        </div>
      ),
      className: "col-span-1",
      thumbnail: image3,
    },
    {
      id: "card4",
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            ARTWORK
          </p>
          <p className="font-normal text-base text-white uppercase tracking-wide">PREMIUM COLLECTION</p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Exceptional artwork featuring creative arrangements of characters and design elements
          </p>
          <div className="text-sm text-neutral-300 space-y-1">
            <p>Category: Artwork</p>
            <p>Type: Digital Art</p>
            <p>Status: Limited</p>
          </div>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: image4,
    },
  ];

  return (
    <div 
      ref={ref}
      className="py-20 w-full"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground tracking-wide uppercase mb-2">
            Premium Collection
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-light text-foreground">
            Design Gallery
          </h2>
        </div>
        
        <div className="w-full">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </div>
  );
}