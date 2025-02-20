"use client";

import { useMutation } from "@apollo/client";
import { setCookie } from "cookies-next";

import { authMutation } from "@/gql";
import { AUTH_TOKEN_KEY } from "@/constants";

export default function RegisterPage() {
  const [register, { data, loading, error }] = useMutation(authMutation.REGISTER, {
    onCompleted: response => {
      if (response.register.token) {
        setCookie(AUTH_TOKEN_KEY, response.register.token, { path: "/" });
      }
    },
  });

  const handleRegister = async () => {
    try {
      await register();
    } catch (err) {
      // TODO alert with error message
      console.error(err);
    }
  };

  if (loading) return <p>Registering...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // TODO restyle this page & redirect to home page after registration
  return (
    <div>
      <h1>Register</h1>
      {data?.register && <p>Registered! Token saved in cookies.</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
