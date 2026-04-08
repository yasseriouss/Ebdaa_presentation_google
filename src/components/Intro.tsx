import { motion } from 'motion/react';
import { introData } from '../data';

interface IntroProps {
  key?: string;
  id: keyof typeof introData;
  onNavigate: (view: string) => void;
}

export default function Intro({ id, onNavigate }: IntroProps) {
  const data = introData[id];

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-8"
        >
          <i className={`fa-solid ${data.icon} text-7xl ${data.color}`}></i>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{data.title}</h2>
        <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
          {data.desc}
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-right bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 mb-10 max-w-2xl mx-auto"
        >
          <h3 className="font-bold text-xl mb-6 text-slate-800 flex items-center gap-3">
            <i className={`fa-solid fa-list ${data.color}`}></i>
            {data.listTitle}
          </h3>
          <ul className="space-y-4 text-slate-700 font-medium text-lg">
            {data.items.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="flex items-start gap-3"
              >
                <i className="fa-solid fa-check text-emerald-500 mt-1.5"></i>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(data.nextView)} 
          className={`${data.btnColor} text-white font-black px-12 py-4 rounded-xl text-xl transition shadow-lg w-full md:w-auto`}
        >
          {data.btnText}
        </motion.button>
      </div>
    </motion.div>
  );
}