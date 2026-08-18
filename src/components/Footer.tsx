import React from 'react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
  onOpenLegal: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  return (
    <footer className="bg-[#e6eeff] w-full rounded-t-[32px] mt-auto border-t border-[#dde9ff]">
      <div className="w-full px-4 md:px-10 py-12 flex flex-col md:flex-row justify-between items-start gap-8 max-w-[1280px] mx-auto">
        {/* Brand statement */}
        <div className="flex flex-col gap-3 max-w-sm">
          <button
            onClick={() => onNavigate('home')}
            className="font-['Quicksand'] text-[28px] font-bold text-[#5c3325] flex items-center gap-2 text-left cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[32px] text-[#5c3325]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              pets
            </span>
            PetConnect
          </button>
          <p className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#56423c] leading-relaxed">
            Connecting lovely pets with loving homes. Creating joyful bonds one adoption at a time across Nepal.
          </p>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-wrap gap-12 font-['Plus_Jakarta_Sans']">
          {/* Quick Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-[#0d1c2f] uppercase tracking-wider text-[14px] mb-1">
              Explore
            </h4>
            <button
              onClick={() => onNavigate('home')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left transition-colors cursor-pointer"
            >
              Browse Pets
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left transition-colors cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => onNavigate('post-ad')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left transition-colors cursor-pointer"
            >
              Post an Advertisement
            </button>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-[#0d1c2f] uppercase tracking-wider text-[14px] mb-1">
              Legal
            </h4>
            <button
              onClick={() => onOpenLegal('Privacy Policy')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left hover:underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('Terms of Service')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left hover:underline transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-[#0d1c2f] uppercase tracking-wider text-[14px] mb-1">
              Support
            </h4>
            <button
              onClick={() => onOpenLegal('Contact Us')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left hover:underline transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => onOpenLegal('Help Center')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left hover:underline transition-colors cursor-pointer"
            >
              Help Center
            </button>
            <button
              onClick={() => onOpenLegal('FAQ')}
              className="text-[14px] text-[#56423c] hover:text-[#5c3325] text-left hover:underline transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ddc1b7]/30 px-4 md:px-10 py-5 text-center">
        <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#56423c]">
          © {new Date().getFullYear()} PetConnect Nepal. All rights reserved. Built with love for pets.
        </p>
      </div>
    </footer>
  );
};
