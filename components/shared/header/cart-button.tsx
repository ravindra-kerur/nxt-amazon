"use client";
import useCartSidebar from "@/hooks/use-cart-sidebar";
import useCartStore from "@/hooks/use-cart-store";
import useIsMounted from "@/hooks/use-is-mounted";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const CartButton = () => {
  const isMounted = useIsMounted();
  const {
    cart: { items },
  } = useCartStore();

  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0);
  const isCartSidebarOpen = useCartSidebar();

  return (
    <Link href="/cart" className="px-1 header-button">
      <div className="flex items-end text-xs relative">
        <ShoppingCartIcon className="w-8 h-8" />
        {isMounted && (
          <span className="bg-black px-1 rounded-full text-primary text-base font-bold absolute">
            {cartItemsCount}
          </span>
        )}
        <span className="font-bold">Cart</span>

        {isCartSidebarOpen && (
          <div
            className={`absolute top-5 z-10 w-0 h-0 border-l-[7px] border-r-[7px] border-b-8 border-transparent border-b-background`}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default CartButton;
