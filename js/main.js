// Main JavaScript File

// Sample data - In a real application, this would come from an API or database
const sampleArticles = [
    {
        id: '1',
        title: 'کنترل به جای نوآوری: روایت توسعه نامتوازن هوش مصنوعی در ایران',
        excerpt: 'جمهوری اسلامی ایران طی سال‌های اخیر استفاده از فناوری‌های نوین برای کنترل جامعه را به صورت سیستماتیک توسعه داده است',
        content: 'این مقاله به بررسی نحوه‌ای می‌پردازد که توسعه هوش مصنوعی در ایران صرفاً در جهت تأمین نیازهای نظارتی پیش رفته است...',
        date: '۱۵ مهر ۱۴۰۳',
        category: 'تکنولوژی',
        views: 1250,
        comments: 12,
        coverImage: '/assets/images/ai.png',
        featured: true
    },
    {
        id: '2',
        title: 'آینده طراحی وب در عصر هوش مصنوعی',
        excerpt: 'بررسی تأثیرات هوش مصنوعی بر صنعت طراحی وب و چگونگی تطبیق با تکنولوژی‌های جدید',
        content: 'هوش مصنوعی به سرعت در حال تغییر چهره صنعت طراحی وب است...',
        date: '۱۰ مهر ۱۴۰۳',
        category: 'طراحی وب',
        views: 890,
        comments: 8,
        coverImage: '/assets/images/head-banner.png'
    },
    {
        id: '3',
        title: 'میراث جنگ: نگاه امنیتی بر اکوسیستم دیجیتال',
        excerpt: 'بررسی تأثیرات جنگ بر اکوسیستم دیجیتال ایران و چگونگی تبدیل نگاه امنیتی به رویکرد غالب',
        content: 'با رشد روزافزون استفاده از اینترنت، امنیت سایبری تبدیل به مهم‌ترین دغدغه شده است...',
        date: '۵ مهر ۱۴۰۳',
        category: 'امنیت',
        views: 654,
        comments: 15,
        coverImage: '/assets/images/war.png'
    },
    {
        id: '4',
        title: 'معماری میکروسرویس‌ها در پروژه‌های بزرگ',
        excerpt: 'نحوه پیاده‌سازی معماری میکروسرویس و مزایای آن در پروژه‌های مقیاس بزرگ',
        content: 'معماری میکروسرویس یکی از الگوهای مدرن توسعه نرم‌افزار است...',
        date: '۱۴۰۳/۰۸/۰۸',
        category: 'معماری',
        views: 543,
        comments: 18,
        icon: '🏗️'
    },
    {
        id: '5',
        title: 'آینده هوش مصنوعی در توسعه وب',
        excerpt: 'بررسی تأثیر هوش مصنوعی بر صنعت توسعه وب و ابزارهای جدید',
        content: 'هوش مصنوعی در حال تغییر چهره صنعت توسعه وب است...',
        date: '۱۴۰۳/۰۸/۰۵',
        category: 'هوش مصنوعی',
        views: 892,
        comments: 27,
        icon: '🤖'
    },
    {
        id: '6',
        title: 'طراحی رابط کاربری مدرن با CSS Grid',
        excerpt: 'آموزش کامل استفاده از CSS Grid برای ایجاد لایوت‌های پیچیده و زیبا',
        content: 'CSS Grid یکی از قدرتمندترین ابزارهای طراحی لایوت است...',
        date: '۱۴۰۳/۰۸/۰۳',
        category: 'CSS',
        views: 665,
        comments: 12,
        icon: '📐'
    }
];

const sampleTools = [
    {
        id: '1',
        title: 'مولد رنگ‌های هارمونیک',
        description: 'ابزاری برای تولید پالت رنگ‌های هماهنگ و زیبا برای پروژه‌های طراحی',
        coverImage: '/assets/images/head-banner.png',
        features: [
            'تولید پالت رنگ خودکار',
            'پشتیبانی از انواع هارمونی رنگ',
            'صادرات به فرمت‌های مختلف',
            'پیش‌نمایش زنده'
        ],
        featured: true
    },
    {
        id: '2',
        title: 'تحلیلگر صوتی پیشرفته',
        description: 'ابزاری قدرتمند برای تجزیه و تحلیل فایل‌های صوتی و استخراج اطلاعات',
        coverImage: '/assets/images/audio.png',
        features: [
            'تحلیل فرکانس صوت',
            'شناسایی الگوهای صوتی',
            'تبدیل فرمت صوتی',
            'گزارش تفصیلی'
        ]
    },
    {
        id: '3',
        title: 'مبدل کد رنگ',
        description: 'تبدیل بین فرمت‌های مختلف رنگ (HEX, RGB, HSL, CMYK)',
        icon: '🌈',
        features: [
            'پشتیبانی از همه فرمت‌ها',
            'تبدیل فوری',
            'پیش‌نمایش رنگ',
            'کپی سریع'
        ]
    },
    {
        id: '4',
        title: 'ژنراتور متن لورم',
        description: 'تولید متن‌های نمونه فارسی و انگلیسی برای پروژه‌های طراحی',
        icon: '📝',
        features: [
            'متن فارسی و انگلیسی',
            'طول قابل تنظیم',
            'فرمت‌های مختلف',
            'کپی آسان'
        ]
    },
    {
        id: '5',
        title: 'فشرده‌ساز تصاویر',
        description: 'کاهش حجم تصاویر بدون از دست دادن کیفیت برای بهینه‌سازی وب',
        icon: '📷',
        features: [
            'فشرده‌سازی بدون افت کیفیت',
            'پشتیبانی از فرمت‌های مختلف',
            'پردازش دسته‌ای',
            'پیش‌نمایش قبل و بعد'
        ],
        featured: true
    },
    {
        id: '6',
        title: 'تولیدکننده QR کد',
        description: 'ایجاد QR کدهای سفارشی برای لینک‌ها، متن‌ها و اطلاعات تماس',
        icon: '📱',
        features: [
            'انواع مختلف QR کد',
            'سفارشی‌سازی ظاهر',
            'دانلود با کیفیت بالا',
            'پیش‌نمایش زنده'
        ]
    }
];

// State management
let currentArticlePage = 1;
let articlesPerPage = 6;
let isLoading = false;

// DOM elements
let articlesContainer;
let toolsContainer;
let loadMoreBtn;
let searchInput;
let searchBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    loadInitialContent();
    setupSearch();
    setupAutoRedirects();
    setupAutoSEO();
});

// Auto SEO and meta tags management
function setupAutoSEO() {
    // Auto update page title based on current section
    function updatePageTitle() {
        const hash = window.location.hash;
        const baseTitle = 'ابـزارسـتـان - مرجع کامل ابزارها و مقالات';

        let newTitle = baseTitle;

        switch(hash) {
            case '#articles':
                newTitle = 'مقالات - ' + baseTitle;
                break;
            case '#tools':
                newTitle = 'ابزارها - ' + baseTitle;
                break;
            case '#about':
                newTitle = 'درباره ما - ' + baseTitle;
                break;
        }

        document.title = newTitle;

        // Update Open Graph title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', newTitle);
        }
    }

    // Listen for hash changes to update title
    window.addEventListener('hashchange', updatePageTitle);

    // Auto add structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ابـزارسـتـان",
        "description": "مرجع کامل ابزارها و مقالات کاربردی برای توسعه‌دهندگان و طراحان",
        "url": window.location.origin,
        "potentialAction": {
            "@type": "SearchAction",
            "target": window.location.origin + "/?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Auto redirect handling (replaces _redirects file)
function setupAutoRedirects() {
    // Handle 404 errors by redirecting to home
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'LINK') {
            console.warn('Resource not found:', e.target.src || e.target.href);
        }
    });

    // Handle hash-based routing
    function handleRouting() {
        const hash = window.location.hash;

        // Auto scroll to sections
        if (hash && document.querySelector(hash)) {
            setTimeout(() => {
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleRouting);

    // Handle initial load
    handleRouting();

    // Force HTTPS in production (optional)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        // Uncomment next line to force HTTPS
        // location.replace('https:' + window.location.href.substring(window.location.protocol.length));
    }
}

function initializeElements() {
    articlesContainer = document.getElementById('articles-container');
    toolsContainer = document.getElementById('tools-container');
    loadMoreBtn = document.getElementById('load-more-articles');
    searchInput = document.querySelector('.search-input');
    searchBtn = document.querySelector('.search-btn');
}

function setupEventListeners() {
    // Load more articles
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreArticles);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', updateActiveNavLink);

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
}

function loadInitialContent() {
    loadArticles();
    loadTools();

    // Set search data
    searchInstance.setData(sampleArticles, sampleTools);
}

function loadArticles(articles = null) {
    if (!articlesContainer) return;

    const articlesToShow = articles || sampleArticles.slice(0, articlesPerPage * currentArticlePage);

    if (!articles) {
        // Show loading skeletons initially
        showLoadingSkeletons(articlesContainer, LoadingSkeleton.article, 6);

        // Simulate loading delay
        setTimeout(() => {
            articlesContainer.innerHTML = '';
            renderArticles(articlesToShow);
        }, 1000);
    } else {
        renderArticles(articlesToShow);
    }
}

function renderArticles(articles) {
    if (!articlesContainer) return;

    articlesContainer.innerHTML = '';
    articles.forEach(article => {
        const articleCard = new ArticleCard(article);
        articlesContainer.innerHTML += articleCard.render();
    });

    // Update load more button visibility
    if (loadMoreBtn) {
        const hasMore = articles.length < sampleArticles.length && !isLoading;
        loadMoreBtn.style.display = hasMore ? 'inline-block' : 'none';
    }
}

function loadTools(tools = null) {
    if (!toolsContainer) return;

    const toolsToShow = tools || sampleTools;

    if (!tools) {
        // Show loading skeletons initially
        showLoadingSkeletons(toolsContainer, LoadingSkeleton.tool, 6);

        // Simulate loading delay
        setTimeout(() => {
            toolsContainer.innerHTML = '';
            renderTools(toolsToShow);
        }, 1200);
    } else {
        renderTools(toolsToShow);
    }
}

function renderTools(tools) {
    if (!toolsContainer) return;

    toolsContainer.innerHTML = '';
    tools.forEach(tool => {
        const toolCard = new ToolCard(tool);
        toolsContainer.innerHTML += toolCard.render();
    });
}

function showLoadingSkeletons(container, skeletonFunction, count) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        container.innerHTML += skeletonFunction();
    }
}

function loadMoreArticles() {
    if (isLoading) return;

    isLoading = true;
    loadMoreBtn.innerHTML = '<span class="loading"></span> در حال بارگذاری...';

    setTimeout(() => {
        currentArticlePage++;
        const newArticles = sampleArticles.slice(0, articlesPerPage * currentArticlePage);
        renderArticles(newArticles);

        isLoading = false;
        loadMoreBtn.innerHTML = 'مشاهده بیشتر';

        Toast.show('مقالات جدید بارگذاری شد!', 'success');
    }, 1000);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('.newsletter-input').value;

    if (email) {
        Toast.show('با موفقیت در خبرنامه عضو شدید!', 'success');
        e.target.reset();
    } else {
        Toast.show('لطفاً ایمیل معتبر وارد کنید', 'error');
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        loadArticles();
        loadTools();
        Toast.show('جستجو خالی است', 'error');
        return;
    }

    const results = searchInstance.search(query);

    if (results.articles.length === 0 && results.tools.length === 0) {
        Toast.show('نتیجه‌ای یافت نشد', 'info');
        return;
    }

    loadArticles(results.articles);
    loadTools(results.tools);

    Toast.show(`${results.articles.length + results.tools.length} نتیجه یافت شد`, 'success');
}

function setupSearch() {
    // Advanced search functionality can be added here
    // For now, we have basic search implemented above
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedSearch = debounce(handleSearch, 300);
if (searchInput) {
    searchInput.addEventListener('input', debouncedSearch);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('خطا رخ داد:', e.error);
    Toast.show('خطایی رخ داد. لطفاً صفحه را تازه‌سازی کنید.', 'error');
});

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');
}

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered successfully');
            })
            .catch(function(registrationError) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Placeholder for ArticleCard and ToolCard classes if they are defined elsewhere
// For now, assuming they are globally available or defined in included scripts
class ArticleCard {
    constructor(article) {
        this.article = article;
    }

    render() {
        const coverImage = this.article.coverImage || '/assets/images/head-banner.png';
        return `
            <div class="article-card">
                ${this.article.featured ? '<span class="featured-badge">ویژه</span>' : ''}
                <div class="article-image" style="background-image: url('${coverImage}')">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="display: none;">
                        <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="article-card-content">
                    <div class="article-meta">
                        <span class="article-date">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            ${this.article.date}
                        </span>
                        <span class="article-category">${this.article.category}</span>
                    </div>
                    <h3 class="article-title">${this.article.title}</h3>
                    <p class="article-excerpt">${this.article.excerpt}</p>
                    <div class="article-actions">
                        <a href="/pages/article.html?id=${this.article.id}" class="read-more" target="_blank">
                            ادامه مطلب
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <div class="article-stats">
                            <span class="stat-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                ${this.article.views}
                            </span>
                            <span class="stat-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 15A2 2 0 0 1 19 17H7L4 20V5A2 2 0 0 1 6 3H19A2 2 0 0 1 21 5Z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                ${this.article.comments}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

class ToolCard {
    constructor(tool) {
        this.tool = tool;
    }

    render() {
        const coverImage = this.tool.coverImage || '/assets/images/head-banner.png';
        return `
            <div class="tool-card">
                ${this.tool.featured ? '<span class="featured-badge">ویژه</span>' : ''}
                <div class="tool-icon" style="background-image: url('${coverImage}'); background-size: cover; background-position: center;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                </div>
                <h3 class="tool-title">${this.tool.title}</h3>
                <p class="tool-description">${this.tool.description}</p>
                <ul class="tool-features">
                    ${this.tool.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="tool-actions">
                    <a href="#" class="tool-btn tool-btn-primary">استفاده از ابزار</a>
                    <a href="#" class="tool-btn tool-btn-secondary">اطلاعات بیشتر</a>
                </div>
            </div>
        `;
    }
}

// Placeholder for LoadingSkeleton
class LoadingSkeleton {
    static article() {
        return `
            <div class="article-card skeleton">
                <div class="skeleton-header"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        `;
    }

    static tool() {
        return `
            <div class="tool-card skeleton">
                <div class="skeleton-header"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line tiny"></div>
            </div>
        `;
    }
}

// Placeholder for Toast notifications
class Toast {
    static show(message, type = 'info') {
        console.log(`Toast (${type}): ${message}`);
        // In a real app, this would display a visible notification to the user.
    }
}

// Placeholder for Search functionality
const searchInstance = {
    data: { articles: [], tools: [] },
    setData: function(articles, tools) {
        this.data.articles = articles;
        this.data.tools = tools;
    },
    search: function(query) {
        const lowerCaseQuery = query.toLowerCase();
        const foundArticles = this.data.articles.filter(article =>
            article.title.toLowerCase().includes(lowerCaseQuery) ||
            article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
            article.category.toLowerCase().includes(lowerCaseQuery)
        );
        const foundTools = this.data.tools.filter(tool =>
            tool.title.toLowerCase().includes(lowerCaseQuery) ||
            tool.description.toLowerCase().includes(lowerCaseQuery)
        );
        return { articles: foundArticles, tools: foundTools };
    }
};