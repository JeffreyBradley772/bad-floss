export default function VerifyRequest() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600">A sign in link has been sent to your email address.</p>
        </div>
        <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
          <p>
            The link will expire in 24 hours. If you don&apos;t see the email, check your spam
            folder.
          </p>
        </div>
      </div>
    </div>
  );
}
