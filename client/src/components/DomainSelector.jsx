import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DOMAINS = [
  {
    key: 'software-development',
    title: 'Software Development',
    badge: '💻 SDE Core',
    tagline: 'Standard FAANG & Product roadmap',
    focus: 'Full linear & non-linear algorithms, trees, DP, and graph traversals.',
  },
  {
    key: 'web-developer',
    title: 'Web Developer',
    badge: '🌐 Web & Fullstack',
    tagline: 'Frontend, Backend, and State Trees',
    focus: 'Hash lookups, event queues, DOM tree diffing, and dependency graphs.',
  },
  {
    key: 'data-science',
    title: 'Data Science & ML',
    badge: '📊 Data & Machine Learning',
    tagline: 'Matrices, Search & Optimization',
    focus: 'Matrix math, binary search spaces, decision trees, and DP optimization.',
  },
  {
    key: 'beginner',
    title: 'Noob to Pro',
    badge: '🌱 Friendly Starter',
    tagline: 'Zero-intimidation step-by-step',
    focus: 'Visual two pointers, plate stack intuition, and gentle recursion.',
  },
];

const DomainSelector = ({ activeDomain, onSelectDomain, isCompact = false }) => {
  const { switchDomain } = useAuth();

  const handleDomainClick = async (domainKey) => {
    if (onSelectDomain) {
      onSelectDomain(domainKey);
    }
    try {
      await switchDomain(domainKey);
    } catch (err) {
      console.error('Failed to update domain preference:', err);
    }
  };

  if (isCompact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {DOMAINS.map((d) => {
          const isSelected = activeDomain === d.key;
          return (
            <button
              key={d.key}
              onClick={() => handleDomainClick(d.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9433] text-white shadow-md shadow-[#FF7A00]/25 border border-white/20'
                  : 'bg-[#121824] hover:bg-[#182030] text-[#94A3B8] hover:text-white border border-[#242F46]'
              }`}
            >
              <span>{d.badge}</span>
              {isSelected && <Check size={13} className="text-white" />}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {DOMAINS.map((d) => {
        const isSelected = activeDomain === d.key;
        return (
          <div
            key={d.key}
            onClick={() => handleDomainClick(d.key)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
              isSelected
                ? 'bg-gradient-to-b from-[#182030] to-[#121824] border-[#FF7A00] shadow-lg shadow-[#FF7A00]/20'
                : 'bg-[#121824] border-[#242F46] hover:border-[#FF7A00]/50 hover:bg-[#182030]/60'
            }`}
          >
            {isSelected && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#FF7A00] flex items-center justify-center text-white text-[10px]">
                <Check size={12} />
              </div>
            )}
            <div>
              <div className="text-base font-bold text-white mb-1">{d.badge}</div>
              <div className="text-xs font-semibold text-[#FFB370]">{d.title}</div>
              <p className="text-[11px] text-[#FFD1A9]/80 mt-1 leading-relaxed font-normal">
                {d.focus}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#242F46]/60 flex items-center justify-between text-[10px]">
              <span className="text-[#94A3B8]">{d.tagline}</span>
              {isSelected ? (
                <span className="font-bold text-[#FFB370]">Active Track</span>
              ) : (
                <span className="text-[#94A3B8] hover:text-[#FFB370]">Select &rarr;</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DomainSelector;
