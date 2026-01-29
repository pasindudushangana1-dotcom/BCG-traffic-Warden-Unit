console.log('Traffic Warden Society App Initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Mobile menu toggle logic
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    // Create an overlay to capture clicks outside nav
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 98;
        display: none;
    `;
    document.body.appendChild(overlay);

    if (menuBtn && nav) {
        // Toggle function
        const toggleMenu = () => {
            const isActive = nav.classList.contains('active');
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');

            // Toggle overlay
            overlay.style.display = isActive ? 'none' : 'block';

            // Animate hamburger to X
            const spans = menuBtn.querySelectorAll('span');
            if (!isActive) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                // Note: Original HTML only had 2 spans? Let's check or assume 3
                // Actually style.css implies logic for hamburger but let's check HTML
                // HTML has 2 spans. Let's make it a cross.
                // Re-reading HTML: lines 39-40 show 2 spans.
                // Let's just use a class toggle in CSS for simplicity if we could, 
                // but here let's stick to inline for "superb" effect or just class.
                // Better: Let's use the 'active' class we just toggled on menuBtn and style in CSS or here.
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
            }
        };

        menuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu when link clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) toggleMenu();
            });
        });
    }

    // Scroll Animations Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want one-time animation
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active state
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('login-modal');
    // Find specifically the header login button if multiple
    const headerLoginBtn = Array.from(document.querySelectorAll('.btn-primary')).find(btn => btn.textContent.includes('Login'));
    // Also the CTA button might be login or join
    const wardenBtn = Array.from(document.querySelectorAll('.btn-primary')).find(btn => btn.textContent.includes('Warden Login'));

    const btnsToOpenModal = [headerLoginBtn, wardenBtn].filter(Boolean);
    const closeBtn = document.querySelector('.close-modal');

    btnsToOpenModal.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.classList.add('active');
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Form Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Processing...';
            btn.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                btn.textContent = 'Success!';
                btn.style.background = '#10B981'; // Green success
                form.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = ''; // Reset
                    btn.style.opacity = '1';
                    // If it was the login form, close modal
                    if (modal && form.id === 'login-form') {
                        modal.classList.remove('active');
                    }
                }, 2000);
            }, 1000);
        });
    });

    // Scroll spy for active link
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});
