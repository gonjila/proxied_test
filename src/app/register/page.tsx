"use client";

import { useMutation } from "@apollo/client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { authMutation } from "@/gql";
import { AUTH_TOKEN_KEY } from "@/constants";

export default function RegisterPage() {
  const router = useRouter();

  const [register, { data, loading, error }] = useMutation(authMutation.REGISTER, {
    onCompleted: response => {
      if (response.register.token) {
        setCookie(AUTH_TOKEN_KEY, response.register.token, { path: "/" });
        router.push("/");
      }
    },
  });

  const handleRegister = async () => {
    try {
      await register();
    } catch (err) {
      // TODO show error toast with err.message
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Register</h1>

        {loading && <p className="text-gray-500">Registering...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {data?.register && (
          <p className="text-green-500 font-semibold">Registered! Token saved in cookies.</p>
        )}
        <button
          onClick={handleRegister}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}
