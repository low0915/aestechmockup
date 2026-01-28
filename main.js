// ===================================
// AESTECH - Interactive Enhancements
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // ===================================
  // Navbar Scroll Effect
  // ===================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

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
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
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
  const filterItems = document.querySelectorAll('.filter-item');
  const catalogCards = document.querySelectorAll('.product-catalog-card');

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // Update active state
      filterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const filterValue = item.getAttribute('data-filter');

      catalogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';

        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // ===================================
  // Banner Slider Logic
  // ===================================
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

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
    startSlideshow();
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
    // Banner Backgrounds
    { id: 'banner-bg-1', gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d8d8d8 100%)', text: '' },
    { id: 'banner-bg-2', gradient: 'linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%)', text: '' },
    { id: 'banner-bg-3', gradient: 'linear-gradient(135deg, #e5e5e5 0%, #d5d5d5 100%)', text: '' },
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

});
