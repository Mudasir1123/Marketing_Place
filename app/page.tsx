"use client";
import React, { useState } from 'react';
import './globals.css';
import ProductList from './Components/ProductList';
import CategoryComponent from './Components/categoryComponent';
import SearchBar from './Components/SearchBar';
import { CartProvider } from './Components/CartContext';
import { WishlistProvider } from './Components/WishlistContext'; // Ensure this import is present
import CartComponent from './Components/CartComponent';
import WishlistComponent from './Components/WishlistComponent';
import UserProfile from './Components/UserProfile'; // Ensure this import is present

const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Books' },
];

const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 19.99,
    image: '/Screenshot.png',
    stock: 10,
    category: '1', // Electronics
    tags: ['tech', 'gadgets'],
    customWidth: 500,
    customHeight: 350,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 29.99,
    image: '/Screenshot (35).png',
    stock: 0,
    category: '2', // Clothing
    tags: ['fashion', 'apparel'],
    customWidth: 500,
    customHeight: 350,
  },
  {
    id: '3',
    name: 'Product 3',
    price: 39.99,
    image: '/Screenshot (36).png',
    stock: 5,
    category: '3', // Books
    tags: ['literature', 'novel'],
    customWidth: 500,
    customHeight: 350,
  },
  {
    id: '4',
    name: 'Product 4',
    price: 39.99,
    image: '/Screenshot (36).png',
    stock: 5,
    category: '1', // Electronics
    tags: ['tech', 'gadget'],
    customWidth: 500,
    customHeight: 350,
  },
  {
    id: '5',
    name: 'Product 5',
    price: 39.99,
    image: '/Screenshot (36).png',
    stock: 5,
    category: '2', // Clothing
    tags: ['fashion', 'apparel'],
    customWidth: 500,
    customHeight: 350,
  },
];

const Page: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <>
    <CartProvider>
      <WishlistProvider> {/* Wrap the components that need Wishlist context */}
        <div className="p-4">
          <h1 className="text-center mb-4">Product List</h1>

          {/* Category Filter */}
          <CategoryComponent
            categories={categories}
            products={products}
            setFilteredProducts={setFilteredProducts}
          />

          {/* Search Bar */}
          <SearchBar
            products={products}
            setFilteredProducts={setFilteredProducts}
          />

          {/* Product List */}
          <ProductList products={filteredProducts} />

          {/* Cart Component */}
          <CartComponent />

          {/* Wishlist Component */}
          <WishlistComponent /> {/* This component will now work */}
        </div>
      </WishlistProvider>
    </CartProvider>
    </>
    
  );
};

export default Page;
