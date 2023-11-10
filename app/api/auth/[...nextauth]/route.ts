import tramiteApi from "@/interceptors/tramiteApi";
import { LoginResponse } from "@/interface/LoginResponse";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        cidusuario: {
          label: "cidusuario",
          type: "text",
          placeholder: "45784578@gmail.com",
        },
        ccpassword: {
          label: "ccpassword",
          type: "password",
          placeholder: "************",
        },
        login: {
          label: "text",
          type: "text",
          placeholder: "************",
        },
        ide_eje: {
          label: "number",
          type: "number",
          placeholder: "************",
        },
        ano_eje: {
          label: "anoeje",
          type: "text",
          placeholder: "2023",
        },
        ide_apl: {
          label: "ideapl",
          type: "number",
          placeholder: "56",
        },
        i_p_equ: {
          label: "ipequ",
          type: "text",
          placeholder: "192.168.1.198",
        },
      },

      async authorize(credentials) {
        const ide_eje = Number(credentials?.ide_eje);
        const ide_apl = Number(credentials?.ide_apl);

        const res = await fetch(`${API_URL}/siam/usuarios/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...credentials,
            ide_eje,
            ide_apl,
          }),
        });
        const user: LoginResponse | any = await res.json();
        if (!user.access_token) throw new Error(JSON.stringify(user));
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
