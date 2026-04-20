import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchBarInput } from "./../input-forms/SearchBarInput";
import { Search } from "lucide-react";

interface Product {
    id: string;
    title: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    //  Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    //  API call
    // useEffect(() => {
    //     if (!debouncedQuery.trim()) {
    //         setResults([]);
    //         return;
    //     }

    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);

    //             const res = await api.get(
    //                 `/api/catalog/ProductsApi/quick-search?q=${debouncedQuery}`
    //             );

    //             setResults(res.data);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [debouncedQuery]);


    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);

                //  fetch full data
                const res = await axios.get("/product.data.json");


                const filtered = res.data.products.filter((item: Product) =>
                    item.title.toLowerCase().startsWith(debouncedQuery.toLowerCase())
                );
                setResults(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [debouncedQuery]);

    return (
        <div className="relative w-full max-w-full px-2 mx-auto sm:px-4 md:px-0 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">

            {/* Input */}
            <SearchBarInput
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        navigate(`/?q=${encodeURIComponent(query)}`);
                    }
                }}
            />


            {/* Loading */}
            {loading && (
                <div className="absolute left-0 p-2 mt-1 text-sm bg-gray-300 ">
                    Searching...
                </div>
            )}

            {/*Results */}
            {results.length > 0 && (
                <div className="absolute left-0 z-50 w-full mt-1 overflow-y-auto rounded-md shadow-md top-full max-h-64"
                    style={{ backgroundColor: "var(--header-search-bg)", border: "2px solid var(--border)" }}
                >
                    {results.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
