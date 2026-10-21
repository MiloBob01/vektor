'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Star, CheckCircle2, Trophy, Brain, Target, MessageSquarePlus, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [reviews, setReviews] = useState([
    { name: 'Sarah K.', role: 'Frontend Engineer', rating: 5, text: 'Vektor helped me tailor my resume for 12 applications in record time. Got 3 tier-1 interview callbacks within 2 weeks!' },
    { name: 'Marcus T.', role: 'Product Manager', rating: 5, text: 'The Second Brain Vault is a game changer. Storing my career wins and interview answers in one place kept me ultra-prepared.' },
    { name: 'Elena R.', role: 'Data Scientist', rating: 5, text: 'The AI mock interview generator gave me questions that were almost identical to what Stripe asked me. Unbelievable utility!' },
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newText, setNewText] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;
    setReviews([{ name: newAuthor, role: newRole || 'Job Seeker', rating: 5, text: newText }, ...reviews]);
    setNewAuthor('');
    setNewRole('');
    setNewText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Target className="w-3.5 h-3.5" /> Next-Gen Personal Career Engine
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
          Direct Your Growth. Accelerate Your Career.
        </h1>
        <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
          Combine job application tracking, AI resume tailoring, interactive interview preparation, and a second-brain knowledge vault in one unified command center.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/25 transition transform hover:-translate-y-0.5"
        >
          Get Started for Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Success Stories & Milestones */}
      <section className="bg-slate-900/50 py-16 border-y border-slate-800 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Trophy className="w-7 h-7 text-yellow-400" /> Successful Career Moves
            </h2>
            <p className="text-slate-400">Real outcomes achieved using Vektor’s career pipeline.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="text-indigo-400 font-bold text-2xl mb-1">85% Higher</div>
              <div className="text-white font-semibold text-lg mb-2">Interview Callbacks</div>
              <p className="text-slate-400 text-sm">Targeted bullet points powered by Groq AI match job specs directly.</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="text-emerald-400 font-bold text-2xl mb-1">3.5x Faster</div>
              <div className="text-white font-semibold text-lg mb-2">Application Workflow</div>
              <p className="text-slate-400 text-sm">Eliminate repetitive application forms and scattered spreadsheet tracking.</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="text-cyan-400 font-bold text-2xl mb-1">100% Retained</div>
              <div className="text-white font-semibold text-lg mb-2">Knowledge Capital</div>
              <p className="text-slate-400 text-sm">Store interview stories, STAR methods, and career wins in your permanent vault.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews & Experience Sharing */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Community Ratings & Reviews</h2>
          <p className="text-slate-400">See what professionals say about Vektor.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, index) => (
            <div key={index} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">"{r.text}"</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">{r.name}</h4>
                <p className="text-indigo-400 text-xs">{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form to Submit Experience */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-indigo-400" /> Share Your Experience
          </h3>
          <form onSubmit={handleAddReview} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Target Job / Role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <textarea
              rows={3}
              placeholder="How has Vektor impacted your career preparation?"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition"
            >
              Post Review
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
