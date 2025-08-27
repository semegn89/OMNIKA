'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactsPage() {
  const { t } = useLanguage()
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Message sent successfully! We will get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-dark-800 to-dark-900 py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/contacts/contacts-1.jpg"
              alt="OMNIKA Contact Background"
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-800/80 to-dark-900/80"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('contacts.title')}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {t('contacts.subtitle')}
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-gray-300 mb-8">
                  Have questions about our auto parts or need assistance with your order? 
                  Our team is here to help you with any inquiries.
                </p>
                
                {/* Contact Image */}
                <div className="relative w-full h-64 rounded-lg shadow-2xl overflow-hidden">
                  <Image
                    src="/images/contacts/contacts-2.jpg"
                    alt="OMNIKA Customer Service"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin size={24} className="text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('contacts.address')}</h3>
                    <p className="text-gray-300">
                      București, Sectorul 2<br />
                      Sos. Mihai Bravu, Nr. 136<br />
                      Bloc D20, Scara 2, Etaj 3<br />
                      Apartament 39, România
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone size={24} className="text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('contacts.phone')}</h3>
                    <a 
                      href="tel:+40316301234" 
                      className="text-neon-blue hover:text-neon-green transition-colors text-lg font-medium"
                    >
                      +40 (31) 630-12-34
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Click to call</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail size={24} className="text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('contacts.email')}</h3>
                    <a 
                      href="mailto:support@omnika.ro" 
                      className="text-neon-blue hover:text-neon-green transition-colors"
                    >
                      support@omnika.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock size={24} className="text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('contacts.workingHours')}</h3>
                    <p className="text-gray-300">{t('contacts.workingHoursText')}</p>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">OMNIKA S.R.L.</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong>CUI:</strong> RO12345678</p>
                  <p><strong>Reg. Com.:</strong> J40/1234/2020</p>
                  <p><strong>Capital Social:</strong> 10.000 RON</p>
                  <p><strong>Sediu Social:</strong> București, Sectorul 2</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-800 border border-dark-600 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">{t('contacts.sendMessage')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">{t('contacts.name')} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t('contacts.email')} *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t('contacts.subject')} *</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t('contacts.message')} *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-blue text-dark-900 font-semibold py-3 px-6 rounded-lg hover:bg-neon-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-900"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t('contacts.sendMessage')}</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Location</h2>
            <div className="bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
              <div id="map" className="w-full h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8444388077937!2d26.1027!3d44.4268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI1JzM2LjQiTiAyNsKwMDYnMDkuNyJF!5e0!3m2!1sen!2sro!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="OMNIKA S.R.L. Location"
                />
              </div>
            </div>
            <p className="text-center text-gray-400 mt-4">
              București, Sectorul 2, Sos. Mihai Bravu, Nr. 136, Bloc D20, Scara 2, Etaj 3, Apartament 39, România
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
