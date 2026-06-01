/**
 * SMART PORTFOLIO - VANILLA JS INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================================================
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => bar.removeAttribute('style'));
            });
        });
    }

    // ==========================================================================
    // 2. SCROLL REVEAL (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once animated, no need to observe again
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 3. SKILL PROGRESS BAR ANIMATION (Intersection Observer)
    // ==========================================================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const competenciesCard = document.querySelector('.competencies-card');

    if (competenciesCard && skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        skillObserver.observe(competenciesCard);
    }

    // ==========================================================================
    // 4. K-MOVE GALLERY SLIDER (Carousel)
    // ==========================================================================
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideTimer;

    const showSlide = (index) => {
        // Handle out-of-bound indices
        if (index >= totalSlides) currentSlide = 0;
        else if (index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;

        // Toggle active slide class
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Toggle active indicator class
        indicators.forEach((indicator, i) => {
            if (i === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };

    const startSlideShow = () => {
        stopSlideShow();
        slideTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6000); // Rotate slides every 6 seconds
    };

    const stopSlideShow = () => {
        if (slideTimer) clearInterval(slideTimer);
    };

    if (slides.length > 0) {
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                startSlideShow(); // Reset timer
            });
        }

        // Prev button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                startSlideShow(); // Reset timer
            });
        }

        // Indicator click
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-slide'));
                showSlide(targetIndex);
                startSlideShow(); // Reset timer
            });
        });

        // Start auto rotation
        startSlideShow();

        // Pause rotation on hover
        const sliderWrapper = document.querySelector('.gallery-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', stopSlideShow);
            sliderWrapper.addEventListener('mouseleave', startSlideShow);
        }
    }

    // ==========================================================================
    // 5. NAV LINK ACTIVE ON SCROLL & SMOOTH SCROLL HIGHLIGHT
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const handleScrollActiveMenu = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for header height
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
        
        // Special check for hero section scroll back to top
        if (scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-menu a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    };

    window.addEventListener('scroll', handleScrollActiveMenu);
});
