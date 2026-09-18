# ربط MathProf DZ بـ Supabase

## 1) تطبيق قاعدة البيانات
افتح Supabase > SQL Editor، ثم انسخ محتوى `server/schema.sql` بالكامل وشغّله.

## 2) Authentication
من Supabase > Authentication > Providers تأكد أن Email مفعّل.
إذا كان Confirm email مفعّلًا، يجب على الأستاذ تأكيد البريد قبل أول دخول.

## 3) Redirect URLs
في Authentication > URL Configuration أضف عنوان المنصة المنشور، مثل:
https://YOUR-DOMAIN/

وللاختبار المحلي:
http://localhost:3000/

## 4) التشغيل
من مجلد المشروع:
npm install
npm start

ثم افتح /login.html.

## 5) ملاحظة أمنية
الـpublishable key موجود في `public/supabase-config.js` لأنه مفتاح عميل. الحماية الحقيقية تعتمد على RLS.
لا تضع Service Role Key في `public/` أو Git.

## 6) اختبار إلزامي
- أنشئ حساب أستاذ.
- أكد البريد إذا كان التأكيد مفعلًا.
- سجّل الدخول.
- احفظ الملف المهني.
- افتح SQL Editor وتحقق من وجود الصف في professional_profiles.
- أنشئ مستخدمًا ثانيًا وحاول قراءة ملف المستخدم الأول؛ يجب أن يمنع RLS ذلك.
