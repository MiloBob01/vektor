'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-16 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600/10 text-indigo-400 mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Get in Touch</h1>
          <p className="text-slate-400">Questions, feature requests, or partnership inquiries regarding Vektor?</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-8 rounded-2xl text-center space-y-2">
            <CheckCircle className="w-10 h-10 mx-auto text-emerald-400" />
            <h3 className="text-xl font-bold">Message Received!</h3>
            <p className="text-sm text-slate-300">Thank you for reaching out. Our team will review your inquiry shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Message</label>
              <textarea
                rows={4}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="How can we help your career journey?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}