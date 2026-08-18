import React, { useState } from 'react';
import { Pet, PaymentTransaction } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  pets: Pet[];
  transactions?: PaymentTransaction[];
  onSelectPet: (pet: Pet) => void;
  onToggleFavorite: (id: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  favorites,
  pets,
  transactions = [],
  onSelectPet,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'payments'>('favorites');

  if (!isOpen) return null;

  const favoritePets = pets.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-xl w-full p-6 md:p-8 ambient-shadow-lg relative max-h-[85vh] overflow-y-auto border border-[#dde9ff]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#56423c] hover:text-[#0d1c2f] p-1.5 rounded-full hover:bg-[#eff4ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#ff8c61]/30 flex items-center justify-center text-[#9e421d]">
            <span className="material-symbols-outlined text-[32px]">person</span>
          </div>
          <div>
            <h2 className="font-['Quicksand'] text-[24px] font-bold text-[#0d1c2f]">
              My PetConnect Account
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#56423c]">
              Community Member in Nepal
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#dde9ff] mb-6 gap-6">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-3 font-['Plus_Jakarta_Sans'] font-semibold text-[15px] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'favorites'
                ? 'text-[#9e421d] border-b-2 border-[#9e421d]'
                : 'text-[#56423c] hover:text-[#0d1c2f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            Saved Pets ({favoritePets.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`pb-3 font-['Plus_Jakarta_Sans'] font-semibold text-[15px] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'payments'
                ? 'text-[#9e421d] border-b-2 border-[#9e421d]'
                : 'text-[#56423c] hover:text-[#0d1c2f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            Payments & Receipts ({transactions.length})
          </button>
        </div>

        {/* Tab 1: Saved Pets */}
        {activeTab === 'favorites' && (
          <div>
            {favoritePets.length === 0 ? (
              <div className="bg-[#f8f9ff] rounded-2xl p-6 text-center border border-[#dde9ff]">
                <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#56423c]">
                  You haven't saved any pets to your favorites yet. Click the heart icon on any pet card to save them here!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {favoritePets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex items-center justify-between p-3 bg-[#f8f9ff] rounded-2xl border border-[#dde9ff] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                    onClick={() => {
                      onSelectPet(pet);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-['Quicksand'] font-bold text-[16px] text-[#0d1c2f]">
                          {pet.name}
                        </h4>
                        <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#56423c]">
                          {pet.petType} • {pet.location}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(pet.id);
                      }}
                      className="text-[#ba1a1a] p-2 hover:bg-white rounded-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Payments & Receipts */}
        {activeTab === 'payments' && (
          <div>
            {transactions.length === 0 ? (
              <div className="bg-[#f8f9ff] rounded-2xl p-6 text-center border border-[#dde9ff]">
                <span className="material-symbols-outlined text-[32px] text-[#56423c] mb-2">
                  account_balance_wallet
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#56423c]">
                  No payment transactions yet. When you pay adoption fees, sponsor shelter pets, or boost an ad via eSewa, Khalti, or Fonepay, your receipts will appear here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 bg-[#f8f9ff] rounded-2xl border border-[#dde9ff] flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#0d1c2f]">
                          {tx.purpose}
                        </span>
                        <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#56423c]">
                          Ref: {tx.transactionRef} • {tx.paymentMethod.toUpperCase()}
                        </p>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#9e421d]">
                        NPR {tx.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] text-[#56423c] pt-2 border-t border-[#dde9ff]">
                      <span>{tx.date}</span>
                      <span className="bg-[#8bf1e6]/50 text-[#006f67] font-semibold px-2 py-0.5 rounded-full">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
