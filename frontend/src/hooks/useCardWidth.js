import { useState, useEffect } from "react"

const useCardWidth = () => {
  const [cardWidth, setCardWidth] = useState(getCardWidth(window.innerWidth))

  function getCardWidth(width) {
    if (width <= 346) return 312
    if (width <= 366) return 332
    if (width <= 376) return 342
    if (width <= 396) return 362
    if (width <= 416) return 382
    if (width <= 436) return 396
    if (width <= 546) return 508
    if (width <= 776) return 358
    if (width <= 826) return 378
    if (width <= 856) return 398
    if (width <= 916) return 428
    if (width <= 1026) return 492
    if (width >= 1300) return 434
    else if (width >= 1400) return 462
    return 386
  }

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth(window.innerWidth))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return cardWidth
}

export default useCardWidth