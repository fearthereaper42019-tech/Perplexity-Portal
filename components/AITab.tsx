
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/gemini';
import { Message } from '../types';

const AITab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Systems online. I am the Perplexity Assistance Tool. How may I assist with your workflow today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Correctly map history to match the expected structure for the Gemini SDK wrapper
      const history: { role: 'user' | 'model', parts: { text: string }[] }[] = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const aiResponse = await sendMessageToAI(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse || "Communication error. Response stream empty." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Neural core timeout. Connectivity failure detected." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[75vh] glass rounded-[2.5rem] overflow-hidden border border-accent/20 shadow-2xl max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="bg-accent/5 p-5 border-b border-accent/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-xl shadow-glow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 8V4H8"/><rect x="8" y="8" width="8" height="12" rx="2"/><path d="M16 8V4h4"/></svg>
          </div>
          <div>
            <h3 className="font-black text-white uppercase tracking-widest text-sm">Perplexity Assistance Tool</h3>
            <p className="text-[10px] text-accent flex items-center gap-2 font-black uppercase tracking-[0.1em]">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-glow"></span>
              Neural Engine v4.0.2
            </p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="text-gray-600 hover:text-accent transition-all text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2"
        >
          RESET_LOGS
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-[1.5rem] ${
              m.role === 'user' 
                ? 'bg-accent text-white shadow-glow' 
                : 'glass text-gray-300 border border-accent/10'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed text-sm font-medium tracking-tight">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass p-5 rounded-2xl flex gap-3 items-center border border-accent/10">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-5 bg-accent/5 border-t border-accent/10">
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Initialize query..."
            className="w-full bg-black/40 border border-accent/20 rounded-full py-4 pl-6 pr-16 text-white placeholder-gray-700 focus:outline-none focus:border-accent transition-all text-sm font-black tracking-tight"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-3 bg-accent hover:opacity-80 active:scale-90 text-white rounded-full transition-all disabled:opacity-30 shadow-glow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AITab;
