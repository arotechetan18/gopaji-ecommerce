import { createContext, useContext, useEffect, useState } from 'react';
import { storage, KEYS } from '../utils/storage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => storage.get(KEYS.WISHLIST, []));
  const toast = useToast();

  useEffect(() => { storage.set(KEYS.WISHLIST, items); }, [items]);

  const toggle = (product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        toast.info(`${product.name} removed from wishlist`);
        return prev.filter((i) => i.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist`);
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          mrp: product.mrp,
          weight: product.weight,
          flavor: product.flavor,
          packetColors: product.packetColors,
          rating: product.rating,
          stock: product.stock,
        },
      ];
    });
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  const isWishlisted = (id) => items.some((i) => i.id === id);

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        toggle,
        remove,
        clear,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}