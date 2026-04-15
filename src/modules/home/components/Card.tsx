import { useState } from "react";
import Button from "../../../Shared/components/Button";
import { Heart, Star } from "lucide-react";

export interface CardProps {
    id?: number;
    name: string;
    slug?: string;
    category: string;
    brand: string;
    price: number;
    oldPrice: number;
    isCallForPricing?: boolean;
    thumbnailUrl?: string;
    reviewsCount?: number;
    ratingAverage: number;
    stockQuantity: number;
    description?: string;

}

const Card = ({
    name,
    price,
    oldPrice,
    description,
    thumbnailUrl,
    ratingAverage,
    stockQuantity
}: CardProps) => {
    const [liked, setLiked] = useState(false);

    return (
        <div
            className="relative flex flex-col overflow-hidden transition-shadow duration-300 rounded-lg cursor-pointer group hover:shadow-md"
            style={{
                backgroundColor: "var(--background)",
                // border: "2px solid var(--border)",
            }}
        >
            {/* Image */}
            <div className="w-full overflow-hidden aspect-square">
                <img
                    src={thumbnailUrl || "/placeholder.png"}
                    alt={name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Wishlist Icon */}
            <button
                onClick={() => setLiked(!liked)}
                className="absolute z-10 p-1 bg-white rounded-full shadow top-3 right-3"
            >
                <Heart
                    className={`w-5 h-5 transition ${liked ? "text-red-500 fill-red-500" : "text-gray-400"
                        }`}
                />
            </button>

            {/* Content */}
            <div className="flex flex-col gap-2 p-4">
                <h2
                    className="text-sm font-medium line-clamp-2"
                    style={{ color: "var(--text)" }}
                >
                    {name}
                </h2>

                {/* <p className="text-xs" style={{ color: "var(--rating)" }}>
                    {Math.round(ratingAverage)}/5
                </p> */}


                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(ratingAverage)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"}`}

                    />
                    ))}

                </div>

                <p
                    className="text-xs line-clamp-2"
                    style={{ color: "var(--text)" }}
                >
                    {description}
                </p>

                <p className="text-xl font-bold" style={{ color: "var(--text)" }}>
                    ₹{price}
                    <span className="ml-2 text-sm text-gray-400 line-through">
                        ₹{oldPrice}
                    </span>
                </p>

                <p
                    className="text-xs font-medium"
                    style={{ color: "var(--success)" }}
                >
                    {stockQuantity > 0 ? (
                        "In Stock"
                    ) : (
                        <span style={{ color: "var(--error)" }}>
                            Out of Stock
                        </span>
                    )}
                </p>

                {/* Add to Cart (hover only) */}
                <div className="hidden transition-all duration-300 group-hover:block">
                    <Button
                        btnTxt="Add to Cart"
                        className="w-full px-4 py-2 mt-2 text-sm font-semibold border-none rounded-full cursor-pointer"
                        style={{
                            backgroundColor: "var(--cta)",
                            color: "var(--text)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Card;
