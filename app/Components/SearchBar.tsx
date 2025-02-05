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
  const [suggestions, setSuggestions] = useState<Product[]>([]);

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

    // Show suggestions for matching product names
    const productSuggestions = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    setSuggestions(productSuggestions);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="mb-6 relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search for products..."
        className="w-full p-2 border rounded-lg"
      />
      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && searchQuery && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
          <ul>
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSearchQuery(product.name); // Set the search query to the selected product name
                  setFilteredProducts([product]); // Filter to only the selected product
                  setSuggestions([]); // Hide suggestions
                }}
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {noResultsFound && (
        <p className="text-red-500 mt-2">No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchBar;
