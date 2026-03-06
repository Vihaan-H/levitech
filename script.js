/*
 * ================= LEVI CREEK TECH SUPPORT WEBSITE ================= 
 * Main JavaScript file for interactive features and animations
 * Handles: Navigation, animations, scroll reveal, effects
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
    } else {
        // if the ID doesn't exist, log a warning (helps catch typos)
        console.warn(`scrollToSection: no element found with id "${id}"`);
    }
}

// ================= SCROLL REVEAL ANIMATION ================= 
// Uses Intersection Observer to reveal sections as they scroll into view
// Adds "show" class to trigger CSS animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // When section becomes visible, add animation class
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

// Apply observer to all hidden sections (marked with .hidden class)
document.querySelectorAll(".hidden").forEach(section => {
    observer.observe(section);
});

// ================= ANCHOR LINK SMOOTH SCROLL ================= 
// All internal links (href="#...") smoothly scroll to their target
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});


// ================= NAVBAR GLOW ON SCROLL ================= 
// Adds glowing shadow effect to navbar when user scrolls down
// Creates visual feedback that navbar "activates" on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Cyan glow effect when scrolled past 50px
        navbar.style.boxShadow = "0 0 20px rgba(0, 242, 255, 0.3)";
    } else {
        // Remove glow at top of page
        navbar.style.boxShadow = "none";
    }
});


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
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt angles based on distance from center
        const rotateX = ((y - centerY) / 15);
        const rotateY = ((centerX - x) / 15);

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset tilt when mouse leaves card
    card.addEventListener('mouseleave', () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});
