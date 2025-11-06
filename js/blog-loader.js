
// Blog Page Dynamic Loader
// بارگذاری خودکار لیست یادداشت‌ها در صفحه بلاگ

// تبدیل اعداد انگلیسی به فارسی
function convertToPersianNumber(num) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, digit => persianDigits[digit]);
}

// محاسبه زمان مطالعه
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return convertToPersianNumber(minutes);
}

// بارگذاری یادداشت‌ها
async function loadBlogArticles() {
  const articlesGrid = document.getElementById('articlesGrid');
  
  if (!articlesGrid) {
    console.log('Articles grid not found');
    return;
  }
  
  try {
    // نمایش لودینگ
    articlesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid rgba(157, 9, 19, 0.3); border-top-color: var(--red); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="margin-top: 1rem; color: var(--muted);">در حال بارگذاری یادداشت‌ها...</p>
      </div>
    `;
    
    console.log('Loading articles from /data/articles.json');
    
    // بارگذاری از JSON
    const response = await fetch('/data/articles.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Articles data loaded:', data);
    
    const articles = data.articles || [];
    
    // فیلتر یادداشت‌های منتشر شده و مرتب‌سازی بر اساس تاریخ
    const publishedArticles = articles
      .filter(article => article.published !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    console.log('Published articles:', publishedArticles.length);
    
    if (publishedArticles.length === 0) {
      articlesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <h3 style="margin-bottom: 1rem; color: var(--text);">هنوز یادداشتی منتشر نشده است</h3>
          <p style="color: var(--muted);">به زودی یادداشت‌های جدید اضافه خواهند شد.</p>
        </div>
      `;
      return;
    }
    
    // نمایش یادداشت‌ها
    articlesGrid.innerHTML = publishedArticles.map(article => `
      <article class="blog-card">
        ${article.image ? `
          <div class="blog-card-image" style="background-image: url('${article.image}')">
            <div class="blog-card-category">${article.category || 'عمومی'}</div>
          </div>
        ` : `
          <div class="blog-card-image" style="background: linear-gradient(135deg, rgba(157, 9, 19, 0.2), rgba(157, 9, 19, 0.05)); display: flex; align-items: center; justify-content: center; color: var(--red); font-size: 2rem;">
            📝
            <div class="blog-card-category" style="position: absolute; top: 1rem; right: 1rem;">${article.category || 'عمومی'}</div>
          </div>
        `}
        <div class="blog-card-content">
          <h3 class="blog-card-title">
            <a href="/article/${article.id}">${article.title}</a>
          </h3>
          <p class="blog-card-excerpt">${article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : 'خلاصه‌ای موجود نیست')}</p>
          <div class="blog-card-meta">
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${new Date(article.date).toLocaleDateString('fa-IR')}
            </span>
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${calculateReadingTime(article.content || article.excerpt || '')} دقیقه
            </span>
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              ${convertToPersianNumber(article.views || 0)} بازدید
            </span>
          </div>
          <div class="blog-card-footer">
            <div class="blog-card-tags">
              ${(article.tags || []).slice(0, 3).map(tag => 
                `<span class="tag">${tag}</span>`
              ).join('')}
            </div>
            <a href="/article/${article.id}" class="blog-card-link">
              ادامه مطلب
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
    
    console.log('Articles rendered successfully');
    
    // افزودن استایل انیمیشن
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .blog-card {
        animation: fadeInUp 0.5s ease forwards;
      }
      
      .blog-card:nth-child(1) { animation-delay: 0.1s; }
      .blog-card:nth-child(2) { animation-delay: 0.2s; }
      .blog-card:nth-child(3) { animation-delay: 0.3s; }
      .blog-card:nth-child(4) { animation-delay: 0.4s; }
      .blog-card:nth-child(5) { animation-delay: 0.5s; }
      .blog-card:nth-child(6) { animation-delay: 0.6s; }
    `;
    
    if (!document.getElementById('blog-animations')) {
      style.id = 'blog-animations';
      document.head.appendChild(style);
    }
    
    // تنظیم فیلترها و جستجو
    setupFiltersAndSearch();
    
  } catch (error) {
    console.error('Error loading articles:', error);
    articlesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <h3 style="color: var(--red); margin-bottom: 1rem;">خطا در بارگذاری یادداشت‌ها</h3>
        <p style="color: var(--muted); margin-bottom: 1.5rem;">متاسفانه نتوانستیم یادداشت‌ها را بارگذاری کنیم.</p>
        <button onclick="loadBlogArticles()" style="background: var(--red); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
          تلاش مجدد
        </button>
      </div>
    `;
  }
}

// تنظیم فیلترها و جستجو
function setupFiltersAndSearch() {
  // فیلتر دسته‌بندی‌ها
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // حذف کلاس active از همه تب‌ها
      filterTabs.forEach(t => t.classList.remove('active'));
      // اضافه کردن کلاس active به تب کلیک شده
      tab.classList.add('active');
      
      const category = tab.dataset.category;
      filterByCategory(category);
    });
  });
  
  // جستجو
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      searchArticles(query);
    });
  }
}

// فیلتر یادداشت‌ها بر اساس دسته‌بندی
function filterByCategory(category) {
  const cards = document.querySelectorAll('.blog-card');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const cardCategory = card.querySelector('.blog-card-category');
    if (!cardCategory) return;
    
    const cardCategoryText = cardCategory.textContent.trim();
    
    if (category === 'all' || cardCategoryText === category) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // نمایش پیام در صورت عدم وجود نتیجه
  toggleNoResults(visibleCount === 0);
}

// جستجو در یادداشت‌ها
function searchArticles(query) {
  const cards = document.querySelectorAll('.blog-card');
  let visibleCount = 0;
  
  if (!query) {
    cards.forEach(card => {
      card.style.display = 'block';
      visibleCount++;
    });
    toggleNoResults(false);
    return;
  }
  
  const searchQuery = query.toLowerCase();
  
  cards.forEach(card => {
    const title = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
    const excerpt = card.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';
    const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
    
    if (title.includes(searchQuery) || excerpt.includes(searchQuery) || tags.includes(searchQuery)) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  toggleNoResults(visibleCount === 0);
}

// نمایش/مخفی کردن پیام عدم وجود نتیجه
function toggleNoResults(show) {
  const noResults = document.getElementById('noResults');
  const articlesGrid = document.getElementById('articlesGrid');
  
  if (show) {
    if (noResults) noResults.style.display = 'block';
    if (articlesGrid) articlesGrid.style.display = 'none';
  } else {
    if (noResults) noResults.style.display = 'none';
    if (articlesGrid) articlesGrid.style.display = 'grid';
  }
}

// اجرای خودکار
console.log('Blog loader script loaded');
console.log('Current pathname:', window.location.pathname);

// بررسی اینکه آیا در صفحه بلاگ هستیم
const isBlogPage = window.location.pathname.includes('/blog') || 
                   window.location.pathname.includes('/pages/blog') ||
                   window.location.pathname.endsWith('blog.html');

console.log('Is blog page?', isBlogPage);

if (isBlogPage) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogArticles);
  } else {
    loadBlogArticles();
  }
}

// Export برای استفاده در جاهای دیگر
if (typeof window !== 'undefined') {
  window.loadBlogArticles = loadBlogArticles;
  window.filterByCategory = filterByCategory;
  window.searchArticles = searchArticles;
}
