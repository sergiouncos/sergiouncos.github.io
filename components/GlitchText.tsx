import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface DecryptTextProps {
  text: string;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const DecryptText: React.FC<DecryptTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if (index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Speed control
    }, 30);

    return () => clearInterval(interval);
  }, [text, isInView]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
};

export default DecryptText;