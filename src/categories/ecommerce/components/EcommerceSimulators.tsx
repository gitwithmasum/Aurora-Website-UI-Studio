import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import {
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Check,
  Star,
  ShieldCheck,
  Zap,
  Tag,
  CreditCard,
  Truck,
  Box,
} from 'lucide-react';
import { sound } from '../../../utils/soundEngine';

export const ProductCardCartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [selectedColor, setSelectedColor] = useState('cyan');
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedAnim, setAddedAnim] = useState(false);

  const colors = [
    { id: 'cyan', name: 'Aurora Cyan', bg: '#0F969C' },
    { id: 'obsidian', name: 'Obsidian Black', bg: '#06141B' },
    { id: 'steel', name: 'Midnight Steel', bg: '#253745' },
  ];

  const handleAddToCart = () => {
    sound.playConfirm();
    setCartCount(c => c + qty);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 2000);
  };

  const handleWishlist = () => {
    sound.playBlip();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-md relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-white uppercase">IN STOCK · READY TO DISPATCH</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
            {variantId.toUpperCase()}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-cyan-300">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>({cartCount})</span>
          </div>
        </div>
      </div>

      {/* Visual Product Stage */}
      <div className="relative w-full h-48 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden group">
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg border border-slate-700 bg-black/60 flex items-center justify-center transition-all hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-pink-500 fill-pink-500' : 'text-slate-400'}`}
          />
        </button>

        {/* Product Representation Hologram */}
        <div
          className="w-24 h-24 rounded-2xl border-2 flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110"
          style={{
            borderColor: selectedColor === 'cyan' ? '#0F969C' : selectedColor === 'obsidian' ? '#4A5C6A' : '#9BA8AB',
            boxShadow: `0 0 25px ${selectedColor === 'cyan' ? '#0F969C50' : '#4A5C6A30'}`,
            backgroundColor: '#06141B',
          }}
        >
          <Zap className="w-10 h-10 text-cyan-300" />
        </div>

        <div className="mt-3 text-center">
          <div className="text-xs font-bold text-white tracking-widest">CYBERDECK MK-IX</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Quantum Neural Terminal &bull; 64GB Unified</div>
        </div>
      </div>

      {/* Swatches & Stepper */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-bold mb-1.5">Chassis Finish</div>
          <div className="flex gap-2">
            {colors.map(c => (
              <button
                key={c.id}
                onClick={() => { sound.playBlip(); setSelectedColor(c.id); }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.id ? 'border-cyan-400 scale-110 shadow-lg shadow-cyan-400/40' : 'border-slate-700'}`}
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 uppercase font-bold mb-1.5">Units</div>
          <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900/80 p-0.5">
            <button
              onClick={() => { sound.playBlip(); setQty(Math.max(1, qty - 1)); }}
              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-white">{qty}</span>
            <button
              onClick={() => { sound.playBlip(); setQty(qty + 1); }}
              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Button */}
      <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] text-slate-400">Total Due</div>
          <div className="text-lg font-extrabold text-white font-mono">${(qty * 499).toLocaleString()}</div>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl border border-cyan-400 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
        >
          {addedAnim ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">ADDED TO VAULT</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>ADD TO CART</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const OrderSummarySimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'AURORA20') {
      sound.playConfirm();
      setDiscountApplied(true);
    } else {
      sound.playBlip();
    }
  };

  const subtotal = 499;
  const discount = discountApplied ? subtotal * 0.2 : 0;
  const total = subtotal - discount;

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-md relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
        <span className="text-xs font-bold text-white uppercase tracking-wider">Order Summary Dossier</span>
        <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
          {variantId.toUpperCase()}
        </span>
      </div>

      {/* Calculations Breakdown */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-slate-400">
          <span>Cyberdeck MK-IX (x1)</span>
          <span className="text-white">${subtotal}.00</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Sub-Orbital Courier Shipping</span>
          <span className="text-emerald-400 font-semibold">FREE</span>
        </div>
        {discountApplied && (
          <div className="flex justify-between text-emerald-400">
            <span>Promo Voucher (AURORA20)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-2 border-t border-slate-700/60 flex justify-between text-sm font-bold text-white">
          <span>TOTAL</span>
          <span className="text-cyan-300">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Coupon Form */}
      <form onSubmit={handleApplyCoupon} className="mt-4 flex gap-2">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Code (Try AURORA20)"
          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white uppercase focus:outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-bold hover:bg-cyan-900/60 transition-colors"
        >
          APPLY
        </button>
      </form>

      {/* Payment Selection */}
      <div className="mt-4 pt-4 border-t border-slate-700/60">
        <div className="text-[10px] text-slate-400 uppercase font-bold mb-2">Payment Protocol</div>
        <div className="grid grid-cols-2 gap-2">
          {['card', 'crypto'].map(method => (
            <button
              key={method}
              onClick={() => { sound.playBlip(); setPaymentMethod(method); }}
              className={`p-2.5 rounded-lg border text-xs flex items-center justify-center gap-2 transition-all ${paymentMethod === method ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold' : 'border-slate-800 bg-slate-900/60 text-slate-400'}`}
            >
              {method === 'card' ? <CreditCard className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
              <span>{method === 'card' ? 'CREDIT CARD' : 'CRYPTO / WEB3'}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
