document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNavPanel = document.querySelector('.mobile-nav-panel');

  if (hamburger && mobileNavPanel) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      mobileNavPanel.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
    });

    // Close panel on link click
    mobileNavPanel.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNavPanel.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // Day/Night Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Pricing Toggles (Ads & Web Toggles independently)
  const setupPricingToggle = (toggleId, usdPanelId, pkrPanelId) => {
    const toggle = document.getElementById(toggleId);
    const usdPanel = document.getElementById(usdPanelId);
    const pkrPanel = document.getElementById(pkrPanelId);

    if (toggle && usdPanel && pkrPanel) {
      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          usdPanel.classList.remove('active');
          pkrPanel.classList.add('active');
        } else {
          pkrPanel.classList.remove('active');
          usdPanel.classList.add('active');
        }
      });
    }
  };

  setupPricingToggle('ads-currency-toggle', 'ads-usd-pricing', 'ads-pkr-pricing');
  setupPricingToggle('web-currency-toggle', 'web-usd-pricing', 'web-pkr-pricing');

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');
        
        // Collapse all others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherPanel = otherItem.querySelector('.faq-panel');
            if (otherPanel) otherPanel.style.maxHeight = null;
            otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', false);
          }
        });

        // Toggle self
        if (isCurrentlyActive) {
          item.classList.remove('active');
          panel.style.maxHeight = null;
          trigger.setAttribute('aria-expanded', false);
        } else {
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', true);
        }
      });
    }
  });

  // Animated Performance Metrics (Intersection Observer)
  const scoreCard = document.querySelector('.score-card');
  const fillBars = document.querySelectorAll('.metric-bar-fill');

  if (scoreCard && fillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-value') + '%';
            bar.style.width = targetWidth;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(scoreCard);
  }

  // Stat numbers animated counters
  const statsSection = document.querySelector('.hero-stats');
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statsSection && statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => {
            const targetVal = parseFloat(stat.getAttribute('data-target'));
            const isFloat = stat.getAttribute('data-float') === 'true';
            const suffix = stat.getAttribute('data-suffix') || '';
            let start = 0;
            const duration = 1200;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing out quadratic
              const easeProgress = progress * (2 - progress);
              const currentVal = start + easeProgress * (targetVal - start);
              
              if (isFloat) {
                stat.textContent = currentVal.toFixed(1) + suffix;
              } else {
                stat.textContent = Math.floor(currentVal) + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                if (isFloat) {
                  stat.textContent = targetVal.toFixed(1) + suffix;
                } else {
                  stat.textContent = targetVal + suffix;
                }
              }
            }

            requestAnimationFrame(updateCounter);
          });
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    statObserver.observe(statsSection);
  }

  // Back to Top Button Actions with Scroll Progress
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.querySelector('.progress-ring__circle');

  if (backToTopBtn && progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // Set initial dasharray and dashoffset
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;

      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } else if (backToTopBtn) {
    // Fallback if SVG not loaded
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Work Case Studies Category Filter
  const filterTabs = document.querySelectorAll('.work-tab');
  const workCards = document.querySelectorAll('.work-grid .work-card');

  if (filterTabs.length > 0 && workCards.length > 0) {
    const filterWork = (category) => {
      workCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        card.classList.add('fade-out');
        
        setTimeout(() => {
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            requestAnimationFrame(() => {
              card.classList.remove('fade-out');
            });
          } else {
            card.classList.add('hidden');
          }
        }, 200);
      });
    };

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');
        filterWork(category);
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const activeTab = document.querySelector(`.work-tab[data-filter="${categoryParam}"]`);
      if (activeTab) {
        activeTab.click();
      }
    }
  }
});
