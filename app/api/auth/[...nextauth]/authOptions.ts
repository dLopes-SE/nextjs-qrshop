import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import axios from '@/lib/axios';

const apiBaseUrl = process.env.INTERNAL_API_URL || 'https://localhost:7256';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email',
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
          .post(`${apiBaseUrl}/user/login`, {
            email: credentials.email,
            password: credentials.password,
          })
          .then((res) => {
            if (res.data && res.data.token) {
              // Successful login — return user object
              return { id: credentials.email, jwt: res.data.token };
            }
            // If response didn’t include a token, treat as invalid
            throw new Error('Invalid credentials. Please try again.');
          })
          .catch((error) => {
            // Specific 400 = bad credentials
            if (error.response && error.response.status === 400) {
              throw new Error('Invalid credentials. Please try again.');
            }

            // Any other issue — e.g. network, 401, connection refused, etc.
            throw new Error('Unable to contact the API. Please try again later.');
          });
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      // Only set token.jwt if user is present (on sign-in)
      if (user?.jwt) {
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Only expose jwt at the top level of session
      session.jwt = token.jwt;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
