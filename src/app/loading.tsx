'use client';
import Spinner from '@/components/loading/Spinner';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return domLoaded && <Spinner />;
}
