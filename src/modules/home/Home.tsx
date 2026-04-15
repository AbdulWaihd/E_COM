import { useEffect, useState } from "react";
import Card from "./components/Card";
import type { CardProps } from "./components/Card";

import { useSearchParams } from "react-router-dom";
import api from "../../api/api";

const Home = () => {
    const [cards, setCards] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(true);

    //  Get query from URL
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    //  Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/search");
                setCards(res.data?.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //  Escape regex special characters
    const escapeRegex = (text: string) =>
        text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    //  Safe regex creation
    const safeQuery = escapeRegex(query);

    //  Advanced matching (supports multi-word flexible search)
    const regex = new RegExp(safeQuery.split(" ").join(".*"), "i");

    //  Filter logic
    const filteredCards = query
        ? cards.filter((item) => regex.test(item.name))
        : cards;

    return (
        <div className="p-6">
    
            {loading ? (
                <p className="text-sm text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    {/* No results */}
                    {filteredCards.length === 0 ? (
                        <p
                            className="col-span-4 text-sm text-center"
                            style={{ color: "var(--text)" }}
                        >
                            No products found.
                        </p>
                    ) : (
                        filteredCards.map((item) => (
                            <Card
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                category={item.category}
                                brand={item.brand}
                                oldPrice={item.oldPrice}
                                price={item.price}
                                ratingAverage={item.ratingAverage}
                                stockQuantity={item.stockQuantity}
                                description={item.description}
                                thumbnailUrl={item.thumbnailUrl}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;