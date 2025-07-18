document.addEventListener('DOMContentLoaded', function () {
    // Qorong'u rejimni almashtirish
    const dark_mode_toggle_container = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Foydalanuvchi afzalligini tekshirish yoki tizim afzalligidan foydalanish
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
        body.classList.add('dark-mode');
    }

    // Qorong'u rejimni almashtirish funksiyasi
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');

        // Afzallikni saqlash
        localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');
    }

    if (dark_mode_toggle_container) {
        dark_mode_toggle_container.addEventListener('click', toggleDarkMode);
    }

    // Mobil menyu tugmasi va modali
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');
    const mobileMenuModal = document.getElementById('mobileMenuModal');

    if (mobileMenuIcon && mobileMenuModal) {
        mobileMenuIcon.addEventListener('click', function (e) {
            e.stopPropagation(); // Bosish hodisasining tarqalishini to'xtatish
            mobileMenuModal.classList.toggle('active');
        });

        // Modal tashqarisini bosganda modalni yopish
        document.addEventListener('click', function (e) {
            if (!mobileMenuModal.contains(e.target) && e.target !== mobileMenuIcon) {
                mobileMenuModal.classList.remove('active');
            }
        });
    }

    // "Meni yollash" modali
    const openHireMeModalBtn = document.getElementById('openHireMeModalBtn');
    const closeHireMeModalBtn = document.getElementById('closeHireMeModalBtn');
    const hireMeModal = document.getElementById('hireMeModal');

    if (openHireMeModalBtn && hireMeModal) {
        openHireMeModalBtn.addEventListener('click', function () {
            hireMeModal.style.display = 'block';
        });
    }

    if (closeHireMeModalBtn && hireMeModal) {
        closeHireMeModalBtn.addEventListener('click', function () {
            hireMeModal.style.display = 'none';
        });
    }

    // Modal tashqarisini bosganda "Meni yollash" modalini yopish
    window.addEventListener('click', function (event) {
        if (event.target === hireMeModal) {
            hireMeModal.style.display = 'none';
        }
    });

    // Anchor havolalar uchun silliq aylantirish
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Mobil menyuni yopish (agar ochiq bo'lsa)
            if (mobileMenuModal) {
                mobileMenuModal.classList.remove('active');
            }
            // "Meni yollash" modalini yopish (agar ochiq bo'lsa)
            if (hireMeModal) {
                hireMeModal.style.display = 'none';
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Sarlavha balandligini hisobga olish
                    behavior: 'smooth'
                });
            }
        });
    });

    // Aloqa shaklini yuborish
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Shaklning standart yuborilishini to'xtatish

            // Shakl qiymatlarini olish
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Bu yerda odatda ma'lumotlarni serverga yuborasiz
            console.log('Shakl yuborildi:', { name, email, message });

            // Foydalanuvchiga xabar berish (alert o'rniga konsolga yozish)
            console.log('Xabaringiz uchun rahmat! Tez orada siz bilan bog\'lanaman.');

            // Shaklni tiklash
            this.reset();
        });
    }

    // Ko'nikmalar ko'rinishga kelganda animatsiya qilish
    const skills = document.querySelectorAll('.skill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                progressBar.style.animation = 'progress-animation 2s ease-in-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => {
        observer.observe(skill);
    });

    // "Meni yollash" tugmasi funksionalligi (faqat sayt ichida aylantirish uchun)
    const hireMeButtons = document.querySelectorAll('.btn-2'); // Home bo'limidagi "Hire Me" tugmasi
    hireMeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const contactSection = document.getElementById('Contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // "Mening loyihalarim" tugmasi funksionalligi
    const myProjectsButtons = document.querySelectorAll('.btn-3'); // Home bo'limidagi "My projects" tugmasi
    myProjectsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const projectsSection = document.getElementById('Projects');
            if (projectsSection) {
                window.scrollTo({
                    top: projectsSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
