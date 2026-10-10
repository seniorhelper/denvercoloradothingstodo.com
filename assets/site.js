(function(){
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector('.burger');
  var mnav = document.getElementById('mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function(){
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mnav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') {
        mnav.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      }
    });
  }

  /* ---------- scroll-flip panels ----------
     Modern browsers with scroll-driven animations handle this in CSS.
     Everywhere else, IntersectionObserver adds .flipped once. */
  var hasScrollTimeline = (window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var panels = document.querySelectorAll('.panel');

  if (reduce || !('IntersectionObserver' in window)) {
    for (var i = 0; i < panels.length; i++) panels[i].classList.add('flipped');
  } else if (!hasScrollTimeline) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('flipped');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    for (var j = 0; j < panels.length; j++) io.observe(panels[j]);
    /* safety net: reveal anything still hidden after 4s */
    setTimeout(function(){
      for (var k = 0; k < panels.length; k++) panels[k].classList.add('flipped');
    }, 4000);
  }

})();
