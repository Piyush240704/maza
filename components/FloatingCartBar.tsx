'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/components/CartContext';

interface FloatingCartBarProps {
    product: Product;
}

export default function FloatingCartBar({ product }: FloatingCartBarProps) {
    const [visible, setVisible] = useState(false);
    const { openCart } = useCart();

    const handleScroll = useCallback(() => {
        // Show after scrolling past ~1 viewport height
        setVisible(window.scrollY > window.innerHeight * 0.8);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: visible ? 90 : -80,
                left: 0,
                right: 0,
                zIndex: 45,
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none',
                transition: 'bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div
                style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 999,
                    padding: '0.5rem 0.75rem 0.5rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    pointerEvents: 'auto',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                }}
            >
                <span
                    style={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {product.name}
                </span>
                <span
                    style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                    }}
                >
                    {product.price}
                </span>
                <button
                    style={{
                        background: product.themeColor,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 999,
                        padding: '0.6rem 1.5rem',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: `0 4px 20px ${product.themeColor}50`,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={() => openCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
