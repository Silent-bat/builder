interface SpacerBlockProps {
  height?: number;
  backgroundColor?: string;
  className?: string;
}

export function SpacerBlock({ 
  height = 50, 
  backgroundColor = "transparent",
  className = "" 
}: SpacerBlockProps) {
  return (
    <div
      className={className}
      style={{
        height: `${height}px`,
        backgroundColor,
        width: '100%',
      }}
      aria-hidden="true"
    />
  );
}

export const spacerBlockSchema = {
  height: {
    type: "number" as const,
    label: "Height (px)",
    default: 50,
    min: 0,
    max: 500,
    step: 10,
  },
  backgroundColor: {
    type: "color" as const,
    label: "Background Color",
    default: "transparent",
  },
};
