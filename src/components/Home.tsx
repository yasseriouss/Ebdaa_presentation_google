import { motion } from 'motion/react';

interface HomeProps {
  key?: string;
  onNavigate: (view: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const cards = [
    {
      id: 'intro-flowchart',
      icon: 'fa-diagram-project',
      iconBg: 'bg-blue-100 text-blue-600',
      title: 'اللوحة التفاعلية (Flowchart)',
      desc: 'خريطة بصرية تفاعلية توضح مسار العمل بين الإدارات، المهام الدقيقة، ومؤشرات الأداء لكل قسم.',
      btnColor: 'text-blue-600 group-hover:bg-blue-600'
    },
    {
      id: 'intro-slides',
      icon: 'fa-person-chalkboard',
      iconBg: 'bg-emerald-100 text-emerald-600',
      title: 'العرض التقديمي (Slides)',
      desc: 'شرائح عرض استراتيجية مصممة للاجتماعات، تشرح ربط مسارات العمل بمؤشرات الأداء (KPIs).',
      btnColor: 'text-emerald-600 group-hover:bg-emerald-600'
    },
    {
      id: 'intro-actionplan',
      icon: 'fa-list-check',
      iconBg: 'bg-amber-100 text-amber-600',
      title: 'خطة العمل (Action Plan)',
      desc: 'جدول تشغيلي (SOP) قابل للطباعة، يحدد مهام كل إدارة للربع السنوي الحالي لضمان التنفيذ.',
      btnColor: 'text-amber-600 group-hover:bg-amber-600'
    },
    {
      id: 'view-workflows',
      icon: 'fa-route',
      iconBg: 'bg-indigo-100 text-indigo-600',
      title: 'تدفق العمل (Workflows)',
      desc: 'تسلسل العمليات وتدفق العمل بين الإدارات المختلفة من استلام الطلب حتى التسليم.',
      btnColor: 'text-indigo-600 group-hover:bg-indigo-600'
    },
    {
      id: 'intro-notes',
      icon: 'fa-microphone-lines',
      iconBg: 'bg-purple-100 text-purple-600',
      title: 'دليل إدارة الاجتماع (Notes)',
      desc: 'السيناريو التفصيلي (Speaker Notes) الخاص بمدير التطوير لإدارة الجلسات النقاشية بقوة.',
      btnColor: 'text-purple-600 group-hover:bg-purple-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 flex flex-col justify-center min-h-[calc(100vh-100px)]"
    >
      <div className="text-center mb-6 md:mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-5xl font-black text-slate-900 mb-2 md:mb-6"
        >
          المنظومة المتكاملة للتشغيل والتطوير
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-2"
        >
          اختر من الأقسام التالية لاستعراض الأدوات الاستراتيجية والتنفيذية الخاصة بإدارة المصنع.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-6"
      >
        {cards.map((card) => (
          <motion.div 
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-row md:flex-col items-center md:items-start h-full cursor-pointer"
            onClick={() => onNavigate(card.id)}
          >
            <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-3xl ml-3 md:ml-0 md:mb-6 transition-transform group-hover:scale-110 ${card.iconBg}`}>
              <i className={`fa-solid ${card.icon}`}></i>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-sm md:text-xl font-bold mb-0.5 md:mb-3 text-slate-800">{card.title}</h3>
              <p className="text-slate-500 text-xs md:text-sm mb-0 md:mb-6 flex-grow leading-relaxed line-clamp-1 md:line-clamp-none">{card.desc}</p>
            </div>
            <div className="hidden md:block w-full mt-auto">
              <button className={`w-full bg-slate-50 font-bold py-3 rounded-lg group-hover:text-white transition-colors ${card.btnColor}`}>
                استعراض <i className="fa-solid fa-chevron-left mr-1 text-sm"></i>
              </button>
            </div>
            <div className="md:hidden mr-2 text-slate-400 group-hover:text-blue-500 transition-colors">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-8 md:mt-16 pb-4 text-slate-500 text-sm md:text-base font-medium">
        Created by <a href="https://yasserious.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors">yasserious.com</a>
      </div>
    </motion.div>
  );
}