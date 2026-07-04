import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="flex justify-end">
      <div className="flex w-full gap-3">
        <Link href="/signin" className="flex items-center header-button">
          {/* <UserIcon className="w-8 h-8" /> */}
          {/* <span className="font-bold">Sign In</span> */}
          Hello, Sign in
        </Link>

        <Link href="/cart" className="header-button">
          {/* <ShoppingCartIcon className="w-8 h-8" />
          <span className="font-bold">Cart</span> */}
          <div className="flex items-end">
            <ShoppingCartIcon className="w-8 h-8" />
            Cart
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
