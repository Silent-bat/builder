"use client";

import { useEffect, useRef, useState } from "react";
import { EditableWrapper } from "../editable-wrapper";

interface ParallaxBlockProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  speed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function ParallaxBlock({
  backgroundImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
  title = "Parallax Effect",
  subtitle = "Scroll to see the magic happen",
  speed = 0.5,
  overlay = true,
  overlayOpacity = 0.5,
  _editMode = false,
  _onPropChange,
}: ParallaxBlockProps) {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const relativeScroll = scrolled - elementTop + windowHeight;
        setOffsetY(relativeScroll * speed);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${_editMode ? 0 : offsetY}px) scale(1.2)`,
          transition: _editMode ? 'none' : 'transform 0.1s ease-out',
        }}
      />

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
            placeholder="Enter parallax title..."
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
              {title}
            </h2>
          </EditableWrapper>

          <EditableWrapper
            value={subtitle}
            onChange={(value) => _onPropChange?.("subtitle", value)}
            isEditMode={_editMode}
            multiline
            as="p"
            className="text-lg sm:text-xl md:text-2xl text-white/90"
            placeholder="Enter subtitle..."
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/90">
              {subtitle}
            </p>
          </EditableWrapper>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
