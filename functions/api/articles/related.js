
// Related Articles API
// GET /api/articles/related?category=...&exclude=...

export async function onRequestGet({ env, request }) {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const excludeId = url.searchParams.get('exclude');
    const limit = parseInt(url.searchParams.get('limit')) || 3;
    
    try {
        // Get articles list from KV
        let articlesList = await env.DB.get('articles:list', 'json') || [];
        
        // Filter by category and exclude current article
        let relatedArticles = articlesList.filter(article => {
            if (article.id === excludeId) return false;
            if (category && article.category !== category) return false;
            return true;
        });
        
        // If no articles in same category, get random articles
        if (relatedArticles.length === 0) {
            relatedArticles = articlesList.filter(article => article.id !== excludeId);
        }
        
        // Shuffle and limit results
        relatedArticles = shuffleArray(relatedArticles).slice(0, limit);
        
        // Get full article data
        const fullRelatedArticles = await Promise.all(
            relatedArticles.map(async (article) => {
                try {
                    const fullArticle = await env.DB.get(`article:${article.id}`, 'json');
                    return {
                        id: fullArticle.id,
                        title: fullArticle.title,
                        excerpt: fullArticle.excerpt,
                        category: fullArticle.category,
                        date: fullArticle.date,
                        views: fullArticle.views || 0,
                        readingTime: fullArticle.readingTime || 5
                    };
                } catch (error) {
                    return {
                        id: article.id,
                        title: article.title,
                        excerpt: article.excerpt,
                        category: article.category,
                        date: article.date
                    };
                }
            })
        );
        
        return new Response(JSON.stringify(fullRelatedArticles), {
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

// Helper function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
