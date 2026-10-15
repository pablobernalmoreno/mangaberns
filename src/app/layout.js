import { Inter, Outfit } from "next/font/google";
import PropTypes from "prop-types";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "MangaBerns",
  description: "My private manga tracker for ongoing series I am currently reading.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MangaBerns",
    description: "My private manga tracker for ongoing reads.",
    url: "/",
    type: "website",
    siteName: "MangaBerns",
  },
  twitter: {
    card: "summary_large_image",
    title: "MangaBerns",
    description: "My private manga tracker for ongoing reads.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <AuthProvider>
          <a href="#main-content" className="skipLink">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="appShell" tabIndex={-1}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
