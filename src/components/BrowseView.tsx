import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pet, FilterState, PetStatus } from '../types';
import { KATHMANDU_VALLEY_LOCALITIES } from '../data/mockData';

const VALLEY_POPULAR_AREAS = [
  { label: 'All Valley', value: '' },
  { label: 'Kathmandu', value: 'Kathmandu' },
  { label: 'Lalitpur (Patan)', value: 'Lalitpur' },
  { label: 'Bhaktapur', value: 'Bhaktapur' },
  { label: 'Baneshwor', value: 'Baneshwor' },
  { label: 'Jhamsikhel', value: 'Jhamsikhel' },
  { label: 'Sanepa', value: 'Sanepa' },
  { label: 'Boudha', value: 'Boudha' },
  { label: 'Baluwatar', value: 'Baluwatar' },
  { label: 'Kirtipur', value: 'Kirtipur' },
];

interface BrowseViewProps {
  pets: Pet[];
  filterState: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSelectPet: (pet: Pet) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  pets,
  filterState,
  onFilterChange,
  onSelectPet,
  favorites,
  onToggleFavorite,
}) => {
  const [localKeyword, setLocalKeyword] = useState(filterState.keyword);
  const [localCategory, setLocalCategory] = useState(filterState.category);
  const [localPetTypes, setLocalPetTypes] = useState<string[]>(filterState.petTypes);
  const [localLocation, setLocalLocation] = useState(filterState.location);
  const [localStatus, setLocalStatus] = useState<string[]>(filterState.status);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const handlePetTypeToggle = (type: string) => {
    if (localPetTypes.includes(type)) {
      setLocalPetTypes(localPetTypes.filter((t) => t !== type));
    } else {
      setLocalPetTypes([...localPetTypes, type]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (localStatus.includes(status)) {
      setLocalStatus(localStatus.filter((s) => s !== status));
    } else {
      setLocalStatus([...localStatus, status]);
    }
  };

  const handleApply = () => {
    onFilterChange({
      keyword: localKeyword,
      category: localCategory,
      petTypes: localPetTypes,
      location: localLocation,
      status: localStatus,
      sortBy: filterState.sortBy,
    });
    setShowMobileFilters(false);
  };

  const handleClearAll = () => {
    setLocalKeyword('');
    setLocalCategory('');
    setLocalPetTypes([]);
    setLocalLocation('');
    setLocalStatus([]);
    onFilterChange({
      keyword: '',
      category: '',
      petTypes: [],
      location: '',
      status: [],
      sortBy: 'Newest First',
    });
  };

  // Filter logic
  const filteredPets = pets.filter((pet) => {
    if (filterState.keyword.trim()) {
      const q = filterState.keyword.toLowerCase();
      const match =
        pet.name.toLowerCase().includes(q) ||
        pet.title.toLowerCase().includes(q) ||
        pet.breed.toLowerCase().includes(q) ||
        pet.location.toLowerCase().includes(q) ||
        pet.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterState.category) {
      const cat = filterState.category.toLowerCase();
      if (cat === 'dog' || cat === 'cat' || cat === 'bird' || cat === 'small-pet') {
        const typeMap: Record<string, string> = {
          dog: 'Dog',
          cat: 'Cat',
          bird: 'Bird',
          'small-pet': 'Small Pet',
        };
        if (pet.petType !== typeMap[cat]) return false;
      } else if (cat === 'adoption' || cat === 'foster' || cat === 'lost' || cat === 'found') {
        const statusMap: Record<string, PetStatus> = {
          adoption: 'Adoption',
          foster: 'Foster',
          lost: 'Lost',
          found: 'Found',
        };
        if (pet.status !== statusMap[cat]) return false;
      }
    }

    if (filterState.petTypes.length > 0) {
      if (!filterState.petTypes.includes(pet.petType)) return false;
    }

    if (filterState.location.trim()) {
      if (!pet.location.toLowerCase().includes(filterState.location.toLowerCase())) {
        return false;
      }
    }

    if (filterState.status.length > 0) {
      if (!filterState.status.includes(pet.status)) return false;
    }

    return true;
  });

  const displayedPets = filteredPets.slice(0, visibleCount);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8">
      {/* Top Header with Soft Rose Subtitle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-['Quicksand'] text-[28px] md:text-[36px] font-bold text-[#1f1418] flex items-center gap-2">
            <span>Adoptable Pets in Kathmandu Valley</span>
            <span className="text-[24px]">🐾</span>
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d]">
            Showing <span className="font-bold text-[#e05d7f]">{filteredPets.length}</span> loving companions across Kathmandu, Lalitpur & Bhaktapur
          </p>
        </div>

        {/* Mobile filter toggle button */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden flex items-center gap-2 bg-white border border-[#f8ccd7] text-[#1f1418] font-['Plus_Jakarta_Sans'] font-semibold text-[14px] px-4 py-2.5 rounded-full shadow-xs"
        >
          <span className="material-symbols-outlined text-[20px] text-[#e05d7f]">tune</span>
          Filter Pets ({filteredPets.length})
        </button>
      </div>

      {/* Kathmandu Valley Quick Locality & Popular Breeds Filter Pills */}
      <div className="mb-8 p-4 bg-white rounded-2xl border border-[#f4dfe6] ambient-shadow flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="material-symbols-outlined text-[#e05d7f] text-[18px]">location_city</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold uppercase tracking-wider text-[#8c7179]">
              Kathmandu Valley Localities
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {VALLEY_POPULAR_AREAS.map((area) => {
              const isSelected = localLocation === area.value;
              return (
                <button
                  key={area.label}
                  type="button"
                  onClick={() => {
                    setLocalLocation(area.value);
                    onFilterChange({
                      keyword: localKeyword,
                      category: localCategory,
                      petTypes: localPetTypes,
                      location: area.value,
                      status: localStatus,
                      sortBy: filterState.sortBy,
                    });
                  }}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#e05d7f] text-white border-[#e05d7f] shadow-xs'
                      : 'bg-[#fff8f9] text-[#5c454d] border-[#f4dfe6] hover:border-[#f8ccd7] hover:text-[#1f1418]'
                  }`}
                >
                  {area.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Dog & Cat Breeds Fast Filter */}
        <div className="pt-2 border-t border-[#f4dfe6]">
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="material-symbols-outlined text-[#e05d7f] text-[18px]">pets</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold uppercase tracking-wider text-[#8c7179]">
              Popular Dog & Cat Breeds
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: '🐕 All Breeds', query: '' },
              { label: '❄️ Japanese Spitz', query: 'Japanese Spitz' },
              { label: '🐱 Persian Cat', query: 'Persian' },
              { label: '🦮 Golden Retriever', query: 'Golden Retriever' },
              { label: '💎 Siamese Cat', query: 'Siamese' },
              { label: '🐕 German Shepherd', query: 'German Shepherd' },
              { label: '🎀 Shih Tzu', query: 'Shih Tzu' },
              { label: '🍀 Calico Cat', query: 'Calico' },
              { label: '🐾 British Shorthair', query: 'British Shorthair' },
              { label: '🐶 Labrador', query: 'Labrador' },
              { label: '🏔️ Nepali Indie', query: 'Indie' },
            ].map((breedItem) => {
              const isSelected = localKeyword === breedItem.query;
              return (
                <button
                  key={breedItem.label}
                  type="button"
                  onClick={() => {
                    setLocalKeyword(breedItem.query);
                    onFilterChange({
                      keyword: breedItem.query,
                      category: localCategory,
                      petTypes: localPetTypes,
                      location: localLocation,
                      status: localStatus,
                      sortBy: filterState.sortBy,
                    });
                  }}
                  className={`px-3 py-1.5 rounded-full text-[12.5px] font-['Plus_Jakarta_Sans'] font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#9e421d] text-white border-[#9e421d] shadow-xs'
                      : 'bg-[#fff0f4] text-[#8c3552] border-[#f8ccd7] hover:bg-[#ffe4eb]'
                  }`}
                >
                  {breedItem.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside
          className={`lg:col-span-4 bg-white rounded-[28px] p-6 ambient-shadow border border-[#f4dfe6] flex flex-col gap-6 ${
            showMobileFilters ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div className="flex justify-between items-center pb-4 border-b border-[#f4dfe6]">
            <h3 className="font-['Quicksand'] text-[20px] font-bold text-[#1f1418] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e05d7f]">filter_list</span>
              Search Filters
            </h3>
            <button
              onClick={handleClearAll}
              className="text-[#e05d7f] font-['Plus_Jakarta_Sans'] text-[13px] font-bold hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Keyword Search */}
          <div className="flex flex-col gap-2">
            <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[13px] text-[#1f1418] uppercase tracking-wider">
              Keyword Search
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8c7179] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Charlie, Golden Retriever, kitten..."
                value={localKeyword}
                onChange={(e) => setLocalKeyword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#fff8f9] border border-[#f4dfe6] rounded-xl text-[14px] focus:outline-none focus:border-[#e05d7f]"
              />
            </div>
          </div>

          {/* Pet Type Checkboxes */}
          <div className="flex flex-col gap-2.5">
            <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[13px] text-[#1f1418] uppercase tracking-wider">
              Pet Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Dog', 'Cat', 'Bird', 'Small Pet'].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-['Plus_Jakarta_Sans'] cursor-pointer border transition-all ${
                    localPetTypes.includes(type)
                      ? 'bg-[#fff0f4] border-[#e05d7f] text-[#c44569] font-bold'
                      : 'bg-[#fff8f9] border-[#f4dfe6] text-[#1f1418]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={localPetTypes.includes(type)}
                    onChange={() => handlePetTypeToggle(type)}
                    className="w-3.5 h-3.5 accent-[#e05d7f]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Search */}
          <div className="flex flex-col gap-2">
            <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[13px] text-[#1f1418] uppercase tracking-wider">
              Valley Neighborhood / Area
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8c7179] text-[18px]">
                location_on
              </span>
              <input
                type="text"
                placeholder="Baneshwor, Jhamsikhel, Sanepa, Boudha..."
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#fff8f9] border border-[#f4dfe6] rounded-xl text-[14px] focus:outline-none focus:border-[#e05d7f]"
              />
            </div>
            {/* Quick Valley suggestions */}
            <div className="flex flex-wrap gap-1 mt-1">
              {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Kirtipur'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocalLocation(loc)}
                  className="text-[11px] font-['Plus_Jakarta_Sans'] px-2 py-0.5 rounded-md bg-[#fff0f4] text-[#c44569] hover:bg-[#f8ccd7] transition-colors"
                >
                  +{loc}
                </button>
              ))}
            </div>
          </div>

          {/* Status Tags */}
          <div className="flex flex-col gap-2.5">
            <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[13px] text-[#1f1418] uppercase tracking-wider">
              Ad Type / Status
            </label>
            <div className="flex flex-wrap gap-2">
              {['Adoption', 'Foster', 'Found', 'Lost'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusToggle(st)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-['Plus_Jakarta_Sans'] font-semibold transition-all border ${
                    localStatus.includes(st)
                      ? 'bg-[#e05d7f] text-white border-[#e05d7f]'
                      : 'bg-[#fff8f9] text-[#1f1418] border-[#f4dfe6] hover:border-[#f8ccd7]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApply}
            className="w-full py-3.5 bg-[#9e421d] hover:bg-[#7e2b07] text-white font-['Plus_Jakarta_Sans'] font-semibold text-[15px] rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            Apply Filters
          </motion.button>
        </aside>

        {/* Main Pets Grid */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* Active Filter Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            {filterState.keyword && (
              <span className="inline-flex items-center gap-1 bg-[#fff0f4] text-[#c44569] border border-[#f8ccd7] px-3 py-1 rounded-full text-[12px] font-['Plus_Jakarta_Sans'] font-semibold">
                Keyword: "{filterState.keyword}"
                <button
                  onClick={() => {
                    setLocalKeyword('');
                    onFilterChange({ ...filterState, keyword: '' });
                  }}
                  className="hover:text-[#ba1a1a]"
                >
                  ×
                </button>
              </span>
            )}
            {filterState.location && (
              <span className="inline-flex items-center gap-1 bg-[#fff0f4] text-[#c44569] border border-[#f8ccd7] px-3 py-1 rounded-full text-[12px] font-['Plus_Jakarta_Sans'] font-semibold">
                Location: "{filterState.location}"
                <button
                  onClick={() => {
                    setLocalLocation('');
                    onFilterChange({ ...filterState, location: '' });
                  }}
                  className="hover:text-[#ba1a1a]"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          {/* Pets Grid with AnimatePresence */}
          {filteredPets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[28px] p-12 text-center border border-[#f4dfe6] ambient-shadow flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#fff0f4] flex items-center justify-center text-[#e05d7f]">
                <span className="material-symbols-outlined text-[36px]">pets</span>
              </div>
              <h3 className="font-['Quicksand'] text-[24px] font-bold text-[#1f1418]">
                No pets matched your filter
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#5c454d] max-w-md">
                Try clearing or adjusting your search parameters to find available companions across Nepal.
              </p>
              <button
                onClick={handleClearAll}
                className="px-6 py-2.5 bg-[#9e421d] text-white rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-[14px] hover:bg-[#7e2b07] transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {displayedPets.map((pet) => {
                  const isFav = favorites.includes(pet.id);
                  return (
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -6 }}
                      key={pet.id}
                      onClick={() => onSelectPet(pet)}
                      className="bg-white rounded-[28px] ambient-shadow overflow-hidden flex flex-col group cursor-pointer border border-[#f4dfe6] hover:border-[#f8ccd7] hover:shadow-lg transition-all duration-300 relative"
                    >
                      <div className="relative h-60 overflow-hidden bg-[#faebf0]/50">
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
                          {pet.featured && (
                            <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold px-3 py-1 rounded-full bg-[#ff8c61] text-[#4d1900] shadow-sm">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-['Quicksand'] text-[22px] font-bold text-[#1f1418] group-hover:text-[#9e421d] transition-colors">
                            {pet.name}
                          </h3>
                          {pet.adoptionFee && (
                            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#9e421d] bg-[#fff0f4] px-2.5 py-0.5 rounded-full border border-[#f8ccd7]">
                              NPR {pet.adoptionFee.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Personality trait chips */}
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
              </AnimatePresence>
            </motion.div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredPets.length && (
            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3.5 bg-white border-2 border-[#f8ccd7] text-[#1f1418] font-['Plus_Jakarta_Sans'] font-semibold text-[15px] rounded-full hover:border-[#e05d7f] hover:text-[#9e421d] transition-all cursor-pointer shadow-xs"
              >
                Load More Companions
              </motion.button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
