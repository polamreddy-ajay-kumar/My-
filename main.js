(function(){
const C=window.CONTENT,$=id=>document.getElementById(id);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('ldName').textContent=C.shortName+' PORTFOLIO';
$('hdName').textContent=C.fullName;
$('wordmark').textContent=C.shortName;
$('heroHello').textContent=C.hello;
$('heroHead').innerHTML=C.headline.join('<br>');
$('heroPitch').textContent=C.pitch;
$('proHead').innerHTML=C.prologueHead;
$('proText').innerHTML=C.prologueText.split(' ').map(w=>'<span>'+w+'</span>').join(' ');
$('abHead').innerHTML=C.aboutHead;$('abText').textContent=C.aboutText;
$('sig').textContent=C.fullName.split(' ').slice(-2).join(' ');
$('stats').innerHTML=C.stats.map(s=>'<div class="stat"><b data-n="'+s.n+'">0</b>'+s.label+'</div>').join('');
$('timeline').innerHTML=C.journey.map(j=>'<li><b>'+j.year+'</b><p>'+j.text+'</p></li>').join('');
$('projects').innerHTML=C.projects.map((p,i)=>'<li><small>0'+(i+1)+' · '+p.tag+'</small><a href="'+p.link+'"><h3>'+p.title+'</h3></a><div class="card"><b>'+p.tech+'</b><br>'+p.desc+'</div></li>').join('');
$('craftText').innerHTML=C.craftText;
$('emailBtn').textContent=C.email;$('emailBtn').href='mailto:'+C.email;
$('links').innerHTML=C.links.map(l=>'<a class="pill" href="'+l.url+'" target="_blank" rel="noopener">'+l.label+'</a>').join('');
$('footName').textContent=C.fullName;
const sk=C.skills.map(s=>'<span>'+s+'</span><b>✦</b>').join('');$('track').innerHTML=sk+sk+sk+sk;
const menu=$('menu');
menu.innerHTML=[...document.querySelectorAll('section[data-chapter]')].map(s=>'<a href="#'+s.id+'">'+s.dataset.chapter+'</a>').join('');
$('menuBtn').onclick=()=>{menu.classList.toggle('open');$('menuBtn').textContent=menu.classList.contains('open')?'Close':'Menu'};
menu.onclick=e=>{if(e.target.tagName==='A'){menu.classList.remove('open');$('menuBtn').textContent='Menu'}};
const tick=()=>$('localTime').textContent=C.localTimeLabel+' '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});tick();setInterval(tick,30000);
if(sessionStorage.getItem('seen')||reduce){$('loader').remove()}else{
  const o={v:0};gsap.to(o,{v:100,duration:1.4,ease:'power1.inOut',onUpdate:()=>{const v=Math.round(o.v);$('ldCount').textContent=String(v).padStart(3,'0');$('ldBar').style.width=v+'%'},onComplete:()=>{sessionStorage.setItem('seen','1');gsap.to('#loader',{yPercent:-100,duration:.7,ease:'power3.inOut',onComplete:()=>$('loader').remove()})}});
}
const bgEl=$('bg');for(let i=1;i<=10;i++)bgEl.appendChild(document.createElement('i'));
const setBg=n=>[...bgEl.children].forEach((e,k)=>e.classList.toggle('on',k===n-1));setBg(2);
const BGMAP=[['#hero',2],['#prologue',1],['#about',5],['#journey',6],['#work',4],['#craft',7],['#contact',8],['footer',3]];
if(reduce){document.querySelectorAll('.stat b').forEach(b=>b.textContent=b.dataset.n);return}
gsap.registerPlugin(ScrollTrigger);
BGMAP.forEach(([sel,n])=>ScrollTrigger.create({trigger:sel,start:'top 55%',end:'bottom 55%',onToggle:x=>x.isActive&&setBg(n)}));
const lenis=new Lenis();lenis.on('scroll',ScrollTrigger.update);
gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');const t=h.length>1&&document.querySelector(h);if(t){e.preventDefault();lenis.scrollTo(t)}}));
const tw=gsap.to('#track',{xPercent:-25,duration:20,ease:'none',repeat:-1});
ScrollTrigger.create({onUpdate:s=>gsap.to(tw,{timeScale:1+Math.abs(s.getVelocity())/400,duration:.3,overwrite:true})});
gsap.to('.words span',{opacity:1,stagger:.1,scrollTrigger:{trigger:'#proText',start:'top 80%',end:'bottom 50%',scrub:true}});
document.querySelectorAll('.stat b').forEach(b=>{const o={v:0};gsap.to(o,{v:+b.dataset.n,duration:1.5,scrollTrigger:{trigger:b,start:'top 85%',once:true},onUpdate:()=>b.textContent=Math.round(o.v)})});
ScrollTrigger.create({trigger:'#timeline',start:'top 60%',end:'bottom 60%',onUpdate:s=>{$('timeline').style.setProperty('--fill',s.progress*100+'%');document.querySelectorAll('#timeline li').forEach((li,i,a)=>li.classList.toggle('on',s.progress>=i/a.length))}});
if(matchMedia('(hover:hover) and (min-width:800px)').matches){
  document.querySelectorAll('#projects li').forEach(li=>{const c=li.querySelector('.card');
    li.addEventListener('mouseenter',()=>gsap.to(c,{opacity:1,duration:.2}));
    li.addEventListener('mouseleave',()=>gsap.to(c,{opacity:0,duration:.2}));
    li.addEventListener('mousemove',e=>gsap.to(c,{x:e.clientX+24,y:e.clientY+24,duration:.3}))});
}
const track=document.querySelector('.craft-track');
gsap.to(track,{x:()=>-(track.scrollWidth-innerWidth+80),ease:'none',scrollTrigger:{trigger:'#craft',start:'top top',end:()=>'+='+track.scrollWidth,pin:true,scrub:true,invalidateOnRefresh:true,onToggle:s=>document.body.classList.toggle('light',s.isActive)}});
gsap.from('#talk',{filter:'blur(30px)',opacity:0,duration:1.2,scrollTrigger:{trigger:'#talk',start:'top 80%'}});
document.querySelectorAll('section[data-chapter]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 50%',end:'bottom 50%',onToggle:x=>x.isActive&&($('chapNow').textContent=s.dataset.chapter)}));
// Spotlight: mouse brightens the photo near the cursor
const img=$('cutout');
document.addEventListener('mousemove',e=>{const r=img.getBoundingClientRect();
  const x=((e.clientX-r.left)/r.width*100)+'%',y=((e.clientY-r.top)/r.height*100)+'%';
  img.style.filter='grayscale(1) brightness(.6)';
  img.style.webkitMaskImage=img.style.maskImage='none';
  img.dataset.sx=x;img.dataset.sy=y;});
})();
