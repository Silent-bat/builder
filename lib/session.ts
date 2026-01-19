import { cookies } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { IMPERSONATION_COOKIE } from "./impersonation";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const session = await auth.api.getSession({
      headers: {
        cookie: `better-auth.session_token=${sessionToken}`,
      },
    });

    if (!session) {
      return null;
    }

    // Fetch user role from database (real logged-in user)
    const realUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, name: true, role: true },
    });

    const base = {
      ...session,
      user: {
        ...session.user,
        role: realUser?.role || "USER",
      },
    } as any;

    // If an admin set impersonation cookie, act as that user
    const impersonateUserId = cookieStore.get(IMPERSONATION_COOKIE)?.value;

    if (impersonateUserId && base.user.role === "ADMIN") {
      const target = await prisma.user.findUnique({
        where: { id: impersonateUserId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          emailVerified: true,
          image: true,
          createdAt: true,
        },
      });

      if (target) {
        return {
          ...base,
          impersonator: {
            id: realUser?.id,
            email: realUser?.email,
            name: realUser?.name,
            role: realUser?.role,
          },
          user: {
            // impersonated user becomes the effective user
            ...base.user,
            ...target,
          },
        };
      }
    }

    return base;
  } catch (error) {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect("/auth/sign-in");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return session;
}
