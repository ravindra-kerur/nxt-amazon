import { Button } from "@/components/ui/button";
import { colorClasses } from "@/lib/constants";
import { IProduct } from "@/lib/db/models/product.model";
import Link from "next/link";

const SelectVariant = ({
  product,
  size,
  color,
}: {
  product: IProduct;
  size: string;
  color: string;
}) => {
  const selectedColor = color || product.colors[0];
  const selectedSize = size || product.sizes[0];

  return (
    <>
      {product.colors.length > 0 && (
        <div className="space-x-2 space-y-2">
          <div>Color:</div>
          {product.colors.map((x: string) => (
            <Button
              key={x}
              //   asChild
              variant="outline"
              className={
                selectedColor === x ? "border-2 border-primary" : "border-2"
              }
            >
              <Link
                href={`?${new URLSearchParams({ color: x, size: selectedSize })}`}
                replace
                scroll={false}
              >
                {/* href={`?${new URLSearchParams({ color: x, size: selectedSize })}`}
                This line creates a Next.js link that updates the 
                URL's query parameters without navigating 
                to a different page. */}
                <span className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${colorClasses[x as keyof typeof colorClasses]}`}
                  />
                  {x}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="space-x-2 space-y-2">
          <div>Size:</div>
          {product.sizes.map((x: string) => (
            <Button
              key={x}
              variant="outline"
              className={
                selectedSize === x ? "border-2 border-primary" : "border-2"
              }
            >
              <Link
                replace
                scroll={false}
                href={`?${new URLSearchParams({
                  color: selectedColor,
                  size: x,
                })}`}
              >
                {x}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectVariant;
