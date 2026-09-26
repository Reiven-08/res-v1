import React from 'react'

export default function DrinkCard({ item, active, flipped, quantity, onFlip, onAdjustQuantity, onSelect }) {
  const handleCardClick = () => {
    if (active) onFlip()
    else onSelect()
  }

  const stopOrderInteraction = (event) => event.stopPropagation()

  const adjust = (event, amount) => {
    stopOrderInteraction(event)
    onAdjustQuantity(item.id, amount)
  }

  return (
    <div className={`drink-card ${flipped ? 'drink-card--flipped' : ''}`}>
      <div className="drink-card__inner">
        <div className="drink-card__face drink-card__front" aria-hidden={flipped}>
          <button className="drink-card__body" type="button" onClick={handleCardClick} tabIndex={active ? 0 : -1} aria-label={active ? `Flip ${item.name} to see details` : `Show ${item.name}`}>
            <span className="drink-card__visual">
              <img src={item.image} alt={`${item.name} cocktail`} width="1200" height="1000" loading="lazy" decoding="async" draggable="false" />
            </span>
            <span className="drink-card__details">
              <span className="drink-card__title-row"><span className="drink-card__name">{item.name}</span><span className="drink-card__price">${item.price}</span></span>
              <span className="drink-card__description">{item.description}</span>
            </span>
          </button>
          <div className="drink-card__footer" onPointerDown={stopOrderInteraction} onClick={stopOrderInteraction}>
            {quantity > 0 ? (
              <div className="drink-quantity-control" role="group" aria-label={`${item.name} quantity`}>
                <button type="button" onClick={(event) => adjust(event, -1)} tabIndex={active ? 0 : -1} aria-label={`Decrease ${item.name} quantity`}>−</button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={(event) => adjust(event, 1)} tabIndex={active ? 0 : -1} aria-label={`Increase ${item.name} quantity`}>+</button>
              </div>
            ) : (
              <button className="drink-add-button" type="button" onClick={(event) => adjust(event, 1)} tabIndex={active ? 0 : -1} aria-label={`Add ${item.name} to order`}>
                ADD TO ORDER <span aria-hidden="true">+</span>
              </button>
            )}
          </div>
        </div>

        <button className="drink-card__face drink-card__back" type="button" onClick={onFlip} tabIndex={active && flipped ? 0 : -1} aria-label={`Flip ${item.name} back to the front`} aria-hidden={!flipped}>
          <span className="drink-card__back-content">
            <span className="eyebrow">FROM OUR BAR</span>
            <strong>{item.name}</strong>
            <span className="drink-card__back-copy">{item.description}</span>
            <span className="drink-card__ingredients"><b>IN THE GLASS</b>{item.ingredients}</span>
            <span className="drink-card__back-link">← BACK TO DRINK</span>
          </span>
        </button>
      </div>
    </div>
  )
}
