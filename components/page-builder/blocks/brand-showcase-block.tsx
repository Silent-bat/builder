import { EditableWrapper } from "../editable-wrapper";

interface Brand {
  name: string;
  logo: string;
}

interface BrandShowcaseProps {
  title?: string;
  brands: Brand[];
  backgroundColor?: string;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function BrandShowcaseBlock({ 
  title = "Trusted by leading brands", 
  brands = [],
  backgroundColor = "default",
  _editMode = false,
  _onPropChange
}: BrandShowcaseProps) {
  const bgClass = backgroundColor === "muted" ? "bg-muted/30" : "bg-background";

  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${bgClass}`}>
      <div className="max-w-7xl mx-auto w-full">
        {title && (
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-center text-lg sm:text-xl font-semibold text-muted-foreground mb-8 sm:mb-12 uppercase tracking-wide"
            placeholder="Enter brand showcase title..."
          >
            <h2 className="text-center text-lg sm:text-xl font-semibold text-muted-foreground mb-8 sm:mb-12 uppercase tracking-wide">
              {title}
            </h2>
          </EditableWrapper>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="h-12 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {brand.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
