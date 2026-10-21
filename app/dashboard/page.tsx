'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, Brain, Sparkles, Plus, Trash2, Tag, Search, BookOpen } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'ai' | 'vault'>('jobs');

  // Job Tracker State
  const [applications, setApplications] = useState<any[]>([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');

  // Second Brain Vault State
  const [vaultItems, setVaultItems] = useState<any[]>([]);
  const [vaultTitle, setVaultTitle] = useState('');
  const [vaultCategory, setVaultCategory] = useState('Interview Notes');
  const [vaultContent, setVaultContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // AI State
  const [jobDescription, setJobDescription] = useState('');
  const [userExperience, setUserExperience] = useState('');
  const [aiResult, setAiResult] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    fetchApplications();
    fetchVaultItems();
  }, []);

  const fetchApplications = async () => {
    const { data } = await supabase.from('job_applications').select('*').order('created_at', { ascending: false });
    if (data) setApplications(data);
  };

  const fetchVaultItems = async () => {
    const { data } = await supabase.from('vault_items').select('*').order('created_at', { ascending: false });
    if (data) setVaultItems(data);
  };

  const addApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !position) return;
    const { data, error } = await supabase.from('job_applications').insert([{ company, position, status }]).select();
    if (!error && data) {
      setApplications([data[0], ...applications]);
      setCompany('');
      setPosition('');
    }
  };

  const addVaultItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaultTitle || !vaultContent) return;
    const { data, error } = await supabase
      .from('vault_items')
      .insert([{ title: vaultTitle, category: vaultCategory, content: vaultContent }])
      .select();
    if (!error && data) {
      setVaultItems([data[0], ...vaultItems]);
      setVaultTitle('');
      setVaultContent('');
    }
  };

  const runAiAnalysis = async () => {
    if (!jobDescription || !userExperience) return;
    setLoadingAi(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, userExperience }),
      });
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const filteredVault = vaultItems.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
              activeTab === 'jobs' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Jobs Tracker ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
              activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-300" /> AI Coach & Prep
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
              activeTab === 'vault' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4 text-purple-300" /> Second Brain Vault ({vaultItems.length})
          </button>
        </div>

        {/* TAB 1: JOBS TRACKER */}
        {activeTab === 'jobs' && (
          <div className="grid md:grid-cols-3 gap-8">
            <form onSubmit={addApplication} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 h-fit">
              <h2 className="text-lg font-bold text-white mb-2">Track New Application</h2>
              <input
                type="text"
                placeholder="Company (e.g. Stripe)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                required
              />
              <input
                type="text"
                placeholder="Position (e.g. Fullstack Engineer)"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-lg">
                Add Application
              </button>
            </form>

            <div className="md:col-span-2 space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-base">{app.position}</h3>
                    <p className="text-slate-400 text-sm">{app.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: AI COACH */}
        {activeTab === 'ai' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white">AI Resume & Interview Coach</h2>
              <textarea
                rows={4}
                placeholder="Paste Job Description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
              />
              <textarea
                rows={4}
                placeholder="Paste Your Experience / Key Skill Bullet Points..."
                value={userExperience}
                onChange={(e) => setUserExperience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
              />
              <button
                onClick={runAiAnalysis}
                disabled={loadingAi}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                {loadingAi ? 'Analyzing...' : 'Generate Match & Interview Prep'}
              </button>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              {aiResult ? (
                <div>
                  <div className="text-2xl font-bold text-cyan-400 mb-4">
                    Match Confidence: {aiResult.matchConfidence}%
                  </div>
                  <h3 className="font-semibold text-white mb-2">Tailored Resume Bullets:</h3>
                  <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mb-4">
                    {aiResult.tailoredBullets?.map((bullet: string, i: number) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold text-white mb-2">Simulated Interview Questions:</h3>
                  <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    {aiResult.interviewQuestions?.map((q: string, i: number) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-slate-500 text-center py-16">
                  Fill in the details to trigger instant AI evaluation.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SECOND BRAIN KNOWLEDGE VAULT */}
        {activeTab === 'vault' && (
          <div className="grid md:grid-cols-3 gap-8">
            <form onSubmit={addVaultItem} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 h-fit">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" /> Save Vault Item
              </h2>
              <input
                type="text"
                placeholder="Title (e.g., STAR Story for Leadership)"
                value={vaultTitle}
                onChange={(e) => setVaultTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                required
              />
              <select
                value={vaultCategory}
                onChange={(e) => setVaultCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
              >
                <option value="Interview Notes">Interview Notes</option>
                <option value="Career Wins">Career Wins</option>
                <option value="Resume Snippets">Resume Snippets</option>
                <option value="Skill Roadmap">Skill Roadmap</option>
              </select>
              <textarea
                rows={5}
                placeholder="Write your note, story, or project summary here..."
                value={vaultContent}
                onChange={(e) => setVaultContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                required
              />
              <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-500 font-semibold rounded-lg transition">
                Save to Brain Vault
              </button>
            </form>

            <div className="md:col-span-2 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search vault notes or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid gap-4">
                {filteredVault.map((item) => (
                  <div key={item.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white text-base">{item.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}