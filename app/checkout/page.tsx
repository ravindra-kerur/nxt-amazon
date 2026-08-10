import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page",
};

const CheckoutPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/checkout");
  }

  return <div>Checkout form</div>;
};

export default CheckoutPage;