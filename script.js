// ===== DATA =====
const categories = [
    {
        name: 'Carbon & Climate Performance',
        color: '#16a34a',
        description: 'Tracks how well the company monitors, targets, and reduces its carbon emissions.',
        indicators: [
            { id: '1.1', title: 'Carbon Emissions Tracking', desc: 'Does the company systematically track its carbon emissions (Scope 1 & 2)?', sources: ['Q2.1', 'Q2.2'] },
            { id: '1.2', title: 'Emissions Tracking Maturity', desc: 'How advanced is the company\'s emissions tracking capability, and what challenges remain?', sources: ['Q2.3'] },
            { id: '1.3', title: 'Net-Zero Target', desc: 'Does the company have a stated net-zero carbon emissions target with a clear timeline?', sources: ['Q4.6'] },
            { id: '1.4', title: 'Emissions Reduction Plan', desc: 'Does the company have a concrete reduction plan for Scope 1 and/or Scope 2 emissions?', sources: ['Q4.7'] },
            { id: '1.5', title: 'Intensity-Based Reduction Target', desc: 'Does the company have an emissions intensity target (e.g., tCO₂e per unit of revenue)?', sources: ['Q4.9'] }
        ]
    },
    {
        name: 'Energy & Resource Use',
        color: '#ea580c',
        description: 'Measures energy consumption, resource efficiency, waste management, and renewable adoption.',
        indicators: [
            { id: '2.1', title: 'Physical Footprint', desc: 'Does the company own, lease, or operate physical land or facilities?', sources: ['Q2.4', 'Q2.5', 'Q2.6'] },
            { id: '2.2', title: 'Machinery & Equipment Energy', desc: 'Energy consumption for machinery/equipment by source over the last 3 years.', sources: ['Q2.7'] },
            { id: '2.3', title: 'Vehicle Fleet & Energy', desc: 'Does the company operate its own vehicle fleet, and what is its energy consumption?', sources: ['Q2.8', 'Q2.9'] },
            { id: '2.4', title: 'Electricity Consumption', desc: 'Total electricity consumption and cost trend over the last 3 years.', sources: ['Q2.10'] },
            { id: '2.5', title: 'Renewable Energy Adoption', desc: 'Has the company generated, purchased, or sold renewable energy (including RECs)?', sources: ['Q2.11', 'Q2.12'] },
            { id: '2.6', title: 'Water Consumption', desc: 'Company water consumption trend (cubic meters) over the last 3 years.', sources: ['Q2.13'] },
            { id: '2.7', title: 'Waste Generation & Recycling', desc: 'Waste generated vs. recycled, and percentage of recycled input materials used.', sources: ['Q2.14', 'Q2.15', 'Q2.16'] }
        ]
    },
    {
        name: 'Environmental Stewardship',
        color: '#2563eb',
        description: 'Assesses awareness and management of impact on natural ecosystems.',
        indicators: [
            { id: '3.1', title: 'Biodiversity Exposure', desc: 'Are any sites located in or near areas of high biodiversity value?', sources: ['Q2.17'] },
            { id: '3.2', title: 'Environmental Impact Assessment', desc: 'Has the company conducted an EIA or similar environmental review?', sources: ['Q2.18'] }
        ]
    },
    {
        name: 'Social & Workforce Responsibility',
        color: '#9333ea',
        description: 'Evaluates workforce management, fair treatment, development, and wellbeing.',
        indicators: [
            { id: '4.1', title: 'Workforce Strategy', desc: 'Does the company have a formal HR strategy to attract, retain, and develop employees?', sources: ['Q3.1'] },
            { id: '4.2', title: 'Workforce Composition & Diversity', desc: 'Employee breakdown by contract status, gender, and age group.', sources: ['Q3.2'] },
            { id: '4.3', title: 'Employee Retention', desc: 'Employee turnover rate by gender over the last 3 years.', sources: ['Q3.3'] },
            { id: '4.4', title: 'Fair Compensation', desc: 'Average annual salary and gender pay gap review.', sources: ['Q3.4', 'Q3.5'] },
            { id: '4.5', title: 'Benefits & Entitlements', desc: 'Leave entitlements and ownership-based benefits (e.g., ESOP, share options).', sources: ['Q3.6', 'Q3.7', 'Q3.12', 'Q3.14'] },
            { id: '4.6', title: 'Training & Development', desc: 'Total training hours, costs, and number of employees trained.', sources: ['Q3.8'] },
            { id: '4.7', title: 'Health & Safety', desc: 'Formal H&S policy and occupational health incidents.', sources: ['Q3.9', 'Q3.10'] },
            { id: '4.8', title: 'Misconduct & Ethics', desc: 'Number of misconduct incidents and associated costs.', sources: ['Q3.11'] },
            { id: '4.9', title: 'Community & Volunteering', desc: 'Employee volunteering footprint for social impact.', sources: ['Q3.13'] },
            { id: '4.10', title: 'Stakeholder Satisfaction', desc: 'Employee or customer satisfaction surveys conducted.', sources: ['Q3.15'] }
        ]
    },
    {
        name: 'Governance, Targets & Transparency',
        color: '#475569',
        description: 'Assesses corporate governance, sustainability strategy, disclosure, and ethical conduct.',
        indicators: [
            { id: '5.1', title: 'Board Composition & Oversight', desc: 'Board composition and changes in the past 2 years.', sources: ['Q4.1', 'Q4.2', 'Q4.3'] },
            { id: '5.2', title: 'Sustainability Personnel', desc: 'Does the company have dedicated sustainability staff?', sources: ['Q4.4'] },
            { id: '5.3', title: 'Sustainability Strategy', desc: 'Does the company have a documented sustainability strategy?', sources: ['Q4.5'] },
            { id: '5.4', title: 'Sustainability Training', desc: 'Sustainability-related training and certifications obtained.', sources: ['Q4.10'] },
            { id: '5.5', title: 'Sustainability Reporting', desc: 'Does the company publish a sustainability report or climate risk disclosure?', sources: ['Q4.11', 'Q4.12'] },
            { id: '5.6', title: 'ESG Rating', desc: 'Does the company currently have or seek an ESG rating?', sources: ['Q4.13', 'Q4.14'] },
            { id: '5.7', title: 'Materiality Assessment', desc: 'Has the company conducted a materiality assessment?', sources: ['Q4.15'] },
            { id: '5.8', title: 'Ethical Conduct', desc: 'Costs incurred from unethical behaviour incidents.', sources: ['Q4.16'] },
            { id: '5.9', title: 'Cybersecurity & Data Privacy', desc: 'Costs incurred from cyber attacks and privacy breaches.', sources: ['Q4.17'] }
        ]
    }
];

// ===== STATE =====
let currentSection = 0;
let skippedIndicators = new Set();
let completedIndicators = new Set();

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    buildPills();
    buildSections();
    buildFloatingNav();
    updateProgress();
    goToSection(0);

    document.getElementById('floatingNavBtn').addEventListener('click', toggleNav);
    document.getElementById('navPanelClose').addEventListener('click', closeNav);
    document.getElementById('navOverlay').addEventListener('click', closeNav);
});

// ===== BUILD PILLS =====
function buildPills() {
    const track = document.getElementById('pillsTrack');
    categories.forEach((cat, i) => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        pill.dataset.section = i;
        pill.innerHTML = `
            <span class="pill-dot" style="background:${cat.color}"></span>
            <span>${cat.name}</span>
            <span class="pill-count" id="pillCount${i}">0/${cat.indicators.length}</span>
        `;
        pill.addEventListener('click', () => goToSection(i));
        track.appendChild(pill);
    });
}

// ===== BUILD SECTIONS =====
function buildSections() {
    const track = document.getElementById('sectionsTrack');

    categories.forEach((cat, si) => {
        const slide = document.createElement('div');
        slide.className = 'section-slide';
        slide.id = `section${si}`;

        let cardsHTML = '';
        cat.indicators.forEach((ind, ii) => {
            const key = `${si}-${ii}`;
            const tagsHTML = ind.sources.map(s => `<span class="indicator-tag">${s}</span>`).join('');

            cardsHTML += `
                <div class="indicator-card" id="card-${key}" data-key="${key}">
                    <div class="indicator-top">
                        <div class="indicator-info">
                            <div class="indicator-badge" style="background:${cat.color}">${ind.id}</div>
                            <div class="indicator-title">${ind.title}</div>
                            <div class="indicator-desc">${ind.desc}</div>
                            <div class="indicator-tags">${tagsHTML}</div>
                        </div>
                        <div class="toggle-wrapper">
                            <label class="toggle-switch">
                                <input type="checkbox" checked data-key="${key}" onchange="handleToggle(this)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            `;
        });

        const prevBtn = si > 0
            ? `<button class="nav-btn" onclick="goToSection(${si - 1})">← Back to Section ${si}</button>`
            : `<div class="nav-btn hidden"></div>`;

        const nextBtn = si < categories.length - 1
            ? `<button class="nav-btn primary" onclick="goToSection(${si + 1})">Continue to Section ${si + 2} →</button>`
            : `<div class="nav-btn hidden"></div>`;

        slide.innerHTML = `
            <div class="section-inner">
                <div class="section-header">
                    <div class="section-overline" style="color:${cat.color}">Section ${si + 1}</div>
                    <div class="section-title">${cat.name}</div>
                    <div class="section-description">${cat.description}</div>
                    <div class="section-meta">
                        <div class="section-progress-mini">
                            <div class="section-progress-mini-fill" id="sectionFill${si}" style="background:${cat.color}"></div>
                        </div>
                        <div class="section-count"><strong id="sectionActive${si}">${cat.indicators.length}</strong>/${cat.indicators.length}</div>
                    </div>
                </div>
                ${cardsHTML}
                <div class="section-nav">
                    ${prevBtn}
                    ${nextBtn}
                </div>
            </div>
        `;

        track.appendChild(slide);
    });
}

// ===== TOGGLE HANDLER =====
function handleToggle(checkbox) {
    const key = checkbox.dataset.key;
    const card = document.getElementById(`card-${key}`);

    if (checkbox.checked) {
        skippedIndicators.delete(key);
        card.classList.remove('skipped');
    } else {
        skippedIndicators.add(key);
        completedIndicators.delete(key);
        card.classList.add('skipped');
    }

    updateProgress();
    updateFloatingNav();
}

// ===== NAVIGATION =====
function goToSection(index) {
    currentSection = index;
    const track = document.getElementById('sectionsTrack');
    track.style.transform = `translateX(-${index * 100}%)`;

    // Update pills
    document.querySelectorAll('.pill').forEach((pill, i) => {
        pill.classList.toggle('active', i === index);
    });

    // Update floating nav
    updateFloatingNav();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== PROGRESS =====
function updateProgress() {
    let totalIndicators = 0;
    let totalSkipped = 0;

    categories.forEach((cat, si) => {
        let sectionTotal = cat.indicators.length;
        let sectionSkipped = 0;

        cat.indicators.forEach((_, ii) => {
            const key = `${si}-${ii}`;
            if (skippedIndicators.has(key)) sectionSkipped++;
        });

        let sectionActive = sectionTotal - sectionSkipped;

        // Update section mini progress
        const fill = document.getElementById(`sectionFill${si}`);
        const activeEl = document.getElementById(`sectionActive${si}`);
        const pillCount = document.getElementById(`pillCount${si}`);

        if (fill) fill.style.width = `${(sectionActive / sectionTotal) * 100}%`;
        if (activeEl) activeEl.textContent = sectionActive;
        if (pillCount) pillCount.textContent = `${sectionActive}/${sectionTotal}`;

        totalIndicators += sectionTotal;
        totalSkipped += sectionSkipped;
    });

    let totalActive = totalIndicators - totalSkipped;
    // For now, completed = 0 since no input fields yet
    // Progress = 0% until real questions are added
    let totalCompleted = completedIndicators.size;

    let pctCompleted = totalActive > 0 ? (totalCompleted / totalActive) * 100 : 0;
    let pctSkipped = (totalSkipped / totalIndicators) * 100;
    let pctRemaining = 100 - pctCompleted - pctSkipped;

    document.getElementById('statusCompleted').textContent = totalCompleted;
    document.getElementById('statusTotal').textContent = totalActive;

    document.getElementById('barCompleted').style.width = `${pctCompleted}%`;
    document.getElementById('barSkipped').style.width = `${pctSkipped}%`;
    document.getElementById('barRemaining').style.width = `${pctRemaining}%`;

    document.getElementById('legendCompleted').textContent = totalCompleted;
    document.getElementById('legendSkipped').textContent = totalSkipped;
    document.getElementById('legendRemaining').textContent = totalActive - totalCompleted;

    // Update status dot color
    const dot = document.querySelector('.status-dot');
    if (pctCompleted === 100) {
        dot.style.background = '#16a34a';
    } else if (pctCompleted > 0) {
        dot.style.background = '#f59e0b';
    } else {
        dot.style.background = '#d1d5db';
    }
}

// ===== FLOATING NAV =====
function buildFloatingNav() {
    const content = document.getElementById('navPanelContent');
    let html = '';

    categories.forEach((cat, si) => {
        let subsHTML = '';
        cat.indicators.forEach((ind, ii) => {
            const key = `${si}-${ii}`;
            subsHTML += `<div class="nav-sub-item" data-key="${key}" onclick="navToIndicator(${si}, '${key}')">${ind.id} ${ind.title}</div>`;
        });

        html += `
            <div class="nav-section-item ${si === 0 ? 'active' : ''}" data-section="${si}" onclick="goToSection(${si}); closeNav();">
                <div class="nav-section-name">
                    <span class="nav-section-dot" style="background:${cat.color}"></span>
                    ${cat.name}
                </div>
            </div>
            <div class="nav-sub-list" id="navSubs${si}">
                ${subsHTML}
            </div>
        `;
    });

    content.innerHTML = html;
}

function updateFloatingNav() {
    document.querySelectorAll('.nav-section-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentSection);
    });

    skippedIndicators.forEach(key => {
        const el = document.querySelector(`.nav-sub-item[data-key="${key}"]`);
        if (el) el.classList.add('skipped');
    });

    document.querySelectorAll('.nav-sub-item').forEach(el => {
        const key = el.dataset.key;
        if (!skippedIndicators.has(key)) {
            el.classList.remove('skipped');
        }
    });
}

function navToIndicator(sectionIndex, key) {
    goToSection(sectionIndex);
    closeNav();
    setTimeout(() => {
        const card = document.getElementById(`card-${key}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.boxShadow = '0 0 0 2px ' + categories[sectionIndex].color;
            setTimeout(() => { card.style.boxShadow = ''; }, 1500);
        }
    }, 500);
}

function toggleNav() {
    const panel = document.getElementById('floatingNavPanel');
    const overlay = document.getElementById('navOverlay');
    panel.classList.toggle('open');
    overlay.classList.toggle('open');
}

function closeNav() {
    document.getElementById('floatingNavPanel').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('open');
}
