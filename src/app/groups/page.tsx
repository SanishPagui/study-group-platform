'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const page = () => {
  // State management
  const [activeTab, setActiveTab] = useState('myGroups')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

  // Animation refs
  const pageHeaderRef = useRef(null)
  const tabsRef = useRef(null)
  const myGroupsRef = useRef(null)
  const discoverGroupsRef = useRef(null)
  const cardRefs = useRef<(HTMLElement | Element)[]>([])
  const modalRef = useRef(null)
  
  // Clear and reset card refs array
  cardRefs.current = []
  const addToCardRefs = (el: HTMLElement | Element) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  // Sample data for my groups
  const myGroups = [
    {
      id: 1,
      name: "Advanced Physics",
      subject: "Physics",
      members: 8,
      role: "Admin",
      nextSession: "Today, 3:00 PM",
      description: "Exploring quantum mechanics and relativity theory in depth"
    },
    {
      id: 2,
      name: "Calculus Masters",
      subject: "Mathematics",
      members: 12,
      role: "Member",
      nextSession: "Tomorrow, 10:00 AM",
      description: "Working through advanced calculus problems and differential equations"
    },
    {
      id: 3,
      name: "Machine Learning Basics",
      subject: "Computer Science",
      members: 15,
      role: "Member",
      nextSession: "Apr 5, 5:00 PM",
      description: "Introduction to fundamental ML algorithms and applications"
    }
  ]

  // Sample data for discoverable groups
  const discoverableGroups = [
    {
      id: 4,
      name: "Organic Chemistry Lab",
      subject: "Chemistry",
      members: 10,
      creator: "Dr. Thompson",
      created: "1 week ago",
      description: "Study group focused on organic chemistry lab techniques and problem solving"
    },
    {
      id: 5,
      name: "Classic Literature Analysis",
      subject: "Literature",
      members: 14,
      creator: "Prof. Williams",
      created: "3 days ago",
      description: "Examining literary devices and historical context in classic novels"
    },
    {
      id: 6,
      name: "Web Development Projects",
      subject: "Computer Science",
      members: 20,
      creator: "Sarah Chen",
      created: "2 weeks ago",
      description: "Collaborative web development with focus on React, Next.js and modern techniques"
    },
    {
      id: 7,
      name: "Statistics for Data Science",
      subject: "Mathematics",
      members: 16,
      creator: "Mark Johnson",
      created: "5 days ago",
      description: "Applied statistics for data analysis and machine learning applications"
    }
  ]

  useEffect(() => {
    // Initial page load animation
    const timeline = gsap.timeline()
    
    timeline.fromTo(
      pageHeaderRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    
    timeline.fromTo(
      tabsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    
    if (activeTab === 'myGroups') {
      animateContent(myGroupsRef.current, cardRefs.current)
    } else {
      animateContent(discoverGroupsRef.current, cardRefs.current)
    }
  }, [])

  // Animation for tab switch
  useEffect(() => {
    if ((activeTab === 'myGroups' && myGroupsRef.current) || 
        (activeTab === 'discover' && discoverGroupsRef.current)) {
      
      const currentRef = activeTab === 'myGroups' ? myGroupsRef.current : discoverGroupsRef.current
      
      gsap.fromTo(
        currentRef,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      
      animateContent(currentRef, cardRefs.current)
    }
  }, [activeTab])

  // Helper function to animate content
  const animateContent = (container: null, items: gsap.TweenTarget) => {
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: "power2.out",
        delay: 0.2
      }
    )
  }

  // Animation for modal
  useEffect(() => {
    if ((showCreateModal || showJoinModal) && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: -50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      )
    }
  }, [showCreateModal, showJoinModal])

  const handleJoinGroup = (group: React.SetStateAction<null>) => {
    setSelectedGroup(group)
    setShowJoinModal(true)
  }

  const handleLeaveGroup = (groupId: number) => {
    // Add actual leave functionality here
    alert(`You've left group #${groupId}`)
  }

  const filteredDiscoverGroups = discoverableGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-32 bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div ref={pageHeaderRef} className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
        <p className="mt-2 text-lg text-gray-600">Manage your existing groups or discover new study partners</p>
      </div>
      
      {/* Tabs Navigation */}
      <div ref={tabsRef} className="max-w-6xl mx-auto mb-6">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('myGroups')} 
            className={`py-4 px-6 font-medium text-lg transition-colors duration-200 ${
              activeTab === 'myGroups' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Groups
          </button>
          <button 
            onClick={() => setActiveTab('discover')} 
            className={`py-4 px-6 font-medium text-lg transition-colors duration-200 ${
              activeTab === 'discover' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Discover Groups
          </button>
        </div>
      </div>
      
      {/* My Groups Tab */}
      {activeTab === 'myGroups' && (
        <div ref={myGroupsRef} className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Study Groups</h2>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Group
            </button>
          </div>
          
          {myGroups.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">You're not in any groups yet</h3>
              <p className="text-gray-500 mb-4">Join existing groups or create your own to start collaborating</p>
              <button 
                onClick={() => setActiveTab('discover')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Discover Groups
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myGroups.map((group) => (
                <div
                  key={group.id}
                  ref={addToCardRefs as React.Ref<HTMLDivElement>}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                        <p className="text-sm text-gray-500">{group.subject}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        group.role === 'Admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {group.role}
                      </span>
                    </div>
                    
                    <p className="mt-3 text-gray-600">{group.description}</p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">{group.members}</span> members
                      </div>
                      {group.nextSession && (
                        <div className="text-sm text-blue-600">
                          Next: {group.nextSession}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between space-x-3">
                      <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors duration-200">
                        Manage
                      </button>
                      <button 
                        onClick={() => handleLeaveGroup(group.id)}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 px-4 rounded-md transition-colors duration-200"
                      >
                        Leave Group
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Discover Groups Tab */}
      {activeTab === 'discover' && (
        <div ref={discoverGroupsRef} className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Discover Study Groups</h2>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, subject..."
                  className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full">All Subjects</button>
              <button className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">Physics</button>
              <button className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">Math</button>
              <button className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">Computer Science</button>
              <button className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">Chemistry</button>
              <button className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">Literature</button>
            </div>
          </div>
          
          {filteredDiscoverGroups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No groups found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiscoverGroups.map((group) => (
                <div
                  key={group.id}
                  ref={addToCardRefs as React.Ref<HTMLDivElement>}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                        <p className="text-sm text-gray-500">{group.subject}</p>
                      </div>
                      <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {group.members} members
                      </span>
                    </div>
                    
                    <p className="mt-3 text-gray-600 text-sm">{group.description}</p>
                    
                    <div className="mt-4 text-xs text-gray-500">
                      Created by <span className="font-medium">{group.creator}</span> • {group.created}
                    </div>
                    
                    <button
                      onClick={() => handleJoinGroup(null)}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200"
                    >
                      Request to Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Create New Study Group</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="groupName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Advanced Physics Study Group"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="physics">Physics</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="computerScience">Computer Science</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="literature">Literature</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What will your group focus on?"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="privacy" className="block text-sm font-medium text-gray-700 mb-1">
                    Privacy Setting
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="privacy" value="public" className="h-4 w-4 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Public</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="privacy" value="private" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Private</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Join Group Modal */}
      {showJoinModal && selectedGroup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Join {selectedGroup.name}</h3>
                <button onClick={() => setShowJoinModal(false)} className="text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">{selectedGroup.name}</h4>
                <p className="text-sm text-blue-700 mb-2">{selectedGroup.subject} • {selectedGroup.members} members</p>
                <p className="text-sm text-gray-600">{selectedGroup.description}</p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="introMessage" className="block text-sm font-medium text-gray-700 mb-1">
                    Introduction Message (Optional)
                  </label>
                  <textarea
                    id="introMessage"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Briefly introduce yourself and why you want to join this group"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input id="notification" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"  />
                  <label htmlFor="notification" className="ml-2 block text-sm text-gray-700">
                    Notify me about group activities
                  </label>
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowJoinModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Request to join ${selectedGroup.name} has been sent!`)
                      setShowJoinModal(false)
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default page