"use client"
import React, { useEffect, useRef } from "react";
import "./style.css";

interface GalleryItem {
  name: string;
  url: string;
}

interface HorizontalGalleryProps {
  items: GalleryItem[];
  speed?: number; // pixels per second
  itemWidth?: number; // width of each item in pixels
  gap?: number; // gap between items in pixels
  direction?: "left" | "right";
}

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  items,
  speed = 50,
  itemWidth = 300,
  gap = 20,
  direction = "left",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startTime: number;
    let scrollPosition = 0;

    // Detect if we're on mobile (you can tweak this breakpoint)
    const isMobile = window.innerWidth < 768;
    const effectiveSpeed = isMobile ? speed * 0.5 : speed; // reduce speed by 50% on mobile

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const delta = (elapsed * effectiveSpeed) / 1000;

      // Calculate total width of one set of items
      const totalItemWidth = itemWidth + gap;
      const setWidth = items.length * totalItemWidth;

      // Update scroll position based on direction
      scrollPosition =
        direction === "right"
          ? setWidth - (delta % setWidth)
          : delta % setWidth;

      container.style.transform = `translateX(-${scrollPosition}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [items, speed, itemWidth, gap, direction]);

  const renderItems = (startIndex: number = 0) => {
    return items.map((item) => (
      <div
        key={`${startIndex}-${item.name}`}
        className="gallery-item aspect-[201/90] w-[21dvh]"
      >
        <img
          src={item.url}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="object-center"
        />
      </div>
    ));
  };

  return (
    <div className="gallery-wrapper">
      <div
        ref={containerRef}
        className="gallery-container py-1 gap-3"
        style={{
          display: "flex",
          willChange: "transform",
        }}
      >
        {/* Render items multiple times for seamless loop */}
        {renderItems(0)}
        {renderItems(1)}
        {renderItems(2)}
      </div>
    </div>
  );
};

