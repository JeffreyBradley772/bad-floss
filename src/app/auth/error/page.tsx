import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function ErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams?.error || 'Unknown error';

  let errorMessage = 'An error occurred during authentication.';

  if (error === 'OAuthCallback') {
    errorMessage = 'There was a problem with the OAuth callback. Please try again.';
  } else if (error === 'OAuthSignin') {
    errorMessage = 'There was a problem when trying to sign in with the provider.';
  } else if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'This email is already associated with another account.';
  } else if (error === 'EmailCreateAccount') {
    errorMessage = 'There was a problem creating your account. Please try again.';
  } else if (error === 'Callback') {
    errorMessage = 'There was a problem with the callback.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'You do not have access to this resource.';
  } else if (error === 'Verification') {
    errorMessage = 'The verification token has expired or has already been used.';
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Authentication Error</h2>
          <div className="mt-2 text-red-600 text-lg">{errorMessage}</div>
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Return to home page
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try signing in again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
