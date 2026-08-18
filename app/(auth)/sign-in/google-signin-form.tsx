"use client";

import { Button } from "@/components/ui/button";
import { SignInWithGoogle } from "@/lib/actions/user.actions";
import { useFormStatus } from "react-dom";

const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full"
      variant="outline"
    >
      {pending ? "Redirecting to Google..." : "Sign In With Google"}
    </Button>
  );
};

const GoogleSigninForm = () => {
  return (
    <form action={SignInWithGoogle}>
      <SignInButton />
    </form>
  );
};

export default GoogleSigninForm;
