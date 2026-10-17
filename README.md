# Products Page — Task 3

مشروع كامل بيحقق كل متطلبات التاسك: React Query + shadcn/ui + Tailwind CSS.

## 🚀 طريقة التشغيل

```bash
npm install
npm run dev
```

بعدين افتحي `http://localhost:3000`

> ملاحظة: مكونات `Card` / `Button` / `Input` في `components/ui/` متكتوبة يدويًا بنفس ستايل shadcn/ui
> (عشان المشروع يشتغل فورًا من غير CLI). لو عايزة تستخدمي shadcn CLI الرسمي بدلها:
> ```bash
> npx shadcn@latest init
> npx shadcn@latest add card button input
> ```

## 📁 هيكل المشروع وعلاقته بالمتطلبات

| الملف | بيعمل ايه |
|---|---|
| `lib/api.ts` | دالتين نظيفتين: `fetchProducts` و `fetchProductById` — كل الـ fetch من هنا بس |
| `lib/useProducts.ts` | الـ `useQuery` لصفحة الليستنج، الـ `queryKey` فيه `search` و `skip` و `limit` عشان الكاش يتغير مع كل حالة |
| `lib/useProduct.ts` | الـ `useQuery` لصفحة التفاصيل بالـ ID |
| `app/providers.tsx` | الـ `QueryClientProvider` اللي بيلف التطبيق كله |
| `app/page.tsx` | صفحة الـ Products: فيها الـ title + search + grid + pagination + كل الحالات (loading/error/empty) |
| `app/products/[id]/page.tsx` | صفحة تفاصيل المنتج، بتاخد الـ id من الـ URL |
| `components/ProductCard.tsx` | الكارت بيستخدم `Card` من shadcn ويعرض صورة/عنوان/سعر/تقييم/زرار التفاصيل |
| `components/SearchBar.tsx` | input البحث (مربوط بالـ debounce) |
| `components/Pagination.tsx` | أزرار Next/Prev بتغيّر الـ `skip` بس (مفيش تحميل كل المنتجات) |
| `components/ProductGridStates.tsx` | skeleton loading + error state + empty state |
| `lib/useDebouncedValue.ts` | تأخير بسيط (400ms) قبل ما البحث يبعت request جديد — ده الاستخدام الوحيد المسموح لـ useEffect وهو UI-only مش data fetching |

## ✅ إزاي المشروع التزم بالممنوعات

- **مفيش** `fetch` جوه `useEffect` في أي component — كل الـ fetching من خلال `useQuery` في `lib/`.
- **مفيش** تخزين نتيجة الـ API في `useState` — البيانات بترجع مباشرة من `useProducts()`/`useProduct()`.
- **مفيش** كروت hard-coded — كل كارت جاي من `data.products.map(...)`.
- **الـ Pagination** شغالة بـ `limit` و `skip` فعليًا في الـ API request نفسه، مش slicing محلي لقائمة كاملة.

## 📦 الخطوة الجاية (التسليم)

```bash
git init
git add .
git commit -m "Task 3: Products page with React Query + shadcn/ui"
git branch -M main
git remote add origin <رابط الريبو بتاعك>
git push -u origin main
```

وبعدين افتحي Pull Request من الريبو.
