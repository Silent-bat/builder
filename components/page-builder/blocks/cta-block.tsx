import { EditableWrapper } from "../editable-wrapper";

interface CTABlockProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function CTABlock({
  title = "Ready to get started?",
  description = "Join thousands of users already using our platform",
  buttonText = "Sign Up Now",
  buttonLink = "/auth/sign-up",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "#",
  _editMode = false,
  _onPropChange
}: CTABlockProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-4xl mx-auto w-full text-center">
        <EditableWrapper
          value={title}
          onChange={(value) => _onPropChange?.("title", value)}
          isEditMode={_editMode}
          as="h2"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words"
          placeholder="Enter CTA title..."
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words">{title}</h2>
        </EditableWrapper>
        
        <EditableWrapper
          value={description}
          onChange={(value) => _onPropChange?.("description", value)}
          isEditMode={_editMode}
          multiline
          as="p"
          className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 px-2 break-words"
          placeholder="Enter description..."
        >
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 px-2 break-words">{description}</p>
        </EditableWrapper>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-2">
          <EditableWrapper
            value={buttonText}
            onChange={(value) => _onPropChange?.("buttonText", value)}
            isEditMode={_editMode}
            className="inline-flex items-center justify-center rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 bg-white text-gray-900 hover:scale-105 hover:shadow-2xl h-12 sm:h-14 px-8 sm:px-10 whitespace-nowrap"
            placeholder="Button text..."
          >
            <a 
              href={buttonLink}
              className="inline-flex items-center justify-center rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 bg-white text-gray-900 hover:scale-105 hover:shadow-2xl h-12 sm:h-14 px-8 sm:px-10 whitespace-nowrap"
            >
              {buttonText}
            </a>
          </EditableWrapper>
          
          {secondaryButtonText && (
            <EditableWrapper
              value={secondaryButtonText}
              onChange={(value) => _onPropChange?.("secondaryButtonText", value)}
              isEditMode={_editMode}
              className="inline-flex items-center justify-center rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 border-2 border-white/30 hover:bg-white/10 hover:border-white/50 h-12 sm:h-14 px-8 sm:px-10 whitespace-nowrap backdrop-blur-sm"
              placeholder="Secondary button text..."
            >
              <a 
                href={secondaryButtonLink}
                className="inline-flex items-center justify-center rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 border-2 border-white/30 hover:bg-white/10 hover:border-white/50 h-12 sm:h-14 px-8 sm:px-10 whitespace-nowrap backdrop-blur-sm"
              >
                {secondaryButtonText}
              </a>
            </EditableWrapper>
          )}
        </div>
      </div>
    </section>
  );
}
