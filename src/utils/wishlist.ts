import api from "../api/api"
export async function addToWishlist(productId: string, quantity :number) {
    const response = await api.post('/api/wishList/AddItem', {
                productId,
                quantity
            });
    return response.data;
}