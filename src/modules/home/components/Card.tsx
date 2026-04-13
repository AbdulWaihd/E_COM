
import Button from "../../../Shared/components/Button";
export interface CardProps {
    id: number;
    title: string;
    category: string;
    brand: string;
    original_price: number;
    discounted_price: number;
    rating: number;
    stock: number;
    description?: string;
    image?: string;
}

const Card = ({
    title,
    original_price,
    discounted_price,
    description,
    image,
    rating,
    stock
}: CardProps) => {
    return (
        <div
            className="flex flex-col rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: "var(--background)", border: "2px solid var(--border)" }}
        >
            <img
                src={image || "/placeholder.png"}
                alt={title}
                className="w-full h-48 object-contain p-4"
                style={{ backgroundColor: "var(--inside)" }}
            />

            <div className="flex flex-col gap-2 p-4">
                <h2 className="text-sm font-medium line-clamp-2" style={{ color: "var(--text)" }}>
                    {title}
                </h2>

                <p className="text-xs" style={{ color: "var(--rating)" }}>
                    {rating}/5
                </p>

                <p className="text-xs line-clamp-2" style={{ color: "var(--text)" }}>
                    {description}
                </p>

                <p className="text-xl font-bold" style={{ color: "var(--text)" }}>
                    ₹{discounted_price}
                    <span className="text-sm line-through ml-2 text-gray-400">
                        ₹{original_price}
                    </span>
                </p>

                <p className="text-xs font-medium" style={{ color: "var(--success)" }}>
                    {stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                {/* <button
                    className="w-full mt-2 py-2 px-4 rounded-full text-sm font-semibold cursor-pointer border-none"
                    style={{ backgroundColor: "var(--cta)", color: "var(--text)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--cta-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--cta)")}
                >
                    Add to Cart
                </button> */}

                <Button
                    btnTxt="Add to Cart"
                    className="w-full mt-2 py-2 px-4 rounded-full text-sm font-semibold cursor-pointer border-none bg-[var(--cta)] text-[var(--text)] hover:bg-[var(--cta-hover)]"
                />


            </div>
        </div>
    );
};

export default Card;