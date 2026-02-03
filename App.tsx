
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Mail, Phone, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import CaseStudy from './pages/CaseStudy';
import Tournaments from './pages/Tournaments';
import TournamentDetail from './pages/TournamentDetail';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-black italic text-white group-hover:text-blue-500 transition-colors tracking-tighter">
              MOMENTUM<span className="text-orange-500">GAMING</span>
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === link.path ? 'text-orange-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-sm font-bold uppercase tracking-wider text-sm transition-all transform hover:scale-105 active:scale-95"
            >
              Partner With Us
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 animate-in fade-in slide-in-from-top-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-bold uppercase tracking-widest text-gray-300 hover:text-orange-500 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-orange-600 text-white px-3 py-4 mt-4 font-black uppercase"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/10 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-3xl font-black italic text-white tracking-tighter mb-6 block">
            MOMENTUM<span className="text-orange-500">GAMING</span>
          </Link>
          <p className="text-gray-400 max-w-md leading-relaxed">
            The future of esports production. We bridge the gap between global brands and the next generation of gamers through world-class broadcasts and community events.
          </p>
          <div className="flex space-x-4 mt-8">
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors"><Twitter size={20} /></a>
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/services" className="text-gray-400 hover:text-orange-500 transition-colors">Our Services</Link></li>
            <li><Link to="/projects" className="text-gray-400 hover:text-orange-500 transition-colors">Case Studies</Link></li>
            <li><Link to="/tournaments" className="text-gray-400 hover:text-orange-500 transition-colors">Tournaments</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Media Kit</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Inquiries</h4>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-400">
              <Mail size={16} className="mr-2" /> hello@momentum.gg
            </li>
            <li className="flex items-center text-gray-400">
              <Phone size={16} className="mr-2" /> +1 (555) esports
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest font-bold">
        <p>© 2024 Momentum Gaming Production Ltd. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<CaseStudy />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
