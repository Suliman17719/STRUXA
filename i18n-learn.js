/* STRUXA — Arabic strings of the learning area chrome (home, topics, carousel controls).
   The lesson texts themselves are translated through STX.ar overlays (see learn-ar-*.js). */
(function(){
'use strict';
if(!window.I18N)return;
I18N.add({
'Structural analysis, step by step — and the behaviour behind it':'التحليل الإنشائي خطوة بخطوة — وفهم السلوك الذي يقف خلفه',
'Structural Analysis':'التحليل الإنشائي','Understanding Structural Behaviour':'فهم السلوك الإنشائي',
'Analyse continuous beams, one-way slabs, flat slab frames, general frames and plane trusses — with full step-by-step Word reports.':'حلّل العوارض المستمرة والبلاطات باتجاه واحد وإطارات البلاطات المسطحة والإطارات العامة والجمالونات المستوية — مع تقارير Word كاملة خطوة بخطوة.',
'Learn by seeing: animated 3D models, illustrated carousels and short theory notes on how structures really work.':'تعلّم بالمشاهدة: نماذج ثلاثية الأبعاد متحركة وشرائح مصوّرة وملاحظات نظرية مختصرة عن كيفية عمل المنشآت فعلياً.',
'Beams':'العوارض','Frames':'الإطارات','Plane trusses':'الجمالونات المستوية','Word reports':'تقارير Word','Joints & supports':'الوصلات والمساند','Failure modes':'أنماط الفشل','Analysis history':'تاريخ التحليل','Quizzes':'الاختبارات',
'Open the analysis tools →':'فتح أدوات التحليل ←','Start learning →':'ابدأ التعلّم ←','← Home':'← الرئيسية','← Topics':'← المواضيع','← Previous':'→ السابق','Next →':'التالي ←','Restart ↺':'إعادة ↺','⛶ Present':'⛶ عرض تقديمي','End of lesson':'نهاية الدرس',
'Pick a topic. Each lesson is a swipeable carousel with diagrams, real-world illustrations and live animated 3D models you can rotate.':'اختر موضوعاً. كل درس عبارة عن شرائح قابلة للتمرير تضم مخططات وصوراً توضيحية من الواقع ونماذج ثلاثية الأبعاد متحركة يمكنك تدويرها.',
'Structural Joints & Supports':'الوصلات والمساند الإنشائية','Failure Modes':'أنماط الفشل','Structural Analysis History':'تاريخ التحليل الإنشائي',
'Pin, roller, fixed, inclined, guided and spring supports; hinged, rigid and truss joints. Diagrams, real-world illustrations and animated 3D models.':'مساند مفصلية ومتدحرجة وثابتة ومائلة ومُوجَّهة ونابضية؛ ووصلات مفصلية وصلبة ووصلات الجمالون. مخططات وصور توضيحية ونماذج ثلاثية الأبعاد متحركة.',
'Bending, shear, torsion, buckling, punching, fatigue, plastic collapse and more. Diagrams, photos and an animated 3D model for every mode.':'الانحناء والقص والالتواء والانبعاج والاختراق والكلال والانهيار اللدن وغيرها. مخططات وصور ونموذج ثلاثي الأبعاد متحرك لكل نمط.',
'From Archimedes’ lever to the finite element method: the theories in order of discovery, with their equations and the people who created them.':'من رافعة أرخميدس إلى طريقة العناصر المحدودة: النظريات بترتيب اكتشافها مع معادلاتها وأصحابها.',
'Test what you learned with short multiple-choice quizzes on supports, failure modes and the history of analysis.':'اختبر ما تعلمته بأسئلة اختيار من متعدد قصيرة عن المساند وأنماط الفشل وتاريخ التحليل.',
'Coming soon':'قريباً','Open':'فتح',
'Symbol':'الرمز','In reality':'في الواقع','3D animation':'نموذج ثلاثي الأبعاد','Real photo':'صورة حقيقية','Diagram':'مخطط','Stress–strain':'الإجهاد–الانفعال','Stresses':'الإجهادات','Load–deflection':'الحمل–الانحراف','S–N curve':'منحنى S–N','Portrait':'صورة شخصية','Portraits':'الصور الشخصية',
'❚❚ Pause':'❚❚ إيقاف','▶ Play':'▶ تشغيل','⟲ Reset view':'⟲ إعادة الزاوية','Drag to rotate · scroll or pinch to zoom':'اسحب للتدوير · مرّر أو اضغط بإصبعين للتكبير',
'No photo available here yet.':'لا توجد صورة هنا بعد.','Add a picture named':'أضف صورة باسم','to the STRUXA folder, or connect to the internet.':'إلى مجلد STRUXA، أو اتصل بالإنترنت.'
});
I18N.pat.push([/^(\d+) slides$/,(m,n)=>n+' شريحة'],[/^Next: (.+)$/,(m,t)=>'التالي: '+I18N.t(t)],[/^Reaction: (.+)$/,(m,t)=>'رد الفعل: '+t],
 [/^(Move x|Move y|Rotate): (free|locked|elastic)$/,(m,a,b)=>({'Move x':'الحركة في x','Move y':'الحركة في y','Rotate':'الدوران'}[a])+': '+({free:'حرة',locked:'مقيّدة',elastic:'مرنة'}[b])]);
})();
