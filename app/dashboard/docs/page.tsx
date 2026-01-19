import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function DocsPage() {
  await requireAuth();

  // Fetch documentation categories and articles
  const docCategories = await prisma.docCategory.findMany({
    include: { 
      articles: {
        where: { published: true },
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { order: 'asc' }
  });

  // Get popular articles (most viewed)
  const popularArticles = await prisma.docArticle.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { views: 'desc' },
    take: 5
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-muted-foreground">Learn how to use the platform</p>
      </div>

      {docCategories.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Documentation Coming Soon</CardTitle>
            <CardDescription>We're working on comprehensive documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Documentation is being prepared. Check back soon!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {docCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  {category.description && (
                    <CardDescription>{category.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {category.articles.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No articles yet</p>
                  ) : (
                    <ul className="space-y-2">
                      {category.articles.map((article) => (
                        <li key={article.id}>
                          <Link 
                            href={`#`}
                            className="text-sm text-primary hover:underline"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {popularArticles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
                <CardDescription>Most viewed documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularArticles.map((article) => (
                    <div 
                      key={article.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{article.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {article.category.title} • {article.views} views
                        </p>
                      </div>
                      <span className="text-primary text-sm">Read →</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Helpful resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link href="/dashboard" className="block p-3 border rounded-lg hover:bg-accent transition-colors">
              <p className="font-medium">Dashboard</p>
              <p className="text-sm text-muted-foreground">Return to your dashboard</p>
            </Link>
            <Link href="/dashboard/settings" className="block p-3 border rounded-lg hover:bg-accent transition-colors">
              <p className="font-medium">Settings</p>
              <p className="text-sm text-muted-foreground">Manage your account</p>
            </Link>
            <Link href="/dashboard/support" className="block p-3 border rounded-lg hover:bg-accent transition-colors">
              <p className="font-medium">Support</p>
              <p className="text-sm text-muted-foreground">Get help</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
