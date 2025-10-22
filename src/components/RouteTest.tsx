import { useLocation, Link } from 'react-router-dom';

export function RouteTest() {
  const location = useLocation();
  
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/preview_page.html', label: 'Dashboard (preview_page.html)' },
    { path: '/secure-portal-musanze-2025', label: 'Dashboard (secure portal)' },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h1 className="text-3xl mb-4 text-[#5B3A29]">🔍 Route Testing & Diagnostics</h1>
          <div className="space-y-2 text-sm">
            <p className="text-gray-400">
              Current pathname: <span className="text-green-400 font-mono">{location.pathname}</span>
            </p>
            <p className="text-gray-400">
              Search: <span className="text-green-400 font-mono">{location.search || 'none'}</span>
            </p>
            <p className="text-gray-400">
              Hash: <span className="text-green-400 font-mono">{location.hash || 'none'}</span>
            </p>
            <p className="text-gray-400">
              Full URL: <span className="text-green-400 font-mono">{window.location.href}</span>
            </p>
          </div>
        </div>

        <div className="mb-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl mb-4">Test Navigation (React Router Links)</h2>
          <p className="text-sm text-gray-400 mb-4">
            Click these links to test React Router navigation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  location.pathname === route.path
                    ? 'bg-[#5B3A29] border-[#5B3A29] text-white'
                    : 'bg-zinc-800 border-zinc-700 text-gray-300 hover:border-[#5B3A29] hover:bg-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{route.label}</span>
                  {location.pathname === route.path && (
                    <span className="text-xs">← Current</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-mono">{route.path}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl mb-4">Test Direct Navigation</h2>
          <p className="text-sm text-gray-400 mb-4">
            Use these links to test direct navigation (full page load):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                className="px-4 py-3 rounded-lg border bg-zinc-800 border-zinc-700 text-gray-300 hover:border-blue-500 hover:bg-zinc-700 transition-all block"
              >
                <div className="text-sm">{route.label}</div>
                <div className="text-xs text-gray-500 mt-1 font-mono">{route.path}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800">
          <h3 className="text-lg mb-2 text-green-400">✓ Route Test Status</h3>
          <p className="text-sm text-gray-300">
            If you're seeing this page at <span className="font-mono text-green-400">/route-test</span>, 
            then React Router is working correctly! Test the navigation links above.
          </p>
        </div>

        <div className="mt-8 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <h3 className="text-sm mb-2 text-gray-400">Debug Information</h3>
          <div className="text-xs font-mono text-gray-500 space-y-1">
            <p>User Agent: {navigator.userAgent}</p>
            <p>Screen: {window.screen.width}x{window.screen.height}</p>
            <p>Viewport: {window.innerWidth}x{window.innerHeight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
