import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from '../types';

const WHITE_PUPPY_AVATAR = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=260&q=80";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  action?: {
    label: string;
    view?: ViewType;
    openVet?: boolean;
    openPost?: boolean;
  };
}

interface SaniffyChatModalProps {
  onNavigate?: (view: ViewType) => void;
  onOpenVetDesk?: (topic?: string) => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    text: "Namaste! I'm **Saniffy** 🐾, your AI assistant for PetConnect Nepal.\n\nI can answer any questions about adoptable dogs & cats (like our Japanese Spitz Yuki & Koko), the adoption process in Kathmandu Valley, posting free ads, Dr. Shreya's Vet Desk, and payment options.\n\nHow can I help you today?",
    time: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  { label: '❄️ Japanese Spitz (Yuki & Koko)', text: 'Tell me about the Japanese Spitz dogs available on PetConnect.' },
  { label: '🐾 How to Adopt in KTM?', text: 'What is the step-by-step process to adopt a pet in Kathmandu?' },
  { label: '📝 Post a Free Pet Ad', text: 'How do I post a free adoption or rehoming listing for a pet?' },
  { label: '🩺 Dr. Shreya\'s Vet Desk', text: 'What veterinary care and vaccination guides are available on the Vet Desk?' },
  { label: '💳 eSewa & Payment Methods', text: 'What online payment methods are accepted for adoption fees and donations?' },
];

export const SaniffyChatModal: React.FC<SaniffyChatModalProps> = ({
  onNavigate,
  onOpenVetDesk,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopupBubble, setShowPopupBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('saniffy_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return INITIAL_MESSAGES;
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setShowPopupBubble(false);
    }
  }, [messages, isOpen]);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem('saniffy_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call server endpoint
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I'm here to help with any queries regarding adoptable pets, shelters, or veterinary guidance on PetConnect! 🐾";

      // Detect relevant action buttons based on query
      let actionObj: Message['action'] | undefined = undefined;
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('spitz') || lowerQuery.includes('adopt') || lowerQuery.includes('browse') || lowerQuery.includes('cat') || lowerQuery.includes('dog')) {
        actionObj = { label: '🐾 Browse All Pets', view: 'browse' };
      } else if (lowerQuery.includes('post') || lowerQuery.includes('ad') || lowerQuery.includes('rehome') || lowerQuery.includes('sell')) {
        actionObj = { label: '📝 Post a Free Ad Now', view: 'post-ad' };
      } else if (lowerQuery.includes('vet') || lowerQuery.includes('doctor') || lowerQuery.includes('vaccin') || lowerQuery.includes('shreya')) {
        actionObj = { label: '🩺 Open Dr. Shreya\'s Vet Desk', openVet: true };
      } else if (lowerQuery.includes('donate') || lowerQuery.includes('sponsor')) {
        actionObj = { label: '💖 Donate / Sponsor', view: 'donate' };
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: actionObj,
      };

      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback assistant response
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        role: 'assistant',
        text: "Hi! I am Saniffy 🐾. You can browse all adoptable dogs & cats (including our Japanese Spitz Yuki & Koko) in Kathmandu Valley, post free listings, or consult Dr. Shreya's Vet Desk!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('saniffy_chat_history');
  };

  const handleActionClick = (action: NonNullable<Message['action']>) => {
    if (action.openVet && onOpenVetDesk) {
      onOpenVetDesk();
    } else if (action.view && onNavigate) {
      onNavigate(action.view);
    }
  };

  return (
    <>
      {/* Floating Circular Minimalist Launcher with 'Ask me anything' popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 pointer-events-auto"
      >
        <div className="relative flex items-center">
          {/* Animated "Ask me anything" Speech Bubble Popup */}
          <AnimatePresence>
            {!isOpen && showPopupBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 22 }}
                className="absolute right-full mr-3.5 flex items-center"
              >
                <div
                  onClick={() => setIsOpen(true)}
                  className="bg-white/95 backdrop-blur-md text-[#1f1418] px-3.5 py-2 rounded-2xl shadow-[0_8px_25px_rgba(224,93,127,0.25)] border border-[#f8ccd7] flex items-center gap-2 cursor-pointer hover:border-[#e05d7f] hover:shadow-[0_10px_30px_rgba(224,93,127,0.35)] transition-all group"
                >
                  <span className="text-[14px]">🐶</span>
                  <div className="flex flex-col">
                    <span className="text-[12.5px] font-['Plus_Jakarta_Sans'] font-bold text-[#5c3325] leading-tight">
                      Ask me anything
                    </span>
                    <span className="text-[10px] font-['Plus_Jakarta_Sans'] font-medium text-[#8c7179] leading-tight">
                      Saniffy is ready to help
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPopupBubble(false);
                    }}
                    title="Dismiss"
                    aria-label="Dismiss pop up"
                    className="w-4 h-4 ml-1 rounded-full text-[#8c7179] hover:text-[#1f1418] hover:bg-[#fff0f4] flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                  {/* Little speech triangle pointing right towards the circle */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white border-t border-r border-[#f8ccd7] rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimalist Circular White Puppy Button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open Saniffy Assistant"
            className={`relative w-15 h-15 rounded-full p-1 shadow-[0_10px_30px_rgba(224,93,127,0.35)] transition-all cursor-pointer flex items-center justify-center border-2 ${
              isOpen
                ? 'bg-[#1f1418] border-[#5c454d]'
                : 'bg-white border-[#f8ccd7] hover:border-[#e05d7f]'
            }`}
          >
            {/* Cute White Puppy Circular Avatar */}
            <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#fff0f4]">
              <img
                src={WHITE_PUPPY_AVATAR}
                alt="Saniffy - Cute White Puppy"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isOpen ? 'scale-90 opacity-70' : 'hover:scale-105'
                }`}
              />
              {/* Close overlay icon if chat is open */}
              {isOpen && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </div>
              )}
            </div>

            {/* Online Status dot */}
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-[#00e676] border-2 border-white rounded-full shadow-xs" />

            {hasUnread && !isOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e05d7f] border-2 border-white animate-ping" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Saniffy Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-32px)] sm:w-[390px] max-h-[580px] h-[75vh] bg-white rounded-[28px] shadow-[0_20px_50px_rgba(31,20,24,0.18)] border border-[#f4dfe6] flex flex-col overflow-hidden ambient-pink-glow"
          >
            {/* Header - Clean Minimalist */}
            <div className="bg-[#fff8f9] px-4 py-3.5 border-b border-[#f4dfe6] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white border border-[#f8ccd7] overflow-hidden shadow-xs shrink-0">
                  <img
                    src={WHITE_PUPPY_AVATAR}
                    alt="Saniffy - Cute White Puppy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#006a63] border-2 border-white rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-['Quicksand'] text-[16px] font-bold text-[#1f1418]">
                      Saniffy
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006a63]" />
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8c7179]">
                    PetConnect AI Guide
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear chat"
                  aria-label="Clear chat"
                  className="w-7 h-7 rounded-full hover:bg-white text-[#8c7179] hover:text-[#c44569] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  aria-label="Close"
                  className="w-7 h-7 rounded-full hover:bg-white text-[#8c7179] hover:text-[#1f1418] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#fff8f9]/50">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-white border border-[#f8ccd7] overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                          <img
                            src={WHITE_PUPPY_AVATAR}
                            alt="Saniffy White Puppy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`p-3.5 rounded-[22px] text-[13.5px] font-['Plus_Jakarta_Sans'] leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-[#5c3325] text-white rounded-br-xs'
                            : 'bg-white text-[#1f1418] border border-[#f4dfe6] rounded-bl-xs'
                        }`}
                      >
                        <div className="whitespace-pre-line">
                          {msg.text.split('**').map((chunk, i) =>
                            i % 2 === 1 ? (
                              <strong key={i} className={isUser ? 'text-white' : 'text-[#5c3325] font-bold'}>
                                {chunk}
                              </strong>
                            ) : (
                              chunk
                            )
                          )}
                        </div>

                        {/* Interactive Direct Action Button */}
                        {msg.action && (
                          <div className="mt-2.5 pt-2 border-t border-[#f4dfe6]">
                            <button
                              onClick={() => handleActionClick(msg.action!)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fff0f4] hover:bg-[#ffe4eb] text-[#c44569] font-bold text-[12px] rounded-full border border-[#f8ccd7] transition-all cursor-pointer shadow-xs"
                            >
                              <span>{msg.action.label}</span>
                              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#8c7179] font-medium px-2 mt-1">
                      {msg.time}
                    </span>
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-[#8c7179] text-[12px] font-['Plus_Jakarta_Sans'] font-medium pl-2">
                  <div className="w-7 h-7 rounded-full bg-white border border-[#f8ccd7] overflow-hidden shrink-0">
                    <img
                      src={WHITE_PUPPY_AVATAR}
                      alt="Saniffy thinking"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-[#f4dfe6] shadow-xs flex items-center gap-1.5">
                    <span className="text-[12px] text-[#5c454d]">Saniffy is thinking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e05d7f] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e05d7f] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e05d7f] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 3 && (
              <div className="px-4 py-2 bg-white/90 border-t border-[#f4dfe6] shrink-0">
                <span className="text-[11px] font-bold text-[#8c7179] uppercase tracking-wider block mb-1.5">
                  Popular Queries
                </span>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {SUGGESTED_QUESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(sug.text)}
                      className="px-2.5 py-1 rounded-full bg-[#fff0f4] hover:bg-[#ffe4eb] text-[#8c3552] text-[11.5px] font-semibold font-['Plus_Jakarta_Sans'] border border-[#f8ccd7] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-[#f4dfe6] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Saniffy about pets, adoption, vet care..."
                className="flex-1 px-4 py-2.5 bg-[#fff8f9] border border-[#f4dfe6] focus:border-[#e05d7f] rounded-full text-[13.5px] font-['Plus_Jakarta_Sans'] text-[#1f1418] outline-none transition-all placeholder:text-[#8c7179]"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                  input.trim() && !isLoading
                    ? 'bg-[#9e421d] hover:bg-[#7e2b07] text-white shadow-md'
                    : 'bg-[#faebf0] text-[#8c7179] cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
