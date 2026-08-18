import React, { useState } from 'react';
import { Pet } from '../types';

interface ContactModalProps {
  pet: Pet | null;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ pet, onClose, onSuccess }) => {
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [message, setMessage] = useState(
    pet ? `Hi, I am interested in adopting ${pet.name} and would like to learn more about the adoption process.` : ''
  );
  const [isSending, setIsSending] = useState(false);

  if (!pet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onSuccess(`Message sent to ${pet.shelterName}! They will contact you shortly.`);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-lg w-full p-6 md:p-8 ambient-shadow-lg relative border border-[#dde9ff]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#56423c] hover:text-[#0d1c2f] p-1 rounded-full hover:bg-[#eff4ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-14 h-14 rounded-2xl object-cover border border-[#dde9ff]"
          />
          <div>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-semibold text-[#9e421d] uppercase tracking-wider">
              Inquire about
            </span>
            <h3 className="font-['Quicksand'] text-[20px] font-bold text-[#0d1c2f]">
              {pet.name} ({pet.breed})
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold text-[#0d1c2f] block mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g., Aarav Sharma"
              className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#ddc1b7] rounded-xl text-[14px] focus:border-[#9e421d] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold text-[#0d1c2f] block mb-1">
              Your Phone / WhatsApp
            </label>
            <input
              type="text"
              required
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              placeholder="e.g., +977 984-1234567"
              className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#ddc1b7] rounded-xl text-[14px] focus:border-[#9e421d] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold text-[#0d1c2f] block mb-1">
              Your Message
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#ddc1b7] rounded-xl text-[14px] focus:border-[#9e421d] focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#ddc1b7] rounded-full text-[#56423c] font-['Plus_Jakarta_Sans'] font-semibold text-[14px] hover:bg-[#eff4ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="flex-1 py-3 bg-[#9e421d] text-white rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[14px] hover:bg-[#7e2b07] transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              {isSending ? 'Sending...' : 'Send Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
