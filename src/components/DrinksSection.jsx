import React from 'react'
import { drinkItems } from '../data/drinksData.js'
import DrinksCarousel from './DrinksCarousel.jsx'

export default function DrinksSection({ quantities, onAdjustQuantity, orderCount, onOpenOrder }) {
  return (
    <section className="drinks-section" id="drinks" aria-labelledby="drinks-title">
      <div className="drinks-section__atmosphere" aria-hidden="true" />
      <div className="drinks-section__inner">
        <div className="drinks-intro">
          <div className="drinks-intro__copy">
            <p className="eyebrow"><span className="eyebrow__line" /> OUR DRINKS</p>
            <h2 id="drinks-title">Crafted for<br /><em>Better Moments.</em></h2>
            <p>From timeless classics to signature creations, our drinks are crafted to complement every bite.</p>
          </div>
          <div className="drinks-intro__visual">
            <img src="/images/drinks-hero-blended-placeholder.webp" alt="Amber cocktail with a citrus garnish" width="1200" height="644" loading="lazy" decoding="async" />
          </div>
        </div>
        <DrinksCarousel items={drinkItems} quantities={quantities} onAdjustQuantity={onAdjustQuantity} />
      </div>
      {orderCount > 0 && (
        <button className="order-badge" type="button" onClick={onOpenOrder} aria-label={`Open your order, ${orderCount} dishes`}>
          <span>YOUR ORDER</span><strong aria-live="polite">{orderCount}</strong>
        </button>
      )}
    </section>
  )
}

