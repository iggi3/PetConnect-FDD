import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pet, BlogArticle, NewsItem, ViewType } from '../types';
import { CATEGORIES_LIST } from '../data/mockData';
import { VetPhoto, DR_AARYA_INFO } from './VetPhoto';

interface HomeViewProps {
  pets: Pet[];
  blogArticles: BlogArticle[];
  newsItems: NewsItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectPet: (pet: Pet) => void;
  onNavigate: (view: ViewType) => void;
  onSelectCategory: (category: string) => void;
  onOpenArticle: (article: BlogArticle) => void;
  onOpenVetDesk?: (topic?: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HomeView: React.FC<HomeViewProps> = ({
  pets,
  blogArticles,
  newsItems,
  favorites,
  onToggleFavorite,
  onSelectPet,
  onNavigate,
  onSelectCategory,
  onOpenArticle,
  onOpenVetDesk,
}) => {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [bellyRubs, setBellyRubs] = useState<number>(142);
  const [boopParticles, setBoopParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const featuredPets = pets.filter((p) => p.featured).slice(0, 6);
  const spotlightPet = pets.find((p) => p.id === 'yuki-japanese-spitz') || pets.find((p) => p.breed.includes('Spitz')) || pets[0];

  const handleBoopSnoot = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBellyRubs((prev) => prev + 1);
    const newId = Date.now();
    setBoopParticles((prev) => [...prev, { id: newId, x, y }]);
    setTimeout(() => {
      setBoopParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 1000);
  };

  const vibeCategories = [
    {
      id: 'snuggle',
      label: '🛋️ Lap Cuddler',
      subtitle: 'Gentle, calm & purr-fect for apartment cozy evenings',
      filter: (p: Pet) => p.cuddleScore && p.cuddleScore >= 90 && p.energyLevel === 'Couch Potato',
    },
    {
      id: 'zoomies',
      label: '⚡ Zoomies & Hikes',
      subtitle: 'Energetic trail companion who loves fetch & long valley walks',
      filter: (p: Pet) => p.playfulnessScore && p.playfulnessScore >= 85,
    },
    {
      id: 'tiny',
      label: '🐾 Tiny Explorer',
      subtitle: 'Playful puppies and kittens ready to grow up with your family',
      filter: (p: Pet) => p.age.includes('Month') || p.age === '1 Year',
    },
    {
      id: 'gentle',
      label: '🌸 Gentle Soul',
      subtitle: 'Calm rescues who thrive with kids, cats & serene homes',
      filter: (p: Pet) => p.goodWithKids === true,
    },
  ];

  const matchedVibePets = selectedVibe
    ? pets.filter((p) => {
        const vibe = vibeCategories.find((v) => v.id === selectedVibe);
        return vibe ? vibe.filter(p) : true;
      })
    : featuredPets;

  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* Hero Section with Delicate Pinkish Touches & Floating Pet Animations */}
      <section className="relative w-full max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20 flex flex-col items-center text-center">
        {/* Soft decorative ambient gradient with floating paw particles & subtle blush warmth */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#faebf0]/90 via-[#fff0f4]/70 to-[#fff8f9] rounded-b-[48px] md:rounded-b-[80px] mx-4 md:mx-0 overflow-hidden border-b border-[#f8ccd7]/50 shadow-inner">
          {/* Animated floating pet elements */}
          <motion.div
            animate={{
              y: [0, -22, 0],
              x: [0, 12, 0],
              rotate: [0, 12, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-10 left-8 md:left-20 text-[#e05d7f]/35 text-4xl md:text-5xl select-none pointer-events-none"
          >
            🐾
          </motion.div>
          <motion.div
            animate={{
              y: [0, 24, 0],
              x: [0, -14, 0],
              rotate: [0, -14, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-16 right-10 md:right-24 text-[#8c533e]/30 text-5xl md:text-6xl select-none pointer-events-none"
          >
            🦴
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-12 right-1/3 text-[#e05d7f]/40 text-3xl select-none pointer-events-none"
          >
            💖
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-10 left-1/3 w-80 h-80 bg-gradient-to-tr from-[#ffd3e0]/40 to-[#ffe4eb]/50 rounded-full blur-3xl pointer-events-none"
          />
        </div>

        {/* Hero badge with pulsating heart & paw */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff0f4] border border-[#f8ccd7] text-[#c44569] text-[13px] font-bold font-['Plus_Jakarta_Sans'] tracking-wide mb-6 shadow-xs"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="material-symbols-outlined text-[18px] text-[#e05d7f]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </motion.span>
          Kathmandu Valley's Pet Adoption & Welfare Network
          <span className="text-[14px]">🐾</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Quicksand'] text-[34px] md:text-[48px] lg:text-[56px] font-bold text-[#1f1418] max-w-3xl leading-[1.15] mb-5 tracking-tight"
        >
          Give a Loving Home.<br />
          <span className="text-[#5c3325] relative inline-block">
            Find Your Forever Best Friend in the Valley.
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="absolute left-0 bottom-1 h-[4.5px] bg-gradient-to-r from-[#e05d7f] to-[#8c533e] rounded-full -z-10 opacity-70"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Plus_Jakarta_Sans'] text-[17px] md:text-[19px] text-[#5c454d] max-w-2xl leading-relaxed mb-8"
        >
          Connect directly with certified shelters, foster heroes, and caring pet parents across Kathmandu, Lalitpur, and Bhaktapur. Every wagging tail has a story.
        </motion.p>

        {/* Call to action buttons with sweet bounce */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('browse')}
            className="bg-gradient-to-r from-[#6b3e2e] to-[#5c3325] hover:from-[#5c3325] hover:to-[#4a271b] text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] px-8 py-4 rounded-full shadow-[0_8px_24px_rgba(92,51,37,0.28)] transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <span className="material-symbols-outlined text-[21px]">search</span>
            <span>Browse Adoptable Pets</span>
            <span className="text-[17px]">🐶</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('post-ad')}
            className="bg-white border-2 border-[#f8ccd7] text-[#1f1418] font-['Plus_Jakarta_Sans'] font-bold text-[16px] px-8 py-4 rounded-full hover:border-[#e05d7f] hover:text-[#5c3325] hover:bg-[#fff8f9] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px] text-[#e05d7f]">add_circle</span>
            <span>Post a Free Pet Ad</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Interactive Pet Personality Matchmaker Quiz Bar */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6">
        <div className="bg-gradient-to-br from-[#fff0f4] via-[#faebf0] to-[#fff8f9] rounded-[32px] p-6 md:p-8 border border-[#f8ccd7] ambient-shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[20px]">✨</span>
                <h3 className="font-['Quicksand'] text-[22px] md:text-[26px] font-bold text-[#1f1418]">
                  Companion Vibe Matcher
                </h3>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d] mt-0.5">
                What kind of companion matches your lifestyle and living space today?
              </p>
            </div>
            {selectedVibe && (
              <button
                onClick={() => setSelectedVibe(null)}
                className="text-[13px] font-bold text-[#e05d7f] hover:underline font-['Plus_Jakarta_Sans'] self-start md:self-auto cursor-pointer"
              >
                Reset Matcher ×
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {vibeCategories.map((vibe) => {
              const isSelected = selectedVibe === vibe.id;
              return (
                <motion.button
                  key={vibe.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedVibe(isSelected ? null : vibe.id)}
                  className={`p-4 rounded-[22px] text-left transition-all cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-white border-[#e05d7f] shadow-md ring-2 ring-[#e05d7f]/20'
                      : 'bg-white/80 border-[#f4dfe6] hover:bg-white hover:border-[#f8ccd7]'
                  }`}
                >
                  <div>
                    <span className="font-['Quicksand'] font-bold text-[16px] text-[#1f1418] block mb-1">
                      {vibe.label}
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-[12.5px] text-[#5c454d] leading-snug">
                      {vibe.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-[12px] font-bold font-['Plus_Jakarta_Sans'] ${
                      isSelected ? 'text-[#e05d7f]' : 'text-[#8c7179]'
                    }`}>
                      {isSelected ? '✓ Matched' : 'Find matches →'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid with Staggered Hover Animations & Subtle Rose Accents */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Quicksand'] text-[22px] font-bold text-[#1f1418] flex items-center gap-2">
            <span>Explore Pet Services & Categories</span>
          </h2>
          <button
            onClick={() => onNavigate('categories')}
            className="text-[13px] font-bold text-[#9e421d] hover:text-[#e05d7f] font-['Plus_Jakarta_Sans'] cursor-pointer"
          >
            All Categories →
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5"
        >
          {CATEGORIES_LIST.map((cat) => (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center justify-center p-3.5 bg-white rounded-[22px] ambient-shadow transition-all group cursor-pointer border border-[#f4dfe6] hover:border-[#f8ccd7] hover:shadow-md"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 rounded-2xl bg-[#fff0f4] flex items-center justify-center mb-2.5 group-hover:bg-[#ffe4eb] transition-colors border border-[#f8ccd7]/50 shadow-xs"
              >
                <span className="material-symbols-outlined text-[#e05d7f] text-[28px]">
                  {cat.icon}
                </span>
              </motion.div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#1f1418] group-hover:text-[#9e421d] transition-colors text-center">
                {cat.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Pet of the Day Spotlight Card with Interactive Belly Rubs */}
      {spotlightPet && (
        <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6">
          <div className="bg-gradient-to-br from-white via-[#fff8f9] to-[#faebf0] rounded-[36px] p-6 md:p-10 border border-[#f8ccd7] ambient-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            {/* Soft pink ambient orb */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffd3e0]/30 rounded-full blur-3xl pointer-events-none" />

            {/* Left Photo with Animated Badge */}
            <div className="lg:col-span-5 relative h-72 md:h-88 rounded-[28px] overflow-hidden shadow-md group">
              <img
                src={spotlightPet.image}
                alt={spotlightPet.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#fff0f4]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#f8ccd7] flex items-center gap-1.5 shadow-sm">
                <span className="text-[14px]">⭐</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#c44569] uppercase tracking-wider">
                  Pet of the Day Spotlight
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-2xl p-3 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">Special Skill</span>
                  <span className="text-[13px] font-medium">{spotlightPet.specialSkill || 'Master of high-fives & snuggle therapy'}</span>
                </div>
                <span className="text-[22px]">🐾</span>
              </div>
            </div>

            {/* Right Pet Stats & Belly Rub Button */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Quicksand'] text-[30px] md:text-[34px] font-bold text-[#1f1418]">
                      Meet {spotlightPet.name}
                    </h3>
                    <span className="text-[22px]">🌸</span>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d]">
                    {spotlightPet.breed} • {spotlightPet.age} • {spotlightPet.location}
                  </p>
                </div>

                <div className="bg-[#fff0f4] px-4 py-2 rounded-2xl border border-[#f8ccd7]">
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8c7179] block uppercase">Adoption Fee</span>
                  <span className="font-['Quicksand'] text-[20px] font-bold text-[#5c3325]">
                    NPR {(spotlightPet.adoptionFee || 1500).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Personality Quirk Chips */}
              <div className="flex flex-wrap gap-2">
                {spotlightPet.personalityTraits?.map((trait, idx) => (
                  <span
                    key={idx}
                    className="bg-white px-3.5 py-1.5 rounded-full text-[13px] font-bold font-['Plus_Jakarta_Sans'] text-[#5c3325] border border-[#f8ccd7] shadow-xs"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Pet Vibe Stat Progress Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/90 p-4 rounded-2xl border border-[#f4dfe6]">
                <div>
                  <div className="flex justify-between text-[12px] font-bold font-['Plus_Jakarta_Sans'] text-[#5c454d] mb-1">
                    <span>🤗 Cuddle Drive</span>
                    <span className="text-[#e05d7f]">98%</span>
                  </div>
                  <div className="w-full h-2 bg-[#faebf0] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8c533e] to-[#e05d7f] w-[98%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[12px] font-bold font-['Plus_Jakarta_Sans'] text-[#5c454d] mb-1">
                    <span>⚡ Playfulness</span>
                    <span className="text-[#e05d7f]">90%</span>
                  </div>
                  <div className="w-full h-2 bg-[#faebf0] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8c533e] to-[#e05d7f] w-[90%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[12px] font-bold font-['Plus_Jakarta_Sans'] text-[#5c454d] mb-1">
                    <span>🍖 Snack Loyalty</span>
                    <span className="text-[#e05d7f]">99%</span>
                  </div>
                  <div className="w-full h-2 bg-[#faebf0] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8c533e] to-[#e05d7f] w-[99%] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Story Note */}
              <p className="font-['Plus_Jakarta_Sans'] text-[14.5px] text-[#5c454d] leading-relaxed">
                "{spotlightPet.rescueStoryNote || spotlightPet.description.slice(0, 140) + '...'}"
              </p>

              {/* Action Buttons: Boop & View Details */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectPet(spotlightPet)}
                  className="px-7 py-3.5 bg-[#5c3325] hover:bg-[#4a271b] text-white font-['Plus_Jakarta_Sans'] font-bold text-[15px] rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Adopt or Meet {spotlightPet.name}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </motion.button>

                {/* Creative Boop Snoot & Belly Rub Counter Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleBoopSnoot}
                  className="relative px-5 py-3.5 bg-gradient-to-r from-[#fff0f4] to-[#faebf0] hover:from-[#ffe4eb] hover:to-[#ffd4df] text-[#c44569] font-['Plus_Jakarta_Sans'] font-bold text-[14px] rounded-full border border-[#f8ccd7] shadow-xs transition-all cursor-pointer flex items-center gap-2 overflow-hidden"
                >
                  <motion.span
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-[18px]"
                  >
                    🐾
                  </motion.span>
                  <span>Boop Snoot ({bellyRubs})</span>

                  {/* Bursting floating particles */}
                  <AnimatePresence>
                    {boopParticles.map((pt) => (
                      <motion.span
                        key={pt.id}
                        initial={{ opacity: 1, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -45, scale: 1.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-[16px] pointer-events-none"
                        style={{ left: pt.x, top: pt.y }}
                      >
                        💖
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Companions with Animated Cards & Personality Badges */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e05d7f] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
              <h2 className="font-['Quicksand'] text-[28px] md:text-[32px] font-bold text-[#1f1418]">
                {selectedVibe ? 'Vibe Matched Companions' : 'Featured Companions'}
              </h2>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d] mt-1">
              Loving dogs, cats, and puppies waiting for a family in Nepal.
            </p>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => onNavigate('browse')}
            className="flex items-center text-[#9e421d] font-['Plus_Jakarta_Sans'] font-bold text-[14px] hover:text-[#e05d7f] cursor-pointer group"
          >
            <span>View all pets</span>
            <span className="material-symbols-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {matchedVibePets.map((pet) => {
            const isFav = favorites.includes(pet.id);
            return (
              <motion.article
                key={pet.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => onSelectPet(pet)}
                className="bg-white rounded-[28px] ambient-shadow overflow-hidden flex flex-col group cursor-pointer border border-[#f4dfe6] hover:border-[#f8ccd7] hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="relative h-64 overflow-hidden bg-[#faebf0]/50">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Favorite button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(pet.id);
                    }}
                    aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    className={`absolute top-4 right-4 backdrop-blur-md rounded-full p-2.5 transition-colors cursor-pointer shadow-md ${
                      isFav
                        ? 'bg-white text-[#c44569]'
                        : 'bg-white/85 text-[#1f1418] hover:text-[#e05d7f]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </motion.button>

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span
                      className={`font-['Plus_Jakarta_Sans'] text-[12px] font-bold px-3.5 py-1 rounded-full backdrop-blur-md shadow-sm ${
                        pet.status === 'Adoption'
                          ? 'bg-[#fff0f4] text-[#c44569] border border-[#f8ccd7]'
                          : pet.status === 'Foster'
                          ? 'bg-[#8bf1e6] text-[#006f67]'
                          : 'bg-[#faebf0] text-[#1f1418]'
                      }`}
                    >
                      {pet.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-['Quicksand'] text-[24px] font-bold text-[#1f1418] group-hover:text-[#9e421d] transition-colors">
                      {pet.name}
                    </h3>
                    {pet.adoptionFee && (
                      <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#9e421d] bg-[#fff0f4] px-2.5 py-0.5 rounded-full border border-[#f8ccd7]">
                        NPR {pet.adoptionFee.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Personality Traits Highlights */}
                  {pet.personalityTraits && pet.personalityTraits.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pet.personalityTraits.slice(0, 2).map((trait, i) => (
                        <span key={i} className="text-[11.5px] font-semibold text-[#5c454d] bg-[#faebf0] px-2.5 py-0.5 rounded-full">
                          {trait}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#fff8f9] font-['Plus_Jakarta_Sans'] text-[12px] font-semibold text-[#5c454d] px-3 py-1 rounded-full border border-[#f4dfe6]">
                      {pet.breed}
                    </span>
                    <span className="bg-[#fff8f9] font-['Plus_Jakarta_Sans'] text-[12px] font-semibold text-[#5c454d] px-3 py-1 rounded-full border border-[#f4dfe6]">
                      {pet.age}
                    </span>
                    <span className="bg-[#fff8f9] font-['Plus_Jakarta_Sans'] text-[12px] font-semibold text-[#5c454d] px-3 py-1 rounded-full border border-[#f4dfe6]">
                      {pet.gender}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center text-[#5c454d] font-['Plus_Jakarta_Sans'] text-[14px]">
                    <span className="material-symbols-outlined text-sm mr-1 text-[#e05d7f]">
                      location_on
                    </span>
                    {pet.location}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* Japanese Spitz & Valley Pet Mascot Animated Parallax Showcase */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-r from-[#faebf0] via-[#fff0f4] to-[#faebf0] rounded-[36px] md:rounded-[48px] p-8 md:p-14 text-center flex flex-col items-center relative overflow-hidden border-2 border-[#f8ccd7] shadow-md"
        >
          {/* Animated decorative paw orbits */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-[#ffd3e0]/35 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#ff8c61]/25 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            {/* Mascot Avatar Cluster with Japanese Spitz, Golden Retriever, Persian & Indie Rescues */}
            <div className="flex items-center justify-center -space-x-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#fff0f4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1590419690008-905895e8fe0d?auto=format&fit=crop&w=200&q=80"
                  alt="Japanese Spitz"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80';
                  }}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#e05d7f] shadow-lg ring-4 ring-[#fff0f4] bg-[#fff0f4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=200&q=80"
                  alt="White Puppy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80';
                  }}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#fff0f4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80"
                  alt="Persian Cat"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=200&q=80';
                  }}
                />
              </motion.div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#5c3325] border border-[#f8ccd7] text-[12.5px] font-bold font-['Plus_Jakarta_Sans'] shadow-xs mb-3">
              <span>❄️ Japanese Spitz, Golden Retrievers, Persian Cats & Indie Rescues</span>
            </div>

            <h2 className="font-['Quicksand'] text-[28px] md:text-[40px] font-bold text-[#1f1418] mb-4">
              Open Your Heart & Home to a Pet in Kathmandu Valley
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-[16px] md:text-[18px] text-[#5c454d] mb-8 leading-relaxed">
              Every day, lovely dogs, fluffy Japanese Spitz puppies, and calm cats are sheltered across Kathmandu, Patan, and Bhaktapur. Post an ad, foster a healing pet, or welcome one into your home today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('post-ad')}
                className="bg-[#5c3325] hover:bg-[#4a271b] text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] px-10 py-4 rounded-full shadow-[0_8px_24px_rgba(92,51,37,0.3)] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                Post a Free Ad Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('browse')}
                className="bg-white hover:bg-[#fff0f4] text-[#c44569] border-2 border-[#f8ccd7] font-['Plus_Jakarta_Sans'] font-bold text-[16px] px-8 py-4 rounded-full shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] text-[#e05d7f]">pets</span>
                Explore All Breeds
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Kathmandu Valley Veterinary Health & Wellness Desk - Featuring Dr. Shreya Karki */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#ffffff] via-[#fff8f9] to-[#f0faf8] rounded-[36px] p-6 md:p-10 border-2 border-[#f4dfe6] ambient-shadow relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        >
          {/* Left: Dr. Shreya's Professional Portrait Frame */}
          <div className="flex flex-col items-center text-center shrink-0">
            <VetPhoto size="lg" showBadge={true} />
            <div className="mt-3">
              <span className="font-['Quicksand'] text-[18px] font-bold text-[#1f1418] block">
                {DR_AARYA_INFO.name}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#006a63] uppercase tracking-wider block">
                {DR_AARYA_INFO.qualifications}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8c7179] block mt-0.5">
                {DR_AARYA_INFO.affiliation}
              </span>
            </div>
            {/* Live Indicator */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0faf8] border border-[#b2e5dc] text-[11px] font-bold text-[#006a63]">
              <span className="w-2 h-2 rounded-full bg-[#006a63] animate-pulse" />
              <span>Available for Valley Adoption Triage</span>
            </div>
          </div>

          {/* Right: Info & Interactive Action Cards */}
          <div className="flex-1 flex flex-col gap-5 text-center lg:text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0f4] text-[#c44569] border border-[#f8ccd7] text-[12px] font-bold uppercase tracking-wider mb-2">
                <span className="text-[14px]">🩺</span>
                Kathmandu Valley Veterinary & Pet Health Pillar
              </div>
              <h2 className="font-['Quicksand'] text-[26px] md:text-[34px] font-bold text-[#1f1418] leading-tight">
                Verified Health Screening & Free Veterinary Triage
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d] mt-2 leading-relaxed max-w-2xl">
                Every adoptable pet across Kathmandu, Lalitpur, and Bhaktapur is backed by verified medical protocols. Consult Dr. Shreya for rabies timelines, monsoon skin care, and tailored Indie nutrition.
              </p>
            </div>

            {/* 3 Quick Benefit Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white rounded-2xl border border-[#f4dfe6] flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-[#006a63]/10 text-[#006a63] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">vaccines</span>
                </div>
                <div>
                  <span className="text-[12px] font-bold text-[#1f1418] block">Rabies & Core</span>
                  <span className="text-[11px] text-[#8c7179] block">Verified schedules</span>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#f4dfe6] flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-[#e05d7f]/10 text-[#e05d7f] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">healing</span>
                </div>
                <div>
                  <span className="text-[12px] font-bold text-[#1f1418] block">Pre-Adoption Check</span>
                  <span className="text-[11px] text-[#8c7179] block">100% Free Triage</span>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#f4dfe6] flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-[#9e421d]/10 text-[#9e421d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">emergency</span>
                </div>
                <div>
                  <span className="text-[12px] font-bold text-[#1f1418] block">24/7 Hotlines</span>
                  <span className="text-[11px] text-[#8c7179] block">KTM, Patan & Bhaktapur</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenVetDesk?.()}
                className="px-6 py-3 rounded-2xl bg-[#006a63] hover:bg-[#00524c] text-white font-['Plus_Jakarta_Sans'] font-bold text-[14px] shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">stethoscope</span>
                <span>Open Valley Vet Desk & Care Guides</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenVetDesk?.('vaccine')}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-[#fff0f4] text-[#c44569] font-['Plus_Jakarta_Sans'] font-bold text-[14px] border border-[#f8ccd7] flex items-center gap-2 cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-[#e05d7f]">menu_book</span>
                <span>Vaccine & Diet Guide</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pet Care Blog with animated hover */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-['Quicksand'] text-[28px] md:text-[32px] font-bold text-[#1f1418]">
              Kathmandu Valley Pet Care Guides
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d] mt-1">
              Essential monsoon tips, high-nutrition advice, and 24/7 vet directories in the Valley.
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {blogArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              onClick={() => onOpenArticle(article)}
              className="bg-white rounded-[26px] border border-[#f4dfe6] overflow-hidden flex flex-col group cursor-pointer ambient-shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="h-40 bg-gradient-to-tr from-[#fff0f4] to-[#faebf0] flex items-center justify-center group-hover:from-[#ffe4eb] group-hover:to-[#ffd4df] transition-colors relative overflow-hidden">
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="material-symbols-outlined text-5xl text-[#e05d7f] transition-colors"
                >
                  {article.icon}
                </motion.span>
                {article.readTime && (
                  <span className="absolute bottom-3 right-3 text-[11px] font-bold bg-white/90 px-2.5 py-1 rounded-full text-[#5c454d] border border-[#f8ccd7]">
                    {article.readTime}
                  </span>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-['Quicksand'] text-[20px] font-bold text-[#1f1418] mb-2 group-hover:text-[#9e421d] transition-colors">
                  {article.title}
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[14.5px] text-[#5c454d] mb-4 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
                <div className="mt-auto flex items-center text-[#8c7179] font-['Plus_Jakarta_Sans'] text-[13px]">
                  <span>{article.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Community News with Sweet Tag Badges */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-10 bg-[#faebf0]/70 rounded-[36px] mb-12 border border-[#f8ccd7]">
        <div className="text-center mb-8">
          <h2 className="font-['Quicksand'] text-[28px] md:text-[32px] font-bold text-[#1f1418]">
            Kathmandu Valley Animal Welfare News
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d] mt-1">
            Rabies vaccination drives, community rescues, and adoption fairs across Kathmandu, Lalitpur & Bhaktapur.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {newsItems.map((news) => (
            <motion.div
              key={news.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex gap-4 p-6 bg-white rounded-[24px] ambient-shadow border border-[#f4dfe6] transition-all"
            >
              <div className="w-18 h-18 bg-[#fff0f4] rounded-[20px] shrink-0 flex items-center justify-center text-[#e05d7f] border border-[#f8ccd7]">
                <span className="material-symbols-outlined text-[32px]">{news.icon}</span>
              </div>
              <div className="flex flex-col">
                {news.tag && (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#e05d7f] mb-1">
                    {news.tag}
                  </span>
                )}
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#1f1418] mb-1">
                  {news.title}
                </h4>
                <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d] leading-relaxed">
                  {news.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Partner Shelters and Verified Clinics */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 border-t border-[#f4dfe6] mb-12">
        <div className="text-center mb-6">
          <p className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#8c7179] tracking-wider uppercase">
            Partnering with verified shelters & clinics across Kathmandu Valley
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-90">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-2 font-['Quicksand'] text-[#1f1418] cursor-default"
          >
            <span className="material-symbols-outlined text-[26px] text-[#e05d7f]">
              volunteer_activism
            </span>
            <span className="text-[16px] font-bold">Kathmandu Animal Rescue (Baneshwor)</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-2 font-['Quicksand'] text-[#1f1418] cursor-default"
          >
            <span className="material-symbols-outlined text-[26px] text-[#006a63]">
              healing
            </span>
            <span className="text-[16px] font-bold">Patan Animal Welfare (Jhamsikhel)</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-2 font-['Quicksand'] text-[#1f1418] cursor-default"
          >
            <span className="material-symbols-outlined text-[26px] text-[#9e421d]">
              home_work
            </span>
            <span className="text-[16px] font-bold">Bhaktapur Heritage Pets (Suryabinayak)</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-2 font-['Quicksand'] text-[#1f1418] cursor-default"
          >
            <span className="material-symbols-outlined text-[26px] text-[#6b21a8]">
              pets
            </span>
            <span className="text-[16px] font-bold">Boudha Community Vet</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
