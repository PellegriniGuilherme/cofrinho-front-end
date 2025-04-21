'use client';

import { Heading, Text } from '@pellegrinidev/piggy-ui';
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-brand-50">
      <Heading className="text-brand-500 text-center mb-4" size='2xl'>
        Parece que você se perdeu...
      </Heading>
      <img 
        src="/images/mascote/NotFound.png"
        alt="Cofrinho Mascot"
        className="w-1/4"
      />
      <Text align='center' size='lg' className="mt-4">
        A página que você está procurando não existe ou foi removida.
      </Text>
      <Link href="/" className="mt-4 text-brand-500 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;