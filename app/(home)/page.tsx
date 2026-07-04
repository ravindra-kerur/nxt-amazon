import HomeCarousel from "@/components/shared/home/home-carousel";
import data from "@/lib/data";

export default function Page() {
  const carouselItems = data.carousels;
  return <HomeCarousel items={carouselItems} />;
}

// https://downgit.github.io/#/home
// https://www.youtube.com/watch?v=WLHCPwqHzzQ&t=9951s
