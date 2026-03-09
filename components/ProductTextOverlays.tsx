'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Product } from '@/data/products';

interface TextSectionProps {
    opacity: number;
    y: number;
    title: string;
    subtitle: string;
    isFirst?: boolean;
}

function TextSection({ opacity, y, title, subtitle, isFirst }: TextSectionProps) {
    if (opacity <= 0.01) return null;
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem 3rem',
                pointerEvents: 'none',
                textAlign: 'center',
                opacity,
                transform: `translateY(${y}px)`,
                transition: 'opacity 0.05s, transform 0.05s',
            }}
        >
            <h2
                style={{
                    fontSize: isFirst ? 'clamp(3rem, 12vw, 10rem)' : 'clamp(2rem, 8vw, 6rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    marginBottom: '1.5rem',
                    color: '#ffffff',
                    textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)',
                    lineHeight: 1.1,
                }}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    style={{
                        fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                        fontWeight: 500,
                        maxWidth: '60rem',
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                        lineHeight: 1.4,
                    }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}

function lerp(inputMin: number, inputMax: number, outputMin: number, outputMax: number, value: number): number {
    const clamped = Math.max(inputMin, Math.min(inputMax, value));
    return outputMin + ((clamped - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin);
}

export default function ProductTextOverlays({ product }: { product: Product }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / scrollable));
        setProgress(p);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Section 1: VISIBLE AT PROGRESS 0, fades out by 20%
    const op1 = progress <= 0.001
        ? 1  // Fully visible on landing
        : lerp(0, 0.01, 1, 1, progress) * lerp(0.15, 0.2, 1, 0, progress);
    const y1 = lerp(0.15, 0.2, 0, -40, progress);

    // Section 2: 22% → 45%
    const op2 = lerp(0.22, 0.28, 0, 1, progress) * lerp(0.4, 0.45, 1, 0, progress);
    const y2 = lerp(0.22, 0.28, 40, 0, progress) + lerp(0.4, 0.45, 0, -40, progress);

    // Section 3: 47% → 70%
    const op3 = lerp(0.47, 0.53, 0, 1, progress) * lerp(0.65, 0.7, 1, 0, progress);
    const y3 = lerp(0.47, 0.53, 40, 0, progress) + lerp(0.65, 0.7, 0, -40, progress);

    // Section 4: 72% → 100%
    const op4 = lerp(0.72, 0.78, 0, 1, progress);
    const y4 = lerp(0.72, 0.78, 40, 0, progress);

    // Scroll indicator opacity — visible on load, fades as user scrolls
    const scrollIndicatorOpacity = lerp(0, 0.05, 1, 0, progress);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 20,
                pointerEvents: 'none',
                height: '250vh',
            }}
        >
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TextSection isFirst opacity={op1} y={y1} title={product.section1.title} subtitle={product.section1.subtitle} />
                <TextSection opacity={op2} y={y2} title={product.section2.title} subtitle={product.section2.subtitle} />
                <TextSection opacity={op3} y={y3} title={product.section3.title} subtitle={product.section3.subtitle} />
                <TextSection opacity={op4} y={y4} title={product.section4.title} subtitle={product.section4.subtitle} />

                {/* Scroll indicator — visible on landing, fades on scroll */}
                {scrollIndicatorOpacity > 0.01 && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '6rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: scrollIndicatorOpacity,
                            transition: 'opacity 0.3s',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: 'rgba(255,255,255,0.7)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Scroll to explore
                        </span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgba(255,255,255,0.6)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                animation: 'scrollBounce 2s ease-in-out infinite',
                            }}
                        >
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                        <style>{`
                            @keyframes scrollBounce {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(8px); }
                            }
                        `}</style>
                    </div>
                )}
            </div>
        </div>
    );
}
