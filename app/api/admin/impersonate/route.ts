import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { IMPERSONATION_COOKIE } from "@/lib/impersonation";
import { requireAdminApi } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  // IMPORTANT: API auth must not redirect; must validate real admin user
  const { session, response } = await requireAdminApi(req);
  if (response) return response;

  const { userId } = await req.json();
  if (!userId || typeof userId !== "string") {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (userId === session!.user.id) {
    return NextResponse.json(
      { error: "Cannot impersonate yourself" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const store = await cookies();
  store.set(IMPERSONATION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { response } = await requireAdminApi(req);
  if (response) return response;

  const store = await cookies();
  store.delete(IMPERSONATION_COOKIE);
  return NextResponse.json({ success: true });
}
