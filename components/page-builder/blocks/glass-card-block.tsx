"use client";

import { EditableWrapper } from "../editable-wrapper";

interface GlassCard {
  title: string;
  description: string;
  icon?: string;
}

interface GlassCardBlockProps {
  title?: string;
  subtitle?: string;
  cards?: GlassCard[];
  backgroundType?: "gradient" | "image" | "animated";
  backgroundImage?: string;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function GlassCardBlock({
  title = "Glassmorphism Design",
  subtitle = "Modern transparent cards with blur effect",
  cards = [
    {
      title: "Premium Quality",
      description: "Experience the highest quality with our glassmorphic design",
      icon: "✨",
    },
    {
      title: "Modern Aesthetic",
      description: "Clean, contemporary look that stands out",
      icon: "🎨",
    },
    {
      title: "Smooth Effects",
      description: "Blur and transparency create depth",
      icon: "🌊",
    },
  ],
  backgroundType = "gradient",
  backgroundImage = "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600",
  _editMode = false,
  _onPropChange,
}: GlassCardBlockProps) {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      {backgroundType === "gradient" && (
        <div className="absolute inset-0 gradient-mesh animate-gradient-shift" />
      )}
      {backgroundType === "image" && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {backgroundType === "animated" && (
        <>
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 blur-xl animate-float"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            placeholder="Enter title..."
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {title}
            </h2>
          </EditableWrapper>

          <EditableWrapper
            value={subtitle}
            onChange={(value) => _onPropChange?.("subtitle", value)}
            isEditMode={_editMode}
            as="p"
            className="text-lg sm:text-xl text-white/80"
            placeholder="Enter subtitle..."
          >
            <p className="text-lg sm:text-xl text-white/80">{subtitle}</p>
          </EditableWrapper>
        </div>

        {/* Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              {card.icon && (
                <div className="text-6xl mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {card.icon}
                </div>
              )}

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {card.description}
              </p>

              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
