import { renderComponent } from "./component-registry";
import { applyComponentStyles } from "./style-utils";

interface PageRendererProps {
  components: Array<{
    id: string;
    type: string;
    props: any;
    style?: Record<string, any>;
    styles?: Record<string, any>;
  }>;
}

export function PageRenderer({ components }: PageRendererProps) {
  if (!components || components.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium">This page is empty</p>
          <p className="text-sm">No content has been added yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {components.map((component) => {
        // Extract style from component.style or component.props.style
        const style = component.style || component.styles || component.props?.style || {};
        const animationClass = style.animation?.type && style.animation.type !== "none" 
          ? `animate-${style.animation.type}` 
          : "";
        
        return (
          <div 
            key={component.id}
            className={animationClass}
            style={{
              ...applyComponentStyles(style),
              animationDuration: style.animation?.duration,
              animationDelay: style.animation?.delay,
              animationTimingFunction: style.animation?.easing,
              animationIterationCount: style.animation?.iteration,
            }}
          >
            {renderComponent(component.type, component.props)}
          </div>
        );
      })}
    </div>
  );
}
