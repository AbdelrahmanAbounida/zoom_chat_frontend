// import '@/styles/globals.css'
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>

      <Analytics />
    </SessionProvider>
  );
}

export default App;
