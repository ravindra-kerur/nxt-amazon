"use client";

import { useSession } from "next-auth/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
};

const CheckoutPage = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/checkout");
  }
  return <div>Checkout form</div>;
};

export default CheckoutPage;
