import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Button from '../../Shared/components/Button';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

interface WishlistItem {
    id:number;
    productId: number;
    quantity: number;
    productName: string;
    productImage: string;
    // Fallback for types
    name?: string;
    image?: string;
}

const Wishlist = () => {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await api.get('/api/wishList/PrivateList');
                setItems(response.data?.items?.data || []);
            } catch (error) {
                console.error('Failed to fetch wishlist', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemove = async (id: number) => {
        try {
            await api.delete(`/api/wishList/RemoveItem?id=${id}`);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };

    return (
        <main className="px-6 py-10 mx-auto max-w-7xl">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-6 mb-12 md:flex-row md:items-end">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: 'var(--text)' }}>
                        My Wishlist
                    </h1>
                    <p className="max-w-lg text-sm" style={{ color: 'var(--text-muted)' }}>
                        Items you've saved for later. Add them to your cart whenever you're ready.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                    <Heart size={16} className="text-rose-500 fill-rose-500" />
                    <span style={{ color: 'var(--text)' }}>{items.length}</span>
                    <span>{items.length === 1 ? 'Item saved' : 'Items saved'}</span>
                </div>
            </div>

            {loading ? (
                /* Loading Skeleton */
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-4 animate-pulse">
                            <div className="aspect-[4/5] bg-slate-100 rounded-3xl" />
                            <div className="w-3/4 h-4 rounded-lg bg-slate-100" />
                            <div className="w-1/2 h-4 rounded-lg bg-slate-100" />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Empty State */}
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-slate-50">
                                <Heart size={32} className="text-slate-300" />
                            </div>
                            <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--text)' }}>
                                Your wishlist is empty
                            </h2>
                            <p className="max-w-xs mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
                                Start adding items you love by clicking the heart icon on any product.
                            </p>
                            <Button
                                btnTxt="Browse Products"
                                onClick={() => navigate('/')}
                                className="px-8 py-3 font-bold shadow-lg !rounded-2xl"
                                style={{
                                    backgroundColor: 'var(--btn-primary)',
                                    color: 'var(--btn-primary-text)',
                                }}
                            />
                        </div>
                    ) : (
                        /* Wishlist Grid */
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                            {items.map(item => (
                                <div
                                    key={item.productId}
                                    onClick={() => navigate(`/product/${item.productId}`)}
                                    className="relative flex flex-col overflow-hidden transition-all duration-500 ease-out cursor-pointer group rounded-2xl hover:-translate-y-1 hover:shadow-2xl"
                                    style={{
                                        backgroundColor: 'var(--surface)',
                                        boxShadow: 'var(--card-shadow)',
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative w-full overflow-hidden aspect-[4/5] bg-slate-100">
                                        <img
                                            src={item.productImage || item.image || '/placeholder.png'}
                                            alt={item.productName || item.name}
                                            className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/5 group-hover:opacity-100" />

                                        {/* Remove Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemove(item.id);
                                            }}
                                            className="absolute z-10 p-2 transition-all duration-300 scale-90 translate-x-4 rounded-full shadow-lg opacity-0 bg-white/90 backdrop-blur-sm top-3 right-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 hover:bg-rose-50"
                                        >
                                            <Trash2 className="w-5 h-5 transition-colors text-slate-400 hover:text-rose-500" />
                                        </button>

                                        {/* Liked Heart Badge */}
                                        <div className="absolute top-3 left-3 p-1.5 rounded-full bg-rose-500/10 backdrop-blur-sm">
                                            <Heart size={14} className="text-rose-500 fill-rose-500" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow gap-2.5 p-5">
                                        <h2
                                            className="text-base font-semibold leading-tight tracking-tight line-clamp-2"
                                            style={{ color: 'var(--text)' }}
                                        >
                                            {item.productName || item.name}
                                        </h2>

                                        {/* Add to Cart */}
                                        <div className="mt-4 overflow-hidden rounded-xl">
                                            <Button
                                                className="flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-bold transition-all duration-300 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:brightness-110 active:scale-95"
                                                style={{
                                                    backgroundColor: 'var(--cta)',
                                                    color: '#fff',
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                            
                                                }}
                                            >
                                                <ShoppingCart size={16} />
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default Wishlist;