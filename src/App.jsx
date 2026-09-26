import React, { useState } from 'react'
import Hero from './components/Hero.jsx'
import MenuSection from './components/MenuSection.jsx'
import DrinksSection from './components/DrinksSection.jsx'
import OrderPanel from './components/OrderPanel.jsx'
import Footer from './components/Footer.jsx'
import { menuItems } from './data/menuData.js'
import { drinkItems } from './data/drinksData.js'

export default function App() {
  const [quantities, setQuantities] = useState({})
  const [orderOpen, setOrderOpen] = useState(false)
  const orderCount = Object.values(quantities).reduce((total, quantity) => total + quantity, 0)

  const viewMenu = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('menu')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  const viewDrinks = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('drinks')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  const adjustQuantity = (id, amount) => {
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] || 0) + amount)
      if (nextQuantity === 0) {
        const { [id]: removed, ...rest } = current
        return rest
      }
      return { ...current, [id]: nextQuantity }
    })
  }

  return (
    <>
      <Hero onViewMenu={viewMenu} onViewDrinks={viewDrinks} />
      <MenuSection quantities={quantities} onAdjustQuantity={adjustQuantity} orderCount={orderCount} onOpenOrder={() => setOrderOpen(true)} />
      <DrinksSection quantities={quantities} onAdjustQuantity={adjustQuantity} orderCount={orderCount} onOpenOrder={() => setOrderOpen(true)} />
      <Footer />
      <OrderPanel items={[...menuItems, ...drinkItems]} quantities={quantities} onAdjustQuantity={adjustQuantity} open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  )
}
