/* STRUXA — lesson "Failure Modes": diagrams, animated 3D scenes and slide text.
   Photos: each slide tries a local file (e.g. fm-bending.jpg, put next to index.html) and then a Wikimedia Commons link. */
(function(){
'use strict';
if(!window.STX)return;
const G=STX.g3,P=G.PAL,S=STX.scenes;

/* ============================================================ small SVG helpers */
const RX='#177a3c',LD='#D62828',BL='#2f6fd0';
const svg=inner=>`<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--fg)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" font-family="Inter,system-ui,sans-serif" font-size="12.5" role="img">${inner}</svg>`;
const tx=(x,y,t,c='var(--fg)',a='start',w=600,sz)=>`<text x="${x}" y="${y}" fill="${c}" stroke="none" text-anchor="${a}" font-weight="${w}"${sz?` font-size="${sz}"`:''}>${t}</text>`;
const arr=(x1,y1,x2,y2,c=RX,w=2.8)=>{const a=Math.atan2(y2-y1,x2-x1),h=d=>[(x2-10*Math.cos(a+d)).toFixed(1),(y2-10*Math.sin(a+d)).toFixed(1)],p=h(.42),q=h(-.42);return`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}"/><path d="M${x2} ${y2}L${p[0]} ${p[1]}L${q[0]} ${q[1]}Z" fill="${c}" stroke="${c}" stroke-width="1"/>`};
const ttl=t=>tx(14,22,t,'var(--mut)');
const sub=(x,y,t,n=44)=>{const w=t.split(' '),ls=[];let c='';w.forEach(k=>{if((c+' '+k).trim().length>n){ls.push(c);c=k}else c=(c+' '+k).trim()});ls.push(c);return ls.map((l,k)=>tx(x,y+k*16,l,'var(--mut)','start',500,12)).join('')};
const axes=(x,y,w,h,xl,yl)=>`<path d="M${x} ${y-h}V${y}H${x+w}" stroke-width="2"/>${arr(x,y-h-2,x,y-h-4,'var(--fg)',1.6)}${tx(x+w,y+16,xl,'var(--mut)','end',600,12)}${tx(x-6,y-h-8,yl,'var(--mut)','start',600,12)}`;
const crack=(pts,c=LD,w=2.4)=>`<path d="M${pts.map(p=>p.join(' ')).join('L')}" stroke="${c}" stroke-width="${w}"/>`;
const hatch=(x,y,w)=>{let s=`<path d="M${x} ${y}h${w}" stroke-width="2.6"/>`;for(let i=6;i<=w;i+=9)s+=`<path d="M${x+i} ${y}l-7 8" stroke="var(--mut)" stroke-width="1.4"/>`;return s};
const tri=(x,y)=>`<path d="M${x} ${y}l-13 22h26z" fill="var(--bg)"/>`;
const CONC='#c9c2b6',STEEL='#9aa6b8';

/* ============================================================ diagrams (first tab) */
const DG={};
DG.intro=svg(`${ttl('Load–deflection behaviour')}${axes(50,210,400,170,'deflection','load')}
 <path d="M50 210L120 100Q135 82 160 80L300 78Q360 74 392 118L410 160" stroke="${RX}" stroke-width="3.2"/><path d="M50 210L150 64" stroke="${LD}" stroke-width="3.2"/><path d="M150 64L170 124" stroke="${LD}" stroke-width="3.2" stroke-dasharray="3 5"/>
 ${tx(420,176,'✕',RX,'middle',700,20)}${tx(150,52,'✕',LD,'middle',700,20)}${tx(300,62,'ductile: large deflection warns first',RX,'middle',700,12.5)}${tx(176,150,'brittle: sudden, no warning',LD,'start',700,12.5)}${sub(60,238,'Design so that the ductile mode governs.',70)}`);
DG.tension=svg(`${ttl('Stress–strain curve of structural steel')}${axes(50,210,400,170,'strain ε','stress σ')}
 <path d="M50 210L112 96L160 92L215 90Q300 70 340 66Q372 66 398 100L418 140" stroke="${P.beam}" stroke-width="3.2"/>${tx(425,148,'✕',LD,'middle',700,20)}
 ${tx(118,86,'fy',RX)}${tx(318,56,'fu',RX)}${tx(104,176,'elastic',BL,'middle')}${tx(190,112,'yield',BL,'middle')}${tx(290,98,'strain hardening',BL,'middle')}${tx(400,176,'necking → rupture',LD,'end')}${sub(60,238,'N_y = A·fy (yield)  |  N_u = A_e·fu (rupture)',70)}`);
DG.compress=svg(`${ttl('Crushing of a short compressed member')}<rect x="150" y="60" width="90" height="130" fill="${CONC}" stroke="var(--fg)"/><path d="M150 60L195 125L150 190M240 60L195 125L240 190" stroke="${LD}" stroke-width="2.6"/><path d="M180 70v34M210 70v34M180 150v34M210 150v34" stroke="${LD}" stroke-width="1.8"/>
 ${arr(195,28,195,58,LD,3.4)}${tx(205,40,'N',LD)}${arr(195,222,195,192,RX,3.4)}${tx(205,226,'N',RX)}${tx(270,102,'cone / shear failure',LD)}${tx(270,120,'and vertical splitting',LD)}
 ${sub(270,152,'Short columns fail by crushing of the material before they can buckle.',32)}${sub(14,246,'N_u = 0.85 f′c (Ag − As) + fy As',60)}`);
DG.bending=svg(`${ttl('Bending: stresses over the depth')}<rect x="50" y="50" width="56" height="150" fill="${CONC}" stroke="var(--fg)"/><circle cx="64" cy="186" r="4.5" fill="var(--fg)"/><circle cx="92" cy="186" r="4.5" fill="var(--fg)"/><path d="M40 120H116" stroke="${BL}" stroke-dasharray="5 4"/>${tx(40,114,'N.A.',BL,'end',600,11)}
 <path d="M160 50V120H210Z" fill="color-mix(in srgb,${LD} 25%,transparent)" stroke="${LD}"/><path d="M160 120V186H190Z" fill="color-mix(in srgb,${BL} 25%,transparent)" stroke="${BL}"/>${tx(220,86,'compression C (top)',LD)}${tx(200,168,'tension T (bottom)',BL)}
 <path d="M300 96H450" stroke="var(--ac)" stroke-width="9" stroke-linecap="butt"/>${hatch(300,112,0)}${tri(310,106)}${tri(440,106)}${crack([[340,100],[338,134]],LD)}${crack([[372,100],[372,138]],LD)}${crack([[404,100],[406,134]],LD)}${tx(375,160,'cracks start at the tension face',LD,'middle',600,11.5)}
 ${sub(14,228,'σ = M·y / I  |  M_p = Z·fy  |  M_n = As·fy (d − a/2)',70)}`);
DG.shear=svg(`${ttl('Shear: diagonal cracks near the supports')}<rect x="40" y="62" width="400" height="64" fill="${CONC}" stroke="var(--fg)"/>${tri(60,126)}${tri(420,126)}
 ${crack([[62,126],[100,96],[150,64]])}${crack([[90,126],[130,98],[172,64]])}${crack([[418,126],[380,96],[330,64]])}${crack([[390,126],[350,98],[308,64]])}
 <path d="M80 66v56M120 66v56M160 66v56M200 66v56M240 66v56M280 66v56M320 66v56M360 66v56M400 66v56" stroke="var(--mut)" stroke-width="1.2"/>${arr(240,26,240,60,LD,3.4)}${tx(250,40,'P',LD)}
 <path d="M40 188H440" stroke-width="1.4"/><path d="M40 188V150L240 150L240 226L440 226V188" fill="color-mix(in srgb,var(--ac) 20%,transparent)" stroke="var(--ac)"/>${tx(60,176,'+V',RX)}${tx(380,216,'−V',RX)}
 ${sub(14,244,'Cracks run at ≈ 45°.  V_n = V_c + V_s,  V_s = A_v fy d / s',70)}`);
DG.torsion=svg(`${ttl('Torsion: shear flow and spiral cracks')}<path d="M60 90L210 90L260 60L110 60Z" fill="${CONC}" stroke="var(--fg)"/><path d="M60 90V150L210 150V90M210 150L260 120V60" fill="${CONC}" stroke="var(--fg)"/>
 ${crack([[70,90],[110,60]])}${crack([[110,90],[150,60]])}${crack([[150,90],[190,60]])}${crack([[210,98],[210,140]],LD,2)}${crack([[225,70],[250,110]])}
 <path d="M280 105a24 24 0 1 1 8 30" stroke="${RX}" stroke-width="3"/>${arr(292,132,284,138,RX,3)}${tx(298,98,'T',RX)}
 <rect x="352" y="70" width="64" height="64" fill="${CONC}" stroke="var(--fg)"/>${arr(348,84,348,118,BL)}${arr(420,120,420,86,BL)}${arr(364,66,404,66,BL)}${arr(404,138,364,138,BL)}${tx(384,160,'pure shear',BL,'middle')}${arr(396,78,370,104,LD,2.4)}${tx(384,184,'principal tension at 45°',LD,'middle',600,11.5)}
 ${sub(14,226,'Circular shaft: τ = T·r / J.   Concrete cracks along the 45° principal tension.',70)}`);
DG.buckling=svg(`${ttl('Euler column buckling')}${axes(250,200,200,150,'sideways deflection δ','load P')}<path d="M250 200V70" stroke="${BL}" stroke-width="3.2"/><path d="M250 70Q330 66 440 60" stroke="${LD}" stroke-width="3.2"/>${tx(256,60,'P_cr',LD)}${tx(256,150,'straight',BL)}${tx(350,54,'buckled',LD,'middle')}
 ${[[60,'pinned–pinned','K = 1.0'],[130,'fixed–fixed','K = 0.5'],[200,'fixed–free','K = 2.0']].map(([x,a,k])=>`<path d="M${x} 56V190" stroke="var(--ac)" stroke-width="5" stroke-linecap="butt"/><path d="M${x-12} 190h24" stroke-width="2"/>${tx(x,208,a,'var(--mut)','middle',600,10.5)}${tx(x,222,k,'var(--fg)','middle',700,11)}`).join('')}
 ${sub(14,246,'P_cr = π² E I / (K L)²',60)}`);
DG.ltb=svg(`${ttl('Lateral-torsional buckling: cross-section')}<g opacity=".45" stroke-dasharray="4 4"><rect x="100" y="60" width="90" height="12"/><rect x="100" y="150" width="90" height="12"/><rect x="141" y="72" width="8" height="78"/></g>
 <g transform="translate(64 0) rotate(9 190 111)" stroke="var(--fg)" fill="${STEEL}"><rect x="140" y="60" width="100" height="12"/><rect x="140" y="150" width="100" height="12"/><rect x="186" y="72" width="8" height="78"/></g>
 ${arr(200,40,250,40,LD)}${tx(256,44,'lateral displacement',LD)}${arr(330,150,350,170,BL)}${tx(356,174,'twist',BL)}${tx(300,100,'compression flange',LD,'start',600,11.5)}
 <path d="M330 70h90" stroke="var(--mut)" stroke-width="1"/><path d="M300 190l0 0" stroke="none"/>${sub(14,200,'The compression flange behaves like a column and buckles sideways; the section twists.',48)}${sub(14,240,'Restrain the compression flange to prevent it.',60)}`);
DG.local=svg(`${ttl('Local (plate) buckling of a flange')}<path d="M60 120Q95 70 130 120T200 120T270 120T340 120" stroke="${LD}" stroke-width="3.4"/><path d="M60 120H340" stroke-dasharray="5 5" stroke-width="1.4"/>${arr(30,120,56,120,LD,3)}${arr(370,120,344,120,LD,3)}${tx(30,110,'σ',LD,'middle')}
 <g transform="translate(380 70)"><rect x="-26" y="0" width="64" height="9" fill="${STEEL}"/><rect x="2" y="9" width="8" height="60" fill="${STEEL}"/><rect x="-26" y="69" width="64" height="9" fill="${STEEL}"/></g>${tx(412,170,'outstand',BL,'middle')}
 ${sub(14,200,'σ_cr = k·π²·E / [12(1 − ν²)] · (t / b)²',70)}${sub(14,224,'Slender plates (large b/t) buckle in waves long before the steel yields.',60)}`);
DG.punching=svg(`${ttl('Punching shear at a column')}<rect x="40" y="86" width="400" height="44" fill="${CONC}" stroke="var(--fg)"/><rect x="214" y="130" width="52" height="86" fill="${STEEL}" stroke="var(--fg)"/>${crack([[214,130],[160,86]])}${crack([[266,130],[320,86]])}
 ${arr(240,40,240,84,LD,3.4)}${tx(250,56,'load',LD)}${tx(160,76,'crack',LD,'middle',600,11)}<path d="M190 74v-16M290 74v-16" stroke="var(--mut)" stroke-dasharray="3 3"/>${tx(240,152,'column',STEEL,'middle',700,11)}
 <g transform="translate(60 150)"><rect x="40" y="10" width="30" height="30" fill="${STEEL}" stroke="var(--fg)"/><rect x="26" y="-4" width="58" height="58" rx="10" stroke="${BL}" stroke-dasharray="5 4"/>${tx(56,72,'critical perimeter b₀',BL,'middle',600,11)}</g>
 ${sub(310,178,'V_c ≈ 0.33 √f′c · b₀ · d (MPa, mm)',24)}${sub(14,246,'The slab slides off the column along a cone, with almost no warning.',70)}`);
DG.fatigue=svg(`${ttl('Fatigue: S–N curve and fracture surface')}${axes(50,200,230,150,'cycles N (log)','stress range S')}<path d="M60 70Q120 100 180 140Q230 160 276 160" stroke="${P.beam}" stroke-width="3.2"/><path d="M180 160H276" stroke-dasharray="4 4" stroke="${BL}"/>${tx(272,150,'endurance limit',BL,'end',600,11)}
 <g transform="translate(360 120)"><path d="M-70 40Q0 -70 70 40Z" fill="${STEEL}" stroke="var(--fg)"/><path d="M-50 36Q0 -34 50 36M-34 34Q0 -14 34 34M-20 32Q0 6 20 32" stroke="var(--mut)" stroke-width="1.4"/><path d="M-6 38l6 -12 6 12" fill="${LD}" stroke="${LD}"/></g>${tx(360,176,'beach marks',BL,'middle')}${tx(360,192,'start at a notch',BL,'middle',500,11)}
 ${sub(14,236,'da/dN = C·(ΔK)^m   with   ΔK = Y·Δσ·√(π a)',70)}`);
DG.plastic=svg(`${ttl('Plastic hinges and collapse mechanism')}<path d="M50 80H430" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/><path d="M50 60v40M430 60v40" stroke-width="3"/>${[100,150,200,250,300,350,400].map(x=>arr(x,36,x,70,LD,2)).join('')}${tx(240,28,'w',LD,'middle')}
 <path d="M50 150H430" stroke-width="1.2"/><path d="M50 150V190Q240 100 430 190V150" fill="color-mix(in srgb,var(--ac) 18%,transparent)" stroke="var(--ac)"/>${tx(240,138,'+M_p',RX,'middle')}${tx(66,180,'−M_p',RX)}${tx(380,180,'−M_p',RX)}
 ${[50,240,430].map(x=>`<circle cx="${x}" cy="80" r="7" fill="#f2c230" stroke="var(--fg)"/>`).join('')}
 <path d="M50 204L240 230L430 204" stroke="${LD}" stroke-width="3"/>${[50,240,430].map((x,i)=>`<circle cx="${x}" cy="${i==1?230:204}" r="5.5" fill="#f2c230" stroke="var(--fg)"/>`).join('')}${tx(240,196,'mechanism',LD,'middle')}
 ${tx(14,246,'w_c = 16 M_p / L²  (fixed–fixed)',RX,'start',700,12.5)}`);
DG.conn=svg(`${ttl('Bolted connection failure modes')}<g transform="translate(30 50)"><rect x="0" y="20" width="110" height="22" fill="${STEEL}" stroke="var(--fg)"/><rect x="70" y="42" width="110" height="22" fill="${STEEL}" stroke="var(--fg)"/><rect x="108" y="10" width="14" height="64" fill="${CONC}" stroke="var(--fg)"/>${arr(4,31,-24,31,LD,3)}${arr(176,53,204,53,LD,3)}${crack([[100,42],[130,42]],LD,3)}${tx(100,100,'bolt shears',LD,'middle')}${tx(100,116,'in single shear',LD,'middle',500,11)}</g>
 <g transform="translate(300 50)"><rect x="0" y="10" width="150" height="50" fill="${STEEL}" stroke="var(--fg)"/><ellipse cx="22" cy="35" rx="10" ry="8" fill="var(--bg)"/>${crack([[22,43],[22,60]],LD,3)}${crack([[22,27],[22,10]],LD,3)}${arr(150,35,170,35,LD,3)}${tx(80,86,'plate tears out / bearing',LD,'middle')}${tx(80,102,'at the bolt hole',LD,'middle',500,11)}</g>
 ${sub(14,232,'Bolt shear: R = n_s·A_b·F_nv    Bearing: R ≈ 2.4·d·t·F_u',70)}`);

/* ============================================================ animated 3D scenes */
const sm=x=>x<=0?0:x>=1?1:x*x*(3-2*x);
const cyc=(t,T)=>{const u=(t%T)/T;return{u,load:Math.min(1,u/.68),post:sm((u-.68)/.22),fail:u>=.68}};
const hud=(...l)=>l;
const slab0=(x0,x1,y=-.1)=>G.box([(x0+x1)/2,y,0],[x1-x0,.4,2.6],P.conc);
const RXC=P.ok,LDC=P.load,DK='#3a4558';
const stg=(c,arr)=>{const i=c.fail?arr.length-1:Math.min(arr.length-2,Math.floor(c.load*(arr.length-1)));return arr[i]};

/* ---- 0. ductile vs brittle ---- */
S.fm_intro=t=>{const c=cyc(t,7.5),L=4.4,y0=1.4,sh=[...slab0(-3.4,3.4)];
 const sup=z=>[...G.prism([[-2.2,.1],[-1.7,.1],[-1.95,y0-.22]],z-.5,z+.5,DK),...G.prism([[2.2,.1],[1.7,.1],[1.95,y0-.22]],z-.5,z+.5,DK)];
 sh.push(...sup(-1.7),...sup(1.7));
 /* ductile steel beam */
 const lo=c.load,pl=sm((lo-.4)/.6),dd=.16*Math.min(1,lo/.4)+1.15*pl,kk=2-pl,st=[];
 for(let i=0;i<=22;i++){const x=-L/2+L*i/22;st.push([x,y0-dd*(1-Math.pow(Math.abs(2*x/L),kk))])}
 sh.push(...G.xf(G.ext(st,.38,1.0,P.beam),G.mv(0,0,-1.7)));
 /* brittle beam */
 if(!c.fail){const d=.13*lo,s2=[];for(let i=0;i<=22;i++){const x=-L/2+L*i/22;s2.push([x,y0-d*(1-Math.pow(2*x/L,2))])}sh.push(...G.xf(G.ext(s2,.38,1.0,'#7a8aa3'),G.mv(0,0,1.7)));
  if(lo>.8)sh.push(G.line([[0,y0-d+.19,2.21],[0,y0-d-.19,2.21]],LDC,3))}
 else{const th=.95*c.post;for(const sg of[-1,1]){const a=[sg*L/2,y0],b=[sg*(L/2-(L/2)*Math.cos(th)),y0-(L/2)*Math.sin(th)];sh.push(...G.xf(G.bar(a,b,.38,1.0,'#7a8aa3'),G.mv(0,0,1.7)))}}
 const pa=lo*1.3+.3;sh.push(...G.arrow([0,y0+.5+pa-dd,-1.7],[0,y0+.22-dd,-1.7],LDC));if(!c.fail)sh.push(...G.arrow([0,y0+.5+pa,1.7],[0,y0+.22-.13*lo,1.7],LDC));
 sh.push(G.label([-2.5,y0+.9,-1.7],'DUCTILE (steel)',RXC,{size:13,align:'start'}),G.label([-2.5,y0+.9,1.7],'BRITTLE',LDC,{size:13,align:'start'}));
 return{shapes:sh,center:[0,1.4,0],span:10,hud:hud([c.fail?'Brittle beam: snaps suddenly. The steel beam bent a lot first.':'Same load on both beams ...',null],[c.fail?'':'Ductile beam sags visibly = warning',c.fail?null:RXC])}};

/* ---- 1. tension ---- */
S.fm_tension=t=>{const c=cyc(t,8),lo=c.load,r0=.36,yb=.7,e=.55*sm(lo*1.0),yt=3.3+e,yc=(yb+yt)/2+.15,nk=sm((lo-.5)/.5),sh=[];
 const prof=y=>r0*(1-.07*sm(lo))*(1-.62*nk*Math.exp(-Math.pow((y-yc)/.34,2)));
 sh.push(...G.box([0,.25,0],[1.7,.5,1.7],DK));
 if(!c.fail){sh.push(...G.lathe([0,0,0],prof,yb,yt,P.steel),...G.box([0,yt+.25,0],[1.7,.5,1.7],DK));
  const f=.6+lo*1.1;sh.push(...G.arrow([1.3,yt+.9,.0],[1.3,yt+.9+f,0],LDC),...G.arrow([1.3,.5,0],[1.3,.5-f*.7,0],LDC),G.label([1.8,yt+1.2,0],'N',LDC))}
 else{const g=.7*c.post;sh.push(...G.lathe([0,0,0],prof,yb,yc-.02,P.steel),...G.lathe([0,g,0],y=>prof(y-g),yc+.02+g,yt+g,P.steel),...G.box([0,yt+.25+g,0],[1.7,.5,1.7],DK));
  }
 sh.push(G.label([-1.55,yc,0],stg(c,['elastic','yielding','necking','rupture']),'fg',{size:13,align:'end'}));
 return{shapes:sh,center:[0,2.5,0],span:10.5,hud:hud([stg(c,['1. Elastic stretching','2. Yielding','3. Necking: the bar thins locally','4. Rupture']),RXC],['Ductile: lots of warning',null])}};

/* ---- 2. compression crushing ---- */
S.fm_compress=t=>{const c=cyc(t,8),lo=c.load,y0=.6,H0=2.5,s=.14*sm(lo)+.22*c.post,H=H0-s,bg=.12*sm((lo-.55)/.45)+.06*c.post,r=.62,sh=[];
 const prof=y=>r*(1+bg*Math.sin(Math.PI*(y-y0)/H));
 sh.push(...G.box([0,.25,0],[2.4,.5,2.4],DK),...G.lathe([0,0,0],prof,y0,y0+H,P.conc),...G.box([0,y0+H+.25,0],[2.4,.5,2.4],DK));
 const nc=7,f=sm((lo-.5)/.5);
 for(let k=0;k<nc;k++){const a=2*Math.PI*k/nc+.3,pts=[];const ln=(H*.75)*f*(.6+.4*((k*37)%5)/4);for(let i=0;i<=8;i++){const y=y0+H-ln*i/8,rr=prof(y)+.01,aa=a+.06*Math.sin(i*1.7+k);pts.push([rr*Math.cos(aa),y,rr*Math.sin(aa)])}if(f>0)sh.push(G.line(pts,LDC,2.6))}
 if(c.fail){for(let k=0;k<6;k++){const a=2*Math.PI*k/6+.5,q=c.post,d=prof(y0+H*.5)+.08+q*.8;sh.push(...G.box([d*Math.cos(a),y0+H*(.3+.12*k%.5)-q*q*.9,d*Math.sin(a)],[.22,.22,.22],'#b0a99b'))}}
 if(!c.fail){const fa=.6+lo*1.1;sh.push(...G.arrow([1.5,y0+H+1.4+fa*0,1.2],[1.5,y0+H+.55,1.2],LDC),...G.arrow([1.5,-.8,1.2],[1.5,.0,1.2],RXC),G.label([1.95,y0+H+1.0,1.2],'N',LDC))}
 return{shapes:sh,center:[0,1.9,0],span:8.5,hud:hud([c.fail?'Crushing: cracks open and the concrete spalls off':lo>.5?'Vertical splitting cracks appear':'Short member: it is squashed, not buckled',lo>.5||c.fail?LDC:null])}};

/* ---- 3. bending ---- */
S.fm_bending=t=>{const c=cyc(t,8),lo=c.load,L=6,y0=1.5,d=.85*Math.pow(lo,1.3)+.22*c.post,sh=[...slab0(-4,4)];
 sh.push(...G.prism([[-3,.1],[-2.5,.1],[-2.75,y0-.4]],-.5,.5,DK),...G.prism([[3,.1],[2.5,.1],[2.75,y0-.4]],-.5,.5,DK));
 const yy=x=>y0-d*(1-Math.pow(2*x/L,2)),st=[];for(let i=0;i<=26;i++){const x=-L/2+L*i/26;st.push([x,yy(x)])}
 sh.push(...G.ext(st,.62,.82,P.conc));
 const xs=[-1.8,-1.2,-.6,0,.6,1.2,1.8];xs.forEach((x,i)=>{const thr=.12+.08*Math.abs(i-3),h=.56*sm((lo-thr)/.45)*(1-.1*Math.abs(i-3));if(h>.01){const yb=yy(x)-.31,lean=.14*Math.sign(x)*-1*(Math.abs(i-3)>0?1:0);sh.push(G.line([[x,yb,.42],[x+lean*h*2,yb+h,.42]],LDC,3.8,{front:1}))}});
 if(lo>.78||c.fail){const k=sm((lo-.78)/.22),p=yy(0)+.32;sh.push(...G.box([0,p-.05,0],[1.0*k+.01,.14,.84],'#555'));if(c.fail)for(let j=0;j<5;j++)sh.push(...G.box([-.4+.2*j+.25*c.post*(j-2),p+.1+.35*c.post*(1-c.post)*3-c.post*.3,.5*Math.sin(j)],[.12,.1,.1],'#9b9488'))}
 sh.push(...G.arrow([0,yy(0)+1.9,0],[0,yy(0)+.42,0],LDC),G.label([.45,yy(0)+1.5,0],'P',LDC));
 sh.push(G.label([-1.1,yy(0)+.65,.8],'compression',LDC,{size:12}),G.label([1.3,yy(0)-.85,.8],'tension: cracks',LDC,{size:12}));
 return{shapes:sh,center:[0,1.4,0],span:10.5,hud:hud([c.fail?'Concrete crushes at the top: the beam collapses':lo>.4?'Tension cracks grow upward from the bottom':'Elastic: no cracks yet',lo>.4?LDC:null])}};

/* ---- 4. shear ---- */
S.fm_shear=t=>{const c=cyc(t,8),lo=c.load,y0=1.5,hh=.9,sh=[...slab0(-3.4,3.4)];
 sh.push(...G.prism([[-2.1,.1],[-1.6,.1],[-1.85,y0-.55]],-.5,.5,DK),...G.prism([[2.1,.1],[1.6,.1],[1.85,y0-.55]],-.5,.5,DK));
 const yb=y0-hh/2,yt=y0+hh/2,A=[[-2,yb],[-1.55,yb],[-.1,yt],[-2,yt]],Bp=[[-1.55,yb],[2,yb],[2,yt],[-.1,yt]];
 const th=-.12*c.post,tf=p=>{const q=G.rotZ(th,[-2,yb])(p);return[q[0]-.13*c.post,q[1]-.3*c.post,q[2]]};
 sh.push(...G.xf(G.prism(A,-.4,.4,'#ddd7cb'),tf),...G.prism(Bp,-.4,.4,'#ddd7cb'));
 for(let i=0;i<12;i++){const x=-1.8+i*.33;sh.push(G.line([[x,yb+.06,.41],[x,yt-.06,.41]],'#444',1.4,{op:.7}))}
 const f=sm((lo-.35)/.5);
 [[-1.55,-.1],[-1.25,.25]].forEach(([x0,x1])=>{if(f>0){const a=[x0,yb,.42],b=[x0+(x1-x0)*f,yb+hh*f,.42];sh.push(G.line([a,[(a[0]+b[0])/2+.04,(a[1]+b[1])/2,.42],b],LDC,4,{front:1}))}});
 if(f>0)[[1.7],[1.4]].forEach(([x0])=>{sh.push(G.line([[x0,yb,.42],[x0-1.4*f,yb+hh*f,.42]],LDC,3.6,{front:1}))});
 sh.push(...G.arrow([0,yt+1.9,0],[0,yt+.15,0],LDC),G.label([.45,yt+1.5,0],'P',LDC),G.label([-1.7,y0+1.25,.5],'diagonal crack',LDC,{size:12}),G.label([1.55,yb-.55,.5],'stirrups','fg',{size:12}));
 return{shapes:sh,center:[0,1.5,0],span:9.5,hud:hud([c.fail?'The end block slides off along the diagonal crack':lo>.35?'Diagonal tension cracks run toward the load':'Short deep beam: high shear near the supports',lo>.35?LDC:null])}};

/* ---- 5. torsion ---- */
S.fm_torsion=t=>{const c=cyc(t,8),lo=c.load,Lb=5,y0=1.8,thm=.95*Math.pow(lo,1.1)+.3*c.post,tw=x=>thm*(x/Lb),sh=[];
 sh.push(...G.box([-.7,y0,0],[1.4,2.4,2.4],P.conc,{op:.9}),...slab0(-2,4));
 const st=Array.from({length:26},(_,i)=>({x:Lb*i/25,y:y0,z:0,tw:tw(Lb*i/25)}));sh.push(...G.sweep([-.4,.4,-.5,.5],st,P.conc));
 for(let i=0;i<26;i+=3){const x=Lb*i/25,a=tw(x),cs=Math.cos(a),sn=Math.sin(a),q=[[.4,-.5],[.4,.5],[-.4,.5],[-.4,-.5],[.4,-.5]].map(([yy,zz])=>[x,y0+yy*cs-zz*sn,yy*sn+zz*cs]);sh.push(G.line(q,'#5a5448',1.6,{front:1}))}
 for(const [yy,zz] of[[.4,-.5],[.4,.5],[-.4,.5],[-.4,-.5]])sh.push(G.line(Array.from({length:26},(_,i)=>{const x=Lb*i/25,a=tw(x);return[x,y0+yy*Math.cos(a)-zz*Math.sin(a),yy*Math.sin(a)+zz*Math.cos(a)]}),'#5a5448',1.8,{front:1}));
 const Pt=(x,yy,zz)=>{const a=tw(x),cs=Math.cos(a),sn=Math.sin(a);return[x,y0+yy*cs-zz*sn,yy*sn+zz*cs]};
 const seg=[[1.0,.4,-.5,2.0,.4,.5],[2.0,.4,.5,2.8,-.4,.5],[2.8,-.4,.5,3.8,-.4,-.5],[3.8,-.4,-.5,4.6,.4,-.5]],pts=[];
 seg.forEach(s=>{for(let i=0;i<=8;i++){const u=i/8;pts.push(Pt(s[0]+(s[3]-s[0])*u,s[1]+(s[4]-s[1])*u+(s[4]==s[1]?0:0),s[2]+(s[5]-s[2])*u))}});
 const n=Math.floor(pts.length*sm((lo-.45)/.45));if(n>1)sh.push(G.line(pts.slice(0,n),LDC,4.2,{front:1}));
 const ring=G.ring([Lb+.4,y0,0],.95,.4,5.2,'yz',RXC,3.6);sh.push(ring);const q=ring.pts,a=q[27],b=q[29];sh.push(...G.arrow(a,[b[0],b[1]+(b[1]-a[1])*.9,b[2]+(b[2]-a[2])*.9],RXC,3),G.label([Lb+.4,y0+1.5,0],'T',RXC,{size:15}));
 sh.push(G.label([2.3,y0+1.2,0],'spiral cracks at 45°',LDC,{size:12}));
 return{shapes:sh,center:[1.8,1.8,0],span:10.5,hud:hud([c.fail?'The member twists apart':lo>.45?'Cracks spiral around the member at 45°':'The section twists as the torque increases',lo>.45?LDC:null])}};

/* ---- 6. Euler buckling ---- */
S.fm_buckling=t=>{const c=cyc(t,8.5),u=c.u,y0=.55,L=4.4,ratio=Math.min(1,u/.42)*.98+(u>.42?.02+.03*sm((u-.42)/.4):0),dl=.012+1.25*sm((u-.42)/.4),dy=.4*Math.pow(dl/1.25,2),sh=[...slab0(-2.5,2.5)];
 const Lh=L-dy,st=Array.from({length:26},(_,i)=>{const s=i/25;return[dl*Math.sin(Math.PI*s),y0+Lh*s]});
 sh.push(...G.cyl([0,y0,0],.2,1.3,P.pin),...G.prism([[-.55,.1],[.55,.1],[0,y0-.2]],-.55,.55,DK),...G.ext(st,.24,.8,P.beam),...G.cyl([0,y0+Lh,0],.2,1.3,P.pin),...G.box([0,y0+Lh+.35,0],[1.7,.28,1.5],DK));
 sh.push(G.line([[0,y0,.6],[0,y0+L,.6]],'fg',1.3,{dash:[5,4],op:.5}));
 const f=.8+1.1*ratio;sh.push(...G.arrow([0,y0+Lh+.45+f,0],[0,y0+Lh+.5,0],LDC),G.label([.5,y0+Lh+1.2,0],'P',LDC,{size:14}));
 sh.push(G.label([-1.6,y0+L*.5,0],'P / Pcr = '+Math.min(1.0,ratio).toFixed(2),ratio>=.99?LDC:'fg',{size:14,align:'end'}));
 return{shapes:sh,center:[0,3.2,0],span:11.5,hud:hud([u<.42?'Below P_cr the column stays straight':'At P_cr it suddenly bows sideways',u<.42?RXC:LDC],['Stress is still far below yield',null])}};

/* ---- 7. lateral-torsional buckling ---- */
S.fm_ltb=t=>{const c=cyc(t,8.5),lo=c.load,Lb=6,y0=1.7,A=.04+1.0*sm((lo-.5)/.45)+.2*c.post,B=.02+.62*sm((lo-.5)/.45)+.15*c.post,vd=.28*lo,sh=[...slab0(-4,4)];
 const st=Array.from({length:27},(_,i)=>{const x=-Lb/2+Lb*i/26,sn=Math.cos(Math.PI*x/Lb);return{x,y:y0-vd*sn,z:A*sn,tw:B*sn}});
 sh.push(...G.sweep([.42,.54,-.5,.5],st,P.beam),...G.sweep([-.54,-.42,-.5,.5],st,'#c6651a'),...G.sweep([-.42,.42,-.05,.05],st,P.steel));
 for(const sg of[-1,1])sh.push(...G.box([sg*3.25,y0-.1,0],[.3,1.5,1.4],DK),...G.box([sg*3.25,.2,0],[1.2,.4,2.2],DK));
 const m=st[13],mm=Math.cos(0);sh.push(...G.arrow([m.x+0,y0-vd+1.9,m.z],[m.x,y0-vd+.7,m.z],LDC),G.label([.55,y0-vd+1.5,m.z],'P',LDC,{size:14}));
 sh.push(G.line([[-3,y0+.5,0],[3,y0+.5,0]],'fg',1.2,{dash:[5,4],op:.45}),G.label([-1.5,y0+1.35,A*.5],'compression flange',LDC,{size:12}));
 return{shapes:sh,center:[0,1.6,0],span:10.5,hud:hud([lo>.55||c.fail?'Compression flange buckles sideways and the section twists':'Beam bends in its strong direction, as designed',lo>.55||c.fail?LDC:RXC],['Remedy: brace the compression flange',null])}};

/* ---- 8. local plate buckling ---- */
S.fm_local=t=>{const c=cyc(t,8),lo=c.load,a=4.2,b=1.5,m=3,A=.03+.42*sm((lo-.5)/.45)+.12*c.post,y0=1.5,sh=[];
 const w=(u,v)=>A*Math.sin(m*Math.PI*u)*Math.sin(Math.PI*v),Pn=(u,v,o)=>[-a/2+u*a,y0+w(u,v)+o,-b/2+v*b];
 sh.push(...G.surf(30,10,(u,v)=>Pn(u,v,0),P.beam),...G.surf(30,10,(u,v)=>Pn(u,v,-.07),'#c6651a'));
 sh.push(G.line(Array.from({length:30},(_,i)=>Pn(i/29,0,0)),'fg',1.6),G.line(Array.from({length:30},(_,i)=>Pn(i/29,1,0)),'fg',1.6),G.line([Pn(0,0,0),Pn(0,1,0)],'fg',1.6),G.line([Pn(1,0,0),Pn(1,1,0)],'fg',1.6));
 const f=.6+1.0*Math.min(1,lo*1.2);for(let k=0;k<4;k++){const z=-b/2+b*(k+.5)/4;sh.push(...G.arrow([-a/2-f-.3,y0,z],[-a/2-.15,y0,z],LDC),...G.arrow([a/2+f+.3,y0,z],[a/2+.15,y0,z],LDC))}
 sh.push(G.label([0,y0+1.2,0],'σ',LDC,{size:16}),G.label([0,y0-.9,0],lo>.5?'waves form before yield':'flat plate',lo>.5?LDC:'fg',{size:13}));
 return{shapes:sh,center:[0,1.5,0],span:9,view:{pitch:.62,yaw:-.35},hud:hud([lo>.5?'The thin plate buckles into waves':'A slender plate carries compression',lo>.5?LDC:null],['Wave length ≈ plate width b',null])}};

/* ---- 9. punching shear ---- */
S.fm_punch=t=>{const c=cyc(t,8),lo=c.load,y0=1.5,tt=.62,hb=.62,ht=1.65,dl=.6*sm((lo-.6)/.4),sh=[...slab0(-4,4,-.1)];
 sh.push(...G.box([0,.75,0],[1.3,1.5,2.4],DK),...G.xf(G.prism([[-hb,y0],[hb,y0],[ht,y0+tt],[-ht,y0+tt]],-1.2,1.2,P.conc),G.mv(0,0,0)));
 const L=[[-3.6,y0],[-hb,y0],[-ht,y0+tt],[-3.6,y0+tt]],R=[[hb,y0],[3.6,y0],[3.6,y0+tt],[ht,y0+tt]],mvd=G.mv(0,-dl,0);
 sh.push(...G.xf(G.prism(L,-1.2,1.2,P.conc),mvd),...G.xf(G.prism(R,-1.2,1.2,P.conc),mvd));
 const f=sm((lo-.35)/.45);if(f>0){sh.push(G.line([[-hb,y0-dl*0,1.21],[-hb-(ht-hb)*f,y0+tt*f-dl*0,1.21]],LDC,3.2),G.line([[hb,y0,1.21],[hb+(ht-hb)*f,y0+tt*f,1.21]],LDC,3.2));
  [-1,1].forEach(sg=>{const x=sg*(ht+.2);if(lo>.3)sh.push(G.line([[x,y0+tt-dl+.01,-1.2],[x,y0+tt-dl+.01,1.2]],LDC,2.2,{op:.8}))})}
 const fa=.5+lo*1.0;[-2.8,-1.9,1.9,2.8].forEach(x=>sh.push(...G.arrow([x,y0+tt+.5+fa-dl,0],[x,y0+tt+.1-dl,0],LDC)));
 sh.push(...G.arrow([0,-.9,1.5],[0,.1,1.5],RXC),G.label([.5,-.5,1.5],'R',RXC),G.label([0,y0+tt+2.3,0],'slab load',LDC,{size:12}),G.label([-3.0,y0-.55,1.2],'column','fg',{size:12}),G.label([-ht-.5,y0+tt+.4,1.2],'punching cone',LDC,{size:12}));
 return{shapes:sh,center:[0,1.5,0],span:10.5,hud:hud([c.fail?'The slab punches through: a cone of concrete stays on the column':lo>.35?'A diagonal crack runs around the column':'The slab loads the column through concentrated shear',lo>.35?LDC:null])}};

/* ---- 10. fatigue ---- */
S.fm_fatigue=t=>{const T=9,u=(t%T)/T,y0=1.9,Lb=4.4,tk=.44,x0=.5,fail=u>=.8,post=sm((u-.8)/.14),a=Math.min(.34,.03+.32*Math.pow(u/.8,3)),comp=1+3.5*a,dm=.3*comp*Math.sin(2*Math.PI*3*t),sh=[...slab0(-2.5,5.2)];
 sh.push(...G.box([-.7,y0,0],[1.4,2.6,2.2],P.conc));
 const shape=(xa,xb,n)=>Array.from({length:n+1},(_,i)=>{const x=xa+(xb-xa)*i/n,s=x/Lb;return[x,y0+dm*s*s*(3-s)/2]});
 if(!fail){sh.push(...G.ext(shape(0,Lb,28),tk,1.0,P.steel))}else{
  sh.push(...G.ext(shape(0,x0,3),tk,1.0,P.steel));
  const p0=[x0,y0],rt=G.rotZ(-1.2*post,[x0,y0-tk/2]),dn=-1.9*post*post-.2*post;
  sh.push(...G.xf(G.xf(G.ext(shape(x0,Lb,24).map(p=>[p[0],y0]),tk,1.0,P.steel),rt),G.mv(.3*post,dn,0)))}
 if(!fail||true){const dep=fail?.34:a,top=y0+tk/2;sh.push(...G.prism([[x0-.05,top],[x0+.05,top],[x0,top-dep]],.2,.52,'#2b0f0f'),G.line([[x0,top,.52],[x0,top-dep,.52]],LDC,2.4))}
 const N=Math.round(u*2.1e6/1000)*1000;sh.push(G.label([2.4,y0+1.3,0],'N = '+N.toLocaleString('en-US')+' cycles','fg',{size:13}),G.label([.5,y0+.95,0],'crack',LDC,{size:12}));
 if(!fail)sh.push(...G.arrow([Lb-.4,y0+.7,.0],[Lb-.4,y0+.3,0],LDC,2.6),...G.arrow([Lb-.4,y0-.7,0],[Lb-.4,y0-.3,0],LDC,2.6));
 return{shapes:sh,center:[1.6,1.8,0],span:10,hud:hud([fail?'Sudden fracture: the remaining section can no longer carry the load':'Each cycle grows the crack a little (load far below yield)',fail?LDC:null],[u<.8?'crack depth a = '+a.toFixed(2)+' m (exaggerated)':'',null])}};

/* ---- 11. plastic hinges and collapse mechanism ---- */
S.fm_plastic=t=>{const c=cyc(t,9),lo=c.load,L=6,y0=1.9,mech=sm((lo-.7)/.3)+0*c.post,pre=.16*Math.min(1,lo/.7),dm=mech*1.15+c.post*.2,sh=[...slab0(-4.4,4.4)];
 sh.push(...G.box([-3.5,y0-.5,0],[1.0,2.6,1.6],P.conc),...G.box([3.5,y0-.5,0],[1.0,2.6,1.6],P.conc));
 const ye=s=>16*Math.pow(s*(1-s),2),tri=s=>1-Math.abs(2*s-1),st=Array.from({length:27},(_,i)=>{const s=i/26,x=-L/2+L*s;return[x,y0-pre*ye(s)-(dm)*tri(s)]});
 sh.push(...G.ext(st,.44,.9,P.beam));
 const hing=[[-L/2,y0,1,'1'],[L/2,y0,1,'2'],[0,st[13][1],2,'3']];
 hing.forEach(([x,y,k,n])=>{const show=k==1?lo>.3:lo>.66;if(show)sh.push(...G.cyl([x,y,0],.3,1.15,'#f2c230',{mark:t*3}),G.label([x,y+.65,.6],n,'fg',{size:13}))});
 const w=Math.min(1,lo/.7);for(let i=0;i<7;i++){const x=-2.7+i*.9,yt=(i==3?st[13][1]:y0-(dm)*tri((x+3)/6)-pre*ye((x+3)/6))+.25;sh.push(...G.arrow([x,yt+.35+w*1.1,0],[x,yt,0],LDC,2.6))}
 sh.push(G.label([0,y0+2.5,0],'w',LDC,{size:15}));
 return{shapes:sh,center:[0,1.5,0],span:10.5,hud:hud([lo<.3?'Elastic: no hinges yet':lo<.66?'Hinges form at the supports':lo<.7&&!c.fail?'A third hinge forms at midspan':'Three hinges = collapse mechanism',lo>.3?LDC:null],['Failure load w_c = 16 M_p / L²',null])}};

/* ---- 12. connection (bolt shear) ---- */
S.fm_conn=t=>{const c=cyc(t,7.5),lo=c.load,s=.07*lo+.95*c.post,sh=[];
 sh.push(...G.box([-1.5-s,-.28,0],[4.4,.56,1.5],P.steel),...G.box([1.5+s,.28,0],[4.4,.56,1.5],'#7f8da3'));
 const bu=c.fail?s:.03*lo,bl=c.fail?-s:-.03*lo;
 sh.push(...G.cyl([bu,.29,0],.27,.58,P.pin,{axis:'y'}),...G.cyl([bl,-.29,0],.27,.58,'#d4a915',{axis:'y'}),...G.box([bu,.7,0],[.95,.24,.95],P.pin),...G.box([bl,-.7,0],[.95,.24,.95],'#d4a915'));
 sh.push(G.line([[-2.2,0,.76],[2.2,0,.76]],LDC,2.4,{dash:[6,4],front:1}),G.label([0,-1.35,.8],'shear plane',LDC,{size:13}));
 if(!c.fail){const f=.5+lo*1.2;sh.push(...G.arrow([3.7+s,.28,0],[3.7+s+f,.28,0],LDC),...G.arrow([-3.7-s,-.28,0],[-3.7-s-f,-.28,0],LDC),G.label([4.0+s+f,.85,0],'F',LDC,{size:15}),G.label([-4.0-s-f,-.85,0],'F',LDC,{size:15}))}
 return{shapes:sh,center:[0,0,0],span:11.5,view:{pitch:.2,yaw:-.3},hud:hud([c.fail?'The bolt is sheared in two along the plate interface':lo>.5?'The bolt bends and the plates start to slip':'Two plates pulled in opposite directions: the bolt carries the shear',c.fail?LDC:null],['Bolt capacity = n_s · A_b · F_nv',null])}};

/* ============================================================ slides */
const F=(a,b)=>[a,b];
const CM='https://commons.wikimedia.org/wiki/Special:FilePath/',CP='https://commons.wikimedia.org/wiki/File:';
const ph=(local,name,alt,what)=>name?{file:local,url:CM+name+'?width=1000',page:CP+name,alt,credit:`${what} Photo: Wikimedia Commons — <a href="${CP+name}" target="_blank" rel="noopener">author and licence on the file page</a>.`,localCredit:'Photo supplied with this STRUXA installation.'}:{file:local,alt,localCredit:'Photo supplied with this STRUXA installation.'};
const slides=[
{id:'intro',title:'What does “failure” mean?',kicker:'Start here · Overview',
 lead:'A structure fails when it can no longer do its job. That can be a collapse, or simply a floor that vibrates or cracks too much.',
 symbol:DG.intro,symbolTab:'Diagram',scene:'fm_intro',span:10,
 photos:[ph('fm-intro.jpg','DuctileFailure.jpg','Ductile failure of a metal specimen','Ductile failure: the metal stretches and thins before it breaks.'),ph('fm-intro-brittle.jpg','Sprödbruch.jpg','Brittle fracture','Brittle fracture: almost no deformation before it breaks.')],
 symbolCap:'Both members reach the same strength, but the ductile one gives a clear warning.',sceneCap:'The same load on two beams: the steel beam sags a lot, the brittle one snaps with almost no deflection.',
 tags:[['Ductile = warning','free'],['Brittle = sudden','lock']],
 facts:[F('Ultimate limit state (ULS)','Collapse or loss of strength: crushing, buckling, shear, fracture, instability. This is what the lesson covers.'),
  F('Serviceability limit state (SLS)','The structure stands but works badly: large deflection, wide cracks, vibration.'),
  F('Ductile vs brittle','A <b>ductile</b> failure shows large deformation first, so people can react. A <b>brittle</b> failure is sudden. Good design makes the ductile mode happen first.'),
  F('Failure is always a competition','The member fails in the weakest mode: bending, shear, buckling, ... Each following slide explains one mode, how to recognise it and how to prevent it.')],
 note:'Capacity design rule: make sure the ductile mode (e.g. steel yielding in bending) is reached before any brittle mode (shear, crushing, buckling).'},
{id:'tension',title:'Axial tension: yielding and rupture',kicker:'Mode 1 of 12 · Axial',
 lead:'A member pulled along its axis stretches uniformly, yields, thins locally (necking) and finally ruptures.',
 symbol:DG.tension,symbolTab:'Stress–strain',scene:'fm_tension',span:9,
 photos:[ph('fm-tension.jpg','Al_tensile_test.jpg','Metal tensile test specimen after fracture','Tensile specimen with necking and fracture.'),ph('fm-tension-brittle.jpg','Cast_iron_tensile_test.JPG','Cast iron tensile specimen','Cast iron breaks with almost no necking (brittle).')],
 symbolCap:'Elastic line, yield plateau, strain hardening, then necking until the bar ruptures.',sceneCap:'Elastic stretching, yielding, necking, and finally rupture of a steel bar.',
 tags:[['Ductile (steel)','free'],['Warning: large stretch','free']],
 facts:[F('What happens','Stress σ = N / A. At the yield stress fy the steel flows; at the ultimate stress fu the section thins at one place (neck) and breaks.'),
  F('Two limits','<b>Yielding</b> of the gross section: N_y = A_g·fy (large deformation). <b>Rupture</b> of the net section at holes: N_u = A_e·fu.'),
  F('Where it happens','Tie rods, cables, truss tension chords and diagonals, bolts, hangers.'),
  F('How to prevent it','Provide enough area, check the net area at bolt holes, and make yielding of the gross section govern over rupture.')],
 note:'Tension is the friendliest failure: steel warns by stretching. Cast iron and glass do not, which is why they are used mainly in compression.'},
{id:'compression',title:'Axial compression: crushing',kicker:'Mode 2 of 12 · Axial',
 lead:'A short, stocky member under compression fails when the material itself is squashed; there is no time for it to buckle.',
 symbol:DG.compress,symbolTab:'Diagram',scene:'fm_compress',span:8.5,
 photos:[ph('fm-compression.jpg','Concrete_Compression_Testing.jpg','Compression test of a concrete specimen','A concrete specimen in a compression testing machine.')],
 symbolCap:'Cone/shear failure and vertical splitting are typical for concrete.',sceneCap:'A concrete cylinder is loaded: vertical cracks open, the sides bulge and pieces spall off.',
 tags:[['Brittle (concrete)','lock'],['Short member','rx']],
 facts:[F('What happens','Concrete develops vertical splitting cracks and shear cones; steel short columns yield and bulge.'),
  F('Capacity','Short RC column: N_u = 0.85·f′c·(A_g − A_s) + fy·A_s.  Short steel column: N_u = A·fy.'),
  F('Where it happens','Short columns, piers, walls, bearings, concrete cylinders in the lab.'),
  F('How to prevent it','Enough area and strength; closely spaced ties or confinement make concrete much more ductile.')],
 note:'If the member is slender, buckling (mode 6) governs long before crushing.'},
{id:'bending',title:'Bending (flexure)',kicker:'Mode 3 of 12 · Beams',
 lead:'Loads across a beam bend it: the top is squeezed, the bottom is stretched, and the section fails when either side runs out of strength.',
 symbol:DG.bending,symbolTab:'Stresses',scene:'fm_bending',span:10.5,
 photos:[ph('fm-bending.jpg','Three_point_flexural_test.jpg','Three-point bending test of a beam','A three-point bending test: load at midspan, supports at the ends.')],
 symbolCap:'Compression at the top, tension at the bottom, neutral axis in between. Cracks start in the tension zone.',sceneCap:'Reinforced concrete beam: tension cracks climb from the bottom until the top concrete crushes.',
 tags:[['Under-reinforced: ductile','free'],['Over-reinforced: brittle','lock']],
 facts:[F('Stresses','σ = M·y / I. The extreme fibres carry the largest stresses.'),
  F('Steel beam','Yields first, then forms a plastic hinge: M_p = Z·fy.'),
  F('Reinforced concrete','Under-reinforced: the steel yields, cracks widen, the beam deflects a lot and then the concrete crushes (ductile). Over-reinforced: the concrete crushes first (brittle). M_n = A_s·fy·(d − a/2).'),
  F('How to prevent it','Enough section depth and reinforcement, and limit the steel ratio so the steel yields before the concrete crushes.')],
 note:'Flexural cracks are normal in RC. They show the steel is working; their width is limited in serviceability checks.'},
{id:'shear',title:'Shear failure',kicker:'Mode 4 of 12 · Beams',
 lead:'Near the supports, the shear force dominates. Diagonal tension cracks open at about 45° and the end of the beam can slide off.',
 symbol:DG.shear,symbolTab:'Diagram',scene:'fm_shear',span:9.5,
 photos:[ph('fm-shear.jpg',null,'Diagonal shear crack in a reinforced concrete beam')],
 symbolCap:'Diagonal cracks run from the support toward the load. Stirrups cross them.',sceneCap:'A deep beam: a diagonal crack opens and the end block slides down along it.',
 tags:[['Brittle','lock'],['Little warning','lock']],
 facts:[F('What happens','Principal tension in the web exceeds the concrete tension strength: a diagonal crack forms and, without stirrups, grows suddenly.'),
  F('Capacity (RC)','V_n = V_c + V_s with V_s = A_v·fy·d / s (stirrups crossing the crack).'),
  F('Steel I-beams','Thin webs can yield in shear or buckle (shear buckling).'),
  F('How to prevent it','Provide stirrups, check shear before flexure so that bending (ductile) always governs.')],
 note:'Shear failure is brittle. Codes deliberately make the shear strength higher than the flexural strength.'},
{id:'torsion',title:'Torsional failure',kicker:'Mode 5 of 12 · Twisting',
 lead:'A twisting moment creates shear stresses all around the section. Concrete cracks along spirals at 45° and the member twists apart.',
 symbol:DG.torsion,symbolTab:'Diagram',scene:'fm_torsion',span:10.5,
 photos:[ph('fm-torsion.jpg',null,'Spiral cracks in a concrete beam failed in torsion')],
 symbolCap:'Pure shear on the surface equals tension and compression at 45°. Concrete cracks along the tension.',sceneCap:'The bar twists more towards the free end and spiral cracks wrap around it at 45°.',
 tags:[['Brittle (concrete)','lock'],['Spiral cracks','rx']],
 facts:[F('Stresses','Circular shaft: τ = T·r / J. Rectangular and open sections need more careful formulas; open thin-walled sections are very weak in torsion.'),
  F('Where it happens','Edge beams carrying slabs, curved bridge girders, beams loaded off their shear centre, shafts.'),
  F('How to prevent it','Closed stirrups plus longitudinal bars all around the section; closed (box or tube) sections are far stiffer than open ones.'),
  F('Look for','Cracks that spiral around the member, not just on one face.')]},
{id:'buckling',title:'Column (Euler) buckling',kicker:'Mode 6 of 12 · Instability',
 lead:'A slender column loaded in compression suddenly bows sideways at a load far below its material strength.',
 symbol:DG.buckling,symbolTab:'Load–deflection',scene:'fm_buckling',span:8.5,
 photos:[ph('fm-buckling.jpg','Spoorspatting_Landgraaf.jpg','Railway track buckled by heat','A railway track buckled sideways by thermal compression (a “sun kink”).'),ph('fm-buckling-model.jpg','Buckledmodel.JPG','A buckled slender model','A slender specimen buckled under compression.')],
 symbolCap:'Straight until P_cr; then the column buckles. The effective length factor K depends on the end conditions.',sceneCap:'The load rises to P_cr and the column suddenly bows. Stress is still far below the yield stress.',
 tags:[['Sudden','lock'],['Depends on slenderness','rx']],
 facts:[F('Euler load','P_cr = π²·E·I / (K·L)².  Slenderness λ = K·L / r.'),
  F('Effective length','Pinned–pinned K = 1.0, fixed–fixed 0.5, fixed–pinned 0.7, fixed–free 2.0.'),
  F('Key insight','It is a stability failure, not a strength failure: material strength hardly matters, stiffness E·I and length do.'),
  F('How to prevent it','Reduce the length (bracing), increase I (deeper or hollow sections), improve end restraint.')],
 note:'Real columns are never perfectly straight or centred, so they start bending earlier; design codes include this with imperfection factors.'},
{id:'ltb',title:'Lateral-torsional buckling',kicker:'Mode 7 of 12 · Instability',
 lead:'A slender beam loaded in its strong direction can suddenly twist and move sideways, because its compression flange buckles like a column.',
 symbol:DG.ltb,symbolTab:'Diagram',scene:'fm_ltb',span:10.5,
 photos:[ph('fm-ltb.jpg',null,'Steel beam failed by lateral-torsional buckling')],
 symbolCap:'The compression flange moves sideways and the whole section twists.',sceneCap:'An I-beam under load: it first deflects normally, then the flange moves sideways and the section twists.',
 tags:[['Sudden','lock'],['Brace the flange','free']],
 facts:[F('Critical moment','M_cr = (π/L_b)·√( E·I_y·G·J + (π·E/L_b)²·I_y·C_w ).'),
  F('Who is at risk','Long, deep, narrow steel beams (large I_x / I_y) with no lateral support, and also tall slender timber beams.'),
  F('How to prevent it','Brace the compression flange (decking, slabs, secondary beams), shorten the unbraced length L_b, use wider flanges or box sections.'),
  F('Also during construction','Beams are often most at risk before the slab is cast and connected.')]},
{id:'local',title:'Local (plate) buckling',kicker:'Mode 8 of 12 · Instability',
 lead:'Thin plates in compression, such as flanges and webs of steel sections, buckle into waves before the whole member fails.',
 symbol:DG.local,symbolTab:'Diagram',scene:'fm_local',span:9,
 photos:[ph('fm-local.jpg',null,'Local buckling of a steel flange')],
 symbolCap:'The plate buckles into half-waves roughly as long as its width.',sceneCap:'A compressed plate stays flat, then suddenly forms waves.',
 tags:[['Slender plates','rx'],['Reduces capacity','lock']],
 facts:[F('Critical stress','σ_cr = k·π²·E / [12(1 − ν²)] · (t/b)². Slender plates (large b/t) buckle at low stress.'),
  F('Where it happens','Flanges and webs of I-sections, thin-walled box and cold-formed sections, steel plates, aircraft skins.'),
  F('How to prevent it','Limit b/t (compact sections), add stiffeners, use thicker plates.'),
  F('Interaction','Local buckling reduces the effective area and can trigger column or beam buckling.')]},
{id:'punching',title:'Punching shear',kicker:'Mode 9 of 12 · Slabs',
 lead:'In a flat slab, the column can punch through the slab: a cone of concrete is pushed out, with very little warning.',
 symbol:DG.punching,symbolTab:'Diagram',scene:'fm_punch',span:10.5,
 photos:[ph('fm-punching.jpg',null,'Punching shear failure of a flat slab at a column')],
 symbolCap:'The failure surface is a cone around the column; the critical perimeter b₀ is taken at about d/2 from the face.',sceneCap:'A section through a slab: the cone of concrete over the column stays in place while the slab drops around it.',
 tags:[['Brittle','lock'],['Flat slabs & footings','rx']],
 facts:[F('What happens','Shear stress concentrates around the column. Without enough shear resistance a conical plug is punched out.'),
  F('Check','V_u ≤ φ·V_c, V_c ≈ 0.33·√f′c·b₀·d (MPa, mm; critical perimeter b₀ at d/2). Codes differ (EC2 uses 2d), always follow your local code.'),
  F('Where it happens','Flat slabs on columns, footings and pile caps, bridge decks under wheel loads.'),
  F('How to prevent it','Thicker slab or drop panel, column capital, shear studs or stirrups, larger columns.')],
 note:'A punching failure at one column can overload neighbouring columns and cause progressive collapse of a whole floor.'},
{id:'fatigue',title:'Fatigue',kicker:'Mode 10 of 12 · Repeated loads',
 lead:'Millions of small load cycles can grow a tiny crack until the remaining section suddenly breaks, even though stresses are far below yield.',
 symbol:DG.fatigue,symbolTab:'S–N curve',scene:'fm_fatigue',span:10,
 photos:[ph('fm-fatigue.jpg','Crankshaft_fatigue.jpg','Fatigue fracture of a crankshaft','Fatigue fracture of a steel component. Smooth beach marks mark slow crack growth.')],
 symbolCap:'Lower stress ranges give longer life; below the endurance limit steel can last indefinitely (not welded details).',sceneCap:'A cantilever under repeated bending: the crack from the notch grows every cycle until sudden fracture.',
 tags:[['Sudden at the end','lock'],['Cycles count','rx']],
 facts:[F('Stages','1) crack starts at a stress concentration, 2) slow growth (beach marks), 3) sudden fracture of the remaining section.'),
  F('Growth law','Paris law: da/dN = C·(ΔK)^m with ΔK = Y·Δσ·√(π·a).'),
  F('Where it happens','Bridges, cranes, crane runway beams, offshore platforms, welded details, bolts, wind turbines.'),
  F('How to prevent it','Avoid sharp notches and poor welds, use good detail categories, limit stress range, inspect.')],
 note:'The stress range matters more than the peak stress. A badly detailed weld can fail in fatigue while the member is “only” lightly stressed.'},
{id:'plastic',title:'Plastic hinges and collapse mechanisms',kicker:'Mode 11 of 12 · Collapse',
 lead:'When enough sections yield in bending, they act as hinges. Once the hinges turn the structure into a mechanism, it collapses.',
 symbol:DG.plastic,symbolTab:'Diagram',scene:'fm_plastic',span:10.5,
 photos:[ph('fm-plastic.jpg',null,'Plastic hinge in a steel frame')],
 symbolCap:'Moment diagram with plastic moments at the ends and midspan. Three hinges make the beam a mechanism.',sceneCap:'A fixed-ended beam: hinges form at both ends and then at midspan; the beam collapses as a mechanism.',
 tags:[['Ductile: redistributes','free'],['Collapse = mechanism','lock']],
 facts:[F('Idea','A section reaches its plastic moment M_p and keeps rotating at constant moment: a plastic hinge.'),
  F('Collapse','A statically indeterminate structure survives the first hinge by redistributing moments. It collapses when a mechanism forms.'),
  F('Example','Fixed–fixed beam under UDL: hinges at both ends and midspan, w_c = 16·M_p / L².'),
  F('Why use it','Plastic design uses this reserve strength. In earthquakes ductile hinges absorb energy; the rule is strong column, weak beam.')],
 note:'You can compute the collapse load by virtual work: external work = internal work done by the hinge rotations.'},
{id:'connection',title:'Connection failure: bolts and welds',kicker:'Mode 12 of 12 · Connections',
 lead:'A structure is only as strong as its connections: bolts can shear, plates can tear or crush at the hole, and welds can crack.',
 symbol:DG.conn,symbolTab:'Diagram',scene:'fm_conn',span:11,
 photos:[ph('fm-connection.jpg',null,'Failed bolted connection')],
 symbolCap:'Bolt shear in single shear and plate tear-out or bearing failure at a bolt hole.',sceneCap:'Two plates pulled in opposite directions: the bolt is sheared along the plate interface.',
 tags:[['Often brittle','lock'],['Check every path','rx']],
 facts:[F('Bolt shear','R = n_s·A_b·F_nv per bolt; double shear doubles n_s.'),
  F('Plate failures','Bearing at the hole (R ≈ 2.4·d·t·F_u in AISC style), tear-out, block shear, net-section rupture.'),
  F('Welds','Fail by shear along the throat; poor welds also start fatigue cracks.'),
  F('Design rule','Design the connection stronger than the member, so the member (ductile) governs and the connection never fails first.')],
 note:'A connection chain is only as strong as its weakest link: bolts, plates, welds, and the member at the net section.'},
{id:'summary',title:'Summary and design philosophy',kicker:'Review',
 lead:'Each mode has its own cause, warning and cure. Knowing which one governs is half of structural design.',
 html:`<div class="stx-tw"><table class="stx-tbl"><thead><tr><th>Mode</th><th>Main cause</th><th>Warning?</th><th>Key remedy</th></tr></thead><tbody>
 <tr><td><b>Tension</b></td><td>Axial pull</td><td>Yes (steel)</td><td>Area, net section</td></tr>
 <tr><td><b>Crushing</b></td><td>Axial push, short member</td><td>Some</td><td>Area, confinement</td></tr>
 <tr><td><b>Bending</b></td><td>Moment</td><td>Yes if under-reinforced</td><td>Depth, steel ratio</td></tr>
 <tr><td><b>Shear</b></td><td>Shear force</td><td>No</td><td>Stirrups, web</td></tr>
 <tr><td><b>Torsion</b></td><td>Twisting moment</td><td>Little</td><td>Closed ties, closed sections</td></tr>
 <tr><td><b>Column buckling</b></td><td>Slender + compression</td><td>No</td><td>Bracing, larger I</td></tr>
 <tr><td><b>LTB</b></td><td>Unbraced compression flange</td><td>No</td><td>Bracing flange</td></tr>
 <tr><td><b>Local buckling</b></td><td>Slender plates</td><td>Some</td><td>Stiffeners, b/t limits</td></tr>
 <tr><td><b>Punching</b></td><td>Column on a slab</td><td>No</td><td>Thickness, studs</td></tr>
 <tr><td><b>Fatigue</b></td><td>Repeated cycles</td><td>Crack inspection</td><td>Detailing, stress range</td></tr>
 <tr><td><b>Plastic collapse</b></td><td>Hinges form a mechanism</td><td>Yes (large deflection)</td><td>Ductility, load factors</td></tr>
 <tr><td><b>Connections</b></td><td>Bolt, weld, plate</td><td>Often no</td><td>Stronger than the member</td></tr></tbody></table></div>`,
 facts:[F('Design philosophy','Make the ductile mode govern and every brittle mode stronger. Warning before failure saves lives.'),
  F('Redundancy','Alternative load paths prevent one local failure from becoming a progressive collapse.'),
  F('Next step','Use <b>Structural Analysis</b> to find the forces (M, V, N) and then check these modes for your members.')]}
];

STX.register({id:'failure',title:'Failure Modes',desc:'Bending, shear, torsion, buckling, punching, fatigue, plastic collapse and more. Diagrams, photos and an animated 3D model for every mode.',
 icon:'<svg viewBox="0 0 150 88" width="170" height="100" fill="none" stroke="var(--fg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 30h48l8 8 8-8h54" stroke="var(--ac)" stroke-width="7" stroke-linecap="butt"/><path d="M68 40l-6 18M68 40l8 14" stroke="#D62828" stroke-width="3"/><path d="M30 33l-12 20h24zM120 33l-12 20h24z" fill="var(--card)"/></svg>',
 slides});
})();
