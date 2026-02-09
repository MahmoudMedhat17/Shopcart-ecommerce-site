import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip"
import { ClerkProvider } from '@clerk/nextjs'


export const metadata: Metadata = {
  title: {
    template: "Ecommerce Store",
    default: "Ecommerce Store"
  },
  description: "Your one Store shop for all of your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased">
          <TooltipProvider>
            <Header />
            {children}
            <Footer />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
