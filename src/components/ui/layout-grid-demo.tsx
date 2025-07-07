"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import modelCat1 from "@/assets/model-cat-1.jpg";
import modelCat2 from "@/assets/model-cat-2.jpg";
import modelCat3 from "@/assets/model-cat-3.jpg";
import featuredCat1 from "@/assets/featured-cat-1.jpg";
import featuredCat2 from "@/assets/featured-cat-2.jpg";

export default function LayoutGridDemo() {
  const [isVisible, setIsVisible] = useState(true); // Start visible for debugging
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

  return (
    <div 
      ref={ref}
      className="py-20 w-full"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-gray-600 tracking-wide uppercase mb-2">
            Premium Collection
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-light text-black">
            Налични котки
          </h2>
        </div>
        
        <div className="w-full">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        OLIVER
      </p>
      <p className="font-normal text-base text-white uppercase tracking-wide">Ginger Magic</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Величествен мъжки мейн кун с изключителни родословни линии. 
        Характеризира се с благородна осанка и нежен темперамент.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        SOPHIA
      </p>
      <p className="font-normal text-base text-white uppercase tracking-wide">Silver Grace</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Елегантна женска с прекрасни сребристи маркировки и изключително 
        социален характер. Перфектна за семейство.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        AURORA
      </p>
      <p className="font-normal text-base text-white uppercase tracking-wide">Cream Perfection</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Нежна красавица с кремав цвят и изключителни качества. 
        Идеална за ценители на рядката красота.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        LUNA
      </p>
      <p className="font-normal text-base text-white uppercase tracking-wide">Midnight Elegance</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Изискана черна красавица с благородни черти и изключителен характер. 
        Символ на елегантност и грация.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: modelCat1,
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: featuredCat1,
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: featuredCat2,
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: modelCat3,
  },
];