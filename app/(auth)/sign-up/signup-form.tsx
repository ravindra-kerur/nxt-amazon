"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  registerUser,
  SignInWithCredentials,
} from "@/lib/actions/user.actions";
import { UserSignUpSchema } from "@/lib/validator";
import { IUserSignUp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const signUpDefaultValues =
  process.env.NODE_ENV === "development"
    ? {
        name: "John Deo",
        email: "johndeo@example.com",
        password: "123456",
        confirmPassword: "123456",
      }
    : {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

const CredentialsSignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: IUserSignUp) => {
    try {
      const res = await registerUser(data);
      if (!res.success) {
        toast("Sign-up Error", {
          description: "An error occurred while signing up. API Error",
        });
        return;
      }
      await SignInWithCredentials({
        email: data.email,
        password: data.password,
      });
      redirect(callbackUrl);
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      toast("Sign-up Error", {
        description: "An error occurred while signing up.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input type="hidden" name="callbackUrl" value={callbackUrl} /> */}
      <div className="space-y-6">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Enter name"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

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
          <Button type="submit">Sign Up</Button>
        </div>

        <div className="text-sm">
          By signing up, you agree to ----- &apos;s{" "}
          <Link href="/page/conditions-of-use">Conditions of Use</Link> and{" "}
          <Link href="/page/privacy-policy">Privacy Notice.</Link>
        </div>

        <Separator className="mb-4" />

        <div className="text-sm">
          Already have a account?
          <Link className="link" href={`/sign-in?callbackUrl=${callbackUrl}`}>
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignUpForm;
