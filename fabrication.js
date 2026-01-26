// === MOBILE MENU TOGGLE (MUST BE FIRST) ===
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === WORKS SHOWCASE SLIDER (Multiple Sliders) ===
const currentSlides = [0, 0, 0, 0]; // Track current slide for each group

function showWorkSlide(groupIndex, slideIndex) {
    const slides = document.querySelectorAll(`.work-slide[data-group="${groupIndex}"]`);
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
}

function nextWork(groupIndex) {
    const slides = document.querySelectorAll(`.work-slide[data-group="${groupIndex}"]`);
    if (slides.length > 0) {
        currentSlides[groupIndex] = (currentSlides[groupIndex] + 1) % slides.length;
        showWorkSlide(groupIndex, currentSlides[groupIndex]);
    }
}

function previousWork(groupIndex) {
    const slides = document.querySelectorAll(`.work-slide[data-group="${groupIndex}"]`);
    if (slides.length > 0) {
        currentSlides[groupIndex] = (currentSlides[groupIndex] - 1 + slides.length) % slides.length;
        showWorkSlide(groupIndex, currentSlides[groupIndex]);
    }
}

// === CERTIFICATE MODAL FUNCTIONS ===
function openCertificate(type) {
    const modal = document.getElementById('certificateModal');
    const img = document.getElementById('certificateImg');
    
    if (modal && img) {
        if (type === 'cor') {
            img.src = 'images/footer/cor.jpg';
            img.alt = 'Certificate of Registration';
        } else if (type === 'dti') {
            img.src = 'images/footer/dti.jpg';
            img.alt = 'DTI Registration';
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target === modal) {
        closeCertificate();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificate();
    }
});

// === BACK TO TOP BUTTON ===
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.alignItems = 'center';
        backToTopButton.style.justifyContent = 'center';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
});