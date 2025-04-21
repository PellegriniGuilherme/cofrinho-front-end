'use client';

import { Heading } from '@pellegrinidev/piggy-ui';
import React from 'react';

const NotFoundItems: React.FC<{ height?: boolean }> = ({ height = false }) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <Heading className="text-brand-500 text-center mb-4" size='2xl'>
        Ainda não existe nada aqui.
      </Heading>
      <img 
        src="/images/mascote/NotFound.png"
        alt="Cofrinho Mascot"
        className={`${height ? 'h-1/2' : 'h-1/3'}`}
      />
    </div>
  );
};

export default NotFoundItems;