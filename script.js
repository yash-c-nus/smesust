/* ============================================
   SME Sustainability Scorecard — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- State ----
    const totalSubsections = document.querySelectorAll('.indicator-card').length;
    const skippedSections = new Set();    // category-level skips
    const skippedSubsections = new Set(); // subsection-level skips

    // Category metadata
    const categories = [
        { id: 1, name: 'Carbon & Climate', color: '#16a34a' },
        { id: 2, name: 'Energy & Resource', color: '#ea580c' },
        { id: 3, name: 'Env. Stewardship', color: '#0284c7' },
        { id: 4, name: 'Social & Workforce', color: '#9333ea' },
        { id: 5, name: 'Governance', color: '#334155' }
    ];

    // ---- Build progress bar category segments ----
    const progressCategoriesEl = document.getElementById('progressCategories');
    categories.forEach(cat => {
        const segment = document.createElement('div');
        segment.className = 'progress-cat-segment';
        segment.dataset.cat = cat.id;
        segment.innerHTML = `
            <span class="progress-cat-dot" style="background:${cat.color}"></span>
            <span class="progress-cat-label">${cat.name}</span>
            <span class="progress-cat-status" style="color:${cat.color}">0%</span>
        `;
        segment.addEventListener('click', () => {
            const target = document.querySelector(`.accordion-item[data-category="${cat.id}"]`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Auto-open
                if (!target.classList.contains('active')) {
                    target.classList.add('active');
                }
            }
        });
        progressCategoriesEl.appendChild(segment);
    });

    // ---- Accordion toggle ----
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', (e) => {
            // Don't toggle if clicking skip button
            if (e.target.classList.contains('skip-btn')) return;

            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ---- Skip entire section ----
    document.querySelectorAll('.skip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const catId = btn.dataset.category;
            const item = document.querySelector(`.accordion-item[data-category="${catId}"]`);

            if (skippedSections.has(catId)) {
                // Unskip
                skippedSections.delete(catId);
                item.classList.remove('skipped');
                btn.textContent = 'Skip ⟫';
                // Also unskip all subsections in this category
                item.querySelectorAll('.indicator-card').forEach(card => {
                    const subId = card.dataset.subsection;
                    skippedSubsections.delete(subId);
                    card.classList.remove('skipped-sub');
                    const subBtn = card.querySelector('.skip-subsection-btn');
                    if (subBtn) {
                        subBtn.textContent = 'Skip';
                        subBtn.classList.remove('unskip');
                    }
                });
            } else {
                // Skip
                skippedSections.add(catId);
                item.classList.add('skipped');
                item.classList.remove('active');
                btn.textContent = 'Undo ↩';
                // Also skip all subsections in this category
                item.querySelectorAll('.indicator-card').forEach(card => {
                    const subId = card.dataset.subsection;
                    skippedSubsections.add(subId);
                    card.classList.add('skipped-sub');
                    const subBtn = card.querySelector('.skip-subsection-btn');
                    if (subBtn) {
                        subBtn.textContent = 'Undo';
                        subBtn.classList.add('unskip');
                    }
                });
            }

            updateProgress();
        });
    });

    // ---- Skip individual subsection ----
    document.querySelectorAll('.skip-subsection-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const subId = btn.dataset.sub;
            const card = document.querySelector(`.indicator-card[data-subsection="${subId}"]`);

            if (skippedSubsections.has(subId)) {
                // Unskip
                skippedSubsections.delete(subId);
                card.classList.remove('skipped-sub');
                btn.textContent = 'Skip';
                btn.classList.remove('unskip');
            } else {
                // Skip
                skippedSubsections.add(subId);
                card.classList.add('skipped-sub');
                btn.textContent = 'Undo';
                btn.classList.add('unskip');
            }

            // Check if all subsections in parent category are skipped
            const catItem = card.closest('.accordion-item');
            const catId = catItem.dataset.category;
            const allCards = catItem.querySelectorAll('.indicator-card');
            const allSkipped = [...allCards].every(c => skippedSubsections.has(c.dataset.subsection));

            if (allSkipped && !skippedSections.has(catId)) {
                skippedSections.add(catId);
                catItem.classList.add('skipped');
                const catSkipBtn = catItem.querySelector('.skip-btn');
                if (catSkipBtn) catSkipBtn.textContent = 'Undo ↩';
            } else if (!allSkipped && skippedSections.has(catId)) {
                skippedSections.delete(catId);
                catItem.classList.remove('skipped');
                const catSkipBtn = catItem.querySelector('.skip-btn');
                if (catSkipBtn) catSkipBtn.textContent = 'Skip ⟫';
            }

            updateProgress();
        });
    });

    // ---- Update progress bar ----
    function updateProgress() {
        const skippedCount = skippedSubsections.size;
        const percent = Math.round((skippedCount / totalSubsections) * 100);

        // Overall progress (skipped = "handled", so it counts as progress)
        document.getElementById('progressFill').style.width = percent + '%';
        document.getElementById('progressPercent').textContent = percent + '%';

        // Per-category progress
        categories.forEach(cat => {
            const catItem = document.querySelector(`.accordion-item[data-category="${cat.id}"]`);
            const allCards = catItem.querySelectorAll('.indicator-card');
            const catSkippedCount = [...allCards].filter(c => skippedSubsections.has(c.dataset.subsection)).length;
            const catPercent = allCards.length > 0 ? Math.round((catSkippedCount / allCards.length) * 100) : 0;

            const segment = document.querySelector(`.progress-cat-segment[data-cat="${cat.id}"]`);
            const statusEl = segment.querySelector('.progress-cat-status');
            const dotEl = segment.querySelector('.progress-cat-dot');

            statusEl.textContent = catPercent + '%';

            if (catPercent === 100) {
                dotEl.classList.add('completed');
            } else {
                dotEl.classList.remove('completed');
            }
        });
    }

    // Initial progress
    updateProgress();
});
