import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Compass,
  Zap,
  Cpu,
  BarChart,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  BrainCircuit,
  Award,
  Layers,
  Sparkles,
  HelpCircle,
  Bookmark,
  ShieldCheck,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DOMAINS = [
  {
    icon: '💻',
    title: 'Software Development Track',
    badge: 'SDE Canonical',
    desc: 'Full industry-standard roadmap covering all linear & non-linear data structures, trees, graphs, and dynamic programming.',
  },
  {
    icon: '🌐',
    title: 'Web Developer Track',
    badge: 'Fullstack & Frontend',
    desc: 'Targeted for web engineers: hash lookups, event loop queues, call stacks, DOM trees, and package dependency graphs.',
  },
  {
    icon: '📊',
    title: 'Data Science & ML Track',
    badge: 'Analytics & Models',
    desc: 'Specialized for data analysts & ML engineers: matrices, binary search optimization, decision trees, and dynamic programming.',
  },
  {
    icon: '🌱',
    title: 'Noob to Pro (Beginner)',
    badge: 'Gentle Start',
    desc: 'Zero-intimidation starting line with visual two pointers, plate stack intuition, and friendly buddy hints at every step.',
  },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-[#FF7A00]/30 selection:text-white">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0E14]/80 backdrop-blur-md border-b border-[#242F46]/80 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center font-black text-white shadow-lg shadow-[#FF7A00]/25">
              CP
            </div>
            <div className="font-extrabold text-white text-xl tracking-tight">
              Code<span className="text-[#FFB370]">Path</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#FFD1A9]/80">
            <a href="#domains" className="hover:text-[#FFB370] transition-colors">Career Domains</a>
            <a href="#how-it-works" className="hover:text-[#FFB370] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#FFB370] transition-colors">Buddy Support 🌿</a>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white font-semibold text-sm transition-all shadow-lg shadow-[#FF7A00]/25 flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#FFD1A9] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9433] hover:from-[#FF8C1A] hover:to-[#FFA74D] text-white font-semibold text-sm transition-all shadow-md shadow-[#FF7A00]/25"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#FF7A00]/15 to-transparent blur-3xl -z-10 pointer-events-none rounded-full"></div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182030] border border-[#242F46] text-xs font-semibold text-[#FFB370] mb-8 shadow-sm">
            <Sparkles size={14} className="text-[#FF7A00]" />
            <span>Personalized DSA Learning & Assessment Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Master DSA from Scratch. <br />
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FFB370] to-white bg-clip-text text-transparent">
              Follow Your Career Path.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#FFD1A9]/80 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            No more confusion about which topic to study or which coding problem to solve next! CodePath categorizes DSA into domain tracks (Web Dev, Data Science, Software Dev & Beginners), provides real-time progress reports, and rescues you when stuck 🪤.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white font-semibold text-base transition-all shadow-lg shadow-[#FF7A00]/25 flex items-center justify-center gap-2"
            >
              Start Diagnostic Journey
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/problems"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#121824] hover:bg-[#182030] border border-[#242F46] text-white font-medium text-base transition-all flex items-center justify-center gap-2"
            >
              Explore Problem Set
            </Link>
          </div>

          {/* Live Telemetry Card Preview */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#182030] to-[#121824] border border-[#242F46] shadow-2xl max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#242F46] px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#10B981]/80"></div>
                <span className="text-xs text-[#94A3B8] font-mono ml-2">adaptive_engine_telemetry.js</span>
              </div>
              <span className="text-xs font-semibold text-[#FFB370]">Live Assessment Feed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46]">
                <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Career Domain</div>
                <div className="text-base font-bold text-white">🌐 Web Developer Track</div>
                <div className="mt-2 text-xs text-[#FFB370]">Curated for DOM trees & Event queues</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46]">
                <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Stuck Topic Rescue 🪤</div>
                <div className="text-base font-bold text-rose-300">Pointer Boundary Traps</div>
                <div className="mt-2 text-xs text-[#FFD1A9]/70">Step-by-step intuition hints active</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46]">
                <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Student Encouragement 🎉</div>
                <div className="text-base font-bold text-emerald-400">Milestone Badges + XP</div>
                <div className="mt-2 text-xs text-emerald-400/80">Celebrates every solved challenge</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Tracks Section */}
      <section id="domains" className="py-20 px-6 lg:px-12 bg-[#0F1420] border-y border-[#242F46]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Categorized Learning Paths 🛣️
            </h2>
            <p className="text-base text-[#FFD1A9]/80 font-normal">
              Students get confused when given random 500-question lists. CodePath tailors problem sequences to your exact engineering specialization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOMAINS.map((dom, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121824] border border-[#242F46] hover:border-[#FF7A00]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-4">{dom.icon}</div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#FF7A00]/20 text-[#FFB370] border border-[#FF7A00]/30 uppercase">
                    {dom.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-2">{dom.title}</h3>
                  <p className="text-xs text-[#FFD1A9]/80 leading-relaxed font-normal">
                    {dom.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#242F46]/60 flex items-center justify-between text-xs font-semibold text-[#FFB370]">
                  <span>Explore Track</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              How CodePath Solves the Student Problem 🚧
            </h2>
            <p className="text-base text-[#FFD1A9]/80 font-normal">
              A structured, friendly environment engineered to eliminate guesswork and support you when you're stuck.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46] hover:border-[#FF7A00]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFB370] font-bold text-lg mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pick Your Career Domain</h3>
              <p className="text-sm text-[#FFD1A9]/80 leading-relaxed font-normal">
                Follow an industry-aligned sequence tailored to Web Development, Data Science, Software Development, or Complete Beginner.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46] hover:border-[#FF7A00]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFB370] font-bold text-lg mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Stuck Topic Rescue 🪤</h3>
              <p className="text-sm text-[#FFD1A9]/80 leading-relaxed font-normal">
                Whenever accuracy dips or you encounter tricky pointer traps, ByteBuddy automatically provides 3-tier guided hints and peer advice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46] hover:border-[#FF7A00]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFB370] font-bold text-lg mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Encouraging Feedback 🎉</h3>
              <p className="text-sm text-[#FFD1A9]/80 leading-relaxed font-normal">
                Every solved challenge rewards Mastery XP, maintains your daily streak, and unlocks celebratory milestone badges!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buddy Support Section */}
      <section id="features" className="py-20 px-6 lg:px-12 bg-[#0F1420] border-t border-[#242F46]">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#182030] to-[#121824] border border-[#FF7A00]/40 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/20 text-[#FFB370] text-xs font-bold">
                <span>🌿 Friendly Student Peer Environment</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Meet CodePath ByteBuddy 🌿
              </h2>
              <p className="text-sm text-[#FFD1A9]/80 leading-relaxed font-normal">
                Learning Data Structures shouldn't feel lonely or intimidating. ByteBuddy is your 24/7 student companion that gives you gentle nudges, step-by-step intuition hints, and celebrates every milestone you cross!
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Join CodePath Today</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center text-7xl shadow-2xl shadow-[#FF7A00]/30 shrink-0">
              🌿
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-12 border-t border-[#242F46] bg-[#0B0E14] text-center text-xs text-[#94A3B8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#FF7A00] flex items-center justify-center font-bold text-white text-xs">
              CP
            </div>
            <span className="font-bold text-white">CodePath</span>
            <span>— Personalized DSA Learning & Assessment Platform</span>
          </div>
          <p className="text-[#FFD1A9]/60 font-normal">Minor Project 2026 • Computer Science & Engineering</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
