'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { getApiUrl } from '@/lib/utils';

export default function CreateReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [pros, setPros] = useState(['']);
  const [cons, setCons] = useState(['']);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      brand: formData.get('brand'),
      description: formData.get('description'),
      rating,
      pros: pros.filter(Boolean),
      cons: cons.filter(Boolean),
    };

    try {
      const res = await fetch(getApiUrl('/api/reviews'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create review');

      // Reset form
      e.currentTarget.reset();
      setRating(0);
      setPros(['']);
      setCons(['']);
      window.location.reload();
    } catch (error) {
      console.error('Error creating review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Share Your Floss Experience</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Review Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Floss Brand
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <StarIcon
                  className={`h-6 w-6 ${value <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Review Details
          </label>
          <textarea
            name="description"
            id="description"
            required
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pros</label>
          {pros.map((pro, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={pro}
                onChange={e => {
                  const newPros = [...pros];
                  newPros[index] = e.target.value;
                  if (index === pros.length - 1 && e.target.value) {
                    newPros.push('');
                  }
                  setPros(newPros);
                }}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a pro"
              />
              {index < pros.length - 1 && (
                <button
                  type="button"
                  onClick={() => setPros(pros.filter((_, i) => i !== index))}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cons</label>
          {cons.map((con, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={con}
                onChange={e => {
                  const newCons = [...cons];
                  newCons[index] = e.target.value;
                  if (index === cons.length - 1 && e.target.value) {
                    newCons.push('');
                  }
                  setCons(newCons);
                }}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a con"
              />
              {index < cons.length - 1 && (
                <button
                  type="button"
                  onClick={() => setCons(cons.filter((_, i) => i !== index))}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !rating}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
