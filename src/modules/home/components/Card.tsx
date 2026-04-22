import React, { useState } from "react";
import Button from "../../../Shared/components/Button";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../../utils/wishlist";
import { addToCart } from "../../../utils/cart";
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
    variationName: string
}

const Card = ({
    id,
    name,
    price,
    oldPrice,
    description,
    thumbnailUrl,
    ratingAverage,
    stockQuantity,
    variationName
}: CardProps) => {
    const [liked, setLiked] = useState(false);
    const [addCart, setAddCart] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    const [loading, setLoading] = useState(false);


    const handleWishlist = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setLoading(true);
        try {
            await addToWishlist(id, stockQuantity);
            setLiked(!liked);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTocart = async (e: React.MouseEvent) => {
        e.stopPropagation();

        setLoading(true);

        try {
            await addToCart(id, variationName);
            setAddCart(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div
            onClick={handleClick}
            className="relative flex flex-col overflow-hidden transition-all duration-500 ease-out cursor-pointer group rounded-2xl hover:-translate-y-1 hover:shadow-2xl"
            style={{
                backgroundColor: "var(--surface)",
                boxShadow: "var(--card-shadow)",
            }}
        >
            {/* Image Container */}
            <div className="relative w-full overflow-hidden aspect-4/5 bg-slate-100">
                <img
                    src={thumbnailUrl || "/placeholder.png"}
                    alt={name}
                    className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
                />

                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/5 group-hover:opacity-100" />

                {/* Wishlist Icon */}
                <button
                    onClick={handleWishlist}
                    disabled={loading}
                    className="absolute z-10 p-2 transition-all duration-300 scale-90 translate-x-4 rounded-full shadow-lg opacity-0 bg-white/90 backdrop-blur-sm top-3 right-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 hover:bg-white"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors duration-300 ${liked
                            ? "text-rose-500 fill-rose-500"
                            : "text-slate-400 group-hover:text-slate-600"
                            }`}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col grow gap-2.5 p-5">
                <div className="flex flex-col gap-1">
                    <h2
                        className="text-base font-semibold leading-tight tracking-tight line-clamp-2"
                        style={{ color: "var(--text)" }}
                    >
                        {name}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < Math.floor(Number(ratingAverage))
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-slate-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                            {Number(ratingAverage).toFixed(1)}
                        </span>
                    </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-end justify-between pt-3 mt-auto">
                    <div className="flex flex-col">
                        <span
                            className="text-2xl font-bold tracking-tight"
                            style={{ color: "var(--text)" }}
                        >
                            ₹{price.toLocaleString()}
                        </span>
                        {oldPrice > price && (
                            <span className="text-xs line-through text-slate-400">
                                ₹{oldPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    <div
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${stockQuantity > 0
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                            }`}
                    >
                        {stockQuantity > 0 ? "In Stock" : "Sold Out"}
                    </div>
                </div>

                {/* Elegant Add to Cart Action */}
                <div className="mt-4 overflow-hidden rounded-xl">
                    <Button
                        btnTxt={!addCart ? "Quick Add" : "View in Cart"}
                        onClick={handleAddTocart}
                        className="w-full px-5 py-3 text-sm font-bold transition-all duration-300 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:brightness-110 active:scale-95"
                        style={{
                            backgroundColor: "var(--cta)",
                            color: "#fff",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Card;
