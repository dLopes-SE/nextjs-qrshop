// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email', // Request user's name and image along with email
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const response = await axios.post('https://localhost:7256/user/login', {
          email: credentials.email,
          password: credentials.password,
        })
        .then(async (res : any) => {
          const user = await res.json();
          if (user) {
            return user;
          }
        })
        .catch((error) => {
          if (error.status === 400) {
            throw new Error('Invalid credentials. Please try again.');
          }

          console.error('An error occurred during login:', error);
          throw new Error('An unexpected error occurred. Please try again later.');
        });

        if (response.data){
          return response.data;
        }

        throw new Error('Invalid credentials. Please try again.');
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.jwt = user.jwt;
        token.name = user.name || user?.given_name || user?.login; // Add name from OAuth providers if available
        token.image = user.image || user?.picture || null; // Add image from OAuth providers if available
      }
      console.log(token);
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.jwt = token.jwt;
      session.user.name = token.name; // Add name to session
      session.user.image = token.image; // Add image to session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Export GET and POST methods directly
export { handler as GET, handler as POST };