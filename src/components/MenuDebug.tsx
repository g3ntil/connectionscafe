import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function MenuDebug() {
  const [eatsData, setEatsData] = useState<any>(null);
  const [drinksData, setDrinksData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;
      
      const [eatsRes, drinksRes] = await Promise.all([
        fetch(`${baseUrl}/menu/complete/eats`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`${baseUrl}/menu/complete/drinks`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        })
      ]);

      const eatsJson = await eatsRes.json();
      const drinksJson = await drinksRes.json();

      console.log('Eats response:', eatsJson);
      console.log('Drinks response:', drinksJson);

      setEatsData(eatsJson);
      setDrinksData(drinksJson);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Menu Database Debug Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchData} disabled={loading} className="mb-4">
              {loading ? 'Loading...' : 'Refresh Data'}
            </Button>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded p-4 mb-4">
                <p className="text-red-400">Error: {error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eats Data */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Eats Menu Data</CardTitle>
            </CardHeader>
            <CardContent>
              {eatsData ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-zinc-400 text-sm mb-2">
                      Categories: {eatsData.menu?.length || 0}
                    </p>
                    {eatsData.menu?.map((cat: any) => (
                      <div key={cat.id} className="bg-zinc-800/50 rounded p-3 mb-2">
                        <p className="text-white font-medium">{cat.name}</p>
                        <p className="text-zinc-400 text-sm">
                          Items: {cat.items?.length || 0}
                        </p>
                        {cat.items?.length > 0 && (
                          <details className="mt-2">
                            <summary className="text-amber-500 text-sm cursor-pointer">
                              View items
                            </summary>
                            <div className="mt-2 pl-4 space-y-1">
                              {cat.items.map((item: any, idx: number) => (
                                <p key={idx} className="text-zinc-300 text-xs">
                                  {item.name} - {item.price}
                                  {item.order !== undefined && ` (order: ${item.order})`}
                                </p>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                  <details>
                    <summary className="text-zinc-400 text-sm cursor-pointer">
                      View raw JSON
                    </summary>
                    <pre className="mt-2 p-3 bg-black rounded text-xs text-zinc-300 overflow-auto max-h-96">
                      {JSON.stringify(eatsData, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <p className="text-zinc-500">Loading...</p>
              )}
            </CardContent>
          </Card>

          {/* Drinks Data */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Drinks Menu Data</CardTitle>
            </CardHeader>
            <CardContent>
              {drinksData ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-zinc-400 text-sm mb-2">
                      Categories: {drinksData.menu?.length || 0}
                    </p>
                    {drinksData.menu?.map((cat: any) => (
                      <div key={cat.id} className="bg-zinc-800/50 rounded p-3 mb-2">
                        <p className="text-white font-medium">{cat.name}</p>
                        <p className="text-zinc-400 text-sm">
                          Items: {cat.items?.length || 0}
                        </p>
                        {cat.items?.length > 0 && (
                          <details className="mt-2">
                            <summary className="text-amber-500 text-sm cursor-pointer">
                              View items
                            </summary>
                            <div className="mt-2 pl-4 space-y-1">
                              {cat.items.map((item: any, idx: number) => (
                                <p key={idx} className="text-zinc-300 text-xs">
                                  {item.name} - {item.price}
                                  {item.order !== undefined && ` (order: ${item.order})`}
                                </p>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                  <details>
                    <summary className="text-zinc-400 text-sm cursor-pointer">
                      View raw JSON
                    </summary>
                    <pre className="mt-2 p-3 bg-black rounded text-xs text-zinc-300 overflow-auto max-h-96">
                      {JSON.stringify(drinksData, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <p className="text-zinc-500">Loading...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
