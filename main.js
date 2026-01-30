// ===================================
// AESTECH - Interactive Enhancements
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // ===================================
  // Banner Slider Logic (Scoped)
  // ===================================
  const bannerSlider = document.querySelector('.product-banner-slider');
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  if (bannerSlider && slides.length > 0) {
    console.log("Initializing Banner Slider");

    function showSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Add active class to current slide and dot
      if (slides[index]) {
        slides[index].classList.add('active');
      }
      if (dots[index]) {
        dots[index].classList.add('active');
      }

      currentSlide = index;
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    // Auto-advance slides every 5 seconds
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
      clearInterval(slideInterval);
    }

    // Manual navigation with dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopSlideshow();
        showSlide(index);
        startSlideshow();
      });
    });

    // ===================================
    // Drag and Touch Support for Slider
    // ===================================
    const slider = document.querySelector('.product-banner-slider');
    let isDragging = false;
    let startX = 0;
    let moveX = 0;

    function handleDragStart(e) {
      isDragging = true;
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      slider.style.cursor = 'grabbing';
      stopSlideshow();
    }

    function handleDragMove(e) {
      if (!isDragging) return;
      moveX = (e.type === 'touchmove' ? e.touches[0].clientX : e.clientX) - startX;
    }

    function handleDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      slider.style.cursor = 'grab';

      // Threshold for slide change (50 pixels)
      if (moveX > 50) {
        // Prev slide
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
      } else if (moveX < -50) {
        // Next slide
        nextSlide();
      }

      moveX = 0;
      startSlideshow();
    }

    if (slider) {
      // Mouse events
      slider.addEventListener('mousedown', handleDragStart);
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);

      // Touch events
      slider.addEventListener('touchstart', handleDragStart);
      slider.addEventListener('touchmove', handleDragMove);
      slider.addEventListener('touchend', handleDragEnd);
    }

    // Start the slideshow if slides exist
    if (slides.length > 0) {
      showSlide(0); // Ensure first slide is active
      startSlideshow();
    }
  }

  // Navbar Scroll Effect
  // ===================================
  const navbar = document.getElementById('navbar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ===================================
  // Smooth Scroll for Navigation Links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===================================
  // Intersection Observer for Fade-in Animations
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe section titles
  document.querySelectorAll('.section-title').forEach(el => {
    observer.observe(el);
  });

  // Observe product cards with stagger effect
  const productCards = document.querySelectorAll('.product-card, .product-catalog-card');
  productCards.forEach((card, index) => {
    // Only set initial styles if not already visible/active
    if (window.getComputedStyle(card).opacity === '1') return;

    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.transitionDelay = `${(index % 9) * 0.05}s`;
    observer.observe(card);
  });

  // Observe strategy items with stagger effect
  const strategyItems = document.querySelectorAll('.strategy-item');
  strategyItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(item);
  });

  // Observe testimonial cards with stagger effect
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // ===================================
  // Description Expansion Logic
  // ===================================
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      parent.classList.toggle('active');
      btn.textContent = parent.classList.contains('active') ? 'Hide Description' : 'View Description';
    });
  });

  // ===================================
  // Product Filtering Logic
  // ===================================
  // ===================================
  // Product Filtering & Pagination Logic
  // ===================================
  const filterItems = document.querySelectorAll('.filter-item');
  const catalogCards = document.querySelectorAll('.product-catalog-card');
  const paginationContainer = document.getElementById('pagination-container');

  const ITEMS_PER_PAGE = 9;
  let currentPage = 1;
  let currentFilter = 'all';

  function renderPagination() {
    currentPage = 1; // Reset to page 1 on filter change
    updateDisplay();
  }

  function updateDisplay() {
    // 1. Identify which cards match the current filter
    const matches = [];
    catalogCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (currentFilter === 'all' || category === currentFilter) {
        matches.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    // 2. Calculate pagination slices
    const totalItems = matches.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    // Ensure currentPage is valid
    if (currentPage > totalPages) currentPage = totalPages || 1;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // 3. Show/Hide items based on page slice
    matches.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = 'block';
        // Reset observer to trigger animation if card was already observed
        observer.unobserve(card);
        observer.observe(card);
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
      }
    });

    // 4. Render Pagination Controls
    if (totalPages > 1) {
      let paginationHTML = `
        <button class="nav-prev" ${currentPage === 1 ? 'disabled' : ''}>&larr; Prev</button>
        <div class="page-numbers">
      `;

      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<span class="page-num ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</span>`;
      }

      paginationHTML += `
        </div>
        <button class="nav-next" ${currentPage === totalPages ? 'disabled' : ''}>Next &rarr;</button>
      `;

      paginationContainer.innerHTML = paginationHTML;
      paginationContainer.style.display = 'flex';

      // Attach event listeners to new controls
      const newPrev = paginationContainer.querySelector('.nav-prev');
      const newNext = paginationContainer.querySelector('.nav-next');
      const newPages = paginationContainer.querySelectorAll('.page-num');

      newPrev.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          updateDisplay();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

      newNext.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          updateDisplay();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

      newPages.forEach(p => {
        p.addEventListener('click', (e) => {
          const page = parseInt(e.target.dataset.page);
          if (page !== currentPage) {
            currentPage = page;
            updateDisplay();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });

    } else {
      paginationContainer.innerHTML = '';
      paginationContainer.style.display = 'none';
    }
  }

  // Initial Render
  if (paginationContainer) updateDisplay();

  // Filter Click Events
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // Update active state
      filterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Update Filter Value
      currentFilter = item.getAttribute('data-filter');

      // Reset and Render
      renderPagination();
    });
  });

  // ===================================
  // Home Page Product Filtering
  // ===================================
  const homeFilterItems = document.querySelectorAll('.home-filter-item');
  const homeCarousel = document.getElementById('home-products-carousel');

  // Data for different categories using real images from folders
  const categoryContent = {
    skin: [
      { id: 'home-p1', title: 'Acne Series', imgPath: 'images/Skin/Acne Series/Skin Care_30.png' },
      { id: 'home-p2', title: 'Whitening Series', imgPath: 'images/Skin/Whitening Series/Skin Care_56.png' },
      { id: 'home-p3', title: 'Anti Aging Series', imgPath: 'images/Skin/Anti Aging Series/Skin Care_13.png' },
      { id: 'home-p4', title: 'Sensitive Series', imgPath: 'images/Skin/Sensitive Series/Skin Care_21.png' }
    ],
    body: [
      { id: 'home-p5', title: 'Body Care Series', imgPath: 'images/Body/Body Care Series/Skin Care_38.png' },
      { id: 'home-p6', title: 'Body Care Series', imgPath: 'images/Body/Body Care Series/Skin Care_39.png' },
      { id: 'home-p7', title: 'Body Care Series', imgPath: 'images/Body/Body Care Series/Skin Care_40.png' }
    ],
    hair: [
      { id: 'home-p8', title: 'Scalp Care Series', imgPath: 'images/Hair/Scalp Care Series/Skin Care_48.png' },
      { id: 'home-p9', title: 'Hair Growth Series', imgPath: 'images/Hair/Hair Growth Series/Skin Care_46.png' },
      { id: 'home-p10', title: 'Scalp Care Series', imgPath: 'images/Hair/Scalp Care Series/Skin Care_49.png' }
    ],
    all: [
      { id: 'home-p1', title: 'Acne Series', imgPath: 'images/Skin/Acne Series/Skin Care_30.png' },
      { id: 'home-p5', title: 'Body Care', imgPath: 'images/Body/Body Care Series/Skin Care_38.png' },
      { id: 'home-p8', title: 'Scalp Care', imgPath: 'images/Hair/Scalp Care Series/Skin Care_48.png' },
      { id: 'home-p2', title: 'Whitening', imgPath: 'images/Skin/Whitening Series/Skin Care_56.png' }
    ]
  };

  homeFilterItems.forEach(item => {
    item.addEventListener('click', () => {
      // update active state
      homeFilterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const filterKey = item.getAttribute('data-filter');
      updateCarousel(filterKey);
    });
  });

  function updateCarousel(category) {
    if (!homeCarousel) return;

    // Fade out
    homeCarousel.style.opacity = '0';
    homeCarousel.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
      // Clear existing content (keep the references if needed, but here simple innerHTML rebuild is fine for a mockup)
      // Note: In a real app we might diff or reorder DOM nodes to preserve state

      const items = categoryContent[category] || categoryContent['skin'];

      let html = '';
      items.forEach(item => {
        html += `
          <div class="home-product-wrapper">
            <div class="home-product-card">
              <div class="home-product-image">
                <img src="${item.imgPath}" alt="${item.title}" id="${item.id}_dynamic">
              </div>
            </div>
            <p class="home-product-title">${item.title}</p>
          </div>
        `;
      });

      // Add end card
      html += `
        <div class="home-product-wrapper">
          <div class="home-product-card end-card">
            <div class="end-card-content">
              <a href="products.html" class="discover-btn">Discover more →</a>
            </div>
          </div>
          <p class="home-product-title" style="visibility: hidden;">&nbsp;</p>
        </div>
      `;

      homeCarousel.innerHTML = html;

      // Prevent default drag on the dynamic images
      items.forEach(item => {
        const img = document.getElementById(`${item.id}_dynamic`);
        if (img) {
          img.addEventListener('dragstart', (e) => e.preventDefault());
        }
      });

      // Fade in
      homeCarousel.style.opacity = '1';

      // Re-initialize drag support if needed (actually initDrag is on container)
    }, 300);
  }

  // Initial load
  updateCarousel('skin');

  // ===================================
  // Carousel Drag Support (Sleek Momentum Edition)
  // ===================================
  // ===================================
  // Reusable Carousel Drag Support
  // ===================================
  function initDrag(element) {
    if (!element) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let animationId = null;

    const stopMomentum = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const beginMomentum = () => {
      if (Math.abs(velocity) < 0.5) return;

      element.scrollLeft -= velocity;
      velocity *= 0.95; // Friction

      animationId = requestAnimationFrame(beginMomentum);
    };

    // Prevent default browser image dragging
    element.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    element.addEventListener('mousedown', (e) => {
      isDown = true;
      element.classList.add('active-drag');
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      lastX = e.pageX;
      velocity = 0;
      stopMomentum();
    });

    element.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        element.classList.remove('active-drag');
        beginMomentum();
      }
    });

    element.addEventListener('mouseup', () => {
      isDown = false;
      element.classList.remove('active-drag');
      beginMomentum();
    });

    element.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX);
      element.scrollLeft = scrollLeft - walk;

      // Track velocity
      velocity = e.pageX - lastX;
      lastX = e.pageX;
    });

    // Touch events
    element.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      lastX = e.touches[0].pageX;
      velocity = 0;
      stopMomentum();
    }, { passive: true });

    element.addEventListener('touchend', () => {
      isDown = false;
      beginMomentum();
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX);
      element.scrollLeft = scrollLeft - walk;

      velocity = e.touches[0].pageX - lastX;
      lastX = e.touches[0].pageX;
    }, { passive: true });
  }

  // Initialize Product Carousel
  initDrag(homeCarousel);

  // ===================================
  // Testimonial Carousel Logic
  // ===================================
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialProgress = document.getElementById('testimonial-progress-fill');
  const carouselTestimonialCards = document.querySelectorAll('.testimonial-card');

  if (testimonialTrack && testimonialProgress) {
    // Enable Drag
    initDrag(testimonialTrack);

    // Arrow Controls
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (prevBtn && nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.testimonial-card'); // Refresh list
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // var(--space-md)
        const maxScroll = testimonialTrack.scrollWidth - testimonialTrack.clientWidth;

        if (testimonialTrack.scrollLeft >= maxScroll - 10) {
          testimonialTrack.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testimonialTrack.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        }
      });

      prevBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.testimonial-card'); // Refresh list
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // var(--space-md)
        const maxScroll = testimonialTrack.scrollWidth - testimonialTrack.clientWidth;

        if (testimonialTrack.scrollLeft <= 10) {
          testimonialTrack.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          testimonialTrack.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        }
      });
    }

    // Improve Active State Logic to be more forgiving at ends
    let testimonialTicking = false;
    testimonialTrack.addEventListener('scroll', () => {
      if (!testimonialTicking) {
        window.requestAnimationFrame(() => {
          const cards = document.querySelectorAll('.testimonial-card');
          const scrollLeft = testimonialTrack.scrollLeft;
          const maxScroll = testimonialTrack.scrollWidth - testimonialTrack.clientWidth;

          // Update Progress Bar
          const percent = (scrollLeft / maxScroll) * 100;
          const maxTranslate = 100 - (100 / cards.length); // Dynamic track width
          const movePercent = (scrollLeft / maxScroll) * maxTranslate;
          testimonialProgress.style.width = `${100 / cards.length}%`; // Adjust bar width
          testimonialProgress.style.left = `${Math.min(Math.max(movePercent, 0), maxTranslate)}%`;

          // Update Active State
          const trackRect = testimonialTrack.getBoundingClientRect();
          cards.forEach(card => {
            const cardWidth = card.offsetWidth;
            const cardRelativeLeft = card.getBoundingClientRect().left - trackRect.left;

            // If card is roughly at the start of the visible area
            if (Math.abs(cardRelativeLeft) < cardWidth / 2) {
              cards.forEach(c => c.classList.remove('active'));
              card.classList.add('active');
            }
          });
          testimonialTicking = false;
        });
        testimonialTicking = true;
      }
    }, { passive: true });
  }

  // ===================================
  // Generate Placeholder Images
  // ===================================
  const imageConfigs = [
    { id: 'about-img', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)', text: 'LABORATORY' },
    { id: 'product-serums', gradient: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)', text: 'SERUMS' },
    { id: 'product-moisturizers', gradient: 'linear-gradient(135deg, #f8f8f8 0%, #ececec 100%)', text: 'HYDRATION' },
    { id: 'product-cleansers', gradient: 'linear-gradient(135deg, #fafafa 0%, #e8e8e8 100%)', text: 'CLEANSERS' },
    { id: 'product-treatments', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #efefef 100%)', text: 'TREATMENTS' },
    // Home Page Carousel
    { id: 'home-p1', gradient: 'linear-gradient(135deg, #f0f0f0 0%, #dddddd 100%)', text: 'ACNE' },
    { id: 'home-p2', gradient: 'linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)', text: 'WHITE' },
    { id: 'home-p3', gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)', text: 'AGE' },
    { id: 'home-p4', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', text: 'SENS' },
    { id: 'home-p4', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', text: 'SENS' },
    // Banner Backgrounds handled in CSS now
    // Catalog Images
    { id: 'catalog-p1', gradient: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)', text: 'TONIC' },
    { id: 'catalog-p2', gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d8d8d8 100%)', text: 'OIL' },
    { id: 'catalog-p3', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', text: 'WASH' },
    { id: 'catalog-p4', gradient: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)', text: 'SERUM' },
    { id: 'catalog-p5', gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d8d8d8 100%)', text: 'CAPSULE' },
    { id: 'catalog-p6', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', text: 'BODY' },
    // Client Avatars
    { id: 'client1', gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)', text: 'SC' },
    { id: 'client2', gradient: 'linear-gradient(135deg, #e0e0e0 0%, #c8c8c8 100%)', text: 'MR' },
    { id: 'client3', gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)', text: 'ET' }
  ];

  imageConfigs.forEach(config => {
    const element = document.getElementById(config.id);
    if (element) {
      // Check if it's an img or a div (banner background)
      if (element.tagName === 'IMG') {
        createPlaceholderImage(element, config.gradient, config.text);
      } else {
        // For banner backgrounds (divs), set as CSS background
        createPlaceholderBackground(element, config.gradient);
      }
    }
  });

  function createPlaceholderImage(imgElement, gradient, text) {
    const parent = imgElement.parentElement;
    const width = parent.offsetWidth || 800;
    const height = parent.offsetHeight || 600;

    const canvas = document.createElement('canvas');
    canvas.width = width * 2; // Higher resolution
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // Parse gradient colors
    if (gradient.includes('135deg')) {
      const colors = gradient.match(/#[0-9a-f]{6}/gi);
      if (colors && colors.length >= 2) {
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1]);
      }
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle texture
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.02})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 3,
        Math.random() * 3
      );
    }

    // Add text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.font = `${canvas.width / 8}px 'Cormorant Garamond', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert to image
    imgElement.src = canvas.toDataURL('image/png');
    imgElement.style.opacity = '1';
  }

  function createPlaceholderBackground(divElement, gradient) {
    const width = divElement.offsetWidth || 1920;
    const height = divElement.offsetHeight || 500;

    const canvas = document.createElement('canvas');
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // Parse gradient colors
    if (gradient.includes('135deg')) {
      const colors = gradient.match(/#[0-9a-f]{6}/gi);
      if (colors && colors.length >= 2) {
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1]);
      }
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle texture
    for (let i = 0; i < 2000; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.015})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 4,
        Math.random() * 4
      );
    }

    // Set as background
    divElement.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
  }

  // ===================================
  // Parallax Effect for Hero
  // ===================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }

  // ===================================
  // Product Card Hover Enhancement
  // ===================================
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===================================
  // Console Branding
  // ===================================
  console.log('%cAESTECH', 'font-size: 48px; font-weight: 400; font-family: "Outfit", sans-serif; color: #000;');
  console.log('%cLaboratory-Crafted Skincare Excellence', 'font-size: 14px; font-weight: 300; font-family: "Inter", sans-serif; color: #4A4A4A; letter-spacing: 0.1em;');

  // ===================================
  // Mobile Navigation Toggle
  // ===================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

});
