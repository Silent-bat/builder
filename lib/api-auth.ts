import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function getApiSession(req: NextRequest) {
  try {
    return await auth.api.getSession({
      headers: req.headers,
    });
  } catch {
    return null;
  }
}

export async function requireAuthApi(req: NextRequest) {
  const session = await getApiSession(req);
  if (!session) {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session, response: null as NextResponse | null };
}

export async function requireAdminApi(req: NextRequest) {
  const { session, response } = await requireAuthApi(req);
  if (!session) return { session: null, response };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    return {
      session: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { session, response: null as NextResponse | null };
}
