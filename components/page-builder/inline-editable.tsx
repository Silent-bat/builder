"use client";

import React, { useState, useRef, useEffect } from "react";

interface InlineEditableProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  as?: React.ElementType;
  disabled?: boolean;
}

export function InlineEditable({
  value,
  onChange,
  multiline = false,
  className = "",
  placeholder = "Click to edit...",
  as: Component = "div",
  disabled = false,
}: InlineEditableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Select all text
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    } else if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (disabled) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  if (isEditing) {
    const inputClassName = `w-full bg-transparent border-2 border-primary rounded px-2 py-1 focus:outline-none ${className}`;
    
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          rows={3}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName}
      />
    );
  }

  return (
    <Component
      ref={displayRef}
      className={`cursor-text hover:outline hover:outline-2 hover:outline-primary/50 hover:outline-dashed rounded px-2 py-1 transition-all ${className}`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {value || <span className="text-muted-foreground">{placeholder}</span>}
    </Component>
  );
}
