// ===== DATA =====
const sections = [
    {
        id: 1,
        title: "Carbon & Climate Performance",
        desc: "How well the company tracks, targets, and reduces its carbon emissions — both in ambition and in practice.",
        color: "#16a34a",
        indicators: [
            { id: "1.1", title: "Carbon Emissions Tracking", desc: "Does the company systematically track its carbon emissions (Scope 1 & 2)?", tags: ["Q2.1", "Q2.2"] },
            { id: "1.2", title: "Emissions Tracking Maturity", desc: "How advanced and complete is the company's emissions tracking capability, and what challenges remain?", tags: ["Q2.3"] },
            { id: "1.3", title: "Net-Zero Target", desc: "Does the company have a stated net-zero carbon emissions target with a clear timeline?", tags: ["Q4.6"] },
            { id: "1.4", title: "Emissions Reduction Plan", desc: "Does the company have a concrete reduction plan for Scope 1 and/or Scope 2 emissions?", tags: ["Q4.7"] },
            { id: "1.5", title: "Intensity-Based Reduction Target", desc: "Does the company have an emissions intensity target (e.g., tCO₂e per unit of revenue or output)?", tags: ["Q4.9"] }
        ]
    },
    {
        id: 2,
        title: "Energy & Resource Use",
        desc: "The company's energy consumption patterns, resource efficiency, waste management, and adoption of renewables.",
        color: "#f59e0b",
        indicators: [
            { id: "2.1", title: "Physical Footprint", desc: "Does the company own, lease, or operate physical land or facilities?", tags: ["Q2.4", "Q2.5", "Q2.6"] },
            { id: "2.2", title: "Machinery & Equipment Energy Use", desc: "What is the energy consumption for machinery/equipment by source over the last 3 years?", tags: ["Q2.7"] },
            { id: "2.3", title: "Vehicle Fleet & Energy", desc: "Does the company operate its own vehicle fleet, and what is its energy consumption?", tags: ["Q2.8", "Q2.9"] },
            { id: "2.4", title: "Electricity Consumption", desc: "What is the total electricity consumption and cost trend over the last 3 years?", tags: ["Q2.10"] },
            { id: "2.5", title: "Renewable Energy Adoption", desc: "Has the company generated, purchased, or sold renewable energy (including RECs)?", tags: ["Q2.11", "Q2.12"] },
            { id: "2.6", title: "Water Consumption", desc: "What is the company's water consumption trend (cubic meters) over the last 3 years?", tags: ["Q2.13"] },
            { id: "2.7", title: "Waste Generation & Recycling", desc: "What is the company's waste generated vs. waste recycled, and what % of recycled input materials are used?", tags: ["Q2.14", "Q2.15", "Q2.16"] }
        ]
    },
    {
        id: 3,
        title: "Environmental Stewardship",
        desc: "The company's awareness and management of its impact on natural ecosystems and surrounding environments.",
        color: "#3b82f6",
        indicators: [
            { id: "3.1", title: "Biodiversity Exposure", desc: "Are any company sites located in or near areas of high biodiversity value (nature reserves, wetlands, forests, coastal zones, mangroves)?", tags: ["Q2.17"] },
            { id: "3.2", title: "Environmental Impact Assessment", desc: "Has the company conducted an EIA or similar environmental review to evaluate how its operations affect the environment?", tags: ["Q2.18"] }
        ]
    },
    {
        id: 4,
        title: "Social & Workforce Responsibility",
        desc: "How the company manages its workforce, ensures fair treatment, invests in development, and safeguards health and wellbeing.",
        color: "#8b5cf6",
        indicators: [
            { id: "4.1", title: "Workforce Strategy", desc: "Does the company have a formal HR strategy to attract, retain, and develop employees?", tags: ["Q3.1"] },
            { id: "4.2", title: "Workforce Composition & Diversity", desc: "What is the employee breakdown by contract status, gender, and age group?", tags: ["Q3.2"] },
            { id: "4.3", title: "Employee Retention", desc: "What is the employee turnover rate by gender over the last 3 years?", tags: ["Q3.3"] },
            { id: "4.4", title: "Fair Compensation", desc: "What is the average annual salary per employee, and has the company reviewed gender pay gaps?", tags: ["Q3.4", "Q3.5"] },
            { id: "4.5", title: "Benefits & Entitlements", desc: "What leave entitlements and ownership-based benefits does the company provide?", tags: ["Q3.6", "Q3.7", "Q3.12", "Q3.14"] },
            { id: "4.6", title: "Training & Development", desc: "What are the total training hours, costs, and number of employees trained?", tags: ["Q3.8"] },
            { id: "4.7", title: "Health & Safety", desc: "Does the company have a formal H&S policy, and how many occupational health incidents occurred?", tags: ["Q3.9", "Q3.10"] },
            { id: "4.8", title: "Misconduct & Ethics", desc: "How many misconduct incidents occurred and what were the associated costs?", tags: ["Q3.11"] },
            { id: "4.9", title: "Community & Volunteering", desc: "What is the company's employee volunteering footprint for social impact?", tags: ["Q3.13"] },
            { id: "4.10", title: "Stakeholder Satisfaction", desc: "Has the company conducted employee or customer satisfaction surveys?", tags: ["Q3.15"] }
        ]
    },
    {
        id: 5,
        title: "Governance, Targets & Transparency",
        desc: "The quality of corporate governance, sustainability strategy, disclosure practices, and ethical conduct.",
        color: "#64748b",
        indicators: [
            { id: "5.1", title: "Board Composition & Oversight", desc: "What is the board's composition, and have there been changes in the past 2 years?", tags: ["Q4.1", "Q4.2", "Q4.3"] },
            { id: "5.2", title: "Sustainability Personnel", desc: "Does the company have dedicated sustainability staff?", tags: ["Q4.4"] },
            { id: "5.3", title: "Sustainability Strategy", desc: "Does the company have a documented sustainability strategy?", tags: ["Q4.5"] },
            { id: "5.4", title: "Sustainability Training & Certifications", desc: "What sustainability-related training and certifications has the company or its sustainability team obtained?", tags: ["Q4.10"] },
            { id: "5.5", title: "Sustainability Reporting & Disclosure", desc: "Does the company publish a sustainability report or climate risk disclosure?", tags: ["Q4.11", "Q4.12"] },
            { id: "5.6", title: "ESG Rating", desc: "Does the company currently have or seek an ESG rating?", tags: ["Q4.13", "Q4.14"] },
            { id: "5.7", title: "Materiality Assessment", desc: "Has the company conducted a materiality assessment of its business activities on society and stakeholders?", tags: ["Q4.15"] },
            { id: "5.8", title: "Ethical Conduct", desc: "What costs has the company incurred from unethical behaviour incidents?", tags: ["Q4.16"] },
            { id: "5.9", title: "Cybersecurity & Data Privacy", desc: "What costs has the company incurred from cyber attacks and privacy breaches?", tags: ["Q4.17"] }
        ]
    }
];

let currentSlide = 0;
const totalIndicators = sections.reduce((sum, s) => sum + s.indicators.length, 0);

// ===== BUILD UI =====
function buildPills() {
    const wrap = document.getElementById('sectionPills');
    sections.forEach((s, i) => {
        const pill = document.createElement('button');
        pill.className = 'pill' + (i === 0 ? ' active' : '');
        pill.dataset.index = i;
        pill.innerHTML = `<span class="dot" style="background:${s.color}"></span>${s.title}<span class="pill-count">0/${s.indicators.length}</span>`;
        pill.onclick = () => goToSlide(i);
        wrap.appendChild(pill);
    });
}

function buildSlides() {
    const track = document.getElementById('sliderTrack');
    sections.forEach((s, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.id = `slide-${i}`;

        let indicatorsHTML = '';
        s.indicators.forEach(ind => {
            const tagsHTML = ind.tags.map(t => `<span class="tag">${t}</span>`).join('');
            indicatorsHTML += `
                <div class="indicator-card" data-section="${i}" data-id="${ind.id}" id="card-${ind.id}">
                    <div class="indicator-top">
                        <div class="indicator-left">
                            <span class="indicator-badge" style="background:${s.color}">${ind.id}</span>
                            <div class="indicator-title">${ind.title}</div>
                            <div class="indicator-desc">${ind.desc}</div>
                            <div class="indicator-tags">${tagsHTML}</div>
                        </div>
                        <div class="toggle-wrap">
                            <label class="toggle">
                                <input type="checkbox" checked onchange="toggleIndicator(this, ${i}, '${ind.id}')">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            `;
        });

        const backBtn = i > 0
            ? `<button class="nav-btn nav-btn-back" onclick="goToSlide(${i - 1})">← Back to Section ${i}</button>`
            : '<div></div>';
        const nextBtn = i < sections.length - 1
            ? `<button class="nav-btn nav-btn-next" onclick="goToSlide(${i + 1})">Continue to Section ${i + 2} →</button>`
            : '<div></div>';

        slide.innerHTML = `
            <div class="slide-inner">
                <div class="section-header-card" style="border-left-color:${s.color}">
                    <div class="section-number" style="color:${s.color}">Section ${s.id}</div>
                    <div class="section-title">${s.title}</div>
                    <div class="section-desc">${s.desc}</div>
                    <div class="section-progress-row">
                        <div class="section-progress-bar">
                            <div class="section-progress-fill" id="secProgress-${i}" style="background:${s.color}"></div>
                        </div>
                        <span class="section-progress-label" id="secLabel-${i}">0 of ${s.indicators.length} active</span>
                    </div>
                </div>
                ${indicatorsHTML}
                <div class="nav-buttons">
                    ${backBtn}
                    ${nextBtn}
                </div>
            </div>
        `;
        track.appendChild(slide);
    });
}

function buildFabNav() {
    const wrap = document.getElementById('fabNav');
    sections.forEach((s, i) => {
        const sec = document.createElement('div');
        sec.className = 'fab-section';
        let subsHTML = s.indicators.map(ind =>
            `<button class="fab-sub-item" id="fab-${ind.id}" onclick="goToSlide(${i}); closeFab();">${ind.id} ${ind.title}</button>`
        ).join('');
        sec.innerHTML = `
            <button class="fab-section-btn" onclick="goToSlide(${i}); closeFab();">
                <span class="fab-dot" style="background:${s.color}"></span>
                ${s.title}
            </button>
            <div class="fab-sub">${subsHTML}</div>
        `;
        wrap.appendChild(sec);
    });
}

// ===== NAVIGATION =====
function goToSlide(index) {
    currentSlide = index;
    document.getElementById('sliderTrack').style.transform = `translateX(-${index * 100}vw)`;
    document.querySelectorAll('.pill').forEach((p, i) => {
        p.classList.toggle('active', i === index);
        if (i === index) {
            p.style.background = sections[i].color;
            p.style.color = '#fff';
            p.style.borderColor = 'transparent';
        } else {
            p.style.background = '#fff';
            p.style.color = '#6b7280';
            p.style.borderColor = '#e5e7eb';
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== TOGGLE =====
function toggleIndicator(checkbox, sectionIndex, indicatorId) {
    const card = document.getElementById(`card-${indicatorId}`);
    const fabItem = document.getElementById(`fab-${indicatorId}`);
    if (checkbox.checked) {
        card.classList.remove('skipped');
        if (fabItem) fabItem.classList.remove('skipped');
    } else {
        card.classList.add('skipped');
        if (fabItem) fabItem.classList.add('skipped');
    }
    updateProgress();
}

// ===== PROGRESS =====
function updateProgress() {
    let totalActive = 0;
    let totalAll = 0;

    sections.forEach((s, i) => {
        const cards = document.querySelectorAll(`.indicator-card[data-section="${i}"]`);
        let sectionActive = 0;
        let sectionTotal = cards.length;
        cards.forEach(card => {
            const cb = card.querySelector('input[type="checkbox"]');
            if (cb && !cb.checked) {
                // skipped — not counted
            } else {
                sectionActive++;
            }
        });
        totalActive += sectionActive;
        totalAll += sectionTotal;

        // Section progress (active out of total)
        // Since no input fields yet, progress is 0%. Active count shown for reference.
        const secFill = document.getElementById(`secProgress-${i}`);
        const secLabel = document.getElementById(`secLabel-${i}`);
        if (secFill) secFill.style.width = '0%';
        if (secLabel) secLabel.textContent = `${sectionActive} of ${sectionTotal} active`;

        // Update pill count
        const pills = document.querySelectorAll('.pill');
        if (pills[i]) {
            const countEl = pills[i].querySelector('.pill-count');
            if (countEl) countEl.textContent = `${sectionActive}/${sectionTotal}`;
        }
    });

    // Overall progress — 0% since no inputs yet
    const pct = 0;
    document.getElementById('progressBarFill').style.width = pct + '%';
    document.getElementById('completedBadge').textContent = `0/${totalActive} Completed`;
}

// ===== FAB =====
function toggleFab() {
    const panel = document.getElementById('fabPanel');
    const btn = document.getElementById('fabBtn');
    panel.classList.toggle('open');
    btn.classList.toggle('open');
    btn.textContent = panel.classList.contains('open') ? '✕' : '☰';
}
function closeFab() {
    document.getElementById('fabPanel').classList.remove('open');
    document.getElementById('fabBtn').classList.remove('open');
    document.getElementById('fabBtn').textContent = '☰';
}
document.getElementById('fabBtn').onclick = toggleFab;

// ===== INIT =====
buildPills();
buildSlides();
buildFabNav();
goToSlide(0);
updateProgress();
