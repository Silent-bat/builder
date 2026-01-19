import { InviteAcceptClient } from "@/components/invite/invite-accept-client";

export default async function InviteAcceptPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <InviteAcceptClient token={token} />;
}
