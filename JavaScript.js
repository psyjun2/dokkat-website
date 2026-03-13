// 프리미엄 개발자 검수 완료 로직
const menuToggle = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');
const body = document.querySelector('body');
const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');

// 1. 모바일 햄버거 토글 (배경 스크롤 방지 로직 포함)
menuToggle.addEventListener('click', () => {
    const isActive = mobileNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    body.style.overflow = isActive ? 'hidden' : 'auto';
});

// 2. 메뉴 링크 클릭 시 자동 닫기 (새로 추가된 5개 메뉴 모두 적용)
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// 3. 로고 클릭 시 홈 이동 및 메뉴 초기화
document.querySelector('.logo').addEventListener('click', (e) => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    body.style.overflow = 'auto';
});

// 4. 외부 클릭 시 메뉴 닫기 (이벤트 타겟 검증 로직 유지)
window.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = 'auto';
    }
});