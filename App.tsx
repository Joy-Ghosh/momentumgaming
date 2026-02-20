import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import CaseStudy from './pages/CaseStudy';
import Tournaments from './pages/Tournaments';
import TournamentDetail from './pages/TournamentDetail';
import Contact from './pages/Contact';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import ProjectList from './pages/admin/Projects/ProjectList';
import ProjectForm from './pages/admin/Projects/ProjectForm';
import ContactSubmissions from './pages/admin/ContactSubmissions';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ─── Intersection observer hook ─── */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .clip-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── SVG Icons ─── */
const InstagramIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const XIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TwitchIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.403h17.194v11.821zm-10.836-7.881h2.507v6.627h-2.507v-6.627zm5.91 0h2.507v6.627h-2.507v-6.627z" />
  </svg>
);

const DiscordIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.443 13.443 0 0 0-1.42 2.923 18.261 18.261 0 0 0-7.863 0 13.444 13.444 0 0 0-1.421-2.923.077.077 0 0 0-.08-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ─── Cursor Glow (spring physics) ─── */
const CursorGlow = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const curr = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const lerp = 0.08;
      curr.current.x += (pos.current.x - curr.current.x) * lerp;
      curr.current.y += (pos.current.y - curr.current.y) * lerp;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${curr.current.x - 220}px, ${curr.current.y - 220}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="fixed pointer-events-none z-0 mix-blend-screen"
      style={{ left: 0, top: 0, willChange: 'transform' }}
    >
      <div className="relative w-[440px] h-[440px]">
        <div className="absolute inset-0 bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute inset-[80px] bg-orange-600/10 rounded-full blur-[80px]" />
      </div>
    </div>
  );
};

/* ─── Navbar ─── */
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/92 backdrop-blur-md border-b border-white/8 py-2' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/Momemtum Gaming - Icon - Inverted.png"
              alt="Momentum Gaming Logo"
              className="h-10 w-auto object-contain logo-breathe"
            />
            <span className="text-2xl font-black italic text-white tracking-tighter">
              MOMENTUM<span className="text-orange-500">GAMING</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors nav-link-fancy ${location.pathname === link.path ? 'text-orange-500 active' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 font-bold uppercase tracking-wider text-sm transition-all transform hover:scale-105 active:scale-95 -skew-x-12 shimmer-hover"
            >
              <span className="skew-x-12 inline-block">Partner With Us</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-orange-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <div className="bg-black/95 backdrop-blur-md border-b border-white/10 px-4 pb-4 pt-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold uppercase tracking-widest text-gray-300 hover:text-orange-500 border-b border-white/5 transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-orange-600 text-white px-3 py-4 mt-4 font-black uppercase hover:bg-orange-500 transition-colors"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

/* ─── Footer ─── */
const Footer = () => (
  <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
    {/* Subtle grid bg */}
    <div className="absolute inset-0 pointer-events-none opacity-30 bg-grid" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Brand manifesto line */}
      <div className="mb-14 pb-14 border-b border-white/8">
        <p className="text-4xl md:text-6xl font-black italic text-white/10 tracking-tighter uppercase leading-tight">
          We don't just run <span className="text-orange-600/30">tournaments.</span><br />
          We make <span className="text-white/20">legends.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-3xl font-black italic text-white tracking-tighter mb-4 block hover:text-orange-500 transition-colors">
            MOMENTUM<span className="text-orange-500">GAMING</span>
          </Link>
          <p className="text-gray-500 max-w-md leading-relaxed text-sm">
            The future of event production. We bridge the gap between global brands and the next generation of gamers through world-class broadcasts and community events.
          </p>
          <div className="flex space-x-3 mt-8">
            {[
              { href: 'https://instagram.com/PlayMNG', icon: <InstagramIcon size={18} />, label: 'Instagram', color: 'hover:bg-pink-600/20 hover:border-pink-500/30 hover:text-pink-400' },
              { href: 'https://www.youtube.com/@PlayMNG', icon: <YouTubeIcon size={18} />, label: 'YouTube', color: 'hover:bg-red-600/20 hover:border-red-500/30 hover:text-red-400' },
              { href: 'https://x.com/PlayMNG', icon: <XIcon size={18} />, label: 'X', color: 'hover:bg-white/10 hover:border-white/20 hover:text-white' },
              { href: 'https://discord.gg/t9h3upEuqa', icon: <DiscordIcon size={18} />, label: 'Discord', color: 'hover:bg-indigo-600/20 hover:border-indigo-500/30 hover:text-indigo-400' },
              { href: 'https://www.twitch.tv/MomentumGamingIN', icon: <TwitchIcon size={18} />, label: 'Twitch', color: 'hover:bg-purple-600/20 hover:border-purple-500/30 hover:text-purple-400' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`p-2.5 bg-white/5 border border-white/8 text-gray-400 rounded-sm transition-all duration-300 ${s.color} cursor-pointer`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/services" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Our Services</Link></li>
            <li><Link to="/projects" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Case Studies</Link></li>
            <li><Link to="/tournaments" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Tournaments</Link></li>
            <li><Link to="/contact" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Media Kit</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Inquiries</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:momentumgaminginfo@gmail.com" className="flex items-start text-gray-500 hover:text-orange-500 transition-colors text-sm">
                <Mail size={15} className="mr-2 mt-0.5 shrink-0" /> momentumgaminginfo@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/918509632411" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-500 hover:text-green-400 transition-colors text-sm">
                <WhatsAppIcon size={15} className="mr-2 shrink-0" /> +91 85096 32411
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest font-bold">
        <p>© 2026 Momentum Gaming. All Rights Reserved</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ─── Public Layout ─── */
const PublicLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Re-run reveal observers on route change
  useReveal();

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      <CursorGlow />
      <Navbar />
      <main className={`flex-grow ${isHome ? '' : 'pt-28'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin-zd/login" element={<Login />} />
        <Route path="/admin-zd" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          <Route path="contact-submissions" element={<ContactSubmissions />} />
          <Route path="tournaments" element={<div className="text-white">Tournaments Coming Soon</div>} />
          <Route path="settings" element={<div className="text-white">Settings Coming Soon</div>} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<CaseStudy />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournaments/:id" element={<TournamentDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
