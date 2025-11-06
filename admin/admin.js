// Admin Panel JavaScript
import { getArticles, createArticle, deleteArticle } from '../js/modules/api.js';

// Templates Data
const templates = {
  articles: [
    {
      title: 'راهنمای استفاده از VPN',
      icon: '🔒',
      description: 'تمپلیت کامل برای نوشتن راهنمای VPN',
      tags: ['VPN', 'امنیت', 'آموزش'],
      content: {
        title: 'راهنمای کامل استفاده از VPN در ایران',
        excerpt: 'همه چیز درباره VPN و نحوه استفاده امن از آن',
        content: `# راهنمای کامل VPN

## مقدمه
VPN یا Virtual Private Network...

## انواع VPN
1. **VPN رایگان**
2. **VPN پولی**
3. **Self-hosted VPN**

## نحوه استفاده
...`,
        category: 'آموزش',
        tags: 'vpn, امنیت, فیلترشکن'
      }
    }
  ],
  tools: [
    {
      title: 'VPN Tool',
      icon: '🔒',
      description: 'تمپلیت ابزار VPN',
      tags: ['VPN'],
      content: {
        name: 'نام VPN',
        description: 'توضیحات کوتاه',
        category: 'vpn',
        icon: '🔒',
        link: 'https://example.com'
      }
    }
  ]
};

// Check authentication - Simple version for development
function checkAuth() {
  const isAuthenticated = sessionStorage.getItem('admin_authenticated');
  const loginScreen = document.getElementById('loginScreen');
  const adminPanel = document.getElementById('adminPanel');

  console.log('Checking authentication:', isAuthenticated);

  if (isAuthenticated === 'true') {
    showAdminPanel();
    checkSystemStatus();
  } else {
    showLoginScreen();
  }
}

function showLoginScreen() {
  const loginScreen = document.getElementById('loginScreen');
  const adminPanel = document.getElementById('adminPanel');

  if (loginScreen) loginScreen.style.display = 'flex';
  if (adminPanel) adminPanel.style.display = 'none';

  console.log('Showing login screen');
}

function showAdminPanel() {
  const loginScreen = document.getElementById('loginScreen');
  const adminPanel = document.getElementById('adminPanel');

  if (loginScreen) loginScreen.style.display = 'none';
  if (adminPanel) adminPanel.style.display = 'flex';

  console.log('Showing admin panel');
  loadDashboard();
}

// Login - Simple version for development
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Login attempt:', username);

  // Simple auth for development
  if (username === 'admin' && password === 'admin123') {
    sessionStorage.setItem('admin_authenticated', 'true');
    showAdminPanel();
    showAlert('loginAlert', 'ورود موفقیت‌آمیز!', 'success');
  } else {
    showAlert('loginAlert', 'نام کاربری یا رمز عبور اشتباه است', 'error');
  }
});

// Logout
window.logout = function() {
  if (confirm('آیا مطمئن هستید؟')) {
    sessionStorage.clear();
    showLoginScreen();
  }
};

// Tab switching
window.switchTab = function(tab) {
  console.log('Switching to tab:', tab);

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  event.target.closest('.nav-item').classList.add('active');

  // Update panels
  document.querySelectorAll('.admin-panel').forEach(panel => panel.classList.remove('active'));
  const targetPanel = document.getElementById(tab + 'Panel');
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Update header
  const titles = {
    dashboard: ['داشبورد', 'مدیریت محتوا و سیستم'],
    articles: ['مقالات', 'مدیریت مقالات و محتوا'],
    tools: ['ابزارها', 'مدیریت ابزارها و برنامه‌ها'],
    files: ['فایل‌ها', 'مدیریت و آپلود فایل'],
    templates: ['تمپلیت‌ها', 'استفاده از تمپلیت‌های آماده'],
    settings: ['تنظیمات', 'تنظیمات سیستم و محیط']
  };

  if (titles[tab]) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    if (pageTitle) pageTitle.textContent = titles[tab][0];
    if (pageSubtitle) pageSubtitle.textContent = titles[tab][1];
  }

  // Load data for specific tabs
  if (tab === 'dashboard') loadDashboard();
  if (tab === 'articles') loadArticles();
  if (tab === 'tools') loadTools();
  if (tab === 'templates') loadTemplates();
};

// Check System Status
async function checkSystemStatus() {
  try {
    const kvStatus = document.getElementById('kvStatus');
    const envStatus = document.getElementById('envStatus');

    if (kvStatus) kvStatus.textContent = 'فعال';
    if (envStatus) envStatus.textContent = 'فعال';
  } catch (error) {
    console.error('Error checking system status:', error);
  }
}

// Load Dashboard
async function loadDashboard() {
  try {
    console.log('Loading dashboard...');
    const articles = await getArticles();
    const tools = await getTools();

    const articlesCount = document.getElementById('articlesCount');
    const toolsCount = document.getElementById('toolsCount');

    if (articlesCount) articlesCount.textContent = articles.length;
    if (toolsCount) toolsCount.textContent = tools.length;

    // Recent activity
    const activities = [
      ...articles.slice(0, 3).map(a => ({
        icon: '📝',
        text: `مقاله "${a.title}" منتشر شد`,
        time: new Date(a.date).toLocaleDateString('fa-IR')
      })),
      ...tools.slice(0, 2).map(t => ({
        icon: '🔧',
        text: `ابزار "${t.name}" اضافه شد`,
        time: new Date().toLocaleDateString('fa-IR')
      }))
    ];

    const activityHTML = activities.map(a => `
      <div class="activity-item">
        <div class="activity-icon">${a.icon}</div>
        <div class="activity-content">
          <p>${a.text}</p>
          <span class="activity-time">${a.time}</span>
        </div>
      </div>
    `).join('');

    const recentActivity = document.getElementById('recentActivity');
    if (recentActivity) {
      recentActivity.innerHTML = activityHTML || '<p style="color: var(--admin-muted); text-align: center;">فعالیتی وجود ندارد</p>';
    }
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

// Articles Management
document.getElementById('articleForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const articleData = {
    title: document.getElementById('articleTitle').value,
    excerpt: document.getElementById('articleExcerpt').value,
    content: document.getElementById('articleContent').value,
    category: document.getElementById('articleCategory').value,
    author: document.getElementById('articleAuthor').value,
    tags: document.getElementById('articleTags').value.split(',').map(t => t.trim()).filter(t => t),
    image: document.getElementById('articleImage').value,
    published: document.getElementById('articlePublished').checked
  };

  try {
    await createArticle(articleData);
    showAlert('articleAlert', 'مقاله با موفقیت منتشر شد!', 'success');
    document.getElementById('articleForm').reset();
    loadArticles();
    loadDashboard();
  } catch (error) {
    showAlert('articleAlert', 'خطا در انتشار مقاله', 'error');
    console.error('Error creating article:', error);
  }
});

async function loadArticles() {
  try {
    const articles = await getArticles();
    const container = document.getElementById('articlesList');
    const totalEl = document.getElementById('articlesTotal');

    if (totalEl) totalEl.textContent = articles.length;

    if (!container) return;

    if (articles.length === 0) {
      container.innerHTML = '<p style="color: var(--admin-muted); text-align: center;">هیچ مقاله‌ای وجود ندارد</p>';
      return;
    }

    container.innerHTML = articles.map(article => `
      <div class="item-card">
        <div class="item-info">
          <h4>${article.title}</h4>
          <p>${new Date(article.date).toLocaleDateString('fa-IR')} • ${article.category} • ${article.views || 0} بازدید</p>
        </div>
        <div class="item-actions">
          <button class="btn btn-sm btn-ghost" onclick="viewArticle('${article.id}')">مشاهده</button>
          <button class="btn btn-sm btn-ghost" onclick="deleteArticleConfirm('${article.id}')">حذف</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading articles:', error);
  }
}

window.viewArticle = function(id) {
  window.open(`/article/${id}`, '_blank');
};

window.deleteArticleConfirm = async function(id) {
  if (confirm('آیا مطمئن هستید که می‌خواهید این مقاله را حذف کنید؟')) {
    try {
      await deleteArticle(id);
      showAlert('articleAlert', 'مقاله حذف شد', 'success');
      loadArticles();
      loadDashboard();
    } catch (error) {
      showAlert('articleAlert', 'خطا در حذف مقاله', 'error');
    }
  }
};

// Tools Management
async function loadTools() {
  try {
    const tools = await getTools();
    const container = document.getElementById('toolsList');
    const totalEl = document.getElementById('toolsTotal');

    if (totalEl) totalEl.textContent = tools.length;

    if (!container) return;

    if (tools.length === 0) {
      container.innerHTML = '<p style="color: var(--admin-muted); text-align: center;">هیچ ابزاری وجود ندارد</p>';
      return;
    }

    container.innerHTML = tools.map(tool => `
      <div class="item-card">
        <div class="item-info">
          <h4>${tool.icon || '🔧'} ${tool.name}</h4>
          <p>${tool.category}</p>
        </div>
        <div class="item-actions">
          <button class="btn btn-sm btn-ghost" onclick="deleteTool('${tool.id}')">حذف</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading tools:', error);
  }
}

async function getTools() {
  try {
    const response = await fetch('/data/tools.json');
    if (!response.ok) throw new Error('Failed to fetch tools');
    const data = await response.json();
    return data.tools || [];
  } catch (error) {
    console.error('Error loading tools:', error);
    return [];
  }
}

// Templates
function loadTemplates() {
  const container = document.getElementById('templatesGrid');
  if (!container) return;

  const allTemplates = [
    ...templates.articles.map(t => ({...t, type: 'article'})),
    ...templates.tools.map(t => ({...t, type: 'tool'}))
  ];

  container.innerHTML = allTemplates.map((template, index) => `
    <div class="template-card" onclick="applyTemplate('${template.type}', ${index})">
      <div class="template-header">
        <div class="template-icon">${template.icon}</div>
        <h3>${template.title}</h3>
      </div>
      <p>${template.description}</p>
      <div class="template-tags">
        ${template.tags.map(tag => `<span class="template-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

window.applyTemplate = function(type, index) {
  const template = type === 'article' ? templates.articles[index] : templates.tools[index];

  if (type === 'article') {
    document.getElementById('articleTitle').value = template.content.title;
    document.getElementById('articleExcerpt').value = template.content.excerpt;
    document.getElementById('articleContent').value = template.content.content;
    document.getElementById('articleCategory').value = template.content.category;
    document.getElementById('articleTags').value = template.content.tags;
    switchTab('articles');
  }

  showAlert(type === 'article' ? 'articleAlert' : 'toolAlert', 'تمپلیت اعمال شد!', 'success');
};

window.refreshData = function() {
  const icon = document.getElementById('refreshIcon');
  if (icon) {
    icon.style.animation = 'spin 1s linear';
    setTimeout(() => icon.style.animation = '', 1000);
  }

  loadDashboard();
  loadArticles();
  loadTools();
  checkSystemStatus();
};

// Helper function
function showAlert(elementId, message, type) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => element.innerHTML = '', 5000);
  }
}

// Initialize when page loads
console.log('Admin script loading...');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAuth);
} else {
  checkAuth();
}

console.log('Admin script loaded');