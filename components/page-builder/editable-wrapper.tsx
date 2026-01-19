"use client";

import React, { useState, useRef, useEffect, memo } from "react";

interface EditableWrapperProps {
  value: string | number;
  onChange?: (value: string | number) => void;
  type?: "text" | "number" | "url" | "email";
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  as?: React.ElementType;
  children?: React.ReactNode;
  disabled?: boolean;
  isEditMode?: boolean;
  style?: React.CSSProperties;
}

const EditableWrapperComponent = function EditableWrapper({
  value,
  onChange,
  type = "text",
  multiline = false,
  className = "",
  placeholder,
  as: Component = "div",
  children,
  disabled = false,
  isEditMode = false,
  style,
}: EditableWrapperProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(String(value || ""));
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const displayRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTempValue(String(value || ""));
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== String(value) && onChange) {
      if (type === "number") {
        onChange(parseFloat(tempValue) || 0);
      } else {
        onChange(tempValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    } else if (e.key === "Escape") {
      setTempValue(String(value));
      setIsEditing(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode && !disabled) {
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  // If not in edit mode, disabled, or no onChange handler, render children only
  if (!isEditMode || disabled || !onChange) {
    return children ? <>{children}</> : <Component className={className} style={style}>{value}</Component>;
  }

  // If editing, show input
  if (isEditing) {
    const inputClassName = `w-full bg-white/95 border-2 border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg z-50 ${className}`;
    
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          placeholder={placeholder}
          rows={Math.min(Math.max(tempValue.split('\n').length, 3), 10)}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={type}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        placeholder={placeholder}
      />
    );
  }

  // Show editable indicator in edit mode
  const editableClassName = `
    cursor-pointer 
    hover:outline hover:outline-2 hover:outline-blue-500 hover:outline-dashed 
    hover:bg-blue-50/30
    rounded 
    transition-all 
    relative
    group
    ${className}
  `;

  if (children) {
    return (
      <Component
        ref={displayRef as any}
        className={editableClassName}
        onClick={handleClick}
        title="Click to edit"
        style={style}
      >
        {children}
        <span className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Click to edit
        </span>
      </Component>
    );
  }

  return (
    <Component
      ref={displayRef as any}
      className={editableClassName}
      onClick={handleClick}
      title="Click to edit"
      style={style}
    >
      {value || <span className="text-muted-foreground italic">{placeholder || "Click to edit..."}</span>}
      <span className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Click to edit
      </span>
    </Component>
  );
}

export const EditableWrapper = memo(EditableWrapperComponent);
