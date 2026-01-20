import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function TestAuth() {
  let authResult = null;
  let error = null;
  
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    authResult = { success: true, hasSession: !!session };
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Auth Test</h1>
      {authResult ? (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>✅ Auth initialized!</p>
          <p>Has session: {authResult.hasSession ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-red-100 rounded">
          <p>❌ Auth error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
