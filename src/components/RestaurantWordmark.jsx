import React from 'react'

export default function RestaurantWordmark({ className = '' }) {
  return (
    <span className={`restaurant-wordmark ${className}`.trim()} aria-label="Ember and Stone">
      <span>EMBER</span><span className="restaurant-wordmark__ampersand">&amp;</span><span>STONE</span>
    </span>
  )
}