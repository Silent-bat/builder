"use client";

import { useState } from "react";
import { EditableWrapper } from "../editable-wrapper";

interface NewsletterProps {
  title: string;
  subtitle: string;
  placeholder?: string;
  buttonText?: string;
  showImage?: boolean;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function NewsletterBlock({
  title,
  subtitle,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  showImage = true,
  _editMode = false,
  _onPropChange
}: NewsletterProps) {
  const [email, setEmail] = useState("");

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <EditableWrapper
              value={title}
              onChange={(value) => _onPropChange?.("title", value)}
              isEditMode={_editMode}
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words"
              placeholder="Enter newsletter title..."
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words">
                {title}
              </h2>
            </EditableWrapper>
            
            <EditableWrapper
              value={subtitle}
              onChange={(value) => _onPropChange?.("subtitle", value)}
              isEditMode={_editMode}
              multiline
              as="p"
              className="text-lg sm:text-xl opacity-90 mb-8 break-words"
              placeholder="Enter subtitle..."
            >
              <p className="text-lg sm:text-xl opacity-90 mb-8 break-words">
                {subtitle}
              </p>
            </EditableWrapper>

            {/* Form */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-6 py-4 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
              />
              <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                {buttonText}
              </button>
            </div>

            <p className="text-sm opacity-75 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Image */}
          {showImage && (
            <div className="hidden lg:block">
              <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-48 h-48 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
