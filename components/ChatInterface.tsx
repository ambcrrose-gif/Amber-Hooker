import React, { useState, useRef, useEffect } from 'react';
import { Message, Sender, Product } from '../types';
import { generateCulinaryAdvice } from '../services/geminiService';
import { Send, X, Bot, ChefHat, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: Product | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose, initialContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Olá! I am Miss Can's Culinary Concierge. Whether you need a recipe for our sardines or a wine pairing for our mackerel, I am here to help. What shall we prepare today?",
      sender: Sender.BOT,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `I see you are interested in the **${initialContext.name}**. Would you like a traditional recipe or a modern twist?`,
          sender: Sender.BOT,
          timestamp: new Date(),
        }
      ]);
    }
  }, [initialContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: Sender.USER,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await generateCulinaryAdvice(
        userMessage.text,
        initialContext?.name
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 z-50 animate-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-navy text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gold p-1.5 rounded-full text-navy">
            <ChefHat size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg leading-none">The Kitchen</h3>
            <span className="text-xs text-stone-300 uppercase tracking-wider">Virtual Concierge</span>
          </div>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.sender === Sender.USER
                  ? 'bg-navy text-white rounded-br-none'
                  : 'bg-white border border-stone-200 text-navy rounded-bl-none shadow-sm'
              }`}
            >
               <ReactMarkdown 
                  className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-strong:text-current"
                >
                  {msg.text}
               </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-stone-500 text-xs">
              <Loader2 className="animate-spin" size={14} />
              Consulting the chef...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-stone-100">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for a recipe or wine pairing..."
            className="w-full pl-4 pr-12 py-3 bg-stone-50 border-transparent focus:border-navy/30 focus:bg-white focus:ring-0 rounded-xl text-sm transition-all duration-300 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-navy text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy/90 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
