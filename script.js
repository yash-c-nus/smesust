// Section data
const sectionColors = ['#16a34a', '#f59e0b', '#3b82f6', '#8b5cf6', '#64748b'];
const sectionNames = [
    'Carbon & Climate Performance',
    'Energy & Resource Use',
    'Environmental Stewardship',
    'Social & Workforce Responsibility',
    'Governance, Targets & Transparency'
];

let currentSection = 0;

// Go to section
function goToSection(index) {
    currentSection = index;
    const track = document.getElementById('slider-track');
    track.style.transform = `translateX(-${index * 100}%)`;

    // Update pills
    document.querySelectorAll('.pill').forEach((pill, i) => {
        pill.classList.toggle('active', i === index);
        if (i === index) {
            pill.style.background = '';
            pill.style.borderColor = sectionColors[i];
            pill.style.color = sectionColors[i];
        } else {
            pill.style.background = '';
            pill.style.borderColor = '';
            pill.style.color = '';
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update progress
function updateProgress() {
    const sections = document.querySelectorAll('.slide');
    let totalActive = 0;
    let totalSkipped = 0;
    let totalAll = 0;

    sections.forEach((section, sIdx) => {
        const cards = section.querySelectorAll('.indicator-card');
        let sectionActive = 0;
        let sectionTotal = cards.length;
        let sectionSkipped = 0;

        cards.forEach(card => {
            const toggle = card.querySelector('.toggle input');
            if (toggle.checked) {
                sectionActive++;
            } else {
                sectionSkipped++;
            }
        });

        totalActive += sectionActive;
        totalSkipped += sectionSkipped;
        totalAll += sectionTotal;

        // Update pill count
        const pillCount = document.getElementById(`pill-count-${sIdx}`);
        if (pillCount) {
            pillCount.textContent = `${sectionActive}/${sectionTotal}`;
        }

        // Update ring
        const ring = document.getElementById(`ring-${sIdx}`);
        if (ring) {
            const pct = sectionTotal > 0 ? (sectionActive / sectionTotal) * 100 : 0;
            const fill = ring.querySelector('.ring-fill');
            fill.setAttribute('stroke-dasharray', `${pct}, 100`);
            const text = ring.querySelector('.ring-text');
            text.textContent = `${sectionActive}/${sectionTotal}`;
        }
    });

    // Update status card - progress starts at 0, currently no input fields
    // so we track active (non-skipped) indicators as a proxy
    // When real inputs are added, this will track filled inputs
    const completedCount = document.getElementById('completed-count');
    const totalCount = document.getElementById('total-count');
    completedCount.textContent = totalActive;
    totalCount.textContent = totalAll;

    const activePct = totalAll > 0 ? (totalActive / totalAll) * 100 : 0;
    const skippedPct = totalAll > 0 ? (totalSkipped / totalAll) * 100 : 0;

    document.getElementById('status-bar-active').style.width = `${activePct}%`;
    document.getElementById('status-bar-skipped').style.width = `${skippedPct}%`;
}

// Build floating nav
function buildFloatNav() {
    const container = document.getElementById('float-nav-sections');
    container.innerHTML = '';

    sectionNames.forEach((name, sIdx) => {
        const section = document.createElement('div');
        section.className = 'float-nav-section';

        const title = document.createElement('div');
        title.className = 'float-nav-section-title';
        title.innerHTML = `<span class="float-nav-dot" style="background:${sectionColors[sIdx]}"></span> ${name}`;
        title.onclick = () => {
            goToSection(sIdx);
            document.getElementById('float-nav-panel').classList.remove('open');
        };
        section.appendChild(title);

        // Add subsections
        const slide = document.querySelectorAll('.slide')[sIdx];
        const cards = slide.querySelectorAll('.indicator-card');
        cards.forEach((card, cIdx) => {
            const cardTitle = card.querySelector('.indicator-title').textContent;
            const sub = document.createElement('div');
            sub.className = 'float-nav-sub';
            const toggle = card.querySelector('.toggle input');
            if (!toggle.checked) sub.classList.add('skipped');
            sub.textContent = cardTitle;
            sub.onclick = () => {
                goToSection(sIdx);
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.boxShadow = '0 0 0 2px ' + sectionColors[sIdx];
                    setTimeout(() => { card.style.boxShadow = ''; }, 1500);
                }, 600);
                document.getElementById('float-nav-panel').classList.remove('open');
            };
            section.appendChild(sub);
        });

        container.appendChild(section);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Pill clicks
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
            goToSection(parseInt(pill.dataset.section));
        });
    });

    // Toggle switches
    document.querySelectorAll('.toggle input').forEach(toggle => {
        toggle.addEventListener('change', () => {
            const card = toggle.closest('.indicator-card');
            card.classList.toggle('skipped', !toggle.checked);
            updateProgress();
            buildFloatNav();
        });
    });

    // Float nav toggle
    document.getElementById('float-nav-btn').addEventListener('click', () => {
        document.getElementById('float-nav-panel').classList.toggle('open');
    });

    // Close float nav on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.float-nav-panel') && !e.target.closest('.float-nav-btn')) {
            document.getElementById('float-nav-panel').classList.remove('open');
        }
    });

    // Initial state
    goToSection(0);
    updateProgress();
    buildFloatNav();
});
