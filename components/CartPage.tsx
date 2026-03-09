'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/CartContext';
import { products, Product } from '@/data/products';
import { GlassRadioGroup } from '@/components/ui/glass-radio-group';
import { LumaSpin } from '@/components/ui/luma-spin';

interface CartPageProps {
    currentProduct: Product;
    currentIndex: number;
    onFlavorChange: (idx: number) => void;
}

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

export default function CartPage({ currentProduct, currentIndex, onFlavorChange }: CartPageProps) {
    const {
        items, isOpen, closeCart,
        addItem, removeItem, updateQty,
        subtotal, delivery, total,
        checkoutStep, setCheckoutStep,
    } = useCart();

    const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', pincode: '' });
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [showLoader, setShowLoader] = useState(false);

    if (!isOpen) return null;

    const paymentOptions = [
        { label: 'UPI', value: 'upi', gradient: `linear-gradient(135deg, ${currentProduct.themeColor}55, ${currentProduct.themeColor})` },
        { label: 'Card', value: 'card', gradient: `linear-gradient(135deg, ${currentProduct.themeColor}55, ${currentProduct.themeColor})` },
        { label: 'COD', value: 'cod', gradient: `linear-gradient(135deg, ${currentProduct.themeColor}55, ${currentProduct.themeColor})` },
    ];

    const handlePlaceOrder = () => {
        setShowLoader(true);
    };

    // ── CART VIEW ─────────────────────────────────────
    const renderCart = () => (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem 8rem' }}>
            {items.length === 0 ? (
                /* Empty State */
                <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>
                        Nothing here yet.
                    </h2>
                    <button
                        onClick={closeCart}
                        style={{
                            padding: '1rem 3rem', borderRadius: 999, fontWeight: 800, fontSize: 16,
                            background: '#fff', color: '#000', border: 'none', cursor: 'pointer',
                            marginTop: '1.5rem',
                        }}
                    >
                        Explore Flavors
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
                    {/* Product List */}
                    <div style={{ flex: 2, minWidth: 300 }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '1.5rem' }}>Your Cart</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {items.map((item) => (
                                <div key={item.product.id} style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: '1.5rem',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                }}>
                                    <div>
                                        <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>{item.product.name}</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{item.product.subName}</p>
                                        <p style={{ color: '#fff', fontWeight: 700, marginTop: '0.5rem' }}>{item.product.price}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <button onClick={() => updateQty(item.product.id, -1)} style={qtyBtnStyle}>−</button>
                                        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                                        <button onClick={() => updateQty(item.product.id, 1)} style={qtyBtnStyle}>+</button>
                                        <button onClick={() => removeItem(item.product.id)} style={{ ...qtyBtnStyle, color: '#ff6b6b', borderColor: 'rgba(255,107,107,0.3)' }}>✕</button>
                                    </div>
                                </div>
                            ))}
                            {/* Add other flavors */}
                            {products.filter((p) => !items.find((i) => i.product.id === p.id)).map((p) => (
                                <div key={p.id} style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px dashed rgba(255,255,255,0.15)',
                                    borderRadius: '1.5rem',
                                    padding: '1.25rem 1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <div>
                                        <h4 style={{ fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>{p.name}</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>{p.price}</p>
                                    </div>
                                    <button onClick={() => addItem(p)} style={{
                                        padding: '0.5rem 1.5rem', borderRadius: 999, fontWeight: 700, fontSize: 13,
                                        background: 'rgba(255,255,255,0.1)', color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
                                    }}>
                                        + Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div style={{ flex: 1, minWidth: 280 }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            position: 'sticky',
                            top: 80,
                        }}>
                            <h3 style={{ fontWeight: 900, color: '#fff', fontSize: '1.3rem', marginBottom: '1.5rem' }}>Order Summary</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                                <span>Subtotal</span><span>₹{subtotal}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                                <span>Delivery</span><span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
                            </div>
                            {subtotal > 0 && subtotal < 500 && (
                                <p style={{ fontSize: '0.8rem', color: currentProduct.themeColor, marginBottom: '1rem' }}>
                                    Add ₹{500 - subtotal} more for free delivery
                                </p>
                            )}
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                                    <span style={{ fontWeight: 900, fontSize: '1.3rem' }}>Total</span>
                                    <span style={{ fontWeight: 900, fontSize: '1.3rem' }}>₹{total}</span>
                                </div>
                            </div>
                            <input
                                placeholder="Promo code"
                                style={{
                                    width: '100%', padding: '0.75rem 1.25rem', borderRadius: 999,
                                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff', fontSize: 14, outline: 'none', marginBottom: '1rem',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <button
                                onClick={() => setCheckoutStep('checkout')}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: 999,
                                    background: '#fff', color: '#000', fontWeight: 900, fontSize: 16,
                                    border: 'none', cursor: 'pointer',
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // ── CHECKOUT VIEW ─────────────────────────────────
    const renderCheckout = () => (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem 8rem' }}>
            <button onClick={() => setCheckoutStep('cart')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: 700, marginBottom: '2rem', fontSize: 15 }}>
                ← Back to Cart
            </button>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '2rem' }}>Checkout</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {(['name', 'phone', 'address', 'pincode'] as const).map((field) => (
                    <input
                        key={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={orderForm[field]}
                        onChange={(e) => setOrderForm({ ...orderForm, [field]: e.target.value })}
                        style={{
                            width: '100%', padding: '1rem 1.25rem', borderRadius: '1rem',
                            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                            color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box',
                        }}
                    />
                ))}
            </div>
            <h3 style={{ fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Payment</h3>
            <div style={{ marginBottom: '2rem' }}>
                <GlassRadioGroup options={paymentOptions} value={paymentMethod} onChange={setPaymentMethod} />
            </div>
            <div style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                marginBottom: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: 900, fontSize: '1.2rem' }}>
                    <span>Total</span><span>₹{total}</span>
                </div>
            </div>
            <button
                onClick={handlePlaceOrder}
                style={{
                    width: '100%', padding: '1.1rem', borderRadius: 999,
                    background: '#fff', color: '#000', fontWeight: 900, fontSize: 16,
                    border: 'none', cursor: 'pointer',
                }}
            >
                Place Order
            </button>
        </div>
    );

    // ── SUCCESS VIEW ─────────────────────────────────
    const renderSuccess = () => (
        <div style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
                Order Placed!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                {items.map((i) => `${i.product.name} ×${i.qty}`).join(' · ')} — ₹{total}
            </p>
            <button
                onClick={closeCart}
                style={{
                    padding: '1rem 3rem', borderRadius: 999, fontWeight: 800, fontSize: 16,
                    background: '#fff', color: '#000', border: 'none', cursor: 'pointer',
                }}
            >
                Done
            </button>
        </div>
    );

    return (
        <>
            <LumaSpin
                visible={showLoader}
                themeColor={currentProduct.themeColor}
                duration={3000}
                onDone={() => {
                    setShowLoader(false);
                    setCheckoutStep('success');
                }}
            />
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100,
                    background: currentProduct.gradient,
                    overflowY: 'auto',
                    animation: 'cartSlideIn 0.4s ease forwards',
                }}
            >
                {/* Cart Header */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.5rem',
                    background: 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <h2 style={{ fontWeight: 900, color: '#fff', fontSize: '1.2rem' }}>
                        {checkoutStep === 'cart' ? 'Cart' : checkoutStep === 'checkout' ? 'Checkout' : 'Order Confirmed'}
                    </h2>
                    <button
                        onClick={closeCart}
                        style={{
                            width: 40, height: 40, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, fontWeight: 700,
                        }}
                    >
                        ✕
                    </button>
                </div>

                {checkoutStep === 'cart' && renderCart()}
                {checkoutStep === 'checkout' && renderCheckout()}
                {checkoutStep === 'success' && renderSuccess()}

                {/* Bottom Flavor Switcher */}
                <div style={{
                    position: 'fixed',
                    bottom: 24,
                    left: 0,
                    right: 0,
                    zIndex: 110,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <GlassRadioGroup
                        options={flavorOptions}
                        value={products[currentIndex].id}
                        onChange={(val) => {
                            const idx = products.findIndex((p) => p.id === val);
                            if (idx !== -1) onFlavorChange(idx);
                        }}
                    />
                </div>

                <style>{`
                    @keyframes cartSlideIn {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0); }
                    }
                `}</style>
            </div>
        </>
    );
}

const qtyBtnStyle: React.CSSProperties = {
    width: 36, height: 36, borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: 16,
};
