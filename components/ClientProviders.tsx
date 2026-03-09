'use client';

import React from 'react';
import { CartProvider } from '@/components/CartContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
}
