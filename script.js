// ===== CATEGORY DATA =====
const categoryData = {
    1: { name: 'Carbon & Climate', color: '#16a34a', subsections: ['1.1','1.2','1.3','1.4','1.5'] },
    2: { name: 'Energy & Resource', color: '#ea580c', subsections: ['2.1','2.2','2.3','2.4','2.5','2.6','2.7'] },
    3: { name: 'Env. Stewardship', color: '#2563eb', subsections: ['3.1','3.2'] },
    4: { name: 'Social & Workforce', color: '#9333ea', subsections: ['4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9','4.10'] },
    5: { name: 'Governance', color: '#475569', subsections: ['5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.8','5.9'] }
};

// Track state
const categoryState = {};
const subsectionState = {};

// Initialize states
Object.keys(categoryData).forEach(catId => {
    categoryState[catId] = true; // all active
    subsectionState[catId] = {};
    categoryData[catId].subsections.forEach(sub => {
        subsectionState[catId][sub] = true; // all active
    });
});

// ===== ACCORDION TOGGLE =====
document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', (e) => {
        // Don't toggle if clicking on the toggle switch
        if (e.target.closest('.toggle-switch') || e.target.closest('.toggle-group')) return;

        const block = header.closest('.category-block');
        
        // Don't expand if skipped
        if (block.classList.contains('skipped')) return;

        const wasActive = block.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.category-block').forEach(b => b.classList.remove('active'));
        
        // Open clicked one (if it wasn't already open)
        if (!wasActive) {
            block.classList.add('active');
            setTimeout(() => {
                block.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});

// ===== CATEGORY TOGGLE =====
function toggleCategory(catId, isActive) {
    categoryState[catId] = isActive;
    const block = document.querySelector(`.category-block[data-category="${catId}"]`);
    const label = block.querySelector('.toggle-label');

    if (isActive) {
        block.classList.remove('skipped');
        label.textContent = 'Active';
        label.classList.remove('off');

        // Restore all subsection toggles
        const cards = block.querySelectorAll('.indicator-card');
        cards.forEach(card => {
            const subId = card.dataset.subsection;
            subsectionState[catId][subId] = true;
            card.classList.remove('skipped');
            const toggle = card.querySelector('.toggle-switch input');
            if (toggle) toggle.checked = true;
        });
    } else {
        block.classList.add('skipped');
        block.classList.remove('active');
        label.textContent = 'Skipped';
        label.classList.add('off');

        // Disable all subsection toggles
        Object.keys(subsectionState[catId]).forEach(subId => {
            subsectionState[catId][subId] = false;
        });
    }

    updateProgress();
}

// ===== SUBSECTION TOGGLE =====
function toggleSubsection(catId, subId, isActive) {
    subsectionState[catId][subId] = isActive;
    const card = document.querySelector(`.indicator-card[data-subsection="${subId}"]`);

    if (isActive) {
        card.classList.remove('skipped');
    } else {
        card.classList.add('skipped');
    }

    // Check if all subsections in this category are off → auto-skip category
    const allOff = Object.values(subsectionState[catId]).every(v => !v);
    const block = document.querySelector(`.category-block[data-category="${catId}"]`);
    const catToggle = block.querySelector('.toggle-group .toggle-switch input');
    const label = block.querySelector('.toggle-label');

    if (allOff) {
        categoryState[catId] = false;
        block.classList.add('skipped');
        block.classList.remove('active');
        catToggle.checked = false;
        label.textContent = 'Skipped';
        label.classList.add('off');
    } else {
        // If category was skipped but a subsection is turned on, reactivate
        if (!categoryState[catId]) {
            categoryState[catId] = true;
            block.classList.remove('skipped');
            catToggle.checked = true;
            label.textContent = 'Active';
            label.classList.remove('off');
        }
    }

    updateProgress();
}

// ===== PROGRESS BAR =====
function buildProgressSegments() {
    const container = document.getElementById('progressCategories');
    container.innerHTML = '';
    Object.keys(categoryData).forEach(catId => {
        const seg = document.createElement('span');
        seg.className = 'progress-cat-segment';
        seg.id = `progSeg${catId}`;
        seg.style.background = categoryData[catId].color;
        seg.textContent = categoryData[catId].name;
        container.appendChild(seg);
    });
}

function updateProgress() {
    let totalSubs = 0;
    let activeSubs = 0;

    Object.keys(categoryData).forEach(catId => {
        const subs = categoryData[catId].subsections;
        totalSubs += subs.length;

        let catActive = 0;
        subs.forEach(subId => {
            if (subsectionState[catId][subId]) {
                activeSubs++;
                catActive++;
            }
        });

        // Update segment
        const seg = document.getElementById(`progSeg${catId}`);
        if (seg) {
            if (catActive === 0) {
                seg.classList.add('skipped');
            } else {
                seg.classList.remove('skipped');
            }
            const pct = Math.round((catActive / subs.length) * 100);
            seg.textContent = `${categoryData[catId].name} ${pct}%`;
        }
    });

    const overallPct = Math.round((activeSubs / totalSubs) * 100);
    document.getElementById('progressFill').style.width = overallPct + '%';
    document.getElementById('progressPercent').textContent = overallPct + '% Active';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    buildProgressSegments();
    updateProgress();
});
