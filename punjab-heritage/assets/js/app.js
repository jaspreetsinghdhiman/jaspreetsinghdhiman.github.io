document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]'); if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav');
  if (toggle && nav) { toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? '×' : '☰'; }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='☰'; })); }
  const search = document.getElementById('collection-search'); const cards = [...document.querySelectorAll('.explore-card')]; const count = document.getElementById('result-count'); const empty = document.getElementById('empty-state');
  if (search) search.addEventListener('input', () => { const q = search.value.trim().toLowerCase(); let visible = 0; cards.forEach(card => { const match = (card.dataset.search + ' ' + card.textContent).toLowerCase().includes(q); card.hidden = !match; if (match) visible++; }); if (count) count.textContent = visible + (visible === 1 ? ' collection' : ' collections'); if (empty) empty.hidden = visible !== 0; });
  const lang = document.querySelector('.language-toggle');
  const translations = {
    nav: {'Home':'ਮੁੱਖ ਪੰਨਾ','Explore':'ਖੋਜੋ','Objects':'ਵਸਤਾਂ','Stories':'ਕਹਾਣੀਆਂ','Gallery':'ਤਸਵੀਰਾਂ','Our mission':'ਸਾਡਾ ਮਕਸਦ','Contribute ↗':'ਯੋਗਦਾਨ ਪਾਓ ↗'},
    common: {'A living archive of Punjab — its objects, people and traditions.':'ਪੰਜਾਬ ਦੀਆਂ ਵਸਤਾਂ, ਲੋਕਾਂ ਅਤੇ ਰਵਾਇਤਾਂ ਦਾ ਜੀਵੰਤ ਪੁਰਾਲੇਖ।','Preserving our roots. Celebrating our heritage.':'ਆਪਣੀਆਂ ਜੜ੍ਹਾਂ ਸੰਭਾਲੀਏ। ਆਪਣੀ ਵਿਰਾਸਤ ਮਨਾਈਏ।','Home ↑':'ਮੁੱਖ ਪੰਨਾ ↑','Search English or Punjabi names…':'ਅੰਗਰੇਜ਼ੀ ਜਾਂ ਪੰਜਾਬੀ ਨਾਂ ਖੋਜੋ…','No objects found. Try another search.':'ਕੋਈ ਵਸਤ ਨਹੀਂ ਮਿਲੀ। ਹੋਰ ਸ਼ਬਦ ਨਾਲ ਖੋਜੋ।','No collections found. Try another search.':'ਕੋਈ ਸੰਗ੍ਰਹਿ ਨਹੀਂ ਮਿਲਿਆ। ਹੋਰ ਸ਼ਬਦ ਨਾਲ ਖੋਜੋ।'}
  };
  function setLanguage(language) {
    document.documentElement.lang = language === 'pa' ? 'pa' : 'en';
    document.querySelectorAll('.main-nav a').forEach(a => { const label = a.textContent.trim(); const english = Object.keys(translations.nav).find(k => translations.nav[k] === label) || label; if (translations.nav[english]) a.textContent = language === 'pa' ? translations.nav[english] : english; });
    document.querySelectorAll('.announcement, .footer-bottom span:last-of-type, .footer-bottom a, #object-search, #empty-state, #object-empty').forEach(el => {
      if (el.tagName === 'INPUT') { if (!el.dataset.en) el.dataset.en = el.placeholder; el.placeholder = language === 'pa' ? (translations.common[el.dataset.en] || el.dataset.en) : el.dataset.en; }
      else { if (!el.dataset.en) el.dataset.en = el.textContent.trim(); el.textContent = language === 'pa' ? (translations.common[el.dataset.en] || el.dataset.en) : el.dataset.en; }
    });
    document.querySelectorAll('[data-en][data-pa]').forEach(el => { el.textContent = language === 'pa' ? el.dataset.pa : el.dataset.en; });
    if (lang) { lang.textContent = language === 'pa' ? 'English' : 'ਪੰਜਾਬੀ'; lang.setAttribute('aria-label', language === 'pa' ? 'Switch to English' : 'ਪੰਜਾਬੀ ਵਿੱਚ ਵੇਖੋ'); }
    try { localStorage.setItem('ph-language', language); } catch (_) {}
  }
  if (lang) {
    let current = 'en';
    try { current = localStorage.getItem('ph-language') || 'en'; } catch (_) {}
    setLanguage(current);
    lang.addEventListener('click', () => setLanguage(document.documentElement.lang === 'pa' ? 'en' : 'pa'));
  }
  const reveal = document.querySelectorAll('.collection-card, .explore-card, .object-card, .gallery-item, .values-grid article'); if ('IntersectionObserver' in window) { const io = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } }), {threshold: .12}); reveal.forEach(el => { el.classList.add('reveal'); io.observe(el); }); }

  const objectSearch = document.getElementById('object-search');
  const objectCards = [...document.querySelectorAll('.archive-card')];
  const objectCount = document.getElementById('object-count');
  const objectEmpty = document.getElementById('object-empty');
  if (objectSearch) objectSearch.addEventListener('input', () => { const q=objectSearch.value.trim().toLowerCase(); let n=0; objectCards.forEach(card=>{const match=(card.dataset.search+' '+card.textContent).toLowerCase().includes(q);card.hidden=!match;if(match)n++;});if(objectCount)objectCount.textContent=n+(n===1?' record':' records');if(objectEmpty)objectEmpty.hidden=n!==0; });
  const detailRoot = document.getElementById('object-detail');
  if (detailRoot) {
    const id = new URLSearchParams(window.location.search).get('id');
    fetch('data/objects.json').then(r=>{if(!r.ok)throw new Error('Unable to load archive');return r.json();}).then(items=>{
      const item=items.find(x=>x.id===id);
      if(!item)throw new Error('Record not found');
      document.title=item.name_en+' ('+item.name_pa+') | Punjab Heritage';
      detailRoot.innerHTML = '<section class="page-hero"><div class="container"><p class="eyebrow">OBJECT RECORD · '+item.category_en.toUpperCase()+' · '+item.category_pa+'</p><h1>'+item.name_en+' <em>— '+item.name_pa+'</em></h1><p>'+item.summary_en+'</p><p class="punjabi-copy" lang="pa">'+item.summary_pa+'</p><div class="breadcrumb"><a href="index.html">Home</a> / <a href="objects.html">Objects</a> / '+item.name_en+'</div></div></section><section class="section-pad"><div class="container object-record"><div class="record-art" aria-label="Punjabi name of the object">'+item.name_pa+'</div><div class="record-copy"><p class="eyebrow">THE STORY & ITS USE</p><h2>'+item.name_en+'<span>'+item.name_pa+'</span></h2><p>'+item.description_en+'</p><p class="punjabi-copy" lang="pa">'+item.description_pa+'</p><div class="record-facts"><div><small>TRADITIONAL MATERIALS · ਸਮੱਗਰੀ</small><b>'+item.materials_en+'</b><span class="punjabi-copy" lang="pa">'+item.materials_pa+'</span></div><div><small>EVERYDAY USE · ਵਰਤੋਂ</small><b>'+item.use_en+'</b><span class="punjabi-copy" lang="pa">'+item.use_pa+'</span></div></div><div class="record-verification"><strong>Research status:</strong> '+item.verification+' Please share local variations or source material through the contribution page.</div>'+(item.source_url?'<p class="record-source"><strong>Reference:</strong> <a href="'+item.source_url+'" target="_blank" rel="noopener">'+item.source_label+' ↗</a></p>':'')+'<div class="record-nav"><a href="objects.html">← All objects</a><a href="contribute.html">Share a correction or memory ↗</a></div></div></div></section>';
    }).catch(()=>{detailRoot.innerHTML='<section class="section-pad"><div class="container"><h2>Record not found</h2><p>This object record may have moved. <a class="text-link" href="objects.html">Return to the objects archive →</a></p></div></section>';});
  }

});