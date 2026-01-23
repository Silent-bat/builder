"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageTemplates, PageTemplate } from "@/lib/page-templates";
import { toast } from "@/lib/toast";
import { generateWebsiteWithAI, GenerateWebsiteParams } from "@/lib/gemini";

interface TemplateSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateSelectionDialog({ open, onOpenChange }: TemplateSelectionDialogProps) {
  const router = useRouter();
  const [step, setStep] = useState<"category" | "template" | "ai" | "details">("category");
  const [selectedCategory, setSelectedCategory] = useState<PageTemplate["category"] | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(null);
  const [pageTitle, setPageTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [creating, setCreating] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [aiStyle, setAiStyle] = useState("");
  const [aiColorScheme, setAiColorScheme] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiProgressMessage, setAiProgressMessage] = useState("");

  const categories = [
    { id: "landing" as const, name: "Landing Page", description: "Single-page marketing sites", icon: "🚀" },
    { id: "ecommerce" as const, name: "E-commerce", description: "Online stores and shops", icon: "🛍️" },
    { id: "blog" as const, name: "Blog", description: "Content and article sites", icon: "📝" },
    { id: "portfolio" as const, name: "Portfolio", description: "Showcase your work", icon: "🎨" },
    { id: "corporate" as const, name: "Corporate", description: "Business and enterprise sites", icon: "💼" },
  ];

  const handleCategorySelect = (category: PageTemplate["category"]) => {
    setSelectedCategory(category);
    setStep("template");
  };

  const handleTemplateSelect = (template: PageTemplate) => {
    setSelectedTemplate(template);
    setStep("details");
  };

  const handleAIGenerate = async () => {
    if (!aiDescription || !selectedCategory) return;

    setGeneratingAI(true);
    setAiProgress(0);
    setAiProgressMessage("Initializing AI...");
    
    try {
      // Progress: Analyzing request
      setAiProgress(20);
      setAiProgressMessage("Analyzing your requirements...");
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Progress: Calling AI
      setAiProgress(40);
      setAiProgressMessage("Generating website design...");
      
      const components = await generateWebsiteWithAI({
        description: aiDescription,
        type: selectedCategory,
        style: aiStyle || undefined,
        colorScheme: aiColorScheme || undefined,
      });

      // Progress: Processing results
      setAiProgress(80);
      setAiProgressMessage("Processing components...");
      
      await new Promise(resolve => setTimeout(resolve, 300));

      // Create a custom template from AI-generated components
      setSelectedTemplate({
        id: "ai-generated",
        name: "AI Generated",
        description: aiDescription,
        category: selectedCategory,
        components,
      });

      setAiProgress(100);
      setAiProgressMessage("Complete!");
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStep("details");
      toast.success(`Website generated with ${components.length} components!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate website");
    } finally {
      setGeneratingAI(false);
      setAiProgress(0);
      setAiProgressMessage("");
    }
  };

  const handleCreatePage = async () => {
    if (!pageTitle || !pageSlug || !selectedTemplate) return;

    setCreating(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: pageTitle,
          slug: pageSlug,
          type: "NORMAL",
          published: false,
          components: selectedTemplate.components,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create page");
      }

      const data = await res.json();
      toast.success("Page created successfully!");
      onOpenChange(false);
      router.push(`/admin/pages/${data.page.id}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create page");
    } finally {
      setCreating(false);
    }
  };

  const handleBack = () => {
    if (step === "template" || step === "ai") {
      setStep("category");
      setSelectedCategory(null);
    } else if (step === "details") {
      setStep(selectedTemplate?.id === "ai-generated" ? "ai" : "template");
      setSelectedTemplate(null);
    }
  };

  const handleReset = () => {
    setStep("category");
    setSelectedCategory(null);
    setSelectedTemplate(null);
    setPageTitle("");
    setPageSlug("");
  };

  const filteredTemplates = selectedCategory 
    ? pageTemplates.filter(t => t.category === selectedCategory)
    : [];

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      onOpenChange(newOpen);
      if (!newOpen) {
        setTimeout(handleReset, 200);
      }
    }}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "category" && "Choose a Template Category"}
            {step === "template" && "Select a Template"}
            {step === "ai" && "Generate with AI"}
            {step === "details" && "Page Details"}
          </DialogTitle>
          <DialogDescription>
            {step === "category" && "What type of page do you want to create?"}
            {step === "template" && "Pick a pre-designed template to get started quickly"}
            {step === "ai" && "Describe your website and let AI generate it for you"}
            {step === "details" && "Enter the details for your new page"}
          </DialogDescription>
        </DialogHeader>

        {/* Category Selection */}
        {step === "category" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-left group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Template Selection */}
        {step === "template" && (
          <div className="space-y-4 mt-4">
            {/* AI Generation Option */}
            <button
              onClick={() => setStep("ai")}
              className="w-full p-6 border-2 border-primary rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">✨</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary">Generate with AI</h3>
                  <p className="text-sm text-muted-foreground">Describe your website and let AI create it for you</p>
                </div>
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or choose a template</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-left group overflow-hidden"
                >
                  {/* Template Preview */}
                  <div className="mb-4 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      {/* Simple visual representation */}
                      <div className="w-full h-8 bg-primary/30 mb-1"></div>
                      <div className="w-3/4 h-16 bg-primary/20 mx-auto mb-1"></div>
                      <div className="w-full grid grid-cols-3 gap-1 px-2">
                        <div className="h-12 bg-primary/15 rounded"></div>
                        <div className="h-12 bg-primary/15 rounded"></div>
                        <div className="h-12 bg-primary/15 rounded"></div>
                      </div>
                    </div>
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-1">
                        {template.category === 'landing' && '🚀'}
                        {template.category === 'ecommerce' && '🛍️'}
                        {template.category === 'blog' && '📝'}
                        {template.category === 'portfolio' && '🎨'}
                        {template.category === 'corporate' && '💼'}
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">{template.components.length} Components</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary">{template.name}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  
                  {/* Component List Preview */}
                  <div className="flex flex-wrap gap-1">
                    {template.components.slice(0, 5).map((comp, idx) => (
                      <span key={idx} className="text-xs bg-muted px-2 py-0.5 rounded">
                        {comp.type}
                      </span>
                    ))}
                    {template.components.length > 5 && (
                      <span className="text-xs text-muted-foreground">+{template.components.length - 5} more</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            </div>
          </div>
        )}

        {/* AI Generation Form */}
        {step === "ai" && (
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✨</div>
                <div className="flex-1 text-sm">
                  <p className="font-medium mb-1">AI-Powered Website Generation</p>
                  <p className="text-muted-foreground">
                    Describe your website in detail and our AI will create a complete, styled website for you.
                    The more specific you are, the better the results!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="ai-description">Website Description *</Label>
              <textarea
                id="ai-description"
                value={aiDescription}
                onChange={(e) => setAiDescription(e.target.value)}
                placeholder="E.g., A modern SaaS landing page for a project management tool. Include hero section with screenshot, features highlighting team collaboration, pricing with 3 tiers, and customer testimonials from tech companies..."
                className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background text-sm mt-1 resize-y"
                rows={5}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be specific about content, features, and what you want to showcase
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ai-style">Design Style (optional)</Label>
                <Input
                  id="ai-style"
                  value={aiStyle}
                  onChange={(e) => setAiStyle(e.target.value)}
                  placeholder="E.g., Modern, Minimal, Bold"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ai-color">Color Scheme (optional)</Label>
                <Input
                  id="ai-color"
                  value={aiColorScheme}
                  onChange={(e) => setAiColorScheme(e.target.value)}
                  placeholder="E.g., Blue and white"
                  className="mt-1"
                />
              </div>
            </div>

            {generatingAI && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{aiProgressMessage}</span>
                  <span className="font-medium">{aiProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${aiProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleBack} disabled={generatingAI}>
                Back
              </Button>
              <Button 
                onClick={handleAIGenerate} 
                disabled={!aiDescription || generatingAI}
                className="bg-primary"
              >
                {generatingAI ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Website
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Page Details */}
        {step === "details" && selectedTemplate && (
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-muted rounded-lg mb-4">
              <p className="text-sm font-medium">Selected Template: <span className="text-primary">{selectedTemplate.name}</span></p>
              <p className="text-xs text-muted-foreground mt-1">{selectedTemplate.description}</p>
            </div>

            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={pageTitle}
                onChange={(e) => {
                  setPageTitle(e.target.value);
                  // Auto-generate slug from title
                  if (!pageSlug || pageSlug === pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
                    setPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                placeholder="My Awesome Page"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">/</span>
                <Input
                  id="slug"
                  value={pageSlug}
                  onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                  placeholder="my-awesome-page"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your page will be accessible at: /{pageSlug || "your-page-slug"}
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleCreatePage} 
                disabled={!pageTitle || !pageSlug || creating}
              >
                {creating ? "Creating..." : "Create Page"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
