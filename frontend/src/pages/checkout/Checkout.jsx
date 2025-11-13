import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import logo from '../../assets/images/xelite silk.svg';
import { Link } from 'react-router-dom';
import { BaseUrl } from '../../utils/BaseUrl';
import { deleteProduct } from '../../store/productSlice';

const Checkout = () => {
  const { productData: cartItems, userInfo } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United States',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    email: 'gm6681328@gmail.com',
    acceptNewsletter: true,
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    nameOnCard: '',
    useSameAddress: true,
    rememberMe: true,
    mobileNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast.error('Please fill in all required delivery information');
      return;
    }

    setIsProcessing(true);

    const checkoutPayload = {
   email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      phoneNumber: formData.mobileNumber,
      note: formData.note || '',
      userId: userInfo?._id || null,
      delivery: {
        country: formData.country,
        addressLine1: formData.address,
        addressLine2: formData.apartment,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      productIds: cartItems.map(item => item._id),
      totalBill: calculateTotal(),
      paymentMethod: paymentMethod
    };

    try {
      const response = await fetch(`${BaseUrl}/checkout/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutPayload)
      });

      const data = await response.json();
       
       
        
      if (!response.ok) {
        throw new Error(data.message || 'Could not create checkout');
      }

      toast.success('Order placed successfully!');

      if (cartItems && cartItems.length) {
        cartItems.forEach(item => {
          try {
            dispatch(deleteProduct(item._id));
            //  navigate('/thank-you');
          } catch (err) {
          }
        });
      }
     
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link to={'/'} className="flex items-center">
              <img src={logo} className='w-32' alt='' />
            </Link>
            <div className="flex items-center">
              <div className="relative">
                <svg className="w-8 h-8 text-[#C5A980]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className=''>
            {/* Express Checkout */}
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-600 text-center mb-4">Express checkout</h2>
              <div className="flex gap-2 mb-4">
                <button className="flex-1 bg-[#5a31f4] hover:bg-[#4d28d4] text-white py-3 px-4 rounded font-medium flex items-center justify-center gap-2">
                  <span className="font-bold">shop</span>
                </button>
                <button className="flex-1 bg-[#ffc439] hover:bg-[#f0b429] text-gray-900 py-3 px-4 rounded font-medium flex items-center justify-center">
                  <span className="font-bold">PayPal</span>
                </button>
                <button className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-4 rounded font-medium flex items-center justify-center gap-2">
                  <span className="font-bold">G Pay</span>
                </button>
              </div>
              <div className="text-center">
                <span className="text-gray-500 text-sm">OR</span>
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
                <button className="ml-2 text-gray-400 hover:text-gray-600">⋮</button>
              </div>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  name="acceptNewsletter"
                  checked={formData.acceptNewsletter}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4 text-blue-600 rounded"
                />
                Email me with news and offers
              </label>
            </div>

            {/* Delivery Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Delivery</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1.5 text-gray-700">Country/Region</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name *"
                    className="border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name *"
                    className="border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company (optional)"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address *"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City *"
                    className="border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State *"
                    className="border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP / Postal code *"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Shipping method</h2>
              <p className="text-sm text-gray-500 mb-4">Enter your shipping address to view available shipping methods.</p>
            </div>

            {/* Payment Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Payment</h2>
              <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>

              {/* Payment Method Selection */}
              <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                {/* Credit Card Option */}
                <div 
                  className={`border-b border-gray-300 ${paymentMethod === 'credit-card' ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="font-medium">Credit card</span>
                    </div>
                    <div className="flex gap-1">
                      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" alt="Visa" className="h-6" />
                      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/ae9ceec48b1dc489596c.svg" alt="Mastercard" className="h-6" />
                      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/37fc65d50b3516d40c17.svg" alt="Amex" className="h-6" />
                      <span className="text-gray-400 text-sm ml-1">+4</span>
                    </div>
                  </label>

                  {paymentMethod === 'credit-card' && (
                    <div className="p-4 pt-4 bg-white space-y-3">
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="Card number"
                          className="w-full border border-gray-300 rounded px-3 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleInputChange}
                          placeholder="Expiration date (MM / YY)"
                          className="border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="relative">
                          <input
                            type="text"
                            name="securityCode"
                            value={formData.securityCode}
                            onChange={handleInputChange}
                            placeholder="Security code"
                            className="w-full border border-gray-300 rounded px-3 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="absolute right-3 top-3 text-gray-400 cursor-help">ⓘ</span>
                        </div>
                      </div>

                      <input
                        type="text"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        placeholder="Name on card"
                        className="w-full border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label className="flex items-center text-sm mt-3">
                        <input
                          type="checkbox"
                          name="useSameAddress"
                          checked={formData.useSameAddress}
                          onChange={handleInputChange}
                          className="mr-2 w-4 h-4 text-blue-600 rounded"
                        />
                        Use shipping address as billing address
                      </label>
                    </div>
                  )}
                </div>

                {/* PayPal Option */}
                <div 
                  className={`border-b border-gray-300 ${paymentMethod === 'paypal' ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="font-medium">PayPal</span>
                    </div>
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6" />
                  </label>
                </div>

                {/* Shop Pay Option */}
                <div 
                  className={`${paymentMethod === 'shop-pay' ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="shop-pay"
                        checked={paymentMethod === 'shop-pay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="font-medium">Shop Pay</span>
                    </div>
                    <span className="text-sm text-gray-600">Pay in full or in installments</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Remember me</h2>
              <label className="flex items-start text-sm">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4 text-blue-600 rounded mt-0.5"
                />
                <span>Save my information for a faster checkout with a Shop account</span>
              </label>

              <div className="mt-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 text-blue-600 rounded"
                  />
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Mobile phone number"
                    className="flex-1 border-b border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure and encrypted
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-[#C5A980] hover:bg-[#C5A980] text-white py-3.5 rounded-md font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isProcessing ? 'Processing...' : 'Pay now'}
            </button>

            <p className="text-xs text-gray-500 text-center mb-4">
              Your info will be saved to a Shop account. By continuing, you agree to Shop's{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and acknowledge the{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-4 text-xs text-blue-600 justify-center">
              <a href="#" className="hover:underline">Refund policy</a>
              <a href="#" className="hover:underline">Shipping</a>
              <a href="#" className="hover:underline">Privacy policy</a>
              <a href="#" className="hover:underline">Terms of service</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Cart Items */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {cartItems?.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item?.image || '/placeholder.jpg'}
                        alt={item?.title}
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item?.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item?.title}</h3>
                      <p className="text-xs text-gray-500 truncate">{item?.subtitle}</p>
                    </div>
                    <div className="text-sm font-medium flex-shrink-0">${(item?.price * item?.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="px-6 pb-4 border-t border-gray-200 pt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code or gift card"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded text-sm font-medium">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="px-6 pb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal · {cartItems?.length || 0} items</span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    Shipping
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-gray-500 text-xs">Enter shipping address</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>
                    <span className="text-xs text-gray-500 font-normal mr-1">USD</span>
                    ${calculateTotal()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;