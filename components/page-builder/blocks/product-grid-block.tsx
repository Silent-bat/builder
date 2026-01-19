"use client";

import { useState } from "react";
import { EditableWrapper } from "../editable-wrapper";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  badge?: string;
}

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  columns?: "2" | "3" | "4";
  showFilters?: boolean;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function ProductGridBlock({ 
  title, 
  subtitle = "", 
  products = [], 
  columns = "3",
  showFilters = true,
  _editMode = false,
  _onPropChange
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(
    p => selectedCategory === "all" || p.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // featured
  });

  const gridCols = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <EditableWrapper
            value={title}
            onChange={(value) => _onPropChange?.("title", value)}
            isEditMode={_editMode}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words"
            placeholder="Enter product grid title..."
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words">
              {title}
            </h2>
          </EditableWrapper>
          {subtitle && (
            <EditableWrapper
              value={subtitle}
              onChange={(value) => _onPropChange?.("subtitle", value)}
              isEditMode={_editMode}
              as="p"
              className="text-base sm:text-lg text-muted-foreground break-words"
              placeholder="Enter subtitle..."
            >
              <p className="text-base sm:text-lg text-muted-foreground break-words">
                {subtitle}
              </p>
            </EditableWrapper>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-md border border-input bg-background text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-6 sm:gap-8`}>
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 bg-background"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product.badge}
                  </span>
                )}
                <button className="absolute bottom-3 right-3 bg-background text-foreground p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-base sm:text-lg break-words flex-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 ml-2">
                    <span className="text-sm">⭐</span>
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold">
                    ${product.price}
                  </span>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
