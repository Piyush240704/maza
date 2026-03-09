'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "Best juice I've ever had. No guilt, all taste.",
        name: 'Priya S.',
        city: 'Mumbai',
        stars: 5,
    },
    {
        quote: "Finally a cold press that actually tastes fresh.",
        name: 'Arjun M.',
        city: 'Delhi',
        stars: 5,
    },
    {
        quote: "The mango one is unreal. Addicted.",
        name: 'Sneha R.',
        city: 'Bangalore',
        stars: 5,
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

export default function TestimonialCards() {
    return (
        <section
            style={{
                background: '#111',
                padding: '5rem 1.5rem',
                position: 'relative',
                zIndex: 1,
            }}
        >
            <h3
                style={{
                    textAlign: 'center',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '3rem',
                    letterSpacing: '-0.02em',
                }}
            >
                What People Say
            </h3>
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                }}
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            cursor: 'default',
                        }}
                    >
                        <StarRating count={t.stars} />
                        <p
                            style={{
                                fontSize: '1.1rem',
                                color: 'rgba(255,255,255,0.9)',
                                lineHeight: 1.6,
                                marginBottom: '1.5rem',
                                fontStyle: 'italic',
                            }}
                        >
                            &ldquo;{t.quote}&rdquo;
                        </p>
                        <div>
                            <p style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                                {t.name}
                            </p>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                                {t.city}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
