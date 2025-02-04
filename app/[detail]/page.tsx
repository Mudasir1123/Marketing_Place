// app/product/[id]/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Define Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  reviews: Review[];
}

// Define Review interface
interface Review {
  user: string;
  rating: number;
  comment: string;
}

// Async function to simulate fetching product data
async function getProduct(id: string): Promise<Product | null> {
  const product = {
    id,
    name: `Product ${id}`,
    description: `Description for Product ${id}`,
    price: 19.99 + parseFloat(id),
    image: `/images/product${id}.png`,
    sizes: ['S', 'M', 'L'],
    reviews: [
      { user: 'Jane Doe', rating: 5, comment: 'Amazing product! Highly recommend.' },
      { user: 'John Smith', rating: 4, comment: 'Good quality, but could be improved.' },
    ],
  };

  return product || null;
}

// Product Detail Component
const ProductDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(0);

  useEffect(() => {
    const fetchProductData = async () => {
      const fetchedProduct = await getProduct(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setReviews(fetchedProduct.reviews);
      } else {
        // Handle case if product is not found
        alert('Product not found');
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // Handle review submission
  const handleSubmitReview = () => {
    if (newRating < 1 || newRating > 5) {
      alert('Please provide a rating between 1 and 5');
      return;
    }
    const newReviewData: Review = {
      user: 'Anonymous', // Replace with actual user data in a real-world app
      rating: newRating,
      comment: newReview,
    };
    setReviews([...reviews, newReviewData]);
    setNewReview('');
    setNewRating(0);
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <div className="p-4">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
      <div className="mt-2">
        <strong>Available Sizes:</strong> {product.sizes.join(', ')}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <div className="average-rating mt-4">
          <p>
            <strong>Average Rating:</strong> {calculateAverageRating().toFixed(1)} / 5
          </p>
        </div>

        <div className="reviews-list mt-4">
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index} className="review-item mb-4 p-4 border rounded-lg">
                  <p><strong>{review.user}</strong> ({review.rating} / 5)</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        <div className="review-form mt-6">
          <h3 className="text-lg font-semibold mb-2">Submit Your Review</h3>
          <div className="rating mb-4">
            <label htmlFor="rating" className="block mb-2">Rating (1-5):</label>
            <input
              type="number"
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              min={1}
              max={5}
              className="input mb-4"
            />
          </div>
          <div className="comment mb-4">
            <label htmlFor="comment" className="block mb-2">Comment:</label>
            <textarea
              id="comment"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="textarea"
            />
          </div>
          <button onClick={handleSubmitReview} className="btn">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
