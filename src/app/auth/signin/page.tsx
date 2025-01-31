import { getProviders } from "next-auth/react";
import SignInForm from "@/components/SignInForm";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">
            Join our community of dental hygiene enthusiasts
          </p>
        </div>
        <SignInForm providers={providers} />
      </div>
    </div>
  );
}
