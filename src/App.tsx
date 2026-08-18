import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pet, FilterState, ViewType, BlogArticle, PaymentTransaction } from './types';
import { INITIAL_PETS, BLOG_ARTICLES, COMMUNITY_NEWS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BrowseView } from './components/BrowseView';
import { PetDetailsView } from './components/PetDetailsView';
import { PostAdView } from './components/PostAdView';
import { CategoriesView } from './components/CategoriesView';
import { AboutView } from './components/AboutView';
import { DonateView } from './components/DonateView';
import { ContactModal } from './components/ContactModal';
import { ArticleModal } from './components/ArticleModal';
import { ProfileModal } from './components/ProfileModal';
import { PaymentModal } from './components/PaymentModal';
import { VetDeskModal } from './components/VetDeskModal';
import { SaniffyChatModal } from './components/SaniffyChatModal';

export const App: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>(() => {
    const saved = localStorage.getItem('petconnect_pets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved pets', e);
      }
    }
    return INITIAL_PETS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('petconnect_favs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved favorites', e);
      }
    }
    return ['charlie-golden'];
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('petconnect_txs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved transactions', e);
      }
    }
    return [
      {
        id: 'tx-init-1',
        petId: 'charlie-golden',
        petName: 'Charlie',
        amount: 1500,
        currency: 'NPR',
        purpose: 'Adoption Fee',
        paymentMethod: 'esewa',
        payerName: 'Suman Shrestha',
        payerPhone: '+977 9841234567',
        payerEmail: 'suman@example.com',
        status: 'Completed',
        date: 'Oct 25, 2023, 11:30 AM',
        transactionRef: 'NPR-482910-8472',
      },
    ];
  });

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [contactModalPet, setContactModalPet] = useState<Pet | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Vet Desk Modal State
  const [isVetDeskOpen, setIsVetDeskOpen] = useState(false);
  const [vetDeskTopic, setVetDeskTopic] = useState<string | undefined>(undefined);

  // Payment Modal State
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentPet, setPaymentPet] = useState<Pet | null>(null);
  const [paymentPurpose, setPaymentPurpose] = useState<
    'Adoption Fee' | 'Shelter Sponsorship' | 'Ad Promotion Boost' | 'General Donation'
  >('Adoption Fee');
  const [paymentAmount, setPaymentAmount] = useState<number>(1500);

  const [filterState, setFilterState] = useState<FilterState>({
    keyword: '',
    category: '',
    petTypes: [],
    location: '',
    status: [],
    sortBy: 'Newest First',
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('petconnect_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('petconnect_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('petconnect_txs', JSON.stringify(transactions));
  }, [transactions]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from favorites');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Added to your favorites!');
        return [...prev, id];
      }
    });
  };

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    setFilterState((prev) => ({
      ...prev,
      category: category.toLowerCase(),
    }));
    setCurrentView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPayment = (
    pet: Pet | null,
    purpose: 'Adoption Fee' | 'Shelter Sponsorship' | 'Ad Promotion Boost' | 'General Donation',
    amount: number
  ) => {
    setPaymentPet(pet);
    setPaymentPurpose(purpose);
    setPaymentAmount(amount);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (tx: PaymentTransaction) => {
    setTransactions((prev) => [tx, ...prev]);
    showToast(`Payment of NPR ${tx.amount.toLocaleString()} received successfully via ${tx.paymentMethod.toUpperCase()}!`);
  };

  const handleAddPet = (newPet: Pet, isFeaturedPromotion: boolean) => {
    setPets([newPet, ...pets]);
    setSelectedPet(newPet);

    if (isFeaturedPromotion) {
      handleOpenPayment(newPet, 'Ad Promotion Boost', 350);
    } else {
      showToast('Your advertisement has been published successfully!');
    }

    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilterState((prev) => ({
      ...prev,
      keyword: query,
    }));
  };

  const handleLegalTopic = (topic: string) => {
    showToast(`Opening ${topic} information`);
  };

  const pageTransition = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.28, ease: 'easeOut' },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0d1c2f]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0d1c2f] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 font-['Plus_Jakarta_Sans'] text-[14px]"
          >
            <span className="material-symbols-outlined text-[#8bf1e6] text-[20px]">
              check_circle
            </span>
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/60 hover:text-white ml-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenVetDesk={() => {
          setVetDeskTopic(undefined);
          setIsVetDeskOpen(true);
        }}
      />

      {/* Main View Area with Smooth Page Transitions */}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div key="home" {...pageTransition}>
              <HomeView
                pets={pets}
                blogArticles={BLOG_ARTICLES}
                newsItems={COMMUNITY_NEWS}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectPet={handleSelectPet}
                onNavigate={(view) => setCurrentView(view)}
                onSelectCategory={handleSelectCategory}
                onOpenArticle={(article) => setActiveArticle(article)}
                onOpenVetDesk={(topic) => {
                  setVetDeskTopic(topic);
                  setIsVetDeskOpen(true);
                }}
              />
            </motion.div>
          )}

          {currentView === 'browse' && (
            <motion.div key="browse" {...pageTransition}>
              <BrowseView
                pets={pets}
                filterState={filterState}
                onFilterChange={setFilterState}
                onSelectPet={handleSelectPet}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          )}

          {currentView === 'details' && selectedPet && (
            <motion.div key={`details-${selectedPet.id}`} {...pageTransition}>
              <PetDetailsView
                pet={selectedPet}
                onBack={() => setCurrentView('browse')}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenContactModal={(pet) => setContactModalPet(pet)}
                onOpenPaymentModal={(pet, purpose, amount) => handleOpenPayment(pet, purpose, amount)}
                onOpenVetDesk={(topic) => {
                  setVetDeskTopic(topic);
                  setIsVetDeskOpen(true);
                }}
              />
            </motion.div>
          )}

          {currentView === 'post-ad' && (
            <motion.div key="post-ad" {...pageTransition}>
              <PostAdView
                onAddPet={handleAddPet}
                onCancel={() => setCurrentView('home')}
              />
            </motion.div>
          )}

          {currentView === 'categories' && (
            <motion.div key="categories" {...pageTransition}>
              <CategoriesView onSelectCategory={handleSelectCategory} />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div key="about" {...pageTransition}>
              <AboutView
                onNavigate={(view) => setCurrentView(view)}
                onOpenVetDesk={() => {
                  setVetDeskTopic(undefined);
                  setIsVetDeskOpen(true);
                }}
              />
            </motion.div>
          )}

          {currentView === 'donate' && (
            <motion.div key="donate" {...pageTransition}>
              <DonateView
                pets={pets}
                onOpenPaymentModal={(pet, purpose, amount) => handleOpenPayment(pet, purpose, amount)}
                onSelectPet={handleSelectPet}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => setCurrentView(view)}
        onOpenLegal={handleLegalTopic}
      />

      {/* Live Kathmandu Valley Vet Desk Modal */}
      <VetDeskModal
        isOpen={isVetDeskOpen}
        onClose={() => setIsVetDeskOpen(false)}
        initialTopic={vetDeskTopic}
      />

      {/* Contact Modal */}
      <ContactModal
        pet={contactModalPet}
        onClose={() => setContactModalPet(null)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Article Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      {/* Profile / Favorites / Payments Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        favorites={favorites}
        pets={pets}
        transactions={transactions}
        onSelectPet={handleSelectPet}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Secure Online Payment Modal (eSewa, Khalti, Fonepay, Card) */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        pet={paymentPet}
        purpose={paymentPurpose}
        defaultAmount={paymentAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Floating AI Assistant Chat Box - Saniffy */}
      <SaniffyChatModal
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVetDesk={(topic) => {
          setVetDeskTopic(topic);
          setIsVetDeskOpen(true);
        }}
      />
    </div>
  );
};

export default App;
