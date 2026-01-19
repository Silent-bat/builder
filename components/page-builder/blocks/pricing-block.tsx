import { EditableWrapper } from "../editable-wrapper";

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingBlockProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function PricingBlock({
  title = "Pricing Plans",
  subtitle = "Choose the perfect plan for your needs",
  tiers = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic features", "Up to 5 projects", "Community support"]
    },
    {
      name: "Pro",
      price: "$29",
      features: ["All Free features", "Unlimited projects", "Priority support", "Advanced analytics"],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["All Pro features", "Custom integrations", "Dedicated support", "SLA guarantee"]
    }
  ],
  _editMode = false,
  _onPropChange
}: PricingBlockProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words"
            placeholder="Enter pricing title..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm md:max-w-none mx-auto">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`p-6 sm:p-8 border rounded-lg transition-all break-words ${tier.highlighted ? 'border-primary shadow-lg md:scale-105' : ''}`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 break-words">{tier.name}</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 break-words">
                {tier.price}
                {tier.price !== "Custom" && <span className="text-xs sm:text-sm font-normal text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    <span className="break-words">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 sm:py-2.5 px-4 rounded-md text-sm sm:text-base font-medium transition-colors truncate ${
                tier.highlighted 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'border border-border hover:bg-accent'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
