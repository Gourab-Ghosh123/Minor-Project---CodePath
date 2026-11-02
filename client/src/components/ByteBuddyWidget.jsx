import React, { useState } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, HelpCircle, Compass, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ByteBuddyWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const domainLabels = {
    'software-development': '💻 SDE Core',
    'web-developer': '🌐 Web Developer',
    'data-science': '📊 Data Science & ML',
    'beginner': '🌱 Noob to Pro',
  };

  const domain = user?.domain || 'software-development';

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm transition-all duration-300">
      {isOpen ? (
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#182030] to-[#101622] border-2 border-[#FF7A00]/50 shadow-2xl shadow-[#FF7A00]/20 text-white animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#242F46]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center text-sm shadow-md shadow-[#FF7A00]/30 font-bold">
                🌿
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  ByteBuddy
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold">
                    Online
                  </span>
                </div>
                <div className="text-[10px] text-[#FFB370] font-medium">
                  Your Student Companion
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1D263B] transition-colors"
              title="Minimize buddy"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="text-[#FFD1A9]/90 leading-relaxed font-normal">
              Hey <span className="font-bold text-white">{user?.name || 'Buddy'}</span>! Solving DSA is all about pattern recognition. Don't worry if you get stuck—use hints or step-by-step intuition anytime!
            </p>

            <div className="p-2 rounded-xl bg-[#0B0E14] border border-[#242F46] flex items-center justify-between text-[11px]">
              <span className="text-[#94A3B8]">Target Domain:</span>
              <span className="font-bold text-[#FFB370]">{domainLabels[domain]}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                to="/roadmap"
                className="px-2.5 py-1.5 rounded-lg bg-[#182030] hover:bg-[#1D263B] border border-[#242F46] text-[11px] font-semibold text-center text-white transition-colors flex items-center justify-center gap-1"
              >
                <Compass size={12} className="text-[#FF7A00]" />
                <span>My Roadmap</span>
              </Link>
              <Link
                to="/problems"
                className="px-2.5 py-1.5 rounded-lg bg-[#FF7A00]/20 hover:bg-[#FF7A00]/30 border border-[#FF7A00]/40 text-[11px] font-bold text-center text-[#FFB370] transition-colors flex items-center justify-center gap-1"
              >
                <Sparkles size={12} className="text-[#FF7A00]" />
                <span>Solve Today</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FF9433] hover:from-[#FF8C1A] hover:to-[#FFA74D] text-white font-bold text-xs shadow-xl shadow-[#FF7A00]/30 border border-white/20 transition-all hover:scale-105 cursor-pointer"
        >
          <span className="text-base">🌿</span>
          <span>ByteBuddy</span>
          <ChevronUp size={14} />
        </button>
      )}
    </div>
  );
};

export default ByteBuddyWidget;
