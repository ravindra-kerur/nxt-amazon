"use client";

import { usePathname } from "next/navigation";
import useCartStore from "./use-cart-store";
import useDeviceType from "./use-device-type";

const isNotInPaths = (s: string) => {
  return !/^\/(cart|checkout|sign-in|orders|account|admin)(\/|$)/.test(s);
  //   const pathsPattern = `^(?:${localePattern})?(?:/$|/cart$|/checkout$|/sign-in$|/sign-up$|/order(?:/.*)?$|/account(?:/.*)?$|/admin(?:/.*)?$)?$`
};

const useCartSidebar = () => {
  const {
    cart: { items },
  } = useCartStore();

  const deviceType = useDeviceType();
  const pathname = usePathname();

  return items.length > 0 && deviceType === "desktop" && isNotInPaths(pathname);
};

export default useCartSidebar;
