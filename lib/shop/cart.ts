import axios from "@/lib/axios";

export async function addToCart(itemId: string | number, quantity: number): Promise<void> {
  return axios
    .post(`/shop/cart`, { itemId, quantity })
    .then(() => {})
    .catch(() => {
      throw new Error("Failed to add item to cart");
    });
}

export async function updateCartItem(itemId: string | number, quantity: number): Promise<void> {
  return axios
    .put(`/shop/cart/${itemId}`, { quantity })
    .then(() => {})
    .catch(() => {
      throw new Error("Failed to update cart item");
    });
}

export async function removeFromCart(itemId: string | number): Promise<void> {
  return axios
    .delete(`/shop/cart/${itemId}`)
    .then(() => {})
    .catch(() => {
      throw new Error("Failed to remove item from cart");
    });
}