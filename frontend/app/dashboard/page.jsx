'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Sparkles, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null; // Prevent flash of content before redirect

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>AI Opportunity Finder</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 mr-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-zinc-300">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <LayoutDashboard className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              You've successfully authenticated. This is a temporary placeholder dashboard for Phase 2. The full dashboard will be built in Phase 4.
            </p>
            
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-left w-full max-w-md mx-auto shadow-2xl">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Your Profile Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-400">Name</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-400">Email</span>
                  <span className="font-medium text-emerald-400">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Role</span>
                  <span className="font-medium capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
