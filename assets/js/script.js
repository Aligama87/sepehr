// جاوا اسکریپت اتوپارت پرو - نسخه بهبود یافته

// متغیرهای سراسری
let cart = JSON.parse(localStorage.getItem("cart")) || []

// محصولات بر اساس دسته‌بندی
const productsByCategory = {
  "engine-parts": [
    {
      id: 1,
      name: "فیلتر روغن موتور مان",
      price: 249000,
      image: "assets/images/Oil-Filters-cartrige.jpg",
      category: "engine-parts",
    },
    {
      id: 2,
      name: "فیلتر هوای اسپرت K&N",
      price: 599000,
      image: "assets/images/filter .jpg",
      category: "engine-parts",
    },
    {
      id: 3,
      name: "روغن موتور سینتتیک",
      price: 450000,
      image: "/placeholder.svg?height=200&width=300",
      category: "engine-parts",
    },
    {
      id: 4,
      name: "فیلتر بنزین",
      price: 180000,
      image: "/placeholder.svg?height=200&width=300",
      category: "engine-parts",
    },
  ],
  "brake-system": [
    { id: 5, name: "لنت ترمز پریمیم بوش", price: 899000, image: "assets/images/lent.jpg", category: "brake-system" },
    {
      id: 6,
      name: "دیسک ترمز",
      price: 650000,
      image: "/placeholder.svg?height=200&width=300",
      category: "brake-system",
    },
    {
      id: 7,
      name: "روغن ترمز",
      price: 120000,
      image: "/placeholder.svg?height=200&width=300",
      category: "brake-system",
    },
    {
      id: 8,
      name: "کالیپر ترمز",
      price: 1200000,
      image: "/placeholder.svg?height=200&width=300",
      category: "brake-system",
    },
  ],
  suspension: [
    { id: 9, name: "کمک فنر", price: 850000, image: "/placeholder.svg?height=200&width=300", category: "suspension" },
    {
      id: 10,
      name: "آمورتیسور",
      price: 750000,
      image: "/placeholder.svg?height=200&width=300",
      category: "suspension",
    },
    {
      id: 11,
      name: "فنر خودرو",
      price: 320000,
      image: "/placeholder.svg?height=200&width=300",
      category: "suspension",
    },
    { id: 12, name: "بوش آرم", price: 95000, image: "/placeholder.svg?height=200&width=300", category: "suspension" },
  ],
  electrical: [
    { id: 13, name: "کیت چراغ LED فیلیپس", price: 1499000, image: "assets/images/led.webp", category: "electrical" },
    {
      id: 14,
      name: "باتری خودرو",
      price: 1200000,
      image: "/placeholder.svg?height=200&width=300",
      category: "electrical",
    },
    { id: 15, name: "دینام", price: 980000, image: "/placeholder.svg?height=200&width=300", category: "electrical" },
    { id: 16, name: "استارت", price: 650000, image: "/placeholder.svg?height=200&width=300", category: "electrical" },
  ],
  oils: [
    {
      id: 17,
      name: "روغن موتور ۵W30",
      price: 380000,
      image: "/placeholder.svg?height=200&width=300",
      category: "oils",
    },
    { id: 18, name: "روغن گیربکس", price: 290000, image: "/placeholder.svg?height=200&width=300", category: "oils" },
    { id: 19, name: "ضدیخ", price: 85000, image: "/placeholder.svg?height=200&width=300", category: "oils" },
    { id: 20, name: "روغن هیدرولیک", price: 150000, image: "/placeholder.svg?height=200&width=300", category: "oils" },
  ],
  tools: [
    {
      id: 21,
      name: "جعبه ابزار کامل",
      price: 2500000,
      image: "/placeholder.svg?height=200&width=300",
      category: "tools",
    },
    { id: 22, name: "آچار بکس", price: 450000, image: "/placeholder.svg?height=200&width=300", category: "tools" },
    { id: 23, name: "جک خودرو", price: 890000, image: "/placeholder.svg?height=200&width=300", category: "tools" },
    { id: 24, name: "کمپرسور باد", price: 1800000, image: "/placeholder.svg?height=200&width=300", category: "tools" },
  ],
}

// تمام محصولات
const allProducts = Object.values(productsByCategory).flat()

document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initCart()
  initSearch()
  initProductInteractions()
  initCategoryNavigation()
  initAnimations()
  initScrollEffects()
  updateCartUI()
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

  // اسکرول نرم برای لینک‌های داخلی
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
}

// عملکرد ناوبری دسته‌بندی
function initCategoryNavigation() {
  const categoryCards = document.querySelectorAll(".category-card")
  const categoryButtons = document.querySelectorAll(".category-card .btn")

  categoryCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // جلوگیری از اجرای کلیک روی دکمه
      if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
        return
      }

      const categoryId = this.id
      if (categoryId && productsByCategory[categoryId]) {
        showCategoryProducts(categoryId)
      }
    })
  })

  // کلیک روی دکمه‌های "خرید کنید"
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation()
      const categoryCard = this.closest(".category-card")
      const categoryId = categoryCard.id
      if (categoryId && productsByCategory[categoryId]) {
        showCategoryProducts(categoryId)
      }
    })
  })
}

// نمایش محصولات دسته‌بندی
function showCategoryProducts(categoryId) {
  const products = productsByCategory[categoryId]
  const categoryNames = {
    "engine-parts": "قطعات موتور",
    "brake-system": "سیستم ترمز",
    suspension: "سیستم تعلیق",
    electrical: "سیستم برق",
    oils: "روغن و مایعات",
    tools: "ابزارآلات",
  }

  const categoryName = categoryNames[categoryId]

  // ایجاد صفحه محصولات
  const productsHTML = `
    <div class="category-products-page">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#" onclick="showHomePage()">خانه</a></li>
                <li class="breadcrumb-item active">${categoryName}</li>
              </ol>
            </nav>
            <h2 class="fw-bold mb-3">${categoryName}</h2>
            <p class="text-muted">محصولات با کیفیت در دسته ${categoryName}</p>
          </div>
        </div>
        <div class="row g-4">
          ${products
            .map(
              (product) => `
            <div class="col-lg-3 col-md-6">
              <div class="product-card">
                <div class="product-image">
                  <img src="${product.image}" alt="${product.name}" class="img-fluid">
                </div>
                <div class="product-info">
                  <h5>${product.name}</h5>
                  <div class="product-rating">
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="far fa-star text-warning"></i>
                  </div>
                  <div class="product-price">
                    <span class="current-price">${product.price.toLocaleString("fa-IR")} تومان</span>
                  </div>
                  <button class="btn btn-danger w-100 add-to-cart" 
                          data-product-id="${product.id}" 
                          data-product-name="${product.name}" 
                          data-product-price="${product.price}">
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="row mt-5">
          <div class="col-12 text-center">
            <button class="btn btn-outline-danger" onclick="showHomePage()">
              <i class="fas fa-arrow-right me-2"></i>
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    </div>
  `

  // مخفی کردن محتوای اصلی و نمایش محصولات
  hideMainContent()
  showProductsContent(productsHTML)

  // راه‌اندازی مجدد event listeners برای دکمه‌های جدید
  initCart()

  showNotification(`نمایش محصولات ${categoryName}`, "info")
}

// مخفی کردن محتوای اصلی
function hideMainContent() {
  const mainSections = document.querySelectorAll(".hero-slider-compact, #categories, #featured-products, .cta-section")
  mainSections.forEach((section) => {
    section.style.display = "none"
  })
}

// نمایش محتوای محصولات
function showProductsContent(html) {
  let productsContainer = document.getElementById("products-container")
  if (!productsContainer) {
    productsContainer = document.createElement("div")
    productsContainer.id = "products-container"
    productsContainer.className = "py-5"
    document.querySelector("main")
      ? document.querySelector("main").appendChild(productsContainer)
      : document
          .querySelector(".hero-slider-compact")
          .parentNode.insertBefore(productsContainer, document.querySelector(".footer"))
  }
  productsContainer.innerHTML = html
  productsContainer.style.display = "block"
}

// بازگشت به صفحه اصلی
function showHomePage() {
  const mainSections = document.querySelectorAll(".hero-slider-compact, #categories, #featured-products, .cta-section")
  mainSections.forEach((section) => {
    section.style.display = "block"
  })

  const productsContainer = document.getElementById("products-container")
  if (productsContainer) {
    productsContainer.style.display = "none"
  }

  // اسکرول به بالا
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// عملکرد سبد خرید
function initCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart")

  addToCartButtons.forEach((button) => {
    // حذف event listener قبلی
    button.removeEventListener("click", handleAddToCart)
    // اضافه کردن event listener جدید
    button.addEventListener("click", handleAddToCart)
  })
}

function handleAddToCart(e) {
  e.preventDefault()

  const productId = Number.parseInt(this.dataset.productId)
  const productName = this.dataset.productName
  const productPrice = Number.parseInt(this.dataset.productPrice)

  addToCart(productId, productName, productPrice)

  // افکت بصری
  this.innerHTML = '<i class="fas fa-check"></i> اضافه شد!'
  this.classList.remove("btn-danger")
  this.classList.add("btn-success")

  setTimeout(() => {
    this.innerHTML = "افزودن به سبد خرید"
    this.classList.remove("btn-success")
    this.classList.add("btn-danger")
  }, 2000)
}

function addToCart(productId, productName, productPrice) {
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    const product = allProducts.find((p) => p.id === productId)
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
      image: product ? product.image : "/placeholder.svg?height=60&width=60",
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartUI()
  showNotification(`${productName} به سبد خرید اضافه شد!`, "success")
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartUI()
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = newQuantity
      localStorage.setItem("cart", JSON.stringify(cart))
      updateCartUI()
    }
  }
}

function updateCartUI() {
  const cartCount = document.querySelector(".cart-count")
  const cartItems = document.getElementById("cartItems")
  const cartSummary = document.getElementById("cartSummary")
  const cartTotal = document.getElementById("cartTotal")

  // بروزرسانی تعداد آیتم‌ها
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  if (cartCount) {
    cartCount.textContent = totalItems
  }

  if (!cartItems) return

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="text-center text-muted">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <p>سبد خرید شما خالی است</p>
            </div>
        `
    if (cartSummary) cartSummary.classList.add("d-none")
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-3">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <div class="cart-item-info">
                            <h6>${item.name}</h6>
                            <div class="cart-item-price">${item.price.toLocaleString("fa-IR")} تومان</div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    if (cartTotal) {
      cartTotal.textContent = `${total.toLocaleString("fa-IR")} تومان`
    }
    if (cartSummary) cartSummary.classList.remove("d-none")
  }
}

// عملکرد جستجو
function initSearch() {
  const searchForm = document.getElementById("searchForm")
  const searchInput = document.getElementById("searchInput")
  const searchResults = document.getElementById("searchResults")

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      performSearch()
    })

    searchInput.addEventListener("input", debounce(performSearch, 300))
  }
}

function performSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchResults = document.getElementById("searchResults")
  const query = searchInput.value.trim().toLowerCase()

  if (query.length < 2) {
    searchResults.innerHTML = ""
    return
  }

  const filteredProducts = allProducts.filter((product) => product.name.toLowerCase().includes(query))

  if (filteredProducts.length === 0) {
    searchResults.innerHTML = '<p class="text-muted">محصولی یافت نشد</p>'
    return
  }

  searchResults.innerHTML = `
        <h6>نتایج جستجو:</h6>
        ${filteredProducts
          .map(
            (product) => `
            <div class="search-result-item d-flex align-items-center mb-2 p-2 border rounded">
                <img src="${product.image}" alt="${product.name}" width="40" height="40" class="me-2">
                <div class="flex-grow-1">
                    <div class="fw-bold">${product.name}</div>
                    <div class="text-danger">${product.price.toLocaleString("fa-IR")} تومان</div>
                </div>
                <button class="btn btn-sm btn-danger" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    افزودن
                </button>
            </div>
        `,
          )
          .join("")}
    `
}

// تعاملات محصول
function initProductInteractions() {
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
  const animateElements = document.querySelectorAll(".category-card, .product-card")
  animateElements.forEach((element) => {
    observer.observe(element)
  })
}

// افکت‌های اسکرول
function initScrollEffects() {
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

// تنظیمات PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// تنظیمات موبایل
function initMobileOptimizations() {
  // تشخیص دستگاه موبایل
  const isMobile = window.innerWidth <= 768

  if (isMobile) {
    // بهینه‌سازی‌های مخصوص موبایل
    document.body.classList.add("mobile-device")

    // تنظیم ارتفاع viewport
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVH()
    window.addEventListener("resize", setVH)

    // بهبود تجربه لمسی
    document.addEventListener("touchstart", () => {}, { passive: true })
  }
}

// اجرای بهینه‌سازی‌های موبایل
initMobileOptimizations()

// تنظیمات اضافی برای وردپرس
window.autopartPro = {
  cart: cart,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  updateQuantity: updateQuantity,
  showNotification: showNotification,
  showCategoryProducts: showCategoryProducts,
  showHomePage: showHomePage,
}
