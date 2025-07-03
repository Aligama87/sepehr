// جاوا اسکریپت اتوپارت پرو


document.addEventListener("DOMContentLoaded", () => {
  // راه‌اندازی تمام عملکردها
  initNavigation()
  initContactForm()
  initAnimations()
  initProductInteractions()
  initScrollEffects()
})

// عملکرد ناوبری
function initNavigation() {
  const navbar = document.querySelector(".navbar")
  const navLinks = document.querySelectorAll(".nav-link")

  // افزودن افکت اسکرول به نوار ناوبری
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // برجسته‌سازی لینک فعال
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active")
    }
  })
}

// عملکرد فرم تماس
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // دریافت داده‌های فرم
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // اعتبارسنجی فرم
      if (validateContactForm(data)) {
        // نمایش حالت لودینگ
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent
        submitBtn.textContent = "در حال ارسال..."
        submitBtn.disabled = true

        // شبیه‌سازی ارسال فرم
        setTimeout(() => {
          showNotification("پیام با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.", "success")
          contactForm.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 2000)
      }
    })
  }
}

// اعتبارسنجی فرم
function validateContactForm(data) {
  const errors = []

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push("نام باید حداقل ۲ کاراکتر باشد")
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push("نام خانوادگی باید حداقل ۲ کاراکتر باشد")
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("لطفاً یک آدرس ایمیل معتبر وارد کنید")
  }

  if (!data.subject) {
    errors.push("لطفاً موضوع را انتخاب کنید")
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("پیام باید حداقل ۱۰ کاراکتر باشد")
  }

  if (errors.length > 0) {
    showNotification(errors.join("<br>"), "error")
    return false
  }

  return true
}

// اعتبارسنجی ایمیل
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// سیستم اعلان
function showNotification(message, type = "info") {
  // حذف اعلان‌های موجود
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // ایجاد عنصر اعلان
  const notification = document.createElement("div")
  notification.className = `notification alert alert-${type === "error" ? "danger" : type === "success" ? "success" : "info"} alert-dismissible fade show`
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(notification)

  // حذف خودکار بعد از ۵ ثانیه
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// راه‌اندازی انیمیشن‌ها
function initAnimations() {
  // Intersection Observer برای انیمیشن‌های fade-in
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // مشاهده عناصر برای انیمیشن
  const animateElements = document.querySelectorAll(".category-card, .product-card, .service-card, .team-card")
  animateElements.forEach((element) => {
    observer.observe(element)
  })
}

// تعاملات محصول
function initProductInteractions() {
  // عملکرد افزودن به سبد خرید
  const addToCartButtons = document.querySelectorAll(".product-card .btn")

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      const productCard = this.closest(".product-card")
      const productName = productCard.querySelector("h5").textContent

      // افزودن حالت لودینگ
      const originalText = this.textContent
      this.textContent = "در حال افزودن..."
      this.disabled = true

      // شبیه‌سازی افزودن به سبد خرید
      setTimeout(() => {
        showNotification(`${productName} به سبد خرید اضافه شد!`, "success")
        this.textContent = "اضافه شد!"
        this.classList.remove("btn-danger")
        this.classList.add("btn-success")

        // بازنشانی دکمه بعد از ۲ ثانیه
        setTimeout(() => {
          this.textContent = originalText
          this.classList.remove("btn-success")
          this.classList.add("btn-danger")
          this.disabled = false
        }, 2000)
      }, 1000)
    })
  })

  // افکت‌های hover کارت محصول
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

// افکت‌های اسکرول
function initScrollEffects() {
  // افکت پارالکس برای بخش هیرو
  const heroSection = document.querySelector(".hero-section")

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroSection.style.transform = `translateY(${rate}px)`
    })
  }

  // انیمیشن شمارنده برای آمار
  const counters = document.querySelectorAll(".stat-item h3")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// انیمیشن شمارنده
function animateCounter(element) {
  const target = Number.parseInt(element.textContent.replace(/[^\d]/g, ""))
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      current = target
      clearInterval(timer)
    }

    const suffix = element.textContent.includes("+") ? "+" : ""
    element.textContent = Math.floor(current).toLocaleString("fa-IR") + suffix
  }, 16)
}

// اسکرول نرم برای لینک‌های لنگر
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// عملکرد جستجو (نمونه)
function initSearch() {
  const searchButtons = document.querySelectorAll('.nav-link[href="#"]')
  searchButtons.forEach((button) => {
    if (button.innerHTML.includes("search")) {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        showNotification("عملکرد جستجو به زودی اضافه خواهد شد!", "info")
      })
    }
  })
}

// عملکرد سبد خرید (نمونه)
function initCart() {
  const cartButtons = document.querySelectorAll('.nav-link[href="#"]')
  cartButtons.forEach((button) => {
    if (button.innerHTML.includes("cart")) {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        showNotification("عملکرد سبد خرید به زودی اضافه خواهد شد!", "info")
      })
    }
  })
}

// راه‌اندازی جستجو و سبد خرید
initSearch()
initCart()

// توابع کمکی
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// بهینه‌سازی عملکرد
const debouncedScroll = debounce(() => {
  // عملکردهای مبتنی بر اسکرول در اینجا
}, 10)

window.addEventListener("scroll", debouncedScroll)

// مدیریت خطا
window.addEventListener("error", (e) => {
  console.error("خطای جاوا اسکریپت:", e.error)
})

// ثبت service worker (برای ویژگی‌های PWA آینده)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // ثبت service worker در اینجا انجام خواهد شد
  })
}
