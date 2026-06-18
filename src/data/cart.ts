"use client";

import { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "metro-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: Product, quantity: number = 1): void {
  const items = getCart();
  const existing = items.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ product, quantity });
  }
  saveCart(items);
}

export function removeFromCart(productId: string): void {
  const items = getCart().filter((item) => item.product.id !== productId);
  saveCart(items);
}

export function updateQuantity(productId: string, quantity: number): void {
  const items = getCart();
  const item = items.find((i) => i.product.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(items);
  }
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
