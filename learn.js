/* STRUXA — learning area core (home page, hub, carousel, 3D viewer).
   Content is registered by separate files: learn-joints.js, learn-failure.js, learn-history.js.
   Everything here is self-contained (no external libraries) so it works offline. */
(function(){
'use strict';
const D=document,B=D.body,$=id=>D.getElementById(id);
const STX=window.STX={sections:{},cur:'home',order:['joints','failure','history']};

/* ---------------------------------------------------------------- styles */
const css=`
body[data-view]:not([data-view=analysis]) :is(.top,#instmsg,.items,.app,.ft){display:none!important}
.stx-view{display:none}
body[data-view=home] #stx-home{display:flex}body[data-view=hub] #stx-hub{display:block}body[data-view=sec] #stx-sec{display:block}
.stx-btn{background:var(--card);color:var(--fg);border:1px solid var(--bd);border-radius:10px;padding:8px 14px;font:inherit;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.stx-btn:hover{border-color:var(--ac)}.stx-btn.pri{background:var(--ac);color:#111;border-color:var(--ac)}.stx-btn[disabled]{opacity:.4;cursor:not-allowed}
#stx-homebtn{flex:none}.brand svg,.brand img{width:44px;height:44px;flex:none}
/* home */
#stx-home{min-height:100vh;flex-direction:column;align-items:center;justify-content:center;gap:34px;padding:36px 18px 44px;text-align:center;
 background:radial-gradient(1200px 520px at 50% -10%,color-mix(in srgb,var(--ac) 16%,transparent),transparent 70%),linear-gradient(var(--bd) 1px,transparent 1px) 0 0/44px 44px,linear-gradient(90deg,var(--bd) 1px,transparent 1px) 0 0/44px 44px,var(--bg)}
.stx-hero svg{display:block;margin:0 auto;width:76px;height:76px;max-width:none;filter:drop-shadow(0 6px 14px rgba(232,113,10,.35))}.stx-hero h1{font-size:clamp(34px,6vw,56px);letter-spacing:.14em;margin:12px 0 6px}.stx-hero p{margin:0;color:var(--mut);font-size:clamp(14px,2vw,17px)}
.stx-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;width:min(940px,100%)}
.stx-choice{text-align:left;background:var(--card);color:var(--fg);border:1px solid var(--bd);border-radius:18px;padding:22px 22px 20px;cursor:pointer;font:inherit;box-shadow:var(--sh);transition:transform .18s,border-color .18s,box-shadow .18s;display:flex;flex-direction:column;gap:10px}
.stx-choice:hover,.stx-choice:focus-visible{transform:translateY(-4px);border-color:var(--ac);box-shadow:0 14px 34px rgba(232,113,10,.18);outline:none}
.stx-choice .ic{height:92px;display:flex;align-items:center}.stx-choice .ic svg{width:220px;height:90px;max-width:100%}.stx-card .ic svg{width:170px;height:100px;max-width:100%}.stx-bar .mini svg{width:26px;height:26px}.stx-choice h2{font-size:23px;margin:0}.stx-choice p{margin:0;color:var(--mut);font-size:14px;line-height:1.5}
.stx-choice .go{margin-top:auto;font-weight:700;color:var(--ts)}
.stx-choice .tags{display:flex;flex-wrap:wrap;gap:6px}.stx-choice .tags span{font-size:11.5px;font-weight:600;border:1px solid var(--bd);border-radius:999px;padding:2px 9px;color:var(--mut)}
@media(max-width:760px){.stx-choices{grid-template-columns:1fr}#stx-home{justify-content:flex-start;padding-top:30px}}
/* bars */
.stx-bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;display:flex;align-items:center;gap:12px;padding:9px 16px;background:var(--card);border-bottom:1px solid var(--bd)}
.stx-bar h2{font-size:17px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.stx-bar .mini{display:flex;align-items:center;gap:8px}
.stx-wrap{max-width:1180px;margin:0 auto;padding:18px 16px 60px}
/* hub */
.stx-hubhead{margin:6px 0 20px}.stx-hubhead h1{font-size:clamp(24px,4vw,34px)}.stx-hubhead p{color:var(--mut);margin:6px 0 0;max-width:720px}
.stx-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.stx-card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:10px;text-align:left;color:var(--fg);font:inherit;cursor:pointer;box-shadow:var(--sh);transition:transform .18s,border-color .18s}
.stx-card:hover:not([disabled]){transform:translateY(-3px);border-color:var(--ac)}.stx-card[disabled]{cursor:default;opacity:.72}
.stx-card .ic{height:110px;border-radius:12px;background:var(--bg);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center}
.stx-card h3{font-size:19px}.stx-card p{margin:0;color:var(--mut);font-size:13.5px}.stx-badge{align-self:flex-start;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;border-radius:999px;padding:2px 9px;background:var(--ac);color:#111}.stx-badge.soon{background:var(--bd);color:var(--mut)}
@media(max-width:900px){.stx-cards{grid-template-columns:1fr}}
/* carousel */
.stx-car{position:relative}.stx-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}.stx-count{font-weight:700;color:var(--mut);font-size:13px}.stx-dots{display:flex;gap:6px;flex-wrap:wrap;flex:1;justify-content:center}
.stx-dots button{width:11px;height:11px;border-radius:50%;padding:0;border:1px solid var(--mut);background:transparent;cursor:pointer}.stx-dots button.on{background:var(--ac);border-color:var(--ac);transform:scale(1.25)}
.stx-slide{background:var(--card);border:1px solid var(--bd);border-radius:18px;padding:20px;box-shadow:var(--sh);animation:stxin .28s ease}
@keyframes stxin{from{opacity:0;transform:translateX(var(--dx,24px))}to{opacity:1;transform:none}}
.stx-kick{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--ts)}.stx-slide h2{font-size:clamp(22px,3.4vw,32px);margin:2px 0 6px}.stx-lead{margin:0 0 14px;color:var(--mut);font-size:15.5px;max-width:860px}
.stx-grid.one{grid-template-columns:1fr!important}.stx-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:20px;align-items:start}@media(max-width:900px){.stx-grid{grid-template-columns:1fr}}
.stx-tabs{display:flex;gap:4px;background:var(--bg);border:1px solid var(--bd);border-radius:10px;padding:3px;margin-bottom:8px}
.stx-tabs button{flex:1;background:transparent;color:var(--fg);border:0;border-radius:8px;padding:6px 8px;font:inherit;font-weight:600;font-size:13px;cursor:pointer;white-space:nowrap}.stx-tabs button.on{background:var(--ac);color:#111}
.stx-pane{border:1px solid var(--bd);border-radius:12px;background:var(--bg);overflow:hidden;position:relative}.stx-pane>svg{display:block;width:100%;height:auto}
.stx-3d canvas{display:block;width:100%;aspect-ratio:16/11;touch-action:none;cursor:grab}.stx-3d canvas:active{cursor:grabbing}
.stx-3dbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:7px 10px;border-top:1px solid var(--bd);background:var(--card);font-size:12px;color:var(--mut)}.stx-3dbar button{background:transparent;color:var(--fg);border:1px solid var(--bd);border-radius:8px;padding:4px 10px;font:inherit;font-size:12.5px;font-weight:600;cursor:pointer}
.stx-photo img[hidden]{display:none!important}.stx-photo img{display:block;width:100%;height:auto;max-height:430px;object-fit:cover;background:var(--bg)}.stx-ph-miss{padding:60px 22px;text-align:center;color:var(--mut);font-size:14px}.stx-ph-nav{display:flex;justify-content:center;align-items:center;gap:12px;padding:6px;border-top:1px solid var(--bd);background:var(--card)}.stx-ph-nav button{background:transparent;color:var(--fg);border:1px solid var(--bd);border-radius:8px;padding:2px 12px;font-size:18px;cursor:pointer}.stx-cap a{color:var(--ts)}
.stx-cap{margin:8px 2px 0;font-size:12.5px;color:var(--mut)}
.stx-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}.stx-chip{font-size:12px;font-weight:700;border-radius:8px;padding:3px 9px;border:1px solid}
.stx-chip.free{color:var(--ok);border-color:var(--ok)}.stx-chip.lock{color:var(--bad);border-color:var(--bad)}.stx-chip.elastic{color:var(--ts);border-color:var(--ts)}.stx-chip.rx{color:var(--fg);border-color:var(--bd);background:var(--bg)}
.stx-fact{border-left:3px solid var(--ac);padding:2px 0 2px 12px;margin:0 0 12px}.stx-fact h4{margin:0 0 2px;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--ts);font-family:Inter,system-ui,sans-serif}.stx-fact div{font-size:14.5px}.stx-fact ul{margin:4px 0 0;padding-left:18px}
.stx-note{background:color-mix(in srgb,var(--ac) 12%,var(--card));border:1px solid color-mix(in srgb,var(--ac) 45%,var(--bd));border-radius:12px;padding:10px 12px;font-size:13.5px;margin-top:6px}
.stx-nav{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:14px}
.stx-tbl{width:100%;border-collapse:collapse;font-size:13px}.stx-tbl th,.stx-tbl td{border:1px solid var(--bd);padding:6px 8px;text-align:left;vertical-align:top}.stx-tbl th{background:var(--bg)}.stx-tw{overflow-x:auto}
.stx-car:fullscreen{background:var(--bg);overflow:auto;padding:18px}.stx-car:fullscreen .stx-slide{min-height:calc(100vh - 150px)}
@media(prefers-reduced-motion:reduce){.stx-slide{animation:none}}
`;
const st=D.createElement('style');st.id='stx-css';st.textContent=css;D.head.appendChild(st);

/* ---------------------------------------------------------------- icons */
const LOGO='<svg width="76" height="76" viewBox="0 0 100 100" role="img" aria-label="STRUXA"><rect width="100" height="100" rx="22" fill="#E8710A"/><path d="M70 30C70 14 28 14 28 36C28 56 72 44 72 66C72 86 28 86 28 68" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><line x1="14" y1="50" x2="86" y2="50" stroke="#111" stroke-width="3"/><circle cx="50" cy="50" r="5" fill="#111"/></svg>';
const MINI='<svg width="26" height="26" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="22" fill="#E8710A"/><path d="M70 30C70 14 28 14 28 36C28 56 72 44 72 66C72 86 28 86 28 68" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><line x1="14" y1="50" x2="86" y2="50" stroke="#111" stroke-width="3"/><circle cx="50" cy="50" r="5" fill="#111"/></svg>';
const ICON_ANALYSIS='<svg viewBox="0 0 220 90" width="220" height="90" fill="none" stroke="var(--fg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 38h196" stroke-width="5"/><path d="M30 42l-13 24h26zM110 42l-13 24h26zM190 42l-13 24h26z"/><path d="M12 70h40M92 70h40M172 70h40" stroke="var(--mut)"/><g stroke="#D62828"><path d="M50 8v22M70 8v22M90 8v22M130 8v22M150 8v22M170 8v22"/><path d="M45 24l5 6 5-6M65 24l5 6 5-6M85 24l5 6 5-6M125 24l5 6 5-6M145 24l5 6 5-6M165 24l5 6 5-6"/></g><path d="M12 38C60 56 160 56 208 38" stroke="var(--ac)" stroke-width="3" stroke-dasharray="1 7"/></svg>';
const ICON_LEARN='<svg viewBox="0 0 220 90" width="220" height="90" fill="none" stroke="var(--fg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 74h60M20 74l30-18 30 18"/><path d="M35 70l15-9 15 9" stroke="var(--mut)"/><path d="M100 24h40v40h-40zM100 24l12-10h40l-12 10M152 14v40l-12 10" /><path d="M104 60l32-32" stroke="var(--ac)" stroke-width="3"/><path d="M170 66c10-28 28-28 38 0" stroke="#D62828" stroke-width="3"/><path d="M164 30l8 10M208 30l-8 10" stroke="var(--ac)"/><circle cx="188" cy="22" r="6" stroke="var(--ac)"/></svg>';

/* ---------------------------------------------------------------- shell DOM */
const root=D.createElement('div');root.id='stx-root';
root.innerHTML=`
<section class="stx-view" id="stx-home" aria-label="STRUXA home">
 <div class="stx-hero">${LOGO}<h1>STRUXA</h1><p>Structural analysis, step by step — and the behaviour behind it</p></div>
 <div class="stx-choices">
  <button class="stx-choice" id="stx-c1"><div class="ic">${ICON_ANALYSIS}</div><h2>Structural Analysis</h2><p>Analyse continuous beams, one-way slabs, flat slab frames, general frames and plane trusses — with full step-by-step Word reports.</p><div class="tags"><span>Beams</span><span>Frames</span><span>Plane trusses</span><span>Word reports</span></div><div class="go">Open the analysis tools →</div></button>
  <button class="stx-choice" id="stx-c2"><div class="ic">${ICON_LEARN}</div><h2>Understanding Structural Behaviour</h2><p>Learn by seeing: animated 3D models, illustrated carousels and short theory notes on how structures really work.</p><div class="tags"><span>Joints &amp; supports</span><span>Failure modes</span><span>Analysis history</span></div><div class="go">Start learning →</div></button>
 </div>
</section>
<section class="stx-view" id="stx-hub" aria-label="Understanding Structural Behaviour"></section>
<section class="stx-view" id="stx-sec" aria-label="Lesson"></section>
`;
B.insertBefore(root,B.firstChild);
$('stx-c1').onclick=()=>STX.go('analysis');$('stx-c2').onclick=()=>STX.go('hub');const top=D.querySelector('.top');if(top){const hb=D.createElement('button');hb.className='stx-btn';hb.id='stx-homebtn';hb.title='Back to the STRUXA start page';hb.textContent='⌂ Home';hb.onclick=()=>STX.go('home');top.insertBefore(hb,top.firstChild)}

/* ---------------------------------------------------------------- navigation */
let curSec=null;
STX.go=function(view,arg,push=true){
 if(view=='sec'&&!STX.sections[arg])view='hub';
 if(STX.car){STX.car.destroy();STX.car=null}
 STX.cur=view;B.setAttribute('data-view',view);
 if(view=='hub')renderHub();
 if(view=='sec'){curSec=arg;renderSection(arg)}
 if(push){try{history.pushState({v:view,a:arg||null},'','#'+view+(arg?'/'+arg:''))}catch(e){}}
 scrollTo(0,0)};
addEventListener('popstate',e=>{const s=e.state;if(s&&s.v)STX.go(s.v,s.a,false);else STX.go('home',null,false)});
try{history.replaceState({v:'home'},'','#home')}catch(e){}

STX.register=function(def){STX.sections[def.id]=def;if(STX.cur=='hub')renderHub()};

function bar(title,backTo,backLabel){return`<div class="stx-bar"><button class="stx-btn" data-back="${backTo}">← ${backLabel}</button><div class="mini">${MINI}<b>STRUXA</b></div><h2>${title}</h2></div>`}
function wireBack(el){el.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{const t=b.dataset.back;t=='hub'?STX.go('hub'):STX.go('home')})}

function renderHub(){
 const h=$('stx-hub'),secs=STX.order.map(id=>STX.sections[id]||STX.placeholders[id]);
 h.innerHTML=bar('Understanding Structural Behaviour','home','Home')+`<div class="stx-wrap"><div class="stx-hubhead"><h1>Understanding Structural Behaviour</h1><p>Pick a topic. Each lesson is a swipeable carousel with diagrams, real-world illustrations and live animated 3D models you can rotate.</p></div><div class="stx-cards">`+
 secs.map(s=>`<button class="stx-card" data-id="${s.id}" ${s.slides?'':'disabled'}><div class="ic">${s.icon}</div><span class="stx-badge ${s.slides?'':'soon'}">${s.slides?s.slides.length+' slides':'Coming soon'}</span><h3>${s.title}</h3><p>${s.desc}</p></button>`).join('')+'</div></div>';
 wireBack(h);h.querySelectorAll('.stx-card:not([disabled])').forEach(c=>c.onclick=()=>STX.go('sec',c.dataset.id))}
STX.placeholders={
 joints:{id:'joints',title:'Structural Joints & Supports',desc:'Pin, roller, fixed, hinged and more — what they restrain, what they allow, and how they look in real structures.',icon:'<svg viewBox="0 0 120 70" width="150" height="88" fill="none" stroke="var(--fg)" stroke-width="2.2"><path d="M10 28h100" stroke-width="4"/><path d="M26 31l-10 18h20z"/></svg>'},
 failure:{id:'failure',title:'Failure Modes',desc:'Bending, shear, buckling, torsion, fatigue, punching and more — how structures fail and how to recognise it.',icon:'<svg viewBox="0 0 120 70" width="150" height="88" fill="none" stroke="var(--fg)" stroke-width="2.2"><path d="M10 30h40l8 6 8-6h44" stroke-width="4"/><path d="M58 36l-4 14M58 36l6 12" stroke="#D62828"/></svg>'},
 history:{id:'history',title:'Structural Analysis History',desc:'From Galileo to the finite element method: the theories in order of discovery, their equations and the people behind them.',icon:'<svg viewBox="0 0 120 70" width="150" height="88" fill="none" stroke="var(--fg)" stroke-width="2.2"><path d="M12 56h96M24 56V30M52 56V18M80 56V38M104 56V26" stroke-width="3"/><circle cx="24" cy="26" r="4"/><circle cx="52" cy="14" r="4"/><circle cx="80" cy="34" r="4"/></svg>'}};

function renderSection(id){
 const s=STX.sections[id],h=$('stx-sec');
 h.innerHTML=bar(s.title,'hub','Topics')+`<div class="stx-wrap"><div id="stx-carhost"></div></div>`;wireBack(h);
 STX.car=carousel($('stx-carhost'),s)}

/* ---------------------------------------------------------------- carousel */
function carousel(host,sec){
 const slides=sec.slides;let i=0,viewer=null,dir=1,tab=null;const car=D.createElement('div');car.className='stx-car';host.appendChild(car);
 const tabsOf=s=>[['symbol',s.symbolTab||'Symbol',s.symbol],['real',s.photos?'Real photo':'In reality',s.real||s.photos],['d3','3D animation',s.scene]].filter(t=>t[2]);
 function dof(s){const m={free:['free','free'],lock:['lock','locked'],elastic:['elastic','elastic']},nm={ux:'Move x',uy:'Move y',rz:'Rotate'};
  return(s.dof?Object.keys(nm).map(k=>{const v=s.dof[k];return v?`<span class="stx-chip ${m[v][0]}">${nm[k]}: ${m[v][1]}</span>`:''}).join(''):'')+(s.reac?s.reac.map(r=>`<span class="stx-chip rx">Reaction: ${r}</span>`).join(''):'')+(s.tags?s.tags.map(r=>`<span class="stx-chip ${r[1]}">${r[0]}</span>`).join(''):'')}
 function show(n,d){
  if(viewer){viewer.destroy();viewer=null}
  i=(n+slides.length)%slides.length;dir=d||1;const s=slides[i],tabs=tabsOf(s);tab=tabs.length?tabs[0][0]:null;
  car.innerHTML=`<div class="stx-top"><span class="stx-count">${i+1} / ${slides.length}</span><div class="stx-dots">${slides.map((x,k)=>`<button class="${k==i?'on':''}" data-k="${k}" title="${(x.title||'').replace(/"/g,'')}" aria-label="Slide ${k+1}"></button>`).join('')}</div><button class="stx-btn" id="stx-fs" title="Presentation mode">⛶ Present</button></div>
  <article class="stx-slide" style="--dx:${dir*28}px"><div class="stx-kick">${s.kicker||sec.title}</div><h2>${s.title}</h2><p class="stx-lead">${s.lead||''}</p>
  <div class="stx-grid${tabs.length?'':' one'}"><div class="stx-vis">${tabs.length?`<div class="stx-tabs" role="tablist">${tabs.map(t=>`<button role="tab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div><div class="stx-pane" id="stx-pane"></div><p class="stx-cap" id="stx-cap"></p><div class="stx-chips">${dof(s)}</div>`:''}</div>
  <div class="stx-txt">${(s.facts||[]).map(f=>`<div class="stx-fact"><h4>${f[0]}</h4><div>${f[1]}</div></div>`).join('')}${s.note?`<div class="stx-note">${s.note}</div>`:''}${s.html||''}</div></div></article>
  <div class="stx-nav"><button class="stx-btn" id="stx-prev">← Previous</button><span class="stx-count">${i+1<slides.length?'Next: '+slides[i+1].title:'End of lesson'}</span><button class="stx-btn pri" id="stx-next">${i+1<slides.length?'Next →':'Restart ↺'}</button></div>`;
  car.querySelectorAll('.stx-dots button').forEach(b=>b.onclick=()=>show(+b.dataset.k,+b.dataset.k>i?1:-1));
  $('stx-prev').onclick=()=>show(i-1,-1);$('stx-next').onclick=()=>show(i+1,1);$('stx-fs').onclick=toggleFs;
  car.querySelectorAll('.stx-tabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.t));if(tab)setTab(tab)}
 function setTab(t){tab=t;const s=slides[i],p=$('stx-pane');if(!p)return;if(viewer){viewer.destroy();viewer=null}
  car.querySelectorAll('.stx-tabs button').forEach(b=>{b.classList.toggle('on',b.dataset.t==t);b.setAttribute('aria-selected',b.dataset.t==t)});
  const cap=$('stx-cap');
  if(t=='d3'){p.innerHTML='<div class="stx-3d"><canvas aria-label="Animated 3D model"></canvas><div class="stx-3dbar"><button id="stx-pp">❚❚ Pause</button><button id="stx-rv">⟲ Reset view</button><span>Drag to rotate · scroll or pinch to zoom</span></div></div>';
   viewer=STX.viewer(p.querySelector('canvas'),STX.scenes[s.scene],{span:s.span,center:s.center});
   $('stx-pp').onclick=e=>{const r=viewer.toggle();e.target.textContent=r?'❚❚ Pause':'▶ Play'};$('stx-rv').onclick=()=>viewer.reset();cap.textContent=s.sceneCap||''}
  else if(t=='real'&&s.photos){photoPane(p,cap,s)}
  else{p.innerHTML=t=='symbol'?s.symbol:s.real;cap.textContent=t=='symbol'?(s.symbolCap||''):(s.realCap||'')}}
 function photoPane(p,cap,s){let k=0;const ph=s.photos;
  const show=()=>{const x=ph[k],c=[x.file,x.url].filter(Boolean);let j=0;
   p.innerHTML=`<div class="stx-photo"><img alt="${(x.alt||s.title).replace(/"/g,'')}" referrerpolicy="no-referrer"><div class="stx-ph-miss" hidden>No photo available here yet.<br>Add a picture named <b>${x.file||'?'}</b> to the STRUXA folder, or connect to the internet.</div>${ph.length>1?`<div class="stx-ph-nav"><button id="stx-pp1">‹</button><span>${k+1} / ${ph.length}</span><button id="stx-pp2">›</button></div>`:''}</div>`;
   const im=p.querySelector('img'),ms=p.querySelector('.stx-ph-miss');
   im.onerror=()=>{j++;if(j<c.length)im.src=c[j];else{im.hidden=true;ms.hidden=false;cap.innerHTML=x.page?`Source: <a href="${x.page}" target="_blank" rel="noopener">${x.page.replace('https://','')}</a>`:''}};
   im.onload=()=>{cap.innerHTML=/^https?:/.test(im.currentSrc||im.src)?(x.credit||''):(x.localCredit||'')};
   im.src=c[0];
   if(ph.length>1){$('stx-pp1').onclick=()=>{k=(k+ph.length-1)%ph.length;show()};$('stx-pp2').onclick=()=>{k=(k+1)%ph.length;show()}}};
  show()}
 function toggleFs(){if(D.fullscreenElement)D.exitFullscreen();else if(car.requestFullscreen)car.requestFullscreen().catch(()=>{})}
 const key=e=>{if(STX.cur!='sec'||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key=='ArrowRight')show(i+1,1);else if(e.key=='ArrowLeft')show(i-1,-1)};addEventListener('keydown',key);
 let sx=null,sy=0;const ts=e=>{if(e.target.closest('canvas')||e.target.closest('.stx-tw'))return;sx=e.touches[0].clientX;sy=e.touches[0].clientY},te=e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;sx=null;if(Math.abs(dx)>70&&Math.abs(dx)>1.8*Math.abs(dy))show(i+(dx<0?1:-1),dx<0?1:-1)};
 car.addEventListener('touchstart',ts,{passive:true});car.addEventListener('touchend',te,{passive:true});
 show(0,1);
 return{destroy(){removeEventListener('keydown',key);if(viewer)viewer.destroy();if(D.fullscreenElement)D.exitFullscreen().catch(()=>{});car.remove()}}}

/* ---------------------------------------------------------------- 3D geometry helpers */
const G=STX.g3={};
G.rgb=h=>{if(Array.isArray(h))return h;const n=parseInt(h.slice(1),16);return[n>>16,(n>>8)&255,n&255]};
G.xf=(sh,f)=>sh.map(s=>Object.assign({},s,{pts:s.pts.map(f),p:s.p?f(s.p):undefined}));
G.rotZ=(a,pv=[0,0])=>{const c=Math.cos(a),s=Math.sin(a);return p=>[pv[0]+(p[0]-pv[0])*c-(p[1]-pv[1])*s,pv[1]+(p[0]-pv[0])*s+(p[1]-pv[1])*c,p[2]]};
G.mv=(dx,dy,dz=0)=>p=>[p[0]+dx,p[1]+dy,p[2]+dz];
const poly=(pts,col,o)=>Object.assign({k:'p',pts,col},o);
G.box=(c,s,col,o)=>{const[x,y,z]=c,[a,b,d]=[s[0]/2,s[1]/2,s[2]/2],P=(i,j,k)=>[x+i*a,y+j*b,z+k*d];
 return[[P(-1,-1,1),P(1,-1,1),P(1,1,1),P(-1,1,1)],[P(-1,-1,-1),P(-1,1,-1),P(1,1,-1),P(1,-1,-1)],[P(-1,1,-1),P(-1,1,1),P(1,1,1),P(1,1,-1)],[P(-1,-1,-1),P(1,-1,-1),P(1,-1,1),P(-1,-1,1)],[P(1,-1,-1),P(1,1,-1),P(1,1,1),P(1,-1,1)],[P(-1,-1,-1),P(-1,-1,1),P(-1,1,1),P(-1,1,-1)]].map(p=>poly(p,col,o))};
G.cyl=(c,r,len,col,o={})=>{const n=o.n||22,ax=o.axis||'z',L=(u,v,w)=>ax=='z'?[c[0]+u,c[1]+v,c[2]+w]:ax=='y'?[c[0]+u,c[1]+w,c[2]+v]:[c[0]+w,c[1]+u,c[2]+v],ring=w=>Array.from({length:n},(_,k)=>L(r*Math.cos(2*Math.PI*k/n),r*Math.sin(2*Math.PI*k/n),w)),a=ring(-len/2),b=ring(len/2),out=[];
 for(let k=0;k<n;k++){const k2=(k+1)%n;out.push(poly([a[k],a[k2],b[k2],b[k]],col,Object.assign({ed:0},o)))}out.push(poly(a,col,o),poly(b,col,o));
 if(o.mark){const w=len/2+.002;out.push({k:'l',pts:[L(0,0,w),L(r*Math.cos(o.mark),r*Math.sin(o.mark),w)],col:'#222',w:2,front:1},{k:'l',pts:[L(0,0,-w),L(r*Math.cos(o.mark),r*Math.sin(o.mark),-w)],col:'#222',w:2,front:1})}return out};
G.prism=(p2,z0,z1,col,o)=>{const a=p2.map(p=>[p[0],p[1],z1]),b=p2.map(p=>[p[0],p[1],z0]),out=[poly(a,col,o),poly(b.slice().reverse(),col,o)];for(let k=0;k<p2.length;k++){const k2=(k+1)%p2.length;out.push(poly([b[k],b[k2],a[k2],a[k]],col,o))}return out};
G.ext=(st,h,w,col,o)=>{const n=st.length,nr=st.map((p,k)=>{const a=st[Math.max(0,k-1)],b=st[Math.min(n-1,k+1)],tx=b[0]-a[0],ty=b[1]-a[1],l=Math.hypot(tx,ty)||1;return[-ty/l,tx/l]}),
 T=(k,z)=>[st[k][0]+nr[k][0]*h/2,st[k][1]+nr[k][1]*h/2,z],Bt=(k,z)=>[st[k][0]-nr[k][0]*h/2,st[k][1]-nr[k][1]*h/2,z],out=[],oo=Object.assign({ed:0},o);
 for(let k=0;k<n-1;k++){const q=k+1;out.push(poly([T(k,w/2),T(q,w/2),T(q,-w/2),T(k,-w/2)],col,oo),poly([Bt(k,-w/2),Bt(q,-w/2),Bt(q,w/2),Bt(k,w/2)],col,oo),poly([T(k,w/2),Bt(k,w/2),Bt(q,w/2),T(q,w/2)],col,o),poly([T(q,-w/2),Bt(q,-w/2),Bt(k,-w/2),T(k,-w/2)],col,o))}
 out.push(poly([T(0,w/2),T(0,-w/2),Bt(0,-w/2),Bt(0,w/2)],col,o),poly([T(n-1,w/2),Bt(n-1,w/2),Bt(n-1,-w/2),T(n-1,-w/2)],col,o));return out};
G.bar=(p,q,h,w,col,o)=>G.ext([p,q],h,w,col,o);
G.line=(pts,col,wd=2,o)=>Object.assign({k:'l',pts,col,w:wd},o);
G.label=(p,txt,col,o)=>Object.assign({k:'t',pts:[p],p,txt,col,top:1},o);
G.arrow=(a,b,col='#177a3c',wd=3.4)=>{const d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],L=Math.hypot(...d)||1,u=d.map(v=>v/L),hl=Math.min(.42,L*.4),hr=hl*.42,base=[b[0]-u[0]*hl,b[1]-u[1]*hl,b[2]-u[2]*hl];
 let t=Math.abs(u[2])<.9?[0,0,1]:[1,0,0],v1=[u[1]*t[2]-u[2]*t[1],u[2]*t[0]-u[0]*t[2],u[0]*t[1]-u[1]*t[0]],l1=Math.hypot(...v1);v1=v1.map(v=>v/l1);const v2=[u[1]*v1[2]-u[2]*v1[1],u[2]*v1[0]-u[0]*v1[2],u[0]*v1[1]-u[1]*v1[0]],
 ring=Array.from({length:7},(_,k)=>{const an=2*Math.PI*k/7;return[base[0]+hr*(Math.cos(an)*v1[0]+Math.sin(an)*v2[0]),base[1]+hr*(Math.cos(an)*v1[1]+Math.sin(an)*v2[1]),base[2]+hr*(Math.cos(an)*v1[2]+Math.sin(an)*v2[2])]}),out=[{k:'l',pts:[a,base],col,w:wd,top:1}];
 for(let k=0;k<7;k++)out.push(poly([b,ring[k],ring[(k+1)%7]],col,{top:1,ed:0}));return out};
G.moment=(c,r,a0,a1,col='#177a3c')=>{const pts=Array.from({length:26},(_,k)=>{const a=a0+(a1-a0)*k/25;return[c[0]+r*Math.cos(a),c[1]+r*Math.sin(a),c[2]]}),e=pts[25],p=pts[22],d=[e[0]-p[0],e[1]-p[1],0],L=Math.hypot(d[0],d[1])||1,tip=[e[0]+d[0]/L*.28,e[1]+d[1]/L*.28,e[2]];
 return[{k:'l',pts,col,w:3.4,top:1},...G.arrow(p,tip,col,.1)]};
G.helix=(c,r,h,turns,col,wd=3)=>{const N=turns*14,pts=Array.from({length:N+1},(_,k)=>{const a=2*Math.PI*turns*k/N;return[c[0]+r*Math.cos(a),c[1]+h*k/N,c[2]+r*Math.sin(a)]});return{k:'l',pts,col,w:wd}};
G.hatch=(x0,x1,y,z,col='#8a8a8a')=>{const o=[];for(let x=x0;x<=x1;x+=.45)o.push({k:'l',pts:[[x,y,z],[x-.3,y-.3,z]],col,w:1.5});return o};
G.lathe=(c,prof,y0,y1,col,o={})=>{const n=o.n||20,ns=o.ns||26,out=[],R=(y,k)=>{const r=prof(y),a=2*Math.PI*k/n;return[c[0]+r*Math.cos(a),y,c[2]+r*Math.sin(a)]};
 for(let i=0;i<ns;i++){const ya=y0+(y1-y0)*i/ns,yb=y0+(y1-y0)*(i+1)/ns;for(let k=0;k<n;k++)out.push(poly([R(ya,k),R(ya,k+1),R(yb,k+1),R(yb,k)],col,Object.assign({ed:0},o)))}
 out.push(poly(Array.from({length:n},(_,k)=>R(y1,k)),col,o),poly(Array.from({length:n},(_,k)=>R(y0,k)),col,o));return out};
G.frustum=(c,r0,r1,h,col,o={})=>{const n=o.n||20,rot=o.rot||0,B=k=>[c[0]+r0*Math.cos(2*Math.PI*k/n+rot),c[1]-h/2,c[2]+r0*Math.sin(2*Math.PI*k/n+rot)],T=k=>[c[0]+r1*Math.cos(2*Math.PI*k/n+rot),c[1]+h/2,c[2]+r1*Math.sin(2*Math.PI*k/n+rot)],out=[];
 for(let k=0;k<n;k++)out.push(poly([B(k),B(k+1),T(k+1),T(k)],col,o));out.push(poly(Array.from({length:n},(_,k)=>T(k)),col,o),poly(Array.from({length:n},(_,k)=>B(k)),col,o));return out};
/* sweep a rectangular section [ya,yb,za,zb] along x; stations: [{x,y,z,tw}] (offset and twist about the x axis) */
G.sweep=(rc,st,col,o={})=>{const P=(s,yy,zz)=>{const c=Math.cos(s.tw||0),sn=Math.sin(s.tw||0);return[s.x,(s.y||0)+yy*c-zz*sn,(s.z||0)+yy*sn+zz*c]},co=s=>[P(s,rc[0],rc[2]),P(s,rc[1],rc[2]),P(s,rc[1],rc[3]),P(s,rc[0],rc[3])],out=[],oo=Object.assign({ed:0},o);
 for(let i=0;i<st.length-1;i++){const a=co(st[i]),b=co(st[i+1]);for(let k=0;k<4;k++){const k2=(k+1)%4;out.push(poly([a[k],a[k2],b[k2],b[k]],col,oo))}}
 out.push(poly(co(st[0]),col,o),poly(co(st[st.length-1]),col,o));return out};
G.surf=(nx,ny,fn,col,o={})=>{const out=[];for(let i=0;i<nx;i++)for(let j=0;j<ny;j++)out.push(poly([fn(i/nx,j/ny),fn((i+1)/nx,j/ny),fn((i+1)/nx,(j+1)/ny),fn(i/nx,(j+1)/ny)],col,Object.assign({ed:0},o)));return out};
G.ring=(c,r,a0,a1,plane,col,wd=3,o={})=>{const pts=Array.from({length:30},(_,k)=>{const a=a0+(a1-a0)*k/29,u=r*Math.cos(a),v=r*Math.sin(a);return plane=='yz'?[c[0],c[1]+u,c[2]+v]:[c[0]+u,c[1]+v,c[2]]});return Object.assign({k:'l',pts,col,w:wd,top:1},o)};
G.PAL={steel:'#8b97a8',dark:'#47546a',conc:'#bdb6a9',beam:'#E8710A',pin:'#f2c230',load:'#D62828',ok:'#177a3c',blue:'#2f6fd0',wood:'#a9744a',ghost:'#999'};

/* ---------------------------------------------------------------- 3D viewer */
STX.scenes={};
STX.viewer=function(cv,scene,opt={}){
 const ctx=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1),V0={yaw:-.55,pitch:.26,zoom:1};let V=Object.assign({},V0),touched=0,play=!matchMedia('(prefers-reduced-motion:reduce)').matches,t=play?0:1.4,last=0,raf=0,dead=0,fg='#222',n=0;const ptr=new Map();let pd=0;
 const fit=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w)return;if(cv.width!=Math.round(w*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr)}};
 function frame(now){if(dead)return;raf=requestAnimationFrame(frame);if(!cv.isConnected||D.hidden)return;if(play){t+=Math.min(.05,(now-last)/1000)}last=now;fit();if(!(n++%40))fg=getComputedStyle(D.documentElement).getPropertyValue('--fg').trim()||'#222';draw()}
 function draw(){const W=cv.width,H=cv.height;if(!W)return;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);
  const sc=scene(t);if(sc.view&&!V.vset){Object.assign(V0,sc.view);Object.assign(V,sc.view);V.vset=1}const cen=opt.center||sc.center||[0,1.4,0],yaw=V.yaw+(touched?0:.32*Math.sin(t*.22)),cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(V.pitch),sp=Math.sin(V.pitch),Dd=16,Z=W/(opt.span||sc.span||11)*V.zoom;
  const pr=p=>{const x=p[0]-cen[0],y=p[1]-cen[1],z=p[2]-cen[2],x1=x*cy+z*sy,z1=-x*sy+z*cy,y1=y*cp-z1*sp,z2=y*sp+z1*cp,f=Dd/(Dd-z2);return[W/2+x1*f*Z,H/2-y1*f*Z,z2,x1,y1]};
  const items=[];for(const s of sc.shapes){const q=s.pts.map(pr);let d=0;for(const a of q)d+=a[2];d/=q.length;items.push({s,q,d:d+(s.front?.5:0)})}
  items.sort((a,b)=>(!!a.s.top-!!b.s.top)||(a.d-b.d));
  ctx.lineJoin='round';ctx.lineCap='round';
  for(const it of items){const s=it.s,q=it.q;
   if(s.k=='p'){const[r,g,b]=G.rgb(s.col);let sh=.82;if(q.length>2){const a=s.pts[0],b2=s.pts[1],c=s.pts[2],u=[b2[0]-a[0],b2[1]-a[1],b2[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],nx=u[1]*v[2]-u[2]*v[1],ny=u[2]*v[0]-u[0]*v[2],nz=u[0]*v[1]-u[1]*v[0],nl=Math.hypot(nx,ny,nz)||1,
     X1=(nx*cy+nz*sy)/nl,Z1=(-nx*sy+nz*cy)/nl,Y2=(ny/nl)*cp-Z1*sp,Z2=(ny/nl)*sp+Z1*cp;sh=.5+.5*Math.abs(.28*X1+.62*Y2+.73*Z2)}
    sh=Math.min(1,.46+.6*sh);ctx.beginPath();q.forEach((a,k)=>k?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1]));ctx.closePath();const op=s.op==null?1:s.op;ctx.globalAlpha=op;ctx.fillStyle=`rgb(${r*sh|0},${g*sh|0},${b*sh|0})`;ctx.fill();
    if(s.ed!==0){ctx.strokeStyle='rgba(0,0,0,.38)';ctx.lineWidth=.9*dpr;ctx.stroke()}else{ctx.strokeStyle=`rgb(${r*sh*.97|0},${g*sh*.97|0},${b*sh*.97|0})`;ctx.lineWidth=.8*dpr;ctx.stroke()}ctx.globalAlpha=1}
   else if(s.k=='l'){ctx.beginPath();q.forEach((a,k)=>k?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1]));ctx.strokeStyle=s.col=='fg'?fg:s.col;ctx.lineWidth=(s.w||2)*dpr;if(s.dash)ctx.setLineDash(s.dash.map(v=>v*dpr));ctx.globalAlpha=s.op==null?1:s.op;ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1}
   else if(s.k=='t'){ctx.font=`700 ${(s.size||13)*dpr}px Inter,system-ui,sans-serif`;ctx.textAlign=s.align||'center';ctx.lineWidth=3.5*dpr;ctx.strokeStyle=getComputedStyle(D.documentElement).getPropertyValue('--bg').trim()||'#fff';ctx.strokeText(s.txt,q[0][0],q[0][1]);ctx.fillStyle=s.col=='fg'||!s.col?fg:s.col;ctx.fillText(s.txt,q[0][0],q[0][1])}}
  if(sc.hud){const fs=Math.max(10.5,Math.min(14,W/dpr/32));ctx.font=`700 ${fs*dpr}px Inter,system-ui,sans-serif`;ctx.textAlign='left';sc.hud.forEach((l,k)=>{ctx.fillStyle=l[1]||fg;ctx.fillText(l[0],12*dpr,(8+fs*1.1+k*fs*1.4)*dpr)})}}
 /* interaction */
 cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,[e.clientX,e.clientY]);touched=1;if(ptr.size==2){const[a,b]=[...ptr.values()];pd=Math.hypot(a[0]-b[0],a[1]-b[1])}});
 cv.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId))return;const o=ptr.get(e.pointerId);ptr.set(e.pointerId,[e.clientX,e.clientY]);
  if(ptr.size==2){const[a,b]=[...ptr.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pd)V.zoom=Math.max(.5,Math.min(3,V.zoom*d/pd));pd=d}
  else{V.yaw+=(e.clientX-o[0])*.008;V.pitch=Math.max(-.2,Math.min(1.2,V.pitch+(e.clientY-o[1])*.006))}if(!play)draw()});
 const up=e=>{ptr.delete(e.pointerId);pd=0};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
 cv.addEventListener('wheel',e=>{e.preventDefault();V.zoom=Math.max(.5,Math.min(3,V.zoom*(e.deltaY<0?1.1:.91)));if(!play)draw()},{passive:false});
 raf=requestAnimationFrame(frame);
 return{toggle(){play=!play;if(play)last=performance.now();return play},reset(){V=Object.assign({},V0);touched=0;if(!play)draw()},destroy(){dead=1;cancelAnimationFrame(raf)}}};

/* start page */
B.setAttribute('data-view','home');STX.cur='home';
})();
