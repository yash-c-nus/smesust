// Accordion toggle
document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
        const block = header.closest('.category-block');
        const isOpen = block.classList.contains('open');

        // Close all
        document.querySelectorAll('.category-block').forEach(b => b.classList.remove('open'));

        // Open clicked (if it wasn't already open)
        if (!isOpen) {
            block.classList.add('open');
        }
    });
});

// Pill click → scroll to category and open it
document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const targetId = pill.getAttribute('data-target');
        const targetBlock = document.getElementById(targetId);

        if (targetBlock) {
            // Close all, then open target
            document.querySelectorAll('.category-block').forEach(b => b.classList.remove('open'));
            targetBlock.classList.add('open');

            // Smooth scroll
            targetBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
