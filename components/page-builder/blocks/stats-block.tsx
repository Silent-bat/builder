interface Stat {
  value: string;
  label: string;
  icon?: string;
}

interface StatsBlockProps {
  stats?: Stat[];
  backgroundColor?: string;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function StatsBlock({
  stats = [
    { value: "10,000+", label: "Active Users", icon: "👥" },
    { value: "99.9%", label: "Uptime", icon: "⚡" },
    { value: "50+", label: "Features", icon: "✨" },
    { value: "24/7", label: "Support", icon: "💬" }
  ],
  backgroundColor = "muted",
  _editMode = false,
  _onPropChange
}: StatsBlockProps) {
  const bgClass = backgroundColor === "primary" 
    ? "gradient-primary text-white" 
    : "bg-muted/30";

  return (
    <section className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 ${bgClass} overflow-hidden relative`}>
      {backgroundColor === "primary" && (
        <div className="absolute inset-0 gradient-glow opacity-20" />
      )}
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center break-words animate-fadeInUp"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              {stat.icon && (
                <div className="text-4xl sm:text-5xl mb-3 animate-float" 
                     style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </div>
              )}
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 break-words text-gradient-primary">
                {stat.value}
              </div>
              <div className={`text-sm sm:text-base uppercase tracking-wider opacity-80 break-words font-medium ${backgroundColor === "primary" ? "" : "text-muted-foreground"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
