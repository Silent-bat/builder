"use client";

import { EditableWrapper } from "../editable-wrapper";

interface HeroBlockProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function HeroBlock({ 
  title = "Welcome to Our Platform",
  subtitle = "Build amazing things with our powerful tools",
  buttonText = "Get Started",
  buttonLink = "#",
  backgroundImage,
  _editMode = false,
  _onPropChange
}: HeroBlockProps) {
  return (
    <section 
      className="relative py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 lg:px-20 min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30 animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
      
      <div className="relative max-w-5xl mx-auto w-full">
        <EditableWrapper
          value={title}
          onChange={(value) => _onPropChange?.("title", value)}
          isEditMode={_editMode}
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 px-2 break-words hyphens-auto leading-tight tracking-tight animate-fadeInUp"
          placeholder="Enter hero title..."
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 px-2 break-words hyphens-auto leading-tight tracking-tight animate-fadeInUp">{title}</h1>
        </EditableWrapper>
        
        <EditableWrapper
          value={subtitle}
          onChange={(value) => _onPropChange?.("subtitle", value)}
          isEditMode={_editMode}
          multiline
          as="p"
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 px-2 break-words max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' } as any}
          placeholder="Enter subtitle..."
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 px-2 break-words max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>{subtitle}</p>
        </EditableWrapper>
        
        <div className="inline-block animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <EditableWrapper
            value={buttonText}
            onChange={(value) => _onPropChange?.("buttonText", value)}
            isEditMode={_editMode}
            className="inline-flex items-center justify-center rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 gradient-primary text-white hover:scale-105 glow-on-hover h-12 sm:h-14 px-8 sm:px-10 whitespace-nowrap shadow-lg"
            placeholder="Button text..."
          >
            <a 
              href={buttonLink}
              className="inline-flex items-center justify-center rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 gradient-primary text-white hover:scale-105 glow-on-hover h-12 sm:h-14 px-8 sm:px-10 whitespace-nowrap shadow-lg"
            >
              {buttonText}
            </a>
          </EditableWrapper>
        </div>
      </div>
    </section>
  );
}
