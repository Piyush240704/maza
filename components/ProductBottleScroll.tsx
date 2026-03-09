'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface ProductBottleScrollProps {
    folderPath: string;
    totalFrames?: number;
}

const TOTAL = 200;

export default function ProductBottleScroll({ folderPath, totalFrames = TOTAL }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const lastFrameRef = useRef(-1);
    const lastFolderRef = useRef('');
    const rafIdRef = useRef(0);
    const canvasSizeRef = useRef({ w: 0, h: 0 });

    // Draw a specific frame onto the canvas (0-indexed internally, images are 1-indexed)
    const drawFrame = useCallback((frameIdx: number): void => {
        if (frameIdx === lastFrameRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Get or cache context
        if (!ctxRef.current) {
            ctxRef.current = canvas.getContext('2d', { alpha: false });
        }
        const ctx = ctxRef.current;
        if (!ctx) return;

        const img = imagesRef.current[frameIdx];
        if (!img || !img.complete || !img.naturalWidth) return;

        const { w: bw, h: bh } = canvasSizeRef.current;
        if (bw === 0 || bh === 0) return;

        // Cover-fit calculation
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = bw / bh;
        let dw: number, dh: number, dx: number, dy: number;

        if (canvasRatio > imgRatio) {
            dw = bw;
            dh = bw / imgRatio;
        } else {
            dh = bh;
            dw = bh * imgRatio;
        }
        dx = (bw - dw) / 2;
        dy = (bh - dh) / 2;

        ctx.drawImage(img, dx, dy, dw, dh);
        lastFrameRef.current = frameIdx;
    }, []);

    // Update canvas buffer size
    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const bw = Math.round(rect.width * dpr);
        const bh = Math.round(rect.height * dpr);
        if (canvas.width !== bw || canvas.height !== bh) {
            canvas.width = bw;
            canvas.height = bh;
            ctxRef.current = null; // Context resets on resize
        }
        canvasSizeRef.current = { w: bw, h: bh };
    }, []);

    // Preload ALL frames eagerly in parallel
    useEffect(() => {
        // Flush on flavor change
        if (lastFolderRef.current !== folderPath) {
            imagesRef.current = [];
            lastFrameRef.current = -1;
            ctxRef.current = null;
            lastFolderRef.current = folderPath;
        }

        const images: HTMLImageElement[] = new Array(totalFrames);
        imagesRef.current = images;

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            img.decoding = 'async';
            img.src = `${folderPath}/${i + 1}.webp`;
            // Draw frame 1 as soon as it loads
            if (i === 0) {
                img.onload = () => {
                    updateCanvasSize();
                    drawFrame(0);
                };
            }
            images[i] = img;
        }
    }, [folderPath, totalFrames, drawFrame, updateCanvasSize]);

    // Scroll handler — direct frame mapping, no subsampling
    useEffect(() => {
        const handleScroll = () => {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = requestAnimationFrame(() => {
                const container = containerRef.current;
                if (!container) return;

                const rect = container.getBoundingClientRect();
                const scrollable = container.offsetHeight - window.innerHeight;
                if (scrollable <= 0) return;
                const scrolled = -rect.top;
                const progress = Math.max(0, Math.min(1, scrolled / scrollable));

                // Direct 1:1 frame mapping — use ALL 120 frames
                const frameIdx = Math.floor(progress * (totalFrames - 1));
                drawFrame(frameIdx);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafIdRef.current);
        };
    }, [totalFrames, drawFrame]);

    // ResizeObserver for efficient dimension tracking
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new ResizeObserver(() => {
            updateCanvasSize();
            lastFrameRef.current = -1; // Force redraw
            // Redraw current frame
            const container = containerRef.current;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const scrollable = container.offsetHeight - window.innerHeight;
            if (scrollable <= 0) return;
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / scrollable));
            const frameIdx = Math.floor(progress * (totalFrames - 1));
            drawFrame(frameIdx);
        });

        observer.observe(canvas);
        updateCanvasSize();
        return () => observer.disconnect();
    }, [totalFrames, drawFrame, updateCanvasSize]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                height: '250vh',
                width: '100%',
            }}
        >
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                    background: '#0a0a0a',
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                    }}
                />
            </div>
        </div>
    );
}
