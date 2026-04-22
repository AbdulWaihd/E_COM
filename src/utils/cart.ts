import api from "../api/api"
export async function addToCart(productId: number,variationName: string) {
    const response = await api.post('/cart/add-item', {
                productId,
                variationName,
                quantity:1
            });
    return response.data;
}