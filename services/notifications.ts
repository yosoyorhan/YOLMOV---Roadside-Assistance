import { Request, Offer } from '../types';

const LS_KEYS = {
  notifications: 'yolmov_notifications'
};

export interface Notification {
  id: string;
  type: 'offer_received' | 'offer_accepted' | 'offer_rejected' | 'request_matched' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedId?: string; // request or offer ID
}

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

function genId(prefix: string) {
  return prefix + '-' + Math.random().toString(36).slice(2, 9);
}

export function createNotification(data: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification {
  const notifications = load<Notification>(LS_KEYS.notifications);
  const notification: Notification = {
    id: genId('NOTIF'),
    timestamp: new Date().toISOString(),
    read: false,
    ...data
  };
  notifications.unshift(notification); // Add to beginning
  save(LS_KEYS.notifications, notifications);
  return notification;
}

export function getNotifications(): Notification[] {
  return load<Notification>(LS_KEYS.notifications);
}

export function markAsRead(notificationId: string) {
  const notifications = load<Notification>(LS_KEYS.notifications);
  const notif = notifications.find(n => n.id === notificationId);
  if (notif) {
    notif.read = true;
    save(LS_KEYS.notifications, notifications);
  }
}

export function markAllAsRead() {
  const notifications = load<Notification>(LS_KEYS.notifications);
  notifications.forEach(n => n.read = true);
  save(LS_KEYS.notifications, notifications);
}

export function clearNotifications() {
  localStorage.removeItem(LS_KEYS.notifications);
}

export function getUnreadCount(): number {
  const notifications = load<Notification>(LS_KEYS.notifications);
  return notifications.filter(n => !n.read).length;
}

// Helper: Trigger notification when offer is created
export function notifyOfferReceived(requestId: string, partnerId: string, price: number) {
  createNotification({
    type: 'offer_received',
    title: 'Yeni Teklif Alındı',
    message: `${partnerId} size ₺${price} tutarında teklif gönderdi.`,
    relatedId: requestId
  });
}

// Helper: Trigger notification when offer is accepted
export function notifyOfferAccepted(offerId: string, requestId: string) {
  createNotification({
    type: 'offer_accepted',
    title: 'Teklif Kabul Edildi',
    message: `Teklifiniz müşteri tarafından kabul edildi.`,
    relatedId: offerId
  });
}

// Helper: Trigger notification when offer is rejected
export function notifyOfferRejected(offerId: string, requestId: string) {
  createNotification({
    type: 'offer_rejected',
    title: 'Teklif Reddedildi',
    message: `Teklifiniz müşteri tarafından reddedildi.`,
    relatedId: offerId
  });
}

// Seed demo notifications
export function seedDemoNotifications() {
  if (getNotifications().length > 0) return;
  
  createNotification({
    type: 'system',
    title: 'Hoş Geldiniz',
    message: 'YOLMOV platformuna hoş geldiniz! İlk hizmetinizi başlatmak için bir talep oluşturun.'
  });

  createNotification({
    type: 'offer_received',
    title: 'Yeni Teklif',
    message: 'Yılmaz Oto Kurtarma size ₺850 tutarında teklif gönderdi.',
    relatedId: 'REQ-demo1'
  });
}
