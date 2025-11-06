
    /* ---------- PRELOADER ---------- */
    window.addEventListener('load',()=>setTimeout(()=>document.getElementById('preloader').classList.add('hide'),2200));

    /* ---------- MOBILE MENU ---------- */
    const mobileToggle=document.getElementById('mobileToggle'),navMenu=document.getElementById('navMenu');
    mobileToggle.addEventListener('click',()=>{navMenu.classList.toggle('active');
    const i=mobileToggle.querySelector('i');
    i.classList.toggle('fa-bars');i.classList.toggle('fa-times');
});

    /* ---------- SMOOTH SCROLL ---------- */
    document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',function(e){
    e.preventDefault();
    const target=document.querySelector(this.getAttribute('href'));
    const headerH=document.querySelector('.header').offsetHeight;
    window.scrollTo({top:target.offsetTop-headerH-20,behavior:'smooth'});
    navMenu.classList.remove('active');
}));

    /* ---------- HEADER SCROLL ---------- */
    window.addEventListener('scroll',()=>document.getElementById('header').classList.toggle('scrolled',window.scrollY>50));

    /* ---------- GSAP ANIMATIONS ---------- */
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline()
    .to('.hero-content h1',{opacity:1,y:0,duration:1.2,delay:.6})
    .to('.hero-subtitle',{opacity:1,y:0,duration:1},'-=.6')
    .to('.social-links',{opacity:1,y:0,duration:1},'-=.6')
    .to('.cta-button',{opacity:1,y:0,duration:1},'-=.6')
    .to('.hero-image',{opacity:1,x:0,rotationY:0,duration:1.5,ease:'power3.out'},'-=1.2');

    gsap.utils.toArray('.section-title').forEach(t=>gsap.to(t,{opacity:1,y:0,duration:1.2,scrollTrigger:{trigger:t,start:'top 80%'}}));
    gsap.utils.toArray('.skill-item').forEach((s,i)=>gsap.to(s,{opacity:1,y:0,duration:1,delay:i*.15,scrollTrigger:{trigger:s,start:'top 85%'}}));
    gsap.utils.toArray('.project-card').forEach((c,i)=>gsap.to(c,{opacity:1,scale:1,duration:1,delay:i*.25,scrollTrigger:{trigger:c,start:'top 85%'}}));
    gsap.utils.toArray('.gallery-item').forEach((g,i)=>gsap.to(g,{opacity:1,y:0,duration:1,delay:i*.12,scrollTrigger:{trigger:g,start:'top 90%'}}));
    gsap.utils.toArray('.skill-progress').forEach(b=>{
    const p=b.getAttribute('data-percent');
    gsap.to(b,{width:p+'%',duration:2.2,ease:'power3.out',scrollTrigger:{trigger:b,start:'top 85%'}});
});

    /* ---------- TYPEWRITER ---------- */
    const texts=['Full Stack Developer','Java Expert','Web Designer','Problem Solver'];
    let i=0,j=0,cur='',del=false;
    const tw=document.querySelector('.typewriter');
    function type(){
    cur = texts[i];
    tw.textContent=del?cur.substring(0,j-1):cur.substring(0,j+1);
    j=del?j-1:j+1;
    if(!del&&j===cur.length){del=true;setTimeout(type,1800);}
    else if(del&&j===0){del=false;i=(i+1)%texts.length;setTimeout(type,600);}
    else setTimeout(type,del?60:120);
}
    setTimeout(type,2500);

    /* ---------- PARTICLES ---------- */
    function createParticle(){
    const p=document.createElement('div');p.className='particle';
    p.style.left=Math.random()*100+'vw';
    p.style.width=p.style.height=(Math.random()*5+2)+'px';
    p.style.animationDelay=Math.random()*18+'s';
    document.getElementById('particles').appendChild(p);
    setTimeout(()=>p.remove(),18000);
}
    setInterval(createParticle,350);

    /* ---------- RIPPLE ---------- */
    document.querySelectorAll('button,.social-link,.project-link,.btn').forEach(el=>{
    el.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const r = document.createElement('span');
        r.className = 'ripple';
        r.style.width = r.style.height = size + 'px';
        r.style.left = x + 'px';
        r.style.top = y + 'px';
        this.appendChild(r);
        setTimeout(() => r.remove(), 700);
    });
});

    /* ---------- FORM & CV ---------- */
    function downloadCV(){alert('CV Download Started! (Demo)');}
    document.getElementById('contactForm').addEventListener('submit',e=>{
    e.preventDefault();alert('Thank you! Your message has been sent.');e.target.reset();
});

    /* ---------- PROJECT CARD REVEAL ---------- */
    document.addEventListener('DOMContentLoaded',()=>{
    const obs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');obs.unobserve(en.target);}}),{threshold:.2});
    document.querySelectorAll('.project-card').forEach(c=>obs.observe(c));
});

    /* ---------- PROFILE CARD 3D TILT ---------- */
    const profile=document.querySelector('.profile-card');
    profile.addEventListener('mousemove',e=>{
    const r=profile.getBoundingClientRect();
    const x=e.clientX-r.left, y=e.clientY-r.top;
    const cx=r.width/2, cy=r.height/2;
    const rotX=(y-cy)/20, rotY=(x-cx)/20;
    profile.querySelector('.profile-inner').style.transform=`rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
});
    profile.addEventListener('mouseleave',()=>profile.querySelector('.profile-inner').style.transform='rotateX(0)rotateY(0)');

    /* ---------- STAT COUNTER ---------- */
    function animateStats(){
    document.querySelectorAll('.stat-number').forEach(s => {
        const target = parseInt(s.textContent);
        let cnt = 0, inc = target / 50;
        const update = () => {
            if (cnt < target) {
                cnt += inc;
                s.textContent = Math.ceil(cnt) + (s.textContent.includes('+') ? '+' : '%');
                requestAnimationFrame(update);
            } else s.textContent = target + (s.textContent.includes('+') ? '+' : '%');
        };
        const ob = new IntersectionObserver(es => {
            if (es[0].isIntersecting) {
                update();
                ob.disconnect();
            }
        });
        ob.observe(s);
    });
}
    animateStats();
