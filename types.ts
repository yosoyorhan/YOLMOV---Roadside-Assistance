
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Advantage {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  image: string;
}

export interface Provider {
  id: string;
  name: string;
  serviceType: string;
  rating: number;
  reviewCount: number;
  distance: string; // e.g. "2.5 km"
  eta: string; // e.g. "15 dk"
  priceStart: number;
  isVerified: boolean;
  location: string;
  image: string;
}

export interface JobRequest {
  id: string;
  serviceType: string;
  location: string;
  dropoffLocation?: string; // New: Destination address
  distance: string;
  price: number; // Estimated earnings
  timestamp: string;
  customerName: string;
  vehicleInfo: string;
  urgency: 'high' | 'normal';
  expiresIn?: number; // New: Seconds left to accept
}
