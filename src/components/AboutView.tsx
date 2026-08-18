import React from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';
import { VetPhoto, DR_AARYA_INFO } from './VetPhoto';

interface AboutViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenVetDesk?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenVetDesk }) => {
  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 md:px-10 py-12 flex flex-col gap-12">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#fff0f4] flex items-center justify-center mb-4 text-[#e05d7f] border border-[#f8ccd7]">
          <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            pets
          </span>
        </div>
        <h1 className="font-['Quicksand'] text-[32px] md:text-[44px] font-bold text-[#1f1418] mb-4">
          About PetConnect Nepal
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#5c454d] leading-relaxed">
          PetConnect is Nepal's dedicated open community platform built to bridge local animal shelters, foster parents, certified veterinarians, and pet lovers across Kathmandu Valley.
        </p>
      </div>

      {/* Veterinary Leadership Spotlight - Dr. Shreya */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-white via-[#fff8f9] to-[#f0faf8] rounded-[32px] p-6 md:p-10 border-2 border-[#f4dfe6] ambient-shadow flex flex-col md:flex-row items-center gap-8"
      >
        <div className="shrink-0 flex flex-col items-center text-center">
          <VetPhoto size="lg" showBadge={true} />
          <div className="mt-3">
            <span className="font-['Quicksand'] text-[18px] font-bold text-[#1f1418] block">
              {DR_AARYA_INFO.name}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#006a63] uppercase tracking-wider block">
              {DR_AARYA_INFO.role}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#8c7179] block">
              {DR_AARYA_INFO.qualifications}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <div className="inline-flex items-center self-center md:self-start gap-1.5 px-3 py-1 rounded-full bg-[#f0faf8] text-[#006a63] border border-[#b2e5dc] text-[12px] font-bold uppercase tracking-wider">
            <span>🩺</span> Veterinary Health & Welfare Lead
          </div>
          <h3 className="font-['Quicksand'] text-[24px] md:text-[28px] font-bold text-[#1f1418]">
            "Every Pet in the Valley Deserves Compassion & Medical Dignity"
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d] leading-relaxed">
            Leading our veterinary triage protocol, Dr. Shreya Karki works closely with shelters across Kathmandu, Lalitpur, and Bhaktapur to guarantee that every listed pet is screened for rabies, dewormed, and guided into safe forever homes.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            <button
              onClick={() => onOpenVetDesk?.()}
              className="px-5 py-2.5 rounded-full bg-[#006a63] hover:bg-[#00524c] text-white font-['Plus_Jakarta_Sans'] font-bold text-[13.5px] flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">stethoscope</span>
              Consult Valley Vet Desk
            </button>
            <span className="text-[13px] text-[#8c7179]">
              • Over 1,200+ street rescues vaccinated
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-[#f4dfe6] flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#fff0f4] flex items-center justify-center text-[#e05d7f]">
            <span className="material-symbols-outlined text-[28px]">volunteer_activism</span>
          </div>
          <h3 className="font-['Quicksand'] text-[20px] font-bold text-[#1f1418]">
            Ethical Adoption
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d] leading-relaxed">
            We promote adopting street and shelter animals with verified vaccination records, promoting cruelty-free forever homes.
          </p>
        </div>

        <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-[#f4dfe6] flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#faebf0] flex items-center justify-center text-[#9e421d]">
            <span className="material-symbols-outlined text-[28px]">notifications_active</span>
          </div>
          <h3 className="font-['Quicksand'] text-[20px] font-bold text-[#1f1418]">
            Lost & Found Radar
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d] leading-relaxed">
            Our neighborhood alert system helps community members report stray or lost animals quickly across Kathmandu Valley and beyond.
          </p>
        </div>

        <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-[#f4dfe6] flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#f0faf8] flex items-center justify-center text-[#006a63]">
            <span className="material-symbols-outlined text-[28px]">health_and_safety</span>
          </div>
          <h3 className="font-['Quicksand'] text-[20px] font-bold text-[#1f1418]">
            Verified Care Network
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d] leading-relaxed">
            Directly connect with certified vet clinics, grooming centers, and shelter professionals who prioritize animal wellbeing.
          </p>
        </div>
      </div>

      {/* Community Call to Action */}
      <div className="bg-[#faebf0] rounded-[32px] p-8 md:p-12 text-center flex flex-col items-center border border-[#f8ccd7]">
        <h2 className="font-['Quicksand'] text-[26px] md:text-[32px] font-bold text-[#1f1418] mb-3">
          Join Nepal's Pet Loving Movement
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#5c454d] max-w-xl mb-6">
          Whether you want to welcome a new dog or cat into your family or help a rescue shelter thrive, your voice matters.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('browse')}
            className="bg-[#9e421d] text-white px-8 py-3.5 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[15px] hover:bg-[#7e2b07] transition-all shadow-sm cursor-pointer"
          >
            Browse Available Pets
          </button>
          <button
            onClick={() => onNavigate('post-ad')}
            className="bg-white border border-[#f8ccd7] text-[#1f1418] px-8 py-3.5 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[15px] hover:border-[#9e421d] transition-all cursor-pointer"
          >
            Post a Pet Advertisement
          </button>
        </div>
      </div>
    </div>
  );
};
