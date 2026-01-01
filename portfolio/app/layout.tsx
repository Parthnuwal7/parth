import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parth Nuwal | Backend & ML Engineer",
  description: "Final-year CS undergraduate specializing in backend development, ML pipelines, and data-driven systems. Building APIs, FastAPI backends, and NLP solutions.",
  keywords: ["Parth Nuwal", "Backend Developer", "Machine Learning Engineer", "Python", "FastAPI", "NLP", "Full Stack Developer", "AI Engineer", "Founding Engineer", "Automation", "India"],
  authors: [{ name: "Parth Nuwal" }],
  creator: "Parth Nuwal",
  metadataBase: new URL("https://parth-nuwal-dev.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parth-nuwal-dev.vercel.app",
    siteName: "Parth Nuwal Portfolio",
    title: "Parth Nuwal | Backend & ML Engineer",
    description: "Final-year CS undergraduate specializing in backend development, ML pipelines, and data-driven systems.",
    images: [
      {
        url: "/hero.jpg",
        width: 800,
        height: 600,
        alt: "Parth Nuwal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Nuwal | Backend & ML Engineer",
    description: "Final-year CS undergraduate specializing in backend development, ML pipelines, and data-driven systems.",
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
};

// JSON-LD Structured Data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Parth Nuwal",
  url: "https://parth-nuwal-dev.vercel.app",
  image: "https://parth-nuwal-dev.vercel.app/hero.jpg",
  jobTitle: ["Backend Engineer", "Applied ML Engineer", "AI Engineer", "Founding Engineer", "Automation Engineer", "Data Engineer"],
  description: "Computer Science and Data Science undergraduate specializing in backend development, ML pipelines, and data-driven systems.",
  alumniOf: {
    "@type": "Organization",
    name: "Swami Keshavanand Institute of Technology"
  },
  knowsAbout: ["Python", "FastAPI", "Machine Learning", "NLP", "Backend Development", "Data Engineering", "AI Engineer", "Founding Engineer", "Automation", "India"],
  sameAs: [
    "https://github.com/Parthnuwal7",
    "https://www.linkedin.com/in/parth-nuwal-9a81b9226",
    "https://www.instagram.com/infinite.pixelz/",
    "https://infinite-pixelz.onrender.com/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <VisitorTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
