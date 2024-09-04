const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Next.js App",
  description: "An awesome Next.js application",
};

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
