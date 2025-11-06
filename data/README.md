
# ساختار داده‌های ابزارستان

## پوشه مقالات (articles/)

هر مقاله در قالب یک فایل HTML جداگانه ذخیره می‌شود با نام `article-{ID}.html`.

### ساختار مقاله HTML:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عنوان مقاله - ابزارستان</title>
    <link rel="stylesheet" href="../../css/main.css">
    <link rel="stylesheet" href="../../css/article.css">
    <link rel="stylesheet" href="../../css/article-template.css">
</head>
<body class="article-template">
    <article 
        data-id="شناسه_مقاله" 
        data-category="دسته‌بندی" 
        data-author="نام_نویسنده" 
        data-date="تاریخ_انتشار" 
        data-reading-time="زمان_مطالعه_به_دقیقه"
        data-excerpt="خلاصه_مقاله"
        data-tags="تگ1,تگ2,تگ3"
        data-featured="true/false"
    >
        <header class="article-meta">
            <h1>عنوان مقاله</h1>
            <div class="article-image" style="background: linear-gradient(...);">🔄</div>
        </header>

        <main class="article-body">
            <!-- محتوای مقاله -->
        </main>
    </article>
</body>
</html>
```

### ویژگی‌های مهم:

- **data-id**: شناسه منحصر به فرد مقاله
- **data-category**: دسته‌بندی مقاله
- **data-author**: نام نویسنده
- **data-date**: تاریخ انتشار به فرمت شمسی
- **data-reading-time**: زمان تخمینی مطالعه (دقیقه)
- **data-excerpt**: خلاصه کوتاه مقاله
- **data-tags**: تگ‌های مقاله جدا شده با کاما
- **data-featured**: آیا مقاله ویژه است؟

### نحوه اضافه کردن مقاله جدید:

1. فایل `article-{ID}.html` در پوشه `data/articles/` ایجاد کنید
2. ساختار HTML مطابق نمونه بالا استفاده کنید
3. تمامی attribute های data- را تکمیل کنید
4. محتوای مقاله را در تگ `main` قرار دهید

### استایل‌دهی:

- از تگ‌های HTML استاندارد استفاده کنید
- برای تصاویر از emoji یا آیکون در `.article-image` استفاده کنید
- CSS خودکار اعمال می‌شود
