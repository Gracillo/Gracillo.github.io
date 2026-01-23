// --- NAVIGATION LOGIC ---
const navButton = document.querySelector('.navButton');
const navList = document.querySelector('#navList');

if (navButton && navList) {
    navButton.addEventListener('click', () => {
        navList.classList.toggle('open');
        // Optional: Swap icon logic could go here
    });
}

// --- SCROLL UP LOGIC ---
const scrollUp = document.getElementById('scrollUp');
let lastScrollY = window.scrollY;

if (scrollUp) {
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Show button if we are not at the top AND we are scrolling UP
        if (currentScrollY > 100 && currentScrollY < lastScrollY) {
            scrollUp.classList.add('visible');
        } else {
            scrollUp.classList.remove('visible');
        }
        
        lastScrollY = currentScrollY;
    });

    scrollUp.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- DISCLAIMER MODAL LOGIC ---
const modal = document.getElementById('disclaimerModal');
const closeBtn = document.querySelector('.closeModal');

// Check Session Storage immediately
if (sessionStorage.getItem('disclaimerClosed') === 'true') {
    if (modal) modal.style.display = 'none';
}

if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        sessionStorage.setItem('disclaimerClosed', 'true');
    });
    
    // Close if clicking outside the box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            sessionStorage.setItem('disclaimerClosed', 'true');
        }
    });
}