// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DYNAMIC UI ELEMENTS ==========
    
    // 1. Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 2. Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 3. Active navigation highlight
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // 4. Dynamic title changer (click on CTA button)
    const ctaBtn = document.getElementById('ctaBtn');
    const dynamicTitle = document.getElementById('dynamicTitle');
    let clickCount = 0;
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            clickCount++;
            const titles = [
                'Welcome to BizPro',
                '🚀 Let\'s Grow Together!',
                '💼 Your Success is Our Goal',
                '🌟 Excellence in Service'
            ];
            dynamicTitle.style.opacity = '0';
            setTimeout(() => {
                if (clickCount <= titles.length) {
                    dynamicTitle.textContent = titles[clickCount - 1];
                } else {
                    dynamicTitle.textContent = titles[clickCount % titles.length];
                }
                dynamicTitle.style.opacity = '1';
            }, 200);
        });
    }
    
    // 5. Service cards click effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const services = ['Web Development', 'Mobile Apps', 'Digital Marketing'];
            alert(`You selected: ${services[index]}\nWe'll contact you soon!`);
        });
    });
    
    // ========== CONTACT FORM VALIDATION ==========
    
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    function validateName() {
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const nameValue = name.value.trim();
        
        if (nameValue === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else if (nameValue.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            nameError.textContent = 'Name can only contain letters';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = 'Enter a valid email (e.g., name@example.com)';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        const message = document.getElementById('message');
        const msgError = document.getElementById('msgError');
        const msgValue = message.value.trim();
        
        if (msgValue === '') {
            msgError.textContent = 'Message is required';
            return false;
        } else if (msgValue.length < 10) {
            msgError.textContent = 'Message must be at least 10 characters';
            return false;
        } else {
            msgError.textContent = '';
            return true;
        }
    }
    
    // Real-time validation (as user types)
    document.getElementById('name')?.addEventListener('input', validateName);
    document.getElementById('email')?.addEventListener('input', validateEmail);
    document.getElementById('message')?.addEventListener('input', validateMessage);
    
    // Form submit handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                // Show success message
                successMessage.style.display = 'block';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 10);
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 300);
                }, 3000);
                
                // Optional: Log to console
                console.log('Form submitted successfully!');
            }
        });
    }
    
    // Smooth scroll for navigation links
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Add hover animation to cards when page loads
    console.log('✅ Website loaded with dynamic UI and form validation!');
});