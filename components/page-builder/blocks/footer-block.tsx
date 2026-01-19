import { EditableWrapper } from "../editable-wrapper";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterBlockProps {
  companyName?: string;
  tagline?: string;
  sections?: FooterSection[];
  socialLinks?: { icon: string; href: string; label: string }[];
  _editMode?: boolean;
  _onPropChange?: (key: string, value: any) => void;
}

export function FooterBlock({
  companyName = "Your Company",
  tagline = "Build amazing things",
  sections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Documentation", href: "/docs" },
        { label: "API", href: "/api" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Community", href: "/community" },
        { label: "Support", href: "/support" },
        { label: "Status", href: "/status" },
        { label: "Terms", href: "/terms" }
      ]
    }
  ],
  socialLinks = [
    { icon: "𝕏", href: "#", label: "Twitter" },
    { icon: "in", href: "#", label: "LinkedIn" },
    { icon: "GH", href: "#", label: "GitHub" }
  ],
  _editMode = false,
  _onPropChange
}: FooterBlockProps) {
  return (
    <footer className="border-t bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <EditableWrapper
              value={companyName}
              onChange={(value) => _onPropChange?.("companyName", value)}
              isEditMode={_editMode}
              as="h3"
              className="text-lg sm:text-xl font-bold mb-2 break-words"
              placeholder="Company name..."
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">{companyName}</h3>
            </EditableWrapper>
            
            <EditableWrapper
              value={tagline}
              onChange={(value) => _onPropChange?.("tagline", value)}
              isEditMode={_editMode}
              as="p"
              className="text-sm sm:text-base text-muted-foreground mb-4 break-words"
              placeholder="Company tagline..."
            >
              <p className="text-sm sm:text-base text-muted-foreground mb-4 break-words">{tagline}</p>
            </EditableWrapper>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border flex items-center justify-center hover:bg-accent transition-colors flex-shrink-0"
                  aria-label={social.label}
                >
                  <span className="text-sm sm:text-base font-semibold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {sections.map((section, index) => (
            <div key={index} className="break-words">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base break-words">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors break-words inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left break-words">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground flex-wrap justify-center">
            <a href="/privacy" className="hover:text-foreground transition-colors whitespace-nowrap">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors whitespace-nowrap">Terms</a>
            <a href="/cookies" className="hover:text-foreground transition-colors whitespace-nowrap">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
