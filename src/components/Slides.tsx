import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "الرؤية والأهداف الكبرى",
      subtitle: "مصنع إبداع 2026",
      content: "تحويل العمليات التشغيلية إلى منظومة متكاملة تضمن الجودة، السرعة، وتقليل الهدر.",
      deepDetails: "تتمحور رؤيتنا لعام 2026 حول التحول الرقمي الكامل لجميع العمليات التصنيعية. نهدف إلى تقليل نسبة الهدر (Scrap Rate) بنسبة 40%، وزيادة كفاءة المعدات الإجمالية (OEE) لتتجاوز 85%. هذا التحول ليس مجرد تغيير في الأدوات، بل هو تغيير جذري في ثقافة العمل لتبني مبادئ التصنيع الرشيق (Lean Manufacturing) في كل قسم.",
      icon: "fa-rocket",
      color: "from-blue-600 to-indigo-900"
    },
    {
      title: "فلسفة الربط بين الإدارات",
      subtitle: "لا جزر منعزلة",
      content: "كل قسم هو عميل للقسم الذي يسبقه ومورد للقسم الذي يليه. الجودة مسؤولية الجميع.",
      deepDetails: "لقد عانينا سابقاً من ضعف التواصل بين الإدارات مما أدى إلى تأخيرات وأخطاء في الإنتاج. الفلسفة الجديدة تعتمد على الشفافية التامة؛ حيث يمكن لقسم الإنتاج رؤية خطط المبيعات، ويمكن للمبيعات تتبع حالة التصنيع لحظياً. سنقوم بتطبيق نظام اجتماعات يومية قصيرة (Daily Huddles) لضمان توافق جميع الفرق على الأهداف اليومية.",
      icon: "fa-link",
      color: "from-emerald-600 to-teal-900"
    },
    {
      title: "مؤشرات الأداء (KPIs) الحرجة",
      subtitle: "ما لا يمكن قياسه لا يمكن إدارته",
      content: "التركيز على OEE في الإنتاج، FPY في الجودة، و OTD في التسليم.",
      deepDetails: "تم تحديد ثلاثة مؤشرات رئيسية ستقود أداء المصنع وتحدد المكافآت:\n1. كفاءة المعدات الإجمالية (OEE): لا يقتصر على سرعة الماكينة، بل يشمل التوافرية (Availability) والأداء (Performance) والجودة (Quality). هدفنا تجاوز 85%.\n2. نسبة النجاح من المرة الأولى (FPY): يقيس كفاءة العمليات قبل تدخل الجودة النهائية. كلما ارتفع، انخفضت تكاليف إعادة العمل (Rework) والهدر الخفي.\n3. التسليم في الوقت المحدد (OTD): المقياس النهائي لنجاح السلسلة بأكملها في عيون العميل. التأخير يوم واحد قد يكلفنا غرامات باهظة وفقدان الثقة.",
      icon: "fa-chart-pie",
      color: "from-amber-500 to-orange-800"
    },
    {
      title: "خارطة الطريق القادمة",
      subtitle: "خطوات التنفيذ",
      content: "تطبيق نظام ERP، تدريب الكوادر، وتفعيل الصيانة الوقائية الشاملة (TPM).",
      deepDetails: "الربع الأول سيركز على توحيد المعايير وإصدار أدلة العمل (SOPs). الربع الثاني سيشهد الإطلاق التجريبي لنظام الـ ERP الجديد في قسمي التخطيط والمشتريات. الربع الثالث سيخصص لتدريب العمالة على مبادئ الصيانة الذاتية (Autonomous Maintenance). بحلول الربع الرابع، نتوقع أن نرى تحسناً ملحوظاً في جميع مؤشرات الأداء.",
      icon: "fa-map-location-dot",
      color: "from-purple-600 to-fuchsia-900"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(c => c + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(c => c - 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col"
    >
      <div className="relative flex-grow rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} p-8 md:p-16 flex flex-col justify-center items-center text-center text-white`}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md mb-8 shadow-2xl border border-white/20"
              >
                <i className={`fa-solid ${slides[currentSlide].icon} text-5xl md:text-6xl text-white`}></i>
              </motion.div>
              
              <motion.h4 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-white/80 font-bold mb-4 tracking-wider uppercase"
              >
                {slides[currentSlide].subtitle}
              </motion.h4>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"
              >
                {slides[currentSlide].title}
              </motion.h2>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-black/20 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl"
              >
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 font-medium">
                  {slides[currentSlide].content}
                </p>
                <div className="h-px w-24 bg-white/20 mx-auto mb-6"></div>
                <p className="text-base md:text-lg text-white/70 leading-relaxed text-justify whitespace-pre-line">
                  {slides[currentSlide].deepDetails}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white backdrop-blur-md transition border border-white/10"
          >
            <i className="fa-solid fa-chevron-right text-xl"></i>
          </button>
          
          <div className="flex gap-3">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-3 bg-white/30'}`}
              ></div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white backdrop-blur-md transition border border-white/10"
          >
            <i className="fa-solid fa-chevron-left text-xl"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
}