import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // No rehypeRaw => raw HTML is NOT rendered (safer)
        components={{
          a: ({ node, ...props }) => (
            <a {...props} className="text-primary underline underline-offset-4" />
          ),
          h1: ({ node, ...props }) => (
            <h1 {...props} className="scroll-m-20 text-4xl font-bold tracking-tight" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="scroll-m-20 text-2xl font-semibold tracking-tight" />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="leading-7" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
