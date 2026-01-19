"use client";

import Link from "next/link";
import { useState } from "react";
import { EditableWrapper } from "../editable-wrapper";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarBlockProps {
  logo?: string;
  brandName?: string;
  links?: NavLink[];
  showAuth?: boolean;
  ctaText?: string;
  ctaLink?: string;
  transparent?: boolean;
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function NavbarBlock({
  logo,
  brandName = "SaaS Boilerplate",
  links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "/dashboard/docs" },
  ],
  showAuth = true,
  ctaText = "Get Started",
  ctaLink = "/auth/sign-up",
  transparent = false,
  _editMode = false,
  _onPropChange
}: NavbarBlockProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 border-b ${transparent ? 'bg-background/80 backdrop-blur-md' : 'bg-background'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 font-bold text-base sm:text-lg shrink-0 min-w-0">
            {logo ? (
              <img src={logo} alt={brandName} className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
            ) : (
              <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
            <EditableWrapper
              value={brandName}
              onChange={(value) => _onPropChange?.("brandName", value)}
              isEditMode={_editMode}
              className="truncate max-w-[120px] sm:max-w-none"
              placeholder="Brand name..."
            >
              <span className="truncate max-w-[120px] sm:max-w-none">{brandName}</span>
            </EditableWrapper>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {showAuth && (
              <>
                <Link
                  href="/auth/sign-in"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
                >
                  {ctaText}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-3">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {showAuth && (
                <>
                  <hr className="my-2" />
                  <Link
                    href="/auth/sign-in"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href={ctaLink}
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {ctaText}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
