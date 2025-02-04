// app/product/[id]/page.tsx
"use client"
import React from 'react';
import { notFound } from 'next/navigation';

// Define Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
}

// Async function to simulate fetching product data
async function getProduct(id: string): Promise<Product | null> {
  // Simulate fetching product data (replace with actual API call)
  const product = {
    id,
    name: `Product ${id}`,
    description: `Description for Product ${id}`,
    price: 19.99 + parseFloat(id),
    image: `/images/product${id}.png`,
    sizes: ['S', 'M', 'L'],
  };

  return product || null; // Return product or null if not found
}

// Fetch product data based on dynamic ID from URL
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Get product data
  const product = await getProduct(id);

  // If product not found, render 404
  if (!product) {
    notFound();
  }

  // Render product details if found
  return (
    <div className="p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
      <div className="mt-2">
        <strong>Available Sizes:</strong> {product.sizes.join(', ')}
      </div>
    </div>
  );
};

export default ProductDetail;
