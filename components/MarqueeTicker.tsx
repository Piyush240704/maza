'use client';

import React from 'react';

const TICKER_ITEMS = [
    'Cold Pressed',
    'No Sugar Added',
    'HPP Treated',
    '100% Fruit',
    'Never Heated',
    'Farm to Bottle',
];

export default function MarqueeTicker() {
    const content = TICKER_ITEMS.map((item) => `${item} ✦`).join(' ');
    // Duplicate for seamless loop
    const fullContent = `${content} ${content} ${content}`;

    return (
        <div
            style={{
                background: '#1A1A1A',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                padding: '1rem 0',
                position: 'relative',
                zIndex: 1,
            }}
        >
            <div
                style={{
                    display: 'inline-block',
                    animation: 'marqueeScroll 20s linear infinite',
                    willChange: 'transform',
                }}
            >
                <span
                    style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.8)',
                    }}
                >
                    {fullContent}
                </span>
            </div>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
            `}</style>
        </div>
    );
}
