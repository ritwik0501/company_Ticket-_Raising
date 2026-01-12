import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black text-white">
      
      {/* Left – Brand / Visual */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-900 via-black to-black">
        <h1 className="text-5xl font-extrabold leading-tight">
          Company <br />
          Ticket System
        </h1>
        <p className="text-white/60 mt-6 max-w-md">
          A powerful internal ticketing platform to track, manage, and resolve issues faster.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-white/60 text-sm">Support tracking</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-2xl font-bold">100%</p>
            <p className="text-white/60 text-sm">Secure system</p>
          </div>
        </div>
      </div>

      {/* Right – Login Card */}
      <div className="flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 sm:p-10">

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold">Welcome Back</h2>
              <p className="text-white/60 mt-2">
                Login to your CTS account
              </p>
            </div>

            {error && (
              <div className="mb-5 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="text-sm text-white/60 block mb-1">
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/60 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold tracking-wide hover:scale-[1.02] transition transform shadow-lg disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-white/60 text-sm mt-6">
              Don’t have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}
