document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// Navigation blur effect on scroll
function initNavBlurEffect() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Initialize navigation effect
document.addEventListener('DOMContentLoaded', function() {
    initNavBlurEffect();
});

document.getElementById('mainNav').addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hasAttribute('data-target')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('data-target');
        const section = document.getElementById(targetId);
        
        if (section) {
            // Optional: Add active class management
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Scroll to section
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
