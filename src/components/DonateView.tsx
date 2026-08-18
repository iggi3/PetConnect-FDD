import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Pet } from '../types';

interface DonateViewProps {
  pets: Pet[];
  onOpenPaymentModal: (pet: Pet | null, purpose: 'Adoption Fee' | 'Shelter Sponsorship' | 'General Donation', amount: number) => void;
  onSelectPet: (pet: Pet) => void;
}

export const DonateView: React.FC<DonateViewProps> = ({
  pets,
  onOpenPaymentModal,
  onSelectPet,
}) => {
  const [selectedTier, setSelectedTier] = useState<number>(1500);
  const [customVal, setCustomVal] = useState('');

  const tiers = [
    {
      amount: 500,
      title: 'Nutrition & Care Pack',
      description: 'Provides 10 nutritious meals and clean drinking water for stray and shelter pets in Kathmandu.',
      icon: 'restaurant',
      badge: '10 Meals',
    },
    {
      amount: 1500,
      title: 'Vaccination & Medical Care',
      description: 'Covers essential rabies vaccination, 7-in-1 shots, and deworming treatments for rescues.',
      icon: 'medical_services',
      popular: true,
      badge: 'Most Needed',
    },
    {
      amount: 3000,
      title: 'Emergency Rescue & Surgery',
      description: 'Supports emergency ambulance rescue, fracture treatments, and foster shelter rehabilitation.',
      icon: 'emergency',
      badge: 'Lifesaver',
    },
  ];

  const currentAmt = customVal ? parseFloat(customVal) || selectedTier : selectedTier;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-10 flex flex-col gap-12">
      {/* Hero Header with Subtle Blush Accents */}
      <div className="bg-gradient-to-br from-[#fff0f4] via-[#faebf0] to-[#fff8f9] rounded-[36px] p-8 md:p-14 border border-[#f8ccd7] text-center flex flex-col items-center gap-4 ambient-shadow relative overflow-hidden">
        {/* Soft pink ambient orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffd3e0]/40 rounded-full blur-3xl pointer-events-none" />

        <span className="bg-[#fff0f4] text-[#c44569] border border-[#f8ccd7] font-['Plus_Jakarta_Sans'] text-[13px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
          <span className="text-[14px]">💖</span>
          Kathmandu Valley Pet Care & Shelter Fund
        </span>
        <h1 className="font-['Quicksand'] text-[32px] md:text-[46px] font-bold text-[#1f1418] max-w-2xl leading-tight">
          Support Rescued Animals Across Kathmandu Valley
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#5c454d] max-w-2xl">
          100% of your contributions go directly toward wholesome meals, medical rehabilitation, and shelter foster drives across Kathmandu, Lalitpur, and Bhaktapur.
        </p>

        {/* Supported Payment Gateways in Nepal */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-4 border-t border-[#f4dfe6]">
          <span className="font-['Plus_Jakarta_Sans'] text-[13px] font-bold text-[#5c454d] mr-2">
            Accepted Payment Gateways:
          </span>
          <span className="bg-[#60bb46]/15 text-[#2e7d32] font-bold text-[12px] px-3.5 py-1 rounded-full border border-[#60bb46]/30">
            eSewa Wallet
          </span>
          <span className="bg-[#5c2d91]/15 text-[#5c2d91] font-bold text-[12px] px-3.5 py-1 rounded-full border border-[#5c2d91]/30">
            Khalti Digital
          </span>
          <span className="bg-[#d0021b]/15 text-[#d0021b] font-bold text-[12px] px-3.5 py-1 rounded-full border border-[#d0021b]/30">
            Fonepay Bank QR
          </span>
          <span className="bg-[#9e421d]/15 text-[#9e421d] font-bold text-[12px] px-3.5 py-1 rounded-full border border-[#9e421d]/30">
            Visa / Cards
          </span>
        </div>
      </div>

      {/* Donation Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <motion.div
            key={tier.amount}
            whileHover={{ y: -6 }}
            onClick={() => {
              setSelectedTier(tier.amount);
              setCustomVal('');
            }}
            className={`p-8 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col justify-between relative ambient-shadow ${
              selectedTier === tier.amount && !customVal
                ? 'border-[#e05d7f] bg-white ring-4 ring-[#ffd3e0]/50'
                : 'border-[#f4dfe6] bg-white hover:border-[#f8ccd7]'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#e05d7f] to-[#ff8c61] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Most Needed
              </span>
            )}
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#fff0f4] text-[#e05d7f] flex items-center justify-center mb-4 border border-[#f8ccd7]">
                <span className="material-symbols-outlined text-[30px]">{tier.icon}</span>
              </div>
              <h3 className="font-['Quicksand'] text-[22px] font-bold text-[#1f1418] mb-1">
                {tier.title}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d] mb-6 leading-relaxed">
                {tier.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#f4dfe6] flex justify-between items-center">
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#8c7179] block">Contribution</span>
                <span className="font-['Quicksand'] text-[24px] font-bold text-[#9e421d]">
                  NPR {tier.amount.toLocaleString()}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPaymentModal(null, 'General Donation', tier.amount);
                }}
                className="px-5 py-2.5 bg-[#9e421d] hover:bg-[#7e2b07] text-white rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[13px] transition-colors cursor-pointer"
              >
                Donate Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Payment / Sponsorship Card */}
      <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#f4dfe6] ambient-shadow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <h3 className="font-['Quicksand'] text-[24px] font-bold text-[#1f1418]">
            Custom Donation or Direct Shelter Transfer
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d]">
            Enter any custom amount you wish to contribute to shelter veterinary treatment and rescue operations in Nepal.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-60">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#8c7179] text-[14px]">
              NPR
            </span>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={customVal}
              onChange={(e) => setCustomVal(e.target.value)}
              className="w-full pl-16 pr-4 py-3.5 bg-[#fff8f9] border-2 border-[#f8ccd7] rounded-full text-[15px] focus:border-[#e05d7f] focus:outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenPaymentModal(null, 'General Donation', currentAmt)}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#9e421d] hover:bg-[#7e2b07] text-white rounded-full font-['Plus_Jakarta_Sans'] font-bold text-[15px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-[20px]">payments</span>
            Proceed via eSewa / Fonepay
          </motion.button>
        </div>
      </div>

      {/* Sponsor a specific pet */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-['Quicksand'] text-[28px] font-bold text-[#1f1418]">
            Sponsor a Specific Rescued Companion
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d]">
            Choose a pet currently staying in our partner shelters to fund their food and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pets.slice(0, 3).map((pet) => (
            <motion.div
              key={pet.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[28px] overflow-hidden border border-[#f4dfe6] ambient-shadow flex flex-col"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <h4 className="font-['Quicksand'] text-[20px] font-bold text-[#1f1418]">
                    {pet.name}
                  </h4>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#5c454d]">
                    {pet.breed} • {pet.location}
                  </p>
                  <span className="inline-block mt-2 font-['Plus_Jakarta_Sans'] text-[12px] text-[#c44569] bg-[#fff0f4] border border-[#f8ccd7] px-2.5 py-1 rounded-full font-semibold">
                    Shelter: {pet.shelterName}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectPet(pet)}
                    className="flex-1 py-2.5 border border-[#f8ccd7] text-[#1f1418] rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[13px] hover:bg-[#fff8f9] transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenPaymentModal(pet, 'Shelter Sponsorship', 1000)}
                    className="flex-1 py-2.5 bg-[#9e421d] hover:bg-[#7e2b07] text-white rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[13px] transition-colors cursor-pointer"
                  >
                    Sponsor (NPR 1K)
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
