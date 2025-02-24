"use client";

import { useMutation } from "@apollo/client";
import { setCookie } from "cookies-next";

import { authMutations } from "@/gql";
import { AUTH_TOKEN_KEY } from "@/constants";

export default function RegisterPage() {
  const [register, { data, loading, error }] = useMutation(authMutations.REGISTER, {
    onCompleted: async response => {
      if (response.register.token) {
        await setCookie(AUTH_TOKEN_KEY, response.register.token, { path: "/" });

        window.location.reload();
      }
    },
  });

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Register</h1>

        {loading && <p className="text-gray-500">Registering...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {data?.register && (
          <p className="text-green-500 font-semibold">Registered! Token saved in cookies.</p>
        )}
        <button
          onClick={() => register()}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full"
        >
          Register
        </button>
      </div>
    </main>
  );
}
