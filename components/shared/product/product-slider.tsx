import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IProduct } from "@/lib/db/models/product.model";
import React from "react";
import ProductCard from "./product-card";

const ProductSlider = ({
  title,
  products,
  hideDetails,
}: {
  title: string;
  products: IProduct[];
  hideDetails: boolean;
}) => {
  return (
    <div className="w-full bg-background">
      <h2 className="h2-bold mb-5">{title}</h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.slug}
              className={
                !hideDetails
                  ? `md:basis-1/4 lg:basis-1/5`
                  : `md:basis-1/3 lg:basis-1/6`
              }
            >
              <ProductCard
                product={product}
                // hideAddToCart
                hideBorder
                hideDetails={hideDetails}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default ProductSlider;
