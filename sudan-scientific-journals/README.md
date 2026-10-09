# Sudan Scientific Journals (SSJ)

دليل وفهرسة المجلات العلمية السودانية — بحث عن المجلات حسب الدولة والجامعة والتخصص، مع لوحة تحكم إدارية كاملة.

## الحالة الحالية

هذا المستودع يُبنى على مراحل (Phases). المكتمل حاليًا:

- **Phase 1 — Project Setup**: Vite + React + TypeScript + Tailwind + ESLint + Prettier + React Router + TanStack Query + Supabase client + هيكل المجلدات + إعداد البيئة (`.env.example`).
- **Phase 2 — Core Architecture**: أنواع قاعدة البيانات (`src/types/database.ts`)، معمارية المصادقة (Supabase Auth) عبر `features/auth`، `ProtectedRoute` و`AdminRoute`، وربط كل ذلك بـ `App.tsx` والراوتر.

المراحل القادمة (لم تُبنَ بعد): Countries/Universities/Journals CRUD، محرك البحث، الصفحات العامة الكاملة، لوحة تحكم الأدمن، RLS وStorage Policies، PWA/SEO/Performance.

## المتطلبات

- Node.js 20+
- حساب Supabase (مشروع جديد)

## الإعداد

```bash
npm install
cp .env.example .env
# املأ VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY من إعدادات مشروعك في Supabase
npm run dev
```

## أوامر مفيدة

| الأمر              | الوصف                          |
| ------------------ | ------------------------------- |
| `npm run dev`       | تشغيل بيئة التطوير              |
| `npm run build`     | فحص الأنواع ثم بناء الإنتاج     |
| `npm run typecheck` | فحص TypeScript فقط              |
| `npm run lint`      | فحص ESLint                      |
| `npm run format`    | تنسيق الكود عبر Prettier        |

## ملاحظات أمنية مهمة

- **لا يوجد Service Role Key في الواجهة الأمامية إطلاقًا** — فقط الـ anon key العام.
- الحماية الحقيقية للبيانات تعتمد على **Row Level Security** داخل PostgreSQL (تُبنى في Phase 7)، وليس فقط على إخفاء أزرار الأدمن في الواجهة.
- `ProtectedRoute` و`AdminRoute` الحاليان هما طبقة UX فقط، لا يُعتمد عليهما كحماية وحيدة.

## بنية المشروع

راجع تعليقات كل مجلد؛ البنية العامة:

```
src/
  app/          # تركيب التطبيق: Providers, Router, Routes
  components/   # مكونات عامة قابلة لإعادة الاستخدام
  features/     # كل ميزة (auth, countries, universities, journals, search, users) بمنطقها الخاص
  pages/        # صفحات public / auth / admin
  layouts/      # أغلفة الصفحات (Public/Auth/Admin)
  hooks/        # هوكس عامة
  lib/          # Supabase client, React Query client, utils, constants
  types/        # أنواع TypeScript المشتركة (database, auth, common)
  i18n/         # الترجمة العربية/الإنجليزية
  config/       # قراءة متغيرات البيئة والتحقق منها
supabase/
  migrations/   # سيتم إضافتها بدءًا من Phase 3
  seed.sql
```
