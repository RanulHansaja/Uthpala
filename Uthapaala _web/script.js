// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// ===== THEME TOGGLE FUNCTIONALITY =====
let currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeToggleIcon('dark');
    }
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-quart'
    });
    
    // Initialize other functions
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initFormSubmission();
    initMobileMenu();
    initFloatingElements();
    initTypingEffect();
});

// Theme toggle click handler
themeToggle.addEventListener('click', function() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeToggleIcon('dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        updateThemeToggleIcon('light');
    }
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});

// Update theme toggle icon
function updateThemeToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(247, 250, 252, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(31, 38, 135, 0.1)';
            
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(26, 32, 44, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.25)';
            navbar.style.boxShadow = 'none';
            
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(26, 32, 44, 0.8)';
            }
        }
    });
}

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add stagger animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
                
                // Add counter animation for stats
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.glass-card, .project-card, .stat-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    const finalNumber = parseInt(numberElement.textContent);
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current) + '+';
    }, 16);
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        menuOpen = !menuOpen;
        
        // Toggle menu visibility
        if (menuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(247, 250, 252, 0.95)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.padding = '20px';
            navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.18)';
            
            if (currentTheme === 'dark') {
                navLinks.style.background = 'rgba(26, 32, 44, 0.95)';
            }
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            navLinks.style.display = 'none';
            
            // Reset hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link') && window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            menuOpen = false;
            
            // Reset hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ===== CONTACT FORM SUBMISSION =====
function initFormSubmission() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(135deg, #48bb78, #38a169)' : 'linear-gradient(135deg, #f56565, #e53e3e)'};
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// ===== FLOATING ELEMENTS ANIMATION =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Random animation delay
        element.style.animationDelay = `${index * 2}s`;
        
        // Mouse interaction
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.3';
        });
    });
}

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    const roles = [
        'Undergraduate University of Eastern',
        'Creative Thinker',
        'UI/UX Designer',
        'Problem Solver',
        
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine typing speed
        let typeSpeed = isDeleting ? 50 : 100;
        
        // If word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect after page load
    setTimeout(typeEffect, 2000);
}

// ===== PARALLAX SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax for background shapes
    const shapes = document.querySelectorAll('.shape, .floating-element');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== INTERSECTION OBSERVER FOR NAVBAR ACTIVE STATE =====
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                updateActiveNavLink(`#${currentId}`);
            }
        });
    },
    {
        rootMargin: '-50% 0px -50% 0px'
    }
);

sections.forEach(section => navObserver.observe(section));

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Alt + T for theme toggle
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
            mobileMenuBtn.click();
        }
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    // Scroll-dependent functions here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for keyboard navigation
const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="email"], input[type="password"], input[type="submit"], [tabindex]:not([tabindex="-1"])'
);

// Trap focus in mobile menu when open
function trapFocus(element) {
    const focusableChildren = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="password"], input[type="submit"], [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableChildren[0];
    const lastFocusable = focusableChildren[focusableChildren.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== PRELOADER (OPTIONAL) =====
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1000);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error reporting service
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing preloader
    const existingPreloader = document.getElementById('preloader');
    if (existingPreloader) {
        existingPreloader.remove();
    }
    
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== UTILITY FUNCTIONS =====
// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Get current scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add to global scope for debugging
window.portfolioJS = {
    scrollToTop,
    getScrollPosition,
    isInViewport,
    currentTheme: () => currentTheme
};