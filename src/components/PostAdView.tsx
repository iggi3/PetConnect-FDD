import React, { useState, useRef } from 'react';
import { Pet, PetStatus } from '../types';
import { KATHMANDU_VALLEY_LOCALITIES } from '../data/mockData';

interface PostAdViewProps {
  onAddPet: (pet: Pet, isFeaturedPromotion: boolean) => void;
  onCancel: () => void;
}

export const PostAdView: React.FC<PostAdViewProps> = ({ onAddPet, onCancel }) => {
  const [title, setTitle] = useState('');
  const [petName, setPetName] = useState('');
  const [category, setCategory] = useState<PetStatus>('Adoption');
  const [petType, setPetType] = useState<'Dog' | 'Cat' | 'Bird' | 'Small Pet' | 'Other'>('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Unknown'>('Male');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [adoptionFee, setAdoptionFee] = useState<number>(0);
  const [vaccinated, setVaccinated] = useState(true);
  const [goodWithKids, setGoodWithKids] = useState(true);
  const [houseTrained, setHouseTrained] = useState(true);
  const [promotionPlan, setPromotionPlan] = useState<'free' | 'featured'>('free');
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          if (uploadEvent.target?.result) {
            setImageFiles((prev) => [...prev, uploadEvent.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const files: File[] = Array.from(e.dataTransfer.files);
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          if (uploadEvent.target?.result) {
            setImageFiles((prev) => [...prev, uploadEvent.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter an ad title');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please enter a location');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please write a full description');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Default fallback image if none uploaded
    const defaultImage =
      petType === 'Cat'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-peCotd1tmZl7O_RUYLS4daDRW9thzs8LjWMogZwxDP5ijoLVGUUjZ-fe7LgCC0uU67RFu7DIt1BirmGWpiFGlRhF0szvLqinRG-5nPyE_8CKSZrBKaRkLrp-eoshH6OAYTMUmOFNWvSk91tvlszz_d4ynFKQfXPACNjgLoY1rfEQrIxujAVXV8c-dtQgtvImqUfua6tCrxofFKWWjui8_RxJPAGGW2kCEYmtOggWixbs5h1jvZWp'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDofxO34vFfaSXPfbXozNwvEXC1-_IOtAswjMw6fJB39INZN-Bs20vYDEcVsQEVSBB4APkvZUD31KHigBlBu9whYv3zrHTRg56rrsZ_gvKM4IXkaNoq6Erjwyj8_H44eErth-p3UK6jTyO18Ofe1CUUVLvmAVY2fayBihfKkHWMT4RMIXfa6F86foaQpiuH-cnSRL7QrUM5SZGNw2G1EQ7RAZJcGzJdGeeN8uKlZdARk0ddhSXCwpT';

    const isFeatured = promotionPlan === 'featured';

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      title: title.trim(),
      name: petName.trim() || title.trim().split(' ')[0] || 'Lovely Pet',
      petType,
      breed: breed.trim() || `${petType} Mix`,
      age: age.trim() || 'Young',
      gender,
      status: category,
      location: location.trim(),
      postedDate: 'Posted Just Now',
      featured: isFeatured,
      image: imageFiles[0] || defaultImage,
      galleryImages: imageFiles.length > 1 ? imageFiles.slice(1) : undefined,
      description: description.trim(),
      contactPhone: contactInfo.trim() || '+977 984-1122334',
      contactEmail: contactEmail.trim() || 'contact@petconnect.np',
      shelterName: 'Community Member / Rescuer',
      shelterAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD0cJ6BBQj6rzpkTYLCuNDt-OFw21t6uHKukYyVTe1N-dOQI_30BghYybinReEuOydRod4-ntb-sNCS0DbXLiysR1FfAMPbcOo-ct8NiQZjgepe7HP3lEDdl_Z7ZxEO5I67l7OPWG0WeGOCzT2rZCEAIQATS1xdp8S-OZlTCyIVRoSb8iRyTZEuaeG-Xyn8KTRHjihBxxsyeqH-oWmY0uJllq9mLsdOhX54CfBxw5IqyQhjYOkTw0T0',
      vaccinated,
      goodWithKids,
      houseTrained,
      size: 'Medium Size',
      adoptionFee: adoptionFee > 0 ? adoptionFee : undefined,
    };

    setTimeout(() => {
      onAddPet(newPet, isFeatured);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-10 py-10">
      <div className="bg-white rounded-[32px] p-6 md:p-12 ambient-shadow border border-[#dde9ff]/80">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="font-['Quicksand'] text-[28px] md:text-[36px] font-bold text-[#0d1c2f]">
            Find Them a Loving Home
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#56423c]">
            Fill out the details below to post your pet advertisement to the Nepal community.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-[#ffdad6] text-[#93000a] p-4 rounded-xl font-['Plus_Jakarta_Sans'] text-[14px] font-semibold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">error</span>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Ad Title & Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-2">
              <label htmlFor="ad-title" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Ad Title <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                id="ad-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Loving Golden Retriever Looking for Family"
                required
                className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors"
              />
              <span className="text-[12px] text-[#56423c]">
                A clear and concise title attracts more viewers.
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pet-name" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Pet Name
              </label>
              <input
                id="pet-name"
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g., Charlie"
                className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors"
              />
            </div>
          </div>

          {/* Category & Pet Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="category-select" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Category
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as PetStatus)}
                className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors cursor-pointer"
              >
                <option value="Adoption">Adoption</option>
                <option value="Foster">Foster Needed</option>
                <option value="Found">Found Pet</option>
                <option value="Lost">Lost Pet</option>
                <option value="Service">Pet Service</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pet-type-select" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Pet Type
              </label>
              <select
                id="pet-type-select"
                value={petType}
                onChange={(e) =>
                  setPetType(e.target.value as 'Dog' | 'Cat' | 'Bird' | 'Small Pet' | 'Other')
                }
                className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors cursor-pointer"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Small Pet">Small Pet</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Breed, Age, Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="breed-input" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Breed
              </label>
              <input
                id="breed-input"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g., Golden Retriever, Local Mix"
                className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="age-input" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Age
              </label>
              <input
                id="age-input"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 2 Years, 3 Months"
                className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="gender-select" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Gender
              </label>
              <select
                id="gender-select"
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Unknown')}
                className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>

          {/* Traits & Behaviors Checkboxes */}
          <div className="flex flex-wrap gap-6 py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={vaccinated}
                onChange={(e) => setVaccinated(e.target.checked)}
                className="w-4 h-4 text-[#9e421d] rounded accent-[#9e421d]"
              />
              <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#0d1c2f]">
                Vaccinated
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={goodWithKids}
                onChange={(e) => setGoodWithKids(e.target.checked)}
                className="w-4 h-4 text-[#9e421d] rounded accent-[#9e421d]"
              />
              <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#0d1c2f]">
                Good with Kids
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={houseTrained}
                onChange={(e) => setHouseTrained(e.target.checked)}
                className="w-4 h-4 text-[#9e421d] rounded accent-[#9e421d]"
              />
              <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#0d1c2f]">
                House Trained
              </span>
            </label>
          </div>

          {/* Full Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="full-description" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
              Full Description <span className="text-[#ba1a1a]">*</span>
            </label>
            <textarea
              id="full-description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell their story: personality, health history, habits, special requirements, and what kind of home they need..."
              required
              className="px-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors leading-relaxed"
            />
          </div>

          {/* Location & Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="location-input" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Kathmandu Valley Location <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89726a] text-[20px]">
                  location_on
                </span>
                <input
                  id="location-input"
                  type="text"
                  list="valley-locations-list"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Baneshwor, Kathmandu"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors"
                />
                <datalist id="valley-locations-list">
                  {KATHMANDU_VALLEY_LOCALITIES.filter((loc) => !loc.startsWith('All')).map((loc) => (
                    <option key={loc} value={loc} />
                  ))}
                </datalist>
              </div>
              {/* Quick Valley chips */}
              <div className="flex flex-wrap gap-1 mt-1">
                {['Baneshwor', 'Jhamsikhel', 'Sanepa', 'Baluwatar', 'Boudha', 'Bhaktapur', 'Kirtipur'].map((quickLoc) => (
                  <button
                    key={quickLoc}
                    type="button"
                    onClick={() => setLocation(`${quickLoc}, Kathmandu Valley`)}
                    className="text-[11px] font-['Plus_Jakarta_Sans'] px-2 py-0.5 rounded-md bg-[#fff0f4] text-[#c44569] hover:bg-[#f8ccd7] transition-colors cursor-pointer"
                  >
                    +{quickLoc}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-phone-input" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Contact Phone / WhatsApp
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89726a] text-[20px]">
                  call
                </span>
                <input
                  id="contact-phone-input"
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g., +977 984-1234567"
                  className="w-full pl-10 pr-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="adoption-fee-input" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
                Adoption Fee (NPR, Optional)
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89726a] text-[20px]">
                  payments
                </span>
                <input
                  id="adoption-fee-input"
                  type="number"
                  value={adoptionFee || ''}
                  onChange={(e) => setAdoptionFee(Number(e.target.value))}
                  placeholder="e.g., 1500 (Cover vaccinations)"
                  className="w-full pl-10 pr-4 py-3 bg-[#f8f9ff] border-2 border-[#ddc1b7] rounded-[16px] focus:border-[#9e421d] focus:outline-none text-[15px] text-[#0d1c2f] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Photos Upload Dropzone */}
          <div className="flex flex-col gap-2">
            <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
              Photos
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#ddc1b7] rounded-[24px] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#9e421d] hover:bg-[#eff4ff]/50 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center mb-3 group-hover:bg-[#ff8c61]/20 transition-colors">
                <span className="material-symbols-outlined text-[28px] text-[#9e421d]">
                  cloud_upload
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] text-[#0d1c2f] mb-1">
                Click or drag & drop to upload photos
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#56423c]">
                PNG, JPG, WEBP up to 10MB (First photo will be the main cover)
              </p>
            </div>

            {/* Photo preview list */}
            {imageFiles.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-3">
                {imageFiles.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded-2xl overflow-hidden ambient-shadow border border-[#dde9ff]"
                  >
                    <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(i);
                      }}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-[#ba1a1a] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-[#9e421d] text-white text-[10px] text-center font-bold py-0.5">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Promotion Listing Plan with Payment Options */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#0d1c2f]">
              Choose Listing Plan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setPromotionPlan('free')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  promotionPlan === 'free'
                    ? 'border-[#9e421d] bg-[#f8f9ff]'
                    : 'border-[#dde9ff] bg-white hover:border-[#ddc1b7]'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-['Quicksand'] font-bold text-[18px] text-[#0d1c2f]">
                    Standard Listing
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#006f67]">
                    FREE
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#56423c]">
                  Active for 30 days. Standard listing in search & category results.
                </p>
              </div>

              <div
                onClick={() => setPromotionPlan('featured')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  promotionPlan === 'featured'
                    ? 'border-[#ff8c61] bg-[#ff8c61]/10 ring-2 ring-[#ff8c61]'
                    : 'border-[#dde9ff] bg-white hover:border-[#ff8c61]/60'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-['Quicksand'] font-bold text-[18px] text-[#0d1c2f] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#9e421d] text-[20px]">
                      local_fire_department
                    </span>
                    Featured Boost
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#9e421d]">
                    NPR 350
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#56423c]">
                  Highlighted badge, top spot on Homepage & Browse listings, 5x more adoption reach.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6 pt-6 border-t border-[#dde9ff]">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3.5 text-[#56423c] font-['Plus_Jakarta_Sans'] font-semibold text-[15px] hover:text-[#0d1c2f] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 bg-[#9e421d] hover:bg-[#7e2b07] text-white font-['Plus_Jakarta_Sans'] font-semibold text-[16px] rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              {isSubmitting
                ? 'Posting Ad...'
                : promotionPlan === 'featured'
                ? 'Proceed to Boost (NPR 350)'
                : 'Post My Ad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
