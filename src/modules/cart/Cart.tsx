import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ArrowLeft, X } from "lucide-react";

// import CalculatedAmount from "../cart/CalculatedAmount";
import updateCart from "../../utils/UpdateCart";

interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    productName: string;
    productImage: string;
    name?: string;
    image?: string;
    calculatedProductPrice?: {
        price: number;
        totalString: string;
    };
}

interface CartSummary {
    items: CartItem[];
    subTotal: number;
    subTotalString: string;
    discount: number;
    discountString: string;
    subTotalWithDiscount: number;
    subTotalWithDiscountString: string;
    couponCode: string | null;
}

const Cart = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [summary, setSummary] = useState<CartSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await api.get("/cart/list");
                setSummary(res.data);
                setItems(res.data?.items || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const handleRemove = async (id: number) => {
        try {
            await api.post("/cart/remove-item", id, {
    headers: { "Content-Type": "application/json-patch+json" }
});
            setItems((curr) => curr.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleQtyChange = async (id: number, delta: number) => {
        const item = items.find(i => i.id === id);
        if (!item) return;

        const newQuantity = Math.max(1, item.quantity + delta);
        setItems(curr => curr.map(i => i.id === id ? { ...i, quantity: newQuantity } : i));

        const result = await updateCart(id, newQuantity);
        if (result) {
            setSummary(result.summary);
            setItems(result.items);
        }
    };

    return (
        <main className="max-w-5xl min-h-screen px-6 py-12 mx-auto">
            <div className="overflow-hidden bg-white shadow-sm rounded-3xl">

                {/* Header */}
                <div className="flex items-center justify-between px-10 pt-10 pb-6">
                    <h1 className="text-4xl font-black tracking-tight text-gray-900">My Cart</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 sm: hidden transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Continue shopping
                    </button>
                </div>

                {/* Empty State */}
                
                {!loading && items.length === 0 && (
                    <div className="flex flex-col items-center justify-center px-10 text-center py-28">
                        <p className="mb-6 text-lg text-gray-400">Your cart is empty.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-3 text-sm font-bold text-white transition-opacity rounded-lg hover:opacity-90"
                            style={{ backgroundColor: "#ef4444" }}
                        >
                            Browse Products
                        </button>
                    </div>
                )}

                {/* Table */}
                {items.length > 0 && (
                    <>
                        {/* Column Headers */}
                        
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-10 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <span>Product</span>
                            <span>Price</span>
                            <span>Qty</span>
                            <span>Total</span>
                            <span />
                        </div>

                        {/* Items */}
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-10 py-6 border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                            >
                                {/* Product */}
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-xl">
                                        <img
                                            src={item.productImage || item.image || "/placeholder.png"}
                                            alt={item.productName || item.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className="text-sm font-semibold text-gray-800 cursor-pointer hover:underline sm:text-xs"
                                            onClick={() => navigate(`/product/${item.productId}`)}
                                        >
                                            {item.productName || item.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Price */}
                                <span className="text-sm font-medium text-gray-700">
                                    ₹{item.calculatedProductPrice?.price ?? "—"}
                                </span>

                                {/* Qty Stepper */}
                                <div className="flex items-center gap-1 flex-cols xs:flex-row">
                                    <button
                                        onClick={() => handleQtyChange(item.id, -1)}
                                        className="flex items-center justify-center w-6 h-6 text-sm text-gray-500 transition-colors border border-gray-200 rounded-full hover:border-gray-400"
                                    >
                                        −
                                    </button>
                                    <span className="w-4 text-sm font-semibold text-center text-gray-800">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQtyChange(item.id, 1)}
                                        className="flex items-center justify-center w-6 h-6 text-sm text-gray-500 transition-colors border border-gray-200 rounded-full hover:border-gray-400"
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Total */}

                                <span className="text-sm font-bold text-gray-800">
                                    {item.calculatedProductPrice
                                        ? `₹${(item.calculatedProductPrice.price * item.quantity).toFixed(2)}`
                                        : "—"}
                                </span>

                                {/* Remove */}
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-gray-300 transition-colors hover:text-red-400"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {/* Bottom Panel */}
                        {/* <div className="flex justify-end px-10 py-8 bg-gray-50 rounded-b-3xl">
                            <CalculatedAmount summary={summary} loading={loading} />
                        </div> */}
                        {/* Order Summary */}
                    </>
                )}
            </div>
        </main>
    );
};

export default Cart;