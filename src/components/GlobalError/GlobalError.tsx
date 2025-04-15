import { ErrorText } from '@pellegrinidev/piggy-ui';
import React from 'react';

interface GlobalErrorProps {
  error?: string | null;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error }) => {
  if (typeof error === 'string') {
    return <ErrorText>{error}</ErrorText>;
  }
  return null;
};

export default GlobalError;