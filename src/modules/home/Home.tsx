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
        <main className="max-w-7xl mx-auto px-6 py-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        {query ? `Search results for "${query}"` : "Discover our collection"}
                    </h1>
                    <p className="text-slate-500 text-sm max-w-lg">
                        Explore the latest arrivals and curated electronics, fashion, and lifestyle essentials.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                    <span className="text-slate-900">{filteredCards.length}</span>
                    <span>Products found</span>
                </div>
            </div>
    
            {loading ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="animate-pulse flex flex-col gap-4">
                            <div className="aspect-[4/5] bg-slate-100 rounded-3xl" />
                            <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                            <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Empty State */}
                    {filteredCards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">No products found</h2>
                            <p className="text-slate-500 text-sm max-w-xs">
                                We couldn't find anything matching your search. Try different keywords or browse our categories.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                            {filteredCards.map((item) => (
                                <Card
                                    key={item.id}
                                    {...item}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default Home;