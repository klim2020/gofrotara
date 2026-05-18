// ============================================================
// GOFROTARA MARKET — Main JS
// ============================================================

import 'aos/dist/aos.css'
import AOS from 'aos'
import { Collapse } from 'bootstrap'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// ============================================================
// AOS — Animate On Scroll
// ============================================================
AOS.init({
  once: true,
  offset: 60,
  easing: 'ease-out-cubic',
  duration: 700,
})

// ============================================================
// Header: scroll behavior (shadow + compact)
// ============================================================
const header = document.getElementById('header')

function updateHeader() {
  if (window.scrollY > 40) {
    header?.classList.add('scrolled')
  } else {
    header?.classList.remove('scrolled')
  }
}

window.addEventListener('scroll', updateHeader, { passive: true })
updateHeader()

// ============================================================
// Mobile navbar — Bootstrap Collapse instance
// ============================================================
const navbarCollapseEl = document.getElementById('navbarMain')

// ============================================================
// Smooth scroll for anchor links (with offset for fixed header)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href')
    if (!targetId || targetId === '#') return

    const target = document.querySelector(targetId)
    if (!target) return

    e.preventDefault()

    // Close mobile navbar via Bootstrap API before scrolling
    if (navbarCollapseEl?.classList.contains('show')) {
      Collapse.getInstance(navbarCollapseEl)?.hide()
    }

    const headerHeight = header?.offsetHeight ?? 80
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12

    window.scrollTo({ top, behavior: 'smooth' })
  })
})

// ============================================================
// Active nav link on scroll (IntersectionObserver)
// ============================================================
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.site-nav .nav-link')

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')
        navLinks.forEach((link) => {
          const href = link.getAttribute('href')
          const isActive = href === `#${id}`
          link.classList.toggle('active', isActive)
          if (isActive) {
            link.setAttribute('aria-current', 'true')
          } else {
            link.removeAttribute('aria-current')
          }
        })
      }
    })
  },
  {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  }
)

sections.forEach((section) => sectionObserver.observe(section))

// ============================================================
// Catalog Swiper
// ============================================================
const catalogSwiper = new Swiper('.catalog-swiper', {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1.15,
  spaceBetween: 16,
  centeredSlides: true,
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    prevEl: '.catalog-prev',
    nextEl: '.catalog-next',
  },
  breakpoints: {
    480: {
      slidesPerView: 1.8,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3.1,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 28,
      centeredSlides: false,
      pagination: { enabled: false },
    },
  },
})

// ============================================================
// Contact form: basic validation + submit feedback
// ============================================================
const contactForm = document.getElementById('contactForm')

const formError = document.getElementById('formError')

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = contactForm.querySelector('[name="name"]')?.value.trim()
  const phone = contactForm.querySelector('[name="phone"]')?.value.trim()

  if (!name || !phone) {
    if (formError) {
      formError.textContent = 'Будь ласка, заповніть обов\'язкові поля: Ім\'я та Телефон.'
      formError.hidden = false
    }
    return
  }

  if (formError) formError.hidden = true

  const submitBtn = contactForm.querySelector('.btn-submit')
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Відправлено'
    submitBtn.classList.add('btn-submit--sent')
    submitBtn.disabled = true
  }

  setTimeout(() => {
    contactForm.reset()
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Відправити'
      submitBtn.classList.remove('btn-submit--sent')
      submitBtn.disabled = false
    }
  }, 3500)
})

document.addEventListener('DOMContentLoaded',()=>{
  // TODO: remove
  console.log('test1');
})
