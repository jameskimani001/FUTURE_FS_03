'use client';

import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  premium: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock authentication service
class AuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'demo@soundsphere.com',
      name: 'Demo User',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      premium: true,
      createdAt: new Date()
    }
  ];

  private currentUser: User | null = null;

  async signIn(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.find(u => u.email === email);
    if (!user || password !== 'demo123') {
      throw new Error('Invalid credentials');
    }
    
    this.currentUser = user;
    localStorage.setItem('soundsphere_user', JSON.stringify(user));
    return user;
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (this.users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      premium: false,
      createdAt: new Date()
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('soundsphere_user', JSON.stringify(newUser));
    return newUser;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('soundsphere_user');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    const stored = localStorage.getItem('soundsphere_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    
    return null;
  }
}

export const authService = new AuthService();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.signIn(email, password);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const user = await authService.signUp(email, password, name);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const authContextValue = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};