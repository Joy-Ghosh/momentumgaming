
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'tournament',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry. A Momentum Gaming representative will contact you shortly.');
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-6">
            Let's <span className="text-orange-600">Sync</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Ready to build the next legendary tournament or elevate your brand's presence in the gaming world?
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info & CTA */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">Business Contact</h2>
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm text-orange-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Email Us</p>
                    <a href="mailto:momentumgaminginfo@gmail.com" className="text-xl font-bold text-white uppercase tracking-tight hover:text-orange-600 transition-colors">momentumgaminginfo@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm text-green-500">
                    <WhatsAppIcon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">WhatsApp</p>
                    <a href="https://wa.me/918509632411" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-white uppercase tracking-tight hover:text-green-500 transition-colors">+91 85096 32411</a>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm text-zinc-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Headquarters</p>
                    <p className="text-xl font-bold text-white uppercase tracking-tight">Los Angeles, CA / Remote Global</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 p-10 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-6">Sponsor & Media Kit</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Download our comprehensive capabilities deck, technical specs, and case study results.
              </p>
              <button className="flex items-center bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-orange-600 hover:text-white transition-all">
                Download Kit <Download size={18} className="ml-3" />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-950 p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-10">Direct Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Business Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-orange-600 transition-colors appearance-none"
                  >
                    <option value="tournament">Tournament Solution</option>
                    <option value="broadcast">Broadcast Production</option>
                    <option value="brand">Brand Integration</option>
                    <option value="other">Other / General</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Project Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-orange-600 transition-colors resize-none"
                  placeholder="Tell us about your goals..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white p-5 font-black uppercase tracking-widest flex items-center justify-center transition-all transform hover:translate-y-[-2px] active:translate-y-0"
              >
                Send Inquiry <Send size={20} className="ml-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
