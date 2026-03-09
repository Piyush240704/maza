'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';

interface FooterProps {
    product: Product;
}

export default function Footer({ product }: FooterProps) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            setEmail('');
        }
    };

    return (
        <footer className="bg-gray-950 text-gray-300 py-16 px-6 border-t border-gray-900 relative z-20">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4 pr-8">
                    <p className="text-sm text-gray-400 leading-relaxed">
                        The future of freshness. Cold-pressed, perfectly crafted, zero-compromise juices shipped directly to you to elevate your daily routine.
                    </p>
                </div>

                <div>
                    <h4 className="text-white text-lg font-bold mb-6">Shop</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">All Products</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Subscriptions</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Gift Cards</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Merch</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-lg font-bold mb-6">Support</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Shipping &amp; Returns</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Track Order</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-lg font-bold mb-6">Newsletter</h4>
                    <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers and fresh releases.</p>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-900 border border-gray-800 rounded-full px-5 py-3 w-full text-sm focus:ring-2 outline-none text-white transition-all"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 text-white rounded-full font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2"
                            style={{
                                background: submitted ? '#22c55e' : product.themeColor,
                                boxShadow: `0 4px 20px ${submitted ? '#22c55e' : product.themeColor}30`,
                            }}
                        >
                            {submitted ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    Done
                                </>
                            ) : 'Join'}
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">No spam. Unsubscribe anytime.</p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-medium">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <div className="flex gap-6 mt-6 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
