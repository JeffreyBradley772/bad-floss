# Implementing Autocomplete Search with Debounced API Calls

This document outlines how to implement an autocomplete search feature with debounced API calls in a React/Next.js application.

## Table of Contents

1. [Overview](#overview)
2. [Debounce Hook](#debounce-hook)
3. [API Endpoint](#api-endpoint)
4. [Autocomplete Component](#autocomplete-component)
5. [Integration with Forms](#integration-with-forms)
6. [Performance Considerations](#performance-considerations)

## Overview

When implementing search functionality with autocomplete, it's important to limit the number of API calls made as the user types. This is where debouncing comes in - it delays the execution of a function until after a certain amount of time has passed since it was last called.

## Debounce Hook

First, create a custom hook to debounce input values:

```tsx
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Clear the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

## API Endpoint

Create an API endpoint to handle search queries:

```typescript
// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  
  // Only search if the query is at least 2 characters long
  if (query.length < 2) {
    return NextResponse.json([]);
  }
  
  const results = await prisma.flossProduct.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
      ]
    },
    select: {
      id: true,
      name: true,
      brand: true,
    },
    take: 10, // Limit results to improve performance
  });
  
  return NextResponse.json(results);
}
```

## Autocomplete Component

Create a reusable autocomplete component:

```tsx
// src/components/Autocomplete.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

type SearchResult = {
  id: string;
  name: string;
  brand: string;
};

interface AutocompleteProps {
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function Autocomplete({ onSelect, placeholder = 'Search...', label }: AutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const debouncedQuery = useDebounce(query, 300); // 300ms delay
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle outside clicks to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Fetch search results when the debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    
    const searchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data);
        setHighlightedIndex(-1); // Reset highlighted index
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    searchProducts();
  }, [debouncedQuery]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    }
    
    // Arrow up
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
    }
    
    // Enter
    if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      const selected = results[highlightedIndex];
      if (selected) {
        handleSelect(selected);
      }
    }
    
    // Escape
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };
  
  const handleSelect = (item: SearchResult) => {
    onSelect(item.brand);
    setQuery(item.brand);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
        />
        
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          {results.length > 0 ? (
            <ul className="max-h-60 overflow-auto py-1">
              {results.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer px-4 py-2 ${
                    index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'
                  }`}
                >
                  <div className="font-medium">{item.brand}</div>
                  <div className="text-sm text-gray-500">{item.name}</div>
                </li>
              ))}
            </ul>
          ) : (
            debouncedQuery.length >= 2 && !isLoading && (
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
```

## Integration with Forms

Integrate the autocomplete component into your form:

```tsx
import Autocomplete from '@/components/Autocomplete';

export default function CreateReviewForm() {
  const [selectedBrand, setSelectedBrand] = useState('');
  
  // Form submission logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process form data including selectedBrand
    // ...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Other form fields */}
      
      <div className="mb-4">
        <Autocomplete 
          label="Floss Brand"
          placeholder="Start typing to search brands..."
          onSelect={setSelectedBrand}
        />
      </div>
      
      {/* More form fields */}
      
      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}
```

## Performance Considerations

1. **Debounce Delay**: Adjust the debounce delay based on your use case. 300ms is a good starting point.

2. **Minimum Query Length**: Only trigger API calls when the query is at least 2-3 characters long.

3. **Result Limiting**: Limit the number of results returned by the API to improve performance.

4. **Caching**: Consider caching frequent searches to reduce API calls.

5. **Throttling**: For high-traffic applications, implement rate limiting on your API endpoints.

## Advanced Features

- **Highlighting Matches**: Highlight the matching text in search results
- **Recent Searches**: Store and display recent searches
- **Keyboard Navigation**: Allow users to navigate results with arrow keys
- **Fuzzy Search**: Implement fuzzy matching for more forgiving search
- **Search Analytics**: Track popular searches to improve the user experience

---

This implementation provides a solid foundation for an autocomplete search feature with debounced API calls. Adjust and extend it based on your specific requirements.
