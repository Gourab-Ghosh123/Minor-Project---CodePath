import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CelebrationModal from '../components/CelebrationModal';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Terminal,
  Sparkles,
  AlertCircle,
  FileCode,
  RotateCcw,
  Lightbulb,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Send,
  Zap,
  HelpCircle
} from 'lucide-react';

const ProblemDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [celebrationData, setCelebrationData] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'hints' | 'tips' | 'submissions'
  const [unlockedHints, setUnlockedHints] = useState({ 1: false, 2: false, 3: false });
  const [newTipText, setNewTipText] = useState('');
  const [tipSubmitting, setTipSubmitting] = useState(false);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/problems/${id}`);
      setProblemData(res.data);
      const starter = res.data.problem.starterCode?.[language] || '';
      setCode(starter);
    } catch (err) {
      console.error('Error fetching problem details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problemData?.problem?.starterCode?.[newLang]) {
      setCode(problemData.problem.starterCode[newLang]);
    }
  };

  const handleResetCode = () => {
    if (problemData?.problem?.starterCode?.[language]) {
      setCode(problemData.problem.starterCode[language]);
    }
  };

  const handleRunCode = async () => {
    setRunning(true);
    setTestResult(null);
    try {
      const res = await api.post(`/problems/${problemData.problem._id}/run`, {
        code,
        language,
      });
      setTestResult(res.data);
    } catch (err) {
      setTestResult({
        success: false,
        summary: 'Failed to run test cases. Check syntax and parameters.',
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    setSubmissionResult(null);

    try {
      const res = await api.post('/submissions', {
        problemId: problemData.problem._id,
        language,
        code,
      });

      setSubmissionResult(res.data);
      if (res.data.evaluation?.status === 'Accepted') {
        setCelebrationData(res.data.celebration || {
          title: 'Solution Accepted! 🎉',
          problemTitle: problemData.problem.title,
          topic: problemData.problem.topic,
          quote: "Brilliant execution, buddy! You're building genuine algorithmic muscle.",
        });
      }
      fetchProblem();
    } catch (err) {
      setSubmissionResult({
        evaluation: {
          status: 'Runtime Error',
          message: err.response?.data?.message || 'Failed to submit solution.',
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddTip = async (e) => {
    e.preventDefault();
    if (!newTipText.trim()) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setTipSubmitting(true);
    try {
      const res = await api.post(`/problems/${problemData.problem._id}/tips`, {
        tip: newTipText,
      });
      setProblemData((prev) => ({
        ...prev,
        problem: {
          ...prev.problem,
          peerTips: res.data.peerTips,
        },
      }));
      setNewTipText('');
    } catch (err) {
      console.error('Error posting tip:', err);
    } finally {
      setTipSubmitting(false);
    }
  };

  const toggleHint = (level) => {
    setUnlockedHints((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#FF7A00]/20 border-t-[#FF7A00] rounded-full animate-spin mb-4"></div>
        <div className="text-sm font-medium text-[#FFB370]">Loading problem workspace & buddy hints...</div>
      </div>
    );
  }

  if (!problemData?.problem) {
    return (
      <div className="p-8 text-center">
        <p className="text-white font-semibold">Problem not found.</p>
        <Link to="/problems" className="mt-4 inline-block text-xs text-[#FFB370]">
          Return to problem directory
        </Link>
      </div>
    );
  }

  const { problem, userStatus, recentSubmissions } = problemData;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-[#0B0E14]">
      {/* Top Header Bar */}
      <div className="px-6 py-3 bg-[#121824] border-b border-[#242F46] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/problems"
            className="p-1.5 rounded-lg bg-[#182030] hover:bg-[#1D263B] text-[#94A3B8] hover:text-white transition-colors border border-[#242F46]"
            title="Back to Problems"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-base font-bold text-white tracking-tight">{problem.title}</h1>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                problem.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : problem.difficulty === 'Medium'
                  ? 'bg-[#FF7A00]/10 text-[#FFB370] border border-[#FF7A00]/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {problem.difficulty}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] bg-[#0B0E14] text-[#FFD1A9]/80 border border-[#242F46]">
              {problem.topic}
            </span>
            {problem.series && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-[#182030] text-[#94A3B8] border border-[#242F46]">
                <Bookmark size={11} className="text-[#FF7A00]" />
                <span>{problem.series}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userStatus === 'Solved' && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <CheckCircle2 size={14} />
              <span>Solved</span>
            </div>
          )}

          {/* Run Code (Dry Run) Button */}
          <button
            onClick={handleRunCode}
            disabled={running || submitting}
            className="px-3.5 py-1.5 rounded-xl bg-[#182030] hover:bg-[#1D263B] border border-[#242F46] text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Test solution against sample test cases"
          >
            {running ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Terminal size={14} className="text-[#FF7A00]" />
                <span>Run Code</span>
              </>
            )}
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting || running}
            className="px-5 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-xs font-bold transition-all shadow-md shadow-[#FF7A00]/25 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Play size={14} />
                <span>Submit Solution</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#242F46] overflow-hidden">
        {/* Left Column: Problem Information & Buddy Support */}
        <div className="flex flex-col h-full overflow-hidden bg-[#0F1420]">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 py-2.5 border-b border-[#242F46] bg-[#121824]/60 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'description'
                  ? 'bg-[#182030] text-[#FFB370] border border-[#242F46]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Description
            </button>

            <button
              onClick={() => setActiveTab('hints')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'hints'
                  ? 'bg-[#182030] text-[#FFB370] border border-[#242F46]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Lightbulb size={13} className="text-[#FF7A00]" />
              <span>Stuck? Buddy Hints 🌿</span>
            </button>

            <button
              onClick={() => setActiveTab('tips')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'tips'
                  ? 'bg-[#182030] text-[#FFB370] border border-[#242F46]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <MessageSquare size={13} className="text-[#FF7A00]" />
              <span>Peer Tips ({problem.peerTips?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-[#182030] text-[#FFB370] border border-[#242F46]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Submissions ({recentSubmissions?.length || 0})
            </button>
          </div>

          {/* Left Column Content Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
            {activeTab === 'description' && (
              <>
                {/* Domain Relevance Banner */}
                {problem.whyImportant && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#182030] to-[#121824] border border-[#FF7A00]/30 space-y-1">
                    <div className="text-[11px] font-bold text-[#FFB370] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#FF7A00]" />
                      <span>Why This Problem Matters in Industry</span>
                    </div>
                    <p className="text-xs text-[#FFD1A9]/90 font-normal leading-relaxed">
                      {problem.whyImportant}
                    </p>
                  </div>
                )}

                {/* Problem Description */}
                <div className="text-[#E2E8F0] leading-relaxed whitespace-pre-line font-normal">
                  {problem.description}
                </div>

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-[#FFB370] uppercase tracking-wider">
                      Examples
                    </h3>
                    {problem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-2 font-mono text-xs"
                      >
                        <div className="text-white">
                          <span className="text-[#FF7A00] font-semibold">Input: </span>
                          <span className="text-[#FFD1A9]">{ex.input}</span>
                        </div>
                        <div className="text-white">
                          <span className="text-[#FF7A00] font-semibold">Output: </span>
                          <span className="text-[#FFD1A9]">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-[#94A3B8] pt-1 font-sans text-xs">
                            <span className="text-[#FFB370] font-semibold font-sans">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-[#FFB370] uppercase tracking-wider">
                      Constraints
                    </h3>
                    <ul className="list-disc list-inside space-y-1.5 text-xs text-[#FFD1A9]/80 font-mono">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Traps Accordion */}
                {problem.commonTraps && problem.commonTraps.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-2">
                    <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle size={14} />
                      <span>Frequent Traps To Avoid 🪤</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#FFD1A9]/80 font-normal">
                      {problem.commonTraps.map((trap, idx) => (
                        <li key={idx}>{trap}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* TAB: Buddy Progressive Hints 🌿 */}
            {activeTab === 'hints' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#182030] border border-[#FF7A00]/40 flex items-center gap-3">
                  <div className="text-2xl">🌿</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">CodePath Guided Rescue</h4>
                    <p className="text-[11px] text-[#FFD1A9]/80 font-normal mt-0.5">
                      Try to solve the problem step-by-step. Reveal one hint level at a time to keep your problem-solving muscle active!
                    </p>
                  </div>
                </div>

                {problem.hints && problem.hints.length > 0 ? (
                  problem.hints.map((hint) => {
                    const isUnlocked = unlockedHints[hint.level];
                    return (
                      <div
                        key={hint.level}
                        className={`p-4 rounded-xl border transition-all ${
                          isUnlocked
                            ? 'bg-[#0B0E14] border-[#FF7A00]/50'
                            : 'bg-[#0B0E14] border-[#242F46]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>Level {hint.level}:</span>
                            <span className="text-[#FFB370]">{hint.title}</span>
                          </div>

                          <button
                            onClick={() => toggleHint(hint.level)}
                            className="px-3 py-1 rounded-lg bg-[#182030] hover:bg-[#1D263B] text-[11px] font-bold text-[#FFB370] transition-colors cursor-pointer"
                          >
                            {isUnlocked ? 'Hide Hint' : 'Reveal Hint 💡'}
                          </button>
                        </div>

                        {isUnlocked ? (
                          <div className="mt-3 pt-3 border-t border-[#242F46] text-xs text-[#E2E8F0] whitespace-pre-line leading-relaxed font-normal">
                            {hint.content}
                          </div>
                        ) : (
                          <div className="mt-2 text-[11px] text-[#94A3B8] italic font-normal">
                            Click reveal to view intuition without spoiling full code solution.
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-xs text-[#94A3B8]">
                    No hints needed for this problem! You've got this.
                  </div>
                )}
              </div>
            )}

            {/* TAB: Student Peer Tips 💬 */}
            {activeTab === 'tips' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-[#182030] border border-[#242F46]">
                  <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-[#FF7A00]" />
                    <span>Leave a Tip for Your Fellow Students 👥</span>
                  </h4>
                  <form onSubmit={handleAddTip} className="space-y-3">
                    <textarea
                      value={newTipText}
                      onChange={(e) => setNewTipText(e.target.value)}
                      placeholder="Share a mental model, gotcha, or trick that helped you understand this problem..."
                      className="w-full p-3 bg-[#0B0E14] border border-[#242F46] rounded-xl text-white text-xs focus:outline-none focus:border-[#FF7A00] resize-none h-20"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={tipSubmitting || !newTipText.trim()}
                        className="px-4 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send size={12} />
                        <span>Post Buddy Tip</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#FFB370] uppercase tracking-wider">
                    Community Advice ({problem.peerTips?.length || 0})
                  </h4>
                  {problem.peerTips && problem.peerTips.length > 0 ? (
                    problem.peerTips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{tip.author}</span>
                          <span className="text-[10px] text-[#94A3B8]">
                            {tip.votes || 1} peers found this helpful
                          </span>
                        </div>
                        <p className="text-xs text-[#FFD1A9]/90 font-normal leading-relaxed">
                          "{tip.tip}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-[#94A3B8]">
                      Be the first student to post a helpful intuition tip!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: Submissions History */}
            {activeTab === 'submissions' && (
              <div className="space-y-3">
                {recentSubmissions && recentSubmissions.length > 0 ? (
                  recentSubmissions.map((sub) => (
                    <div
                      key={sub._id}
                      className="p-4 rounded-xl bg-[#0B0E14] border border-[#242F46] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`font-bold ${
                            sub.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {sub.status}
                        </span>
                        <span className="text-[#94A3B8]">
                          {new Date(sub.submittedAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#FFD1A9]/70 font-mono">
                        <span className="uppercase">{sub.language}</span>
                        <span>Time: {sub.executionTimeMs} ms</span>
                        <span>Mem: {(sub.memoryKb / 1024).toFixed(1)} MB</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-xs text-[#94A3B8]">
                    No past submissions recorded for this problem yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Feedback */}
        <div className="flex flex-col h-full overflow-hidden bg-[#0B0E14]">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-6 py-2.5 border-b border-[#242F46] bg-[#121824]/80 shrink-0">
            <div className="flex items-center gap-3">
              <FileCode size={16} className="text-[#FF7A00]" />
              <div className="flex items-center gap-1 bg-[#0B0E14] p-1 rounded-lg border border-[#242F46]">
                {['javascript', 'python', 'cpp'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold uppercase transition-colors cursor-pointer ${
                      language === lang
                        ? 'bg-[#FF7A00] text-white shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JS' : 'Python'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleResetCode}
              title="Reset code to starter template"
              className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#FFB370] transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Code</span>
            </button>
          </div>

          {/* Textarea Code Editor */}
          <div className="flex-1 relative overflow-hidden bg-[#0B0E14]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="w-full h-full p-6 bg-[#0B0E14] text-[#FFD1A9] font-mono text-sm leading-relaxed resize-none focus:outline-none selection:bg-[#FF7A00]/30 selection:text-white border-0"
              placeholder="// Write your solution here..."
            />
          </div>

          {/* Test Runner Results Drawer */}
          {testResult && (
            <div className="p-4 bg-[#121824] border-t border-[#242F46] max-h-56 overflow-y-auto space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={15} className="text-[#FF7A00]" />
                  <span className="text-xs font-bold text-white">Test Runner Output</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      testResult.success
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {testResult.success ? 'Passed' : 'Errors Detected'}
                  </span>
                </div>
                <button
                  onClick={() => setTestResult(null)}
                  className="text-xs text-[#94A3B8] hover:text-white"
                >
                  Dismiss
                </button>
              </div>

              <p className="text-xs text-[#FFD1A9]/80 font-normal">{testResult.summary}</p>

              {testResult.testCases && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {testResult.testCases.map((tc) => (
                    <div
                      key={tc.caseIndex}
                      className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#242F46] space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#94A3B8]">Test Case {tc.caseIndex}:</span>
                        <span
                          className={`font-bold ${
                            tc.status === 'Passed' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {tc.status}
                        </span>
                      </div>
                      <div className="text-[11px] truncate">
                        <span className="text-[#FF7A00]">In: </span>
                        <span className="text-white">{tc.input}</span>
                      </div>
                      <div className="text-[11px] truncate">
                        <span className="text-[#FF7A00]">Expected: </span>
                        <span className="text-white">{tc.expectedOutput}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submission Evaluation Result Drawer */}
          {submissionResult && (
            <div className="p-4 bg-[#121824] border-t border-[#242F46] max-h-48 overflow-y-auto space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {submissionResult.evaluation?.status === 'Accepted' ? (
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  ) : (
                    <XCircle size={18} className="text-rose-400" />
                  )}
                  <span
                    className={`text-sm font-bold ${
                      submissionResult.evaluation?.status === 'Accepted'
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {submissionResult.evaluation?.status}
                  </span>
                </div>

                {submissionResult.evaluation?.executionTimeMs && (
                  <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-mono">
                    <span>Runtime: {submissionResult.evaluation.executionTimeMs} ms</span>
                    <span>Memory: {(submissionResult.evaluation.memoryKb / 1024).toFixed(1)} MB</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-[#FFD1A9]/80 font-normal">
                {submissionResult.evaluation?.message}
              </p>

              {submissionResult.updatedProgress && (
                <div className="mt-2.5 pt-2.5 border-t border-[#242F46] flex items-center justify-between text-xs">
                  <span className="text-[#FFB370] font-semibold">
                    Topic Progress Updated: {submissionResult.updatedProgress.topic}
                  </span>
                  <span className="text-white font-mono font-bold">
                    Accuracy: {submissionResult.updatedProgress.accuracy}%
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Celebration Modal on Accepted Submission 🎉🥳👏 */}
      {celebrationData && (
        <CelebrationModal
          celebration={celebrationData}
          onClose={() => setCelebrationData(null)}
          onNextProblem={() => {
            setCelebrationData(null);
            navigate('/problems');
          }}
        />
      )}
    </div>
  );
};

export default ProblemDetailsPage;
