import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Next.js App",
  description: "An awesome Next.js application",
};

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className={inter.className}>
        <Head>
          {/* <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} /> */}
        </Head>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
