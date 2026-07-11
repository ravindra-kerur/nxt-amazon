"use client";
import useBrowseingHistory from "@/hooks/use-browsing-history";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import ProductSlider from "./product/product-slider";

const BrowsingHistoryList = ({ className }: { className?: string }) => {
  const { products } = useBrowseingHistory();

  return (
    products.length !== 0 && (
      <div className="bg-background">
        <Separator className={cn(`mb-4`, className)} />
        <ProductList
          title="Related to items that you're viewed"
          type="related"
        />

        <Separator className="mb-4" />
        <ProductList title="Your browsing History" type="history" hidedetails />
      </div>
    )
  );
};

const ProductList = ({
  title,
  type = "history",
  hidedetails = false,
}: {
  title: string;
  type: "history" | "related";
  hidedetails?: boolean;
}) => {
  const { products } = useBrowseingHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&categories=${products.map((product) => product.category).join(",")}&ids=${products.map((product) => product.id).join(",")}`,
      );
      const data = await res.json();
      setData(data);
    };
    fetchProducts();
  }, [products, type]);

  return (
    data.length > 0 && (
      <ProductSlider title={title} products={data} hideDetails={hidedetails} />
    )
  );
};

export default BrowsingHistoryList;
