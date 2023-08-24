import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const response = await fetch(
            'http://localhost:9000/api/v1/auth/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );

          const user = await response.json();

          if (user) {
            console.log('Authenticated');
            // Return user object on successful authentication
            console.log('Access TOKEN', user.accessToken);
            return user;
          } else {
            // Return null if authentication fails
            console.log('Not Authenticated');
            return Promise.resolve(null);
          }
        } catch (error) {
          // Handle error
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
});

export { handler as GET, handler as POST };
