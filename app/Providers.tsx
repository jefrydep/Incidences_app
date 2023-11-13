"use client";

import { AxiosInterceptor } from "@/interceptors/axios.interceptor";
import { SessionProvider } from "next-auth/react";
// AxiosInterceptor();
interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
