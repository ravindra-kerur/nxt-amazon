import { IProduct } from "@/lib/db/models/product.model";
import Link from "next/link";
import React from "react";
import ImageHover from "./image-hover";
import Image from "next/image";
import Rating from "./rating";
import { formatNumber } from "@/lib/utils";
import ProductPrice from "./product-price";
import { Card, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  product: IProduct;
  hideBorder: boolean;
  hideDetails: boolean;
}

const ProductImage = ({ product }: { product: IProduct }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="relative h-52">
        {product.images.length > 1 ? (
          <ImageHover
            src={product.images[0]}
            hoverSrc={product.images[1]}
            alt={product.name}
          />
        ) : (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="80vw"
            className="object-contain"
          />
        )}
      </div>
    </Link>
  );
};

const ProductDetails = ({ product }: { product: IProduct }) => {
  return (
    <div className="flex-1 space-y-2">
      <p className="font-bold">{product.brand}</p>
      <Link
        href={`/products/${product.slug}`}
        className="overflow-hidden text-ellipsis"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {product.name}
      </Link>

      <div className="flex gap-2 justify-center">
        <Rating rating={product.avgRating} />
        <span>{formatNumber(product.numReviews)}</span>
      </div>

      <ProductPrice
        price={product.price}
        listPrice={product.listPrice}
        isDeal={product.tags.includes("todays-deal")}
        forListing
      />
    </div>
  );
};

const ProductCard = ({
  product,
  hideBorder,
  hideDetails,
}: ProductCardProps) => {
  return hideBorder ? (
    <div className="flex flex-col">
      <ProductImage product={product} />
      {!hideDetails && (
        <>
          <div className="p-3 flex-1 text-center">
            <ProductDetails product={product} />
          </div>
        </>
      )}
    </div>
  ) : (
    <Card className="flex flex-col">
      <CardHeader className="p-3">
        <ProductImage product={product} />
      </CardHeader>
      {!hideDetails && (
        <>
          <div className="p-3 flex-1 text-center">
            <ProductDetails product={product} />
          </div>
        </>
      )}
    </Card>
  );
};

export default ProductCard;
