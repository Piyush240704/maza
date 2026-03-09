'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';
import { Product } from '@/data/products';
import { useCart } from '@/components/CartContext';

interface HeaderProps {
    product: Product;
}

export function Header({ product }: HeaderProps) {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);
    const { openCart, count } = useCart();

    const links = product.features.map((feature) => ({
        label: feature,
        href: '#',
    }));

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={cn('fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300', {
                'bg-black/80 supports-[backdrop-filter]:bg-black/50 border-white/10 backdrop-blur-xl shadow-lg':
                    scrolled,
                'bg-black/20 supports-[backdrop-filter]:bg-black/10 backdrop-blur-md': !scrolled,
            })}
        >
            <nav className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-6">
                {/* Left: Product Name */}
                <div className="flex items-center gap-2">
                    <span
                        className="text-base font-extrabold tracking-tight text-white sm:text-lg"
                        style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                    >
                        {product.name}
                    </span>
                    <span className="hidden text-sm font-medium text-white/40 sm:inline">·</span>
                    <span className="hidden text-sm font-medium text-white/50 sm:inline">
                        {product.subName}
                    </span>
                </div>

                {/* Center: Feature pills (desktop) */}
                <div className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={cn(
                                buttonVariants({ variant: 'ghost', size: 'sm' }),
                                'text-white/70 hover:text-white hover:bg-white/10 text-xs font-semibold',
                            )}
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right: Cart + Price + Order Now (desktop) */}
                <div className="hidden items-center gap-3 sm:flex">
                    <span className="text-sm font-bold text-white/60">{product.price}</span>
                    <button
                        onClick={() => openCart(product)}
                        className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {count > 0 && (
                            <span style={{
                                position: 'absolute', top: -2, right: -2,
                                width: 18, height: 18, borderRadius: '50%',
                                background: product.themeColor,
                                color: '#fff', fontSize: 11, fontWeight: 800,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {count}
                            </span>
                        )}
                    </button>
                    <Button
                        onClick={() => openCart(product)}
                        className="rounded-full px-6 text-sm font-bold text-white border-0 hover:brightness-110 transition-all"
                        style={{
                            background: `linear-gradient(135deg, ${product.themeColor}, ${product.themeColor}cc)`,
                            boxShadow: `0 0 20px ${product.themeColor}40`,
                        }}
                    >
                        Order Now
                    </Button>
                </div>

                {/* Mobile hamburger */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10 sm:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                >
                    <MenuToggleIcon open={open} className="size-5" duration={300} />
                </Button>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu open={open} className="flex flex-col justify-between gap-4">
                <div className="grid gap-y-1">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={cn(
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'justify-start text-white/80 hover:text-white hover:bg-white/10',
                                }),
                            )}
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-center text-lg font-bold text-white/80 mb-1">
                        {product.price}
                    </div>
                    <Button
                        onClick={() => openCart(product)}
                        className="w-full rounded-full font-bold text-white border-0"
                        style={{
                            background: `linear-gradient(135deg, ${product.themeColor}, ${product.themeColor}cc)`,
                            boxShadow: `0 0 20px ${product.themeColor}40`,
                        }}
                    >
                        Order Now
                    </Button>
                </div>
            </MobileMenu>
        </header>
    );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
    open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div
            id="mobile-menu"
            className={cn(
                'bg-black/90 supports-[backdrop-filter]:bg-black/70 backdrop-blur-xl',
                'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-white/10 sm:hidden',
            )}
        >
            <div
                data-slot={open ? 'open' : 'closed'}
                className={cn(
                    'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
                    'size-full p-4',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}
