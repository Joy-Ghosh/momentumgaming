
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, Send } from 'lucide-react';

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
          <h1 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-6">
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
                    <p className="text-xl font-bold text-white uppercase tracking-tight">partners@momentum.gg</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm text-blue-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Call Us</p>
                    <p className="text-xl font-bold text-white uppercase tracking-tight">+1 (555) MOMENTUM</p>
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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Business Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
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
