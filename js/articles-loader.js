// Articles Loader - Automatically load all articles
document.addEventListener('DOMContentLoaded', async () => {
    await loadAllArticles();
});

// Article data
const articlesData = [
    {
        id: 1,
        title: 'کنترل به جای نوآوری؛ روایت توسعه نامتوازن هوش مصنوعی در ایران',
        excerpt: 'جمهوری اسلامی ایران به‌دنبال استفاده از فناوری‌های نوین، به‌ویژه هوش مصنوعی، برای تقویت توسعه ملی و امنیت خود است.',
        category: 'تکنولوژی',
        date: '۱۸ آبان ۱۴۰۳',
        readingTime: '25',
        image: '../assets/images/ai.png',
        tags: ['هوش مصنوعی', 'سیاست', 'امنیت ملی', 'سند ملی']
    },
    {
        id: 2,
        title: 'میراث جنگ ۱۲ روزه: غلبه نگاه امنیتی بر اکوسیستم دیجیتال و شبکه اینترنت',
        excerpt: 'بررسی تأثیرات جنگ ۱۲ روزه بر اکوسیستم دیجیتال و چگونگی تشدید نگاه امنیتی در فضای مجازی ایران.',
        category: 'امنیت',
        date: '۱۴ آبان ۱۴۰۳',
        readingTime: '12',
        image: '../assets/images/war.png',
        tags: ['جنگ', 'امنیت', 'اینترنت', 'فیلترینگ']
    },
    {
        id: 3,
        title: 'از اینترنت تا پیامک؛ گسترش سانسور به آخرین کانال ارتباطی',
        excerpt: 'کشف یک سامانه سازمان‌یافته برای فیلترینگ و مهندسی پیامک‌ها، به معنای ظهور شکل تازه‌ای از نقض حقوق دیجیتال است.',
        category: 'سانسور',
        date: '۱۳ آبان ۱۴۰۳',
        readingTime: '15',
        image: '../assets/images/sms.png',
        tags: ['سانسور', 'پیامک', 'فیلترینگ', 'پیک‌آسا']
    }
];

// Load all articles
async function loadAllArticles() {
    const container = document.getElementById('articles-container');
    
    if (!container) return;
    
    // Clear loading message
    container.innerHTML = '';
    
    // Create article cards
    articlesData.forEach(article => {
        const articleCard = createArticleCard(article);
        container.appendChild(articleCard);
    });
}

// Create article card element
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    
    card.innerHTML = `
        <a href="article.html?id=${article.id}" class="article-card-link">
            <div class="article-card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="article-category-badge">${article.category}</span>
            </div>
            <div class="article-card-content">
                <h3 class="article-card-title">${article.title}</h3>
                <p class="article-card-excerpt">${article.excerpt}</p>
                <div class="article-card-meta">
                    <span class="article-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${article.date}
                    </span>
                    <span class="article-reading-time">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${article.readingTime} دقیقه
                    </span>
                </div>
                <div class="article-card-tags">
                    ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
        </a>
    `;
    
    return card;
}
