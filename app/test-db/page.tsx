import { prisma } from "@/lib/db";

export default async function TestDB() {
  let dbResult = null;
  let error = null;
  
  try {
    const count = await prisma.page.count();
    dbResult = { success: true, count };
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Database Test</h1>
      {dbResult ? (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>✅ Database connected!</p>
          <p>Pages count: {dbResult.count}</p>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-red-100 rounded">
          <p>❌ Database error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
