// Smooth scroll function for navigation buttons
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// Reveal animation when scrolling
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

// Select all hidden sections and observe them
document.querySelectorAll(".hidden").forEach(section => {
    observer.observe(section);
});
/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});


/* ================= NAVBAR GLOW ON SCROLL ================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 0 20px rgba(0, 242, 255, 0.3)";
    } else {
        navbar.style.boxShadow = "none";
    }
});


/* ================= HERO PARALLAX ================= */
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.4;
    hero.style.backgroundPosition = `center ${offset}px`;
});


/* ================= BUTTON RIPPLE EFFECT ================= */
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});


/* ================= CARD TILT EFFECT ================= */
document.querySelectorAll('.card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 15);
        const rotateY = ((centerX - x) / 15);

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});


/* ================= TYPING EFFECT ================= */
const typingText = "Levi Creek Tech Support";
const heroTitle = document.querySelector('.hero h1');

let index = 0;

function typeEffect() {
    if (index < typingText.length) {
        heroTitle.textContent += typingText.charAt(index);
        index++;
        setTimeout(typeEffect, 70);
    }
}

heroTitle.textContent = "";
typeEffect();


/* ================= SCROLL REVEAL ================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
