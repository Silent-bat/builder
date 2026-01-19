import { EditableWrapper } from "../editable-wrapper";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsBlockProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function TestimonialsBlock({
  title = "What Our Users Say",
  subtitle = "Join thousands of satisfied customers",
  testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "This platform has transformed how we build and deploy applications. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      content: "The best boilerplate I've used. Saved us months of development time.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Product Manager",
      content: "Incredible features out of the box. Our team loves the admin panel and analytics.",
      rating: 5
    }
  ],
  _editMode = false,
  _onPropChange
}: TestimonialsBlockProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words"
            placeholder="Enter testimonials title..."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-5 sm:p-6 bg-background border rounded-lg shadow-sm break-words">
              {testimonial.rating && (
                <div className="flex gap-1 mb-3 sm:mb-4 flex-wrap">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500 text-sm sm:text-base">⭐</span>
                  ))}
                </div>
              )}
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 italic break-words">"{testimonial.content}"</p>
              <div className="flex items-center gap-3 min-w-0">
                {testimonial.avatar ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                    {testimonial.name[0]}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
