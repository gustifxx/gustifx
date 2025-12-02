const hamburger = document.querySelector('.hamburger');
const navlinks = document.querySelector('.nav-links');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    if (!menuOpen == false) {
        navlinks.style.display = 'block';
        menuOpen = true;
    }

    else if (menuOpen == true) {
        navlinks.style.display = 'none';
        menuOpen = false;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks to prevent hash in URL
    const mainNav = document.getElementById('mainNav');
    
    if (mainNav) {
        mainNav.addEventListener('click', function(e) {
            // Check if the clicked element is an anchor tag
            const anchor = e.target.closest('a[data-target]');
            
            if (anchor) {
                e.preventDefault(); // This stops the URL from changing
                
                const targetId = anchor.getAttribute('data-target');
                const section = document.getElementById(targetId);
                
                if (section) {
                    // Optional: Remove active class from all nav links
                    document.querySelectorAll('.nav-links a').forEach(a => {
                        a.classList.remove('active');
                    });
                    // Add active class to clicked link
                    anchor.classList.add('active');
                    
                    // Smooth scroll to section
                    section.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Optional: Update page title without hash
                    document.title = `GustiFX - ${targetId.charAt(0).toUpperCase() + targetId.slice(1)}`;
                }
            }
        });
    }
    
    // Also handle the "Explore My Work" button in hero section
    const exploreBtn = document.querySelector('.hero .btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
