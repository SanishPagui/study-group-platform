'use client'

import React, { useEffect, useState } from 'react'

const Page = () => {
  const [activeItem, setActiveItem] = useState('')
  const itemList = ['Dashboard', 'My Study Group', 'Schedule Sessions', 'Resources', 'Tasks And Progress', 'Discussions', 'Analytics'] 

  useEffect(() => {
    setActiveItem(itemList[0])
  } ,[])

  const settingTheList = (item: string) => {
    setActiveItem(item)
  }

  return (
    <section className='bg-gray-300 pt-24'>
      <div className='w-full flex justify-between px-20'>
        <div className='w-1/4 bg-white'>
          <div className='text-center  w-full'>
            <h2 className='font-bold text-4xl'>Name</h2>
            <h4 className='text-2xl'>Branch</h4>
          </div>
          <ul className='w-full px-5 space-y-5'>
            {itemList.map((item, index) => (
              <li
                key={index}
                onClick={() => settingTheList(item)}
                className={`p-2 rounded-sm text-xl ${activeItem === item ? "bg-blue-300 text-black" : "bg-white text-blue-700"}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className='w-1/3'>
          <div className='w-full'>
            <h1>{activeItem}</h1>
          </div>
        </div>
        <div className='w-1/3'>
          <div>
            <h1>Recent Activity</h1>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  )
}

export default Page
