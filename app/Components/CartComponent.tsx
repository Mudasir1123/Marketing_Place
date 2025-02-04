// components/CartComponent.tsx

import React from 'react';
import { useCart } from './CartContext';

const CartComponent: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                    style={{ width: item.customWidth, height: item.customHeight }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price} each</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border rounded-lg mr-2"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded-lg ml-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total mt-4 flex justify-between">
            <span className="font-semibold">Total Price:</span>
            <span className="text-lg font-bold">${calculateTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
