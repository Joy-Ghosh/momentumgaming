import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
