import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import KurraLogo from './KurraLogo';

export default function ConciergeChatbot({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings! I am Kurra Infra’s Digital Concierge. How may I assist you regarding AMARIS residences in Financial District today?'
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'What is the price range?',
    'Where is AMARIS located?',
    'What are the clubhouse amenities?',
    'Book a private site visit'
  ];

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let botReply = "Thank you for inquiring about Kurra Infra's AMARIS. Our senior relationship manager can provide exact availability and custom payment plans during your private site visit.";

      const lower = textToSend.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
        botReply = "AMARIS 3 BHK Executive suites start from ₹ 2.85 Cr onwards, 4 BHK Royal Sky Suites from ₹ 4.60 Cr onwards, and Duplex Sky Penthouses are available on request.";
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('address')) {
        botReply = "AMARIS is situated along Financial District's 8-metre natural slope terrain in Nanakramguda, Hyderabad — just 2 minutes from Outer Ring Road Exit 1.";
      } else if (lower.includes('amenit') || lower.includes('clubhouse') || lower.includes('pool')) {
        botReply = "AMARIS features a 45,000 sq.ft luxury clubhouse, heated infinity sky pool, wellness café with artisanal coffee terrace, Technogym fitness center, and hydrotherapy spa.";
      } else if (lower.includes('book') || lower.includes('visit') || lower.includes('tour')) {
        botReply = "I can arrange a private VIP site tour for you right now! Click the button below to select your preferred date and time.";
      }

      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3.5 rounded-full bg-[#d8c7b5] text-[#161210] shadow-[0_0_25px_rgba(216,199,181,0.4)] hover:scale-105 transition-all flex items-center gap-3 font-bold text-xs uppercase tracking-[0.15em] group"
        >
          <Bot className="w-5 h-5 text-[#161210]" />
          <span>Kurra Concierge</span>
          <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-[#211a16] border border-[#b89674]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[480px]">
          {/* Header */}
          <div className="p-4 bg-[#161210] border-b border-[#b89674]/20 flex items-center justify-between">
            <KurraLogo size="small" variant="gold" showText={false} />
            <div className="flex flex-col">
              <span className="font-serif-header text-sm text-[#f5efe6] font-semibold">AMARIS Assistant</span>
              <span className="text-[9px] text-[#d8c7b5] uppercase tracking-widest">Online • Financial District</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[#d8c7b5] hover:bg-[#211a16] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#161210]/60 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#d8c7b5] flex items-center justify-center text-[#161210] shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#d8c7b5] text-[#161210] font-medium'
                      : 'bg-[#211a16] border border-[#b89674]/30 text-[#f5efe6]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#161210] border-t border-[#b89674]/10 flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[9px] bg-[#211a16] border border-[#b89674]/30 text-[#d8c7b5] hover:bg-[#d8c7b5] hover:text-[#161210] px-2.5 py-1 rounded-full transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#161210] border-t border-[#b89674]/20 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about floor plans, pricing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#211a16] border border-[#b89674]/30 rounded-xl px-3 py-2 text-xs text-[#f5efe6] focus:border-[#d8c7b5] outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#d8c7b5] text-[#161210] hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
