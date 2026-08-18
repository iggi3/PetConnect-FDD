export type PetStatus = 'Adoption' | 'Foster' | 'Found' | 'Lost' | 'Service';

export interface Pet {
  id: string;
  title: string;
  name: string;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Small Pet' | 'Other';
  breed: string;
  age: string;
  gender: 'Male' | 'Female' | 'Unknown';
  status: PetStatus;
  location: string;
  postedDate: string;
  image: string;
  galleryImages?: string[];
  featured?: boolean;
  vaccinated?: boolean;
  goodWithKids?: boolean;
  size?: 'Small' | 'Medium Size' | 'Large';
  houseTrained?: boolean;
  description: string;
  contactPhone: string;
  contactEmail: string;
  shelterName: string;
  shelterAvatar: string;
  verifiedShelter?: boolean;
  noCollar?: boolean;
  adoptionFee?: number; // In NPR
  
  // Rich Creative Pet Details
  personalityTraits?: string[];
  energyLevel?: 'Couch Potato' | 'Moderate & Playful' | 'Zoomies & High Energy';
  cuddleScore?: number; // 1-100
  playfulnessScore?: number; // 1-100
  snackDriveScore?: number; // 1-100
  favoriteSnack?: string;
  favoriteToy?: string;
  specialSkill?: string;
  microchipped?: boolean;
  neutered?: boolean;
  dewormed?: boolean;
  bellyRubsCount?: number;
  rescueStoryNote?: string;
}

export type PaymentMethod = 'esewa' | 'khalti' | 'fonepay' | 'card' | 'cash';

export interface PaymentTransaction {
  id: string;
  petId?: string;
  petName?: string;
  amount: number;
  currency: string;
  purpose: 'Adoption Fee' | 'Shelter Sponsorship' | 'Ad Promotion Boost' | 'General Donation';
  paymentMethod: PaymentMethod;
  payerName: string;
  payerPhone: string;
  payerEmail: string;
  status: 'Completed' | 'Pending';
  date: string;
  transactionRef: string;
}

export interface FilterState {
  keyword: string;
  category: string;
  petTypes: string[];
  location: string;
  status: string[];
  sortBy: 'Newest First' | 'Nearest to Me' | 'Urgent';
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  icon: string;
  readTime?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  icon: string;
  tag?: string;
}

export type ViewType = 'home' | 'browse' | 'details' | 'post-ad' | 'categories' | 'about' | 'donate';
