import { Suspense } from 'react';
import ReviewList from '@/components/ReviewList';
import CreateReviewForm from '@/components/CreateReviewForm';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Floss Reviews Forum</h1>
      
      {session ? (
        <div className="mb-8">
          <CreateReviewForm />
        </div>
      ) : (
        <p className="text-center mb-8 text-gray-600">
          Sign in to share your floss reviews!
        </p>
      )}

      <Suspense fallback={<div>Loading reviews...</div>}>
        <ReviewList />
      </Suspense>
    </main>
  );
}
