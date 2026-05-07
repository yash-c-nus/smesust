// ===== STATE =====
let currentSection = 0;
const totalSections = 5;
const sectionCounts = [5, 7, 2, 10, 9]; // subsections per section

// ===== SECTION NAVIGATION =====
function goToSection(index) {
    if (index < 0 || index >= totalSections) return;
    currentSection = index;

    const track = document.getElementById('sliderTrack');
    track.style.transform = `translateX(-${index * 100}vw)`;

    // Update tabs
    document.querySelectorAll('.section-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    // Update floating nav
    document.querySelectorAll('.nav-section-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Scroll slide to top
    const slides = document.querySelectorAll('.slide');
    slides[index].scrollTop = 0;

    updateProgress();
}

// ===== PROGRESS TRACKING =====
function updateProgress() {
    let totalActive = 0;
    let totalIndicators = 0;

    document.querySelectorAll('.slide').forEach((slide, sectionIndex) => {
        const cards = slide.querySelectorAll('.indicator-card');
        let sectionActive = 0;
        let sectionTotal = cards.length;

        cards.forEach(card => {
            totalIndicators++;
            const toggle = card.querySelector('input[data-toggle="subsection"]');
            if (toggle && toggle.checked) {
                // Active (not skipped) = counts as "addressed"
                // We count toggled-on indicators as progress
            }
            if (toggle && !toggle.checked) {
                // Skipped
            }
            // Count active (non-skipped) as progress
            if (!card.classList.contains('skipped')) {
                sectionActive++;
                totalActive++;
            }
        });

        // Update tab counts
        const tabCount = document.getElementById(`tabCount${sectionIndex}`);
        if (tabCount) {
            tabCount.textContent = `${sectionActive}/${sectionTotal}`;
        }
    });

    // Update progress bar
    const pct = totalIndicators > 0 ? Math.round((totalActive / totalIndicators) * 100) : 0;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressLabel').textContent = pct + '% Complete';
}

// ===== TOGGLE SWITCHES =====
function initToggles() {
    document.querySelectorAll('input[data-toggle="subsection"]').forEach(toggle => {
        toggle.addEventListener('change', function () {
            const card = this.closest('.indicator-card');
            if (this.checked) {
                card.classList.remove('skipped');
            } else {
                card.classList.add('skipped');
            }
            updateProgress();
        });
    });
}

// ===== SECTION TAB CLICKS =====
function initTabs() {
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionIndex = parseInt(tab.getAttribute('data-section'));
            goToSection(sectionIndex);
        });
    });
}

// ===== FLOATING NAV =====
function initFloatingNav() {
    const toggle = document.getElementById('navToggle');
    const panel = document.getElementById('navPanel');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        panel.classList.toggle('open');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-nav')) {
            toggle.classList.remove('active');
            panel.classList.remove('open');
        }
    });
}

// ===== SUBMIT =====
function submitAssessment() {
    const skippedCount = document.querySelectorAll('.indicator-card.skipped').length;
    const totalCount = document.querySelectorAll('.indicator-card').length;
    const activeCount = totalCount - skippedCount;

    alert(`Assessment Summary:\n\n✓ ${activeCount} indicators active\n✗ ${skippedCount} indicators skipped\n\nTotal: ${totalCount} indicators\n\nThank you for completing the assessment!`);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initToggles();
    initTabs();
    initFloatingNav();
    updateProgress();

    // Start at section 0
    goToSection(0);
});
