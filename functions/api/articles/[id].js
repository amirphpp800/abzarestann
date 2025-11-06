
// Cloudflare Pages API for Articles
// GET /api/articles/:id - Get single article
// POST /api/articles/:id/like - Like article
// POST /api/articles/:id/views - Increment views

export async function onRequestGet({ params, env }) {
    const articleId = params.id;
    
    try {
        // Get article from KV storage
        const article = await env.DB.get(`article:${articleId}`, 'json');
        
        if (!article) {
            return new Response(JSON.stringify({ error: 'Article not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        return new Response(JSON.stringify(article), {
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

export async function onRequestPost({ params, env, request }) {
    const articleId = params.id;
    const url = new URL(request.url);
    
    try {
        // Handle different POST endpoints
        if (url.pathname.endsWith('/like')) {
            return await handleLike(articleId, env);
        } else if (url.pathname.endsWith('/views')) {
            return await handleViews(articleId, env);
        }
        
        return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
            status: 400,
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

async function handleLike(articleId, env) {
    try {
        // Get current likes count
        const currentLikes = await env.DB.get(`article:${articleId}:likes`) || '0';
        const newLikes = parseInt(currentLikes) + 1;
        
        // Update likes count
        await env.DB.put(`article:${articleId}:likes`, newLikes.toString());
        
        // Update article stats
        const article = await env.DB.get(`article:${articleId}`, 'json');
        if (article) {
            article.likes = newLikes;
            await env.DB.put(`article:${articleId}`, JSON.stringify(article));
        }
        
        return new Response(JSON.stringify({ likes: newLikes }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        throw error;
    }
}

async function handleViews(articleId, env) {
    try {
        // Get current views count
        const currentViews = await env.DB.get(`article:${articleId}:views`) || '0';
        const newViews = parseInt(currentViews) + 1;
        
        // Update views count
        await env.DB.put(`article:${articleId}:views`, newViews.toString());
        
        // Update article stats
        const article = await env.DB.get(`article:${articleId}`, 'json');
        if (article) {
            article.views = newViews;
            await env.DB.put(`article:${articleId}`, JSON.stringify(article));
        }
        
        return new Response(JSON.stringify({ views: newViews }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        throw error;
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
