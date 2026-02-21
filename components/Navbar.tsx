import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

export default Navbar;
