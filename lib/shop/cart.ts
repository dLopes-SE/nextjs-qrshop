import axios from '@/lib/axios';
import { CartType } from '@/types/Cart/Cart';
import { CartPreviewType } from '@/types/Cart/CartPreview';

export async function getCartPreview(): Promise<CartPreviewType> {
  return axios
    .get<CartPreviewType>('/shop/cart?isCartPreview=true')
    .then((res) => res.data)
    .catch(() => {
      throw new Error('Failed to fetch cart');
    });
}

export async function getCart(): Promise<CartType> {
  return axios
    .get<CartType>('/shop/cart')
    .then((res) => res.data)
    .catch(() => {
      throw new Error('Failed to fetch cart');
    });
}

export async function addToCart(itemId: string | number, quantity: number): Promise<number> {
  return axios
    .post(`/shop/cart`, { itemId, quantity })
    .then((res) => res.data.cartItemId)
    .catch(() => {
      throw new Error('Failed to add item to cart');
    });
}

export async function updateCartItem(cartItemId: string | number, quantity: number): Promise<void> {
  return axios
    .patch(`/shop/cart/${cartItemId}`, quantity, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {})
    .catch(() => {
      throw new Error('Failed to update cart item');
    });
}

export async function removeFromCart(itemId: string | number): Promise<void> {
  return axios
    .delete(`/shop/cart/${itemId}`)
    .then(() => {})
    .catch(() => {
      throw new Error('Failed to remove item from cart');
    });
}
