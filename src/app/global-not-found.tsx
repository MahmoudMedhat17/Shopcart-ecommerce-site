// Import global styles and fonts
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Logo from "@/src/components/Logo";
import Container from "../components/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Container>
          <div className="flex flex-col justify-center items-center min-h-screen w-fit mx-auto">
            <Logo className="text-2xl sm:text-3xl" />
            <div className="text-center my-8 space-y-4">
              <h3 className="text-3xl sm:text-4xl font-bold text-darkColor">
                Looking for something?
              </h3>
              <p className="text-xl text-shopLightText max-w-lg">
                We are sorry. The address you entered is not valid in our site.
              </p>
            </div>
            <div className="flex flex-col space-y-4 w-full">
              {/* Need to see if i can use Link instead of a tag here or not. */}
              <a
                href={"/"}
                className="text-white bg-shop-dark-green/70 hover:bg-shop-dark-green hoverEffect font-semibold py-2 px-4 rounded-lg text-center"
              >
                Go to Shopcart&apos;s home page
              </a>
              <button className="text-black hover:bg-shop-light-bg hoverEffect border border-shopLighterText font-semibold py-2 px-4 rounded-lg">
                Help
              </button>
            </div>
            <p className="pt-8 text-shopLightText text-center">
              Need help? Visit the Help section or Contact us
            </p>
          </div>
        </Container>
      </body>
    </html>
  );
}
