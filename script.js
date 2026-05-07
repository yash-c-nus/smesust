// ===== SECTION DATA =====
const sectionColors = ['#16a34a', '#ea580c', '#2563eb', '#9333ea', '#475569'];
const sectionNames = [
    'Carbon & Climate Performance',
    'Energy & Resource Use',
    'Environmental Stewardship',
    'Social & Workforce Responsibility',
    'Governance, Targets & Transparency'
];

let currentSection = 0;

// ===== NAVIGATION =====
function goToSection(index) {
    if (index < 0 || index > 4) return;
    currentSection = index;

    const track = document.getElementById('sliderTrack');
    track.style.transform = `translateX(-${index * 20}%)`;

    // Update tabs
    document.querySelectorAll('.section-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    // Update floating nav
    document.querySelectorAll('.nav-section-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateProgress();
}

// ===== SECTION TABS CLICK =====
document.querySelectorAll('.section-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const index = parseInt(tab.dataset.section);
        goToSection(index);
    });
});

// ===== TOGGLE SWITCHES =====
document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const card = this.closest('.indicator-card');
        if (this.checked) {
            card.classList.remove('skipped');
        } else {
            card.classList.add('skipped');
        }
        updateProgress();
        buildFloatingNav();
    });
});

// ===== PROGRESS TRACKING =====
function updateProgress() {
    const slides = document.querySelectorAll('.slide');
    let totalActive = 0;
    let totalAll = 0;
    const categoriesContainer = document.getElementById('progressCategories');
    categoriesContainer.innerHTML = '';

    slides.forEach((slide, i) => {
        const cards = slide.querySelectorAll('.indicator-card');
        const activeCards = slide.querySelectorAll('.indicator-card:not(.skipped)');
        const total = cards.length;
        const active = activeCards.length;
        // Progress is 0% since no input fields exist yet
        // When inputs are added, this will track filled vs total active
        const sectionCompleted = 0;
        const sectionTotal = active;

        totalActive += sectionCompleted;
        totalAll += sectionTotal;

        // Update tab counts
        const tabCount = document.getElementById(`tabCount${i}`);
        if (tabCount) {
            tabCount.textContent = `${sectionCompleted}/${sectionTotal}`;
        }

        // Category segments
        const seg = document.createElement('div');
        seg.className = 'progress-cat-segment';
        seg.style.color = sectionColors[i];
        seg.textContent = `${sectionCompleted}/${sectionTotal}`;
        seg.onclick = () => goToSection(i);
        if (sectionTotal === 0) seg.classList.add('skipped');
        categoriesContainer.appendChild(seg);
    });

    // Overall progress
    const percentage = totalAll > 0 ? Math.round((totalActive / totalAll) * 100) : 0;
    document.getElementById('progressPercentage').textContent = `${percentage}%`;
    document.getElementById('progressFill').style.width = `${percentage}%`;
}

// ===== FLOATING NAV =====
const floatingNavToggle = document.getElementById('floatingNavToggle');
const floatingNavPanel = document.getElementById('floatingNavPanel');

floatingNavToggle.addEventListener('click', () => {
    floatingNavPanel.classList.toggle('open');
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.floating-nav')) {
        floatingNavPanel.classList.remove('open');
    }
});

function buildFloatingNav() {
    const navList = document.getElementById('navSectionList');
    navList.innerHTML = '';

    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        // Section item
        const sectionItem = document.createElement('div');
        sectionItem.className = `nav-section-item ${i === currentSection ? 'active' : ''}`;
        sectionItem.innerHTML = `
            <div class="nav-section-dot" style="background: ${sectionColors[i]}"></div>
            <span class="nav-section-name">${sectionNames[i]}</span>
        `;
        sectionItem.onclick = () => {
            goToSection(i);
            floatingNavPanel.classList.remove('open');
        };
        navList.appendChild(sectionItem);

        // Subsection items
        if (i === currentSection) {
            const subList = document.createElement('div');
            subList.className = 'nav-sub-list';

            const cards = slide.querySelectorAll('.indicator-card');
            cards.forEach(card => {
                const indicator = card.dataset.indicator;
                const name = card.querySelector('h3').textContent;
                const isSkipped = card.classList.contains('skipped');

                const subItem = document.createElement('div');
                subItem.className = `nav-sub-item ${isSkipped ? 'skipped' : ''}`;
                subItem.textContent = `${indicator} ${name}`;
                subItem.onclick = (e) => {
                    e.stopPropagation();
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    floatingNavPanel.classList.remove('open');
                };
                subList.appendChild(subItem);
            });

            navList.appendChild(subList);
        }
    });
}

// ===== INIT =====
updateProgress();
buildFloatingNav();
