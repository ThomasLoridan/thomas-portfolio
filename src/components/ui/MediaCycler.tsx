'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MediaCyclerProps {
  srcs: string[];
  interval?: number;
  alt?: string;
  fit?: 'cover' | 'contain';
}

export function MediaCycler({
  srcs,
  interval = 2500,
  alt = '',
  fit = 'cover',
}: MediaCyclerProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (srcs.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % srcs.length), interval);
    return () => clearInterval(t);
  }, [srcs.length, interval]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {srcs.map((src, i) => (
        <motion.div
          key={src}
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: fit }}
            unoptimized={/\.gif$/i.test(src)}
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
}
