document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // BACK TO TOP
  // -----------------------------
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -----------------------------
  // LIGHTBOX
  // -----------------------------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    const images = document.querySelectorAll('.project-content img, .section img, .section-4 img');
    images.forEach(img => {
      img.addEventListener('click', e => {
        e.preventDefault();
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // -----------------------------
  // CAROUSEL
  // -----------------------------
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const btnLeft = carousel.querySelector(".carousel-btn.left");
    const btnRight = carousel.querySelector(".carousel-btn.right");
    let currentIndex = 0;

    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      if (slideWidth < 10) return;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    window.addEventListener("load", updateCarousel);
    window.addEventListener("resize", updateCarousel);

    if (btnLeft) btnLeft.addEventListener("click", () => {
      currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
      updateCarousel();
    });

    if (btnRight) btnRight.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
      }
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }
    });
  });

  // -----------------------------
  // MARQUEE
  // -----------------------------
  const marquee = document.querySelector('.marquee');
  if (marquee) {
    const track = marquee.querySelector('.marquee-track');
    const item = track.querySelector('.marquee-item');

    function initMarquee() {
      const containerWidth = marquee.clientWidth;
      while (track.scrollWidth < containerWidth * 2) {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
        if (track.children.length > 50) break;
      }
      const firstWidth = item.getBoundingClientRect().width;
      track.style.setProperty('--shift', firstWidth + 'px');
      const speedPxPerSec = 120;
      const durationSeconds = Math.max(6, firstWidth / speedPxPerSec);
      track.style.setProperty('--duration', durationSeconds + 's');
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initMarquee).catch(initMarquee);
    } else {
      window.addEventListener('load', initMarquee);
      setTimeout(initMarquee, 300);
    }

    window.addEventListener('resize', () => {
      while (track.children.length > 1) track.removeChild(track.lastChild);
      initMarquee();
    });
  }

  // -----------------------------
  // AVANT / APRES SLIDER
  // -----------------------------
  document.querySelectorAll('.ba-container').forEach(container => {
    const afterImg = container.querySelector('.after');
    const slider = container.querySelector('.ba-slider');

    function slide(x) {
      const rect = container.getBoundingClientRect();
      let position = x - rect.left;
      position = Math.max(0, Math.min(position, rect.width));
      afterImg.style.clipPath = `inset(0 0 0 ${position}px)`;
      slider.style.left = position + "px";
    }

    container.addEventListener('mousemove', e => slide(e.clientX));
    container.addEventListener('touchmove', e => slide(e.touches[0].clientX));
  });

  // -----------------------------
  // MENU DÉROULANT
  // -----------------------------
  const toggle = document.querySelector('.dropdown-toggle');
  const menu = document.querySelector('.dropdown-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

});
