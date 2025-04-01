'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Footer from './Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const Home = () => {
  const heroRef = useRef(null)
  const featureSectionRef = useRef<HTMLDivElement | null>(null)
  const featureCardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out" 
      }
    )
    
    // Feature section title animation
    const h1Element = featureSectionRef.current?.querySelector('h1');
    if (h1Element) {
      gsap.fromTo(
        h1Element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: featureSectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
    
    // Feature cards staggered animation
    gsap.fromTo(
      featureCardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featureSectionRef.current,
          start: "top 60%",
        }
      }
    )
    
    // Hover animations for feature cards
    if (featureCardsRef.current) {
      featureCardsRef.current.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            duration: 0.3
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            duration: 0.3
          })
        })
      })
    }
    
    // Cleanup
    return () => {
      featureCardsRef.current.forEach(card => {
        card.removeEventListener('mouseenter', () => {})
        card.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])
  
  // Function to add cards to ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !featureCardsRef.current.includes(el)) {
      featureCardsRef.current.push(el)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 lg:pt-32">
        <div 
          ref={heroRef}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 lg:p-14 shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Study Together, Achieve Together
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Join thousands of students collaborating in virtual study groups to reach their academic goals.
            </p>
            <Link href="/groups">
              <button className="mt-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1">
                Get Started
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            {/* Placeholder for image or illustration */}
            <div className="w-full max-w-md h-80 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-white text-xl font-medium">Study Group Illustration</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section ref={featureSectionRef} className="container mx-auto px-4 py-20 lg:py-32">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-16">
          Everything You Need to Excel
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div 
            ref={addToRefs}
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Create Study Groups</h2>
            <p className="text-gray-600">Form groups based on subjects, courses or specific topics</p>
          </div>
          
          <div 
            ref={addToRefs}
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Virtual Sessions</h2>
            <p className="text-gray-600">Schedule and join live video sessions with collaborative tools</p>
          </div>
          
          <div 
            ref={addToRefs}
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Share Resources</h2>
            <p className="text-gray-600">Upload and access notes, flash cards, and study materials</p>
          </div>
          
          <div 
            ref={addToRefs}
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Track Progress</h2>
            <p className="text-gray-600">Monitor individual and group progress with detailed analytics</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Link href="/signup">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1">
              Join Our Community
            </button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}

export default Home