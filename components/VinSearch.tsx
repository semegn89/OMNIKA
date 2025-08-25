'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { validateVIN, createVinRequest } from '@/lib/products'
import { Search, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface VinSearchProps {
  onVinRequest?: (request: any) => void
}

export default function VinSearch({ onVinRequest }: VinSearchProps) {
  const { t } = useLanguage()
  const [vin, setVin] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [showComment, setShowComment] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [vinError, setVinError] = useState('')

  const handleVinChange = (value: string) => {
    // Remove spaces and convert to uppercase
    const cleanValue = value.replace(/\s/g, '').toUpperCase()
    setVin(cleanValue)
    
    // Clear error when user starts typing
    if (vinError) {
      setVinError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate VIN
    const validation = validateVIN(vin)
    if (!validation.isValid) {
      setVinError(validation.error || 'Invalid VIN format')
      return
    }

    // Validate email or phone
    if (!email && !phone) {
      toast.error('Please provide email or phone for contact')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const vinRequest = createVinRequest(vin, undefined, email, phone, comment)
      setRequestId(vinRequest.id)
      setIsSubmitted(true)
      
      if (onVinRequest) {
        onVinRequest(vinRequest)
      }
      
      toast.success('Request submitted successfully!')
      
      // Reset form
      setVin('')
      setEmail('')
      setPhone('')
      setComment('')
      setShowComment(false)
      
    } catch (error) {
      toast.error('Error submitting request')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVinStatus = () => {
    if (!vin) return 'idle'
    if (vinError) return 'error'
    if (vin.length === 17) return 'success'
    return 'typing'
  }

  const vinStatus = getVinStatus()

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 mb-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6 text-dark-900" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('vin.title')}</h2>
        <p className="text-gray-300 text-sm">
          {t('vin.subtitle')}
        </p>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neon-green/20 border border-neon-green/30 rounded-lg p-6 text-center"
        >
          <CheckCircle className="w-12 h-12 text-neon-green mx-auto mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Request Accepted!</h3>
          <p className="text-gray-300 mb-4">
            Request number: <span className="text-neon-green font-mono font-bold">{requestId}</span>
          </p>
          <p className="text-gray-300 text-sm">
            Expect response within 1-6 hours during business hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-6 py-2 bg-neon-green text-dark-900 font-medium rounded-lg hover:bg-neon-blue transition-colors"
          >
            Submit New Request
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* VIN Input */}
          <div>
            <label htmlFor="vin" className="block text-white font-medium mb-2">
              VIN Number *
            </label>
            <div className="relative">
              <input
                type="text"
                id="vin"
                value={vin}
                onChange={(e) => handleVinChange(e.target.value)}
                maxLength={17}
                placeholder="Enter 17-digit VIN"
                className={`w-full px-4 py-3 pr-12 bg-dark-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                  vinStatus === 'error' 
                    ? 'border-red-500 focus:border-red-500' 
                    : vinStatus === 'success'
                    ? 'border-neon-green focus:border-neon-green'
                    : 'border-dark-600 focus:border-neon-blue'
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {vinStatus === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                {vinStatus === 'success' && <CheckCircle className="w-5 h-5 text-neon-green" />}
                {vinStatus === 'typing' && <Loader2 className="w-5 h-5 text-neon-blue animate-spin" />}
              </div>
            </div>
            {vinError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2"
              >
                {vinError}
              </motion.p>
            )}
            <p className="text-gray-400 text-xs mt-2">
              VIN must contain 17 characters (Latin letters and numbers, excluding I, O, Q)
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-white font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+40 123 456 789"
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors"
              />
            </div>
          </div>

          {/* Optional Comment */}
          <div>
            <button
              type="button"
              onClick={() => setShowComment(!showComment)}
              className="flex items-center space-x-2 text-neon-blue hover:text-neon-green transition-colors"
            >
              {showComment ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>Add comment / attach part photo</span>
            </button>
            
            <AnimatePresence>
              {showComment && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the part or provide additional information..."
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors resize-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || vinStatus !== 'success' || (!email && !phone)}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Find Parts by VIN</span>
              </>
            )}
          </button>

          <p className="text-gray-400 text-xs text-center">
            * Provide email or phone for response
          </p>
        </form>
      )}
    </div>
  )
}
