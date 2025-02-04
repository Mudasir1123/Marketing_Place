// components/CheckoutFlow.tsx

import React, { useState } from 'react';

// Define types for form data
interface BillingAddress {
    name: string;
    address: string;
    city: string;
    zip: string;
    country: string;
}

interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    zip: string;
    country: string;
}

interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

const CheckoutFlow: React.FC = () => {
    const [step, setStep] = useState(1); // Step state to control form progression
    const [billingAddress, setBillingAddress] = useState<BillingAddress>({
        name: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    });

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        name: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    });

    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    // Handle form changes for each step
    const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
    };

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    // Step navigation
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Render the checkout form based on the current step
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-2xl mb-4">Billing Address</h2>
                        <input
                            type="text"
                            name="name"
                            value={billingAddress.name}
                            onChange={handleBillingChange}
                            placeholder="Full Name"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="address"
                            value={billingAddress.address}
                            onChange={handleBillingChange}
                            placeholder="Address"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="city"
                            value={billingAddress.city}
                            onChange={handleBillingChange}
                            placeholder="City"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="zip"
                            value={billingAddress.zip}
                            onChange={handleBillingChange}
                            placeholder="ZIP Code"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="country"
                            value={billingAddress.country}
                            onChange={handleBillingChange}
                            placeholder="Country"
                            className="input mb-4"
                        />
                        <button onClick={nextStep} className="btn">Next</button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-2xl mb-4">Shipping Address</h2>
                        <input
                            type="text"
                            name="name"
                            value={shippingAddress.name}
                            onChange={handleShippingChange}
                            placeholder="Full Name"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="address"
                            value={shippingAddress.address}
                            onChange={handleShippingChange}
                            placeholder="Address"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleShippingChange}
                            placeholder="City"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="zip"
                            value={shippingAddress.zip}
                            onChange={handleShippingChange}
                            placeholder="ZIP Code"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="country"
                            value={shippingAddress.country}
                            onChange={handleShippingChange}
                            placeholder="Country"
                            className="input mb-4"
                        />
                        <div className="flex justify-between">
                            <button onClick={prevStep} className="btn">
                                Back
                            </button>
                            <button onClick={nextStep} className="btn">
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-2xl mb-4">Payment Details</h2>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="Card Number"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handlePaymentChange}
                            placeholder="Expiry Date (MM/YY)"
                            className="input mb-4"
                        />
                        <input
                            type="text"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handlePaymentChange}
                            placeholder="CVV"
                            className="input mb-4"
                        />
                        <div className="flex justify-between">
                            <button onClick={prevStep} className="btn">
                                Back
                            </button>
                            <button onClick={() => alert('Checkout complete!')} className="btn">
                                Complete Purchase
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="checkout-container p-4">
            <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
            {renderStep()}
        </div>
    );
};

export default CheckoutFlow;
