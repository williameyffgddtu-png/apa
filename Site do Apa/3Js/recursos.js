/* recursos.js — carregar DEPOIS de paginaincial.js e halloween.js.
   Faz: esconde o ícone do minigame SÓ enquanto o bloco de notas está aberto · bloco de notas maior com moldura do tema · ícone de configurações
   (letra, daltonismo, inverter cores, alto contraste, idioma, senha, animações, sons, foco) ·
   ícone do perfil do tamanho do ícone de tema + legenda "Perfil" · perfil maior, com moldura, bio e busca.
   Sem este arquivo o site funciona normal. */
(()=>{
const KS='nocturne-acess',D0={fs:100,ls:0,dal:'0',inv:0,hc:0,gs:0,rm:0,mute:0,foc:0,lang:'pt'};
let S;try{S={...D0,...JSON.parse(localStorage.getItem(KS)||'{}')}}catch(e){S={...D0}}
const save=()=>{try{localStorage.setItem(KS,JSON.stringify(S))}catch(e){}};
const root=document.documentElement,q1=s=>document.querySelector(s);
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const hwOn=()=>root.classList.contains('hw');
const profBox=q1('.pfo .pfc'); /* perfil (existe só com login); pegar ANTES de criar o painel de configurações */

/* ---------- 1) esconde o ícone do minigame SÓ com o bloco de notas aberto ---------- */
const gameEls=new Set();
const findGame=()=>{
  const cvEl=document.getElementById('cv');
  document.querySelectorAll('a,button,div,canvas,img').forEach(el=>{
    if(el===document.body||el===root||el.id==='cfgo'||el.closest('#cfgo')||(cvEl&&el.contains(cvEl))||el.querySelector('.pad'))return;
    const s=[el.id,el.className&&el.className.baseVal===undefined?el.className:'',el.getAttribute('href'),el.title,el.getAttribute('aria-label')].join(' ');
    if(/game|jogo/i.test(s))gameEls.add(el)})};
/* mesma condição que a coruja usa para ir ao canto: o editor de notas (#ed) com a classe 'on' */
const padOpen=()=>{const ed=document.getElementById('ed');return !!(ed&&ed.classList.contains('on'))};
const syncGame=()=>{const h=padOpen();gameEls.forEach(el=>el.classList.toggle('a-hide',h))};

/* ---------- CSS ---------- */
const css=document.createElement('style');
css.textContent=`
.a-hide{display:none!important}
html{--fs:1}
#nt{font-size:calc(var(--bnt,12px)*var(--fs))!important}
#ntt{font-size:calc(var(--bntt,12px)*var(--fs))!important}
.mini .mt{font-size:calc(var(--bmt,8px)*var(--fs))!important}
html.a-ls #nt,html.a-ls #ntt{line-height:2.1!important;letter-spacing:.08em!important;word-spacing:.18em!important}
html.a-foc *:focus-visible{outline:4px solid #ffd84a!important;outline-offset:3px!important}
/* bloco de notas: maior + moldura do tema (margem dupla) */
.pad{zoom:1.25;box-shadow:0 0 0 4px #14295e,0 0 0 8px #4da3ff,0 0 0 12px #14295e,10px 14px 0 12px rgba(0,0,0,.28)!important;outline:2px dashed rgba(77,163,255,.75);outline-offset:-10px}
.hw .pad{box-shadow:0 0 0 4px #14061c,0 0 0 8px #e8761a,0 0 0 12px #14061c,0 0 26px 12px rgba(255,120,30,.38)!important;outline:2px dashed rgba(184,112,220,.85);outline-offset:-10px}
@media(max-width:520px){.pad{zoom:1.1}}
/* perfil: maior, mesma moldura do bloco de notas */
.pfc{width:min(94vw,560px)!important;max-height:92vh!important;padding:26px 18px 18px!important;box-shadow:0 0 0 4px #14295e,0 0 0 8px #4da3ff,0 0 0 12px #14295e,10px 14px 0 12px rgba(0,0,0,.35)!important;outline:2px dashed rgba(77,163,255,.7);outline-offset:-10px}
.hw .pfc{box-shadow:0 0 0 4px #14061c,0 0 0 8px #e8761a,0 0 0 12px #14061c,0 0 28px 12px rgba(255,120,30,.4)!important;outline:2px dashed rgba(184,112,220,.85)}
.pfc .lst{min-height:200px!important}
.pfc{zoom:calc(1 + (var(--fs) - 1)*.5)}
.pfc .bio{margin:0 3px 12px;padding:10px;background:rgba(255,255,255,.55);box-shadow:0 0 0 3px #e6d9aa;font-size:8px;line-height:14px}
.pfc .bio textarea{display:block;width:100%;box-sizing:border-box;min-height:54px;resize:vertical;font:inherit;font-size:8px;line-height:13px;color:#2a1c10;background:#fffdf0;border:0;padding:8px;outline:0;box-shadow:inset 3px 3px #e6d9aa}
.pfc .bio .cnt{font-size:6px;color:#8a6a40;margin:4px 0 6px}
.pfc .bio p{margin:0;white-space:pre-wrap;word-break:break-word}
.pfc .bsc{width:calc(100% - 7px);box-sizing:border-box;margin:0 4px 8px 3px;font:inherit;font-size:8px;color:#2a1c10;background:#fffdf0;border:0;padding:8px;outline:0;box-shadow:inset 3px 3px #e6d9aa,0 0 0 3px #5a3519}
.hw .pfc .bio{background:#1c1028;box-shadow:0 0 0 3px #3c2a54;color:#f0e0ff}
.hw .pfc .bio textarea,.hw .pfc .bsc{color:#f0e0ff;background:#1c1028;box-shadow:inset 3px 3px #0e0718,0 0 0 3px #14061c}
.cfgp .row{display:flex;flex-wrap:wrap;gap:8px;margin:0 3px 12px;align-items:center}
.cfgp .tit{font-size:8px;margin:12px 3px 8px;opacity:.9}
.cfgp .val{font-size:9px;min-width:54px;text-align:center}
.cfgp .msg{font-size:7px;line-height:12px;margin:4px 3px 8px;min-height:12px}
.cfgp .lst{flex:1;overflow-y:auto}
.cfw{position:relative;display:inline-block}
.cap{position:absolute;top:calc(100% + 6px);left:50%;transform:translateX(-50%);font:7px 'Press Start 2P',monospace;color:#fff;text-shadow:1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;white-space:nowrap;pointer-events:none}
#usr{padding:0!important}
#usr .ap{width:calc(var(--ib,40px) - 8px)!important;height:calc(var(--ib,40px) - 8px)!important;margin:auto}
`;
document.head.appendChild(css);

/* ---------- 2) tamanhos-base das letras (para o A+ / A−) ---------- */
const base=()=>{const m=(id,v)=>{const e=document.getElementById(id);if(e){const f=parseFloat(getComputedStyle(e).fontSize);if(f)root.style.setProperty(v,f+'px')}};
  m('nt','--bnt');m('ntt','--bntt');const mt=q1('.mini .mt');if(mt)root.style.setProperty('--bmt',(parseFloat(getComputedStyle(mt).fontSize)||8)+'px')};

/* ---------- 3) ícone de configurações (engrenagem) ---------- */
const tgEl=document.getElementById('tg'),act=q1('.act');
const gear=document.createElement('canvas');gear.width=gear.height=16;gear.style.cssText='display:block;width:32px;height:32px;image-rendering:pixelated';
const cfg=document.createElement('button');cfg.id='cfg';cfg.type='button';cfg.title='Configurações';cfg.setAttribute('aria-label','Configurações');
cfg.className=tgEl?tgEl.className:'btn alt';cfg.appendChild(gear);
const cfw=document.createElement('div');cfw.className='cfw';cfw.appendChild(cfg);
const cap=(el,t)=>{const s=document.createElement('span');s.className='cap';s.textContent=t;el.appendChild(s)};
cap(cfw,'Config.');
if(tgEl&&tgEl.parentNode)tgEl.parentNode.insertBefore(cfw,tgEl);else if(act)act.appendChild(cfw);
function drawGear(){const g=gear.getContext('2d'),hl=hwOn(),a=hl?'#ffa84a':'#cfd8ff',o=hl?'#8a3a10':'#14295e';g.clearRect(0,0,16,16);
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){const dx=x-7.5,dy=y-7.5,d=Math.hypot(dx,dy),an=Math.atan2(dy,dx),tooth=Math.cos(an*8)>.25;
    const body=d<5.4&&d>2.5||(tooth&&d>=5.4&&d<7.6);if(body){g.fillStyle=d>6.4?o:a;g.fillRect(x,y,1,1)}}}
drawGear();

/* ---------- 4) perfil: mesmo tamanho do ícone de tema + legenda ---------- */
const usr=document.getElementById('usr');
const sizeIcons=()=>{if(!tgEl)return;const r=tgEl.getBoundingClientRect();if(!r.width)return;const s=Math.round(Math.max(r.width,r.height));
  root.style.setProperty('--ib',s+'px');if(usr){usr.style.width=s+'px';usr.style.height=s+'px'}};
if(usr&&usr.parentElement){cap(usr.parentElement,'Perfil')}
sizeIcons();addEventListener('resize',sizeIcons);setTimeout(sizeIcons,400);

/* ---------- 5) idioma (traduz textos e atributos do site) ---------- */
const DICT={
'Configurações':['Settings','Configuración'],'Texto':['Text','Texto'],'Tamanho da letra':['Letter size','Tamaño de letra'],
'Espaçamento maior':['Wider spacing','Más espacio'],'Cores e visão':['Colors & vision','Colores y visión'],'Daltonismo':['Color blindness','Daltonismo'],
'Nenhum':['None','Ninguno'],'Protanopia':['Protanopia','Protanopía'],'Deuteranopia':['Deuteranopia','Deuteranopía'],'Tritanopia':['Tritanopia','Tritanopía'],
'Inverter cores':['Invert colors','Invertir colores'],'Alto contraste':['High contrast','Alto contraste'],'Tons de cinza':['Grayscale','Escala de grises'],
'Idioma':['Language','Idioma'],'Movimento e som':['Motion & sound','Movimiento y sonido'],'Reduzir animações':['Reduce animations','Reducir animaciones'],
'Silenciar sons':['Mute sounds','Silenciar sonidos'],'Destacar foco':['Highlight focus','Resaltar foco'],'Alterar senha':['Change password','Cambiar contraseña'],
'Senha atual':['Current password','Contraseña actual'],'Nova senha':['New password','Nueva contraseña'],'Repetir nova senha':['Repeat new password','Repetir nueva contraseña'],
'Salvar senha':['Save password','Guardar contraseña'],'Restaurar padrão':['Restore defaults','Restablecer'],'Fechar':['Close','Cerrar'],
'Faça login para alterar a senha.':['Log in to change your password.','Inicia sesión para cambiar la contraseña.'],
'Senha alterada!':['Password changed!','¡Contraseña cambiada!'],'Senha atual incorreta.':['Wrong current password.','Contraseña actual incorrecta.'],
'As senhas não conferem.':['Passwords do not match.','Las contraseñas no coinciden.'],'Mínimo de 6 caracteres.':['At least 6 characters.','Mínimo 6 caracteres.'],
'Conta não encontrada neste navegador.':['Account not found in this browser.','Cuenta no encontrada en este navegador.'],
'Não achei onde a senha fica salva.':['Could not find where the password is stored.','No encontré dónde se guarda la contraseña.'],
'Config.':['Settings','Config.'],'Perfil':['Profile','Perfil'],'Sobre mim':['About me','Sobre mí'],'Salvar':['Save','Guardar'],'Salvar bio':['Save bio','Guardar bio'],
'Ainda sem bio.':['No bio yet.','Sin bio aún.'],'Buscar...':['Search...','Buscar...'],'Escreva algo sobre você...':['Write something about you...','Escribe algo sobre ti...'],
'Excluir':['Delete','Eliminar'],'Confirmar?':['Confirm?','¿Confirmar?'],'Ver perfil':['View profile','Ver perfil'],'Sair':['Log out','Salir'],
'Trocar foto':['Change photo','Cambiar foto'],'Meu perfil':['My profile','Mi perfil'],'Posts':['Posts','Publicaciones'],'posts':['posts','publicaciones'],
'Seguidores':['Followers','Seguidores'],'seguidores':['followers','seguidores'],'Seguindo':['Following','Siguiendo'],'seguindo':['following','siguiendo'],
'Descobrir':['Discover','Descubrir'],'Seguir':['Follow','Seguir'],'Ver':['View','Ver'],'Publicar':['Publish','Publicar'],'Cancelar':['Cancel','Cancelar'],
'+ Publicar anotação':['+ Publish note','+ Publicar nota'],'Renomear':['Rename','Renombrar'],'Atualizar':['Update','Actualizar'],'Remover':['Remove','Quitar'],
'Nenhuma publicação ainda.':['No posts yet.','Aún no hay publicaciones.'],'Nenhuma publicação.':['No posts.','Sin publicaciones.'],
'Escolha seu avatar':['Choose your avatar','Elige tu avatar'],'Avatares de Halloween':['Halloween avatars','Avatares de Halloween'],'Padrão':['Default','Predeterminado'],
'Sem título':['Untitled','Sin título'],'Nenhuma nota.':['No notes.','Sin notas.'],'Toque em + Novo':['Tap + New','Toca + Nuevo'],'+ Novo':['+ New','+ Nuevo'],
'Voltar da festividade':['Back from the festivity','Volver de la festividad'],'Ninguém segue ainda.':['No followers yet.','Nadie sigue aún.'],
'Não segue ninguém ainda.':['Not following anyone yet.','No sigue a nadie aún.'],'Nome da publicação':['Post name','Nombre de la publicación'],
'1. Escolha a anotação':['1. Pick the note','1. Elige la nota'],'2. Dê um nome à publicação':['2. Name your post','2. Ponle nombre'],
'Hoo!':['Hoo!','¡Hoo!'],'Hoo hoo!':['Hoo hoo!','¡Hoo hoo!'],'Boo!':['Boo!','¡Bu!'],'Quem? Hu-uu!':['Who? Hoo-oo!','¿Quién? ¡Hu-uu!'],'Escreva algo!':['Write something!','¡Escribe algo!'],
'Hoo! Faça seu registro antes de escrever! (toque aqui)':['Hoo! Sign up before writing! (tap here)','¡Hoo! ¡Regístrate antes de escribir! (toca aquí)'],
'Crie uma nota primeiro!':['Create a note first!','¡Crea una nota primero!'],'Publicado no seu perfil! Hoo!':['Posted to your profile! Hoo!','¡Publicado en tu perfil! Hoo!'],
'Registrar':['Sign up','Registrarse'],'Registre-se':['Sign up','Regístrate'],'Entrar':['Log in','Entrar']};
const TN=new WeakMap();
function trNode(n){const s=n.data,k=s.trim();if(!k)return;const r=TN.get(n),o=r&&k===r.t?r.o:k;
  if(S.lang==='pt'){if(r&&k===r.t){n.data=s.replace(k,r.o);TN.delete(n)}return}
  const e=DICT[o];if(!e)return;const t=e[S.lang==='en'?0:1];if(k===t)return;TN.set(n,{o,t});n.data=s.replace(k,t)}
function trAttrs(el){['placeholder','title','aria-label'].forEach(a=>{const v=el.getAttribute&&el.getAttribute(a);if(!v)return;const ka='data-o-'+a,o=el.getAttribute(ka)||v;
  if(S.lang==='pt'){if(el.hasAttribute(ka)){el.setAttribute(a,el.getAttribute(ka));el.removeAttribute(ka)}return}
  const e=DICT[o];if(!e)return;const t=e[S.lang==='en'?0:1];if(v===t)return;el.setAttribute(ka,o);el.setAttribute(a,t)})}
function walk(n){if(n.nodeType===3){trNode(n);return}if(n.nodeType!==1||/^(SCRIPT|STYLE|CANVAS)$/.test(n.tagName))return;trAttrs(n);n.childNodes.forEach(walk)}
new MutationObserver(ms=>ms.forEach(m=>{if(m.type==='characterData')trNode(m.target);else if(m.type==='attributes')trAttrs(m.target);else m.addedNodes.forEach(walk)}))
  .observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});

/* ---------- 6) aplicar configurações ---------- */
const MX={p:[[.567,.433,0],[.558,.442,0],[0,.242,.758]],d:[[.625,.375,0],[.7,.3,0],[0,.3,.7]],t:[[.95,.05,0],[0,.433,.567],[0,.475,.525]]};
const ER={p:[[0,0,0],[.7,1,0],[.7,0,1]],d:[[0,0,0],[.7,1,0],[.7,0,1]],t:[[1,0,.7],[0,1,.7],[0,0,0]]};
function matrix(k){const Sm=MX[k],Em=ER[k],I=[[1,0,0],[0,1,0],[0,0,1]],M=[[0,0,0],[0,0,0],[0,0,0]];
  for(let i=0;i<3;i++)for(let j=0;j<3;j++){let v=I[i][j];for(let l=0;l<3;l++)v+=Em[i][l]*(I[l][j]-Sm[l][j]);M[i][j]=v}
  return M.map(r=>r.join(' ')+' 0 0').join(' ')+' 0 0 0 1 0'}
const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('width',0);svg.setAttribute('height',0);svg.style.position='absolute';
svg.innerHTML='<filter id="cfgdal" color-interpolation-filters="sRGB"><feColorMatrix id="cfgm" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter>';
document.body.appendChild(svg);
const origCroak=window.croak,origFrame=window.frame;let lastRM=0;
if(typeof origFrame==='function')window.frame=function(t){if(S.rm&&t-lastRM<300)return;lastRM=t;origFrame(t)};
function apply(){
  root.style.setProperty('--fs',S.fs/100);root.classList.toggle('a-ls',!!S.ls);root.classList.toggle('a-foc',!!S.foc);
  const f=[];if(S.dal!=='0'){document.getElementById('cfgm').setAttribute('values',matrix(S.dal));f.push('url(#cfgdal)')}
  if(S.inv)f.push('invert(1) hue-rotate(180deg)');if(S.hc)f.push('contrast(1.35) saturate(1.2)');if(S.gs)f.push('grayscale(1)');
  root.style.filter=f.join(' ');
  if(typeof origCroak==='function')window.croak=S.mute?()=>{}:origCroak;
  root.lang={pt:'pt-BR',en:'en',es:'es'}[S.lang];walk(document.body)}

/* ---------- 7) painel de configurações (reaproveita o visual do perfil) ---------- */
const po=document.createElement('div');po.className='pfo';po.id='cfgo';
const box=document.createElement('div');box.className='pfc cfgp';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');
po.appendChild(box);document.body.appendChild(po);
let msg='';
const T=(k,l)=>`<button class="b sm${S[k]?' on':''}" data-a="t" data-k="${k}">${l}</button>`;
const O=(k,v,l)=>`<button class="b sm${String(S[k])===String(v)?' on':''}" data-a="o" data-k="${k}" data-v="${v}">${l}</button>`;
function render(){const u=typeof getUser==='function'?getUser():null;
  box.innerHTML=`<div class="top"><div class="who"><div class="nm2">Configurações</div></div></div><div class="lst">
  <div class="tit">Texto</div><div class="row"><span class="lb" style="margin:0">Tamanho da letra</span><button class="b sm" data-a="fs" data-v="-10" aria-label="A-">A−</button><span class="val">${S.fs}%</span><button class="b sm" data-a="fs" data-v="10" aria-label="A+">A+</button>${T('ls','Espaçamento maior')}</div>
  <div class="tit">Cores e visão</div><div class="lb">Daltonismo</div><div class="row">${O('dal','0','Nenhum')}${O('dal','p','Protanopia')}${O('dal','d','Deuteranopia')}${O('dal','t','Tritanopia')}</div>
  <div class="row">${T('inv','Inverter cores')}${T('hc','Alto contraste')}${T('gs','Tons de cinza')}</div>
  <div class="tit">Idioma</div><div class="row">${O('lang','pt','Português')}${O('lang','en','English')}${O('lang','es','Español')}</div>
  <div class="tit">Movimento e som</div><div class="row">${T('rm','Reduzir animações')}${T('mute','Silenciar sons')}${T('foc','Destacar foco')}</div>
  <div class="tit">Alterar senha</div>${u?`<input class="ni" id="pw0" type="password" autocomplete="current-password" placeholder="Senha atual"><input class="ni" id="pw1" type="password" autocomplete="new-password" placeholder="Nova senha"><input class="ni" id="pw2" type="password" autocomplete="new-password" placeholder="Repetir nova senha"><div class="msg" id="pwm">${E(msg)}</div><div class="row"><button class="b sm" data-a="pw">Salvar senha</button></div>`:'<div class="msg">Faça login para alterar a senha.</div>'}
  <div class="row"><button class="b sm del" data-a="rst">Restaurar padrão</button></div></div>
  <div class="bar"><button class="b" data-a="x">Fechar</button></div>`;walk(box)}
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
async function chPw(a,b,c){const u=getUser();if(!u)return'Faça login para alterar a senha.';
  if(b.length<6)return'Mínimo de 6 caracteres.';if(b!==c)return'As senhas não conferem.';
  let us=[];try{us=JSON.parse(localStorage.getItem('nocturne-users')||'[]')}catch(e){}
  const x=us.find(q=>q.email===u.email);if(!x)return'Conta não encontrada neste navegador.';
  const k=['senha','password','pass','pw','hash','senhaHash','passwordHash'].find(k=>typeof x[k]==='string');if(!k)return'Não achei onde a senha fica salva.';
  const st=x[k],enc={plain:v=>v,sha:sha,b64:v=>btoa(v)};let sc=null;
  if(st===a)sc='plain';else if(st===await sha(a))sc='sha';else{try{if(st===btoa(a))sc='b64'}catch(e){}}
  if(!sc)return'Senha atual incorreta.';
  x[k]=await enc[sc](b);try{localStorage.setItem('nocturne-users',JSON.stringify(us))}catch(e){}return'Senha alterada!'}
box.addEventListener('click',async e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a;
  if(a==='t'){S[t.dataset.k]=S[t.dataset.k]?0:1}
  else if(a==='o'){S[t.dataset.k]=t.dataset.v}
  else if(a==='fs'){S.fs=Math.max(80,Math.min(200,S.fs+ +t.dataset.v))}
  else if(a==='rst'){S={...D0}}
  else if(a==='x'){po.classList.remove('on');return}
  else if(a==='pw'){const g=id=>document.getElementById(id).value;msg=await chPw(g('pw0'),g('pw1'),g('pw2'));
    save();render();document.getElementById('pwm').textContent=msg;walk(box);return}
  msg='';save();apply();render()});
const open=()=>{msg='';render();po.classList.add('on')};
cfg.onclick=e=>{e.stopPropagation();open()};
po.onclick=e=>{if(e.target===po)po.classList.remove('on')};
addEventListener('keydown',e=>{if(e.key==='Escape')po.classList.remove('on')});

/* ---------- 8) perfil mais elaborado: bio + busca ---------- */
if(profBox){
  const KP='nocturne-perfis',jg=()=>{try{return JSON.parse(localStorage.getItem(KP)||'null')||{}}catch(e){return{}}};
  const me=(typeof getUser==='function'&&getUser()||{}).email;
  const inject=()=>{if(profBox.querySelector('.bio'))return;const top=profBox.querySelector('.top'),lst=profBox.querySelector('.lst');if(!top||!lst)return;
    const em=(profBox.querySelector('.em')||{}).textContent||'',own=em===me,bio=(jg()[em]||{}).b||'';
    const d=document.createElement('div');d.className='bio';
    d.innerHTML=`<div class="lb" style="margin:0 0 6px">Sobre mim</div>`+(own
      ?`<textarea maxlength="140" placeholder="Escreva algo sobre você...">${E(bio)}</textarea><div class="cnt">${bio.length}/140</div><button class="b sm" data-x="bio">Salvar bio</button>`
      :`<p>${bio?E(bio):'Ainda sem bio.'}</p>`);
    top.after(d);
    const s=document.createElement('input');s.className='bsc';s.placeholder='Buscar...';lst.before(s);
    s.oninput=()=>{const v=s.value.toLowerCase();lst.querySelectorAll('.ur,.po,.nt2,.ga').forEach(i=>{i.style.display=i.textContent.toLowerCase().includes(v)?'':'none'})};
    const ta=d.querySelector('textarea');if(ta)ta.oninput=()=>{d.querySelector('.cnt').textContent=ta.value.length+'/140'};
    walk(d);walk(s)};
  profBox.addEventListener('click',e=>{if(e.target.dataset&&e.target.dataset.x==='bio'){const p=jg(),o=p[me]||{},ta=profBox.querySelector('.bio textarea');
    o.b=ta.value.trim().slice(0,140);p[me]=o;try{localStorage.setItem(KP,JSON.stringify(p))}catch(x){}
    if(typeof coruja!=='undefined')coruja.say('Bio salva! Hoo!',1800)}});
  new MutationObserver(inject).observe(profBox,{childList:true});inject()}

/* ---------- init ---------- */
new MutationObserver(()=>{drawGear();sizeIcons()}).observe(root,{attributes:true,attributeFilter:['class']});
findGame();syncGame();base();apply();
setTimeout(()=>{findGame();syncGame();base();sizeIcons()},600);
/* o ícone do minigame some só com o bloco de notas aberto e volta quando ele fecha */
new MutationObserver(syncGame).observe(document.body,{attributes:true,childList:true,subtree:true,attributeFilter:['class','style']});
setInterval(syncGame,300);
})();