import React, { useState } from 'react';

interface FilterPanelProps {
  products: any[]; // Define your product type here
  setFilteredProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ products, setFilteredProducts }) => {
  const [priceRange, setPriceRange] = useState([0, 100]); // Price range [min, max]
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Handle filtering based on price range
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRange = [...priceRange];
    newRange[Number(e.target.name)] = Number(e.target.value);
    setPriceRange(newRange);
  };

  // Handle filtering based on selected brand
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  // Handle filtering based on in-stock availability
  const handleInStockToggle = () => {
    setInStockOnly(!inStockOnly);
  };

  // Apply filters to the product list
  const applyFilters = () => {
    let filtered = products;

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brand if selected
    if (selectedBrand !== 'all') {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    // Filter by stock availability
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    setFilteredProducts(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 100]);
    setSelectedBrand('all');
    setInStockOnly(false);
    setFilteredProducts(products);
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      {/* Price Range Filter */}
      <div className="filter-option">
        <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <input
          type="range"
          name="0"
          min="0"
          max="1000"
          value={priceRange[0]}
          onChange={handlePriceRangeChange}
          className="price-range-slider"
        />
        <input
          type="range"
          name="1"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={handlePriceRangeChange}
          className="price-range-slider"
        />
      </div>

      {/* Brand Filter */}
      <div className="filter-option">
        <label>Brand:</label>
        <select
          value={selectedBrand}
          onChange={handleBrandChange}
          className="brand-selector"
        >
          <option value="all">All Brands</option>
          <option value="brand1">Brand 1</option>
          <option value="brand2">Brand 2</option>
          <option value="brand3">Brand 3</option>
        </select>
      </div>

      {/* In Stock Filter */}
      <div className="filter-option">
        <label>In Stock Only:</label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={handleInStockToggle}
          className="stock-toggle"
        />
      </div>

      {/* Apply Filters Button */}
      <div className="filter-actions">
        <button onClick={applyFilters} className="apply-filters-btn">
          Apply Filters
        </button>
        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
