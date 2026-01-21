// ============================================
// VIEWER COUNT ANIMATION
// ============================================

(function() {
    const viewerCountEl = document.getElementById('viewerCount');
    if (!viewerCountEl) return;

    const MIN = 702;
    const MAX = 880;
    let viewers = Math.floor(720 + Math.random() * 120);

    function clamp(n, lo, hi) {
        return Math.max(lo, Math.min(hi, n));
    }

    function tick() {
        // Random walk to make the number fluctuate naturally
        let delta = Math.floor(Math.random() * 7) - 3;
        
        // Nudge logic to keep it within range
        if (viewers < 730) delta += Math.floor(Math.random() * 3) + 1;
        if (viewers > 860) delta -= Math.floor(Math.random() * 4) + 1;

        viewers = clamp(viewers + delta, MIN, MAX);
        viewerCountEl.textContent = viewers;

        // Update every 2–4 seconds
        setTimeout(tick, 2000 + Math.random() * 2000);
    }

    // Initialize
    viewerCountEl.textContent = viewers;
    setTimeout(tick, 1200);
})();

// ============================================
// PURCHASE COUNTER ANIMATION
// ============================================

(function() {
    const minViewers = 9;
    const maxViewers = 22;
    const minChange = 1;
    const maxChange = 4;
    
    const FAST_UPDATES_COUNT = 5;
    const FAST_MIN_DELAY = 500;
    const FAST_MAX_DELAY = 1500;
    
    const NORMAL_MIN_DELAY = 3000;
    const NORMAL_MAX_DELAY = 7000;

    const countElement = document.getElementById('cf-viewer-count');
    const wrapperElement = document.getElementById('cf-wrapper-box');

    if (!countElement || !wrapperElement) return;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let currentCount = getRandomInt(minViewers, maxViewers);
    let updatesCounter = 0;
    countElement.innerText = currentCount;

    function updateViewerCount() {
        const changeAmount = getRandomInt(minChange, maxChange);
        let operation;

        if (currentCount + changeAmount > maxViewers) {
            operation = 'subtract';
        } else if (currentCount - changeAmount < minViewers) {
            operation = 'add';
        } else {
            operation = Math.random() < 0.5 ? 'add' : 'subtract';
        }

        if (operation === 'add') {
            currentCount += changeAmount;
        } else {
            currentCount -= changeAmount;
        }

        countElement.innerText = currentCount;
        
        // Trigger shake animation
        wrapperElement.classList.remove('shaking');
        void wrapperElement.offsetWidth; // Force reflow
        wrapperElement.classList.add('shaking');

        updatesCounter++;

        let nextDelay;
        if (updatesCounter < FAST_UPDATES_COUNT) {
            nextDelay = getRandomInt(FAST_MIN_DELAY, FAST_MAX_DELAY);
        } else {
            nextDelay = getRandomInt(NORMAL_MIN_DELAY, NORMAL_MAX_DELAY);
        }

        setTimeout(updateViewerCount, nextDelay);
    }

    setTimeout(updateViewerCount, 1500);
})();

// ============================================
// MODAL POPUP FUNCTIONALITY
// Exit intent (desktop) + Back button (mobile/desktop)
// ============================================

(function() {
    const modal = document.getElementById('modalPopup');
    const closeModalBtn = document.getElementById('closeModal');
    const closePopupBtn = document.getElementById('closePopupBtn');

    function showModal() {
        if (modal && !modal.classList.contains('active')) {
            modal.classList.add('active');
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ---- DESKTOP: Exit intent (mouse saindo pelo topo em direção a abas/barra de endereço) ----
    function isDesktop() {
        return window.matchMedia('(min-width: 771px)').matches;
    }

    document.addEventListener('mouseout', function(e) {
        if (!isDesktop()) return;
        // Mouse saindo pela borda superior
        if (e.clientY <= 5) {
            showModal();
        }
    });

    // ---- MOBILE e DESKTOP: Botão Voltar (History API) ----
    (function initBackButtonTrap() {
        history.pushState({ backModal: true }, '');

        window.addEventListener('popstate', function() {
            showModal();
            // Re-adiciona state para manter o usuário na página (padrão "one more back")
            history.pushState({ backModal: true }, '');
        });
    })();

    // ---- Fechar modal ----
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
})();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#close-popup') {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// REVEAL SECTIONS ON SCROLL (Optional)
// ============================================

(function() {
    const revealElements = document.querySelectorAll('.section-cta, .section-product');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
})();

// PAGE LOADED
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DaVinci Frequency page loaded');
});

