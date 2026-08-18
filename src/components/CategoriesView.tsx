import React from 'react';
import { CATEGORIES_LIST } from '../data/mockData';

interface CategoriesViewProps {
  onSelectCategory: (catId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-10 flex flex-col gap-8">
      <div>
        <h1 className="font-['Quicksand'] text-[32px] md:text-[40px] font-bold text-[#0d1c2f]">
          Pet Categories
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#56423c] mt-2">
          Explore pet services, adoption opportunities, and emergency lost & found networks across Nepal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_LIST.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="bg-white rounded-[24px] p-6 ambient-shadow border border-[#dde9ff]/80 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#eff4ff] flex items-center justify-center group-hover:bg-[#ff8c61]/25 transition-colors shrink-0">
                <span className="material-symbols-outlined text-[#9e421d] text-[32px]">
                  {cat.icon}
                </span>
              </div>
              <div>
                <h3 className="font-['Quicksand'] text-[22px] font-bold text-[#0d1c2f] group-hover:text-[#9e421d] transition-colors">
                  {cat.label}
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#56423c] mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dde9ff] flex items-center justify-between text-[#9e421d] font-['Plus_Jakarta_Sans'] text-[14px] font-semibold">
              <span>Explore {cat.label} listings</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
