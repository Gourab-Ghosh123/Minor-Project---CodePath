import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Code2,
  BarChart3,
  User,
  LogOut,
  ChevronRight,
  Sparkles,
  Terminal,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Roadmap', path: '/roadmap', icon: Map },
    { name: 'Problems', path: '/problems', icon: Code2 },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#121824] border-b border-[#242F46] fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center font-bold text-white shadow-lg shadow-[#FF7A00]/20">
            CP
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">Code<span className="text-[#FFB370]">Path</span></span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-[#182030] text-[#FFB370] border border-[#242F46]"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0F1420] border-r border-[#242F46] flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } pt-16 lg:pt-0`}
      >
        <div className="p-6 border-b border-[#242F46]/80 hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center font-extrabold text-white shadow-md shadow-[#FF7A00]/25">
              CP
            </div>
            <div>
              <div className="font-extrabold text-white text-xl tracking-tight leading-none">
                Code<span className="text-[#FFB370]">Path</span>
              </div>
              <div className="text-[11px] text-[#FFD1A9]/70 font-medium mt-1 uppercase tracking-wider">
                DSA Learning Engine
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 mx-4 my-4 rounded-xl bg-gradient-to-br from-[#182030] to-[#121824] border border-[#242F46] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#FF7A00] tracking-wider">Active Track</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>
          <div className="text-xs font-bold text-white truncate">
            {user?.domain === 'web-developer'
              ? '🌐 Web Developer'
              : user?.domain === 'data-science'
              ? '📊 Data Science & ML'
              : user?.domain === 'beginner'
              ? '🌱 Noob to Pro'
              : '💻 SDE Canonical'}
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF7A00]/15 to-[#FF7A00]/5 text-white border border-[#FF7A00]/40 shadow-sm shadow-[#FF7A00]/10 font-semibold'
                      : 'text-[#94A3B8] hover:text-[#FFB370] hover:bg-[#182030]/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={isActive ? 'text-[#FF7A00]' : 'text-[#94A3B8] group-hover:text-[#FFB370]'}
                    />
                    <span className="flex-1">{item.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]"></div>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#242F46] bg-[#0B0E14]/50">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121824] border border-[#242F46] mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF7A00]/20 border border-[#FF7A00]/30 flex items-center justify-center font-bold text-[#FFB370] text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name || 'Student'}</div>
              <div className="text-xs text-[#FFD1A9]/70 truncate">{user?.email || 'student@codepath.edu'}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-[#FFB370] hover:bg-[#182030] transition-colors border border-transparent hover:border-[#242F46]"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
