"use client";

import { useState } from "react";
import { EditableWrapper } from "../editable-wrapper";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function FAQBlock({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know",
  faqs = [
    {
      question: "What's included in the boilerplate?",
      answer: "Full authentication system, admin panel, page builder, organizations & teams, analytics dashboard, billing integration with Stripe, and much more."
    },
    {
      question: "Can I customize the design?",
      answer: "Absolutely! Built with Tailwind CSS and shadcn/ui components. Fully customizable with dark mode support."
    },
    {
      question: "Is it production-ready?",
      answer: "Yes! Built with Next.js 16, TypeScript, and PostgreSQL. Includes authentication, security features, and deployment-ready configuration."
    },
    {
      question: "Do I get updates?",
      answer: "Yes! Regular updates with new features, security patches, and improvements are included."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide documentation, example code, and community support. Premium support options are also available."
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Yes! Once purchased, you can use it for unlimited commercial projects."
    }
  ],
  _editMode = false,
  _onPropChange
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words"
            placeholder="Enter FAQ title..."
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 break-words">{title}</h2>
          </EditableWrapper>
          
          <EditableWrapper
            value={subtitle}
            onChange={(value) => _onPropChange?.("subtitle", value)}
            isEditMode={_editMode}
            as="p"
            className="text-base sm:text-lg text-muted-foreground px-2 break-words"
            placeholder="Enter subtitle..."
          >
            <p className="text-base sm:text-lg text-muted-foreground px-2 break-words">{subtitle}</p>
          </EditableWrapper>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between hover:bg-accent transition-colors gap-4"
              >
                <span className="font-semibold text-sm sm:text-base break-words">{faq.question}</span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 transition-transform mt-0.5 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground break-words">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
