// components/ReviewsAndRatings.tsx

import React, { useState } from 'react';
import '../globals.css';
// Define types for review data
interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Product {
  id: string;
  name: string;
  reviews: Review[];
}

const ReviewsAndRatings: React.FC<{ product: Product }> = ({ product }) => {
  const [newReview, setNewReview] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>(product.reviews);

  // Calculate the average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  // Handle new review submission
  const handleSubmitReview = () => {
    if (newRating < 1 || newRating > 5) {
      alert('Please provide a rating between 1 and 5');
      return;
    }
    const newReviewData: Review = {
      user: 'Anonymous', // You can replace this with actual user data in a real-world app
      rating: newRating,
      comment: newReview,
    };
    setReviews([...reviews, newReviewData]);
    setNewReview('');
    setNewRating(0);
  };

  return (
    <div className="reviews-container p-4">
      <h2 className="text-2xl font-semibold mb-4">Reviews & Ratings</h2>

      {/* Display Average Rating */}
      <div className="average-rating mb-4">
        <p>
          <strong>Average Rating:</strong>{' '}
          {calculateAverageRating().toFixed(1)} / 5
        </p>
      </div>

      {/* Display Individual Reviews */}
      <div className="individual-reviews mb-6">
        <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
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

      {/* Review Submission Form */}
      <div className="review-form mt-6">
        <h3 className="text-xl mb-2">Submit Your Review</h3>
        <div className="rating mb-4">
          <label htmlFor="rating" className="block mb-2">
            Rating (1-5):
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            min={1}
            max={5}
            className="input mb-4"
          />
        </div>
        <div className="comment mb-4">
          <label htmlFor="comment" className="block mb-2">
            Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
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
  );
};

export default ReviewsAndRatings;
