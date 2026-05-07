// ===== SECTION DATA =====
const sectionData = {
    1: { total: 5, color: '#16a34a', name: 'Carbon & Climate Performance' },
    2: { total: 7, color: '#ea580c', name: 'Energy & Resource Use' },
    3: { total: 2, color: '#2563eb', name: 'Environmental Stewardship' },
    4: { total: 10, color: '#9333ea', name: 'Social & Workforce Responsibility' },
    5: { total: 9, color: '#475569', name: 'Governance, Targets & Transparency' }
};

const circumference = 2 * Math.PI * 16; // ~100.53

// ===== TOGGLE SECTION (expand/collapse) =====
function toggleSection(sectionNum) {
    const row = document.querySelector(`.section-row[data-section="${sectionNum}"]`);
    const isExpanded = row.classList.contains('expanded');

    // Close all sections first
    document.querySelectorAll('.section-row').forEach(r => r.classList.remove('expanded'));

    // Toggle the clicked one
    if (!isExpanded) {
        row.classList.add('expanded');
    }
}

// ===== TOGGLE INDICATOR (skip/unskip) =====
function toggleIndicator(checkbox, indicatorId) {
    const card = checkbox.closest('.indicator-card');

    if (checkbox.checked) {
        card.classList.remove('skipped');
    } else {
        card.classList.add('skipped');
    }

    updateAllProgress();
}

// ===== UPDATE ALL PROGRESS =====
function updateAllProgress() {
    let totalActive = 0;
    let totalSkipped = 0;
    let totalAll = 0;

    for (let s = 1; s <= 5; s++) {
        const content = document.getElementById(`content-${s}`);
        const cards = content.querySelectorAll('.indicator-card');
        let active = 0;
        let skipped = 0;

        cards.forEach(card => {
            const cb = card.querySelector('input[type="checkbox"]');
            if (cb.checked) {
                active++;
            } else {
                skipped++;
            }
        });

        const total = cards.length;
        totalAll += total;
        totalActive += active;
        totalSkipped += skipped;

        // Update ring
        const ring = document.getElementById(`ring-${s}`);
        const ringText = document.getElementById(`ringtext-${s}`);
        const progress = total > 0 ? active / total : 0;
        const offset = circumference * (1 - progress);
        ring.style.strokeDashoffset = offset;
        ringText.textContent = `${active}/${total}`;

        // Update badge
        const badge = document.getElementById(`badge-${s}`);
        if (skipped === total) {
            badge.textContent = 'Skipped';
            badge.className = 'status-badge badge-skipped';
        } else if (active === total) {
            badge.textContent = 'Active';
            badge.className = 'status-badge badge-active';
        } else {
            badge.textContent = 'Partial';
            badge.className = 'status-badge badge-active';
        }
    }

    const totalNotStarted = totalAll - totalActive - totalSkipped;

    // Update status card
    document.getElementById('statusCompleted').textContent = totalActive;
    document.getElementById('statusTotal').textContent = totalAll;

    // Update bar segments
    const completedPct = (totalActive / totalAll) * 100;
    const skippedPct = (totalSkipped / totalAll) * 100;
    const notStartedPct = 100 - completedPct - skippedPct;

    document.getElementById('barCompleted').style.width = completedPct + '%';
    document.getElementById('barSkipped').style.width = skippedPct + '%';
    document.getElementById('barNotStarted').style.width = notStartedPct + '%';

    // Update legend
    document.getElementById('legendCompleted').textContent = totalActive;
    document.getElementById('legendSkipped').textContent = totalSkipped;
    document.getElementById('legendNotStarted').textContent = totalAll - totalActive - totalSkipped;
}

// ===== SEARCH =====
document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();

    document.querySelectorAll('.indicator-card').forEach(card => {
        const title = card.querySelector('.indicator-title').textContent.toLowerCase();
        const desc = card.querySelector('.indicator-desc').textContent.toLowerCase();
        const tags = card.querySelector('.indicator-tags').textContent.toLowerCase();

        if (query === '' || title.includes(query) || desc.includes(query) || tags.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    // Auto-expand sections that have matching results
    if (query !== '') {
        document.querySelectorAll('.section-row').forEach(row => {
            const visibleCards = row.querySelectorAll('.indicator-card[style="display: flex"]');
            if (visibleCards.length > 0) {
                row.classList.add('expanded');
            } else {
                row.classList.remove('expanded');
            }
        });
    }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    updateAllProgress();
});
