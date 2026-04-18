import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Logo from "@/src/components/Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface NoAccessprops {
  details?: string;
}

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: NoAccessprops) => {
  return (
    <Card className="max-w-sm block mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <Logo className="text-2xl" />
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription className="text-center w-80">
          {details}
        </CardDescription>
      </CardHeader>
      <CardFooter className="space-y-4 pt-4 flex flex-col items-center">
        <SignInButton mode="modal">
          <button className="bg-shop-dark-green/80 hover:bg-shop-dark-green hoverEffect w-full text-white rounded-md py-1">
            Sign in
          </button>
        </SignInButton>
        <p className="text-sm text-shopLightText">
          Don&apos;t have an account?
        </p>
        <SignUpButton mode="modal">
          <button className="w-full hover:bg-shop-light-bg hoverEffect rounded-md py-1 border">
            Create an account
          </button>
        </SignUpButton>
      </CardFooter>
    </Card>
  );
};

export default NoAccess;
