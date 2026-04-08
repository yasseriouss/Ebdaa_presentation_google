import { motion } from 'motion/react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-4 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="h-12 w-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-bold text-brand-400">
            إبداع
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide">بوابة مصنع إبداع</h1>
            <p className="text-xs text-slate-400">نظام التشغيل وإدارة الأداء</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {currentView !== 'home' && (
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => onNavigate('home')} 
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-right"></i> العودة للرئيسية
            </motion.button>
          )}
          <div className="text-left border-r border-slate-700 pr-4 hidden md:block">
            <p className="text-xs text-slate-400">إشراف: إدارة التطوير والتدريب</p>
            <p className="text-sm font-bold text-brand-400">م. ياسر سلام | <span dir="ltr">yasserious.com</span></p>
          </div>
        </div>
      </div>
    </nav>
  );
}