// components/CategoryComponent.tsx

import React, { useState, useEffect } from 'react';

// Category type
type Category = {
  id: string;
  name: string;
};

// Product type
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  customWidth: number;
  customHeight: number;
};

interface CategoryComponentProps {
  categories: Category[];
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
  categories,
  products,
  setFilteredProducts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  }, [selectedCategory, products, setFilteredProducts]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-lg ${
            !selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
