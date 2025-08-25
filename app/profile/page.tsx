'use client'

import React, { useState } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { User, ShoppingBag, Heart, Settings, LogOut, Edit, Save, X, Package, CreditCard, MapPin, Phone, Mail } from 'lucide-react'
import { Product } from '@/lib/products'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+40 123 456 789',
    address: 'București, Sectorul 2, România'
  })

  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 245.50,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 89.99,
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 156.75,
      items: 2
    }
  ])

  const [favorites] = useState([
    {
      id: 'prod_1',
      name: 'Brake Pads for Mercedes',
      price: 89,
      image: 'https://via.placeholder.com/300x200/1e293b/00d4ff?text=Brake+Pads',
      brand: 'Mercedes'
    },
    {
      id: 'prod_2',
      name: 'Oil Filter for BMW',
      price: 24,
      image: 'https://via.placeholder.com/300x200/1e293b/00ff88?text=Oil+Filter',
      brand: 'BMW'
    }
  ])

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleLogout = () => {
    toast.success('Logged out successfully!')
    // Here you would typically handle logout
    window.location.href = '/'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-neon-green'
      case 'In Transit': return 'text-neon-blue'
      case 'Processing': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-dark-800 to-dark-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  My Profile
                </h1>
                <p className="text-xl text-gray-300">
                  Manage your account and view your orders
                </p>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-dark-900" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">{userData.firstName} {userData.lastName}</h3>
                    <p className="text-gray-400 text-sm">{userData.email}</p>
                  </div>

                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                            : 'text-gray-300 hover:text-white hover:bg-dark-700'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 mt-6 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800 border border-dark-700 rounded-lg p-6"
                >
                  {activeTab === 'profile' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-neon-blue text-dark-900 font-medium rounded-lg hover:bg-neon-green transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="flex items-center space-x-2 px-4 py-2 bg-neon-green text-dark-900 font-medium rounded-lg hover:bg-neon-blue transition-colors"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white font-medium mb-2">First Name</label>
                          <input
                            type="text"
                            value={userData.firstName}
                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neon-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Last Name</label>
                          <input
                            type="text"
                            value={userData.lastName}
                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neon-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Email</label>
                          <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neon-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Phone</label>
                          <input
                            type="tel"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neon-blue"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-white font-medium mb-2">Address</label>
                          <input
                            type="text"
                            value={userData.address}
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neon-blue"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="bg-dark-700 border border-dark-600 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-semibold">{order.id}</h3>
                                <p className="text-gray-400 text-sm">{order.date}</p>
                                <p className="text-gray-400 text-sm">{order.items} items</p>
                              </div>
                              <div className="text-right">
                                <p className="text-white font-bold">€{order.total.toFixed(2)}</p>
                                <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'favorites' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Favorite Items</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favorites.map((item) => (
                          <div key={item.id} className="bg-dark-700 border border-dark-600 rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-dark-600 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                                <p className="text-gray-400 text-xs">{item.brand}</p>
                                <p className="text-neon-blue font-bold">€{item.price}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                      <div className="space-y-6">
                        <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-2">Change Password</h3>
                          <p className="text-gray-400 text-sm mb-4">Update your account password</p>
                          <button className="px-4 py-2 bg-neon-blue text-dark-900 font-medium rounded-lg hover:bg-neon-green transition-colors">
                            Change Password
                          </button>
                        </div>
                        <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-2">Notification Preferences</h3>
                          <p className="text-gray-400 text-sm mb-4">Manage your email notifications</p>
                          <button className="px-4 py-2 bg-neon-blue text-dark-900 font-medium rounded-lg hover:bg-neon-green transition-colors">
                            Manage Notifications
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
