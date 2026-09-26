'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#083A4F] text-[#E5E1DD] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(to right, #E5E1DD 1px, transparent 1px), linear-gradient(to bottom, #E5E1DD 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)'
        }}
        animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
      />

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A58D66]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#407E8C]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 py-10">
        <div className="bg-[#083A4F]/90 border border-[#407E8C]/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/40 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A58D66]/30 to-transparent" />
          
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-6">
              <Sparkles className="w-6 h-6 text-[#A58D66]" />
              <span>AI Opportunity Finder</span>
            </Link>
            <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-9 w-5 h-5 text-[#E5E1DD]/50" />
              <Input
                label="Full name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                placeholder="John Doe"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-9 w-5 h-5 text-[#E5E1DD]/50" />
              <Input
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-9 w-5 h-5 text-[#E5E1DD]/50" />
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-[#E5E1DD]/50 hover:text-[#E5E1DD]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-9 w-5 h-5 text-[#E5E1DD]/50" />
              <Input
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#E5E1DD]/70">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[#A58D66] hover:text-[#C1A77E]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
