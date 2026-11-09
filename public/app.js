(function(){
  var doc=document.documentElement;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* language toggle */
  var els=[].slice.call(document.querySelectorAll('[data-en]'));
  els.forEach(function(el){el.dataset.th=el.innerHTML;});
  var titles={th:'กิจธนาทรัพย์ | โรงงานอิฐบล็อก สระบุรี',en:'Kitthanasap | Concrete Block Factory, Saraburi'};
  var bTh=document.getElementById('lang-th'),bEn=document.getElementById('lang-en');
  function set(l){
    els.forEach(function(el){el.innerHTML=(l==='en')?el.dataset.en:el.dataset.th;});
    doc.lang=l;document.title=titles[l];
    bTh.setAttribute('aria-pressed',l==='th');bEn.setAttribute('aria-pressed',l==='en');
    try{localStorage.setItem('ktn-lang',l);}catch(e){}
  }
  bTh.addEventListener('click',function(){set('th');});
  bEn.addEventListener('click',function(){set('en');});
  var saved='th';try{saved=localStorage.getItem('ktn-lang')||'th';}catch(e){}
  if(saved==='en')set('en');else doc.lang='th';
  document.getElementById('yr').textContent=new Date().getFullYear();

  /* copy buttons */
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.getAttribute('data-copy'),label=b.innerHTML,done=doc.lang==='en'?'Copied':'คัดลอกแล้ว';
      function ok(){b.innerHTML=done;setTimeout(function(){b.innerHTML=label;},1600);}
      if(navigator.clipboard){navigator.clipboard.writeText(t).then(ok,function(){});}
    });
  });

  /* scroll progress */
  var bar=document.getElementById('progress'),ticking=false;
  function prog(){
    var h=doc.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';
    ticking=false;
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(prog);}},{passive:true});
  prog();

  /* reveal on scroll (content stays visible if JS or IntersectionObserver is unavailable) */
  if(!reduce&&'IntersectionObserver' in window){
    doc.classList.add('js');
    var targets=document.querySelectorAll('.head,.pillar,.product,.step,.case > *,.gallery figure,.ccard,.spec,.about-grid > img');
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    [].forEach.call(targets,function(t,i){
      t.classList.add('reveal');
      t.style.setProperty('--d',((i%4)*0.08)+'s');
      io.observe(t);
    });

    /* count-up numbers */
    var cio=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting)return;
        cio.unobserve(e.target);
        var el=e.target,end=+el.dataset.count,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'',t0=performance.now();
        (function tick(t){
          var p=Math.min(1,(t-t0)/1400),v=Math.round(end*(1-Math.pow(1-p,3)));
          el.textContent=pre+v+suf;
          if(p<1)requestAnimationFrame(tick);
        })(t0);
      });
    },{threshold:.6});
    document.querySelectorAll('[data-count]').forEach(function(n){cio.observe(n);});

    /* hero photo tilt (fine pointers only) */
    var tilt=document.querySelector('.tilt');
    if(tilt&&matchMedia('(hover:hover) and (pointer:fine)').matches){
      tilt.addEventListener('pointermove',function(e){
        var r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        tilt.style.transform='perspective(900px) rotateY('+(x*7)+'deg) rotateX('+(-y*7)+'deg)';
      });
      tilt.addEventListener('pointerleave',function(){tilt.style.transform='';});
    }
  }
})();
