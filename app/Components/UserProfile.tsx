// components/UserProfile.tsx

import React, { useState } from 'react';
import '../globals.css';
// Define types for user profile data
interface Address {
  id: string;
  label: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  items: string[];
}

interface UserProfileData {
  name: string;
  email: string;
  savedAddresses: Address[];
  orderHistory: Order[];
}

const UserProfile: React.FC = () => {
  // Simulate user data (In a real-world app, this would come from an API)
  const userData: UserProfileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    savedAddresses: [
      {
        id: '1',
        label: 'Home Address',
        address: '1234 Elm Street, Springfield, IL',
      },
      {
        id: '2',
        label: 'Work Address',
        address: '5678 Oak Street, Springfield, IL',
      },
    ],
    orderHistory: [
      {
        id: '101',
        date: '2025-01-10',
        total: 59.99,
        items: ['Product 1', 'Product 2'],
      },
      {
        id: '102',
        date: '2025-01-15',
        total: 89.99,
        items: ['Product 3', 'Product 4', 'Product 5'],
      },
    ],
  };

  // State for showing user details
  const [showAddress, setShowAddress] = useState<boolean>(false);

  // Toggle address section visibility
  const toggleAddress = () => setShowAddress((prev) => !prev);

  return (
    <div className="profile-container p-6">
      <h1 className="text-3xl font-semibold mb-6">User Profile</h1>

      {/* User Details */}
      <div className="user-details mb-6">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>

      {/* Saved Addresses */}
      <div className="saved-addresses mb-6">
        <h2 className="text-2xl mb-4">Saved Addresses</h2>
        <button onClick={toggleAddress} className="btn mb-4">
          {showAddress ? 'Hide Addresses' : 'Show Addresses'}
        </button>
        {showAddress && (
          <ul>
            {userData.savedAddresses.map((address) => (
              <li key={address.id} className="address-item mb-2">
                <strong>{address.label}:</strong> {address.address}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Order History */}
      <div className="order-history">
        <h2 className="text-2xl mb-4">Order History</h2>
        <ul>
          {userData.orderHistory.map((order) => (
            <li key={order.id} className="order-item mb-4">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Items:</strong> {order.items.join(', ')}</p>
              <button
                className="btn"
                onClick={() => alert(`Navigating to order details for Order #${order.id}`)}
              >
                View Order Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
