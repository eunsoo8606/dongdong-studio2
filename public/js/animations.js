// GSAP Plugins Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .menu-toggle, .creator-item');

document.addEventListener('mousemove', (e) => {
    // requestAnimationFrame을 사용하여 메인 루프와의 동기화 최적화
    requestAnimationFrame(() => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });

        const target = e.target.closest('section');
        if (target && target.classList.contains('light-mode')) {
            cursor.style.backgroundColor = '#000';
        } else {
            cursor.style.backgroundColor = '#fff';
        }
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        cursor.classList.add('active');
        if (link.classList.contains('creator-item')) {
            cursor.innerHTML = '<span style="font-size: 10px; font-weight: 800; color: inherit;">VIEW</span>';
            gsap.to(cursor, { scale: 4, opacity: 0.8 });
        } else {
            gsap.to(cursor, { scale: 1.5, opacity: 0.5 });
        }
    });

    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursor.innerHTML = '';
        gsap.to(cursor, { scale: 1, opacity: 1 });
    });
});

// Fade-in Up Effect on Load
window.addEventListener('load', () => {
    gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    });

    // ... (rest of the code remains similar)
    // 페이지 로드 완료 후 스크롤 트리거 재계산 (새로고침 시 위치 오류 방지)
    ScrollTrigger.refresh();
});

// Scroll Based Animations (Home Page)
if (document.querySelector('.hero')) {
    // Hero Text Split & Reveal on Scroll
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '+=150%', // 밸런스 잡힌 스크롤 거리
            scrub: 1,      // 매끄러운 추적을 위해 1로 복구
            pin: true,
            anticipatePin: 1
        }
    });

    // 가속도를 고려한 부드러운 움직임
    heroTl.to('.split-left', { xPercent: -100, opacity: 0, duration: 2, ease: "power1.inOut" }, 0);
    heroTl.to('.split-right', { xPercent: 100, opacity: 0, duration: 2, ease: "power1.inOut" }, 0);

    // 이미지 컨테이너 노출
    heroTl.to('.hero-images-container', { opacity: 1, duration: 1.5, ease: "none" }, 0.5);

    // 이미지 등장 (GPU 가속을 위해 y축 이동 최소화 및 스케일 조정)
    heroTl.to('.img-1', { y: 0, scale: 1, duration: 1, ease: "power2.out" }, 1.2);
    heroTl.to('.img-2', { y: 0, scale: 1, duration: 1, ease: "power2.out" }, 1.3);
    heroTl.to('.img-3', { y: 0, scale: 1, duration: 1, ease: "power2.out" }, 1.4);

    // Section 2: Strong Text Reveal (Native Light Mode)
    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.intro',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
        }
    });

    introTl.to('.reveal-text', { color: '#000000', duration: 1 }, 0);
    introTl.to('.reveal-text .accent', { color: '#00F0FF', fontWeight: '800', duration: 1 }, 0.2);
    introTl.to('.reveal-text-sub', { opacity: 1, y: -10, duration: 1 }, 0.5);
    introTl.to('.reveal-text-sub .accent', { color: '#00F0FF', duration: 1 }, 0.7);

    // Section 3: Advantages Grid Stagger (Refined)
    gsap.from('.advantage-card', {
        scrollTrigger: {
            trigger: '.advantages',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
    });

    const isMobile = window.innerWidth <= 768;

    // Section 4: BMC Vision Item Reveal
    const bmcTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.bmc-vision',
            start: isMobile ? 'top 85%' : 'top 60%',
            toggleActions: 'play none none none'
        }
    });

    // 구체(Sphere)와 아이템 전체 등장
    bmcTl.from('.vision-item', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out"
    });

    // 데스크탑에서만 부가 정보(Info) 순차 등장
    if (!isMobile) {
        bmcTl.to('.vision-info', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");
    } else {
        // 모바일은 즉시 노출 (이미 CSS에서 opacity 1 !important 처리됨)
        gsap.set('.vision-info', { opacity: 1, y: 0 });
    }

    // Section 5: Strategy Synergy Flow
    const strategyTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.strategy',
            start: isMobile ? 'top 90%' : 'top 60%',
        }
    });

    strategyTl.from('.strategy-node', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: isMobile ? 0.2 : 0.3,
        ease: "back.out(1.7)"
    });

    if (!isMobile) {
        strategyTl.to('#path-studio-brand, #path-studio-creator, #path-brand-creator', {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            stagger: 0.5
        }, "-=1");
    }
}

// Magnetic Effect Helper
const setupMagnetic = (el) => {
    el.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
};

// Apply Magnetic to Logo
setupMagnetic(document.querySelector('.logo'));
