const fs = require('fs');
const path = 'src/components/ActionPlan.tsx';
let content = fs.readFileSync(path, 'utf8');

const target1 = `export default function ActionPlan() {
  const [expandedIds, setExpandedIds] = useState<number[]>(initialData.map(t => t.id)); // All expanded by default for presentation

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Expanded Content Component
  const ExpandedContent = ({ task }: { task: Task }) => (`;

const replacement1 = `export default function ActionPlan() {
  const [expandedIds, setExpandedIds] = useState<number[]>(initialData.map(t => t.id)); // All expanded by default for presentation

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const exportToCSV = () => {
    const headers = [
      'ID', 'القسم', 'المهمة', 'الموعد المستهدف', 'الحالة', 
      'ملاحظات التنفيذ', 'التفاصيل العميقة', 'النتائج المتوقعة', 
      'تلميحات المؤشرات', 'أمثلة عملية', 'المهام الفرعية'
    ];

    const escapeCSV = (str) => {
      if (!str) return '""';
      const escaped = str.replace(/"/g, '""');
      return \`"\${escaped}"\`;
    };

    const csvRows = initialData.map(task => {
      const subTasksStr = task.subTasks 
        ? task.subTasks.map(st => \`\${st.title} (\${st.completed ? 'مكتمل' : 'غير مكتمل'}) - \${st.detail || ''}\`).join('\\n')
        : '';

      return [
        task.id,
        escapeCSV(task.dept),
        escapeCSV(task.task),
        escapeCSV(task.deadline),
        escapeCSV(task.status),
        escapeCSV(task.notes),
        escapeCSV(task.deepDetails),
        escapeCSV(task.expectedResults),
        escapeCSV(task.kpiHints),
        escapeCSV(task.examples),
        escapeCSV(subTasksStr)
      ].join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\\n');
    
    // Add BOM for UTF-8 to ensure Excel reads Arabic correctly
    const blob = new Blob(['\\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'action_plan_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Expanded Content Component
  const ExpandedContent = ({ task }: { task: Task }) => (`;

content = content.replace(target1, replacement1);

const target2 = `      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">العرض التفصيلي: خطة العمل التشغيلية</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          استعراض شامل ومفصل لخطوات التنفيذ، التحديات، والأهداف الاستراتيجية لكل إدارة خلال الربع الأول من عام 2026.
        </p>
      </div>`;

const replacement2 = `      <div className="mb-10 text-center relative">
        <h2 className="text-4xl font-black text-slate-900 mb-4">العرض التفصيلي: خطة العمل التشغيلية</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
          استعراض شامل ومفصل لخطوات التنفيذ، التحديات، والأهداف الاستراتيجية لكل إدارة خلال الربع الأول من عام 2026.
        </p>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
        >
          <i className="fa-solid fa-file-csv"></i>
          تصدير البيانات (CSV)
        </button>
      </div>`;

content = content.replace(target2, replacement2);

fs.writeFileSync(path, content);
console.log('File updated successfully.');
