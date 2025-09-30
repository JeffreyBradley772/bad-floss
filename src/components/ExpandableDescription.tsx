'use client';

import { useState, useEffect, useRef } from 'react';

interface ExpandableDescriptionProps {
  description: string;
  maxLines?: number;
  imageHeight?: string;
}

export function ExpandableDescription({
  description,
  maxLines = 3,
  imageHeight,
}: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const lineHeight = 24; // pixels

  // Try to calculate vh based on imageHeight, fallback to line-based calculation
  const getMaxHeight = () => {
    if (imageHeight && typeof window !== 'undefined') {
      // Convert vh to pixels if imageHeight is in vh units
      if (imageHeight.includes('vh')) {
        const vhValue = parseFloat(imageHeight.replace('vh', ''));
        return ((window.innerHeight * vhValue) / 100) * 0.6; // Use 60% of image height
      }
      // fallback to line-based calculation
      return maxLines * lineHeight;
    }
    return maxLines * lineHeight;
  };

  const maxHeight = getMaxHeight();

  useEffect(() => {
    if (contentRef.current && description) {
      const fullHeight = contentRef.current.scrollHeight;
      setShowToggle(fullHeight > maxHeight);
    }
  }, [description, maxHeight]);

  if (!description) {
    return null;
  }

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={`
          bg-white rounded-lg text-lg prose text-black px-4 py-2
          transition-all duration-300 ease-in-out
          ${!isExpanded && showToggle ? 'overflow-hidden' : 'overflow-y-auto'}
          [&::-webkit-scrollbar]:hidden [scrollbar-width:none]
        `}
        style={{
          height: !isExpanded && showToggle ? `${maxHeight}px` : 'auto',
          maxHeight: isExpanded ? 'none' : showToggle ? `${maxHeight}px` : 'auto',
        }}
      >
        {description}
      </div>

      {/* Top fade overlay */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none rounded-t-lg"></div>

      {/* Bottom fade overlay - only when collapsed */}
      {!isExpanded && showToggle && (
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg"></div>
      )}

      {/* Toggle button */}
      {showToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
}
