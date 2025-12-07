import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "@/contexts/authContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "System Design Studio - Visual Workflow & AI-Powered Design",
    template: "%s | System Design Studio",
  },
  description:
    "Create, visualize, and optimize system design workflows with AI assistance. Interactive canvas for building architecture diagrams, workflow automation, and real-time collaboration.",
  keywords: [
    "system design",
    "workflow automation",
    "AI assistant",
    "architecture diagrams",
    "visual design studio",
    "workflow builder",
    "system architecture",
    "design patterns",
    "collaboration tools",
  ],
  authors: [{ name: "System Design Studio" }],
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://system-design-workflow-simulator-fr.vercel.app/",
    siteName: "System Design Studio",
    title: "System Design Studio - Visual Workflow & AI-Powered Design",
    description:
      "Create, visualize, and optimize system design workflows with AI assistance. Interactive canvas for building architecture diagrams and workflow automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
