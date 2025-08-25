'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, Calendar, Shield, AlertTriangle } from 'lucide-react'

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-dark-800 to-dark-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Terms & Conditions
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Please read these terms carefully before using our services
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800 border border-dark-600 rounded-lg p-8"
          >
            {/* Document Info */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-dark-600">
              <FileText size={32} className="text-neon-blue" />
              <div>
                <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
                <div className="flex items-center space-x-4 text-gray-400 text-sm mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>Last updated: January 15, 2025</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield size={16} />
                    <span>Jurisdiction: Romania / EU</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#company" className="hover:text-neon-blue transition-colors">1. Company Information</a></li>
                <li><a href="#services" className="hover:text-neon-blue transition-colors">2. Services Description</a></li>
                <li><a href="#orders" className="hover:text-neon-blue transition-colors">3. Orders and Payment</a></li>
                <li><a href="#shipping" className="hover:text-neon-blue transition-colors">4. Shipping and Delivery</a></li>
                <li><a href="#returns" className="hover:text-neon-blue transition-colors">5. Returns and Refunds</a></li>
                <li><a href="#warranty" className="hover:text-neon-blue transition-colors">6. Warranty and Liability</a></li>
                <li><a href="#privacy" className="hover:text-neon-blue transition-colors">7. Privacy and Data Protection</a></li>
                <li><a href="#intellectual" className="hover:text-neon-blue transition-colors">8. Intellectual Property</a></li>
                <li><a href="#termination" className="hover:text-neon-blue transition-colors">9. Termination</a></li>
                <li><a href="#governing" className="hover:text-neon-blue transition-colors">10. Governing Law</a></li>
                <li><a href="#contact" className="hover:text-neon-blue transition-colors">11. Contact Information</a></li>
              </ul>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section id="company">
                <h3 className="text-xl font-semibold text-white mb-4">1. Company Information</h3>
                <div className="bg-dark-700 p-4 rounded-lg mb-4">
                  <p><strong>Company Name:</strong> OMNIKA S.R.L.</p>
                  <p><strong>CUI:</strong> RO12345678</p>
                  <p><strong>Registration Number:</strong> J40/1234/2020</p>
                  <p><strong>Registered Address:</strong> București, Sectorul 2, Sos. Mihai Bravu, Nr. 136, Bloc D20, Scara 2, Etaj 3, Apartament 39, România</p>
                  <p><strong>Email:</strong> support@omnika.ro</p>
                  <p><strong>Phone:</strong> +40 (31) 630-12-34</p>
                </div>
              </section>

              <section id="services">
                <h3 className="text-xl font-semibold text-white mb-4">2. Services Description</h3>
                <p>OMNIKA S.R.L. provides online auto parts retail services, specializing in European automotive parts and accessories. Our services include:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Online catalog of automotive parts and accessories</li>
                  <li>VIN-based parts search and recommendations</li>
                  <li>Secure online payment processing</li>
                  <li>Shipping and delivery services</li>
                  <li>Customer support and technical assistance</li>
                </ul>
              </section>

              <section id="orders">
                <h3 className="text-xl font-semibold text-white mb-4">3. Orders and Payment</h3>
                <div className="space-y-4">
                  <p><strong>Order Acceptance:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse any order without providing a reason.</p>
                  <p><strong>Pricing:</strong> All prices are displayed in EUR and include VAT where applicable. Prices are subject to change without notice.</p>
                  <p><strong>Payment Methods:</strong> We accept credit cards, SEPA transfers, and PayPal. All payments are processed securely through our payment partners.</p>
                  <p><strong>Order Confirmation:</strong> You will receive an order confirmation email with your order number and details.</p>
                </div>
              </section>

              <section id="shipping">
                <h3 className="text-xl font-semibold text-white mb-4">4. Shipping and Delivery</h3>
                <div className="space-y-4">
                  <p><strong>Shipping Methods:</strong> We offer standard (3-5 business days) and express (1-2 business days) shipping options.</p>
                  <p><strong>Delivery Areas:</strong> We currently ship to Romania, Czech Republic, Germany, and Poland.</p>
                  <p><strong>Shipping Costs:</strong> Shipping costs are calculated based on weight, destination, and selected shipping method.</p>
                  <p><strong>Delivery Times:</strong> Estimated delivery times are provided at checkout but may vary due to circumstances beyond our control.</p>
                </div>
              </section>

              <section id="returns">
                <h3 className="text-xl font-semibold text-white mb-4">5. Returns and Refunds</h3>
                <div className="space-y-4">
                  <p><strong>Return Policy:</strong> You may return unused items in original packaging within 14 days of delivery.</p>
                  <p><strong>Return Process:</strong> Contact our customer service to initiate a return. Return shipping costs are the responsibility of the customer unless the item is defective.</p>
                  <p><strong>Refunds:</strong> Refunds will be processed within 5-10 business days after we receive the returned item.</p>
                  <p><strong>Non-Returnable Items:</strong> Custom orders, software, and items marked as non-returnable cannot be returned.</p>
                </div>
              </section>

              <section id="warranty">
                <h3 className="text-xl font-semibold text-white mb-4">6. Warranty and Liability</h3>
                <div className="space-y-4">
                  <p><strong>Product Warranty:</strong> All products come with manufacturer warranty as specified in product descriptions.</p>
                  <p><strong>Limitation of Liability:</strong> Our liability is limited to the purchase price of the product. We are not liable for indirect, incidental, or consequential damages.</p>
                  <p><strong>Force Majeure:</strong> We are not liable for delays or failures due to circumstances beyond our reasonable control.</p>
                </div>
              </section>

              <section id="privacy">
                <h3 className="text-xl font-semibold text-white mb-4">7. Privacy and Data Protection</h3>
                <div className="space-y-4">
                  <p>We are committed to protecting your privacy. Our data collection and processing practices are detailed in our Privacy Policy.</p>
                  <p><strong>Data Controller:</strong> OMNIKA S.R.L. is the data controller for personal data collected through our services.</p>
                  <p><strong>Data Protection Officer:</strong> For privacy inquiries, contact us at privacy@omnika.ro</p>
                  <p><strong>Your Rights:</strong> You have the right to access, rectify, erase, and restrict processing of your personal data under GDPR.</p>
                </div>
              </section>

              <section id="intellectual">
                <h3 className="text-xl font-semibold text-white mb-4">8. Intellectual Property</h3>
                <p>All content on this website, including text, graphics, logos, and software, is the property of OMNIKA S.R.L. and is protected by copyright and other intellectual property laws.</p>
              </section>

              <section id="termination">
                <h3 className="text-xl font-semibold text-white mb-4">9. Termination</h3>
                <p>We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms.</p>
              </section>

              <section id="governing">
                <h3 className="text-xl font-semibold text-white mb-4">10. Governing Law</h3>
                <p>These Terms are governed by and construed in accordance with the laws of Romania. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bucharest, Romania.</p>
              </section>

              <section id="contact">
                <h3 className="text-xl font-semibold text-white mb-4">11. Contact Information</h3>
                <div className="bg-dark-700 p-4 rounded-lg">
                  <p><strong>For General Inquiries:</strong> support@omnika.ro</p>
                  <p><strong>For Privacy Matters:</strong> privacy@omnika.ro</p>
                  <p><strong>Phone:</strong> +40 (31) 630-12-34</p>
                  <p><strong>Address:</strong> București, Sectorul 2, Sos. Mihai Bravu, Nr. 136, Bloc D20, Scara 2, Etaj 3, Apartament 39, România</p>
                </div>
              </section>
            </div>

            {/* Important Notice */}
            <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Important Notice</h4>
                  <p className="text-gray-300 text-sm">
                    These terms are available in English and Romanian. In case of any discrepancy, the English version shall prevail. 
                    By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
