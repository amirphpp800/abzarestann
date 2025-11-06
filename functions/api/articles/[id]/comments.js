
// Article Comments API
// GET /api/articles/:id/comments - Get comments for article
// POST /api/articles/:id/comments - Add new comment

export async function onRequestGet({ params, env }) {
    const articleId = params.id;
    
    try {
        // Get comments from KV storage
        const comments = await env.DB.get(`article:${articleId}:comments`, 'json') || [];
        
        // Sort comments by date (newest first)
        comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        return new Response(JSON.stringify(comments), {
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
    
    try {
        const body = await request.json();
        const { text, author } = body;
        
        if (!text || text.trim().length === 0) {
            return new Response(JSON.stringify({ error: 'Comment text is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Get existing comments
        const comments = await env.DB.get(`article:${articleId}:comments`, 'json') || [];
        
        // Create new comment
        const newComment = {
            id: Date.now(),
            text: text.trim(),
            author: author || 'کاربر مهمان',
            timestamp: new Date().toISOString(),
            date: new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date())
        };
        
        // Add to comments array
        comments.unshift(newComment);
        
        // Keep only last 100 comments to prevent storage issues
        if (comments.length > 100) {
            comments.splice(100);
        }
        
        // Save back to KV
        await env.DB.put(`article:${articleId}:comments`, JSON.stringify(comments));
        
        // Update comment count in article
        const article = await env.DB.get(`article:${articleId}`, 'json');
        if (article) {
            article.comments = comments.length;
            await env.DB.put(`article:${articleId}`, JSON.stringify(article));
        }
        
        return new Response(JSON.stringify(newComment), {
            status: 201,
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
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
