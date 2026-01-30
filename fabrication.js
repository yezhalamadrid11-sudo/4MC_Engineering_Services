// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Image slider functionality
const slideGroups = {};

function initializeSliders() {
    const slides = document.querySelectorAll('.work-slide');
    slides.forEach(slide => {
        const group = slide.getAttribute('data-group');
        if (!slideGroups[group]) {
            slideGroups[group] = [];
        }
        slideGroups[group].push(slide);
    });
}

function showSlide(groupIndex, slideIndex) {
    const slides = slideGroups[groupIndex];
    if (!slides) return;

    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === slideIndex) {
            slide.classList.add('active');
        }
    });
}

function nextWork(groupIndex) {
    const slides = slideGroups[groupIndex];
    if (!slides) return;

    let currentIndex = slides.findIndex(slide => slide.classList.contains('active'));
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(groupIndex, nextIndex);
}

function previousWork(groupIndex) {
    const slides = slideGroups[groupIndex];
    if (!slides) return;

    let currentIndex = slides.findIndex(slide => slide.classList.contains('active'));
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(groupIndex, prevIndex);
}

// Certificate modal functions
function viewCertificate(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateImg');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Category filter functionality
function initializeCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-wrapper');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get selected category
            const selectedCategory = button.getAttribute('data-category');
            
            // Filter items
            showcaseItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category');
                
                if (selectedCategory === 'all') {
                    item.classList.remove('hidden');
                } else {
                    if (itemCategories.includes(selectedCategory)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize sliders and filters
    initializeSliders();
    initializeCategoryFilter();
});