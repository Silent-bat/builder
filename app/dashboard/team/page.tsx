import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import { TeamPageClient } from "@/components/dashboard/team-page-client";

export default async function TeamPage() {
  const session = await requireAuth();

  // Find team where user is owner or member
  const teamMember = await prisma.teamMember.findFirst({
    where: { userId: session.user.id },
    include: {
      team: {
        include: {
          members: {
            include: {
              user: true
            },
            orderBy: {
              createdAt: 'asc'
            }
          },
          organization: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }
    }
  });

  const team = teamMember?.team;
  const teamMembers = team?.members || [];

  return (
    <TeamPageClient 
      team={team} 
      teamMembers={teamMembers}
      currentUserRole={teamMember?.role}
    />
  );
}
