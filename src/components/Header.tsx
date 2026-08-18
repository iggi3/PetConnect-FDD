import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenProfile: () => void;
  onOpenVetDesk?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenProfile,
  onOpenVetDesk,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { view: ViewType; label: string; icon?: string }[] = [
    { view: 'home', label: 'Home' },
    { view: 'browse', label: 'Browse Pets' },
    { view: 'categories', label: 'Categories' },
    { view: 'post-ad', label: 'Post Ad' },
    { view: 'about', label: 'About' },
    { view: 'donate', label: 'Donate / Pay', icon: 'volunteer_activism' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fff8f9]/90 backdrop-blur-md shadow-xs transition-all duration-200 border-b border-[#f4dfe6]/80">
      <div className="flex justify-between items-center px-4 md:px-10 py-2.5 w-full max-w-[1280px] mx-auto min-h-[72px]">
        {/* Brand / Logo with playful animated wagging paw & heart */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNav('home')}
          className="font-['Quicksand'] text-[27px] font-bold text-[#5c3325] flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ffe4eb] to-[#ffd4df] border border-[#f8ccd7] shadow-xs group-hover:shadow-md transition-all">
            <motion.span
              animate={{ rotate: [0, -8, 8, -6, 6, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 1.2 }}
              className="material-symbols-outlined text-[24px] text-[#e05d7f]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              pets
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 text-[11px]"
            >
              🐾
            </motion.span>
          </div>
          <div className="flex flex-col">
            <span className="leading-tight tracking-tight flex items-center gap-1">
              PetConnect
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#e05d7f] bg-[#fff0f4] px-1.5 py-0.5 rounded-full border border-[#f8ccd7]">Nepal</span>
            </span>
          </div>
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive =
              currentView === item.view || (item.view === 'browse' && currentView === 'details');
            return (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`relative font-['Plus_Jakarta_Sans'] text-[14px] font-semibold py-1.5 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive ? 'text-[#5c3325]' : 'text-[#5c454d] hover:text-[#e05d7f]'
                }`}
              >
                {item.icon && (
                  <span className="material-symbols-outlined text-[17px] text-[#e05d7f]">
                    {item.icon}
                  </span>
                )}
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e05d7f] to-[#6b3e2e] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Search, Profile, Mobile Menu) */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex items-center bg-[#faebf0] hover:bg-[#f7e3e9] rounded-full px-3.5 py-1.5 border border-[#f4dfe6] focus-within:border-[#e05d7f] focus-within:ring-2 focus-within:ring-[#e05d7f]/20 transition-all">
            <span className="material-symbols-outlined text-[#8c7179] mr-1.5 text-[19px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search pets, breeds..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== 'browse' && e.target.value.trim().length > 0) {
                  onNavigate('browse');
                }
              }}
              className="bg-transparent border-none focus:outline-none p-0 text-[13.5px] text-[#1f1418] w-32 md:w-44 placeholder:text-[#8c7179]"
            />
          </div>

          {/* Live Vet Desk Quick Button */}
          {onOpenVetDesk && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenVetDesk}
              className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] text-[13.5px] font-bold text-[#006a63] bg-[#f0faf8] hover:bg-[#e0f5f2] rounded-full px-3.5 py-2 transition-all cursor-pointer border border-[#b2e5dc] shadow-xs"
              title="Kathmandu Valley Veterinary & Health Guidance Desk"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006a63]">stethoscope</span>
              <span className="hidden lg:inline">Valley Vet Desk</span>
              <span className="w-2 h-2 rounded-full bg-[#006a63] animate-pulse" />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] text-[14px] font-semibold text-[#5c3325] hover:bg-[#fff0f4] rounded-full px-3.5 py-2 transition-colors cursor-pointer border border-[#f8ccd7] shadow-xs"
          >
            <span className="material-symbols-outlined text-[19px] text-[#e05d7f]">person</span>
            <span className="hidden sm:inline">Profile</span>
          </motion.button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#5c3325] p-1.5 rounded-lg hover:bg-[#fff0f4] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#fff8f9] border-b border-[#f4dfe6] px-6 py-4 flex flex-col gap-3 shadow-md overflow-hidden"
          >
            <div className="flex sm:hidden items-center bg-[#faebf0] rounded-full px-3.5 py-2 mb-2 border border-[#f4dfe6]">
              <span className="material-symbols-outlined text-[#8c7179] mr-2 text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search pets, breeds, locations..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentView !== 'browse') onNavigate('browse');
                }}
                className="bg-transparent border-none focus:outline-none w-full text-[14px] text-[#1f1418] placeholder:text-[#8c7179]"
              />
            </div>
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`text-left py-2 font-['Plus_Jakarta_Sans'] font-semibold text-[16px] flex items-center gap-2.5 ${
                  currentView === item.view ? 'text-[#e05d7f] font-bold' : 'text-[#5c454d]'
                }`}
              >
                {item.icon && (
                  <span className="material-symbols-outlined text-[20px] text-[#e05d7f]">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
            {onOpenVetDesk && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVetDesk();
                }}
                className="text-left py-2.5 px-3 rounded-xl bg-[#f0faf8] font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#006a63] flex items-center gap-2.5 border border-[#b2e5dc]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#006a63]">
                  stethoscope
                </span>
                <span>Kathmandu Valley Vet Desk</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-[#006a63] animate-pulse" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
