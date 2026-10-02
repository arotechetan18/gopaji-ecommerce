// Reusable localStorage helpers — कोणतीही DB नाही, फक्त browser storage
const PREFIX = 'gopaji_';

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },
  clear() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};

// Storage keys — single source of truth
export const KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  USERS: 'users',
  CURRENT_USER: 'currentUser',
  ORDERS: 'orders',
  SUBSCRIPTIONS: 'subscriptions',
  CONTACT_MESSAGES: 'contactMessages',
  ADMIN_PRODUCTS: 'adminProducts',
  ADMIN_CATEGORIES: 'adminCategories',
  ADVERTISEMENTS: 'advertisements',
};