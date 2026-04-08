import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReactToPrint } from 'react-to-print';
import { ChevronRight, ChevronLeft, Presentation, FileDown, X, FileSpreadsheet } from 'lucide-react';

type Status = 'مكتمل' | 'جاري العمل' | 'متأخر' | 'لم يبدأ';

interface SubTask {
  id: number;
  title: string;
  completed: boolean;
  detail?: string;
}

interface Task {
  id: number;
  dept: string;
  task: string;
  deadline: string;
  status: Status;
  notes?: string;
  deepDetails?: string;
  expectedResults?: string;
  kpiHints?: string;
  examples?: string;
  workflowSequence?: string[];
  subTasks?: SubTask[];
}

const initialData: Task[] = [
  { 
    id: 1, dept: 'المبيعات', task: 'تحديث نموذج تسعير المشاريع (Project Pricing Model)', deadline: 'الأسبوع 1', status: 'مكتمل',
    notes: 'تم اعتماد النموذج الجديد من قبل الإدارة المالية وتعميمه على فريق المبيعات مع عقد ورش عمل تدريبية.',
    deepDetails: 'يعتبر تسعير المشاريع في صناعة الأثاث والمقاولات الخشبية من أكثر العمليات تعقيداً نظراً لتذبذب أسعار المواد الخام (مثل الأخشاب الطبيعية، MDF، والإكسسوارات المعدنية) وتغير تكاليف الشحن. التحديث الجديد لنموذج التسعير يعتمد على منهجية (Activity-Based Costing - ABC) لتوزيع التكاليف غير المباشرة (Overheads) بشكل أكثر دقة على المشاريع بدلاً من التوزيع العشوائي. بالإضافة إلى ذلك، تم ربط النموذج بقواعد بيانات الموردين لتحديث أسعار المواد الخام تلقائياً (API Integration)، مما يقلل من الاعتماد على عروض الأسعار القديمة. يتضمن النموذج أيضاً تحليل حساسية (Sensitivity Analysis) يوضح كيف تتأثر أرباح المشروع بتغير أسعار المواد بنسبة 5% أو 10%، مما يمنح الإدارة رؤية واضحة للمخاطر قبل توقيع العقود. تم إدراج تكاليف غير منظورة سابقاً مثل تكلفة التخزين المؤقت للمشروع، وتكاليف إعادة العمل المتوقعة (Rework Allowance) بناءً على تعقيد التصميم.',
    expectedResults: 'زيادة هامش الربح الإجمالي (Gross Profit Margin) بنسبة 12-15%، وتقليل نسبة التباين بين التكلفة التقديرية والتكلفة الفعلية (Cost Variance) إلى أقل من 3% بنهاية الربع الثاني.',
    kpiHints: 'مؤشر الأداء: (Win/Loss Ratio). تلميح استراتيجي: راقب هذا المؤشر بدقة بعد تطبيق النموذج. إذا انخفضت نسبة الفوز بالعقود بشكل حاد، فقد يكون التسعير الجديد أعلى من أسعار السوق التنافسية ويحتاج إلى إعادة معايرة (Recalibration) فورية.',
    examples: 'مثال عملي: في مشروع "فندق الواحة" السابق، أدى التسعير القديم إلى خسارة 5% من الأرباح بسبب عدم حساب هدر ألواح الـ MDF بشكل دقيق. النموذج الجديد يحسب الهدر تلقائياً بنسبة 8% بناءً على بيانات تاريخية من ماكينات الـ CNC، مما يحمي هامش الربح.',
    workflowSequence: ['استلام طلب العميل', 'حصر الكميات المبدئي', 'تطبيق نموذج التسعير (ABC)', 'إصدار عرض السعر', 'اعتماد العميل'],
    subTasks: [
      { id: 101, title: 'مراجعة التكاليف المباشرة مع إدارة المشتريات', completed: true, detail: 'تمت مطابقة أسعار المواد الخام الأساسية (أخشاب، إكسسوارات، دهانات) مع أحدث عروض الأسعار من الموردين المعتمدين.' },
      { id: 102, title: 'اعتماد هوامش الربح الجديدة حسب فئة المشروع', completed: true, detail: 'تمت الموافقة من قبل المدير المالي على هوامش ربح متدرجة (Tiered Margins) بناءً على حجم المشروع ومخاطره.' },
      { id: 103, title: 'بناء واجهة برمجية (API) لربط أسعار الموردين بنموذج التسعير', completed: true, detail: 'تم الربط بنجاح مع أنظمة الموردين الرئيسيين لتحديث أسعار الخشب والإكسسوارات بشكل يومي.' },
      { id: 104, title: 'تدريب فريق المبيعات على استخدام تحليل الحساسية في التفاوض', completed: true, detail: 'تم عقد 3 ورش عمل لتدريب الفريق على كيفية استخدام مرونة التسعير أثناء التفاوض مع العملاء.' }
    ]
  },
  { 
    id: 2, dept: 'المكتب الفني', task: 'توحيد مكتبة الرسومات الهندسية (Standard Library)', deadline: 'الأسبوع 2', status: 'جاري العمل',
    notes: 'يتم الآن تجميع رسومات المطابخ، الخزائن، والأبواب القياسية لتقليل وقت التصميم وتقليل الأخطاء البشرية.',
    deepDetails: 'في بيئة التصنيع المخصصة (Custom Manufacturing)، يستهلك المكتب الفني وقتاً طويلاً في إعادة رسم تفاصيل متكررة. توحيد مكتبة الرسومات (Standardization) هو خطوة نحو التصميم المعياري (Modular Design). تعتمد المكتبة الجديدة على مبادئ (Parametric Modeling) باستخدام برامج مثل AutoCAD Dynamic Blocks أو Revit Families. هذا يعني أن تغيير عرض خزانة من 60 سم إلى 80 سم سيقوم تلقائياً بتحديث عدد المفصلات المطلوبة، ومقاسات الأرفف الداخلية، ومسافات التثقيب (Drilling Patterns) دون تدخل بشري. تم تصنيف المكتبة إلى ثلاث فئات: (أ) قياسي بالكامل (لا يحتاج تعديل)، (ب) شبه قياسي (يحتاج تعديل أبعاد فقط)، (ج) مخصص (يحتاج تصميم من الصفر). هذا التصنيف سيساعد في توجيه الموارد الهندسية بكفاءة. كما تم ربط المكتبة بنظام الـ ERP لتوليد قوائم المواد (BOM - Bill of Materials) تلقائياً بمجرد سحب البلوك إلى لوحة الرسم، مما يقلل أخطاء الحصر بنسبة شبه كاملة.',
    expectedResults: 'تقليل وقت إعداد الرسومات التنفيذية (Shop Drawings) بنسبة 40%، والقضاء التام (0%) على أخطاء المقاسات المتكررة في وحدات التخزين والأبواب القياسية.',
    kpiHints: 'مؤشر الأداء: (Drafting Cycle Time). تلميح استراتيجي: قم بقياس الوقت المستغرق لتصميم "وحدة مطبخ قياسية" قبل وبعد تفعيل المكتبة. يجب أن تلاحظ انخفاضاً مباشراً في الساعات الهندسية المبذولة، مما يسمح للمهندسين بالتركيز على التصميمات المعقدة والمخصصة.',
    examples: 'مثال عملي: بدلاً من قيام المهندس برسم مفصلة الباب (Concealed Hinge) وتحديد مسافات التثقيب في كل مرة، يتم سحبها من المكتبة كـ (Dynamic Block) يحتوي مسبقاً على جميع خصائص التصنيع (التثقيب، المسامير، الخلوص)، مما يمنع نسيان أي تفصيلة ويضمن توافقها مع ماكينات التثقيب الآلي.',
    workflowSequence: ['استلام المخططات المعمارية', 'مطابقة المواصفات مع مكتبة الرسومات', 'توليد رسومات تنفيذية (Shop Drawings)', 'استخراج قوائم المواد (BOM)', 'الاعتماد من الاستشاري'],
    subTasks: [
      { id: 201, title: 'حصر وتصنيف الرسومات المتكررة', completed: true, detail: 'تم الانتهاء من حصر 50 نموذجاً أساسياً للأبواب و 30 نموذجاً لوحدات المطابخ.' },
      { id: 202, title: 'إنشاء بلوكات الأوتوكاد الديناميكية', completed: false, detail: 'تم إنجاز 60% من البلوكات المطلوبة، وجاري العمل على ربطها ببرامج الـ CNC.' },
      { id: 203, title: 'مراجعة المكتبة واعتمادها من الإنتاج', completed: false, detail: 'مجدولة للأسبوع القادم لضمان تطابق الرسومات مع قدرات الماكينات المتاحة.' },
      { id: 204, title: 'ربط البلوكات الهندسية بقوائم المواد (BOM) في نظام ERP', completed: false, detail: 'قيد التطوير بالتعاون مع فريق تقنية المعلومات لأتمتة عملية الحصر.' },
      { id: 205, title: 'إنشاء دليل استخدام (User Manual) للمكتبة الفنية', completed: false, detail: 'سيتم توثيق كيفية استخدام المكتبة وتحديثها لضمان استمرارية العمل.' }
    ]
  },
  { 
    id: 3, dept: 'التخطيط', task: 'تفعيل نظام الجدولة الأسبوعي (Master Production Schedule)', deadline: 'الأسبوع 3', status: 'متأخر',
    notes: 'يوجد تأخير بسبب تحديات في تكامل البيانات (Data Integration) بين نظام المخازن القديم وبرنامج التخطيط الجديد.',
    deepDetails: 'نظام الجدولة الرئيسي (MPS) هو القلب النابض لأي منشأة صناعية. التحدي الأكبر في مصانع الأثاث هو تنوع مسارات الإنتاج (Routing)؛ فبعض المنتجات تمر بقسم الدهان، وأخرى تذهب للتجميع مباشرة. النظام الجديد يعتمد على خوارزميات الجدولة ذات السعة المحدودة (Finite Capacity Scheduling - FCS)، والتي تأخذ في الاعتبار القيود الحقيقية للمصنع: عدد الماكينات المتاحة، كفاءة العمالة، وتوفر المواد الخام. لن يسمح النظام بإدراج أمر تشغيل في الخطة إلا إذا كانت جميع مواده الخام متوفرة أو مؤكدة الوصول (Material Clear). كما تم إدخال مفهوم (Time Buffers) لحماية مواعيد التسليم من التوقفات المفاجئة للماكينات. الأهم من ذلك، سيوفر النظام لوحة تحكم (Dashboard) مرئية لمدير المصنع توضح الاختناقات (Bottlenecks) المتوقعة خلال الأسبوعين القادمين، مما يتيح اتخاذ قرارات استباقية مثل تشغيل وردية إضافية أو الاستعانة بمقاول من الباطن (Subcontracting) قبل وقوع التأخير.',
    expectedResults: 'رفع نسبة الالتزام بمواعيد التسليم (On-Time Delivery - OTD) إلى 95%، وتقليل وقت انتظار المواد بين محطات العمل (WIP - Work in Progress) بنسبة 30%.',
    kpiHints: 'مؤشر الأداء: (Schedule Adherence). تلميح استراتيجي: لا تضع خطة إنتاج تستنفد 100% من الطاقة القصوى للمصنع. اترك دائماً هامش أمان (Buffer) بنسبة 15-20% لاستيعاب الطلبات العاجلة (Rush Orders) أو أعطال الماكينات المفاجئة دون إرباك الخطة بأكملها.',
    examples: 'مثال عملي: تطبيق نظام "سحب الإنتاج" (Pull System) بدلاً من "الدفع" (Push). حيث لا تبدأ محطة "الدهان" عملها إلا بعد استلام إشارة (Kanban) من محطة "التجميع" بحاجتها للقطع، مما يمنع تكدس القطع الخشبية غير المكتملة في ممرات المصنع ويقلل من احتمالية تلفها.',
    workflowSequence: ['استلام BOM من المكتب الفني', 'التحقق من المخزون', 'إصدار أوامر الشراء للنواقص', 'جدولة أوامر التشغيل (MPS)', 'إصدار خطة الإنتاج الأسبوعية'],
    subTasks: [
      { id: 301, title: 'تصميم نموذج الجدولة الموحد (Gantt Chart)', completed: true, detail: 'تم اعتماد النموذج من مدير المصنع، ويشمل تحديد المسار الحرج (Critical Path) لكل مشروع.' },
      { id: 302, title: 'تدريب مهندسي التخطيط على النظام الجديد', completed: false, detail: 'مؤجل لحين اكتمال الربط التقني مع المخازن لضمان التدريب على بيانات حقيقية.' },
      { id: 303, title: 'تحديد أوقات الإعداد (Setup Times) لكل ماكينة بدقة', completed: true, detail: 'تم قياس وتوثيق أوقات الإعداد لجميع الماكينات الرئيسية لتضمينها في خوارزمية الجدولة.' },
      { id: 304, title: 'تفعيل نظام التنبيهات المبكرة للاختناقات الإنتاجية', completed: false, detail: 'جاري برمجة النظام لإرسال إشعارات تلقائية عند توقع تجاوز السعة الإنتاجية لأي محطة عمل.' }
    ]
  },
  { 
    id: 4, dept: 'الإنتاج', task: 'تطبيق منهجية 5S في صالة التجميع النهائي', deadline: 'الأسبوع 4', status: 'لم يبدأ',
    notes: 'سيتم البدء فور الانتهاء من تسليم مشروع "القرية السياحية" لضمان عدم تعطل خطوط الإنتاج الحالية.',
    deepDetails: 'منهجية 5S ليست مجرد أداة للتنظيف، بل هي نظام متكامل لإدارة بيئة العمل بصرياً (Visual Management). في صالة التجميع، حيث تتعدد المكونات الصغيرة (مسامير، مفصلات، غراء)، يؤدي سوء التنظيم إلى هدر هائل في وقت العمال (Motion Waste). التطبيق العميق للمنهجية سيشمل: 1. الفرز (Seiri): إزالة أي أداة لم تستخدم خلال الـ 30 يوماً الماضية من منطقة العمل. 2. الترتيب (Seiton): تطبيق قاعدة "30 ثانية"؛ يجب أن يتمكن العامل من العثور على أي أداة يحتاجها خلال 30 ثانية فقط. سيتم استخدام لوحات الظل (Shadow Boards) وترميز لوني (Color Coding) للأدوات حسب محطة العمل. 3. التلميع (Seiso): تحويل التنظيف إلى عملية فحص يومية للماكينات لاكتشاف تسرب الزيوت أو تآكل الأجزاء مبكراً. 4. التقييس (Seiketsu): وضع معايير بصرية واضحة (صور لما يجب أن تبدو عليه محطة العمل في نهاية الوردية). 5. الاستدامة (Shitsuke): دمج تدقيق 5S في الروتين اليومي للمشرفين، وربط نتائج التدقيق بتقييم الأداء الشهري للعمال.',
    expectedResults: 'توفير 20-30 دقيقة يومياً لكل عامل كان يقضيها في البحث عن الأدوات، وتقليل حوادث العمل (Safety Incidents) بنسبة 50% بفضل تنظيم مسارات الحركة وإزالة العوائق.',
    kpiHints: 'مؤشر الأداء: (5S Audit Score). تلميح استراتيجي: التحدي الأكبر في الـ 5S ليس في التطبيق الأول (حملة النظافة)، بل في الاستدامة (Sustain). اربط جزءاً من مكافآت العمال الشهرية بنتيجة التفتيش المفاجئ لمدى التزامهم بالمنهجية في مناطق عملهم.',
    examples: 'مثال عملي: رسم خطوط صفراء واضحة على الأرض لتحديد أماكن وقوف عربات النقل (Trolleys) ومناطق تجميع النفايات. عمل لوحات ظل (Shadow Boards) لتعليق الأدوات اليدوية (مفكات، شواكيش) بحيث يسهل اكتشاف الأداة المفقودة فوراً بمجرد النظر للوحة.',
    workflowSequence: ['استلام خطة الإنتاج', 'سحب المواد من المخزن', 'التشغيل الآلي (CNC)', 'التجميع وتطبيق 5S', 'التسليم لمنطقة الفحص'],
    subTasks: [
      { id: 401, title: 'فرز الأدوات والمعدات (Sort/Seiri)', completed: false, detail: 'سيتم جرد جميع الأدوات والتخلص من التالفة أو غير المستخدمة (Red Tagging) لتوفير مساحة العمل.' },
      { id: 402, title: 'تخطيط مسارات الحركة (Set in order/Seiton)', completed: false, detail: 'تحديد مسارات واضحة وآمنة لحركة المواد الخام والعمال لمنع التقاطعات وتقليل مسافات المشي.' },
      { id: 403, title: 'تصميم وتصنيع لوحات الظل (Shadow Boards) للأدوات اليدوية', completed: false, detail: 'تصميم لوحات مخصصة لكل محطة عمل لضمان عودة الأدوات لأماكنها الصحيحة.' },
      { id: 404, title: 'تدريب العمال على إجراءات التنظيف والفحص اليومي', completed: false, detail: 'تخصيص 10 دقائق نهاية كل وردية لتطبيق معايير التلميع والفحص.' },
      { id: 405, title: 'إعداد نماذج التفتيش والتدقيق الأسبوعي', completed: false, detail: 'إنشاء قوائم تحقق (Checklists) رقمية للمشرفين لتقييم التزام العمال بالمنهجية.' }
    ]
  },
  { 
    id: 5, dept: 'الجودة', task: 'إصدار دليل معايير القبول والرفض (Quality Acceptance Criteria)', deadline: 'الأسبوع 5', status: 'لم يبدأ',
    notes: 'يحتاج المشروع إلى ورش عمل مشتركة مع المكتب الفني وإدارة الإنتاج لتحديد التفاوتات المسموحة (Tolerances) بشكل واقعي.',
    deepDetails: 'الجودة في صناعة الأخشاب غالباً ما تكون ذاتية (Subjective) وتعتمد على رأي المفتش، مما يسبب نزاعات مستمرة. الدليل الجديد سيحول الجودة إلى معايير موضوعية قابلة للقياس (Objective & Measurable). سيتم استخدام أدوات قياس دقيقة مثل (Gloss Meter) لقياس درجة لمعان الدهان، و (Moisture Meter) لفحص رطوبة الخشب قبل التصنيع، بدلاً من الاعتماد على النظر واللمس فقط. الدليل سيقسم العيوب إلى ثلاث فئات: حرجة (Critical) تؤثر على سلامة أو وظيفة المنتج وتستوجب الرفض التام، رئيسية (Major) تؤثر على المظهر العام وتتطلب إعادة عمل، وثانوية (Minor) لا يلاحظها العميل العادي ويمكن قبولها بتجاوز محدد. سيتم إنشاء "مكتبة عيوب" (Defect Library) مادية في صالة الإنتاج، تحتوي على عينات حقيقية للأخطاء الشائعة (مثل: تسييل الدهان، تفكك شريط الحواف، خدوش السطح) لتكون مرجعاً بصرياً للعمال الجدد ومفتشي الجودة على حد سواء.',
    expectedResults: 'انخفاض معدل إعادة العمل (Rework Rate) بنسبة 25% نتيجة وضوح المعايير للعمال قبل بدء العمل، وتقليل وقت اتخاذ القرار لمفتشي الجودة بنسبة 50%.',
    kpiHints: 'مؤشر الأداء: (First Pass Yield - FPY). تلميح استراتيجي: تأكد من أن المعايير المكتوبة قابلة للقياس الموضوعي وليست ذاتية. بدلاً من كتابة عبارة مبهمة مثل "يجب أن يكون السطح ناعماً"، اكتب "يجب أن يجتاز السطح اختبار خشونة بدرجة (X) ولا يظهر به أي تموجات تحت إضاءة بزاوية 45 درجة".',
    examples: 'مثال عملي: تحديد تفاوت مسموح (Tolerance) قدره ±1 ملم في أبعاد درف الخزائن. وتوضيح بالصور الفرق الدقيق بين "خدش سطحي مقبول في مكان غير مرئي (خلفية الخزانة)" و"خدش عميق مرفوض تماماً في واجهة المنتج الرئيسية".',
    workflowSequence: ['استلام المنتج المجمع', 'الفحص البصري والقياسي (Tolerances)', 'تسجيل العيوب (إن وجدت)', 'إصدار تقرير القبول/الرفض', 'التغليف والشحن'],
    subTasks: [
      { id: 501, title: 'تجميع صور العيوب الشائعة', completed: false, detail: 'توثيق العيوب المتكررة في أقسام الدهان والتجميع لتضمينها في الدليل كأمثلة حية.' },
      { id: 502, title: 'اعتماد التفاوتات الهندسية (Tolerances)', completed: false, detail: 'عقد اجتماعات مع المكتب الفني لتحديد التفاوتات المسموحة بناءً على قدرات الماكينات الحالية.' },
      { id: 503, title: 'شراء ومعايرة أدوات القياس الجديدة (Gloss Meter, Moisture Meter)', completed: false, detail: 'توفير الأدوات اللازمة للمفتشين لضمان القياس الموضوعي بدلاً من التقييم البصري.' },
      { id: 504, title: 'إنشاء "مكتبة العيوب" المادية في صالة الإنتاج', completed: false, detail: 'تجهيز لوحات عرض تحتوي على عينات فعلية للعيوب المقبولة والمرفوضة كمرجع سريع للعمال.' },
      { id: 505, title: 'عقد ورش عمل مشتركة بين الإنتاج والجودة لتوحيد المفاهيم', completed: false, detail: 'شرح الدليل الجديد لجميع المشرفين والعمال لضمان الفهم المشترك لمعايير الجودة.' }
    ]
  }
];

const statusColors: Record<Status, string> = {
  'مكتمل': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'جاري العمل': 'bg-blue-100 text-blue-700 border-blue-200',
  'متأخر': 'bg-rose-100 text-rose-700 border-rose-200',
  'لم يبدأ': 'bg-slate-100 text-slate-700 border-slate-200',
};

const statusIcons: Record<Status, string> = {
  'مكتمل': 'fa-solid fa-circle-check',
  'جاري العمل': 'fa-solid fa-clock',
  'متأخر': 'fa-solid fa-triangle-exclamation',
  'لم يبدأ': 'fa-solid fa-circle-pause',
};

// Printable Component (Hidden from UI, used only for PDF generation)
const PrintablePresentation = React.forwardRef<HTMLDivElement, { data: Task[] }>(({ data }, ref) => {
  return (
    <div ref={ref} className="hidden print:block bg-white text-slate-900" dir="rtl">
      {/* Cover Page */}
      <div className="h-screen w-full flex flex-col items-center justify-center break-after-page bg-slate-900 text-white p-20 text-center relative">
        <h1 className="text-6xl font-black mb-6 leading-tight">خطة العمل التشغيلية<br/>الربع الأول 2026</h1>
        <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
          استعراض شامل ومفصل لخطوات التنفيذ، التحديات، والأهداف الاستراتيجية لكل إدارة.
        </p>
        <div className="absolute bottom-12 left-0 right-0 text-center text-slate-400 text-xl font-medium">
          Created by <a href="https://yasserious.com" className="text-blue-400 font-bold">yasserious.com</a>
        </div>
      </div>

      {/* Task Pages */}
      {data.map((task, index) => (
        <div key={task.id} className="h-screen w-full break-after-page p-16 flex flex-col relative">
          <div className="absolute top-16 left-16 text-slate-400 text-2xl font-bold">
            {index + 1} / {data.length}
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-slate-800 text-white px-5 py-2 rounded-xl text-xl font-bold">
              {task.dept}
            </span>
            <span className={`px-5 py-2 rounded-xl text-xl font-bold border ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className="text-slate-500 text-xl font-medium mr-auto">
              الموعد: {task.deadline}
            </span>
          </div>

          <h2 className="text-4xl font-black text-slate-900 mb-10 leading-tight">{task.task}</h2>

          <div className="grid grid-cols-2 gap-10 flex-1">
            <div className="space-y-8">
              {task.deepDetails && (
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">التفاصيل العميقة</h3>
                  <p className="text-lg text-slate-700 leading-relaxed text-justify">{task.deepDetails}</p>
                </div>
              )}
              {task.expectedResults && (
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">النتائج المتوقعة</h3>
                  <p className="text-lg text-emerald-900 leading-relaxed">{task.expectedResults}</p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {task.kpiHints && (
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <h3 className="text-xl font-bold text-amber-800 mb-3">مؤشرات الأداء (KPIs)</h3>
                  <p className="text-lg text-amber-900 leading-relaxed">{task.kpiHints}</p>
                </div>
              )}
              {task.examples && (
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3">أمثلة عملية</h3>
                  <p className="text-lg text-indigo-900 leading-relaxed">{task.examples}</p>
                </div>
              )}
              {task.workflowSequence && (
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">تسلسل العمل (Workflow)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-lg text-blue-900">
                    {task.workflowSequence.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              {task.subTasks && task.subTasks.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-2">المهام الفرعية</h3>
                  <ul className="space-y-4">
                    {task.subTasks.map(sub => (
                      <li key={sub.id} className="flex items-start gap-3">
                        <div className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 ${sub.completed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <div>
                          <p className="text-lg font-bold text-slate-800">{sub.title}</p>
                          {sub.detail && <p className="text-base text-slate-600 mt-1">{sub.detail}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center text-slate-500 text-lg font-medium">
            Created by <a href="https://yasserious.com" className="text-blue-600 font-bold">yasserious.com</a>
          </div>
        </div>
      ))}
    </div>
  );
});

export default function ActionPlan() {
  const [expandedIds, setExpandedIds] = useState<number[]>(initialData.map(t => t.id));
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // 0 is cover, 1..N are tasks
  
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: () => printRef.current,
    documentTitle: 'Action_Plan_Presentation',
  });

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const exportToCSV = () => {
    const headers = [
      'ID', 'القسم', 'المهمة', 'الموعد المستهدف', 'الحالة', 
      'ملاحظات التنفيذ', 'التفاصيل العميقة', 'النتائج المتوقعة', 
      'تلميحات المؤشرات', 'أمثلة عملية', 'المهام الفرعية'
    ];

    const escapeCSV = (str?: string) => {
      if (!str) return '""';
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csvRows = initialData.map(task => {
      const subTasksStr = task.subTasks 
        ? task.subTasks.map(st => `${st.title} (${st.completed ? 'مكتمل' : 'غير مكتمل'}) - ${st.detail || ''}`).join('\n')
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

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'action_plan_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextSlide = () => {
    if (currentSlide < initialData.length) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  // Expanded Content Component for List View
  const ExpandedContent = ({ task }: { task: Task }) => (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-slate-50 border-t border-slate-100 overflow-hidden"
    >
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {task.deepDetails && (
            <div>
              <h4 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-book-open text-blue-600"></i> التفاصيل العميقة (Presentation Details)
              </h4>
              <p className="text-slate-700 text-base leading-relaxed bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-justify">
                {task.deepDetails}
              </p>
            </div>
          )}

          {task.expectedResults && (
            <div>
              <h4 className="text-md font-bold text-slate-800 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-bullseye text-emerald-600"></i> النتائج المتوقعة
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 shadow-sm">
                {task.expectedResults}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {task.kpiHints && (
            <div>
              <h4 className="text-md font-bold text-slate-800 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-amber-600"></i> تلميحات المؤشرات (KPI Hints)
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-100 shadow-sm">
                {task.kpiHints}
              </p>
            </div>
          )}

          {task.examples && (
            <div>
              <h4 className="text-md font-bold text-slate-800 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb text-indigo-600"></i> أمثلة عملية
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 shadow-sm">
                {task.examples}
              </p>
            </div>
          )}

          {task.workflowSequence && (
            <div>
              <h4 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-route text-blue-600"></i> تسلسل العمل (Workflow)
              </h4>
              <div className="flex flex-col space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {task.workflowSequence.map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <span className="font-bold text-xs">{idx + 1}</span>
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                      <p className="font-bold text-slate-700 text-xs">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {task.subTasks && task.subTasks.length > 0 ? (
            <div>
              <h4 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-list-check text-slate-600"></i> المهام الفرعية التفصيلية
              </h4>
              <ul className="space-y-3">
                {task.subTasks.map(sub => (
                  <li key={sub.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${sub.completed ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-100 border-slate-300'}`}>
                        {sub.completed && <i className="fa-solid fa-check text-white text-xs"></i>}
                      </div>
                      <span className={`font-bold ${sub.completed ? 'text-slate-800' : 'text-slate-600'}`}>
                        {sub.title}
                      </span>
                    </div>
                    {sub.detail && (
                      <p className="text-xs text-slate-500 pr-7 leading-relaxed">{sub.detail}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-slate-400">
              <div className="text-center">
                <i className="fa-solid fa-layer-group text-3xl mb-2 opacity-50"></i>
                <p>لا توجد مهام فرعية مفصلة لهذه المرحلة.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (isPresentationMode) {
    const slideData = currentSlide === 0 ? null : initialData[currentSlide - 1];

    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col" dir="rtl">
        {/* Hidden Printable Component */}
        <PrintablePresentation ref={printRef} data={initialData} />

        {/* Presentation Header */}
        <div className="h-16 bg-slate-950 flex items-center justify-between px-6 border-b border-slate-800 text-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPresentationMode(false)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <span className="font-bold text-lg">وضع العرض التقديمي</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono">
              {currentSlide} / {initialData.length}
            </span>
            <button
              onClick={() => handlePrint()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              <FileDown size={18} />
              تصدير PDF
            </button>
          </div>
        </div>

        {/* Presentation Body */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-900">
          <AnimatePresence mode="wait">
            {currentSlide === 0 ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-4xl px-6"
              >
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-blue-900/50"
                >
                  <Presentation size={48} className="text-white" />
                </motion.div>
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
                >
                  خطة العمل التشغيلية
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-slate-400 leading-relaxed"
                >
                  استعراض شامل ومفصل لخطوات التنفيذ، التحديات، والأهداف الاستراتيجية لكل إدارة خلال الربع الأول من عام 2026.
                </motion.p>
              </motion.div>
            ) : slideData ? (
              <motion.div
                key={slideData.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full max-w-7xl h-full max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col m-6"
              >
                {/* Slide Header */}
                <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50">
                  <span className="bg-slate-900 text-white px-4 py-2 rounded-xl text-lg font-bold">
                    {slideData.dept}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-lg font-bold border ${statusColors[slideData.status]}`}>
                    {slideData.status}
                  </span>
                  <span className="text-slate-500 font-medium mr-auto flex items-center gap-2">
                    <i className="fa-regular fa-calendar"></i>
                    الموعد: {slideData.deadline}
                  </span>
                </div>

                {/* Slide Content */}
                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
                    {slideData.task}
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      {slideData.deepDetails && (
                        <div>
                          <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-book-open"></i> التفاصيل العميقة
                          </h3>
                          <p className="text-lg text-slate-700 leading-relaxed text-justify bg-blue-50/30 p-6 rounded-2xl border border-blue-100">
                            {slideData.deepDetails}
                          </p>
                        </div>
                      )}
                      {slideData.expectedResults && (
                        <div>
                          <h3 className="text-xl font-bold text-emerald-700 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-bullseye"></i> النتائج المتوقعة
                          </h3>
                          <p className="text-lg text-emerald-900 leading-relaxed bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                            {slideData.expectedResults}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      {slideData.kpiHints && (
                        <div>
                          <h3 className="text-xl font-bold text-amber-700 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-chart-line"></i> مؤشرات الأداء
                          </h3>
                          <p className="text-lg text-amber-900 leading-relaxed bg-amber-50 p-6 rounded-2xl border border-amber-100">
                            {slideData.kpiHints}
                          </p>
                        </div>
                      )}
                      
                      {slideData.examples && (
                        <div>
                          <h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-lightbulb"></i> أمثلة عملية
                          </h3>
                          <p className="text-lg text-indigo-900 leading-relaxed bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                            {slideData.examples}
                          </p>
                        </div>
                      )}

                      {slideData.workflowSequence && (
                        <div>
                          <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-route"></i> تسلسل العمل (Workflow)
                          </h3>
                          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <ol className="list-decimal list-inside space-y-2 text-lg text-blue-900">
                              {slideData.workflowSequence.map((step, idx) => (
                                <li key={idx} className="leading-relaxed">{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}

                      {slideData.subTasks && slideData.subTasks.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-list-check"></i> المهام الفرعية
                          </h3>
                          <div className="space-y-3">
                            {slideData.subTasks.map(sub => (
                              <div key={sub.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-3 mb-1">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${sub.completed ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-200 border-slate-300'}`}>
                                    {sub.completed && <i className="fa-solid fa-check text-white text-xs"></i>}
                                  </div>
                                  <span className="font-bold text-slate-800 text-lg">{sub.title}</span>
                                </div>
                                {sub.detail && <p className="text-slate-600 pr-8">{sub.detail}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700 shadow-2xl">
            <button 
              onClick={nextSlide}
              disabled={currentSlide === initialData.length}
              className="p-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 rounded-full text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: initialData.length + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? 'bg-blue-500 w-8' : 'bg-slate-500 hover:bg-slate-400'}`}
                />
              ))}
            </div>

            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 rounded-full text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Presentation Footer */}
          <div className="absolute bottom-2 left-0 right-0 text-center text-slate-500 text-sm font-medium z-50">
            Created by <a href="https://yasserious.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold transition-colors">yasserious.com</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <div className="mb-10 text-center relative">
        <h2 className="text-4xl font-black text-slate-900 mb-4">العرض التفصيلي: خطة العمل التشغيلية</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
          استعراض شامل ومفصل لخطوات التنفيذ، التحديات، والأهداف الاستراتيجية لكل إدارة خلال الربع الأول من عام 2026.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
          <button
            onClick={() => setIsPresentationMode(true)}
            className="w-full justify-center inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/20"
          >
            <Presentation size={20} />
            وضع العرض التقديمي
          </button>
          
          <button
            onClick={exportToCSV}
            className="w-full justify-center inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
          >
            <FileSpreadsheet size={20} />
            تصدير البيانات (CSV)
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {initialData.map((row) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={row.id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div 
                className="p-6 md:p-8 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                onClick={() => toggleExpand(row.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-slate-800 text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider">
                      {row.dept}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border flex items-center gap-2 ${statusColors[row.status]}`}>
                      <i className={statusIcons[row.status]}></i>
                      {row.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{row.task}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-2">
                    <i className="fa-regular fa-calendar text-blue-500"></i>
                    الموعد المستهدف: {row.deadline}
                  </div>
                </div>
                
                <div className="text-slate-400 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                  <motion.i 
                    animate={{ rotate: expandedIds.includes(row.id) ? 180 : 0 }}
                    className="fa-solid fa-chevron-down"
                  ></motion.i>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedIds.includes(row.id) && (
                  <ExpandedContent task={row} />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Footer */}
      <div className="text-center mt-12 pb-4 text-slate-500 font-medium">
        Created by <a href="https://yasserious.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors">yasserious.com</a>
      </div>
    </motion.div>
  );
}
