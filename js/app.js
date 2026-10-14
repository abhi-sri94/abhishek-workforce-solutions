/* ==========================================================================
   ABHISHEK WORKFORCE SOLUTIONS - INTERACTIVE APPLICATION LOGIC
   ========================================================================== */

import heroWarehouseImg from '../assets/hero_warehouse.jpg';
import packingTeamImg from '../assets/packing_team.jpg';
import factoryWorkersImg from '../assets/factory_workers.jpg';
import logoImg from '../assets/logo.png';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmartNavbar();
  initEstimator();
  initModals();
  initIndustryTabs();
  initFormSubmissions();
  removeNetlifyBadge();
  initScrollAnimations();
});

/* Smart Auto-Hiding Navbar (Hides on scroll down, reveals on floating scroll up) */
function initSmartNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
  let isTicking = false;
  const scrollThreshold = 5; // minimal delta in px to prevent micro-flickering
  const topSafeOffset = 30; // near the top of the page

  const updateNavbar = () => {
    const currentScrollY = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);

    // Never hide when mobile menu dropdown is open
    if (header.classList.contains('mobile-menu-active')) {
      header.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      isTicking = false;
      return;
    }

    // When at the very top of the page, show standard unpinned header
    if (currentScrollY <= topSafeOffset) {
      header.classList.remove('header-hidden');
      header.classList.remove('header-pinned');
      lastScrollY = currentScrollY;
      isTicking = false;
      return;
    }

    const diff = currentScrollY - lastScrollY;

    // Trigger state change whenever user scrolls beyond threshold
    if (Math.abs(diff) >= scrollThreshold) {
      if (diff > 0) {
        // Scrolling DOWN -> Hide navbar smoothly out of view
        header.classList.add('header-hidden');
        header.classList.remove('header-pinned');
      } else {
        // Scrolling UP -> Reveal floating white navbar with elevated blur & shadow
        header.classList.remove('header-hidden');
        header.classList.add('header-pinned');
      }
      lastScrollY = currentScrollY;
    }

    isTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateNavbar);
      isTicking = true;
    }
  }, { passive: true });

  // When clicking any navigation link, ensure floating navbar is visible
  const navLinks = document.querySelectorAll('.nav-links a, .nav-actions button');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        header.classList.remove('header-hidden');
        header.classList.add('header-pinned');
      }, 300);
    });
  });
}

/* Scroll-Triggered Entrance Animations for Cards */
function initScrollAnimations() {
  const cardsToAnimate = document.querySelectorAll(
    '.statutory-card, .service-card, .stat-item-col, .statutory-acts-bar, .compliance-item'
  );

  cardsToAnimate.forEach(card => card.classList.add('reveal-card'));

  if (!('IntersectionObserver' in window)) {
    cardsToAnimate.forEach(card => card.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  cardsToAnimate.forEach(card => observer.observe(card));
}

/* Automatically remove Netlify injected badge */
function removeNetlifyBadge() {
  const clean = () => {
    const badge = document.getElementById('nl-badge-frame') || document.querySelector('iframe[title="Powered by Netlify"]');
    if (badge) badge.remove();
  };
  clean();
  const observer = new MutationObserver(clean);
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

/* Mobile Navigation Toggle & Auto-Close */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navContainer = document.querySelector('.site-header');
  const closeTriggers = document.querySelectorAll(
    '.js-close-mobile-nav, .nav-links .nav-link, .nav-actions button'
  );

  if (!toggleBtn || !navContainer) return;

  const setMenuState = (isOpen) => {
    const icon = toggleBtn.querySelector('i');
    if (isOpen) {
      navContainer.classList.add('mobile-menu-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
      if (icon) {
        icon.className = 'fas fa-xmark';
      }
      document.body.classList.add('nav-open-lock');
    } else {
      navContainer.classList.remove('mobile-menu-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      if (icon) {
        icon.className = 'fas fa-bars';
      }
      document.body.classList.remove('nav-open-lock');
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCurrentlyOpen = navContainer.classList.contains('mobile-menu-active');
    setMenuState(!isCurrentlyOpen);
  });

  closeTriggers.forEach(el => {
    el.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navContainer.classList.contains('mobile-menu-active')) {
      setMenuState(false);
    }
  });
}

/* Interactive Manpower Cost & Headcount Estimator */
function initEstimator() {
  const roleSelect = document.getElementById('est-role');
  const countSlider = document.getElementById('est-count');
  const countOutput = document.getElementById('est-count-val');
  const countBadge = document.getElementById('est-count-badge');
  const shiftSelect = document.getElementById('est-shift');
  const tenureSelect = document.getElementById('est-tenure');

  const estHeadcountDisplay = document.getElementById('est-res-count');
  const estDeploymentTime = document.getElementById('est-res-time');
  const estComplianceBadge = document.getElementById('est-res-compliance');

  if (!countSlider || !countOutput) return;

  function updateEstimator() {
    const count = parseInt(countSlider.value, 10);
    countOutput.textContent = count;
    if (countBadge) countBadge.textContent = count;

    if (estHeadcountDisplay) {
      estHeadcountDisplay.textContent = `${count} Verified Staff`;
    }

    if (estDeploymentTime) {
      if (count <= 15) {
        estDeploymentTime.textContent = 'Within 12 - 24 Hours';
      } else if (count <= 50) {
        estDeploymentTime.textContent = 'Within 24 - 48 Hours';
      } else {
        estDeploymentTime.textContent = '2 - 4 Days (Batchwise)';
      }
    }

    if (estComplianceBadge) {
      estComplianceBadge.textContent = '100% Aadhaar & Background Checked';
    }
  }

  countSlider.addEventListener('input', updateEstimator);
  if (roleSelect) roleSelect.addEventListener('change', updateEstimator);
  if (shiftSelect) shiftSelect.addEventListener('change', updateEstimator);
  if (tenureSelect) tenureSelect.addEventListener('change', updateEstimator);

  updateEstimator();
}

/* HTML5 Dialog Modals Handler */
function initModals() {
  const hireModal = document.getElementById('modal-hire');
  const applyModal = document.getElementById('modal-apply');
  const successModal = document.getElementById('modal-success');

  const openHireBtns = document.querySelectorAll('.js-open-hire-modal');
  const openApplyBtns = document.querySelectorAll('.js-open-apply-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn, .js-close-modal');

  openHireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (hireModal) {
        hireModal.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  openApplyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (applyModal) {
        applyModal.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (dialog) {
        dialog.close();
        document.body.style.overflow = '';
      }
    });
  });

  // Light dismiss on backdrop click
  [hireModal, applyModal, successModal].forEach(dialog => {
    if (!dialog) return;
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
        document.body.style.overflow = '';
      }
    });

    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  });
}

/* Industry Tabs Data Switcher with Bundled Image Assets */
function initIndustryTabs() {
  const tabs = document.querySelectorAll('.industry-tabs-nav .tab-btn');
  const displayTitle = document.getElementById('ind-display-title');
  const displayDesc = document.getElementById('ind-display-desc');
  const displayHighlights = document.getElementById('ind-display-list');
  const displayImg = document.getElementById('ind-display-img');

  const industryData = {
    ecommerce: {
      title: 'E-Commerce & Fulfillment Centers',
      desc: 'High-speed order picking, packing, sorting, barcode scanning, and peak season scale-up workforce for massive order volumes.',
      img: heroWarehouseImg,
      highlights: [
        'Dedicated Order Pickers with barcode scanner familiarity',
        'Peak Festival & Sale surge staffing support',
        'Returns processing & packaging teams'
      ]
    },
    logistics: {
      title: '3PL & Logistics Hubs',
      desc: 'Forklift drivers, reach truck operators, heavy container loading & unloading crews, and cargo dispatch helpers.',
      img: packingTeamImg,
      highlights: [
        'Forklift & Reach Truck Operators',
        'Fast container loading/unloading turnaround',
        'Shift supervisors & safety-conscious staff'
      ]
    },
    manufacturing: {
      title: 'Manufacturing & Assembly Lines',
      desc: 'Contract factory helpers, machine operating support, assembly helpers, and quality inspection assistants.',
      img: factoryWorkersImg,
      highlights: [
        'Assembly line helpers trained in basic industrial safety',
        'Responsive replacement guarantee for absent workers',
        'Transparent wage structure & direct bank payouts'
      ]
    },
    fmcg: {
      title: 'FMCG & Consumer Goods Warehouses',
      desc: 'Bulk goods handling, shrink wrapping, palletizing, batch labeling, and stock handling helpers.',
      img: packingTeamImg,
      highlights: [
        'Palletizing & shrink-wrapping labor',
        'Batch code labeling & promotional packaging',
        'Hygienic material handling practices'
      ]
    },
    coldstorage: {
      title: 'Cold Storage & Food Logistics',
      desc: 'Specialized workforce for cold room environments, perishable goods handling, and strict hygiene protocols.',
      img: heroWarehouseImg,
      highlights: [
        'Cold storage material handlers',
        'Strict FIFO inventory rotation adherence',
        'Verified physical fitness'
      ]
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const industryKey = tab.dataset.industry;
      const data = industryData[industryKey];

      if (data && displayTitle && displayDesc && displayHighlights && displayImg) {
        displayTitle.textContent = data.title;
        displayDesc.textContent = data.desc;
        displayImg.src = data.img;

        displayHighlights.innerHTML = data.highlights.map(item => `
          <li><i class="fas fa-check-circle"></i> ${item}</li>
        `).join('');
      }
    });
  });
}

/* Form Submissions: Serverless Delivery & Instant WhatsApp Connection */
function initFormSubmissions() {
  const hireForm = document.getElementById('hire-request-form');
  const modalHireForm = document.getElementById('modal-hire-form');
  const estForm = document.getElementById('estimator-submit-form');
  const applyForm = document.getElementById('candidate-apply-form');

  const successModal = document.getElementById('modal-success');
  const successTitle = document.getElementById('success-title');
  const successMsg = document.getElementById('success-msg');
  const successTicket = document.getElementById('success-ticket');
  const successWaBtn = document.getElementById('success-wa-btn');

  function openSuccessModal(ticketId, title, message, waText) {
    if (successTitle) successTitle.textContent = title;
    if (successMsg) successMsg.textContent = message;
    if (successTicket) successTicket.textContent = ticketId;
    if (successWaBtn) {
      successWaBtn.href = `https://wa.me/919196359955?text=${encodeURIComponent(waText)}`;
    }

    if (successModal) {
      successModal.showModal();
      document.body.style.overflow = 'hidden';
    }
  }

  async function submitPayload(formEl, payload, ticketId, title, message, waText) {
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    }

    try {
      // Free serverless email dispatcher directly to aws.staffing@gmail.com
      await fetch('https://formsubmit.co/ajax/aws.staffing@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          _subject: `[${ticketId}] ${payload._subject || 'Workforce Inquiry'}`,
          _template: 'table'
        })
      });
    } catch (err) {
      console.warn('Network dispatch note:', err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      // Close parent dialog modal if open
      const parentDialog = formEl.closest('dialog');
      if (parentDialog && parentDialog !== successModal) {
        parentDialog.close();
      }

      formEl.reset();
      openSuccessModal(ticketId, title, message, waText);
    }
  }

  // 1. Bottom Contact Desk Form
  if (hireForm) {
    hireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ticketId = 'AWS-' + Math.floor(100000 + Math.random() * 900000);
      const name = document.getElementById('contact-name')?.value || 'Client';
      const phone = document.getElementById('contact-phone')?.value || 'N/A';
      const email = document.getElementById('contact-email')?.value || 'N/A';
      const msg = document.getElementById('contact-msg')?.value || 'N/A';

      const payload = {
        _subject: `New Workforce Query - ${name}`,
        TicketID: ticketId,
        ClientName: name,
        PhoneNumber: phone,
        EmailAddress: email,
        RequirementDetails: msg
      };

      const waText = `Hello Abhishek Workforce Solutions! I submitted a workforce query (Ticket: ${ticketId}).\nCompany: ${name}\nPhone: ${phone}\nRequirements: ${msg}`;

      submitPayload(
        hireForm,
        payload,
        ticketId,
        'Manpower Request Submitted!',
        'Thank you! Our operations manager has received your details and will call you within 30 minutes with available workforce profiles.',
        waText
      );
    });
  }

  // 2. Wizard Hire Modal Form (Primary CTA)
  if (modalHireForm) {
    modalHireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ticketId = 'AWS-' + Math.floor(100000 + Math.random() * 900000);
      const category = document.getElementById('modal-hire-cat')?.value || 'General';
      const count = document.getElementById('modal-hire-count')?.value || '10';
      const date = document.getElementById('modal-hire-date')?.value || 'Immediate';
      const company = document.getElementById('modal-hire-company')?.value || 'Client';
      const contact = document.getElementById('modal-hire-contact')?.value || 'N/A';
      const phone = document.getElementById('modal-hire-phone')?.value || 'N/A';

      const payload = {
        _subject: `Deployment Request: ${category} (${count} workers) - ${company}`,
        TicketID: ticketId,
        Category: category,
        Headcount: count,
        StartDate: date,
        CompanyAndLocation: company,
        ContactPerson: contact,
        PhoneNumber: phone
      };

      const waText = `Hello Abhishek Workforce Solutions! We need manpower deployment (Ticket: ${ticketId}):\nRole: ${category}\nHeadcount: ${count}\nStart Date: ${date}\nCompany: ${company}\nContact: ${contact} (${phone})`;

      submitPayload(
        modalHireForm,
        payload,
        ticketId,
        'Deployment Request Received!',
        `Your request for ${count} ${category} at ${company} has been assigned to our operations desk. We will call you at ${phone} shortly.`,
        waText
      );
    });
  }

  // 3. Manpower Estimator Form
  if (estForm) {
    estForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ticketId = 'EST-' + Math.floor(100000 + Math.random() * 900000);
      const role = document.getElementById('est-role')?.value || 'Staff';
      const count = document.getElementById('est-count')?.value || '20';
      const shift = document.getElementById('est-shift')?.value || '8h';
      const tenure = document.getElementById('est-tenure')?.value || 'Monthly';
      const contact = document.getElementById('est-contact-name')?.value || 'Client';
      const phone = document.getElementById('est-contact-phone')?.value || 'N/A';

      const payload = {
        _subject: `Estimator Quote Request - ${contact} (${count} workers)`,
        TicketID: ticketId,
        ClientName: contact,
        PhoneNumber: phone,
        RoleCategory: role,
        Headcount: count,
        ShiftPattern: shift,
        ContractDuration: tenure
      };

      const waText = `Hello Abhishek Workforce Solutions! I calculated manpower needs on your website (Ticket: ${ticketId}):\nCompany: ${contact}\nPhone: ${phone}\nRole: ${role}\nHeadcount: ${count} workers\nShift: ${shift}\nDuration: ${tenure}`;

      submitPayload(
        estForm,
        payload,
        ticketId,
        'Staffing Estimate Received!',
        `Thank you ${contact}! We are preparing a customized rate card and trial roster for ${count} workers. Our desk will contact you at ${phone}.`,
        waText
      );
    });
  }

  // 4. Job Seeker Candidate Application Form
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const appId = 'JOB-' + Math.floor(100000 + Math.random() * 900000);
      const name = document.getElementById('apply-name')?.value || 'Candidate';
      const phone = document.getElementById('apply-phone')?.value || 'N/A';
      const location = document.getElementById('apply-location')?.value || 'N/A';
      const role = document.getElementById('apply-role')?.value || 'General Helper';
      const exp = document.getElementById('apply-exp')?.value || 'Fresher';

      const payload = {
        _subject: `Candidate Application - ${name} (${role})`,
        RegistrationID: appId,
        CandidateName: name,
        MobileNumber: phone,
        LocationArea: location,
        PreferredRole: role,
        PriorExperience: exp
      };

      const waText = `Namaste Abhishek Workforce Solutions! I submitted my job application (Reg ID: ${appId}):\nName: ${name}\nMobile: ${phone}\nLocation: ${location}\nPreferred Role: ${role}\nExperience: ${exp}`;

      submitPayload(
        applyForm,
        payload,
        appId,
        'Candidate Registration Complete!',
        `Dhanyawad ${name}! Aapka registration safal raha. Hamari HR team aapse mobile number ${phone} par jald sampark karegi.`,
        waText
      );
    });
  }
}
