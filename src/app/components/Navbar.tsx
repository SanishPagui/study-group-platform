'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Signup from './Signup';

const Navbar = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    return (
        <div className='w-full'>
                <div className='h-24 fixed bg-cyan-950 w-full flex justify-between items-center px-24'>
                        <div className=''>
                                <h1 className='text-4xl text-white font-bols'><Link href={"/"}>Study Buddy</Link></h1>
                        </div>
                        <div className=''>
                                <ul className='flex space-x-6'>
                                        <li className='text-white text-2xl'><Link href={"/groups"}>Groups</Link></li>
                                        <li className='text-white text-2xl'><Link href={"/resources"}>Resources</Link></li>
                                        <li className='text-white text-2xl'><button onClick={() => setIsSignupOpen(true)}>Sign up</button></li>
                                </ul>
                        </div>
                </div>
                <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
        </div>
        
    )
}

export default Navbar
