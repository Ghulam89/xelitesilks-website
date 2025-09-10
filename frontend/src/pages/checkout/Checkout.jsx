import { useState } from 'react';
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import logo from "../../assets/images/google-logo.png";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Checkout = () => {
  const { productData: cartItems } = useSelector((state) => state.product);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    note: '',
    acceptTerms: false
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
    setIsProcessing(true);

    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      setIsProcessing(false);
      return;
    }

    const checkoutPayload = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
      companyName: formData.companyName,
      note: formData.note,
      delivery: {
        country: formData.country,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        addressLine1: formData.address1,
        addressLine2: formData.address2
      },
      productIds: cartItems.map(item => item._id),
      totalBill: calculateTotal(),
      userId: localStorage.getItem('userId') || null
    };

    try {
      const response = await fetch('http://localhost:8000/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(checkoutPayload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Could not create checkout');
      }

      toast.success('Order placed successfully!');
      // Redirect to confirmation page or clear cart
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button className="bg-black flex max-w-md w-full mx-auto mb-5 justify-center gap-2 items-center text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors">
            Buy with <img src={logo} className="w-5 h-5" alt="Google" /> Pay
          </button>
        </div>

        <div className="flex justify-center items-center mb-8">
          <span className="text-gray-500 text-sm">- OR -</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Billing Details Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white border border-gray-200 rounded-sm p-6">
                <h4 className="text-lg font-semibold mb-4">Billing Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-1">
                    <Input
                      label={"First Name"}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"First Name"}
                      star={"*"}
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Input
                      label={"Last Name"}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"Last Name"}
                      star={"*"}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"Company Name (optional)"}
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"Company Name"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"Country / Region"}
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"Select Country"}
                      star={"*"}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"Street address"}
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"}
                      placeholder={"House number and street name"}
                      star={"*"}
                      required
                    />
                    <Input
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"Apartment, suite, unit, etc. (optional)"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"Town / City"}
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"City"}
                      star={"*"}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"State"}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"State"}
                      star={"*"}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"ZIP Code"}
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"ZIP Code"}
                      star={"*"}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"Phone"}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"Phone"}
                      star={"*"}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label={"Email Address"}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={"bg-gray-50 w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"}
                      placeholder={"Email Address"}
                      star={"*"}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm mt-6 p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order notes (optional)
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full bg-gray-50 p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-1/2">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Your Order</h4>

                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <p className="font-semibold">Product</p>
                    <p className="font-semibold">Subtotal</p>
                  </li>
                  {cartItems?.map((item, index) => (
                    <li key={index} className="flex justify-between items-center pt-2">
                      <p className="text-black">{item?.title} x {item?.quantity}</p>
                      <p>${(item?.price * item?.quantity).toFixed(2)}</p>
                    </li>
                  ))}

                  <li className="flex justify-between items-center pt-2">
                    <p>Subtotal</p>
                    <p>${calculateTotal()}</p>
                  </li>
                  <li className="flex justify-between items-center pt-2 font-semibold text-lg">
                    <p>Total</p>
                    <p>${calculateTotal()}</p>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg mt-6 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <p className="font-medium">Credit Card</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'https://umbrellapackaging.com/wp-content/plugins/woocommerce-square/build/images/card-visa.svg',
                      'https://umbrellapackaging.com/wp-content/plugins/woocommerce-square/build/images/card-mastercard.svg',
                      'https://umbrellapackaging.com/wp-content/plugins/woocommerce-square/build/images/card-amex.svg',
                      'https://umbrellapackaging.com/wp-content/plugins/woocommerce-square/build/images/card-discover.svg',
                      'https://umbrellapackaging.com/wp-content/plugins/woocommerce-square/build/images/card-dinersclub.svg',
                      'https://umbrellapackaging.com/wp-content/plugins/woocommerce-square/build/images/card-jcb.svg',
                      'https://umbrellapackaging.com/wp-content/plugins/woocommerce-square/build/images/card-unionpay.svg'
                    ].map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt=""
                        className="w-8 h-8 object-contain"
                      />
                    ))}
                  </div>
                </div>

                  <div  className=' w-full'>
                  <PayPalScriptProvider
  options={{
    clientId: "AaiAjek2ug7UzUcX5mP4GKDsJKZaGSbmn0kHFehtED8KW4ANIc3MM_EwgV1upOlK8D7zPe8L_ypWfYmp",
    currency: "USD",
    intent: "capture",
    commit: true,
    components: "buttons,card-fields", 
    enableFunding: "card,paylater",
    disableFunding: "credit,venmo,sepa,bancontact,eps,giropay,ideal,mybank,p24,sofort"
  }}
>
                  <PayPalButtons
                    fundingSource={FUNDING.PAYPAL}
                    style={{
                      layout: "vertical",
                      color: "gold",
                      shape: "rect",
                      label: "checkout",
                      height: 48
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: calculateTotal(),
                              currency_code: "USD",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      try {
                        const details = await actions.order.capture();
                        const newCaptureId = details?.purchase_units[0]?.payments?.captures[0]?.id;
                        
                        if (!newCaptureId) {
                          toast.error("No Capture ID received. Please try again.");
                          return;
                        }
                        document.querySelector('form').requestSubmit();
                      } catch (error) {
                        console.error("Error:", error);
                        toast.error("Payment failed. Please try again.");
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      toast.error("An error occurred with PayPal. Please try again.");
                    }}
                  />
                </PayPalScriptProvider>
                  </div>

                <p className="text-sm text-gray-600 mb-4">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                  <a href="#" className="text-blue-600 hover:underline">privacy policy</a>.
                </p>

                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I have read and agree to the website terms and conditions.
                  </label>
                </div>

                <Button
                  type="submit"
                  label={isProcessing ? 'Processing...' : 'Place order'}
                  disabled={isProcessing}
                  className={`w-full bg-[#4440E6] hover:bg-orange-500 text-white py-3 px-4 rounded-md font-medium transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;