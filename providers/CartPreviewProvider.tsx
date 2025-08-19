'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { getCartPreview } from '@/lib/shop/cart';
import { CartPreviewType } from '@/types/Cart/CartPreview';

interface CartPreviewContextType {
  cartPreview: CartPreviewType | null;
  loading: boolean;
  error: string | null;
  fetchCartPreview: () => Promise<void>;
  refreshCartPreview: () => Promise<void>;
  setCartPreview: React.Dispatch<React.SetStateAction<CartPreviewType | null>>;
}

const CartPreviewContext = createContext<CartPreviewContextType | undefined>(undefined);

export function CartPreviewProvider({ children }: { children: React.ReactNode }) {
  const [cartPreview, setCartPreview] = useState<CartPreviewType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartPreview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const preview = await getCartPreview();
      setCartPreview(preview);
    } catch {
      setError('Failed to fetch cart preview');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshCartPreview = fetchCartPreview;

  return (
    <CartPreviewContext.Provider
      value={{
        cartPreview,
        loading,
        error,
        fetchCartPreview,
        refreshCartPreview,
        setCartPreview,
      }}
    >
      {children}
    </CartPreviewContext.Provider>
  );
}

export function useCartPreview() {
  const context = useContext(CartPreviewContext);
  if (!context) {
    throw new Error('useCartPreview must be used within a CartPreviewProvider');
  }
  return context;
}