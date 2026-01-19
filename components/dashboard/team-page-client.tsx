"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InviteDialog } from "@/components/team/invite-dialog";

interface TeamPageClientProps {
  team: any;
  teamMembers: any[];
  currentUserRole?: string;
}

export function TeamPageClient({ team, teamMembers, currentUserRole }: TeamPageClientProps) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const canInvite = currentUserRole === "OWNER" || currentUserRole === "ADMIN";

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Team</h1>
            <p className="text-muted-foreground">Manage your team members and permissions</p>
          </div>
          {team && canInvite && (
            <Button onClick={() => setInviteOpen(true)}>
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Invite Member
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {team ? `${team.name} - Manage who has access to your workspace` : 'No team found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You are not part of any team yet. Create or join a team to collaborate.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {member.user.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{member.user.name}</p>
                        <p className="text-sm text-muted-foreground">{member.user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{member.role}</p>
                        <p className={`text-xs ${member.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {member.status}
                        </p>
                      </div>
                      {canInvite && (
                        <Button variant="ghost" size="sm">Edit</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{teamMembers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {teamMembers.filter(m => m.status === 'ACTIVE').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {teamMembers.filter(m => m.status === 'PENDING').length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {team && (
        <InviteDialog
          open={inviteOpen}
          onOpenChange={setInviteOpen}
          teamId={team.id}
          organizationId={team.organization?.id}
          type="team"
        />
      )}
    </>
  );
}
