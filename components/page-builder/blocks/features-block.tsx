interface Feature {
  title: string;
  description: string;
  icon?: string;
}

import { EditableWrapper } from "../editable-wrapper";

interface FeaturesBlockProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  style?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    columns?: number;
  };
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function FeaturesBlock({
  title = "Features",
  subtitle = "Everything you need to succeed",
  features = [
    { title: "Fast", description: "Lightning-fast performance", icon: "⚡" },
    { title: "Secure", description: "Bank-level security", icon: "🔒" },
    { title: "Reliable", description: "99.9% uptime guarantee", icon: "✓" },
  ],
  style,
  _editMode = false,
  _onPropChange
}: FeaturesBlockProps) {
  const gridCols = style?.columns === 2 ? 'lg:grid-cols-2' : style?.columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  
  return (
    <section 
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundColor: style?.backgroundColor,
        color: style?.textColor,
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words"
            placeholder="Enter features title..."
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words">{title}</h2>
          </EditableWrapper>
          
          <EditableWrapper
            value={subtitle}
            onChange={(value) => _onPropChange?.("subtitle", value)}
            isEditMode={_editMode}
            as="p"
            className="text-base sm:text-lg text-muted-foreground px-2 break-words"
            placeholder="Enter subtitle..."
          >
            <p className="text-base sm:text-lg text-muted-foreground px-2 break-words">{subtitle}</p>
          </EditableWrapper>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6 sm:gap-8`}>
          {features.map((feature, index) => (
            <div key={index} className="text-center p-5 sm:p-6 border rounded-lg hover:shadow-lg transition-shadow break-words">
              {feature.icon && (
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
              )}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 break-words">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground break-words">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
