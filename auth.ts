import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import clientPromise from "./lib/db/client";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "./lib/db";
import User from "./lib/db/models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        await connectToDatabase();
        if (
          credentials == null ||
          !credentials?.email ||
          typeof credentials?.email !== "string"
        ) {
          return null;
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password,
          );

          if (isMatch) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        if (!user.name) {
          await connectToDatabase();
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email!.split("@")[0],
            role: "user",
          });
        }
        token.name = user.name || user.email!.split("@")[0];
        token.role = (user as { role: string }).role;
      }

      if (session?.user?.name && trigger === "update") {
        token.name = session.user.name;
      }
      return token;
    },
    session: async ({ session, user, trigger, token }) => {
      if (token) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        if (trigger === "update") {
          session.user.name = user.name;
        }
      }
      return session;
    },
  },
});
