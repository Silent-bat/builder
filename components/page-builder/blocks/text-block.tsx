import { EditableWrapper } from "../editable-wrapper";

interface TextBlockProps {
  content?: string;
  align?: "left" | "center" | "right";
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function TextBlock({
  content = "Add your content here...",
  align = "left",
  _editMode = false,
  _onPropChange
}: TextBlockProps) {
  return (
    <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <EditableWrapper
          value={content}
          onChange={(value) => _onPropChange?.("content", value)}
          isEditMode={_editMode}
          multiline
          className="prose prose-sm sm:prose-base md:prose-lg max-w-none break-words"
          placeholder="Add your content here..."
        >
          <div 
            className="prose prose-sm sm:prose-base md:prose-lg max-w-none break-words"
            style={{ textAlign: align }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </EditableWrapper>
      </div>
    </section>
  );
}
