"use client";

import { useState, useEffect } from "react";
import { EditableWrapper } from "../editable-wrapper";

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

interface CarouselBlockProps {
  slides?: CarouselSlide[];
  autoplay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function CarouselBlock({
  slides = [
    {
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
      title: "Welcome to Our Platform",
      description: "Build amazing things with our powerful tools",
      buttonText: "Get Started",
      buttonLink: "#",
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
      title: "Collaborate with Your Team",
      description: "Work together seamlessly across projects",
      buttonText: "Learn More",
      buttonLink: "#",
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
      title: "Achieve Your Goals",
      description: "Track progress and celebrate success",
      buttonText: "Start Now",
      buttonLink: "#",
    },
  ],
  autoplay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  _editMode = false,
  _onPropChange,
}: CarouselBlockProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!autoplay || _editMode) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, autoplay, interval, _editMode]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div
              className={`max-w-4xl transition-all duration-700 delay-200 ${
                index === currentSlide
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fadeInUp">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                {slide.description}
              </p>
              {slide.buttonText && (
                <a
                  href={slide.buttonLink}
                  className="inline-flex items-center justify-center rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 gradient-primary text-white hover:scale-105 glow-on-hover h-12 sm:h-14 px-8 sm:px-10 shadow-lg animate-fadeInUp"
                  style={{ animationDelay: '0.2s' }}
                >
                  {slide.buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-110"
            disabled={isTransitioning}
          >
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-110"
            disabled={isTransitioning}
          >
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
