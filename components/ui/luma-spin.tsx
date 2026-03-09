'use client';

import React, { useEffect, useState } from 'react';

interface LumaSpinProps {
    visible: boolean;
    themeColor: string;
    onDone?: () => void;
    duration?: number;
}

export function LumaSpin({ visible, themeColor, onDone, duration = 800 }: LumaSpinProps) {
    const [show, setShow] = useState(false);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (visible) {
            setShow(true);
            setFading(false);
            const fadeTimer = setTimeout(() => setFading(true), duration - 300);
            const hideTimer = setTimeout(() => {
                setShow(false);
                setFading(false);
                onDone?.();
            }, duration);
            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [visible, duration, onDone]);

    if (!show) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: themeColor,
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.3s ease',
            }}
        >
            <div style={{ position: 'relative', width: 54, height: 54 }}>
                <span style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '3px solid transparent',
                    borderTopColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 0 30px rgba(255,255,255,0.3)',
                    animation: 'lumaSpinAnim 2.5s cubic-bezier(0.5, 0, 0.5, 1) infinite',
                }} />
                <span style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '3px solid transparent',
                    borderTopColor: 'rgba(255,255,255,0.5)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.15)',
                    animation: 'lumaSpinAnim 2.5s cubic-bezier(0.5, 0, 0.5, 1) infinite -1.25s',
                }} />
            </div>
            <style>{`
                @keyframes lumaSpinAnim {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
