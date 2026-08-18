import React, { useState, useEffect, useRef } from 'react';

interface VetPhotoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  imageUrl?: string;
  allowUpload?: boolean;
}

export const DR_SHREYA_INFO = {
  name: 'Dr. Shreya Karki',
  qualifications: 'BVSc & AH (HICAST), PGD Small Animal Medicine',
  role: 'Chief Veterinary Officer & Welfare Director',
  affiliation: 'Kathmandu Valley Animal Welfare Network',
  experience: '7+ Years in Small Animal Medicine & Rescue Triage',
  clinicLocation: 'Baluwatar & Jhamsikhel, Kathmandu Valley',
  emergencyPhone: '+977 984-1234567',
  verifiedBadge: 'Verified Valley Vet #NP-VET-4491',
};

// Aliased for seamless compatibility
export const DR_AARYA_INFO = DR_SHREYA_INFO;

export const VetPhoto: React.FC<VetPhotoProps> = ({
  className = '',
  size = 'lg',
  showBadge = true,
  imageUrl,
  allowUpload = true,
}) => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(() => {
    return imageUrl || localStorage.getItem('dr_shreya_photo_url') || '/dr-shreya.png';
  });
  const [imgLoadFailed, setImgLoadFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('dr_shreya_photo_url');
      if (saved) {
        setPhotoSrc(saved);
        setImgLoadFailed(false);
      }
    };
    window.addEventListener('dr_shreya_photo_updated', handleStorageChange);
    return () => {
      window.removeEventListener('dr_shreya_photo_updated', handleStorageChange);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          localStorage.setItem('dr_shreya_photo_url', result);
          setPhotoSrc(result);
          setImgLoadFailed(false);
          window.dispatchEvent(new Event('dr_shreya_photo_updated'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-36 h-36 md:w-44 md:h-44',
    xl: 'w-48 h-48 md:w-64 md:h-64',
  };

  return (
    <div className={`relative inline-block group ${className}`}>
      {/* Hidden file input for quick direct upload */}
      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {/* Outer gradient glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#e05d7f]/40 via-[#f8ccd7]/50 to-[#006a63]/30 rounded-3xl blur-sm" />

      {/* Main Image Container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-[#faebf0] flex items-center justify-center`}
      >
        {photoSrc && !imgLoadFailed ? (
          <img
            src={photoSrc}
            alt={DR_SHREYA_INFO.name}
            referrerPolicy="no-referrer"
            onError={() => setImgLoadFailed(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          /* High-Fidelity SVG Portrait matching Dr. Shreya Karki's uploaded photo */
          <svg
            viewBox="0 0 400 480"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="clinicBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8eff5" />
                <stop offset="60%" stopColor="#dce8f0" />
                <stop offset="100%" stopColor="#cbdce8" />
              </linearGradient>

              <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f7d4c3" />
                <stop offset="45%" stopColor="#eabda4" />
                <stop offset="100%" stopColor="#dba58c" />
              </linearGradient>

              <linearGradient id="darkHair" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1418" />
                <stop offset="60%" stopColor="#251a21" />
                <stop offset="100%" stopColor="#140f12" />
              </linearGradient>

              <linearGradient id="navyScrubs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#132742" />
              </linearGradient>

              <linearGradient id="whiteCoat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f4f6f8" />
                <stop offset="100%" stopColor="#e6ebf0" />
              </linearGradient>

              <linearGradient id="stethoscopeMetal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Background: Modern Bright Clinic */}
            <rect width="400" height="480" fill="url(#clinicBg)" />

            {/* Clinic Shelf & Pet Poster in background (soft blur ambiance) */}
            <rect x="20" y="30" width="80" height="110" rx="6" fill="#ffffff" opacity="0.6" />
            <circle cx="55" cy="65" r="8" fill="#3b82f6" opacity="0.35" />
            <circle cx="43" cy="53" r="4.5" fill="#3b82f6" opacity="0.3" />
            <circle cx="67" cy="53" r="4.5" fill="#3b82f6" opacity="0.3" />
            <circle cx="37" cy="68" r="4" fill="#3b82f6" opacity="0.3" />
            <circle cx="73" cy="68" r="4" fill="#3b82f6" opacity="0.3" />

            {/* Little plant & shelves on clinic background */}
            <rect x="300" y="40" width="80" height="260" rx="4" fill="#ffffff" opacity="0.45" />
            <rect x="315" y="140" width="45" height="30" rx="3" fill="#cbd5e1" opacity="0.6" />
            <path d="M335 140 Q320 120 310 125 Q325 135 335 140 Z" fill="#22c55e" opacity="0.4" />
            <path d="M335 140 Q350 115 360 122 Q345 135 335 140 Z" fill="#16a34a" opacity="0.4" />

            {/* Back Hair Flow */}
            <path
              d="M125 130 C115 180 105 240 95 320 C110 330 135 340 148 280 C138 220 142 160 152 130 Z"
              fill="url(#darkHair)"
            />
            <path
              d="M275 130 C285 180 295 240 305 320 C290 330 265 340 252 280 C262 220 258 160 248 130 Z"
              fill="url(#darkHair)"
            />

            {/* Neck & Throat with realistic shading */}
            <path d="M172 188 L172 250 L228 250 L228 188 Z" fill="url(#skinTone)" />
            <path d="M172 218 Q200 235 228 218 L228 245 Q200 255 172 245 Z" fill="#c78d72" opacity="0.5" />

            {/* Navy Scrubs V-Neck Top */}
            <path
              d="M148 245 L200 305 L252 245 L272 330 L128 330 Z"
              fill="url(#navyScrubs)"
            />

            {/* White Doctor Coat / Lab Coat */}
            <path
              d="M85 320 C95 270 138 250 158 250 L190 320 L150 480 L45 480 C45 410 65 350 85 320 Z"
              fill="url(#whiteCoat)"
              filter="url(#softShadow)"
            />
            <path
              d="M315 320 C305 270 262 250 242 250 L210 320 L250 480 L355 480 C355 410 335 350 315 320 Z"
              fill="url(#whiteCoat)"
              filter="url(#softShadow)"
            />
            <path
              d="M158 250 L195 320 L195 480 L150 480 Z"
              fill="#ffffff"
            />
            <path
              d="M242 250 L205 320 L205 480 L250 480 Z"
              fill="#f8fafc"
            />

            {/* Coat Lapels */}
            <path
              d="M158 250 L190 325 L165 330 L138 270 Z"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
            <path
              d="M242 250 L210 325 L235 330 L262 270 Z"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />

            {/* Left Pocket with Paw & "Veterinarian" text */}
            <rect x="252" y="355" width="62" height="56" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="283" cy="374" r="4.5" fill="#1e3a8a" />
            <circle cx="276" cy="367" r="2.5" fill="#1e3a8a" />
            <circle cx="290" cy="367" r="2.5" fill="#1e3a8a" />
            <circle cx="272" cy="375" r="2.2" fill="#1e3a8a" />
            <circle cx="294" cy="375" r="2.2" fill="#1e3a8a" />
            <text
              x="283"
              y="394"
              textAnchor="middle"
              fill="#1e3a8a"
              fontSize="8"
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
            >
              Veterinarian
            </text>

            {/* Stethoscope around neck */}
            <path
              d="M158 228 C132 238 118 280 122 340 C125 375 142 385 152 360 L158 300"
              fill="none"
              stroke="#1e293b"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M242 228 C268 238 282 280 278 340 C272 370 258 375 248 360"
              fill="none"
              stroke="#1e293b"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="242" cy="365" r="14" fill="url(#stethoscopeMetal)" stroke="#334155" strokeWidth="2" />
            <circle cx="242" cy="365" r="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="242" cy="365" r="5" fill="#334155" />

            {/* Earpieces at neck */}
            <path d="M158 228 L163 208" stroke="url(#stethoscopeMetal)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="163" cy="206" r="4" fill="#1e293b" />
            <path d="M242 228 L237 208" stroke="url(#stethoscopeMetal)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="237" cy="206" r="4" fill="#1e293b" />

            {/* Head & Face with gentle charming tilt matching the photo */}
            <g transform="rotate(-3 200 160)">
              <ellipse cx="200" cy="154" rx="46" ry="53" fill="url(#skinTone)" filter="url(#softShadow)" />
              <path
                d="M165 160 C165 195 180 212 200 212 C220 212 235 195 235 160 Z"
                fill="url(#skinTone)"
              />

              <ellipse cx="172" cy="165" rx="11" ry="7" fill="#f43f5e" opacity="0.14" />
              <ellipse cx="228" cy="165" rx="11" ry="7" fill="#f43f5e" opacity="0.14" />

              {/* Eyes */}
              <path d="M172 145 Q182 138 192 145 Q182 150 172 145 Z" fill="#ffffff" />
              <ellipse cx="182" cy="144" rx="4.5" ry="4.5" fill="#2d1b16" />
              <circle cx="184" cy="142" r="1.5" fill="#ffffff" />
              <path d="M170 144 Q182 136 193 144" stroke="#1f1418" strokeWidth="2.2" fill="none" strokeLinecap="round" />

              <path d="M208 145 Q218 138 228 145 Q218 150 208 145 Z" fill="#ffffff" />
              <ellipse cx="218" cy="144" rx="4.5" ry="4.5" fill="#2d1b16" />
              <circle cx="220" cy="142" r="1.5" fill="#ffffff" />
              <path d="M207 144 Q218 136 230 144" stroke="#1f1418" strokeWidth="2.2" fill="none" strokeLinecap="round" />

              {/* Eyebrows */}
              <path d="M168 134 Q182 127 194 134" stroke="#261a20" strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <path d="M206 134 Q218 127 232 134" stroke="#261a20" strokeWidth="2.6" fill="none" strokeLinecap="round" />

              {/* Nose */}
              <path d="M200 144 L197 165 Q200 169 203 165 Z" fill="#c78d72" opacity="0.5" />
              <ellipse cx="196" cy="166" rx="2" ry="1" fill="#a8674d" />
              <ellipse cx="204" cy="166" rx="2" ry="1" fill="#a8674d" />

              {/* Warm Friendly Smile */}
              <path d="M182 180 Q200 196 218 180" stroke="#be185d" strokeWidth="2.5" fill="#e11d48" strokeLinecap="round" />
              <path d="M185 180 Q200 187 215 180" fill="#ffffff" />

              {/* Dark Wavy Hair */}
              <path
                d="M152 135 C150 90 250 90 248 135 C230 110 205 110 200 115 C195 110 170 110 152 135 Z"
                fill="url(#darkHair)"
              />
              <path
                d="M155 125 C145 150 140 180 145 220 C150 250 135 280 125 320 C140 330 155 310 160 260 C165 210 160 160 170 140 Z"
                fill="url(#darkHair)"
              />
              <path
                d="M245 125 C255 150 260 180 255 220 C250 250 265 280 275 320 C260 330 245 310 240 260 C235 210 240 160 230 140 Z"
                fill="url(#darkHair)"
              />
              <path d="M198 115 Q180 120 165 140 Q180 130 198 120 Z" fill="#140f12" />
              <path d="M202 115 Q220 120 235 140 Q220 130 202 120 Z" fill="#140f12" />

              <circle cx="244" cy="168" r="3.5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            </g>
          </svg>
        )}

        {/* Interactive Click-to-Upload Button Overlay on hover */}
        {allowUpload && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer p-2 text-center"
            title="Click to select/upload photo"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            <span className="text-[10px] font-bold mt-0.5 leading-tight">Change Photo</span>
          </button>
        )}
      </div>

      {/* Verified Medical Badge */}
      {showBadge && (
        <div className="absolute -bottom-2 -right-2 bg-white text-[#006a63] border-2 border-[#006a63] shadow-md px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-[#006a63] font-bold">
            verified
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-extrabold uppercase tracking-tight">
            BVSc & AH
          </span>
        </div>
      )}
    </div>
  );
};
