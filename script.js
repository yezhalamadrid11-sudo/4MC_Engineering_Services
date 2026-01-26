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

// === SMOOTH SCROLLING FOR NAVIGATION LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === HERO SLIDESHOW (4 seconds interval) ===
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

function nextHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
}

// Change hero slide every 4 seconds
if (heroSlides.length > 0) {
    setInterval(nextHeroSlide, 4000);
}

// === INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.about-card, .service-card, .product-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// === PARTNERS SLIDER PAUSE ON HOVER ===
const partnersSlider = document.querySelector('.partners-slider');
const partnersContainer = document.querySelector('.partners-slider-container');

if (partnersContainer && partnersSlider) {
    partnersContainer.addEventListener('mouseenter', function() {
        partnersSlider.style.animationPlayState = 'paused';
    });

    partnersContainer.addEventListener('mouseleave', function() {
        partnersSlider.style.animationPlayState = 'running';
    });
}

// === PRODUCT CATEGORY CLICK HANDLER ===
document.querySelectorAll('.product-category').forEach(category => {
    category.addEventListener('click', function() {
        console.log('Product category clicked:', this.querySelector('h3').textContent);
    });
});

// === CONSOLE LOG FOR DEBUGGING ===
console.log('Website loaded successfully!');
console.log('Hero slides:', heroSlides.length);
console.log('Service cards:', document.querySelectorAll('.service-card').length);

// === PERFORMANCE OPTIMIZATION: Lazy Loading Images ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === COMPANY IMAGE SLIDESHOW ===
const companySlides = document.querySelectorAll('.company-slide');
const companyPrevBtn = document.getElementById('companyPrev');
const companyNextBtn = document.getElementById('companyNext');
let currentCompanySlide = 0;

function showCompanySlide(index) {
    companySlides.forEach(slide => slide.classList.remove('active'));
    if (companySlides[index]) {
        companySlides[index].classList.add('active');
    }
}

if (companyPrevBtn && companyNextBtn && companySlides.length > 0) {
    companyPrevBtn.addEventListener('click', function() {
        currentCompanySlide = (currentCompanySlide - 1 + companySlides.length) % companySlides.length;
        showCompanySlide(currentCompanySlide);
    });

    companyNextBtn.addEventListener('click', function() {
        currentCompanySlide = (currentCompanySlide + 1) % companySlides.length;
        showCompanySlide(currentCompanySlide);
    });
}

// Machine Image Modal Functions
function openMachineImage(machineType) {
    const modal = document.getElementById('machineModal');
    const img = document.getElementById('machineImg');
    
    // Map machine types to image paths
    const machineImages = {
        'cnc': 'images/machines/cnc.jpg',
        'milling': 'images/machines/milling.jpg',
        'lathe': 'images/machines/lathe.jpg',
        'welding': 'images/machines/welding.jpg',
        'testing': 'images/machines/testing.jpg',
        'automation': 'images/machines/automation.jpg'
    };
    
    img.src = machineImages[machineType];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMachineImage() {
    const modal = document.getElementById('machineModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('machineModal');
    if (event.target == modal) {
        closeMachineImage();
    }
}

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

// === CERTIFICATE MODAL FUNCTIONS ===
function openCertificate(type) {
    const modal = document.getElementById('certificateModal');
    const img = document.getElementById('certificateImg');
    
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

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target === modal) {
        closeCertificate();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificate();
    }
});

// Category Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get selected category
        const category = button.getAttribute('data-category');
        
        // Filter products
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Product Modal Functions
const productImages = {
    'product1': 'images/products/product1.jpg',
    'product2': 'images/products/product2.jpg',
    'product3': 'images/products/product3.jpg',
    'product4': 'images/products/product4.jpg',
    'product5': 'images/products/product5.jpg',
    'product6': 'images/products/product6.jpg',
    'product7': 'images/products/product7.jpg',
    'product8': 'images/products/product8.jpg',
    'product9': 'images/products/product9.jpg'
};

function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const img = document.getElementById('modalProductImg');
    
    img.src = productImages[productId];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeProductModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductModal();
    }
});

// Smooth scroll animation for filter changes
document.addEventListener('DOMContentLoaded', () => {
    productCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});

// Service Details Data
const serviceDetails = {
    toolings: {
        icon: 'fas fa-tools',
        title: 'Toolings',
        description: 'Our precision tooling services deliver high-quality custom tools designed to enhance your manufacturing efficiency. With state-of-the-art CNC machines and experienced craftsmen, we produce tooling solutions that meet the most demanding specifications.',
        features: [
            'Custom Tool Design & Engineering',
            'Precision CNC Machining',
            'Tool & Die Manufacturing',
            'Grinding & Finishing Services',
            'Tool Maintenance & Repair',
            'Quality Inspection & Testing',
            'Material Selection Consulting',
            'Rapid Prototyping Services'
        ],
        benefits: [
            'Increased Production Efficiency',
            'Reduced Manufacturing Costs',
            'Improved Product Quality',
            'Extended Tool Life',
            'Faster Setup Times',
            'Consistent Results',
            'Technical Support',
            'Competitive Pricing'
        ]
    },
    jigs: {
        icon: 'fas fa-screwdriver',
        title: 'Jigs & Fixtures',
        description: 'Custom-designed jigs and fixtures that improve repeatability, reduce setup time, and ensure quality output. Our engineering team creates specialized holding and positioning devices tailored to your specific manufacturing needs.',
        features: [
            'Custom Fixture Design',
            'Assembly Jigs & Fixtures',
            'Welding Fixtures & Positioners',
            'Inspection & Gauging Fixtures',
            'Modular Fixturing Systems',
            'Quick-Change Fixtures',
            'Vacuum & Magnetic Fixtures',
            'Automated Fixture Systems'
        ],
        benefits: [
            'Improved Part Repeatability',
            'Reduced Setup Time',
            'Enhanced Worker Safety',
            'Consistent Quality Control',
            'Lower Labor Costs',
            'Increased Throughput',
            'Reduced Scrap Rates',
            'Better Ergonomics'
        ]
    },
    fabrication: {
        icon: 'fas fa-gear',
        title: 'Fabrication',
        description: 'High-quality metal fabrication services using advanced techniques and premium materials. From simple components to complex assemblies, we deliver precision-fabricated parts that meet your exact specifications.',
        features: [
            'Sheet Metal Fabrication',
            'MIG, TIG & Arc Welding',
            'CNC Plasma & Laser Cutting',
            'Metal Bending & Forming',
            'Structural Steel Fabrication',
            'Stainless Steel Work',
            'Powder Coating & Finishing',
            'Assembly Services'
        ],
        benefits: [
            'High-Quality Workmanship',
            'Material Versatility',
            'Custom Solutions',
            'Fast Turnaround Times',
            'Cost-Effective Production',
            'Durable Construction',
            'Precision Tolerances',
            'Professional Finishing'
        ]
    },
    automation: {
        icon: 'fas fa-wand-sparkles',
        title: 'Automation & Renovation',
        description: 'Transform your manufacturing operations with our automation and renovation services. We modernize existing equipment and implement new automated systems to boost productivity, reduce costs, and improve safety.',
        features: [
            'Process Automation Solutions',
            'Equipment Modernization',
            'System Integration Services',
            'PLC Programming & Controls',
            'Robotic System Installation',
            'Conveyor System Design',
            'Facility Upgrades',
            'Legacy Equipment Renovation'
        ],
        benefits: [
            'Increased Productivity',
            'Reduced Operating Costs',
            'Improved Safety Standards',
            'Extended Equipment Life',
            'Enhanced Quality Control',
            'Energy Efficiency',
            'Reduced Downtime',
            'Better Data Collection'
        ]
    },
    construction: {
        icon: 'fas fa-hammer',
        title: 'Construction',
        description: 'Professional construction services for industrial and commercial projects. Our experienced team manages projects from planning to completion, ensuring quality workmanship, timely delivery, and adherence to safety standards.',
        features: [
            'Industrial Building Construction',
            'Facility Build-Outs',
            'Warehouse Construction',
            'Office Renovations',
            'Electrical & Mechanical Systems',
            'HVAC Installation',
            'Project Management',
            'Permit & Compliance Handling'
        ],
        benefits: [
            'Turnkey Solutions',
            'Quality Construction',
            'On-Time Delivery',
            'Budget Management',
            'Safety Compliance',
            'Professional Team',
            'Minimal Disruption',
            'Long-Term Durability'
        ]
    }
};

// Open Service Modal
function openServiceModal(serviceId) {
    const modal = document.getElementById('serviceModal');
    const service = serviceDetails[serviceId];
    
    if (!service) return;
    
    // Update modal content
    document.getElementById('modalServiceIcon').className = service.icon;
    document.getElementById('modalServiceTitle').textContent = service.title;
    document.getElementById('modalServiceDescription').textContent = service.description;
    
    // Update features list
    const featuresList = document.getElementById('modalServiceFeatures');
    featuresList.innerHTML = '';
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update benefits list
    const benefitsList = document.getElementById('modalServiceBenefits');
    benefitsList.innerHTML = '';
    service.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Service Modal
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target == modal) {
        closeServiceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServiceModal();
    }
});

// Animate process steps on scroll
document.addEventListener('DOMContentLoaded', () => {
    const processSteps = document.querySelectorAll('.process-step');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(step);
    });
});

// Auto-update copyright year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; ${currentYear} 4MC ENGINEERING SERVICES. All rights reserved.`;
    }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', updateCopyrightYear);

// Alternative: If you want to show a year range (e.g., 2020-2025)
function updateCopyrightYearRange() {
    const startYear = 2020; // Your company's founding year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    
    if (copyrightElement) {
        // Only show range if current year is different from start year
        const yearText = currentYear > startYear ? `${startYear}-${currentYear}` : `${startYear}`;
        copyrightElement.innerHTML = `&copy; ${yearText} 4MC ENGINEERING SERVICES. All rights reserved.`;
    }
}
// === PRELOADER (Optional Enhancement) ===
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});