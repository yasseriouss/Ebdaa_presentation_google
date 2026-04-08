import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { workflowData } from '../data';

export default function Flowchart() {
  const [selectedNode, setSelectedNode] = useState<keyof typeof workflowData | null>(null);

  const lanes = [
    {
      title: 'الواجهة والهندسة',
      nodes: ['commercial', 'projects', 'technical', 'approval']
    },
    {
      title: 'التخطيط والموارد',
      nodes: ['planning', 'inventory', 'purchasing']
    },
    {
      title: 'الإنتاج والتشغيل',
      nodes: ['panels', 'solid', 'paint', 'upholstery', 'maintenance']
    },
    {
      title: 'الجودة واللوجستيات',
      nodes: ['qc', 'assembly', 'final_qc', 'logistics', 'after_sales', 'training_development']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">العرض التفصيلي: مسار العمليات (Workflow)</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          استكشف الترابط بين الإدارات المختلفة. اضغط على أي إدارة لعرض التفاصيل العميقة، المهام الرئيسية، ومؤشرات الأداء.
        </p>
      </div>

      <div className="space-y-8 relative">
        {lanes.map((lane, laneIdx) => (
          <motion.div 
            key={laneIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: laneIdx * 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8 border-b-2 pb-3 border-slate-100 inline-block">{lane.title}</h3>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {lane.nodes.map((nodeId, idx) => {
                const node = workflowData[nodeId as keyof typeof workflowData];
                return (
                  <div key={nodeId} className="flex items-center">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedNode(nodeId as keyof typeof workflowData)}
                      className={`cursor-pointer w-56 bg-white border-2 border-slate-200 rounded-2xl p-5 text-center shadow-sm hover:border-blue-500 hover:shadow-md transition-all relative z-10 ${selectedNode === nodeId ? 'ring-4 ring-blue-200 border-blue-500' : ''}`}
                    >
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white mb-4 ${node.color} shadow-inner`}>
                        <i className={`fa-solid ${node.icon} text-2xl`}></i>
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-1">{node.title}</h4>
                      <p className="text-sm text-slate-500">{node.subtitle}</p>
                    </motion.div>
                    
                    {/* Connector arrow (except for last item) */}
                    {idx < lane.nodes.length - 1 && (
                      <div className="hidden md:flex w-10 h-1.5 bg-slate-200 relative mx-2 rounded-full">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 border-t-4 border-l-4 border-slate-200 rotate-[-45deg] rounded-sm"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Presentation Modal */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-full"
            >
              <div className={`p-8 md:p-10 text-white ${workflowData[selectedNode].color} flex justify-between items-center shrink-0`}>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black mb-2">{workflowData[selectedNode].title}</h3>
                  <p className="text-white/90 text-lg md:text-xl">{workflowData[selectedNode].subtitle}</p>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <i className={`fa-solid ${workflowData[selectedNode].icon} text-4xl`}></i>
                </div>
              </div>
              
              <div className="p-8 md:p-10 overflow-y-auto flex-grow bg-slate-50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Deep Details Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-book-open text-blue-600"></i> نظرة متعمقة (Deep Dive)
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-lg text-justify">
                        {workflowData[selectedNode].deepDetails}
                      </p>
                    </div>

                    {/* Tasks Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-list-check text-emerald-600"></i> المهام الرئيسية
                      </h4>
                      <ul className="space-y-4">
                        {workflowData[selectedNode].tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-lg">
                            <i className="fa-solid fa-check-circle text-emerald-500 mt-1.5"></i>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* KPI Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-chart-line text-amber-500"></i> مؤشر الأداء (KPI)
                      </h4>
                      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center mb-4">
                        <span className="block text-2xl font-black text-slate-800 mb-2">
                          {workflowData[selectedNode].kpi}
                        </span>
                        <span className="text-sm text-slate-500">المؤشر الرئيسي للقياس</span>
                      </div>
                      {workflowData[selectedNode].kpiDetails && (
                        <p className="text-slate-600 text-sm leading-relaxed text-justify bg-amber-50/50 p-4 rounded-xl border border-amber-100 mb-4">
                          {workflowData[selectedNode].kpiDetails}
                        </p>
                      )}
                      {workflowData[selectedNode].kpiHints && (
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-4">
                          <h5 className="text-sm font-bold text-blue-800 mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-lightbulb text-blue-500"></i> تلميح استراتيجي
                          </h5>
                          <p className="text-slate-700 text-sm leading-relaxed text-justify">
                            {workflowData[selectedNode].kpiHints}
                          </p>
                        </div>
                      )}
                      {workflowData[selectedNode].examples && (
                        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                          <h5 className="text-sm font-bold text-emerald-800 mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-vial text-emerald-500"></i> مثال عملي
                          </h5>
                          <p className="text-slate-700 text-sm leading-relaxed text-justify">
                            {workflowData[selectedNode].examples}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white border-t border-slate-100 shrink-0 flex justify-end">
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-xl transition shadow-md"
                >
                  إغلاق العرض
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}