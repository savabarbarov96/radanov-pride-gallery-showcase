"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import LazyImage from "@/components/ui/lazy-image";

type Card = {
  id: number | string;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  alt?: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [hoveredCard, setHoveredCard] = useState<Card | null>(null);

  const handleMouseEnter = (card: Card) => {
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative min-h-[600px]">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "min-h-[300px]")}>
          <div
            onMouseEnter={() => handleMouseEnter(card)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "relative overflow-hidden cursor-pointer bg-white rounded-xl h-full w-full shadow-lg hover:shadow-xl transition-all duration-500",
              "hover:scale-105 transform",
              i % 3 === 0 ? "animate-float-gentle" : i % 3 === 1 ? "animate-float-slow" : "animate-float"
            )}
            style={{
              animationDelay: `${i * 0.2}s`
            }}
          >
            {hoveredCard?.id === card.id && <HoverCard card={hoveredCard} />}
            <ImageComponent card={card} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <LazyImage
      src={card.thumbnail}
      alt={card.alt ?? "Maine Coon cat"}
      wrapperClassName="absolute inset-0 h-full w-full rounded-xl"
      placeholderClassName="rounded-xl"
      aspectRatio={1}
      className="hover:scale-105 transition-transform duration-500"
    />
  );
};

const HoverCard = ({ card }: { card: Card | null }) => {
  return (
    <motion.div 
      className="absolute inset-0 bg-transparent h-full w-full flex flex-col justify-end rounded-xl shadow-2xl z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 rounded-xl" />
      <motion.div 
        className="relative px-6 pb-6 z-[70]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {card?.content}
      </motion.div>
    </motion.div>
  );
};
