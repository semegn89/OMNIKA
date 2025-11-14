'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, Calendar, Eye, Lock, Database, Mail } from 'lucide-react'

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                How we collect, use, and protect your personal information
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
              <Shield size={32} className="text-neon-blue" />
              <div>
                <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
                <div className="flex items-center space-x-4 text-gray-400 text-sm mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>Last updated: January 15, 2025</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Lock size={16} />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#controller" className="hover:text-neon-blue transition-colors">1. Data Controller</a></li>
                <li><a href="#collection" className="hover:text-neon-blue transition-colors">2. Data Collection</a></li>
                <li><a href="#usage" className="hover:text-neon-blue transition-colors">3. How We Use Your Data</a></li>
                <li><a href="#sharing" className="hover:text-neon-blue transition-colors">4. Data Sharing</a></li>
                <li><a href="#security" className="hover:text-neon-blue transition-colors">5. Data Security</a></li>
                <li><a href="#cookies" className="hover:text-neon-blue transition-colors">6. Cookies and Tracking</a></li>
                <li><a href="#rights" className="hover:text-neon-blue transition-colors">7. Your Rights (GDPR)</a></li>
                <li><a href="#retention" className="hover:text-neon-blue transition-colors">8. Data Retention</a></li>
                <li><a href="#children" className="hover:text-neon-blue transition-colors">9. Children's Privacy</a></li>
                <li><a href="#changes" className="hover:text-neon-blue transition-colors">10. Policy Changes</a></li>
                <li><a href="#contact" className="hover:text-neon-blue transition-colors">11. Contact Us</a></li>
              </ul>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section id="controller">
                <h3 className="text-xl font-semibold text-white mb-4">1. Data Controller</h3>
                <div className="bg-dark-700 p-4 rounded-lg mb-4">
                  <p><strong>Company Name:</strong> OMNIKA S.R.L.</p>
                  <p><strong>CUI:</strong> RO12345678</p>
                  <p><strong>Address:</strong> București, Sectorul 2, Sos. Mihai Bravu, Nr. 136, Bloc D20, Scara 2, Etaj 3, Apartament 39, România</p>
                  <p><strong>Email:</strong> privacy@omnikaparts.com</p>
                  <p><strong>Phone:</strong> +40 (31) 630-12-34</p>
                  <p><strong>Data Protection Officer:</strong> privacy@omnikaparts.com</p>
                </div>
                <p>OMNIKA S.R.L. is the data controller responsible for the processing of your personal data in accordance with GDPR and Romanian data protection laws.</p>
              </section>

              <section id="collection">
                <h3 className="text-xl font-semibold text-white mb-4">2. Data Collection</h3>
                <p>We collect the following types of personal data:</p>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Account Information</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Name, email address, phone number</li>
                      <li>Shipping and billing addresses</li>
                      <li>Account preferences and settings</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Order Information</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Order history and purchase details</li>
                      <li>Payment information (processed securely by payment providers)</li>
                      <li>Shipping and delivery information</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Technical Information</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Website usage data and analytics</li>
                      <li>Cookies and similar technologies</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Communication Data</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Customer service communications</li>
                      <li>VIN search requests and comments</li>
                      <li>Feedback and reviews</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="usage">
                <h3 className="text-xl font-semibold text-white mb-4">3. How We Use Your Data</h3>
                <p>We use your personal data for the following purposes:</p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Service Provision</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Processing and fulfilling your orders</li>
                      <li>Providing customer support</li>
                      <li>Managing your account</li>
                      <li>Processing VIN search requests</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Communication</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Sending order confirmations and updates</li>
                      <li>Responding to your inquiries</li>
                      <li>Sending service-related notifications</li>
                      <li>Marketing communications (with your consent)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Improvement and Analytics</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Improving our website and services</li>
                      <li>Analyzing usage patterns</li>
                      <li>Personalizing your experience</li>
                      <li>Preventing fraud and ensuring security</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="sharing">
                <h3 className="text-xl font-semibold text-white mb-4">4. Data Sharing</h3>
                <p>We may share your personal data with:</p>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Service Providers</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Payment processors (Stripe, PayPal)</li>
                      <li>Shipping and delivery partners</li>
                      <li>IT and hosting service providers</li>
                      <li>Customer support tools</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Legal Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>When required by law or legal process</li>
                      <li>To protect our rights and property</li>
                      <li>In emergency situations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded-lg">
                    <p className="text-yellow-400 font-medium mb-2">Important:</p>
                    <p className="text-sm">We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>
                  </div>
                </div>
              </section>

              <section id="security">
                <h3 className="text-xl font-semibold text-white mb-4">5. Data Security</h3>
                <p>We implement appropriate technical and organizational measures to protect your personal data:</p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Technical Measures</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>SSL/TLS encryption</li>
                      <li>Secure data storage</li>
                      <li>Regular security updates</li>
                      <li>Access controls and authentication</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Organizational Measures</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Employee training on data protection</li>
                      <li>Data access policies</li>
                      <li>Incident response procedures</li>
                      <li>Regular security audits</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="cookies">
                <h3 className="text-xl font-semibold text-white mb-4">6. Cookies and Tracking</h3>
                <p>We use cookies and similar technologies to:</p>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Essential Cookies</h4>
                    <p className="text-sm">Required for website functionality, shopping cart, and user authentication.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Analytics Cookies</h4>
                    <p className="text-sm">Help us understand how visitors use our website to improve user experience.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Marketing Cookies</h4>
                    <p className="text-sm">Used for personalized advertising and marketing campaigns (with consent).</p>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                    <p className="text-blue-400 font-medium mb-2">Cookie Consent</p>
                    <p className="text-sm">You can manage your cookie preferences through your browser settings or our cookie consent banner.</p>
                  </div>
                </div>
              </section>

              <section id="rights">
                <h3 className="text-xl font-semibold text-white mb-4">7. Your Rights (GDPR)</h3>
                <p>Under GDPR, you have the following rights:</p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Access and Information</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Right to access your personal data</li>
                      <li>Right to information about processing</li>
                      <li>Right to data portability</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Control and Correction</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Right to rectification</li>
                      <li>Right to erasure ("right to be forgotten")</li>
                      <li>Right to restrict processing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Objection and Withdrawal</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Right to object to processing</li>
                      <li>Right to withdraw consent</li>
                      <li>Right to lodge a complaint</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Automated Decisions</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Right to human intervention</li>
                      <li>Right to explanation</li>
                      <li>Right to challenge decisions</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                  <p className="text-green-400 font-medium mb-2">Exercise Your Rights</p>
                  <p className="text-sm">To exercise any of these rights, contact us at privacy@omnikaparts.com. We will respond within 30 days.</p>
                </div>
              </section>

              <section id="retention">
                <h3 className="text-xl font-semibold text-white mb-4">8. Data Retention</h3>
                <p>We retain your personal data only as long as necessary:</p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Retention Periods</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Account data:</strong> Until account deletion or 3 years of inactivity</li>
                      <li><strong>Order data:</strong> 7 years (legal requirement)</li>
                      <li><strong>Marketing data:</strong> Until consent withdrawal</li>
                      <li><strong>Analytics data:</strong> 2 years</li>
                      <li><strong>Communication data:</strong> 3 years</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="children">
                <h3 className="text-xl font-semibold text-white mb-4">9. Children's Privacy</h3>
                <p>Our services are not intended for children under 16 years of age. We do not knowingly collect personal data from children under 16. If you believe we have collected data from a child under 16, please contact us immediately.</p>
              </section>

              <section id="changes">
                <h3 className="text-xl font-semibold text-white mb-4">10. Policy Changes</h3>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending email notifications to registered users</li>
                  <li>Displaying prominent notices on our website</li>
                </ul>
              </section>

              <section id="contact">
                <h3 className="text-xl font-semibold text-white mb-4">11. Contact Us</h3>
                <div className="bg-dark-700 p-4 rounded-lg">
                          <p><strong>For Privacy Inquiries:</strong> privacy@omnikaparts.com</p>
        <p><strong>For General Support:</strong> support@omnikaparts.com</p>
                  <p><strong>Phone:</strong> +40 (31) 630-12-34</p>
                  <p><strong>Address:</strong> București, Sectorul 2, Sos. Mihai Bravu, Nr. 136, Bloc D20, Scara 2, Etaj 3, Apartament 39, România</p>
                </div>
                <p className="mt-4">You also have the right to lodge a complaint with the Romanian Data Protection Authority (ANSPDCP) if you believe your rights have been violated.</p>
              </section>
            </div>

            {/* Important Notice */}
            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield size={24} className="text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">GDPR Compliance</h4>
                  <p className="text-gray-300 text-sm">
                    This Privacy Policy complies with the General Data Protection Regulation (GDPR) and Romanian data protection laws. 
                    By using our services, you acknowledge that you have read and understood this Privacy Policy.
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
