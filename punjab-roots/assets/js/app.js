/* Canonical URL normalisation for all Punjab Roots archive pages. */
(()=>{const old='/punjab-heritage/',now='/punjab-roots/';const canonical=document.querySelector('link[rel="canonical"]');if(canonical&&canonical.href.includes(old))canonical.href=canonical.href.replace(old,now);document.querySelectorAll('meta[property="og:url"]').forEach(m=>{if(m.content.includes(old))m.content=m.content.replace(old,now);});})();
// Punjab Roots rebrand: keep shared navigation, page titles and metadata consistent
// across the archive while legacy URLs remain unchanged.
(() => {
  const replaceBrand = (value) => String(value)
    .replaceAll('Punjab Roots', 'Punjab Roots')
    .replaceAll('Punjab Roots', 'Punjab Roots')
    .replaceAll('The Living Legacy of Punjab', 'Discover the Roots. Preserve the Legacy.')
    .replaceAll('Preserving our roots. Celebrating our heritage.', 'Discover the Roots. Preserve the Legacy.')
    .replaceAll('Preserving Our Roots. Celebrating Our Heritage.', 'Discover the Roots. Preserve the Legacy.');
  const updateBrand = () => {
    document.title = replaceBrand(document.title);
    document.querySelectorAll('meta[content]').forEach((el) => el.setAttribute('content', replaceBrand(el.getAttribute('content'))));
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => { el.textContent = replaceBrand(el.textContent); });
    document.querySelectorAll('.brand-mark').forEach((el) => { if (el.textContent.trim() === 'PH') el.textContent = 'PR'; });
    const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) node.nodeValue = replaceBrand(node.nodeValue);
  };
  updateBrand();
  document.addEventListener('DOMContentLoaded', updateBrand, { once: true });
})();
// The former contribution destination is now the visitor review form.
// Normalize every archive link to it, including older article and collection pages.
document.querySelectorAll('a[href]').forEach((link) => {
  try {
    const target = new URL(link.getAttribute('href'), window.location.href);
    if (target.pathname.endsWith('/contribute.html')) {
      link.textContent = 'Leave a Review ↗';
    }
  } catch (_) { /* Ignore malformed links and leave their original text intact. */ }
});

// Apply the archive's shared favicon on every page that loads this script.
if (document.head && !document.querySelector('link[rel~="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = new URL('../../favicon.svg', document.currentScript.src).href;
  document.head.appendChild(favicon);
}
document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]'); if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav');
  if (toggle && nav) { toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? '×' : '☰'; }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='☰'; })); }
  const search = document.getElementById('collection-search'); const cards = [...document.querySelectorAll('.explore-card')]; const count = document.getElementById('result-count'); const empty = document.getElementById('empty-state');
  if (search) search.addEventListener('input', () => { const q = search.value.trim().toLowerCase(); let visible = 0; cards.forEach(card => { const match = (card.dataset.search + ' ' + card.textContent).toLowerCase().includes(q); card.hidden = !match; if (match) visible++; }); if (count) count.textContent = visible + (visible === 1 ? ' collection' : ' collections'); if (empty) empty.hidden = visible !== 0; });
  const lang = document.querySelector('.language-toggle');
  const paText = {
    'Home':'ਮੁੱਖ ਪੰਨਾ','Explore':'ਖੋਜੋ','Objects':'ਵਸਤਾਂ','Stories':'ਕਹਾਣੀਆਂ','Gallery':'ਤਸਵੀਰਾਂ','Our mission':'ਸਾਡਾ ਮਕਸਦ','Leave a Review ↗':'ਸਮੀਖਿਆ ਦਿਓ ↗',
    'Leave a Review ↗':'ਸਮੀਖਿਆ ਦਿਓ ↗',
    'Leave a Review':'ਸਮੀਖਿਆ ਦਿਓ','Leave a review':'ਸਮੀਖਿਆ ਦਿਓ',
    'YOUR VOICE MATTERS':'ਤੁਹਾਡੀ ਰਾਏ ਮਹੱਤਵਪੂਰਨ ਹੈ',
    'Every visit':'ਹਰ ਮੁਲਾਕਾਤ',
    'deserves a':'ਇੱਕ ਆਵਾਜ਼ ਦੀ',
    'voice.':'ਹੱਕਦਾਰ ਹੈ।',
    'Visited Punjab Roots? Tell us what you liked and what we can make better.':'ਪੰਜਾਬ ਹੈਰੀਟੇਜ ਤੁਹਾਨੂੰ ਕਿਵੇਂ ਲੱਗੀ? ਦੱਸੋ ਕਿ ਕੀ ਚੰਗਾ ਲੱਗਿਆ ਅਤੇ ਅਸੀਂ ਕੀ ਬਿਹਤਰ ਕਰ ਸਕਦੇ ਹਾਂ।',
    'SHARE YOUR EXPERIENCE':'ਆਪਣਾ ਤਜਰਬਾ ਸਾਂਝਾ ਕਰੋ',
    'Help us make':'ਇਸ ਨੂੰ ਬਿਹਤਰ',
    'it better.':'ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।',
    'Your review will be emailed to the Punjab Roots team at jassp708737@gmail.com through FormSubmit. The receiving address must be verified with FormSubmit before the first review can be delivered. Please do not include passwords, financial details or other sensitive information.':'ਤੁਹਾਡੀ ਸਮੀਖਿਆ FormSubmit ਰਾਹੀਂ Punjab Roots ਟੀਮ ਨੂੰ ਈਮੇਲ ਕੀਤੀ ਜਾਵੇਗੀ। ਪਹਿਲੀ ਸਮੀਖਿਆ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ ਪ੍ਰਾਪਤਕਰਤਾ ਈਮੇਲ ਦੀ FormSubmit ਨਾਲ ਪੁਸ਼ਟੀ ਲਾਜ਼ਮੀ ਹੈ। ਪਾਸਵਰਡ ਜਾਂ ਨਿੱਜੀ ਵਿੱਤੀ ਜਾਣਕਾਰੀ ਨਾ ਭੇਜੋ।',
    'What felt useful, clear or interesting.':'ਕੀ ਲਾਭਦਾਇਕ, ਸਪਸ਼ਟ ਜਾਂ ਦਿਲਚਸਪ ਲੱਗਿਆ।',
    'Share any issue you faced on mobile or desktop.':'ਮੋਬਾਈਲ ਜਾਂ ਕੰਪਿਊਟਰ ਉੱਤੇ ਆਈ ਸਮੱਸਿਆ ਦੱਸੋ।',
    'Suggest a topic or feature you would like to see.':'ਕੋਈ ਵਿਸ਼ਾ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਸੁਝਾਓ ਜੋ ਤੁਸੀਂ ਵੇਖਣਾ ਚਾਹੁੰਦੇ ਹੋ।',
    'Be honest and respectful — every suggestion helps.':'ਇਮਾਨਦਾਰੀ ਅਤੇ ਸਤਿਕਾਰ ਨਾਲ ਆਪਣੀ ਰਾਏ ਦਿਓ — ਹਰ ਸੁਝਾਅ ਮਦਦਗਾਰ ਹੈ।',
    'Your name':'ਤੁਹਾਡਾ ਨਾਂ',
    '(optional)':'(ਚੋਣਵਾਂ)',
    'Email address':'ਈਮੇਲ ਪਤਾ',
    '(optional — only if you would like a reply)':'(ਚੋਣਵਾਂ — ਜੇ ਤੁਸੀਂ ਜਵਾਬ ਚਾਹੁੰਦੇ ਹੋ)',
    'What is your review about?':'ਤੁਹਾਡੀ ਸਮੀਖਿਆ ਕਿਸ ਬਾਰੇ ਹੈ?',
    'Choose a topic':'ਵਿਸ਼ਾ ਚੁਣੋ',
    'Overall website experience':'ਵੈੱਬਸਾਈਟ ਦਾ ਸਮੁੱਚਾ ਤਜਰਬਾ',
    'Design and appearance':'ਡਿਜ਼ਾਇਨ ਅਤੇ ਦਿੱਖ',
    'Mobile experience':'ਮੋਬਾਈਲ ਤਜਰਬਾ',
    'Heritage articles and information':'ਵਿਰਾਸਤੀ ਲੇਖ ਅਤੇ ਜਾਣਕਾਰੀ',
    'Punjabi language and translations':'ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਅਤੇ ਅਨੁਵਾਦ',
    'Navigation or a technical issue':'ਨੈਵੀਗੇਸ਼ਨ ਜਾਂ ਤਕਨੀਕੀ ਸਮੱਸਿਆ',
    'Suggestion for improvement':'ਸੁਧਾਰ ਲਈ ਸੁਝਾਅ',
    'Rating':'ਰੇਟਿੰਗ',
    'Choose your rating':'ਆਪਣੀ ਰੇਟਿੰਗ ਚੁਣੋ',
    'Excellent':'ਸ਼ਾਨਦਾਰ',
    'Very good':'ਬਹੁਤ ਵਧੀਆ',
    'Good':'ਵਧੀਆ',
    'Needs improvement':'ਸੁਧਾਰ ਦੀ ਲੋੜ ਹੈ',
    'Poor':'ਮਾੜਾ',
    'Review title':'ਸਮੀਖਿਆ ਦਾ ਸਿਰਲੇਖ',
    'A few words about your experience':'ਆਪਣੇ ਤਜਰਬੇ ਬਾਰੇ ਕੁਝ ਸ਼ਬਦ',
    'Your review':'ਤੁਹਾਡੀ ਸਮੀਖਿਆ',
    'What did you like? What should we improve? Tell us about your experience…':'ਤੁਹਾਨੂੰ ਕੀ ਚੰਗਾ ਲੱਗਿਆ? ਅਸੀਂ ਕੀ ਸੁਧਾਰ ਕਰੀਏ? ਆਪਣਾ ਤਜਰਬਾ ਦੱਸੋ…',
    'I confirm this review reflects my genuine experience and may be read by the Punjab Roots team.':'ਮੈਂ ਪੁਸ਼ਟੀ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ ਕਿ ਇਹ ਸਮੀਖਿਆ ਮੇਰੇ ਅਸਲ ਤਜਰਬੇ ਉੱਤੇ ਆਧਾਰਿਤ ਹੈ ਅਤੇ Punjab Roots ਟੀਮ ਇਸ ਨੂੰ ਪੜ੍ਹ ਸਕਦੀ ਹੈ।',
    'Submit review':'ਸਮੀਖਿਆ ਭੇਜੋ',
    'Your review is sent securely through FormSubmit to the archive owner’s email. You will be redirected after submitting.':'ਤੁਹਾਡੀ ਸਮੀਖਿਆ FormSubmit ਰਾਹੀਂ ਪੁਰਾਲੇਖ ਦੇ ਮਾਲਕ ਦੀ ਈਮੇਲ ਉੱਤੇ ਭੇਜੀ ਜਾਵੇਗੀ। ਭੇਜਣ ਤੋਂ ਬਾਅਦ ਤੁਹਾਨੂੰ ਅਗਲੇ ਪੰਨੇ ਉੱਤੇ ਲਿਜਾਇਆ ਜਾਵੇਗਾ।','Contact':'ਸੰਪਰਕ',
    'A living archive of Punjab — its objects, people and traditions.':'ਪੰਜਾਬ ਦੀਆਂ ਵਸਤਾਂ, ਲੋਕਾਂ ਅਤੇ ਰਵਾਇਤਾਂ ਦਾ ਜੀਵੰਤ ਪੁਰਾਲੇਖ।',
    'Preserving our roots. Celebrating our heritage.':'ਆਪਣੀਆਂ ਜੜ੍ਹਾਂ ਸੰਭਾਲੀਏ। ਆਪਣੀ ਵਿਰਾਸਤ ਮਨਾਈਏ।',
    'Made with respect for Punjab and its people.':'ਪੰਜਾਬ ਅਤੇ ਇਸ ਦੇ ਲੋਕਾਂ ਦੇ ਸਤਿਕਾਰ ਨਾਲ ਤਿਆਰ ਕੀਤਾ।',
    'Back to top ↑':'ਉੱਪਰ ਜਾਓ ↑','Home ↑':'ਮੁੱਖ ਪੰਨਾ ↑','All collections ↑':'ਸਾਰੇ ਸੰਗ੍ਰਹਿ ↑','All objects ↑':'ਸਾਰੀਆਂ ਵਸਤਾਂ ↑','All stories':'ਸਾਰੀਆਂ ਕਹਾਣੀਆਂ',
    'WHY WE ARE HERE':'ਅਸੀਂ ਇਹ ਕੰਮ ਕਿਉਂ ਕਰ ਰਹੇ ਹਾਂ','OUR PURPOSE':'ਸਾਡਾ ਮਕਸਦ','OUR PRINCIPLES':'ਸਾਡੇ ਸਿਧਾਂਤ','BE PART OF THE STORY':'ਇਸ ਕਹਾਣੀ ਦਾ ਹਿੱਸਾ ਬਣੋ',
    'Rooted in memory.':'ਯਾਦਾਂ ਵਿੱਚ ਜੜ੍ਹਾਂ।','Built for tomorrow.':'ਆਉਣ ਵਾਲੇ ਕੱਲ੍ਹ ਲਈ।',
    'A digital home for the objects, knowledge, craft and voices that shape Punjab\'s cultural identity.':'ਪੰਜਾਬ ਦੀ ਸੱਭਿਆਚਾਰਕ ਪਛਾਣ ਬਣਾਉਣ ਵਾਲੀਆਂ ਵਸਤਾਂ, ਗਿਆਨ, ਕਲਾ ਅਤੇ ਆਵਾਜ਼ਾਂ ਲਈ ਇੱਕ ਡਿਜ਼ਿਟਲ ਘਰ।',
    'OUR PRINCIPLES':'ਸਾਡੇ ਅਸੂਲ','Authenticity':'ਅਸਲਿਅਤ','Community':'ਭਾਈਚਾਰਾ','Accessibility':'ਸਭ ਲਈ ਪਹੁੰਚ','Continuity':'ਨਿਰੰਤਰਤਾ',
    'Record what is known, identify what is uncertain, and avoid presenting assumptions as facts.':'ਜੋ ਪਤਾ ਹੈ ਉਹ ਦਰਜ ਕਰੋ, ਜਿਸ ਬਾਰੇ ਯਕੀਨ ਨਹੀਂ ਉਸ ਨੂੰ ਸਪਸ਼ਟ ਕਰੋ ਅਤੇ ਅਨੁਮਾਨਾਂ ਨੂੰ ਤੱਥ ਵਾਂਗ ਪੇਸ਼ ਨਾ ਕਰੋ।',
    'Make space for local knowledge, family memories, artisans and village communities.':'ਸਥਾਨਕ ਗਿਆਨ, ਪਰਿਵਾਰਕ ਯਾਦਾਂ, ਕਾਰੀਗਰਾਂ ਅਤੇ ਪਿੰਡਾਂ ਦੇ ਭਾਈਚਾਰਿਆਂ ਨੂੰ ਥਾਂ ਦਿਓ।',
    'Present information in Punjabi and English, with clear navigation and inclusive design.':'ਜਾਣਕਾਰੀ ਪੰਜਾਬੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਸੌਖੀ ਦਿਸ਼ਾ-ਸੂਚਨਾ ਅਤੇ ਸਭ ਨੂੰ ਨਾਲ ਜੋੜਦੇ ਡਿਜ਼ਾਇਨ ਨਾਲ ਪੇਸ਼ ਕਰੋ।',
    'Connect generations by making traditional knowledge easier to discover and share.':'ਰਵਾਇਤੀ ਗਿਆਨ ਨੂੰ ਲੱਭਣਾ ਅਤੇ ਸਾਂਝਾ ਕਰਨਾ ਸੌਖਾ ਬਣਾ ਕੇ ਪੀੜ੍ਹੀਆਂ ਨੂੰ ਜੋੜੋ।',
    'MEMORIES THAT MAKE US':'ਸਾਨੂੰ ਬਣਾਉਣ ਵਾਲੀਆਂ ਯਾਦਾਂ','Stories from Punjab.':'ਪੰਜਾਬ ਦੀਆਂ ਕਹਾਣੀਆਂ।',
    'History lives not only in books, but in voices, family memories and everyday experiences.':'ਇਤਿਹਾਸ ਸਿਰਫ਼ ਕਿਤਾਬਾਂ ਵਿੱਚ ਨਹੀਂ, ਸਗੋਂ ਆਵਾਜ਼ਾਂ, ਪਰਿਵਾਰਕ ਯਾਦਾਂ ਅਤੇ ਰੋਜ਼ਾਨਾ ਦੇ ਤਜਰਬਿਆਂ ਵਿੱਚ ਵੀ ਵੱਸਦਾ ਹੈ।',
    'ORAL HISTORY · FEATURED THEME':'ਮੌਖਿਕ ਇਤਿਹਾਸ · ਖਾਸ ਵਿਸ਼ਾ','The stories our elders carry':'ਸਾਡੇ ਵੱਡਿਆਂ ਦੀਆਂ ਸੰਭਾਲੀਆਂ ਕਹਾਣੀਆਂ',
    'Every generation holds memories of how a village looked, how work was done, what people cooked and how celebrations brought everyone together.':'ਹਰ ਪੀੜ੍ਹੀ ਕੋਲ ਯਾਦਾਂ ਹਨ ਕਿ ਪਿੰਡ ਕਿਹੋ ਜਿਹਾ ਸੀ, ਕੰਮ ਕਿਵੇਂ ਹੁੰਦਾ ਸੀ, ਲੋਕ ਕੀ ਪਕਾਉਂਦੇ ਸਨ ਅਤੇ ਤਿਉਹਾਰ ਸਭ ਨੂੰ ਕਿਵੇਂ ਇਕੱਠਾ ਕਰਦੇ ਸਨ।',
    'This space will grow through carefully recorded community voices.':'ਇਹ ਮੰਚ ਭਾਈਚਾਰੇ ਦੀਆਂ ਆਵਾਜ਼ਾਂ ਨੂੰ ਧਿਆਨ ਨਾਲ ਦਰਜ ਕਰਕੇ ਵਧੇਗਾ।',
    'Share a family memory →':'ਪਰਿਵਾਰਕ ਯਾਦ ਸਾਂਝੀ ਕਰੋ →','STORY COLLECTIONS':'ਕਹਾਣੀਆਂ ਦੇ ਸੰਗ੍ਰਹਿ',
    'A VISUAL ARCHIVE':'ਤਸਵੀਰਾਂ ਦਾ ਪੁਰਾਲੇਖ','See the stories.':'ਕਹਾਣੀਆਂ ਨੂੰ ਵੇਖੋ।',
    'A growing collection of visual references celebrating Punjab\'s places, materials and living culture.':'ਪੰਜਾਬ ਦੀਆਂ ਥਾਵਾਂ, ਸਮੱਗਰੀ ਅਤੇ ਜੀਵੰਤ ਸੱਭਿਆਚਾਰ ਨੂੰ ਦਰਸਾਉਂਦੀਆਂ ਤਸਵੀਰਾਂ ਦਾ ਵਧਦਾ ਸੰਗ੍ਰਹਿ।',
    'WHY THIS ARCHIVE EXISTS':'ਇਹ ਪੁਰਾਲੇਖ ਕਿਉਂ ਬਣਾਇਆ ਗਿਆ ਹੈ','ADD YOUR VOICE TO THE ARCHIVE':'ਪੁਰਾਲੇਖ ਵਿੱਚ ਆਪਣੀ ਆਵਾਜ਼ ਜੋੜੋ',
    'Every memory':'ਹਰ ਯਾਦ','has a':'ਦੀ ਇੱਕ','place here.':'ਥਾਂ ਇੱਥੇ ਹੈ।',
    'Know an old object, a traditional skill or a story worth preserving? Tell us about it.':'ਕੀ ਤੁਹਾਨੂੰ ਕਿਸੇ ਪੁਰਾਣੀ ਵਸਤ, ਰਵਾਇਤੀ ਹੁਨਰ ਜਾਂ ਸੰਭਾਲਣ ਯੋਗ ਕਹਾਣੀ ਬਾਰੇ ਪਤਾ ਹੈ? ਸਾਨੂੰ ਦੱਸੋ।',
    'SHARE YOUR HERITAGE':'ਆਪਣੀ ਵਿਰਾਸਤ ਸਾਂਝੀ ਕਰੋ','Help us document':'ਇਸ ਨੂੰ ਦਰਜ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੋ',
    'Your name':'ਤੁਹਾਡਾ ਨਾਂ','Email address':'ਈਮੇਲ ਪਤਾ','What would you like to share?':'ਤੁਸੀਂ ਕੀ ਸਾਂਝਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
    'Object / story title':'ਵਸਤ / ਕਹਾਣੀ ਦਾ ਸਿਰਲੇਖ','Attach a photograph or document (optional)':'ਤਸਵੀਰ ਜਾਂ ਦਸਤਾਵੇਜ਼ ਜੋੜੋ (ਚੋਣਵਾਂ)',
    'Tell us more':'ਹੋਰ ਜਾਣਕਾਰੀ ਦਿਓ','Send contribution':'ਯੋਗਦਾਨ ਭੇਜੋ',
    'Choose a contribution':'ਯੋਗਦਾਨ ਦੀ ਕਿਸਮ ਚੁਣੋ','Traditional object':'ਰਵਾਇਤੀ ਵਸਤ','Old photograph':'ਪੁਰਾਣੀ ਤਸਵੀਰ','Family or village memory':'ਪਰਿਵਾਰ ਜਾਂ ਪਿੰਡ ਦੀ ਯਾਦ','Craft or traditional knowledge':'ਕਲਾ ਜਾਂ ਰਵਾਇਤੀ ਗਿਆਨ','Other':'ਹੋਰ',
    'I confirm I have permission to share the information and any images I provide.':'ਮੈਂ ਪੁਸ਼ਟੀ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ ਕਿ ਦਿੱਤੀ ਜਾਣਕਾਰੀ ਅਤੇ ਤਸਵੀਰਾਂ ਸਾਂਝੀਆਂ ਕਰਨ ਦੀ ਮੈਨੂੰ ਇਜਾਜ਼ਤ ਹੈ।',
    'Search English or Punjabi names…':'ਅੰਗਰੇਜ਼ੀ ਜਾਂ ਪੰਜਾਬੀ ਨਾਂ ਖੋਜੋ…','No objects found. Try another search.':'ਕੋਈ ਵਸਤ ਨਹੀਂ ਮਿਲੀ। ਹੋਰ ਸ਼ਬਦ ਨਾਲ ਖੋਜੋ।','No collections found. Try another search.':'ਕੋਈ ਸੰਗ੍ਰਹਿ ਨਹੀਂ ਮਿਲਿਆ। ਹੋਰ ਸ਼ਬਦ ਨਾਲ ਖੋਜੋ।',
    'THE OBJECT ARCHIVE · ਵਿਰਾਸਤੀ ਵਸਤਾਂ':'ਵਿਰਾਸਤੀ ਵਸਤਾਂ ਦਾ ਪੁਰਾਲੇਖ','Objects that hold':'ਯਾਦਾਂ ਸੰਭਾਲਦੀਆਂ ਵਸਤਾਂ','our memory.':'ਸਾਡੀ ਵਿਰਾਸਤ।',
    'Explore traditional objects by their Punjabi names, everyday uses and the knowledge carried by the people who used them.':'ਰਵਾਇਤੀ ਵਸਤਾਂ ਨੂੰ ਉਨ੍ਹਾਂ ਦੇ ਪੰਜਾਬੀ ਨਾਂ, ਰੋਜ਼ਾਨਾ ਵਰਤੋਂ ਅਤੇ ਵਰਤਣ ਵਾਲੇ ਲੋਕਾਂ ਦੇ ਗਿਆਨ ਰਾਹੀਂ ਜਾਣੋ।',
    'View record ↗':'ਵੇਰਵਾ ਵੇਖੋ ↗','A living tradition':'ਜੀਵੰਤ ਰਵਾਇਤ','Knowledge carried':'ਸੰਭਾਲਿਆ ਗਿਆ ਗਿਆਨ',
    'through generations.':'ਪੀੜ੍ਹੀ ਦਰ ਪੀੜ੍ਹੀ।','Home / Explore':'ਮੁੱਖ ਪੰਨਾ / ਖੋਜੋ',
    'COLLECTION 01 · FIELDS & FARMING':'ਸੰਗ੍ਰਹਿ 01 · ਖੇਤ ਅਤੇ ਖੇਤੀਬਾੜੀ','COLLECTION 02 · HOME & EVERYDAY LIFE':'ਸੰਗ੍ਰਹਿ 02 · ਘਰ ਅਤੇ ਰੋਜ਼ਾਨਾ ਜੀਵਨ',
    'COLLECTION 03 · PEOPLE & PLACES':'ਸੰਗ੍ਰਹਿ 03 · ਲੋਕ ਅਤੇ ਥਾਵਾਂ','COLLECTION 04 · TEXTILES & DRESS':'ਸੰਗ੍ਰਹਿ 04 · ਕੱਪੜੇ ਅਤੇ ਪਹਿਰਾਵਾ',
    'COLLECTION 05 · MADE BY HAND':'ਸੰਗ੍ਰਹਿ 05 · ਹੱਥੀਂ ਬਣੀ ਕਲਾ','COLLECTION 06 · SOUND & CELEBRATION':'ਸੰਗ੍ਰਹਿ 06 · ਸੁਰ ਅਤੇ ਜਸ਼ਨ',
    'COLLECTION 07 · MOVEMENT & JOURNEYS':'ਸੰਗ੍ਰਹਿ 07 · ਸਫ਼ਰ ਅਤੇ ਆਵਾਜਾਈ','COLLECTION 08 · PLAY & SPORT':'ਸੰਗ੍ਰਹਿ 08 · ਖੇਡਾਂ',
    'COLLECTION 09 · RITUALS & FESTIVALS':'ਸੰਗ੍ਰਹਿ 09 · ਰਸਮਾਂ ਅਤੇ ਤਿਉਹਾਰ',
    'A LIVING TRADITION':'ਜੀਵੰਤ ਰਵਾਇਤ','THE LAND & ITS PEOPLE':'ਧਰਤੀ ਅਤੇ ਇਸ ਦੇ ਲੋਕ','THE HEART OF THE HOME':'ਘਰ ਦਾ ਦਿਲ','SPACES OF BELONGING':'ਆਪਣੇਪਣ ਦੀਆਂ ਥਾਵਾਂ',
    'Before the machine, there was knowledge.':'ਮਸ਼ੀਨਾਂ ਤੋਂ ਪਹਿਲਾਂ ਵੀ ਗਿਆਨ ਸੀ।','Everyday objects. Generational stories.':'ਰੋਜ਼ਾਨਾ ਦੀਆਂ ਵਸਤਾਂ। ਪੀੜ੍ਹੀਆਂ ਦੀਆਂ ਕਹਾਣੀਆਂ।',
    'A place is made by its people.':'ਥਾਂ ਨੂੰ ਉਸ ਦੇ ਲੋਕ ਪਛਾਣ ਦਿੰਦੇ ਹਨ।','Materials, makers and skills passed from hand to hand.':'ਸਮੱਗਰੀ, ਕਾਰੀਗਰ ਅਤੇ ਹੁਨਰ — ਜੋ ਹੱਥੋਂ-ਹੱਥ ਅੱਗੇ ਵਧੇ।',
    'Traditional textiles carry knowledge through pattern, colour, material and technique.':'ਰਵਾਇਤੀ ਕੱਪੜੇ ਨਮੂਨਿਆਂ, ਰੰਗਾਂ, ਸਮੱਗਰੀ ਅਤੇ ਤਕਨੀਕ ਰਾਹੀਂ ਗਿਆਨ ਸੰਭਾਲਦੇ ਹਨ।',
    'Punjab\'s musical heritage includes instruments, singing styles, dance, seasonal performance and oral knowledge.':'ਪੰਜਾਬ ਦੀ ਸੰਗੀਤਕ ਵਿਰਾਸਤ ਵਿੱਚ ਸਾਜ਼, ਗਾਇਕੀ ਦੇ ਢੰਗ, ਨਾਚ, ਮੌਸਮੀ ਪੇਸ਼ਕਾਰੀਆਂ ਅਤੇ ਮੌਖਿਕ ਗਿਆਨ ਸ਼ਾਮਲ ਹਨ।',
    'Customs are living practices. Their meanings can differ between families, regions, faith communities and generations, so records should include who shared the account and where it is practised.':'ਰਸਮਾਂ ਜੀਵੰਤ ਰਵਾਇਤਾਂ ਹਨ। ਉਨ੍ਹਾਂ ਦੇ ਅਰਥ ਪਰਿਵਾਰਾਂ, ਇਲਾਕਿਆਂ, ਧਾਰਮਿਕ ਭਾਈਚਾਰਿਆਂ ਅਤੇ ਪੀੜ੍ਹੀਆਂ ਅਨੁਸਾਰ ਵੱਖ ਹੋ ਸਕਦੇ ਹਨ। ਇਸ ਲਈ ਜਾਣਕਾਰੀ ਦੇਣ ਵਾਲੇ ਵਿਅਕਤੀ ਅਤੇ ਥਾਂ ਦਾ ਜ਼ਿਕਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।',
    'Traditional games, community play and rural sports.':'ਰਵਾਇਤੀ ਖੇਡਾਂ, ਸਾਂਝੀਆਂ ਮਨੋਰੰਜਕ ਖੇਡਾਂ ਅਤੇ ਪੇਂਡੂ ਖੇਡ ਮੁਕਾਬਲੇ।',
    'How people and goods travelled across villages and towns.':'ਲੋਕ ਅਤੇ ਸਾਮਾਨ ਪਿੰਡਾਂ ਤੇ ਸ਼ਹਿਰਾਂ ਵਿਚਕਾਰ ਕਿਵੇਂ ਸਫ਼ਰ ਕਰਦੇ ਸਨ।',
    'These are introductory collection records. Verify regional names, descriptions, dates, sources and image rights before presenting any entry as an authenticated historical record.':'ਇਹ ਮੁੱਢਲੇ ਜਾਣਕਾਰੀ ਰਿਕਾਰਡ ਹਨ। ਕਿਸੇ ਵੀ ਦਰਜ ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਇਤਿਹਾਸਕ ਰਿਕਾਰਡ ਕਹਿਣ ਤੋਂ ਪਹਿਲਾਂ ਇਲਾਕਾਈ ਨਾਂ, ਵੇਰਵੇ, ਮਿਤੀਆਂ, ਸਰੋਤ ਅਤੇ ਤਸਵੀਰਾਂ ਦੇ ਹੱਕਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।',
    'These are introductory records, not a complete catalogue. Names, uses and regional variants will be reviewed and sourced before being marked as verified.':'ਇਹ ਮੁੱਢਲੇ ਰਿਕਾਰਡ ਹਨ, ਪੂਰੀ ਸੂਚੀ ਨਹੀਂ। ਪ੍ਰਮਾਣਿਤ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਨਾਂ, ਵਰਤੋਂ ਅਤੇ ਇਲਾਕਾਈ ਰੂਪਾਂ ਦੀ ਜਾਂਚ ਅਤੇ ਸਰੋਤ ਦਰਜ ਕੀਤੇ ਜਾਣਗੇ।',
    'Every object':'ਹਰ ਵਸਤ','holds a':'ਵਿੱਚ ਵੱਸਦੀ ਹੈ','memory.':'ਇੱਕ ਯਾਦ।',
    'Walk through the Punjab we inherited — its fields, homes, craftsmanship, everyday objects and the stories that keep them alive.':'ਆਓ ਉਸ ਪੰਜਾਬ ਨੂੰ ਜਾਣੀਏ ਜੋ ਸਾਨੂੰ ਵਿਰਸੇ ਵਿੱਚ ਮਿਲਿਆ — ਇਸ ਦੇ ਖੇਤ, ਘਰ, ਕਾਰੀਗਰੀ, ਰੋਜ਼ਾਨਾ ਦੀਆਂ ਵਸਤਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜਿਉਂਦਾ ਰੱਖਣ ਵਾਲੀਆਂ ਕਹਾਣੀਆਂ।',
    'MORE THAN THE PAST':'ਸਿਰਫ਼ ਬੀਤਿਆ ਕੱਲ੍ਹ ਨਹੀਂ','Our heritage is not':'ਸਾਡੀ ਵਿਰਾਸਤ','behind us. It is':'ਸਾਡੇ ਪਿੱਛੇ ਨਹੀਂ। ਇਹ','within us.':'ਸਾਡੇ ਅੰਦਰ ਹੈ।',
    'EXPLORE THE COLLECTIONS':'ਸੰਗ੍ਰਹਿ ਵੇਖੋ','A world of':'ਇੱਕ ਦੁਨੀਆ','living traditions.':'ਜੀਵੰਤ ਰਵਾਇਤਾਂ ਦੀ।','View all collections':'ਸਾਰੇ ਸੰਗ੍ਰਹਿ ਵੇਖੋ',
    'FIELDS & FARMING':'ਖੇਤ ਅਤੇ ਖੇਤੀਬਾੜੀ','HOME & EVERYDAY LIFE':'ਘਰ ਅਤੇ ਰੋਜ਼ਾਨਾ ਜੀਵਨ','PEOPLE & PLACES':'ਲੋਕ ਅਤੇ ਥਾਵਾਂ','MADE BY HAND':'ਹੱਥੀਂ ਬਣੀ ਕਲਾ','SOUND & CELEBRATION':'ਸੁਰ ਅਤੇ ਜਸ਼ਨ','RITUALS & FESTIVALS':'ਰਸਮਾਂ ਅਤੇ ਤਿਉਹਾਰ',
    'Explore collection ↗':'ਸੰਗ੍ਰਹਿ ਵੇਖੋ ↗','THE DETAILS THAT DEFINE US':'ਸਾਡੀ ਪਛਾਣ ਬਣਾਉਣ ਵਾਲੇ ਵੇਰਵੇ',
    'Every tool, recipe, craft and custom deserves to be remembered — not as a relic, but as a living part of who we are.':'ਹਰ ਔਜ਼ਾਰ, ਵਿਅੰਜਨ, ਕਲਾ ਅਤੇ ਰਸਮ ਯਾਦ ਰੱਖਣ ਦੇ ਯੋਗ ਹੈ — ਕਿਸੇ ਪੁਰਾਣੀ ਨਿਸ਼ਾਨੀ ਵਾਂਗ ਨਹੀਂ, ਸਗੋਂ ਸਾਡੀ ਪਛਾਣ ਦੇ ਜੀਵੰਤ ਹਿੱਸੇ ਵਜੋਂ।',
    'Read heritage stories':'ਵਿਰਾਸਤ ਦੀਆਂ ਕਹਾਣੀਆਂ ਪੜ੍ਹੋ','OBJECTS WITH STORIES':'ਕਹਾਣੀਆਂ ਵਾਲੀਆਂ ਵਸਤਾਂ','Look closer.':'ਧਿਆਨ ਨਾਲ ਵੇਖੋ।','Remember more.':'ਹੋਰ ਯਾਦ ਕਰੋ।',
    'HELP KEEP THE STORIES ALIVE':'ਕਹਾਣੀਆਂ ਨੂੰ ਜਿਉਂਦਾ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰੋ','Share an old photograph, an object, or a memory from your family or village.':'ਆਪਣੇ ਪਰਿਵਾਰ ਜਾਂ ਪਿੰਡ ਦੀ ਪੁਰਾਣੀ ਤਸਵੀਰ, ਕੋਈ ਵਸਤ ਜਾਂ ਯਾਦ ਸਾਂਝੀ ਕਰੋ।',
    'Contribute to the archive':'ਪੁਰਾਲੇਖ ਵਿੱਚ ਯੋਗਦਾਨ ਪਾਓ','Search English or Punjabi names…':'ਅੰਗਰੇਜ਼ੀ ਜਾਂ ਪੰਜਾਬੀ ਨਾਂ ਖੋਜੋ…',
    'A traditional plough used to open and turn soil.':'ਜ਼ਮੀਨ ਨੂੰ ਚੀਰਨ ਅਤੇ ਪਲਟਣ ਲਈ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਰਵਾਇਤੀ ਹਲ।',
    'A yoke associated with harnessing draught animals.':'ਖੇਤੀ ਦੇ ਪਸ਼ੂਆਂ ਨੂੰ ਜੋੜਨ ਲਈ ਵਰਤੀ ਜਾਣ ਵਾਲੀ ਪੰਜਾਲੀ।',
    'A hand tool used for cutting crops or grass, with shape and name variations across communities.':'ਫ਼ਸਲ ਜਾਂ ਘਾਹ ਕੱਟਣ ਲਈ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਹੱਥੀਂ ਸੰਦ; ਇਸ ਦੀ ਬਣਤਰ ਅਤੇ ਨਾਂ ਇਲਾਕੇ ਅਨੁਸਾਰ ਬਦਲ ਸਕਦੇ ਹਨ।',
    'A hand-operated mill traditionally used to grind grain.':'ਅਨਾਜ ਪੀਸਣ ਲਈ ਵਰਤੀ ਜਾਣ ਵਾਲੀ ਰਵਾਇਤੀ ਹੱਥੀਂ ਚੱਲਣ ਵਾਲੀ ਚੱਕੀ।',
    'A traditional vessel for carrying or storing water.':'ਪਾਣੀ ਭਰਨ, ਲਿਜਾਣ ਜਾਂ ਸੰਭਾਲਣ ਲਈ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਰਵਾਇਤੀ ਭਾਂਡਾ।',
    'An animal-powered water-lifting arrangement for irrigation.':'ਸਿੰਚਾਈ ਲਈ ਪਸ਼ੂਆਂ ਦੀ ਮਦਦ ਨਾਲ ਪਾਣੀ ਕੱਢਣ ਦੀ ਰਵਾਇਤੀ ਪ੍ਰਣਾਲੀ।',
    'THE STORY & ITS USE':'ਇਸ ਦੀ ਕਹਾਣੀ ਅਤੇ ਵਰਤੋਂ','TRADITIONAL MATERIALS · ਸਮੱਗਰੀ':'ਰਵਾਇਤੀ ਸਮੱਗਰੀ','EVERYDAY USE · ਵਰਤੋਂ':'ਰੋਜ਼ਾਨਾ ਵਰਤੋਂ',
    'Research status:':'ਖੋਜ ਦੀ ਸਥਿਤੀ:','Reference:':'ਹਵਾਲਾ:','Share a correction or memory ↗':'ਸੁਧਾਰ ਜਾਂ ਯਾਦ ਸਾਂਝੀ ਕਰੋ ↗','← All objects':'← ਸਾਰੀਆਂ ਵਸਤਾਂ',
    'A TEXTILE TRADITION':'ਕੱਪੜੇ ਦੀ ਰਵਾਇਤ','References':'ਹਵਾਲੇ','Research note:':'ਖੋਜ ਸੰਬੰਧੀ ਨੋਟ:',
    'A traditional cooking hearth, often built from earth or masonry and adapted to local fuel and household needs.':'ਰਵਾਇਤੀ ਚੁੱਲ੍ਹਾ, ਜੋ ਅਕਸਰ ਮਿੱਟੀ ਜਾਂ ਇੱਟਾਂ ਨਾਲ ਬਣਾਇਆ ਜਾਂਦਾ ਸੀ ਅਤੇ ਸਥਾਨਕ ਬਾਲਣ ਤੇ ਘਰੇਲੂ ਲੋੜਾਂ ਅਨੁਸਾਰ ਹੁੰਦਾ ਸੀ।',
    'A hand-operated churning tool used in preparing butter from curd.':'ਦਹੀਂ ਰਿੜਕ ਕੇ ਮੱਖਣ ਤਿਆਰ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਹੱਥੀਂ ਚਲਾਇਆ ਜਾਣ ਵਾਲਾ ਸੰਦ।',
    'A woven cot used for sitting and sleeping, commonly associated with courtyards and open-air domestic life.':'ਬੁਣਿਆ ਹੋਇਆ ਮੰਜਾ, ਜਿਸ ਉੱਤੇ ਬੈਠਿਆ ਅਤੇ ਸੁੱਤਾ ਜਾਂਦਾ ਸੀ; ਇਹ ਵਿਹੜੇ ਅਤੇ ਖੁੱਲ੍ਹੇ ਘਰੇਲੂ ਜੀਵਨ ਨਾਲ ਜੁੜਿਆ ਹੈ।',

    'ONE LAND · MANY STORIES':'ਇੱਕ ਧਰਤੀ · ਅਨੇਕਾਂ ਕਹਾਣੀਆਂ',
    'A living archive of Punjab — across today’s borders':'ਅੱਜ ਦੀਆਂ ਸਰਹੱਦਾਂ ਤੋਂ ਪਾਰ ਪੰਜਾਬ ਦੀ ਜੀਵੰਤ ਵਿਰਾਸਤ',
    'A SHARED DIGITAL HOME FOR PUNJAB':'ਪੰਜਾਬ ਲਈ ਸਾਂਝਾ ਡਿਜ਼ਿਟਲ ਘਰ',
    'Every object':'ਹਰ ਵਸਤ','holds a':'ਵਿੱਚ ਵੱਸਦੀ ਹੈ','memory.':'ਇੱਕ ਯਾਦ।',
    'Discover the Punjab we inherited across today’s borders — its fields, homes, craftsmanship, everyday objects and the stories that keep them alive.':'ਆਓ ਉਸ ਪੰਜਾਬ ਨੂੰ ਜਾਣੀਏ ਜੋ ਸਾਨੂੰ ਵਿਰਸੇ ਵਿੱਚ ਮਿਲਿਆ — ਇਸ ਦੇ ਖੇਤ, ਘਰ, ਕਾਰੀਗਰੀ, ਰੋਜ਼ਾਨਾ ਦੀਆਂ ਵਸਤਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜਿਉਂਦਾ ਰੱਖਣ ਵਾਲੀਆਂ ਕਹਾਣੀਆਂ।',
    'Explore the heritage':'ਵਿਰਾਸਤ ਦੀ ਖੋਜ ਕਰੋ','Why this archive exists':'ਇਹ ਪੁਰਾਲੇਖ ਕਿਉਂ ਬਣਿਆ',
    'SCROLL TO DISCOVER':'ਹੋਰ ਜਾਣਨ ਲਈ ਹੇਠਾਂ ਜਾਓ','ONE PUNJAB · THREE PERSPECTIVES':'ਇੱਕ ਪੰਜਾਬ · ਤਿੰਨ ਨਜ਼ਰੀਏ',
    'Explore the':'ਖੋਜੋ','whole story.':'ਪੂਰੀ ਕਹਾਣੀ।','Indian Punjab ↗':'ਭਾਰਤੀ ਪੰਜਾਬ ↗','Pakistani Punjab ↗':'ਪਾਕਿਸਤਾਨੀ ਪੰਜਾਬ ↗','Shared heritage ↗':'ਸਾਂਝੀ ਵਿਰਾਸਤ ↗',
    'Charda Punjab':'ਚੜ੍ਹਦਾ ਪੰਜਾਬ','Lehnda Punjab':'ਲਹਿੰਦਾ ਪੰਜਾਬ','Sanjha Virsa':'ਸਾਂਝਾ ਵਿਰਸਾ',
    'THE DIGITAL COLLECTION':'ਡਿਜ਼ਿਟਲ ਸੰਗ੍ਰਹਿ','Explore our':'ਸਾਡੀ ਵਿਰਾਸਤ ਦੀ ਖੋਜ ਕਰੋ','heritage.':'ਵਿਰਾਸਤ।',
    'Discover the objects, skills, places and traditions of Charda Punjab, Lehnda Punjab and our shared heritage.':'ਚੜ੍ਹਦੇ ਪੰਜਾਬ, ਲਹਿੰਦੇ ਪੰਜਾਬ ਅਤੇ ਸਾਡੀ ਸਾਂਝੀ ਵਿਰਾਸਤ ਦੀਆਂ ਵਸਤਾਂ, ਹੁਨਰਾਂ, ਥਾਵਾਂ ਅਤੇ ਰਵਾਇਤਾਂ ਨੂੰ ਜਾਣੋ।',
    'ONE CULTURAL REGION · MANY HOMELANDS':'ਇੱਕ ਸੱਭਿਆਚਾਰਕ ਖੇਤਰ · ਕਈ ਵਤਨ','Explore all of Punjab.':'ਸਾਰੇ ਪੰਜਾਬ ਨੂੰ ਜਾਣੋ।',
    'Punjab’s heritage lives across today’s borders. Discover regional traditions without losing sight of the shared history, languages and memories that connect them.':'ਪੰਜਾਬ ਦੀ ਵਿਰਾਸਤ ਅੱਜ ਦੀਆਂ ਸਰਹੱਦਾਂ ਤੋਂ ਪਾਰ ਵੱਸਦੀ ਹੈ। ਸਾਂਝੇ ਇਤਿਹਾਸ, ਭਾਸ਼ਾਵਾਂ ਅਤੇ ਯਾਦਾਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖਦਿਆਂ ਵੱਖ-ਵੱਖ ਇਲਾਕਿਆਂ ਦੀਆਂ ਰਵਾਇਤਾਂ ਜਾਣੋ।',
    '01 · EASTERN PUNJAB':'01 · ਪੂਰਬੀ ਪੰਜਾਬ','02 · WESTERN PUNJAB':'02 · ਪੱਛਮੀ ਪੰਜਾਬ','03 · BEFORE & BEYOND BORDERS':'03 · ਸਰਹੱਦਾਂ ਤੋਂ ਪਹਿਲਾਂ ਅਤੇ ਪਾਰ',
    'Indian Punjab — its villages, crafts, foodways, music, landscapes and living traditions.':'ਭਾਰਤੀ ਪੰਜਾਬ — ਇਸ ਦੇ ਪਿੰਡ, ਕਾਰੀਗਰੀ, ਖਾਣ-ਪੀਣ ਦੀਆਂ ਰਵਾਇਤਾਂ, ਸੰਗੀਤ, ਕੁਦਰਤੀ ਨਜ਼ਾਰੇ ਅਤੇ ਜੀਵੰਤ ਸੱਭਿਆਚਾਰ।',
    'Pakistani Punjab — including Lahore, Multan, Bahawalpur, Pothohar and the region’s diverse cultural traditions.':'ਪਾਕਿਸਤਾਨੀ ਪੰਜਾਬ — ਲਾਹੌਰ, ਮੁਲਤਾਨ, ਬਹਾਵਲਪੁਰ, ਪੋਠੋਹਾਰ ਅਤੇ ਇਲਾਕੇ ਦੀਆਂ ਵਿਭਿੰਨ ਸੱਭਿਆਚਾਰਕ ਰਵਾਇਤਾਂ ਸਮੇਤ।',
    'Shared Punjabi heritage, pre-1947 histories, family memories, language, music and traditions that cross borders.':'ਸਾਂਝੀ ਪੰਜਾਬੀ ਵਿਰਾਸਤ, 1947 ਤੋਂ ਪਹਿਲਾਂ ਦਾ ਇਤਿਹਾਸ, ਪਰਿਵਾਰਕ ਯਾਦਾਂ, ਭਾਸ਼ਾ, ਸੰਗੀਤ ਅਤੇ ਸਰਹੱਦਾਂ ਤੋਂ ਪਾਰ ਦੀਆਂ ਰਵਾਇਤਾਂ।',
    'ਪੂਰਬੀ ਪੰਜਾਬ · India · Explore collection':'ਪੂਰਬੀ ਪੰਜਾਬ · ਭਾਰਤ · ਸੰਗ੍ਰਹਿ ਵੇਖੋ','ਪੱਛਮੀ ਪੰਜਾਬ · Pakistan · Explore collection':'ਪੱਛਮੀ ਪੰਜਾਬ · ਪਾਕਿਸਤਾਨ · ਸੰਗ੍ਰਹਿ ਵੇਖੋ','ਸਾਂਝਾ ਵਿਰਸਾ · Shared heritage · Explore collection':'ਸਾਂਝਾ ਵਿਰਸਾ · ਸਾਂਝੀ ਵਿਰਾਸਤ · ਸੰਗ੍ਰਹਿ ਵੇਖੋ',
    'Research promise:':'ਖੋਜ ਸੰਬੰਧੀ ਵਚਨਬੱਧਤਾ:','Each record will identify its specific place, region, source and image rights. We will not assign a tradition to one side of the border without evidence.':'ਹਰ ਰਿਕਾਰਡ ਵਿੱਚ ਉਸ ਦੀ ਖਾਸ ਥਾਂ, ਇਲਾਕਾ, ਸਰੋਤ ਅਤੇ ਤਸਵੀਰਾਂ ਦੇ ਹੱਕ ਦਰਜ ਹੋਣਗੇ। ਸਬੂਤ ਤੋਂ ਬਿਨਾਂ ਕਿਸੇ ਰਵਾਇਤ ਨੂੰ ਸਰਹੱਦ ਦੇ ਇੱਕ ਪਾਸੇ ਨਾਲ ਨਹੀਂ ਜੋੜਿਆ ਜਾਵੇਗਾ।',
    'Search collections…':'ਸੰਗ੍ਰਹਿ ਖੋਜੋ…','13 collections':'13 ਸੰਗ੍ਰਹਿ','Agriculture & Farming':'ਖੇਤੀਬਾੜੀ','Ghar & Rasoi':'ਘਰ ਅਤੇ ਰਸੋਈ','Pind di Zindagi':'ਪਿੰਡ ਦੀ ਜ਼ਿੰਦਗੀ',
    'Clothing & Textiles':'ਪਹਿਰਾਵਾ ਅਤੇ ਕੱਪੜੇ','Arts & Crafts':'ਕਲਾ ਅਤੇ ਕਾਰੀਗਰੀ','Music & Folk Culture':'ਸੰਗੀਤ ਅਤੇ ਲੋਕ-ਸੱਭਿਆਚਾਰ',
    'Traditional Transport':'ਰਵਾਇਤੀ ਆਵਾਜਾਈ','Games & Sports':'ਖੇਡਾਂ ਅਤੇ ਰਵਾਇਤੀ ਮੁਕਾਬਲੇ','Reet-Riwaaz':'ਰੀਤ-ਰਿਵਾਜ',
    'Forts & Historic Places':'ਕਿਲ੍ਹੇ ਅਤੇ ਇਤਿਹਾਸਕ ਥਾਵਾਂ','Punjabi Food & Cuisine':'ਪੰਜਾਬੀ ਖਾਣਾ ਅਤੇ ਪਕਵਾਨ','Folk Dance & Performance':'ਲੋਕ-ਨਾਚ ਅਤੇ ਪੇਸ਼ਕਾਰੀ','Festivals & Celebrations':'ਤਿਉਹਾਰ ਅਤੇ ਜਸ਼ਨ',
    'Traditional tools, farming knowledge and the rhythms of rural life.':'ਰਵਾਇਤੀ ਸੰਦ, ਖੇਤੀਬਾੜੀ ਦਾ ਗਿਆਨ ਅਤੇ ਪੇਂਡੂ ਜੀਵਨ ਦੀ ਲੈਅ।',
    'Household objects, cooking traditions and the warmth of home.':'ਘਰੇਲੂ ਵਸਤਾਂ, ਖਾਣਾ ਪਕਾਉਣ ਦੀਆਂ ਰਵਾਇਤਾਂ ਅਤੇ ਘਰ ਦਾ ਨਿੱਘ।',
    'Village spaces, daily routines, homes and community life.':'ਪਿੰਡਾਂ ਦੀਆਂ ਥਾਵਾਂ, ਰੋਜ਼ਾਨਾ ਦੇ ਕੰਮ, ਘਰ ਅਤੇ ਭਾਈਚਾਰਕ ਜੀਵਨ।',
    'Phulkari, woven fabrics, traditional dress and adornment.':'ਫੁਲਕਾਰੀ, ਬੁਣੇ ਹੋਏ ਕੱਪੜੇ, ਰਵਾਇਤੀ ਪਹਿਰਾਵਾ ਅਤੇ ਗਹਿਣੇ।',
    'Search English or Punjabi names…':'ਅੰਗਰੇਜ਼ੀ ਜਾਂ ਪੰਜਾਬੀ ਨਾਂ ਖੋਜੋ…','No collections found. Try another search.':'ਕੋਈ ਸੰਗ੍ਰਹਿ ਨਹੀਂ ਮਿਲਿਆ। ਹੋਰ ਸ਼ਬਦ ਨਾਲ ਖੋਜੋ।',
    'Photo sources and reuse terms for the Traditional Objects Archive.':'ਰਵਾਇਤੀ ਵਸਤਾਂ ਦੇ ਪੁਰਾਲੇਖ ਲਈ ਤਸਵੀਰਾਂ ਦੇ ਸਰੋਤ ਅਤੇ ਮੁੜ ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ।',
    'A museum that keeps':'ਇੱਕ ਅਜਾਇਬਘਰ ਜੋ ਸੰਭਾਲਦਾ ਹੈ','old Punjab present.':'ਪੁਰਾਣੇ ਪੰਜਾਬ ਦੀਆਂ ਯਾਦਾਂ।',
    'A museum that keeps old Punjab present.':'ਇੱਕ ਅਜਾਇਬਘਰ ਜੋ ਪੁਰਾਣੇ ਪੰਜਾਬ ਦੀਆਂ ਯਾਦਾਂ ਨੂੰ ਜੀਵੰਤ ਰੱਖਦਾ ਹੈ।',
    'A FIELD GUIDE TO OUR SHARED INHERITANCE':'ਸਾਡੀ ਸਾਂਝੀ ਵਿਰਾਸਤ ਲਈ ਮਾਰਗਦਰਸ਼ਕ',
    'Discover the':'ਖੋਜੋ','whole Punjab.':'ਪੂਰਾ ਪੰਜਾਬ।',
    'Explore the places, rivers, voices, skills and memories that shape Charda Punjab, Lehnda Punjab and the heritage they share.':'ਉਹ ਥਾਵਾਂ, ਦਰਿਆ, ਆਵਾਜ਼ਾਂ, ਹੁਨਰ ਅਤੇ ਯਾਦਾਂ ਜਾਣੋ ਜੋ ਚੜ੍ਹਦੇ ਪੰਜਾਬ, ਲਹਿੰਦੇ ਪੰਜਾਬ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਸਾਂਝੀ ਵਿਰਾਸਤ ਨੂੰ ਘੜਦੀਆਂ ਹਨ।',
    'THE HERITAGE INDEX':'ਵਿਰਾਸਤ ਸੂਚੀ','Many threads.':'ਅਨੇਕਾਂ ਧਾਗੇ।','One living archive.':'ਇੱਕ ਜੀਵੰਤ ਪੁਰਾਲੇਖ।',
    'PLACE DIRECTORY':'ਥਾਵਾਂ ਦੀ ਸੂਚੀ','Explore by':'ਖੇਤਰ ਅਨੁਸਾਰ ਖੋਜੋ','region.':'ਇਲਾਕਾ।',
    'A SOURCE-LED CHRONOLOGY':'ਸਰੋਤਾਂ ਅਧਾਰਿਤ ਸਮਾਂ-ਰੇਖਾ','Moments that shaped':'ਪੰਜਾਬ ਨੂੰ ਘੜਨ ਵਾਲੇ ਪਲ','Punjab.':'ਪੰਜਾਬ।',
    'PEOPLE & IDEAS':'ਲੋਕ ਅਤੇ ਵਿਚਾਰ','Voices across':'ਪੀੜ੍ਹੀਆਂ ਦੀਆਂ ਆਵਾਜ਼ਾਂ','generations.':'ਪੀੜ੍ਹੀਆਂ।',
    'WORDS THAT CARRY CULTURE':'ਸੱਭਿਆਚਾਰ ਸੰਭਾਲਦੇ ਸ਼ਬਦ','A small Punjabi':'ਛੋਟੀ ਪੰਜਾਬੀ','glossary.':'ਸ਼ਬਦਾਵਲੀ।',
    'LISTEN & LEARN':'ਸੁਣੋ ਅਤੇ ਸਿੱਖੋ','Hear a short':'ਇੱਕ ਛੋਟੀ ਜਾਣ-ਪਛਾਣ ਸੁਣੋ','heritage introduction.':'ਵਿਰਾਸਤ ਦੀ।',
    'RESEARCH STARTING POINTS':'ਖੋਜ ਲਈ ਸ਼ੁਰੂਆਤੀ ਸਰੋਤ','Sources &':'ਸਰੋਤ ਅਤੇ','further reading.':'ਹੋਰ ਪੜ੍ਹੋ।'

  };
  let currentLanguage = 'en';
  function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language === 'pa' ? 'pa' : 'en';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.parentElement || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(node.parentElement.tagName)) return;
      if (!node.__phEnglish) node.__phEnglish = node.nodeValue;
      const original = node.__phEnglish;
      const key = original.trim();
      if (!key) return;
      const leading = original.match(/^\s*/)[0], trailing = original.match(/\s*$/)[0];
      const translated = paText[key];
      node.nodeValue = language === 'pa' && translated ? leading + translated + trailing : original;
    });
    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el => {
      if (!el.dataset.phPlaceholder) el.dataset.phPlaceholder = el.placeholder;
      if (language === 'pa') el.placeholder = paText[el.dataset.phPlaceholder] || el.dataset.phPlaceholder;
      else el.placeholder = el.dataset.phPlaceholder;
    });
    document.querySelectorAll('[data-en][data-pa]').forEach(el => { el.textContent = language === 'pa' ? el.dataset.pa : el.dataset.en; });
    document.querySelectorAll('.language-toggle').forEach(button => {
      button.textContent = language === 'pa' ? 'English' : 'ਪੰਜਾਬੀ';
      button.setAttribute('aria-label', language === 'pa' ? 'Switch to English' : 'ਪੰਜਾਬੀ ਵਿੱਚ ਵੇਖੋ');
    });
    try { localStorage.setItem('ph-language', language); } catch (_) {}
  }
  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem('ph-language') || 'en'; } catch (_) {}
  applyLanguage(savedLanguage);
  document.querySelectorAll('.language-toggle').forEach(button => button.addEventListener('click', () => applyLanguage(currentLanguage === 'pa' ? 'en' : 'pa')));
  window.PH_SET_LANGUAGE = applyLanguage;
  const reveal = document.querySelectorAll('.collection-card, .explore-card, .object-card, .archive-card, .gallery-item, .values-grid article, .page-hero .container, .intro-grid, .section-heading, .detail-intro, .object-list article, .story-feature, .manifesto-content, .lehnda-feature, .lehnda-intro, .contact-card, .contribute-form'); if ('IntersectionObserver' in window) { const io = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } }), {threshold: .12}); reveal.forEach(el => { el.classList.add('reveal'); io.observe(el); }); }

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
      document.title=item.name_en+' ('+item.name_pa+') | Punjab Roots';
      const metaDescription=document.querySelector('meta[name="description"]');
      if(metaDescription) metaDescription.content=item.summary_en;
      const canonical=document.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'canonical'}));
      canonical.href=window.location.origin+window.location.pathname+'?id='+encodeURIComponent(id); const ogUrl=document.querySelector('meta[property="og:url"]')||document.head.appendChild(Object.assign(document.createElement('meta'),{property:'og:url'})); ogUrl.content=canonical.href;
      const ogTitle=document.querySelector('meta[property="og:title"]');
      if(ogTitle) ogTitle.content=document.title;
      const ogDescription=document.querySelector('meta[property="og:description"]');
      if(ogDescription) ogDescription.content=item.summary_en;
      let structured=document.getElementById('object-jsonld');
      if(!structured){structured=document.createElement('script');structured.id='object-jsonld';structured.type='application/ld+json';document.head.appendChild(structured);}
      structured.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Thing','name':item.name_en,'alternateName':item.name_pa,'description':item.description_en,'category':item.category_en,'url':canonical.href});
      const objectVisuals = {
        hal: {src:'assets/images/photos/webp/old-plow-punjab.webp',alt:'Traditional wooden plough from old Punjab'},
        panjali: {src:'assets/images/photos/webp/oxen-yoke-ploughing-loc.webp',alt:'Historical photograph of oxen working with a traditional yoke'},
        daati: {src:'assets/images/photos/webp/sickle-daati.webp',alt:'Traditional curved agricultural sickle'},
        chulha: {src:'assets/images/photos/webp/clay-stove-chulha.webp',alt:'Clay cooking stove from Ishanpur, Ludhiana, Punjab'},
        madhaani: {src:'assets/images/photos/webp/wooden-churn-madhaani.webp',alt:'Traditional Punjabi wooden milk churn, madhani'},
        manja: {src:'assets/images/photos/webp/woven-cot-manja.webp',alt:'Traditional woven cot used in Punjab'},
        chakki: {src:'assets/images/photos/webp/chakki-stone-grinder.webp',alt:'Stone hand grinder, chakki, in a Punjab home'},
        gaggar: {src:'assets/images/photos/webp/brass-water-vessel-gaggar.webp',alt:'Traditional brass gaggar vessel from Ludhiana district, Punjab'},
        charsa: {src:'assets/images/photos/webp/saqiyah-water-wheel-lahore-1933.webp',alt:'Historical animal-powered water-lifting wheel near Lahore, Punjab'}
      };
      const visual = objectVisuals[item.id] || {src:'',alt:''};
      visual.credit = '<a href="image-credits.html">Photo source & licence details</a>.';
      detailRoot.innerHTML = '<section class="page-hero"><div class="container"><p class="eyebrow">OBJECT RECORD · '+item.category_en.toUpperCase()+' · '+item.category_pa+'</p><h1>'+item.name_en+' <em>— '+item.name_pa+'</em></h1><p>'+item.summary_en+'</p><p class="punjabi-copy" lang="pa">'+item.summary_pa+'</p><div class="breadcrumb"><a href="index.html">Home</a> / <a href="objects.html">Objects</a> / '+item.name_en+'</div></div></section><section class="section-pad"><div class="container object-record"><figure class="record-visual"><img loading="lazy" decoding="async" src="'+visual.src+'" alt="'+visual.alt+'"><figcaption>'+visual.credit+'</figcaption></figure><div class="record-copy"><p class="eyebrow">THE STORY & ITS USE</p><h2>'+item.name_en+'<span>'+item.name_pa+'</span></h2><p>'+item.description_en+'</p><p class="punjabi-copy" lang="pa">'+item.description_pa+'</p><div class="record-facts"><div><small>TRADITIONAL MATERIALS · ਸਮੱਗਰੀ</small><b>'+item.materials_en+'</b><span class="punjabi-copy" lang="pa">'+item.materials_pa+'</span></div><div><small>EVERYDAY USE · ਵਰਤੋਂ</small><b>'+item.use_en+'</b><span class="punjabi-copy" lang="pa">'+item.use_pa+'</span></div></div><div class="record-verification"><strong>Research status:</strong> '+item.verification+' Please share local variations or source material through the contribution page.</div>'+(item.source_url?'<p class="record-source"><strong>Reference:</strong> <a href="'+item.source_url+'" target="_blank" rel="noopener">'+item.source_label+' ↗</a></p>':'')+'<div class="record-nav"><a href="objects.html">← All objects</a><a href="contribute.html">Share a correction or memory ↗</a></div></div></div></section>';
      // Re-apply the selected language to content inserted after the initial page translation.
      applyLanguage(currentLanguage);
      detailRoot.querySelectorAll('.record-copy > p:not(.punjabi-copy), .record-facts b').forEach(el=>el.classList.add('english-copy'));
      if (window.PH_SET_LANGUAGE) window.PH_SET_LANGUAGE(currentLanguage);
    }).catch(()=>{detailRoot.innerHTML='<section class="section-pad"><div class="container"><h2>Record not found</h2><p>This object record may have moved. <a class="text-link" href="objects.html">Return to the objects archive →</a></p></div></section>';});
  }

});
/* Punjab Roots Atlas: data-driven discovery, place filters and browser audio. */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  if (nav && !nav.querySelector('[data-atlas-nav]') && ![...nav.querySelectorAll('a')].some(item => item.href.includes('heritage-atlas.html'))) {
    const prefix = /\/(stories|collections)\//.test(location.pathname) ? '../' : '';
    const link = document.createElement('a');
    link.href = prefix + 'heritage-atlas.html';
    link.dataset.atlasNav = 'true';
    link.setAttribute('data-en','Heritage Atlas');
    link.setAttribute('data-pa','ਵਿਰਾਸਤ ਐਟਲਸ');
    link.textContent = document.documentElement.lang === 'pa' ? 'ਵਿਰਾਸਤ ਐਟਲਸ' : 'Heritage Atlas';
    const exploreLink = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href') && a.getAttribute('href').includes('explore.html'));
    if (exploreLink) exploreLink.insertAdjacentElement('afterend', link);
  }
  const root = document.getElementById('atlas-topics');
  if (!root) return;
  fetch('data/heritage-atlas.json').then(response => {
    if (!response.ok) throw new Error('Atlas data could not be loaded');
    return response.json();
  }).then(data => {
    const search = document.getElementById('atlas-search');
    const count = document.getElementById('atlas-count');
    const filters = [...document.querySelectorAll('[data-region]')];
    let region = 'all';
    const allItems = [
      ...data.sections.map(item => ({...item,type:'Collection',href:'#atlas-explore'})),
      ...data.places.map(item => ({title:item.name,description:item.kind,region:item.region,type:'Place',href:'#atlas-places'})),
      ...data.personalities.map(item => ({title:item.name,description:item.description,region:item.region,type:'Person',href:'#atlas-people'})),
      ...data.glossary.map(item => ({title:item.term+' · '+item.pa,description:item.meaning,region:'shared',type:'Glossary',href:'#atlas-glossary'})),
      ...data.timeline.map(item => ({title:item.date+' · '+item.title,description:item.detail,region:'shared',type:'History',href:'#atlas-timeline'}))
    ];
    function renderTopics() {
      const q = (search?.value || '').trim().toLocaleLowerCase();
      const items = allItems.filter(item => (region === 'all' || item.region === 'shared' || item.region === region) && (!q || (item.title+' '+item.description+' '+(item.pa||'')).toLocaleLowerCase().includes(q)));
      root.innerHTML = items.slice(0,60).map(item => '<a class="atlas-topic-card" href="'+item.href+'"><span>'+item.type+'</span><h3>'+item.title+'</h3><p>'+item.description+'</p><b>Explore entry ↗</b></a>').join('') || '<p class="content-note">No matching entries. Try another word or region.</p>';
      if(count) count.textContent = items.length+' entries';
    }
    filters.forEach(button => button.addEventListener('click', () => {region=button.dataset.region;filters.forEach(b=>b.classList.toggle('is-active',b===button));renderTopics();}));
    search?.addEventListener('input',renderTopics);
    renderTopics();
    const riverRoot=document.getElementById('atlas-rivers');
    if(riverRoot) riverRoot.innerHTML=data.rivers.map((river,i)=>'<span><i>0'+(i+1)+'</i>'+river+'</span>').join('');
    const placesRoot=document.getElementById('atlas-places');
    let placeRegion='all';
    function renderPlaces(){const filtered=data.places.filter(p=>placeRegion==='all'||p.region===placeRegion);placesRoot.innerHTML=filtered.map(p=>'<article class="place-chip"><span>'+ (p.region==='charda'?'CHARDĀ · INDIA':'LEHNDĀ · PAKISTAN')+'</span><b>'+p.name+'</b><small>'+p.kind+'</small></article>').join('');}
    document.querySelectorAll('[data-place-region]').forEach(button=>button.addEventListener('click',()=>{placeRegion=button.dataset.placeRegion;document.querySelectorAll('[data-place-region]').forEach(b=>b.classList.toggle('is-active',b===button));renderPlaces();}));
    renderPlaces();
    const timeline=document.getElementById('atlas-timeline');
    if(timeline) timeline.innerHTML=data.timeline.map((item,i)=>'<article class="timeline-entry"><span>'+item.date+'</span><div><h3>'+item.title+'</h3><p>'+item.detail+'</p><a href="'+item.url+'" target="_blank" rel="noopener">'+item.source+' ↗</a></div></article>').join('');
    const people=document.getElementById('atlas-people');
    if(people) people.innerHTML=data.personalities.map(item=>'<article><span>'+(item.region==='lehnda'?'WESTERN PUNJAB':item.region==='charda'?'EASTERN PUNJAB':'WIDER PUNJAB')+'</span><h3>'+item.name+'</h3><p>'+item.description+'</p></article>').join('');
    const glossary=document.getElementById('atlas-glossary');
    if(glossary) glossary.innerHTML=data.glossary.map(item=>'<article><h3>'+item.term+' <span>'+item.pa+'</span></h3><p>'+item.meaning+'</p></article>').join('');
    const sources=document.getElementById('atlas-sources-list');
    if(sources) sources.innerHTML=data.sources.map(item=>'<li><a href="'+item.url+'" target="_blank" rel="noopener">'+item.label+' ↗</a></li>').join('');
    const speak=document.getElementById('atlas-speak'),stop=document.getElementById('atlas-stop'),language=document.getElementById('atlas-audio-language'),status=document.getElementById('atlas-audio-status');
    speak?.addEventListener('click',()=>{
      if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){status.textContent='Speech playback is not supported by this browser.';return;}
      window.speechSynthesis.cancel();
      const punjabi=language.value==='pa-IN';
      const text=punjabi?'ਪੰਜਾਬ ਦੀ ਵਿਰਾਸਤ ਦਰਿਆਵਾਂ, ਬੋਲੀਆਂ, ਕਵਿਤਾ, ਕਾਰੀਗਰੀ, ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਅਤੇ ਪਰਿਵਾਰਕ ਯਾਦਾਂ ਵਿੱਚ ਵੱਸਦੀ ਹੈ। ਚੜ੍ਹਦਾ ਪੰਜਾਬ ਅਤੇ ਲਹਿੰਦਾ ਪੰਜਾਬ ਵੱਖ-ਵੱਖ ਇਲਾਕਾਈ ਪਛਾਣਾਂ ਰੱਖਦੇ ਹਨ, ਪਰ ਇਨ੍ਹਾਂ ਦੇ ਇਤਿਹਾਸ ਵਿੱਚ ਕਈ ਸਾਂਝੇ ਧਾਗੇ ਵੀ ਹਨ।':'Punjab’s heritage lives in its rivers, languages, poetry, craftsmanship, everyday life and family memories. Charda Punjab and Lehnda Punjab have distinct regional identities, while their histories also carry many shared threads.';
      const utterance=new SpeechSynthesisUtterance(text);utterance.lang=language.value;utterance.onstart=()=>status.textContent='Playing introduction…';utterance.onend=()=>status.textContent='Introduction finished.';utterance.onerror=()=>status.textContent='The selected voice is unavailable. Try the other language.';window.speechSynthesis.speak(utterance);
    });
    stop?.addEventListener('click',()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel();status.textContent='Playback stopped.';});
  }).catch(error => {root.innerHTML='<p class="content-note">The heritage index is temporarily unavailable. Please refresh the page.</p>';console.error(error);});
});


/* Progressive enhancement: keyboard navigation, scroll reveals and mobile menu */
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  if (menuButton && menu) {
    menuButton.setAttribute('aria-controls', 'primary-navigation');
    menu.id = menu.id || 'primary-navigation';
    const setMenu = (open) => {
      menu.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menuButton.textContent = open ? '×' : '☰';
    };
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenu(false);
        menuButton.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (menu.classList.contains('is-open') && !menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700 && menu.classList.contains('is-open')) setMenu(false);
    }, {passive:true});
  }

  const revealItems = document.querySelectorAll('.section-pad, .collection-card, .explore-card, .object-card, .story-feature, .gallery-item, .values-grid article');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
    revealItems.forEach(item => {
      item.classList.add('reveal');
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    link.setAttribute('rel', [...rel].join(' '));
  });
});

/* Keep one review form on the home page; reroute legacy contribution links site-wide. */
document.addEventListener('DOMContentLoaded', () => {
  const nested = /\/(articles|collections|objects|stories|forts)\//.test(location.pathname);
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes('contribute.html') || (href.includes('contact.html') && /review|contribut/i.test(link.textContent))) {
      link.href = (nested ? '../' : '') + 'index.html#review-form';
      link.textContent = link.textContent.replace(/Contribute|Contribution|Contact form/gi, 'Leave a Review');
    }
  });
});


/* Email-app review submission + public, owner-approved GitHub review feed. */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('review-submission-form');
  const feedback = document.getElementById('form-feedback');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const bad = !field.checkValidity();
        field.setAttribute('aria-invalid', String(bad));
        if (bad) valid = false;
      });
      if (!valid) { form.reportValidity(); return; }

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim() || 'Visitor';
      const email = String(data.get('email') || '').trim();
      const topic = String(data.get('review_topic') || '').trim();
      const rating = String(data.get('rating') || '').trim();
      const title = String(data.get('review_title') || '').trim();
      const review = String(data.get('review') || '').trim();
      const body = 'NEW PUNJAB ROOTS REVIEW\n\n'
        + 'Name: ' + name + '\n'
        + 'Visitor email (private; do not publish): ' + (email || 'Not provided') + '\n'
        + 'Topic: ' + topic + '\n'
        + 'Rating: ' + rating + '\n'
        + 'Title: ' + (title || '—') + '\n\n'
        + 'Review:\n' + review + '\n\n'
        + 'Consent: Confirmed for review by the Punjab Roots team.';
      const subject = 'Punjab Roots Review: ' + rating + ' — ' + name;
      const mailto = 'mailto:jassp708737@gmail.com?subject='
        + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      // Use the original submit button as the single email action.
      // The visitor's configured Android email app handles the mailto link.
      if (feedback) {
        feedback.textContent = 'Opening your email app… If nothing opens, check that an email app is installed and set up.';
      }
      window.location.href = mailto;
    });
  }

  const feed = document.getElementById('published-reviews');
  if (feed) {
    fetch('data/reviews.json', {cache:'no-store'})
      .then(response => { if (!response.ok) throw new Error('Review feed unavailable'); return response.json(); })
      .then(data => {
        const reviews = Array.isArray(data.reviews) ? data.reviews.filter(item => item && item.published === true) : [];
        if (!reviews.length) { feed.innerHTML = '<p class="muted">Be the first to share a review. Published community feedback will appear here.</p>'; return; }
        feed.innerHTML = reviews.slice(0, 12).map(item => {
          const card = document.createElement('article'); card.className = 'published-review';
          const stars = document.createElement('div'); stars.className = 'review-stars'; stars.textContent = '★'.repeat(Math.max(1, Math.min(5, Number(item.rating) || 5))) + '☆'.repeat(5 - Math.max(1, Math.min(5, Number(item.rating) || 5)));
          const heading = document.createElement('h3'); heading.textContent = item.title || 'Visitor review';
          const copy = document.createElement('p'); copy.textContent = item.review || '';
          const author = document.createElement('small'); author.textContent = '— ' + (item.name || 'Punjab Roots visitor');
          card.append(stars, heading, copy, author); return card;
        });
      })
      .catch(() => { feed.innerHTML = '<p class="muted">Reviews are temporarily unavailable. Please check back soon.</p>'; });
  }
});


/* Shared interaction polish: convert directional text marks into accessible inline SVG icons. */
(() => {
  const iconPaths = {
    '↗':'M7 17 17 7M7 7h10v10',
    '→':'M4 12h15m-6-6 6 6-6 6',
    '←':'M20 12H5m6 6-6-6 6-6',
    '↑':'M12 20V5m-6 6 6-6 6 6',
    '↓':'M12 4v15m-6-6 6 6 6-6'
  };
  const makeIcon = (glyph) => {
    const span = document.createElement('span');
    span.className = 'arrow-icon arrow-icon-' + ({'↗':'external','→':'right','←':'left','↑':'up','↓':'down'}[glyph] || 'right');
    span.setAttribute('aria-hidden', 'true');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', iconPaths[glyph]);
    svg.appendChild(path);
    span.appendChild(svg);
    return span;
  };
  const iconify = (element) => {
    if (!element || element.nodeType !== 1) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!/[↗→←↑↓]/.test(node.nodeValue || '')) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest('svg,.arrow-icon')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(/([↗→←↑↓])/g).forEach(part => {
        if (iconPaths[part]) fragment.appendChild(makeIcon(part));
        else if (part) fragment.appendChild(document.createTextNode(part));
      });
      node.parentNode.replaceChild(fragment, node);
    });
  };
  const scan = (root) => {
    if (!root) return;
    if (root.nodeType === 1 && root.matches('a,button,[role="button"]')) iconify(root);
    if (root.querySelectorAll) root.querySelectorAll('a,button,[role="button"]').forEach(iconify);
  };
  const setMenuIcon = () => {
    const button = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!button || !nav) return;
    const open = nav.classList.contains('is-open');
    button.classList.toggle('is-open', open);
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    button.setAttribute('aria-expanded', String(open));
    button.innerHTML = open
      ? '<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg>'
      : '<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  };
  const start = () => {
    const style = document.querySelector('link[rel="stylesheet"][href*="assets/css/style.css"]');
    if (style) {
      const url = new URL(style.href, document.baseURI);
      url.searchParams.set('v', '20261124-interaction-polish');
      if (style.href !== url.href) style.href = url.href;
    }
    scan(document.body);
    if (window.MutationObserver && document.body) {
      const observer = new MutationObserver(records => records.forEach(record => {
        if (record.type === 'characterData') {
          const target = record.target.parentElement && record.target.parentElement.closest('a,button,[role="button"]');
          if (target) iconify(target);
        } else record.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            const parentControl = node.closest('a,button,[role="button"]') || (node.parentElement && node.parentElement.closest('a,button,[role="button"]'));
            if (parentControl) iconify(parentControl);
            scan(node);
          } else if (node.nodeType === 3 && node.parentElement) {
            const target = node.parentElement.closest('a,button,[role="button"]');
            if (target) iconify(target);
          }
        });
      }));
      observer.observe(document.body, {childList:true,subtree:true,characterData:true});
    }
    setMenuIcon();
    const button = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    button?.addEventListener('click', setMenuIcon);
    nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', setMenuIcon));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenuIcon(); });
    document.addEventListener('click', setMenuIcon);
    window.addEventListener('resize', setMenuIcon, {passive:true});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
