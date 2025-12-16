// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Wrap around if needed
        if (n >= testimonialSlides.length) currentSlide = 0;
        if (n < 0) currentSlide = testimonialSlides.length - 1;
        
        // Show current slide
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Auto-rotate testimonials
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval on manual navigation
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners for slider controls
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
        
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const catalogForm = document.getElementById('catalogForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send this data to a server
            alert('Thank you for your inquiry! We will contact you within 24 hours.');
            this.reset();
        });
    }
    
    if (catalogForm) {
        catalogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, this would trigger a file download
            alert('Catalog download link has been sent to your email!');
            this.reset();
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                alert('Search functionality would be implemented here. Search term: ' + this.value);
                this.value = '';
            }
        });
    }
    
    // Theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Change theme');
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background-color: var(--primary-color);
        color: var(--light-color);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: var(--transition);
    `;
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    themeToggle.addEventListener('click', function() {
        const root = document.documentElement;
        const currentPrimary = getComputedStyle(root).getPropertyValue('--primary-color').trim();
        
        if (currentPrimary === '#2c3e50') {
            // Switch to Healthcare theme
            root.style.setProperty('--primary-color', '#1a237e');
            root.style.setProperty('--secondary-color', '#00bcd4');
            root.style.setProperty('--accent-color', '#ff5722');
            root.style.setProperty('--education-color', '#4caf50');
            root.style.setProperty('--contracting-color', '#ff9800');
        } else {
            // Switch back to default theme
            root.style.setProperty('--primary-color', '#2c3e50');
            root.style.setProperty('--secondary-color', '#3498db');
            root.style.setProperty('--accent-color', '#e74c3c');
            root.style.setProperty('--education-color', '#27ae60');
            root.style.setProperty('--contracting-color', '#f39c12');
        }
    });
    
    document.body.appendChild(themeToggle);
    
    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});