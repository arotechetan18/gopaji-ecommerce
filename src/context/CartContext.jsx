import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage, KEYS } from '../utils/storage';
import { DELIVERY } from '../utils/constants';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => storage.get(KEYS.CART, []));
  const toast = useToast();

  useEffect(() => {
    storage.set(KEYS.CART, items);
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
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
          stock: product.stock,
          qty,
        },
      ];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.info('Item removed from cart');
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.min(qty, i.stock || 99) } : i
      )
    );
  };

  const increment = (id) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.min(i.qty + 1, i.stock || 99) } : i
      )
    );
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const mrpTotal = items.reduce((sum, i) => sum + i.mrp * i.qty, 0);
    const discount = mrpTotal - subtotal;
    const delivery =
      subtotal === 0 || subtotal >= DELIVERY.FREE_ABOVE ? 0 : DELIVERY.CHARGE;
    const total = subtotal + delivery;
    const count = items.reduce((s, i) => s + i.qty, 0);
    return { subtotal, mrpTotal, discount, delivery, total, count };
  }, [items]);

  const value = {
    items,
    ...totals,
    addItem,
    removeItem,
    updateQty,
    increment,
    decrement,
    clear,
    isInCart: (id) => items.some((i) => i.id === id),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}