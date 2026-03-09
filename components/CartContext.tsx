'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
    product: Product;
    qty: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    checkoutStep: 'cart' | 'checkout' | 'success';
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQty: (productId: string, delta: number) => void;
    openCart: (product?: Product) => void;
    closeCart: () => void;
    setCheckoutStep: (step: 'cart' | 'checkout' | 'success') => void;
    total: number;
    subtotal: number;
    delivery: number;
    count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { product, qty: 1 }];
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
    }, []);

    const updateQty = useCallback((productId: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((i) =>
                    i.product.id === productId ? { ...i, qty: Math.max(0, i.qty + delta) } : i
                )
                .filter((i) => i.qty > 0)
        );
    }, []);

    const openCart = useCallback((product?: Product) => {
        if (product) {
            setItems((prev) => {
                const existing = prev.find((i) => i.product.id === product.id);
                if (existing) return prev;
                return [...prev, { product, qty: 1 }];
            });
        }
        setCheckoutStep('cart');
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeCart = useCallback(() => {
        setIsOpen(false);
        setCheckoutStep('cart');
        document.body.style.overflow = '';
    }, []);

    const subtotal = items.reduce((sum, i) => sum + parseInt(i.product.price.replace(/[^\d]/g, '')) * i.qty, 0);
    const delivery = subtotal >= 500 ? 0 : subtotal > 0 ? 50 : 0;
    const total = subtotal + delivery;
    const count = items.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{
            items, isOpen, checkoutStep,
            addItem, removeItem, updateQty,
            openCart, closeCart, setCheckoutStep,
            total, subtotal, delivery, count,
        }}>
            {children}
        </CartContext.Provider>
    );
}
