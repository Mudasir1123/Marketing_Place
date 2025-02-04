// components/WishlistComponent.tsx

import React from 'react';
import { useWishlist } from './WishlistContext';

const WishlistComponent: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="wishlist-container p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty</p>
      ) : (
        <div>
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                    style={{ width: item.customWidth, height: item.customHeight }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-red-600"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="wishlist-clear mt-4">
            <button
              className="text-red-600 hover:text-red-800"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistComponent;
