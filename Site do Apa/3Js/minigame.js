/* ===== PANDA MAGO — mini jogo (v5) =====
   Carregue DEPOIS de paginaincial.js (e de halloween.js, se usar):
     <script src="minigame.js"></script>
   Tudo é criado por este arquivo: ícone no canto esquerdo (com o texto JOGO), janela do jogo, estilos e lógica.
   Adapta-se sozinho a dia/noite e normal/Halloween (lê as classes 'day' e 'hw' do <html>).
   O ícone some enquanto o bloco de notas estiver aberto (veja NOTA_ABERTA logo abaixo dos ajustes).

   REGRAS
   - O panda vermelho lança feitiços com as SETAS (ou botões na tela, no celular). ESPAÇO = pular.
   - Cada inimigo tem uma seta na cabeça. Só o MAIS PRÓXIMO pode ser atingido: aperte a seta dele.
   - Os inimigos de cada bloco de 5 fases são animais do BOSS que vem depois:
       fases 1-5 aranhas -> Aranha Rainha · 6-10 escorpiões -> Escorpião · 11-15 vespas -> Vespão
       · 16-20 cogumelos/abóboras -> Cogumelão/Abobrão (depois o ciclo recomeça, mais difícil).
   - Cada fase começa com 5 corações. Se o feitiço demorar, o inimigo da frente ataca (-1 coração).
   - Errar a seta não tira coração: só zera o combo.
   - BOSS: as 10 setas aparecem de uma vez e você tem 10 SEGUNDOS para acertar todas, em ordem.
     Errar custa 0,5 segundo. Se o tempo acabar o boss ataca (-1 coração) e o relógio recomeça.
     Cada boss tem uma mecânica própria:
       Aranha Rainha  -> a TEIA esconde as próximas setas por alguns segundos
       Escorpião      -> o VENENO inverte as teclas (cima<->baixo, esquerda<->direita)
       Vespão         -> lança FERRÕES: aperte ESPAÇO para pular por cima
       Cogumelão      -> ESPOROS embaralham as setas que faltam
   - Aba ROUPAS: gaste moedas em roupas (modo normal) ou fantasias (Halloween).
     COMUNS (baratas) · RARAS (efeito próprio) · LENDÁRIAS (efeitos elaborados).
     CADA ROUPA TEM A SUA VARINHA: o cabo, a ponta, o feitiço e as partículas mudam com a skin. */
(()=>{
if(window.__pandaGame)return;window.__pandaGame=1;

/* ---------- ajustes ---------- */
const LIMITE=30,PASSO=2,MIN_T=10,VIDAS=5,BOSS_CADA=5,BOSS_TECLAS=10,BOSS_TEMPO=10;
const W=320,H=180,GY=146,FY=156,SY=150,PX=44,X0=240,ESP=24,ZONA=96,MORDE=64,BX=236;
/* seletor(es) que indicam "bloco de notas aberto" — o ícone do jogo some enquanto algum existir.
   Se as classes do seu bloco de notas forem outras, ajuste aqui. */
const NOTA_ABERTA='.pad.big,.pad.open,.pad.on,.pad.aberto,html.pad-open,body.pad-open';
const root=document.documentElement;
const hwOn=()=>root.classList.contains('hw'),nightOn=()=>!root.classList.contains('day');
const KEYS={ArrowUp:0,ArrowDown:1,ArrowLeft:2,ArrowRight:3};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const ls=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}};
const ss=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const pick=a=>Array.isArray(a)?a[(Math.random()*a.length)|0]:a;
let raf=0,last=0,isOpen=false;

/* ---------- paletas: normal/Halloween × dia/noite (mesmas cores do site) ---------- */
const FLN=['#4da3ff','#7bc4ff','#2f6fe0','#a9d8ff','#6a5cff','#3fd0ff'],FLH=['#ff7a1a','#ffa43a','#c85a10','#ffd080','#a050e0','#ff5a3a'];
function pal(){const h=hwOn(),n=nightOn();
  const dir=h?['#ffa43a','#7ae04a','#ff5a3a','#c08aff']:['#ffd84a','#3fd0ff','#ff7aa8','#a98aff'];
  const ui=h?{pn:'#2a1a3a',bd:'#14061c',tx:'#ffb060',bt:'#e8761a',bt2:'#a8480a',bc:'#2a1408',glow:'rgba(255,138,26,.7)',tb:'#3c2a54',tbc:'#c9a0e8',on:'#e8761a',onc:'#2a1408',cd:'#1c1028',cs:'#3c2a54'}
    :n?{pn:'#1a2d5f',bd:'#0a1330',tx:'#cfe0ff',bt:'#3fa38a',bt2:'#2a7a66',bc:'#ffffff',glow:'rgba(77,163,255,.7)',tb:'#2a3f78',tbc:'#cfe0ff',on:'#3fa38a',onc:'#ffffff',cd:'#12204a',cs:'#2a3f78'}
      :{pn:'#fdf6dc',bd:'#5a3519',tx:'#5a3519',bt:'#3fa38a',bt2:'#2a7a66',bc:'#ffffff',glow:'rgba(77,163,255,.7)',tb:'#d8c690',tbc:'#5a3519',on:'#3fa38a',onc:'#ffffff',cd:'#fffdf0',cs:'#e6d9aa'};
  let s;
  if(!h&&!n)s={sky:['#7d8da0','#8b9bad','#99a8b8','#a8b5c3','#b6c1cc','#c4ced7'],f:'#b5cfe0',m:'#8fb4cc',t:'#5f94b5',hl:'#8fc3dc',psh:'#3d6f90',g:['#5aa56a','#68b377','#9bdc9c','#3f8458'],b:['#2f7a45','#46a05a','#74c46c'],bo:'#1d4f2e',cl:'#d9dfe6',ink:'#2a1c10',sh:'#ffffff',fl:FLN};
  else if(!h&&n)s={sky:['#050a1f','#07102b','#0a1838','#0d2147','#102a58','#133468'],f:'#0b1f45',m:'#0d2a58',t:'#123a73',hl:'#1f5fa8',psh:'#081733',g:['#0c3a44','#0f4a56','#1f7a8c','#082a33'],b:['#0a3a30','#115444','#1d7a58'],bo:'#05201c',cl:'#26376a',ink:'#e8f0ff',sh:'#000000',fl:FLN};
  else if(h&&!n)s={sky:['#7a7090','#8a80a0','#9a90b0','#aaa0be','#bcb2cc','#cec6da'],f:'#a898c0',m:'#8a76aa',t:'#6a5690',hl:'#9a82c0',psh:'#4a3868',g:['#54476c','#645484','#9470bc','#3c3054'],b:['#483860','#5e4a84','#7e62aa'],bo:'#2c1e44',cl:'#8a80a0',ink:'#1c1028',sh:'#e8dcf8',fl:FLH};
  else s={sky:['#1b0d30','#281548','#38205a','#4e2c66','#6e3a72','#92484e'],f:'#26143a',m:'#38205a',t:'#4e2c78',hl:'#8a3a90',psh:'#1f1030',g:['#2a1c46','#38246a','#8a52c0','#1a1030'],b:['#38204c','#502c6c','#74388e'],bo:'#1c0a28',cl:'#4e2c66',ink:'#ffe0b0',sh:'#000000',fl:FLH};
  return Object.assign(s,{dir,ui,h,n})}

/* ---------- sprites pequenos (moeda, estrela) ---------- */
const COINR=['..OOOO..','.OYYYYO.','OYWYYSYO','OYWYYSYO','OYYYYSYO','OYYYSSYO','.OSSSSO.','..OOOO..'],COINP={O:'#8a5a00',Y:'#ffd84a',W:'#fff6b0',S:'#e8a020'};
const STARR=['...X...','..XXX..','XXXXXXX','.XXXXX.','..XXX..','.XX.XX.','.X...X.'];
const pixURL=(rows,p)=>{const k=document.createElement('canvas');k.width=rows[0].length;k.height=rows.length;const q=k.getContext('2d');
  rows.forEach((r,y)=>[...r].forEach((c,x)=>{if(p[c]){q.fillStyle=p[c];q.fillRect(x,y,1,1)}}));return k.toDataURL()};
const coinURL=pixURL(COINR,COINP);

/* ---------- ramos do quadro (sem argolas): faixa de galho com folhas, que se repete ---------- */
const BRC={};
function branchURL(P){const key=(P.h?2:0)+(P.n?1:0);if(BRC[key])return BRC[key];
  const k=document.createElement('canvas');k.width=96;k.height=16;const q=k.getContext('2d');
  const px=(x,y,w,h,c)=>{q.fillStyle=c;q.fillRect(x,y,w,h)};
  const wd=P.h?'#3a2a44':P.n?'#5a4a36':'#7a5230',wh=P.h?'#5a4466':P.n?'#7a6648':'#a57a48',
    lf=P.h?['#e8761a','#ffa43a','#a050e0']:P.n?['#2f9a82','#3fd0a8','#1f6f66']:['#2f7a45','#46a05a','#74c46c'],
    bb=P.h?'#ff5a3a':P.n?'#ff9ac0':'#ff6a8a';
  const yAt=x=>8+Math.round(Math.sin(x/96*Math.PI*2)*2);
  for(let x=0;x<96;x++){const y=yAt(x);px(x,y,1,2,wd);px(x,y+1,1,1,'rgba(0,0,0,.25)');px(x,y,1,1,wh)}
  for(let i=0;i<8;i++){const x=5+i*12,y=yAt(x),up=i%2===0,ly=up?y-5:y+4,c=lf[i%3];
    px(x,up?y-2:y+2,1,2,wd);px(x-1,ly,4,3,c);px(x,ly,2,1,lf[(i+1)%3]);px(x+3,ly+(up?2:0),1,1,c);px(x-1,ly+(up?2:0),1,1,'rgba(0,0,0,.25)')}
  for(let i=0;i<4;i++){const x=11+i*24,y=yAt(x);px(x,y-3,2,2,bb);px(x,y-3,1,1,'#ffffff')}
  return BRC[key]=k.toDataURL()}

/* ---------- CSS ---------- */
const css=document.createElement('style');
css.textContent=`
#mgb{position:fixed;left:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));width:88px;z-index:30;padding:0;border:0;background:transparent;cursor:pointer;transition:transform .15s;display:flex;flex-direction:column;align-items:center;gap:6px}
#mgb.off{display:none}
#mgb:hover{transform:translateY(-4px) rotate(-4deg)}
#mgb canvas{display:block;width:80px;height:80px;image-rendering:pixelated;filter:drop-shadow(0 0 6px var(--mgg,rgba(77,163,255,.7))) drop-shadow(3px 4px 0 rgba(0,0,0,.35))}
#mgb span{font:9px 'Press Start 2P',monospace;line-height:12px;padding:5px 8px 4px;color:var(--mgt,#fff);background:var(--mgp,#1a2d5f);box-shadow:0 0 0 3px var(--mgd,#0a1330),3px 3px 0 3px rgba(0,0,0,.35);letter-spacing:1px}
.mg-o{position:fixed;inset:0;z-index:60;display:none;align-items:center;justify-content:center;padding:28px 10px 26px;background:rgba(5,10,31,.68)}
.mg-o.on{display:flex}
.mg-p{position:relative;width:min(96vw,720px);background:var(--pn);color:var(--tx);border:4px solid var(--bd);box-shadow:inset 0 -4px rgba(0,0,0,.14),8px 8px 0 rgba(0,0,0,.4);padding:22px 12px 12px;font:9px 'Press Start 2P',monospace;line-height:14px}
.mg-p:before,.mg-p:after{content:'';position:absolute;left:6px;right:6px;height:32px;background:var(--brn) 0 0/auto 32px repeat-x;image-rendering:pixelated;pointer-events:none;filter:drop-shadow(0 2px 0 rgba(0,0,0,.25))}
.mg-p:before{top:-22px}
.mg-p:after{bottom:-22px;transform:scaleY(-1)}
.mg-h{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}
.mg-co{display:flex;align-items:center;gap:6px;font-size:9px}
.mg-ci{display:inline-block;width:16px;height:16px;background:url(${coinURL}) center/16px 16px no-repeat;image-rendering:pixelated}
.mg-x,.mg-pad button{font:inherit;color:var(--bc);background:var(--bt);border:0;cursor:pointer;box-shadow:inset -3px -3px var(--bt2),inset 3px 3px rgba(255,255,255,.3),0 0 0 3px var(--bd)}
.mg-x{padding:7px 9px;font-size:8px}
.mg-tbs{display:flex;gap:6px;margin:0 3px 12px}
.mg-tb{flex:1;font:inherit;font-size:8px;padding:9px 2px;border:0;cursor:pointer;color:var(--tbc);background:var(--tb);box-shadow:inset -3px -3px rgba(0,0,0,.18),inset 3px 3px rgba(255,255,255,.3),0 0 0 3px var(--bd)}
.mg-tb.on{color:var(--onc);background:var(--on);box-shadow:inset -3px -3px rgba(0,0,0,.25),inset 3px 3px rgba(255,255,255,.3),0 0 0 3px var(--bd)}
.mg-c{display:block;margin:0 auto;width:min(100%,calc((100vh - 240px) * 1.7778));aspect-ratio:16/9;image-rendering:pixelated;box-shadow:0 0 0 3px var(--bd);background:#000;touch-action:manipulation}
.mg-pad{display:none;gap:10px;justify-content:center;margin:14px 4px 4px;flex-wrap:wrap}
.mg-pad button{width:56px;height:52px;font-size:20px}
.mg-pad button.j{font-size:7px;width:66px}
.mg-pad button:active{transform:translateY(2px)}
.mg-t{margin-top:12px;font-size:7px;line-height:12px;text-align:center;opacity:.85}
.mg-wd{display:none}
.mg-p.w .mg-wd{display:block}
.mg-p.w .mg-c,.mg-p.w .mg-pad{display:none!important}
.mg-pv{display:flex;align-items:center;gap:14px;margin:4px 4px 14px}
.mg-pvc{width:128px;height:128px;flex:none;image-rendering:pixelated;background:var(--cd);box-shadow:0 0 0 3px var(--bd)}
.mg-pn{font-size:10px;line-height:14px;margin-bottom:8px}
.mg-pm{font-size:7px;line-height:12px;opacity:.9;min-height:26px}
.mg-gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:12px;margin:0 6px 6px 4px;padding:6px;min-height:120px;max-height:calc(100vh - 380px);overflow-y:auto}
.mg-ga{display:flex;flex-direction:column;align-items:center;gap:6px;font:inherit;font-size:6px;line-height:9px;color:var(--tx);background:var(--cd);border:0;padding:8px 4px;cursor:pointer;box-shadow:0 0 0 3px var(--cs)}
.mg-ga:hover{transform:translateY(-2px)}
.mg-ga.r1{box-shadow:0 0 0 3px #4da3ff}
.mg-ga.r2{box-shadow:0 0 0 3px #ffd84a,0 0 10px 2px rgba(255,216,74,.6);animation:mgl 1.6s ease-in-out infinite}
@keyframes mgl{50%{box-shadow:0 0 0 3px #ffd84a,0 0 16px 5px rgba(255,216,74,.95)}}
.mg-ga.on,.mg-ga.on.r1,.mg-ga.on.r2{box-shadow:0 0 0 3px var(--on),0 0 0 6px var(--bd);animation:none}
.mg-ga b{font-weight:normal;font-size:5px;letter-spacing:.5px}
.mg-ga em{font-style:normal;display:flex;align-items:center;gap:4px;opacity:.9}
.mg-ap{display:block;width:64px;height:64px;background-size:64px 64px;background-repeat:no-repeat;image-rendering:pixelated}
@media (hover:none),(pointer:coarse){.mg-pad{display:flex}}
`;
document.head.appendChild(css);

/* ---------- ícone (rosto do panda vermelho + texto JOGO) ---------- */
const ico=document.createElement('button');ico.id='mgb';ico.type='button';ico.title='Panda Mago (mini jogo)';
ico.setAttribute('aria-label','Abrir mini jogo do panda vermelho');
const ic=document.createElement('canvas');ic.width=ic.height=16;ico.appendChild(ic);
const icl=document.createElement('span');icl.textContent='JOGO';ico.appendChild(icl);
document.body.appendChild(ico);
function drawIcon(){const q=ic.getContext('2d'),h=hwOn();q.clearRect(0,0,16,16);
  const P=(x,y,w,hh,k)=>{q.fillStyle=k;q.fillRect(x,y,w,hh)},O='#d8601e',D='#8a2e10',Wt='#f6eee2',K='#14100e',OL='#1a0a08';
  const sh=[[2,2,3,3],[11,2,3,3],[3,4,10,9],[2,6,12,5]];
  sh.forEach(([x,y,w,hh])=>P(x-1,y-1,w+2,hh+2,OL));
  P(2,2,3,3,D);P(11,2,3,3,D);P(3,4,10,9,O);P(2,6,12,5,O);
  P(3,3,1,1,Wt);P(12,3,1,1,Wt);
  P(3,9,3,3,Wt);P(10,9,3,3,Wt);P(5,10,6,3,Wt);P(4,6,2,1,Wt);P(10,6,2,1,Wt);
  P(4,7,2,2,K);P(10,7,2,2,K);P(4,7,1,1,'#fff');P(10,7,1,1,'#fff');
  P(5,9,1,2,D);P(10,9,1,2,D);P(7,10,2,1,K);P(7,12,2,1,D);
  if(h){P(4,3,8,2,OL);P(5,2,6,2,'#4a2c6e');P(6,1,4,1,'#4a2c6e');P(7,0,2,1,'#4a2c6e');P(5,3,6,1,'#ff8a1a')}}

/* ---------- janela ---------- */
const ov=document.createElement('div');ov.className='mg-o';
ov.innerHTML=`<div class="mg-p" role="dialog" aria-modal="true" aria-label="Panda Mago">
<div class="mg-h"><span>PANDA MAGO</span><span class="mg-co"><i class="mg-ci"></i><b class="mg-cn">0</b></span><button class="mg-x" type="button" aria-label="Fechar">X</button></div>
<div class="mg-tbs"><button class="mg-tb on" type="button" data-t="g">JOGO</button><button class="mg-tb" type="button" data-t="w">ROUPAS</button></div>
<canvas class="mg-c"></canvas>
<div class="mg-pad"><button type="button" data-d="2" aria-label="Esquerda">&#8592;</button><button type="button" data-d="0" aria-label="Cima">&#8593;</button><button type="button" data-d="1" aria-label="Baixo">&#8595;</button><button type="button" data-d="3" aria-label="Direita">&#8594;</button><button type="button" class="j" data-j="1" aria-label="Pular">PULO</button></div>
<div class="mg-wd"><div class="mg-pv"><canvas class="mg-pvc" width="64" height="64"></canvas><div><div class="mg-pn"></div><div class="mg-pm"></div></div></div><div class="mg-gal"></div></div>
<div class="mg-t">Setas = feiti&ccedil;o &middot; Espa&ccedil;o = pular &middot; Enter = iniciar &middot; Esc = sair</div></div>`;
document.body.appendChild(ov);
['pointerdown','pointermove'].forEach(ev=>ov.addEventListener(ev,e=>e.stopPropagation()));
const panel=ov.querySelector('.mg-p'),cv=ov.querySelector('.mg-c'),pv=ov.querySelector('.mg-pvc'),gal=ov.querySelector('.mg-gal'),
      pn=ov.querySelector('.mg-pn'),pm=ov.querySelector('.mg-pm'),cn=ov.querySelector('.mg-cn');
cv.width=W;cv.height=H;
const g0=cv.getContext('2d',{alpha:false});g0.imageSmoothingEnabled=false;
const pvg=pv.getContext('2d');
let g=g0; /* contexto atual (trocado ao desenhar em canvas fora da tela) */
let GA=1; /* transparência-base do desenho atual (usada por alp) */

/* ---------- helpers de desenho (iguais aos do site) ---------- */
const R=(x,y,w,h,k)=>{g.fillStyle=k;g.fillRect(Math.round(x),Math.round(y),Math.max(0,Math.round(w)),Math.round(h))};
const ell=(x,y,a,b,k)=>{const B=Math.round(b);for(let j=-B;j<=B;j++){const w=a*Math.sqrt(Math.max(0,1-j*j/(b*b+.01)));R(x-w,y+j,2*w,1,k)}};
const circ=(x,y,q,k)=>ell(x,y,q,q,k);
const ln=(x1,y1,x2,y2,k)=>{const n=Math.max(Math.abs(x2-x1),Math.abs(y2-y1),1)|0;for(let i=0;i<=n;i++)R(x1+(x2-x1)*i/n,y1+(y2-y1)*i/n,1,1,k)};
const txt=(s,x,y,sz,k,al,P)=>{g.font=sz+'px "Press Start 2P",monospace';g.textBaseline='top';g.textAlign=al||'left';
  g.fillStyle=P.sh;g.fillText(s,x+1,y+1);g.fillStyle=k;g.fillText(s,x,y)};
const sp=(rows,p,x,y,s)=>{s=s||1;rows.forEach((r,j)=>[...r].forEach((c,i)=>{if(p[c])R(x+i*s,y+j*s,s,s,p[c])}))};
const seed=s=>()=>(s=s*16807%2147483647)/2147483647;let rn=seed(5);
const alp=a=>{g.globalAlpha=a*GA};
const tw=(x,y,k)=>{R(x-1,y,3,1,k);R(x,y-1,1,3,k)};
const gl=(x,y,r,k,a)=>{alp(a);circ(x,y,r,k);alp(1)};
const orb=(cx,cy,rx,ry,t,n,spd,fn)=>{for(let i=0;i<n;i++){const a=t/spd+i*6.2832/n;fn(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,i,Math.sin(a))}};
const rise=(x,y,t,n,dur,h,sw,fn)=>{for(let i=0;i<n;i++){const f=(t/dur+i/n)%1;fn(x+Math.sin(f*7+i*2.3)*sw,y-f*h,f,i)}};
const ring=(cx,cy,rx,ry,k,n,ph)=>{for(let i=0;i<n;i++){const a=ph+i*6.2832/n;R(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,1,1,k)}};

function arrow(cx,cy,d,s,k){const P=[];
  for(let r=0;r<4;r++)for(let x=-r;x<=r;x++)P.push([x,-4+r]);
  for(let y=0;y<=4;y++)for(let x=-1;x<=1;x++)P.push([x,y]);
  P.forEach(([x,y])=>{let a,b;if(d===0){a=x;b=y}else if(d===1){a=-x;b=-y}else if(d===2){a=y;b=-x}else{a=-y;b=x}
    R(cx+a*s,cy+b*s,s,s,k)})}

/* ---------- sons ---------- */
let AC;
const tone=(f,d,type,v,when,f2)=>{try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
  const n=AC.currentTime+(when||0),o=AC.createOscillator(),gn=AC.createGain();
  o.type=type||'square';o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);
  gn.gain.setValueAtTime(v||.04,n);gn.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(gn);gn.connect(AC.destination);o.start(n);o.stop(n+d+.02)}catch(e){}};
const sfx=(k,d)=>{
  if(k==='cast')tone(500+d*90,.14,'square',.04,0,900+d*100);
  else if(k==='kill'){tone(880,.08,'triangle',.05,.1);tone(1320,.1,'triangle',.05,.17)}
  else if(k==='miss')tone(140,.12,'sawtooth',.04);
  else if(k==='bite')tone(110,.25,'sawtooth',.07,0,60);
  else if(k==='jump')tone(280,.12,'triangle',.04,0,560);
  else if(k==='coin'){tone(988,.06,'square',.03);tone(1319,.14,'square',.03,.06)}
  else if(k==='boss'){tone(110,.5,'sawtooth',.06,0,70);tone(165,.5,'sawtooth',.04,.15,90)}
  else if(k==='web')tone(600,.25,'triangle',.04,0,200);
  else if(k==='poison')[300,240,300,240].forEach((f,i)=>tone(f,.1,'sawtooth',.04,i*.1));
  else if(k==='sting')tone(900,.18,'sawtooth',.04,0,300);
  else if(k==='shuffle')[500,700,600,800].forEach((f,i)=>tone(f,.06,'square',.03,i*.06));
  else if(k==='clear')[523,659,784,1046].forEach((f,i)=>tone(f,.14,'square',.04,i*.12));
  else if(k==='over')[392,330,262,196].forEach((f,i)=>tone(f,.2,'square',.04,i*.18))};

/* ---------- roupas do panda ----------
   Peças: ['e',cx,cy,rx,ry,cor] elipse · ['r',x,y,w,h,cor] retângulo (relativos ao pé do panda).
   7º item = 1 desenha contorno escuro. c = cores do pelo; ek = cor dos olhos;
   back = atrás do corpo · mid = sobre a cabeça, sob os olhos · front = por cima de tudo.
   Funções animadas: bk (atrás) · fr (na frente) · fxb (efeito atrás) · fx (efeito na frente).
   rar: 0 comum · 1 rara · 2 lendária. bc = cores dos efeitos de acerto. */
const DEF={O:'#d8601e',O2:'#e8702a',D:'#8a2e10',BR:'#4a2012',Wt:'#f6eee2'},OL='#1a0a08',KK='#14100e';
const CATEARS=(c,i)=>[['r',-5,-42,4,3,c,1],['r',-4,-44,2,2,c,1],['r',8,-42,4,3,c,1],['r',9,-44,2,2,c,1],['r',-4,-41,2,1,i],['r',9,-41,2,1,i],['r',13,-23,4,1,'#dfe2f2'],['r',13,-21,4,1,'#dfe2f2'],['r',12,-19,4,1,'#dfe2f2']];
const cone=(cx,by,h,w0,k,o,bend,hl)=>{
  for(let j=0;j<h;j++){const f=j/h,w=Math.max(1,Math.round(w0*(1-f))),x=cx+Math.round(bend*f*f);R(x-w-1,by-j,2*w+3,1,o)}
  for(let j=0;j<h;j++){const f=j/h,w=Math.max(1,Math.round(w0*(1-f))),x=cx+Math.round(bend*f*f);R(x-w,by-j,2*w+1,1,k);if(hl)R(x-w,by-j,1,1,hl)}};
const cape=(ox,oy,t,k,d,l,len,amp)=>{
  const lx=j=>{const f=j/len;return Math.round(ox-5-f*10+Math.sin(t/260+j*.3)*(1+f*amp))};
  for(let j=0;j<len;j++){const a=lx(j);R(a-1,oy-21+j,ox+7-a,1,OL)}
  R(lx(len-1)-1,oy-21+len,ox+7-lx(len-1)+1,1,OL);
  for(let j=0;j<len;j++){const a=lx(j);R(a,oy-21+j,ox+6-a,1,j%7<4?k:d);R(a,oy-21+j,2,1,l)}};
const bw=(x,y,t,len,k,dk)=>{const fp=Math.sin(t/110);
  for(let i=0;i<=14;i++){const a=.25+i*.09+fp*.3,r=len*(i%4===0?1:.76);ln(x,y,x-Math.cos(a)*r,y-Math.sin(a)*r,k)}
  for(let i=0;i<=14;i+=4){const a=.25+i*.09+fp*.3;ln(x,y,x-Math.cos(a)*len,y-Math.sin(a)*len,dk)}};
const flame=(x,y,h,t,ph,c1,c2,c3)=>{const w=Math.sin(t/90+ph)*1.2;
  ell(x+w*.5,y-h*.4,h*.32+1,h*.5,c1);ell(x+w,y-h*.55,h*.22+.5,h*.38,c2);ell(x+w*1.2,y-h*.6,h*.1+.5,h*.2,c3)};
const bolt=(x1,y1,x2,y2,t,k)=>{let px=x1,py=y1;const n=6,sd=Math.floor(t/90);
  for(let i=1;i<=n;i++){const f=i/n,nx=x1+(x2-x1)*f+(i<n?Math.sin(sd*7.3+i*2.1)*4:0),ny=y1+(y2-y1)*f+(i<n?Math.cos(sd*5.1+i*1.7)*4:0);ln(px,py,nx,ny,k);px=nx;py=ny}};
const paw=(x,y,k)=>{R(x,y,3,2,k);R(x-1,y-2,1,1,k);R(x+1,y-3,1,1,k);R(x+3,y-2,1,1,k)};
const mbat=(x,y,t,k)=>{const f=Math.sin(t/70)>0?1:0;R(x-4,y-f,3,1,k);R(x-2,y+1-f,2,1,k);R(x-1,y,3,2,k);R(x+2,y+1-f,2,1,k);R(x+2,y-f,3,1,k);R(x-1,y-1,1,1,k);R(x+1,y-1,1,1,k)};
const clover=(px,py)=>{px=Math.round(px);py=Math.round(py);circ(px-2,py,1.5,'#3fbf5a');circ(px+2,py,1.5,'#3fbf5a');circ(px,py-2,1.5,'#3fbf5a');circ(px,py+2,1.5,'#3fbf5a');R(px,py,1,1,'#b8ffc8')};
const ear=(x,y,t,ph)=>{const pts=[];for(let j=0;j<10;j++)pts.push([x+j*.25+Math.sin(t/420+ph)*j*.3,y-j*1.8,j>6?2.7-(j-6)*.5:2.7]);
  pts.forEach(p=>ell(p[0],p[1],p[2]+1,3.2,OL));pts.forEach(p=>ell(p[0],p[1],p[2],2.4,'#f6f0f0'));
  pts.forEach((p,j)=>{if(j>0&&j<8)R(p[0],p[1],1,2,'#ffb0c0')})};
/* gema em losango (pontas de varinha) */
const gemD=(x,y,hh,ww,c,hl,lo)=>{
  for(let j=-hh;j<=hh;j++){const w=Math.round(ww*(1-Math.abs(j)/(hh+.5)));R(x-w-1,y+j,2*w+3,1,OL)}
  for(let j=-hh;j<=hh;j++){const w=Math.round(ww*(1-Math.abs(j)/(hh+.5)));R(x-w,y+j,2*w+1,1,j>0?(lo||c):c)}
  R(x-1,y-hh+2,1,Math.max(1,hh-2),hl||'#fff')};

const COS={
 padrao:{n:'Panda',pr:0,rar:0,
  fr:(x,y,t)=>{R(x-4,y-33,16,2,'#2f5fd0');R(x-4,y-33,16,1,'#6aa0ff');R(x+2,y-37,5,5,OL);R(x+3,y-36,3,3,'#ffe866');R(x+4,y-36,1,1,'#fff');
    R(x-4,y-31,1,2,'#2f5fd0');R(x+11,y-31,1,2,'#2f5fd0');if(Math.sin(t/420)>.5)R(x+9,y-34,1,1,'#fff')}},
 /* ----- bichos do jogo (modo normal) ----- */
 coruja:{n:'Coruja',pr:30,rar:0,c:{O:'#8a5a34',O2:'#a8744a',D:'#5e3a1e',BR:'#e6cfa0',Wt:'#fff4d6'},
  bk:(x,y,t)=>{const f=Math.round(Math.sin(t/260)*2);ell(x-9,y-15+f,6,11,OL);ell(x-9,y-15+f,5,10,'#6e4426');
    for(let i=0;i<4;i++)R(x-13+i*2,y-8+f+(i&1),2,4,'#a8744a');R(x-12,y-23+f,7,1,'#8a5a34');
    for(let i=0;i<5;i++){R(x-12+((i*3)&7),y-20+f+i*2,1,1,'#e6cfa0')}},
  mid:[['e',5,-29,5.4,5.4,'#8a5a34'],['e',11,-29,5.4,5.4,'#8a5a34'],['e',5,-29,4.6,4.6,'#f2dcae'],['e',11,-29,4.6,4.6,'#f2dcae'],['e',5,-29,6.6,6.6,'#e6cfa0']],
  front:[['r',-5,-42,3,5,'#5e3a1e',1],['r',9,-42,3,5,'#5e3a1e',1],['r',-4,-44,1,2,'#3a2410'],['r',10,-44,1,2,'#3a2410'],['r',12,-25,3,3,'#ffb020',1],['r',13,-23,2,1,'#c87810'],
    ['r',1,-17,2,1,'#fff4d6'],['r',4,-17,2,1,'#fff4d6'],['r',2,-14,2,1,'#fff4d6'],['r',5,-14,2,1,'#fff4d6'],['r',3,-11,2,1,'#fff4d6'],
    ['r',0,-35,5,1,'#5e3a1e'],['r',8,-35,5,1,'#5e3a1e'],['r',3,-37,1,2,'#8a5a34'],['r',8,-37,1,2,'#8a5a34']],
  fr:(x,y,t)=>{R(x-8,y,3,1,'#ffb020');R(x-7,y-1,1,1,'#ffb020');R(x+5,y,3,1,'#ffb020');R(x+6,y-1,1,1,'#ffb020');
    if(Math.sin(t/500)>.6)tw(x+16,y-30,'#fff6b0')}},
 cogumelo:{n:'Cogumelo',pr:30,rar:0,
  bk:(x,y,t)=>{const s=Math.round(Math.sin(t/500));R(x-16,y-12,2,7,'#e8dcc8');ell(x-15,y-14+s,4.5,3,OL);ell(x-15,y-14+s,3.6,2.2,'#d8504a');R(x-16,y-15+s,1,1,'#fff');R(x-13,y-14+s,1,1,'#fff');
    R(x-22,y-9,2,4,'#e8dcc8');ell(x-21,y-10,3,2,OL);ell(x-21,y-10,2.2,1.4,'#f0a040');R(x-27,y-6,2,3,'#e8dcc8');ell(x-26,y-7,2.4,1.6,'#d8504a')},
  front:[['e',3,-38,15,7,'#d8504a',1],['e',3,-33,15,2,'#a8302c'],['e',3,-45,6,1.4,'#f0786e'],['e',-5,-40,2.6,2,'#fff'],['e',4,-43,3,2.2,'#fff'],['e',11,-39,2.4,1.8,'#fff'],['e',0,-36,1.6,1.2,'#fff'],['e',16,-35,1.3,1.1,'#fff'],
    ['e',-9,-36,1.4,1,'#fff'],['e',8,-37,1.2,1,'#f0e8d0']],
  fr:(x,y,t)=>{for(let i=0;i<9;i++)R(x-10+i*3,y-34,1,2,'#7a2020');
    alp(.18+.12*Math.sin(t/250));ell(x+3,y-41,12,3,'#ffffff');alp(1);
    R(x-6,y-9,1,2,'#c0b090');R(x+7,y-8,1,2,'#c0b090');
    rise(x+3,y-46,t,5,2200,16,5,(px,py,f)=>{alp(1-f);R(px,py,2,2,'#e8f0a0')});alp(1)}},
 abobora:{n:'Abóbora',pr:30,rar:0,c:{O:'#e8761a',O2:'#f89a3a',D:'#b0510a',BR:'#ffa43a',Wt:'#ffe866'},
  front:[['r',2,-46,4,7,'#3f6a2a',1],['r',5,-47,3,2,'#3f6a2a'],['r',-3,-35,1,7,'#b0510a'],['r',3,-37,1,8,'#b0510a'],['r',9,-35,1,7,'#b0510a'],['r',-1,-45,1,3,'#5a9a3a']],
  fr:(x,y,t)=>{const fk=.75+.25*Math.sin(t/95),vy=Math.round(Math.sin(t/400));
    ln(x+7,y-46,x+10,y-49+vy,'#3f6a2a');R(x+10,y-50+vy,2,2,'#5a9a3a');R(x+10,y-47,2,2,'#5a9a3a');ell(x-2,y-45,4,2,'#4a8a34');ln(x-4,y-45,x-8,y-42,'#3f6a2a');
    ell(x+3,y-10,7,7.6,OL);ell(x+3,y-10,6,6.6,'#ffa43a');R(x,y-16,1,12,'#e8761a');R(x+3,y-16,1,12,'#e8761a');R(x+6,y-16,1,12,'#e8761a');
    alp(fk);R(x,y-13,2,2,'#ffe866');R(x+5,y-13,2,2,'#ffe866');R(x+1,y-9,5,1,'#ffe866');R(x+1,y-8,1,1,'#ffe866');R(x+5,y-8,1,1,'#ffe866');alp(1);
    alp(.14*fk);circ(x+3,y-10,11,'#ffb040');alp(1)}},
 fantasma:{n:'Fantasma',pr:30,rar:0,float:1,c:{O:'#e8ecff',O2:'#f4f6ff',D:'#b8c0e0',BR:'#cfd6f0',Wt:'#ffffff'},
  bk:(x,y,t)=>{const lx=j=>{const f=j/25;return Math.round(x-5-f*11+Math.sin(t/220+j*.4)*(1.5+f*3))};
    for(let j=0;j<26;j++){const a=lx(j);R(a-1,y-24+j,x+7-a,1,OL)}
    for(let j=0;j<26;j++){const a=lx(j);R(a,y-24+j,x+6-a,1,j%8<4?'#f4f6ff':'#dfe4fa')}
    ell(x+3,y-26,14,13,OL);ell(x+3,y-26,13,12,'#f4f6ff');ell(x+2,y-33,8,3,'#ffffff')},
  front:[['r',6,-26,2,1,'#ff9ac0'],['r',11,-26,2,1,'#ff9ac0']],
  fr:(x,y,t)=>{for(let j=0;j<24;j++){const yy=y-19+j,w=Math.round(8+j*.45),sw=Math.round(Math.sin(t/260+j*.3)*(j>14?1.6:.4));
      R(x-1-w-1+sw,yy,1,1,OL);R(x-1+w+sw,yy,1,1,OL);R(x-1-w+sw,yy,2*w,1,(j%9<4)?'#f4f6ff':'#e2e7fb')}
    for(let k=-1;k<=1;k++){const hy=y+5+Math.round(Math.sin(t/200+k));ell(x-1+k*7,hy,4.4,2.6,OL);ell(x-1+k*7,hy,3.6,2,'#e2e7fb')}
    R(x-4,y-8,1,10,'#c8d0f0');R(x+3,y-10,1,12,'#c8d0f0');
    ln(x-8,y-6,x-12,y-2,'#8a8aa8');R(x-13,y-2,2,2,'#8a8aa8');ln(x+9,y-8,x+12,y-4,'#8a8aa8');R(x+12,y-4,2,2,'#8a8aa8');
    if(Math.sin(t/400)>.5)tw(x+12,y-40,'#fff')}},
 chapeu:{n:'Bruxa',pr:30,rar:0,
  bk:(x,y,t)=>cape(x,y,t,'#4a2c6e','#2f1b4a','#8a52c0',28,1.8),
  fr:(x,y,t)=>{R(x-5,y-21,12,2,'#ffe866');ell(x+1,y-20,2.7,2.7,OL);ell(x+1,y-20,1.8,1.8,'#ff4a8a');
    ln(x-3,y-19,x+1,y-15,'#ffe866');ln(x+5,y-19,x+1,y-15,'#ffe866');R(x,y-15,3,3,OL);R(x+1,y-14,1,1,'#c08aff');
    ell(x+3,y-34,17,4.4,OL);ell(x+3,y-34,16,3.6,'#2f1b4a');cone(x+3,y-35,24,10,'#4a2c6e',OL,7,'#6a4a90');
    R(x-6,y-38,18,3,'#ff8a1a');R(x-6,y-38,18,1,'#ffb060');R(x+1,y-39,5,5,OL);R(x+2,y-38,3,3,'#ffe866');R(x+3,y-37,1,1,'#2f1b4a');
    R(x+1,y-47,1,1,'#ffe866');R(x+5,y-44,1,1,'#8a52c0');
    if(Math.sin(t/300)>-.3)tw(x+4,y-50,'#ffe866');tw(x+9,y-44,'#ffffff')}},
 /* ----- raras ----- */
 gato:{n:'Gato',pr:70,rar:1,fxn:'patinhas luminosas',bc:['#7ad8ff','#ffffff','#4da3ff'],c:{O:'#6b6f8f',O2:'#7a7ea0',D:'#4a4e6d',BR:'#dfe2f2',Wt:'#dfe2f2'},ek:'#7ad04a',
  mid:[['r',1,-35,1,3,'#4a4e6d'],['r',4,-36,1,4,'#4a4e6d'],['r',7,-35,1,3,'#4a4e6d'],['r',-1,-33,1,2,'#4a4e6d'],['r',9,-33,1,2,'#4a4e6d']],
  front:CATEARS('#6b6f8f','#e0a0b0'),
  fr:(x,y,t)=>{R(x-4,y-20,13,2,'#e0405a');R(x-4,y-20,13,1,'#ff7a8a');ell(x+4,y-17,2.3,2.3,OL);ell(x+4,y-17,1.6,1.6,'#ffd84a');R(x+4,y-18,1,1,'#fff');
    ln(x+13,y-24,x+19,y-26,'#fff');ln(x+13,y-22,x+19,y-22,'#fff');ln(x+12,y-20,x+18,y-19,'#fff');R(x+14,y-25,2,1,'#e0a0b0');
    R(x-7,y-1,1,1,'#4a4e6d');R(x+6,y-1,1,1,'#4a4e6d')},
  fx:(x,y,t)=>{rise(x-2,y+1,t,3,2000,28,6,(px,py,f,i)=>{alp((1-f)*.9);paw(Math.round(px),Math.round(py),i%2?'#7ad8ff':'#bfeaff')});alp(1);
    if(t%2000<160)tw(x+17,y-23,'#fff')}},
 raposa:{n:'Raposa',pr:70,rar:1,fxn:'cauda em chamas',bc:['#ff9a2a','#ffd84a','#ff4a1a'],c:{O:'#e0762c',O2:'#f08a3a',D:'#8a3a14',BR:'#f1dcc0',Wt:'#f1dcc0'},
  mid:[['r',-3,-26,3,3,'#f8ecd8'],['r',9,-23,6,2,'#f8ecd8']],
  front:[['r',-5,-43,3,5,'#e0762c',1],['r',9,-43,3,5,'#e0762c',1],['r',-4,-43,1,2,'#3a2018'],['r',10,-43,1,2,'#3a2018'],['r',-4,-40,1,2,'#f8ecd8'],['r',10,-40,1,2,'#f8ecd8'],
    ['r',-8,-4,5,3,'#2a1810'],['r',3,-4,5,3,'#2a1810'],['r',13,-26,2,2,'#2a1810']],
  fr:(x,y)=>{R(x+1,y-18,6,3,'#f8ecd8');R(x+2,y-15,4,1,'#f8ecd8');R(x+8,y-22,2,2,'#f8ecd8');R(x-5,y-24,1,2,'#f8ecd8');R(x+3,y-12,2,1,'#fff')},
  fx:(x,y,t,o)=>{const wg=(o&&o.wag)||1,tx=x-28,ty=y-16+Math.sin(t/(260/wg)+3.6)*2.8*wg;
    flame(tx,ty+3,13,t,0,'#ff4a1a','#ff9a2a','#fff0a0');flame(tx-3,ty+3,8,t,1.7,'#ff6a1a','#ffc040','#fff0a0');flame(tx+3,ty+3,8,t,3.1,'#ff6a1a','#ffc040','#fff0a0');
    rise(tx,ty-6,t,5,900,18,3,(px,py,f)=>{alp(1-f);R(px,py,1,1,f<.5?'#ffd84a':'#ff7a2a')});alp(1)}},
 guaxinim:{n:'Guaxinim',pr:70,rar:1,fxn:'moedas roubadas girando',bc:['#ffd84a','#fff6b0','#e8a020'],c:{O:'#8c93a3',O2:'#9aa1b0',D:'#4a4f5e',BR:'#c4c9d4',Wt:'#e3e6ec'},ek:'#ffffff',
  mid:[['e',6,-29,4.2,3.2,'#2b2f3b'],['e',12,-29,4.2,3.2,'#2b2f3b'],['r',3,-31,11,2,'#2b2f3b']],
  front:[['r',-16,-14,2,5,'#2b2f3b'],['r',-22,-16,2,5,'#2b2f3b'],['r',-28,-17,2,5,'#2b2f3b'],['r',-19,-13,2,4,'#2b2f3b'],['r',-25,-15,2,4,'#2b2f3b'],
    ['r',14,-23,1,1,'#2b2f3b'],['r',12,-21,1,1,'#2b2f3b'],['r',6,-32,1,1,'#fff'],['r',-8,-5,5,2,'#2b2f3b'],['r',4,-5,5,2,'#2b2f3b']],
  fx:(x,y,t)=>{orb(x+3,y-30,17,6,t,3,520,(px,py,i,s)=>{const w=1+Math.round(Math.abs(Math.cos(t/140+i*2))*2);alp(.6+.4*s);
      R(px-w/2,py-2,w+1,4,'#8a5a00');R(px-w/2+.5,py-1,w,2,'#ffd84a');if(Math.sin(t/200+i*3)>.7)tw(Math.round(px)+3,Math.round(py)-3,'#fff')});alp(1)}},
 caveira:{n:'Caveira',pr:70,rar:1,fxn:'chamas de almas',bc:['#5affb0','#2ad08a','#d8fff0'],c:{O:'#e8e0d0',O2:'#fffaf0',D:'#b8ac90',BR:'#c8bca0',Wt:'#fffaf0'},ek:'#ff3a3a',
  mid:[['e',6,-28.5,3.2,3.4,'#14100e'],['e',11.5,-28.5,3.2,3.4,'#14100e']],
  front:[['r',9,-21,6,1,'#14100e'],['r',10,-22,1,3,'#14100e'],['r',12,-22,1,3,'#14100e'],['r',14,-22,1,3,'#14100e'],['r',-4,-17,8,1,'#b8ac90'],['r',-4,-13,8,1,'#b8ac90'],['r',-4,-9,8,1,'#b8ac90'],
    ['r',2,-33,1,3,'#8a806a'],['r',3,-32,2,1,'#8a806a'],['r',13,-25,2,2,'#14100e'],['r',-1,-19,1,13,'#b8ac90'],['r',1,-20,1,1,'#b8ac90'],['r',-8,-26,3,1,'#b8ac90'],['r',-8,-23,3,1,'#b8ac90'],['r',8,-26,1,1,'#14100e']],
  fx:(x,y,t)=>{[[x-2,y-45,9],[x+4,y-48,12],[x+10,y-45,9]].forEach(([ax,ay,h],i)=>{alp(.85);flame(ax,ay+8,h,t,i*2,'#2ad08a','#5affb0','#d8fff0')});alp(1);
    rise(x+3,y-12,t,5,2000,36,8,(px,py,f)=>{alp((1-f)*.7);R(px,py,2,3,'#9affd0');R(px,py-1,1,1,'#fff')});alp(1);
    const gp=.3+.2*Math.sin(t/200);gl(x+6,y-29,3,'#ff3a3a',gp);gl(x+11.5,y-29,3,'#ff3a3a',gp)}},
 mumia:{n:'Múmia',pr:70,rar:1,fxn:'ataduras soltas e areia',bc:['#e8c880','#e6dcc0','#c8a860'],c:{O:'#e6dcc0',O2:'#f0e8d0',D:'#b8ac90',BR:'#d8cca8',Wt:'#f4ecd8'},ek:'#ffe040',
  mid:[['r',4,-32,10,6,'#14100e']],
  front:[['r',-6,-34,19,1,'#b8ac90'],['r',-6,-25,15,1,'#b8ac90'],['r',-5,-22,12,1,'#b8ac90'],['r',-8,-16,16,1,'#b8ac90'],['r',-8,-11,16,1,'#b8ac90'],['r',-8,-6,16,1,'#b8ac90'],['r',-9,-12,1,6,'#e6dcc0'],
    ['r',-5,-30,3,1,'#b8ac90'],['r',11,-30,3,1,'#b8ac90'],['r',-7,-8,16,1,'#d8cca8'],['r',-3,-38,2,1,'#b8ac90']],
  fr:(x,y,t)=>{ln(x-5,y-33,x+9,y-27,'#b8ac90');ln(x-6,y-15,x+8,y-10,'#b8ac90');ln(x-4,y-14,x+9,y-8,'#d8cca8')},
  fx:(x,y,t)=>{for(let j=0;j<20;j++){const px=x-9-j*1.7,py=y-17+Math.sin(t/170+j*.5)*3+j*.35;alp(1-j/26);R(px,py,3,2,'#e6dcc0');R(px,py+2,3,1,'#b8ac90')}alp(1);
    orb(x+2,y-2,18,3.5,t,8,500,(px,py,i,s)=>{alp(.5+.4*s);R(px,py-(i%3)*3,2,2,i%2?'#e8c880':'#c8a860')});alp(1)}},
 gatopreto:{n:'Gato preto',pr:70,rar:1,fxn:'neblina roxa e olhos brilhantes',bc:['#d0a0ff','#ffe866','#8a5ac0'],c:{O:'#3c3458',O2:'#4a4068',D:'#241c3a',BR:'#241c3a',Wt:'#d8d8ec'},ek:'#ffb020',
  front:CATEARS('#3c3458','#a0607a'),
  fr:(x,y)=>{R(x-4,y-20,13,2,'#7a40c0');R(x-4,y-20,13,1,'#a070e0');circ(x+4,y-16,2.4,'#ffe866');circ(x+5,y-16,2,'#7a40c0');
    R(x+1,y-10,1,1,'#d8d8ec');R(x+3,y-9,1,2,'#d8d8ec');R(x+5,y-10,1,1,'#d8d8ec');R(x+14,y-25,2,1,'#a0607a');R(x-7,y-1,1,1,'#d8d8ec');R(x+6,y-1,1,1,'#d8d8ec')},
  fx:(x,y,t)=>{for(let i=0;i<6;i++){const w=Math.sin(t/400+i*1.3);alp(.28+.12*w);ell(x-14+i*6,y+1+w*.8,5.5,1.8,'#8a5ac0')}alp(1);
    const gp=.35+.25*Math.sin(t/220);gl(x+6,y-29,4,'#ffb020',gp);gl(x+11,y-29,4,'#ffb020',gp);
    orb(x+3,y-27,19,7,t,3,1000,(px,py,i,s)=>{alp(.6+.4*s);tw(Math.round(px),Math.round(py),i%2?'#d0a0ff':'#ffe866')});alp(1)}},
 /* ----- lendárias ----- */
 coelho:{n:'Coelho',pr:160,rar:2,fxn:'halo dourado, trevos e poeira de estrelas',bc:['#ffd84a','#ffffff','#ffb0c0','#7ae04a'],c:{O:'#ece6e6',O2:'#f6f0f0',D:'#b8b0b8',BR:'#ffb0c0',Wt:'#ffffff'},
  front:[['r',13,-26,2,2,'#ffb0c0'],['r',11,-21,1,2,'#fff'],['r',12,-21,1,2,'#fff'],['r',5,-31,1,1,'#ffb0c0'],['r',10,-31,1,1,'#ffb0c0']],
  fr:(x,y,t)=>{ear(x-2,y-36,t,0);ear(x+8,y-36,t,1.2);R(x+6,y-23,2,2,'#ffb0c0');
    R(x-1,y-19,4,3,'#ff6a9a');R(x+5,y-19,4,3,'#ff6a9a');R(x+3,y-19,2,3,'#d04070');
    ell(x+9,y-22,3,2,'#fff');ln(x+13,y-24,x+18,y-25,'#fff');ln(x+13,y-22,x+18,y-22,'#fff')},
  fxb:(x,y,t)=>{gl(x+3,y-20,24,'#ffd0e0',.16+.05*Math.sin(t/300));gl(x+3,y-20,17,'#fff0f6',.14)},
  fx:(x,y,t)=>{alp(.7+.3*Math.sin(t/260));ring(x+3,y-58,10,2.6,'#ffd84a',28,t/900);ring(x+3,y-59,10,2.6,'#fff6b0',14,-t/700);alp(1);
    orb(x+3,y-26,22,9,t,4,900,(px,py)=>clover(px,py));
    rise(x+3,y-6,t,6,1700,34,10,(px,py,f,i)=>{alp(1-f);tw(Math.round(px),Math.round(py),i%2?'#fff6b0':'#ffd0e0')});alp(1)}},
 sapo:{n:'Sapo mago',pr:160,rar:2,fxn:'circulo arcano, orbes e raios',bc:['#7affb0','#c8a0ff','#ffffff','#4da3ff'],c:{O:'#5ab878',O2:'#7ad898',D:'#3f9660',BR:'#d6efb0',Wt:'#d6efb0'},
  mid:[['r',-2,-30,1,1,'#3f9660'],['r',0,-33,2,1,'#3f9660'],['r',-5,-24,1,1,'#3f9660'],['r',9,-33,1,1,'#3f9660']],
  fr:(x,y,t)=>{R(x+4,y-21,10,1,'#2f6a44');if(t%2400<300)R(x+14,y-21,6,1,'#ff7a9a');
    ell(x+8,y-17+Math.round(Math.sin(t/300)),3.4,2,'#d6efb0');R(x+7,y-17,1,1,'#fff');
    ell(x+3,y-35,17,4.2,OL);ell(x+3,y-35,16,3.4,'#2f2370');cone(x+3,y-36,22,10,'#4b3aa8','#1a1060',-4,'#6a5ad0');
    R(x-6,y-39,18,3,'#f0c040');R(x-6,y-39,18,1,'#fff6b0');R(x+1,y-40,4,5,'#2f2370');R(x+2,y-39,2,3,'#7affb0');
    tw(x+1,y-47,'#fff6b0');circ(x+5,y-45,2.4,'#ffe866');circ(x+6,y-45,2,'#4b3aa8');gl(x-1,y-57,3,'#ffe866',.5+.3*Math.sin(t/200))},
  fxb:(x,y,t)=>{alp(.35);ell(x+2,y+1,23,5,'#2a1a60');alp(1);ring(x+2,y+1,22,4.6,'#7affb0',48,t/1500);ring(x+2,y+1,15,3.2,'#c8a0ff',30,-t/1100);
    for(let i=0;i<6;i++){const a=t/1200+i*1.047;R(x+2+Math.cos(a)*22-1,y+1+Math.sin(a)*4.6-1,3,2,'#e8fff0')}
    gl(x+2,y-12,18,'#7affb0',.08)},
  fx:(x,y,t)=>{const cs=['#7affb0','#c8a0ff','#4da3ff'];
    orb(x+3,y-30,17,7,t,3,700,(px,py,i)=>{gl(px,py,4,cs[i],.35);R(px-1,py-1,3,3,cs[i]);R(px,py,1,1,'#fff')});
    if(t%700<260)bolt(x+22,y-24,x+3+Math.cos(t/700)*17,y-30+Math.sin(t/700)*7,t,'#c8f0ff');
    rise(x,y,t,5,2000,32,8,(px,py,f)=>{alp((1-f)*.8);ring(px,py,2,2,'#bfffd8',6,0)});alp(1)}},
 morcego:{n:'Morcego',pr:160,rar:2,fxn:'bando de morcegos e ondas sonar',bc:['#c8a0ff','#ff4a5a','#6a5aa8'],c:{O:'#6a5aa8',O2:'#7a6ab8',D:'#3a2a68',BR:'#3a2a68',Wt:'#e0a0c0'},ek:'#ff4a5a',
  bk:(x,y,t)=>{bw(x-3,y-18,t,26,'#3a1a68','#8a6ad0');bw(x-1,y-16,t+60,21,'#5a3a98','#a890e0')},
  front:[['r',-5,-43,3,6,'#3a2a68',1],['r',9,-43,3,6,'#3a2a68',1],['r',-4,-42,1,3,'#e0a0c0'],['r',10,-42,1,3,'#e0a0c0'],['r',11,-21,1,2,'#fff'],['r',13,-21,1,2,'#fff'],
    ['r',13,-27,2,1,'#e0a0c0'],['r',12,-28,1,1,'#e0a0c0'],['r',-5,-45,1,1,'#fff'],['r',3,-9,2,1,'#e0a0c0'],['r',0,-12,1,1,'#e0a0c0'],['r',6,-12,1,1,'#e0a0c0']],
  fxb:(x,y,t)=>{gl(x+2,y-20,24,'#2a1040',.3);gl(x+2,y-20,17,'#4a2a88',.2)},
  fx:(x,y,t)=>{for(let i=0;i<3;i++){const f=(t/1400+i/3)%1;alp((1-f)*.7);ring(x+3,y-28,6+f*26,3+f*12,'#c8a0ff',36,0)}alp(1);
    orb(x+3,y-32,24,8,t,5,800,(px,py,i,s)=>{alp(.55+.45*s);mbat(Math.round(px),Math.round(py),t+i*40,i%2?'#3a1a68':'#6a4aa8')});alp(1);
    for(let i=0;i<6;i++){const w=Math.sin(t/400+i*1.3);alp(.25);ell(x-14+i*6,y+1+w*.8,5.5,1.8,'#6a4aa8')}alp(1)}},
 vampiro:{n:'Vampiro',pr:160,rar:2,fxn:'lua de sangue, nevoa rubra e morcegos',bc:['#ff2a3a','#b01830','#ffffff'],c:{O:'#3a2030',O2:'#4a2a3c',D:'#1a0a14',BR:'#2a1020',Wt:'#e8d8c8'},ek:'#ff2a2a',
  bk:(x,y,t)=>cape(x,y,t,'#2a1020','#1a0a14','#b01830',30,2),
  mid:[['e',4,-27,9,7,'#e8d8c8']],
  front:[['e',3,-34,10,3,'#1a0a14',1],['r',6,-32,5,3,'#1a0a14'],['r',10,-21,1,2,'#fff'],['r',13,-21,1,2,'#fff'],['r',8,-24,2,1,'#e8a0a0'],['r',5,-31,1,1,'#1a0a14']],
  fr:(x,y,t)=>{R(x-7,y-27,4,10,OL);R(x-6,y-26,3,9,'#1a0a14');R(x-6,y-26,1,9,'#b01830');R(x-6,y-31,2,5,'#1a0a14');
    R(x+2,y-19,6,2,'#b01830');ell(x+4,y-16,2,2,OL);ell(x+4,y-16,1.4,1.4,'#ffd84a');
    R(x-8,y-19,3,5,'#1a0a14');R(x+8,y-20,2,5,'#1a0a14');circ(x+1,y-11,2.4,OL);circ(x+1,y-11,1.6,'#ffd84a');R(x+1,y-11,1,1,'#b01830')},
  fxb:(x,y,t)=>{const p=.75+.15*Math.sin(t/400);gl(x+2,y-28,19,'#4a0a14',p);gl(x+2,y-28,16,'#8a1020',p);gl(x+2,y-28,13,'#c42424',p);gl(x-2,y-32,2,'#a01818',p);gl(x+6,y-24,2,'#a01818',p);
    alp(.4);ring(x+2,y-28,21,21,'#ff4a4a',40,t/2000);alp(1)},
  fx:(x,y,t)=>{const f=(t/900)%1;alp(1-f);R(x+10,y-19+f*12,1,2,'#d01030');alp(1);
    for(let i=0;i<7;i++){const w=Math.sin(t/380+i*1.1);alp(.3);ell(x-16+i*5.5,y+1+w*.8,5,1.8,'#a01020')}alp(1);
    orb(x+3,y-36,26,9,t,3,900,(px,py,i,s)=>{alp(.55+.45*s);mbat(Math.round(px),Math.round(py),t+i*55,'#1a0a14')});alp(1);
    rise(x+3,y-8,t,5,1800,32,9,(px,py,fk)=>{alp((1-fk)*.6);R(px,py,1,2,'#ff4a4a')});alp(1)}}
};
const NM=['padrao','coruja','cogumelo','gato','raposa','guaxinim','coelho','sapo'],
      HW=['padrao','abobora','fantasma','chapeu','caveira','mumia','gatopreto','morcego','vampiro'];
const TC=['#9aa0b8','#4da3ff','#ffd84a'],TN=['COMUM','RARA','LENDARIA'];

/* ---------- VARINHAS: cada skin tem a sua (cabo, ponta, feitiço e partículas) ----------
   s = cores do cabo · b = cor das braçadeiras · pc = cores das partículas · ps = formato das partículas
   pj = formato do feitiço · gv = gravidade das partículas paradas (negativo = sobem) · hd = desenho da ponta */
const WD={
 padrao:{n:'Cajado de cristal',s:['#7a4a24','#a8744a'],b:'#ffd84a',pc:['#ffe866','#fff6b0','#ffffff'],ps:'star',pj:'orb',gv:-12,
  hd:(x,y,t,c)=>{R(x-4,y+3,9,1,OL);R(x-3,y+3,7,2,'#c8a020');R(x-3,y+3,7,1,'#fff6b0');gemD(x,y-1,4,4,c,'#fff','#b8a030');if(Math.sin(t/260)>.6)tw(x+5,y-5,'#fff')}},
 coruja:{n:'Pena encantada',s:['#5e3a1e','#8a5a34'],b:'#e6cfa0',pc:['#e6cfa0','#a8744a','#fff4d6'],ps:'feather',pj:'feather',gv:40,
  hd:(x,y,t,c)=>{const f=Math.round(Math.sin(t/260));ln(x-1,y+4,x+2,y-7,OL);ln(x,y+4,x+3,y-7,'#8a5a34');
    for(let i=0;i<5;i++){const yy=y+1-i*2,l=4-(i>>1);ln(x+1,yy,x+1-l,yy-2+f,OL);ln(x+2,yy,x+2+l,yy-2+f,OL);ln(x+1,yy,x+1-l,yy-1+f,i%2?'#e6cfa0':'#a8744a');ln(x+2,yy,x+2+l,yy-1+f,i%2?'#a8744a':'#e6cfa0')}
    R(x+2,y-8,2,2,c);R(x+2,y-8,1,1,'#fff')}},
 cogumelo:{n:'Varinha de esporos',s:['#c8b890','#e8dcc8'],b:'#d8504a',pc:['#e8f0a0','#d8504a','#ffffff'],ps:'spore',pj:'spore',gv:-18,
  hd:(x,y,t,c)=>{R(x-2,y,5,5,OL);R(x-1,y,3,5,'#e8dcc8');R(x-1,y+3,3,1,'#c0b090');ell(x,y-2,6,4,OL);ell(x,y-2,5,3,'#d8504a');ell(x,y,5,1,'#a8302c');
    R(x-3,y-4,2,1,'#fff');R(x+1,y-5,2,2,'#fff');R(x+3,y-2,1,1,'#fff');R(x-2,y-5,3,1,'#f0786e')}},
 gato:{n:'Novelo mágico',s:['#4a4e6d','#6b6f8f'],b:'#7ad8ff',pc:['#7ad8ff','#ffffff','#4da3ff'],ps:'paw',pj:'paw',gv:30,
  hd:(x,y,t,c)=>{circ(x,y,5,OL);circ(x,y,4,'#7ad8ff');ln(x-3,y-1,x+3,y-3,'#4da3ff');ln(x-4,y+1,x+3,y,'#4da3ff');ln(x-2,y+3,x+2,y-4,'#a9e8ff');R(x-3,y-3,2,1,'#fff');
    ln(x+3,y+3,x+6+Math.round(Math.sin(t/150)*2),y+6,'#7ad8ff')}},
 raposa:{n:'Tocha de fogo-fátuo',s:['#8a3a14','#c85a10'],b:'#ffd84a',pc:['#ff9a2a','#ffd84a','#ff4a1a'],ps:'ember',pj:'flame',gv:-60,
  hd:(x,y,t,c)=>{R(x-3,y+2,7,2,OL);R(x-2,y+2,5,2,'#8a3a14');flame(x,y+3,12,t,0,'#ff4a1a','#ff9a2a','#fff0a0');flame(x-2,y+3,7,t,1.7,'#ff6a1a','#ffc040','#fff0a0');flame(x+3,y+3,6,t,3.1,'#ff6a1a','#ffc040','#fff0a0')}},
 guaxinim:{n:'Moeda mestra',s:['#4a4f5e','#8c93a3'],b:'#ffd84a',pc:['#ffd84a','#fff6b0','#e8a020'],ps:['coin','star'],pj:'coin',gv:60,
  hd:(x,y,t,c)=>{const w=1+Math.round(Math.abs(Math.cos(t/220))*4);R(x-w-1,y-5,2*w+3,10,OL);R(x-w,y-4,2*w+1,8,'#8a5a00');R(x-w+1,y-3,Math.max(1,2*w-1),6,'#ffd84a');
    if(w>2){R(x-1,y-2,3,1,'#8a5a00');R(x-1,y+2,3,1,'#8a5a00');R(x-1,y-2,1,5,'#8a5a00')}R(x-w+1,y-3,1,3,'#fff6b0')}},
 coelho:{n:'Cenoura da sorte',s:['#3fbf5a','#7ae04a'],b:'#ffb0c0',pc:['#ffb0c0','#ffffff','#7ae04a'],ps:['heart','leaf'],pj:'heart',gv:-20,
  hd:(x,y,t,c)=>{for(let j=0;j<8;j++){const w=(3-j*.4)|0;R(x-w-1,y-3+j,2*w+3,1,OL)}for(let j=0;j<8;j++){const w=(3-j*.4)|0;R(x-w,y-3+j,2*w+1,1,j%3?'#ff8a1a':'#e0600a')}
    R(x-1,y-1,2,1,'#ffb060');const sw=Math.round(Math.sin(t/200));ln(x,y-3,x-3,y-8+sw,'#3fbf5a');ln(x,y-3,x,y-9,'#5ae07a');ln(x,y-3,x+3,y-8-sw,'#3fbf5a')}},
 sapo:{n:'Cristal arcano',s:['#2f6a44','#5ab878'],b:'#f0c040',pc:['#7affb0','#c8a0ff','#ffffff'],ps:'rune',pj:'rune',gv:-10,
  hd:(x,y,t,c)=>{ring(x,y-1,8,8,'#7affb0',16,t/400);ring(x,y-1,6,6,'#c8a0ff',12,-t/300);gemD(x,y-1,5,3,'#7affb0','#fff','#3fbf80');R(x-4,y+4,9,1,OL);R(x-3,y+4,7,1,'#f0c040')}},
 abobora:{n:'Abóbora flamejante',s:['#3f6a2a','#5a9a3a'],b:'#ffa43a',pc:['#ff8a1a','#ffd060','#7ae04a'],ps:['ember','leaf'],pj:'flame',gv:-40,
  hd:(x,y,t,c)=>{ell(x,y,5,4.4,OL);ell(x,y,4,3.6,'#e8761a');R(x-1,y-3,1,6,'#b0510a');R(x+2,y-3,1,6,'#b0510a');R(x-1,y-6,2,3,'#3f6a2a');R(x+1,y-6,2,1,'#3f6a2a');
    const fk=.7+.3*Math.sin(t/90);alp(fk);R(x-3,y-1,2,2,'#ffe866');R(x+1,y-1,2,2,'#ffe866');R(x-2,y+2,4,1,'#ffe866');alp(1);ln(x+2,y-6,x+5,y-8,'#3f6a2a')}},
 fantasma:{n:'Chama espectral',s:['#b8c0e0','#f4f6ff'],b:'#9aa0d0',pc:['#f4f6ff','#cfd6f0','#b0c0ff'],ps:'wisp',pj:'wisp',gv:-25,
  hd:(x,y,t,c)=>{const w=Math.round(Math.sin(t/200)*1.5);alp(.3);circ(x,y-1,8,'#b0c0ff');alp(1);ell(x,y-1,4,5,OL);ell(x,y-1,3,4,'#f4f6ff');
    for(let i=0;i<3;i++){R(x-3+i*2,y+3+((i+w)&1),2,2,OL);R(x-3+i*2,y+3+((i+w)&1),2,1,'#f4f6ff')}R(x-2,y-3,1,2,'#3a3a68');R(x+1,y-3,1,2,'#3a3a68');R(x-1,y,2,1,'#9aa0d0')}},
 chapeu:{n:'Estrela bruxa',s:['#4a2c6e','#6a4a90'],b:'#ffe866',pc:['#c08aff','#ffe866','#ffffff'],ps:'star',pj:'star',gv:-14,
  hd:(x,y,t,c)=>{[[-1,0],[1,0],[0,-1],[0,1]].forEach(([a,b])=>sp(STARR,{X:OL},x-4+a,y-4+b,1));sp(STARR,{X:'#ffe866'},x-4,y-4,1);R(x-1,y-2,2,2,'#fff');
    if(Math.sin(t/200)>0)tw(x+6,y-5,'#fff');tw(x-7,y+2,'#c08aff')}},
 caveira:{n:'Cetro de caveira',s:['#b8ac90','#e8e0d0'],b:'#2ad08a',pc:['#5affb0','#2ad08a','#d8fff0'],ps:['ember','skull'],pj:'skull',gv:-35,
  hd:(x,y,t,c)=>{ell(x,y-1,5,5,OL);ell(x,y-1,4,4,'#fffaf0');R(x-2,y+2,5,3,OL);R(x-2,y+2,5,2,'#e8e0d0');R(x-3,y-2,2,2,'#14100e');R(x+1,y-2,2,2,'#14100e');
    alp(.6+.4*Math.sin(t/150));R(x-3,y-2,1,1,'#5affb0');R(x+2,y-2,1,1,'#5affb0');alp(1);R(x,y,1,1,'#14100e');R(x-1,y+3,1,1,'#14100e');R(x+1,y+3,1,1,'#14100e');
    flame(x,y-5,6,t,0,'#2ad08a','#5affb0','#d8fff0')}},
 mumia:{n:'Ankh dourado',s:['#c8a860','#e6dcc0'],b:'#ffd84a',pc:['#e8c880','#c8a860','#e6dcc0'],ps:'sand',pj:'scarab',gv:50,
  hd:(x,y,t,c)=>{R(x-2,y-1,3,9,OL);R(x-5,y+1,9,3,OL);ring(x,y-3,3,3,OL,14,0);ring(x,y-3,2.5,2.5,'#ffd84a',14,0);ring(x,y-3,3.5,3.5,'#e8a020',16,0);
    R(x-1,y,1,8,'#ffd84a');R(x-4,y+2,7,1,'#ffd84a');R(x-1,y-4,1,1,'#fff');if(Math.sin(t/260)>.4)tw(x+5,y-6,'#fff6b0')}},
 gatopreto:{n:'Lua sombria',s:['#241c3a','#4a4068'],b:'#a070e0',pc:['#d0a0ff','#8a5ac0','#ffe866'],ps:['star','moon'],pj:'moon',gv:-8,
  hd:(x,y,t,c)=>{for(let dy=-6;dy<=6;dy++)for(let dx=-6;dx<=6;dx++){const a=dx*dx+dy*dy,b=(dx-3)*(dx-3)+(dy+1)*(dy+1);
      if(a<=36&&b>20)R(x+dx,y+dy,1,1,(a>25||b<30)?OL:(dx<-2?'#e8c8ff':'#a070e0'))}
    if(Math.sin(t/220)>0)tw(x+5,y-5,'#ffe866');R(x-1,y-1,1,1,'#fff')}},
 morcego:{n:'Cetro dos morcegos',s:['#3a2a68','#6a5aa8'],b:'#c8a0ff',pc:['#c8a0ff','#6a5aa8','#ff4a5a'],ps:'bat',pj:'bat',gv:-25,
  hd:(x,y,t,c)=>{mbat(x,y,t,'#14081e');mbat(x,y-1,t,'#6a4aa8');R(x-1,y,3,2,'#3a1a68');R(x-1,y,1,1,'#ff4a5a');R(x+1,y,1,1,'#ff4a5a');R(x-1,y-2,1,2,'#3a1a68');R(x+1,y-2,1,2,'#3a1a68')}},
 vampiro:{n:'Rubi de sangue',s:['#1a0a14','#4a2a3c'],b:'#b01830',pc:['#ff2a3a','#b01830','#ffffff'],ps:'drop',pj:'drop',gv:90,
  hd:(x,y,t,c)=>{R(x-4,y+3,9,2,OL);R(x-3,y+3,7,1,'#c8a020');gemD(x,y-1,5,4,'#d01030','#ff8a9a','#8a0820');const f=(t/700)%1;alp(1-f);R(x,y+5+f*8,1,2,'#d01030');alp(1)}}
};
const wdOf=id=>WD[id]||WD.padrao;

/* formato das partículas (pequenas) */
function pshape(s,x,y,k,t){x=Math.round(x);y=Math.round(y);
  if(s==='star')tw(x,y,k);
  else if(s==='heart'){R(x,y,1,1,k);R(x+2,y,1,1,k);R(x,y+1,3,1,k);R(x+1,y+2,1,1,k)}
  else if(s==='feather'){ln(x,y,x+3,y-3,k);R(x+3,y-3,1,1,'#fff')}
  else if(s==='coin'){R(x,y,3,3,'#8a5a00');R(x+1,y+1,1,1,k)}
  else if(s==='ember'){R(x,y,1,2,k);R(x,y,1,1,'#fff0a0')}
  else if(s==='leaf'){R(x,y,3,1,k);R(x+1,y-1,1,3,k)}
  else if(s==='bat')mbat(x,y,t,k);
  else if(s==='drop'){R(x,y,1,1,k);R(x-1,y+1,3,2,k)}
  else if(s==='rune'){R(x,y-1,1,3,k);R(x-1,y,3,1,k);R(x-1,y-1,1,1,k);R(x+1,y+1,1,1,k)}
  else if(s==='paw')paw(x,y,k);
  else if(s==='skull'){R(x,y,3,2,k);R(x,y+2,3,1,k);R(x,y+1,1,1,'#14100e');R(x+2,y+1,1,1,'#14100e')}
  else if(s==='wisp'){R(x,y,2,2,k);R(x+1,y+2,1,1,k)}
  else if(s==='moon'){R(x,y,1,3,k);R(x+1,y-1,1,1,k);R(x+1,y+3,1,1,k)}
  else if(s==='sand')R(x,y,1,1,k);
  else R(x,y,2,2,k)}

/* feitiço lançado (formato muda com a varinha; o halo mantém a cor da seta) */
function pjDraw(s,x,y,c,c2,t,ph){x=Math.round(x);y=Math.round(y);
  if(s==='star'){R(x-4,y,9,1,c);R(x,y-4,1,9,c);R(x-2,y-2,5,5,c2);R(x-1,y-1,3,3,'#fff')}
  else if(s==='flame')flame(x+1,y+4,12,t,ph,c,c2,'#fff0a0');
  else if(s==='feather'){ln(x-5,y+3,x+5,y-3,OL);ln(x-4,y+3,x+5,y-2,c);ln(x-3,y+1,x+3,y-4,c2);ln(x-3,y+4,x+3,y-1,c2);R(x+4,y-3,2,1,'#fff')}
  else if(s==='coin'){const w=1+Math.round(Math.abs(Math.cos(t/90+ph))*3);R(x-w-1,y-5,2*w+3,10,'#8a5a00');R(x-w,y-4,2*w+1,8,'#ffd84a');R(x-w,y-4,1,3,'#fff6b0')}
  else if(s==='heart'){R(x-4,y-3,3,2,c);R(x+2,y-3,3,2,c);R(x-5,y-2,11,3,c);R(x-4,y+1,9,1,c);R(x-3,y+2,7,1,c);R(x-1,y+3,3,1,c);R(x-3,y-2,1,1,'#fff')}
  else if(s==='bat'){mbat(x,y,t,'#14081e');mbat(x,y-1,t,c);R(x,y,1,1,'#ff4a5a')}
  else if(s==='skull'){ell(x,y,4,4,OL);ell(x,y,3,3,'#fffaf0');R(x-2,y-1,2,2,'#14100e');R(x+1,y-1,2,2,'#14100e');R(x-1,y+2,3,1,'#14100e');R(x-2,y-1,1,1,c);R(x+2,y-1,1,1,c)}
  else if(s==='drop'){R(x,y-4,1,1,c);R(x-1,y-3,3,2,c);R(x-2,y-1,5,4,c);R(x-1,y+3,3,1,c);R(x-2,y,1,1,'#fff')}
  else if(s==='rune'){ring(x,y,4,4,c,14,t/150);R(x,y-2,1,5,c2);R(x-2,y,5,1,c2);R(x,y,1,1,'#fff')}
  else if(s==='paw'){R(x-3,y,7,4,c);R(x-4,y-3,2,2,c);R(x-1,y-4,2,2,c);R(x+2,y-4,2,2,c);R(x+4,y-3,2,2,c);R(x-2,y+1,2,1,c2)}
  else if(s==='spore'){circ(x,y,4,c);circ(x-1,y-1,2,c2);R(x-2,y-2,1,1,'#fff');R(x+2,y+1,1,1,'#fff')}
  else if(s==='wisp'){ell(x,y-1,4,5,c);ell(x,y-1,3,4,'#fff');R(x-2,y+3,2,2,c);R(x+1,y+4,2,2,c);R(x-1,y-2,1,1,'#3a3a68');R(x+1,y-2,1,1,'#3a3a68')}
  else if(s==='moon'){for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++)if(dx*dx+dy*dy<=16&&(dx-2)*(dx-2)+(dy+1)*(dy+1)>9)R(x+dx,y+dy,1,1,dx<-1?c2:c);tw(x+4,y-4,'#fff')}
  else if(s==='scarab'){ell(x,y,4,3,OL);ell(x,y,3,2.2,c);R(x,y-2,1,5,'#8a5a00');R(x-3,y-3,2,1,c2);R(x+2,y-3,2,1,c2);ln(x-4,y+1,x-6,y+3,c2);ln(x+4,y+1,x+6,y+3,c2)}
  else{R(x-3,y-3,7,7,c2);R(x-2,y-2,5,5,c);R(x-1,y-1,3,3,'#fff')}}

function pc(p,ox,oy,e){const t=p[0],x=p[1],y=p[2],a=p[3],b=p[4],k=p[5];
  if(t==='e')ell(ox+x,oy+y,a+e,b+e,e?OL:k);else R(ox+x-e,oy+y-e,a+2*e,b+2*e,e?OL:k)}
function parts(L,ox,oy){L.forEach(p=>{if(p[6])pc(p,ox,oy,1)});L.forEach(p=>pc(p,ox,oy,0))}

/* panda vermelho (pé em ox,oy) — devolve a posição da ponta da varinha */
function pandaDraw(ox,oy,t,P,o){
  const co=COS[o.skin]||COS.padrao,wd=wdOf(o.skin),C=Object.assign({},DEF,co.c),fl=o.fl,
    O=fl?'#ff9a8a':C.O,O2=fl?'#ffc0b0':C.O2,D=C.D,BR=C.BR,Wt=C.Wt,ek=co.ek||KK,wg=o.wag||1,
    fr=o.walk?Math.sin(t/60)*1.6:0,fx=!o.nofx;
  GA=1;
  if(co.float)oy-=3+Math.round(Math.sin(t/380)*2);
  if(fx&&co.fxb)co.fxb(ox,oy,t,o);
  parts(co.back||[],ox,oy);if(co.bk)co.bk(ox,oy,t,o);
  const E=[];
  for(let i=6;i>=0;i--)E.push([ox-9-i*3.2,oy-9-i*1.2+Math.sin(t/(260/wg)+i*.6)*(1+i*.3)*wg,3.7-i*.12,3.4-i*.1,i===6?BR:(i%2?D:O)]);
  E.push([ox-5,oy-3-Math.max(0,fr),3.8,3.2,BR],[ox+6,oy-3-Math.max(0,-fr),3.8,3.2,BR],[ox,oy-12,9.5,10,O],[ox+3,oy-10,5.5,6.5,BR],
    [ox-3,oy-36,3.6,3.6,O2],[ox+9,oy-36,3.6,3.6,O2],[ox+3,oy-27,11,8.6,O2]);
  E.forEach(e=>ell(e[0],e[1],e[2]+1,e[3]+1,OL));E.forEach(e=>ell(e[0],e[1],e[2],e[3],e[4]));
  /* detalhes do pelo */
  R(ox-4,oy-37,2,3,Wt);R(ox+8,oy-37,2,3,Wt);R(ox-3,oy-34,1,1,D);R(ox+9,oy-34,1,1,D);
  R(ox-8,oy-25,2,1,Wt);R(ox-9,oy-24,2,1,Wt);R(ox-8,oy-22,2,1,Wt);
  alp(.4);R(ox,oy-33,5,1,Wt);alp(1);
  ell(ox+8,oy-24,4.5,2.8,Wt);R(ox+3,oy-32,3,1,Wt);R(ox+9,oy-32,3,1,Wt);
  /* pelagem extra: testa, tufos do peito, dedinhos, bochecha e bigodes */
  R(ox+1,oy-35,1,2,D);R(ox+5,oy-35,1,2,D);R(ox+3,oy-36,1,2,D);
  R(ox+1,oy-8,1,1,Wt);R(ox+4,oy-12,1,1,Wt);R(ox+5,oy-7,1,1,Wt);R(ox+2,oy-13,1,1,Wt);
  R(ox-7,oy-1,1,1,D);R(ox-4,oy-1,1,1,D);R(ox+4,oy-1,1,1,D);R(ox+7,oy-1,1,1,D);
  alp(.55);R(ox+8,oy-25,2,1,'#ff9a8a');alp(1);
  if(!o.over){ln(ox+14,oy-24,ox+17,oy-25,Wt);ln(ox+14,oy-23,ox+17,oy-23,Wt)}
  parts(co.mid||[],ox,oy);
  if(o.over){[5,10].forEach(x=>{R(ox+x,oy-31,1,1,ek);R(ox+x+2,oy-31,1,1,ek);R(ox+x+1,oy-30,1,1,ek);R(ox+x,oy-29,1,1,ek);R(ox+x+2,oy-29,1,1,ek)})}
  else if(o.miss||o.blink){R(ox+5,oy-29,3,1,ek);R(ox+10,oy-29,3,1,ek)}
  else if(o.happy){[5,10].forEach(x=>{R(ox+x,oy-29,1,1,ek);R(ox+x+1,oy-30,1,1,ek);R(ox+x+2,oy-29,1,1,ek)})}
  else{R(ox+5,oy-30,2,3,ek);R(ox+10,oy-30,2,3,ek);R(ox+5,oy-30,1,1,'#fff');R(ox+10,oy-30,1,1,'#fff');R(ox+6,oy-28,1,1,'#fff')}
  R(ox+6,oy-27,1,3,D);R(ox+11,oy-27,1,3,D);R(ox+13,oy-26,2,2,KK);R(ox+13,oy-26,1,1,'#fff');
  if(o.happy)R(ox+10,oy-22,3,2,'#7a2a3a');else R(ox+11,oy-22,2,1,D);
  let tx=ox+22,ty=oy-24;
  if(o.staff){if(o.cast)ty-=3;
    const hx=ox+12,hy=oy-14,col=o.cast?P.dir[o.castD]:wd.pc[0];
    ln(hx,hy,tx,ty,OL);ln(hx,hy-1,tx,ty,wd.s[0]);
    [.4,.72].forEach(f=>{const mx=hx+(tx-hx)*f,my=hy+(ty-hy)*f;R(mx-1,my-2,3,3,OL);R(mx-1,my-2,2,2,wd.b)});
    R(hx-2,hy-1,2,3,OL);R(hx-2,hy-1,1,2,wd.s[1]);
    R(ox+7,oy-17,6,4,O);R(ox+10,oy-18,4,4,BR);R(ox+12,oy-19,1,1,Wt);
    alp(o.cast?.45:.25);circ(tx,ty,o.cast?10:7,col);alp(1);
    wd.hd(tx,ty,t,col,o.cast)}
  parts(co.front||[],ox,oy);
  if(co.fr)co.fr(ox,oy,t,o);
  if(fx&&co.fx)co.fx(ox,oy,t,o);
  g.globalAlpha=1;
  return[tx,ty]}

/* ---------- estado ---------- */
const G={mode:'menu',tab:'g',lv:1,hp:VIDAS,score:0,combo:0,sp:[],pr:[],pt:[],left:0,total:0,fx:X0,back:0,v:8,lim:LIMITE,now:0,mt:0,
  shake:0,hurt:0,castT:-1e9,castD:0,miss:-1e9,happyT:-1e9,best:0,coins:0,hits:0,misses:0,maxC:0,res:null,boss:null,bi:0,tipx:66,tipy:132};
const PA={x:0,y:0,vy:0,ev:0,evT:0,land:-1e9,at:0,walk:false};
const S={own:['padrao'],n:'padrao',h:'padrao'};
G.best=+ls('nocturne-panda-best',0)||0;G.coins=+ls('nocturne-panda-coins',0)||0;
{const o=ls('nocturne-panda-owned',['padrao']);if(Array.isArray(o))S.own=o.filter(id=>COS[id]);if(!S.own.includes('padrao'))S.own.push('padrao');
 const k=ls('nocturne-panda-skin',{})||{};if(COS[k.n]&&S.own.includes(k.n))S.n=k.n;if(COS[k.h]&&S.own.includes(k.h))S.h=k.h}
const curSkin=()=>S[hwOn()?'h':'n'];
const saveAll=()=>{if(G.score>G.best)G.best=G.score;ss('nocturne-panda-best',G.best);ss('nocturne-panda-coins',G.coins);ss('nocturne-panda-owned',S.own);ss('nocturne-panda-skin',{n:S.n,h:S.h})};
const setMode=m=>{G.mode=m;G.mt=G.now};
const alive=()=>G.sp.filter(s=>!s.lock).sort((a,b)=>a.x-b.x);
/* inimigos do bloco de 5 fases = animais do boss que vem depois */
const blockOf=lv=>(((lv-1)/BOSS_CADA)|0)%4;
const EN=[['ARANHAS','ARANHAS'],['ESCORPIOES','ESCORPIOES'],['VESPAS','VESPAS'],['COGUMELOS','ABOBORAS']];
const newSp=x=>({x,d:(Math.random()*4)|0,enr:0,lock:0,ph:Math.random()*6,k:blockOf(G.lv)});
const burst=(x,y,ks,n,s)=>{for(let i=0;i<n;i++){if(G.pt.length>420)break;G.pt.push({x,y,vx:(Math.random()-.5)*130,vy:-20-Math.random()*90,l:.5+Math.random()*.3,k:ks[i%ks.length],s:Array.isArray(s)?s[i%s.length]:s})}};
const skBurst=(x,y)=>{const sk=curSkin(),c=COS[sk],wd=wdOf(sk);burst(x,y,wd.pc.concat((c&&c.bc)||[]),c&&c.rar===2?26:c&&c.rar?18:12,wd.ps)};
const emitTip=(wd,n)=>{for(let i=0;i<n&&G.pt.length<420;i++)G.pt.push({x:G.tipx+(Math.random()-.5)*6,y:G.tipy+(Math.random()-.5)*6,vx:(Math.random()-.5)*24,vy:(Math.random()-.5)*16+(wd.gv<0?-14:0),l:.6+Math.random()*.5,k:pick(wd.pc),s:pick(wd.ps),g:wd.gv})};
const GOLD=['#ffd84a','#fff6b0','#e8a020'];
const hop=v=>{if(PA.y>0||PA.vy>0)return false;PA.vy=v;PA.y=.01;return true};
/* pulo: também funciona logo depois de lançar um feitiço (o pulinho do feitiço não bloqueia mais o pulo de esquivar) */
const jump=()=>{if(PA.y>9&&PA.vy>0)return;PA.vy=150;PA.y=Math.max(PA.y,.01);sfx('jump')};
function fill(){let q=alive();while(G.left>0&&q.length<7){const last=q.length?q[q.length-1].x:X0-ESP;const s=newSp(Math.max(last,X0-ESP)+ESP);G.sp.push(s);q.push(s);G.left--}}
function startLevel(lv){G.lv=lv;G.hp=VIDAS;G.lim=Math.max(MIN_T,LIMITE-PASSO*(lv-1));G.v=(X0-ZONA)/G.lim;
  G.total=Math.min(25,5+lv*2);G.left=G.total;G.sp=[];G.pr=[];G.pt=[];G.fx=X0;G.back=0;G.combo=0;G.hurt=0;G.shake=0;
  G.hits=0;G.misses=0;G.maxC=0;G.boss=null;G.res=null;fill();setMode('play')}

/* ---------- bosses: nomes, regras e mecânicas ---------- */
const BN=[['ARANHA RAINHA','RAINHA DAS TREVAS'],['ESCORPIAO','ESCORPIAO ZUMBI'],['VESPAO','VESPA FANTASMA'],['COGUMELAO','ABOBRAO']];
const BRULE=['TEIA ESCONDE AS SETAS','VENENO INVERTE AS TECLAS','FERRAO: APERTE ESPACO','ESPOROS EMBARALHAM AS SETAS'];
const MECH0=[3.4,3.8,2.8,3.4]; /* 1ª mecânica do boss (s), calibrada para 10 s */
function startBoss(){const bi=((G.lv/BOSS_CADA)|0)-1,kind=bi%4;
  G.bi=bi;G.hp=VIDAS;G.sp=[];G.pr=[];G.pt=[];G.combo=0;G.hurt=0;G.shake=0;G.hits=0;G.misses=0;G.maxC=0;G.res=null;
  G.boss={kind,bi,hp:BOSS_TECLAS,x:BX,off:0,flash:0,atkT:0,hitDone:0,t:BOSS_TEMPO,intro:3,dead:0,gone:0,
    seq:Array.from({length:BOSS_TECLAS},()=>(Math.random()*4)|0),i:0,mt:Math.max(1.8,MECH0[kind]-((bi/4)|0)*.4),hid:[],hidT:0,inv:0,shuT:0,st:[],wrong:0};
  setMode('boss');sfx('boss')}
function advance(){
  if(G.mode==='menu'){G.score=0;startLevel(1)}
  else if(G.now-G.mt<700)return;
  else if(G.mode==='clear'){if(G.lv%BOSS_CADA===0)startBoss();else startLevel(G.lv+1)}
  else if(G.mode==='bwin')startLevel(G.lv+1);
  else if(G.mode==='over'){G.score=0;startLevel(1)}}

function castFx(d){G.castT=G.now;G.castD=d;sfx('cast',d);PA.ev=12;PA.evT=.16;hop(95);emitTip(wdOf(curSkin()),6)}
function missFx(){G.combo=0;G.misses++;G.miss=G.now;G.shake=.15;sfx('miss');PA.ev=-7;PA.evT=.22}
function press(d){
  if(G.tab!=='g')return;
  if(G.mode==='play'){
    const l=alive()[0];if(!l)return;
    if(l.d===d){l.lock=1;castFx(d);G.pr.push({x:G.tipx,y:G.tipy,s:l,d,tr:[],ph:Math.random()*6})}else missFx()}
  else if(G.mode==='boss'){
    const b=G.boss;if(!b||b.intro>0||b.atkT>0||b.dead||b.i>=BOSS_TECLAS)return;
    const need=b.inv>0?(b.seq[b.i]^1):b.seq[b.i];
    if(d===need){b.i++;castFx(d);G.pr.push({x:G.tipx,y:G.tipy,s:b,d,tr:[],ty:SY-26,ph:Math.random()*6});
      if(b.i>=BOSS_TECLAS){b.hidT=0;b.inv=0;b.shuT=0;b.st=[]}}
    else{missFx();b.t=Math.max(.2,b.t-.5);b.wrong=.3}}
  else advance()}

function finishLevel(){
  const tot=G.hits+G.misses,acc=tot?G.hits/tot:1,stars=1+(G.hp>=4?1:0)+(acc>=.8?1:0),coins=stars*3+G.hp+Math.min(G.maxC,10)+G.lv;
  G.res={stars,coins,acc:Math.round(acc*100),t:G.now};G.score+=50*G.hp;G.coins+=coins;saveAll();setMode('clear');sfx('clear');
  burst(W/2,80,GOLD,26);setTimeout(()=>sfx('coin'),600)}
function bossWin(){
  const coins=20+10*G.bi+G.hp*3,stars=G.hp>=4?3:G.hp>=2?2:1;
  G.res={stars,coins,acc:0,t:G.now};G.score+=100+50*G.hp;G.coins+=coins;saveAll();G.boss.gone=1;setMode('bwin');sfx('clear');
  burst(W/2,80,GOLD,30);setTimeout(()=>sfx('coin'),600)}

function kill(s){const P=pal(),i=G.sp.indexOf(s);if(i<0)return;G.sp.splice(i,1);burst(s.x,SY-4,[P.dir[s.d],'#ffffff','#241a34'],14);skBurst(s.x,SY-8);
  G.combo++;G.maxC=Math.max(G.maxC,G.combo);G.hits++;G.score+=10*Math.min(G.combo,5);sfx('kill');G.happyT=G.now;hop(135);fill();
  if(G.left===0&&G.sp.length===0)finishLevel()}
function hitBoss(d){const b=G.boss,P=pal();if(!b||b.dead)return;b.hp--;b.flash=.3;G.combo++;G.maxC=Math.max(G.maxC,G.combo);G.hits++;
  G.score+=15*Math.min(G.combo,5);sfx('kill');G.happyT=G.now;hop(135);G.shake=.2;
  burst(b.x+b.off,SY-24,[P.dir[d||0],'#ffffff','#ffd84a'],14);skBurst(b.x+b.off,SY-24);
  if(b.hp<=0){b.dead=.01;burst(b.x,SY-24,['#ff4a4a','#ffd84a','#ffffff'],30);sfx('clear')}}
function hurtPanda(){G.hp--;G.combo=0;G.hurt=.6;G.shake=.35;burst(PX+PA.x+16,SY-8,['#ff3a3a','#ff9a8a','#ffffff'],16);sfx('bite');PA.ev=-16;PA.evT=.35;hop(80);
  if(G.hp<=0){G.pr=[];saveAll();setMode('over');sfx('over');return true}return false}
function bite(s){const i=G.sp.indexOf(s);if(i>=0)G.sp.splice(i,1);if(hurtPanda())return;
  fill();const q=alive();if(q.length){G.back=Math.max(0,X0-q[0].x)}G.fx=X0}

function stepPanda(dt){
  if(PA.y>0||PA.vy>0){PA.vy-=560*dt;PA.y+=PA.vy*dt;if(PA.y<=0){PA.y=0;if(PA.vy<-60){PA.land=G.now;burst(PX+PA.x+2,FY,['#d8c8a8','#ffffff'],6)}PA.vy=0}}
  if((G.mode==='clear'||G.mode==='bwin')&&G.now-PA.at>650){PA.at=G.now;hop(150)}
  else if(G.mode==='menu'&&G.now-PA.at>2200){PA.at=G.now;hop(110)}
  PA.evT=Math.max(0,PA.evT-dt);
  const idle=G.mode==='menu'?Math.sin(G.now/700)*10:Math.sin(G.now/900)*2.2,tgt=PA.evT>0?PA.ev:idle,d=tgt-PA.x;
  PA.x+=d*Math.min(1,dt*(PA.evT>0?16:5));PA.walk=Math.abs(d)>1.4}

/* mecânica própria de cada boss (disparada a cada b.mt segundos) — ritmo ajustado para o relógio de 10 s */
function mech(b){const cyc=(b.bi/4)|0,k=b.kind,left=BOSS_TECLAS-b.i;
  if(k===0){const n=Math.min(left-1,2+cyc);if(n>0){b.hid=[];for(let j=1;j<=n;j++)b.hid.push(b.i+j);b.hidT=2+cyc*.4;sfx('web')}b.mt=Math.max(2.4,4.2-cyc*.5)}
  else if(k===1){b.inv=2.4+cyc*.4;sfx('poison');b.mt=Math.max(3,4.8-cyc*.5)}
  else if(k===2){b.st.push({x:b.x-6,w:.8,go:0});sfx('boss');b.mt=Math.max(1.8,3-cyc*.4)}
  else{if(left>=2){b.shuT=.8;sfx('shuffle')}b.mt=Math.max(2.6,4.2-cyc*.5)}}
function stepBoss(dt){const b=G.boss;b.flash=Math.max(0,b.flash-dt);b.wrong=Math.max(0,b.wrong-dt);
  if(b.intro>0){b.intro-=dt;return}
  if(b.dead){b.dead+=dt;if(b.dead>1.3)bossWin();return}
  if(b.atkT>0){b.atkT-=dt;const p=Math.min(1,1-b.atkT/.5);b.off=-Math.sin(p*Math.PI)*150;
    if(!b.hitDone&&p>=.5){b.hitDone=1;if(hurtPanda())return}
    if(b.atkT<=0){b.off=0;b.t=BOSS_TEMPO;b.hidT=0;b.inv=0;b.shuT=0;b.st=[];b.mt=2.5}return}
  if(b.i>=BOSS_TECLAS)return;
  b.hidT=Math.max(0,b.hidT-dt);b.inv=Math.max(0,b.inv-dt);
  if(b.shuT>0){b.shuT-=dt;if(b.shuT<=0){const r=b.seq.slice(b.i);for(let k=r.length-1;k>0;k--){const j=(Math.random()*(k+1))|0;const tmp=r[k];r[k]=r[j];r[j]=tmp}
    for(let k=0;k<r.length;k++)b.seq[b.i+k]=r[k];sfx('shuffle')}}
  for(let i=b.st.length-1;i>=0;i--){const s=b.st[i];
    if(s.w>0){s.w-=dt;if(s.w<=0){s.go=1;sfx('sting')}continue}
    s.x-=150*dt;const px=PX+PA.x;
    if(s.x<=px+20&&s.x>=px+2&&PA.y<7){b.st.splice(i,1);if(hurtPanda())return;continue}
    if(s.x<px-14)b.st.splice(i,1)}
  b.t-=dt;if(b.t<=0){b.t=0;b.atkT=.5;b.hitDone=0;b.st=[];return}
  b.mt-=dt;if(b.mt<=0)mech(b)}

function step(dt){
  G.shake=Math.max(0,G.shake-dt);G.hurt=Math.max(0,G.hurt-dt);
  for(let i=G.pt.length-1;i>=0;i--){const p=G.pt[i];p.l-=dt;if(p.l<=0){G.pt.splice(i,1);continue}p.vy+=(p.g==null?220:p.g)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt}
  stepPanda(dt);
  const wnd=wdOf(curSkin());
  if(Math.random()<dt*(G.mode==='menu'?8:15))emitTip(wnd,1);
  if(G.mode==='play'||G.mode==='boss'){
    if(G.back>0){const d=Math.min(G.back,160*dt);G.sp.forEach(s=>s.x+=d);G.fx+=d;G.back-=d}
    for(let i=G.pr.length-1;i>=0;i--){const p=G.pr[i],tx=p.s.x+(p.s.off||0)-2,ty=p.ty||SY-6,dx=tx-p.x,dy=ty-p.y,dist=Math.hypot(dx,dy),st=380*dt;
      p.tr.push([p.x,p.y]);if(p.tr.length>6)p.tr.shift();
      if(Math.random()<.75&&G.pt.length<420)G.pt.push({x:p.x,y:p.y,vx:(Math.random()-.5)*40,vy:(Math.random()-.5)*40,l:.35,k:pick(wnd.pc),s:pick(wnd.ps),g:wnd.gv});
      if(dist<=st+2){G.pr.splice(i,1);if(p.s===G.boss)hitBoss(p.d);else kill(p.s);if(G.mode!=='play'&&G.mode!=='boss')return}else{p.x+=dx/dist*st;p.y+=dy/dist*st}}
  }
  if(G.mode==='boss'){if(G.boss)stepBoss(dt);return}
  if(G.mode!=='play')return;
  const q=alive();G.fx-=G.v*dt;
  for(let i=0;i<q.length;i++){const s=q[i];
    if(i===0){
      if(s.enr){s.x-=165*dt;if(s.x<=MORDE){bite(s);return}}
      else{if(s.x>G.fx)s.x=Math.max(G.fx,s.x-90*dt);else G.fx=s.x;if(s.x<=ZONA)s.enr=1}
    }else{const p=q[i-1],tx=p.x+(p.enr?ESP+6:ESP);if(s.x>tx)s.x=Math.max(tx,s.x-90*dt);else s.x=tx}}}

/* ---------- cenário (mesmo vocabulário pixel do site: céu pontilhado, pinheiros, arbustos com flores) ---------- */
function pine(x,b,h,tc,hc,sc){const T=Math.max(3,h/13|0),w0=h*.3;R(x-1,b-7,3,7,sc||tc);
  for(let i=0;i<T;i++){const top=b-h+(i*(h-9)/T|0),th=(h/T*1.6)|0,mw=w0*(.3+.7*(i+1)/T);
    for(let j=0;j<th;j++){const hw=(mw*(j+1)/th+(rn()<.3?1:0))|0,y=top+j;R(x-hw,y,2*hw+1,1,tc);
      if(hc){R(x-hw,y,Math.min(3,hw+1),1,hc);R(x+hw-1,y,2,1,sc);if(j%5==4)R(x-hw+2+(rn()*hw|0),y,2,1,sc)}}}}
function bush(x,y,rad,P){const pts=[];
  for(let i=0;i<rad*2;i++)pts.push([x+(rn()-.5)*rad*2.4|0,y-rn()*rad*.8|0,3+(rn()*rad*.5|0)]);
  ell(x,y+1,rad*1.5,rad*.3+1,'rgba(0,0,0,.3)');
  pts.forEach(p=>circ(p[0],p[1]+1,p[2]+1,P.bo));
  [[0,0,0],[-1,-1,1],[-2,-2,2]].forEach(([dx,dy,k])=>pts.forEach(p=>{if(k<2||p[2]>3)circ(p[0]+dx,p[1]+dy,p[2]-(k?1:0),P.b[k])}));
  for(let i=0;i<rad*1.5;i++){const fx=x+(rn()-.5)*rad*2.2|0,fy=y-rn()*rad*1.1|0,k=P.fl[rn()*6|0];R(fx-1,fy,3,1,k);R(fx,fy-1,1,3,k);R(fx,fy,1,1,'#fff6b0')}}
const CA={};
function cacheFor(P){const key=(P.h?2:0)+(P.n?1:0);if(CA[key])return CA[key];
  const mkc=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;return c},sky=mkc(),land=mkc(),old=g;
  rn=seed(key*7+5);
  g=sky.getContext('2d');
  for(let i=0;i<6;i++)R(0,GY*i/6|0,W,GY/6+2,P.sky[i]);
  for(let i=0;i<5;i++){const y1=GY*(i+1)/6|0;for(let d=0;d<4;d++)for(let x=0;x<W;x++)if((x+d)%2==0)R(x,y1+d-2,1,1,P.sky[i+1])}
  if(P.n){
    if(P.h){circ(268,34,17,'#5a0e14');circ(268,34,14,'#c42424');circ(268,34,12,'#e84a3a');circ(264,31,2,'#b81e1e');circ(272,38,2,'#b81e1e')}
    else{circ(268,34,17,'#0d2557');circ(268,34,15,'#173b7a');circ(268,34,12,'#f6f3d8');circ(264,31,2,'#e1ddb8');circ(272,38,2,'#e1ddb8');circ(273,30,1,'#e1ddb8')}}
  else{g.globalAlpha=.25;circ(268,34,16,P.h?'#b8aad0':'#e8eef3');g.globalAlpha=.35;circ(268,34,10,P.h?'#d8cce8':'#f0f4f7');g.globalAlpha=1}
  g=land.getContext('2d');
  for(let x=0;x<W;x++){const y=GY-40-Math.sin(x*.035+(P.n?1:0))*10-Math.sin(x*.09)*4|0;R(x,y,1,GY-y,P.f);if(x%2==0)R(x,y+3,1,1,P.m)}
  for(let i=0;i<W/6;i++)pine(rn()*W|0,GY-14,Math.min(GY-8,28+rn()*22),P.f);
  for(let i=0;i<W/11;i++)pine(rn()*W|0,GY-6,40+rn()*26,P.m,P.t,P.f);
  for(let i=0;i<W/10;i++)bush(rn()*W|0,GY-4-(rn()*6|0),3+(rn()*2|0),P);
  g.globalAlpha=.25;R(0,GY-18,W,16,P.sky[5]);g.globalAlpha=1;
  R(0,GY,W,H-GY,P.g[0]);for(let y=GY;y<H;y+=2)for(let x=(y>>1)%2*2;x<W;x+=4)R(x,y,2,1,P.g[1]);
  for(let i=0;i<W*1.5;i++)R(rn()*W|0,GY+3+rn()*(H-GY-3)|0,1,1,P.g[3]);
  for(let i=0;i<W*.8;i++){const x=rn()*W|0,y=GY+4+rn()*(H-GY-5)|0;R(x,y-2,1,3,P.g[2]);R(x+2,y-2,1,3,P.g[2]);R(x+1,y-1,1,2,P.g[1])}
  R(0,GY,W,2,P.g[2]);for(let x=0;x<W;x+=2)R(x,GY-1-(rn()*2|0),1,2,P.g[2]);
  for(let i=0;i<22;i++){const x=rn()*W|0,y=GY+8+rn()*(H-GY-12)|0,k=P.fl[rn()*6|0];R(x-1,y,3,1,k);R(x,y-1,1,3,k);R(x,y,1,1,'#fff6b0')}
  const mc=P.h?['#ff8a1a','#b070ff']:P.n?['#4ee0cc','#a98aff']:['#c8504a','#d8c8a8'];
  for(let i=0;i<5;i++){const x=20+i*66+(rn()*20|0),y=GY+10+rn()*(H-GY-16)|0,k=mc[i%2];R(x,y-3,2,3,'#e8dcc8');R(x-2,y-5,6,2,k);R(x-1,y-6,4,1,k);R(x,y-5,1,1,'#fff')}
  if(P.h){
    [[128,GY+3],[205,GY+2]].forEach(([x,y])=>{R(x-5,y-11,10,11,'#5a5a78');ell(x,y-11,5,3,'#5a5a78');R(x-5,y-11,2,11,'#7a7a98');R(x-1,y-10,2,6,'#2a2a40');R(x-3,y-8,6,2,'#2a2a40')});
    [[18,GY+26,1],[296,GY+28,1.2]].forEach(([x,y,s])=>{const o=a=>Math.round(a*s);ell(x,y-o(5),o(7),o(5),'#7a3008');ell(x,y-o(5),o(6),o(4.2),'#e8761a');R(x-o(3),y-o(8),1,o(7),'#b0510a');R(x+o(3),y-o(8),1,o(7),'#b0510a');R(x-1,y-o(10),2,o(3),'#3f6a2a');R(x-o(3),y-o(6),o(2)+1,o(2)+1,'#ffe866');R(x+o(1),y-o(6),o(2)+1,o(2)+1,'#ffe866');R(x-o(2),y-o(3),o(4),1,'#ffe866')})}
  g=old;return CA[key]={sky,land}}
const ST=[...Array(40)].map((_,i)=>({x:(i*83)%W,y:(i*47)%90,a:i*1.7}));
function scene(t,P){
  const C=cacheFor(P);g.drawImage(C.sky,0,0);
  if(P.n){ST.forEach((s,i)=>{g.globalAlpha=.4+.6*Math.abs(Math.sin(t/700+s.a));R(s.x,s.y,1,1,'#fff');if(i%9==0){R(s.x-1,s.y,3,1,'#a9c8ff');R(s.x,s.y-1,1,3,'#a9c8ff')}});g.globalAlpha=1}
  for(let i=0;i<3;i++){const x=((t*.01*(1+i*.4)+i*120)%(W+80))-40,y=14+i*14;ell(x,y,16,4,P.cl);ell(x-8,y+1,10,3,P.cl);ell(x+9,y+1,11,3,P.cl)}
  if(P.h)for(let i=0;i<3;i++){const bx=((t*.03*(1+i*.2)+i*110)%380)-30,by=22+i*12+Math.sin(t/450+i)*5,w=Math.sin(t/90+i)>0?1:0;R(bx-4,by+w,3,1,'#0e0718');R(bx-1,by+1-w,3,2,'#0e0718');R(bx+2,by+w,3,1,'#0e0718')}
  g.drawImage(C.land,0,0);
  if(P.n&&!P.h){for(let i=0;i<9;i++){const x=60+i*28+Math.cos(t/1300+i*2)*14,y=GY+10+(i*29)%30+Math.sin(t/900+i)*5,b=.5+.5*Math.sin(t/300+i*3);
    g.globalAlpha=.2*b;R(x-2,y-2,5,5,'#ffe866');g.globalAlpha=.4+.6*b;R(x,y,1,1,'#fffbd0')}g.globalAlpha=1}}

/* ---------- inimigos comuns: aranha, escorpião, vespa, cogumelo/abóbora (v4: bem mais detalhados) ---------- */
function spider(s,t,P){
  const x=Math.round(s.x),y=SY,spd=s.enr?55:200,enr=s.enr,fz=Math.abs(Math.sin(t/(enr?60:300)+s.ph));
  const K=enr?'#3a1020':'#241a34',HL=enr?'#8a2a44':'#52447a',LG=enr?'#5a1a30':'#3a2e56',ek=enr?'#ff3a3a':(P.h?'#ffa43a':'#ffe866'),MK=P.h?'#ff8a1a':'#c42424',FG='#f0e8d8';
  ell(x,y+5,10,1.6,'rgba(0,0,0,.3)');
  if(enr){g.globalAlpha=.22+.08*Math.sin(t/60);circ(x,y-3,13,'#ff2a2a');g.globalAlpha=1}
  [1,0].forEach(j=>{for(let i=0;i<4;i++){const ph=t/spd+i*1.5+j*2+s.ph,lift=Math.max(0,Math.sin(ph))*2.5,hx=x+1+(i-1.5)*2,
    kx=hx+(i-1.5)*4.5+(j?2:-2),ky=y-9-lift,fx=hx+(i-1.5)*8+(j?3:-3),fy=y+4-lift*.5,c=j?LG:HL;
    ln(hx,y-2,kx,ky,c);ln(kx,ky,fx,fy,c);R(kx,ky,1,1,FG);R(fx,fy,1,1,FG);if(!j)R(kx+1,ky+1,1,1,c)}});
  ell(x+4,y-3,8.6,6.7,OL);ell(x-5,y-2,5.4,4.8,OL);
  ell(x+4,y-3,7.6,5.7,K);ell(x+3,y-6,4,1.6,HL);ell(x+8,y-2,2,2,HL);
  ell(x-5,y-2,4.4,3.8,K);ell(x-6,y-4,2.4,1.2,HL);
  for(let i=0;i<6;i++)R(x-2+i*2,y-9+(i%3),1,2,HL);
  R(x+2,y-7,5,1,MK);R(x+3,y-6,3,1,MK);R(x+4,y-5,1,1,MK);R(x+3,y-4,3,1,MK);R(x+2,y-3,5,1,MK);
  if(P.h){R(x+9,y-4,1,2,'#ff8a1a');R(x,y-4,1,2,'#ff8a1a')}else{R(x+8,y-5,1,1,'#fff');R(x+1,y-2,1,1,'#fff')}
  R(x-9,y-4,2,2,ek);R(x-6,y-5,2,2,ek);R(x-8,y-6,1,1,ek);R(x-4,y-6,1,1,ek);R(x-9,y-4,1,1,'#fff');R(x-6,y-5,1,1,'#fff');
  R(x-10,y,1,3,FG);R(x-7,y+1,1,3,FG);R(x-9,y-1,1,1,K);
  if(enr)R(x-10,y+3+Math.round(fz*2),1,1,'#7aff4a')}
function scorp(s,t,P){
  const x=Math.round(s.x),y=SY,en=s.enr,spd=en?55:200,K=P.h?'#4a6a3a':'#7a3a2a',HL=P.h?'#7aa04a':'#b8683a',DK=P.h?'#2a4020':'#4a2014',ek=en?'#ff3a3a':(P.h?'#d8ff60':'#ffe866'),V=P.h?'#9aff4a':'#c060ff',FG='#f0e8d8';
  ell(x,y+5,11,1.6,'rgba(0,0,0,.3)');
  if(en){g.globalAlpha=.22+.08*Math.sin(t/60);circ(x,y-4,14,'#ff2a2a');g.globalAlpha=1}
  for(let i=0;i<4;i++){const l=Math.max(0,Math.sin(t/spd+i*1.5+s.ph))*2,lx=x-5+i*3.5;
    ln(lx+1,y-3,lx-1,y+1-l,DK);ln(lx-1,y+1-l,lx-3,y+4,DK);ln(lx,y-3,lx-2,y+1-l,HL);ln(lx-2,y+1-l,lx-4,y+4,HL);R(lx-2,y+1-l,1,1,FG);R(lx-4,y+4,1,1,FG)}
  const tp=i=>{const a=i/6;return[x+9+Math.sin(a*3-.2)*7,y-4-a*14+Math.sin(t/200+i+s.ph)*.8,3.2-a*.7]};
  for(let i=0;i<=6;i++){const p=tp(i);circ(p[0],p[1],p[2]+1,OL)}
  for(let i=0;i<=6;i++){const p=tp(i);circ(p[0],p[1],p[2],i%2?K:HL);R(p[0]-1,p[1]-1,1,1,'#fff')}
  {const p=tp(6);R(p[0]-4,p[1]+1,3,2,FG);R(p[0]-5,p[1]+3,1,2,FG);R(p[0]-2,p[1]-1,1,1,V);if(en){alp(.6);R(p[0]-5,p[1]+5+Math.round(Math.abs(Math.sin(t/120))*2),1,1,V);alp(1)}}
  ell(x+1,y-4,10,4.7,OL);ell(x+1,y-4,9,3.9,K);ell(x-1,y-6,5,1.3,HL);
  for(let i=0;i<4;i++)R(x-3+i*3,y-7,1,6,OL);
  R(x+6,y-6,3,2,DK);R(x+7,y-5,1,1,HL);
  const op=Math.round((Math.sin(t/300)+1)*1.2);
  ln(x-8,y-5,x-13,y-8,OL);ln(x-8,y-5,x-13,y-8,K);ell(x-14,y-8,3.4,2.8,OL);ell(x-14,y-8,2.6,2.1,K);R(x-16,y-9,2,1,HL);
  R(x-19,y-10-op,4,2,OL);R(x-18,y-10-op,3,2,HL);R(x-19,y-6+op,4,2,OL);R(x-18,y-6+op,3,2,HL);R(x-19,y-9-op,1,1,FG);R(x-19,y-6+op,1,1,FG);
  R(x-7,y-7,2,2,ek);R(x-4,y-8,2,2,ek);R(x-7,y-7,1,1,'#fff');R(x-4,y-8,1,1,'#fff')}
function wasp(s,t,P){
  const x=Math.round(s.x),en=s.enr,hv=Math.round(Math.sin(t/180+s.ph)*2),y=SY-13+hv,Y=P.h?'#e8761a':'#ffd84a',Y2=P.h?'#b0510a':'#e8a020',BK=P.h?'#2a1040':'#2a1c10',ek=en?'#ff3a3a':(P.h?'#ff8a1a':'#c42424'),fw=Math.sin(t/35+s.ph),FG='#f0e8d8';
  ell(x,SY+5,8,1.4,'rgba(0,0,0,.25)');
  if(en){g.globalAlpha=.22;circ(x,y,15,'#ff2a2a');g.globalAlpha=1}
  g.globalAlpha=.55;ell(x+1,y-7-fw*2,7,2+Math.abs(fw)*3,'#dff2ff');ell(x+7,y-6+fw,6,2+Math.abs(fw)*2,'#cfe6f8');g.globalAlpha=1;
  ln(x-4,y-7-fw*2,x+6,y-8-fw*2,'#8aa8c8');ln(x+2,y-5,x+9,y-6+fw,'#8aa8c8');R(x+4,y-8-fw*2,1,1,'#fff');
  [[-1,-2],[3,0],[7,1]].forEach(([a,b],i)=>{const sw=Math.round(Math.sin(t/160+i)*1);ln(x+a,y+4,x+a+b,y+8,BK);ln(x+a+b,y+8,x+a+b+1+sw,y+10,BK)});
  ell(x+4,y,10.4,5.6,OL);ell(x-3,y+.5,6.2,5.4,OL);ell(x-8,y+1,5.4,4.8,OL);
  ell(x+4,y,9.4,4.6,Y);R(x,y-4,2,8,BK);R(x+4,y-4,2,8,BK);R(x+8,y-3,2,6,BK);R(x+12,y-2,1,4,BK);ell(x+5,y+3,8,1.2,Y2);R(x+3,y-3,3,1,'#fff6b0');
  ell(x-3,y+.5,5.2,4.4,Y2);for(let i=0;i<6;i++)R(x-7+i*2,y-3+((i*5)%6),1,1,Y);
  ell(x-8,y+1,4.4,3.8,Y);
  ell(x-10,y,3,3.2,ek);R(x-12,y-2,1,1,'#fff');R(x-10,y-2,1,3,BK);R(x-12,y+1,3,1,BK);R(x-8,y-2,2,3,ek);R(x-8,y-2,1,1,'#fff');
  ln(x-9,y-3,x-12,y-8,BK);ln(x-7,y-3,x-7,y-9,BK);R(x-13,y-9,2,1,BK);R(x-8,y-10,2,1,BK);
  R(x-11,y+4,2,2,FG);R(x-8,y+5,2,2,FG);
  ln(x+14,y,x+18,y+1,BK);R(x+18,y+1,2,1,FG);R(x+20,y+1,1,1,en?'#ff3a3a':'#fff');
  if(en){alp(.8);R(x+19,y+3+Math.round(Math.abs(Math.sin(t/120))*2),1,1,P.h?'#9aff4a':'#c060ff');alp(1)}}
function shroom(s,t,P){
  const x=Math.round(s.x),y=SY,en=s.enr,sn=Math.sin(t/(en?55:200)+s.ph),st=Math.max(0,sn),bo=Math.round(Math.abs(sn)*1.5),ek=en?'#ff3a3a':(P.h?'#ffe866':'#14100e');
  ell(x,y+5,9,1.6,'rgba(0,0,0,.3)');
  if(en){g.globalAlpha=.22+.08*Math.sin(t/60);circ(x,y-5,14,'#ff2a2a');g.globalAlpha=1}
  ell(x-3,y+3-Math.round(st*2),3.4,2.4,OL);ell(x+4,y+3-Math.round((1-st)*1),3.4,2.4,OL);
  ell(x-3,y+3-Math.round(st*2),2.6,1.8,P.h?'#3f6a2a':'#c0b090');ell(x+4,y+3-Math.round((1-st)*1),2.6,1.8,P.h?'#3f6a2a':'#c0b090');
  if(!P.h){
    ln(x-7,y-4-bo,x-10,y-1-Math.round(st*2),OL);ln(x+7,y-4-bo,x+10,y-1-Math.round((1-st)*2),OL);
    ell(x,y-3-bo,6,6.4,OL);ell(x,y-3-bo,5.2,5.6,'#e8dcc8');R(x-4,y-2-bo,1,5,'#c8bca0');R(x+3,y-1-bo,1,4,'#c8bca0');R(x-5,y-1-bo,10,1,'#b8a888');
    ell(x,y-10-bo,10,6,OL);ell(x,y-10-bo,9,5,'#d8504a');ell(x,y-6-bo,9,1.6,'#a8302c');ell(x-3,y-13-bo,4,1.2,'#f0786e');
    for(let i=0;i<7;i++)R(x-8+i*2.6,y-6-bo,1,2,'#7a2020');
    R(x-6,y-12-bo,2,2,'#fff');R(x+2,y-14-bo,3,2,'#fff');R(x+6,y-10-bo,2,2,'#fff');R(x-1,y-9-bo,2,1,'#fff6dc');
    R(x-4,y-5-bo,2,3,ek);R(x+1,y-5-bo,2,3,ek);R(x-4,y-5-bo,1,1,'#fff');R(x+1,y-5-bo,1,1,'#fff');ln(x-5,y-7-bo,x-2,y-5-bo,KK);ln(x+4,y-7-bo,x+1,y-5-bo,KK);
    if(en){R(x-2,y-1-bo,4,1,KK);R(x-1,y-1-bo,1,1,'#fff');R(x+1,y-1-bo,1,1,'#fff')}else R(x-1,y-1-bo,3,1,KK);
    alp(.5);R(x-5,y-2-bo,2,1,'#ff9a8a');R(x+3,y-2-bo,2,1,'#ff9a8a');alp(1)}
  else{
    ell(x,y-5-bo,9,8,OL);ell(x,y-5-bo,8,7,'#e8761a');R(x-3,y-11-bo,1,12,'#b0510a');R(x+3,y-11-bo,1,12,'#b0510a');ell(x-4,y-8-bo,2.5,1.5,'#f89a3a');R(x-6,y-9-bo,1,10,'#b0510a');R(x+6,y-9-bo,1,10,'#b0510a');
    R(x-1,y-14-bo,3,4,'#3f6a2a');R(x+2,y-15-bo,2,2,'#3f6a2a');R(x-1,y-14-bo,1,2,'#5a9a3a');
    const fk=.75+.25*Math.sin(t/80+s.ph);alp(.25*fk);ell(x,y-5-bo,6,5,'#ffe060');alp(1);
    R(x-5,y-8-bo,3,3,ek);R(x+2,y-8-bo,3,3,ek);R(x-4,y-7-bo,1,1,'#fff');R(x+3,y-7-bo,1,1,'#fff');R(x-4,y-3-bo,8,1,ek);R(x-3,y-2-bo,1,1,ek);R(x+2,y-2-bo,1,1,ek);R(x-1,y-5-bo,2,1,ek)}}
function foe(s,t,P){
  const k=s.k||0;
  if(k===1)scorp(s,t,P);else if(k===2)wasp(s,t,P);else if(k===3)shroom(s,t,P);else spider(s,t,P);
  if(s.lock){g.globalAlpha=.6;circ(Math.round(s.x),SY-(k===2?13:3),10,'#ffffff');g.globalAlpha=1}}
function bubble(s,lead,t,P,up){
  const x=Math.round(s.x),col=P.dir[s.d],sz=lead?22:13,top=SY-28-sz-(up||0)+(lead?Math.round(Math.sin(t/200)*1.5):0),L=x-sz/2|0;
  const bd=lead?(Math.floor(t/250)%2?'#ffffff':col):'#f0e8d0';
  if(!lead)g.globalAlpha=.85;
  R(L-1,top-1,sz+2,sz+2,bd);R(L,top,sz,sz,'#14101e');R(x-1,top+sz+1,3,1,bd);R(x,top+sz+2,1,1,bd);
  const k=lead?2:1;arrow(x-(lead?1:0),top+(sz/2|0)-k,s.d,k,col);g.globalAlpha=1}

/* ---------- bosses (um por ciclo de 5 fases) ---------- */
const BD=[
 /* 0: Aranha Rainha / Rainha das Trevas — abdômen com ampulheta, coroa, 8 olhos, presas pingando veneno */
 (x,y,t,h,fl,en)=>{const F=k=>fl?'#fff':k,K=F(h?'#3a1450':'#241a34'),HL=F(h?'#7a3aa8':'#52447a'),LG=F(h?'#5a2a80':'#3a2e56'),M=F(h?'#ff8a1a':'#c42424'),
    ek=en?'#ff3a3a':(h?'#ffa43a':'#ff5a5a'),bob=Math.round(Math.sin(t/300)*1.5);
  ell(x,y+6,36,3.5,'rgba(0,0,0,.32)');
  alp(.1+.05*Math.sin(t/200));circ(x,y-22,40,h?'#a050e0':'#6a3aa0');alp(1);
  [1,0].forEach(j=>{for(let i=0;i<4;i++){const ph=t/220+i*1.5+j*2,lift=Math.max(0,Math.sin(ph))*3,hx=x+4+(i-1.5)*5,kx=hx+(i-1.5)*11+(j?3:-3),ky=y-46-lift,fx=hx+(i-1.5)*22+(j?5:-5),fy=y+4-lift*.5,c=j?LG:HL;
    ln(hx,y-18,kx,ky,c);ln(hx,y-17,kx,ky+1,c);ln(kx,ky,fx,fy,c);ln(kx+1,ky,fx+1,fy,c);R(kx-1,ky-1,3,3,j?K:HL);R(fx,fy,2,2,'#f0e8d8')}});
  ell(x+10,y-20+bob,25,18,OL);ell(x-18,y-18,14,11,OL);
  ell(x+10,y-20+bob,24,17,K);ell(x+3,y-29+bob,13,4,HL);
  R(x+5,y-27+bob,11,2,M);R(x+7,y-25+bob,7,2,M);R(x+9,y-23+bob,3,2,M);R(x+7,y-21+bob,7,2,M);R(x+5,y-19+bob,11,2,M);
  for(let i=0;i<9;i++)R(x-10+i*5,y-35+((i*7)%5)+bob,1,2,HL);
  ell(x+30,y-12+bob,5,6,HL);ell(x+30,y-12+bob,3.5,4.5,K);
  ell(x-18,y-18,13,10,K);ell(x-20,y-22,6,2.4,HL);
  [[-27,-22],[-22,-24],[-17,-22],[-25,-17],[-20,-18],[-14,-17]].forEach(([a,b],i)=>{R(x+a,y+b,i<3?3:2,i<3?3:2,ek);R(x+a,y+b,1,1,'#fff')});
  R(x-28,y-11,2,7,'#f0e8d8');R(x-21,y-10,2,7,'#f0e8d8');R(x-29,y-4,1,1,'#f0e8d8');
  const dr=((t/450)%1)*6;alp(1-dr/7);R(x-28,y-3+dr,1,2,'#7aff4a');R(x-21,y-2+dr,1,2,'#7aff4a');alp(1);
  R(x-26,y-30,14,3,'#ffd84a');R(x-26,y-34,2,4,'#ffd84a');R(x-20,y-38,2,8,'#ffd84a');R(x-14,y-34,2,4,'#ffd84a');R(x-26,y-30,14,1,'#fff6b0');
  R(x-20,y-31,2,2,'#ff3a5a');R(x-25,y-31,1,1,'#3fd0ff');R(x-15,y-31,1,1,'#7aff4a');
  if(Math.sin(t/250)>.4)tw(x-19,y-40,'#fff')},
 /* 1: Escorpião / Escorpião Zumbi — carapaça em placas, pinças que abrem e fecham, cauda com ferrão pingando */
 (x,y,t,h,fl,en)=>{const F=k=>fl?'#fff':k,K=F(h?'#4a6a3a':'#7a3a2a'),HL=F(h?'#7aa04a':'#b8683a'),DK=h?'#2a4020':'#4a2014',ek=en?'#ff3a3a':'#ffe866',V=h?'#9aff4a':'#c060ff';
  ell(x,y+6,40,3.5,'rgba(0,0,0,.3)');
  for(let i=0;i<4;i++){const a=Math.max(0,Math.sin(t/160+i*1.4))*2,lx=x-12+i*9;ln(lx,y-9,lx-5,y-2-a,HL);ln(lx-5,y-2-a,lx-9,y+4,HL);ln(lx+1,y-9,lx-4,y-2-a,K);ln(lx-4,y-2-a,lx-8,y+4,K)}
  const tp=i=>{const a=i/8;return[x+14+Math.sin(a*2.6)*17,y-14-a*46+Math.sin(t/200+i)*1.3,5-a*1.5]};
  for(let i=0;i<=8;i++){const p=tp(i);ell(p[0],p[1],p[2]+1,p[2]+1,OL)}
  for(let i=0;i<=8;i++){const p=tp(i);ell(p[0],p[1],p[2],p[2],i%2?K:HL);R(p[0]-p[2]+1,p[1]-p[2]+1,2,1,HL)}
  {const p=tp(8);ln(p[0],p[1]+3,p[0]-5,p[1]+9,'#f0e8d8');ln(p[0]+1,p[1]+3,p[0]-4,p[1]+9,'#f0e8d8');const dr=((t/500)%1)*6;alp(1-dr/7);R(p[0]-6,p[1]+10+dr,2,2,V);alp(1)}
  ell(x,y-13,26,11,OL);ell(x,y-13,25,10,K);ell(x-2,y-20,15,3,HL);
  [-12,-4,4,12].forEach(a=>R(x+a,y-21,1,16,DK));
  for(let i=0;i<5;i++)R(x-14+i*7,y-25-(i%2),2,4,DK);
  if(h){for(let i=0;i<4;i++)R(x-9+i*6,y-18,4,1,'#e8e0d0');ln(x-10,y-9,x+10,y-9,'#e8e0d0');for(let i=0;i<5;i++)R(x-10+i*5,y-11,1,4,'#e8e0d0')}
  ln(x-22,y-14,x-33,y-21,OL);ln(x-22,y-13,x-33,y-20,K);ln(x-22,y-9,x-31,y-7,K);
  const op=Math.round((Math.sin(t/300)+1)*3);
  ell(x-36,y-22,8,5.4,OL);ell(x-36,y-22,7,4.6,K);ell(x-34,y-24,3,1.4,HL);
  ln(x-41,y-23,x-50,y-28-op,OL);ln(x-41,y-22,x-50,y-27-op,HL);ln(x-41,y-20,x-50,y-14+op,OL);ln(x-41,y-21,x-50,y-15+op,HL);
  ell(x-33,y-8,6,3.4,K);R(x-39,y-11,5,2,HL);R(x-39,y-6,5,2,HL);
  R(x-17,y-20,3,3,ek);R(x-12,y-21,3,3,ek);R(x-17,y-20,1,1,'#fff');R(x-12,y-21,1,1,'#fff')},
 /* 2: Vespão / Vespa Fantasma — olhos compostos, antenas, 4 asas com nervuras, ferrão */
 (x,y,t,h,fl,en)=>{const F=k=>fl?'#fff':k,Y=F(h?'#b070ff':'#ffd84a'),Y2=F(h?'#8a3ad0':'#e8a020'),BK=F(h?'#2a1040':'#2a1c10'),ek=en?'#ff3a3a':(h?'#ff8a1a':'#c42424'),
    fy=y-40+Math.round(Math.sin(t/250)*4),fw=Math.sin(t/38);
  ell(x,y+6,24,2.8,'rgba(0,0,0,.25)');
  if(h)for(let i=0;i<5;i++){alp(.3-i*.05);ell(x+22+i*8,fy+4+Math.sin(t/200+i)*3,6-i,3.4-i*.4,'#c8a0ff')}alp(1);
  alp(.55);ell(x-2,fy-19-fw*4,19,5+Math.abs(fw)*4,'#dff2ff');ell(x+13,fy-16+fw*3,16,4+Math.abs(fw)*3,'#cfe6f8');alp(.35);ell(x-7,fy-21-fw*3,13,3+Math.abs(fw)*2,'#ffffff');ell(x+18,fy-14+fw*2,11,3,'#ffffff');alp(1);
  ln(x-14,fy-18-fw*3,x+10,fy-21-fw*4,'#8aa8c8');ln(x-8,fy-17,x+4,fy-16+fw*3,'#8aa8c8');ln(x+4,fy-15+fw*3,x+22,fy-15+fw*2,'#8aa8c8');
  for(let i=0;i<3;i++){const lx=x-4+i*7;ln(lx,fy+9,lx-3,fy+18+Math.sin(t/200+i)*1.5,BK);ln(lx-3,fy+18,lx-1,fy+22,BK)}
  ell(x+18,fy+3,18,11.5,OL);ell(x-3,fy,12,10.5,OL);ell(x-19,fy+2,10,9,OL);
  ell(x+18,fy+3,17,10.5,Y);R(x+6,fy-7,3,20,BK);R(x+13,fy-8,3,22,BK);R(x+20,fy-7,3,20,BK);R(x+27,fy-4,3,14,BK);ell(x+14,fy-4,9,2,Y2);
  ln(x+35,fy+3,x+44,fy+3,BK);ln(x+35,fy+4,x+44,fy+4,BK);R(x+44,fy+3,3,1,'#f0e8d8');const dr=((t/500)%1)*6;alp(1-dr/7);R(x+46,fy+5+dr,1,2,h?'#9aff4a':'#c060ff');alp(1);
  ell(x-3,fy,11,9.5,Y2);for(let i=0;i<6;i++)R(x-12+i*4,fy-6+((i*5)%9),2,1,Y);R(x-8,fy-2,1,8,BK);R(x+2,fy-3,1,9,BK);
  ell(x-19,fy+2,9,8,Y);ell(x-23,fy-1,5,6,OL);ell(x-23,fy-1,4,5,ek);R(x-25,fy-4,2,2,'#fff');R(x-22,fy-2,1,1,'#fff');ell(x-14,fy-1,3.4,4.2,OL);ell(x-14,fy-1,2.6,3.4,ek);R(x-15,fy-3,1,1,'#fff');
  ln(x-22,fy-7,x-27,fy-17,BK);ln(x-17,fy-8,x-17,fy-18,BK);circ(x-27,fy-18,1.6,BK);circ(x-17,fy-19,1.6,BK);
  R(x-28,fy+6,3,3,'#f0e8d8');R(x-24,fy+8,3,3,'#f0e8d8')},
 /* 3: Cogumelão (normal) / Abobrão (Halloween) */
 (x,y,t,h,fl,en)=>{const F=k=>fl?'#fff':k,sq=Math.round(Math.sin(t/300)*1.4),ek=en?'#ff3a3a':'#14100e';
  if(!h){const cap=F('#d8504a'),st=F('#e8dcc8');
    ell(x,y+6,28,3.5,'rgba(0,0,0,.3)');
    for(let i=0;i<9;i++){const f=(t/1800+i/9)%1;alp((1-f)*.8);R(x-30+i*7+Math.sin(f*6+i)*3,y-56-f*20,2,2,'#e8f0a0')}alp(1);
    ell(x-10,y+2,7,3.4,OL);ell(x+10,y+2,7,3.4,OL);ell(x-10,y+2,6,2.6,F('#c0b090'));ell(x+10,y+2,6,2.6,F('#c0b090'));
    ell(x-19,y-12,5.4,10,OL);ell(x+19,y-12,5.4,10,OL);ell(x-19,y-12,4.4,9,st);ell(x+19,y-12,4.4,9,st);
    ell(x,y-14,16,15,OL);ell(x,y-14,15,14,st);ell(x,y-5,13,5,F('#c0b090'));
    ell(x,y-36+sq,31,16,OL);ell(x,y-36+sq,30,15,cap);ell(x,y-24+sq,30,4,F('#a8302c'));
    for(let i=0;i<15;i++)R(x-28+i*4,y-27+sq,1,4,'#7a2020');
    ell(x-10,y-46+sq,11,3,F('#f0786e'));
    [[-18,-40,5,3.4],[-3,-45,6,3.6],[14,-42,5.4,3.2],[22,-33,3.4,2.4],[6,-34,3,2],[-24,-32,3,2]].forEach(([a,b,r1,r2])=>{ell(x+a,y+b+sq,r1+1,r2+1,OL);ell(x+a,y+b+sq,r1,r2,F('#fff6dc'))});
    ell(x+22,y-50+sq,4,2.6,OL);ell(x+22,y-50+sq,3.2,2,cap);R(x+21,y-48+sq,2,3,st);
    R(x-9,y-20,6,6,'#fff');R(x+3,y-20,6,6,'#fff');R(x-7,y-19,3,4,ek);R(x+5,y-19,3,4,ek);ln(x-11,y-25,x-3,y-21,KK);ln(x+11,y-25,x+3,y-21,KK);ln(x-11,y-24,x-3,y-20,KK);ln(x+11,y-24,x+3,y-20,KK);
    R(x-7,y-9,14,4,KK);R(x-6,y-9,3,2,'#fff');R(x-1,y-9,3,2,'#fff');R(x+4,y-9,3,2,'#fff');R(x-4,y-6,3,1,'#fff');R(x+2,y-6,3,1,'#fff')}
  else{const gc=en?'#ff5a3a':'#ffd060',fk=.8+.2*Math.sin(t/80),B=F('#e8761a');
    ell(x,y+6,32,3.5,'rgba(0,0,0,.3)');
    ell(x-14,y+2,9,3.4,OL);ell(x+14,y+2,9,3.4,OL);ell(x-14,y+2,8,2.6,F('#3f6a2a'));ell(x+14,y+2,8,2.6,F('#3f6a2a'));
    ell(x,y-20,29,23,OL);ell(x,y-20,28,22,B);
    for(const k of [-20,-10,0,10,20])for(let yy=-40;yy<=0;yy++){const f=(yy+20)/22,w=Math.sqrt(Math.max(0,1-f*f));R(x+k*w,y+yy,1,1,fl?'#fff':'#b0510a')}
    ell(x-16,y-33,6,3,F('#f89a3a'));
    alp(.18*fk);ell(x,y-20,24,18,'#ffe060');alp(fk);
    for(const sgn of [-1,1])for(let r=0;r<7;r++)R(x+sgn*11-r,y-33+r,1+2*r,1,gc);
    for(let r=0;r<3;r++)R(x-r,y-24+r,1+2*r,1,gc);
    R(x-18,y-18,36,2,gc);R(x-16,y-16,32,2,gc);R(x-13,y-14,26,2,gc);alp(1);
    [-13,-5,3,11].forEach(a=>R(x+a,y-18,3,3,'#6a2008'));[-9,-1,7].forEach(a=>R(x+a,y-14,3,3,'#6a2008'));
    R(x-5,y-51+sq,10,10,OL);R(x-4,y-50+sq,8,9,F('#3f6a2a'));R(x+4,y-52+sq,3,3,F('#3f6a2a'));ln(x+5,y-51+sq,x+13,y-55+sq,'#3f6a2a');ell(x+14,y-55+sq,3,2,F('#4a8a34'));ell(x-9,y-46,5,2.4,F('#4a8a34'));
    ln(x-28,y-14,x-40,y-26,'#3f6a2a');ln(x-28,y-13,x-40,y-25,'#3f6a2a');ell(x-42,y-28,4,2.4,F('#4a8a34'));
    ln(x+28,y-14,x+40,y-22,'#3f6a2a');ln(x+28,y-13,x+40,y-21,'#3f6a2a');ell(x+42,y-24,4,2.4,F('#4a8a34'));
    rise(x,y-44,t,5,1400,20,10,(px,py,f)=>{alp(1-f);R(px,py,1,1,f<.5?'#ffd060':'#ff7a2a')});alp(1)}}
];
/* camada extra de detalhes dos bosses (v4): fase 0 = atrás do boss, fase 1 = por cima */
const BE=[
 /* aranha: teia ao fundo, pelos, brilho nos olhos, fios de seda e poça de veneno */
 (x,y,t,h,fl,en,post)=>{const bob=Math.round(Math.sin(t/300)*1.5),HL=h?'#7a3aa8':'#52447a';
  if(!post){alp(.22);const wx=x+10,wy=y-72;for(let i=0;i<7;i++)ln(wx,wy,wx-54+i*18,y+3,'#dfe6f2');
    for(let r=1;r<=4;r++)for(let i=0;i<6;i++){const a=(-54+i*18)*r/4,b=(-54+(i+1)*18)*r/4,ay=wy+(y+3-wy)*r/4;ln(wx+a,ay+Math.sin(i+r)*2,wx+b,ay+Math.sin(i+1+r)*2,'#dfe6f2')}alp(1)}
  else{for(let i=0;i<16;i++)R(x-8+((i*13)%36),y-36+((i*7)%27)+bob,1,2,HL);
    const ep=.35+.25*Math.sin(t/180),ec=en?'#ff3a3a':(h?'#ffa43a':'#ff5a5a');[[-27,-22],[-22,-24],[-17,-22]].forEach(([a,b])=>gl(x+a+1,y+b+1,4,ec,ep));
    ln(x+34,y-10,x+38+Math.round(Math.sin(t/300)*2),y+4,'#e8eef8');ln(x+30,y-6,x+33+Math.round(Math.cos(t/260)*2),y+5,'#e8eef8');
    alp(.5);ell(x-25,y+5,6,1.2,h?'#9aff4a':'#7aff4a');alp(1);
    orb(x,y-26,46,18,t,6,1000,(px,py,i,s)=>{alp(.4+.5*s);R(px,py,1,1,h?'#ffa43a':'#c8a0ff')});alp(1);
    R(x+8,y-34+bob,2,1,'#fff');R(x-24,y-24,1,1,'#fff')}},
 /* escorpião: poeira, espinhos na cauda, ferrão brilhante, rebites, serrilha das pinças e bolhas de veneno */
 (x,y,t,h,fl,en,post)=>{const V=h?'#9aff4a':'#c060ff',tp=i=>{const a=i/8;return[x+14+Math.sin(a*2.6)*17,y-14-a*46+Math.sin(t/200+i)*1.3]};
  if(!post){rise(x-30,y+4,t,4,1400,10,6,(px,py,f)=>{alp((1-f)*.4);R(px,py,3,1,h?'#7a8a60':'#c8a878')});alp(1)}
  else{for(let i=1;i<8;i+=2){const p=tp(i);R(p[0]+4,p[1]-1,3,2,'#f0e8d8');R(p[0]+6,p[1]-1,1,1,'#fff')}
    const e=tp(8);gl(e[0]-2,e[1]+6,5,V,.35+.25*Math.sin(t/150));
    for(let i=0;i<5;i++)R(x-14+i*7,y-17,1,1,'#f0e8d8');for(let i=0;i<4;i++)R(x-10+i*8,y-8,1,1,h?'#c8e090':'#e8b080');
    const op=Math.round((Math.sin(t/300)+1)*3);for(let i=0;i<3;i++){R(x-47+i*3,y-27-op+(i&1),1,2,'#f0e8d8');R(x-47+i*3,y-14+op-(i&1),1,2,'#f0e8d8')}
    rise(e[0]-3,e[1]+8,t,3,1200,14,3,(px,py,f)=>{alp(1-f);circ(px,py,1.2,V)});alp(1);
    R(x-16,y-22,1,1,'#fff6b0');R(x+6,y-24,2,1,'#e8b080')}},
 /* vespão: pelos, facetas dos olhos, ferrão brilhante e pólen */
 (x,y,t,h,fl,en,post)=>{if(!post)return;const fy=y-40+Math.round(Math.sin(t/250)*4);
  for(let i=0;i<10;i++)R(x-10+i*3,fy-6+((i*5)%9),1,1,h?'#d8a0ff':'#fff0a0');
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)R(x-26+i*2,fy-4+j*3,1,1,'rgba(255,255,255,.6)');
  gl(x+46,fy+4,3,en?'#ff3a3a':(h?'#9aff4a':'#c060ff'),.4+.3*Math.sin(t/140));
  for(let i=0;i<4;i++)R(x+8+i*7,fy-2+((i*3)%5),1,1,'#fff6b0');
  rise(x,fy+14,t,6,1500,24,12,(px,py,f)=>{alp(1-f);R(px,py,1,1,h?'#c8a0ff':'#ffe866')});alp(1)},
 /* cogumelão / abobrão: brilho, bochechas, raízes e esporos — ou morcegos, chamas e rachaduras */
 (x,y,t,h,fl,en,post)=>{if(!post)return;const sq=Math.round(Math.sin(t/300)*1.4);
  if(!h){alp(.2+.1*Math.sin(t/200));ell(x-8,y-44+sq,10,2,'#fff');alp(1);
    alp(.6);R(x-12,y-14,4,2,'#ff9a8a');R(x+8,y-14,4,2,'#ff9a8a');alp(1);
    R(x-7,y-3,1,3,'#a89870');R(x+6,y-2,1,3,'#a89870');ln(x-14,y+4,x-24,y+6,'#6a5a3a');ln(x+14,y+4,x+24,y+6,'#6a5a3a');
    orb(x,y-40,40,14,t,5,1100,(px,py,i,s)=>{alp(.4+.5*s);circ(px,py,1.4,'#e8f0a0')});alp(1)}
  else{gl(x,y-20,26,'#ffb040',.09+.05*Math.sin(t/90));
    flame(x-11,y-33,7,t,.5,'#ff5a1a','#ffb040','#fff0a0');flame(x+11,y-33,7,t,1.6,'#ff5a1a','#ffb040','#fff0a0');
    ln(x+14,y-36,x+19,y-28,'#6a2008');ln(x-18,y-12,x-14,y-4,'#6a2008');ln(x+19,y-28,x+17,y-24,'#6a2008');
    orb(x,y-30,44,16,t,3,1000,(px,py,i,s)=>{alp(.6+.4*s);mbat(Math.round(px),Math.round(py),t+i*50,'#14100e')});alp(1)}}
];
function bossDraw(b,t,P){
  const x=Math.round(b.x+b.off),fl=b.flash>0&&Math.floor(t/45)%2,en=!b.dead&&(b.atkT>0||(b.t<3&&b.i<BOSS_TECLAS&&b.intro<=0));
  GA=b.dead&&Math.floor(t/60)%2?.35:1;g.globalAlpha=GA;
  if(en){alp(.18);circ(x,SY-24,38,'#ff2a2a')}
  g.globalAlpha=GA;BE[b.kind](x,SY,t,P.h,fl,en,0);
  g.globalAlpha=GA;BD[b.kind](x,SY,t,P.h,fl,en);
  g.globalAlpha=GA;BE[b.kind](x,SY,t,P.h,fl,en,1);g.globalAlpha=1;GA=1}

/* sequência de 10 setas do boss + relógio de 10 s */
function seqBar(b,t,P){const cw=22,gap=2,x0=((W-(cw*BOSS_TECLAS+gap*(BOSS_TECLAS-1)))/2)|0,y0=40;
  for(let i=0;i<BOSS_TECLAS;i++){const x=x0+i*(cw+gap),done=i<b.i,cur=i===b.i,hid=b.hidT>0&&i>=b.i&&b.hid.includes(i),d=b.seq[i];
    const bd=cur?(Math.floor(t/200)%2?'#ffffff':P.dir[d]):(done?'#2a6a3a':'#f0e8d0');
    R(x-1,y0-1,cw+2,cw+2,bd);R(x,y0,cw,cw,done?'#143a22':'#14101e');
    if(done){ln(x+6,y0+11,x+10,y0+15,'#4ae08a');ln(x+10,y0+15,x+17,y0+6,'#4ae08a');ln(x+6,y0+12,x+10,y0+16,'#4ae08a');ln(x+10,y0+16,x+17,y0+7,'#4ae08a')}
    else if(hid){R(x,y0,cw,cw,'#cfd6e6');ln(x,y0,x+cw-1,y0+cw-1,'#8a92a8');ln(x+cw-1,y0,x,y0+cw-1,'#8a92a8');ln(x+cw/2,y0,x+cw/2,y0+cw-1,'#8a92a8');ln(x,y0+cw/2,x+cw-1,y0+cw/2,'#8a92a8');
      R(x+6,y0+6,10,1,'#8a92a8');R(x+6,y0+15,10,1,'#8a92a8');R(x+6,y0+6,1,10,'#8a92a8');R(x+15,y0+6,1,10,'#8a92a8')}
    else arrow(x+(cw>>1),y0+(cw>>1)-1,d,2,b.inv>0?'#c060ff':P.dir[d])}
  const bw2=cw*BOSS_TECLAS+gap*(BOSS_TECLAS-1),f=cl(b.t/BOSS_TEMPO,0,1),by=y0+cw+5;
  R(x0-1,by-1,bw2+2,6,'#14101e');R(x0,by,bw2,4,P.n?'#3a3a58':'#b8b0c0');
  R(x0,by,bw2*f,4,f>.4?'#4ae08a':f>.2?'#ffd84a':(Math.floor(t/150)%2?'#ff4a4a':'#ff8a8a'));
  txt(b.t.toFixed(1)+'s',x0+bw2+4,by-1,6,b.t<3&&Math.floor(t/150)%2?'#ff4a4a':P.ink,null,P);
  let m=null;
  if(b.kind===0&&b.hidT>0)m=['TEIA! SETAS ESCONDIDAS','#ffffff'];
  else if(b.kind===1&&b.inv>0)m=['VENENO! TECLAS INVERTIDAS','#c060ff'];
  else if(b.kind===2&&b.st.some(s=>s.w>0||s.x>PX+PA.x))m=['CUIDADO! PULE: ESPACO','#ff4a4a'];
  else if(b.kind===3&&b.shuT>0)m=['ESPOROS! EMBARALHANDO','#e8f0a0'];
  if(m&&Math.floor(t/180)%3)txt(m[0],W/2,by+9,6,m[1],'center',P);
  if(b.wrong>0){g.fillStyle='rgba(255,60,60,'+(.35*b.wrong/.3)+')';g.fillRect(x0-1,y0-1,bw2+2,cw+2)}}
function stingers(b,t,P){b.st.forEach(s=>{
  if(s.w>0){if(Math.floor(t/90)%2)for(let x=PX+PA.x+24;x<s.x;x+=6)R(x,FY-8,2,1,'#ff4a4a');
    if(Math.floor(t/150)%2)txt('PULE!',PX+PA.x+18,FY-56,7,'#ff4a4a','center',P)}
  else{const x=Math.round(s.x);for(let i=1;i<6;i++){g.globalAlpha=.4-i*.06;R(x+i*3,FY-9,2,2,'#ffd84a')}g.globalAlpha=1;
    R(x-6,FY-9,2,2,'#f0e8d8');R(x-4,FY-10,10,4,OL);R(x-4,FY-9,10,2,P.h?'#b070ff':'#ffd84a');R(x+2,FY-9,3,2,'#2a1c10')}})}

/* ---------- HUD e telas ---------- */
const HT=['.XX.XX.','XXXXXXX','XXXXXXX','.XXXXX.','..XXX..','...X...'];
function heart(x,y,full,P){const k=full?(P.h?'#ff8a1a':'#ff4a6a'):(P.n?'#3a3a58':'#b8b0c0');
  HT.forEach((r,j)=>[...r].forEach((c,i)=>{if(c==='X')R(x+i,y+j,1,1,k)}));if(full)R(x+1,y+1,1,1,'#fff')}
function hud(t,P){
  for(let i=0;i<VIDAS;i++)heart(6+i*10,6,i<G.hp,P);
  txt(String(G.score).padStart(5,'0'),W-6,6,8,P.ink,'right',P);
  txt('REC '+G.best,W-6,18,6,P.ink,'right',P);
  sp(COINR,COINP,5,28,1);txt(String(G.coins),16,29,6,'#ffd84a',null,P);
  if(G.mode==='boss'&&G.boss){const b=G.boss;
    txt('BOSS '+BN[b.kind][P.h?1:0],W/2,6,8,P.ink,'center',P);
    for(let i=0;i<BOSS_TECLAS;i++){const px=W/2-47+i*9;R(px-1,17,9,7,'#14100e');R(px,18,7,5,i<b.hp?'#ff4a4a':(P.n?'#3a3a58':'#b8b0c0'))}
    if(b.atkT>0&&Math.floor(t/150)%2)txt('CUIDADO!',6,18,6,'#ff4a4a',null,P)}
  else{
    txt('FASE '+G.lv,W/2,6,8,P.ink,'center',P);
    txt(EN[blockOf(G.lv)][P.h?1:0]+' '+(G.left+G.sp.length),W/2,18,6,P.ink,'center',P);
    const l=alive()[0];
    if(l){if(l.enr){if(Math.floor(t/150)%2)txt('CUIDADO!',6,18,6,'#ff4a4a',null,P)}
      else txt('ATAQUE EM '+Math.max(0,Math.ceil((l.x-ZONA)/G.v))+'s',6,18,6,P.ink,null,P)}}
  if(G.combo>1)txt('COMBO x'+G.combo,W/2,G.mode==='boss'?29:28,6,P.dir[0],'center',P)}
function panelMsg(lines,P){g.fillStyle=P.n?'rgba(4,6,24,.72)':'rgba(255,255,255,.55)';g.fillRect(0,0,W,H);
  lines.forEach(([s,y,sz,k])=>txt(s,W/2,y,sz,k||P.ink,'center',P))}
function result(t,P,extra){
  const r=G.res,el=t-r.t;
  for(let i=0;i<3;i++){const on=i<r.stars&&el>i*250+150;sp(STARR,{X:on?'#ffd84a':(P.n?'#3a3a58':'#b8b0c0')},W/2-42+i*30,44-(on&&el<i*250+400?4:0),3)}
  const bob=Math.round(Math.sin(t/160)*1.5),shown=Math.round(r.coins*Math.min(1,el/800));
  sp(COINR,COINP,W/2-62,78+bob,2);txt('+'+shown,W/2-40,82,10,'#ffd84a',null,P);txt('TOTAL '+G.coins,W/2+6,84,6,P.ink,null,P);
  if(extra)txt(extra,W/2,104,7,P.ink,'center',P)}

function draw(t){
  const P=pal();g.save();
  if(G.shake>0)g.translate(Math.round((Math.random()-.5)*6*cl(G.shake*3,0,1)),Math.round((Math.random()-.5)*4*cl(G.shake*3,0,1)));
  scene(t,P);
  if(G.boss&&!G.boss.gone)bossDraw(G.boss,t,P);
  G.sp.slice().sort((a,b)=>b.x-a.x).forEach(s=>foe(s,t,P));
  /* panda: pula, avança e recua */
  const cast=G.now-G.castT<220,happy=G.now-G.happyT<500,fl=G.hurt>0&&Math.floor(t/60)%2,
        bob=PA.y>0?0:(G.now-PA.land<110?1:(Math.sin(t/380)>.3?-1:0)),ox=PX+Math.round(PA.x);
  ell(ox+2,FY+1,Math.max(8,16-PA.y*.4),2.2,'rgba(0,0,0,.3)');
  const tp=pandaDraw(ox,FY-Math.round(PA.y)+bob,t,P,{skin:curSkin(),fl,cast,castD:G.castD,miss:G.now-G.miss<250,
    happy:happy||G.mode==='clear'||G.mode==='bwin',over:G.mode==='over',blink:(t%3400)<130,staff:1,walk:PA.walk&&PA.y<=0,wag:1+(happy?1.5:0)+(cast?1:0)});
  G.tipx=tp[0];G.tipy=tp[1];
  if(G.mode==='play'){const q=alive();q.slice().reverse().forEach(s=>bubble(s,s===q[0],t,P))}
  if(G.mode==='boss'&&G.boss&&!G.boss.gone){const b=G.boss;if(b.intro<=0)stingers(b,t,P)}
  const wd=wdOf(curSkin());
  G.pr.forEach(p=>{const c=P.dir[p.d];p.tr.forEach(([x,y],i)=>{g.globalAlpha=(i+1)/8;R(x-1,y-1,3,3,c)});
    g.globalAlpha=.4;circ(p.x,p.y,7,c);g.globalAlpha=1;pjDraw(wd.pj,p.x,p.y,wd.pc[0],wd.pc[1],t,p.ph||0);
    for(let i=0;i<4;i++){const a=t/90+i*1.571;R(p.x+Math.cos(a)*7,p.y+Math.sin(a)*7,1,1,c)}});
  G.pt.forEach(p=>{g.globalAlpha=cl(p.l*2,0,1);pshape(p.s,p.x,p.y,p.k,t)});g.globalAlpha=1;
  if(G.hurt>0){g.fillStyle=`rgba(255,40,40,${.28*G.hurt/.6})`;g.fillRect(0,0,W,H)}
  hud(t,P);
  if(G.mode==='boss'&&G.boss&&!G.boss.gone){const b=G.boss;
    if(b.intro>0){g.fillStyle=P.n?'rgba(4,6,24,.45)':'rgba(255,255,255,.35)';g.fillRect(0,40,W,80);
      if(Math.floor(t/200)%2)txt('BOSS!',W/2,46,16,'#ff4a4a','center',P);
      txt(BN[b.kind][P.h?1:0],W/2,70,8,P.ink,'center',P);txt(BRULE[b.kind],W/2,86,6,P.dir[2],'center',P);txt('RESOLVA AS 10 SETAS EM '+BOSS_TEMPO+'s',W/2,100,6,P.ink,'center',P)}
    else seqBar(b,t,P)}
  if(G.mode==='menu')panelMsg([['PANDA MAGO',24,16,P.dir[0]],['Setas = lancar feitico',56,7],['no inimigo mais proximo',70,7],['5 coracoes por fase',84,7],['Boss: 10 setas em '+BOSS_TEMPO+'s!',98,7,P.dir[2]],['Espaco = pular',112,7],['Moedas: '+G.coins,126,7,'#ffd84a'],['Enter ou toque para jogar',148,7,P.dir[1]]],P);
  else if(G.mode==='clear'){panelMsg([['FASE '+G.lv+' COMPLETA!',18,12,P.dir[1]],['Pontos: '+G.score,120,7],['Enter ou toque: continuar',150,7,P.dir[0]]],P);
    result(t,P,'Precisao '+G.res.acc+'%');if(G.lv%BOSS_CADA===0&&Math.floor(t/300)%2)txt('PROXIMO: BOSS!',W/2,134,8,'#ff4a4a','center',P)}
  else if(G.mode==='bwin'){panelMsg([['BOSS DERROTADO!',18,12,P.dir[1]],['Pontos: '+G.score,120,7],['Enter ou toque: proxima fase',150,7,P.dir[0]]],P);result(t,P,BN[G.boss.kind][P.h?1:0])}
  else if(G.mode==='over')panelMsg([['FIM DE JOGO',30,14,'#ff4a4a'],['Fase '+G.lv+'  Pontos: '+G.score,70,8],['Recorde: '+G.best,88,7],['Moedas: '+G.coins,104,7,'#ffd84a'],['Enter ou toque: tentar de novo',142,7,P.dir[0]]],P);
  g.restore()}

/* ---------- guarda-roupa ---------- */
const PORT={};
function portrait(id){if(PORT[id])return PORT[id];
  const k=document.createElement('canvas');k.width=k.height=64;const old=g;g=k.getContext('2d');
  pandaDraw(33,60,0,pal(),{skin:id,staff:1,wag:1,nofx:1});g=old;return PORT[id]=k.toDataURL()}
let mtm=0;
const hint=()=>{const sk=curSkin(),c=COS[sk],w=wdOf(sk);pm.textContent='Varinha: '+w.n+'. '+(c.fxn?('Efeito: '+c.fxn+'.'):(hwOn()?'Fantasias de Halloween! Compre com moedas.':'Roupas dos bichos do jogo. Compre com moedas!'))};
const msg=s=>{pm.textContent=s;clearTimeout(mtm);mtm=setTimeout(hint,2400)};
function renderWd(){
  const ids=hwOn()?HW:NM,eq=curSkin();
  gal.innerHTML=ids.map(id=>{const c=COS[id],has=!c.pr||S.own.includes(id),on=eq===id,r=c.rar||0;
    return`<button class="mg-ga r${r}${on?' on':''}" type="button" data-id="${id}"><span class="mg-ap" style="background-image:url('${portrait(id)}')"></span>${c.n}<b style="color:${TC[r]}">${TN[r]}</b><em>${on?'EM USO':has?'USAR':'<i class="mg-ci"></i>'+c.pr}</em></button>`}).join('');
  pn.textContent=COS[eq].n;hint()}
gal.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const id=b.dataset.id,c=COS[id];
  if(c.pr&&!S.own.includes(id)){
    if(G.coins<c.pr){renderWd();msg('Moedas insuficientes! Faltam '+(c.pr-G.coins)+'.');sfx('miss');return}
    G.coins-=c.pr;S.own.push(id);sfx('clear')}
  else sfx('kill');
  S[hwOn()?'h':'n']=id;saveAll();renderWd();msg(c.n+' equipado! Varinha: '+wdOf(id).n+'.')});
/* prévia com a varinha e as partículas da skin */
const PV=[];let pvl=0;
function drawPreview(t){
  const P=pal(),old=g,sk=curSkin(),wd=wdOf(sk),hp=t%2600,jy=hp<420?Math.sin(hp/420*Math.PI)*10:0,dt=Math.min(.05,(t-pvl)/1000||0);pvl=t;
  g=pvg;g.clearRect(0,0,64,64);ell(34,61,16,2.2,'rgba(0,0,0,.25)');
  const tp=pandaDraw(34,Math.round(60-jy+(jy?0:(Math.sin(t/380)>.3?-1:0))),t,P,{skin:sk,blink:(t%3400)<130,happy:hp<420,staff:1,wag:hp<420?2:1});
  if(Math.random()<dt*22&&PV.length<60)PV.push({x:tp[0]+(Math.random()-.5)*5,y:tp[1]+(Math.random()-.5)*5,vx:(Math.random()-.5)*20,vy:(Math.random()-.5)*10+(wd.gv<0?-12:0),l:.8,k:pick(wd.pc),s:pick(wd.ps),g:wd.gv});
  for(let i=PV.length-1;i>=0;i--){const p=PV[i];p.l-=dt;if(p.l<=0||p.y>64||p.y<0||p.x<0||p.x>64){PV.splice(i,1);continue}p.vy+=(p.g==null?220:p.g)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
    g.globalAlpha=cl(p.l*2,0,1);pshape(p.s,p.x,p.y,p.k,t)}
  g.globalAlpha=1;g=old}
function setTab(k){G.tab=k;panel.classList.toggle('w',k==='w');
  ov.querySelectorAll('.mg-tb').forEach(b=>b.classList.toggle('on',b.dataset.t===k));
  PV.length=0;if(k==='w')renderWd()}

/* ---------- tema (ícone, janela, ramos) ---------- */
let tk=-1;
function theme(){const k=(hwOn()?2:0)+(nightOn()?1:0);if(k===tk)return;tk=k;const P=pal(),u=P.ui;
  ['pn','bd','tx','bt','bt2','bc','tb','tbc','on','onc','cd','cs'].forEach(n=>ov.style.setProperty('--'+n,u[n]));
  ov.style.setProperty('--brn','url('+branchURL(P)+')');
  ico.style.setProperty('--mgp',u.pn);ico.style.setProperty('--mgd',u.bd);ico.style.setProperty('--mgt',u.tx);
  ico.style.setProperty('--mgg',u.glow);drawIcon();if(isOpen&&G.tab==='w')renderWd()}
new MutationObserver(theme).observe(root,{attributes:true,attributeFilter:['class']});theme();

/* ---------- esconde o ícone enquanto o bloco de notas estiver aberto ---------- */
const syncIco=()=>{let on=false;try{on=!!document.querySelector(NOTA_ABERTA)}catch(e){}ico.classList.toggle('off',on)};
new MutationObserver(syncIco).observe(document.body,{attributes:true,subtree:true,childList:true,attributeFilter:['class','style','hidden']});
syncIco();

/* ---------- laço ---------- */
let shownC=-1;
function loop(t){raf=requestAnimationFrame(loop);const dt=Math.min(.05,(t-last)/1000||0);last=t;if(document.hidden)return;G.now=t;theme();
  if(shownC!==G.coins){shownC=G.coins;cn.textContent=G.coins}
  if(G.tab==='g'){step(dt);draw(t)}else drawPreview(t)}
function open(){if(isOpen)return;isOpen=true;if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();
  G.mode='menu';G.mt=0;G.sp=[];G.pr=[];G.pt=[];G.hp=VIDAS;G.lv=1;G.score=0;G.combo=0;G.hurt=0;G.shake=0;G.boss=null;G.res=null;
  PA.x=0;PA.y=0;PA.vy=0;PA.evT=0;setTab('g');
  ov.classList.add('on');last=0;raf=requestAnimationFrame(loop)}
function close(){if(!isOpen)return;isOpen=false;ov.classList.remove('on');cancelAnimationFrame(raf);saveAll()}

ico.addEventListener('click',open);
ov.querySelector('.mg-x').addEventListener('click',close);
ov.addEventListener('click',e=>{if(e.target===ov)close()});
ov.querySelectorAll('.mg-tb').forEach(b=>b.addEventListener('click',()=>{setTab(b.dataset.t);b.blur()}));
cv.addEventListener('pointerdown',()=>{if(G.mode!=='play'&&G.mode!=='boss')advance();else jump()});
ov.querySelectorAll('.mg-pad button').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();if(b.dataset.j){if(G.mode==='play'||G.mode==='boss')jump();else if(G.tab==='g')advance()}else press(+b.dataset.d)}));
addEventListener('keydown',e=>{if(!isOpen)return;
  if(e.key==='Escape'){e.stopPropagation();close();return}
  if(G.tab!=='g')return; /* na aba ROUPAS as teclas seguem o comportamento normal da página */
  if(e.key in KEYS){e.preventDefault();e.stopPropagation();if(!e.repeat)press(KEYS[e.key])}
  else if(e.key==='Enter'||e.key===' '){
    e.preventDefault();e.stopPropagation();
    if(!e.repeat){if(G.mode==='play'||G.mode==='boss'){if(e.key===' ')jump()}else advance()}}},true);
})();