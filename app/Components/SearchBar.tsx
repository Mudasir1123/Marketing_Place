import React, { useState } from 'react';

// Product type (with tags as an optional field)
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  tags?: string[]; // Optional tags field
  customWidth: number;
  customHeight: number;
};

interface SearchBarProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ products, setFilteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [noResultsFound, setNoResultsFound] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(lowercasedQuery)))
    );

    // Set filtered products and check if there are any results
    setFilteredProducts(filteredProducts);
    setNoResultsFound(filteredProducts.length === 0); // If no results, set to true
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search for products..."
        className="w-full p-2 border rounded-lg"
      />
      {noResultsFound && (
        <p className="text-red-500 mt-2">No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchBar;
