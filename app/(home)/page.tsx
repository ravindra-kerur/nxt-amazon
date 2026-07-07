import HomeCard from "@/components/shared/home/home-card";
import HomeCarousel from "@/components/shared/home/home-carousel";
import ProductSlider from "@/components/shared/product/product-slider";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllCategories,
  getProductsByTag,
  getProductsforCard,
} from "@/lib/actions/product.actions";
import data from "@/lib/data";
import { toSlug } from "@/lib/utils";

export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4);
  const newArrival = await getProductsforCard({ tag: "new-arrival", limit: 4 });
  const featureds = await getProductsforCard({ tag: "featured", limit: 4 });
  const bestSellers = await getProductsforCard({
    tag: "best-seller",
    limit: 4,
  });

  const cards = [
    {
      title: "Categories to explore",
      link: {
        text: "See More",
        href: "/search",
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: "Explore New Arrivals",
      link: {
        text: "View All",
        href: "/search?tag=new-arrival",
      },
      items: newArrival,
    },
    {
      title: "Discover best sellers",
      link: {
        text: "View All",
        href: "/search?tag=new-arrival",
      },
      items: bestSellers,
    },
    {
      title: "Featured Products",
      link: {
        text: "Shop Now",
        href: "/search?tag=new-arrival",
      },
      items: featureds,
    },
  ];

  const carouselItems = data.carousels;

  const todaysDeals = await getProductsByTag({ tag: "todays-deal", limit: 10 });

  const bestSellingProducts = await getProductsByTag({
    tag: "best-seller",
    limit: 10,
  });

  return (
    <>
      <HomeCarousel items={carouselItems} />

      <div className="md:p-4 md:space-y-4 bg-border">
        <HomeCard cards={cards} />
      </div>

      <div className="md:p-4 md:space-y-4 bg-border md:pt-0">
        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider
              title="Today's Deals"
              products={todaysDeals}
              hideDetails={false}
            />
          </CardContent>
        </Card>

        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider
              title="Best Selling Products"
              products={bestSellingProducts}
              hideDetails={true}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// https://downgit.github.io/#/home
// https://www.youtube.com/watch?v=WLHCPwqHzzQ&t=9951s

// mongodb+srv://nextjs-amazon:<db_password>@cluster0.qmtrpls.mongodb.net/?appName=Cluster0
//  9EvlbALVTBzRZ3L5
