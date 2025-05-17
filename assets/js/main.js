// Initialize AOS (Animate On Scroll) with your existing settings
AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// Add active class to nav items on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to highlight active nav item
    function highlightNavItem() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for navbar
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Add active class to corresponding nav item
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    // Typed.js initialization for animated text
    if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: [
                "Software Developer",
                "Cloud Analyst",
                "Technology Enthusiast"
                
            ],
            typeSpeed: 80,         // typing speed in milliseconds
            backSpeed: 40,         // backspacing speed in milliseconds
            backDelay: 1000,       // time before backspacing
            startDelay: 500,       // time before typing starts
            loop: true,            // loop the animation
            showCursor: true,      // show blinking cursor
            cursorChar: '|',       // character for cursor
            smartBackspace: true   // only backspace what doesn't match the previous string
        });
    }

    // Add event listener for scroll
    window.addEventListener('scroll', highlightNavItem);
    
    // Call it initially
    highlightNavItem();
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();
                
                const hash = this.hash;
                
                // Collapse mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                
                // Smooth scroll to section
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Toggle mobile menu collapse when clicking nav-links on mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('.navbar-collapse');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarMenu.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Add year to footer copyright
    const currentYear = new Date().getFullYear();
    const copyrightEl = document.querySelector('.copyright-year');
    if (copyrightEl) {
        copyrightEl.textContent = currentYear;
    }
});

// Enable Bootstrap scrollspy
document.addEventListener('DOMContentLoaded', function() {
    const scrollSpyElement = document.querySelector('[data-bs-spy="scroll"]');
    if (scrollSpyElement) {
        const scrollspy = new bootstrap.ScrollSpy(document.body, {
            target: '.navbar',
            offset: 80
        });
    }
});