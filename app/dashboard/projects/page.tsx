import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";

export default async function ProjectsPage() {
  const session = await requireAuth();

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-muted-foreground">Manage your projects and workflows</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline">All Projects</Button>
          <Button variant="ghost">Active</Button>
          <Button variant="ghost">Archived</Button>
        </div>
        <Button>Create Project</Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Projects Yet</CardTitle>
            <CardDescription>Create your first project to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven't created any projects yet. Click the "Create Project" button above to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Status</span>
                    <span className={`font-medium ${
                      project.status === 'COMPLETED' ? 'text-green-600' :
                      project.status === 'ARCHIVED' ? 'text-gray-600' :
                      'text-blue-600'
                    }`}>
                      {project.status === 'ACTIVE' ? 'Active' :
                       project.status === 'COMPLETED' ? 'Completed' :
                       'Archived'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
