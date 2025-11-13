// Global Variables
const currentUser = null
let products = []
let cart = []
let wishlist = []
let orders = []
let currentTheme = "light"
let currentSlide = 0
let searchTimeout = null
let currentProductModal = null
let isAdmin = false
let sliderPaused = false
let sliderInterval = null
let currentPage = 1
const productsPerPage = 12
let filteredProducts = []

// Sample Products Data
const sampleProducts = [
  {
    id: 1,
    name: "Zamonaviy Ko'ylak",
    price: 250000,
    oldPrice: 300000,
    description:
      "Yumshoq va qulay materialdan tayyorlangan zamonaviy ko'ylak. Har qanday voqea uchun mos. Premium sifatli paxta materialidan tayyorlangan.",
    category: "kiyim",
    badge: "Yangi",
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    colors: ["#000000", "#ffffff", "#ff6b6b", "#4ecdc4"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    rating: 4.5,
    reviews: [
      { name: "Aziza", rating: 5, text: "Juda chiroyli va sifatli ko'ylak!" },
      {
        name: "Dilnoza",
        rating: 4,
        text: "Materialı yaxshi, lekin biroz katta keldi.",
      },
    ],
  },
  {
    id: 2,
    name: "Klassik Shim",
    price: 180000,
    description: "Ish va kundalik hayot uchun ideal klassik shim. Yuqori sifatli material va zamonaviy dizayn.",
    category: "kiyim",
    badge: "Mashhur",
    images: [
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    colors: ["#000000", "#8b4513", "#2f4f4f"],
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
    rating: 4.2,
    reviews: [{ name: "Bobur", rating: 4, text: "Yaxshi sifat, narxi ham mos." }],
  },
  {
    id: 3,
    name: "Elegant Sumka",
    price: 120000,
    oldPrice: 150000,
    description:
      "Zamonaviy dizayndagi elegant sumka. Har qanday kiyim bilan mos keladi. Sifatli teri materialidan tayyorlangan.",
    category: "aksessuarlar",
    badge: "Chegirma",
    images: [
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    colors: ["#8b4513", "#000000", "#ff6b6b"],
    sizes: ["Bir o'lcham"],
    inStock: true,
    rating: 4.8,
    reviews: [
      {
        name: "Malika",
        rating: 5,
        text: "Juda chiroyli sumka, hammaga tavsiya qilaman!",
      },
    ],
  },
  {
    id: 4,
    name: "Sport Krossovka",
    price: 320000,
    description: "Qulay va zamonaviy sport krossovka. Sport va kundalik hayot uchun ideal tanlov.",
    category: "yangi",
    badge: "Yangi",
    images: [
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    colors: ["#ffffff", "#000000", "#ff6b6b", "#4ecdc4"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    inStock: true,
    rating: 4.6,
    reviews: [],
  },
  {
    id: 5,
    name: "Yoz Libosi",
    price: 200000,
    description: "Yengil va salqin yoz libosi. Issiq kunlar uchun ideal tanlov. Nafas oladigan material.",
    category: "kiyim",
    badge: "Limited",
    images: [
      "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    colors: ["#87ceeb", "#ffd700", "#ff69b4"],
    sizes: ["XS", "S", "M", "L"],
    inStock: false,
    rating: 4.3,
    reviews: [{ name: "Nigora", rating: 4, text: "Chiroyli libos, lekin tez tugaydi." }],
  },
  {
    id: 6,
    name: "Zamonaviy Soat",
    price: 450000,
    description: "Zamonaviy va elegant soat. Har qanday kiyim bilan mos keladi. Suv o'tkazmaydigan va bardoshli.",
    category: "aksessuarlar",
    badge: "Premium",
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    colors: ["#c0c0c0", "#ffd700", "#000000"],
    sizes: ["Bir o'lcham"],
    inStock: true,
    rating: 4.9,
    reviews: [
      { name: "Jasur", rating: 5, text: "Ajoyib soat, sifati zo'r!" },
      { name: "Sardor", rating: 5, text: "Juda yoqdi, tavsiya qilaman." },
    ],
  },
]

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Show loading screen
  setTimeout(() => {
    hideLoadingScreen()
    setupEventListeners()
    loadProducts()
    loadFromStorage()
    setupSlider()
    setupScrollEffects()
    checkAdminAccess()
    loadSettings()
  }, 1500)
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  loadingScreen.style.opacity = "0"
  setTimeout(() => {
    loadingScreen.style.display = "none"
  }, 500)
}

function setupEventListeners() {
  // Navigation
  setupNavigation()

  // Search
  setupSearch()

  // Filters
  setupFilters()

  // Forms
  setupForms()

  // Keyboard shortcuts
  setupKeyboardShortcuts()

  // Mobile menu
  setupMobileMenu()

  // Rating input
  setupRatingInput()
}

function setupNavigation() {
  const navbar = document.getElementById("navbar")
  const backToTop = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    if (window.scrollY > 500) {
      backToTop.classList.add("visible")
    } else {
      backToTop.classList.remove("visible")
    }
  })

  // Smooth scroll for navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Close mobile menu if open
        const navMenu = document.getElementById("navMenu")
        const hamburger = document.getElementById("hamburger")
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })
}

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput")

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim()

    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      if (query.length > 0) {
        performSearch(query)
      } else {
        showSearchSuggestions()
      }
    }, 300)
  })

  // Show suggestions by default
  showSearchSuggestions()
}

function performSearch(query) {
  const results = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query),
  )

  const searchResults = document.getElementById("searchResults")

  if (results.length > 0) {
    searchResults.innerHTML = `
            <div class="search-results-list">
                <h4>Qidiruv natijalari (${results.length})</h4>
                ${results
                  .map(
                    (product) => `
                    <div class="search-result-item" onclick="openProductModal(${product.id}); toggleSearch();">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <div class="result-info">
                            <h5>${product.name}</h5>
                            <p>${formatPrice(product.price)}</p>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `
  } else {
    searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h4>Natija topilmadi</h4>
                <p>"${query}" uchun hech narsa topilmadi</p>
                <button class="cta-btn secondary" onclick="showSearchSuggestions()">
                    Mashhur qidiruvlarni ko'rish
                </button>
            </div>
        `
  }
}

function showSearchSuggestions() {
  const searchResults = document.getElementById("searchResults")
  searchResults.innerHTML = `
        <div class="search-suggestions">
            <h4>Mashhur qidiruvlar</h4>
            <div class="suggestion-tags">
                <span class="tag" onclick="searchFor('ko\'ylak')">Ko'ylak</span>
                <span class="tag" onclick="searchFor('shim')">Shim</span>
                <span class="tag" onclick="searchFor('aksessuarlar')">Aksessuarlar</span>
                <span class="tag" onclick="searchFor('yangi')">Yangi</span>
                <span class="tag" onclick="searchFor('sport')">Sport</span>
                <span class="tag" onclick="searchFor('soat')">Soat</span>
                <span class="tag" onclick="searchFor('sumka')">Sumka</span>
            </div>
        </div>
    `
}

function searchFor(term) {
  document.getElementById("searchInput").value = term
  performSearch(term)
}

function setupFilters() {
  // Category filters
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")
      filterProducts(filter)
    })
  })

  // Price range filters
  const minPrice = document.getElementById("minPrice")
  const maxPrice = document.getElementById("maxPrice")
  const minPriceDisplay = document.getElementById("minPriceDisplay")
  const maxPriceDisplay = document.getElementById("maxPriceDisplay")

  if (minPrice && maxPrice) {
    minPrice.addEventListener("input", () => {
      minPriceDisplay.textContent = minPrice.value
      filterByPrice()
    })

    maxPrice.addEventListener("input", () => {
      maxPriceDisplay.textContent = maxPrice.value
      filterByPrice()
    })
  }

  // Color filters
  document.querySelectorAll(".color-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".color-option").forEach((o) => o.classList.remove("active"))
      option.classList.add("active")

      const color = option.getAttribute("data-color")
      filterByColor(color)
    })
  })
}

function filterProducts(category) {
  filteredProducts = category === "all" ? [...products] : products.filter((p) => p.category === category)
  currentPage = 1
  displayProducts()
  updateProductsCount()
}

function filterByPrice() {
  const minPrice = document.getElementById("minPrice")
  const maxPrice = document.getElementById("maxPrice")

  if (!minPrice || !maxPrice) return

  const min = Number.parseInt(minPrice.value) * 1000
  const max = Number.parseInt(maxPrice.value) * 1000

  filteredProducts = products.filter((product) => product.price >= min && product.price <= max)

  currentPage = 1
  displayProducts()
  updateProductsCount()
}

function filterByColor(color) {
  if (color === "all") {
    filteredProducts = [...products]
  } else {
    filteredProducts = products.filter((product) => product.colors.some((c) => c.toLowerCase().includes(color)))
  }

  currentPage = 1
  displayProducts()
  updateProductsCount()
}

function clearFilters() {
  // Reset filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"))
  document.querySelector(".filter-btn[data-filter='all']").classList.add("active")

  // Reset color filters
  document.querySelectorAll(".color-option").forEach((option) => option.classList.remove("active"))
  document.querySelector(".color-option[data-color='all']").classList.add("active")

  // Reset price range
  const minPrice = document.getElementById("minPrice")
  const maxPrice = document.getElementById("maxPrice")
  if (minPrice && maxPrice) {
    minPrice.value = 0
    maxPrice.value = 1000
    document.getElementById("minPriceDisplay").textContent = "0"
    document.getElementById("maxPriceDisplay").textContent = "1000"
  }

  // Reset products
  filteredProducts = [...products]
  currentPage = 1
  displayProducts()
  updateProductsCount()

  showNotification("Filtrlar tozalandi", "info")
}

function updateProductsCount() {
  const count = filteredProducts.length
  document.getElementById("productsCount").textContent = count
}

function setupForms() {
  // Contact form
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showNotification("Xabaringiz yuborildi! Tez orada javob beramiz.", "success")
      contactForm.reset()
    })
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = e.target.querySelector("input[type='email']").value
      if (validateEmail(email)) {
        showNotification("Obunaga muvaffaqiyatli qo'shildingiz!", "success")
        newsletterForm.reset()
      } else {
        showNotification("Iltimos, to'g'ri email manzilini kiriting", "error")
      }
    })
  }

  // Add product form
  const addProductForm = document.getElementById("addProductForm")
  if (addProductForm) {
    addProductForm.addEventListener("submit", handleAddProduct)
  }

  // Settings form
  const settingsForm = document.getElementById("settingsForm")
  if (settingsForm) {
    settingsForm.addEventListener("submit", handleSaveSettings)
  }

  // Order form
  const orderForm = document.getElementById("orderForm")
  if (orderForm) {
    orderForm.addEventListener("submit", handleOrderSubmit)
  }

  // Review form
  const reviewForm = document.getElementById("reviewForm")
  if (reviewForm) {
    reviewForm.addEventListener("submit", handleReviewSubmit)
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // ESC to close modals
    if (e.key === "Escape") {
      closeProductModal()
      closeOrderModal()
      toggleSearch(false)
      toggleCart(false)
      toggleWishlist(false)
      closeAR()
      closeAdmin()
      closeAddProductForm()
      closeEditOrderModal()
    }

    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      toggleSearch(true)
    }

    // Ctrl/Cmd + Shift + A for admin (if logged in)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "A") {
      e.preventDefault()
      if (isAdmin) {
        openAdmin()
      } else {
        promptAdminLogin()
      }
    }
  })
}

function setupRatingInput() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".rating-input .stars i")) {
      const rating = Number.parseInt(e.target.getAttribute("data-rating"))
      const stars = e.target.parentElement.querySelectorAll("i")

      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.remove("far")
          star.classList.add("fas", "active")
        } else {
          star.classList.remove("fas", "active")
          star.classList.add("far")
        }
      })
    }
  })
}

function setupSlider() {
  const slides = document.querySelectorAll(".news-slide")

  if (slides.length === 0) return

  startSlider()
}

function startSlider() {
  if (sliderInterval) clearInterval(sliderInterval)

  sliderInterval = setInterval(() => {
    if (!sliderPaused) {
      changeSlide(1)
    }
  }, 5000)
}

function pauseSlider() {
  sliderPaused = !sliderPaused
  const pauseBtn = document.querySelector(".slider-btn.pause i")

  if (sliderPaused) {
    pauseBtn.className = "fas fa-play"
  } else {
    pauseBtn.className = "fas fa-pause"
  }
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".news-slide")

  if (slides.length === 0) return

  slides[currentSlide].classList.remove("active")

  currentSlide += direction

  if (currentSlide >= slides.length) {
    currentSlide = 0
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1
  }

  slides[currentSlide].classList.add("active")
}

function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".product-card, .trend-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

function loadProducts() {
  products = [...sampleProducts]
  filteredProducts = [...products]
  displayProducts()
  displayTrends(products.slice(0, 6))
  updateProductsCount()
}

function displayProducts() {
  const grid = document.getElementById("productsGrid")
  if (!grid) return

  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const productsToShow = filteredProducts.slice(startIndex, endIndex)

  grid.innerHTML = ""

  if (productsToShow.length === 0) {
    grid.innerHTML = `
      <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
        <i class="fas fa-box-open" style="font-size: 4rem; color: var(--text-light); margin-bottom: 1rem;"></i>
        <h3>Mahsulotlar topilmadi</h3>
        <p>Filtrlarni o'zgartirib ko'ring yoki boshqa kategoriyani tanlang</p>
        <button class="cta-btn secondary" onclick="clearFilters()" style="margin-top: 1rem;">
          Filtrlarni tozalash
        </button>
      </div>
    `
    return
  }

  productsToShow.forEach((product) => {
    const productCard = createProductCard(product)
    grid.appendChild(productCard)
  })

  // Update pagination
  updatePagination()
}

function updatePagination() {
  const pagination = document.getElementById("pagination")
  if (!pagination) return

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  if (totalPages <= 1) {
    pagination.innerHTML = ""
    return
  }

  let paginationHTML = ""

  // Previous button
  paginationHTML += `
    <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>
      <i class="fas fa-chevron-left"></i>
    </button>
  `

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      paginationHTML += `
        <button onclick="changePage(${i})" ${i === currentPage ? "class='active'" : ""}>
          ${i}
        </button>
      `
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      paginationHTML += `<span>...</span>`
    }
  }

  // Next button
  paginationHTML += `
    <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>
      <i class="fas fa-chevron-right"></i>
    </button>
  `

  pagination.innerHTML = paginationHTML
}

function changePage(page) {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  if (page < 1 || page > totalPages) return

  currentPage = page
  displayProducts()

  // Scroll to products section
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

function displayTrends(trendsToShow) {
  const grid = document.getElementById("trendsGrid")
  if (!grid) return

  grid.innerHTML = ""

  trendsToShow.forEach((product) => {
    const trendCard = createTrendCard(product)
    grid.appendChild(trendCard)
  })
}

function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.setAttribute("data-id", product.id)
  card.setAttribute("data-category", product.category)
  card.setAttribute("data-price", product.price)

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ""}
            ${!product.inStock ? '<div class="product-badge out-of-stock">Tugagan</div>' : ""}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                ${formatPrice(product.price)}
                ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span>(${product.reviews.length})</span>
            </div>
            <div class="product-actions">
                <button class="quick-view-btn" onclick="openProductModal(${
                  product.id
                })" ${!product.inStock ? "disabled" : ""}>
                    <i class="fas fa-eye"></i>
                    Tez ko'rish
                </button>
                <button class="add-to-wishlist-btn ${
                  isInWishlist(product.id) ? "active" : ""
                }" onclick="toggleWishlistItem(${product.id})" title="${
                  isInWishlist(product.id) ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"
                }">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `

  return card
}

function createTrendCard(product) {
  const card = document.createElement("div")
  card.className = "trend-card"
  card.onclick = () => openProductModal(product.id)

  card.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div class="trend-card-content">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
        </div>
    `

  return card
}

function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = ""

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>'
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>'
  }

  return stars
}

function formatPrice(price) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
}

// Product Modal Functions
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  currentProductModal = product
  const modal = document.getElementById("productModal")

  // Update modal content
  document.getElementById("modalMainImage").src = product.images[0]
  document.getElementById("modalMainImage").alt = product.name
  document.getElementById("modalProductTitle").textContent = product.name
  document.getElementById("modalProductPrice").textContent = formatPrice(product.price)

  if (product.oldPrice) {
    document.getElementById("modalProductOldPrice").textContent = formatPrice(product.oldPrice)
    document.getElementById("modalProductOldPrice").style.display = "inline"
  } else {
    document.getElementById("modalProductOldPrice").style.display = "none"
  }

  document.getElementById("modalProductDescription").textContent = product.description

  // Update badges
  const badgesContainer = document.getElementById("modalProductBadges")
  badgesContainer.innerHTML = ""
  if (product.badge) {
    const badge = document.createElement("span")
    badge.className = `badge ${product.badge.toLowerCase()}`
    badge.textContent = product.badge
    badgesContainer.appendChild(badge)
  }

  // Update thumbnails
  const thumbnailGallery = document.getElementById("thumbnailGallery")
  thumbnailGallery.innerHTML = ""
  product.images.forEach((image, index) => {
    const thumbnail = document.createElement("div")
    thumbnail.className = `thumbnail ${index === 0 ? "active" : ""}`
    thumbnail.innerHTML = `<img src="${image}" alt="${product.name}">`
    thumbnail.onclick = () => {
      document.getElementById("modalMainImage").src = image
      document.querySelectorAll(".thumbnail").forEach((t) => t.classList.remove("active"))
      thumbnail.classList.add("active")
    }
    thumbnailGallery.appendChild(thumbnail)
  })

  // Update color options
  const colorOptions = document.getElementById("modalColorOptions")
  colorOptions.innerHTML = ""
  product.colors.forEach((color, index) => {
    const colorBtn = document.createElement("button")
    colorBtn.className = `color-option ${index === 0 ? "active" : ""}`
    colorBtn.style.background = color
    colorBtn.title = getColorName(color)
    colorBtn.onclick = () => selectColor(colorBtn)
    colorOptions.appendChild(colorBtn)
  })

  // Update size options
  const sizeOptions = document.getElementById("modalSizeOptions")
  sizeOptions.innerHTML = ""
  product.sizes.forEach((size, index) => {
    const sizeBtn = document.createElement("button")
    sizeBtn.className = `size-option ${index === 1 ? "active" : ""}`
    sizeBtn.textContent = size
    sizeBtn.onclick = () => selectSize(sizeBtn)
    sizeOptions.appendChild(sizeBtn)
  })

  // Update reviews
  updateReviews(product.reviews)

  // Update similar products
  updateSimilarProducts(product)

  // Update wishlist button state
  const wishlistBtn = modal.querySelector(".wishlist-btn")
  if (isInWishlist(product.id)) {
    wishlistBtn.classList.add("active")
  } else {
    wishlistBtn.classList.remove("active")
  }

  modal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Setup tabs
  setupProductTabs()
}

function getColorName(color) {
  const colorNames = {
    "#000000": "Qora",
    "#ffffff": "Oq",
    "#ff6b6b": "Qizil",
    "#4ecdc4": "Ko'k",
    "#10b981": "Yashil",
    "#f59e0b": "Sariq",
    "#8b5cf6": "Binafsha",
    "#8b4513": "Jigarrang",
    "#2f4f4f": "To'q kulrang",
    "#87ceeb": "Och ko'k",
    "#ffd700": "Oltin",
    "#ff69b4": "Pushti",
    "#c0c0c0": "Kumush",
  }
  return colorNames[color] || "Rang"
}

function closeProductModal() {
  const modal = document.getElementById("productModal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
  currentProductModal = null

  // Reset zoom
  const mainImage = document.getElementById("modalMainImage")
  mainImage.style.transform = "scale(1)"
  mainImage.style.cursor = "zoom-in"
}

function toggleDescription() {
  const header = document.querySelector(".product-description-header")
  const content = document.querySelector(".product-description-content")
  const icon = header.querySelector("i")

  header.classList.toggle("active")
  content.classList.toggle("active")

  if (content.classList.contains("active")) {
    icon.style.transform = "rotate(180deg)"
  } else {
    icon.style.transform = "rotate(0deg)"
  }
}

function selectColor(button) {
  document.querySelectorAll(".color-option").forEach((btn) => btn.classList.remove("active"))
  button.classList.add("active")
}

function selectSize(button) {
  document.querySelectorAll(".size-option").forEach((btn) => btn.classList.remove("active"))
  button.classList.add("active")
}

function setupProductTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Update active button
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Update active panel
      tabPanels.forEach((panel) => panel.classList.remove("active"))
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

function updateReviews(reviews) {
  const reviewsList = document.getElementById("reviewsList")

  if (reviews.length === 0) {
    reviewsList.innerHTML = "<p>Hozircha sharhlar yo'q. Birinchi bo'lib sharh qoldiring!</p>"
    return
  }

  reviewsList.innerHTML = reviews
    .map(
      (review) => `
        <div class="review-item">
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <div class="rating">${generateStars(review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `,
    )
    .join("")
}

function updateSimilarProducts(currentProduct) {
  const similarProducts = products
    .filter((p) => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, 6)

  const similarContainer = document.getElementById("similarProducts")

  if (similarProducts.length === 0) {
    similarContainer.innerHTML = "<p>O'xshash mahsulotlar topilmadi.</p>"
    return
  }

  similarContainer.innerHTML = similarProducts
    .map(
      (product) => `
        <div class="similar-product" onclick="openProductModal(${product.id})">
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="similar-product-info">
                <h5>${product.name}</h5>
                <p>${formatPrice(product.price)}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

function handleReviewSubmit(e) {
  e.preventDefault()

  if (!currentProductModal) return

  const formData = new FormData(e.target)
  const name = formData.get("name") || e.target.querySelector("input[type='text']").value
  const text = formData.get("review") || e.target.querySelector("textarea").value
  const ratingStars = e.target.querySelectorAll(".rating-input .stars i.active")
  const rating = ratingStars.length

  if (!name || !text || rating === 0) {
    showNotification("Iltimos, barcha maydonlarni to'ldiring", "warning")
    return
  }

  const newReview = { name, rating, text }

  // Add review to current product
  const productIndex = products.findIndex((p) => p.id === currentProductModal.id)
  if (productIndex !== -1) {
    products[productIndex].reviews.push(newReview)

    // Update average rating
    const totalRating = products[productIndex].reviews.reduce((sum, r) => sum + r.rating, 0)
    products[productIndex].rating = totalRating / products[productIndex].reviews.length

    // Update reviews display
    updateReviews(products[productIndex].reviews)

    // Reset form
    e.target.reset()
    e.target.querySelectorAll(".rating-input .stars i").forEach((star) => {
      star.classList.remove("fas", "active")
      star.classList.add("far")
    })

    saveToStorage()
    showNotification("Sharhingiz qo'shildi! Rahmat!", "success")
  }
}

// Cart Functions
function toggleCart(force = null) {
  const overlay = document.getElementById("cartOverlay")
  const sidebar = document.getElementById("cartSidebar")

  if (force === true || (!sidebar.classList.contains("active") && force !== false)) {
    overlay.classList.add("active")
    sidebar.classList.add("active")
    updateCartDisplay()
    document.body.style.overflow = "hidden"
  } else {
    overlay.classList.remove("active")
    sidebar.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

function addToCart() {
  if (!currentProductModal) return

  const selectedColor = document.querySelector(".color-option.active")?.style.background || "#000000"
  const selectedSize = document.querySelector(".size-option.active")?.textContent || "M"

  // Check if item already exists in cart
  const existingItem = cart.find(
    (item) => item.productId === currentProductModal.id && item.color === selectedColor && item.size === selectedSize,
  )

  if (existingItem) {
    existingItem.quantity += 1
    showNotification("Mahsulot miqdori oshirildi!", "success")
  } else {
    const cartItem = {
      id: Date.now(),
      productId: currentProductModal.id,
      name: currentProductModal.name,
      price: currentProductModal.price,
      image: currentProductModal.images[0],
      color: selectedColor,
      colorName: getColorName(selectedColor),
      size: selectedSize,
      quantity: 1,
    }

    cart.push(cartItem)
    showNotification("Mahsulot savatchaga qo'shildi!", "success")
  }

  updateCartCount()
  saveToStorage()

  // Add animation effect
  animateAddToCart()
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Savatchangiz bo'sh</p>
                <button class="cta-btn secondary" onclick="scrollToProducts(); toggleCart(false);">
                    Mahsulotlar bo'limiga o'ting
                </button>
            </div>
        `
    cartTotal.textContent = "0 so'm"
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>O'lcham: ${item.size} | Rang: ${item.colorName}</p>
                <div class="item-price">${formatPrice(item.price)}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)" title="Kamaytirish">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" title="Ko'paytirish">+</button>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn" title="O'chirish">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = formatPrice(total)
}

function updateQuantity(itemId, change) {
  const item = cart.find((item) => item.id === itemId)
  if (!item) return

  const newQuantity = item.quantity + change

  if (newQuantity <= 0) {
    removeFromCart(itemId)
  } else if (newQuantity <= 10) {
    // Limit quantity to 10
    item.quantity = newQuantity
    updateCartDisplay()
    updateCartCount()
    saveToStorage()
  } else {
    showNotification("Maksimal miqdor 10 ta", "warning")
  }
}

function removeFromCart(itemId) {
  if (confirm("Mahsulotni savatchadan olib tashlashni xohlaysizmi?")) {
    cart = cart.filter((item) => item.id !== itemId)
    updateCartDisplay()
    updateCartCount()
    saveToStorage()
    showNotification("Mahsulot savatchadan olib tashlandi", "info")
  }
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.querySelector(".cart-count").textContent = count
}

function animateAddToCart() {
  const cartBtn = document.querySelector(".cart-btn")
  cartBtn.style.transform = "scale(1.2)"
  cartBtn.style.background = "var(--success-color)"

  setTimeout(() => {
    cartBtn.style.transform = "scale(1)"
    cartBtn.style.background = ""
  }, 300)
}

function quickBuy() {
  addToCart()
  setTimeout(() => {
    closeProductModal()
    checkout()
  }, 500)
}

function checkout() {
  if (cart.length === 0) {
    showNotification("Savatchangiz bo'sh!", "warning")
    return
  }

  // Show order modal
  showOrderModal()
}

function showOrderModal() {
  const modal = document.getElementById("orderModal")
  const orderItems = document.getElementById("orderItems")
  const orderTotal = document.getElementById("orderTotal")

  // Update order items
  orderItems.innerHTML = cart
    .map(
      (item) => `
    <div class="order-item">
      <span>${item.name} (${item.size}, ${item.colorName}) x${item.quantity}</span>
      <span>${formatPrice(item.price * item.quantity)}</span>
    </div>
  `,
    )
    .join("")

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  orderTotal.textContent = formatPrice(total)

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeOrderModal() {
  const modal = document.getElementById("orderModal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

function handleOrderSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const orderData = {
    id: Date.now(),
    customerName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    comment: formData.get("comment"),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: "Yangi",
    date: new Date().toLocaleDateString("uz-UZ"),
  }

  // Add to orders
  orders.push(orderData)

  // Clear cart
  cart = []
  updateCartDisplay()
  updateCartCount()

  // Close modals
  closeOrderModal()
  toggleCart(false)

  // Save to storage
  saveToStorage()

  showNotification("Buyurtma muvaffaqiyatli berildi! Tez orada aloqaga chiqamiz.", "success")

  // Reset form
  e.target.reset()
}

// Wishlist Functions
function toggleWishlist(force = null) {
  const overlay = document.getElementById("wishlistOverlay")
  const sidebar = document.getElementById("wishlistSidebar")

  if (force === true || (!sidebar.classList.contains("active") && force !== false)) {
    overlay.classList.add("active")
    sidebar.classList.add("active")
    updateWishlistDisplay()
    document.body.style.overflow = "hidden"
  } else {
    overlay.classList.remove("active")
    sidebar.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

function toggleWishlistItem(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingIndex = wishlist.findIndex((item) => item.id === productId)

  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1)
    showNotification("Sevimlilardan olib tashlandi", "info")
  } else {
    wishlist.push(product)
    showNotification("Sevimlilarga qo'shildi!", "success")
  }

  updateWishlistUI()
  updateWishlistCount()
  saveToStorage()
}

function addToWishlist() {
  if (!currentProductModal) return
  toggleWishlistItem(currentProductModal.id)

  // Update modal wishlist button
  const wishlistBtn = document.querySelector(".product-modal .wishlist-btn")
  if (isInWishlist(currentProductModal.id)) {
    wishlistBtn.classList.add("active")
  } else {
    wishlistBtn.classList.remove("active")
  }
}

function updateWishlistDisplay() {
  const wishlistItems = document.getElementById("wishlistItems")

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <p>Sevimlilar ro'yxati bo'sh</p>
                <button class="cta-btn secondary" onclick="scrollToProducts(); toggleWishlist(false);">
                    Mahsulotlar bo'limiga o'ting
                </button>
            </div>
        `
    return
  }

  wishlistItems.innerHTML = wishlist
    .map(
      (item) => `
        <div class="wishlist-item">
            <img src="${item.images[0]}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <div class="item-price">${formatPrice(item.price)}</div>
                <div class="item-actions">
                    <button onclick="openProductModal(${
                      item.id
                    }); toggleWishlist(false);" class="view-btn" title="Ko'rish">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="toggleWishlistItem(${item.id})" class="remove-btn" title="O'chirish">
                        <i class="fas fa-trash"></i>
                        O'chirish
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function updateWishlistUI() {
  // Update wishlist button states in product cards
  document.querySelectorAll(".add-to-wishlist-btn").forEach((btn) => {
    const productCard = btn.closest(".product-card")
    if (productCard) {
      const productId = Number.parseInt(productCard.getAttribute("data-id"))

      if (isInWishlist(productId)) {
        btn.classList.add("active")
        btn.title = "Sevimlilardan olib tashlash"
      } else {
        btn.classList.remove("active")
        btn.title = "Sevimlilarga qo'shish"
      }
    }
  })
}

function updateWishlistCount() {
  document.querySelector(".wishlist-count").textContent = wishlist.length
}

function isInWishlist(productId) {
  return wishlist.some((item) => item.id === productId)
}

// Search Functions
function toggleSearch(force = null) {
  const searchOverlay = document.getElementById("searchOverlay")

  if (force === true || (!searchOverlay.classList.contains("active") && force !== false)) {
    searchOverlay.classList.add("active")
    document.getElementById("searchInput").focus()
    document.body.style.overflow = "hidden"
  } else {
    searchOverlay.classList.remove("active")
    document.body.style.overflow = "auto"
    document.getElementById("searchInput").value = ""
    showSearchSuggestions()
  }
}

// Theme Functions
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  document.body.classList.toggle("dark-mode")

  const themeIcon = document.querySelector(".theme-toggle i")
  themeIcon.className = currentTheme === "dark" ? "fas fa-sun" : "fas fa-moon"

  localStorage.setItem("theme", currentTheme)
}

// AR Functions
function openAR() {
  const arModal = document.getElementById("arModal")
  arModal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Request camera access
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        const video = document.getElementById("arVideo")
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.error("Camera access denied:", err)
        showNotification("Kamera ruxsati berilmadi", "error")
        closeAR()
      })
  } else {
    showNotification("AR funksiyasi tez orada!", "info")
    closeAR()
  }
}

function closeAR() {
  const arModal = document.getElementById("arModal")
  arModal.classList.remove("active")
  document.body.style.overflow = "auto"

  // Stop camera stream
  const video = document.getElementById("arVideo")
  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop())
    video.srcObject = null
  }
}

function tryAR() {
  if (!currentProductModal) return
  closeProductModal()
  openAR()
}

function captureAR() {
  const video = document.getElementById("arVideo")
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  ctx.drawImage(video, 0, 0)

  // Convert to blob and create download link
  canvas.toBlob(
    (blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ar-photo-${Date.now()}.jpg`
      a.click()
      URL.revokeObjectURL(url)

      showNotification("Surat saqlandi!", "success")
    },
    "image/jpeg",
    0.9,
  )
}

function switchCamera() {
  const video = document.getElementById("arVideo")

  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop())
  }

  // Try to switch between front and back camera
  const currentFacingMode = video.srcObject?.getVideoTracks()[0]?.getSettings()?.facingMode
  const newFacingMode = currentFacingMode === "user" ? "environment" : "user"

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: newFacingMode } })
    .then((stream) => {
      video.srcObject = stream
      video.play()
      showNotification("Kamera almashtirildi", "info")
    })
    .catch((err) => {
      console.error("Camera switch failed:", err)
      showNotification("Kamerani almashtirish imkoni yo'q", "warning")
    })
}

function zoomImage() {
  const mainImage = document.getElementById("modalMainImage")
  if (mainImage.style.transform === "scale(2)") {
    mainImage.style.transform = "scale(1)"
    mainImage.style.cursor = "zoom-in"
  } else {
    mainImage.style.transform = "scale(2)"
    mainImage.style.cursor = "zoom-out"
  }
}

// Utility Functions
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification")
  const icon = notification.querySelector(".notification-icon")
  const messageEl = notification.querySelector(".notification-message")

  // Set icon based on type
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-times-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  icon.className = `notification-icon ${icons[type]}`
  messageEl.textContent = message
  notification.className = `notification ${type}`

  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 5000)
}

// Storage Functions
function saveToStorage() {
  localStorage.setItem("bekstyle_cart", JSON.stringify(cart))
  localStorage.setItem("bekstyle_wishlist", JSON.stringify(wishlist))
  localStorage.setItem("bekstyle_products", JSON.stringify(products))
  localStorage.setItem("bekstyle_orders", JSON.stringify(orders))
}

function loadFromStorage() {
  // Load theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme && savedTheme === "dark") {
    toggleTheme()
  }

  // Load cart
  const savedCart = localStorage.getItem("bekstyle_cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCartCount()
  }

  // Load wishlist
  const savedWishlist = localStorage.getItem("bekstyle_wishlist")
  if (savedWishlist) {
    wishlist = JSON.parse(savedWishlist)
    updateWishlistCount()
    updateWishlistUI()
  }

  // Load orders
  const savedOrders = localStorage.getItem("bekstyle_orders")
  if (savedOrders) {
    orders = JSON.parse(savedOrders)
  }

  // Load custom products
  const savedProducts = localStorage.getItem("bekstyle_products")
  if (savedProducts) {
    const customProducts = JSON.parse(savedProducts)
    // Merge with sample products, avoiding duplicates
    const existingIds = sampleProducts.map((p) => p.id)
    const newProducts = customProducts.filter((p) => !existingIds.includes(p.id))
    products = [...sampleProducts, ...newProducts]
    filteredProducts = [...products]
    displayProducts()
    updateProductsCount()
  }
}

// Admin Functions
function checkAdminAccess() {
  // Check if admin is logged in
  const adminSession = localStorage.getItem("bekstyle_admin")
  if (adminSession) {
    const session = JSON.parse(adminSession)
    if (session.login === "bekstyle" && session.timestamp > Date.now() - 24 * 60 * 60 * 1000) {
      isAdmin = true
      document.querySelector(".admin-btn").style.display = "flex"
    }
  }
}

function promptAdminLogin() {
  const login = prompt("Admin login:")
  const password = prompt("Parol:")

  if (login === "bekstyle" && password === "admin123") {
    isAdmin = true
    localStorage.setItem(
      "bekstyle_admin",
      JSON.stringify({
        login: "bekstyle",
        timestamp: Date.now(),
      }),
    )
    document.querySelector(".admin-btn").style.display = "flex"
    showNotification("Admin panelga xush kelibsiz!", "success")
    openAdmin()
  } else {
    showNotification("Noto'g'ri login yoki parol!", "error")
  }
}

function openAdmin() {
  if (!isAdmin) {
    promptAdminLogin()
    return
  }

  const adminPanel = document.getElementById("adminPanel")
  adminPanel.style.display = "flex"
  document.body.style.overflow = "hidden"

  loadAdminData()
}

function closeAdmin() {
  const adminPanel = document.getElementById("adminPanel")
  adminPanel.style.display = "none"
  document.body.style.overflow = "auto"
}

function loadAdminData() {
  loadAdminProducts()
  loadAdminOrders() // This function is updated below
  loadAdminUsers()

  // Setup admin tabs
  document.querySelectorAll(".admin-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab")

      // Update active button
      document.querySelectorAll(".admin-tab-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Update active panel
      document.querySelectorAll(".admin-tab-panel").forEach((panel) => panel.classList.remove("active"))
      document.getElementById(`admin-${targetTab}`).classList.add("active")
    })
  })
}

function loadAdminProducts() {
  const table = document.getElementById("adminProductsTable")

  table.innerHTML = `
        <div class="table-header">
            <div>Nomi</div>
            <div>Narxi</div>
            <div>Kategoriya</div>
            <div>Holati</div>
            <div>Amallar</div>
        </div>
        ${products
          .map(
            (product) => `
            <div class="table-row">
                <div>${product.name}</div>
                <div>${formatPrice(product.price)}</div>
                <div>${product.category}</div>
                <div>${product.inStock ? "Mavjud" : "Tugagan"}</div>
                <div class="table-actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})" title="Tahrirlash">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})" title="O'chirish">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `,
          )
          .join("")}
    `
}

function loadAdminOrders() {
  const table = document.getElementById("adminOrdersTable")

  table.innerHTML = `
        <div class="table-header">
            <div>ID</div>
            <div>Mijoz</div>
            <div>Telefon</div>
            <div>Manzil</div>
            <div>Mahsulotlar</div>
            <div>Summa</div>
            <div>Holati</div>
            <div>Amallar</div>
        </div>
        ${orders
          .map((order) => {
            // Get product names from cart items
            const productNames = order.items.map((item) => `${item.name} (${item.quantity}x)`).join(", ")

            return `
            <div class="table-row">
                <div>#${order.id}</div>
                <div>${order.customerName}</div>
                <div>${order.phone || "-"}</div>
                <div>${order.address || "-"}</div>
                <div class="products-cell">${productNames || "-"}</div>
                <div>${formatPrice(order.total)}</div>
                <div><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></div>
                <div class="table-actions">
                    <button class="edit-btn" onclick="editOrder(${order.id})" title="Tahrirlash">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteOrder(${order.id})" title="O'chirish">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `
          })
          .join("")}
    `
}

function loadAdminUsers() {
  const table = document.getElementById("adminUsersTable")

  // Sample users data
  const users = [
    {
      id: 1,
      name: "Aziza Karimova",
      email: "aziza@example.com",
      orders: 5,
      joined: "2023-12-01",
    },
    {
      id: 2,
      name: "Bobur Aliyev",
      email: "bobur@example.com",
      orders: 3,
      joined: "2023-11-15",
    },
    {
      id: 3,
      name: "Dilnoza Rahimova",
      email: "dilnoza@example.com",
      orders: 8,
      joined: "2023-10-20",
    },
  ]

  table.innerHTML = `
        <div class="table-header">
            <div>Ism</div>
            <div>Email</div>
            <div>Buyurtmalar</div>
            <div>Qo'shilgan</div>
            <div>Amallar</div>
        </div>
        ${users
          .map(
            (user) => `
            <div class="table-row">
                <div>${user.name}</div>
                <div>${user.email}</div>
                <div>${user.orders}</div>
                <div>${user.joined}</div>
                <div class="table-actions">
                    <button class="edit-btn" onclick="editUser(${user.id})" title="Tahrirlash">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `,
          )
          .join("")}
    `
}

function showAddProductForm() {
  const modal = document.getElementById("addProductModal")
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeAddProductForm() {
  const modal = document.getElementById("addProductModal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
  document.getElementById("addProductForm").reset()
  document.getElementById("imagePreview").innerHTML = ""
}

function handleAddProduct(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const colors = Array.from(document.querySelectorAll('input[name="colors"]')).map((input) => input.value)
  const sizes = Array.from(document.querySelectorAll('input[name="sizes"]:checked')).map((input) => input.value)
  const images = Array.from(document.querySelectorAll(".preview-image")).map((img) => img.src)

  // Validation
  if (!formData.get("name") || !formData.get("price") || !formData.get("description") || !formData.get("category")) {
    showNotification("Iltimos, barcha majburiy maydonlarni to'ldiring", "warning")
    return
  }

  if (sizes.length === 0) {
    showNotification("Kamida bitta o'lcham tanlang", "warning")
    return
  }

  const newProduct = {
    id: Date.now(),
    name: formData.get("name"),
    price: Number.parseInt(formData.get("price")),
    description: formData.get("description"),
    category: formData.get("category"),
    badge: formData.get("badge") || null,
    images:
      images.length > 0
        ? images
        : ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"],
    colors: colors,
    sizes: sizes,
    inStock: true,
    rating: 0,
    reviews: [],
  }

  products.push(newProduct)
  filteredProducts = [...products]
  displayProducts()
  loadAdminProducts()
  updateProductsCount()
  saveToStorage()
  closeAddProductForm()

  showNotification("Yangi mahsulot muvaffaqiyatli qo'shildi!", "success")
}

function addColorInput() {
  const colorInputs = document.querySelector(".color-inputs")
  const existingInputs = colorInputs.querySelectorAll("input[type='color']")

  if (existingInputs.length >= 8) {
    showNotification("Maksimal 8 ta rang qo'shish mumkin", "warning")
    return
  }

  const newInput = document.createElement("input")
  newInput.type = "color"
  newInput.name = "colors"
  newInput.value = "#000000"
  colorInputs.insertBefore(newInput, colorInputs.lastElementChild)
}

function editProduct(productId) {
  showNotification("Tahrirlash funksiyasi tez orada!", "info")
}

function deleteProduct(productId) {
  if (confirm("Mahsulotni o'chirishni tasdiqlaysizmi?")) {
    products = products.filter((p) => p.id !== productId)
    filteredProducts = filteredProducts.filter((p) => p.id !== productId)
    displayProducts()
    loadAdminProducts()
    updateProductsCount()
    saveToStorage()
    showNotification("Mahsulot o'chirildi", "success")
  }
}

function editOrder(orderId) {
  const order = orders.find((o) => o.id === orderId)
  if (!order) return

  // Create edit modal
  const editModal = document.createElement("div")
  editModal.className = "order-modal"
  editModal.id = "editOrderModal"
  editModal.innerHTML = `
    <div class="modal-overlay" onclick="closeEditOrderModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Buyurtmani tahrirlash</h3>
        <button class="close-modal" onclick="closeEditOrderModal()" title="Yopish">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <form class="order-form" id="editOrderForm">
        <div class="form-group">
          <label>Ism va familiya *</label>
          <input type="text" name="fullName" value="${order.customerName}" required />
        </div>
        <div class="form-group">
          <label>Telefon raqami *</label>
          <input
            type="tel"
            name="phone"
            value="${order.phone || ""}"
            placeholder="+998 90 123 45 67"
            required
          />
        </div>
        <div class="form-group">
          <label>Email manzili</label>
          <input type="email" name="email" value="${order.email || ""}" />
        </div>
        <div class="form-group">
          <label>Yetkazib berish manzili *</label>
          <textarea name="address" rows="3" required>${order.address || ""}</textarea>
        </div>
        <div class="form-group">
          <label>Izoh</label>
          <textarea name="comment" rows="2">${order.comment || ""}</textarea>
        </div>
        <div class="form-group">
          <label>Holati *</label>
          <select name="status" required>
            <option value="Yangi" ${order.status === "Yangi" ? "selected" : ""}>Yangi</option>
            <option value="Tayyorlash" ${order.status === "Tayyorlash" ? "selected" : ""}>Tayyorlash</option>
            <option value="Yetkazilmoqda" ${order.status === "Yetkazilmoqda" ? "selected" : ""}>Yetkazilmoqda</option>
            <option value="Yetkazildi" ${order.status === "Yetkazildi" ? "selected" : ""}>Yetkazildi</option>
            <option value="Bekor qilindi" ${order.status === "Bekor qilindi" ? "selected" : ""}>Bekor qilindi</option>
          </select>
        </div>
        <div class="order-summary">
          <h4>Buyurtma tafsilotlari</h4>
          <div id="editOrderItems">
            ${order.items
              .map(
                (item) => `
              <div class="order-item">
                <span>${item.name}</span>
                <span>${item.quantity}x</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
              </div>
            `,
              )
              .join("")}
          </div>
          <div class="order-total">
            <strong>Jami: <span>${formatPrice(order.total)}</span></strong>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" onclick="closeEditOrderModal()" class="cta-btn secondary">
            Bekor qilish
          </button>
          <button type="submit" class="cta-btn primary">
            <i class="fas fa-save"></i>
            Saqlash
          </button>
        </div>
      </form>
    </div>
  `

  document.body.appendChild(editModal)

  // Handle form submission
  document.getElementById("editOrderForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    // Update order
    order.customerName = formData.get("fullName")
    order.phone = formData.get("phone")
    order.email = formData.get("email")
    order.address = formData.get("address")
    order.comment = formData.get("comment")
    order.status = formData.get("status")

    // Refresh table and close modal
    loadAdminOrders()
    closeEditOrderModal()
    showNotification("Buyurtma muvaffaqiyatli tahrirlandi!", "success")
    saveToStorage() // Save changes to storage
  })
}

function closeEditOrderModal() {
  const modal = document.getElementById("editOrderModal")
  if (modal) modal.remove()
}

function deleteOrder(orderId) {
  if (confirm("Ushbu buyurtmani o'chirib tashlamoqchimisiz?")) {
    orders = orders.filter((o) => o.id !== orderId)
    loadAdminOrders()
    saveToStorage() // Save changes after deletion
    showNotification("Buyurtma o'chirib tashlandi!", "success")
  }
}

function editUser(userId) {
  showNotification("Foydalanuvchini tahrirlash funksiyasi tez orada!", "info")
}

function handleSaveSettings(e) {
  e.preventDefault()

  const siteName = document.getElementById("siteName").value
  const primaryColor = document.getElementById("primaryColor").value

  // Update site name
  document.querySelector(".nav-logo h1").textContent = siteName

  // Update primary color
  document.documentElement.style.setProperty("--primary-color", primaryColor)

  // Save to localStorage
  localStorage.setItem(
    "bekstyle_settings",
    JSON.stringify({
      siteName,
      primaryColor,
    }),
  )

  showNotification("Sozlamalar saqlandi!", "success")
}

// Image preview for add product form
document.addEventListener("change", (e) => {
  if (e.target.name === "images") {
    const files = Array.from(e.target.files)
    const preview = document.getElementById("imagePreview")
    preview.innerHTML = ""

    if (files.length > 5) {
      showNotification("Maksimal 5 ta rasm yuklash mumkin", "warning")
      e.target.value = ""
      return
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        showNotification("Rasm hajmi 5MB dan oshmasligi kerak", "warning")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = document.createElement("img")
        img.src = e.target.result
        img.className = "preview-image"
        preview.appendChild(img)
      }
      reader.readAsDataURL(file)
    })
  }
})

// Load settings on startup
function loadSettings() {
  const savedSettings = localStorage.getItem("bekstyle_settings")
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)

    if (settings.siteName) {
      document.querySelector(".nav-logo h1").textContent = settings.siteName
      const siteNameInput = document.getElementById("siteName")
      if (siteNameInput) siteNameInput.value = settings.siteName
    }

    if (settings.primaryColor) {
      document.documentElement.style.setProperty("--primary-color", settings.primaryColor)
      const primaryColorInput = document.getElementById("primaryColor")
      if (primaryColorInput) primaryColorInput.value = settings.primaryColor
    }
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error)
  showNotification("Xatolik yuz berdi. Sahifani yangilang.", "error")
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Sahifa ${Math.round(loadTime)}ms da yuklandi`)

  if (loadTime > 3000) {
    console.warn("Sahifa sekin yuklandi")
  }
})

// Service Worker registration for offline support
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

console.log("🚀 BekStyle Fashion Store muvaffaqiyatli ishga tushdi!")

// Notification System
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification")
  const icon = notification.querySelector(".notification-icon")
  const messageEl = notification.querySelector(".notification-message")

  // Set icon based on type
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-times-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  icon.className = `notification-icon ${icons[type]}`
  messageEl.textContent = message
  notification.className = `notification ${type}`

  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// function updateCartCount() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || []
//   const cartCountEl = document.querySelector(".cart-count")
//   if (cartCountEl) {
//     cartCountEl.textContent = cart.length
//   }
// }

// function updateWishlistCount() {
//   const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
//   const wishlistCountEl = document.querySelector(".wishlist-count")
//   if (wishlistCountEl) {
//     wishlistCountEl.textContent = wishlist.length
//   }
// }

// function addToCart(productId = null, quantity = 1) {
//   const cart = JSON.parse(localStorage.getItem("cart")) || []

//   if (productId === null) {
//     const modal = document.getElementById("productModal")
//     productId = modal.dataset.productId
//   }

//   const existingItem = cart.find((item) => item.id === productId)

//   if (existingItem) {
//     existingItem.quantity += quantity
//   } else {
//     cart.push({ id: productId, quantity })
//   }

//   localStorage.setItem("cart", JSON.stringify(cart))
//   updateCartCount()
//   showNotification("Mahsulot savatchaga qo'shildi!", "success")
//   closeProductModal()
// }

// function addToWishlist(productId = null) {
//   const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

//   if (productId === null) {
//     const modal = document.getElementById("productModal")
//     productId = modal.dataset.productId
//   }

//   if (!wishlist.includes(productId)) {
//     wishlist.push(productId)
//     localStorage.setItem("wishlist", JSON.stringify(wishlist))
//     updateWishlistCount()
//     showNotification("Sevimlilar ro'yxatiga qo'shildi!", "success")
//   } else {
//     wishlist.splice(wishlist.indexOf(productId), 1)
//     localStorage.setItem("wishlist", JSON.stringify(wishlist))
//     updateWishlistCount()
//     showNotification("Sevimlilardan o'chirildi!", "info")
//   }
// }

// function checkout() {
//   const orderForm = document.getElementById("orderForm")
//   const orderModal = document.getElementById("orderModal")

//   orderForm.addEventListener("submit", (e) => {
//     e.preventDefault()

//     const formData = new FormData(orderForm)
//     const order = {
//       id: Date.now(),
//       fullName: formData.get("fullName"),
//       phone: formData.get("phone"),
//       email: formData.get("email"),
//       address: formData.get("address"),
//       comment: formData.get("comment"),
//       items: JSON.parse(localStorage.getItem("cart")) || [],
//       total: calculateCartTotal(),
//       date: new Date().toISOString(),
//     }

//     const orders = JSON.parse(localStorage.getItem("orders")) || []
//     orders.push(order)
//     localStorage.setItem("orders", JSON.stringify(orders))

//     localStorage.setItem("cart", JSON.stringify([]))
//     updateCartCount()

//     showNotification("Buyurtmangiz qabul qilindi! Tez orada biz siz bilan bog'lanamiz.", "success")
//     closeOrderModal()
//     orderForm.reset()
//   })
// }

// function closeProductModal() {
//   // Implementation for closing product modal
// }

// function calculateCartTotal() {
//   // Implementation for calculating cart total
// }

// function closeOrderModal() {
//   // Implementation for closing order modal
// }
