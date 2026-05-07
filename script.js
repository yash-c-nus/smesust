// ===== STATE =====
let currentSection = 0;
const totalSections = 5;

const sectionColors = ['#16a34a', '#ea580c', '#2563eb', '#9333ea', '#475569'];
const sectionNames = [
    'Carbon & Climate Performance',
    'Energy & Resource Use',
    'Environmental Stewardship',
    'Social & Workforce Responsibility',
    'Governance, Targets & Transparency'
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initToggles();
    initPills();
    initFloatingNav();
    updateProgress();
    goToSection(0);
});

// ===== SECTION NAVIGATION =====
function goToSection(index) {
    if (index < 0 || index >= totalSections) return;
    currentSection = index;

    const track = document.getElementById('sectionsTrack');
    track.style.transform = `translateX(-${index * 100}vw)`;

    // Update pills
    document.querySelectorAll('.section-pill').forEach((pill, i) => {
        pill.classList.toggle('active', i === index);
    });

    // Update floating nav
    document.querySelectorAll('.nav-section-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== PILLS =====
function initPills() {
    document.querySelectorAll('.section-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const idx = parseInt(pill.dataset.section);
            goToSection(idx);
        });
    });
}

// ===== TOGGLES =====
function initToggles() {
    document.querySelectorAll('.indicator-card .toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const card = this.closest('.indicator-card');
            card.classList.toggle('skipped', !this.checked);
            updateProgress();
            updateFloatingNav();
        });
    });
}

// ===== PROGRESS =====
function updateProgress() {
    let totalActive = 0;
    let totalIndicators = 0;

    document.querySelectorAll('.section-slide').forEach((section, sIdx) => {
        const cards = section.querySelectorAll('.indicator-card');
        const activeCards = section.querySelectorAll('.indicator-card:not(.skipped)');
        const total = cards.length;
        const active = activeCards.length;

        // Since no actual input fields yet, progress = 0
        // But we track skipped vs active for the pill counts
        totalIndicators += total;
        totalActive += active;

        // Update pill count
        const pill = document.querySelector(`.section-pill[data-section="${sIdx}"]`);
        if (pill) {
            const countEl = pill.querySelector('.pill-count');
            // Show active/total as the count
            countEl.textContent = `${active}/${total}`;
        }
    });

    // Progress bar: 0% since no inputs exist yet
    // When inputs are added later, this will track filled inputs / total active indicators
    const progressFill = document.getElementById('progressFill');
    const progressLabel = document.getElementById('progressLabel');

    // For now, progress is based on: 0 filled out of totalActive
    const filledCount = 0; // placeholder until inputs are added
    const pct = totalActive > 0 ? Math.round((filledCount / totalActive) * 100) : 0;

    progressFill.style.width = pct + '%';
    progressLabel.textContent = pct + '% Complete';
}

// ===== FLOATING NAV =====
function initFloatingNav() {
    const toggle = document.getElementById('floatingNavToggle');
    const panel = document.getElementById('floatingNavPanel');
    const list = document.getElementById('navSectionList');

    // Build nav items
    document.querySelectorAll('.section-slide').forEach((section, sIdx) => {
        const item = document.createElement('div');
        item.className = `nav-section-item${sIdx === 0 ? ' active' : ''}`;
        item.innerHTML = `
            <span class="nav-section-dot" style="background:${sectionColors[sIdx]}"></span>
            <span>${sectionNames[sIdx]}</span>
        `;
        item.addEventListener('click', () => goToSection(sIdx));
        list.appendChild(item);

        // Sub items
        const subList = document.createElement('div');
        subList.className = 'nav-sub-list';
        section.querySelectorAll('.indicator-card').forEach(card => {
            const id = card.dataset.indicator;
            const name = card.querySelector('h3').textContent;
            const sub = document.createElement('div');
            sub.className = 'nav-sub-item';
            sub.dataset.indicator = id;
            sub.textContent = `${id} ${name}`;
            sub.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSection(sIdx);
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.boxShadow = '0 0 0 3px ' + sectionColors[sIdx];
                    setTimeout(() => { card.style.boxShadow = ''; }, 1500);
                }, 550);
            });
            subList.appendChild(sub);
        });
        list.appendChild(subList);
    });

    // Toggle panel
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        panel.classList.toggle('open');
        if (toggle.classList.contains('open')) {
            toggle.querySelector('.nav-icon').textContent = '✕';
        } else {
            toggle.querySelector('.nav-icon').textContent = '☰';
        }
    });
}

function updateFloatingNav() {
    document.querySelectorAll('.indicator-card').forEach(card => {
        const id = card.dataset.indicator;
        const isSkipped = card.classList.contains('skipped');
        const navSub = document.querySelector(`.nav-sub-item[data-indicator="${id}"]`);
        if (navSub) {
            navSub.classList.toggle('skipped', isSkipped);
        }
    });
}
