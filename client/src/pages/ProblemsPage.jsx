import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Code2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  Bookmark,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

const TOPICS = [
  'All',
  'Arrays',
  'Strings',
  'Two Pointers',
  'Sliding Window',
  'Linked List',
  'Stack',
  'Queue',
  'Binary Search',
  'Trees',
  'Graphs',
  'Dynamic Programming',
];

const DOMAINS = [
  { key: 'All', label: 'All Domains' },
  { key: 'software-development', label: '💻 Software Dev' },
  { key: 'web-developer', label: '🌐 Web Developer' },
  { key: 'data-science', label: '📊 Data Science' },
  { key: 'beginner', label: '🌱 Beginner' },
];

const SERIES_LIST = [
  'All',
  'Zero to Hero Array Series',
  'String Pattern Master Series',
  'Pointers & Window Battle Series',
  'Core Linear Structures Series',
  'Binary Search Mastery Series',
  'Hierarchical Tree Explorer Series',
  'Dynamic Programming Decoded Series',
];

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const STATUSES = ['All', 'Solved', 'Attempted', 'Unsolved'];

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProblems();
  }, [selectedTopic, selectedDifficulty, selectedStatus, selectedDomain, selectedSeries, searchQuery]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedTopic !== 'All') params.topic = selectedTopic;
      if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
      if (selectedStatus !== 'All') params.status = selectedStatus;
      if (selectedDomain !== 'All') params.domain = selectedDomain;
      if (selectedSeries !== 'All') params.series = selectedSeries;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const res = await api.get('/problems', { params });
      setProblems(res.data);
    } catch (err) {
      console.error('Failed to load problems:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedTopic('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
    setSelectedDomain('All');
    setSelectedSeries('All');
    setSearchQuery('');
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182030] border border-[#242F46] text-xs font-semibold text-[#FFB370] mb-2">
            <Code2 size={13} className="text-[#FF7A00]" />
            <span>Problem Archive & Practice Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            DSA Practice Problems
          </h1>
          <p className="text-sm text-[#FFD1A9]/80 mt-1 font-normal">
            Hand-curated algorithmic challenges with step-by-step buddy hints, common traps, and peer tips.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
          <span className="text-white font-bold">{problems.length}</span> matching problems
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-5 rounded-2xl bg-[#121824] border border-[#242F46] space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search problems by title (e.g. Two Sum, Binary Search, Islands)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-[#242F46] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF7A00] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-[#0B0E14] border border-[#242F46] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#FF7A00] font-medium"
            >
              {DOMAINS.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label}
                </option>
              ))}
            </select>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-[#0B0E14] border border-[#242F46] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#FF7A00] font-medium"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  Topic: {t}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#0B0E14] border border-[#242F46] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#FF7A00] font-medium"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  Diff: {d}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#0B0E14] border border-[#242F46] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#FF7A00] font-medium"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  Status: {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Series Pill Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#242F46]/60 text-xs">
          <span className="text-[#94A3B8] font-semibold shrink-0">Series:</span>
          {SERIES_LIST.map((s) => {
            const isSelected = selectedSeries === s;
            return (
              <button
                key={s}
                onClick={() => setSelectedSeries(s)}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors font-medium cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF7A00] text-white font-bold'
                    : 'bg-[#0B0E14] text-[#94A3B8] hover:text-white border border-[#242F46]'
                }`}
              >
                {s === 'All' ? 'All Series' : s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Problem Directory Table */}
      <div className="bg-[#121824] rounded-2xl border border-[#242F46] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#FF7A00]/20 border-t-[#FF7A00] rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-[#FFB370] font-medium">Filtering problems...</p>
          </div>
        ) : problems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-[#FFD1A9]/80 font-normal">No problems match your current filter criteria.</p>
            <button
              onClick={handleResetFilters}
              className="mt-3 text-xs font-semibold text-[#FFB370] hover:text-white cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#242F46] bg-[#0F1420] text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Problem</th>
                  <th className="py-3.5 px-6">Series</th>
                  <th className="py-3.5 px-6">Topic</th>
                  <th className="py-3.5 px-6">Difficulty</th>
                  <th className="py-3.5 px-6">Buddy Aids</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242F46]/60 text-sm font-medium">
                {problems.map((prob) => (
                  <tr
                    key={prob._id}
                    className="hover:bg-[#182030]/50 transition-colors group"
                  >
                    <td className="py-4 px-6 shrink-0">
                      {prob.status === 'Solved' ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                          <CheckCircle2 size={13} />
                          <span>Solved</span>
                        </div>
                      ) : prob.status === 'Attempted' ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF7A00]/10 text-[#FFB370] border border-[#FF7A00]/20 text-xs font-semibold">
                          <Clock size={13} />
                          <span>Attempted</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#182030] text-[#94A3B8] border border-[#242F46] text-xs font-semibold">
                          <span>Unsolved</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <Link
                        to={`/problems/${prob._id}`}
                        className="font-semibold text-white group-hover:text-[#FFB370] transition-colors block"
                      >
                        {prob.title}
                      </Link>
                      {prob.whyImportant && (
                        <div className="text-[11px] text-[#94A3B8] line-clamp-1 mt-0.5 font-normal">
                          {prob.whyImportant}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1 text-[11px] text-[#FFD1A9]/80 font-normal">
                        <Bookmark size={11} className="text-[#FF7A00]" />
                        <span className="truncate max-w-[140px]">{prob.series}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B0E14] text-[#FFD1A9]/80 text-xs border border-[#242F46]">
                        {prob.topic}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : prob.difficulty === 'Medium'
                            ? 'bg-[#FF7A00]/10 text-[#FFB370] border border-[#FF7A00]/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#182030] text-[#FFB370] border border-[#242F46] text-[10px] font-semibold"
                          title="Progressive Hints Available"
                        >
                          <Lightbulb size={11} />
                          <span>3 Hints</span>
                        </span>
                        {prob.peerTipsCount > 0 && (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#182030] text-emerald-300 border border-[#242F46] text-[10px] font-semibold"
                            title="Peer Student Tips"
                          >
                            <MessageSquare size={11} />
                            <span>{prob.peerTipsCount}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/problems/${prob._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0B0E14] hover:bg-[#FF7A00] text-[#FFB370] hover:text-white border border-[#242F46] hover:border-[#FF7A00] text-xs font-semibold transition-all shadow-sm"
                      >
                        <span>Solve</span>
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;
