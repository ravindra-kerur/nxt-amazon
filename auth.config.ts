import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      const { pathname } = request.nextUrl;
      const protectedPaths = [
        /^\/(checkout)(\/.*)?$/,
        /^\/(account)(\/.*)?$/,
        /^\/(admin)(\/.*)?$/,
      ];

      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;

      return true;
    },
  },
} satisfies NextAuthConfig;
