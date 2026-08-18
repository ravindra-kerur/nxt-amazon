import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import CredentialsSigninForm from "./credentials-signin-form";
import SeparatorWithOr from "@/components/shared/separator-or";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import GoogleSigninForm from "./google-signin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const SignIn = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const searchParams = await props.searchParams;
  const { callbackUrl = "/" } = searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl);
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <CredentialsSigninForm />
          </div>
          <SeparatorWithOr>OR</SeparatorWithOr>
          <div className="mt-4">
            <GoogleSigninForm />
          </div>
        </CardContent>
      </Card>

      <SeparatorWithOr>New to {APP_NAME}?</SeparatorWithOr>

      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button variant="outline" className="w-full">
          Create your {APP_NAME} account
        </Button>
      </Link>
    </div>
  );
};

export default SignIn;
