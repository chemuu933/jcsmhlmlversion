document.getElementById('currentYear').textContent = new Date().getFullYear();
let mobileMenuOpen = false;
let isScrolled = false;
let activeSection = 'home';
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerLines = document.querySelectorAll('.hamburger-line');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
        mobileMenu.classList.remove('max-h-0', 'opacity-0');
        mobileMenu.classList.add('max-h-96', 'opacity-100');
        hamburgerLines[0].classList.add('rotate-45', 'top-2');
        hamburgerLines[1].classList.add('opacity-0');
        hamburgerLines[2].classList.add('-rotate-45', 'top-2');
        mobileMenuBtn.classList.add('rotate-90');
    } else {
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        mobileMenu.classList.remove('max-h-96', 'opacity-100');
        hamburgerLines[0].classList.remove('rotate-45', 'top-2');
        hamburgerLines[1].classList.remove('opacity-0');
        hamburgerLines[2].classList.remove('-rotate-45', 'top-2');
        mobileMenuBtn.classList.remove('rotate-90');
    }
});
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeSection = 'home';
    updateActiveSection('home');
}
function handleMobileNavClick(sectionId) {
    scrollToSection(sectionId);
    mobileMenuOpen = false;
    mobileMenu.classList.add('max-h-0', 'opacity-0');
    mobileMenu.classList.remove('max-h-96', 'opacity-100');
    hamburgerLines[0].classList.remove('rotate-45', 'top-2');
    hamburgerLines[1].classList.remove('opacity-0');
    hamburgerLines[2].classList.remove('-rotate-45', 'top-2');
    mobileMenuBtn.classList.remove('rotate-90');
}
function updateActiveSection(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    navLinks.forEach(link => {
        const indicator = link.querySelector('.active-indicator');
        if (link.dataset.section === sectionId) {
            link.classList.add('text-blue-600', 'bg-blue-50');
            if (indicator) indicator.classList.add('w-full');
        } else {
            link.classList.remove('text-blue-600', 'bg-blue-50');
            if (indicator) indicator.classList.remove('w-full');
        }
    });
    mobileNavLinks.forEach(link => {
        if (link.dataset.section === sectionId) {
            link.classList.add('text-blue-600', 'bg-white', 'shadow-sm');
        } else {
            link.classList.remove('text-blue-600', 'bg-white', 'shadow-sm');
        }
    });
}
function handleScroll() {
    isScrolled = window.scrollY > 20;
    const navbar = document.getElementById('navbar');
    if (isScrolled) {
        navbar.classList.add('bg-white/98', 'shadow-xl');
    } else {
        navbar.classList.remove('bg-white/98', 'shadow-xl');
    }
    const sections = ['home', 'about', 'services', 'events', 'offering'];
    const navHeight = 100;
    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= navHeight && rect.bottom >= navHeight) {
                activeSection = sectionId;
                updateActiveSection(sectionId);
                break;
            }
        }
    }
}
function handleClickOutside(event) {
    const nav = document.querySelector('nav');
    if (nav && !nav.contains(event.target)) {
        mobileMenuOpen = false;
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        mobileMenu.classList.remove('max-h-96', 'opacity-100');
        hamburgerLines[0].classList.remove('rotate-45', 'top-2');
        hamburgerLines[1].classList.remove('opacity-0');
        hamburgerLines[2].classList.remove('-rotate-45', 'top-2');
        mobileMenuBtn.classList.remove('rotate-90');
    }
}
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log(`Copied to clipboard: ${text}`);
    } catch (err) {
        console.error('Failed to copy: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}
window.addEventListener('scroll', handleScroll);
document.addEventListener('click', handleClickOutside);
handleScroll();
setTimeout(() => {
    const heroTitle = document.getElementById('heroTitle');
    const heroDivider = document.getElementById('heroDivider');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroButtons = document.getElementById('heroButtons');
    if (heroTitle) { heroTitle.style.opacity = '1'; heroTitle.style.transform = 'translateY(0)'; }
    if (heroDivider) { heroDivider.style.opacity = '1'; heroDivider.style.transform = 'scaleX(1)'; }
    if (heroSubtitle) { heroSubtitle.style.opacity = '1'; heroSubtitle.style.transform = 'translateY(0)'; }
    if (heroButtons) { heroButtons.style.opacity = '1'; heroButtons.style.transform = 'translateY(0)'; }
}, 500);
