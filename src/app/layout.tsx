import type { Metadata } from "next";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { TooltipProvider } from "@/src/components/ui/tooltip"
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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className="font-poppins antialiased">
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              {/* <main className="flex-1 bg-red-500"> */}
              {children}
              {/* </main> */}
              <Footer />
            </div>
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
