/* STRUXA — language support (English / العربية).
   * I18N.t(text) translates one string (used by the learning area).
   * A DOM translator also translates the analysis UI automatically using the dictionary below,
     and restores the English text when the language is switched back.
   * Add more strings with I18N.add({ 'English text': 'النص العربي' }). */
(function(){
'use strict';
const KEY='struxa-lang';
const I=window.I18N={lang:'en',dict:{},pat:[],ar:{},listeners:[]};
try{const s=localStorage.getItem(KEY);if(s==='ar'||s==='en')I.lang=s}catch(e){}
I.add=o=>Object.assign(I.dict,o);
I.t=s=>{if(I.lang!=='ar'||typeof s!=='string')return s;const d=I.dict[s];if(d!==undefined)return d;for(const p of I.pat){const m=s.match(p[0]);if(m)return p[1](...m)}return s};
I.onChange=f=>I.listeners.push(f);

/* ------------------------------------------------------------------ dictionary (analysis UI) */
I.add({
'Continuous Beam':'العارضة المستمرة','One-Way Slab Strip':'شريحة بلاطة باتجاه واحد','Flat Slab Frame':'إطار البلاطة المسطحة','General Frames':'الإطارات العامة','Plane Trusses':'الجمالونات المستوية',
'Structural system':'النظام الإنشائي','Structural analysis, step by step':'التحليل الإنشائي خطوة بخطوة','Install app':'تثبيت التطبيق','Install STRUXA as an app on this device':'تثبيت STRUXA كتطبيق على هذا الجهاز','Analyze':'حلّل','Back to the STRUXA start page':'العودة إلى الصفحة الرئيسية',
'+ Beam':'+ عارضة','+ Slab strip':'+ شريحة بلاطة','+ Flat frame':'+ إطار بلاطة مسطحة','+ General frame':'+ إطار عام','+ Truss':'+ جمالون','Duplicate':'تكرار','Name':'الاسم',
'Method':'الطريقة','Method of analysis':'طريقة التحليل','Slope Deflection':'الميل والانحراف','Moment Distribution':'توزيع العزوم','Slope Deflection Method':'طريقة الميل والانحراف','Moment Distribution Method':'طريقة توزيع العزوم',
'+ Span':'+ بحر','− Span':'− بحر','Load example':'تحميل مثال','Span':'البحر','Spans':'الأبحاث','Support':'المسند','Supports':'المساند','Left support':'المسند الأيسر','Right support':'المسند الأيمن',
'pinned / roller':'مفصلي / متدحرج','pinned':'مفصلي','fixed':'ثابت (مثبّت)','free':'حر','free (cantilever end)':'حر (طرف كابولي)','continuous':'مستمر','cantilever':'كابولي','roller':'متدحرج',
'Length (m)':'الطول (م)','L (m)':'الطول L (م)','Length L (m)':'الطول L (م)','EI (relative)':'EI (نسبي)','EI':'EI','EA (kN)':'EA (كيلو نيوتن)','Settlement (m, down +)':'هبوط المسند (م، للأسفل +)','Settlement (m)':'هبوط المسند (م)',
'Add load':'إضافة حمل','choose…':'اختر…','Full-span UDL':'حمل منتظم على كامل البحر','Partial-span Rectangular Load':'حمل مستطيل على جزء من البحر','Trapezoidal Load':'حمل شبه منحرف','Point load':'حمل مركّز','Line load (kN/m)':'حمل خطي (كيلو نيوتن/م)',
'Uniform load':'حمل منتظم','Trapezoidal load':'حمل شبه منحرف','Partial uniform load':'حمل منتظم جزئي','Loads':'الأحمال','Load':'الحمل','Direction':'الاتجاه','down':'للأسفل','up':'للأعلى','Down ↓':'للأسفل ↓','Up ↑':'للأعلى ↑','Left ←':'لليسار ←','Right →':'لليمين →',
'w (kN/m)':'w (كيلو نيوتن/م)','w start':'w عند البداية','w end':'w عند النهاية','P (kN)':'P (كيلو نيوتن)','Position (m)':'الموضع (م)','Start (m)':'البداية (م)','End (m)':'النهاية (م)','Remove':'حذف','Delete':'حذف',
'Results':'النتائج','Inputs':'المدخلات','Results appear here':'تظهر النتائج هنا','Enter the spans and loads, then press Analyze.':'أدخل الأبحاث والأحمال ثم اضغط «حلّل».','Press Analyze for this item.':'اضغط «حلّل» لهذا العنصر.',
'Critical values':'القيم الحرجة','Quantity':'الكمية','Value':'القيمة','at x (m)':'عند x (م)','Maximum moment (sagging)':'أقصى عزم (موجب)','Minimum moment (hogging)':'أدنى عزم (سالب)','Maximum shear':'أقصى قوة قص','Minimum shear':'أدنى قوة قص',
'Zero shear':'قص يساوي صفراً','Contraflexure (M = 0)':'نقاط انعكاس العزم (M = 0)','Equilibrium checks':'فحوصات الاتزان','Check':'الفحص','Total':'المجموع','Limit':'الحد','Relative residual':'البقية النسبية','Residual (relative)':'البقية النسبية',
'All equilibrium checks passed.':'اجتازت جميع فحوصات الاتزان.','Vertical forces':'القوى الرأسية','Moments about x = 0':'العزوم حول x = 0','Moments about x = 0 (relative)':'العزوم حول x = 0 (نسبي)',
'Reaction (kN ↑)':'رد الفعل (كيلو نيوتن ↑)','Reaction (kN)':'رد الفعل (كيلو نيوتن)','Reaction R (kN)':'رد الفعل R (كيلو نيوتن)','Reaction moment (kN·m)':'عزم رد الفعل (كيلو نيوتن·م)','Reaction moment (kN·m ↺)':'عزم رد الفعل (كيلو نيوتن·م ↺)','Rotation θ (rad)':'الدوران θ (راديان)',
'Shear Force Diagram (kN)':'مخطط قوة القص (كيلو نيوتن)','Bending Moment Diagram (kN·m) — sagging plotted downward':'مخطط عزم الانحناء (كيلو نيوتن·م) — العزم الموجب يُرسم للأسفل','Bending Moment Diagram (kN·m) — drawn on the tension side':'مخطط عزم الانحناء (كيلو نيوتن·م) — يُرسم على جهة الشد',
'Axial Force Diagram (kN), tension positive':'مخطط القوة المحورية (كيلو نيوتن)، الشد موجب','Shear Force Diagram — slab and columns (kN)':'مخطط قوة القص — البلاطة والأعمدة (كيلو نيوتن)',
'Fixed-end moments':'عزوم التثبيت','Fixed-end moments (superposition per span)':'عزوم التثبيت (بالتراكب لكل بحر)','Fixed-end moments and distribution':'عزوم التثبيت والتوزيع','FEM':'عزوم التثبيت','FEM at left (kN·m)':'عزم التثبيت يسار (كيلو نيوتن·م)','FEM at right (kN·m)':'عزم التثبيت يمين (كيلو نيوتن·م)',
'Joint moments':'عزوم العقد','Member end moments vs bending moment':'عزوم أطراف الأعضاء مقابل عزم الانحناء','Member-end moments (kN·m, counter-clockwise +)':'عزوم أطراف الأعضاء (كيلو نيوتن·م، عكس عقارب الساعة +)','Final end moments (kN·m, counter-clockwise +)':'عزوم الأطراف النهائية (كيلو نيوتن·م، عكس عقارب الساعة +)',
'Stiffness and distribution factors':'الجساءة ومعاملات التوزيع','Distribution cycles':'دورات التوزيع','Show every distribution cycle':'إظهار كل دورة توزيع','Distribution cycles (load case)':'دورات التوزيع (حالة التحميل)','Cycles (empty = until converged)':'عدد الدورات (فارغ = حتى التقارب)','Automatic (until converged)':'تلقائي (حتى التقارب)',
'Moment in beam':'العزم في العارضة','Moment M in beam':'العزم M في العارضة','Moment in beam (kN·m)':'العزم في العارضة (كيلو نيوتن·م)','Maximum sagging moment':'أقصى عزم موجب','Maximum hogging moment':'أقصى عزم سالب','Maximum sagging moment (kN·m)':'أقصى عزم موجب (كيلو نيوتن·م)','Maximum hogging moment (kN·m)':'أقصى عزم سالب (كيلو نيوتن·م)','Maximum shear (kN)':'أقصى قوة قص (كيلو نيوتن)','Minimum shear (kN)':'أدنى قوة قص (كيلو نيوتن)',
'Loading (light green: distributed, dark blue: point)':'التحميل (أخضر فاتح: موزع، أزرق داكن: مركّز)','3D deformation (animated)':'التشوه ثلاثي الأبعاد (متحرك)','Undeformed':'قبل التشوه','Exaggeration':'التكبير','Speed':'السرعة','Pause':'إيقاف مؤقت','Front':'أمامي','Side':'جانبي','Iso':'مجسّم',
'Project report (Word) — manual solutions':'تقرير المشروع (Word) — حل يدوي مفصّل','Project name':'اسم المشروع','Client':'العميل','Engineer':'المهندس','Date':'التاريخ','Your Word template (.docx, optional)':'قالب Word الخاص بك (.docx، اختياري)','Generate Word report':'إنشاء تقرير Word',
'Template markers (type them as plain text in your .docx):':'علامات القالب (اكتبها كنص عادي في ملف docx):','Total length':'الطول الكلي','Span 1':'البحر 1',
/* slab strip */
'Strip width b (m)':'عرض الشريحة b (م)','Slab thickness h (mm)':'سماكة البلاطة h (مم)','Slab thickness h':'سماكة البلاطة h','Load input':'إدخال الأحمال','Area load (kN/m²) → × b':'حمل مساحي (كيلو نيوتن/م²) → × b','Analytical strip width b':'عرض الشريحة التحليلية b','Slab strip':'شريحة بلاطة','One-Way Slab Continuous Strip':'شريحة بلاطة مستمرة باتجاه واحد','Strip width must be positive.':'يجب أن يكون عرض الشريحة موجباً.',
/* flat slab / frames */
'Columns (one per column line, left to right)':'الأعمدة (عمود لكل محور، من اليسار إلى اليمين)','Column':'العمود','Columns':'الأعمدة','c1 along frame (mm)':'c1 على طول الإطار (مم)','c2 across (mm)':'c2 عرضياً (مم)','Height above slab (m)':'الارتفاع فوق البلاطة (م)','Height below slab (m)':'الارتفاع تحت البلاطة (م)','E concrete (kN/m²)':'معامل مرونة الخرسانة (كيلو نيوتن/م²)','E column / E slab':'E العمود / E البلاطة',
'Flat slab frame':'إطار بلاطة مسطحة','General frame':'إطار عام','Equivalent Frame of Flat Slab':'الإطار المكافئ للبلاطة المسطحة','Equivalent Frame of Flat Slab (Moment Distribution)':'الإطار المكافئ للبلاطة المسطحة (توزيع العزوم)','Between column lines':'بين محاور الأعمدة','Column moments (kN·m)':'عزوم الأعمدة (كيلو نيوتن·م)','Slab moment at column (kN·m)':'عزم البلاطة عند العمود (كيلو نيوتن·م)',
'DF left':'معامل التوزيع يسار','DF right':'معامل التوزيع يمين','DF slab L':'معامل توزيع البلاطة (يسار)','DF slab R':'معامل توزيع البلاطة (يمين)','DF col. above':'معامل توزيع العمود العلوي','DF col. below':'معامل توزيع العمود السفلي','K left':'الجساءة يسار','K right':'الجساءة يمين','K slab left':'جساءة البلاطة يسار','K slab right':'جساءة البلاطة يمين','K col. above':'جساءة العمود العلوي','K col. below':'جساءة العمود السفلي',
'Reactions (column loads)':'ردود الأفعال (أحمال الأعمدة)','Reactions':'ردود الأفعال','Member':'العضو','Members':'الأعضاء','Member end':'طرف العضو','Node':'العقدة','Nodes':'العقد','Nodes / members':'العقد / الأعضاء','From':'من','To':'إلى','From → To':'من ← إلى',
'M start':'M عند البداية','M end':'M عند النهاية','V start':'V عند البداية','V end':'V عند النهاية','N start':'N عند البداية','N end':'N عند النهاية','M max':'M الأقصى','M min':'M الأدنى','M (kN·m)':'M (كيلو نيوتن·م)','N (kN)':'N (كيلو نيوتن)','Axial force N (kN)':'القوة المحورية N (كيلو نيوتن)','Axial N start':'القوة المحورية عند البداية','Axial N end':'القوة المحورية عند النهاية',
'Hinge at start':'مفصل عند البداية','Hinge at end':'مفصل عند النهاية','Distributed load':'حمل موزع','Distributed (member end: Δ)':'موزع (طرف العضو: Δ)','Load type':'نوع الحمل','Along member +':'على طول العضو +','Along member −':'على طول العضو −','Normal + (member left side)':'عمودي + (الجهة اليسرى للعضو)','Normal − (member right side)':'عمودي − (الجهة اليمنى للعضو)',
'Frame preview':'معاينة الإطار','Joint equilibrium':'اتزان العقدة','Joint force equilibrium':'اتزان القوى عند العقدة','Structure and loads':'المنشأ والأحمال','Restraint data':'بيانات التقييد','Joints / members / support restraints':'العقد / الأعضاء / قيود المساند',
'Settlement dx →':'هبوط dx →','dy ↓':'dy ↓','Settlement δ (m, downward)':'هبوط δ (م، للأسفل)',
/* truss */
'Matrix stiffness method (any truss)':'طريقة مصفوفة الجساءة (أي جمالون)','Method of joints (determinate)':'طريقة العقد (جمالون محدد استاتيكياً)','Grid (m)':'الشبكة (م)','Snap to grid':'الالتصاق بالشبكة','Draw the truss':'ارسم الجمالون','＋ Node':'＋ عقدة','⟋ Connect':'⟋ وصل','✥ Move':'✥ تحريك','✕ Delete':'✕ حذف','☰ Pan':'☰ تحريك العرض','Fit':'ملاءمة',
'Tap the grid to place a node (tap an existing node to select it).':'اضغط على الشبكة لوضع عقدة (اضغط على عقدة لتحديدها).','Drag a node to move it.':'اسحب العقدة لتحريكها.','Drag to pan the view.':'اسحب لتحريك العرض.','Tap a node (removes its members) or a member to delete it.':'اضغط على عقدة (تُحذف أعضاؤها) أو على عضو لحذفه.',
'x (m)':'x (م)','y (m)':'y (م)','Angle (°)':'الزاوية (°)','Displ. 1':'الإزاحة 1','Displ. 2 ↓':'الإزاحة 2 ↓','Load Fx →':'الحمل Fx →','Fy ↑':'Fy ↑','Fx → (kN)':'Fx → (كيلو نيوتن)','Fy ↑ (kN)':'Fy ↑ (كيلو نيوتن)',
'Free (no support)':'حر (بدون مسند)','Pinned':'مفصلي','Roller (moves horizontally)':'متدحرج (يتحرك أفقياً)','Roller (moves vertically)':'متدحرج (يتحرك رأسياً)','Inclined roller':'متدحرج مائل','+ Node':'+ عقدة','+ Member':'+ عضو','Remove member':'حذف العضو',
'Plane Truss':'جمالون مستوٍ','Plane truss (pin-jointed bars)':'جمالون مستوٍ (قضبان مفصلية الوصلات)','Method of Joints':'طريقة العقد','Method of joints':'طريقة العقد','Matrix Stiffness Method':'طريقة مصفوفة الجساءة','Member forces':'قوى الأعضاء','Elongation (m)':'الاستطالة (م)','Zero force':'قوة صفرية','Zero-force members:':'الأعضاء ذات القوة الصفرية:',
'Static check:':'الفحص الاستاتيكي:','Static indeterminacy m + r − 2j':'درجة اللاتحديد الاستاتيكي m + r − 2j','Largest joint displacement (m)':'أكبر إزاحة للعقد (م)','Joints and reactions':'العقد وردود الأفعال','Rx (kN →)':'Rx (كيلو نيوتن →)','Ry (kN ↑)':'Ry (كيلو نيوتن ↑)','Rx (kN)':'Rx (كيلو نيوتن)','Ry (kN)':'Ry (كيلو نيوتن)','Resultant (kN)':'المحصلة (كيلو نيوتن)','Resultant (m)':'المحصلة (م)',
'Maximum tension (kN)':'أقصى شد (كيلو نيوتن)','Maximum compression (kN)':'أقصى ضغط (كيلو نيوتن)','Axial forces (kN) — tension red, compression blue, zero-force grey':'القوى المحورية (كيلو نيوتن) — الشد أحمر، الضغط أزرق، القوة الصفرية رمادي',
'Matrix stiffness solution (code numbers, K, Kff·Df = Pf − Kfr·Dr, reactions)':'حل مصفوفة الجساءة (أرقام الأكواد، K، Kff·Df = Pf − Kfr·Dr، ردود الأفعال)','Structure stiffness matrix K (kN/m)':'مصفوفة جساءة المنشأ K (كيلو نيوتن/م)','Free displacements Df = Kff⁻¹·(Pf − Kfr·Dr)':'الإزاحات الحرة Df = Kff⁻¹·(Pf − Kfr·Dr)','Reactions R = Krf·Df + Krr·Dr − Pr':'ردود الأفعال R = Krf·Df + Krr·Dr − Pr','Pf − Kfr·Dr (kN)':'Pf − Kfr·Dr (كيلو نيوتن)','Df (m)':'Df (م)','− applied load':'− الحمل المطبّق','DOF':'درجة الحرية',
/* generic */
'Error: ':'خطأ: ','Untitled project':'مشروع بدون عنوان','Project Summary':'ملخص المشروع','Building report…':'جارٍ إنشاء التقرير…','Save cancelled.':'أُلغي الحفظ.','Add to Home screen':'إضافة إلى الشاشة الرئيسية','Add to Home Screen':'إضافة إلى الشاشة الرئيسية','Install STRUXA':'تثبيت STRUXA',
'Unstable structure (singular system).':'منشأ غير مستقر (جملة معادلات شاذة).','The truss has no members.':'لا يحتوي الجمالون على أعضاء.','The frame has no members.':'لا يحتوي الإطار على أعضاء.','At least one span required.':'مطلوب بحر واحد على الأقل.','Add at least two nodes first.':'أضف عقدتين على الأقل أولاً.','Every member needs two different nodes.':'يجب أن يربط كل عضو عقدتين مختلفتين.',
'The truss is unstable (mechanism) or the supports are insufficient.':'الجمالون غير مستقر (آلية حركة) أو أن المساند غير كافية.','The structure is unstable (mechanism) or the supports are insufficient.':'المنشأ غير مستقر (آلية حركة) أو أن المساند غير كافية.','Unstable: needs two vertical supports or one fixed support.':'غير مستقر: يلزم مسندان رأسيان أو مسند مثبّت واحد.','Unstable: both ends free.':'غير مستقر: الطرفان حران.',
'Check FAILED — do not use these results.':'فشل الفحص — لا تستخدم هذه النتائج.','Equilibrium check FAILED — do not use these results.':'فشل فحص الاتزان — لا تستخدم هذه النتائج.',
'⌂ Home':'⌂ الرئيسية'
});
const nm=(a,b)=>I.pat.push([a,b]);
nm(/^Beam (\d+)$/,(m,n)=>'عارضة '+n);nm(/^Slab strip (\d+)$/,(m,n)=>'شريحة بلاطة '+n);nm(/^Flat slab frame (\d+)$/,(m,n)=>'إطار بلاطة مسطحة '+n);nm(/^General frame (\d+)$/,(m,n)=>'إطار عام '+n);nm(/^Truss (\d+)$/,(m,n)=>'جمالون '+n);
nm(/^Span (\d+)$/,(m,n)=>'البحر '+n);nm(/^Support (\d+)$/,(m,n)=>'المسند '+n);nm(/^Span (\d+) max \/ min moment$/,(m,n)=>'أقصى / أدنى عزم في البحر '+n);nm(/^Span (\d+) max moment$/,(m,n)=>'أقصى عزم في البحر '+n);
nm(/^Point load P=(.+) at x=(.+)$/,(m,p,x)=>'حمل مركّز P='+p+' عند x='+x);nm(/^Distributed w=(.+) on \[(.+)\]$/,(m,w,r)=>'حمل موزع w='+w+' على ['+r+']');nm(/^Distributed w=(.+)→(.+) on \[(.+)\]$/,(m,a,b,r)=>'حمل موزع w='+a+'→'+b+' على ['+r+']');
nm(/^Σ reactions = (.+), Σ loads = (.+)\.$/,(m,a,b)=>'مجموع ردود الأفعال = '+a+'، مجموع الأحمال = '+b+'.');nm(/^Member (\d+)$/,(m,n)=>'العضو '+n);nm(/^Column (\d+)$/,(m,n)=>'العمود '+n);nm(/^Joint (\d+)$/,(m,n)=>'العقدة '+n);

/* ------------------------------------------------------------------ DOM translator */
const ATTR=['placeholder','title','aria-label'];
let busy=false;
const skip=e=>!e||/^(SCRIPT|STYLE|TEXTAREA|CODE|PRE|NOSCRIPT)$/.test(e.tagName)||(e.closest&&e.closest('[data-noi18n]'));
function doText(n){const e=n.parentElement;if(skip(e))return;const cur=n.nodeValue;if(n.__o===undefined||(n.__t!==undefined&&cur!==n.__t)){n.__o=cur}
 const o=n.__o,core=o.trim();let out=o;if(core&&I.lang==='ar'){const t=I.t(core);if(t!==core)out=o.replace(core,()=>t)}
 if(out!==cur){busy=true;n.nodeValue=out;busy=false}n.__t=out}
function doAttrs(el){if(!el.getAttribute||skip(el))return;for(const a of ATTR){const cur=el.getAttribute(a);if(cur==null)continue;el.__oa=el.__oa||{};const rec=el.__oa[a];let o;if(!rec||cur!==rec.t)o=cur;else o=rec.o;let out=o;if(I.lang==='ar'){const t=I.t(o.trim());if(t!==o.trim())out=t}
  if(out!==cur){busy=true;el.setAttribute(a,out);busy=false}el.__oa[a]={o,t:out}}}
function walk(root){if(!root)return;if(root.nodeType===3){doText(root);return}if(root.nodeType!==1)return;doAttrs(root);const w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){n.nodeType===3?doText(n):doAttrs(n)}}
let mo=null;
function observe(){if(mo)return;mo=new MutationObserver(ms=>{if(busy)return;for(const m of ms){if(m.type==='childList')m.addedNodes.forEach(walk);else if(m.type==='characterData')doText(m.target);else if(m.type==='attributes')doAttrs(m.target)}});
 mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTR})}

/* ------------------------------------------------------------------ language switch */
const css=`html[dir=rtl] svg,html[dir=rtl] canvas,html[dir=rtl] .stx-eq,html[dir=rtl] .ltr{direction:ltr}
html[lang=ar] body{font-family:"Noto Sans Arabic","Segoe UI",Tahoma,"Noto Naskh Arabic",system-ui,sans-serif}
html[lang=ar] .stx-kick,html[lang=ar] .stx-fact h4,html[lang=ar] .stx-badge{letter-spacing:0;text-transform:none}
html[dir=rtl] .stx-slide{--dx:0px}
html[dir=rtl] input[type=number],html[dir=rtl] input[type=date]{direction:ltr;text-align:right}
.i18n-lang{font-weight:700;white-space:nowrap}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function setDoc(){document.documentElement.lang=I.lang;document.documentElement.dir=I.lang==='ar'?'rtl':'ltr';
 if(I.lang==='ar'&&!document.getElementById('i18n-font')){const l=document.createElement('link');l.id='i18n-font';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap';document.head.appendChild(l)}
 document.querySelectorAll('.i18n-lang').forEach(b=>{b.textContent=I.lang==='ar'?'English':'العربية';b.setAttribute('data-noi18n','');b.title=I.lang==='ar'?'Switch to English':'التبديل إلى العربية'})}
I.set=function(l){if(l!=='ar'&&l!=='en')return;I.lang=l;try{localStorage.setItem(KEY,l)}catch(e){}setDoc();walk(document.body);I.listeners.forEach(f=>{try{f(l)}catch(e){console.error(e)}})};
I.toggle=()=>I.set(I.lang==='ar'?'en':'ar');I.paint=setDoc;
/* create a language button inside a container (used by the learning area and the analysis header) */
I.button=function(parent,before){const b=document.createElement('button');b.className='stx-btn i18n-lang';b.type='button';b.onclick=I.toggle;if(before)parent.insertBefore(b,before);else parent.appendChild(b);setDoc();return b};
function init(){setDoc();observe();walk(document.body)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
