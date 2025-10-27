import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import { Package, Calendar, MapPin, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useSelector } from 'react-redux'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // Removed filter functionality - showing all orders
  const [userId, setUserId] = useState(null)

  // Get user ID from Redux store or localStorage
  const userInfo = useSelector((state) => state.product.userInfo)

  // Handle userId initialization for SSR compatibility
  useEffect(() => {
    console.log('UserInfo from Redux:', userInfo) // Debug log
    
    if (userInfo && userInfo._id) {
      console.log('Using user ID from Redux:', userInfo._id) // Debug log
      setUserId(userInfo._id)
    } else if (typeof window !== 'undefined') {
      // Try to get user from localStorage if Redux doesn't have it
      const storedUser = localStorage.getItem('user')
      console.log('Stored user from localStorage:', storedUser) // Debug log
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          console.log('Parsed user:', parsedUser) // Debug log
          
          if (parsedUser._id) {
            console.log('Using user ID from localStorage:', parsedUser._id) // Debug log
            setUserId(parsedUser._id)
          }
        } catch (error) {
          console.error('Error parsing stored user:', error)
        }
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (userId) {
      fetchOrders()
    } else {
      setLoading(false)
      setError('Please log in to view your orders')
    }
  }, [currentPage, userId])

  const fetchOrders = async () => {
    if (!userId) return
    
    try {
      setLoading(true)
      console.log('Fetching orders for userId:', userId) // Debug log
      
      const response = await axios.get(`${BaseUrl}/checkout/getByUser/${userId}`, {
        params: {
          page: currentPage,
          limit: 10
        }
      })
      
      console.log('Orders API response:', response.data) // Debug log
      
      if (response.data.status === 'success') {
        setOrders(response.data.data)
        setTotalPages(response.data.pagination.totalPages)
        console.log('Orders set:', response.data.data) // Debug log
      }
    } catch (err) {
      setError('Failed to fetch orders')
      console.error('Error fetching orders:', err)
      console.error('Error response:', err.response?.data) // Debug log
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'Completed':
        return 'text-green-600 bg-green-100'
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'Failed':
        return 'text-red-600 bg-red-100'
      case 'Refunded':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path, prepend the base URL
    if (imageUrl.startsWith('/')) {
      return `${BaseUrl}${imageUrl}`;
    }
    
    // If it doesn't start with /, assume it's relative to the backend
    return `${BaseUrl}/${imageUrl}`;
  };

  if (loading) {
  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-normal text-gray-900 mb-8">Orders</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading orders...</p>
        </div>
      </main>
    )
  }

  

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-normal text-gray-900 mb-8">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600">Go to store to place an order.</p>
          <a 
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Date: {formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Total: {formatPrice(order.totalBill)}</span>
                    </div>
                    {order.note && (
                      <div className="flex items-start">
                        <span className="text-gray-600">Note: {order.note}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Delivery Address</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{order.delivery.addressLine1}</span>
                    </div>
                    {order.delivery.addressLine2 && (
                      <div className="ml-6">{order.delivery.addressLine2}</div>
                    )}
                    <div className="ml-6">
                      {order.delivery.city}, {order.delivery.state} {order.delivery.zipCode}
                    </div>
                    <div className="ml-6">{order.delivery.country}</div>
                  </div>
                </div>
              </div>

              {/* Products */}
              {order.productIds && order.productIds.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Products</h4>
                  <div className="space-y-3">
                    {order.productIds.map((product, index) => {
                      console.log('Product data:', product); // Debug log
                      console.log('Product images:', product.images); // Debug log
                      
                      return (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        {product.images && product.images.length > 0 ? (
                          <img 
                            src={formatImageUrl(product.images[0].url)} 
                            alt={product.images[0].altText || product.name}
                            className="w-16 h-16 object-cover rounded-md"
                            onError={(e) => {
                              console.error('Image load error:', e.target.src);
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{product.name}</h5>
                          {product.size && (
                            <p className="text-sm text-gray-600">Size: {product.size}</p>
                          )}
                          {product.material && (
                            <p className="text-sm text-gray-600">Material: {product.material}</p>
                          )}
                          <p className="text-sm text-gray-600">Price: {formatPrice(product.actualPrice)}</p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cash on Delivery Indicator */}
              {order.paymentStatus === 'Pending' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-800 font-medium">Cash on Delivery</span>
                  </div>
                  <p className="text-yellow-700 text-sm mt-1">
                    Payment will be collected upon delivery
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 border rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Orders