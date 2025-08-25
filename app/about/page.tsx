'use client'

import React from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Building, Users, Award, Target, MapPin, Phone, Mail, Globe } from 'lucide-react'

export default function AboutPage() {
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
                  About OMNIKA S.R.L.
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Premium auto parts supplier for every European brand
                </p>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Company Story */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Founded in 2024, OMNIKA S.R.L. has established itself as a leading supplier 
                      of premium auto parts for European vehicles. Our mission is to provide 
                      high-quality, reliable parts that meet the exacting standards of European 
                      automotive manufacturers.
                    </p>
                    <p>
                      We understand that your vehicle is more than just transportation – it's an 
                      investment. That's why we partner with the best manufacturers and suppliers 
                      to ensure every part we offer meets or exceeds OEM specifications.
                    </p>
                    <p>
                      Our team of automotive experts is dedicated to helping you find the perfect 
                      parts for your vehicle, whether you're a professional mechanic or a car enthusiast.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-neon-blue/20 to-neon-green/20 rounded-lg p-8 border border-neon-blue/30">
                    <Building className="w-16 h-16 text-neon-blue mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Professional Excellence</h3>
                    <p className="text-gray-300">
                      Years of experience in the automotive industry with a focus on quality and reliability.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Values */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 hover:border-neon-blue/50 transition-colors">
                  <Award className="w-12 h-12 text-neon-blue mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Quality</h3>
                  <p className="text-gray-300">
                    We never compromise on quality. Every part we offer is tested and verified 
                    to meet the highest standards.
                  </p>
                </div>
                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 hover:border-neon-green/50 transition-colors">
                  <Target className="w-12 h-12 text-neon-green mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Reliability</h3>
                  <p className="text-gray-300">
                    Our customers trust us to deliver reliable parts that perform exactly as expected, 
                    every time.
                  </p>
                </div>
                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 hover:border-neon-purple/50 transition-colors">
                  <Users className="w-12 h-12 text-neon-purple mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Service</h3>
                  <p className="text-gray-300">
                    Exceptional customer service is at the heart of everything we do. 
                    We're here to help you succeed.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Company Details */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">Company Information</h2>
              <div className="bg-dark-800 border border-dark-700 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-neon-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Address</h4>
                        <p className="text-gray-300 text-sm">
                          București, Sectorul 2, Sos. Mihai Bravu, Nr. 136, Bloc D20, Scara 2, Etaj 3, Apartament 39, România
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-neon-blue flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Phone</h4>
                        <p className="text-gray-300 text-sm">+40 123 456 789</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-neon-blue flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Email</h4>
                        <p className="text-gray-300 text-sm">info@omnika.ro</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-neon-green flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Registration</h4>
                        <p className="text-gray-300 text-sm">CUI: 52235085</p>
                        <p className="text-gray-300 text-sm">J: 2025056488004</p>
                        <p className="text-gray-300 text-sm">EUID: ROONRC.J2025056488004</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Bank Details</h4>
                      <p className="text-gray-300 text-sm">Raiffeisen Bank S.A.</p>
                      <p className="text-gray-300 text-sm">IBAN: RO08RZBR0000060028531926</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Alexandru Popescu',
                    role: 'CEO & Founder',
                    image: 'https://via.placeholder.com/300x300/1e293b/00d4ff?text=AP'
                  },
                  {
                    name: 'Maria Ionescu',
                    role: 'Technical Director',
                    image: 'https://via.placeholder.com/300x300/1e293b/00ff88?text=MI'
                  },
                  {
                    name: 'Vasile Dumitrescu',
                    role: 'Sales Manager',
                    image: 'https://via.placeholder.com/300x300/1e293b/8b5cf6?text=VD'
                  }
                ].map((member, index) => (
                  <div key={index} className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center hover:border-neon-blue/50 transition-colors">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-neon-blue/30">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-neon-blue text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
