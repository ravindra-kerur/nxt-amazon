import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CredentialsSignUpForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to create a new account",
};

const SignUp = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const searchParams = await props.searchParams;
  console.log("searchParams Ravi ", searchParams);
  const { callbackUrl = "/" } = searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl);
  }
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <CredentialsSignUpForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
