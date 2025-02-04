// context/WishlistContext.tsx

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Define product type for the wishlist
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  customWidth: number;
  customHeight: number;
};

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  // Load wishlist from local storage, or set to an empty array if not available
  const loadWishlistFromLocalStorage = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  };

  const [wishlistItems, setWishlistItems] = useState<Product[]>(loadWishlistFromLocalStorage());

  const addToWishlist = (product: Product) => {
    const newWishlist = [...wishlistItems, product];
    setWishlistItems(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist)); // Save to local storage
  };

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update local storage
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist'); // Remove from local storage
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
