import Container from "@/components/Container";
import Logo from "@/components/Logo";
import HeaderMenu from "@/components/HeaderMenu";
import Searchbar from "@/components/Searchbar";
import Carticon from "@/components/Carticon";
import Favicon from "@/components/Favicon";
import Login from "@/components/Login";
import Mobilemenu from "@/components/Mobilemenu";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'
import { User } from "lucide-react";


const Header = async () => {

    const user = await currentUser();

    return (
        <header className="bg-white py-5 border-b-2">
            <Container className="flex justify-between items-center">
                <div className="w-auto md:w-1/3 flex justify-start items-center gap-2.5 md:gap-0">
                    <Mobilemenu />
                    <Logo />
                </div>
                <HeaderMenu />
                <div className="w-auto md:w-1/3 flex justify-end items-center gap-5">
                    <Searchbar />
                    <Carticon />
                    <Favicon />
                    {/* Here ClerkLoaded means that load the Login btn when clerk is loaded behind the scences */}
                    <ClerkLoaded>
                        {/* If user SignedIn then show a UserButton coming from Clerk.*/}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        {/* Here if There's no active User then show the Login Component. If there's an activer User then show the UserButton. */}
                        {!user && <Login />}
                    </ClerkLoaded>
                </div>
            </Container>
        </header>
    )
}

export default Header;