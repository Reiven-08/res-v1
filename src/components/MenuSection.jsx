import React from 'react'
import { menuItems } from '../data/menuData.js'
import FoodCarousel from './FoodCarousel.jsx'

export default function MenuSection({ quantities, onAdjustQuantity, orderCount, onOpenOrder }) {
  return (
    <main className="menu-section" id="menu">
      <div className="menu-section__inner">
        <div className="menu-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> THE MENU</p>
            <h2>Made to be <em>shared.</em></h2>
          </div>
          <p>Fire, flavor, and a little bit of magic. Find your new favorite at our table.</p>
        </div>
        <FoodCarousel items={menuItems} quantities={quantities} onAdjustQuantity={onAdjustQuantity} />
      </div>
      {orderCount > 0 && (
        <button className="order-badge" type="button" onClick={onOpenOrder} aria-label={`Open your order, ${orderCount} dishes`}>
          <span>YOUR ORDER</span><strong aria-live="polite">{orderCount}</strong>
        </button>
      )}
    </main>
  )
}