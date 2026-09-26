import React, { useEffect, useState } from 'react'
import RestaurantWordmark from './RestaurantWordmark.jsx'

export default function Hero({ onViewMenu, onViewDrinks }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true)
      return undefined
    }

    const revealTimer = window.setTimeout(() => setRevealed(true), 3150)
    return () => window.clearTimeout(revealTimer)
  }, [])

  return (
    <header className={`hero ${revealed ? 'hero--revealed' : ''}`} id="top">
      <div className="shutter" aria-hidden="true"><div className="shutter__panel shutter__panel--left" /><div className="shutter__panel shutter__panel--right" /><RestaurantWordmark className="shutter__wordmark" /></div>

      <div className="hero__visual">
        <picture>
          <source media="(max-width: 699px)" srcSet="/images/hero-mobile-576.webp 576w, /images/hero-mobile.webp 1152w" sizes="100vw" />
          <img src="/images/hero-desktop.webp" srcSet="/images/hero-desktop.webp 700w, /images/hero-desktop-enhanced.webp 1677w" sizes="100vw" alt="Warmly lit food prepared for a gathering" width="700" height="392" loading="eager" fetchPriority="high" />
        </picture>
      </div>

      <div className="hero__topline">
        <a className="wordmark" href="#top" aria-label="Ember and Stone, back to top">E<span>&</span>S</a>
        <span className="hero__top-note">FIRE · FOOD · FELLOWSHIP</span>
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow"><span className="eyebrow__line" /> A MODERN TABLE</p>
          <h1>Ember <em>&</em><br />Stone<span className="hero__period">.</span></h1>
          <p className="hero__description">Good food has a way of bringing us together. Gather close, stay awhile, and taste what happens when simple things meet the fire.</p>
          <div className="hero__cta-group" aria-label="Explore the menu">
            <button className="hero-cta hero-cta--primary" type="button" onClick={onViewMenu}>
              <span>VIEW MENU</span><span className="button-arrow" aria-hidden="true">↗</span>
            </button>
            <button className="hero-cta hero-cta--secondary" type="button" onClick={onViewDrinks}>
              <span>VIEW DRINKS</span><span className="button-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hero__bottomline">
        <span className="hero__scroll">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
      </div>
    </header>
  )
}