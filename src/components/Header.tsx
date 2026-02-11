import Container from "@/src/components/Container";
import Logo from "@/src/components/Logo";
import HeaderMenu from "@/src/components/HeaderMenu";
import Searchbar from "@/src/components/Searchbar";
import Carticon from "@/src/components/Carticon";
import Favicon from "@/src/components/Favicon";
import Login from "@/src/components/Login";
import Mobilemenu from "@/src/components/Mobilemenu";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'


const Header = async () => {

    const user = await currentUser();

    return (
        <header className="py-5">
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