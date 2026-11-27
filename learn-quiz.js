/* STRUXA — Quizzes (English / العربية). Appears in "Understanding Structural Behaviour" next to the lessons.
   Add questions by editing the TOPICS list: every text is [English, Arabic]. */
(function(){
'use strict';
if(!window.STX||!window.I18N)return;
const D=document,$=id=>D.getElementById(id),KEY='struxa-quiz';
const lg=()=>I18N.lang==='ar'?1:0,AR=/([A-Za-zπδσ∂][^\u0600-\u06FF،؛؟]*?=[^\u0600-\u06FF،؛؟]*)/g,P=a=>{if(!Array.isArray(a))return a;const t=a[lg()];return lg()?t.replace(AR,m=>`<bdi dir="ltr">${m.replace(/\s+$/,'')}</bdi>${m.match(/\s*$/)[0]}`):t};const AW=()=>lg()?'←':'→';
const U={start:['Start quiz','ابدأ الاختبار'],mixed:['Mixed quiz','اختبار مختلط'],mixedD:['10 random questions from all lessons.','10 أسئلة عشوائية من جميع الدروس.'],qs:['questions','سؤالاً'],best:['Best score','أفضل نتيجة'],
 qOf:['Question','السؤال'],of:['of','من'],next:['Next question','السؤال التالي'],finish:['See result','عرض النتيجة'],correct:['Correct!','إجابة صحيحة!'],wrong:['Not quite.','إجابة غير صحيحة.'],score:['Your score','نتيجتك'],
 retry:['Try again','أعد المحاولة'],back:['All quizzes','كل الاختبارات'],lesson:['Open the lesson','افتح الدرس'],review:['Review','مراجعة'],yours:['Your answer','إجابتك'],right:['Correct answer','الإجابة الصحيحة'],
 perfect:['Excellent! You mastered this topic.','ممتاز! لقد أتقنت هذا الموضوع.'],good:['Good work. A little review will make it perfect.','عمل جيد. مراجعة بسيطة تجعل النتيجة كاملة.'],mid:['Keep going: review the lesson and try again.','واصل المحاولة: راجع الدرس ثم أعد الاختبار.'],low:['Time to review the lesson, then try again.','حان وقت مراجعة الدرس ثم إعادة المحاولة.'],
 title:['Quizzes','الاختبارات'],intro:['Pick a quiz. Each question has one correct answer and a short explanation.','اختر اختباراً. لكل سؤال إجابة صحيحة واحدة مع شرح مختصر.'],none:['No mistakes to review.','لا توجد أخطاء للمراجعة.'],attempts:['attempts','محاولات']};
const u=k=>U[k][lg()];

/* ------------------------------------------------------------------ questions: q, o (4 options), a (index of the correct option), e (explanation) */
const Q=(q,o,a,e)=>({q,o,a,e});
const TOPICS=[
{id:'joints',title:['Joints & Supports','الوصلات والمساند'],desc:['Pin, roller, fixed supports and joints.','المساند المفصلية والمتدحرجة والثابتة والوصلات.'],qs:[
 Q(['How many reaction components does a pin (hinged) support develop in a plane structure?','كم مركّبة لرد الفعل يولّدها المسند المفصلي في منشأ مستوٍ؟'],[['One','واحدة'],['Two','اثنتان'],['Three','ثلاث'],['None','لا شيء']],1,['It prevents horizontal and vertical movement (Rx and Ry) but allows rotation, so it develops no moment.','يمنع الحركة الأفقية والرأسية (Rx وRy) ويسمح بالدوران، لذلك لا يولّد عزماً.']),
 Q(['A roller support on a horizontal surface can resist…','يستطيع المسند المتدحرج على سطح أفقي أن يقاوم…'],[['A vertical force only','قوة رأسية فقط'],['A horizontal force only','قوة أفقية فقط'],['A moment only','عزماً فقط'],['Horizontal and vertical forces','قوتين أفقية ورأسية']],0,['It slides horizontally and rotates freely, so only the force perpendicular to the surface is resisted.','ينزلق أفقياً ويدور بحرية، لذلك لا يقاوم إلا القوة العمودية على السطح.']),
 Q(['Which support develops a moment reaction?','أي مسند يولّد عزم رد فعل؟'],[['Pin','المفصلي'],['Roller','المتدحرج'],['Fixed','الثابت'],['Inclined roller','المتدحرج المائل']],2,['A fixed support also prevents rotation, so it develops Rx, Ry and a moment M.','المسند الثابت يمنع الدوران أيضاً، فيولّد Rx وRy وعزماً M.']),
 Q(['The reaction of a roller on a sloping surface acts…','يؤثر رد فعل المسند المتدحرج على سطح مائل…'],[['Vertically','رأسياً'],['Horizontally','أفقياً'],['Perpendicular to the sloping surface','عمودياً على السطح المائل'],['Along the slope','بمحاذاة الميل']],2,['The roller slides along the slope, so the only force it can resist is the one perpendicular to it.','ينزلق المسند على الميل، فالقوة الوحيدة التي يقاومها هي العمودية عليه.']),
 Q(['What is the bending moment at an internal hinge?','كم يبلغ عزم الانحناء عند مفصل داخلي؟'],[['Maximum','أقصى ما يمكن'],['Zero','صفر'],['Equal to the shear force','يساوي قوة القص'],['Equal to the axial force','يساوي القوة المحورية']],1,['A hinge releases rotation, so it cannot transfer a moment (M = 0), while N and V still pass through.','المفصل يحرّر الدوران فلا ينقل عزماً (M = 0)، بينما تمر القوتان N وV.']),
 Q(['How many unknown reactions does a fixed support have in a plane?','كم مجهولاً لرد الفعل في المسند الثابت في المستوي؟'],[['1','1'],['2','2'],['3','3'],['4','4']],2,['Rx, Ry and the moment M.','Rx وRy والعزم M.']),
 Q(['Which joint keeps the angle between the members unchanged after loading?','أي وصلة تحافظ على الزاوية بين العناصر دون تغيّر بعد التحميل؟'],[['Pin joint','الوصلة المفصلية'],['Rigid joint','الوصلة الصلبة'],['Hinge','المفصل'],['Roller','المتدحرج']],1,['Members of a rigid joint rotate together, so N, V and M are all transmitted.','عناصر الوصلة الصلبة تدور معاً، فتنتقل N وV وM جميعاً.']),
 Q(['In an ideal pin-jointed truss each member carries…','في الجمالون المثالي ذي الوصلات المفصلية يحمل كل عضو…'],[['Axial force only','قوة محورية فقط'],['Axial force and moment','قوة محورية وعزماً'],['Shear and moment','قص وعزماً'],['Torsion','التواءً']],0,['With frictionless pins and loads at the joints, every member is a two-force member.','مع المفاصل عديمة الاحتكاك والأحمال عند العقد يكون كل عضو عضواً بقوتين.'])
]},
{id:'failure',title:['Failure Modes','أنماط الفشل'],desc:['Bending, shear, buckling, torsion, punching, fatigue.','الانحناء والقص والانبعاج والالتواء والاختراق والكلال.'],qs:[
 Q(['Which failure gives the most warning before collapse?','أي فشل يعطي أكبر إنذار قبل الانهيار؟'],[['Shear failure','فشل القص'],['Ductile yielding of steel in tension','خضوع الفولاذ المطيل في الشد'],['Punching shear','القص الاختراقي'],['Brittle fracture','الكسر الهش']],1,['Yielding is ductile: large deformation appears before the member breaks.','الخضوع سلوك مطيل: تظهر تشوهات كبيرة قبل أن ينكسر العضو.']),
 Q(['If the length of a pinned column is doubled, its Euler buckling load becomes…','إذا تضاعف طول عمود مفصلي فإن حمل أويلر للانبعاج يصبح…'],[['Half','النصف'],['One quarter','الربع'],['Double','الضعف'],['Four times','أربعة أضعاف']],1,['P_cr = π²EI/L², so doubling L divides P_cr by 4.','P_cr = π²EI/L²، فتضاعف L يقسم P_cr على 4.']),
 Q(['Diagonal cracks at about 45° near the supports of a beam indicate…','تدل الشقوق القطرية بزاوية 45° تقريباً قرب مساند العارضة على…'],[['Bending failure','فشل الانحناء'],['Shear failure','فشل القص'],['Fatigue','الكلال'],['Local buckling','الانبعاج الموضعي']],1,['They are diagonal tension cracks caused by the shear force.','هي شقوق شد قطري ناتجة عن قوة القص.']),
 Q(['Cracks that spiral around a concrete member are typical of…','الشقوق التي تلتف حلزونياً حول عضو خرساني نموذجية في…'],[['Torsion','الالتواء'],['Compression crushing','السحق الانضغاطي'],['Fatigue','الكلال'],['Bearing failure','فشل التحميل الموضعي']],0,['Pure shear from the twisting moment produces principal tension at 45°, so cracks wrap around the member.','القص الصرف الناتج عن عزم الالتواء يولّد شداً رئيسياً بزاوية 45° فتلتف الشقوق حول العضو.']),
 Q(['Lateral-torsional buckling is prevented mainly by…','يُمنع الانبعاج الجانبي الالتوائي أساساً عن طريق…'],[['Adding more tension steel','زيادة حديد الشد'],['Bracing the compression flange','تثبيت الشفة المضغوطة جانبياً'],['Using thinner flanges','استخدام شفاه أرق'],['Increasing the span','زيادة البحر']],1,['The compression flange acts like a column; lateral restraints shorten its buckling length.','تعمل الشفة المضغوطة كعمود؛ والتثبيتات الجانبية تقصّر طول انبعاجها.']),
 Q(['Punching shear typically occurs…','يحدث القص الاختراقي عادةً…'],[['In long slender columns','في الأعمدة الطويلة النحيفة'],['In flat slabs around columns','في البلاطات المسطحة حول الأعمدة'],['In bolt holes only','في ثقوب البراغي فقط'],['At the midspan of beams','في منتصف العوارض']],1,['The column pushes through the slab along a conical failure surface.','يخترق العمود البلاطة على طول سطح انهيار مخروطي.']),
 Q(['Fatigue failure is caused by…','ينتج فشل الكلال عن…'],[['One very large load','حمل واحد كبير جداً'],['Repeated load cycles that grow a crack','دورات تحميل متكررة تنمّي شقاً'],['Slow chemical attack only','الهجوم الكيميائي البطيء فقط'],['Excess temperature only','الحرارة الزائدة فقط']],1,['Millions of small cycles can grow a crack even when the stress is far below yield.','ملايين الدورات الصغيرة قد تنمّي شقاً حتى لو كان الإجهاد أقل بكثير من حد الخضوع.']),
 Q(['How many plastic hinges form the collapse mechanism of a fixed-ended beam under a uniform load?','كم مفصلاً لدناً يشكّل آلية انهيار عارضة مثبّتة الطرفين تحت حمل منتظم؟'],[['1','1'],['2','2'],['3','3'],['4','4']],2,['Hinges form at both supports and at midspan: w_c = 16 M_p / L².','تتشكل المفاصل عند المسندين وفي المنتصف: w_c = 16 M_p / L².'])
]},
{id:'history',title:['Analysis History','تاريخ التحليل'],desc:['Who discovered what, and when.','من اكتشف ماذا ومتى.'],qs:[
 Q(['Who stated the law of the lever?','من صاغ قانون الرافعة؟'],[['Galileo','غاليليو'],['Archimedes','أرخميدس'],['Euler','أويلر'],['Hooke','هوك']],1,['Archimedes of Syracuse, around 250 BC.','أرخميدس السيراكوزي، نحو 250 ق.م.']),
 Q(['Hooke’s law says that…','ينص قانون هوك على أن…'],[['Force is proportional to extension','القوة تتناسب مع الاستطالة'],['Stress is constant','الإجهاد ثابت'],['Moment equals force × time','العزم يساوي القوة × الزمن'],['Energy is always conserved','الطاقة محفوظة دائماً']],0,['F = k·x, or σ = E·ε: the basis of linear elastic analysis.','F = k·x أو σ = E·ε: أساس التحليل المرن الخطي.']),
 Q(['Who derived the buckling load of slender columns?','من استنتج حمل الانبعاج للأعمدة النحيفة؟'],[['Navier','نافييه'],['Euler','أويلر'],['Mohr','مور'],['Cross','كروس']],1,['Leonhard Euler, between 1744 and 1757: P_cr = π²EI/L².','ليونهارد أويلر بين 1744 و1757: P_cr = π²EI/L².']),
 Q(['The method of moment distribution was introduced in 1930 by…','قدّم طريقة توزيع العزوم عام 1930…'],[['Hardy Cross','هاردي كروس'],['Maxwell','ماكسويل'],['Castigliano','كاستيليانو'],['Clough','كلاف']],0,['Hardy Cross, University of Illinois.','هاردي كروس من جامعة إلينوي.']),
 Q(['Castigliano’s second theorem says that the displacement under a load equals…','تنص نظرية كاستيليانو الثانية على أن الإزاحة تحت الحمل تساوي…'],[['∂U/∂P: the derivative of strain energy with respect to the load','∂U/∂P: مشتقة طاقة التشوه بالنسبة إلى الحمل'],['The load divided by the stiffness only','الحمل مقسوماً على الجساءة فقط'],['The area under the moment diagram','المساحة تحت مخطط العزم'],['Zero for every load','صفراً لأي حمل']],0,['δ_i = ∂U/∂P_i; with ∂U/∂R = 0 for redundants.','δ_i = ∂U/∂P_i؛ و∂U/∂R = 0 للقوى الزائدة.']),
 Q(['The reciprocal theorem δ_ij = δ_ji is associated with…','ترتبط نظرية التبادل δ_ij = δ_ji بـ…'],[['Maxwell','ماكسويل'],['Coulomb','كولومب'],['Young','يونغ'],['Menabrea','مينابريا']],0,['James Clerk Maxwell, 1864; Betti generalised it in 1872.','جيمس كلارك ماكسويل عام 1864؛ وعمّمها بيتي عام 1872.']),
 Q(['The matrix stiffness method of the 1950s is associated with…','ترتبط طريقة مصفوفة الجساءة في الخمسينيات بـ…'],[['Turner, Clough, Martin and Topp','تيرنر وكلاف ومارتن وتوب'],['Archimedes','أرخميدس'],['Hooke','هوك'],['Galileo','غاليليو']],0,['Their 1956 paper laid the foundation of modern structural software.','أرست ورقتهم عام 1956 أساس برمجيات التحليل الإنشائي الحديثة.']),
 Q(['Which of these is the oldest?','أي مما يلي هو الأقدم؟'],[['Moment distribution','توزيع العزوم'],['The finite element method','طريقة العناصر المحدودة'],['Galileo’s study of beam strength','دراسة غاليليو لمقاومة العارضة'],['The matrix stiffness method','طريقة مصفوفة الجساءة']],2,['Galileo published it in 1638.','نشرها غاليليو عام 1638.'])
]}];

/* ------------------------------------------------------------------ state and storage */
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return{}}},save=o=>{try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* ------------------------------------------------------------------ styles */
const st=D.createElement('style');st.textContent=`
.qz-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}@media(max-width:760px){.qz-grid{grid-template-columns:1fr}}
.qz-card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:18px;box-shadow:var(--sh);display:flex;flex-direction:column;gap:8px;text-align:start}
.qz-card h3{font-size:19px}.qz-card p{margin:0;color:var(--mut);font-size:14px}.qz-meta{font-size:12.5px;color:var(--mut);display:flex;gap:12px;flex-wrap:wrap}.qz-card .stx-btn{margin-top:auto;align-self:flex-start}
.qz-box{background:var(--card);border:1px solid var(--bd);border-radius:18px;padding:20px;box-shadow:var(--sh);max-width:820px;margin:0 auto}
.qz-prog{height:8px;border-radius:99px;background:var(--bd);overflow:hidden;margin:8px 0 16px}.qz-prog i{display:block;height:100%;background:var(--ac);transition:width .25s}
.qz-q{font-size:clamp(18px,2.6vw,23px);font-weight:700;margin:0 0 14px;line-height:1.45}
.qz-opt{display:flex;gap:10px;align-items:center;width:100%;text-align:start;margin:0 0 10px;padding:12px 14px;border-radius:12px;border:1.5px solid var(--bd);background:var(--bg);color:var(--fg);font:inherit;font-size:15.5px;cursor:pointer}
.qz-opt:hover:not([disabled]){border-color:var(--ac)}.qz-opt b{flex:none;width:26px;height:26px;border-radius:50%;border:1.5px solid var(--mut);display:grid;place-items:center;font-size:13px}
.qz-opt.ok{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 14%,var(--bg))}.qz-opt.no{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 12%,var(--bg))}.qz-opt[disabled]{cursor:default}
.qz-exp{border-inline-start:4px solid var(--ac);background:color-mix(in srgb,var(--ac) 10%,var(--card));border-radius:10px;padding:10px 14px;margin:6px 0 12px;font-size:14.5px}.qz-exp b.ok{color:var(--ok)}.qz-exp b.no{color:var(--bad)}
.qz-big{font-size:clamp(40px,8vw,64px);font-weight:800;line-height:1;margin:6px 0}.qz-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
.qz-rev{border:1px solid var(--bd);border-radius:12px;padding:10px 12px;margin:0 0 10px;background:var(--bg);font-size:14.5px}.qz-rev .no{color:var(--bad)}.qz-rev .ok{color:var(--ok)}
`;D.head.appendChild(st);

/* ------------------------------------------------------------------ the section */
function custom(host){
 const root=D.createElement('div');host.appendChild(root);let S={mode:'menu'};
 const topicQs=t=>t.qs.map(q=>({q,t:t.id}));
 function start(id){const pool=id=='mixed'?TOPICS.flatMap(topicQs):topicQs(TOPICS.find(t=>t.id==id));
  const list=(id=='mixed'?shuffle(pool).slice(0,10):shuffle(pool)).map(x=>({q:x.q,t:x.t,order:shuffle([0,1,2,3])}));
  S={mode:'quiz',id,list,i:0,score:0,picked:null,log:[]};draw()}
 function draw(){S.mode=='menu'?menu():S.mode=='quiz'?question():result()}
 function menu(){const sc=load();
  root.innerHTML=`<div class="stx-hubhead"><h1>${u('title')}</h1><p>${u('intro')}</p></div><div class="qz-grid">`+
   [{id:'mixed',title:u('mixed'),desc:u('mixedD'),n:10},...TOPICS.map(t=>({id:t.id,title:P(t.title),desc:P(t.desc),n:t.qs.length}))].map(t=>{const b=sc[t.id];
    return`<div class="qz-card"><h3>${t.title}</h3><p>${t.desc}</p><div class="qz-meta"><span>${t.n} ${u('qs')}</span>${b?`<span>${u('best')}: <b>${b.best}/${b.total}</b></span><span>${b.attempts} ${u('attempts')}</span>`:''}</div><button class="stx-btn pri" data-q="${t.id}">${u('start')}</button></div>`}).join('')+'</div>';
  root.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>start(b.dataset.q))}
 function question(){const it=S.list[S.i],q=it.q,n=S.list.length,done=S.picked!==null;
  root.innerHTML=`<div class="qz-box"><div class="stx-count">${u('qOf')} ${S.i+1} ${u('of')} ${n}</div><div class="qz-prog"><i style="width:${(S.i+(done?1:0))/n*100}%"></i></div><p class="qz-q">${P(q.q)}</p>`+
   it.order.map((oi,k)=>{const cls=done?(oi==q.a?'ok':oi==S.picked?'no':''):'';return`<button class="qz-opt ${cls}" data-o="${oi}" ${done?'disabled':''}><b>${'ABCD'[k]}</b><span>${P(q.o[oi])}</span></button>`}).join('')+
   (done?`<div class="qz-exp"><b class="${S.picked==q.a?'ok':'no'}">${S.picked==q.a?u('correct'):u('wrong')}</b> ${P(q.e)}</div><button class="stx-btn pri" id="qz-next">${S.i+1<n?u('next'):u('finish')} ${AW()}</button>`:'')+'</div>';
  root.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{if(S.picked!==null)return;S.picked=+b.dataset.o;if(S.picked==q.a)S.score++;S.log.push({q,pick:S.picked,t:it.t});question()});
  const nx=$('qz-next');if(nx)nx.onclick=()=>{S.picked=null;S.i++;S.i<n?question():finish()}}
 function finish(){S.mode='result';const sc=load(),b=sc[S.id]||{best:0,total:S.list.length,attempts:0};b.attempts++;b.total=S.list.length;b.best=Math.max(b.best,S.score);sc[S.id]=b;save(sc);result()}
 function result(){const n=S.list.length,pc=S.score/n,msg=pc>=.9?u('perfect'):pc>=.7?u('good'):pc>=.5?u('mid'):u('low'),bad=S.log.filter(l=>l.pick!=l.q.a);
  root.innerHTML=`<div class="qz-box"><div class="stx-count">${u('score')}</div><div class="qz-big">${S.score} / ${n}</div><p>${msg}</p>`+
   (bad.length?`<h3>${u('review')}</h3>`+bad.map(l=>`<div class="qz-rev"><b>${P(l.q.q)}</b><br><span class="no">${u('yours')}: ${P(l.q.o[l.pick])}</span><br><span class="ok">${u('right')}: ${P(l.q.o[l.q.a])}</span><br>${P(l.q.e)}</div>`).join(''):`<p>${u('none')}</p>`)+
   `<div class="qz-row"><button class="stx-btn pri" id="qz-again">${u('retry')}</button><button class="stx-btn" id="qz-menu">${u('back')}</button>${S.id!='mixed'?`<button class="stx-btn" id="qz-less">${u('lesson')}</button>`:''}</div></div>`;
  $('qz-again').onclick=()=>start(S.id);$('qz-menu').onclick=()=>{S={mode:'menu'};draw()};const l=$('qz-less');if(l)l.onclick=()=>STX.go('sec',S.id)}
 const key=e=>{if(STX.cur!='sec'||S.mode!='quiz')return;const k='1234'.indexOf(e.key);if(k>=0&&S.picked===null){const b=root.querySelectorAll('[data-o]')[k];if(b)b.click()}else if(e.key=='Enter'&&S.picked!==null){const n=$('qz-next');if(n)n.click()}};
 addEventListener('keydown',key);draw();
 return{redraw:draw,destroy(){removeEventListener('keydown',key);root.remove()}}}

STX.register({id:'quiz',title:'Quizzes',badge:'24 + 10',desc:'Test what you learned with short multiple-choice quizzes on supports, failure modes and the history of analysis.',
 icon:'<svg viewBox="0 0 150 88" width="170" height="100" fill="none" stroke="var(--fg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="30" y="14" width="90" height="60" rx="10" fill="var(--card)"/><path d="M62 38a13 13 0 1 1 18 12c-4 2-5 5-5 9" stroke="var(--ac)" stroke-width="4"/><circle cx="75" cy="66" r="2.6" fill="var(--ac)" stroke="none"/></svg>',custom});
})();
