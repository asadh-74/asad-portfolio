// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1800);
});

// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    particlesContainer.appendChild(p);
}

// Typing Effect
const typingTexts = [
    'Machine Learning Models',
    'PCB Designs',
    'IoT Systems',
    'Signal Processing Pipelines',
    'Embedded Solutions'
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    const currentText = typingTexts[typingIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// Scroll Reveal (static elements present at load)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// Navbar Active State
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5,5,8,0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(5,5,8,0.7)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form -> backend API
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const statusEl = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('.form-submit');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        statusEl.textContent = '';
        statusEl.className = 'form-status';

        try {
            const res = await fetch(`${window.API_BASE_URL || ''}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Something went wrong.');

            statusEl.textContent = "Message sent! I'll get back to you soon.";
            statusEl.classList.add('success');
            contactForm.reset();
        } catch (err) {
            statusEl.textContent = err.message || 'Could not send message. Please email me directly.';
            statusEl.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
}

// AI Assistant widget
const aiToggle = document.getElementById('ai-toggle');
const aiToggleIcon = document.getElementById('ai-toggle-icon');
const aiPanel = document.getElementById('ai-panel');
const aiPanelClose = document.getElementById('ai-panel-close');
const aiForm = document.getElementById('ai-form');
const aiInput = document.getElementById('ai-input');
const aiMessages = document.getElementById('ai-messages');
const aiSend = document.getElementById('ai-send');

if (aiToggle && aiPanel) {
    let aiOpen = false;
    let aiHistory = [];

    function setAiOpen(open) {
        aiOpen = open;
        aiPanel.classList.toggle('open', open);
        aiPanel.setAttribute('aria-hidden', String(!open));
        aiToggle.setAttribute('aria-expanded', String(open));
        aiToggleIcon.className = open ? 'fas fa-xmark' : 'fas fa-message';
        if (open) setTimeout(() => aiInput.focus(), 150);
    }

    aiToggle.addEventListener('click', () => setAiOpen(!aiOpen));
    aiPanelClose.addEventListener('click', () => setAiOpen(false));

    function addAiMessage(text, role) {
        const el = document.createElement('div');
        el.className = 'ai-message ai-message-' + role;
        el.textContent = text;
        aiMessages.appendChild(el);
        aiMessages.scrollTop = aiMessages.scrollHeight;
        return el;
    }

    if (aiForm) {
        aiForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const question = aiInput.value.trim();
            if (!question) return;

            addAiMessage(question, 'user');
            aiHistory.push({ role: 'user', content: question });
            aiInput.value = '';
            aiInput.disabled = true;
            aiSend.disabled = true;

            const thinkingEl = addAiMessage('Thinking...', 'bot');

            try {
                const res = await fetch(`${window.API_BASE_URL || ''}/api/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: aiHistory })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Something went wrong.');

                thinkingEl.textContent = data.reply;
                thinkingEl.classList.remove('ai-message-bot');
                thinkingEl.classList.add('ai-message-bot');
                aiHistory.push({ role: 'assistant', content: data.reply });
            } catch (err) {
                thinkingEl.textContent = err.message || 'The assistant is unavailable right now. Please use the contact form instead.';
                thinkingEl.classList.add('ai-message-error');
            } finally {
                aiInput.disabled = false;
                aiSend.disabled = false;
                aiInput.focus();
            }
        });
    }
}
