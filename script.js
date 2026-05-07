// ===== STATE =====
let currentSection = 0;
const totalSections = 5;
const unlockedSections = new Set([0]);

const sectionData = [
    { name: 'Carbon & Climate', color: '#16a34a', indicators: ['1.1','1.2','1.3','1.4','1.5'] },
    { name: 'Energy & Resource', color: '#ea580c', indicators: ['2.1','2.2','2.3','2.4','2.5','2.6','2.7'] },
    { name: 'Environmental', color: '#0284c7', indicators: ['3.1','3.2'] },
    { name: 'Social & Workforce', color: '#9333ea', indicators: ['4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9','4.10'] },
    { name: 'Governance', color: '#475569', indicators: ['5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.8','5.9'] }
];

const indicatorNames = {
    '1.1': 'Carbon Emissions Tracking', '1.2': 'Emissions Tracking Maturity',
    '1.3': 'Net-Zero Target', '1.4': 'Emissions Reduction Plan',
    '1.5': 'Intensity-Based Reduction Target',
    '2.1': 'Physical Footprint', '2.2': 'Machinery & Equipment Energy Use',
    '2.3': 'Vehicle Fleet & Energy', '2.4': 'Electricity Consumption',
    '2.5': 'Renewable Energy Adoption', '2.6': 'Water Consumption',
    '2.7': 'Waste Generation & Recycling',
    '3.1': 'Biodiversity Exposure', '3.2': 'Environmental Impact Assessment',
    '4.1': 'Workforce Strategy', '4.2': 'Workforce Composition & Diversity',
    '4.3': 'Employee Retention', '4.4': 'Fair Compensation',
    '4.5': 'Benefits & Entitlements', '4.6': 'Training & Development',
    '4.7': 'Health & Safety', '4.8': 'Misconduct & Ethics',
    '4.9': 'Community & Volunteering', '4.10': 'Stakeholder Satisfaction',
    '5.1': 'Board Composition & Oversight', '5.2': 'Sustainability Personnel',
    '5.3': 'Sustainability Strategy', '5.4': 'Sustainability Training & Certifications',
    '5.5': 'Sustainability Reporting & Disclosure', '5.6': 'ESG Rating',
    '5.7': 'Materiality Assessment', '5.8': 'Ethical Conduct',
    '5.9': 'Cybersecurity & Data Privacy'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initToggles();
    initTextareas();
    initTabs();
    initFloatingNav();
    updateProgress();
});

// ===== TOGGLE SWITCHES =====
function initToggles() {
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const card = this.closest('.indicator-card');
            const label = this.closest('.toggle-container').querySelector('.toggle-label');

            if (this.checked) {
                card.classList.remove('skipped');
                label.textContent = 'Active';
                label.classList.remove('skipped-label');
                label.classList.add('active-label');
            } else {
                card.classList.add('skipped');
                label.textContent = 'Skipped';
                label.classList.remove('active-label');
                label.classList.add('skipped-label');
            }
            updateProgress();
            updateFloatingNav();
        });
    });
}

// ===== TEXTAREAS =====
function initTextareas() {
    document.querySelectorAll('.indicator-input textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
            updateProgress();
            updateFloatingNav();
        });
    });
}

// ===== SECTION TABS =====
function initTabs() {
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const sectionIndex = parseInt(this.dataset.section);
            if (unlockedSections.has(sectionIndex)) {
                goToSection(sectionIndex);
            }
        });
    });
}

// ===== NAVIGATE TO SECTION =====
function goToSection(index) {
    if (index < 0 || index >= totalSections) return;

    // Unlock the target section
    unlockedSections.add(index);

    // Also unlock all sections before it
    for (let i = 0; i <= index; i++) {
        unlockedSections.add(i);
    }

    currentSection = index;

    // Slide
    const track = document.getElementById('slidesTrack');
    track.style.transform = `translateX(-${index * 20}%)`;

    // Update tabs
    document.querySelectorAll('.section-tab').forEach((tab, i) => {
        tab.classList.remove('active');
        if (unlockedSections.has(i)) {
            tab.classList.remove('locked');
        }
        if (i === index) {
            tab.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateProgress();
    updateFloatingNav();
}

// ===== PROGRESS =====
function updateProgress() {
    let totalActive = 0;
    let totalFilled = 0;

    document.querySelectorAll('.slide').forEach((slide, sectionIndex) => {
        let sectionActive = 0;
        let sectionFilled = 0;

        slide.querySelectorAll('.indicator-card').forEach(card => {
            const isSkipped = card.classList.contains('skipped');
            if (!isSkipped) {
                sectionActive++;
                const textarea = card.querySelector('textarea');
                if (textarea && textarea.value.trim().length > 0) {
                    sectionFilled++;
                }
            }
        });

        totalActive += sectionActive;
        totalFilled += sectionFilled;

        // Update tab count
        const tabCount = document.getElementById(`tabCount${sectionIndex}`);
        if (tabCount) {
            tabCount.textContent = `${sectionFilled}/${sectionActive}`;
        }

        // Mark tab as completed
        const tab = document.querySelector(`.section-tab[data-section="${sectionIndex}"]`);
        if (tab) {
            if (sectionActive > 0 && sectionFilled === sectionActive) {
                tab.classList.add('completed');
            } else {
                tab.classList.remove('completed');
            }
        }
    });

    // Overall progress
    const percentage = totalActive > 0 ? Math.round((totalFilled / totalActive) * 100) : 0;
    document.getElementById('progressPercentage').textContent = `${percentage}%`;
    document.getElementById('progressFill').style.width = `${percentage}%`;
}

// ===== FLOATING NAV =====
function initFloatingNav() {
    const toggle = document.getElementById('navToggle');
    const panel = document.getElementById('navPanel');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        panel.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-nav')) {
            toggle.classList.remove('active');
            panel.classList.remove('open');
        }
    });

    buildFloatingNav();
}

function buildFloatingNav() {
    const list = document.getElementById('navPanelList');
    list.innerHTML = '';

    sectionData.forEach((section, sIndex) => {
        const item = document.createElement('div');
        item.className = 'nav-section-item';

        const btn = document.createElement('button');
        btn.className = 'nav-section-btn';
        if (sIndex === currentSection) btn.classList.add('active-section');
        if (!unlockedSections.has(sIndex)) btn.classList.add('locked-section');

        btn.innerHTML = `
            <span class="nav-section-dot" style="background: ${section.color};"></span>
            ${section.name}
        `;

        btn.addEventListener('click', () => {
            if (unlockedSections.has(sIndex)) {
                goToSection(sIndex);
                document.getElementById('navPanel').classList.remove('open');
                document.getElementById('navToggle').classList.remove('active');
            }
        });

        item.appendChild(btn);

        // Sub-items
        const subList = document.createElement('div');
        subList.className = 'nav-sub-list';

        section.indicators.forEach(indId => {
            const sub = document.createElement('div');
            sub.className = 'nav-sub-item';
            sub.textContent = `${indId} ${indicatorNames[indId]}`;

            // Check status
            const card = document.querySelector(`[data-indicator="${indId}"]`);
            if (card) {
                if (card.classList.contains('skipped')) {
                    sub.classList.add('skipped-nav');
                } else {
                    const textarea = card.querySelector('textarea');
                    if (textarea && textarea.value.trim().length > 0) {
                        sub.classList.add('completed');
                    }
                }
            }

            sub.addEventListener('click', () => {
                if (unlockedSections.has(sIndex)) {
                    goToSection(sIndex);
                    setTimeout(() => {
                        const targetCard = document.querySelector(`[data-indicator="${indId}"]`);
                        if (targetCard) {
                            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetCard.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.4)';
                            setTimeout(() => {
                                targetCard.style.boxShadow = '';
                            }, 2000);
                        }
                    }, 700);
                    document.getElementById('navPanel').classList.remove('open');
                    document.getElementById('navToggle').classList.remove('active');
                }
            });

            subList.appendChild(sub);
        });

        item.appendChild(subList);
        list.appendChild(item);
    });
}

function updateFloatingNav() {
    buildFloatingNav();
}

// ===== SUBMIT =====
function submitAssessment() {
    const allCards = document.querySelectorAll('.indicator-card');
    let filled = 0;
    let active = 0;
    let skipped = 0;

    allCards.forEach(card => {
        if (card.classList.contains('skipped')) {
            skipped++;
        } else {
            active++;
            const textarea = card.querySelector('textarea');
            if (textarea && textarea.value.trim().length > 0) {
                filled++;
            }
        }
    });

    const percentage = active > 0 ? Math.round((filled / active) * 100) : 0;

    if (filled < active) {
        const proceed = confirm(
            `You've completed ${filled} out of ${active} active indicators (${percentage}%).\n` +
            `${skipped} indicators were skipped.\n\n` +
            `Do you want to submit anyway?`
        );
        if (!proceed) return;
    }

    alert(
        `✅ Assessment Submitted!\n\n` +
        `Completed: ${filled}/${active} indicators\n` +
        `Skipped: ${skipped} indicators\n` +
        `Completion: ${percentage}%\n\n` +
        `Thank you for completing the SME Sustainability Scorecard.`
    );
}
