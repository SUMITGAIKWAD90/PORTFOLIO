(function () {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

document.addEventListener('DOMContentLoaded', () => {
    // --- Contact Form ---
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();

          const button = form.querySelector(".submit-btn");
          const originalText = button.innerHTML;

          button.disabled = true;
          button.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

          emailjs
            .sendForm(
              EMAILJS_CONFIG.SERVICE_ID,
              EMAILJS_CONFIG.TEMPLATE_ID,
              this
            )
            .then(
              function () {
                button.innerHTML = "Message Sent 🚀";
                form.reset();

                setTimeout(() => {
                  button.disabled = false;
                  button.innerHTML = originalText;
                }, 3000);
              },
              function (error) {
                console.error("EmailJS Error:", error);
                button.disabled = false;
                button.innerHTML = "❌ Failed. Try Again";
              }
            );
        });
    }
    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // --- Custom Cursor & Magnetic Effect ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth outline animation using requestAnimationFrame
    function animateCursor() {
        const speed = 0.15; // Controls the lag effect (lower = more lag)
        
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            if (cursorOutline) {
                cursorOutline.style.transform = `translate(-50%, -50%) scale(1.5)`;
                cursorOutline.style.borderColor = 'var(--accent-primary)';
            }
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
            el.style.transform = 'translate(0, 0)';
            if (cursorOutline) {
                cursorOutline.style.transform = `translate(-50%, -50%) scale(1)`;
                cursorOutline.style.borderColor = 'var(--accent-primary)';
            }
        });
    });

    // --- Particle System (Hero Canvas) ---
    const canvas = document.getElementById('hero-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
        draw() {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
            gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = Math.min((canvas.width * canvas.height) / 12000, 150);
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                // Connect particles
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    const opacity = (1 - distance / 120) * 0.3;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // --- 3D Tilt Effect ---
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- Typing Effect ---
    const text = "SUMIT GAIKWAD";
    const typingElement = document.querySelector('.typing-effect');
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.innerHTML = text.substring(0, index + 1) + '<span class="cursor">|</span>';
            index++;
            setTimeout(type, 150);
        } else {
            typingElement.innerHTML = text; // Remove cursor at end
        }
    }
    
    // Start typing after a slight delay
    setTimeout(type, 1000);

    // --- Modal Logic (Preserved) ---
    const projects = {
        'car-accident': {
            title: 'Car Accident Detection Security System',
            desc: 'Built a machine learning system that uses CCTV footage to automatically detect car accidents. Integrated real-time alert functionality to notify emergency services like police and ambulance for quick response.',
            highlights: [
                'Automated accident detection using CCTV footage',
                'Real-time alerts for emergency services'
            ],
            repo: '#',
            live: '#'
        },
        'healthcare': {
            title: 'Healthcare Application',
            desc: 'Created a healthcare web application to raise user health awareness and support remote medical assistance. Included a machine learning-based skin disease detection feature using image recognition to identify potential conditions and provide relevant information.',
            highlights: [
                'Remote medical assistance support',
                'ML-based skin disease detection'
            ],
            repo: '#',
            live: '#'
        },
        'mdm': {
            title: 'MDM-Connect',
            desc: 'Created a secure web application for the Mid Day Meal Scheme. This app allows real-time digital payments and fund management for schools using the Polygon network. Built user-friendly dashboards for managing devices, tracking transactions, and providing public access to school funding data.',
            highlights: [
                'Real-time digital payments on Polygon network',
                'Dashboards for fund management and transparency'
            ],
            repo: '#',
            live: '#'
        },
        'company-profile': {
            title: 'Company Profile Website',
            desc: 'Developed a responsive company profile website using Django for the backend and Bootstrap for the frontend. Implemented dynamic content management, easy navigation, and a modern, user-friendly interface to improve the user experience.',
            highlights: [
                'Responsive design with Bootstrap',
                'Dynamic content management with Django'
            ],
            repo: '#',
            live: '#'
        }
    };

    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');

    window.openModal = function(projectId) { // Make global
        const project = projects[projectId];
        if (!project) return;

        document.getElementById('modal-title').innerText = project.title;
        document.getElementById('modal-desc').innerText = project.desc;
        
        const highlightsList = document.getElementById('modal-highlights');
        highlightsList.innerHTML = '';
        project.highlights.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            highlightsList.appendChild(li);
        });

        document.getElementById('modal-repo').href = project.repo;
        document.getElementById('modal-live').href = project.live;

        modal.style.display = 'block';
    }

    if(closeModal) {
        closeModal.onclick = function() {
            modal.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards and sections
    const animatedElements = document.querySelectorAll('.project-card, .education-card, .skill-category, .section-title-wrapper');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // --- Smooth Scroll for Navigation Links ---
    const navLinksAll = document.querySelectorAll('a[data-link], a[href^="#"]');
    navLinksAll.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});