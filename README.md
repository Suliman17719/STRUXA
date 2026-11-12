# STRUXA — web app package / حزمة التطبيق

**EN** — Static site, no server needed. Upload this whole folder to any HTTPS static host:
Netlify (drag the folder onto app.netlify.com/drop), GitHub Pages, Cloudflare Pages, Vercel. Then open the address on a phone or PC and choose
*Install app* / *Add to Home Screen*. The icon is the STRUXA logo. Works offline after the first visit.
To release a new version, replace `index.html` and change `V='struxa-v1'` in `sw.js` to `struxa-v2`.

**AR** — موقع ثابت لا يحتاج خادماً. ارفع المجلد كاملاً على أي استضافة ثابتة بـ HTTPS (مثل Netlify بالسحب والإفلات أو GitHub Pages)،
ثم افتح الرابط من الهاتف أو الحاسوب واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية». أيقونة الاختصار هي شعار STRUXA، ويعمل بدون إنترنت بعد أول زيارة.
عند إصدار نسخة جديدة استبدل `index.html` وغيّر `struxa-v1` إلى `struxa-v2` داخل `sw.js`.

Files: index.html · manifest.webmanifest · sw.js · icons/ (192, 512, maskable-512, apple-touch-icon 180, favicon).
