import React from 'react';
import { BlogArticle } from '../types';

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 md:p-8 ambient-shadow-lg relative max-h-[90vh] overflow-y-auto border border-[#dde9ff]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#56423c] hover:text-[#0d1c2f] p-1.5 rounded-full hover:bg-[#eff4ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-2 text-[#9e421d] font-['Plus_Jakarta_Sans'] text-[13px] font-semibold mb-2">
          <span className="material-symbols-outlined text-[18px]">{article.icon}</span>
          Pet Care Guide • {article.date}
        </div>

        <h2 className="font-['Quicksand'] text-[26px] md:text-[30px] font-bold text-[#0d1c2f] mb-4">
          {article.title}
        </h2>

        <div className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#56423c] leading-relaxed space-y-4">
          <p>{article.summary}</p>
          <p>
            Ensuring proper hydration, regular veterinary checkups, and balanced nutrition are foundational steps for keeping pets healthy in Nepal's varied climate. Whenever you take your pet outdoors, always carry fresh drinking water and avoid walking during peak afternoon heat.
          </p>
          <p>
            If you need further specialized advice or emergency care, check our trusted directory of certified clinics and shelters across Kathmandu, Lalitpur, Bhaktapur, and Pokhara.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#dde9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#9e421d] text-white rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[14px]"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
