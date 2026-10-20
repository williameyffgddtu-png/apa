/* Modo Halloween — carregar DEPOIS de paginaincial.js. Sem este arquivo, o site funciona normal.
   A coruja (com chapéu de bruxa), as videiras/abóboras do bloco de notas e o pedido de registro
   ficam no paginaincial.js; aqui só se liga o chapéu (coruja.hat) e se redesenha a decoração (padDeco). */
let hw=0,hN=0,hO=0,hdy=0,svN=night;
/* posições (ajuste se algo não encaixar): janela1, janela2, porta, lixeira */
const CAB={wx:36,wy:101,vx:90,vy:101,dx:66,dy:104,tx:150,ty:GY+12};
/* noite mais clara */
const PH={s:['#1b0d30','#281548','#38205a','#4e2c66','#6e3a72','#92484e'],f:'#26143a',m:'#38205a',t:'#4e2c78',hl:'#8a3a90',sh:'#1f1030',g:['#2a1c46','#38246a','#8a52c0','#1a1030'],b:['#38204c','#502c6c','#74388e'],bo:'#1c0a28',lf:['#341a50','#4e2a72','#8a4eb4','#b870dc'],k:['#1c1224','#2e2034','#4c3250'],pad:['#4c1a60','#8a3a9c'],st:PN.st,fl:['#ff7a1a','#ffa43a','#c85a10','#ffd080','#a050e0','#ff5a3a']};
/* DIA: roxo nublado e mórbido, um pouco mais claro */
const PHD={s:['#7a7090','#8a80a0','#9a90b0','#aaa0be','#bcb2cc','#cec6da'],f:'#a898c0',m:'#8a76aa',t:'#6a5690',hl:'#9a82c0',sh:'#4a3868',g:['#54476c','#645484','#9470bc','#3c3054'],b:['#483860','#5e4a84','#7e62aa'],bo:'#2c1e44',lf:['#483860','#5e4a84','#8260ac','#a482cc'],k:['#362848','#4c3a64','#6a5084'],pad:['#523a72','#8260ac'],st:['#8a7a9e','#625678','#483e5c'],fl:PH.fl};
/* abóboras: [x, y(base), escala]. As 3 últimas são da cabana */
const HWP=[[34,GY+16,1],[62,GY+32,.8],[14,GY+34,1.1],[112,GY+42,.9],[196,GY+43,.8],[236,GY+20,1],[300,GY+36,1.1],[46,GY+4,.85],[104,GY+4,.7],[64,66,.7]];
const NH=['#e8761a','#8a3ad0','#3f8f3a','#c8504a','#ff9a2a','#5a2a90'];
const CB=[...Array(11)].map((_,i)=>[14+i*10,93+Math.round(Math.sin(i*1.3)*1.5+1)]);
const CANDLES=[[216,GY+41],[279,GY+43]];

/* ---------- decoração do cenário (desenhada uma vez no build) ---------- */
function pump(x,y,s){const o=a=>Math.round(a*s),Y=hdy?'#2a1408':'#ffe866';ell(x,y,o(8),2,'rgba(0,0,0,.3)');ell(x,y-o(5),o(7.5),o(5.5),'#7a3008');ell(x,y-o(5),o(6.5),o(4.7),'#e8761a');ell(x-o(3),y-o(5),o(3),o(4.7),'#f08a2a');ell(x+o(3.5),y-o(5),o(3),o(4.7),'#d8660e');R(x-o(3),y-o(9),1,o(8),'#b0510a');R(x+o(3),y-o(9),1,o(8),'#b0510a');R(x-1,y-o(11),2,o(3),'#3f6a2a');R(x+1,y-o(11),2,1,'#3f6a2a');R(x-o(4),y-o(7),o(2)+1,o(2)+1,Y);R(x+o(2),y-o(7),o(2)+1,o(2)+1,Y);R(x-o(3),y-o(3),o(6),1,Y);R(x-o(2),y-o(2),1,1,Y);R(x+o(1),y-o(2),1,1,Y)}
function tomb(x,y){R(x-6,y-1,12,2,'#3a3a54');R(x-5,y-12,10,11,'#5a5a78');ell(x,y-12,5,3,'#5a5a78');R(x-5,y-12,2,11,'#7a7a98');R(x-1,y-11,2,6,'#2a2a40');R(x-3,y-9,6,2,'#2a2a40');R(x+2,y-3,3,1,'#3f6a4a')}
function ln(x1,y1,x2,y2,k){const n=Math.max(Math.abs(x2-x1),Math.abs(y2-y1))||1;for(let i=0;i<=n;i++)R(x1+(x2-x1)*i/n,y1+(y2-y1)*i/n,1,1,k)}
function web(x,y,sx,sy){const k='rgba(225,220,240,.75)';ln(x,y,x+sx*18,y,k);ln(x,y,x,y+sy*18,k);ln(x,y,x+sx*13,y+sy*13,k);[5,9,14].forEach(d=>{ln(x+sx*d,y,x+sx*d*.7,y+sy*d*.7,k);ln(x+sx*d*.7,y+sy*d*.7,x,y+sy*d,k)})}
/* interior visível pela janela: k=0 prateleira com poções e gato, k=1 bruxa mexendo o caldeirão */
function room(x,y,k,on){const K='#0e0718',F='#2a1408';
  R(x-6,y-6,12,12,on?'#ffcf7a':'#6a5a70');R(x-4,y-4,8,6,on?'#ffe6a8':'#7a6a82');
  if(k==0){R(x-6,y+1,12,1,'#4a2a10');R(x-5,y-2,2,3,'#7ae04a');R(x-1,y-3,2,4,'#b070ff');R(x+3,y-2,2,3,'#ff5a3a');
    R(x,y-6,1,1,K);R(x-1,y-5,3,2,'#ff7a1a');R(x+2,y+3,4,3,K);R(x+2,y+2,1,1,K);R(x+5,y+2,1,1,K)}
  else{R(x-3,y-3,7,1,K);R(x-1,y-5,3,2,K);R(x,y-6,1,1,K);R(x-1,y-2,3,3,K);R(x-2,y+1,5,5,K);ln(x+3,y+1,x+5,y+5,'#6a3a18');R(x-6,y+4,3,2,on?'#7ae04a':'#3a5a3a')}
  R(x-6,y-6,2,9,'#7a1a5a');R(x+4,y-6,2,9,'#7a1a5a');
  R(x-7,y-7,14,1,F);R(x-7,y+6,14,1,F);R(x-7,y-7,1,14,F);R(x+6,y-7,1,14,F);R(x-8,y+7,16,2,F);
  R(x+5,y+4,2,3,'#f0e8d0');if(on)R(x+5,y+3,1,1,'#ffb040')}
function cab2(on){const {wx,wy,vx,vy,dx,dy}=CAB;
  room(wx,wy,0,on);room(vx,vy,1,on);web(wx-7,wy-7,1,1);
  /* guirlanda da porta, lanternas, caldeirão e vassoura */
  for(let a=0;a<12;a++)R(dx+Math.round(Math.cos(a/12*6.28)*5),dy+8+Math.round(Math.sin(a/12*6.28)*5),2,2,a%3?'#3f6a2a':'#ff8a1a');
  R(dx-1,dy+12,3,2,'#b070ff');R(dx-3,dy+13,2,2,'#b070ff');R(dx+2,dy+13,2,2,'#b070ff');
  R(dx-10,dy+1,3,5,on?'#ff9a2a':'#7a4a1a');R(dx+8,dy+1,3,5,on?'#ff9a2a':'#7a4a1a');R(dx-10,dy,3,1,'#0e0718');R(dx+8,dy,3,1,'#0e0718');
  const cx=dx+16,cy=GY+6;ell(cx,cy-4,6,4,'#1a1424');R(cx-6,cy-6,12,2,'#2a2438');R(cx-4,cy-7,8,2,on?'#7ae04a':'#4a7a3a');R(cx-5,cy,2,2,'#0e0718');R(cx+3,cy,2,2,'#0e0718');
  ln(121,GY+3,126,GY-14,'#6a3a18');R(119,GY+1,5,4,'#c8a050');R(120,GY+1,3,1,'#8a6a30');
  CB.forEach((p,i)=>R(p[0],p[1]+3,2,3,['#ff8a1a','#8a3ad0','#3f8f3a'][i%3]))}
function trash2(){const {tx:x,ty:y}=CAB,K='#0e0718';
  web(x-6,y-16,1,1);R(x-5,y-15,10,1,'#7ae04a');R(x-4,y-14,1,3,'#7ae04a');R(x+2,y-14,1,4,'#7ae04a');
  R(x-4,y-9,3,3,'#ffe866');R(x+1,y-9,3,3,'#ffe866');R(x-3,y-8,1,2,K);R(x+2,y-8,1,2,K);
  R(x-5,y-5,10,1,K);for(let i=0;i<4;i++)R(x-4+i*2,y-4,1,2,'#fff');R(x-6,y-1,12,1,'#ff8a1a')}
/* velas nos túmulos e caveirinha */
function extras(on){CANDLES.forEach(p=>{R(p[0],p[1]-3,2,3,'#f0e8d0');if(on)R(p[0],p[1]-4,1,1,'#ffb040')});
  const x=242,y=GY+44;R(x-2,y-3,5,3,'#e8e0d0');R(x-1,y,3,1,'#e8e0d0');R(x-1,y-2,1,1,'#14100e');R(x+1,y-2,1,1,'#14100e')}
/* enfeites estáticos da cabana (camada da frente) */
function cabDeco(F){c=F.getContext('2d');const on=!hdy,K='#0e0718',W='#e8ecff',HH='#2a1840';
  for(let i=0;i<CB.length-1;i++)ln(CB[i][0]+1,CB[i][1]+1,CB[i+1][0]+1,CB[i+1][1]+1,'#1a0a28');
  const lc=on?['#ff9a2a','#b070ff','#7ae04a','#ff5a3a']:['#6a4a2a','#4a3a6a','#3a5a3a','#6a3a3a'];
  CB.forEach((p,i)=>{R(p[0],p[1],2,2,lc[i%4]);if(on)R(p[0],p[1],1,1,'#fff6b0')});
  R(51,94,1,4,'#cfc8e0');R(50,98,3,1,W);R(49,99,5,5,W);R(49,104,1,1,W);R(51,104,1,1,W);R(53,104,1,1,W);R(50,100,1,2,K);R(52,100,1,2,K);R(51,102,1,1,K);
  [[42,82],[76,76]].forEach(([x,y])=>{R(x-3,y,2,1,K);R(x-1,y+1,3,1,K);R(x+2,y,2,1,K);R(x-1,y,1,1,K);R(x+1,y,1,1,K)});
  R(83,59,12,2,HH);R(85,55,8,4,HH);R(87,52,5,3,HH);R(88,50,3,2,HH);R(90,48,3,2,HH);R(85,58,8,1,'#ff8a1a');R(88,58,2,1,'#ffe866');R(83,59,1,2,'#4a2c6e');R(85,55,1,4,'#4a2c6e')}
FX.decor=(A,F)=>{
  if(!hdy){c=A.getContext('2d');/* lua VERMELHA */
    circ(214,26,24,'#3a0a14');circ(214,26,20,'#7a1010');circ(214,26,16,'#d42a2a');circ(214,26,14,'#e84a3a');circ(209,22,3,'#b81e1e');circ(219,30,3,'#b81e1e');circ(220,21,2,'#b81e1e');circ(208,31,2,'#c82a2a')}
  c=F.getContext('2d');HWP.forEach(p=>pump(p[0],p[1],p[2]));tomb(226,GY+40);tomb(268,GY+42);web(x0,b-38,1,1);web(x0+CW,b-38,-1,1);cabDeco(F);cab2(!hdy);trash2();extras(!hdy)};

/* ---------- animação por frame ---------- */
const awk=()=>tN>.5; /* gato acordado só à noite, dorme de dia */
FX.tick=()=>{hN+=((hw?1:0)-hN)*.115;if(Math.abs(hN-hw)<.004)hN=hw;hO=hN>.5;
  FX.fog=hO?(tN>.5?'170,110,220':'205,175,230'):undefined;FX.moon=hO?'255,60,60':undefined;FX.nc=hw?NH:undefined;
  FX.cat=hO?fairy:undefined;FX.can=hO?mummy:undefined;FX.frog=hO?frogCol:undefined;FX.fox=hO?vamp:undefined;FX.foxs=hO?vsit:undefined;FX.bat=hO?pbat:undefined;FX.aw=hO?awk:undefined};
FX.layer=i=>{if(hN<=.01)return;const d=1-tN;
  if(d>.01&&BG[3]){c.globalAlpha=hN*d;c.drawImage(BG[3][i],0,0)}
  if(tN>.01&&BG[2]){c.globalAlpha=hN*tN;c.drawImage(BG[2][i],0,0)}
  c.globalAlpha=1};
FX.tint=()=>{if(hN<=.01)return;
  R(0,0,W,H,`rgba(50,0,60,${.06*hN*(.4+.6*tN)})`);          /* noite: roxo leve */
  R(0,0,W,H,`rgba(150,120,220,${.05*hN*tN})`);              /* noite: luar */
  const g=c.createRadialGradient(W/2,H/2,H*.4,W/2,H/2,H*.9);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(10,0,20,${.28*hN})`);
  c.fillStyle=g;c.fillRect(0,0,W,H)};
/* luz: abóboras, lâmpadas, janelas, porta, caldeirão, lixeira, velas (só à noite) */
FX.glow=t=>{const a=hN*tN;if(a<=.01)return;const fl=i=>.8+.2*Math.sin(t/110+i*2)+.08*Math.sin(t/37+i*3),{wx,wy,vx,vy,dx,dy,tx,ty}=CAB;
  HWP.forEach((p,i)=>blob(p[0],p[1]-5*p[2],16*p[2],12*p[2],.45*a*(.8+.2*Math.sin(t/140+i*2)),'255,150,40'));
  CB.forEach((p,i)=>blob(p[0]+1,p[1]+1,7,7,.5*a*(.6+.4*Math.sin(t/180+i*1.9)),['255,150,40','170,100,255','120,255,90','255,90,60'][i%4]));
  [[wx,wy],[vx,vy]].forEach((p,i)=>blob(p[0],p[1],16,14,.75*a*fl(i),'255,175,70'));
  blob(dx,dy+10,16,20,.55*a*fl(2),'255,175,70');blob(dx,GY+6,30,8,.4*a*fl(3),'255,150,40');
  blob(dx-9,dy+3,7,7,.5*a*fl(4),'255,150,40');blob(dx+9,dy+3,7,7,.5*a*fl(5),'255,150,40');
  blob(dx+16,GY-1,10,8,.45*a*fl(6),'120,255,90');blob(tx,ty-8,9,7,.45*a*fl(7),'255,230,100');
  CANDLES.forEach((p,i)=>blob(p[0],p[1]-3,8,8,.5*a*fl(i+8),'255,170,60'))};

/* fantasma pré-desenhado (evita as emendas do desenho com transparência): i = enfeite, w = ondinha */
const GS={};
function gspr(i,w){const k=i+'_'+w;if(GS[k])return GS[k];
  const cv=document.createElement('canvas');cv.width=22;cv.height=26;const g=cv.getContext('2d'),P=(x,y,ww,h,q)=>{g.fillStyle=q;g.fillRect(x,y,ww,h)},X=11,Y=17,B='#e8ecff',K='#14100e';
  P(X-3,Y-10,7,1,B);P(X-4,Y-9,9,1,B);P(X-5,Y-8,11,12,B);
  for(let q=0;q<6;q++)P(X-5+q*2,Y+4+((q+w)%2),q==5?1:2,2,B);
  P(X-7,Y-1,2,2,B);P(X+6,Y-1,2,2,B);
  P(X-3,Y-6,2,3,K);P(X+2,Y-6,2,3,K);P(X-1,Y-2,3,2,K);P(X-4,Y-3,2,1,'#ff9ac0');P(X+3,Y-3,2,1,'#ff9ac0');
  if(i==0){P(X-3,Y-11,7,1,'#8a3ad0');P(X-2,Y-12,5,1,'#ff8a1a');P(X-1,Y-13,3,1,'#8a3ad0');P(X,Y-14,1,1,'#ffe866')}
  else if(i==1){P(X-3,Y-11,7,1,'#ffd84a');P(X-3,Y-13,1,2,'#ffd84a');P(X,Y-13,1,2,'#ffd84a');P(X+3,Y-13,1,2,'#ffd84a');P(X,Y-11,1,1,'#ff3a5a')}
  else{P(X-3,Y+1,2,2,'#ff3a3a');P(X+2,Y+1,2,2,'#ff3a3a');P(X-1,Y+1,3,2,'#aa1020')}
  return GS[k]=cv}
/* mãos de zumbi (só de dia): só duas, bem separadas */
const ZH=[[88,GY+30],[252,GY+40]];
function zhand(x,y,t,i){const G='#6f8f62',D='#3e5a3a',s=Math.round(8+Math.sin(t/600+i*2)*3),f=k=>Math.round(Math.sin(t/160+i+k));
  R(x-1,y-s,3,s,G);R(x+1,y-s,1,s,D);R(x-1,y-5,3,2,'#3a3048');
  R(x-2,y-s-3,5,3,G);R(x-3,y-s-6+f(0),1,3,G);R(x-1,y-s-7+f(1),1,4,G);R(x+1,y-s-7+f(2),1,4,G);R(x+3,y-s-5+f(3),1,3,G);R(x-4,y-s-3,1,2,G);
  ell(x,y,6,2,'#1c1426');R(x-6,y-1,2,1,'#3a2c3a');R(x+4,y-1,2,1,'#3a2c3a')}
FX.top=t=>{if(hN<.01)return;const K='#0e0718',dd=hN*(1-tN),a=hN*tN;
  if(dd>.02){/* dia: nuvens claras, corvos e mãos de zumbi */
    for(let i=0;i<4;i++)blob(Math.round(((t*.006*(1+i*.3)+i*95)%430)-50),14+i*9,46,12,.4*dd,'110,104,128');
    c.globalAlpha=dd;
    for(let i=0;i<2;i++){const bx=Math.round(((t*.02*(1+i*.4)+i*160)%380)-30),by=Math.round(22+i*16+Math.sin(t/500+i)*4),w=Math.sin(t/110+i)>0?1:0;
      R(bx-5,by-w*2,3,1,'#14101c');R(bx-2,by+1-w,5,2,'#14101c');R(bx+3,by-w*2,3,1,'#14101c');R(bx+4,by+1,2,1,'#8a6a3a')}
    ZH.forEach((p,i)=>zhand(p[0],p[1],t,i));c.globalAlpha=1}
  /* aranha descendo do beiral (dia e noite) */
  const sl=Math.round(8+Math.sin(t/700)*5),sx=99,sy=94+sl;c.globalAlpha=hN;
  R(sx,93,1,sl,'rgba(225,220,240,.7)');R(sx-1,sy,3,3,K);R(sx-2,sy-1,1,1,K);R(sx+2,sy-1,1,1,K);R(sx-2,sy+1,1,1,K);R(sx+2,sy+1,1,1,K);R(sx-1,sy+3,1,1,K);R(sx+1,sy+3,1,1,K);R(sx,sy+1,1,1,'#ff3a3a');c.globalAlpha=1;
  if(a<.01)return;
  /* névoa baixa e pequena */
  for(let i=0;i<5;i++)blob(Math.round(((t*.01*(1+i*.2)+i*80)%400)-40),GY+8+i*7,34,6,.2*a,'190,150,230');
  /* fantasmas flutuantes decorados */
  for(let i=0;i<3;i++){const x=Math.round(50+i*110+Math.sin(t/2300+i*2)*34),y=Math.round(40+i*16+Math.sin(t/800+i*1.7)*6),w=Math.round(t/190+i)%2;
    c.globalCompositeOperation='lighter';blob(x,y,16,16,.25*a,'160,255,230');c.globalCompositeOperation='source-over';
    c.globalAlpha=.85*a;c.drawImage(gspr(i,w),x-11,y-17)}
  /* morcegos */
  c.globalAlpha=a;for(let i=0;i<6;i++){const bx=Math.round(((t*.03*(1+i*.15)+i*68)%380)-30),by=Math.round(14+i*13+Math.sin(t/450+i)*6),w=Math.sin(t/90+i)>0?1:0;R(bx-4,by+w,3,1,K);R(bx-1,by+1-w,3,2,K);R(bx+2,by+w,3,1,K)}
  /* brilhos de fada em volta do gato */
  for(let i=0;i<4;i++){const p=(t/1400+i/4)%1,fx=Math.round(24+i*6+Math.sin(p*6+i)*3),fy=Math.round(116-p*18),k=['#fff6b0','#ffb0e0','#b8e0ff','#fff'][i];c.globalAlpha=a*(1-p);R(fx-1,fy,3,1,k);R(fx,fy-1,1,3,k);R(fx,fy,1,1,'#fff')}
  c.globalAlpha=1};

/* ---------- fantasias ---------- */
/* gato: FADA */
const fairy=hy=>[
  ['e',-1,-12.5,4.4,3.4,'#cfe8ff'],['e',4.5,-11.5,3.4,2.6,'#ffc8ec'],['r',-3,-13,3,1,'#ffffff'],['r',3,-12,2,1,'#ffffff'],
  ['e',0,-1.4,7,1.7,'#ff8fc8'],['r',-5,-2,10,1,'#ffc2e0'],
  ['r',-11,-8+hy,4,1,'#ffd84a'],['r',-10,-9+hy,1,1,'#ffd84a'],['r',-8,-9+hy,1,1,'#ffd84a'],['r',-9,-10+hy,1,1,'#fff6b0'],
  ['r',-15,-3,1,5,'#ffe9a0'],['r',-16,-5,3,1,'#ffd84a'],['r',-15,-6,1,3,'#ffd84a']];
/* raposa: VAMPIRO (andando) — hb vem da função fox() do paginaincial.js */
const vamp=hb=>{hb=hb||0;const C='#1a0a14',Rr='#b01830';return[
  ['e',-4,-11,11,6.2,C],['e',-5,-8,9,3.4,Rr],
  ['r',-13,-7,3,2,C],['r',-7,-6,3,2,C],['r',-1,-6,3,2,C],
  ['r',4,-20+hb,3,7,C],['r',2,-17+hb,3,6,C],['r',5,-19+hb,1,5,Rr],
  ['r',6,-9,2,2,'#ffd84a'],
  ['r',13,-15+hb,1,1,'#ff2a3a'],
  ['r',15,-10+hb,1,2,'#ffffff'],['r',17,-10+hb,1,2,'#ffffff']]};
/* raposa: VAMPIRO (SENTADA, depois do clique) — capa nas costas, gola, olho vermelho, presas e broche */
const vsit=(bt,hy)=>{const C='#1a0a14',Rr='#b01830';return[
  ['e',-3,-8+bt,4,6,C],['e',-4,-6+bt,2.5,3.4,Rr],
  ['r',-1,hy+1,3,6,C],['r',0,hy+2,1,5,Rr],
  ['r',6,hy-3,1,2,'#ff2a3a'],
  ['r',9,hy+4,1,2,'#ffffff'],['r',11,hy+4,1,2,'#ffffff'],
  ['r',2,hy+6,2,2,'#ffd84a']]};
/* guaxinim: MÚMIA (ataduras na cabeça e no corpo, olhos vermelhos) */
const mummy=(hx,dip)=>{const B='#e6dcc0',S='#b8ac90';return[
  ['e',hx,-8.5+dip,7.2,2.4,B],['r',hx-6,-9+dip,12,1,S],['r',hx-5,-7+dip,10,1,S],
  ['r',hx-3,-9+dip,2,2,'#14100e'],['r',hx+2,-9+dip,2,2,'#14100e'],['r',hx-3,-9+dip,1,1,'#ff3a3a'],['r',hx+2,-9+dip,1,1,'#ff3a3a'],
  ['r',-6,-4,8,1,B],['r',-5,-2,9,1,B],['r',hx+5,-5+dip,1,3,B]]};
/* morcego: ABÓBORA com asas, orelhas e presinhas. m=0 pendurado, m=1 voando */
const pbat=m=>{const O='#e8761a',Y='#ffe866',Wg='#2a1040',Wl='#4a2070';return[
  ...(m?[['r',-10,2,6,1,Wg],['r',-9,3,5,1,Wg],['r',-8,4,3,1,Wl],['r',4,2,6,1,Wg],['r',4,3,5,1,Wg],['r',5,4,3,1,Wl]]
       :[['e',-5.5,5.5,1.6,4,Wg],['e',5.5,5.5,1.6,4,Wg]]),
  ...(m?[
  ['e',0,5,3.8,3.8,O],['r',0,1,1,8,'#b0510a'],['r',-2,3,1,2,Y],['r',1,3,1,2,Y],['r',-2,6,4,1,Y],['r',0,0,2,1,'#3f8f3a'],['r',-1,7,1,1,'#fff'],['r',1,7,1,1,'#fff']
  ]:[
  ['e',0,5.2,4.4,4.6,O],['e',-1.8,5.2,1.6,4.4,'#f08a2a'],['r',0,1,1,9,'#b0510a'],['r',-2,4,1,2,Y],['r',1,4,1,2,Y],['r',-2,8,4,1,Y],['r',-1,1,3,1,'#3f8f3a'],['r',-1,9,1,1,'#fff'],['r',1,9,1,1,'#fff']
  ]),
  ['r',-3,m?1:0,1,2,Wg],['r',2,m?1:0,1,2,Wg]]};
const frogCol=()=>({cp:'#2a1038',h:'#161020',band:'#ff8a1a',brim:'#0e0818'});

/* ---------- vasos viram poções e abóbora ---------- */
const VH=(id,k,pm)=>{const g=document.getElementById(id).getContext('2d'),P=(x,y,w,h,q)=>{g.fillStyle=q;g.fillRect(x,y,w,h)};g.clearRect(0,0,64,64);
  if(pm){P(7,3,2,3,'#3f8f3a');P(3,7,8,8,'#e8761a');P(2,8,10,6,'#e8761a');P(6,7,1,8,'#b0510a');P(4,9,2,2,'#ffe866');P(8,9,2,2,'#ffe866');P(5,12,4,1,'#ffe866');P(3,8,1,3,'#ffa040')}
  else{P(6,4,2,1,'#8a5a30');P(5,5,4,3,'#cfe6f2');P(2,8,10,7,k);P(3,8,2,6,'rgba(255,255,255,.35)');P(4,10,1,1,'#fff');P(8,12,1,1,'#fff');P(7,9,1,1,'#fff')}};
const potions=()=>{VH('v1','#7ae04a');VH('v2','#b070ff');VH('v3',0,1)};

/* ---------- liga/desliga (a página halloween.html chama setHW(1)) ---------- */
function setHW(v){
  if(v){if(!BG[2]){hdy=0;BG[2]=build(1,PH);hdy=1;BG[3]=build(0,PHD);hdy=0}svN=night;night=true}else night=svN;
  hw=v?1:0;document.documentElement.classList.toggle('hw',!!v);setT();owl(0);hw?potions():vases();list();
  coruja.hat(!!v);   /* chapéu de bruxa só no Halloween */
  padDeco()}         /* videiras + abóboras em volta do bloco de notas */

/* ---------- botão: voltar da festividade (abóbora apagada) ---------- */
(()=>{
  const VOLTAR='pagina inicial.html'; /* troque pelo nome real da sua página inicial */
  const velho=document.getElementById('bk');if(velho)velho.remove();
  const a=document.createElement('a');
  a.id='bkh';a.href=VOLTAR;a.title='Voltar da festividade';a.setAttribute('aria-label','Voltar da festividade');
  a.style.cssText='position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));width:64px;height:64px;z-index:30;display:block;cursor:pointer;transition:transform .15s';
  const k=document.createElement('canvas');k.width=k.height=16;
  k.style.cssText='width:100%;height:100%;image-rendering:pixelated;filter:drop-shadow(0 0 6px rgba(170,100,230,.7)) drop-shadow(3px 4px 0 rgba(0,0,0,.35))';
  a.appendChild(k);
  const tip=document.createElement('span');tip.textContent='Voltar da festividade';
  tip.style.cssText="display:none;position:absolute;right:0;bottom:76px;white-space:nowrap;font:8px 'Press Start 2P',monospace;color:#fff;background:#2c3f6e;padding:8px 10px;box-shadow:0 0 0 3px #14295e";
  a.appendChild(tip);
  document.body.appendChild(a);
  const g=k.getContext('2d'),P=(x,y,w,h,q)=>{g.fillStyle=q;g.fillRect(x,y,w,h)},F='#1a0e08';
  P(7,1,2,3,'#2f4a25');P(9,1,2,1,'#2f4a25');P(8,1,1,1,'#4a6a3a');
  P(3,4,10,11,'#8a4a1c');P(1,6,14,7,'#8a4a1c');P(2,5,12,9,'#8a4a1c');
  P(5,4,1,11,'#5a2e10');P(10,4,1,11,'#5a2e10');P(2,14,12,1,'#5a2e10');P(3,15,10,1,'#3a1c08');P(2,7,2,4,'#a8683a');
  P(5,7,1,1,F);P(4,8,3,2,F);P(10,7,1,1,F);P(9,8,3,2,F);P(4,11,8,1,F);P(5,12,2,1,F);P(9,12,2,1,F);P(7,13,2,1,F);
  a.onmouseenter=()=>{a.style.transform='translateY(-4px) rotate(4deg)';tip.style.display='block'};
  a.onmouseleave=()=>{a.style.transform='none';tip.style.display='none'};
})();