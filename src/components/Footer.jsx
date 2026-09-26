import React from 'react'
import RestaurantWordmark from './RestaurantWordmark.jsx'

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Ember and Stone footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <RestaurantWordmark />
            <p>Good food. Good fire. Good company.</p>
          </div>

          <nav className="site-footer__column" aria-label="Explore">
            <h2>EXPLORE</h2>
            <a href="#top">Home</a>
            <a href="#menu">Menu</a>
            <a href="#drinks">Drinks</a>
          </nav>

          <div className="site-footer__column">
            <h2>VISIT</h2>
            <span>Location</span>
            <span>Opening Hours</span>
          </div>

          <div className="site-footer__column">
            <h2>CONNECT</h2>
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <small>© 2026 Ember &amp; Stone. All rights reserved.</small>
          <a className="site-footer__top-link" href="#top">BACK TO TOP <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  )
}