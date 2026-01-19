"use client";

import { EditableWrapper } from "../editable-wrapper";

interface AnimatedBackgroundBlockProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  animationType?: "particles" | "waves" | "gradient" | "grid";
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function AnimatedBackgroundBlock({
  title = "Animated Backgrounds",
  subtitle = "Create stunning visual experiences",
  buttonText = "Get Started",
  buttonLink = "#",
  animationType = "particles",
  _editMode = false,
  _onPropChange,
}: AnimatedBackgroundBlockProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Backgrounds */}
      {animationType === "particles" && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      {animationType === "waves" && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="rgba(255,255,255,0.1)"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-[wave_20s_ease-in-out_infinite]"
            />
            <path
              fill="rgba(255,255,255,0.05)"
              fillOpacity="1"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-[wave_15s_ease-in-out_infinite_reverse]"
            />
          </svg>
        </div>
      )}

      {animationType === "gradient" && (
        <div className="absolute inset-0 animate-gradient-shift" style={{
          background: 'linear-gradient(270deg, #6366F1, #8B5CF6, #EC4899, #F59E0B)',
          backgroundSize: '400% 400%',
        }} />
      )}

      {animationType === "grid" && (
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
            }}
          />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary blur-3xl"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
        <EditableWrapper
          value={title}
          onChange={(value) => _onPropChange?.("title", value)}
          isEditMode={_editMode}
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fadeInUp"
          placeholder="Enter title..."
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fadeInUp">
            {title}
          </h1>
        </EditableWrapper>

        <EditableWrapper
          value={subtitle}
          onChange={(value) => _onPropChange?.("subtitle", value)}
          isEditMode={_editMode}
          multiline
          as="p"
          className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-10 animate-fadeInUp"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' } as any}
          placeholder="Enter subtitle..."
        >
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-10 animate-fadeInUp"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            {subtitle}
          </p>
        </EditableWrapper>

        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <EditableWrapper
            value={buttonText}
            onChange={(value) => _onPropChange?.("buttonText", value)}
            isEditMode={_editMode}
            className="inline-flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-300 bg-white text-gray-900 hover:scale-105 hover:shadow-2xl h-14 px-10"
            placeholder="Button text..."
          >
            <a
              href={buttonLink}
              className="inline-flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-300 bg-white text-gray-900 hover:scale-105 hover:shadow-2xl h-14 px-10"
            >
              {buttonText}
            </a>
          </EditableWrapper>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </section>
  );
}
