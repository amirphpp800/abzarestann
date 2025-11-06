
// Articles List API
// GET /api/articles - Get all articles with pagination

export async function onRequestGet({ env, request }) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    
    try {
        // Get articles list from KV
        let articlesList = await env.DB.get('articles:list', 'json') || [];
        
        // Filter by category if specified
        if (category) {
            articlesList = articlesList.filter(article => 
                article.category && article.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        // Filter by search query if specified
        if (search) {
            const searchLower = search.toLowerCase();
            articlesList = articlesList.filter(article => 
                (article.title && article.title.toLowerCase().includes(searchLower)) ||
                (article.excerpt && article.excerpt.toLowerCase().includes(searchLower)) ||
                (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        }
        
        // Calculate pagination
        const total = articlesList.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const articles = articlesList.slice(startIndex, endIndex);
        
        // Get full article data for each article in the current page
        const fullArticles = await Promise.all(
            articles.map(async (article) => {
                try {
                    const fullArticle = await env.DB.get(`article:${article.id}`, 'json');
                    return fullArticle || article;
                } catch (error) {
                    return article; // Fallback to basic data if full article fails
                }
            })
        );
        
        return new Response(JSON.stringify({
            articles: fullArticles,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
