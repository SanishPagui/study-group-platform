import React from 'react'
import Link from 'next/link'
import Footer from './Footer'

const Home = () => {
  return (
    <main className='h-full pt-24 bg-gray-200'>
        <div className='mt-30  flex justify-between px-44 w-1/2'>
          <span className='rounded-3xl bg-white p-4 px-10 py-14'>
            <h1 className='text-5xl w-[20vw] font-semibold '>Study Together, Achieve Together</h1>
            <p className='mt-6 text-2xl'>Join thousands of students collaborating in virtual study group to reach thier academic goals</p>
            <Link href={"/groups"}><button className='bg-cyan-400 cursor-pointer border-1 border-gray-600 rounded-full p-2 px-4 mt-7'>Get Started</button></Link>
          </span>
          <span>
            {/* some more things */}
          </span>
        </div>
        <section className='pb-44'>
          <h1 className='text-4xl font-semibold text-center mt-20'>Platform Section</h1>
          <div className='flex justify-between px-32 space-x-10 mt-10'>
            <div className='w-1/4 py-10 text-center px-20 rounded-xl bg-white'>
              <h2 className='text-2xl font-semibold'>Create Study Groups</h2>
              <p className='mt-4 text-xl'>Form groups based on subject courses or specific topics</p>
            </div>
            <div className='w-1/4 py-10 text-center px-20 rounded-xl bg-white'>
              <h2 className='text-2xl font-semibold'>Virtual Sessions</h2>
              <p className='mt-4 text-xl'>Schedule and join live video sessions with collaborative tools</p>
            </div>
            <div className='w-1/4 py-10 text-center px-20 rounded-xl bg-white'>
              <h2 className='text-2xl font-semibold'>Share Resources</h2>
              <p className='mt-4 text-xl'>Upload and access notes,flashcards, and study materials</p>
            </div>
            <div className='w-1/4 py-10 text-center px-20 rounded-xl bg-white'>
              <h2 className='text-2xl font-semibold'>Track Progress</h2>
              <p className='mt-4 text-xl'>Monitor indiviual and group progress with detailed analytics</p>
            </div>
          </div>
        </section>
        <Footer/>
    </main>
  )
}

export default Home