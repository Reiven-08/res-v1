import React, { useEffect, useMemo } from 'react'

const formatPrice = (price) => `$${price.toFixed(2)}`

export default function OrderPanel({ items, quantities, onAdjustQuantity, open, onClose }) {
  const orderItems = useMemo(
    () => items.filter((item) => quantities[item.id] > 0),
    [items, quantities],
  )
  const orderTotal = orderItems.reduce((total, item) => total + item.price * quantities[item.id], 0)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="order-panel-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="order-panel" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <div className="order-panel__header">
          <div>
            <p className="eyebrow">YOUR TABLE</p>
            <h2 id="order-title">Your order</h2>
          </div>
          <button className="order-panel__close" type="button" onClick={onClose} aria-label="Close order">×</button>
        </div>

        {orderItems.length > 0 ? (
          <>
            <ul className="order-list">
              {orderItems.map((item) => {
                const quantity = quantities[item.id]
                return (
                  <li className="order-item" key={item.id}>
                    <div className="order-item__details">
                      <h3>{item.name}</h3>
                      <span>{formatPrice(item.price)} each</span>
                    </div>
                    <div className="order-item__actions">
                      <div className="order-quantity-control" role="group" aria-label={`${item.name} quantity`}>
                        <button type="button" onClick={() => onAdjustQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                        <span aria-live="polite">{quantity}</span>
                        <button type="button" onClick={() => onAdjustQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                      </div>
                      <strong>{formatPrice(item.price * quantity)}</strong>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="order-total"><span>Total</span><strong>{formatPrice(orderTotal)}</strong></div>
          </>
        ) : (
          <div className="order-panel__empty">
            <p>Your order is waiting for its first dish.</p>
            <button type="button" onClick={onClose}>BACK TO MENU</button>
          </div>
        )}
      </aside>
    </div>
  )
}
