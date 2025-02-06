import { Suspense } from 'react';
import ReviewList from '@/components/ReviewList';
import CreateReviewForm from '@/components/CreateReviewForm';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { SparklesCore, ParticlesProps } from '@/components/ui/sparkles';
import { GradientLine } from '@/components/ui/GradientLine'

export default async function Home() {
  const session = await getServerSession(authOptions);

  const sparkleProps: ParticlesProps = {
    id: 'background-sparkles',
    background: 'transparent',
    particleSize: 10,
    speed: 2,
    className: 'absolute inset-0 w-full h-full',
    particleColor: '#007BFF',
  }

  return (
    <main className="container mx-auto px-4 py-8 relative min-h-screen">
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <SparklesCore {...sparkleProps} />
      </div>
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="relative">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Floss Reviews Forum</h1>
            <GradientLine />
          </div>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-4">
              Have you ever been betrayed by floss that shreds into a million pieces?
              Or those "convenient" floss sticks that snap at the worst possible moment?
              You're not alone.
            </p>
            <p className="mb-4">
              Welcome to the sanctuary for those who've suffered through subpar dental hygiene tools.
              Here, we unite to share our triumphs and tragedies with dental floss,
              helping others avoid the pitfalls of inferior string.
            </p>
            <p className="italic text-sm">
              Because life's too short for bad floss. 🦷✨
            </p>
          </div>
        </div>

        {session ? (
          <div className="mb-8">
            <CreateReviewForm />
          </div>
        ) : (
          <p className="text-center mb-8 text-gray-600 z-20">
            Sign in to share your floss reviews!
          </p>
        )}

        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewList />
        </Suspense>
      </div>
    </main>
  );
}
