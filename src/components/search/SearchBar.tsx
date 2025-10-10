'use client';

import { getAllProductsAction } from '@/app/actions/products';
import { SerializedProduct } from '@/lib/models/products';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const [products, setProducts] = useState<SerializedProduct[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<SerializedProduct[]>([]);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getAllProductsAction();
      setProducts(data?.products || []);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(item => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredProducts(filtered);
  }, [searchText, products]);

  return (
    <div className="w-full">
      <input
        className="flex justify-center w-8/12 sm:w-1/2 mx-auto mb-8 m-auto text-black p-2 border rounded"
        type="text"
        placeholder="Type a floss brand to search hundreds of brands and products"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
      />
      {searchText && (
        <div className="flex justify-center">
          <ul
            className="bg-white border rounded max-h-60 overflow-auto mt-2 absolute z-10 sm:w-1/2 w-3/4"
            style={{ maxHeight: '200px', overflowY: 'scroll' }}
          >
            {filteredProducts.slice(0, 10).map(item => (
              <li key={item.id} className="p-2 hover:bg-gray-100 text-black">
                <Link href={`/floss/${item.id}`}>{item.name}</Link>
              </li>
            ))}
            {filteredProducts.length === 0 && (
              <li className="p-2 text-gray-500">No results found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
