'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-[Outfit,sans-serif] px-6">
      <form onSubmit={handleLogin} className="w-full max-w-[400px] p-10 rounded-2xl bg-[#12121a] border border-white/[0.06] text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F195] mx-auto mb-6 flex items-center justify-center text-3xl">
          ⚡
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-2">Superteam MY</h1>
        <p className="text-sm text-white/40 mb-8">Admin Dashboard</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 text-left">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border border-white/[0.08] text-white text-sm outline-none focus:border-[#9945FF]/50 transition-colors"
            placeholder="admin@superteam.my"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 text-left">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border border-white/[0.08] text-white text-sm outline-none focus:border-[#9945FF]/50 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold text-[15px] border-none cursor-pointer disabled:opacity-50 hover:shadow-lg hover:shadow-[#9945FF]/20 transition-shadow"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="mt-5 text-xs text-white/20">
          Powered by Supabase Auth
        </p>
      </form>
    </div>
  );
}
