import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { IoClose } from "react-icons/io5"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import logo from '../../assets/images/xelite silk.svg'
import { BaseUrl } from '../../utils/BaseUrl'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/productSlice'

function PopupLoginSignUp({ onClose }) {
  const [activeTab, setActiveTab] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const modelRef = useRef()
const dispatch = useDispatch()
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose()
    }
  }

  // Validation Schemas
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  })

  const signupValidationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  })

  // Formik for Login
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setApiError('')
      
      try {
        const response = await axios.post(`${BaseUrl}/user/login`, {
          email: values.email,
          password: values.password
        })
        
        // Handle successful login
        console.log('Login successful:', response.data)
        // Store token, user data, etc.
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response?.data?.data?.user))
        dispatch(addUser(response?.data?.data?.user))
        
        onClose() // Close modal on success
      } catch (error) {
        setApiError(
          error.response?.data?.message || 
          'Login failed. Please check your credentials and try again.'
        )
      } finally {
        setIsLoading(false)
      }
    }
  })

  // Formik for Signup
  const signupFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setApiError('')
      
      try {
        const response = await axios.post(`${BaseUrl}/user/register`, {
          username: values.username,
          email: values.email,
          password: values.password
        })
        onClose() 
      } catch (error) {
        setApiError(
          error.response?.data?.message || 
          'Registration failed. Please try again.'
        )
      } finally {
        setIsLoading(false)
      }
    }
  })

  const handleTabChange = (index) => {
    setActiveTab(index)
    setApiError('')
    loginFormik.resetForm()
    signupFormik.resetForm()
  }

  const tabVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 backdrop-blur-sm z-[9999] flex justify-center items-center bg-black/20"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden m-1">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl z-10"
        >
          <IoClose />
        </button>

        {/* Logo */}
        <div className="flex justify-center pt-6">
          <img src={logo} alt="logo" className="h-16" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-4 border-b border-gray-200">
          {["Login", "Sign Up"].map((name, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`py-3 px-8 font-medium transition-all duration-300 
                ${activeTab === index
                  ? "border-b-2 border-[#c5a980] text-[#c5a980]"
                  : "text-gray-500 hover:text-[#c5a980]"}`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* API Error Message */}
        {apiError && (
          <div className="mx-8 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{apiError}</p>
          </div>
        )}

        {/* Animated Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="login"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Welcome Back</h3>
                <form onSubmit={loginFormik.handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full border p-3 rounded-md focus:ring-2 focus:ring-[#c5a980] outline-none transition ${
                        loginFormik.touched.email && loginFormik.errors.email 
                          ? 'border-red-500' 
                          : 'border-gray-300'
                      }`}
                      value={loginFormik.values.email}
                      onChange={loginFormik.handleChange}
                      onBlur={loginFormik.handleBlur}
                    />
                    {loginFormik.touched.email && loginFormik.errors.email && (
                      <h2 className="text-red-500 text-sm mt-1">{loginFormik.errors.email}</h2>
                    )}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`w-full border p-3 rounded-md focus:ring-2 focus:ring-[#c5a980] outline-none transition ${
                        loginFormik.touched.password && loginFormik.errors.password 
                          ? 'border-red-500' 
                          : 'border-gray-300'
                      }`}
                      value={loginFormik.values.password}
                      onChange={loginFormik.handleChange}
                      onBlur={loginFormik.handleBlur}
                    />
                    {loginFormik.touched.password && loginFormik.errors.password && (
                      <h2 className="text-red-500 text-sm mt-1">{loginFormik.errors.password}</h2>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        name="rememberMe"
                        checked={loginFormik.values.rememberMe}
                        onChange={loginFormik.handleChange}
                      /> 
                      Remember me
                    </label>
                    <p className="text-[#c5a980] hover:text-red-600 cursor-pointer">
                      Forgot Password?
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-md bg-[#c5a980] text-white font-medium hover:bg-[#b4976e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="signup"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Create an Account</h3>
                <form onSubmit={signupFormik.handleSubmit} className="space-y-5">
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className={`w-full border p-3 rounded-md focus:ring-2 focus:ring-[#c5a980] outline-none transition ${
                          signupFormik.touched.username && signupFormik.errors.username 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        value={signupFormik.values.username}
                        onChange={signupFormik.handleChange}
                        onBlur={signupFormik.handleBlur}
                      />
                      {signupFormik.touched.username && signupFormik.errors.username && (
                        <h2 className="text-red-500 text-sm mt-1">{signupFormik.errors.username}</h2>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className={`w-full border p-3 rounded-md focus:ring-2 focus:ring-[#c5a980] outline-none transition ${
                          signupFormik.touched.email && signupFormik.errors.email 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        value={signupFormik.values.email}
                        onChange={signupFormik.handleChange}
                        onBlur={signupFormik.handleBlur}
                      />
                      {signupFormik.touched.email && signupFormik.errors.email && (
                        <h2 className="text-red-500 text-sm mt-1">{signupFormik.errors.email}</h2>
                      )}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`w-full border p-3 rounded-md focus:ring-2 focus:ring-[#c5a980] outline-none transition ${
                          signupFormik.touched.password && signupFormik.errors.password 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        value={signupFormik.values.password}
                        onChange={signupFormik.handleChange}
                        onBlur={signupFormik.handleBlur}
                      />
                      {signupFormik.touched.password && signupFormik.errors.password && (
                        <h2 className="text-red-500 text-sm mt-1">{signupFormik.errors.password}</h2>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={`w-full border p-3 rounded-md focus:ring-2 focus:ring-[#c5a980] outline-none transition ${
                          signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        value={signupFormik.values.confirmPassword}
                        onChange={signupFormik.handleChange}
                        onBlur={signupFormik.handleBlur}
                      />
                      {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && (
                        <h2 className="text-red-500 text-sm mt-1">{signupFormik.errors.confirmPassword}</h2>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      name="terms"
                      checked={signupFormik.values.terms}
                      onChange={signupFormik.handleChange}
                    />
                    <label className="text-gray-600">
                      I agree to the{" "}
                      <span className="text-[#c5a980] underline cursor-pointer">
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
                  {signupFormik.touched.terms && signupFormik.errors.terms && (
                    <h2 className="text-red-500 text-sm -mt-3">{signupFormik.errors.terms}</h2>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-md bg-[#c5a980] text-white font-medium hover:bg-[#b4976e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default PopupLoginSignUp