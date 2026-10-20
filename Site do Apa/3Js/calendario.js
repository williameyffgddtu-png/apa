/* Calendário pixel art v2 — carregar DEPOIS dos outros scripts, nas duas páginas */
(()=>{
const MES=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      MS=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'],DS=['D','S','T','Q','Q','S','S'],
      DSF=['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
      TIPO={f:'Feriado nacional',p:'Ponto facultativo',c:'Data comemorativa'},
      COR={f:'#c8504a',p:'#e0a020',c:'#3fa38a'},
      LN=['Lua Nova','Lua Crescente','Quarto Crescente','Crescente Gibosa','Lua Cheia','Minguante Gibosa','Quarto Minguante','Lua Minguante'],
      MIN=2026*12,MAX=2030*12+11,
      RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------- armazenamento (lembretes e som) ---------- */
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
          set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let notes=LS.get('cal_notes',{}),snd=LS.get('cal_snd',false);
const nk=(y,m,d)=>y+'-'+m+'-'+d,
      esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- sprites (cada letra = uma cor) ---------- */
const PAL={O:'#e8761a',o:'#b0510a',G:'#3f8f3a',g:'#2a6a2a',Y:'#ffe866',y:'#d9a520',K:'#14100e',R:'#c8504a',r:'#8a2a2a',
  W:'#fff',w:'#c8c8d8',B:'#4da3ff',b:'#2a5fb0',P:'#ff8fb5',V:'#8a3ad0',N:'#6b3f1d',n:'#4a2a10',L:'#c99a5a',
  S:'#b8c0d0',k:'#4a4658',T:'#3fa38a',C:'#7fe0ff',F:'#fff3b0',D:'#4a4a72'};
const SPR={
 sol:['....Y....','.Y..Y..Y.','..YYYYY..','YYYOOOYYY','.YOOOOOY.','BBBBBBBBB','.bbbbbbb.'],
 cometa:['......Y..','.....YYY.','.CCYYYWYY','CC..YYYY.','C....Y.Y.'],
 mascara:['.VVVVVVV.','YYYYYYYYY','VKKKVKKKV','VVKKVKKVV','VVVVVVVVV','.VVPPPVV.','..VVVVV..'],
 venus:['..PPP..','.PP.PP.','.P...P.','.PP.PP.','..PPP..','...P...','.PPPPP.','...P...','...P...'],
 cruz:['...N...','...N...','NNNNNNN','..VNV..','..VNV..','...N...','...N...','.LLLLL.','LLLLLLL'],
 coelho:['.WW...WW.','.WP...PW.','.WP...PW.','..WWWWW..','.WWWWWWW.','.WKWWWKW.','.WWWPWWW.','.PWWKWWP.','..WWWWW..'],
 inconf:['N........','NWWWRWWWW','NWWRRRWWW','NWRRRRRWW','NWWWWWWWW','N........','N........'],
 capacete:['...YoY...','..YYoYY..','.YWYoYYY.','YYYYoYYYY','yyyyyyyyy','.yyyyyyy.'],
 rosa:['..RRR..','.RRrRR.','.RrRrR.','.RRRRR.','..RRR..','...G...','GG.G...','.GGG...','...G...'],
 calice:['..WWW..','.WWKWW.','..WWW..','YRRRRRY','.YYYYY.','..YYY..','...Y...','..YYY..','.YYYYY.'],
 cupido:['..RRR.RRR..','.RRRRRRRRR.','WRWRRRRRRR.','WNNNNNNNNNS','WRRRRRRRRR.','..RRRRRRR..','...RRRRR...','....RRR....','.....R.....'],
 milho:['..YyY..','.YyYyY.','.yYyYy.','.YyYyY.','.yYyYy.','GYyYyYG','GGYyYGG','.GGYGG.','..GGG..'],
 espeto:['...S...','..RRR..','.RRrRR.','..RRR..','..GGG..','.GGgGG.','..GGG..','..LLL..','...N...','...N...'],
 bandeira:['N..........','NGGGGGGGGGG','NGGGGYYGGGG','NGGYYYYYYGG','NGYYBWWBYYG','NGGYYYYYYGG','NGGGGYYGGGG','NGGGGGGGGGG','N..........','N..........'],
 manto:['..Y.Y.Y..','..YYYYY..','...LLL...','..BLLLB..','..BBLBB..','.BBBBBBB.','.BBYBBBB.','BBBBBBYBB','BBBYBBBBB','BBBBBBBBB'],
 urso:['NN.....NN','NLNNNNNLN','.NNNNNNN.','.NKNNNKN.','.NNLLLNN.','.NNLKLNN.','..NNNNN..','..RRWRR..'],
 maca:['....NGG..','.RRRNRRR.','RRWRRRRRR','RRWRRRRRR','RRRRRRRRR','RRRRRRRRR','.RRRRRRR.','..RR.RR..'],
 fantasma:['..WWWWW..','.WWWWWWW.','WWKKWKKWw','WWKKWKKWw','WWWWWWWWw','WPWWKWWPw','WWWWWWWWw','WWWWWWWWw','WW.WWW.Ww'],
 lapide:['..SSS..','.SSSSS.','SSSkSSS','SSkkkSS','SSSkSSS','SSSkSSS','SSSSSSS','SSSSSSS','GGGGGGG'],
 globo:['..BBBBB..','.BWBBBBB.','BBBBBWBBB','BWWWWWWWB','BBBBBBBBB','BBWBBBBBB','.BBBBBWB.','..BBBBB..'],
 punho:['..NNNNN..','.NNnNnNN.','NNNNNNNNN','NNnNnNnNN','NNNNNNNNN','.NNNNNNN.','..NNNNN..','..YYYYY..','..RRRRR..','..GGGGG..'],
 meia:['WWWWWW..','RRRRRR..','RGRGRG..','RRRRRR..','RRRRRR..','RRRRRRR.','RRRRRRRR','.RRRRRWW'],
 gorro:['...WWW...','..WWWWW..','...RRR...','..RRRRR..','.RRRRRrR.','RRRRRRRRR','WWWWWWWWW','WWWWWWWWW'],
 champanhe:['Y.B.W.B.Y','....N....','...YYY...','...GGG...','...GGG...','..GGGGG..','.GGGGGGg.','.GGWWWGg.','.GGWWWGg.','.GGGGGGg.','.GGGGGGg.'],
 abobora:['....GG...','.OOOGOOO.','OOOOOOOOO','OOKOOOKOO','OKKKOKKKO','OOOOOOOOO','OKOKKKOKO','.OOKKKOO.','..OOOOO..'],
 mala:['...SSS...','...S.S...','OOOOOOOOO','OOOYYYOOO','OOOOYOOOO','OOOOOOOOO','ooooooooo'],
 nota:['YYYYYYY','YyyyyyY','YYYYYYY','YyyyyYY','YYYYYYY','YyyYYYY','YYYYYYY']};

/* fases da lua geradas por código (hemisfério sul: crescente iluminada à esquerda) */
function luaSpr(i){const p=i/8,c=Math.cos(2*Math.PI*p),rows=[];
  for(let y=0;y<9;y++){let r='';for(let x=0;x<9;x++){let nx=(x-4)/4.4;const ny=(y-4)/4.4;
    if(nx*nx+ny*ny>1){r+='.';continue}
    nx=-nx;const w=Math.sqrt(1-ny*ny),lit=p<.5?nx>c*w:nx<=-c*w;r+=lit?'F':'D'}
    rows.push(r)}
  return rows}
for(let i=0;i<8;i++)SPR['l'+i]=luaSpr(i);

const cache={};
function ico(k){if(cache[k])return cache[k];const s=SPR[k],h=s.length,w=Math.max(...s.map(r=>r.length)),c=document.createElement('canvas');c.width=w+2;c.height=h+2;
  const g=c.getContext('2d'),G={};
  s.forEach((r,y)=>[...r].forEach((ch,x)=>{if(PAL[ch])G[(x+1)+','+(y+1)]=PAL[ch]}));
  g.fillStyle='#1a1220';
  for(const q in G){const[x,y]=q.split(',').map(Number);[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{if(!G[(x+a)+','+(y+b)])g.fillRect(x+a,y+b,1,1)})}
  for(const q in G){const[x,y]=q.split(',').map(Number);g.fillStyle=G[q];g.fillRect(x,y,1,1)}
  return cache[k]=c.toDataURL()}
const bg=k=>`style="background-image:url(${ico(k)})"`;
const cores=k=>{const s=new Set();SPR[k].forEach(r=>[...r].forEach(c=>{if(PAL[c]&&c!='K')s.add(PAL[c])}));return[...s]};

/* ---------- feriados e datas ---------- */
const add=(d,n)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
function pascoa(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),
  h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),
  mo=Math.floor((h+l-7*m+114)/31),dia=(h+l-7*m+114)%31+1;return new Date(y,mo-1,dia)}
const nSun=(y,m,n)=>1+(7-new Date(y,m,1).getDay())%7+(n-1)*7;
const HC={};
function hol(y){if(HC[y])return HC[y];const o={},
  put=(m,d,n,t,i)=>{(o[m+'-'+d]=o[m+'-'+d]||[]).push({n,t,i})},pd=(dt,n,t,i)=>put(dt.getMonth(),dt.getDate(),n,t,i),P=pascoa(y);
  put(0,1,'Confraternização Universal','f','sol');put(0,6,'Dia de Reis','c','cometa');
  pd(add(P,-48),'Carnaval (segunda)','p','mascara');pd(add(P,-47),'Carnaval (terça)','p','mascara');
  put(2,8,'Dia Internacional da Mulher','c','venus');
  pd(add(P,-2),'Sexta-feira Santa','f','cruz');pd(P,'Páscoa','c','coelho');
  put(3,21,'Tiradentes','f','inconf');put(4,1,'Dia do Trabalho','f','capacete');
  put(4,nSun(y,4,2),'Dia das Mães','c','rosa');pd(add(P,60),'Corpus Christi','p','calice');
  put(5,12,'Dia dos Namorados','c','cupido');put(5,24,'Festa Junina (São João)','c','milho');
  put(7,nSun(y,7,2),'Dia dos Pais','c','espeto');put(8,7,'Independência do Brasil','f','bandeira');
  put(9,12,'Nossa Senhora Aparecida','f','manto');put(9,12,'Dia das Crianças','c','urso');
  put(9,15,'Dia do Professor','c','maca');put(9,31,'Halloween (Dia das Bruxas)','c','fantasma');
  put(10,2,'Finados','f','lapide');put(10,15,'Proclamação da República','f','globo');
  put(10,20,'Dia da Consciência Negra','f','punho');put(11,24,'Véspera de Natal','c','meia');
  put(11,25,'Natal','f','gorro');put(11,31,'Réveillon','c','champanhe');
  return HC[y]=o}

/* próxima data especial a partir de amanhã */
function proximo(){const[y,m,d]=agora(),h0=new Date(y,m,d);
  for(let yy=y;yy<=y+1;yy++){const H=hol(yy),ks=Object.keys(H).map(k=>{const[mm,dd]=k.split('-').map(Number);return{dt:new Date(yy,mm,dd),L:H[k]}}).sort((a,b)=>a.dt-b.dt),
    f=ks.find(o=>o.dt>h0);if(f)return f}
  return null}

/* ---------- feriadão: sequência de folga com pelo menos 1 feriado em dia útil ---------- */
const off=d=>{const w=d.getDay();if(w==0||w==6)return 1;return(hol(d.getFullYear())[d.getMonth()+'-'+d.getDate()]||[]).some(x=>x.t=='f')?2:0};
const RC={};
function run(y,m,d){const k=nk(y,m,d);if(k in RC)return RC[k];let r=null;const dt=new Date(y,m,d);
  if(off(dt)){let a=dt,b=dt,h=off(dt)==2;
    while(off(add(a,-1))){a=add(a,-1);if(off(a)==2)h=true}
    while(off(add(b,1))){b=add(b,1);if(off(b)==2)h=true}
    const n=Math.round((b-a)/864e5)+1;if(n>=3&&h)r={n,a,b}}
  return RC[k]=r}
const f2=d=>String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0');
const rel=n=>n==0?'HOJE':n==1?'amanhã':n==-1?'ontem':n>0?'em '+n+' dias':'há '+(-n)+' dias';

/* ---------- lua ---------- */
function lua(dt){const dias=(Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDate(),12)-Date.UTC(2000,0,6,18,14))/864e5;
  return((dias/29.530588853)%1+1)%1}
const lidx=p=>Math.round(p*8)%8;

/* ---------- som (opcional, estilo 8-bit) ---------- */
let ac;
function bip(f,t,tp,v,dl){if(!snd)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();
  const o=ac.createOscillator(),g=ac.createGain(),s=ac.currentTime+(dl||0);o.type=tp||'square';o.frequency.value=f;
  g.gain.setValueAtTime(v||.04,s);g.gain.exponentialRampToValueAtTime(.0001,s+t);o.connect(g);g.connect(ac.destination);o.start(s);o.stop(s+t)}catch(e){}}
const som={nav:()=>bip(520,.06),sel:()=>bip(780,.05),
  fest:()=>{bip(523,.08);bip(659,.08,'square',.04,.08);bip(784,.14,'square',.04,.16)},
  ok:()=>{bip(880,.06);bip(1175,.1,'square',.04,.07)},del:()=>bip(200,.12,'sawtooth')};

/* ---------- estilo ---------- */
const css=document.createElement('style');
css.textContent=`
#calb{position:fixed;right:22px;bottom:calc(18px + 64px + 16px + env(safe-area-inset-bottom,0px));width:56px;height:60px;z-index:15;border:0;padding:0;cursor:pointer;background:#fdf6dc;color:#2a1c10;font:inherit;font-family:'Press Start 2P',monospace;box-shadow:0 0 0 4px #5a3519,4px 5px 0 4px rgba(0,0,0,.35);transition:transform .15s}
#calb:hover{transform:translateY(-4px) rotate(-3deg)}
#calb:active{transform:translateY(2px)}
#calb .h{display:block;height:17px;line-height:17px;background:#c8504a;color:#fff;font-size:8px;text-align:center}
#calb .n{display:block;font-size:18px;line-height:40px;text-align:center}
#calb .bi{position:absolute;top:-17px;right:-15px;width:28px;height:28px;background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated;animation:clbob .9s steps(2) infinite;pointer-events:none}
#calb .bd{position:absolute;left:-7px;top:-7px;width:10px;height:10px;background:#ffd23f;box-shadow:0 0 0 3px #14100e}
@keyframes clbob{50%{transform:translateY(-4px)}}
.hw #calb{background:#2a1a3a;color:#ffb060;box-shadow:0 0 0 4px #14061c,0 0 14px rgba(255,120,30,.5),4px 5px 0 4px rgba(0,0,0,.4)}
.hw #calb .h{background:#e8761a;color:#2a1408}
.cl-o{position:fixed;inset:0;z-index:45;display:flex;align-items:center;justify-content:center;padding:12px;background:rgba(5,10,31,.6);opacity:0;pointer-events:none;transition:opacity .2s}
.cl-o.on{opacity:1;pointer-events:auto}
.cl{position:relative;width:min(94vw,460px);max-height:92vh;overflow-y:auto;overflow-x:hidden;background:#fdf6dc;border:4px solid #5a3519;box-shadow:inset 0 -4px #e6d9aa,8px 8px 0 rgba(0,0,0,.4);padding:20px 12px 12px;color:#5a3519;font:9px 'Press Start 2P',monospace;transform:scale(.6);transition:transform .25s cubic-bezier(.2,1.2,.4,1)}
.cl-o.on .cl{transform:none}
.cl .hd{position:relative;display:flex;align-items:center;gap:8px;margin:-20px -12px 12px;padding:18px 10px 10px;background:#c8504a;box-shadow:inset 0 -4px #8a2a2a;color:#fff}
.cl .hd:before,.cl .hd:after{content:'';position:absolute;top:5px;width:10px;height:7px;background:#fdf6dc;box-shadow:0 0 0 2px #5a3519}
.cl .hd:before{left:24%}.cl .hd:after{right:24%}
.cl .tt{flex:1;font:inherit;font-size:10px;line-height:15px;text-align:center;background:none;border:0;color:inherit;cursor:pointer;padding:4px 0;text-shadow:2px 2px #8a2a2a}
.cl .tt:hover{transform:translateY(-1px)}
.cl .tt:after{content:'';display:inline-block;margin-left:7px;border:4px solid transparent;border-top-color:currentColor;border-bottom:0;vertical-align:2px}
.cl .hi{display:inline-block;width:18px;height:18px;margin-right:6px;vertical-align:-4px;background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated}
.cl .k{font:inherit;font-size:9px;color:#fff;background:#3b6fd8;border:0;padding:9px 10px;cursor:pointer;box-shadow:inset -3px -3px #274a9a,inset 3px 3px #6a9bf5,0 0 0 3px #14295e}
.cl .k:active{transform:translateY(2px)}.cl .k:disabled{filter:grayscale(1);opacity:.5;cursor:default}
.cl .k.g2{background:#3fa38a;box-shadow:inset -3px -3px #2a7a66,inset 3px 3px #6cd0b4,0 0 0 3px #1d4f45}
.cl .k.sn.off{filter:grayscale(1);opacity:.6}
.cl button:focus-visible,.cl .ni:focus-visible{outline:3px solid #ffd23f;outline-offset:2px}
.cl .bn{display:flex;align-items:center;gap:10px;width:calc(100% - 6px);margin:0 3px 12px;padding:8px 10px;border:0;font:inherit;font-size:7px;line-height:12px;text-align:left;color:#2a1c10;background:#ffe9a0;box-shadow:0 0 0 3px #e0a020;cursor:pointer}
.cl .bn:hover{transform:translateY(-2px)}
.cl .bn i{flex:none;width:26px;height:26px;background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated}
.cl .bn b{font-weight:normal;color:#c8504a}
.cl .wd,.cl .gr{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.cl .wd{margin:0 3px 6px;text-align:center;font-size:7px;color:#8a6a40}
.cl .gr{margin:0 3px}
.cl .gr.sl{animation:clsl .28s steps(5)}.cl .gr.sr{animation:clsr .28s steps(5)}
@keyframes clsl{from{transform:translateX(44px);opacity:.2}to{transform:none;opacity:1}}
@keyframes clsr{from{transform:translateX(-44px);opacity:.2}to{transform:none;opacity:1}}
.cl .cd{position:relative;aspect-ratio:1;border:0;font:inherit;font-size:8px;color:#2a1c10;background:#fffdf0;box-shadow:0 0 0 2px #e6d9aa;cursor:pointer;padding:4px 0 0 4px;text-align:left;overflow:hidden}
.cl .cd.w{background:#f6eecb}
.cl .cd:hover{transform:translateY(-2px)}
.cl .cd.f{color:#c8504a}
.cl .cd.f:after,.cl .cd.p:after,.cl .cd.c:after{content:'';position:absolute;top:0;right:0;border-style:solid;border-width:0 11px 11px 0;border-color:transparent #3fa38a transparent transparent}
.cl .cd.f:after{border-right-color:#c8504a}.cl .cd.p:after{border-right-color:#e0a020}
.cl .cd.fd:before{content:'';position:absolute;left:0;right:0;bottom:0;height:3px;background:#e8761a}
.cl .cd.t{background:#ffe9a0;box-shadow:0 0 0 3px #3b6fd8}
.cl .cd.t:not(.s){animation:cltb 1s steps(2) infinite}
@keyframes cltb{50%{box-shadow:0 0 0 3px #8db4ff}}
.cl .cd.s{box-shadow:0 0 0 3px #3fa38a;animation:clpop .22s steps(3)}.cl .cd.t.s{box-shadow:0 0 0 3px #3b6fd8,0 0 0 5px #3fa38a}
@keyframes clpop{from{transform:scale(1.22)}to{transform:none}}
.cl .i,.cl .i2{position:absolute;background-repeat:no-repeat;image-rendering:pixelated}
.cl .i{right:2px;bottom:2px;width:58%;height:58%;background-size:contain;background-position:right bottom}
.cl .i.lu{width:42%;height:42%;opacity:.85}
.cl .i2{left:2px;bottom:2px;width:34%;height:34%;background-size:contain;background-position:left bottom}
.cl .cd.fd .i,.cl .cd.fd .i2{bottom:5px}
.cl .nd{position:absolute;left:4px;top:16px;width:5px;height:5px;background:#ffd23f;box-shadow:0 0 0 2px #14100e}
.cl .st{display:flex;justify-content:space-around;margin:10px 3px 0;font-size:6px;line-height:9px;color:#8a6a40;text-align:center}
.cl .st b{display:block;font-weight:normal;font-size:12px;line-height:16px;color:#5a3519}
.cl .mg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 3px 10px}
.cl .mb{display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:6px;min-height:64px;padding:9px 4px 7px;border:0;font:inherit;font-size:8px;color:#2a1c10;background:#fffdf0;box-shadow:0 0 0 2px #e6d9aa;cursor:pointer}
.cl .mb:hover{transform:translateY(-2px)}
.cl .mb.t{background:#ffe9a0;box-shadow:0 0 0 3px #3b6fd8}
.cl .mb.s{box-shadow:0 0 0 3px #3fa38a}.cl .mb.t.s{box-shadow:0 0 0 3px #3b6fd8,0 0 0 5px #3fa38a}
.cl .mi{display:flex;gap:4px;min-height:18px}
.cl .mi i{width:18px;height:18px;background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated}
.cl .dt{min-height:46px;background:#fffdf0;box-shadow:0 0 0 3px #e6d9aa;padding:9px;margin:14px 3px 10px;font-size:7px;line-height:13px;color:#2a1c10}
.cl .dh b{font-weight:normal;font-size:8px;line-height:12px;color:#5a3519}
.cl .dh small{display:flex;align-items:center;gap:6px;margin-top:5px;font-size:6px;line-height:9px;color:#8a6a40}
.cl .dh small i,.cl .no i,.cl .fdb i{flex:none;background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated}
.cl .dh small i{width:14px;height:14px}
.cl .ev{display:flex;align-items:center;gap:10px;margin-top:9px}
.cl .ev>i{flex:none;width:30px;height:30px;background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated}
.cl .ev em{display:block;margin-top:3px;font-style:normal;font-size:6px}
.cl .fdb{display:flex;align-items:center;gap:8px;margin-top:9px;padding:7px 8px;background:#ffd9a8;box-shadow:0 0 0 2px #e8761a;color:#7a3a05;font-size:6px;line-height:10px}
.cl .fdb i{width:22px;height:22px}
.cl .fdb.tp{background:#e2f4ee;box-shadow:0 0 0 2px #3fa38a;color:#1d4f45}
.cl .no{display:flex;align-items:center;gap:7px;margin-top:7px}
.cl .no i{width:14px;height:14px}
.cl .no span{flex:1;min-width:0;word-break:break-word}
.cl .x{flex:none;font:inherit;font-size:7px;line-height:1;color:#fff;background:#c8504a;border:0;padding:5px 6px;cursor:pointer;box-shadow:0 0 0 2px #5a1f1a}
.cl .nr{display:flex;gap:7px;margin-top:10px}
.cl .ni{flex:1;min-width:0;font:inherit;font-size:7px;padding:8px 7px;border:0;background:#fff;color:#2a1c10;box-shadow:inset 2px 2px #d9cfa0,0 0 0 2px #5a3519;outline:none}
.cl .ni::placeholder{color:#a8996a}
.cl .ni:focus{box-shadow:inset 2px 2px #d9cfa0,0 0 0 2px #3b6fd8}
.cl .nr .k{padding:6px 10px}
.cl .lg{display:flex;flex-wrap:wrap;gap:10px;margin:0 3px 12px;font-size:6px;line-height:10px;color:#8a6a40}
.cl .lg span:before{content:'';display:inline-block;width:8px;height:8px;margin-right:4px;vertical-align:-1px;background:var(--c)}
.cl .ft{display:flex;align-items:center;gap:8px}
.cl .ft .sp{flex:1}
.pt{position:fixed;z-index:60;pointer-events:none;image-rendering:pixelated;box-shadow:0 0 0 1px #14100e}
.hw .cl{background:#2a1a3a;border-color:#14061c;color:#ffb060;box-shadow:inset 0 -4px #1c1028,0 0 24px rgba(255,120,30,.4),8px 8px 0 rgba(0,0,0,.5)}
.hw .cl .hd{background:#e8761a;color:#2a1408;box-shadow:inset 0 -4px #a8480a}
.hw .cl .hd:before,.hw .cl .hd:after{background:#2a1a3a;box-shadow:0 0 0 2px #14061c}
.hw .cl .tt{text-shadow:2px 2px #ffa84a}
.hw .cl .k{color:#2a1408;background:#e8761a;box-shadow:inset -3px -3px #a8480a,inset 3px 3px #ffa84a,0 0 0 3px #3a1408}
.hw .cl .k.g2{color:#fff;background:#7a3ad0;box-shadow:inset -3px -3px #4a1f8a,inset 3px 3px #a878f0,0 0 0 3px #1c0a3a}
.hw .cl .hd .k{background:#7a3ad0;color:#fff;box-shadow:inset -3px -3px #4a1f8a,inset 3px 3px #a878f0,0 0 0 3px #1c0a3a}
.hw .cl .wd,.hw .cl .lg,.hw .cl .st,.hw .cl .dh small{color:#c9a0e8}
.hw .cl .st b,.hw .cl .dh b{color:#ffb060}
.hw .cl .cd{color:#f0e0ff;background:#1c1028;box-shadow:0 0 0 2px #3c2a54}
.hw .cl .cd.w{background:#241636}
.hw .cl .cd.f{color:#ff8a6a}
.hw .cl .cd.t{background:#4a2a14;box-shadow:0 0 0 3px #e8761a}
.hw .cl .cd.t:not(.s){animation-name:clth}
@keyframes clth{50%{box-shadow:0 0 0 3px #ffb060}}
.hw .cl .cd.s{box-shadow:0 0 0 3px #b070ff}.hw .cl .cd.t.s{box-shadow:0 0 0 3px #e8761a,0 0 0 5px #b070ff}
.hw .cl .mb{color:#f0e0ff;background:#1c1028;box-shadow:0 0 0 2px #3c2a54}
.hw .cl .mb.t{background:#4a2a14;box-shadow:0 0 0 3px #e8761a}
.hw .cl .mb.s{box-shadow:0 0 0 3px #b070ff}.hw .cl .mb.t.s{box-shadow:0 0 0 3px #e8761a,0 0 0 5px #b070ff}
.hw .cl .bn{color:#f0e0ff;background:#4a2a14;box-shadow:0 0 0 3px #e8761a}
.hw .cl .bn b{color:#ffb060}
.hw .cl .dt{background:#1c1028;color:#f0e0ff;box-shadow:0 0 0 3px #3c2a54}
.hw .cl .fdb{background:#4a2a14;color:#ffd0a0;box-shadow:0 0 0 2px #e8761a}
.hw .cl .fdb.tp{background:#1f3a3a;color:#b8f0e0;box-shadow:0 0 0 2px #3fa38a}
.hw .cl .ni{background:#120a1c;color:#f0e0ff;box-shadow:inset 2px 2px #000,0 0 0 2px #5a3a7a}
.hw .cl .ni:focus{box-shadow:inset 2px 2px #000,0 0 0 2px #e8761a}
@media (prefers-reduced-motion:reduce){.cl *,#calb .bi{animation:none!important}}`;
document.head.appendChild(css);

/* ---------- botão + janela ---------- */
const hwOn=()=>document.documentElement.classList.contains('hw');
const b=document.createElement('button');b.id='calb';document.body.appendChild(b);
const ov=document.createElement('div');ov.className='cl-o';const bx=document.createElement('div');bx.className='cl';
bx.setAttribute('role','dialog');bx.setAttribute('aria-modal','true');bx.setAttribute('aria-label','Calendário');
ov.appendChild(bx);document.body.appendChild(ov);
let Y,Mo,sel=0,view='d',an='',hk='';
const agora=()=>{const d=new Date();return[d.getFullYear(),d.getMonth(),d.getDate()]};

function btn(){const[y,m,d]=agora(),L=hol(y)[m+'-'+d]||[],nn=(notes[nk(y,m,d)]||[]).length;
  b.innerHTML=`<span class="h">${MS[m]}</span><span class="n">${d}</span>`+(L[0]?`<i class="bi" ${bg(L[0].i)}></i>`:'')+(nn?'<span class="bd"></span>':'');
  b.setAttribute('aria-label','Abrir calendário'+(L[0]?' — hoje: '+L.map(x=>x.n).join(', '):''));
  const k=y+'-'+m+'-'+d;if(hk&&hk!==k&&ov.classList.contains('on'))render();hk=k}

function viewM(H,ty,tm){
  return'<div class="mg">'+MS.map((n,m)=>{
    const ks=Object.keys(H).filter(k=>k.split('-')[0]==m).sort((a,c)=>a.split('-')[1]-c.split('-')[1]).slice(0,3);
    return`<button class="mb${Y==ty&&m==tm?' t':''}${m==Mo?' s':''}" data-m="${m}" aria-label="${MES[m]}"><span>${n}</span><span class="mi">${ks.map(k=>`<i ${bg(H[k][0].i)}></i>`).join('')}</span></button>`}).join('')+'</div>'}

function render(){
  const ke=bx.querySelector('.ni'),kv=ke?ke.value:'',kf=ke&&document.activeElement===ke;
  const[ty,tm,td]=agora(),H=hol(Y),ix=Y*12+Mo,mm=view=='m',h0=new Date(ty,tm,td);
  let body;
  if(mm)body=viewM(H,ty,tm);
  else{
    const first=new Date(Y,Mo,1).getDay(),dim=new Date(Y,Mo+1,0).getDate(),seen={};
    let cells='<span></span>'.repeat(first),nf=0,nu=0,nfd=0;
    for(let d=1;d<=dim;d++){
      const L=H[Mo+'-'+d]||[],w=new Date(Y,Mo,d).getDay(),isF=L.some(x=>x.t=='f'),
        t=isF?'f':L.some(x=>x.t=='p')?'p':L.length?'c':'',r=run(Y,Mo,d),nn=(notes[nk(Y,Mo,d)]||[]).length,
        li=lidx(lua(new Date(Y,Mo,d)));
      if(isF)nf++;if(w&&w<6&&!isF)nu++;if(r&&!seen[+r.a]){seen[+r.a]=1;nfd++}
      cells+=`<button class="cd ${t}${w==0||w==6?' w':''}${r?' fd':''}${Y==ty&&Mo==tm&&d==td?' t':''}${sel==d?' s':''}" data-d="${d}"${L.length?` title="${L.map(x=>x.n).join(' / ')}"`:''}>${d}`+
        (L[0]?`<i class="i" ${bg(L[0].i)}></i>`:(li==0||li==4)?`<i class="i lu" ${bg('l'+li)}></i>`:'')+
        (L[1]?`<i class="i2" ${bg(L[1].i)}></i>`:'')+(nn?'<span class="nd"></span>':'')+'</button>'}
    let det;
    if(sel){
      const dt=new Date(Y,Mo,sel),L=H[Mo+'-'+sel]||[],n=Math.round((dt-h0)/864e5),li=lidx(lua(dt)),r=run(Y,Mo,sel),
        ns=notes[nk(Y,Mo,sel)]||[],wd=dt.getDay(),isF=L.some(x=>x.t=='f');
      det=`<span class="dh"><b>${DSF[wd]}, ${sel} de ${MES[Mo]} de ${Y}</b><small><i ${bg('l'+li)}></i>${LN[li]} · ${rel(n)}</small></span>`
        +(L.length?L.map(x=>`<div class="ev"><i ${bg(x.i)}></i><span>${x.n}<em style="color:${COR[x.t]}">${TIPO[x.t]}</em></span></div>`).join(''):'<div class="ev">Nenhuma data especial.</div>')
        +(r?`<div class="fdb"><i ${bg('mala')}></i><span>FERIADÃO!<br>${r.n} dias de folga: ${f2(r.a)} a ${f2(r.b)}</span></div>`
          :(isF&&(wd==2||wd==4))?`<div class="fdb tp"><i ${bg('mala')}></i><span>DICA: emende ${wd==4?'a sexta':'a segunda'} e ganhe 4 dias seguidos de folga!</span></div>`:'')
        +ns.map((t,i)=>`<div class="no"><i ${bg('nota')}></i><span>${esc(t)}</span><button class="x" data-a="del" data-i="${i}" aria-label="Apagar lembrete">X</button></div>`).join('')
        +(ns.length<6?`<div class="nr"><input class="ni" maxlength="40" placeholder="Novo lembrete..." aria-label="Novo lembrete"><button class="k g2" data-a="add" aria-label="Adicionar lembrete">+</button></div>`:'')}
    else det='Toque em um dia para ver os detalhes e criar lembretes.';
    body=`<div class="wd">${DS.map(x=>`<span>${x}</span>`).join('')}</div><div class="gr ${an}">${cells}</div>
      <div class="st"><span><b>${nf}</b>${nf==1?'feriado':'feriados'}</span><span><b>${nu}</b>dias úteis</span><span><b>${nfd}</b>${nfd==1?'feriadão':'feriadões'}</span></div>
      <div class="dt">${det}</div>`}
  /* banner: hoje ou próxima data */
  const hj=hol(ty)[tm+'-'+td]||[],nx=proximo();let bn='';
  if(hj[0])bn=`<button class="bn" data-a="hoje"><i ${bg(hj[0].i)}></i><span><b>HOJE</b> ${hj.map(x=>x.n).join(' / ')}`+(nx?`<br>Depois: ${nx.L[0].n}, ${rel(Math.round((nx.dt-h0)/864e5))}`:'')+'</span></button>';
  else if(nx)bn=`<button class="bn" data-a="prox"><i ${bg(nx.L[0].i)}></i><span>Próxima data<br><b>${nx.L[0].n}</b> ${rel(Math.round((nx.dt-h0)/864e5))}</span></button>`;
  const pv=mm?Y<=MIN/12:ix<=MIN,nxt=mm?Y>=Math.floor(MAX/12):ix>=MAX;
  bx.innerHTML=`<div class="hd"><button class="k" data-a="${mm?'py':'prev'}"${pv?' disabled':''} aria-label="Anterior">&lt;</button>
    <button class="tt" data-a="pick" aria-label="Escolher mês e ano">${hwOn()?`<i class="hi" ${bg('abobora')}></i>`:''}${mm?Y:MES[Mo]+'<br>'+Y}</button>
    <button class="k" data-a="${mm?'ny':'next'}"${nxt?' disabled':''} aria-label="Próximo">&gt;</button></div>
    ${bn}${body}
    <div class="lg"><span style="--c:#c8504a">Feriado</span><span style="--c:#e0a020">Facultativo</span><span style="--c:#3fa38a">Comemorativa</span><span style="--c:#e8761a">Feriadão</span></div>
    <div class="ft"><button class="k g2" data-a="hoje">Hoje</button><span class="sp"></span><button class="k sn${snd?'':' off'}" data-a="som" aria-pressed="${snd}">SOM</button><button class="k" data-a="fechar">Fechar</button></div>`;
  const ni=bx.querySelector('.ni');if(ni){if(kv)ni.value=kv;if(kf)ni.focus()}}

function ir(ix){ix=Math.max(MIN,Math.min(MAX,ix));Y=Math.floor(ix/12);Mo=ix%12}
function go(ix,d){const o=Y*12+Mo,[ty,tm,td]=agora();ir(ix);const dim=new Date(Y,Mo+1,0).getDate(),n=Y*12+Mo;
  sel=d===undefined?(Y==ty&&Mo==tm?td:0):Math.min(d,dim);an=n>o?'sl':n<o?'sr':'';if(RM)an='';view='d';render();an=''}
const mv=n=>{const t=add(sel?new Date(Y,Mo,sel):new Date(Y,Mo,1),n);go(t.getFullYear()*12+t.getMonth(),t.getDate())};
function hojeAct(){const[y,m,d]=agora();go(y*12+m,d);som.nav()}
function abrir(){const[y,m,d]=agora();view='d';ir(y*12+m);sel=(Y==y&&Mo==m)?d:0;render();ov.classList.add('on');som.nav()}
const fechar=()=>ov.classList.remove('on');

/* partículas pixel ao tocar numa data especial */
function burst(el,key){if(RM)return;const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,cs=cores(key);
  for(let i=0;i<16;i++){const p=document.createElement('i');p.className='pt';const s=4+(i%3)*2;
    p.style.cssText=`left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${cs[i%cs.length]}`;ov.appendChild(p);
    const a=Math.PI*2*i/16+Math.random()*.4,v=34+Math.random()*46,dx=Math.cos(a)*v,dy=Math.sin(a)*v;
    p.animate([{transform:'translate(-50%,-50%)',opacity:1},{transform:`translate(${dx}px,${dy-18}px)`,opacity:1,offset:.45},{transform:`translate(${dx*1.1}px,${dy+26}px)`,opacity:0}],{duration:720,easing:'steps(9)'}).onfinish=()=>p.remove()}}

function addNote(){const i=bx.querySelector('.ni');if(!i||!sel)return;const t=i.value.trim();if(!t)return;
  const k=nk(Y,Mo,sel);(notes[k]=notes[k]||[]).push(t.slice(0,40));LS.set('cal_notes',notes);i.value='';som.ok();render();btn();
  const n=bx.querySelector('.ni');if(n)n.focus()}

b.onclick=abrir;ov.onclick=e=>{if(e.target===ov)fechar()};
addEventListener('keydown',e=>{if(!ov.classList.contains('on'))return;
  if(e.key=='Escape'){if(view=='m'){view='d';render()}else fechar();return}
  if(e.target.tagName=='INPUT'){if(e.key=='Enter'){e.preventDefault();addNote()}return}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const k={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];
  if(k){e.preventDefault();if(view=='m'){view='d';render()}mv(k);som.sel()}
  else if(e.key=='PageUp'){e.preventDefault();go(Y*12+Mo-1);som.nav()}
  else if(e.key=='PageDown'){e.preventDefault();go(Y*12+Mo+1);som.nav()}
  else if(e.key=='Home'||e.key=='t'||e.key=='T')hojeAct()});

/* deslizar para trocar de mês */
let tx=null,ty0=0;
bx.addEventListener('touchstart',e=>{if(e.target.tagName=='INPUT'){tx=null;return}const t=e.touches[0];tx=t.clientX;ty0=t.clientY},{passive:true});
bx.addEventListener('touchend',e=>{if(tx==null||view!='d')return;const t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty0;tx=null;
  if(Math.abs(dx)>50&&Math.abs(dy)<40){go(Y*12+Mo+(dx<0?1:-1));som.nav()}},{passive:true});

bx.addEventListener('click',e=>{
  const c=e.target.closest('.cd'),m=e.target.closest('.mb'),a=e.target.closest('[data-a]');
  if(c){const d=+c.dataset.d,L=hol(Y)[Mo+'-'+d]||[];sel=d;if(L[0]){burst(c,L[0].i);som.fest()}else som.sel();render();return}
  if(m){go(Y*12+(+m.dataset.m));som.nav();return}
  if(!a)return;const v=a.dataset.a;
  if(v=='prev'){go(Y*12+Mo-1);som.nav()}
  else if(v=='next'){go(Y*12+Mo+1);som.nav()}
  else if(v=='py'||v=='ny'){ir((Y+(v=='py'?-1:1))*12+Mo);render();som.nav()}
  else if(v=='pick'){view=view=='m'?'d':'m';render();som.nav()}
  else if(v=='hoje')hojeAct();
  else if(v=='prox'){const n=proximo();if(n)go(n.dt.getFullYear()*12+n.dt.getMonth(),n.dt.getDate());som.nav()}
  else if(v=='add')addNote();
  else if(v=='del'){const k=nk(Y,Mo,sel),l=notes[k]||[];l.splice(+a.dataset.i,1);if(!l.length)delete notes[k];LS.set('cal_notes',notes);som.del();render();btn()}
  else if(v=='som'){snd=!snd;LS.set('cal_snd',snd);som.ok();render()}
  else fechar()});
new MutationObserver(()=>{if(ov.classList.contains('on'))render()}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
btn();setInterval(btn,30000);
})();