/**********************************************/
/*  Loader
/**********************************************/
let section = document.getElementsByTagName("section")
let loader_ctn = document.getElementById("loader_ctn")
window.addEventListener("load", () => {
    for (let i = 0; i < section.length; i++) {
        section[i].classList.remove("hidden");
    }
    loader_ctn.classList.add("hidden");
})

//Language Selection Function

let spanish = document.getElementsByClassName('es')
let english = document.getElementsByClassName('en')

document.addEventListener("DOMContentLoaded", function (event) {
    // Default language setup
    for (var i = 0; i < spanish.length; i++) {
        spanish[i].style.display = "none";
    }
    for (var i = 0; i < english.length; i++) {
        english[i].style.display = "block"; // Or consider '' to revert to CSS-defined display
    }

    // Set default selected language in dropdowns
    const langOptMobile = document.getElementById('lang-opt-mobile');
    const langOptDesktop = document.getElementById('lang-opt-desktop');
    if (langOptMobile) {
        langOptMobile.value = 'en';
    }
    if (langOptDesktop) {
        langOptDesktop.value = 'en';
    }

    // Hamburger Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const menuLinks = document.getElementById('menu-links');
    if (menuBtn && menuLinks) {
        menuBtn.addEventListener('click', () => {
            menuLinks.classList.toggle('hidden');
            // Optional: Change hamburger icon to X and back
            const icon = menuBtn.querySelector('svg path');
            if (menuLinks.classList.contains('hidden')) {
                icon.setAttribute('d', 'M4 6h16M4 12h16m-4 6h10');
            } else {
                icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinksMobile = menuLinks.querySelectorAll('a.nav-link');
    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            if (!menuLinks.classList.contains('hidden') && window.innerWidth < 768) { // 768px is md breakpoint
                menuLinks.classList.add('hidden');
                menuBtn.querySelector('svg path').setAttribute('d', 'M4 6h16M4 12h16m-4 6h10');
            }
        });
    });


    // Scrollspy for Active Link Highlighting
    const navLinks = document.querySelectorAll('nav a.nav-link');
    const sections = [];
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            sections.push({ link: link, section: section });
        }
    });

    const navHeight = document.getElementById('main-nav') ? document.getElementById('main-nav').offsetHeight : 70; // Estimate nav height

    window.addEventListener('scroll', () => {
        let currentActive = null;

        sections.forEach(item => {
            const sectionTop = item.section.offsetTop - navHeight - 50; // Adjusted offset
            const sectionBottom = sectionTop + item.section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = item.link;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-teal-custom', 'font-bold');
            link.classList.add('text-slate-300', 'font-semibold'); // Default state
        });

        if (currentActive) {
            currentActive.classList.remove('text-slate-300');
            currentActive.classList.add('text-teal-custom', 'font-bold');
        } else {
            // Fallback: if no section is "active" (e.g. very top or very bottom of page beyond sections)
            // Highlight "Home" if at the very top.
            if (sections.length > 0 && window.scrollY < sections[0].section.offsetTop - navHeight - 50) {
                 const homeLink = document.querySelector('a.nav-link[href="#hero-nav-target"]');
                 if (homeLink) {
                    homeLink.classList.remove('text-slate-300');
                    homeLink.classList.add('text-teal-custom', 'font-bold');
                 }
            }
        }
    });
     // Trigger scroll once to set initial active link
    window.dispatchEvent(new Event('scroll'));

});

function selectLan(el) {
    const selectedLang = el.value;
    
    // Sync both language selectors
    const langOptMobile = document.getElementById('lang-opt-mobile');
    const langOptDesktop = document.getElementById('lang-opt-desktop');

    if (el.id === 'lang-opt-mobile') {
        if (langOptDesktop) langOptDesktop.value = selectedLang;
    } else if (el.id === 'lang-opt-desktop') {
        if (langOptMobile) langOptMobile.value = selectedLang;
    }
    // Note: If there was an original #lang-opt, similar sync logic would be needed.

    if (selectedLang === "en") {
        for (let i = 0; i < spanish.length; i++) {
            spanish[i].style.display = "none";
        }
        for (let i = 0; i < english.length; i++) {
            english[i].style.display = "block"; // Or other appropriate visible style
        }
    } else if (selectedLang === "es") {
        for (let i = 0; i < spanish.length; i++) {
            spanish[i].style.display = "block"; // Or other appropriate visible style
        }
        for (let i = 0; i < english.length; i++) {
            english[i].style.display = "none";
        }
    }
}