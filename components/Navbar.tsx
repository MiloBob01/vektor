'use client';

import Link from 'next/link';
import Logo from './Logo';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-400 transition flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            App Engine
          </Link>
          <Link href="/contact" className="hover:text-indigo-400 transition">
            Contact Us
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            Launch Vektor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}