/*
 * ================= LEVI CREEK TECH SUPPORT WEBSITE ================= 
 * Main JavaScript file for interactive features and animations
 * Handles: Navigation, animations, scroll reveal, effects, parallax
 */

// ================= SMOOTH SCROLL FUNCTION ================= 
// Scrolls to a section by ID with smooth animation
// Used by CTA buttons (e.g., "Request Service")
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: "smooth"
        });
        // update the URL hash without jumping
        if (history.pushState) {
            history.pushState(null, null, `#${id}`);
        } else {
            // fallback for older browsers
            window.location.hash = id;
        }
    } else {
        // if the ID doesn't exist, log a warning (helps catch typos)
        console.warn(`scrollToSection: no element found with id "${id}"`);
    }
}

// ================= PARALLAX EFFECT ================= 
// Creates depth by moving hero background differently than foreground
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const parallelContent = document.querySelector('.hero h1');
    
    if (hero && parallelContent) {
        const scrollPosition = window.scrollY;
        const heroOffset = hero.offsetTop;
        
        if (scrollPosition < heroOffset + hero.offsetHeight) {
            parallelContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// ================= SCROLL REVEAL ANIMATION ================= 
// Uses Intersection Observer to reveal sections as they scroll into view
// Adds "show" class to trigger CSS animations
// If the browser doesn't support IntersectionObserver, reveal everything immediately
let observer;
if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    // Apply observer to all hidden sections (marked with .hidden class)
    document.querySelectorAll(".hidden").forEach(section => {
        observer.observe(section);
    });
} else {
    // fallback for old browsers: just add show class to all sections
    document.querySelectorAll(".hidden").forEach(section => {
        section.classList.add("show");
    });
}


// ================= ANCHOR LINK SMOOTH SCROLL ================= 
// All internal links (href="#...") smoothly scroll to their target
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        // delegate to scrollToSection for consistency and URL updates
        const id = this.getAttribute('href').substring(1);
        scrollToSection(id);
    });
});


// ================= NAVBAR GLOW ON SCROLL ================= 
// Adds glowing shadow effect to navbar when user scrolls down
// Creates visual feedback that navbar "activates" on scroll
const navbar = document.querySelector('.navbar');

// guard in case markup changes or script loads before nav rendered
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Cyan glow effect when scrolled past 50px
            navbar.style.boxShadow = "0 0 20px rgba(0, 242, 255, 0.3)";
        } else {
            // Remove glow at top of page
            navbar.style.boxShadow = "none";
        }
    });
} else {
    console.warn('Navbar element not found; scroll glow disabled');
}


// ================= HERO TITLE TYPING EFFECT ================= 
// Animates the hero h1 text to appear character by character
// Creates a dynamic, engaging first impression
const heroTitle = document.querySelector('.hero h1');

if (heroTitle) {
    const typingText = "Premium Local Tech Support";
    let index = 0;

    heroTitle.textContent = "";

    // Type one character every 70 milliseconds
    function typeEffect() {
        if (index < typingText.length) {
            heroTitle.textContent += typingText.charAt(index);
            index++;
            setTimeout(typeEffect, 70);
        }
    }

    typeEffect();
}
// ================= BUTTON RIPPLE EFFECT ================= 
// Material Design inspired ripple effect on button click
// Creates expanding wave from cursor position
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        // Position ripple at cursor click location
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        button.appendChild(ripple);

        // Remove ripple element after animation completes (600ms)
        setTimeout(() => ripple.remove(), 600);
    });
});


// ================= CARD 3D TILT EFFECT ================= 
// Creates 3D perspective tilt effect when mouse hovers over cards
// Tilts based on cursor position within the card
document.querySelectorAll('.card, .pricing-card').forEach(card => {
    // throttle updates to roughly 60fps using requestAnimationFrame
    let ticking = false;
    card.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate tilt angles based on distance from center
                const rotateX = ((y - centerY) / 15);
                const rotateY = ((centerX - x) / 15);

                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Reset tilt when mouse leaves card
    card.addEventListener('mouseleave', () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});
