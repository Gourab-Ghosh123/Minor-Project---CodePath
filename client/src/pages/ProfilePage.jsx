import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Shield,
  Calendar,
  Award,
  LogOut,
  Sparkles,
  Zap,
  Check,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DomainSelector from '../components/DomainSelector';
import api from '../services/api';

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setSuccessMsg('');
    try {
      const res = await api.put('/auth/profile', { name: name.trim() });
      updateUser({ name: res.data.name });
      setSuccessMsg('Profile name updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182030] border border-[#242F46] text-xs font-semibold text-[#FFB370] mb-2">
          <User size={13} className="text-[#FF7A00]" />
          <span>Account Profile & Learning Track</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Student Profile
        </h1>
        <p className="text-sm text-[#FFD1A9]/80 mt-1 font-normal">
          Manage your CodePath credentials, active career domain, and student credentials.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#121824] border border-[#242F46] space-y-8">
        {/* User Card Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#242F46]">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB370] flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-[#FF7A00]/25 shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-white">{user?.name || 'Student Name'}</h2>
              <div className="text-xs text-[#FFB370] font-medium flex items-center gap-2">
                <span>Undergraduate Student</span>
                <span>•</span>
                <span className="capitalize">{user?.role || 'student'} role</span>
              </div>
              <div className="text-xs text-[#94A3B8] font-mono">{user?.email}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] flex items-center gap-3 self-stretch sm:self-auto">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#94A3B8]">Mastery XP</div>
              <div className="text-base font-extrabold text-emerald-400">{user?.xp || 0} XP</div>
            </div>
          </div>
        </div>

        {/* Change Name Form */}
        <form onSubmit={handleUpdateName} className="space-y-3 pb-6 border-b border-[#242F46]">
          <h3 className="text-xs font-bold text-[#FFB370] uppercase tracking-wider">
            Edit Full Name
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#0B0E14] border border-[#242F46] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF7A00]"
              placeholder="Your full name"
            />
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Updating...' : 'Save Name'}
            </button>
          </div>
          {successMsg && (
            <p className="text-xs text-emerald-400 font-semibold">{successMsg}</p>
          )}
        </form>

        {/* Career Domain Selection */}
        <div className="space-y-4 pb-6 border-b border-[#242F46]">
          <div>
            <h3 className="text-xs font-bold text-[#FFB370] uppercase tracking-wider mb-1 flex items-center gap-2">
              <Compass size={14} className="text-[#FF7A00]" />
              <span>Career Domain Track Selection 🛣️</span>
            </h3>
            <p className="text-xs text-[#FFD1A9]/80 font-normal">
              Pick the career domain matching your goals. This immediately updates your roadmaps and recommendations.
            </p>
          </div>

          <DomainSelector
            activeDomain={user?.domain || 'software-development'}
          />
        </div>

        {/* Account Details Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-1">
            <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Mail size={13} className="text-[#FF7A00]" />
              <span>Registered Email</span>
            </div>
            <div className="text-sm font-semibold text-white">{user?.email || 'N/A'}</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-1">
            <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Shield size={13} className="text-[#FF7A00]" />
              <span>Security & Tokens</span>
            </div>
            <div className="text-sm font-semibold text-white">JSON Web Token (JWT) Protected</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-1">
            <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Award size={13} className="text-[#FF7A00]" />
              <span>Academic Minor Project</span>
            </div>
            <div className="text-sm font-semibold text-white">Computer Science & Engineering</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-1">
            <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Calendar size={13} className="text-[#FF7A00]" />
              <span>Academic Year</span>
            </div>
            <div className="text-sm font-semibold text-white">2025 - 2026 Academic Term</div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LogOut size={15} />
            <span>Sign Out Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
