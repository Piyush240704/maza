'use client';

import React from 'react';

interface Option {
    label: string;
    value: string;
    gradient: string;
}

interface GlassRadioGroupProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export function GlassRadioGroup({ options, value, onChange }: GlassRadioGroupProps) {
    const activeIdx = options.findIndex((o) => o.value === value);
    const activeGradient = options[activeIdx]?.gradient ?? options[0].gradient;

    return (
        <div style={{
            display: 'inline-flex',
            position: 'relative',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            padding: 4,
            gap: 0,
        }}>
            {/* Sliding glider */}
            <div
                style={{
                    position: 'absolute',
                    top: 4,
                    left: `calc(${activeIdx * (100 / options.length)}% + 4px)`,
                    width: `calc(${100 / options.length}% - 8px)`,
                    height: 'calc(100% - 8px)',
                    borderRadius: 999,
                    background: activeGradient,
                    boxShadow: `0 0 20px ${activeGradient.includes('#f5a623') ? 'rgba(245,166,35,0.4)' : activeGradient.includes('#6B3A1F') ? 'rgba(107,58,31,0.4)' : 'rgba(192,57,43,0.4)'}`,
                    transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease',
                    zIndex: 0,
                }}
            />
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        padding: '0.75rem 2rem',
                        borderRadius: 999,
                        fontWeight: 700,
                        fontSize: 14,
                        border: 'none',
                        cursor: 'pointer',
                        background: 'transparent',
                        color: option.value === value ? '#fff' : 'rgba(255,255,255,0.5)',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
