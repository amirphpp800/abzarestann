// Article Page Dynamic Loader
// بارگذاری خودکار محتوای یادداشت از API

import { getArticles } from './modules/api.js';

// دریافت ID مقاله از URL
function getArticleIdFromUrl() {
  const path = window.location.pathname;
  console.log('🔍 Current pathname:', path);
  console.log('🔍 Full URL:', window.location.href);
  
  // روش 1: از pathname (برای Cloudflare Pages routing)
  // مثال: /article/war-12-days یا /pages/article.html
  const match = path.match(/\/article\/([^\/]+)/);
  let id = match ? match[1] : null;
  
  // روش 2: از query parameter (fallback برای روت‌های قدیمی)
  if (!id) {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    console.log('🔍 Trying query parameter, found:', id);
  }
  
  // روش 3: از hash (fallback)
  if (!id && window.location.hash) {
    const hashId = window.location.hash.substring(1);
    if (hashId && hashId !== '') {
      id = hashId;
      console.log('🔍 Trying hash, found:', id);
    }
  }
  
  console.log('📌 Final extracted article ID:', id);
  
  return id;
}

// بارگذاری یادداشت
async function loadArticle() {
  console.log('📰 Loading article...');
  const articleId = getArticleIdFromUrl();
  
  if (!articleId) {
    console.error('❌ Article ID not found in URL');
    console.error('📍 Current path:', window.location.pathname);
    console.error('🔗 Full URL:', window.location.href);
    console.error('❓ Query params:', window.location.search);
    showArticleNotFound();
    return;
  }
  
  console.log('✅ Article ID found:', articleId);
  
  try {
    // بارگذاری از JSON
    const response = await fetch('/data/articles.json');
    const data = await response.json();
    const articles = data.articles || [];
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
      showArticleNotFound();
      return;
    }
    
    // بارگذاری محتوای یادداشت
    updateArticleHeader(article);
    updateArticleContent(article);
    updateArticleMeta(article);
    loadRelatedArticles(articles, article);
    setupTableOfContents();
    
  } catch (error) {
    console.error('Error loading article:', error);
    showArticleError();
  }
}

// به‌روزرسانی هدر مقاله
function updateArticleHeader(article) {
  // عنوان صفحه
  document.title = `${article.title} - ابزارستان`;
  
  // دسته‌بندی
  const categoryEl = document.querySelector('.article-category');
  if (categoryEl) categoryEl.textContent = article.category || 'عمومی';
  
  // تاریخ
  const dateEl = document.querySelector('.article-date');
  if (dateEl) {
    const dateText = dateEl.querySelector('span:last-child') || dateEl;
    dateText.textContent = new Date(article.date).toLocaleDateString('fa-IR');
  }
  
  // زمان مطالعه
  const readingTimeEl = document.querySelector('.article-reading-time');
  if (readingTimeEl) {
    const timeText = readingTimeEl.querySelector('span:last-child') || readingTimeEl;
    const minutes = calculateReadingTime(article.content);
    timeText.textContent = `${minutes} دقیقه`;
  }
  
  // عنوان
  const titleEl = document.querySelector('.article-title');
  if (titleEl) titleEl.textContent = article.title;
  
  // خلاصه
  const excerptEl = document.querySelector('.article-excerpt');
  if (excerptEl) excerptEl.textContent = article.excerpt || '';
  
  // نویسنده
  const authorNameEl = document.querySelector('.author-name');
  if (authorNameEl) authorNameEl.textContent = article.author || 'ابزارستان';
  
  // تصویر پس‌زمینه
  if (article.image) {
    const headerEl = document.querySelector('.article-header');
    if (headerEl) {
      headerEl.setAttribute('data-image', 'true');
      headerEl.style.setProperty('--header-image', `url(${article.image})`);
    }
  }
}

// به‌روزرسانی محتوای مقاله
function updateArticleContent(article) {
  const contentEl = document.querySelector('.article-body');
  if (!contentEl) return;
  
  // تبدیل Markdown به HTML با کلاس‌های استایل
  let htmlContent = article.content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^# (.+)$/gm, '<h2 class="article-heading">$1</h2>')
    .replace(/^## (.+)$/gm, '<h3 class="article-subheading">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="article-strong">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="article-em">$1</em>');
  
  contentEl.innerHTML = `
    <p>${htmlContent}</p>
    
    <!-- Tags -->
    <div class="article-tags">
      <span class="tag-label">برچسب‌ها:</span>
      ${(article.tags || []).map(tag => `<a href="/blog?tag=${tag}" class="article-tag">${tag}</a>`).join('')}
    </div>
    
    <!-- Share -->
    <div class="article-share">
      <span class="share-label">اشتراک‌گذاری:</span>
      <button class="share-btn" onclick="shareArticle('telegram')" aria-label="تلگرام">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      </button>
      <button class="share-btn" onclick="shareArticle('twitter')" aria-label="توییتر">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
      <button class="share-btn" onclick="copyArticleLink()" aria-label="کپی لینک">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      </button>
    </div>
  `;
}

// به‌روزرسانی متا
function updateArticleMeta(article) {
  // Meta tags
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = article.excerpt || article.title;
  
  // Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = article.title;
  
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.content = article.excerpt || '';
  
  if (article.image) {
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.content = article.image;
  }
}

// بارگذاری یادداشت‌های مرتبط
function loadRelatedArticles(allArticles, currentArticle) {
  const relatedContainer = document.querySelector('.related-articles');
  if (!relatedContainer) return;
  
  // فیلتر یادداشت‌های مرتبط (همان دسته‌بندی و منتشر شده)
  const related = allArticles
    .filter(a => a.id !== currentArticle.id && a.category === currentArticle.category && a.published)
    .slice(0, 3);
  
  if (related.length === 0) {
    // اگر یادداشت مرتبط در همان دسته نبود، آخرین یادداشت‌ها را نشان بده
    const latestArticles = allArticles
      .filter(a => a.id !== currentArticle.id && a.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    
    if (latestArticles.length === 0) {
      relatedContainer.innerHTML = '<p style="color: var(--muted); text-align: center;">یادداشت مرتبطی یافت نشد</p>';
      return;
    }
    
    relatedContainer.innerHTML = latestArticles.map((article, index) => `
      <a href="/article/${article.id}" class="related-item">
        <div class="related-number">${convertToPersianNumber(index + 1)}</div>
        <div class="related-content">
          <h4>${article.title}</h4>
          <span class="related-date">${new Date(article.date).toLocaleDateString('fa-IR')}</span>
        </div>
      </a>
    `).join('');
    return;
  }
  
  relatedContainer.innerHTML = related.map((article, index) => `
    <a href="/article/${article.id}" class="related-item">
      <div class="related-number">${convertToPersianNumber(index + 1)}</div>
      <div class="related-content">
        <h4>${article.title}</h4>
        <span class="related-date">${new Date(article.date).toLocaleDateString('fa-IR')}</span>
      </div>
    </a>
  `).join('');
}

// ایجاد فهرست مطالب خودکار
function setupTableOfContents() {
  const tocContainer = document.querySelector('.article-toc');
  const contentEl = document.querySelector('.article-body');
  
  if (!tocContainer || !contentEl) return;
  
  const headings = contentEl.querySelectorAll('h2, h3');
  
  if (headings.length === 0) return;
  
  tocContainer.innerHTML = Array.from(headings).map((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    
    return `<a href="#${id}" class="toc-item">${heading.textContent}</a>`;
  }).join('');
  
  // Smooth scroll برای فهرست
  tocContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// محاسبه زمان مطالعه
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// تبدیل اعداد انگلیسی به فارسی
function convertToPersianNumber(num) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, digit => persianDigits[digit]);
}

// نمایش خطا
function showArticleNotFound() {
  const titleEl = document.querySelector('.article-title');
  const bodyEl = document.querySelector('.article-body');
  
  if (titleEl) titleEl.textContent = 'یادداشت یافت نشد';
  if (bodyEl) bodyEl.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--muted);">متأسفانه یادداشت مورد نظر یافت نشد. <a href="/blog" style="color: var(--red);">بازگشت به لیست یادداشت‌ها</a></p>';
}

function showArticleError() {
  const titleEl = document.querySelector('.article-title');
  const bodyEl = document.querySelector('.article-body');
  
  if (titleEl) titleEl.textContent = 'خطا در بارگذاری';
  if (bodyEl) bodyEl.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--muted);">خطا در بارگذاری یادداشت. لطفاً دوباره تلاش کنید.</p>';
}

// توابع اشتراک‌گذاری
window.shareArticle = function(platform) {
  const url = window.location.href;
  const title = document.querySelector('.article-title').textContent;
  
  const shareUrls = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  };
  
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
};

window.copyArticleLink = function() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('لینک کپی شد!');
  });
};

// اجرای خودکار
// بررسی اینکه آیا در صفحه مقاله هستیم
const isArticlePage = window.location.pathname.includes('/article/') || 
                      window.location.pathname.includes('/pages/article') ||
                      window.location.pathname.endsWith('article.html');

console.log('🔍 Is article page?', isArticlePage);
console.log('🔍 Current path:', window.location.pathname);

if (isArticlePage) {
  document.addEventListener('DOMContentLoaded', loadArticle);
}
