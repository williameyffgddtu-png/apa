const W=320,H=180,GY=136,SP=1,cv=document.getElementById('cv'),M=cv.getContext('2d',{alpha:false});cv.width=W;cv.height=H;
let c=M,r;const mk=s=>()=>(s=s*16807%2147483647)/2147483647;r=mk(5);
const R=(x,y,w,h,k)=>{c.fillStyle=k;c.fillRect(Math.round(x),Math.round(y),Math.max(0,Math.round(w)),Math.round(h))};
const ell=(x,y,a,b,k)=>{const B=Math.round(b);for(let j=-B;j<=B;j++)R(x-a*Math.sqrt(Math.max(0,1-j*j/(b*b+.01))),y+j,2*a*Math.sqrt(Math.max(0,1-j*j/(b*b+.01))),1,k)};
function parts(P,ox,oy,fl,ol,s){const f=(p,g)=>{let[t,x,y,a,b,k]=p;if(s){x*=s;y*=s;a*=s;b*=s}if(fl){x=-x;if(t=='r')x-=a}x+=ox;y+=oy;if(t=='e')ell(x,y,a+g,b+g,g?ol:k);else R(x-g,y-g,a+2*g,b+2*g,g?ol:k)};P.forEach(p=>f(p,1));P.forEach(p=>f(p,0))}
const FL=['#4da3ff','#7bc4ff','#2f6fe0','#a9d8ff','#6a5cff','#3fd0ff'],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const FX={},hk=(n,...a)=>FX[n]&&FX[n](...a);
const PN={s:['#050a1f','#07102b','#0a1838','#0d2147','#102a58','#133468'],f:'#0b1f45',m:'#0d2a58',t:'#123a73',hl:'#1f5fa8',sh:'#081733',gd:'#2a2030',g:['#0c3a44','#0f4a56','#1f7a8c','#082a33'],d1:'#3a2c3c',gr:'#145064',gt:'#1f7a8c',b:['#0a3a30','#115444','#1d7a58'],bo:'#05201c',lf:['#0b3a3a','#12544a','#1f7a60','#3ba37a'],k:['#1a1424','#2b2031','#4a3550'],pad:['#0f4a58','#1d7a85'],st:['#4f3b4a','#33232e','#22171f']};
const PD={s:['#7d8da0','#8b9bad','#99a8b8','#a8b5c3','#b6c1cc','#c4ced7'],f:'#b5cfe0',m:'#8fb4cc',t:'#5f94b5',hl:'#8fc3dc',sh:'#3d6f90',gd:'#7a6a58',g:['#5aa56a','#68b377','#9bdc9c','#3f8458'],d1:'#8c7a66',gr:'#6fb09a',gt:'#92cfae',b:['#2f7a45','#46a05a','#74c46c'],bo:'#1d4f2e',lf:['#2d7a4a','#3f9a5a','#63b872','#8fd48a'],k:['#5a4540','#7a5e52','#9c7e6c'],pad:['#3a8590','#6cb8bc'],st:['#b08a64','#8a6a52','#6a4e3c']};
const inP=(x,y,m)=>((x-150)/(72+m))**2+((y-GY-23)/(13+m))**2<1;
function fern(x,y,P,h){for(let f=-1;f<=1;f++){const px=x+f*3;for(let j=0;j<h;j++){const sx=px+Math.round(f*j*.3);R(sx,y-j,1,1,P.lf[0]);if(j>1&&j%2==0){const w=Math.round(3*Math.sin(Math.PI*(j+1)/(h+1)))+1;R(sx-w,y-j,w,1,P.lf[1]);R(sx+1,y-j,w,1,P.lf[2])}}}}
function lav(x,y,P){R(x,y-7,1,7,P.lf[1]);R(x,y-11,1,5,'#a98aff');R(x-1,y-10,1,3,'#c9b4ff');R(x+1,y-9,1,3,'#8a6ad0');R(x-1,y-5,1,2,P.lf[2])}
function bell(x,y,P){R(x,y-6,1,6,P.lf[1]);R(x+1,y-7,2,1,P.lf[1]);R(x+2,y-6,2,2,'#6a8aff');R(x+2,y-4,2,1,'#a9c0ff');R(x-2,y-4,2,2,'#7a9aff');R(x-2,y-2,2,1,'#b0c4ff');R(x+1,y-3,2,1,P.lf[2])}
function dande(x,y,P,n){R(x,y-5,1,5,P.lf[1]);R(x-2,y-2,2,1,P.lf[2]);if(n){R(x-1,y-8,3,3,'#f4f4e8');R(x,y-9,1,1,'#fff');R(x-2,y-7,1,1,'#fff');R(x+2,y-7,1,1,'#fff')}else{R(x-1,y-7,3,2,'#ffd84a');R(x,y-8,1,1,'#ffe866')}}
function rock(x,y,P){ell(x,y,5,3,'#2a2c3a');ell(x,y,4,2.2,'#4a4f66');R(x-3,y-2,3,1,'#6a7090');ell(x+1,y-2,3,1.2,P.lf[1]);R(x-1,y-3,2,1,P.lf[2])}
function clov(x,y,P){[[0,0],[3,1],[-2,1]].forEach(([a,b2])=>{R(x+a,y+b2,2,1,P.lf[2]);R(x+a,y+b2-1,1,1,P.lf[1])});R(x+1,y-1,1,1,'#fff')}
function mush(x,y,n,j){[[0,0,3],[5,1,2],[-4,1,2]].forEach(([dx,dy,s],i)=>{const X=x+dx,Y=y+dy,k=n?['#4ee0cc','#a98aff','#7ab8ff'][(i+j)%3]:['#c8504a','#b5703a','#d8c8a8'][(i+j)%3];if(n){c.globalAlpha=.16;circ(X,Y-s-1,s+4,k);c.globalAlpha=1}R(X,Y-s,s>2?2:1,s,'#e8dcc8');R(X-s+1,Y-s-2,2*s+(s>2?1:0),2,k);R(X-s+2,Y-s-2,1,1,'#fff');if(!n&&i==0)R(X+1,Y-s-1,1,1,'#fff')})}
const zg=(x,y,n,k)=>{R(x,y,n,1,k);for(let i=1;i<n-1;i++)R(x+n-1-i,y+i,1,1,k);R(x,y+n-1,n,1,k)};
const circ=(x,y,q,k)=>{for(let d=-q;d<=q;d++){const w=Math.floor(Math.sqrt(q*q-d*d)+.5);R(x-w,y+d,2*w+1,1,k)}};
function pine(x,b,h,tc,hc,sc){const T=Math.max(3,h/13|0),w0=h*.3;R(x-1,b-7,3,7,sc||tc);for(let i=0;i<T;i++){const top=b-h+(i*(h-9)/T|0),th=(h/T*1.6)|0,mw=w0*(.3+.7*(i+1)/T);for(let j=0;j<th;j++){const hw=(mw*(j+1)/th+(r()<.3?1:0))|0,y=top+j;R(x-hw,y,2*hw+1,1,tc);if(hc){R(x-hw,y,Math.min(3,hw+1),1,hc);R(x+hw-1,y,2,1,sc);if(j%5==4)R(x-hw+2+(r()*hw|0),y,2,1,sc)}}}}
function bush(x,y,rad,P){const pts=[];for(let i=0;i<rad*2;i++)pts.push([x+(r()-.5)*rad*2.4|0,y-r()*rad*.8|0,3+(r()*rad*.5|0)]);ell(x,y+1,rad*1.5,rad*.3+1,'rgba(0,0,0,.3)');pts.forEach(p=>circ(p[0],p[1]+1,p[2]+1,P.bo));[[0,0,0],[-1,-1,1],[-2,-2,2]].forEach(([dx,dy,k])=>pts.forEach(p=>{if(k<2||p[2]>3)circ(p[0]+dx,p[1]+dy,p[2]-(k?1:0),P.b[k])}));for(let i=0;i<rad*1.8;i++){const fx=x+(r()-.5)*rad*2.2|0,fy=y-r()*rad*1.1|0,ty=r()*4|0,k=(P.fl||FL)[r()*6|0];
    if(ty==0){R(fx-1,fy,3,1,'#fff');R(fx,fy-1,1,3,'#fff');R(fx,fy,1,1,'#ffd84a')}
    else if(ty==1){R(fx-1,fy,3,1,'#ff8fb5');R(fx,fy-1,1,3,'#ff8fb5');R(fx-1,fy-1,1,1,'#ffc2d6');R(fx+1,fy+1,1,1,'#e0608f');R(fx,fy,1,1,'#fff6b0')}
    else if(ty==2){R(fx,fy-1,2,2,'#b79cff');R(fx,fy+1,2,1,'#8a6ad0');R(fx+1,fy-1,1,1,'#e0d4ff')}
    else{R(fx-1,fy,3,2,k);R(fx,fy-1,1,1,k);R(fx,fy,1,1,'#fff6b0')}}}
function vine(x0,y0,len,ph,t,k){for(let i=0;i<len;i++){const x=x0+Math.round(Math.sin(i*.4+ph+t/700)*(1+i/len*1.5)),y=y0+i;R(x,y,1,1,i%3?'#2f8f6a':'#1f6a50');if(i%4==2)R(x+(i%8<4?1:-2),y,2,1,'#3fb083');if(i%9==6){const q=FL[(k+i)%6];R(x-1,y,3,1,q);R(x,y-1,1,3,q);R(x,y,1,1,'#fff6b0')}}}
const x0=12,CW=104,b=GY-6,cx=x0+52,SX=262,CNX=144;
const cvs=()=>{const k=document.createElement('canvas');k.width=W;k.height=H;return k};
/* vinheta em cache (dia/noite) */
const VG=[0,1].map(n=>{const k=cvs(),g=k.getContext('2d');
  const v=g.createRadialGradient(W*.45,H*.5,H*.35,W*.45,H*.5,W*.65);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,`rgba(5,8,30,${.16+.2*n})`);g.fillStyle=v;g.fillRect(0,0,W,H);
  const l=g.createLinearGradient(0,0,0,H);l.addColorStop(0,`rgba(4,8,30,${.08+.25*n})`);l.addColorStop(.55,'rgba(0,0,0,0)');l.addColorStop(1,`rgba(0,8,20,${.1+.22*n})`);g.fillStyle=l;g.fillRect(0,0,W,H);return k});
function build(n,pal){const P=pal||(n?PN:PD),A=cvs(),B=cvs(),F=cvs(),G=cvs(),B2=cvs();r=mk(n?11:5);const bp=[];c=A.getContext('2d');
  for(let i=0;i<6;i++)R(0,GY*i/6|0,W,GY/6+2,P.s[i]);
  for(let i=0;i<5;i++){const y1=GY*(i+1)/6|0;for(let d=0;d<4;d++)for(let x=0;x<W;x++)if((x+d)%2==0)R(x,y1+d-2,1,1,P.s[i+1])}
  if(n){for(let i=0;i<70;i++){const x=r()*W|0,y=r()*GY*.7|0;R(x,y,1,1,['#fff','#a9c8ff','#6d8fd0'][i%3]);if(i%9==0){R(x-1,y,3,1,'#a9c8ff');R(x,y-1,1,3,'#a9c8ff')}}
    circ(214,26,22,'#0d2557');circ(214,26,18,'#173b7a');circ(214,26,14,'#f6f3d8');circ(214,26,12,'#fbf9e6');circ(209,22,3,'#e1ddb8');circ(219,30,3,'#e1ddb8');circ(220,21,2,'#e1ddb8');circ(208,31,2,'#e8e4c4');R(213,26,3,2,'#e1ddb8')}
  else{c.globalAlpha=.25;circ(214,26,16,'#e8eef3');c.globalAlpha=.35;circ(214,26,10,'#f0f4f7');c.globalAlpha=1}
  c=B.getContext('2d');
  for(let x=0;x<W;x++){const y=GY-40-Math.sin(x*.035+n)*10-Math.sin(x*.09)*4|0;R(x,y,1,GY-y,P.f);if(x%2==0)R(x,y+3,1,1,P.m)}
  for(let i=0;i<W/5;i++)pine(r()*W|0,GY-14,Math.min(GY-8,34+r()*26),P.f);
  for(let i=0;i<W/10;i++)pine(r()*W|0,GY-6,Math.min(GY-8,60+r()*40),P.m,P.t,P.f);for(let i=0;i<W/14;i++)pine(r()*W|0,GY-10,40+r()*20,P.f,P.m,P.f);for(let i=0;i<W/9;i++)bush(r()*W|0,GY-4-r()*8|0,3+r()*2|0,P);c.globalAlpha=.25;R(0,GY-18,W,16,P.s[5]);c.globalAlpha=1;
  for(let y=GY-36;y<GY-6;y+=2)for(let x=(y>>1)%2;x<W;x+=2)R(x,y,1,1,n?'rgba(80,120,190,.13)':'rgba(240,246,250,.3)');
  c=B2.getContext('2d');for(let i=0;i<W/22;i++){const x=r()*W|0;if(x>150){bp.push(x);pine(x,GY+4,Math.min(GY-8,100+r()*50),P.t,P.hl,P.sh)}}
  R(0,GY,W,H-GY,P.g[0]);for(let y=GY;y<H;y+=2)for(let x=(y>>1)%2*2;x<W;x+=4)R(x,y,2,1,P.g[1]);for(let i=0;i<W*3;i++)R(r()*W|0,GY+3+r()*(H-GY-3)|0,1,1,P.g[3]);
  for(let i=0;i<W*1.4;i++){const x=r()*W|0,y=GY+4+r()*(H-GY-5)|0;R(x,y-2,1,3,P.g[2]);R(x+2,y-2,1,3,P.g[2]);R(x+1,y-1,1,2,P.g[1])}
  R(0,GY,W,2,P.g[2]);for(let x=0;x<W;x+=2)R(x,GY-1-(r()*2|0),1,2,P.g[2]);
  for(let i=0;i<10;i++){const x=r()*W|0,y=GY+6+r()*(H-GY-8)|0;R(x,y,3,2,'#6d88a8');R(x,y,2,1,'#9db4cf')}
  [[176,9],[238,12],[292,16]].forEach(([x,w])=>{const h=GY+6;R(x-w/2,0,w,h,P.k[1]);R(x-w/2,0,3,h,P.k[2]);R(x+w/2-4,0,4,h,P.k[0]);for(let i=0;i<h/2;i++)R(x-w/2+(r()*w|0),r()*h|0,1,2+(r()*5|0),P.k[0]);R(x-w/2-4,h-6,w+8,6,P.k[1]);
    for(let j=0;j<7;j++){const cy=GY-14-j*22,hw=9+(r()*4|0);for(let q=0;q<14;q++){const w2=(hw*(q+1)/14+(r()<.3?1:0))|0,e=w/2+w2;R(x-e,cy+q,2*e,1,q%5==4?P.pad[1]:P.pad[0]);R(x-e,cy+q,2,1,P.pad[1])}}});
  R(SX-11,GY+10,22,14,P.st[1]);R(SX-11,GY+10,3,14,P.st[0]);R(SX+8,GY+10,3,14,P.st[2]);ell(SX,GY+10,11,3,P.st[0]);ell(SX,GY+10,7,2,P.st[1]);R(SX-4,GY+10,8,1,P.st[2]);R(SX-9,GY+16,5,2,'#3fa38a');[8,128,205,312].forEach(x=>pine(x,GY+3,86+r()*26,P.t,P.hl,P.sh));R(SX-10,GY+8,1,3,'#e8dcc8');R(SX-12,GY+6,5,2,'#c8504a');R(SX-11,GY+6,1,1,'#fff');
  c=F.getContext('2d');bush(x0-6,GY+3,9,P);bush(x0+34,GY+5,6,P);bush(x0+CW+12,GY+4,10,P);bush(CNX+22,GY+4,7,P);bush(SX-20,GY+15,7,P);bush(SX+19,GY+14,8,P);bush(SX+34,GY+22,6,P);c=G.getContext('2d');bush(24,H-3,9,P);bush(96,H-2,7,P);bush(188,H-1,8,P);bush(300,H-3,10,P);c=F.getContext('2d');
  for(let i=0;i<W/20;i++){const x=r()*W|0;if(x>225&&Math.abs(x-SX)>24){const y=GY+8+r()*(H-GY-14)|0,q=5+r()*5;c=y>GY+28?G.getContext('2d'):F.getContext('2d');bush(x,y,q,P)}c=F.getContext('2d');}
  for(let i=0;i<9;i++){const x=r()*W|0,y=GY+8+r()*(H-GY-12)|0;if(inP(x,y,4))continue;R(x,y,3,1,'#c8504a');R(x+1,y-1,1,1,'#e8756a');R(x+1,y+1,1,2,'#e8dcc8')}
  for(let i=0;i<46;i++){const x=r()*W|0,y=GY+7+r()*(H-GY-10)|0,k=r()*6|0;if(inP(x,y,5)||(x>64&&x<84&&y<GY+24)||(Math.abs(x-SX)<16&&y<GY+18)||(Math.abs(x-CNX)<16&&y<GY+12))continue;c=y>GY+28?G.getContext('2d'):F.getContext('2d');[()=>fern(x,y,P,6+(r()*4|0)),()=>lav(x,y,P),()=>bell(x,y,P),()=>dande(x,y,P,n),()=>rock(x,y,P),()=>clov(x,y,P)][k]()}
  c=F.getContext('2d');[176,238,292,...bp].forEach(x=>{[[-12,8],[10,10]].forEach(([dx,dy],j)=>{if(!inP(x+dx,GY+dy,4))mush(x+dx,GY+dy,n,j)})});
  for(let i=0;i<W/4;i++){const x=r()*W|0,y=GY+8+r()*(H-GY-10)|0;if(inP(x,y,3))continue;c=y>GY+28?G.getContext('2d'):F.getContext('2d');R(x,y,1,3,P.g[2]);R(x+2,y,1,3,P.g[2]);R(x+1,y+1,1,2,P.g[1])}
  if(pal)hk('decor',A,F);c=M;return[A,B,F,G,B2]}
let BG,tN,night=!matchMedia('(prefers-color-scheme: light)').matches,m={x:-1,y:-1},open=0;let pn2=night;const BAT={t0:-1e9,t1:-1e9},RC={u:night?1:0};tN=night?1:0;
/* estado das interações (gato, lata, sapo) */
const PT={t:-1e9,h:[],last:0},CK={t:-1e9,d:6000},FRG={t:-1e9},BC={t:-1e9,d:6500},cm={x:-1,y:-1};let OT={x:0,y:0,t:-1e9},owlBl=0;
const rr=mk(3),FF=[...Array(28)].map((_,i)=>({x:130+rr()*180,y:40+rr()*95,a:rr()*6,s:.0004+rr()*.0008,rx:6+rr()*16,ry:4+rr()*10})),
BF=[...Array(6)].map(()=>({x:40+rr()*200,y:100+rr()*30,a:rr()*6,s:.0003+rr()*.0003,k:FL[rr()*6|0]})),
LV=[...Array(14)].map(()=>({x:rr()*W,y:rr()*H,s:.4+rr()*.6,a:rr()*6,k:rr()<.5?'#2f8f8a':'#c8803a'})),CLD=[...Array(12)].map((_,i)=>({x:i*30,y:4+rr()*62,s:.8+rr()*1,v:.004+rr()*.004}));
const ST=[...Array(22)].map(()=>({x:rr()*W|0,y:rr()*GY*.6|0,s:300+rr()*600,a:rr()*6,b:rr()<.25})).filter(q=>Math.hypot(q.x-214,q.y-26)>26);
let tg0={x:200,y:90};
/* gradientes em cache: um sprite por cor */
const BS={};
function blob(x,y,rx,ry,a,col){
  if(a<.01)return;
  let s=BS[col];
  if(!s){s=document.createElement('canvas');s.width=s.height=64;const g=s.getContext('2d'),q=g.createRadialGradient(32,32,0,32,32,32);
    q.addColorStop(0,`rgba(${col},1)`);q.addColorStop(1,`rgba(${col},0)`);g.fillStyle=q;g.fillRect(0,0,64,64);BS[col]=s}
  c.globalAlpha=Math.min(1,a);c.drawImage(s,x-rx,y-ry,2*rx,2*ry);c.globalAlpha=1}
const glow=(x,y,q,col,a)=>blob(x,y,q,q,a,col);
function cabin(t){blob(cx+2,GY+4,CW*.7,9,.4,'0,0,0');
  for(let i=0;i<CW+14;i+=6){const k=(i/6|0)%3;R(x0-2+i,b+3,6,3,['#5e5a6e','#6e6a7e','#56526a'][k]);R(x0-2+i,b+3,6,1,'#8a869a');R(x0-2+i+5,b+3,1,3,'#2c2838')}
  R(x0-2,b,CW+14,3,'#7a4c27');R(x0-2,b,CW+14,1,'#a8733d');for(let i=0;i<CW+14;i+=9)R(x0+i,b+1,1,2,'#4a2c14');
  R(x0+48,b+3,26,2,'#6a4224');R(x0+45,b+5,32,2,'#5a3519');R(x0+45,b+5,32,1,'#8a5a30');
  R(cx+20,b-68,10,24,'#5a5f78');R(cx+20,b-68,2,24,'#7a8098');for(let i=0;i<5;i++)R(cx+20,b-64+i*4,10,1,'#454a60');R(cx+19,b-69,12,2,'#454a60');
  for(let i=0;i<6;i++){const p=(t/2800+i/6)%1;c.globalAlpha=(1-p)*.4;circ(cx+25+Math.sin(p*6+i)*3+p*9,b-72-p*34,1+p*3|0,'#c8d8f0')}c.globalAlpha=1;
  for(let i=0;i<8;i++){const yy=b-38+i*5;R(x0,yy,CW,5,i%2?'#7a4c27':'#8a5a30');R(x0,yy,CW,1,'#a8733d');R(x0,yy+4,CW,1,'#4a2c14');R(x0,yy,3,5,'#c99a5a');R(x0+CW-3,yy,3,5,'#b08040');R(x0+10+i*9,yy+2,3,1,'#5a3519');R(x0+22+(i*17)%50,yy+1,2,2,'#4a2c14')}
  for(let k=0;k<24;k++){const hw=Math.round(64-k*2.6),yy=b-40-k;R(cx-hw,yy,2*hw,1,k%4?'#2d6f7a':'#1f545f');R(cx-hw,yy,2,1,'#58b0b0');R(cx+hw-2,yy,2,1,'#17434d');for(let q=-hw+4;q<hw-2;q+=6){R(cx+q+(k%2?3:0),yy,1,1,'#3f8f94');if((q*7+k*3)%13==0)R(cx+q,yy,3,1,'#4a8a4a')}}
  for(let i=0;i<22;i++){const k=(i*7)%22,hw=64-2.6*k,xx=cx-hw+4+((i*29)%Math.max(8,2*hw-10))|0,yy=b-40-k;R(xx,yy,4+i%3,1,'#4f8f4a');R(xx+1,yy-1,3,1,'#6aa85a')}R(cx-9,b-65,18,3,'#173f48');R(cx-9,b-65,18,1,'#58b0b0');R(x0,b-38,CW,2,'rgba(0,0,0,.3)');
  R(x0+6,b-31,22,16,'#3a2210');R(x0+8,b-29,18,12,Math.sin(t/230)>.6?'#ffe08a':'#ffcf6b');R(x0+8,b-23,18,6,'#ffb347');R(x0+16,b-29,2,12,'#3a2210');R(x0+8,b-24,18,1,'#3a2210');
  R(x0+4,b-15,22,4,'#5a3519');for(let i=0;i<7;i++){R(x0+5+i*3,b-17,2,2,FL[i%6]);R(x0+5+i*3,b-18,1,1,'#fff')}
  R(x0+51,b-29,20,29,'#3a2210');R(x0+52,b-28,18,28,'#f0b765');for(let i=0;i<18;i+=3)R(x0+52+i,b-28,1,18,'#d9974d');
  R(x0+52,b-10,18,10,'#7a4a2a');R(x0+52,b-10,18,1,'#a8733d');R(x0+54,b-5,14,3,'#b0443a');R(x0+54,b-5,14,1,'#e0705a');R(x0+56,b-4,2,1,'#ffd08a');R(x0+62,b-4,2,1,'#ffd08a');
  R(x0+54,b-24,6,5,'#5a3519');R(x0+55,b-23,4,3,'#58b0b0');R(x0+56,b-22,2,1,'#fff6b0');
  R(x0+61,b-28,1,5,'#3a2210');R(x0+59,b-23,5,2,'#ffe08a');R(x0+60,b-21,3,1,'#fff6b0');
  R(x0+54,b-16,2,6,'#2d6f7a');R(x0+54,b-12,6,2,'#3f8f94');
  R(x0+65,b-17,5,7,'#3a2a30');R(x0+66,b-16,3,5,'#1a1014');R(x0+66,b-13,3,2,'#ff9a3a');R(x0+67,b-14-(Math.sin(t/110)>0?1:0),1,2,'#ffe08a');
  R(x0+63,b-19,7,1,'#5a3519');R(x0+64,b-22,1,3,'#c8504a');R(x0+65,b-21,1,2,'#3f9660');R(x0+67,b-22,1,3,'#4da3ff');R(x0+69,b-21,1,2,'#c8803a');
  R(x0+52,b-28,18,3,'rgba(80,30,10,.35)');R(x0+52,b-28,2,28,'rgba(80,30,10,.3)');R(x0+68,b-28,2,28,'rgba(80,30,10,.2)');
  const pw=18*(1-open*.85)|0;R(x0+52,b-28,pw,28,'#6b3f1d');for(let i=3;i<pw;i+=5)R(x0+52+i,b-28,1,28,'#4a2a12');R(x0+52,b-28,pw,1,'#8a5a30');R(x0+52+pw-4,b-14,2,2,'#f0c060');
  R(x0+CW+8,b-38,3,38,'#5a3519');R(x0+CW+8,b-38,1,38,'#8a5a30');R(x0+CW+1,b-37,8,1,'#2a1c1c');R(x0+CW+1,b-36,1,3,'#2a1c1c');R(x0+CW+2,b-33,1,3,'#555');R(x0+CW,b-31,5,1,'#2a1c1c');R(x0+CW+1,b-32,3,1,'#2a1c1c');R(x0+CW,b-30,5,8,'#2a1c1c');R(x0+CW+1,b-29,3,6,Math.sin(t/90)>.3?'#fff2a0':'#ffcf6b');R(x0+CW+2,b-28,1,4,'#fff');R(x0+CW+1,b-26,3,1,'#2a1c1c');R(x0+CW,b-22,5,1,'#2a1c1c');
  [[-4,26],[2,34],[34,10],[40,14],[70,12],[76,10],[84,18],[92,24],[102,22],[108,30]].forEach(([vx,l],i)=>vine(x0+vx,b-38,l,i*1.7,t,i));
  R(x0+3,b-33,3,19,'#2d6f7a');R(x0+28,b-33,3,19,'#2d6f7a');for(let i=0;i<19;i+=3){R(x0+3,b-33+i,3,1,'#1f545f');R(x0+28,b-33+i,3,1,'#1f545f')}R(x0+4,b-34,26,2,'#5a3519');
  R(x0+49,b-31,2,31,'#5a3519');R(x0+71,b-31,2,31,'#5a3519');R(x0+49,b-32,24,2,'#6b4224');R(x0+54,b,14,2,'#6a3a2a');
  R(x0+40,b-34,1,5,'#5a3519');R(x0+38,b-29,5,4,'#4f8f4a');R(x0+39,b-29,3,2,'#6aa85a');R(x0+44,b-30,1,4,'#5a3519');R(x0+43,b-27,3,4,'#8a6ad0');
  for(let rw=0;rw<3;rw++)for(let q=0;q<4-rw;q++){const lx=x0+32+q*4+rw*2,ly=b-3-rw*3;R(lx,ly,4,3,'#6b3f1d');R(lx+1,ly+1,2,1,'#c99a5a')}
  R(x0+4,b-5,24,1,'rgba(0,0,0,.25)');R(x0+5,b-5,2,5,'#5a3519');R(x0+25,b-5,2,5,'#5a3519');R(x0+3,b-7,26,2,'#8a5a30');R(x0+3,b-7,26,1,'#a8733d');R(x0+7,b-8,16,1,'#b0443a');
  const wx=x0+76;R(wx,b-31,22,16,'#3a2210');R(wx+2,b-29,18,12,'#ffcf6b');R(wx+2,b-23,18,6,'#ffb347');R(wx+10,b-29,2,12,'#3a2210');R(wx+2,b-24,18,1,'#3a2210');R(wx-2,b-15,22,4,'#5a3519');for(let i=0;i<7;i++){R(wx-1+i*3,b-17,2,2,FL[(i+2)%6]);R(wx-1+i*3,b-18,1,1,'#fff')}
  R(wx-3,b-33,3,19,'#2d6f7a');R(wx+22,b-33,3,19,'#2d6f7a');for(let i=0;i<19;i+=3){R(wx-3,b-33+i,3,1,'#1f545f');R(wx+22,b-33+i,3,1,'#1f545f')}R(wx-2,b-34,26,2,'#5a3519');
  R(cx-8,b-56,16,11,'#7a4c27');R(cx-6,b-54,12,7,Math.sin(t/230)>.6?'#ffe08a':'#ffcf6b');R(cx-1,b-54,2,7,'#3a2210');R(cx-6,b-51,12,1,'#3a2210');R(cx-9,b-45,18,1,'#5a3519');for(let j=0;j<5;j++){R(cx-2-j*2,b-62+j,4+j*4,1,'#1f545f');R(cx-2-j*2,b-62+j,1,1,'#58b0b0')}
  if(open<.3){R(x0+59,b-23,5,1,'#2f8f4a');R(x0+58,b-22,1,4,'#2f8f4a');R(x0+64,b-22,1,4,'#2f8f4a');R(x0+59,b-18,5,1,'#2f8f4a');R(x0+58,b-20,1,1,'#c8504a');R(x0+64,b-21,1,1,'#c8504a')}
  ell(x0+80,b-3,4,3,'#e08a2a');ell(x0+80,b-3,2,3,'#f0a040');R(x0+80,b-7,1,2,'#3f6a2a');ell(x0+86,b-2,3,2.2,'#d87a20');
  R(x0+98,b-12,10,12,'#8a5a30');R(x0+99,b-12,2,12,'#a8733d');R(x0+98,b-10,10,1,'#3a3a44');R(x0+98,b-3,10,1,'#3a3a44');ell(x0+103,b-12,5,1.3,'#58a0c8');
  [[60,9],[63,14],[59,19]].forEach(([dx,dy])=>{ell(x0+dx,b+dy,4,1.7,'#6a6478');ell(x0+dx,b+dy-.5,4,1,'#8a8498')});R(cx-65,b-39,130,1,'rgba(0,0,0,.35)');
  // gato: acordado de noite, dormindo de dia, e reage a carinho
  const aw=tN>.5,pet=t-PT.t<450,br=Math.sin(t/(aw?600:900))*.6,tw=pet?Math.sin(t/90)*3:aw?Math.sin(t/330)*2.4:Math.sin(t/1400)*1.2;
  const cc='#6b6f8f',cs='#4a4e6d',cl2='#c9cbe0',pk='#e0a0b0';
  const hy=(aw?-2+Math.round(Math.sin(t/1900)*.6):0)+(pet?Math.round(Math.sin(t/110)*1.2)-1:0),lk=Math.sin(t/2300)>0?0:-1,eb=pet||(aw?(t%3700)<140:true),tz=aw&&(t%4300)<160?1:0;
  const eyes=eb?[['r',-11,-4,2,1,'#14100e'],['r',-8,-4,2,1,'#14100e']]:[['r',-11,-5,2,2,'#9be07a'],['r',-8,-5,2,2,'#9be07a'],['r',-10+lk,-5,1,2,'#14100e'],['r',-7+lk,-5,1,2,'#14100e']];
  const hd=[['e',-9,-4,4.2,3.5,cc],['e',-11.5,-8+tz,1.3,2,cc],['e',-7,-8,1.3,2,cc],['r',-12,-8+tz,1,1,pk],['r',-7,-8,1,1,pk],['r',-10,-7,1,2,cs],['r',-8,-7,1,2,cs],...eyes,['e',-10,-2,2,1,cl2],['r',-10,-3,1,1,pk],['r',-14,-3,2,1,'#dfe2f2'],['r',-14,-1,2,1,'#dfe2f2']].map(p=>[p[0],p[1],p[2]+hy,p[3],p[4],p[5]]);
  parts([['e',9,-3,3,2,cc],['e',12,-4,2.5,2,cc],['e',13.5,-6+tw,1.6,1.8,cs],['r',10,-4,1,2,cs],['r',12,-5,1,2,'#8a8ead'],['e',0,-5+br*.4,9,4.5+br*.5,cc],['e',-1,-2,6,1.8,cl2],['r',-3,-9,1,3,cs],['r',0,-9,1,3,cs],['r',3,-8,1,3,cs],['e',5,-3,3.5,2.8,'#5a5e7e'],['e',3,-1,2,1,cl2],...hd,...(FX.cat?FX.cat(hy):[]),['e',-6,-1,2.5,1.3,cl2],['e',-12,-1,2,1.2,cl2]],x0+15,b-8,0,'#0d0f1c',.62);
  if(!aw)for(let i=0;i<3;i++){const p=(t/2800+i/3)%1,n=3+(p>.4)+(p>.75),zx=x0+9+p*10+Math.sin(p*7+i)*1.5|0,zy=b-14-p*24|0;c.globalAlpha=Math.min(1,(1-p)*1.8);zg(zx+1,zy+1,n,'#0d1a3a');zg(zx,zy,n,'#d7e6ff')}c.globalAlpha=1;
  // morcego pendurado
  const ex=(t%14000)<1400,bs=Math.sin(t/1700)*.8,bx=x0+35+Math.round(bs),y0=b-37,bl=(t%5200)<160||tN<.5;
  const dk=`rgba(24,34,56,${.64*(1-tN)})`,gw=c.createLinearGradient(0,b-38,0,b+4);gw.addColorStop(0,'rgba(0,0,0,0)');gw.addColorStop(1,'rgba(10,6,16,.32)');c.fillStyle=gw;c.fillRect(x0,b-38,CW,42);
  R(x0+8,b-29,18,12,dk);R(wx+2,b-29,18,12,dk);R(cx-6,b-54,12,7,dk);R(x0+52+pw,b-28,18-pw,28,dk);R(x0+CW+1,b-29,3,6,dk);
  for(let i=0;i<CW+16;i+=3){R(x0-2+i,GY-1,1,2+(i%2),tN>.5?'#1f7a8c':'#7fcf8a');if(i%9==0)R(x0-2+i,GY-2,1,1,tN>.5?'#3ba37a':'#a8e8a8')}
  const wg=[];for(let i=0;i<(ex?14:4);i++){const L=ex?6-(i>>2)-(i%4==3?2:0)+(i<2?2:0):9-i,y1=ex?2+(i>>2):3,k=ex&&i%4==3?'#33224f':(i%2?'#6b4a82':'#7a5a92');wg.push(['r',2+i,y1,1,L,k],['r',-3-i,y1,1,L,k])}
  if(ex)wg.push(['r',2,2,14,1,'#2a1f44'],['r',-15,2,14,1,'#2a1f44'],['r',16,1,1,2,'#d8c8e8'],['r',-17,1,1,2,'#d8c8e8']);
  const fu=(t-BAT.t0)/3600,fu2=(t-BAT.t1)/3600,out=fu>=0&&fu<1&&!night,inn=fu2>=0&&fu2<1&&night,bu=(t-BC.t)/BC.d,bf=bu>=0&&bu<1&&!out&&!inn,fly=out||inn||bf;if(out){c.globalAlpha=1;fbat(t,fu)}if(inn){c.globalAlpha=1;fbat(t,1-fu2)}if(bf){const sp=Math.sin(Math.PI*bu);c.globalAlpha=1;fbat(t,0,x0+35+sp*Math.cos(bu*Math.PI*4)*200,b-37-sp*(55+Math.sin(bu*Math.PI*6)*18))}c.globalAlpha=tN;if(tN>.04&&!fly)parts([['r',-1,0,3,2,'#2a2438'],...wg,['e',0,6,3,5,'#4a3d78'],['r',-1,4,2,5,'#6a5a98'],['e',0,12,3.2,2.8,'#4a3d78'],['e',-2.4,14.5,1,2,'#4a3d78'],['e',2.4,14.5,1,2,'#4a3d78'],['r',-3,15,1,1,'#e0a0b0'],['r',2,15,1,1,'#e0a0b0'],bl?['r',-2,12,4,1,'#2a2040']:['r',-2,12,1,1,'#ff6a6a'],bl?['r',0,0,0,0,'#0000']:['r',1,12,1,1,'#ff6a6a'],['r',0,14,1,1,'#e0a0b0'],['r',-1,15,1,1,'#fff'],['r',1,15,1,1,'#fff'],...(FX.bat?FX.bat(0):[])],bx,y0,0,'#161024',.7);c.globalAlpha=1}
function fbat(t,u,px,py){const x=px!=null?Math.round(px):Math.round(x0+35+u*340),y=py!=null?Math.round(py):Math.round(b-37-u*120+Math.sin(u*26)*5),f=Math.sin(t/55),w=[];for(let i=0;i<9;i++){const L=6-(i>>2)-(i%4==3?1:0),yy=Math.round(-f*i*.9+1),k=i%2?'#6b4a82':'#7a5a92';w.push(['r',2+i,yy,1,L,k],['r',-3-i,yy,1,L,k])}parts([['r',-1,-1,3,2,'#2a2438'],...w,['e',0,4,3,4,'#4a3d78'],['r',-1,3,1,1,'#ff6a6a'],['r',1,3,1,1,'#ff6a6a'],...(FX.bat?FX.bat(1):[])],x,y,0,'#161024',.7)}
const RP=[],FLT=[],FALL=[],LC=['#c8803a','#a85a2a','#d8a040','#7aa84a','#e0b050'];let lr=0;
function leaf(x,y,k,v){if(v){R(x,y,2,4,k);R(x,y+1,1,2,'rgba(255,255,255,.28)')}else{R(x,y,4,2,k);R(x+1,y,2,1,'rgba(255,255,255,.28)')}}
function leaves(t){if(rr()<.012*SP&&FALL.length<3)FALL.push({x:106+rr()*88,y:GY-8,ty:GY+16+rr()*14,p:rr()*6,k:LC[rr()*5|0]});
  for(let i=FALL.length-1;i>=0;i--){const q=FALL[i];q.y+=.45*SP;q.x+=Math.sin(t/260+q.p)*.45*SP;leaf(Math.round(q.x),Math.round(q.y),q.k,Math.sin(t/200+q.p)>0?1:0);if(q.y>=q.ty){FALL.splice(i,1);FLT.push({x:q.x,y:q.ty,k:q.k,t0:t,p:q.p});RP.push({x:q.x+2,y:q.ty,t,r:7})}}
  for(let i=FLT.length-1;i>=0;i--){const q=FLT[i],a=(t-q.t0)/30000;if(a>1){FLT.splice(i,1);continue}c.globalAlpha=a>.85?(1-a)/.15:1;q.x+=Math.sin(t/3000+q.p)*.015*SP;leaf(Math.round(q.x),Math.round(q.y+Math.sin(t/900+q.p)*.5),q.k,Math.sin(t/4000+q.p)>.4?1:0)}c.globalAlpha=1}
function puddle(t){const x1=150,y0=GY+12,ph=22,pw=70;
  for(let d=0;d<ph;d++){const e=(d-ph/2+.5)/(ph/2),hw=Math.sqrt(Math.max(0,1-e*e))*pw|0;if(hw<2)continue;const f=d/ph,al=d%4<2;
    c.globalAlpha=1;R(x1-hw-1,y0+d,2*hw+2,1,'#8a7a66');R(x1-hw,y0+d,2*hw,1,al?'#8fb4cc':'#a3c6e2');
    if(tN>.01){c.globalAlpha=tN;R(x1-hw-1,y0+d,2*hw+2,1,'#2a2030');R(x1-hw,y0+d,2*hw,1,al?'#16304f':'#1a3a63');c.globalAlpha=1}
    const dx=Math.round(Math.sin(d*.6+t/350)*1.5),ref=(m,w,col,a)=>{if(d%3!=2&&Math.abs(m+dx-x1)<hw-w/2)R(m-w/2+dx,y0+d,w,1,`rgba(${col},${a*(1-f*.6)})`)};
    ref(176,8,'40,30,40',.4);ref(CNX,14,'107,127,156',.5);ref(212,5,'255,252,225',.15+.5*tN);ref(96,10,'255,190,90',.5*tN)}
  for(let i=0;i<4;i++){const p=(t/2000+i*.25)%1,rx=x1-45+(i*47%90),ry=y0+7+(i*13%9);for(let a=0;a<16;a++)R(rx+Math.cos(a*.39)*p*10,ry+Math.sin(a*.39)*p*3,1,1,`rgba(225,236,248,${.5*(1-p)})`)}
  RP.forEach(q=>{const a=(t-q.t)/1500;if(a<0||a>1)return;for(let k=0;k<28;k++){const an=k*.224;R(q.x+Math.cos(an)*a*(q.r||16),q.y+Math.sin(an)*a*(q.r||16)*.28,1,1,`rgba(235,245,255,${.75*(1-a)})`);if(a>.3)R(q.x+Math.cos(an)*(a-.3)*(q.r||16),q.y+Math.sin(an)*(a-.3)*(q.r||16)*.28,1,1,`rgba(235,245,255,${.4*(1-a)})`)}});while(RP.length&&t-RP[0].t>1500)RP.shift();leaves(t)}
function can(t){const ck=t-CK.t<CK.d,gu=(tN>.5||ck)?1:0;RC.u+=(gu-RC.u)*.04;if(Math.abs(RC.u-gu)<.003)RC.u=gu;const e=RC.u*RC.u*(3-2*RC.u),sk=Math.round((1-e)*18),rim=GY-27,lid=RC.u<.03,sh=!lid&&(t%9000)>7600?Math.sin(t/25)*.8:0,cxx=CNX+Math.round(sh),p=(t%9000)/9000,dip=ck?0:p>.45&&p<.7?Math.sin((p-.45)/.25*Math.PI)*5:0,hx=ck?cl((m.x-CNX)/9,-2.5,2.5):Math.sin(t/1700)*2,bk=(t%4300)<150,gl=tN>.5,
  eye=sx=>bk?[['r',hx+sx,-5+dip,2,1,'#2b2f3b']]:[['r',hx+sx,-6+dip,2,2,gl?'#fff3b0':'#fff'],['r',hx+sx+(sx<0?0:1),-5+dip,1,1,'#111']];
  ell(cxx-7,GY+3,19,2.5,'rgba(0,0,0,.3)');ell(cxx,rim,11.5,3.2,'#1b2230');
  if(!lid)parts([...(FX.can?FX.can(hx,dip):[]),['e',hx*.5,-1+dip*.5,5.5,4,'#8c93a3'],['e',-5+hx,-9+dip+(t%6100<200?1:0),2,2.6,'#8c93a3'],['e',5+hx,-9+dip,2,2.6,'#8c93a3'],['r',hx-5,-10+dip,1,2,'#c48a92'],['r',hx+4,-10+dip,1,2,'#c48a92'],['e',hx,-4+dip,7,5.5,'#9aa1b0'],['e',hx,-3+dip,5,3,'#c4c9d4'],['r',hx-1,-9+dip,2,3,'#4a4f5e'],['r',hx-6,-6+dip,12,3,'#2b2f3b'],...eye(-4),...eye(2),['e',hx,-1+dip,3,2,'#e3e6ec'],['r',hx-1,-2+dip,3,2,'#14100e'],['r',hx-9,-1+dip,3,1,'#c4c9d4'],['r',hx+6,-1+dip,3,1,'#c4c9d4']],cxx,rim-3+sk,0,'#1b1f2b',.8);
  for(let j=0;j<28;j++){const w=Math.round(11.5-j*.14);R(cxx-w,rim+j,2*w,1,j%8==6?'#51617a':'#6b7f9c');R(cxx-w,rim+j,3,1,'#8fa3be');R(cxx+w-3,rim+j,3,1,'#51617a')}
  R(cxx-5,rim+11,10,7,'#59698a');R(cxx-4,rim+12,8,5,'#7d90ab');R(cxx-2,rim+14,4,2,'#cfd8e6');R(cxx+4,rim+22,2,2,'#7a5a4a');
  R(cxx+13,rim+5,1,12,'#6b7f9c');ell(cxx+14,rim+11,2,6,'#8fa3be');
  if(lid){ell(cxx,rim,12,3.2,'#8fa3be');ell(cxx,rim-1,11,2.8,'#a9bad0');ell(cxx,rim-2,8.5,1.8,'#c5d3e4');R(cxx-3,rim-5,6,2,'#6b7f9c');R(cxx-2,rim-6,4,1,'#8fa3be');R(cxx-9,rim-2,3,1,'#f3f6ff')}
  else{ell(cxx,rim,11.5,3.2,'#a9bad0');ell(cxx,rim+.6,9,1.6,'#7d90ab');R(cxx-11,rim-1,3,2,'#f3f6ff');R(cxx+8,rim-2,3,2,'#e3e9f6');
    if(e>.85)parts([['e',-6,-1,2.2,1.6,'#4a4f5e'],['e',6,-1,2.2,1.6,'#4a4f5e'],['r',-8,0,1,1,'#14100e'],['r',-6,1,1,1,'#14100e'],['r',-4,0,1,1,'#14100e'],['r',4,0,1,1,'#14100e'],['r',6,1,1,1,'#14100e'],['r',8,0,1,1,'#14100e'],...(dip<2?[['r',7,-5,5,1,'#e8e4d0'],['r',9,-6,1,3,'#e8e4d0'],['r',11,-6,1,3,'#e8e4d0'],['r',13,-6,2,3,'#e8e4d0']]:[])],cxx,rim,0,'#1b1f2b',.8);
    ell(cxx+23,GY+1,7,2,'#6b7f9c');ell(cxx+23,GY,7,1.2,'#a9bad0');R(cxx+21,GY-2,4,1,'#8fa3be');
    if(dip>3&&e>.85){c.globalAlpha=.9;R(cxx+hx*.5,rim-10+dip*.4,3,3,'#f3f6ff');c.globalAlpha=1}}
  R(cxx+3,GY+3,5,1,'#e8d44a');R(cxx+6,GY+2,2,1,'#e8d44a')}
function fox(t,fr,ov){let sc,x,y0;if(ov){sc=ov.sc;x=ov.x;y0=ov.y}else{if(!FS.on||FS.fr!==fr)return;sc=fr?.5:1;x=Math.round(FS.x);y0=fr?GY:GY+24}if(!ov&&FS.sit)return foxSit(t,fr,x,y0,sc);const ph=x*.55/(ov?ov.s0:sc),y=fr&&!ov?y0:y0+Math.round(Math.abs(Math.sin(ph))*1.4),hb=Math.round(Math.sin(ph*2)*.7),
  lg=(lx,p0,col)=>{const a=Math.round(Math.sin(ph+p0)*3),l=Math.max(0,Math.round(Math.cos(ph+p0)*2));return[['r',lx+a-1,-8,3,7-l,col],['r',lx+a-1,-2-l,3,2,'#241810']]},P=[];
  for(let i=0;i<6;i++)P.push(['e',Math.round(-12-i*2.4),Math.round(-11+Math.sin(t/900+i*.6)*1.2+i*.5),3.4-i*.3,2.8-i*.25,i>3?'#f6ecde':'#d8681f']);
  P.push(...lg(-7,Math.PI,'#8a4a1c'),...lg(7,Math.PI*1.4,'#8a4a1c'),['e',0,-11,11,5,'#e0762c'],['e',1,-8.5,9,2.5,'#f1dcc0'],['e',-2,-14,8,1.6,'#f09040'],['e',-6,-10,4.5,4.5,'#d8681f'],...lg(-7,0,'#d8681f'),...lg(7,Math.PI*.4,'#d8681f'),
    ['e',11,-14+hb,5,4.2,'#e8772a'],['e',14,-12+hb,3.2,2.4,'#f1dcc0'],['e',17,-13+hb,2.4,2,'#e8772a'],['r',19,-14+hb,2,2,'#14100e'],['r',13,-15+hb,1,1,'#14100e'],['e',10,-19+hb,1.6,3.2,'#d8681f'],['e',14,-19+hb,1.6,3.2,'#d8681f'],['r',10,-20+hb,1,2,'#3a2018']);
  if(FX.fox)P.push(...FX.fox(hb));
  if(!fr&&x>100&&x<200){if(t-lr>300){lr=t;RP.push({x:x+7,y:y,t},{x:x-6,y:y-1,t:t+150})}for(let k=0;k<4;k++)R(x-9+Math.round(Math.sin(k*1.3+t/200)*2),y+3+k*2,18-k*2,1,`rgba(224,118,44,${.35-k*.07})`)}ell(x-4*sc,y+1,15*sc,2.2*sc,'rgba(0,0,0,.3)');if(fr)c.globalAlpha=ov?ov.a:.88;parts(P,x,y,0,'#2b140c',fr?sc:undefined);c.globalAlpha=1;if(!fr&&x>100&&x<200){const p=(ph/Math.PI)%1;for(let a=0;a<14;a++)R(x+9+Math.cos(a*.45)*p*7,y+Math.sin(a*.45)*p*2,1,1,`rgba(225,236,248,${.55*(1-p)})`)}}
const XT={t0:-1e9,d:3200};
/* estado da raposa: nasce sempre em x=-30, anda até perto da floresta e some entre as árvores; depois de um tempo nasce de novo */
const FS={on:0,fr:0,x:-30,sit:0,sitT:0,sitEnd:0,last:0,next:1500,hs:[],hl:0};
function startExit(t){if(!FS.on)return;XT.fr=FS.fr;XT.s0=FS.fr?.5:1;XT.x=FS.x;XT.y=FS.fr?GY:GY+24;XT.v=FS.fr?.0086:.0146;XT.t0=t;FS.on=0;FS.sit=0;FS.next=t+XT.d+4000+Math.random()*5000}
/* a raposa aparece de dia E de noite, sempre no primeiro plano (md=0), no modo normal e no Halloween */
function foxStep(t){const md=0,dt=Math.min(60,t-FS.last);FS.last=t;
  if(FS.on&&FS.fr!==md){startExit(t);return}
  if(!FS.on){if(t>=FS.next&&t-XT.t0>=XT.d){FS.on=1;FS.fr=md;FS.x=-30;FS.sit=0}return}
  if(FS.sit&&t>=FS.sitEnd)FS.sit=0;
  if(!FS.sit)FS.x+=(FS.fr?.0086:.0146)*dt;
  if(FS.x>=(FS.fr?270:255)){startExit(t);return}
  if(FS.sit&&t-FS.sitT>3000&&t-FS.hl>650){FS.hl=t;const sc=FS.fr?.5:1;FS.hs.push({x:FS.x+(5+(Math.random()-.5)*8)*sc,y:(FS.fr?GY:GY+24)-31*sc,t})}}
/* raposa sentada (depois de clicar). Depois de um tempo sentada saem corações da cabeça */
function foxSit(t,fr,x,y,sc){const O='#e0762c',D='#d8681f',Wh='#f1dcc0',bt=Math.round(Math.sin(t/1200)*.6),hy=-19+bt,bl=(t%3300)<140,P=[];
  for(let i=0;i<5;i++)P.push(['e',-9-i*2.4,-2+Math.round(Math.sin(t/500+i*.7)*(1+i*.3)*.8),3.2-i*.3,2.4-i*.2,i>2?'#f6ecde':D]);
  P.push(['e',-3,-4,6,4,D],['e',-1,-9+bt,5,7,O],['e',2,-8+bt,3.2,5,Wh],['r',3,-9,3,9,'#8a4a1c'],['r',3,-1,3,2,'#241810'],['r',-1,-2,3,2,'#241810'],
    ['e',5,hy,5,4.2,O],['e',8,hy+2,3.2,2.4,Wh],['e',11,hy+1,2.2,1.8,O],['r',12,hy,2,2,'#14100e'],
    bl?['r',6,hy-2,2,1,'#14100e']:['r',6,hy-3,1,2,'#14100e'],
    ['e',3,hy-6,1.6,3.2,D],['e',7,hy-6,1.6,3.2,D],['r',3,hy-7,1,2,'#3a2018'],['r',7,hy-7,1,2,'#3a2018']);
  if(FX.foxs)P.push(...FX.foxs(bt,hy));
  ell(x-2*sc,y+1,12*sc,2*sc,'rgba(0,0,0,.3)');if(fr)c.globalAlpha=.88;parts(P,x,y,0,'#2b140c',fr?sc:undefined);c.globalAlpha=1}
function foxHearts(t){FS.hs=FS.hs.filter(h=>t-h.t<1800);const hl=typeof hw!=='undefined'&&hw,k=hl?'#ff9a2a':'#ff6a9a',k2=hl?'#ffd080':'#ffc0d6';
  FS.hs.forEach(h=>{const p=(t-h.t)/1800,X=Math.round(h.x+Math.sin(p*7)*3),Y=Math.round(h.y-p*22);c.globalAlpha=Math.min(1,(1-p)*1.6);R(X+1,Y,1,1,k);R(X+3,Y,1,1,k);R(X,Y+1,5,2,k);R(X+1,Y+3,3,1,k);R(X+2,Y+4,1,1,k);R(X+1,Y+1,1,1,k2)});c.globalAlpha=1}
function exitFox(t,slot){const u=(t-XT.t0)/XT.d;if(u<0||u>=1)return;if(slot!==(XT.fr==0&&u<.45?0:1))return;const e=u*u*(3-2*u);fox(t,1,{x:Math.round(XT.x+XT.v*(t-XT.t0)),y:Math.round(XT.y+(GY-4-XT.y)*e),sc:XT.s0+(.32-XT.s0)*e,s0:XT.s0,a:.9*(u<.55?1:1-(u-.55)/.45)})}
const FR={c:-1,f:null,hit:false};
function frog(t){const sw=Math.round(Math.sin(t/700)*.8),ey=Math.sin(t/520)*.3,nn=tN>.5,
  T=(night?FF:BF).reduce((q,f)=>(f.px!=null&&!(t<f.hid)&&Math.hypot(f.px-SX,f.py-(GY-4))<Math.hypot(q.px-SX,q.py-(GY-4))?f:q),{px:SX-80,py:GY-40}),
  cyc=t/5000|0,ph=t%5000;if(FR.c!==cyc){FR.c=cyc;FR.f=T;FR.hit=false}
  const st=nn&&ph<900,jy=(st?(ph<250?-1:ph<750?3:1):0)+(t-FRG.t<600?Math.round(Math.sin((t-FRG.t)/600*Math.PI)*14):0),ext=st?(ph<250?0:ph<500?(ph-250)/250:ph<750?1-(ph-500)/250:0):0,F=FR.f,mx=SX,my=GY+10-jy-7,dist=Math.max(1,Math.hypot(F.px-mx,F.py-my)),
  nr=m.x>0&&Math.hypot(m.x-SX,m.y-(GY-4))<110,ex=Math.round(cl(((nr?m.x:T.px)-SX)/30,-1,1)),ey2=Math.round(cl(((nr?m.y:T.py)-(GY-4))/25,-1,1)),K='#5ab878',D='#3f9660',B='#d6efb0',M='#2d6a48',FG=FX.frog?FX.frog():{},CP=FG.cp||'#4a2fa0',H=FG.h||'#4b3aa8';
  ell(SX-5,GY+10,9,1.6,'rgba(0,0,0,.3)');
  parts([['r',-6,-11,12,3,CP],['r',-8,-8,16,4,CP],['r',-9+sw,-4,18,4,CP],['r',-9+sw,0,18,1,'#6a4ad0'],
    ['e',-8,-3,4,3.4,D],['e',8,-3,4,3.4,D],['e',-9,0,3.4,1.2,D],['e',9,0,3.4,1.2,D],['e',0,-6,7.5,6+ey,K],['e',0,-4,5.5,3.6,B],['e',-5,-1,2.2,1.5,K],['e',5,-1,2.2,1.5,K],
    ['r',-6,-9,12,2,'#5a3ac8'],['r',-1,-9,2,2,'#ffd84a'],['e',0,-12,8,5,K],
    ['e',-4.5,-16,3,3,K],['e',4.5,-16,3,3,K],['e',-4.5,-16,2.2,2.2,'#fff'],['e',4.5,-16,2.2,2.2,'#fff'],['r',-5+ex,-17+ey2,2,2,'#111'],['r',3+ex,-17+ey2,2,2,'#111'],['r',-5+ex,-17+ey2,1,1,'#fff'],['r',3+ex,-17+ey2,1,1,'#fff'],
    ['r',-4,-9,8,1,M],['r',-5,-10,1,1,M],['r',4,-10,1,1,M],...(ext>0?[['e',0,-9,3.5,1.6,'#7a2a3a']]:[]),['r',-6,-11,2,1,'#f09aa8'],['r',4,-11,2,1,'#f09aa8'],['r',-1,-13,1,1,M],['r',1,-13,1,1,M],
    ['r',8,-10,1,10,'#6b4a2a'],['r',7,-13,3,3,'#ffe866'],['r',8,-14,1,5,'#ffe866'],
    ['e',0,-20.5,8,1.6,FG.brim||'#2f2370'],['r',-5,-25,10,5,H],['r',-4,-29,8,4,H],['r',-3,-32,6,3,H],['r',-2,-35,5,3,H],['r',0,-37,4,2,H],['r',2,-38,3,2,H],['r',-5,-23,10,2,FG.band||'#f0c040'],['r',-1,-23,2,2,'#fff6b0'],['r',-2,-28,1,1,'#ffe866'],['r',1,-31,1,1,'#ffe866']],SX,GY+10-jy,0,'#173a2a',.75);
  if(ext>0){const L=Math.min(dist,46)*ext,ux=(F.px-mx)/dist,uy=(F.py-my)/dist;for(let i=0;i<=L;i++)R(mx+ux*i,my+uy*i,1,1,'#ff7a9a');R(mx+ux*L-1,my+uy*L-1,2,2,'#ff4a7a');if(ext>=.98&&dist<=46&&!FR.hit){FR.hit=true;F.hid=t+4000}if(FR.hit)R(mx+ux*L,my+uy*L-2,2,2,'#fffbd0')}
  if(typeof hw!=='undefined'&&hw){
    for(let i=0;i<16;i++){const p=(t/2200+i/16)%1,an=p*14+i*.9,rad=2+p*13,
      sx=Math.round(SX+3+Math.cos(an)*rad),sy=Math.round(GY-18-p*24+Math.sin(an)*rad*.45),k=i%2?'#ff8a1a':'#b070ff';
      c.globalAlpha=1-p;R(sx,sy,2,2,k);R(sx,sy,1,1,i%2?'#ffd080':'#e0c4ff')}
  }else{
    for(let i=0;i<4;i++){const p=(t/1700+i/4)%1,sx=SX+3+Math.sin(p*5+i*2)*5|0,sy=GY-20-p*18|0,k=i%2?'#b79cff':'#ffe866';c.globalAlpha=1-p;R(sx-1,sy,3,1,k);R(sx,sy-1,1,3,k);R(sx,sy,1,1,'#fff')}
  }
  c.globalAlpha=1}
function flies(t,tN2){FF.forEach((f,i)=>{const x=f.x+Math.cos(t*f.s+f.a)*f.rx,y=f.y+Math.sin(t*f.s*1.3+f.a)*f.ry;f.px=x;f.py=y;if(tN2<.03||t<f.hid)return;const bb=.5+.5*Math.sin(t/300+f.a*5);c.globalAlpha=tN2*(.12+.1*bb);R(x-2,y-2,5,5,'#ffe866');c.globalAlpha=tN2*.3;R(x-1,y-1,3,3,'#ffe866');c.globalAlpha=tN2*(.6+.4*bb);R(x,y,1,1,'#fffbd0')});c.globalAlpha=1}
function butter(t,d){BF.forEach((f,i)=>{if(i>1){f.px=-999;f.py=-999;return}const x=f.x+Math.sin(t*f.s+f.a)*60,y=f.y+Math.sin(t*f.s*2.3+f.a)*16,w=Math.abs(Math.sin(t/80+f.a))*3+.6;f.px=x;f.py=y;if(d<.03)return;c.globalAlpha=d;R(x-w,y,w,2,f.k);R(x+1,y,w,2,f.k);R(x,y-1,1,4,'#1d2a44');R(x-w,y+2,w*.6,1,'#fff');R(x+1,y+2,w*.6,1,'#fff')});c.globalAlpha=1}
function rays(t,d){
  if(tN>.03){c.globalCompositeOperation='lighter';const k=tN,col='150,190,255',a=.1;
    for(let i=0;i<4;i++){const s=.6+.4*Math.sin(t/2200+i*1.7),an=2.3+i*.17,x1=214+Math.cos(an)*230,y1=26+Math.sin(an)*230,px=-Math.sin(an),py=Math.cos(an),w=16+i*6,g=c.createLinearGradient(214,26,x1,y1);g.addColorStop(0,`rgba(${col},${a*k*s})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.moveTo(214+px*3,26+py*3);c.lineTo(214-px*3,26-py*3);c.lineTo(x1-px*w,y1-py*w);c.lineTo(x1+px*w,y1+py*w);c.fill()}
    c.globalCompositeOperation='source-over'}
  c.globalAlpha=1-tN;c.drawImage(VG[0],0,0);c.globalAlpha=tN;c.drawImage(VG[1],0,0);c.globalAlpha=1}
function far(t){const d=1-tN;[[d,0],[tN,1]].forEach(([k,n])=>{if(k<.03)return;c.globalAlpha=k;const q=n?'#13294f':'#7d9fb8',e=n?'#0d1f40':'#6a8aa3',gz=Math.sin(t/4000)>.2,X=165,Y=GY-11,tw=(t%5000)<200?1:0;
    R(X,Y,10,5,q);[1,3,7,9].forEach(l=>R(X+l,Y+5,1,5,e));R(X-1,Y,1,2,q);
    if(gz){R(X+9,Y,2,3,q);R(X+11,Y+3,4,3,q);R(X+14,Y+4,2,2,q);R(X+10,Y+2,1,2,e)}else{R(X+9,Y-5,2,6,q);R(X+11,Y-6,4,3,q);R(X+14,Y-5,2,2,q);R(X+10-tw,Y-7,1,2,e);R(X+11,Y-10,1,4,e);R(X+10,Y-10,1,1,e);R(X+14,Y-10,1,4,e);R(X+15,Y-10,1,1,e)}
    R(X+20,Y+3,6,3,q);[20,22,24].forEach(l=>R(X+l,Y+6,1,4,e));R(X+25,Y+1,2,3,q);R(X+26,Y,1,2,e);
    const m=(t/3500|0)%12,rx=100+(m<6?m:12-m)*5+Math.round(Math.min(1,(t%3500)/400)*(m<6?5:-5)),ry=GY-3-((t%3500)<400?Math.round(Math.sin((t%3500)/400*Math.PI)*3):0);
    R(rx,ry,4,3,q);R(rx+3,ry-1,2,2,q);R(rx+3,ry-4,1,3,q);R(rx+4,ry-4,1,3,q);R(rx-1,ry+1,1,1,n?'#5a7aa8':'#e8f0f8');
    const ox=247,oy=50,op=(t%4000)<150;R(ox-4,oy+7,14,1,e);R(ox,oy,6,7,q);R(ox,oy-1,1,2,q);R(ox+5,oy-1,1,2,q);R(ox+2,oy+4,2,3,n?'#2a4a7a':'#9db8cc');
    if(n&&!op){R(ox+1,oy+2,1,1,'#ffe866');R(ox+4,oy+2,1,1,'#ffe866')}else R(ox+1,oy+3,4,1,e);R(ox+2,oy+3,2,1,'#c8803a');
    const sy=64+Math.round(Math.sin(t/3000)*10);R(181,sy,3,4,q);R(180,sy-1,2,2,q);R(183,sy-4,2,6,q);R(183,sy-5,1,1,e)});
  if(d>.03){c.globalAlpha=d;for(let i=0;i<3;i++){const bx=Math.round(((t*.02+i*55)%360)-20),by=18+i*9+Math.round(Math.sin(t/700+i)*3),w=Math.sin(t/110+i)>0?1:0;R(bx-3,by+w,2,1,'#3a5a7a');R(bx-1,by+1-w,2,1,'#3a5a7a');R(bx+1,by+w,2,1,'#3a5a7a')}}c.globalAlpha=1}
const RN=[...Array(110)].map((_,i)=>({x:rr()*(W+40),y:rr()*H,z:i%3?0:1,gy:GY+4+rr()*40})),SPL=[];
function rain(t){if(tN<.03)return;RN.forEach(q=>{const sp=(q.z?4.2:2.4)*SP;q.y+=sp;q.x-=sp*.28;if(q.y>(q.z?q.gy:H)){if(q.z){if(inP(q.x,q.gy,0)){if(rr()<.35)RP.push({x:q.x,y:q.gy,t,r:5})}else SPL.push({x:q.x,y:q.gy,t})}q.y=-6-rr()*20;q.x=rr()*(W+40)}if(q.x<-4)q.x+=W+40;c.globalAlpha=tN*(q.z?.5:.22);R(q.x,q.y,1,q.z?4:2,q.z?'#c6dcf8':'#9db8e0')});
  for(let i=SPL.length-1;i>=0;i--){const s=SPL[i],a=(t-s.t)/220;if(a>1){SPL.splice(i,1);continue}c.globalAlpha=tN*.6*(1-a);R(s.x-1-a*2,s.y-a*2,1,1,'#dbe8fa');R(s.x+1+a*2,s.y-a*2,1,1,'#dbe8fa');R(s.x,s.y-1-a*3,1,1,'#fff')}c.globalAlpha=1}
/* camadas: só desenha o que está visível */
const lay=i=>{const d=1-tN;if(d>.01){c.globalAlpha=d;c.drawImage(BG[0][i],0,0)}if(tN>.01){c.globalAlpha=tN;c.drawImage(BG[1][i],0,0)}c.globalAlpha=1};
const nite=i=>{if(tN>.01){c.globalAlpha=tN;c.drawImage(BG[1][i],0,0);c.globalAlpha=1}};
function frame(t){tN+=((night?1:0)-tN)*.06;if(Math.abs(tN-(night?1:0))<.004)tN=night?1:0;const d=1-tN;hk('tick',t);if(pn2&&!night){BAT.t0=t;BAT.t1=-1e9}else if(!pn2&&night){BAT.t1=t;BAT.t0=-1e9}pn2=night;foxStep(t);owlLook(t);
  const hov=m.x>x0&&m.x<x0+CW+16&&m.y>b-64&&m.y<GY+4;open+=((hov?1:0)-open)*.12;
  c=M;c.globalAlpha=1;c.drawImage(BG[0][0],0,0);nite(0);hk('layer',0);
  if(tN>.1)ST.forEach(q=>{c.globalAlpha=tN*(.25+.75*Math.abs(Math.sin(t/q.s+q.a)));R(q.x,q.y,1,1,'#fff');if(q.b){R(q.x-1,q.y,3,1,'#a9c8ff');R(q.x,q.y-1,1,3,'#a9c8ff')}});c.globalAlpha=1;
  CLD.forEach(q=>{q.x=(q.x+q.v*q.s*16*SP)%(W+80);[[d,0],[tN,1]].forEach(([k,n])=>{if(k<.03)return;const s=q.sp[n];c.globalAlpha=k*.95;c.drawImage(s,Math.round(q.x-40-s.width/2),Math.round(q.y-6*q.s))})});c.globalAlpha=1;
  c.drawImage(BG[0][1],0,0);nite(1);hk('layer',1);
  far(t);fox(t,1);exitFox(t,1);c.drawImage(BG[0][4],0,0);nite(4);hk('layer',4);for(let i=0;i<5;i++)blob(((t*.005*(1+i*.4)+i*90)%420)-60,98+i*13,70,10,.1+.12*d,FX.fog||(night?'110,150,220':'245,250,253'));
  puddle(t);cabin(t);petfx(t);can(t);frog(t);
  lay(2);hk('layer',2);fox(t,0);exitFox(t,0);lay(3);hk('layer',3);foxHearts(t);hk('top',t);
  R(0,0,W,H,`rgba(8,14,50,${.26*tN})`);R(0,0,W,H,`rgba(215,230,242,${.14*d})`);hk('tint');
  rain(t);rays(t,d);const fk=1+.1*Math.sin(t/170)+.05*Math.sin(t/53);
  if(tN>.01){c.globalCompositeOperation='lighter';
    glow(x0+17,b-22,24,'255,190,90',(.4*tN)*fk);glow(x0+61,b-14,34,'255,170,70',(.28*tN)*(.6+open*.9)*fk);glow(x0+CW+2,b-26,32,'255,200,100',(.55*tN)*fk);glow(x0+87,b-22,24,'255,190,90',(.4*tN)*fk);glow(214,26,60,FX.moon||'190,210,255',.22*tN);
    if(tN>.5)glow(CNX,GY-30,18,'255,230,150',.12*tN);blob(x0+61,GY+9,22+open*10,6,.3*tN*(.4+open*.6)*fk,'255,185,90');blob(x0+17,GY+7,14,4,.22*tN*fk,'255,190,90');blob(x0+CW+5,GY+7,12,4,.22*tN*fk,'255,200,100');glow(SX-10,GY+6,9,'120,255,200',.12*tN);hk('glow',t);
    c.globalCompositeOperation='source-over'}
  c.globalCompositeOperation='lighter';glow(SX+6,GY,10,'180,140,255',.22+.1*tN+.06*Math.sin(t/260));c.globalCompositeOperation='source-over';
  flies(t,tN);butter(t,d);
  LV.forEach(l=>{l.y+=.14*l.s*SP;l.x+=(Math.sin(t/900+l.a)*.2-.06)*SP;if(l.y>H){l.y=-4;l.x=rr()*W}if(l.x<0)l.x+=W;c.globalAlpha=.6;R(l.x,l.y,2,1,l.k);R(l.x+1,l.y+1,1,1,l.k)});c.globalAlpha=1}
BG=[build(0),build(1)];
/* nuvens pré-renderizadas (dia/noite) */
CLD.forEach(q=>{const z=q.s,w=Math.ceil(60*z),h=Math.ceil(16*z);
  q.sp=[0,1].map(n=>{const k=document.createElement('canvas');k.width=w;k.height=h;const old=c;c=k.getContext('2d');
    const a=n?'#26376a':'#d9dfe6',b2=n?'#16224a':'#8f9cad',X=w/2,Y=6*z;
    ell(X,Y,18*z,5*z,a);ell(X-10*z,Y+1,11*z,4*z,a);ell(X+11*z,Y+1,12*z,4*z,a);ell(X,Y+4*z,17*z,2*z,b2);c=old;return k})});
(()=>{const g=document.getElementById('lg').getContext('2d');['..XXX..','.XX....','XX.....','XX.....','XX.....','.XX....','..XXX..'].forEach((q,y)=>[...q].forEach((z,x)=>{if(z=='X'){g.fillStyle=x<2?'#fff6c8':'#e6d98a';g.fillRect(x,y,1,1)}}))})();
const tg=document.getElementById('tg'),tgc=document.createElement('canvas');
tgc.width=tgc.height=16;tgc.style.cssText='display:block;width:32px;height:32px;image-rendering:pixelated';tg.textContent='';tg.appendChild(tgc);
const setT=()=>{const g=tgc.getContext('2d'),hl=typeof hw!=='undefined'&&hw,P=(x,y,w,h,k)=>{g.fillStyle=k;g.fillRect(x,y,w,h)};g.clearRect(0,0,16,16);
  if(night){ /* lua: normal = clara · Halloween = lua vermelha com morcego */
    const a=hl?'#ff4a3a':'#f6f3d8',e=hl?'#a81818':'#cfc9a0';
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d1=Math.hypot(x-7.5,y-8),d2=Math.hypot(x-11,y-6);if(d1<6.6&&d2>5.4)P(x,y,1,1,d1>5.6?e:a)}
    if(hl){P(11,10,1,1,'#14061c');P(13,10,1,1,'#14061c');P(12,11,1,1,'#14061c');P(12,2,1,1,'#b070ff');P(14,5,1,1,'#ff8a1a')}
    else{P(12,2,1,1,'#fff');P(14,5,1,1,'#a9c8ff');P(13,9,1,1,'#fff')}
  }else{ /* sol: normal = amarelo · Halloween = sol-abóbora com raios roxos */
    const d=hl?'#ff8a1a':'#ffd84a',e=hl?'#b0510a':'#e8a020',r=hl?'#b070ff':'#ffe866';
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const q=Math.hypot(x-7.5,y-7.5);if(q<4.6)P(x,y,1,1,q>3.6?e:d)}
    [[7,0],[7,14],[0,7],[14,7],[2,2],[12,2],[2,12],[12,12]].forEach(([x,y])=>P(x,y,2,2,r));
    if(hl){P(6,6,1,2,'#2a1408');P(9,6,1,2,'#2a1408');P(6,10,4,1,'#2a1408')}
  }
  tg.setAttribute('aria-label',night?'Modo claro':'Modo escuro');
  document.documentElement.classList.toggle('day',!night)};
setT();tg.onclick=()=>{if(FX.toggle&&FX.toggle())return;night=!night;setT()};
const mp=e=>{cm.x=e.clientX;cm.y=e.clientY;const s=Math.max(innerWidth/W,innerHeight/H);m.x=(e.clientX-(innerWidth-W*s)*.3)/s;m.y=(e.clientY-(innerHeight-H*s)*.5)/s};
addEventListener('pointermove',mp);addEventListener('pointerdown',mp);document.addEventListener('pointerleave',()=>{m.x=-1;cm.x=-1});
const OWL=['.b.......b.','.bb.....bb.','.bbbbbbbbb.','bbWWbbbWWbb','bWWKbYbKWWb','bbWWbYbWWbb','bbbLLLLLbbb','bLLlLLLlLLb','bLLLLLLLLLb','.bLLlLLlLb.','..bbLLLbb..','..YY...YY..'],OP={b:'#6b4a35',W:'#f4ecd8',K:'#14100e',Y:'#f0a030',L:'#c9a07a',l:'#a8805c'};
const OWLC=['ow','ow2'],gzq=(d,a,b)=>d<-b?-2:d<-a?-1:d>b?2:d>a?1:0;
/* olhar: segue o cursor; enquanto se digita, olha para onde o texto está sendo escrito */
function owlGz(e){const r=e.getBoundingClientRect(),ox=r.left+r.width/2,oy=r.top+r.height*.6,typ=performance.now()-OT.t<3500,tx=typ?OT.x:cm.x,ty=typ?OT.y:cm.y;
  if(tx<0||r.width<2)return{x:0,y:0};
  return{x:gzq(tx-ox,30,160),y:cl(gzq(ty-oy,25,25),-1,1)}}
const owlPix=(g,bl,gz,yo)=>{OWL.forEach((q,y)=>{if(bl&&y>2&&y<6)q=['bbbbbbbbbbb','bKKKbYbKKKb','bbbbbYbbbbb'][y-3];else if(y==4)q=q.replace(/K/g,'W');[...q].forEach((z,x)=>{if(OP[z]){g.fillStyle=OP[z];g.fillRect(x,y+yo,1,1)}})});
  if(!bl){const py=4+gz.y,lx=cl(3+gz.x,py==4?1:2,3),rx=cl(7+gz.x,7,py==4?9:8);g.fillStyle=OP.K;g.fillRect(lx,py+yo,1,1);g.fillRect(rx,py+yo,1,1)}};
function owl(bl){OWLC.forEach(id=>{const e=document.getElementById(id);if(!e)return;const g=e.getContext('2d');g.clearRect(0,0,11,12);owlPix(g,bl,owlGz(e),0)})}
let OLt=0;const OLk={};
function owlLook(t){if(t-OLt<50)return;OLt=t;let ch=0;OWLC.forEach(id=>{const e=document.getElementById(id);if(!e)return;const g=owlGz(e),k=g.x+','+g.y;if(OLk[id]!==k){OLk[id]=k;ch=1}});if(ch)owl(owlBl)}
/* segunda coruja (antiga, hoje escondida pelo CSS; a coruja viva é a 'coruja' mais abaixo) */
{const bg=document.querySelector('.big');if(bg&&!document.getElementById('ow2')){const o=document.createElement('canvas');o.id='ow2';o.width=11;o.height=12;bg.appendChild(o)}}
owl(0);setInterval(()=>{if(document.hidden)return;owlBl=1;owl(1);setTimeout(()=>{owlBl=0;owl(0)},160)},3600);
const VS=(id,fl)=>{const g=document.getElementById(id).getContext('2d'),P=(x,y,w,h,k)=>{g.fillStyle=k;g.fillRect(x,y,w,h)};g.clearRect(0,0,64,64);P(3,9,8,7,'#9fd0e8');P(3,9,1,7,'#e0f4fc');P(10,9,1,7,'#6aa0c0');P(4,12,6,4,'#5aa0c8');P(4,8,6,1,'#cfe6f2');fl.forEach(([x,y,k])=>{P(x,y+1,1,11-y,'#3f9a5a');P(x+1,y+6,2,1,'#5ab870');P(x-1,y,3,1,k);P(x,y-1,1,3,k);P(x,y,1,1,'#ffe866')})};
const vases=()=>{VS('v1',[[4,3,'#ff7aa8'],[7,1,'#ffffff'],[10,4,'#b79cff']]);VS('v2',[[4,2,'#ffd84a'],[7,4,'#ff7aa8'],[10,1,'#ffffff']]);VS('v3',[[3,3,'#b79cff'],[6,1,'#ff9a6a'],[10,3,'#ffffff']])};vases();
const NK='nocturne-notas-v2',NC=['#c8504a','#4da3ff','#3fa38a','#e0a040','#a98aff','#ff8fb5'],$=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
let notes=[],cur=null,arm=0;
try{notes=JSON.parse(localStorage.getItem(NK)||'[]')||[];const old=localStorage.getItem('nocturne-nota');if(old&&!notes.length)notes=[{id:'n'+Date.now(),t:'Nota antiga',x:old,d:Date.now()}]}catch(e){notes=[]}
const save=()=>{try{localStorage.setItem(NK,JSON.stringify(notes))}catch(e){}};
function list(flash){$('ml').innerHTML=notes.length?notes.map((n,i)=>`<button class="mini${n.id===flash?' new':''}" data-id="${n.id}" style="--c:${(FX.nc||NC)[i%6]}" title="${esc(n.t||'Sem título')}"><span class="mt">${esc(n.t||'Sem título')}</span></button>`).join(''):'<p class="empty">Nenhuma nota.<br>Toque em + Novo</p>';$('cnt').textContent=notes.length}
function info(){$('ct').textContent=$('nt').value.length+'/8000'}
function openN(id){cur=notes.find(n=>n.id===id);if(!cur)return;$('ntt').value=cur.t;$('nt').value=cur.x;$('dt').textContent=new Date(cur.d).toLocaleDateString('pt-BR');info();$('ed').classList.add('on');setTimeout(()=>$('nt').focus(),260)}
function closeN(){$('ed').classList.remove('on');cur=null;arm=0;$('dl').textContent='Excluir';list()}
/* exige registro antes de criar/abrir notas (a coruja pede) */
$('nw').onclick=()=>{if(needReg())return;const n={id:'n'+Date.now(),t:'Nota '+(notes.length+1),x:'',d:Date.now()};notes.unshift(n);save();list(n.id)};
$('ml').onclick=e=>{const b=e.target.closest('.mini');if(b){if(needReg())return;openN(b.dataset.id)}};
$('ntt').oninput=()=>{if(cur){cur.t=$('ntt').value;save()}};
$('nt').oninput=()=>{if(cur){cur.x=$('nt').value;cur.d=Date.now();save()}info()};
$('cl').onclick=closeN;
$('ed').onclick=e=>{if(e.target===$('ed'))closeN()};
addEventListener('keydown',e=>{if(e.key=='Escape'&&cur)closeN()});
$('dl').onclick=()=>{if(!cur)return;if(!arm){arm=1;$('dl').textContent='Confirmar?';setTimeout(()=>{arm=0;$('dl').textContent='Excluir'},3000);return}notes=notes.filter(n=>n!==cur);save();closeN()};
list();

/* ===== interações: carinho no gato, lata de lixo e sapo ===== */
const hitCat=()=>m.x>x0&&m.x<x0+32&&m.y>b-22&&m.y<b-2,
      hitCan=()=>Math.abs(m.x-CNX)<14&&m.y>GY-38&&m.y<GY+4,
      hitFrog=()=>Math.abs(m.x-SX)<11&&m.y>GY-30&&m.y<GY+12;
let AC;
/* limite de pulos do sapo: no máximo 3 a cada 5 s */
const FJ=[];
function frogJump(n){while(FJ.length&&n-FJ[0]>5000)FJ.shift();if(FJ.length>=3)return false;FJ.push(n);FRG.t=n;return true}
function croak(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const n=AC.currentTime;
  [0,.13].forEach((d,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='square';
    o.frequency.setValueAtTime(150-i*30,n+d);o.frequency.exponentialRampToValueAtTime(90,n+d+.1);
    g.gain.setValueAtTime(.05,n+d);g.gain.exponentialRampToValueAtTime(.001,n+d+.11);
    o.connect(g);g.connect(AC.destination);o.start(n+d);o.stop(n+d+.12)})}catch(e){}}
const hitFox=()=>{if(!FS.on)return 0;const sc=FS.fr?.5:1,y=FS.fr?GY:GY+24;return Math.abs(m.x-(FS.x+3*sc))<18*sc+2&&m.y>y-(FS.sit?30:24)*sc&&m.y<y+3},
      hitBat=()=>tN>.5&&performance.now()-BC.t>BC.d&&Math.abs(m.x-(x0+35))<10&&m.y>b-40&&m.y<b-18;
addEventListener('pointermove',()=>{
  if(hitCat())PT.t=performance.now();
  cv.style.cursor=hitCat()?'grab':(hitCan()||hitFrog()||hitFox()||hitBat())?'pointer':''});
addEventListener('pointerdown',()=>{const n=performance.now();
  if(hitCat())PT.t=n;
  if(hitCan())CK.t=n;
  if(hitFrog()&&frogJump(n))croak();
  if(hitFox()){if(!FS.sit){FS.sit=1;FS.sitT=n}FS.sitEnd=n+12000}
  if(hitBat())BC.t=n});
function petfx(t){
  if(t-PT.t<450&&t-PT.last>260){PT.last=t;PT.h.push({x:x0+5+Math.random()*14,y:b-22,t})}
  PT.h=PT.h.filter(q=>t-q.t<1400);
  const k=(typeof hw!=='undefined'&&hw)?'#ff9a2a':'#ff7aa8';
  PT.h.forEach(q=>{const p=(t-q.t)/1400,X=Math.round(q.x+Math.sin(p*8)*3),Y=Math.round(q.y-p*22);
    c.globalAlpha=1-p;R(X+1,Y,1,1,k);R(X+3,Y,1,1,k);R(X,Y+1,5,1,k);R(X+1,Y+2,3,1,k);R(X+2,Y+3,1,1,k)});
  c.globalAlpha=1}

/* ===== coruja espiando o que se digita ===== */
function caretXY(el){const r=el.getBoundingClientRect(),cs=getComputedStyle(el),fs=parseFloat(cs.fontSize)||10,p=el.selectionStart||0;
  if(el.tagName=='INPUT')return{x:Math.min(r.right,r.left+p*fs),y:r.top+r.height/2};
  const lh=parseFloat(cs.lineHeight)||22,cols=Math.max(1,Math.floor(r.width/fs)),L=el.value.slice(0,p).split('\n');let ln=0;
  L.forEach((q,i)=>{ln+=i<L.length-1?Math.max(1,Math.ceil(q.length/cols)):Math.floor(q.length/cols)});
  const col=L[L.length-1].length%cols;
  return{x:Math.min(r.right,r.left+col*fs),y:cl(r.top+ln*lh+lh/2-el.scrollTop,r.top,r.bottom)}}
const peek=e=>{const q=caretXY(e.target);OT={x:q.x,y:q.y,t:performance.now()}};
['ntt','nt'].forEach(id=>{const el=document.getElementById(id);if(el)['input','keyup','click','focus'].forEach(ev=>el.addEventListener(ev,peek))});

/* ===== interações extras dos animais (antes em animais.js) =====
   Embrulham as funções acima; para desligar, apague este bloco inteiro. */
(()=>{
  const now=()=>performance.now(),rnd=(a,b)=>a+Math.random()*(b-a),hwOn=()=>typeof hw!=='undefined'&&hw;

  /* vaga-lumes (noite) e borboletas (dia): fogem do cursor e voltam devagar */
  const pf=(f,t)=>[f.x0+f.ox+Math.cos(t*f.s+f.a)*f.rx,f.y0+f.oy+Math.sin(t*f.s*1.3+f.a)*f.ry];
  const pb=(f,t)=>[f.x0+f.ox+Math.sin(t*f.s+f.a)*60,f.y0+f.oy+Math.sin(t*f.s*2.3+f.a)*16];
  function shy(arr,pos,t){arr.forEach(f=>{
    if(f.x0==null){f.x0=f.x;f.y0=f.y;f.ox=f.oy=0}
    const[x,y]=pos(f,t),dx=x-m.x,dy=y-m.y,d=Math.hypot(dx,dy)||1;
    if(m.x>0&&d<36){const k=(36-d)/36;f.ox+=dx/d*k*2.4;f.oy+=dy/d*k*2.4}
    f.ox=cl(f.ox*.985,-60,60);f.oy=cl(f.oy*.985,-60,60);
    f.x=cl(f.x0+f.ox,6,W-6);f.y=cl(f.y0+f.oy,6,GY+34)})}
  const _flies=flies;
  flies=function(t,k){shy(FF,pf,t);_flies(t,k);
    if(k>.03)FF.forEach(f=>{const s=Math.hypot(f.ox,f.oy);if(s>5&&!(t<f.hid)){c.globalAlpha=Math.min(.7,s/30)*k;R(f.px-f.ox*.06,f.py-f.oy*.06,1,1,'#fffbd0');c.globalAlpha=1}})};
  const _butter=butter;
  butter=function(t,d){shy(BF,pb,t);_butter(t,d)};

  /* gato: ao clicar, mia (a boca abre) e solta notas musicais */
  const MEOW={t:-1e9},NT=[];let baseCat;
  const meowParts=hy=>{const a=now()-MEOW.t;if(a>650)return[];const o=Math.sin(a/650*Math.PI);return[['e',-10,-1.6+hy,1.5+o*.6,.8+o*1.1,'#7a2a3a']]};
  Object.defineProperty(FX,'cat',{configurable:true,enumerable:true,get(){return hy=>[...(baseCat?baseCat(hy):[]),...meowParts(hy)]},set(v){baseCat=v}});
  const _petfx=petfx;
  petfx=function(t){_petfx(t);
    const k=hwOn()?'#ffb060':'#ffe0f0',k2=hwOn()?'#8a3ad0':'#ff8fb5';
    for(let i=NT.length-1;i>=0;i--){const q=NT[i],a=(t-q.t)/1300;
      if(a>1){NT.splice(i,1);continue}if(a<0)continue;
      const X=Math.round(q.x+Math.sin(a*7+q.x)*3),Y=Math.round(q.y-a*26);
      c.globalAlpha=Math.min(1,(1-a)*1.6);R(X+1,Y,1,4,k);R(X,Y+3,2,2,k);R(X+2,Y,2,1,k);R(X+3,Y+1,1,1,k2)}
    c.globalAlpha=1};

  /* guaxinim: com o cursor perto a lata abre e ele acompanha o mouse; ao clicar, sai lixo voando */
  const DB=[];const _can=can;
  can=function(t){
    if(m.x>0&&Math.hypot(m.x-CNX,m.y-(GY-24))<48)CK.t=Math.max(CK.t,t-CK.d+700);
    _can(t);
    for(let i=DB.length-1;i>=0;i--){const q=DB[i],a=(t-q.t)/1000,y=q.y+q.vy*a+70*a*a;
      if(a>1.6||y>GY+2){DB.splice(i,1);continue}
      R(q.x+q.vx*a,y,2,2,q.k);R(q.x+q.vx*a,y,1,1,'#fff')}};

  /* sapo mago: aura ao passar o mouse, pula na aproximação e solta faíscas ao clicar */
  const FB={t:-1e9};const _frog=frog;
  frog=function(t){
    if(hitFrog()){c.globalCompositeOperation='lighter';glow(SX,GY-12,26,'180,140,255',.16+.08*Math.sin(t/180));c.globalCompositeOperation='source-over'}
    _frog(t);
    const a=(t-FB.t)/900;
    if(a>=0&&a<1){for(let i=0;i<12;i++){const an=i/12*6.283+a*(hwOn()?7:1.5),rad=4+a*26,X=Math.round(SX+Math.cos(an)*rad),Y=Math.round(GY-14+Math.sin(an)*rad*.7),k=hwOn()?['#b070ff','#ff8a1a'][i%2]:['#b79cff','#ffe866','#fff','#7ae0ff'][i%4];
      c.globalAlpha=1-a;R(X-1,Y,3,1,k);R(X,Y-1,1,3,k)}c.globalAlpha=1}};

  /* raposa: fazer carinho (mouse em cima, sentada) solta corações */
  const _fh=foxHearts;
  foxHearts=function(t){
    if(FS.on&&FS.sit&&hitFox()&&t-FS.hl>420){FS.hl=t;const sc=FS.fr?.5:1;FS.hs.push({x:FS.x+(5+(Math.random()-.5)*8)*sc,y:(FS.fr?GY:GY+24)-31*sc,t})}
    _fh(t)};

  /* gatilhos de ponteiro */
  let fxh=0,frh=0,bh=0;
  addEventListener('pointermove',()=>{const n=now(),f=hitFox(),g=hitFrog(),h=hitBat();
    if(f&&!fxh&&FS.on&&!FS.sit){FS.sit=1;FS.sitT=n;FS.sitEnd=n+5000}  /* raposa senta quando o mouse chega */
    if(g&&!frh)frogJump(n);                                             /* sapo dá um pulo na aproximação */
    if(h&&!bh)BC.t=n;                                                   /* morcego se assusta e voa */
    fxh=f?1:0;frh=g?1:0;bh=h?1:0});
  addEventListener('pointerdown',()=>{const n=now();
    if(hitCat()){MEOW.t=n;for(let i=0;i<3;i++)NT.push({x:x0+7+i*4,y:b-24,t:n+i*150})}
    if(hitCan())for(let i=0;i<7;i++)DB.push({t:n,x:CNX+rnd(-5,5),y:GY-34,vx:rnd(-35,35),vy:rnd(-95,-55),k:['#e8d44a','#e8e4d0','#c8504a','#7ae04a','#b79cff'][i%5]});
    if(hitFrog()&&now()-FRG.t<30)FB.t=n});
})();

/* ===== CORUJA interativa (igual nos dois modos; chapéu de bruxa só no Halloween) =====
   - empoleirada na borda do bloco de notas; olhos e cabeça seguem o mouse
   - editor aberto: voa para o canto inferior esquerdo, maior (4x; 3x no celular)
   - pisca, arregala os olhos e se arrepia com o mouse perto, acena ao digitar,
     bate as asas e fala ao clicar, dorme (Zzz) após 12s parada
   - PEDE O REGISTRO antes de o usuário começar a escrever */
const coruja=(()=>{
  const W=22,H=28,pad=document.querySelector('.pad'),ed=document.getElementById('ed');
  if(!pad||!ed)return{on(){},hat(){},ask(){},say(){}};
  const P={b:'#8a5a34',d:'#5e3a1e',w2:'#74482a',l:'#a8744a',s:'#e6cfa0',s2:'#c9a672',w:'#fff4d6',k:'#14100e',o:'#ffb020',o2:'#c87810',f:'#e89a20',h:'#2a1840',H:'#4a2c6e',a:'#ff8a1a',y:'#ffe866'};
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  cv.style.cssText='display:none;position:fixed;left:0;top:0;z-index:6;cursor:pointer;image-rendering:pixelated;filter:drop-shadow(2px 3px 0 rgba(0,0,0,.3));touch-action:manipulation';
  document.body.appendChild(cv);
  const g=cv.getContext('2d'),R=(x,y,w,h,k)=>{g.fillStyle=P[k]||k;g.fillRect(x,y,w,h)};
  const bub=document.createElement('div');
  bub.style.cssText="position:fixed;left:0;top:0;z-index:26;font:8px 'Press Start 2P',monospace;color:#2a1840;background:#fdf6dc;padding:7px 9px;box-shadow:0 0 0 3px #14061c;opacity:0;transition:opacity .2s;pointer-events:none;white-space:normal;max-width:min(230px,60vw);line-height:13px";
  document.body.appendChild(bub);
  const WORDS=['Hoo!','Hoo hoo!','Boo!','Quem? Hu-uu!','Escreva algo!'];let bubUntil=0,hoots=0,askMode=0,hat=false;
  const say=(t,ms)=>{askMode=0;bub.style.pointerEvents='none';bub.textContent=t;bub.style.opacity=1;bubUntil=ms?performance.now()+ms:Infinity};
  bub.onclick=()=>{if(askMode)goReg()};
  function draw(o){
    g.clearRect(0,0,W,H);const {fx,fy}=o;
    R(5,16,12,9,'b');R(4,18,14,5,'b');R(6,25,10,1,'b');if(o.ruffle)R(3,17,16,7,'b');
    R(7,26,3,2,'f');R(12,26,3,2,'f');R(7,17,8,8,'s');
    for(let y=18;y<25;y+=2)for(let k=0;k<3;k++)R(8+k*2+(y%4?0:1),y,1,1,'s2');
    const r=Math.round(o.wf*6),q=Math.round(o.wf*3);
    [3-q,16+q].forEach(x=>{R(x,17-r,3,8,'d');R(x+1,18-r,1,5,'w2')});
    R(6+fx,8+fy,10,1,'b');R(5+fx,9+fy,12,1,'b');R(4+fx,10+fy,14,6,'b');R(5+fx,16+fy,12,1,'b');
    R(5+fx,10+fy,12,5,'l');R(5+fx,9+fy,5,1,'d');R(12+fx,9+fy,5,1,'d');
    [5,12].forEach(ex=>{
      if(o.closed)R(ex+fx,12+fy,5,1,'d');
      else{R(ex+fx,10+fy,5,5,'w');R(ex+fx+o.px,10+fy+o.py,o.ps,o.ps,'k');R(ex+fx+o.px,10+fy+o.py,1,1,'#fff')}});
    R(10+fx,12+fy,2,2,'o');R(10+fx,14+fy,2,1,'o2');
    if(o.hat){[[12,0,2],[11,1,3],[10,2,4],[9,3,6],[8,4,7]].forEach(([x,y,w])=>{R(x+fx,y+fy,w,1,'H');R(x+w-1+fx,y+fy,1,1,'h')});
      R(7+fx,5+fy,9,1,'a');R(10+fx,5+fy,2,1,'y');R(4+fx,6+fy,14,1,'H');R(3+fx,7+fy,16,1,'h')}}
  let on=0,mx=innerWidth/2,my=innerHeight/2,lx=0,ly=0,x=0,y=0,s=3,from=null,t0=0,mv=false,cur=null;
  let last=performance.now(),lastAct=last,asleep=false,startle=-1e4,flapUntil=0,nodUntil=0,wf=0,hover=false,nextBlink=last+2500,blinkEnd=0;
  const act=()=>{lastAct=performance.now();if(asleep){asleep=false;startle=lastAct;flapUntil=lastAct+450;bub.style.opacity=0;bubUntil=0;askMode=0}};
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;act()},{passive:true});
  addEventListener('pointerdown',e=>{mx=e.clientX;my=e.clientY;act()},{passive:true});
  addEventListener('keydown',()=>{act();nodUntil=performance.now()+150});
  cv.addEventListener('pointerenter',()=>hover=true);cv.addEventListener('pointerleave',()=>hover=false);
  cv.addEventListener('click',()=>{const t=performance.now();flapUntil=t+600;startle=t;say(WORDS[hoots++%WORDS.length],1600)});
  const ease=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
  function frame(now){
    requestAnimationFrame(frame);if(!on)return;
    const dt=Math.min(.05,(now-last)/1000);last=now;
        const st=ed.classList.contains('on')?1:0,sc=st?(innerWidth<520?4:5):(innerWidth<520?3:4),w=W*sc,h=H*sc,pr=pad.getBoundingClientRect();
    const tx=st?14:pr.right-16-w,ty=st?innerHeight-h-14:pr.top+5-h;
    if(cur===null){x=tx;y=ty;s=sc;cur=st}
    if(st!==cur){cur=st;from={x,y,s};t0=now;mv=true;flapUntil=now+800;cv.style.zIndex=st?25:6}
    let arc=0;
    if(mv){const p=Math.min(1,(now-t0)/750),e=ease(p);x=from.x+(tx-from.x)*e;y=from.y+(ty-from.y)*e;s=from.s+(sc-from.s)*e;arc=Math.sin(Math.PI*p)*60;if(p>=1)mv=false}
    else{x=tx;y=ty;s=sc}
    const cw=W*s,ch=H*s;
    if(!asleep&&now-lastAct>12000){asleep=true;say('Zzz...',0)}
    const cx=x+cw/2,cy=y-arc+12*s;let tlx=0,tly=0,near=false;
    if(!asleep){const dx=mx-cx,dy=my-cy,d=Math.hypot(dx,dy)||1,k=Math.min(1,d/160);tlx=dx/d*k;tly=dy/d*k;near=d<90}
    const sm=1-Math.exp(-dt*10);lx+=(tlx-lx)*sm;ly+=(tly-ly)*sm;
    const fx=lx>.5?1:lx<-.5?-1:0,fy=(ly>.55||now<nodUntil||asleep)?1:0,ps=near&&!asleep?3:2,rg=5-ps;
    const px=Math.max(0,Math.min(rg,Math.round(rg*(.5+lx*.5)))),py=Math.max(0,Math.min(rg,Math.round(rg*(.5+ly*.5))));
    if(now>nextBlink){blinkEnd=now+130;nextBlink=now+(Math.random()<.25?300:2200+Math.random()*3200)}
    const closed=asleep||now<blinkEnd,flap=mv||now<flapUntil;
    wf+=((flap?.5+.5*Math.sin(now/55):0)-wf)*.5;
    const sh=now-startle<320?Math.sin((now-startle)/320*Math.PI)*10:0,bob=Math.sin(now/650)*(asleep?.4:.7);
    draw({fx,fy,px,py,ps,closed,wf,hat,ruffle:hover||(near&&!asleep)});
    cv.style.width=cw+'px';cv.style.height=ch+'px';cv.style.transform=`translate(${x}px,${y-arc-sh+bob}px)`;
    if(bubUntil&&now>bubUntil){bub.style.opacity=0;bubUntil=0;askMode=0;bub.style.pointerEvents='none'}
    if(bubUntil){const bw=bub.offsetWidth,bx=st?x+cw+10:x-bw-10;bub.style.transform=`translate(${Math.max(4,bx)}px,${Math.max(4,y-arc-sh+6*s)}px)`}}
  requestAnimationFrame(frame);
  /* pede o registro: balão clicável + botão de cadastro pulsando */
  const ask=()=>{act();const t=performance.now();flapUntil=t+500;startle=t;
    say('Hoo! Faça seu registro antes de escrever! (toque aqui)',7000);askMode=1;bub.style.pointerEvents='auto';bub.style.cursor='pointer';
    const r=window.regBtn;if(r){r.classList.remove('pulse');void r.offsetWidth;r.classList.add('pulse')}};
  return{on:v=>{on=v?1:0;cv.style.display=on?'':'none';if(on){cur=null;lastAct=performance.now()}else{bub.style.opacity=0;bubUntil=0;asleep=false}},
    hat:v=>{hat=!!v},ask,say}
})();
coruja.on(1);

/* ===== REGISTRO / USUÁRIO ===== */
const REGISTRO='loginouregistro.html'; /* página de login/registro */
const KU='nocturne-user';
const getUser=()=>{try{return JSON.parse(localStorage.getItem(KU)||'null')}catch(e){return null}};
/* vai para o registro guardando a página de origem, para voltar depois */
function goReg(){const vo=(location.pathname.split('/').pop()||'index.html')+location.search;
  try{sessionStorage.setItem('nocturne-voltar',vo)}catch(e){}
  location.href=REGISTRO+'?voltar='+encodeURIComponent(vo)}
const needReg=()=>{if(getUser())return false;coruja.ask();return true};
(()=>{
  const act=document.querySelector('.act');if(!act)return;

  /* ---------- estilos (botão de registro, menu, perfil, galeria, publicações) ---------- */
  const css=document.createElement('style');
  css.textContent=`
  .hw #rg{color:#2a1408;background:#e8761a;box-shadow:inset -4px -4px #a8480a,inset 4px 4px #ffa84a,0 0 0 4px #14061c,0 0 14px rgba(255,120,30,.5)}
  .hw #rg:hover{filter:brightness(1.12)}
  .hw #usr{background:#3a1c5a;box-shadow:inset -4px -4px #1c0a30,inset 4px 4px #6a3a9c,0 0 0 4px #14061c,0 0 14px rgba(255,120,30,.45)}
  .ap{display:block;flex:none;background-size:cover;background-position:center;background-repeat:no-repeat;image-rendering:pixelated}
  .ap.s36{width:36px;height:36px}.ap.s54{width:54px;height:54px}
  .umn{display:none;flex-direction:column;gap:8px;position:absolute;right:0;top:calc(100% + 12px);z-index:12;background:#fdf6dc;color:#5a3519;font:8px 'Press Start 2P',monospace;padding:10px;box-shadow:0 0 0 3px #5a3519;white-space:nowrap;line-height:14px}
  .umn.on{display:flex}
  .umn .nm{margin-bottom:2px}
  .hw .umn{background:#2a1a3a;color:#ffb060;box-shadow:0 0 0 3px #14061c,0 0 14px rgba(255,120,30,.4)}
  .hw .umn .b,.hw .pfc .b{color:#2a1408;background:#e8761a;box-shadow:inset -3px -3px #a8480a,inset 3px 3px #ffa84a,0 0 0 3px #3a1408}
  .hw .umn .b.del,.hw .pfc .b.del{color:#fff;background:#a02a4a;box-shadow:inset -3px -3px #5a1228,inset 3px 3px #d85a7a,0 0 0 3px #14061c}
  .pfo{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;padding:12px;background:rgba(5,10,31,.6);opacity:0;pointer-events:none;transition:opacity .2s}
  .pfo.on{opacity:1;pointer-events:auto}
  .pfc{position:relative;width:min(92vw,400px);max-height:88vh;display:flex;flex-direction:column;background:#fdf6dc;border:4px solid #5a3519;box-shadow:inset 0 -4px #e6d9aa,8px 8px 0 rgba(0,0,0,.4);padding:22px 14px 14px;color:#5a3519;font:9px 'Press Start 2P',monospace;transform:scale(.6);transition:transform .25s cubic-bezier(.2,1.2,.4,1)}
  .pfo.on .pfc{transform:none}
  .pfc:before{content:'';position:absolute;top:-11px;left:10px;right:10px;height:14px;background:radial-gradient(circle at 50% 50%,#2a2a34 0 3px,#9aa 3px 5px,transparent 5.5px) 0 0/20px 14px repeat-x}
  .pfc .ap{background-color:#cfe0f0}
  .pfc .top{display:flex;align-items:center;gap:12px;margin-bottom:10px}
  .pfc .ap.s54{box-shadow:0 0 0 3px #5a3519}
  .pfc .who{flex:1;min-width:0}
  .pfc .nm2{font-size:10px;line-height:14px;word-break:break-all}
  .pfc .em{font-size:7px;line-height:12px;color:#8a6a40;margin-top:4px;word-break:break-all}
  .pfc .acts{display:flex;flex-wrap:wrap;gap:8px;margin:2px 3px 12px}
  .pfc .st{display:flex;justify-content:space-around;text-align:center;font-size:7px;color:#8a6a40;margin-bottom:12px}
  .pfc .st b{display:block;font-weight:normal;font-size:11px;color:#2a1c10;margin-bottom:4px}
  .pfc .tbs{display:flex;gap:6px;margin:0 3px 10px}
  .pfc .tb{flex:1;font:inherit;font-size:7px;padding:8px 2px;border:0;cursor:pointer;color:#5a3519;background:#d8c690;box-shadow:inset -3px -3px rgba(0,0,0,.18),inset 3px 3px rgba(255,255,255,.35),0 0 0 3px #3a2410}
  .pfc .tb.on{color:#fff;background:#3fa38a;box-shadow:inset -3px -3px #2a7a66,inset 3px 3px #6cd0b4,0 0 0 3px #1d4f45}
  .pfc .lst{flex:1;overflow-y:auto;min-height:110px;padding:4px 0}
  .pfc .po{background:#fffdf0;box-shadow:0 0 0 3px #e6d9aa;padding:10px;margin:0 4px 14px 3px}
  .pfc .pt{font-size:9px;line-height:14px;color:#5a3519;word-break:break-word}
  .pfc .pd{font-size:6px;color:#8a6a40;margin:4px 0 6px}
  .pfc .px{font-size:8px;line-height:14px;color:#2a1c10;white-space:pre-wrap;word-break:break-word;max-height:100px;overflow-y:auto;margin-bottom:8px}
  .pfc .ur{display:flex;align-items:center;gap:8px;margin:0 4px 10px 3px}
  .pfc .un{flex:1;min-width:0;font-size:8px;line-height:12px;word-break:break-all}
  .pfc .vz{font-size:7px;line-height:13px;color:#8a6a40;text-align:center;padding:14px 6px}
  .pfc .lb{font-size:7px;line-height:12px;color:#8a6a40;margin:8px 3px 6px}
  .pfc .cr{display:flex;flex-wrap:wrap;gap:8px;margin:0 3px 10px}
  .pfc .b.sm{font-size:7px;padding:7px 8px}
  .pfc .b.on{background:#3fa38a;box-shadow:inset -3px -3px #2a7a66,inset 3px 3px #6cd0b4,0 0 0 3px #1d4f45}
  .pfc .bar{margin-top:12px;flex:none}
  .pfc .ni{width:calc(100% - 7px);margin:0 4px 10px 3px;font:inherit;font-size:8px;color:#2a1c10;background:#fffdf0;border:0;padding:9px 8px;outline:0;box-shadow:inset 3px 3px #e6d9aa,0 0 0 3px #5a3519}
  .pfc .ni:focus{box-shadow:inset 3px 3px #e6d9aa,0 0 0 3px #3fa38a}
  .pfc .nt2{display:block;width:calc(100% - 7px);margin:0 4px 10px 3px;text-align:left;font:inherit;font-size:8px;line-height:13px;color:#2a1c10;background:#fffdf0;border:0;padding:8px;cursor:pointer;box-shadow:0 0 0 3px #e6d9aa;word-break:break-word}
  .pfc .nt2.on{background:#e8f7f1;box-shadow:0 0 0 3px #3fa38a}
  .pfc .nt2 small{display:block;font-size:6px;line-height:10px;color:#8a6a40;margin-top:4px}
  .pfc .gal{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 6px 6px 4px}
  .pfc .gh{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 4px 12px 3px;font-size:7px;line-height:11px}
  .pfc .ga{display:flex;flex-direction:column;align-items:center;gap:6px;font:inherit;font-size:6px;line-height:9px;color:#5a3519;background:#fffdf0;border:0;padding:8px 4px;cursor:pointer;box-shadow:0 0 0 3px #e6d9aa}
  .pfc .ga:hover{transform:translateY(-2px)}
  .pfc .ga.on{background:#e8f7f1;box-shadow:0 0 0 3px #3fa38a}
  .hw .pfc{background:#2a1a3a;border-color:#14061c;color:#ffb060;box-shadow:inset 0 -4px #1c1028,0 0 24px rgba(255,120,30,.4),8px 8px 0 rgba(0,0,0,.5)}
  .hw .pfc .ap{background-color:#1c1028}
  .hw .pfc .ap.s54{box-shadow:0 0 0 3px #14061c}
  .hw .pfc .em,.hw .pfc .st,.hw .pfc .pd,.hw .pfc .vz,.hw .pfc .lb,.hw .pfc .nt2 small{color:#c9a0e8}
  .hw .pfc .st b,.hw .pfc .px{color:#f0e0ff}
  .hw .pfc .tb{color:#c9a0e8;background:#3c2a54;box-shadow:inset -3px -3px rgba(0,0,0,.3),inset 3px 3px rgba(255,255,255,.15),0 0 0 3px #14061c}
  .hw .pfc .tb.on{color:#2a1408;background:#e8761a;box-shadow:inset -3px -3px #a8480a,inset 3px 3px #ffa84a,0 0 0 3px #3a1408}
  .hw .pfc .po{background:#1c1028;box-shadow:0 0 0 3px #3c2a54}
  .hw .pfc .pt{color:#ffb060}
  .hw .pfc .b.on{color:#fff;background:#6a3a9c;box-shadow:inset -3px -3px #3a1c5a,inset 3px 3px #9a6acc,0 0 0 3px #14061c}
  .hw .pfc .ni{color:#f0e0ff;background:#1c1028;box-shadow:inset 3px 3px #0e0718,0 0 0 3px #14061c}
  .hw .pfc .ni:focus{box-shadow:inset 3px 3px #0e0718,0 0 0 3px #e8761a}
  .hw .pfc .nt2{color:#f0e0ff;background:#1c1028;box-shadow:0 0 0 3px #3c2a54}
  .hw .pfc .nt2.on{background:#3a1c5a;box-shadow:0 0 0 3px #e8761a}
  .hw .pfc .ga{color:#c9a0e8;background:#1c1028;box-shadow:0 0 0 3px #3c2a54}
  .hw .pfc .ga.on{background:#3a1c5a;box-shadow:0 0 0 3px #e8761a}
  `;
  document.head.appendChild(css);

  const btn=document.getElementById('rg')||[...act.querySelectorAll('a,button')].find(e=>/regist|cadastr/i.test(e.textContent));
  const u=getUser();
  if(btn){window.regBtn=btn;
    if(!u){btn.onclick=null;btn.removeAttribute('onclick');btn.addEventListener('click',e=>{e.preventDefault();goReg()})}
    else{
      const eu={nome:u.nome||'Usuário',email:u.email||''};

      /* ---------- dados (tudo no localStorage deste navegador) ---------- */
      const KP='nocturne-perfis',KF='nocturne-seguindo',KPO='nocturne-posts';
      const jg=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||d}catch(e){return d}};
      const js=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
      const usuarios=()=>jg('nocturne-users',[]);
      const setFoto=(em,id)=>{const p=jg(KP,{}),o=p[em]||{};if(id)o.f=id;else delete o.f;p[em]=o;return js(KP,p)};
      const seguindo=em=>jg(KF,{})[em]||[];
      const seguidores=em=>{const f=jg(KF,{});return Object.keys(f).filter(k=>f[k].includes(em))};
      const toggleSeg=(a,b2)=>{const f=jg(KF,{}),l=f[a]||[];f[a]=l.includes(b2)?l.filter(x=>x!==b2):[...l,b2];js(KF,f)};
      const posts=em=>jg(KPO,{})[em]||[];
      const setPosts=(em,l)=>{const p=jg(KPO,{});p[em]=l;return js(KPO,p)};

      /* ---------- avatares em pixel art (a pessoa só escolhe entre estes) ----------
         cada linha é a metade esquerda do desenho; a direita é espelhada automaticamente */
      const SP_GATO=['.D......','.GD.....','.GPD....','.GPGGDGG','.GGGGGDG','GGGGGGGD','GGYKGGGG','GGYKGGGG','GGGGGGGP','WWGGGGGK','.WGGGKGG','..GGWWWW','..GGGWWW','.GGGGGGG','..GGGGGG','..DD..DD'];
      const SP={
        /* ===== normais ===== */
        coruja:{n:'Coruja',p:{B:'#8a5a34',D:'#5e3a1e',L:'#a8744a',C:'#e6cfa0',S:'#c9a672',W:'#fff4d6',K:'#14100e',O:'#ffb020',P:'#c87810'},
          m:['.DD.....','.DBD....','.BBBBBBB','DBLBBLBB','DBDDDDBB','BDWWWWDB','BDWKKWDB','BDWKKWDB','BBDWWDBO','LBBDDBBO','LCCBBCCP','BCSCCSCC','BCSCCSCC','.BCCCCCC','..BBBBBB','.OO..OO.']},
        gato:{n:'Gato',p:{G:'#6b6f8f',D:'#4a4e6d',P:'#e0a0b0',Y:'#9be07a',K:'#14100e',W:'#dfe2f2'},m:SP_GATO},
        raposa:{n:'Raposa',p:{O:'#e0762c',E:'#5a2a14',W:'#f1dcc0',L:'#f5a050',K:'#14100e',N:'#2a140c'},
          m:['.E......','.OE.....','.OWE....','.OWOOOOO','.OOOOOOO','OOOOLLOO','OOKKOOOO','OOKKOOOW','WOOOOWWW','WWWWWWWN','.WWWWWWN','..OWWWWW','..OOWWWK','...OOWWW','....OWWW']},
        sapo:{n:'Sapo mago',p:{H:'#6a4ad0',I:'#9a7af0',J:'#4a2fa0',Y:'#ffd84a',W:'#fff',G:'#5ab878',K:'#14100e',R:'#f09aa8',M:'#2d6a48',B:'#d6efb0',D:'#3f9660'},
          m:['.......H','......HI','.....HHI','....JHHH','...JHHHH','..JHHHHH','.YYYYYYW','JHHHHHHH','GWWWGGGG','GWKWGGGG','GGGGGGGG','GRGGGGGG','GGMMMMMM','GGGBBBBB','.GGBBBBB','..DBBBBB']},
        guaxinim:{n:'Guaxinim',p:{D:'#4a4f5e',G:'#8c93a3',P:'#c48a92',E:'#2b2f3b',W:'#e3e6ec',K:'#14100e',N:'#14100e'},
          m:['.DDD....','.GPPG...','.GPGGGGG','.GGGGGGE','GGGGGGGE','EEEEEEGW','EEWKEEGW','EEEEEEGW','GEEEGGGW','GGWWWWWN','.GWWWWWW','.GGWWWWK','..GGWWWW','..GGGGGG','..GDGGGG','..DD..DD']},
        cogumelo:{n:'Cogumelo',p:{Q:'#a8302c',R:'#d8504a',T:'#ee7a70',W:'#fff',S:'#e8dcc8',Z:'#c8b896',K:'#14100e',P:'#ff9ab0'},
          m:['....QQQQ','..QQRRRW','.QRRTTRR','.QRTWWRR','QRRRWWRR','QRRRRRRR','QRWWRRRR','QQQQQQQQ','..ZSSSSS','..SSKSSS','..SPSSSK','..ZSSSSS','..ZSSSSS','.ZZSSSSS','..ZZZZZZ']},
        coelho:{n:'Coelho',p:{S:'#d8d0d8',W:'#f4f0f0',P:'#ffb0c0',K:'#14100e',E:'#fff',N:'#e08090'},
          m:['..SWS...','..WPW...','..WPW...','..WPW...','..WPW...','..SWWWWW','.WWWWWWW','WWWWWWWW','WWKEWWWW','WWKKWWWW','WPPWWWWN','WWWWWWWK','.WWWWKWW','..SWWWWW','..SSWWWW','..SS..SS']},
        /* ===== Halloween (h:1) ===== */
        abobora:{n:'Abóbora',h:1,p:{G:'#3f8f3a',H:'#6aaf4a',Q:'#7a3008',O:'#e8761a',L:'#f89a3a',D:'#b0510a',Y:'#ffe866'},
          m:['.......G','......GH','......GG','..QQOOOO','.QOLOQOO','QOLOOQOO','QOLYYYOD','QOLOYYOD','QOLOOYOY','QOLOOQOO','QOYYOYYY','QOOYYYYO','QOLOOQOO','.QOLOQOO','..QQDDDD']},
        fantasma:{n:'Fantasma',h:1,p:{S:'#b8c0e0',W:'#e8ecff',H:'#fff',K:'#14100e',P:'#ff9ac0'},
          m:['...SSSSS','..SWWWWW','.SWHHWWW','.SWHWWWW','SWWWWWWW','SWWKHWWW','SWWKKWWW','SWWKKWWW','SWPPWWWW','SWWWWWWK','SWWWWWWK','SWWWWWWW','SWWWWWWW','SWWWWWWW','SWWWWWWW','WW.WW.WW']},
        morcego:{n:'Morcego',h:1,p:{P:'#6a5aa8',Z:'#e0a0c0',Q:'#8a6aa8',D:'#3a2a68',R:'#ff4a5a',W:'#fff'},
          m:['.....P..','.....PZ.','.....PPP','....PPPP','QQDPPRPP','QQQDPPPP','QQQQPPWP','QQQQQPPP','DQQQQPPP','DQDQDQPP','D.D.D.PP','.......P']},
        chapeu:{n:'Chapéu',h:1,p:{H:'#7a4ab0',I:'#a47ae0',J:'#4a2c6e',A:'#ff8a1a',Y:'#ffe866',B:'#2a1840'},
          m:['.......H','.......H','......HH','......HI','.....HHI','.....HHH','....HHHH','....HHHH','...HHHHH','..AAAAAY','..JHHHHH','.JHHHHHH','JHHHHHHH','BBBBBBBB','.BBBBBBB']},
        caveira:{n:'Caveira',h:1,p:{S:'#c8bca0',W:'#f0e8d8',H:'#fffaf0',K:'#14100e',R:'#ff3a3a'},
          m:['...SSSSS','..SWWWWW','.SWHHWWW','.SWHWWWW','SWWWWWWW','SWWWWWWW','SWWKKKWW','SWKRRKKW','SWKRRKKW','SWWKKKWW','SWWWWWKK','.SWWWWWK','..SWWWWW','..WKWKWK','..SWWWWW']},
        vampiro:{n:'Vampiro',h:1,p:{H:'#1a0a14',J:'#3a2030',S:'#e8d8c8',K:'#14100e',E:'#ff2a3a',T:'#c8b8a8',P:'#b05070',W:'#fff',R:'#b01830',Q:'#701020',G:'#ffd84a'},
          m:['..HHHHHH','.HHJJHHH','HHJHHHHH','HHHHHHHH','HSSSSSSH','HSKKKSSS','HSEKESSS','HSSSSSSS','HSSSSSST','.SSSSSSS','.SSPPPPP','.SSSWSSS','R.SSSSSS','RRRSSSSS','RQRRRRRG','RQQRRRRR']},
        mumia:{n:'Múmia',h:1,p:{C:'#c8bc9c',B:'#e8dcc0',D:'#a89c7c',K:'#14100e',E:'#ffe040'},
          m:['...CCCCC','..CBBBBB','.CBBBBBB','CBDDDDDD','CBBBBBBB','CBBBBBBB','CKKKKKKK','CKEEKKKK','CKKKKKKK','CBBBBBBB','CBDDDDDB','.CBBBBBB','.CDDDDDD','..CBBBBB','..CBDBBB','...CCCCC']},
        gatopreto:{n:'Gato preto',h:1,p:{G:'#3c3458',D:'#241c3a',P:'#a0607a',Y:'#ffb020',K:'#0a0610',W:'#d8d8ec'},m:SP_GATO}
      };
      const SPU={};
      const spr=id=>{const s=SP[id];if(!s)return null;if(SPU[id])return SPU[id];
        const k=document.createElement('canvas');k.width=k.height=18;const g=k.getContext('2d'),oy=1+((16-s.m.length)>>1),G={};
        s.m.forEach((r,y)=>[...(r+[...r].reverse().join(''))].forEach((ch,x)=>{if(s.p[ch])G[(x+1)+','+(y+oy)]=s.p[ch]}));
        g.fillStyle='#1a1220';
        for(const q in G){const[x,y]=q.split(',').map(Number);[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b2])=>{if(!G[(x+a)+','+(y+b2)])g.fillRect(x+a,y+b2,1,1)})}
        for(const q in G){const[x,y]=q.split(',').map(Number);g.fillStyle=G[q];g.fillRect(x,y,1,1)}
        return SPU[id]=k.toDataURL()};
      const escolha=em=>{const f=(jg(KP,{})[em]||{}).f;return SP[f]?f:null};

      /* ---------- avatar: sprite escolhido ou ícone padrão ---------- */
      const hwOn=()=>document.documentElement.classList.contains('hw');
      const iconURL=()=>{const hl=hwOn(),k=document.createElement('canvas');k.width=k.height=18;
        const g=k.getContext('2d'),sh=[[5,2,4,1],[4,3,6,4],[5,7,4,1],[3,9,8,1],[2,10,10,3]];g.translate(2,2);
        g.fillStyle=hl?'#14061c':'#14295e';sh.forEach(([x,y,w2,h])=>g.fillRect(x-1,y-1,w2+2,h+2));
        g.fillStyle=hl?'#e8761a':'#3fa38a';sh.forEach(([x,y,w2,h])=>g.fillRect(x,y,w2,h));
        g.fillStyle=hl?'#ffa84a':'#6cd0b4';g.fillRect(5,3,1,3);g.fillRect(3,10,1,2);
        return k.toDataURL()};
      const avId=(id,cls)=>`<span class="ap ${cls}" style="background-image:url('${(id&&spr(id))||iconURL()}')"></span>`;
      const av=(em,cls)=>avId(escolha(em),cls);

      /* ---------- botão do usuário no cabeçalho + menu (aqui fica o "Sair") ---------- */
      const w=document.createElement('div');w.style.position='relative';
      const b=document.createElement('button');b.className='btn alt';b.id='usr';b.setAttribute('aria-label','Usuário: '+eu.nome);b.style.padding='0 8px';
      const hdr=()=>{b.title=eu.nome;b.innerHTML=av(eu.email,'s36')};hdr();
      const mn=document.createElement('div');mn.className='umn';
      mn.innerHTML=`<div class="nm">${esc(eu.nome)}</div>`;
      const ver=document.createElement('button');ver.className='b';ver.textContent='Ver perfil';
      const out=document.createElement('button');out.className='b del';out.textContent='Sair';
      out.onclick=()=>{try{localStorage.removeItem(KU)}catch(e){}location.reload()};
      mn.append(ver,out);

      /* ---------- janela de perfil (sem botão de sair) ---------- */
      const po=document.createElement('div');po.className='pfo';
      const box=document.createElement('div');box.className='pfc';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');
      po.appendChild(box);document.body.appendChild(po);
      let vendo=eu.email,aba='pub',pick=false,comp=null,edit=null,gal='n';
      const reset=()=>{pick=false;comp=null;edit=null};
      const fmt=d=>new Date(d).toLocaleDateString('pt-BR');
      const prev=s=>{s=String(s||'').replace(/\s+/g,' ').trim();return s.length>38?s.slice(0,38)+'…':(s||'(vazia)')};
      function render(){
        const own=vendo===eu.email,us=usuarios(),alvo=own?eu:(us.find(x=>x.email===vendo)||{nome:'Usuário',email:vendo}),
          meus=seguindo(eu.email),sg=seguidores(vendo),sn=seguindo(vendo),ps=posts(vendo);
        if(!own&&aba==='desc')aba='pub';
        const linha=(ems,vazio)=>{const l=ems.map(em=>{const x=us.find(q=>q.email===em);if(!x)return'';const eu2=em===eu.email,sgo=meus.includes(em);
          return`<div class="ur">${av(em,'s36')}<span class="un">${esc(x.nome)}${eu2?' (você)':''}</span><button class="b sm" data-a="ver" data-e="${esc(em)}">Ver</button>${eu2?'':`<button class="b sm${sgo?' on':''}" data-a="seg" data-e="${esc(em)}">${sgo?'Seguindo':'Seguir'}</button>`}</div>`}).join('');
          return l||`<p class="vz">${vazio}</p>`};
        let lista='';
        if(own&&pick){
          const atual=escolha(eu.email),hal=gal==='h',ids=Object.keys(SP).filter(id=>!!SP[id].h===hal);
          lista=`<div class="gh"><span>${hal?'Avatares de Halloween':'Escolha seu avatar'}</span><button class="b sm${hal?' on':''}" data-a="galh">&#127875; Halloween</button></div><div class="gal">${ids.map(id=>`<button class="ga${atual===id?' on':''}" data-a="av" data-id="${id}">${avId(id,'s54')}${SP[id].n}</button>`).join('')}${hal?'':`<button class="ga${atual?'':' on'}" data-a="av" data-id="">${avId(null,'s54')}Padrão</button>`}</div>`}
        else if(aba==='pub'){
          if(own&&comp){
            lista=`<div class="lb">1. Escolha a anotação</div>${notes.map(n=>`<button class="nt2${comp.id===n.id?' on':''}" data-a="pickn" data-id="${esc(n.id)}">${esc(n.t||'Sem título')}<small>${esc(prev(n.x))}</small></button>`).join('')}
              <div class="lb">2. Dê um nome à publicação</div><input class="ni" maxlength="40" placeholder="Nome da publicação" value="${esc(comp.nome)}">
              <div class="cr"><button class="b sm" data-a="publ">Publicar</button><button class="b sm del" data-a="canc">Cancelar</button></div>`}
          else{
            const cards=ps.length?ps.map(p=>{const tem=own&&notes.some(n=>n.id===(p.nid||p.id));
              const tit=edit===p.id?`<input class="ni" maxlength="40" value="${esc(p.t||'')}" style="margin-left:0;margin-right:0;width:100%"><div class="cr" style="margin:0 0 8px"><button class="b sm" data-a="svn" data-id="${esc(p.id)}">Salvar</button><button class="b sm del" data-a="cnn">Cancelar</button></div>`:`<div class="pt">${esc(p.t||'Sem título')}</div>`;
              return`<div class="po">${tit}<div class="pd">${fmt(p.d)}</div><div class="px">${esc(p.x||'')}</div>${own?`<div class="cr" style="margin:0"><button class="b sm" data-a="ren" data-id="${esc(p.id)}">Renomear</button>${tem?`<button class="b sm" data-a="upd" data-id="${esc(p.id)}">Atualizar</button>`:''}<button class="b sm del" data-a="rmpost" data-id="${esc(p.id)}">Remover</button></div>`:''}</div>`}).join(''):`<p class="vz">${own?'Nenhuma publicação ainda.':'Nenhuma publicação.'}</p>`;
            lista=(own?'<div class="cr"><button class="b sm" data-a="novo">+ Publicar anotação</button></div>':'')+cards}}
        else if(aba==='seg')lista=linha(sg,'Ninguém segue ainda.');
        else if(aba==='sgn')lista=linha(sn,'Não segue ninguém ainda.');
        else lista=linha(us.map(x=>x.email).filter(e=>e!==eu.email),'Nenhuma outra conta neste navegador.<br>Crie outra conta para testar os seguidores.');
        const T=(k,t)=>`<button class="tb${aba===k&&!pick?' on':''}" data-a="tab" data-v="${k}">${t}</button>`;
        box.innerHTML=`<div class="top">${av(alvo.email,'s54')}<div class="who"><div class="nm2">${esc(alvo.nome)}</div><div class="em">${esc(alvo.email||'')}</div></div></div>
          <div class="acts">${own?`<button class="b sm${pick?' on':''}" data-a="foto">Trocar foto</button>`
            :`<button class="b sm${meus.includes(vendo)?' on':''}" data-a="seg" data-e="${esc(vendo)}">${meus.includes(vendo)?'Seguindo':'Seguir'}</button>`}</div>
          <div class="st"><div><b>${ps.length}</b>posts</div><div><b>${sg.length}</b>seguidores</div><div><b>${sn.length}</b>seguindo</div></div>
          <div class="tbs">${T('pub','Posts')}${T('seg','Seguidores')}${T('sgn','Seguindo')}${own?T('desc','Descobrir'):''}</div>
          <div class="lst">${lista}</div>
          <div class="bar">${own?'<button class="b" data-a="fechar">Fechar</button>':'<button class="b" data-a="meu">Meu perfil</button><button class="b" data-a="fechar">Fechar</button>'}</div>`}
      const abrir=()=>{vendo=eu.email;aba='pub';reset();render();po.classList.add('on')},fechar=()=>{po.classList.remove('on');reset()};
      box.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a,id=t.dataset.id;
        if(a==='tab'){aba=t.dataset.v;reset();render()}
        else if(a==='ver'){vendo=t.dataset.e;aba='pub';reset();render();box.querySelector('.lst').scrollTop=0}
        else if(a==='meu'){vendo=eu.email;aba='pub';reset();render()}
        else if(a==='seg'){toggleSeg(eu.email,t.dataset.e);render()}
        else if(a==='foto'){pick=!pick;comp=null;edit=null;gal=hwOn()?'h':'n';render()}
        else if(a==='galh'){gal=gal==='h'?'n':'h';render()}
        else if(a==='av'){setFoto(eu.email,id||null);pick=false;hdr();render()}
        else if(a==='novo'){if(!notes.length){coruja.say('Crie uma nota primeiro!',2200);return}comp={id:null,nome:'',auto:true};edit=null;render()}
        else if(a==='pickn'){const n=notes.find(x=>x.id===id);if(!n)return;comp.id=id;if(!comp.nome||comp.auto){comp.nome=n.t||'';comp.auto=true}render()}
        else if(a==='canc'){comp=null;render()}
        else if(a==='publ'){const n=comp&&notes.find(x=>x.id===comp.id);
          if(!n){coruja.say('Escolha uma anotação!',2200);return}
          if(!(n.x||'').trim()){coruja.say('Essa nota está vazia!',2200);return}
          const l=posts(eu.email);l.unshift({id:'p'+Date.now(),nid:n.id,t:(comp.nome||'').trim()||n.t||'Sem título',x:n.x,d:Date.now()});
          if(!setPosts(eu.email,l)){coruja.say('Não consegui postar.',2200);return}
          comp=null;render();coruja.say('Publicado no seu perfil! Hoo!',2200)}
        else if(a==='ren'){edit=id;render();const i=box.querySelector('.po .ni');if(i)i.focus()}
        else if(a==='cnn'){edit=null;render()}
        else if(a==='svn'){const i=box.querySelector('.po .ni'),l=posts(eu.email),p=l.find(x=>x.id===id);
          if(p){p.t=(i.value||'').trim()||'Sem título';setPosts(eu.email,l)}edit=null;render()}
        else if(a==='upd'){const l=posts(eu.email),p=l.find(x=>x.id===id),n=p&&notes.find(x=>x.id===(p.nid||p.id));
          if(p&&n){p.x=n.x;setPosts(eu.email,l);render();coruja.say('Publicação atualizada!',2000)}}
        else if(a==='rmpost'){setPosts(eu.email,posts(eu.email).filter(p=>p.id!==id));render()}
        else if(a==='fechar')fechar()});
      /* guarda o que está sendo digitado no nome da publicação */
      box.addEventListener('input',e=>{if(e.target.classList.contains('ni')&&comp){comp.nome=e.target.value;comp.auto=false}});
      po.onclick=e=>{if(e.target===po)fechar()};
      addEventListener('keydown',e=>{if(e.key=='Escape'){fechar();mn.classList.remove('on')}});
      ver.onclick=e=>{e.stopPropagation();mn.classList.remove('on');abrir()};
      b.onclick=e=>{e.stopPropagation();mn.classList.toggle('on')};
      document.addEventListener('click',()=>mn.classList.remove('on'));
      /* troca de tema (Halloween/normal): refaz o ícone padrão */
      new MutationObserver(()=>{hdr();if(po.classList.contains('on'))render()}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
      w.append(b,mn);(btn.closest('a')||btn).replaceWith(w);window.regBtn=null;
    }}
  if(!u)setTimeout(()=>coruja.ask(),1500);
  else if(!sessionStorage.getItem('nocturne-oi')){try{sessionStorage.setItem('nocturne-oi',1)}catch(e){}setTimeout(()=>coruja.say('Oi, '+(u.nome||'amigo')+'! Hoo!',3000),900)}
})();

/* ===== VIDEIRAS em volta do bloco de notas: flores azuis (início) / abóboras (Halloween) ===== */
const padDeco=(()=>{
  const pad=document.querySelector('.pad');if(!pad)return()=>{};
  const S=3,M=30,cv=document.createElement('canvas');
  cv.style.cssText=`position:absolute;left:-${M+4}px;top:-${M+4}px;z-index:-1;pointer-events:none;image-rendering:pixelated;filter:drop-shadow(2px 3px 0 rgba(0,0,0,.3))`;
  pad.appendChild(cv);
  function draw(){
    const hl=typeof hw!=='undefined'&&hw,pw=pad.offsetWidth,ph=pad.offsetHeight;if(!pw)return;
    const cw=Math.ceil((pw+2*M)/S),ch=Math.ceil((ph+2*M)/S);cv.width=cw;cv.height=ch;cv.style.width=cw*S+'px';cv.style.height=ch*S+'px';
    const g=cv.getContext('2d'),P=(x,y,w,h,k)=>{g.fillStyle=k;g.fillRect(Math.round(x),Math.round(y),w,h)};
    const o=M/S,w=pw/S,h=ph/S,L=2*(w+h),V=hl?['#1f3a14','#3f6a2a','#78a844']:['#1a5a48','#2f8f6a','#5ac89a'];
    const pt=u=>{u=(u%L+L)%L;if(u<w)return[o+u,o,0,-1];u-=w;if(u<h)return[o+w,o+u,1,0];u-=h;if(u<w)return[o+w-u,o+h,0,1];u-=w;return[o,o+h-u,-1,0]};
    const at=(u,d)=>{const[x,y,nx,ny]=pt(u);return[x+nx*d,y+ny*d,nx,ny]};
    const dd=u=>2.5+Math.sin(u*.35)*1.8;
    for(let u=0;u<L;u+=.4){const[x,y]=at(u,dd(u));P(x,y+1,1,1,V[0])}
    for(let u=0;u<L;u+=.4){const[x,y]=at(u,dd(u));P(x,y,1,1,V[1])}
    for(let u=3,i=0;u<L;u+=6.5,i++){const[x,y,nx,ny]=at(u,dd(u)),s=i%2?1:-1,lx=x-ny*s*2+nx,ly=y+nx*s*2+ny;P(lx-1,ly-1,3,2,V[2]);P(lx,ly,2,1,V[1])}
    for(let u=9;u<L;u+=19){const[x,y,nx,ny]=at(u,dd(u));P(x+nx*2,y+ny*2,1,1,V[1]);P(x+nx*3-ny,y+ny*3+nx,1,1,V[1]);P(x+nx*3-ny*2,y+ny*3+nx*2,1,1,V[1])}
    if(!hl){ /* videiras de flores azuis */
      const FB=['#4da3ff','#7bc4ff','#6a8aff','#a9d8ff'];
      for(let u=5,i=0;u<L;u+=9,i++){const[x,y]=at(u,dd(u)+1),k=FB[i%4];
        if(i%3==2){P(x,y,2,2,k);P(x,y,1,1,'#fff')}
        else{P(x-1,y,3,1,k);P(x,y-1,1,3,k);P(x-1,y-1,1,1,FB[(i+1)%4]);P(x+1,y+1,1,1,FB[(i+1)%4]);P(x,y,1,1,'#fff6b0')}}
      [[0,0],[w,0],[w,h],[0,h]].forEach(([cx,cy],j)=>{const x=o+cx+(cx?3:-3),y=o+cy+(cy?3:-3);
        [[0,0],[3,-1],[-2,2],[2,3],[-3,-2]].forEach(([dx,dy],i)=>{const k=FB[(i+j)%4];P(x+dx-1,y+dy,3,1,k);P(x+dx,y+dy-1,1,3,k);P(x+dx,y+dy,1,1,'#fff6b0')})})
    }else{ /* abóboras */
      const pk=(x,y,s)=>{g.save();g.translate(Math.round(x),Math.round(y));g.scale(s,s);
        P(0,-4,1,1,'#3f6a2a');P(1,-4,1,1,'#3f6a2a');P(2,-3,1,1,'#3f6a2a');
        P(-3,-2,7,5,'#7a3008');P(-2,-3,5,1,'#7a3008');P(-2,3,5,1,'#7a3008');
        P(-2,-2,5,5,'#e8761a');P(-3,-1,7,3,'#e8761a');P(-2,-2,1,5,'#f08a2a');P(2,-2,1,5,'#c85a10');P(0,-2,1,5,'#b0510a');
        P(-2,-1,1,1,'#ffe866');P(1,-1,1,1,'#ffe866');P(-1,1,3,1,'#ffe866');g.restore()};
      for(let u=14;u<L;u+=L/9){const[x,y]=at(u,dd(u)+2);pk(x,y,1)}
      [[0,0],[w,0],[w,h],[0,h]].forEach(([cx,cy])=>pk(o+cx+(cx?4:-4),o+cy+(cy?4:-4),2))}
  }
  new ResizeObserver(draw).observe(pad);draw();return draw})();

/* loop a 60fps, pausa em aba oculta */
let last=0;
function loop(t){requestAnimationFrame(loop);if(document.hidden||t-last<15)return;last=t;frame(t)}
requestAnimationFrame(loop);