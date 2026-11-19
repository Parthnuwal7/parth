import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import { ThemeProvider } from "@/components/ThemeProvider";
import CalFloatingButton from "@/components/CalFloatingButton";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parth Nuwal | AI Engineer - Agents, Backend & Data",
  description: "AI engineer for agents, backend and data. Sole engineer at a two-person AI startup, shipping LLM agents and evals to production. Open to AI Engineer, FDE, SWE (AI) and founding roles.",
  keywords: ["Parth Nuwal", "AI Engineer","Founding Engineer", "Generative AI Engineer", "LLM Engineer", "LLM Agents", "LLM Evaluation", "Generative Video", "Python", "FastAPI", "India", "Founding AI Engineer", "Early-Stage Startup Engineer", "AI Agent Engineer", "Agentic AI", "Multi-Agent Systems", "Google ADK", "LangChain", "RAG", "Backend Engineer", "Data Engineer", "Backend and Data Engineer", "Data Engineering", "Remote AI Engineer", "Forward Deployed Engineer", "FDE", "Forward Deployed AI Engineer", "Software Engineer AI", "SWE AI", "AI Software Engineer", "Applied AI Engineer"],
  authors: [{ name: "Parth Nuwal" }],
  creator: "Parth Nuwal",
  metadataBase: new URL("https://parth-nuwal-dev.vercel.app"),
  alternates: {
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parth-nuwal-dev.vercel.app",
    siteName: "Parth Nuwal Portfolio",
    title: "Parth Nuwal | Agents, Backend & Data",
    description: "AI engineer for agents, backend and data. Sole engineer at a two-person AI startup, shipping LLM agents and evals to production. Open to AI Engineer, FDE, SWE (AI) and founding roles.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Parth Nuwal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Nuwal | Agents, Backend & Data",
    description: "AI engineer for agents, backend and data. Sole engineer at a two-person AI startup, shipping LLM agents and evals to production. Open to AI Engineer, FDE, SWE (AI) and founding roles.",
    images: ["/og.jpg"],
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
  image: "https://parth-nuwal-dev.vercel.app/profile.jpg",
  jobTitle: "AI Engineer",
  seeks: {
    "@type": "Demand",
    description: "Roles: AI Engineer, Forward Deployed Engineer (FDE), Software Engineer (AI), Backend & Data Engineer, Founding Engineer at early-stage startups",
  },
  description: "Parth Nuwal is a founding-style AI engineer who ships generative AI products end to end at early-stage startups. He was the sole engineer at AdAI, a two-person AI video-ad startup, cut an LLM marketing assistant's failure rate from 65% to 5% at AtTheRate.ai, and owned access control for Flipkart's Saarthi Initiative (30K sellers). He builds LLM agents, evaluation systems and the backend and data infrastructure behind them, and is open to AI Engineer, Forward Deployed Engineer (FDE), Software Engineer (AI), backend and data engineering, and early-stage founding engineer roles.",
  alumniOf: {
    "@type": "Organization",
    name: "Swami Keshvanand Institute of Technology (SKIT), Jaipur"
  },
  knowsAbout: ["Founding Engineer", "Startup Engineering", "Generative AI", "LLM Agents", "Multi-Agent Systems", "Agentic AI", "Google ADK", "LangChain", "LLM Evaluation", "LLM-as-judge", "Backend Engineering", "Data Engineering", "Forward Deployed Engineering", "Video Processing Pipelines", "Computer Vision", "RAG", "Python", "FastAPI", "PostgreSQL", "Redis", "GCP", "Modal", "Software Engineering", "Remote Work", "Software Engineering Fundamentals", "AI Ethics", "AI Reliability", "Cost Control", "Quality Assurance", "Forward Deployed Engineer", "Full Stack Development", "Cloud Infrastructure", "Docker", "Git", "Linux"],
  homeLocation: { "@type": "Country", name: "India" },
  email: "mailto:parthnuwal7@gmail.com",
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
          <CalFloatingButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
