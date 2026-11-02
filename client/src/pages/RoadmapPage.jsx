import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Map,
  CheckCircle2,
  Lock,
  ArrowRight,
  Code2,
  Play,
  Layers,
  ChevronRight,
  Sparkles,
  Check,
  Bookmark,
  HelpCircle
} from 'lucide-react';

const DOMAIN_TABS = [
  { key: 'software-development', label: '💻 SDE Core Track', icon: '💻' },
  { key: 'web-developer', label: '🌐 Web Developer Track', icon: '🌐' },
  { key: 'data-science', label: '📊 Data Science & ML', icon: '📊' },
  { key: 'beginner', label: '🌱 Beginner (Noob to Pro)', icon: '🌱' },
];

const RoadmapPage = () => {
  const { user, switchDomain } = useAuth();
  const [roadmapData, setRoadmapData] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(user?.domain || 'software-development');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('stages'); // 'stages' | 'series'

  useEffect(() => {
    fetchRoadmap(selectedDomain);
  }, [selectedDomain]);

  const fetchRoadmap = async (domain) => {
    try {
      setLoading(true);
      const res = await api.get('/roadmap', { params: { domain } });
      setRoadmapData(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch structured DSA roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultDomain = async () => {
    try {
      await switchDomain(selectedDomain);
      alert(`Success! "${roadmapData.activeDomain.title}" is now your active track.`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#FF7A00]/20 border-t-[#FF7A00] rounded-full animate-spin mb-4"></div>
        <div className="text-sm font-medium text-[#FFB370]">Loading domain curriculum roadmap...</div>
      </div>
    );
  }

  const { activeDomain, stages } = roadmapData || {};

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Page Title & Domain Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182030] border border-[#242F46] text-xs font-semibold text-[#FFB370] mb-2">
            <Map size={13} className="text-[#FF7A00]" />
            <span>Adaptive Curriculum Sequences</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            DSA Learning Roadmaps
          </h1>
          <p className="text-sm text-[#FFD1A9]/80 mt-1 font-normal">
            Choose your target career domain to follow a focused, non-confusing practice path.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#121824] rounded-xl border border-[#242F46] self-start md:self-center">
          <button
            onClick={() => setViewMode('stages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'stages'
                ? 'bg-[#FF7A00] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Curriculum Stages
          </button>
          <button
            onClick={() => setViewMode('series')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'series'
                ? 'bg-[#FF7A00] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Series Collections 🎗️
          </button>
        </div>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DOMAIN_TABS.map((tab) => {
          const isSelected = selectedDomain === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedDomain(tab.key)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#182030] to-[#121824] border-[#FF7A00] shadow-md shadow-[#FF7A00]/20'
                  : 'bg-[#121824] border-[#242F46] hover:border-[#FF7A00]/40'
              }`}
            >
              <div className="text-sm font-bold text-white flex items-center justify-between">
                <span>{tab.label}</span>
                {isSelected && <Check size={14} className="text-[#FF7A00]" />}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1 font-normal">
                {tab.key === 'beginner'
                  ? 'Gentle on-ramp for newcomers'
                  : tab.key === 'web-developer'
                  ? 'Frontend, backend & DOM trees'
                  : tab.key === 'data-science'
                  ? 'Matrices, search & DP'
                  : 'Full core canonical track'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Domain Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#182030] via-[#141C2B] to-[#101622] border-2 border-[#FF7A00]/40 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#FF7A00]/20 text-[#FFB370] border border-[#FF7A00]/30">
            <span>{activeDomain?.badge}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{activeDomain?.title}</h2>
          <p className="text-xs text-[#FFD1A9]/80 max-w-2xl font-normal leading-relaxed">
            {activeDomain?.description}
          </p>
        </div>

        <button
          onClick={handleSetDefaultDomain}
          className="px-4 py-2.5 rounded-xl bg-[#182030] hover:bg-[#1D263B] border border-[#242F46] text-xs font-bold text-[#FFB370] hover:text-white transition-all shrink-0 self-start md:self-center cursor-pointer"
        >
          {user?.domain === selectedDomain ? '✓ Current Default Track' : 'Make This My Default'}
        </button>
      </div>

      {/* Stages List */}
      <div className="space-y-6">
        {stages && stages.map((stage, idx) => {
          const isLocked = stage.status === 'Locked';
          const isCompleted = stage.status === 'Completed';

          return (
            <div
              key={stage.id}
              className={`p-6 rounded-2xl border transition-all ${
                isLocked
                  ? 'bg-[#121824]/40 border-[#242F46]/50 opacity-60'
                  : isCompleted
                  ? 'bg-[#121824] border-emerald-500/40 shadow-lg'
                  : 'bg-[#121824] border-[#FF7A00]/40 shadow-lg shadow-[#FF7A00]/5'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#242F46]">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${
                      isLocked
                        ? 'bg-[#182030] text-[#94A3B8] border border-[#242F46]'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-[#FF7A00]/20 text-[#FFB370] border border-[#FF7A00]/30'
                    }`}
                  >
                    {isLocked ? (
                      <Lock size={20} />
                    ) : isCompleted ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <span>0{stage.id}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{stage.topic}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isLocked
                            ? 'bg-[#182030] text-[#94A3B8] border border-[#242F46]'
                            : isCompleted
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-[#FF7A00]/10 text-[#FFB370] border border-[#FF7A00]/20'
                        }`}
                      >
                        {stage.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#FFD1A9]/80 mt-1 max-w-2xl font-normal">{stage.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:text-right shrink-0">
                  <div>
                    <div className="text-xs text-[#94A3B8]">Completion</div>
                    <div className="text-base font-extrabold text-[#FFB370]">{stage.percentage}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8]">Solved</div>
                    <div className="text-base font-bold text-white">
                      {stage.problemsSolved} / {stage.totalProblems}
                    </div>
                  </div>
                </div>
              </div>

              {/* Problems Grid for Stage */}
              <div className="pt-4">
                <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Curated Exercises for {stage.topic}</span>
                  <span className="text-[11px] text-[#FFB370] font-normal">
                    {stage.problems?.length || 0} available in this track
                  </span>
                </div>

                {stage.problems && stage.problems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {stage.problems.map((prob) => (
                      <Link
                        key={prob._id}
                        to={`/problems/${prob._id}`}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2 text-xs group ${
                          prob.isSolved
                            ? 'bg-[#0B0E14] border-emerald-500/30 text-white hover:border-emerald-500'
                            : 'bg-[#0B0E14] border-[#242F46] text-white hover:border-[#FF7A00]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 truncate">
                            {prob.isSolved ? (
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                            ) : (
                              <Play size={12} className="text-[#FF7A00] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            )}
                            <span className="truncate font-semibold text-white group-hover:text-[#FFB370] transition-colors">
                              {prob.title}
                            </span>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                              prob.difficulty === 'Easy'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : prob.difficulty === 'Medium'
                                ? 'bg-[#FF7A00]/10 text-[#FFB370]'
                                : 'bg-rose-500/10 text-rose-400'
                            }`}
                          >
                            {prob.difficulty}
                          </span>
                        </div>

                        {prob.series && (
                          <div className="text-[10px] text-[#94A3B8] truncate flex items-center gap-1 font-normal">
                            <Bookmark size={10} className="text-[#FF7A00]" />
                            <span>{prob.series}</span>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-[#FFD1A9]/60 font-normal">
                    Prerequisite checkpoint complete. Advanced problem sets unlock sequentially.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapPage;
