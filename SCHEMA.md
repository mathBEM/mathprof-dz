# MathProf DZ — قاعدة البيانات المقترحة

## users
حساب الدخول فقط: id, email, status, created_at

## professional_profiles
بيانات الأستاذ المهنية: user_id, full_name, school_name, wilaya, directorate, subject, academic_year

## subscriptions
user_id, plan, status, starts_at, expires_at

## documents
id, owner_user_id, document_type, level, title, status, professional_profile_snapshot, created_at, updated_at

## document_versions
id, document_id, version_number, content, created_at

## document_items
id, document_id, item_type, position, payload

## lessons
id, level, title, curriculum_reference, status

## exercises
id, lesson_id, level, title, difficulty, statement, solution, points, status

## security_sessions
id, user_id, created_at, last_seen_at, revoked_at

> قاعدة مهمة: هوية الوثيقة تُثبت من الملف المهني وتُحفظ كلقطة داخل الوثيقة عند الإنشاء؛ محرر الوثيقة لا يغيرها.
