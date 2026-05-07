// ===== ACCORDION TOGGLE =====
document.querySelectorAll('.category-header').forEach(button => {
    button.addEventListener('click', () => {
        const block = button.closest('.category-block');
        const isActive = block.classList.contains('active');

        // Optional: close all others (accordion mode)
        // document.querySelectorAll('.category-block.active').forEach(b => {
        //     if (b !== block) b.classList.remove('active');
        //     b.querySelector('.category-header').setAttribute('aria-expanded', 'false');
        // });

        block.classList.toggle('active');
        button.setAttribute('aria-expanded', !isActive);
    });
});

// ===== PILL CLICK → SCROLL TO CATEGORY =====
document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const targetId = pill.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
            // Open it if not already open
            if (!target.classList.contains('active')) {
                target.classList.add('active');
                target.querySelector('.category-header').setAttribute('aria-expanded', 'true');
            }
            // Smooth scroll
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== INTERSECTION OBSERVER — ANIMATE IN =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate category blocks on scroll
document.querySelectorAll('.category-block').forEach((block, i) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(20px)';
    block.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`;
    observer.observe(block);
});

// Animate note cards on scroll
document.querySelectorAll('.note-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`;
    observer.observe(card);
});
