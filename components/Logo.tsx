'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = false, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-32',
    md: 'h-10 w-40',
    lg: 'h-12 w-48'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0 group`}>
        {/* Logo Container */}
        <div className="relative w-full h-full bg-dark-800/30 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-green/5 animate-pulse"></div>
          
          {/* Logo Image */}
          <Image
            src="/images/logos/omnika-logo.png"
            alt="OMNIKA S.R.L. Logo"
            fill
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 240px, 288px"
            className="object-cover opacity-95 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
            priority
          />
          
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/10 to-neon-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Company Name */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-white ${textSizes[size]} leading-tight`}>
            OMNIKA
          </span>
          <span className="text-xs text-gray-400 leading-tight">
            S.R.L.
          </span>
        </div>
      )}
    </Link>
  )
}
