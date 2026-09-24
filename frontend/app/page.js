'use client';

import { useQuery } from '@tanstack/react-query';
import { checkBackendHealth } from '@/lib/api/health';

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['healthCheck'],
    queryFn: checkBackendHealth,
    retry: false
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">System Status</h1>
        
        <div className="space-y-4">
          <StatusItem 
            label="Frontend" 
            status="Connected" 
            isLoading={false} 
            isError={false} 
          />
          
          <StatusItem 
            label="Backend API" 
            status={isLoading ? 'Connecting...' : error ? 'Disconnected' : 'Connected'} 
            isLoading={isLoading}
            isError={!!error}
          />
          
          <StatusItem 
            label="Database" 
            status={
              isLoading ? 'Connecting...' : 
              error ? 'Unknown' : 
              data?.database === 'connected' ? 'Connected' : 'Disconnected'
            } 
            isLoading={isLoading}
            isError={!!error || (data && data.database !== 'connected')}
          />
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
            Make sure the backend is running on port 5000 and CORS is configured.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusItem({ label, status, isLoading, isError }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
        ) : isError ? (
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        )}
        <span className={`text-sm font-medium ${
          isLoading ? 'text-yellow-600' : 
          isError ? 'text-red-600' : 
          'text-green-600'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}
