
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import api from "../../api/api"
import { Star, ChevronUp, ChevronDown } from "lucide-react"
import Button from "../../Shared/components/Button"
import { stripHtml } from "../../utils/StripeHtml";

interface Product {
    id: string;
    name: string;
    calculatedProductPrice?: {
        price: number;
        oldPrice: number;
    };
    thumbnailUrl?: string;
    ratingAverage: number;
    stockQuantity: number;
    description?: string;
    reviewsCount: number;
    images?: {
        url: string;
        thumbnailUrl: string;
    }[];
}

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [Loading, setLoading] = useState(false);
    // const [liked,setLiked]= useState(false)
    const [showFullDesc, setShowFullDesc] = useState(false);
    const cleanDescription = stripHtml(product?.description);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.get(
                    `/api/catalog/ProductsApi/detail/${id}`
                );
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        Loading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
        ) : (
            <div className="px-6 py-12 mx-auto max-w-7xl">
                <div className="grid items-start grid-cols-1 gap-16 lg:grid-cols-2">

                    {/* Left: Image Gallery */}
                    <div className="flex flex-col gap-6">
                        {/* Main Image View */}
                        <div className="relative overflow-hidden border aspect-square bg-slate-50 border-slate-100 group ">
                            <img
                                src={product?.images?.[0]?.url || "/placeholder.png"}
                                alt={product?.name}
                                className="object-contain w-full h-full transition-all duration-700 rounded-lg group-hover:scale-105"
                            />

                            {/* Zoom/Expand Icon placeholder */}
                            <div className="absolute p-3 transition-opacity rounded-full shadow-sm opacity-0 bottom-6 right-6 bg-white/80 backdrop-blur group-hover:opacity-100">
                                <Star size={20} className="text-slate-600" />
                            </div>
                        </div>

                        {/* Thumbnail Selector */}
                        {product?.images && product.images.length > 1 && (
                            <div className="flex gap-4 pb-2 overflow-x-auto scrollbar-hide">
                                {product.images.map((img, index) => (
                                    <Button
                                        key={index}
                                        className="relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 border-transparent hover:border-indigo-400 focus:border-indigo-500 !p-0"
                                    >
                                        <img
                                            src={img.thumbnailUrl || "/placeholder.png"}
                                            alt={`${product?.name} view ${index + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col gap-8 lg:sticky lg:top-32">
                        <div className="flex flex-col gap-4">
                            {/* Breadcrumbs / Category Placeholder */}
                            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-indigo-600 uppercase">
                                <span>Premium Collection</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>Shop All</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                {product?.name}
                            </h1>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                                    <div className="flex items-center">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product?.ratingAverage || 0)
                                                    ? "text-amber-500 fill-amber-500"
                                                    : "text-slate-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-amber-700">{Number(product?.ratingAverage).toFixed(1)}</span>
                                </div>
                                <span className="text-sm font-medium transition-colors border-b border-transparent cursor-pointer text-slate-500 hover:border-slate-300">
                                    {product?.reviewsCount || 0} customer reviews
                                </span>
                            </div>
                        </div>

                        {/* Pricing and Stock */}
                        <div className="flex items-center justify-between p-6 border bg-slate-50 rounded-3xl border-slate-100">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-500">Total Price</span>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-4xl font-black leading-none text-slate-900">
                                        ₹{product?.calculatedProductPrice?.price.toLocaleString()}
                                    </span>
                                    {product?.calculatedProductPrice?.oldPrice && (
                                        <span className="text-lg font-medium line-through text-slate-400">
                                            ₹{product.calculatedProductPrice.oldPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest ${(product?.stockQuantity || 0) > 0
                                    ? "bg-emerald-100/50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-100/50 text-rose-700 border border-rose-200"
                                }`}>
                                {(product?.stockQuantity || 0) > 0 ? "In Stock & Ready" : "Out of Stock"}
                            </div>
                        </div>
                        {/* Description */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-slate-900">Description</h3>
                            <div className="relative">
                                <p className={`text-base leading-relaxed text-slate-600 ${!showFullDesc ? "line-clamp-4" : ""}`}>
                                    {cleanDescription}
                                </p>
                                {product?.description && product.description.length > 200 && (
                                    <Button
                                        onClick={() => setShowFullDesc(!showFullDesc)}
                                        className="mt-3 flex items-center gap-2 text-sm font-bold !p-0 !rounded-none" style={{ color: 'var(--btn-link)', background: 'transparent' }}
                                    >
                                        <span>{showFullDesc ? "Show Less" : "Read More"}</span>
                                        {showFullDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 pt-4 border-t sm:flex-row border-slate-100">
                            <Button className="flex-1 px-8 py-5 font-bold !rounded-2xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all" style={{ backgroundColor: 'var(--btn-primary)', color: 'var(--btn-primary-text)', boxShadow: '0 10px 15px -3px var(--btn-primary-shadow)' }}>
                                Add to Cart
                            </Button>
                            <Button className="flex-1 px-8 py-5 font-bold !rounded-2xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all" style={{ backgroundColor: 'var(--btn-secondary)', color: 'var(--btn-secondary-text)', boxShadow: '0 10px 15px -3px var(--btn-secondary-shadow)' }}>
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductDetails;