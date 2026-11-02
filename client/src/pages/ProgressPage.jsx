import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Code2,
  ChevronRight,
  ShieldCheck,
  Target,
  Bookmark,
  AlertTriangle,
  Lightbulb,
  Compass
} from 'lucide-react';

const ProgressPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('topics'); // 'topics' | 'series'

  useEffect(() => {
    fetchDetailedProgress();
  }, []);

  const fetchDetailedProgress = async () => {
    try {
      setLoading(true);
      const res = await api.get('/progress');
      setData(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch detailed progress analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#FF7A00]/20 border-t-[#FF7A00] rounded-full animate-spin mb-4"></div>
        <div className="text-sm font-medium text-[#FFB370]">Loading algorithmic skill telemetry...</div>
      </div>
    );
  }

  const topics = data?.topics || (Array.isArray(data) ? data : []);
  const series = data?.series || [];
  const stuckTopics = data?.stuckTopics || [];

  const totalPossibleProblems =
    data?.metrics?.totalPossibleProblems || topics.reduce((acc, t) => acc + (t.totalProblems || 0), 0);
  const totalSolvedProblems =
    data?.metrics?.totalSolvedProblems || topics.reduce((acc, t) => acc + (t.problemsSolved || 0), 0);
  const overallPercentage =
    totalPossibleProblems > 0 ? Math.round((totalSolvedProblems / totalPossibleProblems) * 100) : 0;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182030] border border-[#242F46] text-xs font-semibold text-[#FFB370] mb-2">
            <BarChart3 size={13} className="text-[#FF7A00]" />
            <span>Comprehensive Performance Analytics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Algorithmic Progress Reports
          </h1>
          <p className="text-sm text-[#FFD1A9]/80 mt-1 font-normal">
            Track topic-wise and series-wise mastery, solve accuracy, and escape problem bottlenecks.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#121824] rounded-xl border border-[#242F46] self-start sm:self-center">
          <button
            onClick={() => setViewMode('topics')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'topics'
                ? 'bg-[#FF7A00] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Topic-Wise View
          </button>
          <button
            onClick={() => setViewMode('series')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'series'
                ? 'bg-[#FF7A00] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Series-Wise Collections 🎗️
          </button>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46]">
          <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
            Curriculum Completion Rate
          </div>
          <div className="text-3xl font-extrabold text-white">{overallPercentage}%</div>
          <div className="mt-3 w-full h-2 rounded-full bg-[#0B0E14] overflow-hidden border border-[#242F46]">
            <div
              className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB370] rounded-full transition-all"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-[#FFD1A9]/70 mt-2 font-mono">
            {totalSolvedProblems} of {totalPossibleProblems} problems completed
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46]">
          <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
            Remedial Trap Diagnostic
          </div>
          <div className="text-xl font-bold text-[#FFB370]">
            {stuckTopics.length > 0 ? `${stuckTopics.length} Stuck Topics Flagged` : 'All Topics On Track 🛡️'}
          </div>
          <p className="text-xs text-[#FFD1A9]/80 mt-2 leading-relaxed font-normal">
            Topics with low accuracy or repeated failed submissions automatically trigger ByteBuddy's guided rescue hints.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121824] border border-[#242F46]">
          <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
            Evaluation Engine
          </div>
          <div className="text-xl font-bold text-emerald-400">Deterministic & Live</div>
          <p className="text-xs text-[#FFD1A9]/80 mt-2 leading-relaxed font-normal">
            Calculated directly from real-time user code submissions with test case analytics.
          </p>
        </div>
      </div>

      {/* Stuck Topics Banner if any */}
      {stuckTopics.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle size={15} />
            <span>Bottleneck Alert: Topics Needing Focused Attention</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stuckTopics.map((st) => (
              <div key={st.topic} className="p-3.5 rounded-xl bg-[#0B0E14] border border-rose-500/20 text-xs space-y-1">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{st.topic}</span>
                  <span className="text-rose-400 font-mono">{st.accuracy}% accuracy</span>
                </div>
                <p className="text-[11px] text-[#FFD1A9]/70 font-normal">{st.suggestedAction}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content: Topic-Wise or Series-Wise */}
      {viewMode === 'topics' ? (
        <div className="space-y-4">
          {topics.map((item) => (
            <div
              key={item.topic}
              className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#182030] border border-[#242F46] flex items-center justify-center font-bold text-[#FFB370] text-sm">
                    {item.topic.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.topic}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#FFD1A9]/70 mt-0.5 font-normal">
                      <span>{item.problemsSolved} / {item.totalProblems} Solved</span>
                      <span>•</span>
                      <span className="font-semibold text-[#FFB370]">Accuracy: {item.accuracy}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 hidden sm:block">
                    <div className="w-full h-2 rounded-full bg-[#0B0E14] overflow-hidden border border-[#242F46]">
                      <div
                        className="h-full bg-[#FF7A00] rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#FFB370]">{item.percentage}%</span>
                </div>
              </div>

              {item.problems && item.problems.length > 0 && (
                <div className="pt-2 border-t border-[#242F46]/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {item.problems.map((p) => (
                    <Link
                      key={p._id}
                      to={`/problems/${p._id}`}
                      className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                        p.isSolved
                          ? 'bg-[#0B0E14] border border-emerald-500/30 text-white hover:border-emerald-500'
                          : 'bg-[#0B0E14] border border-[#242F46] text-white hover:border-[#FF7A00]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {p.isSolved ? (
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#94A3B8]/40 shrink-0"></div>
                        )}
                        <span className="truncate">{p.title}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold ${
                          p.difficulty === 'Easy'
                            ? 'text-emerald-400'
                            : p.difficulty === 'Medium'
                            ? 'text-[#FFB370]'
                            : 'text-rose-400'
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {series.map((s) => (
            <div
              key={s.series}
              className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#182030] border border-[#242F46] flex items-center justify-center text-[#FF7A00]">
                    <Bookmark size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{s.series}</h3>
                    <div className="text-xs text-[#FFD1A9]/70 mt-0.5 font-normal">
                      {s.problemsSolved} of {s.totalProblems} challenges completed
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 hidden sm:block">
                    <div className="w-full h-2 rounded-full bg-[#0B0E14] overflow-hidden border border-[#242F46]">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB370] rounded-full"
                        style={{ width: `${s.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#FFB370]">{s.percentage}%</span>
                </div>
              </div>

              {s.problems && s.problems.length > 0 && (
                <div className="pt-2 border-t border-[#242F46]/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {s.problems.map((p) => (
                    <Link
                      key={p._id}
                      to={`/problems/${p._id}`}
                      className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                        p.isSolved
                          ? 'bg-[#0B0E14] border border-emerald-500/30 text-white hover:border-emerald-500'
                          : 'bg-[#0B0E14] border border-[#242F46] text-white hover:border-[#FF7A00]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {p.isSolved ? (
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#94A3B8]/40 shrink-0"></div>
                        )}
                        <span className="truncate">{p.title}</span>
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">{p.topic}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
