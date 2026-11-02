import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, AlertCircle, Sparkles, Check } from 'lucide-react';

const DOMAIN_OPTIONS = [
  {
    key: 'software-development',
    label: '💻 Software Development',
    tagline: 'Standard SDE & FAANG curriculum',
  },
  {
    key: 'web-developer',
    label: '🌐 Web Developer',
    tagline: 'Frontend, backend, JSON & DOM trees',
  },
  {
    key: 'data-science',
    label: '📊 Data Science & ML',
    tagline: 'Matrix math, binary search & DP',
  },
  {
    key: 'beginner',
    label: '🌱 Beginner (Noob to Pro)',
    tagline: 'Gentle step-by-step with extra buddy hints',
  },
];

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('software-development');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, domain);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF7A00]/10 blur-3xl -z-10 pointer-events-none rounded-full"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center font-black text-white text-lg shadow-lg shadow-[#FF7A00]/25">
            CP
          </div>
          <span className="font-extrabold text-2xl text-white tracking-tight">Code<span className="text-[#FFB370]">Path</span></span>
        </Link>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Create student profile
        </h2>
        <p className="mt-2 text-sm text-[#FFD1A9]/80 font-normal">
          Pick your domain learning track and get personalized DSA roadmaps
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-[#121824] py-8 px-6 sm:px-10 rounded-2xl border border-[#242F46] shadow-xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#FFB370] uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Gourab Mukherjee"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-[#242F46] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF7A00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FFB370] uppercase tracking-wider mb-2">
                College / Personal Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-[#242F46] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF7A00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FFB370] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-[#242F46] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF7A00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FFB370] uppercase tracking-wider mb-2">
                Select Your Goal / Domain Track 🛣️
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DOMAIN_OPTIONS.map((opt) => {
                  const isSelected = domain === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => setDomain(opt.key)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#182030] border-[#FF7A00] shadow-sm'
                          : 'bg-[#0B0E14] border-[#242F46] hover:border-[#FF7A00]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{opt.label}</span>
                        {isSelected && <Check size={14} className="text-[#FF7A00]" />}
                      </div>
                      <span className="text-[10px] text-[#FFD1A9]/70 mt-1 font-normal leading-tight">
                        {opt.tagline}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white font-semibold text-sm transition-all shadow-md shadow-[#FF7A00]/25 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Start Learning with CodePath</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#242F46] text-center">
            <p className="text-xs text-[#FFD1A9]/70 font-normal">
              Already registered on CodePath?{' '}
              <Link to="/login" className="font-semibold text-[#FFB370] hover:text-white transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
