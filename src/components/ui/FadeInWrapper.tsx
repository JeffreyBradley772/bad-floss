'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';

type FadeInWrapperProps = {
  children: ReactNode;
  delay?: number;
};

export default function FadeInWrapper({ children, delay = 0 }: FadeInWrapperProps) {
  // Start with invisible state
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make sure we're in the browser
    if (typeof window === 'undefined') return;

    // Small delay to ensure the initial state is applied before transitioning
    const initialTimeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
              if (delay) {
                setTimeout(() => setIsVisible(true), delay);
              } else {
                setIsVisible(true);
              }
            });
            observer.disconnect();
          }
        },
        {
          // Lower threshold to start animation earlier
          threshold: 0.1,
          // Add root margin to trigger before element is in view
          rootMargin: '50px',
        }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, 10);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 500ms ease-out, transform 500ms ease-out',
      }}
    >
      {children}
    </div>
  );
}
