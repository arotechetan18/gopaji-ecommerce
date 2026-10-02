import { createContext, useContext, useEffect, useState } from 'react';
import { storage, KEYS } from '../utils/storage';
import { ORDER_STATUS } from '../utils/constants';

const OrderContext = createContext(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};

const generateOrderId = () =>
  'GPJ' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 90 + 10);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => storage.get(KEYS.ORDERS, []));

  useEffect(() => { storage.set(KEYS.ORDERS, orders); }, [orders]);

  const placeOrder = ({ user, customer, address, payment, items, totals }) => {
    const order = {
      id: generateOrderId(),
      userEmail: user?.email || 'guest',
      customer,
      address,
      payment,
      items,
      totals,
      status: ORDER_STATUS[0], // PENDING
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);
  const getOrdersByUser = (email) =>
    orders.filter((o) => o.userEmail === email);

  return (
    <OrderContext.Provider
      value={{ orders, placeOrder, updateStatus, getOrderById, getOrdersByUser }}
    >
      {children}
    </OrderContext.Provider>
  );
}