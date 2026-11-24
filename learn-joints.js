/* STRUXA — lesson "Structural Joints & Supports": diagrams, real-world illustrations, 3D scenes and slide text. */
(function(){
'use strict';
if(!window.STX)return;
const G=STX.g3,P=G.PAL,S=STX.scenes;

/* ============================================================ SVG helpers */
const RX='#177a3c',LD='#D62828';
const svg=(inner,vb='0 0 480 250')=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--fg)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" font-family="Inter,system-ui,sans-serif" font-size="12.5" role="img">${inner}</svg>`;
const tx=(x,y,t,c='var(--fg)',a='start',w=600,sz)=>`<text x="${x}" y="${y}" fill="${c}" stroke="none" text-anchor="${a}" font-weight="${w}"${sz?` font-size="${sz}"`:''}>${t}</text>`;
const arr=(x1,y1,x2,y2,c=RX,w=3)=>{const a=Math.atan2(y2-y1,x2-x1),h=d=>[(x2-11*Math.cos(a+d)).toFixed(1),(y2-11*Math.sin(a+d)).toFixed(1)];const p=h(.42),q=h(-.42);return`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}"/><path d="M${x2} ${y2}L${p[0]} ${p[1]}L${q[0]} ${q[1]}Z" fill="${c}" stroke="${c}" stroke-width="1"/>`};
/* counter-clockwise moment arc (math angles in degrees) with arrow head */
const marc=(cx,cy,r,a0,a1,c=RX)=>{const R=Math.PI/180,pt=a=>[cx+r*Math.cos(a*R),cy-r*Math.sin(a*R)],s=pt(a0),e=pt(a1),lg=((a1-a0+360)%360)>180?1:0,d=[-Math.sin(a1*R),-Math.cos(a1*R)];
 return`<path d="M${s[0].toFixed(1)} ${s[1].toFixed(1)}A${r} ${r} 0 ${lg} 0 ${e[0].toFixed(1)} ${e[1].toFixed(1)}" stroke="${c}" stroke-width="3"/>`+arr(e[0]-d[0]*2,e[1]-d[1]*2,e[0]+d[0]*9,e[1]+d[1]*9,c,3)};
/* wrapped grey note (max ~34 characters per line) */
const note=(x,y,t,n=34)=>{const w=t.split(' '),ls=[];let c='';w.forEach(k=>{if((c+' '+k).trim().length>n){ls.push(c);c=k}else c=(c+' '+k).trim()});ls.push(c);return ls.map((l,k)=>tx(x,y+k*16,l,'var(--mut)','start',500,12)).join('')};
const hatch=(x,y,w,dir='down')=>{let s=`<path d="M${x} ${y}h${w}" stroke-width="2.6"/>`;for(let i=6;i<=w;i+=9)s+=`<path d="M${x+i} ${y}l-7 8" stroke="var(--mut)" stroke-width="1.5"/>`;return s};
const vhatch=(x,y,h)=>{let s=`<path d="M${x} ${y}v${h}" stroke-width="2.8"/>`;for(let i=6;i<=h;i+=9)s+=`<path d="M${x} ${y+i}l-8 -7" stroke="var(--mut)" stroke-width="1.5"/>`;return s};
const beam=(x1,y,x2)=>`<path d="M${x1} ${y}H${x2}" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/>`;
const dot=(x,y,r=4.5)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--bg)" stroke="var(--fg)" stroke-width="2"/>`;
const frame2=(left,right,lt='Symbol',rt='Reactions (free-body diagram)')=>svg(`${tx(14,22,lt,'var(--mut)')}${tx(256,22,rt,'var(--mut)')}<path d="M246 14V236" stroke="var(--bd)" stroke-dasharray="4 5"/>${left}${right}`);
/* free-body diagram: the support is replaced by its reactions acting on the beam end at (300,110) */
const fbd=(o={})=>{const J=[300,110];let s=`<path d="M${J[0]} ${J[1]}H452" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/>`;
 const nx=o.names||['R<tspan font-size="10" dy="3">x</tspan>','R<tspan font-size="10" dy="3">y</tspan>'];
 if(o.rx)s+=arr(252,110,292,110)+tx(254,128,nx[0],RX);
 if(o.ry)s+=arr(300,176,300,120)+tx(310,166,nx[1]+(o.rylab||''),RX);
 if(o.m)s+=marc(300,110,34,28,152)+tx(300,60,'M',RX,'middle');
 if(o.n){const n=o.n;s+=arr(J[0]-n[0]*54,J[1]-n[1]*54,J[0]-n[0]*6,J[1]-n[1]*6)+tx(J[0]-n[0]*54+8,J[1]-n[1]*54+14,o.nlab||'R',RX)}
 if(o.note)s+=note(256,206,o.note);
 return s+dot(J[0],J[1])};
const D=(l,r)=>frame2(l,r);

/* ============================================================ symbols */
const SYM={};
const TT=t=>tx(16,46,t,'var(--fg)','start',700,13.5);
SYM.dof=svg(`${tx(14,22,'A rigid body in a plane has 3 degrees of freedom','var(--mut)')}<rect x="170" y="90" width="140" height="60" rx="6" fill="color-mix(in srgb,var(--ac) 30%,var(--bg))" stroke="var(--ac)"/><circle cx="240" cy="120" r="4" fill="var(--fg)"/>`+
 arr(320,120,396,120,'#2f6fd0')+tx(400,125,'u: move in x','#2f6fd0')+arr(240,86,240,50,'#2f6fd0')+tx(250,58,'v: move in y','#2f6fd0')+
 marc(240,120,70,215,325,LD).replace('A70 70 0 0 0','A70 70 0 0 0')+tx(240,226,'θ: rotation',LD,'middle')+tx(240,246,'Each motion that a support removes produces one reaction.','var(--mut)','middle',500));
SYM.pin=D(`${TT('Pin support')}${beam(40,108,230)}<path d="M62 108L40 150h44z" fill="var(--bg)"/>${dot(62,108)}${hatch(24,150,76)}`,fbd({rx:1,ry:1,note:'2 reactions: Rx and Ry (no moment)'}));
SYM.roller=D(`${TT('Roller support')}${beam(40,108,230)}<path d="M62 108L42 138h40z" fill="var(--bg)"/><circle cx="52" cy="145" r="6" fill="var(--bg)"/><circle cx="72" cy="145" r="6" fill="var(--bg)"/>${dot(62,108)}${hatch(24,151,76)}`,fbd({ry:1,note:'1 reaction: Ry, perpendicular to the supporting surface'}));
SYM.fixed=D(`${TT('Fixed support')}${beam(54,108,230)}${vhatch(54,70,90)}`,fbd({rx:1,ry:1,m:1,note:'3 reactions: Rx, Ry and the moment M'}));
SYM.incl=D(`${TT('Inclined roller')}<g transform="rotate(-24 90 138.7)"><path d="M30 138.7H130" stroke-width="2.6"/>${hatch(30,138.7,100).replace(/^<path[^>]*>/,'')}<path d="M90 98L72 126.7h36z" fill="var(--bg)"/><circle cx="80" cy="132.7" r="6" fill="var(--bg)"/><circle cx="100" cy="132.7" r="6" fill="var(--bg)"/></g>${beam(73.4,101.5,230)}${dot(73.4,101.5)}`,fbd({n:[-.407,-.914],nlab:'R ⟂ slope',note:'1 reaction, perpendicular to the sloping surface'}));
SYM.guided=D(`${TT('Guided support')}<path d="M40 80V150M70 80V150" stroke-width="2.8"/><rect x="45" y="100" width="20" height="26" fill="var(--bg)"/>${beam(65,113,230)}${vhatch(40,80,70)}`,fbd({rx:1,m:1,note:'2 reactions: a force Rx and a moment M (free to slide along the guide)'}));
SYM.spring=D(`${TT('Spring support')}${beam(40,108,230)}<path d="M62 108V118l-9 5 18 8-18 8 18 8-18 8 9 5V166" stroke-width="2.4"/>${hatch(30,172,64)}`,fbd({ry:1,rylab:' = kΔ',note:'Reaction Ry = k·Δ: proportional to the movement Δ'}));
SYM.hinge=D(`${TT('Internal hinge')}${vhatch(40,80,76)}${beam(40,108,226)}${dot(128,108,7)}<path d="M214 108l-10 20h20z" fill="var(--bg)"/><circle cx="208" cy="134" r="4.5" fill="var(--bg)"/><circle cx="222" cy="134" r="4.5" fill="var(--bg)"/>`,
 `${note(256,40,'At the cut, N and V pass through; M = 0',36)}<path d="M262 120H340" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/><path d="M400 120H462" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/>${dot(340,120)}${dot(400,120)}${arr(290,120,330,120)+tx(298,110,'N',RX)+arr(344,184,344,130)+tx(354,172,'V',RX)}${arr(396,70,396,110)+tx(406,86,'V',RX)+arr(452,120,410,120)+tx(436,110,'N',RX)}${note(256,214,'Moment released: one extra equation (M = 0)',36)}`);
SYM.rigid=D(`${TT('Rigid joint')}<path d="M80 74V160" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/><path d="M80 74H222" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/><path d="M98 78v18H80" stroke="var(--fg)" stroke-width="1.8"/>${tx(104,98,'90°','var(--mut)','start',600,12)}${hatch(50,160,60)}`,
 fbd({rx:1,ry:1,m:1,names:['N','V'],note:'N, V and M are all transmitted across the joint; the 90° angle is preserved'}));
SYM.truss=D(`${TT('Truss pin joint')}<path d="M130 120L56 196M130 120L204 196M130 120L130 70" stroke="var(--ac)" stroke-width="6" stroke-linecap="butt"/>${dot(130,120,7)}`,
 `${note(256,40,'Only axial forces F meet at the pin',36)}<path d="M360 130L296 194M360 130L424 194M360 130L360 76" stroke="var(--ac)" stroke-width="3" stroke-dasharray="2 6"/>${arr(360,130,360,88)}${tx(368,96,'F₁',RX)}${arr(360,130,310,180)}${tx(286,186,'F₂',RX)}${arr(360,130,410,180)}${tx(414,188,'F₃',RX)}${arr(450,72,450,110,LD)}${tx(458,98,'P',LD)}${dot(360,130,7)}${note(256,222,'ΣFx = 0 and ΣFy = 0 at every joint',36)}`);

/* ============================================================ real-world illustrations */
const rw=inner=>svg(`<rect x="0" y="0" width="480" height="300" fill="color-mix(in srgb,var(--bg) 70%,#8fb7de)" stroke="none" opacity=".35"/>${inner}`,'0 0 480 300');
const T=(x,y,t,a='start')=>`<text x="${x}" y="${y}" fill="var(--fg)" stroke="none" font-size="12" font-weight="600" text-anchor="${a}">${t}</text>`;
const HD=(a,b)=>`<text x="16" y="24" fill="var(--fg)" stroke="none" font-size="14" font-weight="700">${a}</text><text x="16" y="42" fill="var(--mut)" stroke="none" font-size="12" font-weight="500">${b}</text>`;
const L=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="var(--fg)" stroke-width="1.1" opacity=".8"/><circle cx="${x2}" cy="${y2}" r="2.6" fill="var(--fg)" stroke="none"/>`;
const CONC='#c9c2b6',STEEL='#9aa6b8',DSTEEL='#6c788c',EARTH='#a58a68',YEL='#f2c230';
const gird=(x1,x2,y)=>`<rect x="${x1}" y="${y-50}" width="${x2-x1}" height="12" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.4"/><rect x="${x1}" y="${y-38}" width="${x2-x1}" height="26" fill="${STEEL}" opacity=".8" stroke="var(--fg)" stroke-width="1.4"/><rect x="${x1}" y="${y-12}" width="${x2-x1}" height="12" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.4"/>`;
const REAL={};
REAL.pin=rw(HD('Bridge pin bearing','The girder rotates on the pin but cannot move sideways or vertically')+
 `<rect x="90" y="244" width="300" height="56" fill="${CONC}" stroke="var(--fg)" stroke-width="1.4"/>${gird(30,450,160)}<rect x="170" y="232" width="140" height="14" fill="${DSTEEL}" stroke="var(--fg)"/><path d="M190 246v26M290 246v26" stroke="var(--fg)" stroke-width="3"/><rect x="183" y="226" width="14" height="6" fill="var(--fg)"/><rect x="283" y="226" width="14" height="6" fill="var(--fg)"/><path d="M200 232L222 190H258L280 232Z" fill="${DSTEEL}" stroke="var(--fg)"/><rect x="226" y="160" width="28" height="34" fill="${STEEL}" stroke="var(--fg)"/><circle cx="240" cy="190" r="14" fill="${YEL}" stroke="var(--fg)"/><circle cx="240" cy="190" r="3" fill="var(--fg)"/>`+
 T(16,98,'Steel girder')+L(70,102,86,116)+T(330,172,'Lug plate')+L(328,170,254,172)+T(330,198,'Pin')+L(328,196,254,192)+T(330,226,'Steel pedestal')+L(328,224,274,220)+T(16,226,'Base plate + anchor bolts')+L(150,230,172,240)+T(104,288,'Concrete pier'));
REAL.roller=rw(HD('Roller bearing under a bridge girder','The girder end rolls horizontally; only the vertical reaction is carried')+
 `<rect x="70" y="222" width="340" height="78" fill="${CONC}" stroke="var(--fg)" stroke-width="1.4"/>${gird(30,450,150)}<rect x="130" y="150" width="220" height="14" fill="${DSTEEL}" stroke="var(--fg)"/><rect x="130" y="208" width="220" height="14" fill="${DSTEEL}" stroke="var(--fg)"/><rect x="126" y="150" width="6" height="72" fill="${STEEL}" stroke="var(--fg)"/><rect x="348" y="150" width="6" height="72" fill="${STEEL}" stroke="var(--fg)"/><g fill="${STEEL}" stroke="var(--fg)" stroke-width="1.6"><circle cx="180" cy="186" r="22"/><circle cx="240" cy="186" r="22"/><circle cx="300" cy="186" r="22"/></g><path d="M180 186l12-12M240 186l12-12M300 186l12-12" stroke="var(--fg)" stroke-width="2"/><path d="M150 84H330" stroke="${LD}" stroke-width="2.6"/><path d="M162 77l-14 7 14 7M318 77l14 7-14 7" stroke="${LD}" fill="${LD}"/>`+
 T(240,74,'Thermal movement','middle')+T(16,174,'Top and')+T(16,188,'bottom plates')+L(96,184,128,184)+T(372,196,'Steel rollers')+L(370,194,322,190)+T(110,264,'Concrete pier cap'));
REAL.fixed=rw(HD('Cantilever balcony slab built into a wall','Wall = fixed support: it provides Rx, Ry and a moment M')+
 `<rect x="40" y="70" width="110" height="230" fill="${CONC}" stroke="var(--fg)" stroke-width="1.4"/><g stroke="var(--mut)" stroke-width="1" opacity=".6"><path d="M40 100l30 -30M40 150l80 -80M40 210l110 -110M40 270l110 -110M60 300l90 -90M110 300l40 -40"/></g><rect x="150" y="140" width="270" height="26" fill="${CONC}" stroke="var(--fg)" stroke-width="1.4"/><path d="M62 148H410" stroke="${LD}" stroke-width="3.5"/><path d="M62 160H300" stroke="${DSTEEL}" stroke-width="2" stroke-dasharray="5 4"/><path d="M416 108v26M392 108v26M368 108v26M344 108v26M320 108v26M296 108v26M272 108v26M248 108v26M224 108v26M200 108v26M176 108v26" stroke="${LD}" stroke-width="2"/><path d="M410 124l6 10 6-10M386 124l6 10 6-10M362 124l6 10 6-10M338 124l6 10 6-10M314 124l6 10 6-10M290 124l6 10 6-10M266 124l6 10 6-10M242 124l6 10 6-10M218 124l6 10 6-10M194 124l6 10 6-10M170 124l6 10 6-10" stroke="${LD}" fill="${LD}"/><path d="M150 166C250 172 360 206 420 270" stroke="var(--mut)" stroke-dasharray="6 5" stroke-width="1.6"/>`+
 T(300,100,'Load: people, furniture, snow','middle')+T(50,206,'Top bars')+T(50,220,'anchored deep')+T(50,234,'in the wall')+L(100,196,100,150)+T(250,214,'Bottom bars (light)')+L(280,206,260,162)+T(170,262,'Deflected shape')+T(170,276,'(exaggerated)'));
REAL.incl=rw(HD('Bearing on a sloping seat','The shoe rolls along the slope; the reaction is perpendicular to it')+
 `<path d="M40 270L440 130V270Z" fill="${CONC}" stroke="var(--fg)" stroke-width="1.4"/><path d="M40 270L440 130" stroke="var(--fg)" stroke-width="2.6"/><g transform="rotate(-19.3 260 193)"><rect x="215" y="153" width="90" height="12" fill="${DSTEEL}" stroke="var(--fg)"/><circle cx="240" cy="179" r="14" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.6"/><circle cx="280" cy="179" r="14" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.6"/></g><path d="M204.3 170.1L289.3 140.3H204.3Z" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.4"/><rect x="40" y="110.3" width="249.3" height="30" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.4"/>${arr(277,242,261,196,RX,3)}`+
 T(50,102,'Girder end')+T(330,150,'free to slide along the slope').replace('<text ','<text transform="rotate(-19.3 330 150)" ')+T(284,254,'R ⟂ slope')+T(100,176,'Shoe on rollers')+L(172,172,214,170));
REAL.guided=rw(HD('Elevator car in its guide rails','Moves up and down only: no sideways motion, no tilting')+
 `<rect x="120" y="70" width="14" height="204" fill="${DSTEEL}" stroke="var(--fg)"/><rect x="346" y="70" width="14" height="204" fill="${DSTEEL}" stroke="var(--fg)"/><rect x="150" y="128" width="180" height="112" rx="6" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.6"/><rect x="164" y="142" width="152" height="56" fill="color-mix(in srgb,var(--bg) 80%,#fff)" stroke="var(--fg)"/><g fill="${YEL}" stroke="var(--fg)"><rect x="134" y="136" width="16" height="22"/><rect x="134" y="210" width="16" height="22"/><rect x="330" y="136" width="16" height="22"/><rect x="330" y="210" width="16" height="22"/></g><path d="M240 128V94" stroke="var(--fg)" stroke-width="3"/><circle cx="240" cy="82" r="12" fill="${STEEL}" stroke="var(--fg)"/>${arr(410,168,410,116,RX,2.6)}${arr(410,178,410,230,RX,2.6)}`+
 T(420,176,'free')+T(16,150,'Guide shoe')+L(78,148,138,146)+T(16,238,'Guide rail')+L(74,236,122,236)+T(16,292,'Like a guided support: it reacts with a horizontal force and a moment'));
REAL.spring=rw(HD('Footing on soil: the ground acts like springs','Winkler model: soil pressure is proportional to settlement, p = k·w')+
 `<rect x="205" y="98" width="70" height="36" fill="${CONC}" stroke="var(--fg)"/><rect x="130" y="134" width="220" height="30" fill="${CONC}" stroke="var(--fg)"/><rect x="30" y="168" width="420" height="132" fill="${EARTH}" opacity=".8" stroke="none"/><g stroke="var(--fg)" stroke-width="2.4" fill="none">${[160,200,240,280,320].map(x=>`<path d="M${x} 164v8l-9 5 18 8-18 8 18 8-18 8 9 5v56"/>`).join('')}</g><path d="M60 262H430" stroke="var(--fg)" stroke-width="2.4"/>${hatch(60,262,370)}${arr(240,56,240,94,LD)}${arr(60,176,60,214,LD)}`+
 T(252,78,'Column load N')+T(72,198,'Settlement w')+T(452,196,'Soil springs','end')+T(452,210,'stiffness k','end')+T(16,292,'Very stiff soil ≈ rigid support; very soft soil ≈ no support'));
REAL.hinge=rw(HD('Three-hinged steel arch bridge','Hinges at both supports and at the crown: M = 0 at each hinge')+
 `<path d="M60 262Q240 -62 420 262" stroke="${STEEL}" stroke-width="14" fill="none"/><path d="M60 262Q240 -62 420 262" stroke="var(--fg)" stroke-width="1.5" fill="none"/><path d="M30 262h70v38H30zM380 262h70v38H380z" fill="${CONC}" stroke="var(--fg)"/><circle cx="64" cy="262" r="9" fill="${YEL}" stroke="var(--fg)"/><circle cx="416" cy="262" r="9" fill="${YEL}" stroke="var(--fg)"/><circle cx="240" cy="99" r="12" fill="${YEL}" stroke="var(--fg)" stroke-width="2.4"/><g transform="translate(410 112)"><circle r="44" fill="var(--bg)" stroke="var(--fg)" stroke-width="2"/><path d="M-36 14L-7 -6" stroke="${STEEL}" stroke-width="15" stroke-linecap="butt"/><path d="M36 14L7 -6" stroke="${STEEL}" stroke-width="15" stroke-linecap="butt"/><circle cy="-6" r="9" fill="${YEL}" stroke="var(--fg)" stroke-width="2"/></g><path d="M252 100L368 108" stroke="var(--mut)" stroke-dasharray="4 4"/>`+
 T(240,76,'Crown hinge','middle')+T(112,284,'Support hinge')+L(110,282,74,268)+T(410,176,'Detail: pin','middle')+T(410,190,'joins the halves','middle'));
REAL.rigid=rw(HD('Welded steel moment connection','Beam and column rotate together: the 90° angle is preserved')+
 `<rect x="170" y="64" width="60" height="236" fill="${STEEL}" stroke="var(--fg)" stroke-width="1.6"/><path d="M200 64V300" stroke="var(--fg)" stroke-width="1" opacity=".5"/><rect x="230" y="104" width="220" height="12" fill="${DSTEEL}" stroke="var(--fg)"/><rect x="230" y="116" width="220" height="44" fill="${STEEL}" stroke="var(--fg)"/><rect x="230" y="160" width="220" height="12" fill="${DSTEEL}" stroke="var(--fg)"/><path d="M170 104H230M170 172H230" stroke="var(--fg)" stroke-width="5"/><path d="M230 104h14l-14 12zM230 172h14l-14 -12z" fill="var(--fg)"/>`+
 T(16,262,'Column')+L(64,258,172,250)+T(16,128,'Stiffener')+T(16,142,'plates')+L(70,136,170,106)+L(70,140,170,172)+T(262,92,'Welded flanges carry the moment')+L(250,95,236,106)+T(452,198,'Beam (I-section)','end'));
REAL.truss=rw(HD('Bolted gusset-plate joint in a steel truss','Member centre-lines meet at one point, so members carry axial force only')+
 `<path d="M10 140H250" stroke="${STEEL}" stroke-width="18" stroke-linecap="butt"/><path d="M250 140L450 60" stroke="${STEEL}" stroke-width="18" stroke-linecap="butt"/><path d="M250 140L450 262" stroke="${STEEL}" stroke-width="18" stroke-linecap="butt"/><path d="M168 76L300 92L352 196L206 226Z" fill="${DSTEEL}" opacity=".9" stroke="var(--fg)" stroke-width="2"/><path d="M10 140H250M250 140L450 60M250 140L450 262" stroke="${LD}" stroke-width="1.6" stroke-dasharray="6 5"/><g fill="var(--bg)" stroke="var(--fg)" stroke-width="1.8"><circle cx="200" cy="122" r="6"/><circle cx="200" cy="158" r="6"/><circle cx="280" cy="112" r="6"/><circle cx="318" cy="160" r="6"/><circle cx="300" cy="196" r="6"/><circle cx="236" cy="196" r="6"/></g><circle cx="250" cy="140" r="6" fill="${LD}" stroke="none"/>`+
 T(16,186,'Chord member')+T(466,52,'Diagonal member','end')+T(466,286,'Diagonal member','end')+T(16,96,'Gusset plate')+L(86,100,184,100)+T(400,170,'Bolts')+L(398,168,324,162)+T(16,262,'Centre-lines meet at the joint')+L(150,258,246,146));

/* ============================================================ animated 3D scenes (t = seconds) */
const OK=P.ok,LDC=P.load,RXC=P.ok;
const ground=(x0,x1,col=P.conc)=>G.box([(x0+x1)/2,.1,0],[x1-x0,.4,2.4],col);
const pedestal=(x,py,col=P.dark)=>G.prism([[x-.95,.3],[x+.95,.3],[x,py-.28]],-.55,.55,col);
const rz=(sh,a,pv)=>G.xf(sh,G.rotZ(a,pv));
const sm=t=>.5-.5*Math.cos(t);                      /* smooth 0..1..0 */
const hud=(...l)=>l.map(a=>typeof a=='string'?[a]:a);

S.dof=t=>{const k=Math.floor(t/2.4)%3,tau=(t%2.4)/2.4,m=Math.sin(2*Math.PI*tau),sh=[],py=1.9;
 let x=0,y=0,th=0,txt='';if(k==0){x=1.5*m;txt='Translation in x  (u)'}else if(k==1){y=.9*m;txt='Translation in y  (v)'}else{th=.55*m;txt='Rotation about z  (θ)'}
 const body=G.box([0,py,0],[2.4,.75,1.2],P.beam);
 sh.push(...G.xf(G.xf(body,G.rotZ(th,[0,py])),G.mv(x,y)));
 sh.push(G.line([[-1.2,py+.38,.62],[1.2,py+.38,.62],[1.2,py-.38,.62],[-1.2,py-.38,.62],[-1.2,py+.38,.62]],'fg',1.4,{dash:[5,4],op:.55}));
 sh.push(...G.arrow([-3.6,.2,0],[-2.3,.2,0],'#2f6fd0'),...G.arrow([-3.6,.2,0],[-3.6,1.5,0],'#2f6fd0'),G.label([-2,.2,0],'x','#2f6fd0'),G.label([-3.6,1.75,0],'y','#2f6fd0'));
 sh.push(...G.moment([0,py,.7],.15,0,0,'#fff'));
 const col=['#2f6fd0','#2f6fd0',LDC][k];sh.push(G.label([.4,.45,0],txt,col,{size:15}));
 return{shapes:sh,center:[-.5,1.9,0],span:8.5,hud:hud(['Free body in a plane: 3 independent motions',null],['A support removes one or more of them','#888'])}};

S.pin=t=>{const th=.21*Math.sin(t*1.25),py=1.35,sh=[...ground(-4,5.5),...pedestal(0,py)];
 const beam=G.xf(G.box([2.45,py,0],[5.5,.42,1.0],P.beam),G.rotZ(th,[0,py]));
 sh.push(...G.cyl([0,py,0],.2,1.7,P.pin,{mark:-th*4}),...beam);
 const lp=G.rotZ(th,[0,py])([3.6,py+.21,0]);
 sh.push(...G.arrow([lp[0],lp[1]+1.7,0],[lp[0],lp[1]+.05,0],LDC),G.label([lp[0]+.35,lp[1]+1.2,0],'P',LDC));
 sh.push(...G.arrow([-2.1,py,1.35],[-.3,py,1.35],RXC),G.label([-1.2,py+.3,1.35],'Rx',RXC),...G.arrow([0,-.8,1.35],[0,py-.5,1.35],RXC),G.label([.45,-.45,1.35],'Ry',RXC));
 sh.push(G.line([[0,py,.8],[0,py+1.15,.8]],'fg',1.3,{dash:[3,3],op:.5}),...G.moment([0,py,.82],.95,.7,1.35,'#999'));
 return{shapes:sh,center:[1.4,1.5,0],hud:hud(['Rotation: FREE  ✓','#177a3c'],['Move x / y: LOCKED  ✕','#D62828'])}};

S.roller=t=>{const dl=.62*Math.sin(t*1.1),py=1.6,rr=.3,sh=[...ground(-4.5,5.5),...pedestal(-3,py)];
 sh.push(...G.cyl([-3,py,0],.2,1.7,P.pin));
 const xe=3+dl;
 sh.push(...G.box([(-3.3+xe)/2,py,0],[xe+3.3,.42,1.0],P.beam));
 const xr=xe-.35,ang=-dl/rr;
 sh.push(...G.box([xr,.38,0],[2.3,.16,1.5],P.dark),...G.cyl([xr,.46+rr,0],rr,1.2,P.steel,{mark:ang}),...G.box([xr,.46+2*rr+.1,0],[1.9,.2,1.3],P.dark));
 sh.push(...G.arrow([xr,-.8,1.2],[xr,.5+rr,1.2],RXC),G.label([xr+.5,-.35,1.2],'Ry',RXC));
 sh.push(...G.arrow([xe+.2,py+.9,0],[xe+1.4,py+.9,0],'#2f6fd0'),...G.arrow([xe-.2,py+.9,0],[xe-1.4,py+.9,0],'#2f6fd0'),G.label([xe,py+1.25,0],'expands / contracts','#2f6fd0'));
 return{shapes:sh,center:[.2,1.5,0],hud:hud(['Move along the surface: FREE  ✓','#177a3c'],['Rotation: FREE  ✓','#177a3c'],['Move ⟂ surface: LOCKED  ✕','#D62828'])}};

S.fixed=t=>{const A=sm(t*1.15),dl=1.05*A,Lb=4.6,y0=2.1,sh=[];
 const st=[];for(let i=0;i<=22;i++){const x=-1.2+(Lb+1.2)*i/22,s=Math.max(0,x/Lb);st.push([x,y0-dl*(3*s*s-s*s*s)/2])}
 sh.push(...G.box([-.85,1.6,0],[1.7,4.2,2.4],P.conc,{op:.82}),...G.ext(st,.45,1.0,P.beam));
 sh.push(G.line([[0,y0,.6],[Lb,y0,.6]],'fg',1.4,{dash:[5,4],op:.5}));
 const tip=st[22];sh.push(...G.arrow([Lb,tip[1]+1.9,0],[Lb,tip[1]+.25,0],LDC),G.label([Lb+.35,tip[1]+1.4,0],'P',LDC));
 sh.push(...G.arrow([0,-.7,1.5],[0,y0-.35,1.5],RXC),G.label([.45,-.2,1.5],'Ry',RXC),...G.moment([0,y0,1.5],.85,2.2,5.1,RXC),G.label([-1.1,y0-1.1,1.5],'M',RXC));
 sh.push(G.line([[-.55,y0,.9],[.9,y0,.9]],'#fff',2.4),G.label([.9,y0+.65,.9],'slope = 0','fg',{size:12}));
 return{shapes:sh,center:[1.6,1.4,0],hud:hud(['Move x / y: LOCKED  ✕','#D62828'],['Rotation: LOCKED  ✕  (slope = 0 at the wall)','#D62828'])}};

S.incl=t=>{const al=24*Math.PI/180,ca=Math.cos(al),sa=Math.sin(al),u=3.9+1.15*Math.sin(t*1.1),sh=[];
 const Sx=x=>[-3+x*ca,.3+x*sa],n=[-sa,ca],S0=Sx(u),rr=.3;
 sh.push(...G.box([0,.1,0],[9,.4,2.4],P.conc),...G.prism([[-3,.3],[4.8,.3],[4.8,.3+7.8*Math.tan(al)]],-1.2,1.2,P.conc));
 const rc=[S0[0]+n[0]*rr,S0[1]+n[1]*rr,0];
 sh.push(...G.cyl(rc,rr,1.2,P.steel,{mark:-u/rr}));
 const pl=[S0[0]+n[0]*(2*rr+.1),S0[1]+n[1]*(2*rr+.1),0];
 sh.push(...G.xf(G.box(pl,[1.6,.2,1.3],P.dark),G.rotZ(al,[pl[0],pl[1]])));
 const J=[pl[0]+n[0]*.45,pl[1]+n[1]*.45+.55,0];
 sh.push(...G.bar([pl[0],pl[1]],[J[0],J[1]],.2,.6,P.dark),...G.cyl(J,.2,1.3,P.pin));
 sh.push(...G.box([J[0]-1.9,J[1],0],[3.8,.4,.9],P.beam));
 sh.push(G.line([[J[0]-3.9,J[1]+.3,0],[J[0]-3.7,J[1]+.1,0],[J[0]-3.9,J[1]-.1,0],[J[0]-3.7,J[1]-.3,0]],'fg',2));
 const a=[S0[0]-n[0]*1.5,S0[1]-n[1]*1.5,1.3],b=[S0[0]+n[0]*.1,S0[1]+n[1]*.1,1.3];sh.push(...G.arrow(a,b,RXC),G.label([a[0]+.55,a[1]-.15,1.3],'R ⟂ slope',RXC));
 sh.push(G.line([[S0[0]-1.9*ca,S0[1]-1.9*sa,1.3],[S0[0]+1.9*ca,S0[1]+1.9*sa,1.3]],'#2f6fd0',2,{dash:[6,5]}),G.label([S0[0]+1.2*ca-.9,S0[1]+1.2*sa-.6,1.3],'free direction','#2f6fd0',{size:12}));
 return{shapes:sh,center:[.3,2.2,0],hud:hud(['Move along the slope: FREE  ✓','#177a3c'],['Move ⟂ slope: LOCKED  ✕','#D62828'],['(beam shown cut at its left end)','#888'])}};

S.guided=t=>{const yc=2.7,dy=.95*Math.sin(t*1.15),sh=[];
 sh.push(...ground(-2.5,5),...G.box([-.55,2.9,0],[.14,5.2,1.5],P.dark),...G.box([.55,.85,0],[.14,1.2,1.5],P.dark),...G.box([.55,5.15,0],[.14,.8,1.5],P.dark));
 sh.push(...G.box([0,yc+dy,0],[.92,1.1,1.1],P.pin),...G.box([2.4,yc+dy,0],[3.8,.42,.9],P.beam));
 sh.push(...G.arrow([4.1,yc+dy+1.5,0],[4.1,yc+dy+.25,0],LDC),G.label([4.45,yc+dy+1.1,0],'P',LDC));
 sh.push(...G.arrow([-2.1,yc,1.35],[-.65,yc,1.35],RXC),G.label([-1.4,yc+.3,1.35],'Rx',RXC),...G.moment([-.55,yc-.1,1.35],.75,.5,3.6,RXC),G.label([-1.3,yc-1.0,1.35],'M',RXC));
 sh.push(G.line([[1.2,yc,.9],[4.2,yc,.9]],'fg',1.3,{dash:[5,4],op:.5}));
 return{shapes:sh,center:[1.3,2.6,0],hud:hud(['Move along the guide (y): FREE  ✓','#177a3c'],['Move x: LOCKED  ✕','#D62828'],['Rotation: LOCKED  ✕','#D62828'])}};

S.spring=t=>{const py=1.9,dl=.55*Math.sin(t*1.25),th=Math.atan2(-dl,6),sh=[...ground(-4.5,4.5),...pedestal(-3,py)];
 sh.push(...G.cyl([-3,py,0],.2,1.7,P.pin));
 const beam=G.xf(G.box([-.3,py,0],[6.6,.42,1.0],P.beam),G.rotZ(th,[-3,py]));sh.push(...beam);
 const bx=2.7,yb=G.rotZ(th,[-3,py])([bx,py-.21,0])[1],base=.5;
 sh.push(...G.box([bx,.38,0],[1.2,.16,1.0],P.dark),G.helix([bx,.55,0],.3,Math.max(.4,yb-.55),7,'#4a5568',3.4),G.line([[bx,.46,0],[bx,.55,0]],'#4a5568',3.4),G.line([[bx,yb-.0,0],[bx,yb,0]],'#4a5568',3.4));
 const comp=(py-.21-yb)/.55;const arrLen=Math.abs(comp)*1.3+.2;
 if(comp>=0)sh.push(...G.arrow([bx+.85,yb-arrLen,1.0],[bx+.85,yb,1.0],RXC));else sh.push(...G.arrow([bx+.85,yb+arrLen,1.0],[bx+.85,yb,1.0],RXC));
 sh.push(G.label([bx+1.55,yb-.55,1.0],'R = k·Δ',RXC));
 sh.push(G.line([[bx-.8,py-.21,.7],[bx+.8,py-.21,.7]],'fg',1.3,{dash:[4,3],op:.5}));
 const dn=dl>0;sh.push(...(dn?G.arrow([-.2,py+1.9,0],[-.2,py+.3,0],LDC):G.arrow([-.2,py+.3,0],[-.2,py+1.9,0],'#2f6fd0')));sh.push(G.label([.3,py+1.2,0],dn?'load ↓':'uplift ↑',dn?LDC:'#2f6fd0'));
 return{shapes:sh,center:[.2,1.6,0],hud:hud(['Elastic: the reaction grows with the movement','#B85408'],['R = k·Δ   (k = spring stiffness)','#B85408'])}};

S.hinge=t=>{const Lb=3.4,h=2.05+.55*Math.sin(t*1.2),a=Math.sqrt(Lb*Lb-h*h),xl=-3.2,fy=.95,ap=[xl+a,fy+h,0],xr=xl+2*a,sh=[...ground(-5,4.8)];
 sh.push(...pedestal(xl,fy+.28),...G.cyl([xl,fy,0],.2,1.5,P.pin));
 sh.push(...G.box([xr,.38,0],[2.2,.16,1.4],P.dark),...G.cyl([xr,.46+.26,0],.26,1.1,P.steel,{mark:-xr*1.5}));
 sh.push(...G.bar([xl,fy],[ap[0],ap[1]],.34,.8,P.beam),...G.bar([xr,fy],[ap[0],ap[1]],.34,.8,'#f08a30'),...G.cyl([xr,fy,0],.2,1.5,P.pin));
 sh.push(...G.cyl(ap,.23,1.4,P.pin,{mark:t*2}));
 sh.push(...G.arrow([ap[0],ap[1]+1.7,0],[ap[0],ap[1]+.3,0],LDC),G.label([ap[0]+.35,ap[1]+1.2,0],'P',LDC));
 const ang=2*Math.atan2(a,h)*180/Math.PI;sh.push(G.label([ap[0],ap[1]-.65,.9],'angle = '+ang.toFixed(0)+'°','fg',{size:13}));
 sh.push(...G.arrow([xl-1.9,fy,1.3],[xl-.3,fy,1.3],RXC),G.label([xl-1.1,fy+.3,1.3],'Rx',RXC),...G.arrow([xl,-.8,1.3],[xl,fy-.3,1.3],RXC),G.label([xl+.45,-.4,1.3],'Ry',RXC),...G.arrow([xr,-.8,1.3],[xr,.9,1.3],RXC),G.label([xr+.45,-.4,1.3],'Ry',RXC));
 return{shapes:sh,center:[-.2,2.1,0],span:12,hud:hud(['Hinge: members rotate freely relative to each other','#177a3c'],['Moment at the hinge: M = 0','#B85408'])}};

S.rigid=t=>{const A=sm(t*1.1),H=3.5,Lb=3.9,y0=.3,dl=.75*A,sh=[];const u=s=>dl*(3*s*s-s*s*s)/2,st=[];
 for(let i=0;i<=16;i++){const s=i/16;st.push([u(s),y0+H*s])}
 const phi=Math.atan(1.5*dl/H),d1=[Math.cos(phi),-Math.sin(phi)],tdn=[-Math.sin(phi),-Math.cos(phi)],Tp=st[16];
 const bs=[];for(let i=0;i<=14;i++){const s=Lb*i/14;bs.push([Tp[0]+d1[0]*s,Tp[1]+d1[1]*s])}
 sh.push(...ground(-2.2,2.2),...G.box([0,.3,0],[1.8,.3,1.5],P.dark),...G.ext(st,.46,.9,P.beam),...G.ext(bs,.46,.9,P.beam));
 sh.push(...G.xf(G.box([Tp[0],Tp[1],0],[.5,.5,.92],'#c95a05'),G.rotZ(-phi,[Tp[0],Tp[1]])));
 sh.push(G.line([[0,y0,.7],[0,y0+H,.7],[Lb,y0+H,.7]],'fg',1.4,{dash:[5,4],op:.5}));
 const m=.62,p1=[Tp[0]+d1[0]*m,Tp[1]+d1[1]*m,.6],p2=[p1[0]+tdn[0]*m,p1[1]+tdn[1]*m,.6],p3=[Tp[0]+tdn[0]*m,Tp[1]+tdn[1]*m,.6];
 sh.push(G.line([p1,p2,p3],'#fff',2.6,{top:1}),G.label([Tp[0]+.55,Tp[1]-.85,.6],'90°','fg',{size:13}));
 sh.push(...G.arrow([-2.5,y0+H,0],[-.45,y0+H,0],LDC),G.label([-1.6,y0+H+.35,0],'P',LDC));
 sh.push(...G.arrow([1.9,y0+.3,1.0],[.45,y0+.3,1.0],RXC),G.label([1.3,y0+.65,1.0],'Rx',RXC),...G.moment([0,y0,1.0],.8,3.6,6.6,RXC),G.label([-1.0,y0-.3,1.0],'M',RXC));
 return{shapes:sh,center:[1.2,2.2,0],span:10,hud:hud(['Members rotate together: angle stays 90°','#177a3c'],['N, V and M pass through the joint','#B85408'])}};

S.truss=t=>{const g=sm(t*1.15),bx=.5*g,dy=.45*g,A=[-3,.95],Bp=[3+bx,.95],C=[0,3.3-dy],sh=[...ground(-5,5)];
 sh.push(...pedestal(A[0],A[1]+.28),...G.box([Bp[0],.38,0],[2.0,.16,1.4],P.dark),...G.cyl([Bp[0],.46+.26,0],.26,1.1,P.steel,{mark:-bx*3}));
 sh.push(...G.bar(A,Bp,.32,.8,'#e25555'),...G.bar(A,C,.32,.8,'#3d7be0'),...G.bar(Bp,C,.32,.8,'#3d7be0'));
 for(const p of[A,Bp,C])sh.push(...G.cyl([p[0],p[1],0],.22,1.4,P.pin));
 sh.push(...G.arrow([C[0],C[1]+1.8,0],[C[0],C[1]+.3,0],LDC),G.label([C[0]+.4,C[1]+1.3,0],'P',LDC));
 sh.push(G.label([0,A[1]-.55,.8],'tension (T)','#e25555',{size:13}),G.label([-1.9,2.3,.8],'compression (C)','#3d7be0',{size:13}),G.label([1.9,2.3,.8],'compression (C)','#3d7be0',{size:13}));
 sh.push(...G.arrow([A[0]-1.9,A[1],1.2],[A[0]-.3,A[1],1.2],RXC),...G.arrow([A[0],-.8,1.2],[A[0],A[1]-.3,1.2],RXC),...G.arrow([Bp[0],-.8,1.2],[Bp[0],.9,1.2],RXC));
 return{shapes:sh,center:[0,1.8,0],span:12,hud:hud(['Pins let every member rotate at the joints','#177a3c'],['Loads at joints → members carry axial force only','#B85408'])}};

/* ============================================================ slides */
const F=(a,b)=>[a,b];
const slides=[
{id:'dof',title:'Why supports and joints matter',kicker:'Start here · Degrees of freedom',
 lead:'Every structure must be held in place, and its members must be connected. Supports and joints decide which motions are blocked and which forces can flow.',
 symbol:SYM.dof,scene:'dof',dof:{ux:'free',uy:'free',rz:'free'},
 symbolCap:'In a plane a body can translate in x, translate in y and rotate: three degrees of freedom (DOF).',sceneCap:'The three independent motions of a plane body, one after the other. Drag to look around.',
 facts:[F('The golden rule','A support produces a <b>reaction</b> exactly in the direction of a motion it <b>prevents</b>. A blocked translation gives a force; a blocked rotation gives a moment.'),
  F('Supports vs. joints','A <b>support</b> connects the structure to the ground. A <b>joint</b> connects members to each other. Both are idealised by the motions they allow.'),
  F('Why idealise?','Real connections are never perfect pins or perfect fixed ends. We choose the idealisation that best matches how the detail behaves, then check that the analysis is realistic.'),
  F('What follows','Pin, roller, fixed, inclined roller, guided and spring supports, then hinged, rigid and truss-pin joints. Use ← → or swipe to move on.')]},
{id:'pin',title:'Pin (hinged) support',kicker:'Support 1 of 6 · Supports',
 lead:'The member can turn freely about the pin, but the pin point cannot move in any direction.',
 symbol:SYM.pin,real:REAL.pin,scene:'pin',dof:{ux:'lock',uy:'lock',rz:'free'},reac:['Rx','Ry'],
 symbolCap:'Standard triangle symbol and the two reaction components it can develop.',realCap:'A pin bearing: lug plates hold a steel pin; the girder rotates about it but cannot translate.',sceneCap:'The beam rotates about the pin while the pin point stays put. Reactions Rx and Ry are always present.',
 facts:[F('Restrains','Horizontal and vertical translation.'),F('Allows','Rotation about the pin.'),F('Reactions','Two unknowns: <b>Rx</b> and <b>Ry</b>. No moment can be developed (M = 0 at the pin).'),
  F('Where you see it','Bridge pin bearings, base of a pinned portal frame, the end of a truss, steel base plates with a single row of bolts.'),
  F('In STRUXA','Truss joints: <b>Pinned</b>. Frame and beam supports: <b>Pinned / Hinged</b>.')],
 note:'A pin may also carry a moment in reality (friction, a tight bolt group), but treating it as M = 0 is the standard, usually safe, assumption.'},
{id:'roller',title:'Roller support',kicker:'Support 2 of 6 · Supports',
 lead:'The member can slide along the supporting surface and rotate, but it cannot move into or away from the surface.',
 symbol:SYM.roller,real:REAL.roller,scene:'roller',dof:{ux:'free',uy:'lock',rz:'free'},reac:['Ry'],
 symbolCap:'The little wheels show that horizontal movement is free. The reaction is perpendicular to the surface.',realCap:'Bridge roller bearing: steel rollers let the girder expand and contract with temperature without cracking the pier.',sceneCap:'The beam grows and shrinks; the roller turns and the end slides. Only the vertical reaction Ry exists.',
 facts:[F('Restrains','One translation: perpendicular to the supporting surface.'),F('Allows','Translation along the surface and rotation.'),F('Reactions','Only <b>one</b> unknown: a force <b>perpendicular</b> to the surface (Ry for a horizontal roller).'),
  F('Where you see it','Roller / rocker / PTFE sliding bearings under bridge girders, expansion ends of long beams and roofs.'),
  F('In STRUXA','Truss joints: <b>Roller (moves horizontally)</b> gives a vertical reaction; <b>Roller (moves vertically)</b> gives a horizontal one.')],
 note:'Friction is neglected. A real roller can only push, not pull, unless it is tied down; STRUXA assumes it works both ways.'},
{id:'fixed',title:'Fixed support',kicker:'Support 3 of 6 · Supports',
 lead:'Nothing at the support point can move or turn: the member is clamped as if built into a wall.',
 symbol:SYM.fixed,real:REAL.fixed,scene:'fixed',dof:{ux:'lock',uy:'lock',rz:'lock'},reac:['Rx','Ry','M'],
 symbolCap:'The hatched wall shows full clamping. Three reactions are developed.',realCap:'A cantilever balcony built into a wall: continuous top bars anchor the moment at the wall face.',sceneCap:'Under load the free end deflects, but the beam leaves the wall with zero slope. The wall resists with Ry and a moment M.',
 facts:[F('Restrains','Both translations and the rotation.'),F('Allows','Nothing at the support point.'),F('Reactions','Three unknowns: <b>Rx</b>, <b>Ry</b> and a <b>moment M</b>.'),
  F('Where you see it','Cantilever slabs and beams, columns continuous into a footing, piles in stiff ground, welded base plates with stiff anchors.'),
  F('In STRUXA','Frame and beam supports: <b>Fixed</b>.')],
 note:'Perfect fixity does not exist: foundations rotate a little. If the rotation matters, model the support as a rotational spring.'},
{id:'incl',title:'Inclined roller support',kicker:'Support 4 of 6 · Supports',
 lead:'A roller on a sloping surface: it moves along the slope, and the reaction acts perpendicular to the slope, not vertically.',
 symbol:SYM.incl,real:REAL.incl,scene:'incl',dof:{ux:'free',uy:'free',rz:'free'},reac:['R ⟂ slope'],
 symbolCap:'The reaction line is normal to the sloping surface.',realCap:'A girder bearing on a sloping seat: the shoe rolls along the slope.',sceneCap:'The joint slides along the incline. The single reaction always stays perpendicular to the surface.',
 facts:[F('Restrains','Translation perpendicular to the sloping surface.'),F('Allows','Translation along the slope, and rotation.'),F('Reactions','One force along the normal to the slope; resolve it into Rx and Ry with the slope angle.'),
  F('Where you see it','Sloping abutments, skewed bridges, ramps, inclined supports on hillsides.'),
  F('In STRUXA','Truss joints: <b>Inclined roller</b>. Enter the direction of the restrained displacement (the line of the reaction).')],
 note:'Its three motions are not all independent: the free motion is along the slope. Think of it as an ordinary roller turned by the slope angle.'},
{id:'guided',title:'Guided (sliding) fixed support',kicker:'Support 5 of 6 · Supports',
 lead:'The end can slide along a guide but cannot rotate or move across it.',
 symbol:SYM.guided,real:REAL.guided,scene:'guided',dof:{ux:'lock',uy:'free',rz:'lock'},reac:['Rx','M'],
 symbolCap:'Two parallel lines represent the guide; the end cannot rotate.',realCap:'An elevator car in its guide rails: free vertically, blocked sideways and against tilting.',sceneCap:'The slider moves up and down inside the guide; the beam stays horizontal. A horizontal force and a moment are the reactions.',
 facts:[F('Restrains','One translation (across the guide) and the rotation.'),F('Allows','Translation along the guide.'),F('Reactions','Two unknowns: a force across the guide and a <b>moment</b>.'),
  F('Where you see it','Sliding collars, guided bearings, lift guides, and in modelling: a cut on an axis of symmetry of a symmetric structure under symmetric load.')],
 note:'Modelling trick: for a symmetric structure with symmetric loading you can analyse half of it and replace the cut by a guided support.'},
{id:'spring',title:'Elastic (spring) support',kicker:'Support 6 of 6 · Supports',
 lead:'The support gives way a little: the more it moves, the larger the reaction. It lies between a rigid support and no support at all.',
 symbol:SYM.spring,real:REAL.spring,scene:'spring',dof:{ux:'free',uy:'elastic',rz:'free'},reac:['R = k·Δ'],
 symbolCap:'The zig-zag is a spring of stiffness k. Reaction = stiffness × displacement.',realCap:'Soil under a footing behaves like a bed of springs (Winkler foundation).',sceneCap:'As the beam end moves, the spring compresses or stretches, and the reaction arrow grows or reverses with it.',
 facts:[F('Rule','<b>R = k · Δ</b>. When k → ∞ the support becomes rigid; when k → 0 it disappears.'),F('Where you see it','Soil under footings and rafts, piles, elastomeric and spring isolators, cables and flexible columns idealised as springs.'),
  F('Why it matters','It makes a structure statically indeterminate in a natural way: reactions now depend on stiffness, not only on equilibrium.'),
  F('In STRUXA','Not modelled yet: supports are rigid or free. Spring supports are a candidate for a future update.')]},
{id:'hinge',title:'Hinged (internal) joint',kicker:'Joint 1 of 3 · Joints',
 lead:'A hinge inside a structure releases the bending moment: the two sides can rotate relative to each other, yet forces still pass through.',
 symbol:SYM.hinge,real:REAL.hinge,scene:'hinge',dof:{rz:'free'},reac:['N and V pass','M = 0'],
 symbolCap:'The open circle marks the hinge. At the cut, the axial force N and shear V are transmitted; the moment is zero.',realCap:'A three-hinged arch: pins at both supports and at the crown keep the structure determinate.',sceneCap:'Two bars joined by a hinge: the angle between them changes freely while the load is carried.',
 facts:[F('Transmits','Axial force N and shear V.'),F('Releases','Bending moment: <b>M = 0</b> at the hinge.'),
  F('Equation','Each internal hinge gives one extra equation: take moments of all forces on one side of the hinge about the hinge = 0.'),
  F('Where you see it','Three-hinged arches and frames, Gerber (hinged) bridge girders, expansion joints, mechanism of a collapse (plastic hinge).')],
 note:'Do not confuse a <b>hinge support</b> (a pin to the ground) with an <b>internal hinge</b> (a pin between two members). Both release rotation.'},
{id:'rigid',title:'Rigid (moment) joint',kicker:'Joint 2 of 3 · Joints',
 lead:'The members are connected so firmly that they rotate together: the angle between them never changes.',
 symbol:SYM.rigid,real:REAL.rigid,scene:'rigid',dof:{ux:'lock',uy:'lock',rz:'lock'},reac:['N','V','M'],
 symbolCap:'The right angle is preserved. All three internal actions are transmitted.',realCap:'A welded steel moment connection: flange plates and stiffeners carry the beam moment into the column.',sceneCap:'The frame sways, both members bend, yet the corner stays exactly 90°.',
 facts:[F('Transmits','Axial force N, shear V and bending moment M.'),F('Keeps','The original angle between the members.'),
  F('Equilibrium','At a rigid joint the end moments of the members must add to zero (plus any applied joint moment). This is the basis of slope-deflection and moment distribution.'),
  F('Where you see it','Monolithic reinforced-concrete beam–column joints, welded or heavily bolted steel moment frames.'),
  F('In STRUXA','Frames and flat slab frames are analysed with rigid joints; the moment-distribution tables balance the moments at them.')]},
{id:'truss',title:'Pin-connected truss joint',kicker:'Joint 3 of 3 · Joints',
 lead:'In an ideal truss every member ends in a frictionless pin, and loads act only at the joints, so each member carries a pure axial force.',
 symbol:SYM.truss,real:REAL.truss,scene:'truss',dof:{rz:'free'},reac:['axial forces only'],
 symbolCap:'At each joint only forces along the members meet, so ΣFx = 0 and ΣFy = 0.',realCap:'Real truss joints are bolted or welded gusset plates; if member centre-lines meet at one point they behave very nearly like pins.',sceneCap:'A simple triangular truss: the bottom chord stretches (tension), the two inclined members shorten (compression), and the joints rotate freely.',
 facts:[F('Idealisation','Pins at all joints, loads only at joints, members straight and weightless. Then each member is a two-force member.'),
  F('Result','Only <b>tension</b> or <b>compression</b>. No bending, no shear in members.'),
  F('Why it works','Slender members joined at gusset plates have small secondary bending. The idealisation is slightly conservative and very useful.'),
  F('In STRUXA','The <b>Plane Truss</b> module uses exactly this model, with the method of joints or the matrix stiffness method.')],
 note:'If loads are applied between joints, or the joint is rigid and the members are stocky, the bars also bend and the pure-truss model is no longer valid.'},
{id:'summary',title:'Summary and quick reference',kicker:'Review',
 lead:'Compare what each support or joint blocks and which reactions it creates. This table is the checklist you will use in every analysis.',
 html:`<div class="stx-tw"><table class="stx-tbl"><thead><tr><th>Type</th><th>Blocks</th><th>Allows</th><th>Unknowns</th></tr></thead><tbody>
 <tr><td><b>Pin support</b></td><td>x, y</td><td>rotation</td><td>2: Rx, Ry</td></tr>
 <tr><td><b>Roller</b></td><td>1 translation (⟂ surface)</td><td>slide along surface, rotation</td><td>1: R ⟂ surface</td></tr>
 <tr><td><b>Fixed</b></td><td>x, y, rotation</td><td>nothing</td><td>3: Rx, Ry, M</td></tr>
 <tr><td><b>Inclined roller</b></td><td>translation ⟂ slope</td><td>slide along slope, rotation</td><td>1: R ⟂ slope</td></tr>
 <tr><td><b>Guided fixed</b></td><td>1 translation, rotation</td><td>slide along the guide</td><td>2: force + M</td></tr>
 <tr><td><b>Spring</b></td><td>partly, R = k·Δ</td><td>proportionally</td><td>1: depends on k</td></tr>
 <tr><td><b>Internal hinge</b></td><td>relative translation</td><td>relative rotation</td><td>M = 0 (1 condition)</td></tr>
 <tr><td><b>Rigid joint</b></td><td>relative translation and rotation</td><td>nothing</td><td>N, V, M transmitted</td></tr>
 <tr><td><b>Truss pin</b></td><td>relative translation</td><td>relative rotation</td><td>axial force only</td></tr></tbody></table></div>`,
 facts:[F('Stability check (plane structure)','At least <b>3 independent reactions</b> are needed to hold a body in a plane, arranged so that they are not all parallel and do not all pass through one point.'),
  F('Static determinacy','With r reactions and c extra conditions from hinges: r = 3 + c → determinate (for external stability); r larger → indeterminate; r smaller → mechanism.'),
  F('Next step','Open <b>Structural Analysis</b> and try the same ideas: change the supports of a truss and watch the reactions change.')]}
];

STX.register({id:'joints',title:'Structural Joints & Supports',desc:'Pin, roller, fixed, inclined, guided and spring supports; hinged, rigid and truss joints. Diagrams, real-world illustrations and animated 3D models.',
 icon:'<svg viewBox="0 0 150 88" width="170" height="100" fill="none" stroke="var(--fg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 32h122" stroke="var(--ac)" stroke-width="7" stroke-linecap="butt"/><path d="M34 35l-13 24h26z" fill="var(--card)"/><path d="M12 63h44" stroke="var(--mut)"/><path d="M104 35l-12 20h24z" fill="var(--card)"/><circle cx="96" cy="60" r="5" fill="var(--card)"/><circle cx="112" cy="60" r="5" fill="var(--card)"/><path d="M86 67h40" stroke="var(--mut)"/><circle cx="34" cy="32" r="4.5" fill="var(--bg)"/></svg>',
 slides});
})();
