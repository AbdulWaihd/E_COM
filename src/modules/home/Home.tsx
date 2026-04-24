import { useEffect, useState } from "react";
import Card from "./components/Card";
import type { CardProps } from "./components/Card";

import { useSearchParams } from "react-router-dom";
import api from "../../api/api";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        <main className="px-6 py-10 mx-auto max-w-7xl">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-6 mb-12 md:flex-row md:items-end">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        {query ? `Search results for "${query}"` : "Discover our collection"}
                    </h1>
                    <p className="max-w-lg text-sm text-slate-500">
                        Explore the latest arrivals and curated electronics, fashion, and lifestyle essentials.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                    <span className="text-slate-900">{filteredCards.length}</span>
                    <span>Products found</span>
                </div>
            </div>

            {loading || filteredCards.length === 0? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <Skeleton height={250} borderRadius={24} />
                            <Skeleton height={16} width="75%" borderRadius={8} />
                            <Skeleton height={16} width="50%" borderRadius={8} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 ">
                    {filteredCards.map((item) => (
                        <Card key={item.id} {...item} />
                    ))}
                </div>
            )}

        </main>
    );
}

export default Home;