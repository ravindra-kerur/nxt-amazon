import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
};

export default function Rating({ rating }: RatingProps) {
  return (
    <div
      className="flex items-center"
      aria-label={`Rating: ${rating} out of 5 star`}
    >
      {[...Array(5)].map((_, i) => {
        const fill = Math.max(0, Math.min(100, (rating - i) * 100));

        return (
          <div key={i} className="relative h-5 w-5">
            <Star className="absolute h-5 w-5 text-gray-300" />

            <div
              className="absolute overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
