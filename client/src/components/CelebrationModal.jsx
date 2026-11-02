import React, { useEffect } from 'react';
import { Sparkles, Trophy, Award, ArrowRight, X, Flame } from 'lucide-react';

const CelebrationModal = ({ celebration, onClose, onNextProblem }) => {
  if (!celebration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#182030] to-[#0F1420] border-2 border-[#FF7A00] shadow-2xl shadow-[#FF7A00]/30 text-center overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#FF7A00]/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#1D263B] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Celebration Header with Emojis */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] text-white shadow-xl shadow-[#FF7A00]/40 mx-auto mb-4 animate-bounce">
          <Trophy size={40} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 text-xs font-bold text-[#FFB370] mb-2">
          <Sparkles size={13} className="text-[#FF7A00]" />
          <span>Milestone Achieved! 🎉🥳👏</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {celebration.title || 'Solution Accepted!'}
        </h2>

        <p className="text-sm font-semibold text-[#FFB370] mt-1">
          {celebration.problemTitle} • <span className="text-[#FFD1A9]/80">{celebration.topic}</span>
        </p>

        {/* Motivational Buddy Quote */}
        <div className="my-5 p-4 rounded-2xl bg-[#0B0E14] border border-[#242F46] text-xs text-[#FFD1A9] italic leading-relaxed">
          "{celebration.quote || "Awesome job, buddy! Every line of code brings you closer to technical mastery."}"
          <div className="mt-1 text-[11px] font-bold text-[#FFB370] not-italic">— CodePath ByteBuddy 🌿</div>
        </div>

        {/* Reward Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-left">
          <div className="p-3 rounded-xl bg-[#121824] border border-[#242F46] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
              +50
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#94A3B8]">Mastery XP</div>
              <div className="text-xs font-bold text-white">Experience Earned</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121824] border border-[#242F46] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF7A00]/20 text-[#FF7A00] flex items-center justify-center">
              <Flame size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#94A3B8]">Practice Streak</div>
              <div className="text-xs font-bold text-white">Active Momentum</div>
            </div>
          </div>
        </div>

        {/* Badge Unlocked Section (if any) */}
        {celebration.unlockedBadge && (
          <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-[#FF7A00]/20 border border-amber-500/40 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-200">New Badge Unlocked!</div>
              <div className="text-xs text-white font-semibold">{celebration.unlockedBadge.name}</div>
              <div className="text-[10px] text-[#FFD1A9]/70">{celebration.unlockedBadge.description}</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#182030] hover:bg-[#1D263B] border border-[#242F46] text-white text-xs font-semibold transition-all"
          >
            Review Solution
          </button>
          {onNextProblem && (
            <button
              onClick={onNextProblem}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF7A00]/30 flex items-center justify-center gap-2"
            >
              <span>Next Challenge</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;
