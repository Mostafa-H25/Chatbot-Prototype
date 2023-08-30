import GlobalContext from '@/services/context/GlobalContext';
import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from '@/components/Providers/Providers';
import 'react-toastify/dist/ReactToastify.css';
import QueryProviders from '@/components/Providers/QueryClientProvider';
import WrapRedux from './WrapRedux';
export const metadata: Metadata = {
  title: 'AI Platform',
  description: 'AI Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <QueryProviders>
        <body>
          <AuthProvider>
            <WrapRedux>
              <div id='modal-root'></div>
              {children}
            </WrapRedux>
          </AuthProvider>
        </body>
      </QueryProviders>
    </html>
  );
}
