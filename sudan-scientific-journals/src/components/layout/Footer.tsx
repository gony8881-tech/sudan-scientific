import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Globe, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container-app py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About Platform */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800 text-amber-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-base font-bold text-white">
                  المجلات العلمية السودانية
                </span>
                <span className="block text-xs text-primary-400 font-sans">
                  Sudan Scientific Journals
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              منصة وطنية رائدة تهدف إلى حصر وأرشفة وفهرسة المجلات والدوريات العلمية
              المحكمة الصادرة عن الجامعات والمراكز البحثية السودانية، وتسهيل وصول
              الباحثين للأوراق العلمية الرصينة.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-primary-400 font-medium">
              <Shield className="h-4 w-4 text-amber-400" />
              <span>مفهرسة وفق معايير الترقيم الدولي (ISSN)</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4 border-r-2 border-primary-500 pr-2">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/journals" className="hover:text-amber-400 transition-colors">
                  دليل وتصفح المجلات
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-amber-400 transition-colors">
                  البحث والاستكشاف المتقدم
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-amber-400 transition-colors">
                  بوابة الباحثين والمحررين
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Disciplines */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4 border-r-2 border-primary-500 pr-2">
              التخصصات العلمية
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link
                  to="/journals?specialization=العلوم الطبية والصحية"
                  className="hover:text-amber-400 transition-colors"
                >
                  العلوم الطبية والصحية
                </Link>
              </li>
              <li>
                <Link
                  to="/journals?specialization=الهندسة والتقنية"
                  className="hover:text-amber-400 transition-colors"
                >
                  الهندسة والتقنية
                </Link>
              </li>
              <li>
                <Link
                  to="/journals?specialization=العلوم الزراعية والبيطرية"
                  className="hover:text-amber-400 transition-colors"
                >
                  العلوم الزراعية والبيطرية
                </Link>
              </li>
              <li>
                <Link
                  to="/journals?specialization=العلوم الأساسية والتطبيقية"
                  className="hover:text-amber-400 transition-colors"
                >
                  العلوم الأساسية والتطبيقية
                </Link>
              </li>
              <li>
                <Link
                  to="/journals?specialization=العلوم الإنسانية والاجتماعية"
                  className="hover:text-amber-400 transition-colors"
                >
                  العلوم الإنسانية والاجتماعية
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Open Access */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4 border-r-2 border-primary-500 pr-2">
              المعايير المفتوحة
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              ندعم حركة الوصول الحر (Open Access) ونلتزم بمبادئ الشفافية والتحكيم
              الأكاديمي الرصين للارتقاء بالنشر العلمي السوداني.
            </p>
            <div className="pt-2 text-xs text-gray-400 space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary-400" />
                <span className="font-sans">journals.gov.sd</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="font-sans">info@ssj.sd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} دليل المجلات العلمية السودانية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-400">بوابة الأبحاث والجامعات السودانية</span>
            <span>•</span>
            <span className="hover:text-gray-400">نظام فهرسة محكم</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
