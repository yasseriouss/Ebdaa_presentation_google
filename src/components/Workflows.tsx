import { motion } from 'motion/react';

export default function Workflows() {
  const departments = [
    {
      id: 'sales',
      name: 'المبيعات',
      icon: 'fa-handshake',
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      steps: ['استلام طلب العميل', 'حصر الكميات المبدئي', 'تطبيق نموذج التسعير (ABC)', 'إصدار عرض السعر', 'اعتماد العميل']
    },
    {
      id: 'technical',
      name: 'المكتب الفني',
      icon: 'fa-compass-drafting',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      steps: ['استلام المخططات المعمارية', 'مطابقة المواصفات مع مكتبة الرسومات', 'توليد رسومات تنفيذية (Shop Drawings)', 'استخراج قوائم المواد (BOM)', 'الاعتماد من الاستشاري']
    },
    {
      id: 'planning',
      name: 'التخطيط والمشتريات',
      icon: 'fa-calendar-days',
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      steps: ['استلام BOM من المكتب الفني', 'التحقق من المخزون', 'إصدار أوامر الشراء للنواقص', 'جدولة أوامر التشغيل (MPS)', 'إصدار خطة الإنتاج الأسبوعية']
    },
    {
      id: 'production',
      name: 'الإنتاج',
      icon: 'fa-industry',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      steps: ['استلام خطة الإنتاج', 'سحب المواد من المخزن', 'التشغيل الآلي (CNC)', 'التجميع وتطبيق 5S', 'التسليم لمنطقة الفحص']
    },
    {
      id: 'quality',
      name: 'الجودة واللوجستيات',
      icon: 'fa-check-double',
      color: 'bg-rose-500',
      textColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      steps: ['استلام المنتج المجمع', 'الفحص البصري والقياسي (Tolerances)', 'تسجيل العيوب (إن وجدت)', 'إصدار تقرير القبول/الرفض', 'التغليف والشحن']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-12"
      dir="rtl"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">تدفق العمل بين الإدارات (Workflows)</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          استعراض تسلسل العمليات من استلام طلب العميل وحتى تسليم المنتج النهائي، موضحاً دور كل إدارة في سلسلة القيمة.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line for Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
          {departments.map((dept, index) => (
            <motion.div 
              key={dept.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 border-2 ${dept.borderColor} shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full relative`}
            >
              {/* Arrow connector between cards (Desktop) */}
              {index < departments.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -left-4 w-4 h-4 border-t-4 border-l-4 border-slate-300 rotate-[-45deg] -translate-y-1/2 z-20 bg-white"></div>
              )}
              
              {/* Arrow connector between cards (Mobile) */}
              {index < departments.length - 1 && (
                <div className="lg:hidden absolute -bottom-4 left-1/2 w-4 h-4 border-b-4 border-r-4 border-slate-300 rotate-45 -translate-x-1/2 z-20 bg-white"></div>
              )}

              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white mb-6 ${dept.color} shadow-md`}>
                <i className={`fa-solid ${dept.icon} text-2xl`}></i>
              </div>
              
              <h3 className={`text-xl font-black text-center mb-6 ${dept.textColor}`}>
                {index + 1}. {dept.name}
              </h3>
              
              <div className={`flex-grow rounded-xl p-4 ${dept.bgColor} border ${dept.borderColor}`}>
                <ul className="space-y-3">
                  {dept.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                      <i className={`fa-solid fa-circle-check mt-1 text-xs ${dept.textColor}`}></i>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16 pb-4 text-slate-500 font-medium">
        Created by <a href="https://yasserious.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors">yasserious.com</a>
      </div>
    </motion.div>
  );
}
