'use client'

import { motion } from 'framer-motion';
import {  Card as BaseCard, CardContent } from '@pellegrinidev/piggy-ui';
import React from 'react';

const Card = motion(BaseCard);

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className='bg-brand-50 h-screen w-screen flex items-center justify-center'>
      <Card 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='bg-white container h-3/4 flex'
      >
        <CardContent className='h-full flex flex-col lg:flex-row py-16 px-3 md:px-6'>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};