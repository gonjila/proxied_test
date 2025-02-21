"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_TOKEN_KEY } from "@/constants";

export default async function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerCookies = await cookies();

  if (headerCookies.has(AUTH_TOKEN_KEY)) {
    redirect("/");
  }

  return children;
}
