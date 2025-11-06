// API Module
// ماژول مدیریت API calls

const API_BASE = '';

// Get all articles
export async function getArticles() {
  try {
    // Try localStorage first (for admin edits)
    const cached = localStorage.getItem('articles');
    if (cached) {
      const data = JSON.parse(cached);
      return data.articles || [];
    }

    // Fallback to static JSON file
    const response = await fetch('/data/articles.json');
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Create article (simulate API)
export async function createArticle(articleData) {
  try {
    // Get existing articles
    const articles = await getArticles();

    // Generate unique ID
    const id = generateSlug(articleData.title);

    // Create new article
    const newArticle = {
      id,
      slug: id,
      ...articleData,
      date: new Date().toISOString(),
      views: 0
    };

    // Add to beginning of array
    articles.unshift(newArticle);

    // Save to localStorage
    localStorage.setItem('articles', JSON.stringify({ articles }));

    return { success: true, id };
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
}

// Delete article (simulate API)
export async function deleteArticle(id) {
  try {
    const articles = await getArticles();
    const filtered = articles.filter(a => a.id !== id);

    localStorage.setItem('articles', JSON.stringify({ articles: filtered }));

    return { success: true };
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}

// Generate slug from Persian title
function generateSlug(title) {
  const persianToEnglish = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch',
    'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh',
    'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a',
    'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm',
    'ن': 'n', 'و': 'v', 'ه': 'h', 'ی': 'y', ' ': '-', '؛': '', '،': ''
  };

  let slug = title.toLowerCase();
  for (let [persian, english] of Object.entries(persianToEnglish)) {
    slug = slug.split(persian).join(english);
  }

  slug = slug.replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
  return slug + '-' + Date.now();
}

// Get tools
export async function getTools() {
  try {
    const response = await fetch('/data/tools.json');
    if (!response.ok) {
      throw new Error('Failed to fetch tools');
    }
    const data = await response.json();
    return data.tools || [];
  } catch (error) {
    console.error('Error loading tools:', error);
    return [];
  }
}