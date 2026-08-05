import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface DecryptTextProps {
  text: string;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const scrambleText = (text: string) => text.split('').map((character) => (
  character === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
)).join('');

const DecryptText: React.FC<DecryptTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(() => scrambleText(text));
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
    <span ref={ref} className={`inline-grid ${className}`}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{text}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1">{displayText}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
};

export default DecryptText;
