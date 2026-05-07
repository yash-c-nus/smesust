// ===== SECTION DATA =====
const sectionColors = ['#16a34a', '#f59e0b', '#3b82f6', '#8b5cf6', '#64748b'];
const sectionNames = [
    'Carbon & Climate',
    'Energy & Resource',
    'Environmental Stewardship',
    'Social & Workforce',
    'Governance & Transparency'
];

let currentSection = 0;

// ===== NAVIGATION =====
function goToSection(index) {
    currentSection = index;
    const track = document.getElementById('slidesTrack');
    track.style.transform = `translateX(-${index * 20}%)`;

    // Update pills
    document.querySelectorAll('.pill').forEach((pill, i) => {
        pill.classList.toggle('active', i === index);
    });

    // Update float nav
    updateFloatNav();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== TOGGLE HANDLER =====
function handleToggle(checkbox) {
    const card = checkbox.closest('.indicator-card');
    if (checkbox.checked) {
        card.classList.remove('skipped');
    } else {
        card.classList.add('skipped');
    }
    updateProgress();
    updateFloatNav();
}

// ===== PROGRESS UPDATE =====
function updateProgress() {
    const slides = document.querySelectorAll('.slide');
    let totalActive = 0;
    let totalSkipped = 0;
    let totalAll = 0;

    slides.forEach((slide, i) => {
        const cards = slide.querySelectorAll('.indicator-card');
        let sectionActive = 0;
        let sectionSkipped = 0;
        let sectionTotal = cards.length;

        cards.forEach(card => {
            const toggle = card.querySelector('input[type="checkbox"]');
            if (toggle && !toggle.checked) {
                sectionSkipped++;
            } else {
                sectionActive++;
            }
        });

        totalActive += sectionActive;
        totalSkipped += sectionSkipped;
        totalAll += sectionTotal;

        // Update pill count
        const pillCount = document.getElementById(`pillCount${i}`);
        if (pillCount) {
            pillCount.textContent = `${sectionActive}/${sectionTotal}`;
        }
    });

    // Since there are no input fields yet, progress = 0
    // Active indicators are counted but not "completed"
    // Progress will be based on filled inputs when added later
    const completed = 0; // Placeholder — will track filled inputs
    const notStarted = totalActive;

    // Update status card
    document.getElementById('statusCompleted').textContent = completed;
    document.getElementById('statusTotal').textContent = `/${totalAll}`;

    // Update status bar segments
    const completedPct = (completed / totalAll) * 100;
    const skippedPct = (totalSkipped / totalAll) * 100;
    const notStartedPct = 100 - completedPct - skippedPct;

    document.getElementById('segCompleted').style.width = completedPct + '%';
    document.getElementById('segSkipped').style.width = skippedPct + '%';
    document.getElementById('segNotstarted').style.width = notStartedPct + '%';
}

// ===== FLOATING NAV =====
function toggleFloatNav() {
    const panel = document.getElementById('floatNavPanel');
    panel.classList.toggle('open');
}

function updateFloatNav() {
    const list = document.getElementById('floatNavList');
    list.innerHTML = '';

    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'float-nav-section';

        const title = document.createElement('div');
        title.className = 'float-nav-section-title';
        title.innerHTML = `<span class="float-nav-dot" style="background:${sectionColors[i]}"></span>${sectionNames[i]}`;
        title.onclick = () => {
            goToSection(i);
            document.getElementById('floatNavPanel').classList.remove('open');
        };

        sectionDiv.appendChild(title);

        const cards = slide.querySelectorAll('.indicator-card');
        cards.forEach(card => {
            const sub = document.createElement('div');
            const id = card.getAttribute('data-id');
            const cardTitle = card.querySelector('.indicator-title').textContent;
            const isSkipped = card.classList.contains('skipped');

            sub.className = 'float-nav-sub' + (isSkipped ? ' skipped' : '');
            sub.textContent = `${id} ${cardTitle}`;
            sub.onclick = () => {
                goToSection(i);
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.boxShadow = '0 0 0 2px ' + sectionColors[i];
                    setTimeout(() => { card.style.boxShadow = ''; }, 1500);
                }, 600);
                document.getElementById('floatNavPanel').classList.remove('open');
            };

            sectionDiv.appendChild(sub);
        });

        list.appendChild(sectionDiv);
    });
}

// Close float nav when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('floatNavPanel');
    const btn = document.getElementById('floatNavBtn');
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('open');
    }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    updateFloatNav();
    goToSection(0);
});
