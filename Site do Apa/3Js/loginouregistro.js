(()=>{
const $=id=>document.getElementById(id);

/* ================= origem, tema e dados ================= */
/* a página de origem vem em ?voltar=... (ou do sessionStorage). Só aceita arquivos .html locais. */
let vo=new URLSearchParams(location.search).get('voltar');
try{vo=vo||sessionStorage.getItem('nocturne-voltar')}catch(e){}
const back=/^[\w\-. ]+\.html(\?.*)?$/.test(vo||'')?vo:'pagina inicial.html';
const HW=/halloween/i.test(back);                 /* veio do Halloween -> tema Halloween */
document.documentElement.classList.toggle('hw',HW);
$('bk').href=back;
const KU='nocturne-user',KS='nocturne-users';     /* usuário logado / lista de contas */
const jget=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||d}catch(e){return d}};
if(jget(KU,null)){location.replace(back);return}  /* já registrado: volta direto */

/* ================= BANCO DE DADOS (fica dentro do código) =================
   Como o site não tem servidor, o banco guarda tudo no localStorage deste navegador.
   - e-mail e nome ficam salvos normalmente
   - a SENHA nunca é guardada em texto: guardamos só o hash (PBKDF2-SHA256 + sal aleatório)
   - exportar()/importar() geram e leem um arquivo de backup para levar as contas a outro navegador */
const DB=(()=>{
  const K_USERS='nocturne-users',K_SESSAO='nocturne-user',K_NOTAS='nocturne-notas-v2',K_EXTRA=['nocturne-perfis','nocturne-seguindo','nocturne-posts'];
  const ler=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||d}catch(e){return d}};
  const gravar=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
  const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
  const leve=s=>{let h=5381;for(const ch of s)h=(h*33^ch.charCodeAt(0))>>>0;return'x'+h.toString(16)};
  /* contas antigas (antes do sal) usavam SHA-256 simples; ainda entram e são atualizadas no primeiro login */
  const legado=async senha=>{const t='nocturne:'+senha;
    try{return hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)))}catch(e){return leve(t)}};
  async function derivar(senha,sal){
    try{const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(senha),'PBKDF2',false,['deriveBits']);
      return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(sal),iterations:120000},k,256))}
    catch(e){return leve(sal+':'+senha)}}
  const novoSal=()=>{try{const a=new Uint8Array(16);crypto.getRandomValues(a);return hex(a)}catch(e){return String(Math.random()).slice(2)+Date.now()}};
  return{
    todos:()=>ler(K_USERS,[]),
    async criar(nome,email,senha){const l=ler(K_USERS,[]);if(l.some(u=>u.email===email))return{erro:'existe'};
      const s=novoSal(),u={nome,email,s,h:await derivar(senha,s),v:2,criado:Date.now()};l.push(u);
      return gravar(K_USERS,l)?{u}:{erro:'salvar'}},
    async entrar(email,senha){const l=ler(K_USERS,[]),u=l.find(x=>x.email===email);if(!u)return{erro:'sem-conta'};
      if(u.v===2)return u.h===await derivar(senha,u.s)?{u}:{erro:'senha'};
      if(u.h!==await legado(senha))return{erro:'senha'};
      u.s=novoSal();u.h=await derivar(senha,u.s);u.v=2;gravar(K_USERS,l);return{u}},
    sessao:u=>gravar(K_SESSAO,{nome:u.nome,email:u.email}),
    exportar(){const o={app:'nocturne',versao:2,users:ler(K_USERS,[]),notas:ler(K_NOTAS,[])};K_EXTRA.forEach(k=>o[k.replace('nocturne-','')]=ler(k,{}));return o},
    importar(o){if(!o||o.app!=='nocturne'||!Array.isArray(o.users))return{erro:true};
      const l=ler(K_USERS,[]);let novos=0;
      o.users.forEach(u=>{if(u&&u.email&&u.h&&!l.some(x=>x.email===u.email)){l.push(u);novos++}});gravar(K_USERS,l);
      K_EXTRA.forEach(k=>{const n=k.replace('nocturne-',''),cur=ler(k,{}),inc=o[n]||{};Object.keys(inc).forEach(e=>{if(!(e in cur))cur[e]=inc[e]});gravar(k,cur)});
      const nt=ler(K_NOTAS,[]);(o.notas||[]).forEach(n=>{if(n&&n.id&&!nt.some(x=>x.id===n.id))nt.push(n)});gravar(K_NOTAS,nt);
      return{novos}}
  }
})();

/* ================= cenário pixel art (decorado e interativo) =================
   - parallax: as camadas se mexem com o mouse (ou sozinhas, no celular)
   - vaga-lumes (ou fogos-fátuos no Halloween) vêm até o cursor e giram em volta dele
   - cogumelos / abóboras acendem quando o cursor chega perto
   - clique no fundo: faíscas; no chão nasce uma flor (abóbora no Halloween); no céu cai uma estrela (ou voa um morcego)
   - Halloween: clique numa abóbora solta um fantasminha; fantasmas fogem do cursor; aranha desce se o cursor chega no canto */
const W=320,H=180,GY=136,OFF=24,LW=W+2*OFF,cv=$('cv');let c=cv.getContext('2d',{alpha:false});const M=c;cv.width=W;cv.height=H;
const R=(x,y,w,h,k)=>{c.fillStyle=k;c.fillRect(Math.round(x),Math.round(y),Math.max(0,Math.round(w)),Math.round(h))};
const circ=(x,y,q,k)=>{for(let d=-q;d<=q;d++){const w=Math.floor(Math.sqrt(q*q-d*d)+.5);R(x-w,y+d,2*w+1,1,k)}};
const ell=(x,y,a,b,k)=>{const B=Math.round(b);for(let j=-B;j<=B;j++){const w=a*Math.sqrt(Math.max(0,1-j*j/(b*b+.01)));R(x-w,y+j,2*w,1,k)}};
const ln=(x1,y1,x2,y2,k)=>{const n=Math.max(Math.abs(x2-x1),Math.abs(y2-y1))||1;for(let i=0;i<=n;i++)R(x1+(x2-x1)*i/n,y1+(y2-y1)*i/n,1,1,k)};
const mk=s=>()=>(s=s*16807%2147483647)/2147483647,r=mk(HW?11:5);
const PL=HW
 ?{s:['#1b0d30','#281548','#38205a','#4e2c66','#6e3a72','#92484e'],f:'#26143a',m:'#38205a',t:'#4e2c78',hl:'#8a3a90',g:['#2a1c46','#38246a','#8a52c0','#1a1030']}
 :{s:['#050a1f','#07102b','#0a1838','#0d2147','#102a58','#133468'],f:'#0b1f45',m:'#0d2a58',t:'#123a73',hl:'#1f5fa8',g:['#0c3a44','#0f4a56','#1f7a8c','#082a33']};
function pine(x,b,h,tc,hc){const T=Math.max(3,h/13|0);R(x-1,b-6,3,6,tc);
  for(let i=0;i<T;i++){const top=b-h+(i*(h-8)/T|0),th=(h/T*1.6)|0,mw=h*.3*(.3+.7*(i+1)/T);
    for(let j=0;j<th;j++){const w=(mw*(j+1)/th)|0;R(x-w,top+j,2*w+1,1,tc);if(hc)R(x-w,top+j,Math.min(3,w+1),1,hc)}}}
function pump(x,y,s,E){E=E||'#ffe866';const o=a=>Math.round(a*s);ell(x,y,o(8),2,'rgba(0,0,0,.3)');ell(x,y-o(5),o(7.5),o(5.5),'#7a3008');ell(x,y-o(5),o(6.5),o(4.7),'#e8761a');
  ell(x-o(3),y-o(5),o(3),o(4.7),'#f08a2a');ell(x+o(3.5),y-o(5),o(3),o(4.7),'#d8660e');R(x-1,y-o(11),2,o(3),'#3f6a2a');
  R(x-o(4),y-o(7),o(2)+1,o(2)+1,E);R(x+o(2),y-o(7),o(2)+1,o(2)+1,E);R(x-o(3),y-o(3),o(6),1,E)}
function dead(x,b,h){const k='#12081f';R(x-1,b-h,3,h,k);[[.35,-1],[.5,1],[.65,-1],[.8,1]].forEach(([p,d],i)=>{const y=b-h*p|0;ln(x,y,x+d*(8+i*2),y-6-i,k);ln(x+d*(8+i*2),y-6-i,x+d*(11+i*2),y-9-i*2,k)})}
function tomb(x,y){R(x-6,y-1,12,2,'#3a3a54');R(x-5,y-12,10,11,'#5a5a78');ell(x,y-12,5,3,'#5a5a78');R(x-5,y-12,2,11,'#7a7a98');R(x-1,y-11,2,6,'#2a2a40');R(x-3,y-9,6,2,'#2a2a40');R(x+2,y-3,3,1,'#3f6a4a')}
const WIN=[];let CHIM=[0,0];
function cabinS(x,b){const K=HW?'#1a0c28':'#08142e',Rf=HW?'#2c1a42':'#102c4e',Rh=HW?'#3c2656':'#173c66',L=HW?'#ff9a2a':'#ffcf6b';
  R(x,b-24,48,24,K);
  for(let i=0;i<14;i++)R(x-4+2*i,b-24-i,56-4*i,1,i%4==3?Rh:Rf);
  R(x+36,b-44,6,14,K);R(x+35,b-45,8,2,Rf);CHIM=[x+39,b-46];
  R(x+19,b-16,9,16,'#2a1608');R(x+26,b-8,1,1,'#f0c060');
  [[x+5,b-17],[x+34,b-17]].forEach(([wx,wy])=>{R(wx-1,wy-1,11,10,'#2a1608');R(wx,wy,9,8,L);R(wx+4,wy,1,8,'#2a1608');R(wx,wy+3,9,1,'#2a1608');WIN.push([wx+5,wy+4])});
  R(x-2,b-1,52,2,'#0a0a18')}
/* camadas pré-desenhadas (largura LW para dar folga ao parallax) */
const mkL=(w,h)=>{const k=document.createElement('canvas');k.width=w;k.height=h;return k};
const sky=mkL(W,H),L1=mkL(LW,H),L2=mkL(LW,H),L3=mkL(LW,H);
(()=>{
  c=sky.getContext('2d');
  for(let i=0;i<6;i++)R(0,GY*i/6|0,W,GY/6+2,PL.s[i]);
  for(let i=0;i<5;i++){const y1=GY*(i+1)/6|0;for(let d=0;d<4;d++)for(let x=0;x<W;x++)if((x+d)%2==0)R(x,y1+d-2,1,1,PL.s[i+1])}
  if(HW){circ(214,26,24,'#3a0a14');circ(214,26,20,'#7a1010');circ(214,26,16,'#d42a2a');circ(214,26,14,'#e84a3a');circ(209,22,3,'#b81e1e');circ(219,30,3,'#b81e1e');circ(220,21,2,'#b81e1e');circ(208,31,2,'#c82a2a')}
  else{circ(214,26,22,'#0d2557');circ(214,26,18,'#173b7a');circ(214,26,14,'#f6f3d8');circ(214,26,12,'#fbf9e6');circ(209,22,3,'#e1ddb8');circ(219,30,3,'#e1ddb8');circ(220,21,2,'#e1ddb8')}
  /* colinas e pinheiros distantes */
  c=L1.getContext('2d');
  for(let x=0;x<LW;x++){const y=GY-46-Math.sin(x*.03)*12-Math.sin(x*.08)*5|0;R(x,y,1,GY-y,PL.f);if(x%2==0)R(x,y+3,1,1,PL.m)}
  for(let i=0;i<LW/7;i++)pine(r()*LW|0,GY-8,30+r()*26,PL.f);
  /* pinheiros grandes, cabana e (Halloween) árvores secas */
  c=L2.getContext('2d');
  for(let i=0;i<LW/15;i++)pine(r()*LW|0,GY+2,62+r()*46,PL.m,PL.t);
  if(HW){dead(250,GY+2,64);dead(332,GY+2,52)}
  cabinS(50,GY+2);
  /* chão da frente */
  c=L3.getContext('2d');
  R(0,GY,LW,H-GY,PL.g[0]);for(let y=GY;y<H;y+=2)for(let x=(y>>1)%2*2;x<LW;x+=4)R(x,y,2,1,PL.g[1]);
  for(let i=0;i<LW*3;i++)R(r()*LW|0,GY+3+r()*(H-GY-3)|0,1,1,PL.g[3]);
  for(let i=0;i<LW*1.3;i++){const x=r()*LW|0,y=GY+4+r()*(H-GY-5)|0;R(x,y-2,1,3,PL.g[2]);R(x+2,y-2,1,3,PL.g[2]);R(x+1,y-1,1,2,PL.g[1])}
  R(0,GY,LW,2,PL.g[2]);for(let x=0;x<LW;x+=2)R(x,GY-1-(r()*2|0),1,2,PL.g[2]);
  if(HW){tomb(150,GY+22);tomb(214,GY+34);tomb(314,GY+24)}
  else for(let i=0;i<34;i++){const x=r()*LW|0,y=GY+6+r()*(H-GY-10)|0,k=['#6a8aff','#a9c0ff','#7bc4ff','#ff8fb5','#fff6b0'][i%5];R(x,y-3,1,3,PL.g[2]);R(x-1,y-4,3,1,k);R(x,y-5,1,3,k);R(x,y-4,1,1,'#fff6b0')}
  c=M})();
/* itens da frente (desenhados a cada quadro para poderem brilhar) */
const MC=[['#4ee0cc','78,224,204'],['#a98aff','169,138,255'],['#7ab8ff','122,184,255']];
const FIT=HW
 ?[[34,GY+20,1],[84,GY+36,.8],[176,GY+44,.9],[246,GY+40,1],[286,GY+20,1.1],[346,GY+36,.85]].map(q=>({k:'p',x:q[0],y:q[1],s:q[2],g:0}))
   .concat([[118,GY+28],[196,GY+24],[300,GY+42]].map(q=>({k:'c',x:q[0],y:q[1],g:0})))
 :[[40,GY+12,0],[96,GY+30,1],[150,GY+40,2],[220,GY+34,0],[268,GY+18,1],[322,GY+30,2],[356,GY+14,0]].map(q=>({k:'m',x:q[0],y:q[1],c:q[2],g:0}));
FIT.push({k:'l',x:10,y:GY+8,g:0},{k:'l',x:LW-10,y:GY+8,g:0});
const ST=[...Array(40)].map(()=>({x:r()*W|0,y:r()*GY*.65|0,s:300+r()*600,a:r()*6})).filter(q=>Math.hypot(q.x-214,q.y-26)>28);
const FF=[...Array(26)].map((_,i)=>({x:20+r()*280,y:50+r()*100,vx:0,vy:0,a:r()*6,s:.0006+r()*.0008,k:i%3,ph:r()*6}));
const LV=[...Array(14)].map(()=>({x:r()*W,y:r()*H,s:.4+r()*.6,a:r()*6,k:HW?(r()<.5?'#c8503a':'#e8761a'):(r()<.5?'#2f8f8a':'#c8803a')}));
const FLY=HW?[...Array(5)].map((_,i)=>({x:r()*W,by:14+i*14,y:0,vx:.35+r()*.3,ph:r()*6,tmp:0})):[];
const GH=HW?[...Array(3)].map((_,i)=>({bx:60+i*100,by:48+i*18,ox:0,oy:0,ph:i*2})):[];
const PS=[],SPR=[],SS=[],TG=[],SMK=[];
let mx=-1,my=-1,hasP=false,pxs=0,fsh=0,nextSS=3000,spL=16,lastSmk=0;
const BS={};
function blob(x,y,rx,ry,a,col){if(a<.01)return;let s=BS[col];
  if(!s){s=document.createElement('canvas');s.width=s.height=64;const g=s.getContext('2d'),q=g.createRadialGradient(32,32,0,32,32,32);
    q.addColorStop(0,`rgba(${col},1)`);q.addColorStop(1,`rgba(${col},0)`);g.fillStyle=q;g.fillRect(0,0,64,64);BS[col]=s}
  c.globalAlpha=Math.min(1,a);c.drawImage(s,x-rx,y-ry,2*rx,2*ry);c.globalAlpha=1}
const VG=(()=>{const k=document.createElement('canvas');k.width=W;k.height=H;const g=k.getContext('2d'),v=g.createRadialGradient(W*.45,H*.5,H*.35,W*.45,H*.5,W*.65);
  v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,HW?'rgba(10,0,20,.4)':'rgba(5,8,30,.36)');g.fillStyle=v;g.fillRect(0,0,W,H);return k})();
const toScene=e=>{const s=Math.max(innerWidth/W,innerHeight/H);return[(e.clientX-(innerWidth-W*s)*.3)/s,(e.clientY-(innerHeight-H*s)*.5)/s]};
addEventListener('pointermove',e=>{[mx,my]=toScene(e);hasP=true});
document.addEventListener('pointerleave',()=>{mx=-1;hasP=false});
const KK='#0e0718';
const bat=(x,y,w)=>{R(x-4,y+w,3,1,KK);R(x-1,y+1-w,3,2,KK);R(x+2,y+w,3,1,KK)};
function ghost(x,y,w){const B='#e8ecff';R(x-3,y-8,7,1,B);R(x-4,y-7,9,11,B);for(let q=0;q<5;q++)R(x-4+q*2,y+4+((q+w)%2),q==4?1:2,2,B);R(x-2,y-4,2,3,KK);R(x+2,y-4,2,3,KK);R(x,y,2,2,KK)}
/* clique no fundo */
function burst(x,y,t){
  const cols=HW?['#ff9a2a','#ffd080','#b070ff','#fff']:['#ffe866','#fff6b0','#7bc4ff','#fff'];
  for(let i=0;i<16;i++){const a=i/16*6.283+Math.random()*.4,v=.5+Math.random()*1.2;PS.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.3,t,l:700+Math.random()*500,k:cols[i%4]})}
  while(PS.length>240)PS.shift();
  if(y>GY+2){const lx=x+OFF-fsh;
    if(HW){const p=FIT.find(o=>o.k=='p'&&Math.hypot(o.x-lx,o.y-6-y)<16);if(p)TG.push({x:p.x,y:p.y-10,t})}
    SPR.push({x:lx,y:Math.min(H-4,Math.max(GY+6,y)),t,k:['#6a8aff','#a9c0ff','#7bc4ff','#ff8fb5','#fff6b0'][SPR.length%5]});if(SPR.length>14)SPR.shift()}
  else if(HW)FLY.push({x,by:y,y,vx:.9,ph:Math.random()*6,tmp:1});
  else SS.push({x:Math.max(0,x-20),y:Math.max(4,y-6),t0:t});
  if(FF.length<36)FF.push({x,y,vx:0,vy:0,a:Math.random()*6,s:.0006+Math.random()*.0008,k:FF.length%3,ph:Math.random()*6})}
addEventListener('pointerdown',e=>{const t=e.target;
  if(!(t===cv||t===document.body||t===document.documentElement||(t.classList&&t.classList.contains('wrap'))))return;
  const[x,y]=toScene(e);burst(x,y,performance.now())});
function scene(t){
  const tgt=hasP?(mx/W-.5):Math.sin(t/7000)*.3;pxs+=(tgt-pxs)*.05;
  const s1=-pxs*6,s2=-pxs*14;fsh=-pxs*28;
  const A=HW?'#ffb0a0':'#a9c8ff',lit='lighter',nrm='source-over';
  c.drawImage(sky,0,0);
  /* estrelas e luar */
  ST.forEach(q=>{c.globalAlpha=.25+.75*Math.abs(Math.sin(t/q.s+q.a));const x=q.x+s1*.3;R(x,q.y,1,1,'#fff');if(q.a>4.5){R(x-1,q.y,3,1,A);R(x,q.y-1,1,3,A)}});c.globalAlpha=1;
  c.globalCompositeOperation=lit;blob(214,26,64,64,.26+.04*Math.sin(t/900),HW?'255,60,60':'190,210,255');c.globalCompositeOperation=nrm;
  /* nuvens lentas */
  c.globalAlpha=.4;for(let i=0;i<4;i++){const x=((t*.004*(i+1)+i*95)%(W+120))-60,y=20+i*15,k=HW?'#4a2c66':'#1a3470';ell(x,y,26,4,k);ell(x-12,y+1,14,3,k);ell(x+13,y+1,15,3,k)}c.globalAlpha=1;
  /* estrelas cadentes (modo normal) */
  if(!HW&&t>nextSS){SS.push({x:Math.random()*W*.7,y:Math.random()*40,t0:t});nextSS=t+6000+Math.random()*6000}
  for(let i=SS.length-1;i>=0;i--){const q=SS[i],a=(t-q.t0)/800;if(a>1){SS.splice(i,1);continue}
    const hx=q.x+a*100,hy=q.y+a*44;for(let k=0;k<11;k++){c.globalAlpha=(1-k/11)*(1-a);R(hx-k*3,hy-k*1.3,1,1,'#fff')}c.globalAlpha=1}
  c.drawImage(L1,-OFF+s1,0);
  /* morcegos (Halloween) */
  for(let i=FLY.length-1;i>=0;i--){const f=FLY[i];f.x+=f.vx;
    if(f.tmp){f.y-=.25+Math.sin(t/200+f.ph)*.1;if(f.x>W+10||f.y<-10){FLY.splice(i,1);continue}}
    else{if(f.x>W+30)f.x=-30;f.y=f.by+Math.sin(t/450+f.ph)*6}
    bat(Math.round(f.x),Math.round(f.y),Math.sin(t/90+f.ph)>0?1:0)}
  c.drawImage(L2,-OFF+s2,0);
  /* fumaça da chaminé e luz das janelas */
  if(t-lastSmk>420){lastSmk=t;SMK.push({x:CHIM[0],y:CHIM[1],t})}
  while(SMK.length&&t-SMK[0].t>3200)SMK.shift();
  SMK.forEach(p=>{const a=(t-p.t)/3200;c.globalAlpha=(1-a)*.4;circ(Math.round(p.x-OFF+s2+a*16+Math.sin(a*6)*2),Math.round(p.y-a*34),1+(a*4|0),HW?'#b8a0d8':'#c8d8f0')});c.globalAlpha=1;
  c.globalCompositeOperation=lit;WIN.forEach(([wx,wy],i)=>blob(wx-OFF+s2,wy,18,15,(.7+.15*Math.sin(t/160+i*2)+.07*Math.sin(t/41+i))*(HW?.9:.8),'255,175,70'));c.globalCompositeOperation=nrm;
  /* névoa baixa */
  for(let i=0;i<4;i++)blob(((t*.006*(1+i*.3)+i*100)%460)-70,GY-6+i*8,70,10,.14,HW?'190,150,230':'110,150,220');
  c.drawImage(L3,-OFF+fsh,0);
  /* itens da frente: cogumelos, abóboras, velas e lampiões */
  FIT.forEach(o=>{const sx=o.x-OFF+fsh;if(sx<-24||sx>W+24)return;
    const d=mx<0?999:Math.hypot(mx-sx,my-(o.y-6));o.g+=((d<24?1:0)-o.g)*.12;
    const fl=.8+.2*Math.sin(t/140+o.x)+.06*Math.sin(t/37+o.x*3);
    if(o.k=='m'){const k=MC[o.c];c.globalCompositeOperation=lit;blob(sx,o.y-6,18,13,(.3+.7*o.g)*(.8+.2*Math.sin(t/400+o.x)),k[1]);c.globalCompositeOperation=nrm;
      R(sx-1,o.y-4,3,4,'#e8dcc8');ell(sx,o.y-6,5,3.5,k[0]);R(sx-2,o.y-8,1,1,'#fff');R(sx+1,o.y-9,1,1,'#fff');R(sx+2,o.y-6,1,1,'#fff')}
    else if(o.k=='p'){c.globalCompositeOperation=lit;blob(sx,o.y-5*o.s,20*o.s,14*o.s,(.35+.45*o.g)*fl,'255,150,40');c.globalCompositeOperation=nrm;pump(sx,o.y,o.s,o.g>.5||Math.sin(t/1100+o.x)>-.55?'#ffe866':'#5a2a08')}
    else if(o.k=='c'){R(sx,o.y-5,2,5,'#f0e8d0');R(sx,o.y-7,1,2+(fl>.9?1:0),'#ffb040');c.globalCompositeOperation=lit;blob(sx,o.y-7,10,10,.5*fl,'255,170,60');c.globalCompositeOperation=nrm}
    else{const dir=o.x<LW/2?1:-1,lx=sx+dir*8+Math.sin(t/600+o.x)*1.5,fc=HW?'#ff9a2a':'#ffe08a';
      R(sx,o.y-26,2,26,'#3a2a1e');R(dir>0?sx:sx-8,o.y-26,10,2,'#3a2a1e');R(lx,o.y-24,1,3,'#3a2a1e');R(lx-2,o.y-21,5,7,'#2a1c1c');R(lx-1,o.y-20,3,5,fc);
      c.globalCompositeOperation=lit;blob(lx,o.y-18,22,19,.55*fl,HW?'255,150,40':'255,210,120');c.globalCompositeOperation=nrm}});
  /* brotos que nascem no clique */
  SPR.forEach(o=>{const sx=o.x-OFF+fsh,g=Math.min(1,(t-o.t)/800);
    if(HW){c.globalCompositeOperation=lit;blob(sx,o.y-3,12,9,.4*g,'255,150,40');c.globalCompositeOperation=nrm;pump(sx,o.y,Math.max(.3,.75*g),'#ffe866')}
    else{const h=Math.round(g*8);R(sx,o.y-h,1,h,'#3fa38a');if(h>5){R(sx+1,o.y-3,2,1,'#5ac89a');R(sx-1,o.y-h-1,3,1,o.k);R(sx,o.y-h-2,1,3,o.k);R(sx,o.y-h-1,1,1,'#fff6b0')}}});
  /* fantasminha que sai da abóbora */
  for(let i=TG.length-1;i>=0;i--){const q=TG[i],a=(t-q.t)/1900;if(a>1){TG.splice(i,1);continue}
    const sx=q.x-OFF+fsh;c.globalAlpha=Math.sin(Math.min(1,a*1.4)*Math.PI*.5)*(1-a);ghost(Math.round(sx+Math.sin(a*9)*3),Math.round(q.y-a*40),Math.round(t/190)%2);c.globalAlpha=1}
  /* vaga-lumes / fogos-fátuos: vêm até o cursor e giram em volta dele */
  const FC=HW?['#ff9a2a','#b070ff','#7ae04a']:['#ffe866','#b8ff9a','#9ae0ff'],FR=HW?['255,150,40','170,100,255','120,255,90']:['255,230,100','184,255,154','154,224,255'];
  FF.forEach(f=>{
    f.vx+=Math.cos(t*f.s+f.a)*.012;f.vy+=Math.sin(t*f.s*1.3+f.a)*.012;
    if(mx>=0){const dx=mx-f.x,dy=my-f.y,d=Math.hypot(dx,dy)||1;if(d<95&&d>9){f.vx+=dx/d*.022;f.vy+=dy/d*.022}else if(d<=9){f.vx-=dx/d*.06;f.vy-=dy/d*.06}}
    if(f.x<10)f.vx+=.03;if(f.x>W-10)f.vx-=.03;if(f.y<30)f.vy+=.03;if(f.y>GY+30)f.vy-=.03;
    f.vx*=.96;f.vy*=.96;f.x+=f.vx;f.y+=f.vy;
    const bb=.5+.5*Math.sin(t/300+f.ph);
    c.globalCompositeOperation=lit;blob(f.x,f.y,10,10,.3+.3*bb,FR[f.k]);c.globalCompositeOperation=nrm;
    if(HW){c.globalAlpha=.4;R(f.x-f.vx*4,f.y-f.vy*4,1,1,FC[f.k]);c.globalAlpha=1}
    R(f.x,f.y,1,1,FC[f.k]);if(bb>.7){R(f.x-1,f.y,3,1,FC[f.k]);R(f.x,f.y-1,1,3,FC[f.k])}});
  /* fantasmas (Halloween): flutuam e fogem do cursor */
  GH.forEach((g,i)=>{let x=g.bx+Math.sin(t/2300+g.ph)*30+g.ox,y=g.by+Math.sin(t/800+g.ph)*6+g.oy;
    if(mx>=0){const dx=x-mx,dy=y-my,d=Math.hypot(dx,dy)||1;if(d<55){g.ox+=dx/d*1.8;g.oy+=dy/d*1.8}}
    g.ox*=.97;g.oy*=.97;g.ox=Math.max(-90,Math.min(90,g.ox));g.oy=Math.max(-30,Math.min(40,g.oy));
    x=Math.max(8,Math.min(W-8,x));
    c.globalCompositeOperation=lit;blob(x,y,18,18,.22,'160,255,230');c.globalCompositeOperation=nrm;
    c.globalAlpha=.8;ghost(Math.round(x),Math.round(y),Math.round(t/190+i)%2);c.globalAlpha=1});
  /* aranha na teia (Halloween): desce quando o cursor chega no canto */
  if(HW){const near=mx>=0&&mx<75&&my<85;spL+=((near?36:16)-spL)*.06;const len=spL+Math.sin(t/700)*3,sx=22,wk='rgba(225,220,240,.7)';
    ln(0,0,32,0,wk);ln(0,0,0,32,wk);ln(0,0,24,24,wk);[8,15,22].forEach(d=>{ln(d,0,d*.7,d*.7,wk);ln(d*.7,d*.7,0,d,wk)});
    R(sx,0,1,len,wk);const sy=Math.round(len);R(sx-1,sy,3,3,KK);R(sx-2,sy-1,1,1,KK);R(sx+2,sy-1,1,1,KK);R(sx-2,sy+1,1,1,KK);R(sx+2,sy+1,1,1,KK);R(sx-1,sy+3,1,1,KK);R(sx+1,sy+3,1,1,KK);R(sx,sy+1,1,1,'#ff3a3a')}
  /* folhas caindo */
  LV.forEach(l=>{l.y+=.14*l.s;l.x+=(Math.sin(t/900+l.a)*.2-.06);if(l.y>H){l.y=-4;l.x=Math.random()*W}if(l.x<0)l.x+=W;c.globalAlpha=.6;R(l.x,l.y,2,1,l.k);R(l.x+1,l.y+1,1,1,l.k)});c.globalAlpha=1;
  /* faíscas do clique */
  for(let i=PS.length-1;i>=0;i--){const p=PS[i],a=(t-p.t)/p.l;if(a>=1){PS.splice(i,1);continue}
    p.x+=p.vx;p.y+=p.vy;p.vy+=.012;p.vx*=.99;c.globalAlpha=1-a;R(p.x-1,p.y,3,1,p.k);R(p.x,p.y-1,1,3,p.k)}c.globalAlpha=1;
  /* luz do cursor (lanterna) */
  if(mx>=0){c.globalCompositeOperation=lit;blob(mx,my,36,36,.2,HW?'255,160,60':'170,200,255');c.globalCompositeOperation=nrm}
  c.drawImage(VG,0,0)}
(()=>{const g=$('lg').getContext('2d');['..XXX..','.XX....','XX.....','XX.....','XX.....','.XX....','..XXX..'].forEach((q,y)=>[...q].forEach((z,x)=>{if(z=='X'){g.fillStyle=x<2?'#fff6c8':'#e6d98a';g.fillRect(x,y,1,1)}}))})();

/* ================= videiras em volta do cartão ================= */
const card=$('card');
const vines=(()=>{
  const S=3,MG=30,cv2=document.createElement('canvas');
  cv2.style.cssText=`position:absolute;left:-${MG+4}px;top:-${MG+4}px;z-index:-1;pointer-events:none;image-rendering:pixelated;filter:drop-shadow(2px 3px 0 rgba(0,0,0,.3))`;
  card.appendChild(cv2);
  function draw(){
    const pw=card.offsetWidth,ph=card.offsetHeight;if(!pw)return;
    const cw=Math.ceil((pw+2*MG)/S),ch=Math.ceil((ph+2*MG)/S);cv2.width=cw;cv2.height=ch;cv2.style.width=cw*S+'px';cv2.style.height=ch*S+'px';
    const g=cv2.getContext('2d'),P=(x,y,w,h,k)=>{g.fillStyle=k;g.fillRect(Math.round(x),Math.round(y),w,h)};
    const o=MG/S,w=pw/S,h=ph/S,L=2*(w+h),V=HW?['#1f3a14','#3f6a2a','#78a844']:['#1a5a48','#2f8f6a','#5ac89a'];
    const pt=u=>{u=(u%L+L)%L;if(u<w)return[o+u,o,0,-1];u-=w;if(u<h)return[o+w,o+u,1,0];u-=h;if(u<w)return[o+w-u,o+h,0,1];u-=w;return[o,o+h-u,-1,0]};
    const at=(u,d)=>{const[x,y,nx,ny]=pt(u);return[x+nx*d,y+ny*d,nx,ny]};
    const dd=u=>2.5+Math.sin(u*.35)*1.8;
    for(let u=0;u<L;u+=.4){const[x,y]=at(u,dd(u));P(x,y+1,1,1,V[0])}
    for(let u=0;u<L;u+=.4){const[x,y]=at(u,dd(u));P(x,y,1,1,V[1])}
    for(let u=3,i=0;u<L;u+=6.5,i++){const[x,y,nx,ny]=at(u,dd(u)),s=i%2?1:-1,lx=x-ny*s*2+nx,ly=y+nx*s*2+ny;P(lx-1,ly-1,3,2,V[2]);P(lx,ly,2,1,V[1])}
    for(let u=9;u<L;u+=19){const[x,y,nx,ny]=at(u,dd(u));P(x+nx*2,y+ny*2,1,1,V[1]);P(x+nx*3-ny,y+ny*3+nx,1,1,V[1]);P(x+nx*3-ny*2,y+ny*3+nx*2,1,1,V[1])}
    if(!HW){const FB=['#4da3ff','#7bc4ff','#6a8aff','#a9d8ff'];
      for(let u=5,i=0;u<L;u+=9,i++){const[x,y]=at(u,dd(u)+1),k=FB[i%4];
        if(i%3==2){P(x,y,2,2,k);P(x,y,1,1,'#fff')}else{P(x-1,y,3,1,k);P(x,y-1,1,3,k);P(x-1,y-1,1,1,FB[(i+1)%4]);P(x+1,y+1,1,1,FB[(i+1)%4]);P(x,y,1,1,'#fff6b0')}}
      [[0,0],[w,0],[w,h],[0,h]].forEach(([cx,cy],j)=>{const x=o+cx+(cx?3:-3),y=o+cy+(cy?3:-3);
        [[0,0],[3,-1],[-2,2],[2,3],[-3,-2]].forEach(([dx,dy],i)=>{const k=FB[(i+j)%4];P(x+dx-1,y+dy,3,1,k);P(x+dx,y+dy-1,1,3,k);P(x+dx,y+dy,1,1,'#fff6b0')})})
    }else{
      const pk=(x,y,s)=>{g.save();g.translate(Math.round(x),Math.round(y));g.scale(s,s);
        P(0,-4,1,1,'#3f6a2a');P(1,-4,1,1,'#3f6a2a');P(2,-3,1,1,'#3f6a2a');P(-3,-2,7,5,'#7a3008');P(-2,-3,5,1,'#7a3008');P(-2,3,5,1,'#7a3008');
        P(-2,-2,5,5,'#e8761a');P(-3,-1,7,3,'#e8761a');P(-2,-2,1,5,'#f08a2a');P(2,-2,1,5,'#c85a10');P(0,-2,1,5,'#b0510a');
        P(-2,-1,1,1,'#ffe866');P(1,-1,1,1,'#ffe866');P(-1,1,3,1,'#ffe866');g.restore()};
      for(let u=14;u<L;u+=L/9){const[x,y]=at(u,dd(u)+2);pk(x,y,1)}
      [[0,0],[w,0],[w,h],[0,h]].forEach(([cx,cy])=>pk(o+cx+(cx?4:-4),o+cy+(cy?4:-4),2))}
  }
  new ResizeObserver(draw).observe(card);draw();return draw})();

/* ================= coruja (pede o registro, reage ao formulário) ================= */
const owl=(()=>{
  const OW=22,OH=28,P={b:'#8a5a34',d:'#5e3a1e',w2:'#74482a',l:'#a8744a',s:'#e6cfa0',s2:'#c9a672',w:'#fff4d6',k:'#14100e',o:'#ffb020',o2:'#c87810',f:'#e89a20',h:'#2a1840',H:'#4a2c6e',a:'#ff8a1a',y:'#ffe866'};
  const ov=document.createElement('canvas');ov.width=OW;ov.height=OH;
  ov.style.cssText='position:fixed;left:0;top:0;z-index:6;cursor:pointer;image-rendering:pixelated;filter:drop-shadow(2px 3px 0 rgba(0,0,0,.3));touch-action:manipulation';
  document.body.appendChild(ov);
  const g=ov.getContext('2d'),Q=(x,y,w,h,k)=>{g.fillStyle=P[k]||k;g.fillRect(x,y,w,h)};
  const bub=document.createElement('div');
  bub.style.cssText="position:fixed;left:0;top:0;z-index:26;font:8px 'Press Start 2P',monospace;color:#2a1840;background:#fdf6dc;padding:7px 9px;box-shadow:0 0 0 3px #14061c;opacity:0;transition:opacity .2s;pointer-events:none;white-space:normal;max-width:min(230px,60vw);line-height:13px";
  document.body.appendChild(bub);
  let bubUntil=0,hoots=0,flapUntil=0,startle=-1e4;
  const WORDS=['Hoo!','Hoo hoo!','Boo!','Quem? Hu-uu!'];
  const say=(t,ms)=>{bub.textContent=t;bub.style.opacity=1;bubUntil=performance.now()+(ms||2500);flapUntil=performance.now()+450;startle=performance.now()};
  ov.addEventListener('click',()=>say(WORDS[hoots++%WORDS.length],1400));
  function draw(o){g.clearRect(0,0,OW,OH);const {fx,fy}=o;
    Q(5,16,12,9,'b');Q(4,18,14,5,'b');Q(6,25,10,1,'b');if(o.ruffle)Q(3,17,16,7,'b');
    Q(7,26,3,2,'f');Q(12,26,3,2,'f');Q(7,17,8,8,'s');
    for(let y=18;y<25;y+=2)for(let k=0;k<3;k++)Q(8+k*2+(y%4?0:1),y,1,1,'s2');
    const rr=Math.round(o.wf*6),qq=Math.round(o.wf*3);
    [3-qq,16+qq].forEach(x=>{Q(x,17-rr,3,8,'d');Q(x+1,18-rr,1,5,'w2')});
    Q(6+fx,8+fy,10,1,'b');Q(5+fx,9+fy,12,1,'b');Q(4+fx,10+fy,14,6,'b');Q(5+fx,16+fy,12,1,'b');
    Q(5+fx,10+fy,12,5,'l');Q(5+fx,9+fy,5,1,'d');Q(12+fx,9+fy,5,1,'d');
    [5,12].forEach(ex=>{if(o.closed)Q(ex+fx,12+fy,5,1,'d');
      else{Q(ex+fx,10+fy,5,5,'w');Q(ex+fx+o.px,10+fy+o.py,o.ps,o.ps,'k');Q(ex+fx+o.px,10+fy+o.py,1,1,'#fff')}});
    Q(10+fx,12+fy,2,2,'o');Q(10+fx,14+fy,2,1,'o2');
    if(HW){[[12,0,2],[11,1,3],[10,2,4],[9,3,6],[8,4,7]].forEach(([x,y,w])=>{Q(x+fx,y+fy,w,1,'H');Q(x+w-1+fx,y+fy,1,1,'h')});
      Q(7+fx,5+fy,9,1,'a');Q(10+fx,5+fy,2,1,'y');Q(4+fx,6+fy,14,1,'H');Q(3+fx,7+fy,16,1,'h')}}
  let ox=innerWidth/2,oy=innerHeight/2,lx=0,ly=0,last=performance.now(),nextBlink=last+2500,blinkEnd=0,hover=false,typing=-1e4;
  addEventListener('pointermove',e=>{ox=e.clientX;oy=e.clientY},{passive:true});
  addEventListener('input',()=>{typing=performance.now()});
  ov.addEventListener('pointerenter',()=>hover=true);ov.addEventListener('pointerleave',()=>hover=false);
  function frame(now){requestAnimationFrame(frame);
    const dt=Math.min(.05,(now-last)/1000);last=now;
    const sc=innerWidth<520?2:3,w=OW*sc,h=OH*sc,pr=card.getBoundingClientRect(),x=pr.right-16-w,y=pr.top+5-h;
    const cx=x+w/2,cy=y+12*sc,ae=document.activeElement,pwF=ae&&ae.type=='password';
    let tx=ox,ty=oy;
    if(ae&&ae.tagName=='INPUT'&&now-typing<3500){const q=ae.getBoundingClientRect();tx=q.left+Math.min(q.width,10+(ae.selectionStart||0)*10);ty=q.top+q.height/2}
    const dx=tx-cx,dy=ty-cy,d=Math.hypot(dx,dy)||1,k=Math.min(1,d/160),near=d<90;
    const sm=1-Math.exp(-dt*10);lx+=(dx/d*k-lx)*sm;ly+=(dy/d*k-ly)*sm;
    const fx=lx>.5?1:lx<-.5?-1:0,fy=(ly>.55||now-typing<150)?1:0,ps=near?3:2,rg=5-ps;
    const px=Math.max(0,Math.min(rg,Math.round(rg*(.5+lx*.5)))),py=Math.max(0,Math.min(rg,Math.round(rg*(.5+ly*.5))));
    if(now>nextBlink){blinkEnd=now+130;nextBlink=now+(Math.random()<.25?300:2200+Math.random()*3200)}
    const closed=pwF&&ae.type=='password'||now<blinkEnd;           /* fecha os olhos na senha (privacidade) */
    wfv+=((now<flapUntil?.5+.5*Math.sin(now/55):0)-wfv)*.5;
    const sh=now-startle<320?Math.sin((now-startle)/320*Math.PI)*10:0,bob=Math.sin(now/650)*.7;
    draw({fx,fy,px,py,ps,closed,wf:wfv,ruffle:hover||near});
    ov.style.width=w+'px';ov.style.height=h+'px';ov.style.transform=`translate(${x}px,${y-sh+bob}px)`;
    if(bubUntil&&now>bubUntil){bub.style.opacity=0;bubUntil=0}
    if(bubUntil){const bw=bub.offsetWidth;bub.style.transform=`translate(${Math.max(4,x-bw-10)}px,${Math.max(4,y-sh+6*sc)}px)`}}
  let wfv=0;requestAnimationFrame(frame);
  return{say}
})();

/* ================= formulário ================= */
const frm=$('frm'),err=$('err'),go=$('go');let mode='reg';
const TXT={reg:{t:'Crie sua conta',h:'Registre-se para escrever suas notas da noite.',b:'Criar conta',s:'Já tem conta?',sb:'Entrar',o:'Hoo! Me diga seu nome e crie sua conta!'},
           log:{t:'Bem-vindo de volta',h:'Entre para continuar escrevendo.',b:'Entrar',s:'Ainda não tem conta?',sb:'Cadastrar',o:'Hoo! Que bom te ver de novo!'}};
function setMode(m,quiet){mode=m;card.dataset.m=m;const x=TXT[m];
  $('ttl').textContent=x.t;$('hint').textContent=x.h;go.textContent=x.b;$('swt').textContent=x.s;$('swb').textContent=x.sb;err.textContent='';
  $('senha').autocomplete=m=='reg'?'new-password':'current-password';
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.m==m));
  setTimeout(vines,0);if(!quiet)owl.say(x.o,2600)}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>setMode(b.dataset.m));
$('swb').onclick=()=>setMode(mode=='reg'?'log':'reg');
document.querySelectorAll('.eye').forEach(b=>b.onclick=()=>{const i=$(b.dataset.for),s=i.type=='password';i.type=s?'text':'password';b.textContent=s?'ocultar':'ver'});

const fail=(msg,id)=>{err.textContent=msg;owl.say(msg,3500);const el=id&&$(id);if(el)el.focus();card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake')};
function done(u){if(!DB.sessao(u))return fail('Não consegui salvar no navegador.');
  go.disabled=true;err.textContent='';owl.say('Bem-vindo, '+u.nome+'! Hoo!',2200);setTimeout(()=>{location.href=back},1300)}

frm.onsubmit=async e=>{e.preventDefault();if(go.disabled)return;
  const nome=$('nome').value.trim(),email=$('email').value.trim().toLowerCase(),senha=$('senha').value;
  if(mode=='reg'){
    if(nome.length<2)return fail('Escreva seu nome (mínimo 2 letras).','nome');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return fail('Esse e-mail parece inválido.','email');
    if(senha.length<6)return fail('A senha precisa de 6+ caracteres.','senha');
    if(senha!==$('senha2').value)return fail('As senhas não são iguais!','senha2');
    const rs=await DB.criar(nome,email,senha);
    if(rs.erro==='existe'){setMode('log',true);$('email').value=email;return fail('Esse e-mail já tem conta. Entre com sua senha!','senha')}
    if(rs.erro)return fail('Não consegui salvar a conta.');
    done(rs.u)
  }else{
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return fail('Digite o e-mail da sua conta.','email');
    if(!senha)return fail('Digite sua senha.','senha');
    const rs=await DB.entrar(email,senha);
    if(rs.erro==='sem-conta')return fail('Não achei essa conta. Cadastre-se!','email');
    if(rs.erro)return fail('Senha incorreta. Tente de novo!','senha');
    done(rs.u)}};

/* backup do banco de dados: salvar / restaurar contas (para levar a outro navegador) */
(()=>{const sw=card.querySelector('.sw');if(!sw)return;
  const p=document.createElement('p');p.className='sw';p.style.marginTop='8px';
  p.innerHTML='<button type="button" id="bkx">Salvar backup das contas</button> &middot; <button type="button" id="bki">Restaurar backup</button>';
  const fi=document.createElement('input');fi.type='file';fi.accept='.json,application/json';fi.hidden=true;p.appendChild(fi);
  sw.after(p);
  p.querySelector('#bkx').onclick=()=>{const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([JSON.stringify(DB.exportar())],{type:'application/json'}));a.download='nocturne-backup.json';
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);owl.say('Backup salvo! Guarde bem esse arquivo.',2800)};
  p.querySelector('#bki').onclick=()=>fi.click();
  fi.onchange=()=>{const f=fi.files[0];if(!f)return;const rd=new FileReader();
    rd.onload=()=>{let o=null;try{o=JSON.parse(rd.result)}catch(e){}const rs=DB.importar(o);
      if(rs.erro)owl.say('Esse arquivo não parece um backup do Nocturne.',3200);
      else{owl.say(rs.novos?rs.novos+' conta(s) restaurada(s)! Agora é só entrar.':'Nenhuma conta nova nesse backup.',3200);setMode('log',true)}
      fi.value=''};
    rd.readAsText(f)}})();

setMode('reg',true);
setTimeout(()=>owl.say(TXT.reg.o,3500),700);
requestAnimationFrame(function L(t){requestAnimationFrame(L);if(document.hidden)return;c=M;scene(t)});
})();