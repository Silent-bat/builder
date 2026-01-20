import { cookies } from 'next/headers';

export default async function TestCookies() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Cookie Test</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">All Cookies:</h2>
          <div className="bg-gray-100 p-4 rounded">
            {allCookies.length === 0 ? (
              <p>No cookies found</p>
            ) : (
              <ul className="space-y-2">
                {allCookies.map((cookie, index) => (
                  <li key={index} className="font-mono text-sm">
                    <strong>{cookie.name}:</strong> {cookie.value.substring(0, 50)}...
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold">Session Cookie Check:</h2>
          <div className="bg-blue-100 p-4 rounded">
            <ul className="space-y-1">
              <li>better-auth.session_token: {cookieStore.get('better-auth.session_token')?.value ? '✅ Found' : '❌ Not found'}</li>
              <li>session: {cookieStore.get('session')?.value ? '✅ Found' : '❌ Not found'}</li>
              <li>auth_session: {cookieStore.get('auth_session')?.value ? '✅ Found' : '❌ Not found'}</li>
              <li>better-auth.session: {cookieStore.get('better-auth.session')?.value ? '✅ Found' : '❌ Not found'}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Test Instructions:</h2>
          <ol className="list-decimal ml-6 space-y-2">
            <li>First, visit this page while logged OUT</li>
            <li>Note what cookies exist</li>
            <li>Then, login at <a href="/auth/sign-in" className="text-blue-500 underline">/auth/sign-in</a></li>
            <li>Come back to this page while logged IN</li>
            <li>Compare the cookies - this will show exactly what Better Auth creates</li>
          </ol>
        </div>
      </div>
    </div>
  );
}