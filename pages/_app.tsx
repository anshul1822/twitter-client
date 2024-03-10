import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {GoogleOAuthProvider} from '@react-oauth/google';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return(
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId='561842676552-qqus23g8p1ovk1r32mdo0fpije5vio1g.apps.googleusercontent.com'>
       <Component {...pageProps} />
       <Toaster/>
       <ReactQueryDevtools/>
    </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
