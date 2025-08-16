import "./GigCardSkeleton.css"

const GigCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image-container">
        <div className="skeleton-image"></div>
        <div className="skeleton-navigation">
          <span className="skeleton-dot"></span>
          <span className="skeleton-dot"></span>
          <span className="skeleton-dot"></span>
        </div>
      </div>

      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text-line"></div>
        <div className="skeleton-text-line short"></div>
      </div>
    </div>
  )
}

export default GigCardSkeleton