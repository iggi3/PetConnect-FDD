import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VetPhoto, DR_AARYA_INFO } from './VetPhoto';

interface VetDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

const COMMON_VET_TOPICS = [
  {
    id: 'vaccine',
    title: 'Kathmandu Valley Vaccine Schedule',
    icon: 'vaccines',
    summary: 'DHPPiL, Anti-Rabies, and Feline 3-in-1 timing for pets in Kathmandu.',
    details:
      'Puppies should receive their first 6-in-1 (DHPPiL) at 6–8 weeks, booster at 10–12 weeks, and Anti-Rabies at 3 months. Annual boosters are mandatory due to Kathmandu street dog population. Deworm every 3 months with Praziquantel + Pyrantel.',
  },
  {
    id: 'monsoon',
    title: 'Monsoon Tick & Fungus Prevention',
    icon: 'water_drop',
    summary: 'Prevent tick fever, mud dermatitis, and ear mites during valley rains.',
    details:
      'Keep paws thoroughly dry after walks near Bagmati/Bishnumati or grassy parks. Apply monthly Spot-On (Fipronil) or chewable Bravecto/Nexgard. Check ears and between paw pads daily for hidden ticks.',
  },
  {
    id: 'diet',
    title: 'Healthy Nepali Homemade Pet Diet',
    icon: 'restaurant',
    summary: 'Wholesome balanced ingredients easily sourced in Kathmandu markets.',
    details:
      'A great homemade meal for Nepali dogs: 50% boiled lean chicken/buffalo or eggs + 30% steamed pumpkin/carrots/spinach + 20% brown rice or oats with a spoonful of fresh curd (dahi). Never feed onions, garlic, grapes, or spicy masala.',
  },
  {
    id: 'emergency',
    title: '24/7 Valley Emergency Clinics',
    icon: 'emergency',
    summary: 'Immediate critical care contacts in Baluwatar, Sanepa, and Suryabinayak.',
    details:
      '• Baluwatar Central Pet Hospital: +977 984-1234567\n• Lalitpur Animal Care (Jhamsikhel): +977 985-1122334\n• Bhaktapur Animal Care: +977 981-8899776\n• Mobile Rescue Ambulance: +977 980-3344556',
  },
];

const SYMPTOM_TRIAGE_RULES: Record<
  string,
  { level: 'Low' | 'Moderate' | 'Urgent'; advice: string; color: string }
> = {
  lethargy_vomit: {
    level: 'Urgent',
    advice:
      'Signs of potential viral gastroenteritis (Parvo) or dietary obstruction. Restrict food, offer clean ORS hydration, and visit an emergency vet within 12 hours.',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  scratching_fleas: {
    level: 'Moderate',
    advice:
      'Likely flea allergy dermatitis or fungal dampness common in Kathmandu monsoon. Apply an anti-microbial chlorhexidine wash and consult for an oral spot-on.',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  mild_limping: {
    level: 'Moderate',
    advice:
      'Inspect paw pads for thorns, glass shards, or road tar. Rest for 24 hours. If limping persists or swelling occurs, schedule a physical joint examination.',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  routine_check: {
    level: 'Low',
    advice:
      'Pet appears stable. Ensure rabies vaccines and deworming are updated within the last 6 months. Great job maintaining their preventative care!',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
};

export const VetDeskModal: React.FC<VetDeskModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'triage' | 'ask'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'vaccine');

  // Triage state
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat'>('dog');
  const [symptomKey, setSymptomKey] = useState<string>('routine_check');

  // Custom question state
  const [questionText, setQuestionText] = useState('');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [userContact, setUserContact] = useState('');

  if (!isOpen) return null;

  const currentTopicData = COMMON_VET_TOPICS.find((t) => t.id === selectedTopic);
  const triageResult = SYMPTOM_TRIAGE_RULES[symptomKey] || SYMPTOM_TRIAGE_RULES.routine_check;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[32px] max-w-2xl w-full border border-[#f8ccd7] overflow-hidden shadow-2xl my-8 relative flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#faebf0] via-[#fff0f4] to-[#f0faf8] p-6 md:p-8 border-b border-[#f4dfe6] relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#5c454d] hover:text-[#1f1418] flex items-center justify-center transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <VetPhoto size="md" showBadge={true} />

              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="bg-[#006a63]/10 text-[#006a63] font-['Plus_Jakarta_Sans'] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006a63] animate-pulse" />
                    Live Kathmandu Valley Vet Desk
                  </span>
                  <span className="bg-[#fff0f4] text-[#c44569] font-['Plus_Jakarta_Sans'] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#f8ccd7]">
                    {DR_AARYA_INFO.verifiedBadge}
                  </span>
                </div>

                <h2 className="font-['Quicksand'] text-[24px] md:text-[28px] font-bold text-[#1f1418]">
                  {DR_AARYA_INFO.name}
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold text-[#006a63]">
                  {DR_AARYA_INFO.qualifications}
                </p>
                <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#5c454d] mt-1">
                  {DR_AARYA_INFO.role} • {DR_AARYA_INFO.affiliation}
                </p>
              </div>
            </div>

            {/* Quick Navigation Tabs */}
            <div className="flex items-center gap-2 mt-6 p-1 bg-white/70 rounded-2xl border border-[#f8ccd7]">
              <button
                type="button"
                onClick={() => setActiveTab('topics')}
                className={`flex-1 py-2 px-3 rounded-xl font-['Plus_Jakarta_Sans'] text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'topics'
                    ? 'bg-[#e05d7f] text-white shadow-xs'
                    : 'text-[#5c454d] hover:text-[#1f1418] hover:bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>Care Guides</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('triage')}
                className={`flex-1 py-2 px-3 rounded-xl font-['Plus_Jakarta_Sans'] text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'triage'
                    ? 'bg-[#006a63] text-white shadow-xs'
                    : 'text-[#5c454d] hover:text-[#1f1418] hover:bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">stethoscope</span>
                <span>Symptom Triage</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ask')}
                className={`flex-1 py-2 px-3 rounded-xl font-['Plus_Jakarta_Sans'] text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'ask'
                    ? 'bg-[#9e421d] text-white shadow-xs'
                    : 'text-[#5c454d] hover:text-[#1f1418] hover:bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                <span>Ask Dr. Shreya</span>
              </button>
            </div>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 font-['Plus_Jakarta_Sans'] text-[#1f1418]">
            {/* TAB 1: Valley Pet Health Topics */}
            {activeTab === 'topics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COMMON_VET_TOPICS.map((topic) => {
                    const isSelected = selectedTopic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-start gap-1.5 ${
                          isSelected
                            ? 'bg-[#fff0f4] border-[#e05d7f] shadow-xs'
                            : 'bg-[#fff8f9] border-[#f4dfe6] hover:border-[#f8ccd7]'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[22px] ${
                            isSelected ? 'text-[#e05d7f]' : 'text-[#8c7179]'
                          }`}
                        >
                          {topic.icon}
                        </span>
                        <span className="text-[12px] font-bold text-[#1f1418] line-clamp-2">
                          {topic.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {currentTopicData && (
                  <motion.div
                    key={currentTopicData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-[#fff8f9] rounded-2xl border border-[#f8ccd7]"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-[#e05d7f] text-[24px]">
                        {currentTopicData.icon}
                      </span>
                      <h3 className="font-['Quicksand'] text-[18px] font-bold text-[#1f1418]">
                        {currentTopicData.title}
                      </h3>
                    </div>

                    <p className="text-[14px] text-[#5c454d] mb-4 leading-relaxed font-medium">
                      {currentTopicData.summary}
                    </p>

                    <div className="p-4 bg-white rounded-xl border border-[#f4dfe6] text-[14px] text-[#1f1418] leading-relaxed whitespace-pre-line">
                      {currentTopicData.details}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f4dfe6]">
                      <span className="text-[12px] text-[#8c7179] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                          verified_user
                        </span>
                        Medically reviewed by Dr. Shreya Karki
                      </span>
                      <a
                        href={`https://wa.me/9779841234567?text=Hi%20Dr.%20Shreya,%20I%20have%20a%20question%20regarding%20${encodeURIComponent(
                          currentTopicData.title
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#25D366] text-white text-[13px] font-bold flex items-center gap-1.5 hover:bg-[#1ebd59] transition-colors"
                      >
                        <span>WhatsApp Vet Desk</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* TAB 2: Symptom Triage */}
            {activeTab === 'triage' && (
              <div className="space-y-6">
                <div className="p-4 bg-[#f0faf8] rounded-2xl border border-[#b2e5dc]">
                  <h3 className="font-['Quicksand'] text-[17px] font-bold text-[#006a63] mb-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px]">medical_services</span>
                    Quick Pet Symptom Checker
                  </h3>
                  <p className="text-[13px] text-[#5c454d]">
                    Get immediate veterinary triage level and first-aid recommendations for your pet in Kathmandu Valley.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8c7179] mb-1.5">
                      Pet Species
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPetSpecies('dog')}
                        className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                          petSpecies === 'dog'
                            ? 'bg-[#006a63] text-white border-[#006a63]'
                            : 'bg-white text-[#5c454d] border-[#f4dfe6]'
                        }`}
                      >
                        <span>🐶 Dog / Puppy</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPetSpecies('cat')}
                        className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                          petSpecies === 'cat'
                            ? 'bg-[#006a63] text-white border-[#006a63]'
                            : 'bg-white text-[#5c454d] border-[#f4dfe6]'
                        }`}
                      >
                        <span>🐱 Cat / Kitten</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8c7179] mb-1.5">
                      Observed Symptom
                    </label>
                    <select
                      value={symptomKey}
                      onChange={(e) => setSymptomKey(e.target.value)}
                      className="w-full py-2 px-3 bg-white border border-[#f4dfe6] rounded-xl text-[13px] font-semibold focus:outline-none focus:border-[#006a63]"
                    >
                      <option value="routine_check">Routine Check & Vaccine Due</option>
                      <option value="scratching_fleas">Excessive Scratching / Hair Loss</option>
                      <option value="mild_limping">Limping / Reluctance to Walk</option>
                      <option value="lethargy_vomit">Vomiting / Lethargy / No Food</option>
                    </select>
                  </div>
                </div>

                {/* Triage Output Card */}
                <div className={`p-5 rounded-2xl border ${triageResult.color}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['Quicksand'] text-[16px] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">healing</span>
                      Triage Recommendation
                    </span>
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white shadow-xs">
                      Urgency: {triageResult.level}
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed font-medium">
                    {triageResult.advice}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#f4dfe6] flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-[#1f1418]">
                      Need immediate help in Kathmandu?
                    </p>
                    <p className="text-[12px] text-[#5c454d]">
                      Call Dr. Shreya's Valley emergency hotline 24/7.
                    </p>
                  </div>
                  <a
                    href="tel:+9779841234567"
                    className="px-4 py-2 bg-[#006a63] text-white rounded-xl text-[13px] font-bold flex items-center gap-1.5 hover:bg-[#00524c] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>+977 984-1234567</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: Ask Dr. Shreya */}
            {activeTab === 'ask' && (
              <div className="space-y-5">
                {questionSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-[#fff0f4] rounded-2xl border border-[#f8ccd7] text-center"
                  >
                    <span className="text-[40px] block mb-2">🩺 ✨</span>
                    <h3 className="font-['Quicksand'] text-[20px] font-bold text-[#1f1418] mb-1">
                      Question Received!
                    </h3>
                    <p className="text-[14px] text-[#5c454d] max-w-md mx-auto mb-4">
                      Dr. Shreya Karki has received your pet health inquiry and will reply directly via WhatsApp/SMS to{' '}
                      <span className="font-bold text-[#e05d7f]">{userContact || 'your number'}</span> within 2 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuestionSubmitted(false);
                        setQuestionText('');
                      }}
                      className="px-5 py-2 rounded-xl bg-[#e05d7f] text-white text-[13px] font-bold cursor-pointer hover:bg-[#c44569]"
                    >
                      Ask Another Question
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (questionText.trim()) {
                        setQuestionSubmitted(true);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-[#fff8f9] rounded-2xl border border-[#f4dfe6]">
                      <p className="text-[13px] text-[#5c454d] leading-relaxed">
                        Have a specific question about an adoptable pet, vaccine timelines, or feeding in Kathmandu Valley? Write to Dr. Shreya for free veterinary guidance.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8c7179] mb-1.5">
                        Your Pet Question or Concern *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="e.g., I just adopted an indie puppy in Lalitpur. What is the deworming dose and when should I bring them in for rabies shot?"
                        className="w-full p-3.5 bg-[#fff8f9] border border-[#f4dfe6] rounded-xl text-[14px] focus:outline-none focus:border-[#e05d7f]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8c7179] mb-1.5">
                          Your Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={userContact}
                          onChange={(e) => setUserContact(e.target.value)}
                          placeholder="+977 98..."
                          className="w-full p-2.5 bg-[#fff8f9] border border-[#f4dfe6] rounded-xl text-[14px] focus:outline-none focus:border-[#e05d7f]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8c7179] mb-1.5">
                          Kathmandu Valley Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Sanepa, Lalitpur"
                          className="w-full p-2.5 bg-[#fff8f9] border border-[#f4dfe6] rounded-xl text-[14px] focus:outline-none focus:border-[#e05d7f]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#e05d7f] hover:bg-[#c44569] text-white font-['Plus_Jakarta_Sans'] font-bold text-[15px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Send Question to Dr. Shreya</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-[#faebf0]/50 border-t border-[#f4dfe6] flex items-center justify-between text-[12px] text-[#8c7179]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                location_on
              </span>
              Clinics in Baluwatar (KTM) & Jhamsikhel (Lalitpur)
            </span>
            <span className="font-bold text-[#e05d7f]">PetConnect Valley Vet Network</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
