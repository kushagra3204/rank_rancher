
class SlideshowManager {
  constructor() {
    this.activeSlideshows = new Map();
  }

  createSlideshowHtml(images, id) {
    let slidesHtml = '';
    let dotsHtml = '';
    
    images.forEach((image, index) => {
      slidesHtml += `
        <div class="slideshow-slide" style="${index === 0 ? 'display: flex;' : 'display: none;'}" contenteditable="false">
          <img src="${image.url}" alt="${image.alt}" style="width: 600px;" data-original-width="" data-original-height="" />
        </div>
      `;
      
      dotsHtml += `<span class="slideshow-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`;
    });
    
    return `
      </br>
      <div class="slideshow-container" id="${id}" data-slideshow-initialized="false">
        ${slidesHtml}
        <a class="slideshow-prev" contenteditable="false"><div>&#10094;</div></a>
        <a class="slideshow-next" contenteditable="false"><div>&#10095;</div></a>
        <div class="slideshow-dots" contenteditable="false">
          ${dotsHtml}
        </div>
      </div>
      </br></br>
    `;
  }

  initializeSlideshow(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;

    // Check if already initialized
    if (slideshow.getAttribute('data-slideshow-initialized') === 'true') {
      return;
    }

    const slides = slideshow.querySelectorAll('.slideshow-slide');
    const dots = slideshow.querySelectorAll('.slideshow-dot');
    const prevBtn = slideshow.querySelector('.slideshow-prev');
    const nextBtn = slideshow.querySelector('.slideshow-next');
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;

    let currentSlideIndex = 0;

    const showSlide = (index) => {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      
      slides.forEach(slide => slide.style.display = 'none');
      dots.forEach(dot => dot.classList.remove('active'));
      
      if (slides[index]) {
        slides[index].style.display = 'flex';
      }
      if (dots[index]) {
        dots[index].classList.add('active');
      }
      currentSlideIndex = index;
    };

    // Remove existing event listeners if any
    this.removeEventListeners(slideshowId);

    // Create new event listeners
    const prevHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      showSlide(currentSlideIndex - 1);
    };

    const nextHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      showSlide(currentSlideIndex + 1);
    };

    const dotHandlers = [];
    dots.forEach((dot, index) => {
      const handler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSlide(index);
      };
      dotHandlers.push(handler);
      dot.addEventListener('click', handler);
    });

    // Add event listeners
    prevBtn.addEventListener('click', prevHandler);
    nextBtn.addEventListener('click', nextHandler);

    // Store handlers for cleanup
    this.activeSlideshows.set(slideshowId, {
      prevBtn,
      nextBtn,
      dots: Array.from(dots),
      prevHandler,
      nextHandler,
      dotHandlers
    });

    // Mark as initialized
    slideshow.setAttribute('data-slideshow-initialized', 'true');
  }

  removeEventListeners(slideshowId) {
    const slideshowData = this.activeSlideshows.get(slideshowId);
    if (!slideshowData) return;

    const { prevBtn, nextBtn, dots, prevHandler, nextHandler, dotHandlers } = slideshowData;

    if (prevBtn && prevHandler) {
      prevBtn.removeEventListener('click', prevHandler);
    }
    if (nextBtn && nextHandler) {
      nextBtn.removeEventListener('click', nextHandler);
    }
    
    dots.forEach((dot, index) => {
      if (dotHandlers[index]) {
        dot.removeEventListener('click', dotHandlers[index]);
      }
    });

    this.activeSlideshows.delete(slideshowId);
  }

  initializeAllSlideshows(container) {
    if (!container) return;

    const slideshows = container.querySelectorAll('.slideshow-container');
    
    slideshows.forEach(slideshow => {
      const id = slideshow.id;
      if (id) {
        // Reset initialization flag
        slideshow.setAttribute('data-slideshow-initialized', 'false');
        this.initializeSlideshow(id);
      }
    });
  }

  cleanupAllSlideshows() {
    this.activeSlideshows.forEach((_, slideshowId) => {
      this.removeEventListeners(slideshowId);
    });
    this.activeSlideshows.clear();
  }
}

export default SlideshowManager;