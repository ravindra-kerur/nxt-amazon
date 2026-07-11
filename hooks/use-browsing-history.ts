import { create } from "zustand";
import { persist } from "zustand/middleware";

type BrowsingHistory = {
  products: { id: string; category: string }[];
};

const initialState: BrowsingHistory = {
  products: [],
};

export const browsingHistoryStore = create<BrowsingHistory>() (
  persist(() => initialState, { name: "browsingHistoryStore" }),
);

// Custom Hook
export default function useBrowseingHistory() {
  const { products } = browsingHistoryStore();
  return {
    products,
    addItems: (product: { id: string; category: string }) => {
      const index = products.findIndex((p) => p.id === product.id);

      if (index !== -1) products.splice(index, 1); //Remove duplicates if exists
      products.unshift(product); // Add id to the start

      // Remove excess items if length exceeds 10
      if (products.length > 10) products.pop();

      browsingHistoryStore.setState({ products });
    },

    clear: () => {
      browsingHistoryStore.setState({ products: [] });
    },
  };
}
