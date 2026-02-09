// ============================================
// Portfolio Script - VU HAI NAM
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initSkillsTabs();
  initProjectTabs();
  initLanguageSelector();
  loadContent();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navLinks?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

// ============================================
// Skills Tabs
// ============================================
function initSkillsTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      
      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
        }
      });
    });
  });
}

// ============================================
// Project Tabs
// ============================================
function initProjectTabs() {
  const tabBtns = document.querySelectorAll('[data-project-tab]');
  const tabContents = document.querySelectorAll('.project-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.projectTab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
        }
      });
    });
  });
}

// ============================================
// Language Selector
// ============================================
function initLanguageSelector() {
  const langBtns = document.querySelectorAll('.lang-selector button');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // TODO: Implement language switching logic
      console.log('Language changed to:', btn.textContent);
    });
  });
}

// ============================================
// Load Content from JSON
// ============================================
async function loadContent() {
  try {
    const response = await fetch('content.json');
    const data = await response.json();
    
    // Update personal info
    updatePersonalInfo(data.personal);
    
    // Update about section
    updateAboutSection(data.about);
    
    // Update experience section
    updateExperienceSection(data.experience);
    
    // Update skills section
    updateSkillsSection(data.skills);
    
    // Update projects section
    updateProjectsSection(data.projects);
    
    // Update footer
    updateFooter(data.footer);
    
  } catch (error) {
    console.log('Content loaded from HTML (fallback)');
  }
}

function updatePersonalInfo(personal) {
  const heroName = document.querySelector('.hero-name');
  const heroRole = document.querySelector('.hero-role');
  const heroTagline = document.querySelector('.hero-tagline');
  
  if (heroName) heroName.textContent = personal.name;
  if (heroRole) heroRole.textContent = personal.role;
  if (heroTagline) heroTagline.textContent = personal.tagline;
  
  // Update social links
  const githubLink = document.querySelector('.social-links a[aria-label="GitHub"]');
  const linkedinLink = document.querySelector('.social-links a[aria-label="LinkedIn"]');
  const emailLink = document.querySelector('.social-links a[aria-label="Email"]');
  
  if (githubLink) githubLink.href = personal.github;
  if (linkedinLink) linkedinLink.href = personal.linkedin;
  if (emailLink) emailLink.href = `mailto:${personal.email}`;
}

function updateAboutSection(about) {
  const aboutTitle = document.querySelector('#about .section-title');
  const aboutSubtitle = document.querySelector('#about .section-subtitle');
  const aboutBio = document.querySelector('.about-text p');
  const aboutCards = document.querySelector('.about-cards');
  
  if (aboutTitle) aboutTitle.textContent = about.heading;
  if (aboutSubtitle) aboutSubtitle.textContent = about.subheading;
  if (aboutBio) aboutBio.textContent = about.bio;
  
  if (aboutCards && about.cards) {
    aboutCards.innerHTML = about.cards.map(card => `
      <div class="about-card reveal">
        <div class="about-card-icon">${card.icon}</div>
        <h4>${card.title}</h4>
        <p>${card.description}</p>
      </div>
    `).join('');
  }
}

function updateExperienceSection(experience) {
  const expTitle = document.querySelector('#experience .section-title');
  const expSubtitle = document.querySelector('#experience .section-subtitle');
  
  if (expTitle) expTitle.textContent = experience.heading;
  if (expSubtitle) expSubtitle.textContent = experience.subheading;
}

function updateSkillsSection(skills) {
  const skillsTitle = document.querySelector('#skills .section-title');
  const skillsSubtitle = document.querySelector('#skills .section-subtitle');
  
  if (skillsTitle) skillsTitle.textContent = skills.heading;
  if (skillsSubtitle) skillsSubtitle.textContent = skills.subheading;
}

function updateProjectsSection(projects) {
  const projTitle = document.querySelector('#projects .section-title');
  const projSubtitle = document.querySelector('#projects .section-subtitle');
  
  if (projTitle) projTitle.textContent = projects.heading;
  if (projSubtitle) projSubtitle.textContent = projects.subheading;
}

function updateFooter(footer) {
  const copyright = document.querySelector('.footer-copyright');
  if (copyright) copyright.textContent = footer.copyright;
}
