import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Building2,
  GraduationCap,
  Globe,
  CheckCircle2,
  ArrowLeft,
  FileCheck,
  Share2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLatestJournals, useJournalStats } from '@features/journals/hooks/useJournals';
import { JournalCard } from '@features/journals/components/JournalCard';

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch latest journals from Supabase (or fallback mock data)
  const { data: latestJournals = [], isLoading: isLoadingJournals } = useLatestJournals(6);
  const { data: stats } = useJournalStats();

  function handleHeroSearch(e: FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/journals?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/journals');
    }
  }

  const specializations = [
    {
      name: 'العلوم الطبية والصحية',
      desc: 'الطب البشري، طب الأسنان، الصيدلة، والصحة العامة',
      icon: BookOpen,
      color: 'from-blue-600 to-cyan-700',
    },
    {
      name: 'الهندسة والتقنية',
      desc: 'الهندسة المدنية، الميكانيكية، الكهربائية والتقنيات الحديثة',
      icon: Layers,
      color: 'from-emerald-600 to-teal-700',
    },
    {
      name: 'العلوم الزراعية والبيطرية',
      desc: 'الإنتاج الحيواني والنباتي، سلامة الغذاء والموارد الطبيعية',
      icon: FileCheck,
      color: 'from-amber-600 to-orange-700',
    },
    {
      name: 'العلوم الأساسية والتطبيقية',
      desc: 'الفيزياء، الكيمياء، الرياضيات، علوم الأرض والبيولوجيا',
      icon: Sparkles,
      color: 'from-indigo-600 to-violet-700',
    },
    {
      name: 'العلوم الإنسانية والاجتماعية',
      desc: 'اللغات، التاريخ، دراسات الهوية، والعلوم الاجتماعية والإنسانية',
      icon: GraduationCap,
      color: 'from-rose-600 to-pink-700',
    },
    {
      name: 'علوم الحاسوب والذكاء الاصطناعي',
      desc: 'البرمجيات، تعلم الآلة، نظم المعلومات والأمن السيبراني',
      icon: Globe,
      color: 'from-purple-600 to-indigo-700',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-850 text-white py-16 lg:py-24">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary-400 blur-3xl" />
        </div>

        <div className="container-app relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* National Platform Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-800/80 border border-primary-600/60 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur mb-6">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>المنصة الوطنية الموحدة للدوريات الأكاديمية والمجلات المحكمة</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              دليل وفهرسة المجلات العلمية السودانية
            </h1>

            {/* Short Objective / Mission Statement */}
            <p className="mt-5 text-base sm:text-lg text-primary-100 leading-relaxed max-w-3xl mx-auto font-normal">
              بوابة وطنية علمية متخصصة تهدف إلى حصر، أرشفة، وتوثيق المجلات والدوريات
              العلمية المحكمة الصادرة عن الجامعات والمراكز البحثية السودانية، وإتاحتها
              للباحثين والأكاديميين حول العالم وفق المعايير الدولية للنشر العلمي.
            </p>

            {/* Hero Quick Search Box */}
            <form onSubmit={handleHeroSearch} className="mt-8 max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute right-4 flex items-center text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم المجلة، التخصص، الجامعة، أو رقم ISSN..."
                  className="w-full rounded-2xl border-2 border-primary-600/80 bg-white py-4 pr-12 pl-32 text-gray-900 placeholder:text-gray-400 text-sm sm:text-base shadow-xl focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all"
                />
                <button
                  type="submit"
                  className="absolute left-2 rounded-xl bg-primary-800 hover:bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors"
                >
                  بحث الآن
                </button>
              </div>
            </form>

            {/* Quick Action Navigation Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/journals"
                className="btn-primary bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
              >
                <span>تصفح جميع المجلات</span>
                <ArrowLeft className="mr-2 h-4 w-4 icon-directional" />
              </Link>
              <Link
                to="/search"
                className="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium px-5 py-3 rounded-xl backdrop-blur transition-all"
              >
                <span>البحث المتقدم والفلاتر</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE METRICS & STATS BAR */}
      <section className="bg-white border-b border-gray-200 py-6 relative -mt-4 mx-4 sm:mx-8 lg:mx-auto max-w-6xl rounded-2xl shadow-md z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100 text-center">
          <div className="p-3 sm:p-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary-900">
              {stats?.totalJournals ?? 21}+
            </span>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">مجلة علمية محكمة</span>
          </div>
          <div className="p-3 sm:p-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary-900">
              {stats?.totalUniversities ?? 8}+
            </span>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">جامعات ومراكز بحثية</span>
          </div>
          <div className="p-3 sm:p-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary-900">
              {stats?.totalSpecializations ?? 6}+
            </span>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">تخصصات علمية رئيسية</span>
          </div>
          <div className="p-3 sm:p-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary-900">
              100%
            </span>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">وصول مفتوح ومجاني</span>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM PILLARS / OBJECTIVES */}
      <section className="py-16 bg-gray-50/70 border-b border-gray-200/80">
        <div className="container-app">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary-700">
              رسالة وأهداف المنصة
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              لماذا دليل المجلات العلمية السودانية؟
            </p>
            <p className="mt-3 text-sm text-gray-600">
              توفير مرجع موثوق لحفظ الإنتاج الفكري الوطني وربط الباحث السوداني بالمجتمع الأكاديمي الدولي.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 border-t-4 border-t-primary-700 hover:shadow-md transition-shadow">
              <div className="h-11 w-11 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                الأرشفة والتوثيق الرقمي
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                حفظ التراث العلمي والأبحاث المحكمة الصادرة عن كليات وجامعات السودان من الاندثار وتوثيقها وفق المعايير.
              </p>
            </div>

            <div className="card p-6 border-t-4 border-t-amber-600 hover:shadow-md transition-shadow">
              <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                إتاحة الوصول المفتوح
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                تسهيل الوصول الحر للأبحاث والدوريات بدون اشتراكات مدفوعة، دعماً للطلاب والباحثين في كل مكان.
              </p>
            </div>

            <div className="card p-6 border-t-4 border-t-emerald-600 hover:shadow-md transition-shadow">
              <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                الاعتمادية والترقيم الدولي
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                التأكد من الترقيم الدولي المعتمد (ISSN و e-ISSN) ومراجعة دوريات النشر ولجان التحكيم التخصصية.
              </p>
            </div>

            <div className="card p-6 border-t-4 border-t-blue-600 hover:shadow-md transition-shadow">
              <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                الربط المباشر مع المنصات
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                توفير روابط مباشرة للمواقع الرسمية للمجلات وبوابات التقديم وإدارة المخطوطات (OJS وغيرها).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LATEST / FEATURED JOURNALS SECTION */}
      <section className="py-16 bg-white">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-primary-800 font-semibold text-xs mb-1">
                <BookOpen className="h-4 w-4" />
                <span>أحدث الإضافات في الفهرس</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                أحدث المجلات والدوريات العلمية
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                دوريات علمية محكمة تابعة للجامعات السودانية والمؤسسات الأكاديمية
              </p>
            </div>

            <Link
              to="/journals"
              className="btn-secondary text-sm font-semibold py-2 px-4 text-primary-900 border-primary-300 hover:bg-primary-50 inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>عرض كافة المجلات ({stats?.totalJournals ?? 21})</span>
              <ArrowLeft className="h-4 w-4 icon-directional" />
            </Link>
          </div>

          {/* Journals Grid */}
          {isLoadingJournals ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-16 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJournals.map((journal) => (
                <JournalCard key={journal.id} journal={journal} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/journals"
              className="btn-primary text-sm font-semibold px-8 py-3 rounded-xl shadow"
            >
              <span>تصفح الفهرس الكامل للمجلات</span>
              <ArrowLeft className="mr-2 h-4 w-4 icon-directional" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE BY SPECIALIZATION */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-app">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary-700">
              التصنيف الموضوعي
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              استكشف المجلات حسب التخصص
            </p>
            <p className="mt-3 text-sm text-gray-600">
              اختر المجال العلمي للوصول السريع إلى الدوريات والمجلات المتخصصة فيه
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {specializations.map((spec) => {
              const Icon = spec.icon;
              return (
                <Link
                  key={spec.name}
                  to={`/journals?specialization=${encodeURIComponent(spec.name)}`}
                  className="card group p-5 hover:border-primary-500 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-900 group-hover:text-amber-400 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-primary-800 transition-colors">
                      {spec.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {spec.desc}
                    </p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-primary-800 transition-colors self-center icon-directional" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITIES HIGHLIGHT */}
      <section className="py-14 bg-white border-t border-gray-200">
        <div className="container-app">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="badge bg-primary-50 text-primary-800 border border-primary-200 mb-2">
              صروح أكاديمية رائدة
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              الجامعات والمؤسسات الصادرة عنها المجلات
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-4 flex items-center gap-3 bg-gray-50/60">
              <Building2 className="h-8 w-8 text-primary-700 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-gray-900">جامعة الخرطوم</h4>
                <p className="text-xs text-gray-500">تأسست 1902 • 3 دوريات مسجلة</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3 bg-gray-50/60">
              <Building2 className="h-8 w-8 text-primary-700 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-gray-900">جامعة السودان للعلوم والتكنولوجيا</h4>
                <p className="text-xs text-gray-500">العلوم التطبيقية • 3 دوريات مسجلة</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3 bg-gray-50/60">
              <Building2 className="h-8 w-8 text-primary-700 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-gray-900">جامعة الجزيرة</h4>
                <p className="text-xs text-gray-500">العلوم الصحية والزراعية</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3 bg-gray-50/60">
              <Building2 className="h-8 w-8 text-primary-700 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-gray-900">المراكز البحثية الوطنية</h4>
                <p className="text-xs text-gray-500">المركز القومي للبحوث • ودوريات أخرى</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION FOR EDITORS / UNIVERSITIES */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-950 text-white py-14">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              هل تصدر جامعتك أو كليتك مجلة علمية محكمة؟
            </h2>
            <p className="mt-3 text-sm text-primary-100 leading-relaxed">
              انضم إلى الفهرس الوطني الموحد للمجلات العلمية السودانية لتوسيع انتشار أبحاثكم
              الأكاديمية، وزيادة الاستشهادات المرجعية، وربط مجلتكم بقواعد البيانات الإقليمية والعالمية.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/auth/register"
                className="btn-primary bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-2.5 rounded-xl shadow-lg"
              >
                تسجيل مجلة جديدة
              </Link>
              <Link
                to="/journals"
                className="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 px-5 py-2.5 rounded-xl"
              >
                شروط ومعايير الفهرسة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
