(function(){
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  const header=document.getElementById('siteHeader');
  const progress=document.getElementById('scrollProgress');
  const menuBtn=document.getElementById('menuBtn');
  const nav=document.getElementById('primaryNav');

  const updateScrollUI=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const pct=max>0?(window.scrollY/max)*100:0;
    if(progress) progress.style.width=pct+'%';
    if(header) header.classList.toggle('scrolled',window.scrollY>16);
  };
  updateScrollUI();
  window.addEventListener('scroll',updateScrollUI,{passive:true});

  if(menuBtn && header){
    menuBtn.addEventListener('click',()=>{
      const open=header.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded',String(open));
      menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    });
  }
  if(nav && header){
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      header.classList.remove('menu-open');
      if(menuBtn){menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open navigation');}
    }));
  }

  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.nav a')];
  if('IntersectionObserver' in window && navLinks.length){
    const sectionObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
        }
      });
    },{rootMargin:'-35% 0px -55% 0px',threshold:0});
    sections.forEach(section=>sectionObserver.observe(section));
  }

  const items=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(el=>el.classList.add('show'));
    return;
  }
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  items.forEach((el,i)=>{el.style.transitionDelay=Math.min(i*35,280)+'ms';observer.observe(el);});
})();
