import { EditableWrapper } from "../editable-wrapper";

interface ImageBlockProps {
  src?: string;
  alt?: string;
  caption?: string;
  width?: "full" | "large" | "medium" | "small";
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function ImageBlock({
  src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
  alt = "Image",
  caption,
  width = "large",
  _editMode = false,
  _onPropChange
}: ImageBlockProps) {
  const widthClasses = {
    full: "max-w-full",
    large: "max-w-6xl",
    medium: "max-w-4xl",
    small: "max-w-2xl"
  };

  return (
    <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className={`${widthClasses[width]} mx-auto w-full`}>
        <EditableWrapper
          value={src}
          onChange={(value) => _onPropChange?.("src", value)}
          isEditMode={_editMode}
          type="url"
          placeholder="Enter image URL..."
        >
          <img 
            src={src} 
            alt={alt}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </EditableWrapper>
        {caption && (
          <EditableWrapper
            value={caption}
            onChange={(value) => _onPropChange?.("caption", value)}
            isEditMode={_editMode}
            as="p"
            className="text-center text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 break-words px-2"
            placeholder="Enter image caption..."
          >
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 break-words px-2">{caption}</p>
          </EditableWrapper>
        )}
      </div>
    </section>
  );
}
