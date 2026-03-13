// [SaaS UX Logic]

const UI = {
    toggleMenu: document.getElementById('mobile-menu'),
    mobileNav: document.getElementById('mobile-nav'),
    modal: document.getElementById('signup-modal'),
    openBtns: document.querySelectorAll('.open-signup'),
    closeBtn: document.querySelector('.modal-close'),
    faqItems: document.querySelectorAll('.faq-h')
};

// 1. Mobile Menu
UI.toggleMenu.onclick = () => {
    UI.mobileNav.classList.toggle('active');
    document.body.style.overflow = UI.mobileNav.classList.contains('active') ? 'hidden' : '';
};

// 2. Modal Logic
const openModal = () => {
    UI.modal.classList.add('active');
    UI.mobileNav.classList.remove('active');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    UI.modal.classList.remove('active');
    document.body.style.overflow = '';
};

UI.openBtns.forEach(btn => btn.onclick = openModal);
UI.closeBtn.onclick = closeModal;

window.onclick = (e) => {
    if (e.target === UI.modal) closeModal();
};

// 3. FAQ Accordion
UI.faqItems.forEach(item => {
    item.onclick = () => {
        const body = item.nextElementSibling;
        const isOpen = body.style.display === 'block';
        
        // Reset others
        document.querySelectorAll('.faq-b').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.faq-h span').forEach(s => s.innerText = '+');

        if (!isOpen) {
            body.style.display = 'block';
            item.querySelector('span').innerText = '-';
        }
    };
});

// 4. Smooth Scrolling for Nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        UI.mobileNav.classList.remove('active');
        document.body.style.overflow = '';
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

