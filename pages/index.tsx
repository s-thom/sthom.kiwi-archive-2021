import dynamic from 'next/dynamic';
import React from 'react';
import HomeComponent from '../src/pages/Home';

const Backdrop = dynamic(() => import('../src/components/Backdrop'), { ssr: false });

export default function Home() {
  return (
    <>
      <Backdrop />
      <HomeComponent />
    </>
  );
}
