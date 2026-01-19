export function applyComponentStyles(style: Record<string, any> = {}): React.CSSProperties {
  const cssStyle: React.CSSProperties = {};

  // Apply padding
  if (style.padding) {
    const { top, right, bottom, left } = style.padding;
    if (top) cssStyle.paddingTop = top;
    if (right) cssStyle.paddingRight = right;
    if (bottom) cssStyle.paddingBottom = bottom;
    if (left) cssStyle.paddingLeft = left;
  }

  // Apply margin
  if (style.margin) {
    const { top, right, bottom, left } = style.margin;
    if (top) cssStyle.marginTop = top;
    if (right) cssStyle.marginRight = right;
    if (bottom) cssStyle.marginBottom = bottom;
    if (left) cssStyle.marginLeft = left;
  }

  // Apply colors
  if (style.backgroundColor) {
    cssStyle.backgroundColor = style.backgroundColor;
  }
  if (style.color) {
    cssStyle.color = style.color;
  }

  // Apply gradient background
  if (style.gradient) {
    cssStyle.background = generateGradient(style.gradient);
  }

  // Apply typography
  if (style.typography) {
    const { fontSize, fontWeight, lineHeight, letterSpacing } = style.typography;
    if (fontSize) cssStyle.fontSize = fontSize;
    if (fontWeight) cssStyle.fontWeight = fontWeight;
    if (lineHeight) cssStyle.lineHeight = lineHeight;
    if (letterSpacing) cssStyle.letterSpacing = letterSpacing;
  }

  // Apply border
  if (style.borderWidth) {
    cssStyle.borderWidth = style.borderWidth;
    cssStyle.borderStyle = "solid";
  }
  if (style.borderColor) {
    cssStyle.borderColor = style.borderColor;
  }
  if (style.borderRadius) {
    cssStyle.borderRadius = style.borderRadius;
  }

  // Apply width and max-width if specified
  if (style.width) {
    cssStyle.width = style.width;
  }
  if (style.maxWidth) {
    cssStyle.maxWidth = style.maxWidth;
  }

  // Apply display properties
  if (style.display) {
    cssStyle.display = style.display;
  }

  // Apply flexbox properties
  if (style.flexDirection) {
    cssStyle.flexDirection = style.flexDirection;
  }
  if (style.justifyContent) {
    cssStyle.justifyContent = style.justifyContent;
  }
  if (style.alignItems) {
    cssStyle.alignItems = style.alignItems;
  }
  if (style.gap) {
    cssStyle.gap = style.gap;
  }

  // Apply opacity
  if (style.opacity !== undefined) {
    cssStyle.opacity = style.opacity;
  }

  // Apply box-shadow
  if (style.boxShadow) {
    cssStyle.boxShadow = style.boxShadow;
  }

  // Apply transform
  if (style.transform) {
    cssStyle.transform = generateTransform(style.transform);
  }

  // Apply filters
  if (style.effects) {
    cssStyle.filter = generateFilters(style.effects);
  }

  // Apply backdrop filter
  if (style.effects?.backdropBlur) {
    cssStyle.backdropFilter = `blur(${style.effects.backdropBlur})`;
  }

  // Apply animation
  if (style.animation && style.animation.type && style.animation.type !== "none") {
    cssStyle.animation = generateAnimation(style.animation);
  }

  return cssStyle;
}

function generateGradient(gradient: any): string {
  const type = gradient.type || "linear";
  const angle = gradient.angle || "135deg";
  const stops = gradient.stops || [
    { color: "#667eea", position: "0%" },
    { color: "#764ba2", position: "100%" },
  ];

  const stopsString = stops.map((s: any) => `${s.color} ${s.position}`).join(", ");

  if (type === "radial") {
    return `radial-gradient(circle, ${stopsString})`;
  } else if (type === "conic") {
    return `conic-gradient(from ${angle}, ${stopsString})`;
  } else {
    return `linear-gradient(${angle}, ${stopsString})`;
  }
}

function generateTransform(transform: any): string {
  const parts: string[] = [];

  if (transform.translateX) parts.push(`translateX(${transform.translateX})`);
  if (transform.translateY) parts.push(`translateY(${transform.translateY})`);
  if (transform.translateZ) parts.push(`translateZ(${transform.translateZ})`);
  if (transform.scale) parts.push(`scale(${transform.scale})`);
  if (transform.scaleX) parts.push(`scaleX(${transform.scaleX})`);
  if (transform.scaleY) parts.push(`scaleY(${transform.scaleY})`);
  if (transform.rotate) parts.push(`rotate(${transform.rotate})`);
  if (transform.rotateX) parts.push(`rotateX(${transform.rotateX})`);
  if (transform.rotateY) parts.push(`rotateY(${transform.rotateY})`);
  if (transform.rotateZ) parts.push(`rotateZ(${transform.rotateZ})`);
  if (transform.skewX) parts.push(`skewX(${transform.skewX})`);
  if (transform.skewY) parts.push(`skewY(${transform.skewY})`);
  if (transform.perspective) parts.unshift(`perspective(${transform.perspective})`);

  return parts.join(" ");
}

function generateFilters(effects: any): string {
  const parts: string[] = [];

  if (effects.blur) parts.push(`blur(${effects.blur})`);
  if (effects.brightness) parts.push(`brightness(${effects.brightness})`);
  if (effects.contrast) parts.push(`contrast(${effects.contrast})`);
  if (effects.grayscale) parts.push(`grayscale(${effects.grayscale})`);
  if (effects.hueRotate) parts.push(`hue-rotate(${effects.hueRotate})`);
  if (effects.saturate) parts.push(`saturate(${effects.saturate})`);
  if (effects.sepia) parts.push(`sepia(${effects.sepia})`);

  return parts.join(" ");
}

function generateAnimation(animation: any): string {
  const name = animation.type;
  const duration = animation.duration || "1s";
  const delay = animation.delay || "0s";
  const easing = animation.easing || "ease";
  const iteration = animation.iteration || "1";

  return `${name} ${duration} ${easing} ${delay} ${iteration}`;
}

/**
 * Convert spacing object to CSS padding/margin string
 * Example: { top: "10px", right: "20px", bottom: "10px", left: "20px" } => "10px 20px 10px 20px"
 */
export function spacingToString(spacing: Record<string, string> = {}): string {
  const { top = "0", right = "0", bottom = "0", left = "0" } = spacing;
  return `${top} ${right} ${bottom} ${left}`;
}

/**
 * Generate Tailwind-compatible responsive classes based on device settings
 */
export function generateResponsiveClasses(
  mobile?: Record<string, any>,
  tablet?: Record<string, any>,
  desktop?: Record<string, any>
): string {
  const classes: string[] = [];

  // This is a simplified version - in production you'd want more sophisticated mapping
  // For now, we'll rely on inline styles for custom values
  
  return classes.join(" ");
}
