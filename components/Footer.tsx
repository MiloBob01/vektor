import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />
        <p className="text-sm">
          © {new Date().getFullYear()} Vektor AI. Empowering career direction & continuous growth.
        </p>
      </div>
    </footer>
  );
}