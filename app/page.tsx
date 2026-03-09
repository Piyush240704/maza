'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products, Product } from '@/data/products';
import { Header } from '@/components/ui/header-1';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';
import MarqueeTicker from '@/components/MarqueeTicker';
import TestimonialCards from '@/components/TestimonialCards';
import FloatingCartBar from '@/components/FloatingCartBar';
import { GlassRadioGroup } from '@/components/ui/glass-radio-group';
import { LumaSpin } from '@/components/ui/luma-spin';
import CartPage from '@/components/CartPage';

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentIndex]);

    const currentProduct = products[currentIndex];

    const handleFlavorSwitch = (idx: number) => {
        if (idx === currentIndex) return;
        setShowLoader(true);
        setTimeout(() => setCurrentIndex(idx), 100);
    };

    const handleNext = () => handleFlavorSwitch((currentIndex + 1) % products.length);
    const handlePrev = () => handleFlavorSwitch((currentIndex - 1 + products.length) % products.length);

    const flavorOptions = products.map((p) => ({
        label: p.name.split(' ')[1] || p.name,
        value: p.id,
        gradient:
            p.id === 'mango'
                ? 'linear-gradient(135deg, #f5a62355, #F5A623)'
                : p.id === 'chocolate'
                    ? 'linear-gradient(135deg, #3d1c0255, #6B3A1F)'
                    : 'linear-gradient(135deg, #8b000055, #C0392B)',
    }));

    return (
        <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'clip', background: '#0a0a0a' }}>
            <Header product={currentProduct} />

            {/* Scroll Animation Section - NOT inside AnimatePresence */}
            <div style={{ position: 'relative', width: '100%' }}>
                <ProductBottleScroll folderPath={currentProduct.folderPath} totalFrames={currentProduct.totalFrames} />
                <ProductTextOverlays product={currentProduct} />
            </div>

            {/* Marquee Ticker */}
            <MarqueeTicker />

            {/* Content sections below scroll area */}
            <div style={{ background: currentProduct.gradient, position: 'relative', zIndex: 1 }}>
                {/* Product Details */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{
                        padding: '6rem 1.5rem',
                        maxWidth: 1400,
                        margin: '0 auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4rem',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ flex: 1, minWidth: 300 }}>
                        <h3 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            color: '#fff',
                            letterSpacing: '-0.03em',
                            marginBottom: '2rem',
                            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                        }}>
                            {currentProduct.detailsSection.title}
                        </h3>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.7,
                            maxWidth: 600,
                            marginBottom: '2rem',
                        }}>
                            {currentProduct.detailsSection.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {currentProduct.features.map((feature: string, i: number) => (
                                <span key={i} style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 999,
                                    background: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}>
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: 480,
                            aspectRatio: '1',
                            borderRadius: '3rem',
                            background: 'rgba(0,0,0,0.15)',
                            backdropFilter: 'blur(40px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '3rem',
                            gap: '2rem',
                        }}>
                            {currentProduct.stats.map((stat: { label: string, val: string }, i: number) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end',
                                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                                    paddingBottom: '1rem',
                                }}>
                                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</span>
                                    <span style={{ color: '#fff', fontSize: '3rem', fontWeight: 900 }}>{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Freshness Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{
                        padding: '8rem 1.5rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                        <h3 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            color: '#fff',
                            marginBottom: '2rem',
                            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                        }}>
                            {currentProduct.freshnessSection.title}
                        </h3>
                        <p style={{
                            fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.5,
                        }}>
                            {currentProduct.freshnessSection.description}
                        </p>
                    </div>
                </motion.section>

                {/* Buy Now Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{
                        padding: '8rem 1.5rem',
                        maxWidth: 1100,
                        margin: '0 auto',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(4rem, 10vw, 8rem)',
                            fontWeight: 900,
                            color: '#fff',
                            letterSpacing: '-0.04em',
                        }}>
                            {currentProduct.buyNowSection.price}
                        </h2>
                        <p style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.7)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                        }}>
                            {currentProduct.buyNowSection.unit}
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        {currentProduct.buyNowSection.processingParams.map((param: string, i: number) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                background: '#fff',
                                color: '#000',
                                fontWeight: 900,
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                {param}
                            </div>
                        ))}
                    </div>

                    <button style={{
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        fontWeight: 900,
                        padding: '1.5rem 4rem',
                        borderRadius: 999,
                        background: '#fff',
                        color: '#000',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                        marginTop: '2rem',
                    }}>
                        Add to Cart
                    </button>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        marginTop: '6rem',
                        textAlign: 'left',
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '2rem',
                            borderRadius: '1.5rem',
                        }}>
                            <h4 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>
                                🚚 Delivery
                            </h4>
                            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{currentProduct.buyNowSection.deliveryPromise}</p>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '2rem',
                            borderRadius: '1.5rem',
                        }}>
                            <h4 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>
                                🛡️ Guarantee
                            </h4>
                            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{currentProduct.buyNowSection.returnPolicy}</p>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* Next Flavor — enhanced with hover effects */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: '#000',
                    borderLeft: `4px solid ${currentProduct.themeColor}`,
                    transition: 'background 0.4s',
                }}
                onClick={handleNext}
                onMouseEnter={(e) => {
                    const bg = e.currentTarget.querySelector('[data-bg]') as HTMLElement;
                    const text = e.currentTarget.querySelector('[data-text]') as HTMLElement;
                    if (bg) bg.style.opacity = '0.5';
                    if (text) { text.style.transform = 'translateX(10px)'; text.style.opacity = '0.9'; }
                }}
                onMouseLeave={(e) => {
                    const bg = e.currentTarget.querySelector('[data-bg]') as HTMLElement;
                    const text = e.currentTarget.querySelector('[data-text]') as HTMLElement;
                    if (bg) bg.style.opacity = '0.3';
                    if (text) { text.style.transform = 'translateX(0)'; text.style.opacity = '0.6'; }
                }}
            >
                <div data-bg="" style={{
                    position: 'absolute',
                    inset: 0,
                    background: products[(currentIndex + 1) % products.length].gradient,
                    opacity: 0.3,
                    transition: 'opacity 0.5s',
                }} />
                <h2 data-text="" style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: 900,
                    color: '#fff',
                    opacity: 0.6,
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5em',
                }}>
                    NEXT FLAVOR <span style={{ display: 'inline-block', animation: 'none', transition: 'transform 0.3s' }}>→</span>
                </h2>
            </div>

            {/* Testimonial Cards */}
            <TestimonialCards />

            <Footer product={currentProduct} />

            {/* Loader Overlay */}
            <LumaSpin visible={showLoader} themeColor={currentProduct.themeColor} onDone={() => setShowLoader(false)} />

            {/* Cart Page */}
            <CartPage currentProduct={currentProduct} currentIndex={currentIndex} onFlavorChange={handleFlavorSwitch} />

            {/* Floating Add to Cart */}
            <FloatingCartBar product={currentProduct} />

            {/* Navigation Arrows */}
            <div style={{ position: 'fixed', top: '50%', left: 24, transform: 'translateY(-50%)', zIndex: 40 }}>
                <button onClick={handlePrev} style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px rgba(0,0,0,0.2)',
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
            </div>
            <div style={{ position: 'fixed', top: '50%', right: 24, transform: 'translateY(-50%)', zIndex: 40 }}>
                <button onClick={handleNext} style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px rgba(0,0,0,0.2)',
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            {/* Bottom Flavor Selector — Glass Radio Group */}
            <div style={{
                position: 'fixed',
                bottom: 32,
                left: 0,
                right: 0,
                zIndex: 50,
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none',
            }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <GlassRadioGroup
                        options={flavorOptions}
                        value={currentProduct.id}
                        onChange={(val) => {
                            const idx = products.findIndex((p) => p.id === val);
                            if (idx !== -1) handleFlavorSwitch(idx);
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
