document.addEventListener('DOMContentLoaded', () => {

    // ========== CONFIG ==========
    const TOTAL_SECTIONS = 5;
    const sectionIndicatorCounts = { 1: 5, 2: 7, 3: 2, 4: 10, 5: 9 };
    const sectionNames = {
        1: 'Carbon & Climate',
        2: 'Energy & Resource',
        3: 'Env. Stewardship',
        4: 'Social & Workforce',
        5: 'Governance'
    };
    const sectionColors = {
        1: '#16a34a',
        2: '#ea580c',
        3: '#0284c7',
        4: '#9333ea',
        5: '#475569'
    };

    // ========== STATE ==========
    let unlockedSections = new Set([1]);
    let expandedSection = null;

    // ========== INIT ==========
    initSections();
    buildNav();
    updateProgress();
    // Auto-expand section 1 on load
    toggleSection(1);

    // ========== SECTION TOGGLE ==========
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
            const sectionNum = parseInt(header.dataset.section);
            if (!unlockedSections.has(sectionNum)) return;
            toggleSection(sectionNum);
        });
    });

    function toggleSection(num) {
        const block = document.getElementById(`section-${num}`);
        if (!block || block.classList.contains('locked')) return;

        if (expandedSection === num) {
            block.classList.remove('expanded');
            expandedSection = null;
        } else {
            // Close all
            document.querySelectorAll('.section-block').forEach(b => b.classList.remove('expanded'));
            block.classList.add('expanded');
            expandedSection = num;
            // Scroll into view
            setTimeout(() => {
                block.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        updateNav();
    }

    function initSections() {
        for (let i = 1; i <= TOTAL_SECTIONS; i++) {
            const block = document.getElementById(`section-${i}`);
            if (unlockedSections.has(i)) {
                block.classList.remove('locked');
                block.classList.add('unlocked');
            } else {
                block.classList.add('locked');
                block.classList.remove('unlocked');
            }
        }
    }

    function unlockSection(num) {
        if (num > TOTAL_SECTIONS) return;
        unlockedSections.add(num);
        const block = document.getElementById(`section-${num}`);
        if (block) {
            block.classList.remove('locked');
            block.classList.add('unlocked');
        }
        updateNav();
    }

    // ========== NEXT / PREV BUTTONS ==========
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextNum = parseInt(btn.dataset.next);
            unlockSection(nextNum);
            toggleSection(nextNum);
        });
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const prevNum = parseInt(btn.dataset.prev);
            toggleSection(prevNum);
        });
    });

    // ========== SUBMIT BUTTON ==========
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert('🎉 Assessment submitted successfully!\n\nYour responses have been recorded. You will receive your sustainability scorecard shortly.');
        });
    }

    // ========== SKIP TOGGLES (Subsection level) ==========
    document.querySelectorAll('.skip-toggle').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            e.stopPropagation();
            const card = toggle.closest('.indicator-card');
            const indicatorId = toggle.dataset.indicator;
            const sectionNum = parseInt(toggle.dataset.section);

            if (!toggle.checked) {
                card.classList.add('skipped');
                card.classList.remove('completed');
                // Clear the textarea
                const textarea = card.querySelector('.response-input');
                if (textarea) textarea.value = '';
            } else {
                card.classList.remove('skipped');
            }
            updateProgress();
            updateNav();
        });
    });

    // ========== TEXT INPUT TRACKING ==========
    document.querySelectorAll('.response-input').forEach(textarea => {
        textarea.addEventListener('input', () => {
            const card = textarea.closest('.indicator-card');
            if (textarea.value.trim().length > 0) {
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }
            updateProgress();
            updateNav();
        });
    });

    // ========== PROGRESS BAR ==========
    function updateProgress() {
        let totalActive = 0;
        let totalCompleted = 0;

        for (let s = 1; s <= TOTAL_SECTIONS; s++) {
            const content = document.getElementById(`content-${s}`);
            if (!content) continue;

            const cards = content.querySelectorAll('.indicator-card');
            let sectionActive = 0;
            let sectionCompleted = 0;

            cards.forEach(card => {
                const toggle = card.querySelector('.skip-toggle');
                const isSkipped = !toggle.checked;
                const isCompleted = card.classList.contains('completed');

                if (!isSkipped) {
                    sectionActive++;
                    if (isCompleted) {
                        sectionCompleted++;
                    }
                }
            });

            totalActive += sectionActive;
            totalCompleted += sectionCompleted;

            // Update badge
            const badge = document.getElementById(`badge-${s}`);
            if (badge) {
                badge.textContent = `${sectionCompleted}/${sectionActive}`;
                if (sectionActive > 0 && sectionCompleted === sectionActive) {
                    badge.style.background = '#dcfce7';
                    badge.style.color = '#16a34a';
                } else {
                    badge.style.background = '';
                    badge.style.color = '';
                }
            }
        }

        const percentage = totalActive > 0 ? Math.round((totalCompleted / totalActive) * 100) : 0;
        const fill = document.getElementById('progressFill');
        const pctText = document.getElementById('progressPercentage');
        const detail = document.getElementById('progressDetail');

        if (fill) fill.style.width = `${percentage}%`;
        if (pctText) pctText.textContent = `${percentage}%`;
        if (detail) detail.textContent = `${totalCompleted} of ${totalActive} active indicators completed`;
    }

    // ========== FLOATING NAV ==========
    const navToggle = document.getElementById('navToggle');
    const navPanel = document.getElementById('navPanel');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navPanel.classList.toggle('open');
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu')) {
            navToggle.classList.remove('active');
            navPanel.classList.remove('open');
        }
    });

    function buildNav() {
        const navItems = document.getElementById('navItems');
        navItems.innerHTML = '';

        for (let s = 1; s <= TOTAL_SECTIONS; s++) {
            // Section item
            const sectionItem = document.createElement('div');
            sectionItem.className = 'nav-section-item';
            if (!unlockedSections.has(s)) sectionItem.classList.add('locked-nav');
            sectionItem.dataset.section = s;
            sectionItem.innerHTML = `
                <span class="nav-section-dot" style="background:${sectionColors[s]}"></span>
                <span>${sectionNames[s]}</span>
            `;
            sectionItem.addEventListener('click', () => {
                if (!unlockedSections.has(s)) return;
                toggleSection(s);
                navToggle.classList.remove('active');
                navPanel.classList.remove('open');
            });
            navItems.appendChild(sectionItem);

            // Sub items container
            const subContainer = document.createElement('div');
            subContainer.className = 'nav-sub-items';
            subContainer.id = `nav-subs-${s}`;

            const content = document.getElementById(`content-${s}`);
            if (content) {
                const cards = content.querySelectorAll('.indicator-card');
                cards.forEach(card => {
                    const indicatorId = card.dataset.indicator;
                    const name = card.querySelector('.indicator-name')?.textContent || indicatorId;
                    const subItem = document.createElement('div');
                    subItem.className = 'nav-sub-item';
                    subItem.dataset.indicator = indicatorId;
                    subItem.innerHTML = `<span class="nav-sub-dot"></span><span>${indicatorId} ${name}</span>`;
                    subItem.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (!unlockedSections.has(s)) return;
                        // Expand section if not expanded
                        if (expandedSection !== s) {
                            toggleSection(s);
                        }
                        // Scroll to card
                        setTimeout(() => {
                            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            card.style.boxShadow = '0 0 0 3px ' + sectionColors[s];
                            setTimeout(() => { card.style.boxShadow = ''; }, 1500);
                        }, 300);
                        navToggle.classList.remove('active');
                        navPanel.classList.remove('open');
                    });
                    subContainer.appendChild(subItem);
                });
            }
            navItems.appendChild(subContainer);
        }
    }

    function updateNav() {
        for (let s = 1; s <= TOTAL_SECTIONS; s++) {
            const sectionItem = document.querySelector(`.nav-section-item[data-section="${s}"]`);
            if (sectionItem) {
                if (unlockedSections.has(s)) {
                    sectionItem.classList.remove('locked-nav');
                } else {
                    sectionItem.classList.add('locked-nav');
                }
                // Highlight active
                if (expandedSection === s) {
                    sectionItem.classList.add('active');
                } else {
                    sectionItem.classList.remove('active');
                }
            }

            // Sub items expand/collapse
            const subContainer = document.getElementById(`nav-subs-${s}`);
            if (subContainer) {
                if (expandedSection === s) {
                    subContainer.classList.add('expanded');
                } else {
                    subContainer.classList.remove('expanded');
                }
            }

            // Update sub item states
            const content = document.getElementById(`content-${s}`);
            if (content) {
                const cards = content.querySelectorAll('.indicator-card');
                cards.forEach(card => {
                    const indicatorId = card.dataset.indicator;
                    const navSub = document.querySelector(`.nav-sub-item[data-indicator="${indicatorId}"]`);
                    if (navSub) {
                        const toggle = card.querySelector('.skip-toggle');
                        const isSkipped = toggle && !toggle.checked;
                        const isCompleted = card.classList.contains('completed');

                        navSub.classList.toggle('completed', isCompleted);
                        navSub.classList.toggle('skipped-nav', isSkipped);
                    }
                });
            }
        }
    }
});
