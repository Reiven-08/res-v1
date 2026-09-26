import React from 'react'

export default function FoodCard({ item, active, flipped, quantity, onFlip, onAdjustQuantity, onSelect }) {
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
    <div className={`food-card ${flipped ? 'food-card--flipped' : ''}`}>
      <div className="food-card__inner">
        <div className="food-card__face food-card__front" aria-hidden={flipped}>
          <button className="food-card__body" type="button" onClick={handleCardClick} tabIndex={active ? 0 : -1} aria-label={active ? `Flip ${item.name} to see details` : `Show ${item.name}`}>
            <span className="food-card__image-frame">
              <img className={`food-card__image food-card__image--${item.imagePosition}`} src={item.image} alt={item.name} width="1024" height="1024" draggable="false" />
            </span>
            <span className="food-card__details">
              <span className="food-card__name">{item.name}</span>
              <span className="food-card__price">${item.price}</span>
            </span>
          </button>
          <div className="food-card__footer" onPointerDown={stopOrderInteraction} onClick={stopOrderInteraction}>
            {quantity > 0 ? (
              <div className="card-quantity-control" role="group" aria-label={`${item.name} quantity`}>
                <button type="button" onClick={(event) => adjust(event, -1)} tabIndex={active ? 0 : -1} aria-label={`Decrease ${item.name} quantity`}>−</button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={(event) => adjust(event, 1)} tabIndex={active ? 0 : -1} aria-label={`Increase ${item.name} quantity`}>+</button>
              </div>
            ) : (
              <button className="add-button" type="button" onClick={(event) => adjust(event, 1)} tabIndex={active ? 0 : -1} aria-label={`Add ${item.name} to order`}>
                ADD TO ORDER <span aria-hidden="true">+</span>
              </button>
            )}
          </div>
        </div>

        <button className="food-card__face food-card__back" type="button" onClick={onFlip} tabIndex={active && flipped ? 0 : -1} aria-label={`Flip ${item.name} back to the front`} aria-hidden={!flipped}>
          <div className="food-card__back-content">
            <p className="eyebrow">FROM OUR KITCHEN</p>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="food-card__ingredients"><span>THE GOOD STUFF</span><p>{item.ingredients}</p></div>
            <span className="text-button">← BACK TO DISH</span>
          </div>
        </button>
      </div>
    </div>
  )
}
