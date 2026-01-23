// Gemini AI integration for website generation

const GEMINI_API_KEY = "AIzaSyAmAMMJE0M14dGJzsQ_9tq4ZtPwrn4mPO4";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

export interface GenerateWebsiteParams {
  description: string;
  type: "landing" | "ecommerce" | "blog" | "portfolio" | "corporate";
  style?: string;
  colorScheme?: string;
}

export interface GeneratedComponent {
  type: string;
  props: Record<string, any>;
  order: number;
}

export async function generateWebsiteWithAI(params: GenerateWebsiteParams): Promise<GeneratedComponent[]> {
  const prompt = buildPrompt(params);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No content generated from AI");
    }

    // Parse the JSON from the response
    const components = parseAIResponse(generatedText);
    return components;
  } catch (error) {
    console.error("Error generating website with AI:", error);
    throw error;
  }
}

function buildPrompt(params: GenerateWebsiteParams): string {
  const availableComponents = `
Available components (USE ONLY THESE):
1. navbar - Navigation bar with brand name and links array
   Props: { 
     brandName: string, 
     links: [{label, href}],
     style?: { backgroundColor?: string, textColor?: string, height?: string }
   }

2. hero - Hero section with headline and CTA
   Props: { 
     title: string, 
     subtitle: string, 
     ctaText: string, 
     ctaLink: string, 
     backgroundImage?: string,
     style?: { backgroundColor?: string, textColor?: string, gradient?: string, minHeight?: string }
   }

3. features - Features grid with icons
   Props: { 
     title: string, 
     subtitle: string, 
     features: [{title, description, icon}],
     style?: { backgroundColor?: string, textColor?: string, accentColor?: string, columns?: number }
   }

4. text - Text content section
   Props: { 
     title: string, 
     content: string,
     style?: { backgroundColor?: string, textColor?: string, fontSize?: string, textAlign?: string }
   }

5. pricing - Pricing plans table
   Props: { 
     title: string, 
     subtitle: string, 
     plans: [{name, price, period, features: string[], highlighted: boolean}],
     style?: { backgroundColor?: string, accentColor?: string, highlightColor?: string }
   }

6. testimonials - Customer testimonials
   Props: { 
     title: string, 
     testimonials: [{name, role, content, avatar}],
     style?: { backgroundColor?: string, textColor?: string, cardBgColor?: string }
   }

7. stats - Statistics display
   Props: { 
     title: string, 
     stats: [{label, value}],
     style?: { backgroundColor?: string, textColor?: string, accentColor?: string }
   }

8. footer - Footer with links
    Props: { 
      companyName: string, 
      description: string, 
      links: [{label, href}],
      style?: { backgroundColor?: string, textColor?: string }
    }

9. product-grid - Product grid (e-commerce)
    Props: { 
      title: string, 
      products: [{name, price, image, rating}],
      style?: { backgroundColor?: string, cardBgColor?: string, accentColor?: string }
    }

10. category-showcase - Product categories (e-commerce)
    Props: { 
      title: string, 
      categories: [{name, image, itemCount}],
      style?: { backgroundColor?: string, hoverColor?: string }
    }

11. newsletter - Email newsletter signup
    Props: { 
      title: string, 
      subtitle: string, 
      placeholder: string,
      style?: { backgroundColor?: string, textColor?: string, buttonColor?: string }
    }

12. cta - Call-to-action section
    Props: { 
      title: string, 
      subtitle: string, 
      buttonText: string, 
      buttonLink: string,
      style?: { backgroundColor?: string, gradient?: string, buttonColor?: string, textColor?: string }
    }

13. spacer - Blank space (for spacing)
    Props: { 
      height: number, 
      backgroundColor?: string 
    }

14. faq - FAQ accordion
    Props: { 
      title: string, 
      faqs: [{question, answer}],
      style?: { backgroundColor?: string, accentColor?: string }
    }

15. brand-showcase - Partner/brand logos
    Props: { 
      title: string, 
      brands: [{name, logo}],
      style?: { backgroundColor?: string }
    }

16. image - Image display
    Props: { 
      src: string, 
      alt: string, 
      caption?: string,
      style?: { borderRadius?: string, aspectRatio?: string }
    }
`;

  return `You are a professional web designer. Your task is to generate a complete ${params.type} website.

DESCRIPTION:
"${params.description}"

${params.style ? `DESIGN STYLE: ${params.style}` : ""}
${params.colorScheme ? `COLOR SCHEME: ${params.colorScheme}` : ""}

${availableComponents}

TYPICAL STRUCTURE FOR ${params.type.toUpperCase()}:
${getTypicalStructure(params.type)}

⚠️ CRITICAL INSTRUCTIONS (FOLLOW EXACTLY):
1. ❌ DO NOT use markdown code blocks (no \`\`\`json or \`\`\`)
2. ❌ DO NOT add any explanations, comments, or text before/after the JSON
3. ✅ Return ONLY the raw JSON array starting with [ and ending with ]
4. ✅ Use ONLY components from the numbered list above
5. ✅ Start with order: 0 and increment by 1 for each component
6. ✅ Always begin with navbar (order: 0) and end with footer (last order)
7. ✅ Include 6-10 components for a complete, professional page
8. ✅ Fill ALL props with realistic, engaging content based on the description
9. ✅ Use professional copy that perfectly matches the business/website description
10. ✅ For icons, use relevant emojis (⚡ 🔒 ✨ 💼 🎯 🚀 💡 ⭐ 🌟 📊 etc.)

🎨 CRITICAL: CUSTOMIZE STYLES FOR THE WEBSITE THEME:
11. ✅ ADD style objects to components matching the ${params.colorScheme || 'brand colors'}
12. ✅ Use backgroundColor, textColor, accentColor, gradient based on description
13. ✅ Create a cohesive color scheme across all components
14. ✅ Match the visual style to the business type (e.g., luxury = gold/elegant, tech = blue/modern, eco = green/natural)
15. ✅ Examples:
    - Luxury jewelry: style: { backgroundColor: "#FFF9F0", accentColor: "#D4AF37", textColor: "#333" }
    - Tech SaaS: style: { backgroundColor: "#F0F9FF", accentColor: "#3B82F6", gradient: "from-blue-50 to-indigo-100" }
    - Eco brand: style: { backgroundColor: "#F0FDF4", accentColor: "#10B981", textColor: "#064E3B" }
    - Corporate: style: { backgroundColor: "#F9FAFB", accentColor: "#1F2937", textColor: "#111827" }

Example output format WITH STYLES (YOUR RESPONSE MUST LOOK EXACTLY LIKE THIS):
[
  {
    "type": "navbar",
    "order": 0,
    "props": {
      "brandName": "TaskFlow",
      "links": [
        {"label": "Features", "href": "#features"},
        {"label": "Pricing", "href": "#pricing"}
      ],
      "style": {
        "backgroundColor": "#1F2937",
        "textColor": "#FFFFFF"
      }
    }
  },
  {
    "type": "hero",
    "order": 1,
    "props": {
      "title": "Manage Projects Effortlessly",
      "subtitle": "The all-in-one platform for modern teams",
      "ctaText": "Start Free Trial",
      "ctaLink": "#signup",
      "style": {
        "backgroundColor": "#F0F9FF",
        "gradient": "from-blue-50 to-indigo-100",
        "textColor": "#1E3A8A"
      }
    }
  },
  {
    "type": "features",
    "order": 2,
    "props": {
      "title": "Powerful Features",
      "subtitle": "Everything you need",
      "features": [
        {"title": "Real-time Sync", "description": "Collaborate instantly", "icon": "⚡"}
      ],
      "style": {
        "backgroundColor": "#FFFFFF",
        "accentColor": "#3B82F6",
        "textColor": "#1F2937"
      }
    }
  },
  {
    "type": "footer",
    "order": 5,
    "props": {
      "companyName": "TaskFlow",
      "description": "Project management made simple",
      "links": [{"label": "About", "href": "#about"}],
      "style": {
        "backgroundColor": "#111827",
        "textColor": "#9CA3AF"
      }
    }
  }
]

NOW generate the JSON array:`;
}

function getTypicalStructure(type: string): string {
  switch (type) {
    case "landing":
      return "navbar, hero, features, testimonials, pricing, cta, footer";
    case "ecommerce":
      return "navbar, hero, category-showcase, product-grid, brand-showcase, newsletter, footer";
    case "blog":
      return "navbar, hero, text (for articles), newsletter, footer";
    case "portfolio":
      return "navbar, hero, stats, testimonials, cta, footer";
    case "corporate":
      return "navbar, hero, features, stats, testimonials, cta, footer";
    default:
      return "navbar, hero, content sections, footer";
  }
}

function parseAIResponse(response: string): GeneratedComponent[] {
  try {
    console.log("[Gemini] Raw response length:", response.length);
    
    // Remove markdown code blocks if present
    let cleaned = response.trim();
    
    // Remove markdown code blocks more aggressively
    cleaned = cleaned.replace(/^```json\s*/gi, "");
    cleaned = cleaned.replace(/^```\s*/gi, "");
    cleaned = cleaned.replace(/```\s*$/gi, "");
    cleaned = cleaned.trim();
    
    console.log("[Gemini] After removing markdown:", cleaned.substring(0, 100));

    // Try to find JSON array (look for first [ to last ])
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      cleaned = cleaned.substring(firstBracket, lastBracket + 1);
      console.log("[Gemini] Extracted JSON array");
    }

    console.log("[Gemini] Attempting to parse JSON...");
    const components = JSON.parse(cleaned);

    if (!Array.isArray(components)) {
      throw new Error("Response is not an array");
    }

    console.log("[Gemini] Successfully parsed", components.length, "components");

    // Validate and sanitize components
    const validated = components.map((comp, index) => ({
      type: comp.type || "text",
      order: comp.order ?? index,
      props: comp.props || {},
    }));
    
    console.log("[Gemini] Component types:", validated.map(c => c.type).join(", "));
    
    return validated;
  } catch (error) {
    console.error("[Gemini] Error parsing AI response:", error);
    console.error("[Gemini] Raw response:", response.substring(0, 500));
    throw new Error("Failed to parse AI response. The AI generated invalid JSON. Please try again with a more detailed description.");
  }
}
