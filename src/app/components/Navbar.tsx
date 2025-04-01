'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import Signup from './Signup'
import { gsap } from 'gsap'

const Navbar = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navbarRef = useRef(null)
    const logoRef = useRef(null)
    const linksRef = useRef<HTMLLIElement[]>([])
    
    // Reset refs array
    const addToLinksRef = (el: HTMLLIElement | null) => {
      if (el && !linksRef.current.includes(el)) {
        linksRef.current.push(el)
      }
    }
    
    // Handle navbar color change on scroll
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setScrolled(true)
        } else {
          setScrolled(false)
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    // Initial animations
    useEffect(() => {
      // Animate the navbar from top
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      
      // Animate the logo
      gsap.fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "back.out(1.7)" }
      )
      
      // Animate the navigation links with stagger
      gsap.fromTo(
        linksRef.current,
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.5, 
          ease: "power1.out" 
        }
      )
    }, [])
    
    return (
        <div className="w-full z-[999] fixed">
            <div 
              ref={navbarRef}
              className={`h-20 fixed w-full flex justify-between items-center px-6 md:px-12 lg:px-24 transition-all duration-300 ${
                scrolled 
                  ? "bg-white shadow-md" 
                  : "bg-gradient-to-br from-gray-900 via-gray-800"
              }`}
            >
                <div ref={logoRef} className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className={`w-8 h-8 mr-3 ${scrolled ? "text-indigo-600" : "text-white"}`}
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
                          <path d="M8 7h6"></path>
                          <path d="M8 11h8"></path>
                          <path d="M8 15h5"></path>
                        </svg>
                        <h1 className={`text-2xl md:text-3xl font-bold ${
                          scrolled ? "text-indigo-600" : "text-white"
                        }`}>
                          Study Buddy
                        </h1>
                    </Link>
                </div>
                
                <div className="flex items-center">
                    <ul className="flex space-x-1 md:space-x-8 items-center">
                        <li ref={addToLinksRef}>
                            <Link 
                              href="/groups" 
                              className={`text-lg md:text-xl font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                                scrolled 
                                  ? "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" 
                                  : "text-white hover:bg-white/10"
                              }`}
                            >
                              Groups
                            </Link>
                        </li>
                        <li ref={addToLinksRef}>
                            <Link 
                              href="/resources" 
                              className={`text-lg md:text-xl font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                                scrolled 
                                  ? "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" 
                                  : "text-white hover:bg-white/10"
                              }`}
                            >
                              Resources
                            </Link>
                        </li>
                        <li ref={addToLinksRef}>
                            <button 
                              onClick={() => setIsSignupOpen(true)}
                              className={`text-lg md:text-xl font-medium px-5 py-2 rounded-lg transition-all duration-300 ${
                                scrolled 
                                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg" 
                                  : "bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                              }`}
                            >
                              Sign up
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
        </div>
    )
}

export default Navbar