import { EditableWrapper } from "../editable-wrapper";

interface Category {
  name: string;
  image: string;
  productCount: number;
  link: string;
}

interface CategoryShowcaseProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function CategoryShowcaseBlock({ 
  title, 
  subtitle = "", 
  categories = [],
  _editMode = false,
  _onPropChange
}: CategoryShowcaseProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-muted/30">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words"
            placeholder="Enter category title..."
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words">
              {title}
            </h2>
          </EditableWrapper>
          {subtitle && (
            <EditableWrapper
              value={subtitle}
              onChange={(value) => _onPropChange?.("subtitle", value)}
              isEditMode={_editMode}
              as="p"
              className="text-base sm:text-lg text-muted-foreground break-words"
              placeholder="Enter subtitle..."
            >
              <p className="text-base sm:text-lg text-muted-foreground break-words">
                {subtitle}
              </p>
            </EditableWrapper>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="group relative aspect-square rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={category.image || "https://via.placeholder.com/400"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1 break-words">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80">
                  {category.productCount} Products
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
