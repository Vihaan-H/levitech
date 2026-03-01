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
