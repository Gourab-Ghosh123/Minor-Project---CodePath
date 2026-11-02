import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DomainSelector from '../components/DomainSelector';
import {
  CheckCircle2,
  Target,
  Flame,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  Play,
  Clock,
  Code2,
  Award,
  HelpCircle,
  Compass,
  Zap,
  Bookmark
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('topics'); // 'topics' | 'series'
  const [showDomainSwitcher, setShowDomainSwitcher] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dashboard');
      setData(res.data);
      setError(null);
    } catch (err) {
      setError('Unable to load real-time dashboard analytics from server');
    } finally {
      setLoading(false);
    }
  };

  const handleDomainChanged = async (newDomain) => {
    await fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#FF7A00]/20 border-t-[#FF7A00] rounded-full animate-spin mb-4"></div>
        <div className="text-sm font-medium text-[#FFB370]">Fetching your real-time DSA performance metrics...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300">
          <p className="font-semibold">{error || 'Failed to load data'}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-[#FF7A00] text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const { stats, topicProgress, seriesProgress, recommendation, stuckAnalysis, badges, buddyCompanion, recentSubmissions } = data;
  const activeDomain = data.student?.domain || user?.domain || 'software-development';

  const domainDisplayNames = {
    'software-development': '💻 Software Development Track',
    'web-developer': '🌐 Web Developer Track',
    'data-science': '📊 Data Science & ML Track',
    'beginner': '🌱 Beginner (Noob to Pro) Track',
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Top Header with Domain Badge & Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182030] border border-[#242F46] text-xs font-bold text-[#FFB370]">
              <Sparkles size={13} className="text-[#FF7A00]" />
              <span>Student Diagnostic Center</span>
            </div>
            <button
              onClick={() => setShowDomainSwitcher(!showDomainSwitcher)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-xs font-bold text-[#FFB370] hover:bg-[#FF7A00]/25 transition-colors cursor-pointer"
              title="Click to switch track"
            >
              <span>{domainDisplayNames[activeDomain] || '💻 SDE Track'}</span>
              <span className="text-[10px] text-white/70 underline ml-1">Change Track</span>
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-[#FFB370]">{user?.name || data.student?.name}</span> 👋
          </h1>
          <p className="text-sm text-[#FFD1A9]/80 mt-1 font-normal">
            Track your progress, escape problem traps, and follow your domain-tailored DSA path.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/roadmap"
            className="px-4 py-2.5 rounded-xl bg-[#182030] hover:bg-[#1D263B] border border-[#242F46] text-white text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Compass size={15} className="text-[#FF7A00]" />
            <span>Learning Roadmap</span>
          </Link>
          <Link
            to="/problems"
            className="px-4 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-xs font-semibold transition-all shadow-md shadow-[#FF7A00]/25 flex items-center gap-2"
          >
            <Code2 size={15} />
            <span>Practice Problems</span>
          </Link>
        </div>
      </div>

      {/* Domain Switcher Expansion Panel */}
      {showDomainSwitcher && (
        <div className="p-6 rounded-2xl bg-[#0F1420] border-2 border-[#FF7A00]/40 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-[#FF7A00]" />
              <span>Select Your Active Domain Learning Track 🛣️</span>
            </div>
            <button
              onClick={() => setShowDomainSwitcher(false)}
              className="text-xs text-[#94A3B8] hover:text-white"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-[#FFD1A9]/80 font-normal">
            Switching your track personalizes roadmap stage order, problem sequences, and recommendation triggers.
          </p>
          <DomainSelector
            activeDomain={activeDomain}
            onSelectDomain={handleDomainChanged}
          />
        </div>
      )}

      {/* ByteBuddy Companion Encouragement Banner 🌿 */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#182030] via-[#141C2B] to-[#101622] border border-[#FF7A00]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center text-2xl shadow-lg shadow-[#FF7A00]/30 shrink-0">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FFB370] uppercase tracking-wider">
                CodePath Study Buddy
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Peer Support Active
              </span>
            </div>
            <p className="text-sm font-medium text-white mt-0.5 leading-snug">
              "{buddyCompanion?.greeting || "Keep going, buddy! Every line of code compounds into algorithmic intuition."}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <Link
            to="/problems"
            className="px-3.5 py-1.5 rounded-xl bg-[#FF7A00]/20 hover:bg-[#FF7A00]/30 border border-[#FF7A00]/40 text-xs font-bold text-[#FFB370] transition-colors flex items-center gap-1.5"
          >
            <span>Ask for Hints / Practice</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Core Telemetry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Problems Solved</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/15 flex items-center justify-center text-[#FF7A00]">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{stats.problemsSolved}</div>
          <div className="text-xs text-[#FFD1A9]/70 mt-1">Unique challenges cleared</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Accuracy Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/15 flex items-center justify-center text-[#FF7A00]">
              <Target size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{stats.accuracy}%</div>
          <div className="text-xs text-[#FFD1A9]/70 mt-1">Across {stats.totalSubmissions} submissions</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Current Streak</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/15 flex items-center justify-center text-[#FF7A00]">
              <Flame size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{stats.currentStreak} Days</div>
          <div className="text-xs text-[#FFD1A9]/70 mt-1">Daily consistency streak 🔥</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Mastery XP</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Zap size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">{stats.xp || 0} XP</div>
          <div className="text-xs text-[#FFD1A9]/70 mt-1">Experience points earned</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] relative overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Topics Mastered</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/15 flex items-center justify-center text-[#FF7A00]">
              <Layers size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{stats.topicsCompleted} / 11</div>
          <div className="text-xs text-[#FFD1A9]/70 mt-1">Curriculum modules cleared</div>
        </div>
      </div>

      {/* Stuck / Trapped Topics Buster Hub 🪤 (Highlighted in summary!) */}
      {stuckAnalysis && stuckAnalysis.length > 0 ? (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#182030] to-[#121824] border-2 border-rose-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg shrink-0">
                🪤
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                  <span>Stuck Topic Diagnostic</span>
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  We spotted a topic where you're currently stuck!
                </h3>
              </div>
            </div>
            <span className="text-xs text-rose-300 font-semibold">
              Automatic Remedial Support Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {stuckAnalysis.map((item) => (
              <div
                key={item.topic}
                className="p-4 rounded-xl bg-[#0B0E14] border border-rose-500/30 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white text-sm">{item.topic}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                    Accuracy: {item.accuracy}% ({item.failedSubmissions} failed attempts)
                  </span>
                </div>

                <div className="text-xs text-[#FFD1A9]/90 space-y-1">
                  <div className="font-semibold text-rose-300 flex items-center gap-1">
                    <AlertTriangle size={13} />
                    <span>Identified Trap:</span>
                  </div>
                  <p className="pl-4 font-normal text-[11px] text-[#E2E8F0]">{item.identifiedTrap}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#182030] border border-[#242F46] text-xs space-y-1">
                  <span className="font-bold text-[#FFB370] text-[11px]">🌿 ByteBuddy's Rescue Tip:</span>
                  <p className="text-[11px] text-[#FFD1A9]/80 font-normal">{item.buddyRescueTip}</p>
                </div>

                {item.remedialProblem && (
                  <div className="pt-2 flex items-center justify-between border-t border-[#242F46]">
                    <span className="text-[11px] text-[#94A3B8]">Recommended Escape Warmup:</span>
                    <Link
                      to={`/problems/${item.remedialProblem.slug}`}
                      className="px-3 py-1 rounded-lg bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>{item.remedialProblem.title}</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-[#121824] border border-emerald-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm">
              🛡️
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400">All Topics Stable</span>
              <p className="text-[11px] text-[#FFD1A9]/80 font-normal">
                No stuck traps detected. ByteBuddy is actively analyzing each submission to keep you on the clear path!
              </p>
            </div>
          </div>
          <Link
            to="/roadmap"
            className="text-xs font-semibold text-[#FFB370] hover:text-white shrink-0"
          >
            Advance Roadmap &rarr;
          </Link>
        </div>
      )}

      {/* Personalized Learning Recommendation Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#182030] via-[#151D2C] to-[#121824] border-2 border-[#FF7A00]/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 text-xs font-bold text-[#FFB370]">
              <TrendingUp size={14} />
              <span>Personalized Practice Priority</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Target Priority: <span className="text-[#FFB370]">{recommendation.recommendedTopic}</span>
            </h2>
            <p className="text-sm text-[#FFD1A9]/90 max-w-3xl leading-relaxed font-normal">
              {recommendation.reason}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <div className="text-xs text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">
              Prescribed Practice List
            </div>
            <div className="space-y-2">
              {recommendation.recommendedProblems && recommendation.recommendedProblems.length > 0 ? (
                recommendation.recommendedProblems.map((p) => (
                  <Link
                    key={p._id}
                    to={`/problems/${p._id}`}
                    className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl bg-[#0B0E14] hover:bg-[#1D263B] border border-[#242F46] hover:border-[#FF7A00]/50 transition-all text-xs font-semibold group"
                  >
                    <div className="flex items-center gap-2">
                      <Play size={13} className="text-[#FF7A00] group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-white group-hover:text-[#FFB370] transition-colors">{p.title}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : p.difficulty === 'Medium'
                          ? 'bg-[#FF7A00]/10 text-[#FFB370]'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="text-xs text-[#94A3B8]">All priority problems completed for this topic!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Breakdown: Topic-wise vs Series-wise Toggle */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Curriculum Progress Breakdown</h3>
                <p className="text-xs text-[#FFD1A9]/70 mt-0.5 font-normal">
                  View your completion topic-wise or grouped by practice series
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#0B0E14] rounded-xl border border-[#242F46] self-start sm:self-center">
                <button
                  onClick={() => setViewMode('topics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'topics'
                      ? 'bg-[#FF7A00] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Topic-Wise
                </button>
                <button
                  onClick={() => setViewMode('series')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'series'
                      ? 'bg-[#FF7A00] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Series-Wise 🎗️
                </button>
              </div>
            </div>

            {viewMode === 'topics' ? (
              <div className="space-y-4">
                {topicProgress.map((item) => (
                  <div key={item.topic} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold">
                        <span className="text-white">{item.topic}</span>
                        {item.status === 'Locked' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#182030] text-[#94A3B8] border border-[#242F46]">
                            Locked
                          </span>
                        )}
                        {item.status === 'Completed' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Cleared
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#94A3B8]">
                          {item.problemsSolved} / {item.totalProblems} solved
                        </span>
                        <span className="font-bold text-[#FFB370] w-10 text-right">{item.percentage}%</span>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#0B0E14] overflow-hidden border border-[#242F46]/60">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.percentage === 100
                            ? 'bg-emerald-400'
                            : item.percentage > 0
                            ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFB370]'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${Math.max(item.percentage, 0)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {seriesProgress && seriesProgress.map((s) => (
                  <div
                    key={s.series}
                    className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Bookmark size={13} className="text-[#FF7A00]" />
                        <span>{s.series}</span>
                      </span>
                      <span className="text-xs font-bold text-[#FFB370]">{s.percentage}%</span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#182030] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB370] rounded-full"
                        style={{ width: `${s.percentage}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                      <span>{s.problemsSolved} of {s.totalProblems} solved</span>
                      <Link
                        to="/problems"
                        className="text-[#FFB370] hover:text-white font-medium"
                      >
                        Explore &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges & Achievements Showcase */}
          <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award size={18} className="text-[#FF7A00]" />
                  <span>Student Achievements & Badges 🎉</span>
                </h3>
                <p className="text-xs text-[#FFD1A9]/70 mt-0.5 font-normal">
                  Unlock peer milestones as you solve problems and keep consistent
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {badges && badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    badge.unlocked
                      ? 'bg-[#182030] border-[#FF7A00]/50 shadow-md shadow-[#FF7A00]/10'
                      : 'bg-[#0B0E14] border-[#242F46]/50 opacity-40'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-bold text-white leading-tight">{badge.name}</div>
                  <div className="text-[10px] text-[#FFD1A9]/70 mt-1 font-normal line-clamp-2">
                    {badge.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Recent Submissions & Demo Notes */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Recent Submissions</h3>
              <Clock size={16} className="text-[#FF7A00]" />
            </div>

            {recentSubmissions && recentSubmissions.length > 0 ? (
              <div className="space-y-3">
                {recentSubmissions.map((sub) => (
                  <div
                    key={sub._id}
                    className="p-3 rounded-xl bg-[#0B0E14] border border-[#242F46] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white truncate">
                        {sub.problemId?.title || 'Problem Solution'}
                      </div>
                      <div className="text-[11px] text-[#FFD1A9]/70 flex items-center gap-2 mt-0.5 font-normal">
                        <span className="uppercase">{sub.language}</span>
                        <span>•</span>
                        <span>{sub.executionTimeMs}ms</span>
                        <span>•</span>
                        <span className="text-[#FFB370]">{sub.problemId?.topic}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        sub.status === 'Accepted'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Code2 size={28} className="mx-auto text-[#94A3B8] mb-2 opacity-50" />
                <p className="text-xs text-[#FFD1A9]/70 font-normal">No submissions recorded yet.</p>
                <Link
                  to="/problems"
                  className="mt-3 inline-block text-xs font-semibold text-[#FFB370] hover:text-white"
                >
                  Start your first problem &rarr;
                </Link>
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#182030] to-[#121824] border border-[#242F46]">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <span>🌿 CodePath Environment</span>
            </h4>
            <p className="text-xs text-[#FFD1A9]/80 leading-relaxed font-normal">
              Built to provide a friendly, supportive learning space. As you submit solutions, topic accuracy recalculates in real-time and unlocked milestone badges cheer you on!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
