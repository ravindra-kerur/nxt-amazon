"use client";

import { IUserSignIn } from "@/types";
import { redirect, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignInSchema } from "@/lib/validator";
import { SignInWithCredentials } from "@/lib/actions/user.actions";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { toast } from "sonner";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const signInDefaultValues =
  process.env.NODE_ENV === "development"
    ? {
        email: "admin@example.com",
        password: "123456",
      }
    : {
        email: "",
        password: "",
      };

const CredentialsSigninForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: IUserSignIn) => {
    try {
      await SignInWithCredentials({
        email: data.email,
        password: data.password,
      });
      redirect(callbackUrl);
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      // toast({
      //   title: "Sign-in Error",
      //   description: "An error occurred while signing in.",
      //   variant: "destructive",
      // });
      toast("Sign-in Error", {
        description: "An error occurred while signing in.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Enter email address"
                aria-invalid={fieldState.invalid}
              />

              <FieldDescription>Enter your registered email.</FieldDescription>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div>
          <Button type="submit">Sign In</Button>
        </div>

        <div className="text-sm">
          By signing in, you agree to ----- &apos;s{" "}
          <Link href="/page/conditions-of-use">Conditions of Use</Link> and{" "}
          <Link href="/page/privacy-policy">Privacy Notice.</Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSigninForm;
