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

/**********************************************/
/*  Language & Theme + Navigation
/**********************************************/
let spanish = document.getElementsByClassName('es')
let english = document.getElementsByClassName('en')

// Elements for theme
const themeToggleMobile = document.getElementById('theme-toggle');
const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
const themeIconMobile = document.getElementById('theme-toggle-icon');
const themeIconDesktop = document.getElementById('theme-toggle-icon-desktop');

// Save & apply theme
function applyTheme(theme) {
    const htmlEl = document.documentElement;
    if (theme === 'light') {
        htmlEl.classList.add('light');
        // set icons to "sun" for light (meaning currently light)
        if (themeIconMobile) themeIconMobile.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636M18.364 5.636l-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"/>`;
        if (themeIconDesktop) themeIconDesktop.innerHTML = themeIconMobile ? themeIconMobile.innerHTML : '';
        localStorage.setItem('theme', 'light');
    } else {
        htmlEl.classList.remove('light');
        // set icons to "moon" for dark
        if (themeIconMobile) themeIconMobile.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`;
        if (themeIconDesktop) themeIconDesktop.innerHTML = themeIconMobile ? themeIconMobile.innerHTML : '';
        localStorage.setItem('theme', 'dark');
    }
}

function toggleTheme() {
    const current = localStorage.getItem('theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Language Selection Function (persist)
document.addEventListener("DOMContentLoaded", function (event) {
    // Read saved language (fallback to 'en')
    const savedLang = localStorage.getItem('lang') || 'en';

    // Default language setup based on savedLang
    for (let i = 0; i < spanish.length; i++) {
        spanish[i].style.display = (savedLang === 'es') ? "block" : "none";
    }
    for (let i = 0; i < english.length; i++) {
        english[i].style.display = (savedLang === 'en') ? "block" : "none";
    }

    // Sync language selectors if present
    const langOptMobile = document.getElementById('lang-opt-mobile');
    const langOptDesktop = document.getElementById('lang-opt-desktop');
    if (langOptMobile) langOptMobile.value = savedLang;
    if (langOptDesktop) langOptDesktop.value = savedLang;

    // Initialize theme from localStorage (default dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Hook theme toggle buttons
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }
    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    // Set initial icons in case JS runs after DOM (if not set yet)
    if (!themeIconMobile || !themeIconDesktop) {
        /* nothing to do, icons are set within applyTheme */
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
    if (menuLinks) {
        const navLinksMobile = menuLinks.querySelectorAll('a.nav-link');
        navLinksMobile.forEach(link => {
            link.addEventListener('click', () => {
                if (!menuLinks.classList.contains('hidden') && window.innerWidth < 768) { // 768px is md breakpoint
                    menuLinks.classList.add('hidden');
                    const p = document.querySelector('#menu-btn svg path');
                    if (p) p.setAttribute('d', 'M4 6h16M4 12h16m-4 6h10');
                }
            });
        });
    }

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

/* selectLan is used by both selects. Persist language preference. */
function selectLan(el) {
    const lang = el.value; // el.selectedIndex is for when options have no value attribute explicitly.
                           // Using el.value is more robust if option values are 'en', 'es'.
    
    // Sync both language selectors if they exist
    const langOptMobile = document.getElementById('lang-opt-mobile');
    const langOptDesktop = document.getElementById('lang-opt-desktop');

    if (langOptMobile && langOptMobile.value !== lang) {
        langOptMobile.value = lang;
    }
    if (langOptDesktop && langOptDesktop.value !== lang) {
        langOptDesktop.value = lang;
    }

    if (lang === "en") {
        for (var i = 0; i < spanish.length; i++) {
            spanish[i].style.display = "none";
        }
        for (var i = 0; i < english.length; i++) {
            english[i].style.display = "block";
        }
    } else if (lang === "es") {
        for (var i = 0; i < spanish.length; i++) {
            spanish[i].style.display = "block";
        }
        for (var i = 0; i < english.length; i++) {
            english[i].style.display = "none";
        }
    }

    localStorage.setItem('lang', lang);
}

// Floating controls behavior (language + theme)
(function() {
    document.addEventListener('DOMContentLoaded', () => {
      const langBtn = document.getElementById('lang-toggle-btn');
      const langLabel = document.getElementById('lang-label');
      const themeBtn = document.getElementById('theme-toggle-float');
      const themeIcon = document.getElementById('theme-float-icon');
  
      const SUN_SVG = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636M18.364 5.636l-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"/>`;
      const MOON_SVG = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`;
  
      function updateLangLabel() {
        const lang = localStorage.getItem('lang') || 'en';
        langLabel.textContent = (lang === 'es') ? 'ES' : 'EN';
      }
  
      function updateThemeIcon() {
        const theme = localStorage.getItem('theme') || 'dark';
        themeIcon.innerHTML = (theme === 'light') ? SUN_SVG : MOON_SVG;
      }
  
      // Toggle language on click: sync selects (if present) and call selectLan
      if (langBtn) {
        langBtn.addEventListener('click', () => {
          const current = localStorage.getItem('lang') || 'en';
          const newLang = current === 'en' ? 'es' : 'en';
  
          // sync existing selects if present
          const mobile = document.getElementById('lang-opt-mobile');
          const desktop = document.getElementById('lang-opt-desktop');
          if (mobile) mobile.value = newLang;
          if (desktop) desktop.value = newLang;
  
          // reuse your existing function; pass a small object that has .value
          try {
            selectLan({ value: newLang });
          } catch (e) {
            // fallback: manually toggle if selectLan isn't available
            localStorage.setItem('lang', newLang);
            for (let i = 0; i < document.getElementsByClassName('es').length; i++) {
              document.getElementsByClassName('es')[i].style.display = (newLang === 'es') ? 'block' : 'none';
            }
            for (let i = 0; i < document.getElementsByClassName('en').length; i++) {
              document.getElementsByClassName('en')[i].style.display = (newLang === 'en') ? 'block' : 'none';
            }
          }
  
          updateLangLabel();
        });
      }
  
      // Theme toggle: reuse existing toggleTheme() and update icon
      if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          try {
            toggleTheme();
          } catch (err) {
            // fallback manual toggle
            const cur = localStorage.getItem('theme') || 'dark';
            const next = cur === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            if (next === 'light') document.documentElement.classList.add('light');
            else document.documentElement.classList.remove('light');
          }
          // small timeout to allow applyTheme to update localStorage/icons if used
          setTimeout(updateThemeIcon, 50);
        });
      }
  
      // Init visual state
      updateLangLabel();
      updateThemeIcon();
    });
  })();
  