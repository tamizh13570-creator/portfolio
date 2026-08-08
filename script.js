/* ============================================================
   TAMILSELVAN P — PORTFOLIO JAVASCRIPT
   Features: Custom Cursor, Particles, Typed Text, Scroll Reveal,
             Skill Bar Animations, Counter Animation, Project Filter,
             Smooth Nav, Form Submission
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. CUSTOM CURSOR
  // ============================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor hover effects on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .tech-card, .project-card, .filter-btn, .social-link');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'var(--accent-cyan)';
      cursorFollower.style.width = '56px';
      cursorFollower.style.height = '56px';
      cursorFollower.style.borderColor = 'rgba(6,182,212,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.background = 'var(--accent-purple-light)';
      cursorFollower.style.width = '36px';
      cursorFollower.style.height = '36px';
      cursorFollower.style.borderColor = 'rgba(168,85,247,0.5)';
    });
  });


  // ============================================
  // 2. PARTICLE SYSTEM
  // ============================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const PARTICLE_COUNT = 80;

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '124,58,237' : '6,182,212';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });


  // ============================================
  // 3. TYPED TEXT EFFECT
  // ============================================
  const typedEl = document.getElementById('typed-text');
  const roles = [
    'Frontend Web Developer',
    'React.js Specialist',
    'UI/UX Enthusiast',
    'JavaScript Engineer',
    'Open to Work 🚀'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeText() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeText, typingSpeed);
  }
  typeText();


  // ============================================
  // 4. NAVBAR — Scroll & Active Link
  // ============================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Sticky bg
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
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


  // ============================================
  // 5. HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');

  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('mobile-nav-open');
    const spans = hamburger.querySelectorAll('span');
    if (document.body.classList.contains('mobile-nav-open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-nav-open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });


  // ============================================
  // 6. SCROLL REVEAL — Intersection Observer
  // ============================================
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);

        // Trigger skill bars if inside skills section
        const skillFills = entry.target.querySelectorAll('.skill-bar-fill');
        skillFills.forEach(fill => animateSkillBar(fill));
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));


  // ============================================
  // 7. SKILL BAR ANIMATION
  // ============================================
  function animateSkillBar(fill) {
    const targetWidth = fill.getAttribute('data-width');
    setTimeout(() => {
      fill.style.width = targetWidth + '%';
    }, 200);
  }

  // Also trigger when skills section is directly observed
  const skillsSection = document.getElementById('skills');
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach(fill => animateSkillBar(fill));
      skillObserver.unobserve(skillsSection);
    }
  }, { threshold: 0.2 });

  if (skillsSection) skillObserver.observe(skillsSection);


  // ============================================
  // 8. COUNTER ANIMATION (About Stats)
  // ============================================
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '+';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  // ============================================
  // 9. PROJECT FILTER
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = '';
          card.style.animation = 'fade-in-up 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ============================================
  // 10. CONTACT FORM — Real Email via Web3Forms
  // ============================================
  const submitBtn = document.getElementById('form-submit-btn');

  if (submitBtn) {
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const name    = document.getElementById('contact-name').value.trim();
      const email   = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      const budget  = document.getElementById('contact-budget').value;
      const accessKey = document.getElementById('web3forms-key').value;

      // Validation
      if (!name || !email || !message) {
        submitBtn.innerHTML = '⚠️ Please fill Name, Email & Message';
        submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message';
          submitBtn.style.background = '';
        }, 3000);
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        submitBtn.innerHTML = '⚠️ Please enter a valid email address';
        submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message';
          submitBtn.style.background = '';
        }, 3000);
        return;
      }

      // Show sending state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending...';
      submitBtn.disabled = true;

      try {
        const formData = {
          access_key: accessKey,
          name: name,
          email: email,
          subject: subject || 'New Portfolio Contact',
          message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\nBudget: ${budget || 'N/A'}\n\nMessage:\n${message}`,
          from_name: name,
          replyto: email,
          botcheck: ''
        };

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
          // SUCCESS
          submitBtn.innerHTML = '✅ Message Sent! I will reply soon.';
          submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
          submitBtn.disabled = false;

          // Clear form
          document.getElementById('contact-name').value = '';
          document.getElementById('contact-email').value = '';
          document.getElementById('contact-subject').value = '';
          document.getElementById('contact-message').value = '';
          document.getElementById('contact-budget').value = '';

          setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message';
            submitBtn.style.background = '';
          }, 4000);

        } else {
          throw new Error(result.message || 'Submission failed');
        }

      } catch (error) {
        console.error('Form error:', error);
        submitBtn.innerHTML = '❌ Failed to send. Try emailing directly.';
        submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message';
          submitBtn.style.background = '';
        }, 4000);
      }
    });
  }


  // ============================================
  // 11. SMOOTH SCROLL for Nav Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });


  // ============================================
  // 12. HERO PARALLAX on mouse move
  // ============================================
  const heroSection = document.getElementById('hero');
  const orbs = document.querySelectorAll('.hero-bg-orb');

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 20;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(1.02)`;
    });
  });


  // ============================================
  // 13. DOWNLOAD RESUME BUTTON
  // ============================================
  const downloadBtn = document.querySelector('a[href="#contact"].btn-primary');
  if (downloadBtn && downloadBtn.textContent.includes('Download')) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Simulate download feedback
      downloadBtn.innerHTML = '<i class="fas fa-check"></i> Resume Ready!';
      downloadBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
      setTimeout(() => {
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Resume';
        downloadBtn.style.background = '';
      }, 2500);
    });
  }


  // ============================================
  // 14. PAGE LOAD ANIMATION
  // ============================================
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(10px)';
  document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'translateY(0)';
    });
  });

});
