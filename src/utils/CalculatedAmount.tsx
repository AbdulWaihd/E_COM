interface Props {
    summary: {
        subTotalString: string;
        discountString: string;
        discount: number;
        subTotalWithDiscountString: string;
    } | null;
    loading: boolean;
    onCheckout?: () => void;
}

const CalculatedAmount = ({ summary, loading, onCheckout }: Props) => {
    if (loading || !summary) return null;

    return (
        <div className="flex flex-col gap-2 min-w-[220px]">
            <div className="flex justify-between text-xs tracking-widest text-gray-400 uppercase">
                <span>Subtotal TTC</span>
                <span className="font-medium text-gray-700">{summary.subTotalString}</span>
            </div>

            <div className="flex justify-between text-xs tracking-widest text-gray-400 uppercase">
                <span>Shipping</span>
                <span className="font-medium text-gray-700">
                    {summary.discount > 0 ? `− ${summary.discountString}` : "Free"}
                </span>
            </div>

            <div className="h-px my-1 bg-gray-200" />

            <div className="flex justify-between text-xs tracking-widest text-gray-400 uppercase">
                <span>Total</span>
                <span className="font-bold text-gray-800">{summary.subTotalWithDiscountString}</span>
            </div>

            <button
                onClick={onCheckout}
                className="flex items-center justify-between w-full px-5 py-3 mt-3 text-sm font-bold text-white transition-all rounded-lg hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#ef4444" }}
            >
                <span>Checkout</span>
                <span>{summary.subTotalWithDiscountString}</span>
            </button>
        </div>
    );
};

export default CalculatedAmount;