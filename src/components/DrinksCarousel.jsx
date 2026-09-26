import React, { useRef, useState } from 'react'
import DrinkCard from './DrinkCard.jsx'

const SWIPE_THRESHOLD = 50

export default function DrinksCarousel({ items, quantities, onAdjustQuantity }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flippedId, setFlippedId] = useState(null)
  const gesture = useRef(null)
  const suppressClick = useRef(false)

  const move = (direction) => {
    setFlippedId(null)
    setActiveIndex((index) => (index + direction + items.length) % items.length)
  }

  const select = (index) => {
    if (suppressClick.current) return
    setFlippedId(null)
    setActiveIndex(index)
  }

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    gesture.current = { x: event.clientX, y: event.clientY, moved: false, horizontal: false }
    suppressClick.current = false
  }

  const onPointerMove = (event) => {
    const start = gesture.current
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (!start.moved && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
      start.moved = true
      start.horizontal = Math.abs(dx) > Math.abs(dy) * 1.2
    }
    if (start.moved) suppressClick.current = true
  }

  const onPointerUp = (event) => {
    const start = gesture.current
    gesture.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (start.horizontal && Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
      suppressClick.current = true
      move(dx < 0 ? 1 : -1)
    }
    if (suppressClick.current) window.setTimeout(() => { suppressClick.current = false }, 80)
  }

  return (
    <div className="drinks-carousel">
      <div className="drinks-carousel__stage" role="group" aria-label="Featured drinks carousel" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={() => { gesture.current = null }} onClickCapture={(event) => { if (suppressClick.current) { event.stopPropagation(); event.preventDefault() } }}>
        {items.map((item, index) => {
          let offset = index - activeIndex
          if (offset > items.length / 2) offset -= items.length
          if (offset < -items.length / 2) offset += items.length
          const active = offset === 0
          const side = Math.abs(offset) === 1
          return (
            <div className={`drinks-carousel__slot ${active ? 'drinks-carousel__slot--active' : side ? 'drinks-carousel__slot--side' : 'drinks-carousel__slot--hidden'}`} style={{ '--offset': offset, '--side': offset < 0 ? -1 : 1 }} key={item.id} aria-hidden={!active && !side}>
              <DrinkCard item={item} active={active} flipped={active && flippedId === item.id} quantity={quantities[item.id] || 0} onFlip={() => { if (!suppressClick.current) setFlippedId((current) => current === item.id ? null : item.id) }} onSelect={() => select(index)} onAdjustQuantity={onAdjustQuantity} />
            </div>
          )
        })}
      </div>
      <div className="drinks-carousel__controls">
        <button type="button" className="drinks-carousel__arrow" onClick={() => move(-1)} aria-label="Previous drink">←</button>
        <span className="drinks-carousel__counter"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span> / {String(items.length).padStart(2, '0')}</span></span>
        <button type="button" className="drinks-carousel__arrow" onClick={() => move(1)} aria-label="Next drink">→</button>
      </div>
      <p className="drinks-carousel__hint">SWIPE TO EXPLORE <span aria-hidden="true">·</span> TAP A DRINK FOR DETAILS</p>
    </div>
  )
}
