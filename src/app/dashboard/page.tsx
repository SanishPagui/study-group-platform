'use client'

import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

const Page = () => {
  const [activeItem, setActiveItem] = useState('')
  const itemList = ['Dashboard', 'My Study Groups', 'Schedule Sessions', 'Resources', 'Tasks And Progress', 'Discussions', 'Analytics'] 
  
  // Refs for animations
  const sidebarRef = useRef(null)
  const mainContentRef = useRef(null)
  const activityRef = useRef(null)
  const menuItemsRef = useRef([])
  
  // Clear and reset refs array for menu items
  menuItemsRef.current = []
  const addToMenuRefs = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el)
    }
  }

  useEffect(() => {
    setActiveItem(itemList[0])
    
    // Initial animations
    const timeline = gsap.timeline()
    
    // Animate sidebar
    timeline.fromTo(
      sidebarRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    
    // Animate menu items
    timeline.fromTo(
      menuItemsRef.current,
      { x: -20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: "power2.out" 
      },
      "-=0.4" // Start slightly before the previous animation finishes
    )
    
    // Animate main content
    timeline.fromTo(
      mainContentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.2"
    )
    
    // Animate activity panel
    timeline.fromTo(
      activityRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.7"
    )
  }, [])
  
  // Animation for changing content sections
  useEffect(() => {
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
    }
  }, [activeItem])

  const settingTheList = (item) => {
    setActiveItem(item)
  }
  
  // Content renderer based on active item
  const renderContent = () => {
    switch(activeItem) {
      case 'Dashboard':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Welcome back, Alex!</h2>
              <p className="text-gray-500">Last login: Today, 10:45 AM</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-medium text-gray-700 mb-2">Upcoming Sessions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Advanced Physics</span>
                    <span className="text-blue-600">Today, 2:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Calculus Study Group</span>
                    <span className="text-blue-600">Tomorrow, 10:00 AM</span>
                  </div>
                </div>
                <button className="mt-3 text-blue-600 text-sm font-medium">View All Sessions</button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-medium text-gray-700 mb-2">Task Completion</h3>
                <div className="h-36 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-700">78%</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600">7 of 9 tasks completed</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-medium text-gray-700 mb-3">Recent Resources</h3>
              <div className="space-y-2">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Physics Chapter 7 Notes</p>
                    <p className="text-xs text-gray-500">Added by Sarah • 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Calculus Practice Problems</p>
                    <p className="text-xs text-gray-500">Added by you • 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'My Study Groups':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Study Groups</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create New Group</button>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  name: "Advanced Physics", 
                  members: 8, 
                  active: true, 
                  lastActivity: "Today", 
                  description: "Covering quantum mechanics and relativity theories"
                },
                { 
                  name: "Calculus Masters", 
                  members: 12, 
                  active: true, 
                  lastActivity: "Yesterday", 
                  description: "Focus on differential equations and applications"
                },
                { 
                  name: "Programming Fundamentals", 
                  members: 15, 
                  active: false, 
                  lastActivity: "3 days ago", 
                  description: "Learning basics of algorithms and data structures"
                }
              ].map((group, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{group.name}</h3>
                      <p className="text-gray-600 text-sm">{group.description}</p>
                    </div>
                    <div className="flex items-center">
                      {group.active && (
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      )}
                      <span className={`text-sm ${group.active ? "text-green-600" : "text-gray-500"}`}>
                        {group.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>{group.members} members</span>
                    <span>Last activity: {group.lastActivity}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-end space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">View Details</button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Join Session</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'Schedule Sessions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Schedule Sessions</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create New Session</button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                  <div key={i} className="text-center font-medium py-2">{day}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`h-24 border p-1 ${i % 7 === 0 || i % 7 === 6 ? "bg-gray-50" : ""} hover:bg-blue-50 cursor-pointer`}
                  >
                    <div className="text-right text-sm text-gray-500">{i + 1}</div>
                    {i === 8 && (
                      <div className="mt-1 bg-blue-100 border-l-4 border-blue-600 p-1 text-xs rounded">
                        <div className="font-medium">Physics</div>
                        <div>2:00 - 3:30 PM</div>
                      </div>
                    )}
                    {i === 16 && (
                      <div className="mt-1 bg-green-100 border-l-4 border-green-600 p-1 text-xs rounded">
                        <div className="font-medium">Calculus</div>
                        <div>10:00 - 11:30 AM</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-medium text-gray-700 mb-3">Upcoming Sessions</h3>
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Advanced Physics</h4>
                      <p className="text-sm text-gray-600">Quantum Mechanics Review</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-medium">Today, 2:00 PM</p>
                      <p className="text-sm text-gray-500">Duration: 1.5 hours</p>
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-3">
                    <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Join Now</button>
                    <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Reschedule</button>
                  </div>
                </div>
                
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Calculus Study Group</h4>
                      <p className="text-sm text-gray-600">Integration Techniques</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-medium">Tomorrow, 10:00 AM</p>
                      <p className="text-sm text-gray-500">Duration: 1.5 hours</p>
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-3">
                    <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Edit Details</button>
                    <button className="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'Resources':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Resources</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Upload New Resource</button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto py-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full whitespace-nowrap">All Resources</button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap">Documents</button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap">Video Tutorials</button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap">Flash Cards</button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap">Practice Tests</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  type: "document", 
                  title: "Physics Chapter 7 Notes", 
                  author: "Sarah", 
                  date: "2 days ago",
                  downloads: 24
                },
                { 
                  type: "document", 
                  title: "Calculus Practice Problems", 
                  author: "You", 
                  date: "1 week ago",
                  downloads: 36
                },
                { 
                  type: "video", 
                  title: "Integration Techniques Tutorial", 
                  author: "Prof. Johnson", 
                  date: "3 days ago",
                  views: 89
                },
                { 
                  type: "flashcards", 
                  title: "Physics Formulas Flashcards", 
                  author: "Mark", 
                  date: "5 days ago",
                  cards: 42
                }
              ].map((resource, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex">
                    <div className={`w-12 h-12 rounded flex items-center justify-center mr-4 ${
                      resource.type === "document" ? "bg-red-100" : 
                      resource.type === "video" ? "bg-blue-100" :
                      "bg-green-100"
                    }`}>
                      {resource.type === "document" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      )}
                      {resource.type === "video" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                      {resource.type === "flashcards" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-gray-500">Added by {resource.author} • {resource.date}</p>
                      <div className="mt-2 flex justify-between">
                        <span className="text-xs text-gray-500">
                          {resource.downloads && `${resource.downloads} downloads`}
                          {resource.views && `${resource.views} views`}
                          {resource.cards && `${resource.cards} cards`}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-sm text-blue-600 hover:underline">Preview</button>
                          <button className="text-sm text-blue-600 hover:underline">Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'Tasks And Progress':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Tasks And Progress</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add New Task</button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-medium text-gray-700 mb-3">Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm text-blue-800 mb-2">Completed Tasks</h4>
                  <p className="text-3xl font-bold text-blue-600">7</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <h4 className="text-sm text-yellow-800 mb-2">In Progress</h4>
                  <p className="text-3xl font-bold text-yellow-600">2</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <h4 className="text-sm text-red-800 mb-2">Overdue</h4>
                  <p className="text-3xl font-bold text-red-600">1</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Current Tasks</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">All</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">By Subject</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">By Due Date</button>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { 
                    title: "Complete Physics Problem Set", 
                    subject: "Physics", 
                    due: "Today", 
                    status: "in-progress",
                    priority: "high" 
                  },
                  { 
                    title: "Review Calculus Chapter 8", 
                    subject: "Calculus", 
                    due: "Tomorrow", 
                    status: "in-progress",
                    priority: "medium" 
                  },
                  { 
                    title: "Submit Research Paper Outline", 
                    subject: "Literature", 
                    due: "Yesterday", 
                    status: "overdue",
                    priority: "high" 
                  },
                  { 
                    title: "Prepare Presentation Slides", 
                    subject: "Computer Science", 
                    due: "Completed", 
                    status: "completed",
                    priority: "medium" 
                  }
                ].map((task, index) => (
                  <div key={index} className={`border-l-4 p-3 ${
                    task.status === "completed" ? "border-green-500 bg-green-50" :
                    task.status === "overdue" ? "border-red-500 bg-red-50" :
                    "border-yellow-500 bg-yellow-50"
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mt-1 mr-3" 
                          checked={task.status === "completed"} 
                          readOnly
                        />
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600">Subject: {task.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          task.status === "completed" ? "text-green-600" :
                          task.status === "overdue" ? "text-red-600" :
                          "text-yellow-600"
                        }`}>
                          {task.due}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === "high" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {task.priority === "high" ? "High Priority" : "Medium Priority"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Edit</button>
                      {task.status !== "completed" && (
                        <button className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      
      default:
        return <div className="p-6 bg-white rounded-lg shadow-md">Content for {activeItem} will be displayed here.</div>
    }
  }

  return (
    <section className='min-h-screen bg-gray-100 pt-24'>
      <div className='w-full flex flex-col lg:flex-row space-y-6 lg:space-y-0 px-4 lg:px-12 xl:px-20 pb-12'>
        {/* Sidebar */}
        <div ref={sidebarRef} className='w-full lg:w-1/4 bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='p-6 text-center border-b'>
            <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
              {/* Placeholder for user avatar */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">A</div>
            </div>
            <h2 className='font-bold text-2xl text-gray-800'>Alex Johnson</h2>
            <h4 className='text-lg text-gray-600'>Computer Science</h4>
          </div>
          <ul className='w-full p-4 space-y-2'>
            {itemList.map((item, index) => (
              <li
                key={index}
                ref={addToMenuRefs}
                onClick={() => settingTheList(item)}
                className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeItem === item 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
                    : "hover:bg-blue-50 text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  {/* Icons for menu items */}
                  {item === 'Dashboard' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )}
                  {item === 'My Study Groups' && (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)}
{item === 'Schedule Sessions' && (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)}
{item === 'Resources' && (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)}
{item === 'Tasks And Progress' && (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
)}
{item === 'Discussions' && (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)}
{item === 'Analytics' && (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)}
<span className="font-medium">{item}</span>
</div>
</li>
            ))}
          </ul>
          <div className="mt-8 p-4">
            <button className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full lg:w-2/4 px-0 lg:px-6">
          <div ref={mainContentRef} className="bg-gray-100 rounded-xl">
            {renderContent()}
          </div>
        </div>
        
        {/* Activity Panel */}
        <div ref={activityRef} className="w-full lg:w-1/4 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Recent Activity</h2>
          </div>
          <div className="p-4 space-y-4">
            {[
              { 
                user: "Sarah Chen", 
                action: "shared notes", 
                target: "Physics Chapter 7", 
                time: "10 minutes ago",
                avatar: "S"
              },
              { 
                user: "Mark Johnson", 
                action: "scheduled session", 
                target: "Calculus Group", 
                time: "2 hours ago",
                avatar: "M"
              },
              { 
                user: "Jake Wilson", 
                action: "commented on", 
                target: "your question", 
                time: "Yesterday",
                avatar: "J"
              },
              { 
                user: "Emma Davis", 
                action: "joined", 
                target: "Advanced Physics group", 
                time: "Yesterday",
                avatar: "E"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                  {activity.avatar}
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action} <span className="text-blue-600">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <h3 className="font-medium mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                <h4 className="font-medium text-sm">Physics Quiz</h4>
                <p className="text-xs text-gray-600">Tomorrow, 1:00 PM</p>
              </div>
              <div className="bg-green-50 p-2 rounded border-l-4 border-green-500">
                <h4 className="font-medium text-sm">Group Project Deadline</h4>
                <p className="text-xs text-gray-600">Apr 5, 11:59 PM</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <h3 className="font-medium mb-3">Study Streak</h3>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="font-bold text-2xl">7 Days</p>
                <p className="text-xs text-gray-500">Keep it up!</p>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div 
                    key={day} 
                    className="w-5 h-5 rounded-sm bg-blue-500"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page