"use client";

import { EditableWrapper } from "../editable-wrapper";

interface ProductShowcaseProps {
  productName: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  images: string[];
  features: string[];
  buttonText?: string;
  buttonLink?: string;
  layout?: "left" | "right";
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function ProductShowcaseBlock({
  productName,
  tagline,
  price,
  originalPrice,
  images = ["https://via.placeholder.com/600x400"],
  features = [],
  buttonText = "Buy Now",
  buttonLink = "#",
  layout = "left",
  _editMode = false,
  _onPropChange
}: ProductShowcaseProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${layout === "right" ? "lg:flex-row-reverse" : ""}`}>
          {/* Image */}
          <div className={`${layout === "right" ? "lg:order-2" : ""}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src={images[0]}
                alt={productName}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className={`${layout === "right" ? "lg:order-1" : ""}`}>
            <EditableWrapper
              value={productName}
              onChange={(value) => _onPropChange?.("productName", value)}
              isEditMode={_editMode}
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words"
              placeholder="Enter product name..."
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words">
                {productName}
              </h2>
            </EditableWrapper>
            
            <EditableWrapper
              value={tagline}
              onChange={(value) => _onPropChange?.("tagline", value)}
              isEditMode={_editMode}
              multiline
              as="p"
              className="text-lg sm:text-xl text-muted-foreground mb-6 break-words"
              placeholder="Enter product tagline..."
            >
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 break-words">
                {tagline}
              </p>
            </EditableWrapper>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl sm:text-5xl font-bold text-primary">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">
                  ${originalPrice}
                </span>
              )}
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base sm:text-lg break-words">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buttonLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                {buttonText}
              </a>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-border rounded-lg font-semibold text-lg hover:bg-accent transition-colors">
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
