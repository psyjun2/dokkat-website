// [Landing + Auth Logic]

const UI = {
    toggleMenu: document.getElementById('mobile-menu'),
    mobileNav: document.getElementById('mobile-nav'),
    openBtns: document.querySelectorAll('.open-signup'),
    faqItems: document.querySelectorAll('.faq-h'),
    normalSignupForm: document.getElementById('normal-signup-form'),
    autoLoginInput: document.getElementById('auto-login'),
    authStatus: document.getElementById('auth-status'),
    logoutBtn: document.getElementById('logout-btn'),
    snsButtons: document.querySelectorAll('.sns-login')
};

const AUTH_STORAGE_KEY = 'dokkatAuthUser';
const AUTO_LOGIN_KEY = 'dokkatAutoLogin';

// 1. Mobile Menu
if (UI.toggleMenu && UI.mobileNav) {
    UI.toggleMenu.onclick = () => {
        UI.mobileNav.classList.toggle('active');
        document.body.style.overflow = UI.mobileNav.classList.contains('active') ? 'hidden' : '';
    };
}

// 2. Login page redirect from landing CTA
UI.openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
});

// 3. FAQ Accordion
UI.faqItems.forEach((item) => {
    item.onclick = () => {
        const body = item.nextElementSibling;
        const isOpen = body.style.display === 'block';

        document.querySelectorAll('.faq-b').forEach((faqBody) => {
            faqBody.style.display = 'none';
        });
        document.querySelectorAll('.faq-h span').forEach((mark) => {
            mark.innerText = '+';
        });

        if (!isOpen) {
            body.style.display = 'block';
            item.querySelector('span').innerText = '-';
        }
    };
});

// 4. Smooth scrolling for section links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function onAnchorClick(e) {
        const target = this.getAttribute('href');
        const targetElement = target ? document.querySelector(target) : null;
        if (!targetElement) return;

        e.preventDefault();
        if (UI.mobileNav) UI.mobileNav.classList.remove('active');
        document.body.style.overflow = '';
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// 5. Auth flow (login.html)
const saveAuthState = (userData, autoLogin) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(AUTO_LOGIN_KEY, autoLogin ? 'true' : 'false');
};

const clearAuthState = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTO_LOGIN_KEY);
};

const renderAuthStatus = () => {
    if (!UI.authStatus) return;

    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    const isAutoLogin = localStorage.getItem(AUTO_LOGIN_KEY) === 'true';

    if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        UI.authStatus.innerHTML = `현재 로그인: <strong>${parsedUser.type}</strong> (${parsedUser.identity}) / 자동로그인: <strong>${isAutoLogin ? 'ON' : 'OFF'}</strong>`;
    } else {
        UI.authStatus.textContent = '현재 로그인 상태가 없습니다.';
    }
};

if (UI.normalSignupForm) {
    UI.normalSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneOrEmail = document.getElementById('phone-or-email').value.trim();
        const password = document.getElementById('password').value.trim();
        const useAutoLogin = UI.autoLoginInput ? UI.autoLoginInput.checked : false;

        if (!phoneOrEmail || !password) return;

        saveAuthState(
            { type: '일반회원', identity: phoneOrEmail },
            useAutoLogin
        );
        renderAuthStatus();
        alert('일반회원 가입/로그인이 완료되었습니다.');
    });
}

UI.snsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const provider = button.dataset.provider || 'SNS';
        const useAutoLogin = UI.autoLoginInput ? UI.autoLoginInput.checked : false;
        saveAuthState(
            { type: `${provider} 회원`, identity: provider },
            useAutoLogin
        );
        renderAuthStatus();
        alert(`${provider} 소셜 가입/로그인이 완료되었습니다.`);
    });
});

if (UI.logoutBtn) {
    UI.logoutBtn.addEventListener('click', () => {
        clearAuthState();
        renderAuthStatus();
        alert('로그아웃 되었습니다.');
    });
}

renderAuthStatus();

