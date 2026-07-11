// Complete Client-side Logic for Luxurious Sulthan Haramain Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Buka Menu');
      } else {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Tutup Menu');
      }
    });

    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Buka Menu');
      });
    });
  }

  // --- 2. Floating Action Widget Scroll Trigger ---
  const floatingWa = document.getElementById('floating-wa');
  if (floatingWa) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        floatingWa.classList.add('show');
      } else {
        floatingWa.classList.remove('show');
      }
    });
  }

  // --- 3. Package Filtering & Tabs System ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const packageCards = document.querySelectorAll('.package-card');
  const compareTableView = document.getElementById('compare-table-view');
  const individualCardsView = document.getElementById('individual-cards-view');

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const targetCategory = btn.getAttribute('data-target');

        if (targetCategory === 'compare') {
          // Show comparison table, hide individual cards grid
          if (compareTableView) compareTableView.style.display = 'block';
          if (individualCardsView) individualCardsView.style.display = 'none';
        } else {
          // Hide comparison table, show individual cards grid
          if (compareTableView) compareTableView.style.display = 'none';
          if (individualCardsView) {
            individualCardsView.style.display = 'grid';
            
            // Filter which card is shown
            packageCards.forEach(card => {
              const category = card.getAttribute('data-category');
              if (category === targetCategory) {
                card.style.display = 'flex';
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                }, 50);
              } else {
                card.style.display = 'none';
                card.style.opacity = '0';
              }
            });
          }
        }
      });
    });
  }

  // --- 4. Interactive Video Lightbox (Slides Player) ---
  const videoLightbox = document.getElementById('video-lightbox');
  const playVideoTrigger = document.getElementById('play-video-trigger');
  const closeVideoModal = document.getElementById('close-video-modal');
  const prevSlideBtn = document.getElementById('btn-prev-slide');
  const nextSlideBtn = document.getElementById('btn-next-slide');
  const slides = document.querySelectorAll('.mock-slide');
  
  let currentSlideIndex = 0;

  function updateSlides() {
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  if (videoLightbox && playVideoTrigger && slides.length > 0) {
    // Open Dialog
    playVideoTrigger.addEventListener('click', () => {
      currentSlideIndex = 0;
      updateSlides();
      videoLightbox.showModal();
    });

    if (closeVideoModal) {
      closeVideoModal.addEventListener('click', () => {
        videoLightbox.close();
      });
    }

    // Prev/Next Nav Controls
    if (prevSlideBtn) {
      prevSlideBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlides();
      });
    }

    if (nextSlideBtn) {
      nextSlideBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlides();
      });
    }

    // Close on clicking backdrop
    videoLightbox.addEventListener('click', (e) => {
      const dialogDims = videoLightbox.getBoundingClientRect();
      if (
        e.clientX < dialogDims.left ||
        e.clientX > dialogDims.right ||
        e.clientY < dialogDims.top ||
        e.clientY > dialogDims.bottom
      ) {
        videoLightbox.close();
      }
    });
  }

  // --- 5. Interactive Price Estimator & Calculator Widget ---
  const calcForm = document.getElementById('interactive-calculator-form');
  const calcSelectPkg = document.getElementById('calc-select-package');
  const calcInputPax = document.getElementById('calc-input-pax');
  const calcTotalDisplay = document.getElementById('calc-total-display');
  const calcPaxDisplay = document.getElementById('calc-pax-display');
  const calcPerksList = document.getElementById('calc-perks-list');

  // Pricing map
  const packagePriceMap = {
    'VIP': 38500000,
    'Reguler': 32700000,
    'Hemat': 28700000
  };

  // Dynamic perks list based on package selection
  const packagePerksMap = {
    'VIP': [
      'Kamar Hotel Bintang 5 di pelataran Ka\'bah (Al Sofwa)',
      'Terbang Langsung (Tanpa Transit)',
      'Bus Eksekutif VIP Nyaman',
      'Ziarah & Keliling Kota Thoif Lengkap',
      'Koper & Perlengkapan Umroh Eksklusif VIP'
    ],
    'Reguler': [
      'Kamar Hotel Bintang 3 - 4',
      'Jarak hotel sangat dekat (150-300 Meter)',
      'Terbang Langsung (Tanpa Transit)',
      'Termasuk Ziarah Kota Thoif',
      'Makan 3x Sehari Menu Nusantara'
    ],
    'Hemat': [
      'Kamar Hotel Bintang 3 Nyaman',
      'Jarak hotel aman berjalan kaki (< 400 Meter)',
      'Terbang Transit (Rute Hemat)',
      'Termasuk Ziarah Kota Thoif',
      'Makan 3x Sehari Citarasa Nusantara'
    ]
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  }

  let currentAnimatedPrice = 77000000; // Initial default for VIP, 2 pax

  function animatePriceChange(targetValue) {
    if (!calcTotalDisplay) return;
    const startValue = currentAnimatedPrice;
    const duration = 450; // ms
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuad curve
      const easeProgress = progress * (2 - progress);
      const val = Math.floor(easeProgress * (targetValue - startValue) + startValue);
      calcTotalDisplay.textContent = formatCurrency(val);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        currentAnimatedPrice = targetValue;
      }
    };
    window.requestAnimationFrame(step);
  }

  function calculatePrice() {
    if (!calcSelectPkg || !calcInputPax || !calcTotalDisplay || !calcPaxDisplay || !calcPerksList) return;

    const selectedPkg = calcSelectPkg.value;
    const paxCount = parseInt(calcInputPax.value, 10) || 1;
    const pricePerPax = packagePriceMap[selectedPkg] || 38500000;
    const total = pricePerPax * paxCount;

    // Update range input label
    const paxValEl = document.getElementById('calc-pax-val');
    if (paxValEl) paxValEl.textContent = `${paxCount} Orang`;

    // Trigger roll-up count animation
    animatePriceChange(total);
    calcPaxDisplay.textContent = `Untuk ${paxCount} Orang Jamaah`;

    // Safe dynamic DOM insertion for perks without innerHTML
    calcPerksList.replaceChildren(); // clear old child nodes safely
    const perks = packagePerksMap[selectedPkg] || [];
    perks.forEach(perkText => {
      const li = document.createElement('li');
      li.textContent = perkText;
      calcPerksList.appendChild(li);
    });
  }

  if (calcSelectPkg && calcInputPax) {
    calcSelectPkg.addEventListener('change', calculatePrice);
    calcInputPax.addEventListener('input', calculatePrice);
    calculatePrice(); // initial render
  }

  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const selectedPkg = calcSelectPkg.value;
      const paxCount = parseInt(calcInputPax.value, 10) || 1;
      const totalCost = formatCurrency(packagePriceMap[selectedPkg] * paxCount);
      
      const textSalam = 'Assalamualaikum, Wr. Wb.';
      const textIntro = 'Saya ingin melakukan kalkulasi pendaftaran Umroh *Sulthan Haramain* dengan rincian berikut:';
      const detailPkg = `• *Pilihan Paket:* Paket ${selectedPkg}`;
      const detailPax = `• *Jumlah Jamaah:* ${paxCount} Orang`;
      const detailCost = `• *Estimasi Total Biaya:* ${totalCost}`;
      const textOutro = 'Mohon bantuan admin untuk konfirmasi ketersediaan kuota kloter terdekat. Terima kasih.';

      const waMsg = `${textSalam}\n\n${textIntro}\n${detailPkg}\n${detailPax}\n${detailCost}\n\n${textOutro}`;
      const encodedMsg = encodeURIComponent(waMsg);
      const waUrl = `https://wa.me/6285371716433?text=${encodedMsg}`; // Default admin wa

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 6. Quick Booking Dialog Form ---
  const bookingModal = document.getElementById('booking-modal');
  const bookingBtns = document.querySelectorAll('.btn-booking');
  const closeModalBtn = document.querySelector('.btn-close-modal');
  const selectedPkgNameSpan = document.getElementById('selected-pkg-name');
  const bookingForm = document.getElementById('booking-form');
  
  let bookingPkgName = 'VIP';

  if (bookingModal && bookingBtns.length > 0 && selectedPkgNameSpan) {
    bookingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        bookingPkgName = btn.getAttribute('data-package') || 'VIP';
        selectedPkgNameSpan.textContent = bookingPkgName;
        bookingModal.showModal();
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        bookingModal.close();
      });
    }

    bookingModal.addEventListener('click', (e) => {
      const dims = bookingModal.getBoundingClientRect();
      if (
        e.clientX < dims.left ||
        e.clientX > dims.right ||
        e.clientY < dims.top ||
        e.clientY > dims.bottom
      ) {
        bookingModal.close();
      }
    });

    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameIn = document.getElementById('input-nama');
        const qtyIn = document.getElementById('input-jumlah');
        const adminIn = document.getElementById('select-admin');

        if (!nameIn || !qtyIn || !adminIn) return;

        const nameVal = nameIn.value.trim();
        const qtyVal = parseInt(qtyIn.value, 10) || 1;
        const phone = adminIn.value;

        if (nameVal.length === 0) {
          alert('Silakan isi nama lengkap Anda.');
          return;
        }

        const msgSalam = 'Assalamualaikum, Wr. Wb.';
        const msgBody = `Saya berniat mendaftar ibadah Umroh *Sulthan Haramain* dengan rincian berikut:`;
        const itemPkg = `• *Pilihan Paket:* ${bookingPkgName}`;
        const itemName = `• *Nama Pendaftar:* ${nameVal}`;
        const itemQty = `• *Jumlah Jamaah:* ${qtyVal} orang`;
        const msgOut = 'Mohon info mengenai syarat dokumen (paspor & vaksin) serta metode pembayarannya. Terima kasih.';

        const fullMsg = `${msgSalam}\n\n${msgBody}\n${itemPkg}\n${itemName}\n${itemQty}\n\n${msgOut}`;
        const encMsg = encodeURIComponent(fullMsg);
        const finalUrl = `https://wa.me/${phone}?text=${encMsg}`;

        bookingForm.reset();
        bookingModal.close();
        
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  // --- 7. Section Scroll Active State Highlighting ---
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let activeSectionId = '';
      const scrollPos = window.scrollY + 180;

      sections.forEach(section => {
        const top = section.offsetTop;
        const ht = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + ht) {
          activeSectionId = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${activeSectionId}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // --- 8. WIPA-Style Mini-Slideshow logic ---
  const miniSlides = document.getElementById('mini-slides');
  const miniPrevBtn = document.getElementById('mini-prev');
  const miniNextBtn = document.getElementById('mini-next');
  let currentMiniSlideIndex = 0;
  const totalMiniSlides = 3;

  function updateMiniSlideshow() {
    if (!miniSlides) return;
    miniSlides.style.transform = `translateX(-${currentMiniSlideIndex * 33.333}%)`;
  }

  if (miniSlides && miniPrevBtn && miniNextBtn) {
    miniPrevBtn.addEventListener('click', () => {
      currentMiniSlideIndex = (currentMiniSlideIndex > 0) ? currentMiniSlideIndex - 1 : totalMiniSlides - 1;
      updateMiniSlideshow();
    });

    miniNextBtn.addEventListener('click', () => {
      currentMiniSlideIndex = (currentMiniSlideIndex < totalMiniSlides - 1) ? currentMiniSlideIndex + 1 : 0;
      updateMiniSlideshow();
    });

    // Auto-slide every 6 seconds
    setInterval(() => {
      currentMiniSlideIndex = (currentMiniSlideIndex < totalMiniSlides - 1) ? currentMiniSlideIndex + 1 : 0;
      updateMiniSlideshow();
    }, 6000);
  }

  // --- 9. Interactive FAQ Accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(q => {
      q.addEventListener('click', () => {
        const isOpen = q.getAttribute('aria-expanded') === 'true';
        
        // Collapse all other questions for a neat accordion effect
        faqQuestions.forEach(other => {
          other.setAttribute('aria-expanded', 'false');
          const answer = other.nextElementSibling;
          if (answer) answer.style.maxHeight = null;
        });

        // Toggle selected question
        if (!isOpen) {
          q.setAttribute('aria-expanded', 'true');
          const answer = q.nextElementSibling;
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + "px";
          }
        }
      });
    });
  }

  // --- 10. Scroll-Reveal Animation Observer ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -50px 0px" // Start animating slightly before entering view
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }
});

