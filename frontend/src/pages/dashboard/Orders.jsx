import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import { Package } from 'lucide-react'
import { useSelector } from 'react-redux'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [userId, setUserId] = useState(null)

  const userInfo = useSelector((state) => state.product.userInfo)

  useEffect(() => {
    if (userInfo && userInfo._id) {
      setUserId(userInfo._id)
    } else if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser._id) setUserId(parsedUser._id)
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
      const response = await axios.get(`${BaseUrl}/checkout/getByUser/${userId}`, {
        params: { page: currentPage, limit: 10 }
      })
      if (response.data.status === 'success') {
        setOrders(response.data.data)
        setTotalPages(response.data.pagination.totalPages)
      }
    } catch (err) {
      setError('Failed to fetch orders')
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Failed': return 'bg-red-100 text-red-700'
      case 'Refunded': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    })
  }

  const formatImageUrl = (imageUrl) => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    return imageUrl.startsWith('/') ? `${BaseUrl}${imageUrl}` : `${BaseUrl}/${imageUrl}`
  }

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="text-gray-600 mt-4">Loading orders...</p>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-16 text-center">
          <Package className="w-14 h-14 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Go to the store and place your first order!</p>
          <a 
            href="/"
            className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm whitespace-nowrap font-semibold text-gray-700">Order ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Payment</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Delivery</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Products</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm font-mono text-gray-800">{order._id.slice(-8).toUpperCase()}</td>
                  <td className="p-4 text-sm text-gray-700">{formatDate(order.createdAt)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 leading-relaxed">
                    {order.delivery.addressLine1}<br />
                    {order.delivery.city}, {order.delivery.state} {order.delivery.zipCode}
                  </td>
                  <td className="p-4 text-sm text-gray-700 space-y-2">
                    {order.productIds.map((product, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        {product.image && (
                          <img
                            src={formatImageUrl(product.image)}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover border"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-800">{product.name}</p>
                          {product.size && (
                            <p className="text-gray-500 text-xs">Size: {product.size}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                currentPage === page
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  )
}

export default Orders
