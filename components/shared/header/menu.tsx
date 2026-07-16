import Link from "next/link";
import CartButton from "./cart-button";

const Menu = () => {
  return (
    <div className="flex justify-end">
      <div className="flex w-full gap-3">
        <Link href="/signin" className="flex items-center header-button">
          Hello, Sign in
        </Link>

        {/* <Link href="/cart" className="header-button">
          <div className="flex items-end">
            <ShoppingCartIcon className="w-8 h-8" />
            Cart
          </div>
        </Link> */}
        <CartButton />
      </div>
    </div>
  );
};

export default Menu;
