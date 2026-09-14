import React, { useState } from 'react';
import { X, Calendar, User, Mail, Phone, Building2, CheckCircle2, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VIPBookingModal({ isOpen, onClose, initialType = 'visit' }) {
  const [activeTab, setActiveTab] = useState(initialType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    configuration: '4 BHK Royal Sky Suite',
    preferredDate: '',
    preferredTime: '10:00 AM',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#161210]/95 animate-overlay-fade flex items-center justify-center p-4 sm:p-6">
      <div className="relative max-w-2xl w-full bg-[#211a16] border border-[#b89674]/50 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-popup shell-pulse">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-[#161210] text-[#d8c7b5] border border-[#b89674]/30 hover:bg-[#d8c7b5] hover:text-[#161210] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161210] border border-[#b89674]/40 text-xs text-[#d8c7b5] uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KURRA INFRA CONCIERGE</span>
              </div>
              <h3 className="font-serif-header text-2xl sm:text-3xl text-[#f5efe6] font-light">
                {activeTab === 'visit' ? 'Schedule Private Site Tour' : 'Download Exclusive E-Brochure'}
              </h3>
              <p className="font-sans-body text-xs text-[#9c8e82] mt-2">
                Experience AMARIS in person at Financial District, Hyderabad with a dedicated relationship manager.
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-[#161210] p-1 rounded-xl border border-[#b89674]/30 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('visit')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'visit' ? 'bg-[#d8c7b5] text-[#161210]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Schedule Site Visit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('brochure')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'brochure' ? 'bg-[#d8c7b5] text-[#161210]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Download E-Brochure
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#d8c7b5] font-medium block mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Mr. Vikram Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#161210] border border-[#b89674]/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#f5efe6] focus:border-[#d8c7b5] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#d8c7b5] font-medium block mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#161210] border border-[#b89674]/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#f5efe6] focus:border-[#d8c7b5] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#d8c7b5] font-medium block mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161210] border border-[#b89674]/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#f5efe6] focus:border-[#d8c7b5] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#d8c7b5] font-medium block mb-1">Configuration</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <select
                      value={formData.configuration}
                      onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                      className="w-full bg-[#161210] border border-[#b89674]/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#f5efe6] focus:border-[#d8c7b5] outline-none"
                    >
                      <option value="4 BHK Executive Sky Suite">4 BHK Executive Sky Suite (3,450 SF)</option>
                      <option value="4 BHK Royal Sky Suite">4 BHK Royal Sky Suite (3,850 SF)</option>
                      <option value="4 BHK Duplex Sky Penthouse">4 BHK Duplex Sky Penthouse (5,920 SF)</option>
                    </select>
                  </div>
                </div>

                {activeTab === 'visit' && (
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#d8c7b5] font-medium block mb-1">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-[#161210] border border-[#b89674]/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#f5efe6] focus:border-[#d8c7b5] outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#ffffff] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {activeTab === 'visit' ? (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Private Tour Appointment</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Instant PDF E-Brochure</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#d8c7b5] mx-auto flex items-center justify-center text-[#161210]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif-header text-2xl text-[#f5efe6] font-light">
              Appointment Reserved Successfully!
            </h3>

            <p className="font-sans-body text-xs text-[#9c8e82] max-w-md mx-auto leading-relaxed">
              Thank you <strong className="text-[#d8c7b5]">{formData.name}</strong>. Our senior luxury consultant from Kurra Infra will reach out to you shortly at <strong className="text-[#f5efe6]">{formData.phone}</strong> with private access details.
            </p>

            <div className="pt-4 border-t border-[#b89674]/20">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-[#b89674]/40 text-xs text-[#d8c7b5] hover:bg-[#d8c7b5] hover:text-[#161210] transition-all font-semibold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
