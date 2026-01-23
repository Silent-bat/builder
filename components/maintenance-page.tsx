export function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔧</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Under Maintenance
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're currently performing scheduled maintenance to improve your experience.
            We'll be back shortly!
          </p>
        </div>
        
        <div className="space-y-4 text-muted-foreground">
          <p className="text-sm">
            Thank you for your patience.
          </p>
          <p className="text-sm">
            For urgent inquiries, please contact us at{" "}
            <a 
              href="mailto:support@example.com" 
              className="text-primary hover:underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
