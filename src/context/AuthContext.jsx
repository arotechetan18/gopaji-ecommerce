import { createContext, useContext, useEffect, useState } from 'react';
import { storage, KEYS } from '../utils/storage';
import { ROLES } from '../utils/constants';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// Seed demo accounts (only if not already present)
const seedUsers = () => {
  const existing = storage.get(KEYS.USERS, null);
  if (existing && existing.length > 0) return existing;

  const demoUsers = [
    {
      id: 1,
      name: 'Demo User',
      email: 'user@gopaji.com',
      password: 'user123',
      phone: '9999999999',
      role: ROLES.USER,
      disabled: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Demo Admin',
      email: 'admin@gopaji.com',
      password: 'admin123',
      phone: '8888888888',
      role: ROLES.ADMIN,
      disabled: false,
      createdAt: new Date().toISOString(),
    },
  ];
  storage.set(KEYS.USERS, demoUsers);
  return demoUsers;
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => seedUsers());
  const [currentUser, setCurrentUser] = useState(() =>
    storage.get(KEYS.CURRENT_USER, null)
  );
  const toast = useToast();

  useEffect(() => { storage.set(KEYS.USERS, users); }, [users]);
  useEffect(() => {
    if (currentUser) storage.set(KEYS.CURRENT_USER, currentUser);
    else storage.remove(KEYS.CURRENT_USER);
  }, [currentUser]);

  const register = ({ name, email, password, phone }) => {
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      toast.error('Email already registered');
      return { ok: false, error: 'Email already registered' };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone: phone || '',
      role: ROLES.USER,
      disabled: false,
      createdAt: new Date().toISOString(),
    };
    setUsers((u) => [...u, newUser]);
    setCurrentUser(newUser);
    toast.success(`Welcome to Gopaji, ${name}!`);
    return { ok: true, user: newUser };
  };

  const login = ({ email, password }) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!user || user.password !== password) {
      toast.error('Invalid email or password');
      return { ok: false, error: 'Invalid credentials' };
    }
    if (user.disabled) {
      toast.error('This account has been disabled');
      return { ok: false, error: 'Account disabled' };
    }
    setCurrentUser(user);
    toast.success(`Welcome back, ${user.name}!`);
    return { ok: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info('Logged out');
  };

  const isAdmin = currentUser?.role === ROLES.ADMIN;
  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        setUsers,
        register,
        login,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}