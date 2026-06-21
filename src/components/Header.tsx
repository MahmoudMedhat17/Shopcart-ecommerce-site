import Container from "@/src/components/Container";
import Logo from "@/src/components/Logo";
import HeaderMenu from "@/src/components/HeaderMenu";
import Searchbar from "@/src/components/Searchbar";
import Carticon from "@/src/components/Carticon";
import Favicon from "@/src/components/Favicon";
import Login from "@/src/components/Login";
import Mobilemenu from "@/src/components/Mobilemenu";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Ordericon from "./Ordericon";
import { NextResponse } from "next/server";

// async component so we can await server-side data (currentUser) before rendering
const Header = async () => {
  // fetch the currently authenticated user from Clerk on the server
  const user = await currentUser();

  // guard clause: if no user is authenticated, return a 404 JSON error response and stop rendering
  if (!user) {
    return NextResponse.json(
      { error: "User is not signed in!" },
      { status: 404 },
    );
  }

  return (
    // sticky header pinned to the top with a frosted-glass background (backdrop blur + semi-transparent white)
    <header className="py-5 sticky top-0 left-0 z-50 bg-white/70 backdrop-blur-md">
      {/* Container centers and constrains max-width; flex layout splits children into left / center / right zones */}
      <Container className="flex justify-between items-center">
        {/* Left zone: mobile hamburger menu + logo, responsive width (auto on mobile, 1/3 on md+) */}
        <div className="w-auto md:w-1/3 flex justify-start items-center gap-2.5 md:gap-0">
          {/* Mobilemenu renders only on small screens as a slide-out nav trigger */}
          <Mobilemenu />
          <Logo />
        </div>

        {/* Center zone: horizontal nav links, hidden on mobile and shown on md+ screens */}
        <HeaderMenu />

        {/* Right zone: action icons + auth controls, responsive width (auto on mobile, 1/3 on md+) */}
        <div className="w-auto md:w-1/3 flex justify-end items-center gap-5">
          <Searchbar />
          <Carticon />
          <Favicon />
          <Ordericon />
          {/* ClerkLoaded delays rendering its children until the Clerk.js SDK has fully initialised on the client */}
          <ClerkLoaded>
            {/* SignedIn renders its children only when there is an active Clerk session */}
            <SignedIn>
              {/* UserButton is Clerk's built-in avatar dropdown for managing the signed-in account */}
              <UserButton />
            </SignedIn>
            {/* !user means no authenticated user exists, so show the Login button; once signed in, UserButton above takes over */}
            {!user && <Login />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
