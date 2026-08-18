import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pet } from '../types';
import { VetPhoto, DR_AARYA_INFO } from './VetPhoto';

interface PetDetailsViewProps {
  pet: Pet;
  onBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenContactModal: (pet: Pet) => void;
  onOpenPaymentModal: (pet: Pet, purpose: 'Adoption Fee' | 'Shelter Sponsorship', amount: number) => void;
  onOpenVetDesk?: (topic?: string) => void;
}

export const PetDetailsView: React.FC<PetDetailsViewProps> = ({
  pet,
  onBack,
  favorites,
  onToggleFavorite,
  onOpenContactModal,
  onOpenPaymentModal,
  onOpenVetDesk,
}) => {
  const isFav = favorites.includes(pet.id);
  const [activeImage, setActiveImage] = useState<string>(pet.image);
  const [bellyRubs, setBellyRubs] = useState<number>(pet.bellyRubsCount || 78);
  const [boopParticles, setBoopParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleBoopSnoot = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBellyRubs((prev) => prev + 1);
    const newId = Date.now();
    setBoopParticles((prev) => [...prev, { id: newId, x, y }]);
    setTimeout(() => {
      setBoopParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 900);
  };

  const galleryPhotos = pet.galleryImages && pet.galleryImages.length > 0
    ? [pet.image, ...pet.galleryImages]
    : [
        pet.image,
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDDfF6ziqyx6XWLW-fTC8r24JXiYUM6Sxqv4QiDiQyw1H2iBHj5HPOFMBoMx_p2SSSCYgRLsklG7a90OOt6jMj8Gx2VNxOtkw8V5xF4qjv91eWivo4_KGNnW2GQzZya7HQHi83d3tBUAxn5tsP7auFXqYE3veiBlzQv7JsPq2L392-4WXDiaKhbAx5yjTqG31QW-cVS88fSHa2P04MYiR10oJauLZZobbIyLP4HdcQ3G1GknpkSQezv',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAkx_yiKKaD76dqHZpADSGYarDJWhqFW6KnoYptJC5U89rZWvy1Rf8OxyIdPsgF1njyTDcuttNnRM9optMQvZqXJGwPIROAddpPfm7HSAlcvKf6IeQWq80Ci2J6NjuzGl_7SU8UwEegV_VCAJLmf0zYuh4aqc8Xr2qckx1TZugU8dchvPoh29NGDU9ULJjfIALPudTyovKTN-mQLeR-dYr-UeL0AJVJfGjmwrY0DhNjoCqaM626VHWv',
      ];

  const cuddleVal = pet.cuddleScore || 95;
  const playfulnessVal = pet.playfulnessScore || 85;
  const snackVal = pet.snackDriveScore || 92;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6"
    >
      {/* Breadcrumb with hover slide */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[14px] font-bold text-[#5c454d] hover:text-[#e05d7f] mb-6 cursor-pointer group"
      >
        <span className="material-symbols-outlined text-[20px] transition-transform">
          arrow_back
        </span>
        Back to Browse Pets
      </motion.button>

      {/* Main Grid: Left Photos, Quirk Matrix, and Story / Right Sidebar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Photos Bento Grid with subtle pink border glow */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Big Main Image (7 cols) */}
            <div className="md:col-span-7 relative h-72 md:h-[420px] rounded-[32px] overflow-hidden ambient-shadow bg-[#faebf0]/50 border border-[#f8ccd7]/60">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0.6, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.4 }}
                  src={activeImage}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Status & Featured Badges */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-[#fff0f4]/95 text-[#c44569] border border-[#f8ccd7] font-['Plus_Jakarta_Sans'] text-[12px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-md">
                  <span className="material-symbols-outlined text-[16px] text-[#e05d7f]">
                    volunteer_activism
                  </span>
                  {pet.status}
                </span>
                {pet.featured && (
                  <span className="bg-[#ff8c61] text-[#4d1900] font-['Plus_Jakarta_Sans'] text-[12px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    Featured Pet
                  </span>
                )}
              </div>
            </div>

            {/* Two Side Images Stacked Vertically (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {galleryPhotos.slice(1, 3).map((imgUrl, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`h-40 md:h-[202px] rounded-[28px] overflow-hidden ambient-shadow cursor-pointer border-2 transition-all ${
                    activeImage === imgUrl
                      ? 'border-[#e05d7f] ring-2 ring-[#ffd3e0]'
                      : 'border-transparent hover:opacity-95'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${pet.name} photo ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Title, Boop Snoot & Metadata Bar */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="font-['Quicksand'] text-[32px] md:text-[40px] font-bold text-[#1f1418] leading-tight flex items-center gap-2">
                <span>{pet.title || `${pet.name} Looking for a Loving Home`}</span>
              </h1>

              {/* Live Interactive Boop Snoot & Belly Rubs Button */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleBoopSnoot}
                className="relative shrink-0 px-5 py-2.5 bg-gradient-to-r from-[#fff0f4] to-[#faebf0] hover:from-[#ffe4eb] hover:to-[#ffd4df] text-[#c44569] font-['Plus_Jakarta_Sans'] font-bold text-[14px] rounded-full border border-[#f8ccd7] shadow-xs transition-all cursor-pointer flex items-center gap-2 overflow-hidden self-start sm:self-auto"
              >
                <motion.span
                  animate={{ rotate: [0, -12, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="text-[19px]"
                >
                  🐾
                </motion.span>
                <span>Boop & Belly Rubs ({bellyRubs})</span>

                {/* Floating Love Particles */}
                <AnimatePresence>
                  {boopParticles.map((pt) => (
                    <motion.span
                      key={pt.id}
                      initial={{ opacity: 1, y: 0, scale: 0.6 }}
                      animate={{ opacity: 0, y: -45, scale: 1.3 }}
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

            <div className="flex flex-wrap items-center gap-4">
              {/* Circular Favorite Button with bouncing pop */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => onToggleFavorite(pet.id)}
                aria-label="Save to favorites"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isFav
                    ? 'bg-[#fff0f4] text-[#c44569] border-[#f8ccd7] shadow-sm'
                    : 'bg-white text-[#5c454d] border-[#f4dfe6] hover:text-[#e05d7f]'
                }`}
              >
                <motion.span
                  animate={{ scale: isFav ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </motion.span>
              </motion.button>

              {/* Meta items */}
              <div className="flex flex-wrap items-center gap-6 font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#e05d7f] text-[20px]">
                    pets
                  </span>
                  {pet.petType}s
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#e05d7f] text-[20px]">
                    location_on
                  </span>
                  {pet.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#e05d7f] text-[20px]">
                    calendar_today
                  </span>
                  {pet.postedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Creative Pet Personality & Vibe Breakdown */}
          <div className="bg-gradient-to-br from-[#fff0f4] via-[#faebf0] to-[#fff8f9] rounded-[32px] p-6 md:p-8 ambient-shadow border border-[#f8ccd7] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['Quicksand'] text-[24px] font-bold text-[#1f1418] flex items-center gap-2">
                <span>{pet.name}'s Personality & Quirks</span>
                <span className="text-[20px]">✨</span>
              </h2>
              {pet.personalityTraits && (
                <span className="text-[12px] font-bold text-[#c44569] uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-[#f8ccd7]">
                  Verified Vibe
                </span>
              )}
            </div>

            {/* Personality Quirks Tags */}
            <div className="flex flex-wrap gap-2">
              {pet.personalityTraits?.map((trait, i) => (
                <span
                  key={i}
                  className="bg-white px-4 py-2 rounded-full text-[13.5px] font-bold font-['Plus_Jakarta_Sans'] text-[#9e421d] border border-[#f8ccd7] shadow-xs"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Pet Stat Animated Bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/80 p-5 rounded-[24px] border border-[#f4dfe6]">
              {/* Cuddle Score */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[13px] font-bold font-['Plus_Jakarta_Sans'] text-[#1f1418]">
                  <span>🤗 Snuggle Level</span>
                  <span className="text-[#e05d7f]">{cuddleVal}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebf0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cuddleVal}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#ff8c61] to-[#e05d7f] rounded-full"
                  />
                </div>
                <span className="text-[11.5px] text-[#5c454d]">Always ready for chin scratches</span>
              </div>

              {/* Energy Level */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[13px] font-bold font-['Plus_Jakarta_Sans'] text-[#1f1418]">
                  <span>⚡ Playfulness</span>
                  <span className="text-[#e05d7f]">{playfulnessVal}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebf0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${playfulnessVal}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#ff8c61] to-[#e05d7f] rounded-full"
                  />
                </div>
                <span className="text-[11.5px] text-[#5c454d]">{pet.energyLevel || 'Moderate & Playful'}</span>
              </div>

              {/* Snack Loyalty */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[13px] font-bold font-['Plus_Jakarta_Sans'] text-[#1f1418]">
                  <span>🍖 Snack Dedication</span>
                  <span className="text-[#e05d7f]">{snackVal}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#faebf0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${snackVal}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#ff8c61] to-[#e05d7f] rounded-full"
                  />
                </div>
                <span className="text-[11.5px] text-[#5c454d]">Learns any trick for tasty bites</span>
              </div>
            </div>

            {/* Favorite Things */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-[#f4dfe6] flex items-center gap-3">
                <span className="text-[26px]">🦴</span>
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#8c7179] block">Favorite Snack</span>
                  <span className="text-[13.5px] font-bold text-[#1f1418]">{pet.favoriteSnack || 'Yak Cheese (Chhurpi)'}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#f4dfe6] flex items-center gap-3">
                <span className="text-[26px]">🎾</span>
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#8c7179] block">Favorite Toy</span>
                  <span className="text-[13.5px] font-bold text-[#1f1418]">{pet.favoriteToy || 'Squeaky Tennis Ball'}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#f4dfe6] flex items-center gap-3">
                <span className="text-[26px]">⭐</span>
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#8c7179] block">Special Talent</span>
                  <span className="text-[13.5px] font-bold text-[#1f1418]">{pet.specialSkill || 'Gentle snoot boops'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* "At a Glance" Card with interactive hover tiles */}
          <div className="bg-[#faebf0]/60 rounded-[32px] p-6 md:p-8 ambient-shadow border border-[#f8ccd7] flex flex-col gap-6">
            <h2 className="font-['Quicksand'] text-[24px] font-bold text-[#1f1418]">
              At a Glance
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Pet Type Tile */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white p-5 rounded-[24px] flex flex-col items-center text-center gap-2 ambient-shadow border border-[#f4dfe6] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#fff0f4] flex items-center justify-center text-[#e05d7f] border border-[#f8ccd7]">
                  <span className="material-symbols-outlined text-[26px]">pets</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#5c454d]">
                  Pet Type
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#1f1418]">
                  {pet.petType}
                </span>
              </motion.div>

              {/* Breed Tile */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white p-5 rounded-[24px] flex flex-col items-center text-center gap-2 ambient-shadow border border-[#f4dfe6] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#fff0f4] flex items-center justify-center text-[#e05d7f] border border-[#f8ccd7]">
                  <span className="material-symbols-outlined text-[26px]">info</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#5c454d]">
                  Breed
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#1f1418] truncate max-w-full">
                  {pet.breed}
                </span>
              </motion.div>

              {/* Age Tile */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white p-5 rounded-[24px] flex flex-col items-center text-center gap-2 ambient-shadow border border-[#f4dfe6] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#fff0f4] flex items-center justify-center text-[#e05d7f] border border-[#f8ccd7]">
                  <span className="material-symbols-outlined text-[26px]">cake</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#5c454d]">
                  Age
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#1f1418]">
                  {pet.age}
                </span>
              </motion.div>

              {/* Gender Tile */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white p-5 rounded-[24px] flex flex-col items-center text-center gap-2 ambient-shadow border border-[#f4dfe6] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#fff0f4] flex items-center justify-center text-[#e05d7f] border border-[#f8ccd7]">
                  <span className="material-symbols-outlined text-[26px]">male</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#5c454d]">
                  Gender
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#1f1418]">
                  {pet.gender}
                </span>
              </motion.div>
            </div>

            {/* Health & Passport Trait Chips */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {pet.vaccinated !== false && (
                <span className="bg-[#fff0f4] text-[#c44569] font-['Plus_Jakarta_Sans'] text-[13px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 border border-[#f8ccd7] shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#e05d7f]">check_circle</span>
                  Rabies Vaccinated
                </span>
              )}
              {pet.microchipped && (
                <span className="bg-[#fff0f4] text-[#c44569] font-['Plus_Jakarta_Sans'] text-[13px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 border border-[#f8ccd7] shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#e05d7f]">qr_code</span>
                  Microchipped
                </span>
              )}
              {pet.neutered && (
                <span className="bg-[#fff0f4] text-[#c44569] font-['Plus_Jakarta_Sans'] text-[13px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 border border-[#f8ccd7] shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#e05d7f]">health_and_safety</span>
                  Spayed / Neutered
                </span>
              )}
              {pet.goodWithKids !== false && (
                <span className="bg-white text-[#1f1418] font-['Plus_Jakarta_Sans'] text-[13px] font-bold px-4 py-2 rounded-full border border-[#f4dfe6] flex items-center gap-1.5 shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#e05d7f]">family_restroom</span>
                  Good with Kids
                </span>
              )}
              {pet.houseTrained && (
                <span className="bg-white text-[#1f1418] font-['Plus_Jakarta_Sans'] text-[13px] font-bold px-4 py-2 rounded-full border border-[#f4dfe6]">
                  🏡 House Trained
                </span>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-[32px] p-6 md:p-8 ambient-shadow border border-[#f4dfe6] flex flex-col gap-4">
            <h3 className="font-['Quicksand'] text-[24px] font-bold text-[#1f1418]">
              Meet {pet.name}
            </h3>
            <div className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#5c454d] leading-relaxed space-y-4 whitespace-pre-line">
              {pet.description}
            </div>
          </div>
        </div>

        {/* Right Column: Shelter Card, Online Payment & Safety Tips */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Shelter Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-[32px] p-6 md:p-8 ambient-shadow border border-[#f4dfe6] flex flex-col items-center text-center gap-6"
          >
            {/* Shelter Doctor Avatar with pulsing status indicator */}
            <div className="relative">
              <img
                src={pet.shelterAvatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0cJ6BBQj6rzpkTYLCuNDt-OFw21t6uHKukYyVTe1N-dOQI_30BghYybinReEuOydRod4-ntb-sNCS0DbXLiysR1FfAMPbcOo-ct8NiQZjgepe7HP3lEDdl_Z7ZxEO5I67l7OPWG0WeGOCzT2rZCEAIQATS1xdp8S-OZlTCyIVRoSb8iRyTZEuaeG-Xyn8KTRHjihBxxsyeqH-oWmY0uJllq9mLsdOhX54CfBxw5IqyQhjYOkTw0T0'}
                alt={pet.shelterName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#fff0f4] shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#e05d7f] border-2 border-white rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              </span>
            </div>

            <div>
              <h3 className="font-['Quicksand'] text-[26px] font-bold text-[#1f1418]">
                {pet.shelterName}
              </h3>
              {pet.verifiedShelter && (
                <div className="flex items-center justify-center gap-1.5 font-['Plus_Jakarta_Sans'] text-[14px] font-bold text-[#c44569] mt-1">
                  <span className="material-symbols-outlined text-[18px] text-[#e05d7f]">
                    verified
                  </span>
                  Verified Shelter Partner
                </div>
              )}
            </div>

            {/* Phone Pill Container */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              href={`tel:${pet.contactPhone}`}
              className="w-full flex items-center gap-3.5 bg-[#fff8f9] hover:bg-[#fff0f4] px-4 py-3.5 rounded-[20px] transition-colors text-left border border-[#f4dfe6]"
            >
              <div className="w-10 h-10 rounded-full bg-[#ff8c61] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8c7179] uppercase tracking-wider">
                  Phone
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#1f1418]">
                  {pet.contactPhone}
                </span>
              </div>
            </motion.a>

            {/* Email Pill Container */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              href={`mailto:${pet.contactEmail}`}
              className="w-full flex items-center gap-3.5 bg-[#fff8f9] hover:bg-[#fff0f4] px-4 py-3.5 rounded-[20px] transition-colors text-left border border-[#f4dfe6]"
            >
              <div className="w-10 h-10 rounded-full bg-[#ff8c61] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8c7179] uppercase tracking-wider">
                  Email
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold text-[#1f1418] truncate">
                  {pet.contactEmail}
                </span>
              </div>
            </motion.a>

            {/* Contact Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenContactModal(pet)}
              className="w-full py-4 bg-[#9e421d] hover:bg-[#7e2b07] text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              Contact Advertiser
            </motion.button>

            {/* Online Payment Option for Adoption & Medical Support */}
            <div className="w-full pt-4 border-t border-[#f4dfe6] flex flex-col gap-2.5">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenPaymentModal(pet, 'Adoption Fee', pet.adoptionFee || 1500)}
                className="w-full py-3.5 bg-[#ff8c61] hover:bg-[#ff7a4a] text-[#4d1900] font-['Plus_Jakarta_Sans'] font-bold text-[15px] rounded-full shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">payments</span>
                Pay Adoption Fee (NPR {(pet.adoptionFee || 1500).toLocaleString()})
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenPaymentModal(pet, 'Shelter Sponsorship', 1000)}
                className="w-full py-2.5 bg-[#fff0f4] hover:bg-[#ffe4eb] text-[#c44569] font-['Plus_Jakarta_Sans'] font-bold text-[13.5px] rounded-full border border-[#f8ccd7] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px] text-[#e05d7f]">favorite</span>
                Sponsor {pet.name}'s Care (NPR 1,000)
              </motion.button>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#8c7179]">
              Typically replies within a few hours.
            </p>
          </motion.div>

          {/* Dr. Shreya Karki Valley Veterinary Health Verification Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-gradient-to-br from-white via-[#fff8f9] to-[#f0faf8] rounded-[32px] p-6 ambient-shadow border-2 border-[#b2e5dc] flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="flex items-center gap-3.5">
              <VetPhoto size="sm" showBadge={false} />
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#006a63] bg-[#f0faf8] px-2 py-0.5 rounded-md border border-[#b2e5dc]">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Health Protocol Verified
                </span>
                <h4 className="font-['Quicksand'] text-[16px] font-bold text-[#1f1418] mt-0.5">
                  {DR_AARYA_INFO.name}
                </h4>
                <p className="font-['Plus_Jakarta_Sans'] text-[11.5px] text-[#8c7179]">
                  {DR_AARYA_INFO.qualifications} • Kathmandu Lead Vet
                </p>
              </div>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#5c454d] leading-relaxed">
              "{pet.name} has undergone community health checks. Pre-adoption rabies verification and deworming status are valid."
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenVetDesk?.(`ask-${pet.name}`)}
              className="w-full py-2.5 bg-[#f0faf8] hover:bg-[#e0f5f2] text-[#006a63] font-['Plus_Jakarta_Sans'] font-bold text-[13px] rounded-xl border border-[#b2e5dc] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">stethoscope</span>
              Ask Vet About {pet.name}'s Health
            </motion.button>
          </motion.div>

          {/* Safety Tips Card with Rosewood Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#faebf0]/70 rounded-[32px] p-6 md:p-8 ambient-shadow border border-[#f8ccd7] flex flex-col gap-4"
          >
            <h4 className="font-['Quicksand'] text-[18px] font-bold text-[#1f1418] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e05d7f] text-[22px]">
                shield
              </span>
              Adoption & Safety Tips
            </h4>
            <ul className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#5c454d] space-y-2.5 list-disc pl-5">
              <li>Meet the pet in a safe, public or shelter setting.</li>
              <li>Spend 15-20 minutes playing and assessing temperament.</li>
              <li>Ask for verified rabies vaccination & deworming cards.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
