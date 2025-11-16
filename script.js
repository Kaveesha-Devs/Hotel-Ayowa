// Navigation scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Hero slider
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Animated counter for statistics
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Trigger counter animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSlides = document.querySelectorAll('.hero-slide img');

    heroSlides.forEach(slide => {
        const parallaxSpeed = 0.5;
        slide.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
});

// Gallery lightbox effect (simple version)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        const img = item.querySelector('img').cloneNode();
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
});

// Add fade in/out keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Animate elements on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effect to room cards
const roomCards = document.querySelectorAll('.room-card');

roomCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            // Simulate loading effect
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);

            observer.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

images.forEach(img => {
    imageObserver.observe(img);
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #C9A86A, #D4AF37);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add entrance animation to amenity cards
const amenityCards = document.querySelectorAll('.amenity-card');

const amenityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';

                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

amenityCards.forEach(card => {
    amenityObserver.observe(card);
});

// Cursor effect for luxury feel (optional - subtle)
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #C9A86A;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Enlarge cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .room-card, .gallery-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.left = (parseInt(cursor.style.left) - 10) + 'px';
        cursor.style.top = (parseInt(cursor.style.top) - 10) + 'px';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });
});

// Add floating particles background
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, rgba(201, 168, 106, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 15}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Floating animation keyframes
const floatKeyframes = document.createElement('style');
floatKeyframes.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(floatKeyframes);
createFloatingParticles();

// Magnetic effect for buttons
document.querySelectorAll('.book-btn, .cta-btn, .submit-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Smooth 3D tilt effect for room cards
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Text reveal animation with split
function splitText(element) {
    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.cssText = `
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: letterReveal 0.6s ease forwards;
            animation-delay: ${index * 0.03}s;
        `;
        element.appendChild(span);
    });
}

const letterRevealStyle = document.createElement('style');
letterRevealStyle.textContent = `
    @keyframes letterReveal {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(letterRevealStyle);

// Apply to section titles when they come into view
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            splitText(entry.target);
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// Advanced parallax for multiple elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for about section images
    document.querySelectorAll('.image-wrapper img').forEach((img, index) => {
        const speed = 0.3 + (index * 0.1);
        img.style.transform = `translateY(${scrolled * speed * 0.3}px) scale(1.1)`;
    });

    // Parallax for stats
    document.querySelectorAll('.stat-item').forEach((stat, index) => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            const offset = (window.innerHeight - rect.top) * 0.05;
            stat.style.transform = `translateY(${offset}px)`;
        }
    });
});

// Glitch effect for hero title on load
function glitchEffect(element) {
    const originalText = element.textContent;
    let iterations = 0;

    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return String.fromCharCode(Math.random() * 94 + 33);
            })
            .join('');

        iterations += 1/3;

        if (iterations >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, 30);
}

// Apply glitch on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => glitchEffect(heroTitle), 500);
    }
});

// Ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(201, 168, 106, 0.4) 0%, transparent 70%);
        pointer-events: none;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        animation: rippleAnimation 0.8s ease-out forwards;
        z-index: 9999;
    `;
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('Ayowa Grand Hotel - Modern Website Loaded Successfully');
