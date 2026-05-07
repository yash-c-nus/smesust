// Section data
const sectionData = [
    { name: 'Carbon & Climate Performance', color: '#16a34a', count: 5 },
    { name: 'Energy & Resource Use', color: '#f59e0b', count: 7 },
    { name: 'Environmental Stewardship', color: '#3b82f6', count: 2 },
    { name: 'Social & Workforce Responsibility', color: '#8b5cf6', count: 10 },
    { name: 'Governance, Targets & Transparency', color: '#64748b', count: 9 }
];

// Track skipped indicators: skipped[sectionIndex][indicatorIndex] = true/false
const skipped = sectionData.map(s => new Array(s.count).fill(false));

let currentSection = 0;

// Go to section
function goToSection(index) {
    if (index < 0 || index >= sectionData.length) return;
    currentSection = index;

    const track = document.getElementById('slidesTrack');
    track.style.transform = `translateX(-${index * 20}%)`;

    // Update pills
    document.querySelectorAll('.pill').forEach((p, i) => {
        p.classList.toggle('active', i === index);
    });

    // Update nav panel
    document.querySelectorAll('.nav-section-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle toggle
function handleToggle(checkbox, sectionIndex, indicatorIndex) {
    const isActive = checkbox.checked;
    skipped[sectionIndex][indicatorIndex] = !isActive;

    const card = checkbox.closest('.indicator-card');
    card.classList.toggle('skipped', !isActive);

    updateProgress();
    updateNav();
}

// Update progress
function updateProgress() {
    let totalActive = 0;
    let totalSkipped = 0;
    let totalAll = 0;

    sectionData.forEach((section, sIndex) => {
        let sectionActive = 0;
        let sectionSkipped = 0;

        for (let i = 0; i < section.count; i++) {
            totalAll++;
            if (skipped[sIndex][i]) {
                sectionSkipped++;
                totalSkipped++;
            } else {
                sectionActive++;
                totalActive++;
            }
        }

        // Update pill counts
        const pillCount = document.getElementById(`pillCount${sIndex}`);
        if (pillCount) pillCount.textContent = `${sectionActive}/${section.count}`;

        // Update ring
        const ring = document.getElementById(`ring${sIndex}`);
        const ringText = document.getElementById(`ringText${sIndex}`);
        if (ring && ringText) {
            // Progress is 0 since no questions are filled yet
            // Ring shows active/total
            ringText.textContent = `${sectionActive}/${section.count}`;
            // Ring fill represents percentage of active (non-skipped)
            const pct = (sectionActive / section.count) * 100;
            ring.setAttribute('stroke-dasharray', `${pct}, 100`);
        }
    });

    // Status card — progress is 0% because no questions are filled
    // The 0/totalActive shows how many questions are completed out of active
    document.getElementById('completedCount').textContent = '0';
    document.getElementById('totalCount').textContent = totalActive;

    // Status bar — shows 0% completed, skipped %, rest not started
    const skippedPct = (totalSkipped / totalAll) * 100;
    document.getElementById('statusBarActive').style.width = '0%';
    document.getElementById('statusBarSkipped').style.width = `${skippedPct}%`;
}

// Toggle floating nav
function toggleNav() {
    const panel = document.getElementById('floatingNavPanel');
    panel.classList.toggle('open');
}

// Build nav panel
function buildNav() {
    const container = document.getElementById('navPanelSections');
    container.innerHTML = '';

    const indicators = [
        ['1.1 Carbon Emissions Tracking','1.2 Emissions Tracking Maturity','1.3 Net-Zero Target','1.4 Emissions Reduction Plan','1.5 Intensity-Based Reduction Target'],
        ['2.1 Physical Footprint','2.2 Machinery & Equipment Energy Use','2.3 Vehicle Fleet & Energy','2.4 Electricity Consumption','2.5 Renewable Energy Adoption','2.6 Water Consumption','2.7 Waste Generation & Recycling'],
        ['3.1 Biodiversity Exposure','3.2 Environmental Impact Assessment'],
        ['4.1 Workforce Strategy','4.2 Workforce Composition & Diversity','4.3 Employee Retention','4.4 Fair Compensation','4.5 Benefits & Entitlements','4.6 Training & Development','4.7 Health & Safety','4.8 Misconduct & Ethics','4.9 Community & Volunteering','4.10 Stakeholder Satisfaction'],
        ['5.1 Board Composition & Oversight','5.2 Sustainability Personnel','5.3 Sustainability Strategy','5.4 Sustainability Training & Certifications','5.5 Sustainability Reporting & Disclosure','5.6 ESG Rating','5.7 Materiality Assessment','5.8 Ethical Conduct','5.9 Cybersecurity & Data Privacy']
    ];

    sectionData.forEach((section, sIndex) => {
        const sectionItem = document.createElement('div');
        sectionItem.className = `nav-section-item${sIndex === currentSection ? ' active' : ''}`;
        sectionItem.innerHTML = `<span class="nav-section-dot" style="background:${section.color}"></span>${section.name}`;
        sectionItem.onclick = () => { goToSection(sIndex); };
        container.appendChild(sectionItem);

        indicators[sIndex].forEach((name, iIndex) => {
            const subItem = document.createElement('div');
            subItem.className = `nav-sub-item${skipped[sIndex][iIndex] ? ' skipped' : ''}`;
            subItem.textContent = name;
            subItem.onclick = () => {
                goToSection(sIndex);
                setTimeout(() => {
                    const cards = document.querySelectorAll(`.slide[data-section-index="${sIndex}"] .indicator-card`);
                    if (cards[iIndex]) {
                        cards[iIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        cards[iIndex].style.boxShadow = '0 0 0 2px ' + section.color;
                        setTimeout(() => { cards[iIndex].style.boxShadow = ''; }, 1500);
                    }
                }, 300);
            };
            container.appendChild(subItem);
        });
    });
}

// Update nav
function updateNav() {
    buildNav();
}

// Pill clicks
document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const sIndex = parseInt(pill.dataset.section);
        goToSection(sIndex);
    });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
    const panel = document.getElementById('floatingNavPanel');
    const btn = document.getElementById('floatingNavBtn');
    if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('open');
    }
});

// Init
buildNav();
updateProgress();
