import { motion } from 'motion/react';

export default function Notes() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">دليل إدارة الاجتماع (Speaker Notes)</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          السيناريو التفصيلي والنقاط الحوارية لضمان توجيه العرض التقديمي نحو أهدافه الاستراتيجية بفعالية.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8 md:p-10 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-fuchsia-50 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-white text-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-purple-100 shrink-0">
            <i className="fa-solid fa-microphone-lines"></i>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-3xl font-black text-slate-900 mb-2">إرشادات المتحدث الرئيسي</h2>
            <p className="text-slate-600 text-lg">كيفية توصيل الرسالة وإدارة النقاشات أثناء العرض</p>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-10">
          <section>
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b-2 pb-3 border-slate-100">
              <i className="fa-solid fa-bullseye text-purple-500"></i>
              الهدف الاستراتيجي من العرض
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg text-justify">
              الهدف الأساسي من هذا العرض ليس مجرد استعراض للمهام، بل هو <strong className="text-purple-700">توحيد الرؤية وخلق حالة من التوافق (Alignment)</strong> بين جميع مديري الأقسام. يجب التأكيد مراراً وتكراراً على أن "النجاح المشترك" هو المقياس الوحيد. لا يوجد قسم ينجح بمفرده إذا فشل المنتج النهائي في الوصول للعميل بالجودة المطلوبة والوقت المحدد. يجب كسر عقلية "الجزر المنعزلة" (Silo Mentality).
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b-2 pb-3 border-slate-100">
              <i className="fa-solid fa-lightbulb text-amber-500"></i>
              الرسائل الرئيسية (Key Talking Points)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fa-solid fa-handshake text-blue-500 text-xl"></i>
                  <strong className="text-slate-800 text-lg">للمبيعات والمكتب الفني</strong>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  "دقة المعلومات واكتمالها في بداية المشروع توفر 40% من وقت الإنتاج وتقلل من إعادة العمل. أنتم خط الدفاع الأول لضمان انسيابية العمليات."
                </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fa-solid fa-boxes-stacked text-emerald-500 text-xl"></i>
                  <strong className="text-slate-800 text-lg">للتخطيط والمخازن</strong>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  "المادة الخام يجب أن تكون جاهزة في صالة الإنتاج قبل بدء أمر الشغل بـ 24 ساعة على الأقل. التخطيط الاستباقي هو ما يمنع توقف الماكينات."
                </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fa-solid fa-gears text-orange-500 text-xl"></i>
                  <strong className="text-slate-800 text-lg">للإنتاج والجودة</strong>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  "الجودة لا تُختبر في نهاية الخط، بل تُبنى في كل مرحلة تصنيعية. مشغلو الماكينات هم مفتشو الجودة الأوائل. الإنتاج والجودة فريق واحد هدفه تقليل الهدر (Scrap)."
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full -ml-10 -mb-10 blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <i className="fa-solid fa-triangle-exclamation text-rose-400"></i>
                كيفية إدارة النقاشات الصعبة ومعالجة "عنق الزجاجة"
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                عند مناقشة التأخيرات أو الإخفاقات، <strong className="text-white">تجنب تماماً إلقاء اللوم (Blame Game)</strong>. هذا العرض للبحث عن حلول وليس لمحاكمة الأقسام.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <p className="text-slate-200 mb-2">استخدم دائماً هذه العبارة الذهبية لفتح باب الحلول:</p>
                <em className="text-2xl text-purple-300 font-black block leading-relaxed">
                  "ما هي الموارد، الأدوات، أو الصلاحيات التي تحتاجها إدارتك لتجاوز هذا التحدي بشكل نهائي؟"
                </em>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
