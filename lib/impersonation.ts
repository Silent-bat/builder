import { cookies } from "next/headers";

export const IMPERSONATION_COOKIE = "app.impersonate_user_id";

export async function getImpersonatedUserId() {
  const store = await cookies();
  return store.get(IMPERSONATION_COOKIE)?.value || null;
}
