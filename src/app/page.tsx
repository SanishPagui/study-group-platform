'use client'
import React, { useEffect } from 'react';
import Home from './components/Home';
import LocomotiveScroll from 'locomotive-scroll';

const Page = () => {
  useEffect(() => {
    if (typeof window !== "undefined") { 
        const locomotiveScroll = new LocomotiveScroll();
        return () => {
            locomotiveScroll.destroy();
        };
    }
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
};

export default Page;
