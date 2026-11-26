/* STRUXA — lesson "Structural Analysis History": theories in order of discovery, with equations,
   short biographies and diagrams. Portraits: put files named hist-*.jpg next to index.html (see README). */
(function(){
'use strict';
if(!window.STX)return;

/* ============================================================ SVG helpers */
const RX='#177a3c',LD='#D62828',BL='#2f6fd0',AC='var(--ac)';
const svg=inner=>`<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--fg)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" font-family="Inter,system-ui,sans-serif" font-size="12.5" role="img">${inner}</svg>`;
const tx=(x,y,t,c='var(--fg)',a='start',w=600,sz)=>(t=String(t).replace(/ {2,}/g,m=>'\u00a0'.repeat(m.length)),`<text x="${x}" y="${y}" fill="${c}" stroke="none" text-anchor="${a}" font-weight="${w}"${sz?` font-size="${sz}"`:''}>${t}</text>`);
const arr=(x1,y1,x2,y2,c=RX,w=2.8)=>{const a=Math.atan2(y2-y1,x2-x1),h=d=>[(x2-10*Math.cos(a+d)).toFixed(1),(y2-10*Math.sin(a+d)).toFixed(1)],p=h(.42),q=h(-.42);return`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}"/><path d="M${x2} ${y2}L${p[0]} ${p[1]}L${q[0]} ${q[1]}Z" fill="${c}" stroke="${c}" stroke-width="1"/>`};
const ttl=t=>tx(14,22,t,'var(--mut)');
const eqn=(t,y=238)=>tx(240,y,t,'var(--fg)','middle',700,14);
const hatch=(x,y,w)=>{let s=`<path d="M${x} ${y}h${w}" stroke-width="2.6"/>`;for(let i=6;i<=w;i+=9)s+=`<path d="M${x+i} ${y}l-7 8" stroke="var(--mut)" stroke-width="1.4"/>`;return s};
const vh=(x,y,h)=>{let s=`<path d="M${x} ${y}v${h}" stroke-width="2.8"/>`;for(let i=6;i<=h;i+=9)s+=`<path d="M${x} ${y+i}l-8 -7" stroke="var(--mut)" stroke-width="1.4"/>`;return s};
const tri=(x,y)=>`<path d="M${x} ${y}l-12 20h24z" fill="var(--bg)"/>`;
const rol=(x,y)=>`<path d="M${x} ${y}l-11 17h22z" fill="var(--bg)"/><circle cx="${x-5}" cy="${y+22}" r="4.5" fill="var(--bg)"/><circle cx="${x+5}" cy="${y+22}" r="4.5" fill="var(--bg)"/>`;
const bm=(x1,y,x2)=>`<path d="M${x1} ${y}H${x2}" stroke="var(--ac)" stroke-width="7" stroke-linecap="butt"/>`;
const dot=(x,y,r=4)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--bg)" stroke="var(--fg)" stroke-width="2"/>`;

/* ============================================================ diagrams */
const D={};
D.archimedes=svg(`${ttl('The lever: moments balance about the fulcrum')}<path d="M40 120H440" stroke="var(--ac)" stroke-width="8" stroke-linecap="butt"/><path d="M130 124l-18 30h36z" fill="var(--bg)"/>${hatch(90,154,80)}
 ${arr(70,56,70,114,LD,3.4)}${tx(80,70,'F₁',LD)}${arr(400,86,400,114,LD,3.4)}${tx(410,98,'F₂',LD)}
 <path d="M70 178H130M130 178H400" stroke="var(--mut)" stroke-width="1.2"/><path d="M70 172v12M130 172v12M400 172v12" stroke="var(--mut)" stroke-width="1.2"/>${tx(100,196,'a','var(--mut)','middle')}${tx(265,196,'b','var(--mut)','middle')}${eqn('F₁ · a = F₂ · b   (ΣM = 0)')}`);
D.stevin=svg(`${ttl('Composition of forces: the force triangle')}<path d="M90 190L260 190" stroke="${BL}" stroke-width="3.4"/><path d="M260 190L330 100" stroke="${LD}" stroke-width="3.4"/><path d="M90 190L330 100" stroke="${RX}" stroke-width="3.4" stroke-dasharray="7 5"/>
 ${arr(240,190,262,190,BL)}${arr(316,118,330,100,LD)}${arr(310,108,330,100,RX)}${tx(175,210,'F₁',BL,'middle')}${tx(312,160,'F₂',LD)}${tx(180,128,'R',RX)}
 <g transform="translate(360 80)"><path d="M0 100L90 100L90 20Z" fill="color-mix(in srgb,var(--ac) 18%,transparent)" stroke="var(--fg)"/><rect x="28" y="40" width="24" height="18" fill="${BL}" stroke="var(--fg)" transform="rotate(-39 40 49)"/></g>${tx(405,194,'inclined plane',  'var(--mut)','middle',500,11)}${eqn('R = √(F₁² + F₂² + 2F₁F₂ cos α)')}`);
D.galileo=svg(`${ttl('Galileo’s cantilever (1638)')}${vh(60,50,110)}<rect x="60" y="86" width="220" height="30" fill="var(--ac)" opacity=".85" stroke="var(--fg)"/>${arr(280,40,280,84,LD,3.4)}${tx(292,56,'W',LD)}
 <g transform="translate(330 60)"><rect x="0" y="0" width="30" height="90" fill="var(--bg)" stroke="var(--fg)"/>${[15,35,55,75].map(y=>arr(46,y,30,y,LD,1.8)).join('')}<path d="M0 90H30" stroke="${BL}" stroke-width="3"/></g>${tx(332,172,'uniform stress,',BL,'start',600,11)}${tx(332,186,'pivot at the bottom',BL,'start',500,11)}
 ${tx(20,196,'Strength grows with b·h²; weight grows with volume:',  'var(--mut)','start',500,12)}${tx(20,212,'big structures are relatively weaker (square–cube law).','var(--mut)','start',500,12)}${eqn('resisting moment ∝ b · h²',240)}`);
D.hooke=svg(`${ttl('Hooke’s law: “ut tensio, sic vis”')}<path d="M80 40H140" stroke-width="3"/>${hatch(70,40,80)}<path d="M110 40V54l-14 7 28 10-28 10 28 10-28 10 14 7V132" stroke-width="2.6"/><rect x="92" y="132" width="36" height="28" fill="var(--ac)" stroke="var(--fg)"/>${arr(110,160,110,198,LD,3)}${tx(120,190,'F',LD)}${arr(150,70,150,128,BL,1.8)}${tx(160,104,'x',BL)}
 <path d="M250 200V50M250 200H440" stroke-width="2"/><path d="M250 200L410 80" stroke="${LD}" stroke-width="3.4"/>${tx(440,216,'x (extension)','var(--mut)','end',600,11.5)}${tx(240,44,'F','var(--mut)','end',600,11.5)}${tx(380,110,'slope = k',LD)}${eqn('F = k · x      σ = E · ε',238)}`);
D.bernoulli=svg(`${ttl('Bernoulli–Euler beam: curvature follows the moment')}<path d="M60 170Q240 40 420 170" stroke="var(--ac)" stroke-width="8" fill="none" stroke-linecap="butt"/><path d="M240 106L240 220" stroke="var(--mut)" stroke-dasharray="4 4"/>${dot(240,220,3.5)}${tx(252,214,'centre of curvature','var(--mut)','start',500,11)}${tx(248,168,'ρ','var(--mut)','start',700,14)}
 <path d="M60 150a18 18 0 0 1 0 40" stroke="${RX}" stroke-width="3"/>${tx(40,176,'M',RX,'end')}<path d="M420 150a18 18 0 0 0 0 40" stroke="${RX}" stroke-width="3"/>${tx(442,176,'M',RX)}${eqn('1/ρ = M / (E·I)     →     E·I·w″ = M',238)}`);
D.virtual=svg(`${ttl('Virtual work: equilibrium ⇔ δW_ext = δW_int')}${bm(60,110,420)}${tri(60,114)}${rol(420,114)}${arr(240,50,240,104,LD,3.4)}${tx(252,64,'P',LD)}
 <path d="M60 110Q240 160 420 110" stroke="${BL}" stroke-width="3" stroke-dasharray="6 5"/>${arr(240,112,240,150,BL,2.6)}${tx(252,152,'δ (virtual)',BL)}${tx(60,60,'real forces','var(--mut)','start',500,11.5)}${tx(60,76,'+ imaginary displacement','var(--mut)','start',500,11.5)}${eqn('P·δ = ∫ M·δκ dx',226)}`);
D.euler=svg(`${ttl('Euler’s buckling load (1744–1757)')}<path d="M240 40Q282 118 240 196" stroke="var(--ac)" stroke-width="8" fill="none" stroke-linecap="butt"/><path d="M240 40V196" stroke="var(--mut)" stroke-dasharray="4 4"/>${tri(240,198)}${arr(240,6,240,36,LD,3.4)}${tx(252,22,'P',LD)}${dot(240,40,4)}
 ${tx(310,130,'L',  'var(--mut)','start',700,14)}<path d="M296 40V196" stroke="var(--mut)" stroke-width="1.2"/><path d="M290 40h12M290 196h12" stroke="var(--mut)" stroke-width="1.2"/>${eqn('P_cr = π² · E · I / L²',244)}`);
D.coulomb=svg(`${ttl('Coulomb (1773): equilibrium of the cross-section')}<rect x="80" y="50" width="70" height="140" fill="var(--bg)" stroke="var(--fg)"/><path d="M70 120H160" stroke="${BL}" stroke-dasharray="5 4"/><path d="M230 50V120H300Z" fill="color-mix(in srgb,${LD} 22%,transparent)" stroke="${LD}"/><path d="M230 120V190H160Z" fill="color-mix(in srgb,${BL} 22%,transparent)" stroke="${BL}" transform="translate(70 0)"/>
 ${tx(310,76,'C',LD,'start',700,16)}${tx(300,176,'T',BL,'start',700,16)}${tx(180,114,'N.A.',BL,'start',600,11)}${tx(340,126,'C = T  →  ΣF = 0',  'var(--mut)','start',600,12)}${tx(340,144,'C·z = M  →  ΣM = 0','var(--mut)','start',600,12)}${eqn('∫σ dA = 0      ∫σ·y dA = M',238)}`);
D.young=svg(`${ttl('Young’s modulus: stiffness independent of size')}<path d="M70 200V50M70 200H430" stroke-width="2"/><path d="M70 200L300 70" stroke="var(--ac)" stroke-width="4"/><path d="M300 70Q340 62 380 80L408 130" stroke="var(--ac)" stroke-width="2.6" stroke-dasharray="4 5"/>${tx(430,218,'ε','var(--mut)','end',700,13)}${tx(60,48,'σ','var(--mut)','end',700,13)}
 <path d="M70 200H170V157" stroke="${BL}" stroke-width="1.4" stroke-dasharray="3 3"/>${tx(200,184,'E = σ / ε',BL,'start',700,13)}${tx(300,44,'steel ≈ 200 GPa','var(--mut)','start',600,12)}${tx(300,60,'concrete ≈ 30 GPa','var(--mut)','start',600,12)}${eqn('σ = E · ε',238)}`);
D.navier=svg(`${ttl('Navier (1826): stresses and indeterminate beams')}${bm(50,100,430)}${tri(50,104)}${tri(240,104)}${tri(430,104)}${[90,130,170,210,270,310,350,390].map(x=>arr(x,56,x,92,LD,1.8)).join('')}
 <path d="M50 150H430" stroke-width="1.2"/><path d="M50 150Q145 200 240 150Q335 200 430 150" fill="color-mix(in srgb,var(--ac) 20%,transparent)" stroke="var(--ac)"/>${tx(145,194,'+M',RX,'middle')}${tx(335,194,'+M',RX,'middle')}${tx(240,142,'−M',RX,'middle')}${eqn('σ = M · y / I',238)}`);
D.clapeyron=svg(`${ttl('Clapeyron’s three-moment equation (1857)')}${bm(50,110,430)}${tri(50,114)}${tri(210,114)}${tri(430,114)}${[80,115,150,185,240,290,340,390].map(x=>arr(x,66,x,102,LD,1.8)).join('')}${tx(130,70,'w₁',LD,'middle')}${tx(320,70,'w₂',LD,'middle')}
 <path d="M42 160a16 16 0 0 1 16 0" stroke="${RX}" stroke-width="0"/>${tx(50,166,'M_A',RX,'middle')}${tx(210,166,'M_B',RX,'middle')}${tx(430,166,'M_C',RX,'middle')}<path d="M50 176H210M210 176H430" stroke="var(--mut)" stroke-width="1.2"/>${tx(130,194,'L₁','var(--mut)','middle')}${tx(320,194,'L₂','var(--mut)','middle')}
 ${tx(240,224,'M_A L₁ + 2 M_B (L₁ + L₂) + M_C L₂ = −(w₁L₁³ + w₂L₂³) / 4',  'var(--fg)','middle',700,12.5)}`);
D.maxwell=svg(`${ttl('Maxwell’s reciprocal theorem (1864)')}<g transform="translate(20 0)">${bm(20,100,200)}${tri(20,104)}${rol(200,104)}${arr(60,50,60,94,LD,3.2)}${tx(70,62,'P at i',LD)}<path d="M20 100Q130 130 200 100" stroke="${BL}" stroke-width="2.6" stroke-dasharray="5 4"/>${arr(150,106,150,128,BL,2.4)}${tx(158,130,'δ_ji',BL)}</g>
 <g transform="translate(250 0)">${bm(20,100,200)}${tri(20,104)}${rol(200,104)}${arr(150,50,150,94,LD,3.2)}${tx(160,62,'P at j',LD)}<path d="M20 100Q100 135 200 100" stroke="${BL}" stroke-width="2.6" stroke-dasharray="5 4"/>${arr(60,106,60,128,BL,2.4)}${tx(68,130,'δ_ij',BL)}</g>
 ${tx(240,170,'=','var(--fg)','middle',700,26)}${eqn('δ_ij = δ_ji      f_ij = f_ji',234)}`);
D.betti=svg(`${ttl('Betti’s theorem (1872): work of one system on the other')}${bm(40,100,440)}${tri(40,104)}${rol(440,104)}${arr(150,50,150,94,LD,3)}${tx(160,64,'P₁',LD)}${arr(320,50,320,94,BL,3)}${tx(330,64,'P₂',BL)}
 <path d="M40 100Q200 150 440 100" stroke="${LD}" stroke-width="2.4" stroke-dasharray="5 4"/><path d="M40 100Q280 150 440 100" stroke="${BL}" stroke-width="2.4" stroke-dasharray="5 4"/>${tx(240,184,'system 1 loads  ×  system 2 displacements','var(--mut)','middle',500,12)}${tx(240,200,'= system 2 loads  ×  system 1 displacements','var(--mut)','middle',500,12)}${eqn('Σ P₁·δ₂ = Σ P₂·δ₁',238)}`);
D.mohr=svg(`${ttl('Mohr’s circle (1882) and the Williot–Mohr diagram')}<path d="M40 130H260M150 40V220" stroke-width="1.6"/><circle cx="170" cy="130" r="64" stroke="var(--ac)" stroke-width="3.2"/><path d="M106 130L234 130" stroke="var(--mut)" stroke-dasharray="3 3"/>${dot(106,130,3.5)}${dot(234,130,3.5)}<path d="M170 130L214 82" stroke="${LD}" stroke-width="2.6"/>${dot(214,82,3.5)}${tx(106,150,'σ₂',RX,'middle')}${tx(234,150,'σ₁',RX,'middle')}${tx(262,134,'σ','var(--mut)')}${tx(154,38,'τ','var(--mut)','end')}
 <g transform="translate(300 38)"><path d="M0 100L60 0L120 100Z" stroke="var(--ac)" stroke-width="3"/><path d="M0 100L40 120M60 0L90 20M120 100L100 130" stroke="${BL}" stroke-width="2"/>${tx(60,150,'truss joint displacements',  'var(--mut)','middle',600,11)}${tx(60,166,'from a graphical diagram','var(--mut)','middle',500,11)}</g>${eqn('(σ − σ_m)² + τ² = R²',238)}`);
D.menabrea=svg(`${ttl('Principle of least work (Menabrea 1858)')}<path d="M70 200V50M70 200H420" stroke-width="2"/><path d="M90 70Q240 230 400 70" stroke="var(--ac)" stroke-width="3.4"/>${dot(245,160,5)}<path d="M245 160V200" stroke="${RX}" stroke-dasharray="4 4"/>${tx(245,218,'R = R*',RX,'middle',700,13)}${tx(60,48,'U','var(--mut)','end',700,13)}${tx(420,218,'redundant R','var(--mut)','end',600,12)}${tx(300,168,'strain energy U(R)','var(--mut)','start',600,12)}${tx(300,184,'is smallest at the true R','var(--mut)','start',600,12)}${eqn('∂U / ∂R = 0',240)}`);
D.castigliano=svg(`${ttl('Castigliano’s theorems (1873–1879)')}<path d="M60 200V50M60 200H250" stroke-width="2"/><path d="M60 200L220 80" stroke="var(--ac)" stroke-width="3.4"/><path d="M60 200L220 200V80Z" fill="color-mix(in srgb,var(--ac) 22%,transparent)" stroke="none"/>${tx(190,184,'U',RX,'middle',700,16)}${tx(50,48,'P','var(--mut)','end',700,13)}${tx(250,218,'δ','var(--mut)','end',700,13)}
 ${bm(290,120,450)}${vh(290,70,100)}${arr(450,60,450,112,LD,3.2)}${tx(460,76,'P',LD)}<path d="M290 120Q400 130 450 170" stroke="${BL}" stroke-width="2.6" stroke-dasharray="5 4"/>${tx(400,196,'δ = ∂U / ∂P',BL,'middle',700,13)}${eqn('δ_i = ∂U/∂P_i      U = ∫ M²/(2EI) dx',238)}`);
D.slope=svg(`${ttl('Slope-deflection (Mohr 1892, Maney 1915)')}${bm(60,110,420)}<path d="M60 110Q130 150 240 130Q330 118 420 110" stroke="${BL}" stroke-width="2.6" stroke-dasharray="5 4" fill="none"/>${tri(60,114)}${tri(420,114)}${tx(100,170,'θ_A',RX,'middle',700,14)}${tx(380,170,'θ_B',RX,'middle',700,14)}<path d="M60 110L96 138M420 110L388 134" stroke="${RX}" stroke-width="2" stroke-dasharray="3 3"/>${tx(240,86,'Δ  (settlement → ψ = Δ / L)','var(--mut)','middle',600,11.5)}
 ${tx(240,208,'M_AB = FEM_AB + (2EI/L)·(2θ_A + θ_B − 3ψ)','var(--fg)','middle',700,13)}`);
D.cross=svg(`${ttl('Hardy Cross (1930): moment distribution')}<path d="M240 125H110M240 125H370M240 125V50" stroke="var(--ac)" stroke-width="7" stroke-linecap="butt"/>${dot(240,125,8)}${tx(150,112,'k₁',BL,'middle',700,13)}${tx(330,112,'k₂',BL,'middle',700,13)}${tx(254,84,'k₃',BL)}<path d="M214 144a28 28 0 1 0 52 0" stroke="${LD}" stroke-width="3"/>${tx(240,196,'unbalanced M',LD,'middle',700,12)}${arr(160,150,120,150,RX,2.4)}${arr(320,150,360,150,RX,2.4)}${tx(140,170,'½ carry-over',RX,'middle',500,11)}${tx(340,170,'½ carry-over',RX,'middle',500,11)}${eqn('DF = k_i / Σk      M_i = −DF_i · M_unbalanced',238)}`);
D.plastic=svg(`${ttl('Plastic analysis: from elastic to a collapse mechanism')}${[0,1,2].map(i=>{const cx=95+i*150,top=i==0?`${cx} 40L${cx+40} 40L${cx} 95Z`:i==1?`${cx} 40L${cx+40} 40L${cx+40} 62L${cx} 95Z`:`${cx} 40L${cx+40} 40L${cx+40} 95L${cx} 95Z`,bot=i==0?`${cx} 95L${cx} 150L${cx-40} 150Z`:i==1?`${cx} 95L${cx} 150L${cx-40} 150L${cx-40} 128Z`:`${cx} 95L${cx} 150L${cx-40} 150L${cx-40} 95Z`;
 return`<path d="M${cx} 30V160" stroke="var(--mut)" stroke-width="1.2"/><path d="M${cx-40} 95H${cx+40}" stroke="var(--mut)" stroke-dasharray="3 3" stroke-width="1.2"/><path d="M${top}" fill="color-mix(in srgb,${LD} 28%,transparent)" stroke="${LD}"/><path d="M${bot}" fill="color-mix(in srgb,${BL} 28%,transparent)" stroke="${BL}"/>`}).join('')}
 ${tx(95,184,'elastic','var(--mut)','middle',600,12)}${tx(245,184,'yielding spreads','var(--mut)','middle',600,12)}${tx(395,184,'fully plastic: M_p','var(--mut)','middle',600,12)}${eqn('M_p = Z · fy      collapse:  Σ M_p·θ = Σ w·δ',226)}`);
D.matrix=svg(`${ttl('Matrix analysis: the structure as one big system')}<g transform="translate(40 50)">${[0,1,2,3,4,5].map(r=>[0,1,2,3,4,5].map(c=>`<rect x="${c*22}" y="${r*22}" width="20" height="20" fill="${Math.abs(r-c)<2?'color-mix(in srgb,var(--ac) 45%,transparent)':'var(--bg)'}" stroke="var(--bd)"/>`).join('')).join('')}</g>${tx(100,200,'K  (banded, symmetric)','var(--mut)','middle',600,11.5)}
 <g transform="translate(200 50)">${[0,1,2,3,4,5].map(r=>`<rect x="0" y="${r*22}" width="20" height="20" fill="color-mix(in srgb,${BL} 40%,transparent)" stroke="var(--bd)"/>`).join('')}${tx(10,150,'u','var(--mut)','middle',700,13)}</g>${tx(250,115,'=','var(--fg)','middle',700,22)}<g transform="translate(270 50)">${[0,1,2,3,4,5].map(r=>`<rect x="0" y="${r*22}" width="20" height="20" fill="color-mix(in srgb,${LD} 40%,transparent)" stroke="var(--bd)"/>`).join('')}${tx(10,150,'F','var(--mut)','middle',700,13)}</g>
 <path d="M340 90L400 60L440 110L400 150Z" fill="none" stroke="var(--ac)" stroke-width="2.4"/><path d="M340 90L400 110L440 110M400 60L400 110L400 150" stroke="var(--ac)" stroke-width="1.6"/>${dot(340,90,3.5)}${dot(400,60,3.5)}${dot(440,110,3.5)}${dot(400,150,3.5)}${dot(400,110,3.5)}${eqn('[ K ] { u } = { F }',238)}`);
D.fem=svg(`${ttl('Finite elements: a continuum cut into simple pieces')}<path d="M60 60H420V190H60Z" fill="none" stroke="var(--fg)"/>${(()=>{let s='';const n=9,m=5;for(let i=0;i<=n;i++)s+=`<path d="M${60+i*40} 60V190" stroke="var(--mut)" stroke-width="1.2"/>`;for(let j=0;j<=m;j++)s+=`<path d="M60 ${60+j*26}H420" stroke="var(--mut)" stroke-width="1.2"/>`;for(let i=0;i<n;i++)for(let j=0;j<m;j++)s+=`<path d="M${60+i*40} ${60+j*26}L${100+i*40} ${86+j*26}" stroke="var(--mut)" stroke-width="1.2"/>`;return s})()}
 <circle cx="240" cy="125" r="32" fill="var(--bg)" stroke="var(--ac)" stroke-width="3"/><path d="M62 60h0" stroke="none"/>${arr(40,125,58,125,LD,3)}${arr(440,125,422,125,LD,3)}${eqn('[ k ] = ∫ [B]ᵀ [D] [B] dV',226)}${tx(240,244,'a stress concentration around the hole, found by computer',  'var(--mut)','middle',500,11.5)}`);
D.today=svg(`${ttl('From hand calculation to software')}${[['1930s','moment','distribution'],['1950s','matrix','methods'],['1960s','finite','elements'],['1970s','general','programs'],['today','BIM, cloud','and AI']].map((a,i)=>{const h=80+i*24,top=200-h;return`<g transform="translate(${26+i*92} 0)"><rect width="80" height="${h}" y="${top}" rx="6" fill="color-mix(in srgb,var(--ac) ${18+i*14}%,var(--bg))" stroke="var(--fg)"/>${tx(40,top+22,a[0],'var(--fg)','middle',700,13)}${tx(40,top+40,a[1],'var(--fg)','middle',500,11)}${tx(40,top+54,a[2],'var(--fg)','middle',500,11)}</g>`}).join('')}${tx(240,232,'The theory stayed the same; the speed and the model size exploded.','var(--mut)','middle',500,12.5)}`);

/* ============================================================ slides */
const F=(a,b)=>[a,b];
const EQ=t=>`<div class="stx-eq">${t}</div>`;
const pt=(file,alt)=>({file,alt,localCredit:''});
const TL=[ // [id, year, name, one-liner] in order of discovery
['archimedes','c. 250 BC','Archimedes','Law of the lever, equilibrium of moments'],
['stevin','1586','Stevin','Composition of forces, the force triangle'],
['galileo','1638','Galileo','First study of the strength of beams'],
['hooke','1678','Hooke','Force is proportional to extension'],
['bernoulli','1691–1705','Jacob Bernoulli','Curvature is proportional to the moment'],
['virtual','1717 / 1788','J. Bernoulli, Lagrange','Principle of virtual work'],
['euler','1744–1757','Euler','Elastica and the buckling load'],
['coulomb','1773','Coulomb','Equilibrium of the beam cross-section'],
['young','1807','Young','The modulus of elasticity'],
['navier','1826','Navier','Bending stress and indeterminate structures'],
['clapeyron','1857','Clapeyron','Three-moment equation'],
['menabrea','1858','Menabrea','Principle of least work'],
['maxwell','1864','Maxwell','Consistent deformations, reciprocity'],
['mohr','1868–1892','Mohr','Mohr’s circle, Williot–Mohr diagram'],
['betti','1872','Betti','Generalised reciprocal theorem'],
['castigliano','1873–1879','Castigliano','Energy theorems for deflection and redundants'],
['slope','1914–1915','Maney, Bendixsen','Slope-deflection method'],
['cross','1930','Hardy Cross','Moment distribution'],
['plastic','1936–1950s','Gvozdev, Baker, Prager','Plastic analysis and limit theorems (first tests 1914)'],
['matrix','1954–1956','Argyris, Turner, Clough','Matrix stiffness method'],
['fem','1960 (roots 1943)','Clough, Courant, Zienkiewicz','Finite element method'],
['today','1970 → today','Wilson and many others','General-purpose software']];
const slides=[
{id:'timeline',title:'Two thousand years in one timeline',kicker:'Start here · Overview',
 lead:'Structural analysis grew from the lever to the computer. Click any row to jump to that theory, or use the arrows to follow the story in order.',
 html:`<div class="stx-tw"><table class="stx-tbl"><thead><tr><th>Year</th><th>Who</th><th>Idea</th></tr></thead><tbody>${TL.map(r=>`<tr data-go="${r[0]}"><td><b>${r[1]}</b></td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody></table></div>`,
 facts:[],note:'Three big eras: <b>equilibrium and strength of materials</b> (to 1850), <b>force and energy methods</b> (1850–1930) and <b>matrix and computer methods</b> (since 1950).'},
{id:'archimedes',title:'The law of the lever',kicker:'c. 250 BC · Equilibrium',
 lead:'The oldest structural principle: a body is in balance when the turning effects of the forces about any point cancel.',
 symbol:D.archimedes,symbolTab:'Diagram',photos:[pt('hist-archimedes.jpg','Portrait of Archimedes')],photoTab:'Portrait',
 symbolCap:'The heavy force acts on the short arm, the light force on the long arm.',
 facts:[F('Who','<b>Archimedes of Syracuse</b> (c. 287 – c. 212 BC), Greek mathematician and engineer. His work <i>On the Equilibrium of Planes</i> treats the lever and the centre of gravity as geometry, and he also founded hydrostatics.'),
  F('The idea','Forces balance when their moments about the fulcrum are equal and opposite.'),
  F('Key equation',EQ('F₁ · a = F₂ · b        (ΣM = 0)')),
  F('Why it still matters','Every analysis in STRUXA begins with equilibrium: ΣFx = 0, ΣFy = 0, ΣM = 0.')]},
{id:'stevin',title:'Composition of forces',kicker:'1586 · Statics',
 lead:'Forces can be added like arrows: two forces can be replaced by one resultant, and one force can be split into components.',
 symbol:D.stevin,symbolTab:'Diagram',photos:[pt('hist-stevin.jpg','Portrait of Simon Stevin')],photoTab:'Portrait',
 facts:[F('Who','<b>Simon Stevin</b> (1548–1620), Flemish mathematician and engineer, born in Bruges. In <i>De Beghinselen der Weeghconst</i> (1586) he used the inclined plane to show that forces combine in a triangle. He also introduced decimal fractions in Europe.'),
  F('The idea','The parallelogram (or triangle) of forces, later stated clearly by Newton and Varignon (1687).'),
  F('Key equation',EQ('R = √(F₁² + F₂² + 2·F₁·F₂·cos α)\nFx = F·cos θ ,  Fy = F·sin θ')),
  F('Why it still matters','Resolving forces into x and y components is the first step of the method of joints for trusses.')]},
{id:'galileo',title:'The strength of beams',kicker:'1638 · Strength of materials',
 lead:'Galileo asked a new question: how strong is a beam, and why can a giant not be built by simply scaling up a small structure?',
 symbol:D.galileo,symbolTab:'Diagram',photos:[pt('hist-galileo.jpg','Portrait of Galileo Galilei')],photoTab:'Portrait',
 facts:[F('Who','<b>Galileo Galilei</b> (1564–1642), Italian scientist. <i>Discorsi … intorno a due nuove scienze</i> (1638) was written while he was under house arrest and founded the science of strength of materials.'),
  F('The idea','The strength of a cantilever depends on the width and on the <b>square of the depth</b>. Weight grows with volume but strength only with area, so larger structures are relatively weaker (the square–cube law).'),
  F('Key equation',EQ('resisting moment  ∝  b · h²\n(Galileo’s constant was wrong: he assumed uniform tension, giving b·h²/2 instead of the elastic b·h²/6)')),
  F('Why it still matters','It explains why beams are deep, not wide: stiffness and strength grow fastest with depth.')]},
{id:'hooke',title:'Hooke’s law',kicker:'1678 · Elasticity',
 lead:'For small movements, the force needed is directly proportional to the extension. Almost all structural analysis rests on this linear rule.',
 symbol:D.hooke,symbolTab:'Diagram',photos:[pt('hist-hooke.jpg','Portrait of Robert Hooke')],photoTab:'Portrait',
 facts:[F('Who','<b>Robert Hooke</b> (1635–1703), English polymath. He found the law in 1660, published the anagram in 1676 and the solution “ut tensio, sic vis” (as the extension, so the force) in 1678.'),
  F('The idea','A spring or a bar behaves linearly as long as it is not stretched too far.'),
  F('Key equation',EQ('F = k · x\nσ = E · ε        (stress = modulus × strain)')),
  F('Why it still matters','Linear elasticity is the basis of superposition and of every analysis method in STRUXA.')]},
{id:'bernoulli',title:'The elastic curve of a beam',kicker:'1691–1705 · Beam theory',
 lead:'When a beam bends, how curved is it? The answer links the moment to the shape of the beam.',
 symbol:D.bernoulli,symbolTab:'Diagram',photos:[pt('hist-jacob-bernoulli.jpg','Portrait of Jacob Bernoulli')],photoTab:'Portrait',
 facts:[F('Who','<b>Jacob (Jakob) Bernoulli</b> (1654–1705), Swiss mathematician from Basel, studied the “elastica” between 1691 and 1705 and proposed that curvature is proportional to the bending moment. Euler and Daniel Bernoulli completed it into the Euler–Bernoulli beam theory in the 18th century.'),
  F('The idea','Plane sections remain plane and perpendicular to the axis; curvature is proportional to the moment.'),
  F('Key equation',EQ('1/ρ = M / (E·I)\nE·I·w″ = M        E·I·w⁗ = q')),
  F('Why it still matters','Slope-deflection and moment-area methods, and the stiffness 4EI/L of a beam, all come from this equation.')]},
{id:'virtual',title:'The principle of virtual work',kicker:'1717 / 1788 · Energy and equilibrium',
 lead:'A structure is in equilibrium if the work of the real forces on any small imaginary displacement is zero. It became the master tool of structural mechanics.',
 symbol:D.virtual,symbolTab:'Diagram',photos:[pt('hist-lagrange.jpg','Portrait of Joseph-Louis Lagrange'),pt('hist-johann-bernoulli.jpg','Portrait of Johann Bernoulli')],photoTab:'Portraits',
 facts:[F('Who','<b>Johann Bernoulli</b> (1667–1748) stated the principle of virtual velocities in a letter of 1717. <b>Joseph-Louis Lagrange</b> (1736–1813) made it the foundation of his <i>Mécanique analytique</i> (1788).'),
  F('The idea','External virtual work equals internal virtual work. Choosing a convenient virtual state gives any displacement or force.'),
  F('Key equation',EQ('δW_ext = δW_int\nδ = Σ N·n·L/(E·A)   (trusses)\nδ = ∫ M·m/(E·I) dx   (beams)')),
  F('Why it still matters','The unit-load method and the stiffness matrix are both derived from virtual work.')]},
{id:'euler',title:'Elastica and the buckling load',kicker:'1744–1757 · Stability',
 lead:'Euler solved the exact shape of a bent bar and discovered that a slender column fails by sudden buckling.',
 symbol:D.euler,symbolTab:'Diagram',photos:[pt('hist-euler.jpg','Portrait of Leonhard Euler')],photoTab:'Portrait',
 facts:[F('Who','<b>Leonhard Euler</b> (1707–1783), Swiss mathematician who worked in Berlin and St Petersburg, one of the most prolific mathematicians ever. His <i>Methodus inveniendi</i> (1744) contains the elastica; the column formula followed around 1757.'),
  F('The idea','At a critical load the straight form is no longer stable; the column bows sideways.'),
  F('Key equation',EQ('P_cr = π²·E·I / (K·L)²\nslenderness  λ = K·L / r')),
  F('Why it still matters','Buckling, not strength, governs most slender compression members (see the Failure Modes lesson).')]},
{id:'coulomb',title:'Equilibrium of the cross-section',kicker:'1773 · Bending theory',
 lead:'Coulomb put the neutral axis in the right place: the compressive and tensile forces on a cut section must balance, and their couple equals the moment.',
 symbol:D.coulomb,symbolTab:'Diagram',photos:[pt('hist-coulomb.jpg','Portrait of Charles-Augustin de Coulomb')],photoTab:'Portrait',
 facts:[F('Who','<b>Charles-Augustin de Coulomb</b> (1736–1806), French military engineer. His 1773 memoir (published 1776) analysed beam bending and shear, and gave rules for earth pressure and friction. He is also known for the law of electrostatic force.'),
  F('The idea','Cut the beam and apply equilibrium to one side: the normal forces sum to zero and their moment equals the bending moment.'),
  F('Key equation',EQ('∫ σ dA = 0        ∫ σ · y dA = M')),
  F('Why it still matters','The same cut-and-balance logic gives the internal forces N, V and M in every STRUXA diagram.')]},
{id:'young',title:'The modulus of elasticity',kicker:'1807 · Material stiffness',
 lead:'Young separated the stiffness of the material from the size of the specimen: one number describes how stiff steel or concrete is.',
 symbol:D.young,symbolTab:'Diagram',photos:[pt('hist-young.jpg','Portrait of Thomas Young')],photoTab:'Portrait',
 facts:[F('Who','<b>Thomas Young</b> (1773–1829), English physician and physicist who also helped decipher the Rosetta Stone. In 1807 he defined the “modulus of elasticity”, now named after him.'),
  F('The idea','The ratio of stress to strain is a property of the material, independent of the size of the member.'),
  F('Key equation',EQ('E = σ / ε\naxial stiffness  E·A / L        bending stiffness  E·I')),
  F('Why it still matters','Every stiffness in STRUXA (EA, EI) comes from this number.')]},
{id:'navier',title:'The birth of structural analysis',kicker:'1826 · Navier',
 lead:'Navier turned scattered results into one consistent theory and solved the first statically indeterminate structures by adding compatibility to equilibrium.',
 symbol:D.navier,symbolTab:'Diagram',photos:[pt('hist-navier.jpg','Portrait of Claude-Louis Navier')],photoTab:'Portrait',
 facts:[F('Who','<b>Claude-Louis Navier</b> (1785–1836), French engineer and professor at the École des Ponts et Chaussées. His 1826 <i>Résumé des leçons</i> is often called the first textbook of modern structural analysis. His Pont des Invalides suspension bridge in Paris had to be dismantled in 1826 because of foundation problems.'),
  F('The idea','Stress varies linearly with the distance from the neutral axis; extra supports are handled by requiring that deformations fit.'),
  F('Key equation',EQ('σ = M·y / I')),
  F('Why it still matters','The flexure formula is the starting point of every bending check; the compatibility idea is behind all indeterminate methods.')]},
{id:'clapeyron',title:'The three-moment equation',kicker:'1857 · Continuous beams',
 lead:'For a beam on many supports, the bending moments at three neighbouring supports are tied together by a single equation.',
 symbol:D.clapeyron,symbolTab:'Diagram',photos:[pt('hist-clapeyron.jpg','Portrait of Émile Clapeyron')],photoTab:'Portrait',
 facts:[F('Who','<b>Émile Clapeyron</b> (1799–1864), French engineer and physicist, also known for the Clausius–Clapeyron relation in thermodynamics. He published the equation in 1857; the French engineer Bertot had described it in 1855.'),
  F('The idea','Write the compatibility of slopes at each interior support; the unknowns are the support moments.'),
  F('Key equation',EQ('M_A·L₁ + 2·M_B·(L₁ + L₂) + M_C·L₂ = −(w₁·L₁³ + w₂·L₂³) / 4\n(uniform loads, supports at equal level)')),
  F('Why it still matters','It was the standard hand method for continuous beams and bridges for 70 years, until moment distribution replaced it.')]},
{id:'menabrea',title:'The principle of least work',kicker:'1858 · Energy methods',
 lead:'An indeterminate structure chooses its redundant forces so that the strain energy stored in it is as small as possible.',
 symbol:D.menabrea,symbolTab:'Diagram',photos:[pt('hist-menabrea.jpg','Portrait of Luigi Federico Menabrea')],photoTab:'Portrait',
 facts:[F('Who','<b>Luigi Federico Menabrea</b> (1809–1896), Italian general, engineer and mathematician, and later Prime Minister of Italy (1867–69). He also wrote the first description of Babbage’s Analytical Engine (1842).'),
  F('The idea','Among all force systems that satisfy equilibrium, the real one makes the strain energy a minimum.'),
  F('Key equation',EQ('∂U / ∂R = 0        (R = redundant force)')),
  F('Why it still matters','It opened the way to the energy methods of Castigliano and to modern variational methods.')]},
{id:'maxwell',title:'Consistent deformations and reciprocity',kicker:'1864 · The force (flexibility) method',
 lead:'Remove the redundant forces, compute the displacements, and then restore the forces so that the original supports are respected.',
 symbol:D.maxwell,symbolTab:'Diagram',photos:[pt('hist-maxwell.jpg','Portrait of James Clerk Maxwell')],photoTab:'Portrait',
 facts:[F('Who','<b>James Clerk Maxwell</b> (1831–1879), Scottish physicist famous for electromagnetism. His 1864 paper <i>On the calculation of the equilibrium and stiffness of frames</i> gave the first general method for indeterminate trusses and the reciprocal theorem. Luigi Cremona (1872) completed the graphical force diagram for trusses.'),
  F('The idea','The deflection at <i>i</i> caused by a unit load at <i>j</i> equals the deflection at <i>j</i> caused by a unit load at <i>i</i>.'),
  F('Key equation',EQ('δ_ij = δ_ji\n[ f ] { X } = − { Δ }        (compatibility equations)')),
  F('Why it still matters','The flexibility matrix is symmetric because of this theorem, and so is the stiffness matrix.')]},
{id:'betti',title:'Betti’s reciprocal theorem',kicker:'1872 · Reciprocity',
 lead:'Maxwell’s idea in full generality: for any two load systems on the same elastic structure, each does as much work on the displacements of the other.',
 symbol:D.betti,symbolTab:'Diagram',photos:[pt('hist-betti.jpg','Portrait of Enrico Betti')],photoTab:'Portrait',
 facts:[F('Who','<b>Enrico Betti</b> (1823–1892), Italian mathematician (Pisa), who contributed to algebra, topology and elasticity. He published the theorem in 1872.'),
  F('The idea','The work done by system 1 acting through the displacements of system 2 equals the work done by system 2 through the displacements of system 1.'),
  F('Key equation',EQ('Σ P₁ · δ₂ = Σ P₂ · δ₁')),
  F('Why it still matters','Basis of influence lines (Müller-Breslau) and of the symmetry of stiffness matrices.')]},
{id:'castigliano',title:'Castigliano’s energy theorems',kicker:'1873–1879 · Energy methods',
 lead:'Take the derivative of the strain energy with respect to a load and you get the displacement under it. Take it with respect to a redundant and you get zero.',
 symbol:D.castigliano,symbolTab:'Diagram',photos:[pt('hist-castigliano.jpg','Portrait of Carlo Alberto Castigliano')],photoTab:'Portrait',
 facts:[F('Who','<b>Carlo Alberto Castigliano</b> (1847–1884), Italian engineer born in Asti. He presented the theorems in his 1873 degree thesis at the Turin Polytechnic, worked for the Northern Italian railways, and gathered everything in <i>Théorie de l’équilibre des systèmes élastiques</i> (1879). He died aged only 36.'),
  F('The idea','Second theorem: the partial derivative of the strain energy with respect to a force is the displacement in the direction of that force.'),
  F('Key equations',EQ('δ_i = ∂U / ∂P_i        θ_i = ∂U / ∂M_i\nU = ∫ M²/(2EI) dx + Σ N²L/(2EA)\n∂U / ∂R = 0   (redundant R)')),
  F('Why it still matters','A fast way to find deflections of trusses, beams and frames by hand, and the energy origin of the stiffness method.')]},
{id:'mohr',title:'Mohr: circles and displacement diagrams',kicker:'1868–1892 · Graphical methods',
 lead:'Mohr gave engineers pictures for stress and for displacements, tools that were used for a century before computers.',
 symbol:D.mohr,symbolTab:'Diagram',photos:[pt('hist-mohr.jpg','Portrait of Christian Otto Mohr')],photoTab:'Portrait',
 facts:[F('Who','<b>Christian Otto Mohr</b> (1835–1918), German civil engineer and professor in Stuttgart and Dresden. He proposed the stress circle (1882), the Williot–Mohr diagram for truss displacements (1887) and the analogy between deflection and a loaded beam (1868).'),
  F('The idea','The stresses on all planes through a point lie on a circle; a truss deflects by small rotations of its bars, which can be drawn.'),
  F('Key equation',EQ('(σ − σ_m)² + τ² = R²\nσ_m = (σ₁ + σ₂)/2 ,  R = (σ₁ − σ₂)/2')),
  F('Why it still matters','Mohr’s circle is still the standard way to find principal stresses and failure planes.')]},
{id:'slope',title:'The slope-deflection method',kicker:'1914–1915 · Displacement method for frames',
 lead:'The unknowns are the rotations of the joints. Each member end moment is written in terms of them, and equilibrium of each joint gives the equations.',
 symbol:D.slope,symbolTab:'Diagram',photos:[pt('hist-maney.jpg','Portrait of George A. Maney'),pt('hist-bendixsen.jpg','Portrait of Axel Bendixsen')],photoTab:'Portraits',
 facts:[F('Who','<b>George A. Maney</b> (University of Minnesota, 1915) published the method in its modern form, building on Mohr (1892) and on <b>Axel Bendixsen</b>, who published the same idea in Germany in 1914.'),
  F('The idea','End moments depend on the rotations of both ends and on the chord rotation ψ caused by settlement or sway.'),
  F('Key equation',EQ('M_AB = FEM_AB + (2EI/L)·(2θ_A + θ_B − 3ψ)\nΣ M = 0 at every joint')),
  F('In STRUXA','Slope Deflection is one of the methods of the Continuous Beam and the Frame modules, and the report shows every equation.')]},
{id:'cross',title:'Moment distribution',kicker:'1930 · Hardy Cross',
 lead:'Instead of solving equations, release the joints one by one and spread the unbalanced moment among the members until nothing is left.',
 symbol:D.cross,symbolTab:'Diagram',photos:[pt('hist-cross.jpg','Portrait of Hardy Cross')],photoTab:'Portrait',
 facts:[F('Who','<b>Hardy Cross</b> (1885–1959), American structural engineer and professor at the University of Illinois and later at Yale. His 1930 paper <i>Analysis of continuous frames by distributing fixed-end moments</i> is widely regarded as one of the most important advances in the analysis of indeterminate structures. He also invented the pipe-network method.'),
  F('The idea','Lock all joints, release them one at a time, distribute the unbalanced moment by stiffness, carry half to the far end, repeat.'),
  F('Key equations',EQ('DF_i = k_i / Σ k       (k = 4EI/L, or 3EI/L if the far end is pinned)\ncarry-over factor = ½')),
  F('In STRUXA','Moment Distribution is available in the beam and frame modules, with each cycle of the table in the report.')]},
{id:'plastic',title:'Plastic analysis and limit theorems',kicker:'1936–1950s · Beyond elasticity',
 lead:'Real steel yields and redistributes moments. Plastic analysis finds the load at which enough hinges form to produce a collapse mechanism.',
 symbol:D.plastic,symbolTab:'Diagram',photos:[pt('hist-kazinczy.jpg','Portrait of Gábor Kazinczy'),pt('hist-baker.jpg','Portrait of John Baker')],photoTab:'Portraits',
 facts:[F('Who','<b>Gábor Kazinczy</b> (Hungary) tested clamped-end beams in 1914 and showed that they carry more than the elastic limit. <b>John Baker</b> (Cambridge, 1930s onwards) developed plastic design of steel frames. <b>A. A. Gvozdev</b> (USSR, 1936) stated the limit theorems, proved by Prager and others in the 1950s.'),
  F('The idea','Lower-bound (static) theorem: any load that can be balanced by an admissible moment field is safe. Upper-bound (kinematic) theorem: any mechanism gives a load that is too high or exact.'),
  F('Key equation',EQ('M_p = Z · fy        shape factor  S = Z / W_el\ncollapse:  Σ M_p·θ = Σ P·δ')),
  F('See also','The “Plastic hinges and collapse mechanisms” slide of the Failure Modes lesson.')]},
{id:'matrix',title:'Matrix methods',kicker:'1954–1956 · The computer era begins',
 lead:'Write the whole structure as one set of linear equations, assemble it member by member, and let the computer solve it.',
 symbol:D.matrix,symbolTab:'Diagram',photos:[pt('hist-argyris.jpg','Portrait of John Argyris'),pt('hist-turner.jpg','Portrait of M. J. Turner'),pt('hist-clough.jpg','Portrait of Ray Clough')],photoTab:'Portraits',
 facts:[F('Who','<b>John Argyris</b> (Imperial College, 1954–55) and <b>M. J. Turner, R. W. Clough, H. C. Martin and L. J. Topp</b> (1956, Boeing and Berkeley) developed the matrix stiffness method for aircraft and civil structures. Gabriel Kron (1939) had prepared the ground with network analysis.'),
  F('The idea','Every member has a small stiffness matrix. Adding them at the joints gives the structure matrix K, partitioned into free and restrained parts and solved.'),
  F('Key equation',EQ('[ K ] { u } = { F }\n[ K_ff ] { u_f } = { P_f } − [ K_fr ] { u_r }\n{ R } = [ K_rf ] { u_f } + [ K_rr ] { u_r } − { P_r }')),
  F('In STRUXA','The Plane Truss module’s <b>Matrix stiffness method</b> writes every one of these matrices in the Word report.')]},
{id:'fem',title:'The finite element method',kicker:'1960 (roots 1943) · From structures to everything',
 lead:'Cut any continuous body into small elements, treat each like a member, and the same matrix machinery solves plates, shells, soils, heat and fluids.',
 symbol:D.fem,symbolTab:'Diagram',photos:[pt('hist-courant.jpg','Portrait of Richard Courant'),pt('hist-clough.jpg','Portrait of Ray Clough'),pt('hist-zienkiewicz.jpg','Portrait of Olgierd Zienkiewicz')],photoTab:'Portraits',
 facts:[F('Who','<b>Richard Courant</b> (1943) used piecewise functions on triangles to solve a torsion problem. <b>Ray Clough</b> named the “finite element method” in 1960 while working at Berkeley. <b>Olgierd Zienkiewicz</b> wrote the first textbook (1967) and spread it into every branch of engineering.'),
  F('The idea','Approximate the unknown field inside each element by simple shape functions, then assemble like a truss.'),
  F('Key equation',EQ('[ k ] = ∫ [B]ᵀ [D] [B] dV\n[ K ] { u } = { F }')),
  F('Why it matters','Slabs, shells, walls, tunnels and foundations are analysed today almost only by finite elements.')]},
{id:'today',title:'From punched cards to the cloud',kicker:'1970 → today · Software',
 lead:'The theory of the 20th century is now inside software. The engineer’s job has moved from computing to modelling, checking and judgement.',
 symbol:D.today,symbolTab:'Diagram',photos:[pt('hist-wilson.jpg','Portrait of Edward Wilson')],photoTab:'Portrait',
 facts:[F('Milestones','<b>Edward L. Wilson</b> (Berkeley) released SAP in 1970, the ancestor of today’s general-purpose structural programs. Since then: graphical interfaces, nonlinear and dynamic analysis, BIM models and optimisation.'),
  F('What did not change','Equilibrium, compatibility and the stress–strain law, the three ingredients of every method on this timeline.'),
  F('Why STRUXA shows the steps','A program gives numbers; understanding the method lets you detect when they are wrong. That is why STRUXA writes the matrices and equations in its reports.')],
 note:'A good engineer can check any computer result with a quick hand calculation from this lesson.'},
{id:'summary',title:'Summary: methods and what they solve',kicker:'Review',
 lead:'Most methods fall into three families: those based on equilibrium, on forces and compatibility, and on displacements.',
 html:`<div class="stx-tw"><table class="stx-tbl"><thead><tr><th>Family</th><th>Methods</th><th>Unknowns</th></tr></thead><tbody>
 <tr><td><b>Equilibrium</b></td><td>Statics, sections, method of joints</td><td>Reactions and member forces (determinate)</td></tr>
 <tr><td><b>Force / flexibility</b></td><td>Three moments, consistent deformations, Castigliano, least work</td><td>Redundant forces</td></tr>
 <tr><td><b>Displacement / stiffness</b></td><td>Slope-deflection, moment distribution, matrix stiffness, finite elements</td><td>Joint rotations and displacements</td></tr>
 <tr><td><b>Energy and virtual work</b></td><td>Unit load, Castigliano, Rayleigh–Ritz</td><td>Deflections</td></tr>
 <tr><td><b>Plastic</b></td><td>Collapse mechanisms, limit theorems</td><td>Collapse load</td></tr></tbody></table></div>`,
 facts:[F('Choosing a method','Hand: slope-deflection or moment distribution for small frames, unit load for deflections. Computer: matrix stiffness for any truss or frame, finite elements for plates and solids.'),
  F('Next step','Open <b>Structural Analysis</b> and solve the same problem with two different methods; the results must agree.')]}
];

const ORDER=['timeline',...TL.map(r=>r[0]),'summary'];slides.sort((a,b)=>ORDER.indexOf(a.id)-ORDER.indexOf(b.id));
STX.register({id:'history',title:'Structural Analysis History',desc:'From Archimedes’ lever to the finite element method: the theories in order of discovery, with their equations and the people who created them.',
 icon:'<svg viewBox="0 0 150 88" width="170" height="100" fill="none" stroke="var(--fg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 66h122" stroke="var(--mut)"/><path d="M26 66V40M52 66V28M80 66V46M106 66V22M130 66V34" stroke="var(--ac)" stroke-width="5" stroke-linecap="butt"/><circle cx="26" cy="34" r="5" fill="var(--card)"/><circle cx="52" cy="22" r="5" fill="var(--card)"/><circle cx="80" cy="40" r="5" fill="var(--card)"/><circle cx="106" cy="16" r="5" fill="var(--card)"/><circle cx="130" cy="28" r="5" fill="var(--card)"/></svg>',
 slides});
})();
