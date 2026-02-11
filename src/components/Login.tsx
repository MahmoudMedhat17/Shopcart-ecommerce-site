import { SignInButton } from "@clerk/nextjs";


const Login = () => {
    return (
        // Here When user clicks on the Login component then show the Clerk as a Modal and not redirect the user to a new page with Clerk Sign in page.
        <SignInButton mode="modal">
            <button className="text-sm font-semibold text-lightColor hover:text-darkColor hover:cursor-pointer hoverEffect">
                Login
            </button>
        </SignInButton>
    )
}

export default Login;