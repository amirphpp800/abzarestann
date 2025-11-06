
// Admin API to initialize sample data
// POST /api/admin/init - Initialize sample articles in KV storage

export async function onRequestPost({ env }) {
    try {
        // Sample articles data
        const sampleArticles = [
            {
                id: '1',
                title: 'کنترل به جای نوآوری: روایت توسعه نامتوازن هوش مصنوعی در ایران از اسناد ملی تا ابزارهای نظارتی',
                excerpt: 'جمهوری اسلامی ایران طی سال‌های اخیر استفاده از فناوری‌های نوین برای کنترل جامعه را به صورت سیستماتیک توسعه داده است.',
                content: `
                    <h2 id="intro">مقدمه</h2>
                    <p>جمهوری اسلامی ایران طی سال‌های اخیر استفاده از فناوری‌های نوین برای کنترل جامعه را به صورت سیستماتیک توسعه داده است. این مقاله به بررسی نحوه‌ای می‌پردازد که توسعه هوش مصنوعی در ایران صرفاً در جهت تأمین نیازهای نظارتی و کنترلی حاکمیت پیش رفته است.</p>
                    
                    <p>در شرایط کنونی که توسعه هوش مصنوعی در جهان به سمت بهبود زندگی شهروندان و ارتقای خدمات عمومی حرکت کرده، در ایران این فناوری‌ها عمدتاً برای محدود کردن آزادی‌های شهروندان و کنترل اجتماعی به کار گرفته می‌شوند.</p>

                    <h2 id="content">محتوای اصلی</h2>
                    <h3>سیاست‌گذاری هوش مصنوعی در ایران</h3>
                    <p>بررسی اسناد بالادستی نشان می‌دهد که رویکرد حاکمیت نسبت به هوش مصنوعی دوگانه است. از یک سو در اسناد رسمی، توسعه هوش مصنوعی به عنوان ابزاری برای پیشرفت اقتصادی و علمی معرفی می‌شود، اما در عمل، بودجه‌ها و منابع عمدتاً صرف پروژه‌های نظارتی و امنیتی می‌شوند.</p>

                    <blockquote>
                    این رویکرد باعث شده است که ایران در زمینه کاربردهای مدنی و تجاری هوش مصنوعی عقب بماند و تنها در حوزه‌های نظارتی پیشرفت کند.
                    </blockquote>

                    <h3>ابزارهای نظارتی مبتنی بر هوش مصنوعی</h3>
                    <p>نمونه‌هایی از استفاده نظارتی از هوش مصنوعی در ایران شامل موارد زیر است:</p>
                    
                    <ul>
                        <li>سیستم‌های تشخیص چهره برای کنترل حجاب</li>
                        <li>ابزارهای تحلیل متن برای نظارت بر شبکه‌های اجتماعی</li>
                        <li>سیستم‌های تشخیص الگو برای شناسایی رفتارهای "مشکوک"</li>
                        <li>پردازش داده‌های ترافیکی برای ردیابی تحرکات شهروندان</li>
                    </ul>

                    <h2 id="conclusion">نتیجه‌گیری</h2>
                    <p>توسعه هوش مصنوعی در ایران نمونه‌ای از نحوه استفاده ابزاری از فناوری برای تقویت ساختارهای قدرت موجود است. این رویکرد نه تنها مانع رشد اقتصادی و علمی کشور شده، بلکه باعث عمیق‌تر شدن شکاف دیجیتال بین ایران و جهان شده است.</p>
                `,
                date: '۱۵ مهر ۱۴۰۳',
                category: 'تکنولوژی',
                views: 1250,
                likes: 45,
                comments: 12,
                tags: ['هوش مصنوعی', 'سیاست', 'فناوری', 'ایران'],
                readingTime: 8,
                author: 'تیم تحلیلی ابزارستان',
                featuredImage: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                featured: true
            },
            {
                id: '2',
                title: 'آینده طراحی وب در عصر هوش مصنوعی',
                excerpt: 'بررسی تأثیرات هوش مصنوعی بر صنعت طراحی وب و چگونگی تطبیق با تکنولوژی‌های جدید',
                content: `
                    <h2>مقدمه</h2>
                    <p>هوش مصنوعی به سرعت در حال تغییر چهره صنعت طراحی وب است. از ابزارهای خودکار تولید کد تا سیستم‌های پیشنهادی کاربری، AI تمام جنبه‌های توسعه وب را تحت تأثیر قرار داده است.</p>
                    
                    <h2>تأثیرات فعلی</h2>
                    <p>در حال حاضر شاهد ظهور ابزارهایی مانند GitHub Copilot، ChatGPT و Adobe Sensei هستیم که کار طراحان و توسعه‌دهندگان را دگرگون کرده‌اند.</p>
                    
                    <h2>چشم‌انداز آینده</h2>
                    <p>انتظار می‌رود که در آینده نزدیک، طراحی وب کاملاً شخصی‌سازی شده و بر اساس رفتار کاربران به صورت real-time تنظیم شود.</p>
                `,
                date: '۱۰ مهر ۱۴۰۳',
                category: 'طراحی وب',
                views: 890,
                likes: 32,
                comments: 8,
                tags: ['هوش مصنوعی', 'طراحی وب', 'فناوری'],
                readingTime: 6,
                author: 'سارا احمدی',
                featuredImage: 'linear-gradient(135deg, #667eea, #764ba2)'
            },
            {
                id: '3',
                title: 'امنیت سایبری در عصر دیجیتال',
                excerpt: 'راهنمای جامع برای محافظت از داده‌های شخصی و تجاری در فضای دیجیتال',
                content: `
                    <h2>اهمیت امنیت سایبری</h2>
                    <p>با رشد روزافزون استفاده از اینترنت و خدمات آنلاین، امنیت سایبری تبدیل به یکی از مهم‌ترین دغدغه‌های کاربران و سازمان‌ها شده است.</p>
                    
                    <h2>تهدیدات رایج</h2>
                    <ul>
                        <li>حملات فیشینگ</li>
                        <li>ویروس‌ها و بدافزارها</li>
                        <li>نفوذ به سیستم‌ها</li>
                        <li>سرقت اطلاعات</li>
                    </ul>
                    
                    <h2>راه‌های مقابله</h2>
                    <p>استفاده از رمزهای قوی، به‌روزرسانی مداوم نرم‌افزارها، و آگاهی از تهدیدات رایج از مهم‌ترین راه‌های مقابله محسوب می‌شوند.</p>
                `,
                date: '۵ مهر ۱۴۰۳',
                category: 'امنیت',
                views: 654,
                likes: 28,
                comments: 15,
                tags: ['امنیت', 'سایبری', 'حفاظت از داده'],
                readingTime: 4,
                author: 'احمد محمدی',
                featuredImage: 'linear-gradient(135deg, #f093fb, #f5576c)'
            }
        ];
        
        // Save each article
        const promises = sampleArticles.map(async (article) => {
            await env.DB.put(`article:${article.id}`, JSON.stringify(article));
            return {
                id: article.id,
                title: article.title,
                excerpt: article.excerpt,
                category: article.category,
                date: article.date,
                featured: article.featured || false
            };
        });
        
        const articlesList = await Promise.all(promises);
        
        // Save articles list
        await env.DB.put('articles:list', JSON.stringify(articlesList));
        
        // Initialize some sample comments
        const sampleComments = [
            {
                id: 1,
                text: 'مقاله بسیار جامع و مفیدی بود. متشکرم از نویسنده.',
                author: 'علی احمدی',
                timestamp: new Date().toISOString(),
                date: '۱۶ مهر ۱۴۰۳'
            },
            {
                id: 2,
                text: 'نکات مطرح شده در این مقاله قابل تأمل است و باید بیشتر به این موضوعات توجه کرد.',
                author: 'مریم حسینی',
                timestamp: new Date().toISOString(),
                date: '۱۶ مهر ۱۴۰۳'
            }
        ];
        
        await env.DB.put('article:1:comments', JSON.stringify(sampleComments));
        
        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Sample data initialized successfully',
            articlesCount: sampleArticles.length 
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: 'Failed to initialize data',
            details: error.message 
        }), {
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
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
