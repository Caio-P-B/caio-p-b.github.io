// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        document.getElementById('nav').classList.remove('active');
        document.getElementById('menuToggle').classList.remove('active');
    });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

animateOnScroll();

// ============================================
// SKILL BARS ANIMATION
// ============================================
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

animateSkillBars();

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    let isValid = true;
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorMessage = group.querySelector('.error-message');
        
        // Remove previous error state
        group.classList.remove('error');
        
        // Check if field is empty
        if (input.value.trim() === '') {
            isValid = false;
            group.classList.add('error');
            errorMessage.textContent = 'Este campo é obrigatório';
        }
        
        // Validate email format
        if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value)) {
            isValid = false;
            group.classList.add('error');
            errorMessage.textContent = 'Por favor, insira um email válido';
        }
    });
    
    return isValid;
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate form submission
        setTimeout(() => {
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
            }, 300);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
                setTimeout(() => {
                    contactForm.style.display = 'flex';
                    contactForm.reset();
                    setTimeout(() => {
                        contactForm.style.opacity = '1';
                    }, 100);
                }, 300);
            }, 3000);
        }, 500);
    }
});

// Real-time validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        
        if (input.value.trim() === '') {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Este campo é obrigatório';
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Por favor, insira um email válido';
        }
    });
    
    input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        if (formGroup.classList.contains('error') && input.value.trim() !== '') {
            formGroup.classList.remove('error');
        }
    });
});

// ============================================
// PROJECT MODAL
// ============================================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const expandButtons = document.querySelectorAll('.expand-btn');

const projectDetails = [
    {
        title: 'E-commerce Minimalista com Carrinho Completo',
        image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?w=1200&q=80',
        tags: ['React', 'Redux Toolkit', 'Stripe API'],
        description: 'Plataforma completa de e-commerce desenvolvida com tecnologias modernas e escaláveis.',
        features: [
            'Carrinho persistente',
            'Checkout com Stripe',
            'Filtros e busca',
            'Otimização SEO e performance'
        ],
        challenges: 'Gerenciamento global de estado complexo, Integração real de pagamentos',
        results: 'Demonstra software nível profissional e pronto para empresas.'
    },
    {
        title: 'App de Anotações com Sincronização Offline',
        image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=1200&q=80',
        tags: ['React', 'PWA', 'IndexedDB', 'Service Workers'],
        description: 'Um bloco de notas moderno que funciona totalmente offline.',
        features: [
            'Sincronização local e nuvem',
            'Markdown editor',
            'Sistema completo de tags',
        ],
        challenges: 'Implementar PWA, Implementar PWA, Banco de dados local IndexedDB',
        results: 'Prova de nível avançado em web moderna.'
    },
    {
        title: 'App Meteorológico Avançado com Animações',
        image: 'https://images.unsplash.com/photo-1710870509663-16f20f75d758?w=1200&q=80',
        tags: ['React', 'Framer Motion', 'Weather API'],
        description: 'Aplicativo com previsões e animações de clima super detalhadas.',
        features: [
            'Mudança dinâmica da interface conforme o clima',
            'Histórico de consultas',
            'Previsão de 7 dias',
        ],
        challenges: 'Consumo de API externo, Responsividade avançada',
        results: 'Um projeto visualmente rico e altamente demonstrativo.'
    },
    {
        title: 'Plataforma de Mini Cursos com Player de Vídeo',
        image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?w=1200&q=80',
        tags: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
        description: 'Uma plataforma estilo Udemy simplificada.',
        features: [
            'Cadastro/login',
            'Hospedagem de vídeos',
            'Progresso do aluno armazenado',
        ],
        challenges: 'Full-stack real, Player customizado, Relacionamentos de banco',
        results: 'Um projeto sério e completo, demonstrando maturidade técnica.'
    }
];

expandButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectIndex = parseInt(button.getAttribute('data-project'));
        const project = projectDetails[projectIndex];
        
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 12px; margin-bottom: 30px;">
            <h2 style="font-size: 2rem; color: var(--dark-color); margin-bottom: 20px;">${project.title}</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p style="color: var(--medium-color); font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px;">${project.description}</p>
            
            <h3 style="font-size: 1.3rem; color: var(--dark-color); margin-bottom: 15px;">✨ Funcionalidades Principais</h3>
            <ul style="color: var(--medium-color); margin-bottom: 30px; padding-left: 20px;">
                ${project.features.map(feature => `<li style="margin-bottom: 10px;">${feature}</li>`).join('')}
            </ul>
            
            <h3 style="font-size: 1.3rem; color: var(--dark-color); margin-bottom: 15px;">🎯 Desafios Técnicos</h3>
            <p style="color: var(--medium-color); line-height: 1.8; margin-bottom: 30px;">${project.challenges}</p>
            
            <h3 style="font-size: 1.3rem; color: var(--dark-color); margin-bottom: 15px;">📊 Resultados</h3>
            <p style="color: var(--medium-color); line-height: 1.8;">${project.results}</p>
        `;
        
        modal.classList.add('show');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
});

// ============================================
// DOWNLOAD CV BUTTON
// ============================================
const downloadCVBtn = document.getElementById('downloadCV');

downloadCVBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Simulate CV download
    alert('Download do CV iniciado! (Esta é uma demonstração)');
});

// ============================================
// TYPING EFFECT FOR HERO TITLE
// ============================================
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

let charIndex = 0;
const typingSpeed = 50;

const typeWriter = () => {
    if (charIndex < titleText.length) {
        heroTitle.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});