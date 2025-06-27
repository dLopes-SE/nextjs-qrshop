// app/api/auth/[...nextauth]/route.ts
import axios from 'axios';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

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
      async authorize(credentials: Record<'email' | 'password', string> | undefined) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        return axios
          .post('https://localhost:7256/user/login', {
            email: credentials.email,
            password: credentials.password,
          })
          .then((res) => {
            if (res.data && res.data.jwt) {
              // Provide a dummy id if your backend does not return one
              return { id: credentials.email, jwt: res.data.jwt };
            }
            throw new Error('Invalid credentials. Please try again.');
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              throw new Error('Invalid credentials. Please try again.');
            }
            throw new Error('An unexpected error occurred. Please try again later.');
          }
        );
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if ((user as any)?.jwt) {
        token.jwt = (user as any).jwt;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.jwt = token.jwt;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Export GET and POST methods directly
export { handler as GET, handler as POST };
