
// API Client for frontend

class APIClient {
    constructor() {
        this.baseURL = window.location.origin;
    }
    
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}/api${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    }
    
    async post(endpoint, data = null) {
        try {
            const response = await fetch(`${this.baseURL}/api${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : null
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    }
    
    // Articles endpoints
    async getArticles(page = 1, limit = 10, category = null, search = null) {
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('limit', limit);
        if (category) params.set('category', category);
        if (search) params.set('search', search);
        
        return this.get(`/articles?${params}`);
    }
    
    async getArticle(id) {
        return this.get(`/articles/${id}`);
    }
    
    async likeArticle(id) {
        return this.post(`/articles/${id}/like`);
    }
    
    async incrementViews(id) {
        return this.post(`/articles/${id}/views`);
    }
    
    async getRelatedArticles(category, excludeId, limit = 3) {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (excludeId) params.set('exclude', excludeId);
        params.set('limit', limit);
        
        return this.get(`/articles/related?${params}`);
    }
    
    // Comments endpoints
    async getComments(articleId) {
        return this.get(`/articles/${articleId}/comments`);
    }
    
    async addComment(articleId, text, author = 'کاربر مهمان') {
        return this.post(`/articles/${articleId}/comments`, { text, author });
    }
    
    // Initialize sample data (admin function)
    async initializeData() {
        return this.post('/admin/init');
    }
}

// Create global API client instance
const api = new APIClient();

// Make it globally available
window.api = api;
