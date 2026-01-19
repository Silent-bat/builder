import { EditableWrapper } from "../editable-wrapper";

interface TimelineStep {
  title: string;
  description: string;
  icon?: string;
}

interface TimelineBlockProps {
  title?: string;
  subtitle?: string;
  steps?: TimelineStep[];
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function TimelineBlock({
  title = "How It Works",
  subtitle = "Get started in three simple steps",
  steps = [
    {
      title: "Sign Up",
      description: "Create your account in seconds. No credit card required.",
      icon: "1"
    },
    {
      title: "Customize",
      description: "Tailor the platform to your needs with our intuitive interface.",
      icon: "2"
    },
    {
      title: "Launch",
      description: "Go live and start seeing results immediately.",
      icon: "3"
    }
  ],
  _editMode = false,
  _onPropChange
}: TimelineBlockProps) {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2 break-words"
            placeholder="Enter timeline title..."
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2 break-words">{title}</h2>
          </EditableWrapper>
          
          <EditableWrapper
            value={subtitle}
            onChange={(value) => _onPropChange?.("subtitle", value)}
            isEditMode={_editMode}
            as="p"
            className="text-base sm:text-lg md:text-xl text-muted-foreground px-2 break-words"
            placeholder="Enter subtitle..."
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2 break-words">{subtitle}</p>
          </EditableWrapper>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30 hidden md:block" 
               style={{ marginLeft: '1.5rem' }} />

          <div className="space-y-12 md:space-y-20">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start animate-fadeInUp`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Step Number/Icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl gradient-primary flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-lg animate-glow-pulse">
                    {step.icon || (index + 1)}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl gradient-primary opacity-20 blur-xl animate-glow-pulse" />
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-left'}`}>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 break-words">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground break-words leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
