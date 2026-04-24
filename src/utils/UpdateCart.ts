import api from "../api/api";

const updateCart = async (cartItemId: number, quantity: number) => {
    try {
        const res = await api.post("/cart/update-item-quantity", 
            { cartItemId, 
                quantity });
        return res.data;
    } catch {
        return null;
    }
};

export default updateCart;