import React from "react";
import CartAddItem from "./cart-add-item";

const CartAddItemPage = async (props: { params: Promise<{ itemId: string }> }) => {
  const params = await props.params;
  const { itemId } = params;

  return <CartAddItem itemId={itemId} />;
};

export default CartAddItemPage;
