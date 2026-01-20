export default function TestSimple() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Test Page</h1>
      <p>If you see this, basic rendering works!</p>
      <div className="mt-4">
        <p>Environment check:</p>
        <ul className="list-disc ml-6">
          <li>DATABASE_URL: {process.env.DATABASE_URL ? '✅ Set' : '❌ Missing'}</li>
          <li>BETTER_AUTH_URL: {process.env.BETTER_AUTH_URL ? '✅ Set' : '❌ Missing'}</li>
          <li>NODE_ENV: {process.env.NODE_ENV}</li>
        </ul>
      </div>
    </div>
  );
}
