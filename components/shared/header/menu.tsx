import CartButton from "./cart-button";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end">
      <div className="flex w-full gap-3">
        <UserButton />

        <CartButton />
      </div>
    </div>
  );
};

export default Menu;
