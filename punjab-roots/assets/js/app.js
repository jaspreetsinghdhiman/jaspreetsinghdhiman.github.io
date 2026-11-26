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
  /* Mobile menu is controlled once by the accessible handler at the end of this file. */
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
  Object.assign(paText, {
  "Heritage": "ਵਿਰਾਸਤ",
  "EXPLORE THE ARCHIVE": "ਪੁਰਾਲੇਖ ਦੀ ਖੋਜ ਕਰੋ",
  "Many stories.": "ਅਨੇਕਾਂ ਕਹਾਣੀਆਂ।",
  "One shared heritage.": "ਇੱਕ ਸਾਂਝੀ ਵਿਰਾਸਤ।",
  "Fairs, Markets & Bazaars": "ਮੇਲੇ, ਬਾਜ਼ਾਰ ਅਤੇ ਮੰਡੀਆਂ",
  "Beliefs & Traditions": "ਵਿਸ਼ਵਾਸ ਅਤੇ ਰਵਾਇਤਾਂ",
  "Personalities & Freedom Fighters": "ਸ਼ਖ਼ਸੀਅਤਾਂ ਅਤੇ ਆਜ਼ਾਦੀ ਘੁਲਾਟੀਏ",
  "Partition History & Memories": "ਵੰਡ ਦਾ ਇਤਿਹਾਸ ਅਤੇ ਯਾਦਾਂ",
  "Religious & Spiritual Heritage": "ਧਾਰਮਿਕ ਅਤੇ ਅਧਿਆਤਮਿਕ ਵਿਰਾਸਤ",
  "Places & Living Memory": "ਥਾਵਾਂ ਅਤੇ ਜੀਵੰਤ ਯਾਦਾਂ",
  "Explore everything ↗": "ਸਭ ਕੁਝ ਵੇਖੋ ↗",
  "PUNJAB ROOTS · HERITAGE STORIES": "ਪੰਜਾਬ ਰੂਟਸ · ਵਿਰਾਸਤੀ ਕਹਾਣੀਆਂ",
  "A living archive of memory and meaning": "ਯਾਦਾਂ ਅਤੇ ਅਰਥਾਂ ਦਾ ਜੀਵੰਤ ਪੁਰਾਲੇਖ",
  "Explore this theme": "ਇਸ ਵਿਸ਼ੇ ਦੀ ਖੋਜ ਕਰੋ",
  "All heritage stories": "ਸਾਰੀਆਂ ਵਿਰਾਸਤੀ ਕਹਾਣੀਆਂ",
  "THE BIGGER PICTURE": "ਵੱਡਾ ਸੰਦਰਭ",
  "Understanding ": "ਸਮਝੋ ",
  "the context.": "ਇਸ ਦਾ ਸੰਦਰਭ।",
  "What this theme includes": "ਇਸ ਵਿਸ਼ੇ ਵਿੱਚ ਕੀ ਸ਼ਾਮਲ ਹੈ",
  "Look closer": "ਹੋਰ ਡੂੰਘਾਈ ਨਾਲ ਜਾਣੋ",
  "How we document it": "ਅਸੀਂ ਇਸ ਨੂੰ ਕਿਵੇਂ ਦਰਜ ਕਰਦੇ ਹਾਂ",
  "Editorial promise": "ਸੰਪਾਦਕੀ ਵਚਨਬੱਧਤਾ",
  "CONTINUE EXPLORING": "ਅੱਗੇ ਹੋਰ ਖੋਜੋ",
  "More of Punjab’s ": "ਪੰਜਾਬ ਦੀ ਹੋਰ ",
  "living heritage.": "ਜੀਵੰਤ ਵਿਰਾਸਤ।",
  "Read our research & editorial method ↗": "ਸਾਡੀ ਖੋਜ ਅਤੇ ਸੰਪਾਦਕੀ ਵਿਧੀ ਪੜ੍ਹੋ ↗",
  "Home / Stories": "ਮੁੱਖ ਪੰਨਾ / ਕਹਾਣੀਆਂ",
  "Traditional Fairs, Markets & Bazaars": "ਰਵਾਇਤੀ ਮੇਲੇ, ਬਾਜ਼ਾਰ ਅਤੇ ਮੰਡੀਆਂ",
  "Beliefs, Customs & Social Traditions": "ਵਿਸ਼ਵਾਸ, ਰਸਮਾਂ ਅਤੇ ਸਮਾਜਿਕ ਰਵਾਇਤਾਂ",
  "Historical Personalities & Freedom Fighters": "ਇਤਿਹਾਸਕ ਸ਼ਖ਼ਸੀਅਤਾਂ ਅਤੇ ਆਜ਼ਾਦੀ ਘੁਲਾਟੀਏ",
  "Explore Punjab’s traditional fairs, seasonal melas, village markets and historic bazaars — places where trade, craft, food, music and community life meet.": "ਪੰਜਾਬ ਦੇ ਰਵਾਇਤੀ ਮੇਲਿਆਂ, ਮੌਸਮੀ ਮੇਲਿਆਂ, ਪਿੰਡਾਂ ਦੇ ਬਾਜ਼ਾਰਾਂ ਅਤੇ ਇਤਿਹਾਸਕ ਮੰਡੀਆਂ ਨੂੰ ਜਾਣੋ — ਉਹ ਥਾਵਾਂ ਜਿੱਥੇ ਵਪਾਰ, ਕਾਰੀਗਰੀ, ਭੋਜਨ, ਸੰਗੀਤ ਅਤੇ ਭਾਈਚਾਰਕ ਜੀਵਨ ਮਿਲਦੇ ਹਨ।",
  "Discover the beliefs, customs, family rituals and social traditions that shape everyday life across Punjab’s diverse communities.": "ਪੰਜਾਬ ਦੇ ਵਿਭਿੰਨ ਭਾਈਚਾਰਿਆਂ ਦੇ ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਨੂੰ ਰੂਪ ਦੇਣ ਵਾਲੇ ਵਿਸ਼ਵਾਸਾਂ, ਰਸਮਾਂ, ਪਰਿਵਾਰਕ ਰੀਤਾਂ ਅਤੇ ਸਮਾਜਿਕ ਰਵਾਇਤਾਂ ਨੂੰ ਜਾਣੋ।",
  "Meet the reformers, writers, artists, educators, community leaders and freedom fighters connected with Punjab’s many histories.": "ਪੰਜਾਬ ਦੇ ਵੱਖ-ਵੱਖ ਇਤਿਹਾਸਾਂ ਨਾਲ ਜੁੜੇ ਸੁਧਾਰਕਾਂ, ਲੇਖਕਾਂ, ਕਲਾਕਾਰਾਂ, ਸਿੱਖਿਆਕਾਰਾਂ, ਭਾਈਚਾਰਕ ਆਗੂਆਂ ਅਤੇ ਆਜ਼ਾਦੀ ਘੁਲਾਟੀਆਂ ਬਾਰੇ ਜਾਣੋ।",
  "Explore the 1947 Partition of Punjab through historical context, family memories, migration, loss, resilience and the ethics of oral history.": "1947 ਦੀ ਪੰਜਾਬ ਵੰਡ ਨੂੰ ਇਤਿਹਾਸਕ ਸੰਦਰਭ, ਪਰਿਵਾਰਕ ਯਾਦਾਂ, ਹਿਜਰਤ, ਵਿਛੋੜੇ, ਹੌਸਲੇ ਅਤੇ ਮੌਖਿਕ ਇਤਿਹਾਸ ਦੀ ਨੈਤਿਕਤਾ ਰਾਹੀਂ ਸਮਝੋ।",
  "Explore Punjab’s diverse sacred places, spiritual traditions, devotional music, shared spaces and histories of faith.": "ਪੰਜਾਬ ਦੇ ਵਿਭਿੰਨ ਪਵਿੱਤਰ ਅਸਥਾਨਾਂ, ਅਧਿਆਤਮਿਕ ਰਵਾਇਤਾਂ, ਭਗਤੀ ਸੰਗੀਤ, ਸਾਂਝੀਆਂ ਥਾਵਾਂ ਅਤੇ ਧਾਰਮਿਕ ਇਤਿਹਾਸਾਂ ਨੂੰ ਜਾਣੋ।",
  "Melas and bazaars were more than places to buy and sell. They brought neighbouring villages together, carried local skills into public view and created spaces for exchange, celebration and everyday conversation.": "ਮੇਲੇ ਅਤੇ ਬਾਜ਼ਾਰ ਸਿਰਫ਼ ਖਰੀਦੋ-ਫ਼ਰੋਖ਼ਤ ਦੀਆਂ ਥਾਵਾਂ ਨਹੀਂ ਸਨ। ਇਹ ਨੇੜਲੇ ਪਿੰਡਾਂ ਨੂੰ ਇਕੱਠਾ ਕਰਦੇ, ਸਥਾਨਕ ਹੁਨਰਾਂ ਨੂੰ ਲੋਕਾਂ ਸਾਹਮਣੇ ਲਿਆਉਂਦੇ ਅਤੇ ਲੈਣ-ਦੇਣ, ਜਸ਼ਨ ਤੇ ਰੋਜ਼ਾਨਾ ਗੱਲਬਾਤ ਲਈ ਮੰਚ ਬਣਦੇ ਸਨ।",
  "Explore seasonal gatherings, religious observances, livestock and agricultural exchange, craft stalls, food traditions, folk performance and family visits. Their forms differ by district, community, faith and time.": "ਮੌਸਮੀ ਇਕੱਠਾਂ, ਧਾਰਮਿਕ ਸਮਾਗਮਾਂ, ਪਸ਼ੂਆਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਦੇ ਵਪਾਰ, ਕਾਰੀਗਰੀ ਦੇ ਸਟਾਲਾਂ, ਖਾਣ-ਪੀਣ ਦੀਆਂ ਰਵਾਇਤਾਂ, ਲੋਕ-ਕਲਾਵਾਂ ਅਤੇ ਪਰਿਵਾਰਕ ਮਿਲਣੀਆਂ ਨੂੰ ਜਾਣੋ। ਇਨ੍ਹਾਂ ਦੇ ਰੂਪ ਜ਼ਿਲ੍ਹੇ, ਭਾਈਚਾਰੇ, ਧਰਮ ਅਤੇ ਸਮੇਂ ਅਨੁਸਾਰ ਵੱਖਰੇ ਹੁੰਦੇ ਹਨ।",
  "A bazaar can reveal how a town grew, what materials travelled through it, which craftspeople served local households and how streets connected neighbourhoods. Documenting a market means recording its name, location, period, trades, languages, memories and changes — not treating every bazaar as identical.": "ਕੋਈ ਬਾਜ਼ਾਰ ਦੱਸ ਸਕਦਾ ਹੈ ਕਿ ਸ਼ਹਿਰ ਕਿਵੇਂ ਵਧਿਆ, ਕਿਹੜੀਆਂ ਵਸਤਾਂ ਉੱਥੋਂ ਲੰਘਦੀਆਂ ਸਨ, ਕਿਹੜੇ ਕਾਰੀਗਰ ਸਥਾਨਕ ਘਰਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਸਨ ਅਤੇ ਗਲੀਆਂ ਨੇ ਮੁਹੱਲਿਆਂ ਨੂੰ ਕਿਵੇਂ ਜੋੜਿਆ। ਬਾਜ਼ਾਰ ਦਾ ਰਿਕਾਰਡ ਬਣਾਉਂਦੇ ਸਮੇਂ ਉਸ ਦਾ ਨਾਂ, ਥਾਂ, ਸਮਾਂ, ਵਪਾਰ, ਭਾਸ਼ਾਵਾਂ, ਯਾਦਾਂ ਅਤੇ ਬਦਲਾਅ ਦਰਜ ਕਰਨੇ ਚਾਹੀਦੇ ਹਨ।",
  "Punjab’s fairs and markets continue to evolve. This archive distinguishes documented history from personal recollection and invites local knowledge to add context.": "ਪੰਜਾਬ ਦੇ ਮੇਲੇ ਅਤੇ ਬਾਜ਼ਾਰ ਅੱਜ ਵੀ ਬਦਲ ਰਹੇ ਹਨ। ਇਹ ਪੁਰਾਲੇਖ ਦਰਜ ਇਤਿਹਾਸ ਅਤੇ ਨਿੱਜੀ ਯਾਦਾਂ ਵਿੱਚ ਫ਼ਰਕ ਰੱਖਦਾ ਹੈ ਅਤੇ ਸਥਾਨਕ ਗਿਆਨ ਰਾਹੀਂ ਸੰਦਰਭ ਜੋੜਨ ਦਾ ਸੱਦਾ ਦਿੰਦਾ ਹੈ।",
  "Traditions are carried through ordinary moments: welcoming a child, preparing a home, sharing food, marking a season, remembering elders and gathering as a family or neighbourhood.": "ਰਵਾਇਤਾਂ ਆਮ ਪਲਾਂ ਰਾਹੀਂ ਅੱਗੇ ਵਧਦੀਆਂ ਹਨ: ਬੱਚੇ ਦਾ ਸਵਾਗਤ, ਘਰ ਦੀ ਤਿਆਰੀ, ਭੋਜਨ ਸਾਂਝਾ ਕਰਨਾ, ਮੌਸਮ ਦਾ ਤਿਉਹਾਰ ਮਨਾਉਣਾ, ਵੱਡਿਆਂ ਨੂੰ ਯਾਦ ਕਰਨਾ ਅਤੇ ਪਰਿਵਾਰ ਜਾਂ ਮੁਹੱਲੇ ਦਾ ਇਕੱਠ।",
  "Explore customs through their context: who practises them, when they take place, what meanings people attach to them and how they change across generations. A custom may be shared widely, locally specific, or meaningful to one family alone.": "ਰਸਮਾਂ ਨੂੰ ਉਨ੍ਹਾਂ ਦੇ ਸੰਦਰਭ ਵਿੱਚ ਸਮਝੋ: ਇਹ ਕੌਣ ਨਿਭਾਉਂਦਾ ਹੈ, ਕਦੋਂ ਹੁੰਦੀਆਂ ਹਨ, ਲੋਕ ਇਨ੍ਹਾਂ ਨਾਲ ਕੀ ਅਰਥ ਜੋੜਦੇ ਹਨ ਅਤੇ ਪੀੜ੍ਹੀਆਂ ਨਾਲ ਕਿਵੇਂ ਬਦਲਦੀਆਂ ਹਨ। ਕੋਈ ਰਸਮ ਵਿਆਪਕ, ਕਿਸੇ ਖ਼ਾਸ ਇਲਾਕੇ ਦੀ ਜਾਂ ਸਿਰਫ਼ ਇੱਕ ਪਰਿਵਾਰ ਲਈ ਮਹੱਤਵਪੂਰਨ ਹੋ ਸਕਦੀ ਹੈ।",
  "Social traditions are not fixed rules. They vary across region, faith, language, class, family and generation. The archive avoids presenting one community’s practice as universal and records disagreement or change where relevant.": "ਸਮਾਜਿਕ ਰਵਾਇਤਾਂ ਅਟੱਲ ਨਿਯਮ ਨਹੀਂ ਹਨ। ਇਹ ਇਲਾਕੇ, ਧਰਮ, ਭਾਸ਼ਾ, ਵਰਗ, ਪਰਿਵਾਰ ਅਤੇ ਪੀੜ੍ਹੀ ਅਨੁਸਾਰ ਬਦਲਦੀਆਂ ਹਨ। ਇਹ ਪੁਰਾਲੇਖ ਕਿਸੇ ਇੱਕ ਭਾਈਚਾਰੇ ਦੀ ਰੀਤ ਨੂੰ ਸਭ ਲਈ ਇੱਕੋ ਜਿਹੀ ਨਹੀਂ ਦਿਖਾਉਂਦਾ ਅਤੇ ਜਿੱਥੇ ਲੋੜ ਹੋਵੇ ਉੱਥੇ ਅੰਤਰ ਜਾਂ ਬਦਲਾਅ ਵੀ ਦਰਜ ਕਰਦਾ ਹੈ।",
  "Personal testimony is valuable, but it is identified as testimony. The archive separates remembered experience, published research and claims that still need verification.": "ਨਿੱਜੀ ਗਵਾਹੀ ਮਹੱਤਵਪੂਰਨ ਹੈ, ਪਰ ਇਸ ਨੂੰ ਗਵਾਹੀ ਵਜੋਂ ਹੀ ਦਰਸਾਇਆ ਜਾਂਦਾ ਹੈ। ਪੁਰਾਲੇਖ ਯਾਦ ਕੀਤੇ ਤਜਰਬੇ, ਪ੍ਰਕਾਸ਼ਿਤ ਖੋਜ ਅਤੇ ਉਹਨਾਂ ਦਾਅਵਿਆਂ ਨੂੰ ਵੱਖ ਰੱਖਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਦੀ ਜਾਂਚ ਹਾਲੇ ਬਾਕੀ ਹੈ।",
  "Punjab’s past has been shaped by people working in many fields: political movements, education, literature, agriculture, social reform, spiritual life, art and public service.": "ਪੰਜਾਬ ਦਾ ਅਤੀਤ ਕਈ ਖੇਤਰਾਂ ਵਿੱਚ ਕੰਮ ਕਰਨ ਵਾਲੇ ਲੋਕਾਂ ਨੇ ਘੜਿਆ ਹੈ: ਰਾਜਨੀਤਿਕ ਲਹਿਰਾਂ, ਸਿੱਖਿਆ, ਸਾਹਿਤ, ਖੇਤੀਬਾੜੀ, ਸਮਾਜਿਕ ਸੁਧਾਰ, ਅਧਿਆਤਮਿਕ ਜੀਵਨ, ਕਲਾ ਅਤੇ ਲੋਕ ਸੇਵਾ।",
  "A responsible profile looks beyond a famous name. It places a person in their time, explains the movement or institution they were part of, identifies the sources behind key claims and recognises the people and communities who worked alongside them.": "ਜ਼ਿੰਮੇਵਾਰ ਜੀਵਨੀ ਸਿਰਫ਼ ਮਸ਼ਹੂਰ ਨਾਂ ਤੱਕ ਸੀਮਿਤ ਨਹੀਂ ਰਹਿੰਦੀ। ਇਹ ਵਿਅਕਤੀ ਨੂੰ ਉਸ ਦੇ ਸਮੇਂ ਵਿੱਚ ਰੱਖਦੀ ਹੈ, ਉਸ ਦੀ ਲਹਿਰ ਜਾਂ ਸੰਸਥਾ ਸਮਝਾਉਂਦੀ ਹੈ, ਮੁੱਖ ਦਾਅਵਿਆਂ ਦੇ ਸਰੋਤ ਦੱਸਦੀ ਹੈ ਅਤੇ ਨਾਲ ਕੰਮ ਕਰਨ ਵਾਲੇ ਲੋਕਾਂ ਤੇ ਭਾਈਚਾਰਿਆਂ ਨੂੰ ਵੀ ਮਾਨਤਾ ਦਿੰਦੀ ਹੈ।",
  "Punjab’s history crosses present-day borders and includes different languages, religions, political positions and experiences. Profiles should reflect that breadth without flattening disagreement or turning complex lives into slogans.": "ਪੰਜਾਬ ਦਾ ਇਤਿਹਾਸ ਅੱਜ ਦੀਆਂ ਸਰਹੱਦਾਂ ਤੋਂ ਪਾਰ ਜਾਂਦਾ ਹੈ ਅਤੇ ਇਸ ਵਿੱਚ ਵੱਖ-ਵੱਖ ਭਾਸ਼ਾਵਾਂ, ਧਰਮਾਂ, ਰਾਜਨੀਤਿਕ ਵਿਚਾਰਾਂ ਅਤੇ ਤਜਰਬਿਆਂ ਦਾ ਹਿੱਸਾ ਹੈ। ਜੀਵਨੀਆਂ ਵਿੱਚ ਇਹ ਵਿਸ਼ਾਲਤਾ ਦਿਖਾਈ ਜਾਣੀ ਚਾਹੀਦੀ ਹੈ, ਬਿਨਾਂ ਮਤਭੇਦਾਂ ਨੂੰ ਮਿਟਾਏ ਜਾਂ ਜਟਿਲ ਜੀਵਨਾਂ ਨੂੰ ਨਾਅਰਿਆਂ ਵਿੱਚ ਬਦਲੇ।",
  "Dates, affiliations, quotations and attributions are checked against reliable records wherever possible. Uncertain details are labelled rather than repeated as established fact.": "ਤਾਰੀਖਾਂ, ਸੰਬੰਧਾਂ, ਹਵਾਲਿਆਂ ਅਤੇ ਕਥਨਾਂ ਦੀ ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ ਭਰੋਸੇਯੋਗ ਰਿਕਾਰਡਾਂ ਨਾਲ ਜਾਂਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਨਿਸ਼ਚਿਤ ਜਾਣਕਾਰੀ ਨੂੰ ਪੱਕਾ ਤੱਥ ਬਣਾਕੇ ਦੁਹਰਾਉਣ ਦੀ ਬਜਾਏ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਦਰਸਾਇਆ ਜਾਂਦਾ ਹੈ।",
  "The 1947 Partition divided Punjab and transformed everyday life across the region. Families were displaced, communities experienced violence and loss, and millions had to rebuild homes and relationships in new places.": "1947 ਦੀ ਵੰਡ ਨੇ ਪੰਜਾਬ ਨੂੰ ਵੰਡ ਦਿੱਤਾ ਅਤੇ ਪੂਰੇ ਖੇਤਰ ਦੇ ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਨੂੰ ਬਦਲ ਦਿੱਤਾ। ਪਰਿਵਾਰ ਉਜੜੇ, ਭਾਈਚਾਰਿਆਂ ਨੇ ਹਿੰਸਾ ਅਤੇ ਵਿਛੋੜਾ ਸਹਿਆ ਅਤੇ ਲੱਖਾਂ ਲੋਕਾਂ ਨੂੰ ਨਵੀਆਂ ਥਾਵਾਂ ਉੱਤੇ ਘਰ ਤੇ ਰਿਸ਼ਤੇ ਮੁੜ ਬਣਾਉਣੇ ਪਏ।",
  "Partition memories can include journeys, abandoned homes, changed borders, missing relatives, new beginnings, language, food, objects kept by families and stories passed between generations. No single account represents everyone’s experience.": "ਵੰਡ ਦੀਆਂ ਯਾਦਾਂ ਵਿੱਚ ਸਫ਼ਰ, ਛੱਡੇ ਹੋਏ ਘਰ, ਬਦਲੀਆਂ ਸਰਹੱਦਾਂ, ਵਿਛੜੇ ਰਿਸ਼ਤੇਦਾਰ, ਨਵੀਂ ਸ਼ੁਰੂਆਤ, ਭਾਸ਼ਾ, ਭੋਜਨ, ਪਰਿਵਾਰਾਂ ਵੱਲੋਂ ਸੰਭਾਲੀਆਂ ਵਸਤਾਂ ਅਤੇ ਪੀੜ੍ਹੀ ਦਰ ਪੀੜ੍ਹੀ ਸੁਣਾਈਆਂ ਕਹਾਣੀਆਂ ਸ਼ਾਮਲ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਕੋਈ ਇੱਕ ਬਿਆਨ ਸਭ ਦੇ ਤਜਰਬੇ ਦੀ ਨੁਮਾਇੰਦਗੀ ਨਹੀਂ ਕਰਦਾ।",
  "Oral histories are shared with care. Memories are attributed to the person or family who provided them, sensitive details are not published without permission, and differing recollections are not forced into one version.": "ਮੌਖਿਕ ਇਤਿਹਾਸ ਸੰਭਾਲ ਨਾਲ ਸਾਂਝਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਯਾਦਾਂ ਦਾ ਸਿਹਰਾ ਉਨ੍ਹਾਂ ਨੂੰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਨੇ ਉਹ ਸਾਂਝੀਆਂ ਕੀਤੀਆਂ। ਇਜਾਜ਼ਤ ਤੋਂ ਬਿਨਾਂ ਸੰਵੇਦਨਸ਼ੀਲ ਵੇਰਵੇ ਪ੍ਰਕਾਸ਼ਿਤ ਨਹੀਂ ਹੁੰਦੇ ਅਤੇ ਵੱਖਰੀਆਂ ਯਾਦਾਂ ਨੂੰ ਜ਼ਬਰਦਸਤੀ ਇੱਕ ਰੂਪ ਨਹੀਂ ਦਿੱਤਾ ਜਾਂਦਾ।",
  "The archive distinguishes documented historical context from personal testimony. It avoids graphic sensationalism, communal blame and unsupported casualty or migration figures.": "ਇਹ ਪੁਰਾਲੇਖ ਦਰਜ ਇਤਿਹਾਸਕ ਸੰਦਰਭ ਅਤੇ ਨਿੱਜੀ ਗਵਾਹੀ ਵਿੱਚ ਫ਼ਰਕ ਰੱਖਦਾ ਹੈ। ਇਹ ਸਨਸਨੀਖੇਜ਼ ਹਿੰਸਕ ਵੇਰਵਿਆਂ, ਕਿਸੇ ਭਾਈਚਾਰੇ ਉੱਤੇ ਸਮੂਹਕ ਦੋਸ਼ ਅਤੇ ਬਿਨਾਂ ਸਬੂਤ ਮੌਤਾਂ ਜਾਂ ਹਿਜਰਤ ਦੇ ਅੰਕੜਿਆਂ ਤੋਂ ਬਚਦਾ ਹੈ।",
  "Punjab’s spiritual landscape includes Sikh, Muslim, Hindu, Christian and other communities, with histories that have shaped architecture, poetry, music, service, pilgrimage and local life.": "ਪੰਜਾਬ ਦੇ ਅਧਿਆਤਮਿਕ ਜੀਵਨ ਵਿੱਚ ਸਿੱਖ, ਮੁਸਲਿਮ, ਹਿੰਦੂ, ਇਸਾਈ ਅਤੇ ਹੋਰ ਭਾਈਚਾਰੇ ਸ਼ਾਮਲ ਹਨ। ਇਨ੍ਹਾਂ ਦੇ ਇਤਿਹਾਸ ਨੇ ਇਮਾਰਤਸਾਜ਼ੀ, ਕਵਿਤਾ, ਸੰਗੀਤ, ਸੇਵਾ, ਤੀਰਥ-ਯਾਤਰਾ ਅਤੇ ਸਥਾਨਕ ਜੀਵਨ ਨੂੰ ਰੂਪ ਦਿੱਤਾ ਹੈ।",
  "Explore sacred architecture and places of worship alongside the people and practices connected with them: devotional singing, prayer, langar and community service, Sufi poetry, festivals, pilgrimage routes and traditions of remembrance.": "ਪਵਿੱਤਰ ਇਮਾਰਤਾਂ ਅਤੇ ਇਬਾਦਤਗਾਹਾਂ ਦੇ ਨਾਲ ਉਨ੍ਹਾਂ ਨਾਲ ਜੁੜੇ ਲੋਕਾਂ ਅਤੇ ਰੀਤਾਂ ਨੂੰ ਜਾਣੋ: ਸ਼ਬਦ-ਕੀਰਤਨ, ਅਰਦਾਸ, ਲੰਗਰ ਅਤੇ ਭਾਈਚਾਰਕ ਸੇਵਾ, ਸੂਫ਼ੀ ਕਵਿਤਾ, ਤਿਉਹਾਰ, ਤੀਰਥ-ਮਾਰਗ ਅਤੇ ਯਾਦ ਦੀਆਂ ਰਵਾਇਤਾਂ।",
  "Religious heritage is presented with respect for each tradition and its own terminology. Shared histories are explored carefully without claiming that distinct beliefs or practices are interchangeable.": "ਧਾਰਮਿਕ ਵਿਰਾਸਤ ਨੂੰ ਹਰ ਰਵਾਇਤ ਅਤੇ ਉਸ ਦੀ ਆਪਣੀ ਸ਼ਬਦਾਵਲੀ ਦੇ ਸਤਿਕਾਰ ਨਾਲ ਪੇਸ਼ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਸਾਂਝੇ ਇਤਿਹਾਸ ਨੂੰ ਧਿਆਨ ਨਾਲ ਸਮਝਿਆ ਜਾਂਦਾ ਹੈ, ਬਿਨਾਂ ਵੱਖਰੇ ਵਿਸ਼ਵਾਸਾਂ ਜਾਂ ਰੀਤਾਂ ਨੂੰ ਇੱਕੋ ਜਿਹਾ ਦੱਸੇ।",
  "Descriptions distinguish historical evidence, community interpretation and living belief. The archive does not rank faiths or present one tradition as the sole expression of Punjab.": "ਵੇਰਵਿਆਂ ਵਿੱਚ ਇਤਿਹਾਸਕ ਸਬੂਤ, ਭਾਈਚਾਰੇ ਦੀ ਵਿਆਖਿਆ ਅਤੇ ਜੀਵੰਤ ਵਿਸ਼ਵਾਸ ਨੂੰ ਵੱਖ ਰੱਖਿਆ ਜਾਂਦਾ ਹੈ। ਇਹ ਪੁਰਾਲੇਖ ਧਰਮਾਂ ਦੀ ਦਰਜਾਬੰਦੀ ਨਹੀਂ ਕਰਦਾ ਅਤੇ ਕਿਸੇ ਇੱਕ ਰਵਾਇਤ ਨੂੰ ਪੰਜਾਬ ਦੀ ਇਕੱਲੀ ਪਛਾਣ ਨਹੀਂ ਦੱਸਦਾ।",
  "Punjab Roots labels oral memories, historical records and interpretation clearly. If a detail is uncertain or contested, that uncertainty stays visible.": "ਪੰਜਾਬ ਰੂਟਸ ਮੌਖਿਕ ਯਾਦਾਂ, ਇਤਿਹਾਸਕ ਰਿਕਾਰਡਾਂ ਅਤੇ ਵਿਆਖਿਆ ਨੂੰ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਵੱਖ ਦਰਸਾਉਂਦਾ ਹੈ। ਜੇ ਕੋਈ ਵੇਰਵਾ ਅਨਿਸ਼ਚਿਤ ਜਾਂ ਵਿਵਾਦਿਤ ਹੋਵੇ, ਤਾਂ ਇਹ ਗੱਲ ਵੀ ਖੁੱਲ੍ਹ ਕੇ ਦੱਸੀ ਜਾਂਦੀ ਹੈ।",
  "Made with respect for Punjab and its people.": "ਪੰਜਾਬ ਅਤੇ ਇਸ ਦੇ ਲੋਕਾਂ ਦੇ ਸਤਿਕਾਰ ਨਾਲ ਤਿਆਰ ਕੀਤਾ।",
  "Discover the Roots. Preserve the Legacy.": "ਜੜ੍ਹਾਂ ਨੂੰ ਜਾਣੋ। ਵਿਰਾਸਤ ਸੰਭਾਲੋ।",
  "Explore the Punjab we inherited — its fields, homes, craftsmanship, everyday objects and the stories that keep them alive.": "ਉਸ ਪੰਜਾਬ ਨੂੰ ਜਾਣੋ ਜੋ ਸਾਨੂੰ ਵਿਰਸੇ ਵਿੱਚ ਮਿਲਿਆ — ਇਸ ਦੇ ਖੇਤ, ਘਰ, ਕਾਰੀਗਰੀ, ਰੋਜ਼ਾਨਾ ਦੀਆਂ ਵਸਤਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜਿਉਂਦਾ ਰੱਖਣ ਵਾਲੀਆਂ ਕਹਾਣੀਆਂ।"
});

  Object.assign(paText, {
  "One district, many kinds of gathering": "ਇੱਕ ਜ਼ਿਲ੍ਹਾ, ਕਈ ਤਰ੍ਹਾਂ ਦੇ ਮੇਲੇ",
  "Local example: Sangrur district": "ਸਥਾਨਕ ਉਦਾਹਰਨ: ਜ਼ਿਲ੍ਹਾ ਸੰਗਰੂਰ",
  "District records from Sangrur describe fairs with different local histories and rhythms. For example, the district administration records Mela Kuti at Gharachon and a fair at Longowal associated with the memory of Bhai Mani Singh. The same record describes folk performance and sporting events such as wrestling and kabaddi. These are examples from one district, not a complete calendar for all of Punjab.": "ਸੰਗਰੂਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਰਿਕਾਰਡ ਵੱਖ-ਵੱਖ ਸਥਾਨਕ ਇਤਿਹਾਸ ਅਤੇ ਰੂਪ ਵਾਲੇ ਮੇਲਿਆਂ ਦਾ ਜ਼ਿਕਰ ਕਰਦੇ ਹਨ। ਉਦਾਹਰਨ ਵਜੋਂ, ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਸ਼ਾਸਨ ਘੜਾਚੋਂ ਦੇ ਮੇਲਾ ਕੁੱਟੀ ਅਤੇ ਭਾਈ ਮਨੀ ਸਿੰਘ ਦੀ ਯਾਦ ਨਾਲ ਜੁੜੇ ਲੌਂਗੋਵਾਲ ਦੇ ਮੇਲੇ ਦਾ ਜ਼ਿਕਰ ਕਰਦਾ ਹੈ। ਇਸੇ ਰਿਕਾਰਡ ਵਿੱਚ ਲੋਕ-ਪੇਸ਼ਕਾਰੀਆਂ, ਕੁਸ਼ਤੀ ਅਤੇ ਕਬੱਡੀ ਵਰਗੀਆਂ ਖੇਡਾਂ ਦਾ ਵੀ ਜ਼ਿਕਰ ਹੈ। ਇਹ ਇੱਕ ਜ਼ਿਲ੍ਹੇ ਦੀਆਂ ਉਦਾਹਰਨਾਂ ਹਨ, ਪੂਰੇ ਪੰਜਾਬ ਦਾ ਪੂਰਾ ਮੇਲਾ-ਕੈਲੰਡਰ ਨਹੀਂ।",
  "What a careful record should capture": "ਇੱਕ ਸੰਭਾਲਿਆ ਹੋਇਆ ਰਿਕਾਰਡ ਕੀ ਦਰਜ ਕਰੇ",
  "For each mela or bazaar, record the local name and spelling, village or town, district, season or date, associated shrine or institution where relevant, principal activities, vendors and crafts, languages used, and the source of each detail. If a date comes from an older district gazetteer or web page, label it as a historical record rather than a guaranteed current schedule.": "ਹਰ ਮੇਲੇ ਜਾਂ ਬਾਜ਼ਾਰ ਲਈ ਸਥਾਨਕ ਨਾਂ ਅਤੇ ਸ਼ਬਦ-ਜੋੜ, ਪਿੰਡ ਜਾਂ ਸ਼ਹਿਰ, ਜ਼ਿਲ੍ਹਾ, ਮੌਸਮ ਜਾਂ ਮਿਤੀ, ਜਿੱਥੇ ਲਾਗੂ ਹੋਵੇ ਉੱਥੇ ਜੁੜਿਆ ਧਾਰਮਿਕ ਅਸਥਾਨ ਜਾਂ ਸੰਸਥਾ, ਮੁੱਖ ਸਰਗਰਮੀਆਂ, ਵਿਕਰੇਤਾ ਅਤੇ ਕਾਰੀਗਰੀ, ਵਰਤੀਆਂ ਭਾਸ਼ਾਵਾਂ ਅਤੇ ਹਰ ਵੇਰਵੇ ਦਾ ਸਰੋਤ ਦਰਜ ਕਰੋ। ਜੇ ਮਿਤੀ ਪੁਰਾਣੇ ਜ਼ਿਲ੍ਹਾ ਗਜ਼ਟੀਅਰ ਜਾਂ ਵੈੱਬ ਪੰਨੇ ਤੋਂ ਹੈ, ਤਾਂ ਉਸ ਨੂੰ ਮੌਜੂਦਾ ਪੱਕੇ ਸਮੇਂ ਦੀ ਬਜਾਏ ਇਤਿਹਾਸਕ ਰਿਕਾਰਡ ਕਹੋ।",
  "Customs are lived, not frozen": "ਰਵਾਇਤਾਂ ਜੀਵੀਆਂ ਜਾਂਦੀਆਂ ਹਨ, ਜਮੀਆਂ ਨਹੀਂ ਰਹਿੰਦੀਆਂ",
  "A custom may change when families move, occupations change, new technologies arrive or younger generations reinterpret an inherited practice. A record should therefore include the community and locality, the person who described it, the date of the account and whether the practice is still observed. Avoid describing a practice as universal simply because it is familiar in one household or village.": "ਪਰਿਵਾਰਾਂ ਦੇ ਹਿਜਰਤ ਕਰਨ, ਕਿੱਤਿਆਂ ਦੇ ਬਦਲਣ, ਨਵੀਂ ਤਕਨਾਲੋਜੀ ਆਉਣ ਜਾਂ ਨਵੀਂ ਪੀੜ੍ਹੀ ਵੱਲੋਂ ਵਿਰਾਸਤੀ ਰੀਤ ਨੂੰ ਨਵੇਂ ਅਰਥ ਦੇਣ ਨਾਲ ਕੋਈ ਰਵਾਇਤ ਬਦਲ ਸਕਦੀ ਹੈ। ਇਸ ਲਈ ਰਿਕਾਰਡ ਵਿੱਚ ਭਾਈਚਾਰਾ ਅਤੇ ਇਲਾਕਾ, ਵੇਰਵਾ ਦੇਣ ਵਾਲਾ ਵਿਅਕਤੀ, ਬਿਆਨ ਦੀ ਮਿਤੀ ਅਤੇ ਇਹ ਗੱਲ ਸ਼ਾਮਲ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ ਕਿ ਰੀਤ ਅਜੇ ਵੀ ਨਿਭਾਈ ਜਾਂਦੀ ਹੈ ਜਾਂ ਨਹੀਂ। ਇੱਕ ਘਰ ਜਾਂ ਪਿੰਡ ਵਿੱਚ ਜਾਣੀ-ਪਛਾਣੀ ਰੀਤ ਨੂੰ ਸਭ ਲਈ ਆਮ ਨਾ ਦੱਸੋ।",
  "Questions that help preserve context": "ਸੰਦਰਭ ਸੰਭਾਲਣ ਵਾਲੇ ਸਵਾਲ",
  "Who performs the custom? Is it connected to a life event, season, occupation, faith or local history? Are there different names or forms in nearby districts? Who does not practise it, and why? These questions make room for diversity, change and disagreement without treating any one account as the only version.": "ਇਹ ਰਸਮ ਕੌਣ ਨਿਭਾਉਂਦਾ ਹੈ? ਕੀ ਇਹ ਜੀਵਨ ਦੀ ਕਿਸੇ ਘਟਨਾ, ਮੌਸਮ, ਕਿੱਤੇ, ਧਰਮ ਜਾਂ ਸਥਾਨਕ ਇਤਿਹਾਸ ਨਾਲ ਜੁੜੀ ਹੈ? ਕੀ ਨੇੜਲੇ ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਇਸ ਦੇ ਵੱਖਰੇ ਨਾਂ ਜਾਂ ਰੂਪ ਹਨ? ਕੌਣ ਇਸ ਨੂੰ ਨਹੀਂ ਨਿਭਾਉਂਦਾ ਅਤੇ ਕਿਉਂ? ਇਹ ਸਵਾਲ ਕਿਸੇ ਇੱਕ ਬਿਆਨ ਨੂੰ ਇਕੱਲਾ ਸੱਚ ਮੰਨੇ ਬਿਨਾਂ ਵਿਭਿੰਨਤਾ, ਬਦਲਾਅ ਅਤੇ ਅੰਤਰ ਲਈ ਥਾਂ ਬਣਾਉਂਦੇ ਹਨ।",
  "Punjab’s freedom struggle was not one story": "ਪੰਜਾਬ ਦੀ ਆਜ਼ਾਦੀ ਦੀ ਲਹਿਰ ਇੱਕੋ ਕਹਾਣੀ ਨਹੀਂ ਸੀ",
  "People from the wider historic Punjab took part in different movements and forms of public action, including anti-colonial organising, the Ghadar movement, the Akali reform movements, peasant and workers’ organising, education, journalism and constitutional politics. Their aims, methods and political beliefs were not identical. A responsible archive places each person in the specific movement, place and period supported by the evidence.": "ਵੱਡੇ ਇਤਿਹਾਸਕ ਪੰਜਾਬ ਦੇ ਲੋਕਾਂ ਨੇ ਵੱਖ-ਵੱਖ ਲਹਿਰਾਂ ਅਤੇ ਜਨਤਕ ਸਰਗਰਮੀਆਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ, ਜਿਵੇਂ ਬਸਤੀਵਾਦ ਵਿਰੋਧੀ ਸੰਗਠਨ, ਗ਼ਦਰ ਲਹਿਰ, ਅਕਾਲੀ ਸੁਧਾਰ ਲਹਿਰਾਂ, ਕਿਸਾਨਾਂ ਅਤੇ ਮਜ਼ਦੂਰਾਂ ਦੀ ਜਥੇਬੰਦੀ, ਸਿੱਖਿਆ, ਪੱਤਰਕਾਰੀ ਅਤੇ ਸੰਵਿਧਾਨਕ ਰਾਜਨੀਤੀ। ਉਨ੍ਹਾਂ ਦੇ ਉਦੇਸ਼, ਤਰੀਕੇ ਅਤੇ ਰਾਜਨੀਤਿਕ ਵਿਚਾਰ ਇੱਕੋ ਜਿਹੇ ਨਹੀਂ ਸਨ। ਜ਼ਿੰਮੇਵਾਰ ਪੁਰਾਲੇਖ ਹਰ ਵਿਅਕਤੀ ਨੂੰ ਸਬੂਤਾਂ ਨਾਲ ਸਮਰਥਿਤ ਖ਼ਾਸ ਲਹਿਰ, ਥਾਂ ਅਤੇ ਸਮੇਂ ਵਿੱਚ ਰੱਖਦਾ ਹੈ।",
  "Names need records, not just remembrance": "ਨਾਂਵਾਂ ਨਾਲ ਰਿਕਾਰਡ ਵੀ ਲੋੜੀਂਦੇ ਹਨ, ਸਿਰਫ਼ ਯਾਦ ਨਹੀਂ",
  "Government publications such as the Ministry of Culture’s Dictionary of Martyrs and historical works produced by Punjabi University provide starting points for checking names, dates and documented activities. District histories can add local context. These sources have their own scope and limitations; an entry in one catalogue should not be treated as a complete account of a person’s life or as proof that every person shared the same political outlook.": "ਸਰਕਾਰ ਦੀਆਂ ਪ੍ਰਕਾਸ਼ਨਾਵਾਂ, ਜਿਵੇਂ ਸੱਭਿਆਚਾਰ ਮੰਤਰਾਲੇ ਦਾ ਸ਼ਹੀਦਾਂ ਦਾ ਕੋਸ਼ ਅਤੇ ਪੰਜਾਬੀ ਯੂਨੀਵਰਸਿਟੀ ਦੇ ਇਤਿਹਾਸਕ ਅਧਿਐਨ, ਨਾਂਵਾਂ, ਮਿਤੀਆਂ ਅਤੇ ਦਰਜ ਸਰਗਰਮੀਆਂ ਦੀ ਜਾਂਚ ਲਈ ਸ਼ੁਰੂਆਤੀ ਸਰੋਤ ਹਨ। ਜ਼ਿਲ੍ਹਾ ਇਤਿਹਾਸ ਸਥਾਨਕ ਸੰਦਰਭ ਜੋੜ ਸਕਦਾ ਹੈ। ਹਰ ਸਰੋਤ ਦੀ ਆਪਣੀ ਹੱਦ ਅਤੇ ਸੀਮਾ ਹੁੰਦੀ ਹੈ; ਕਿਸੇ ਇੱਕ ਸੂਚੀ ਦੀ ਐਂਟਰੀ ਨੂੰ ਪੂਰੀ ਜੀਵਨੀ ਜਾਂ ਇੱਕੋ ਰਾਜਨੀਤਿਕ ਸੋਚ ਦਾ ਸਬੂਤ ਨਾ ਮੰਨੋ।",
  "A short chronology of 1947": "1947 ਦੀ ਸੰਖੇਪ ਸਮਾਂ-ਰੇਖਾ",
  "On 3 June 1947, the British government announced the plan to transfer power to two successor states. India and Pakistan marked independence on 14 and 15 August. The Punjab boundary award was made public on 17 August, after independence celebrations had already begun. The new line divided districts, transport links, farms, towns, sacred places and family networks. The months around Partition brought mass displacement and severe violence; people crossed the new border in both directions.": "3 ਜੂਨ 1947 ਨੂੰ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਨੇ ਸੱਤਾ ਦੋ ਨਵੇਂ ਰਾਜਾਂ ਨੂੰ ਸੌਂਪਣ ਦੀ ਯੋਜਨਾ ਦਾ ਐਲਾਨ ਕੀਤਾ। ਭਾਰਤ ਅਤੇ ਪਾਕਿਸਤਾਨ ਨੇ ਕ੍ਰਮਵਾਰ 14 ਅਤੇ 15 ਅਗਸਤ ਨੂੰ ਆਜ਼ਾਦੀ ਮਨਾਈ। ਪੰਜਾਬ ਦੀ ਹੱਦਬੰਦੀ ਦਾ ਫ਼ੈਸਲਾ 17 ਅਗਸਤ ਨੂੰ ਜਨਤਕ ਕੀਤਾ ਗਿਆ, ਜਦੋਂ ਆਜ਼ਾਦੀ ਦੇ ਜਸ਼ਨ ਸ਼ੁਰੂ ਹੋ ਚੁੱਕੇ ਸਨ। ਨਵੀਂ ਲਕੀਰ ਨੇ ਜ਼ਿਲ੍ਹਿਆਂ, ਆਵਾਜਾਈ ਦੇ ਰਸਤਿਆਂ, ਖੇਤਾਂ, ਸ਼ਹਿਰਾਂ, ਪਵਿੱਤਰ ਥਾਵਾਂ ਅਤੇ ਪਰਿਵਾਰਕ ਰਿਸ਼ਤਿਆਂ ਨੂੰ ਵੰਡ ਦਿੱਤਾ। ਵੰਡ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਮਹੀਨਿਆਂ ਵਿੱਚ ਵੱਡੇ ਪੱਧਰ 'ਤੇ ਉਜਾੜਾ ਅਤੇ ਭਿਆਨਕ ਹਿੰਸਾ ਹੋਈ; ਲੋਕ ਦੋਹਾਂ ਦਿਸ਼ਾਵਾਂ ਵਿੱਚ ਨਵੀਂ ਸਰਹੱਦ ਪਾਰ ਕਰਦੇ ਰਹੇ।",
  "Read documents beside memories": "ਦਸਤਾਵੇਜ਼ਾਂ ਦੇ ਨਾਲ ਯਾਦਾਂ ਵੀ ਪੜ੍ਹੋ",
  "Official files, boundary maps, newspapers and administrative reports can help establish dates and decisions, but they do not capture every household’s experience. Oral histories preserve details that formal records often omit: a station platform, a key kept after leaving a home, a neighbour who helped, a changed village name or a journey remembered decades later. Each testimony should be attributed with consent and read as one person’s account, not as a universal explanation.": "ਸਰਕਾਰੀ ਫ਼ਾਈਲਾਂ, ਸਰਹੱਦੀ ਨਕਸ਼ੇ, ਅਖ਼ਬਾਰ ਅਤੇ ਪ੍ਰਸ਼ਾਸਕੀ ਰਿਪੋਰਟਾਂ ਮਿਤੀਆਂ ਅਤੇ ਫ਼ੈਸਲੇ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀਆਂ ਹਨ, ਪਰ ਹਰ ਘਰ ਦਾ ਤਜਰਬਾ ਦਰਜ ਨਹੀਂ ਕਰਦੀਆਂ। ਮੌਖਿਕ ਇਤਿਹਾਸ ਉਹ ਵੇਰਵੇ ਸੰਭਾਲਦਾ ਹੈ ਜੋ ਸਰਕਾਰੀ ਰਿਕਾਰਡਾਂ ਵਿੱਚ ਅਕਸਰ ਨਹੀਂ ਹੁੰਦੇ: ਰੇਲਵੇ ਸਟੇਸ਼ਨ ਦਾ ਪਲੇਟਫ਼ਾਰਮ, ਘਰ ਛੱਡਣ ਵੇਲੇ ਸੰਭਾਲੀ ਚਾਬੀ, ਮਦਦ ਕਰਨ ਵਾਲਾ ਗੁਆਂਢੀ, ਬਦਲਿਆ ਪਿੰਡ ਦਾ ਨਾਂ ਜਾਂ ਦਹਾਕਿਆਂ ਬਾਅਦ ਯਾਦ ਆਇਆ ਸਫ਼ਰ। ਹਰ ਗਵਾਹੀ ਇਜਾਜ਼ਤ ਨਾਲ ਦਰਜ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ ਅਤੇ ਇੱਕ ਵਿਅਕਤੀ ਦੇ ਤਜਰਬੇ ਵਜੋਂ ਪੜ੍ਹੀ ਜਾਣੀ ਚਾਹੀਦੀ ਹੈ, ਸਭ ਲਈ ਇੱਕੋ ਵਿਆਖਿਆ ਵਜੋਂ ਨਹੀਂ।",
  "Care when collecting testimony": "ਗਵਾਹੀ ਇਕੱਠੀ ਕਰਦੇ ਸਮੇਂ ਸਾਵਧਾਨੀ",
  "Ask permission before recording, storing or publishing a story. Let narrators decide which names and details may be shared. Do not pressure people to recount traumatic events, and do not publish identifying details about living relatives without consent. Preserve the narrator’s words faithfully; translations should be labelled and checked by a fluent speaker.": "ਕਹਾਣੀ ਰਿਕਾਰਡ ਕਰਨ, ਸੰਭਾਲਣ ਜਾਂ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇਜਾਜ਼ਤ ਲਵੋ। ਕਹਾਣੀ ਸੁਣਾਉਣ ਵਾਲੇ ਨੂੰ ਇਹ ਫ਼ੈਸਲਾ ਕਰਨ ਦਿਓ ਕਿ ਕਿਹੜੇ ਨਾਂ ਅਤੇ ਵੇਰਵੇ ਸਾਂਝੇ ਕੀਤੇ ਜਾ ਸਕਦੇ ਹਨ। ਕਿਸੇ ਨੂੰ ਦੁਖਦਾਈ ਘਟਨਾਵਾਂ ਬਿਆਨ ਕਰਨ ਲਈ ਮਜਬੂਰ ਨਾ ਕਰੋ ਅਤੇ ਸਹਿਮਤੀ ਤੋਂ ਬਿਨਾਂ ਜੀਵਤ ਰਿਸ਼ਤੇਦਾਰਾਂ ਦੀ ਪਛਾਣ ਵਾਲੇ ਵੇਰਵੇ ਪ੍ਰਕਾਸ਼ਿਤ ਨਾ ਕਰੋ। ਬਿਆਨ ਕਰਨ ਵਾਲੇ ਦੇ ਸ਼ਬਦਾਂ ਨੂੰ ਇਮਾਨਦਾਰੀ ਨਾਲ ਸੰਭਾਲੋ; ਅਨੁਵਾਦ ਨੂੰ ਸਪਸ਼ਟ ਦਰਸਾਓ ਅਤੇ ਮਾਹਰ ਬੋਲਣ ਵਾਲੇ ਤੋਂ ਜਾਂਚਵਾਓ।",
  "A plural sacred landscape": "ਵਿਭਿੰਨ ਧਾਰਮਿਕ ਅਤੇ ਪਵਿੱਤਰ ਭੂ-ਦ੍ਰਿਸ਼",
  "Punjab’s religious and spiritual geography includes gurdwaras, mosques, Sufi shrines, Hindu temples, churches, samadhs, monasteries and sites remembered by more than one community. Their histories are connected to pilgrimage, teaching, poetry, music, charitable service, local patronage and changing political boundaries. A shared location or story does not make distinct faith traditions interchangeable; each place should be described using the terminology and history recognised by its own community.": "ਪੰਜਾਬ ਦੇ ਧਾਰਮਿਕ ਅਤੇ ਅਧਿਆਤਮਿਕ ਭੂ-ਦ੍ਰਿਸ਼ ਵਿੱਚ ਗੁਰਦੁਆਰੇ, ਮਸਜਿਦਾਂ, ਸੂਫ਼ੀ ਦਰਗਾਹਾਂ, ਹਿੰਦੂ ਮੰਦਰ, ਗਿਰਜਾਘਰ, ਸਮਾਧਾਂ, ਮੱਠ ਅਤੇ ਉਹ ਥਾਵਾਂ ਸ਼ਾਮਲ ਹਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ਇੱਕ ਤੋਂ ਵੱਧ ਭਾਈਚਾਰੇ ਯਾਦ ਕਰਦੇ ਹਨ। ਇਨ੍ਹਾਂ ਦੇ ਇਤਿਹਾਸ ਤੀਰਥ-ਯਾਤਰਾ, ਸਿੱਖਿਆ, ਕਵਿਤਾ, ਸੰਗੀਤ, ਸੇਵਾ, ਸਥਾਨਕ ਸਰਪ੍ਰਸਤੀ ਅਤੇ ਬਦਲਦੀਆਂ ਰਾਜਨੀਤਿਕ ਸਰਹੱਦਾਂ ਨਾਲ ਜੁੜੇ ਹਨ। ਸਾਂਝੀ ਥਾਂ ਜਾਂ ਕਹਾਣੀ ਵੱਖਰੀਆਂ ਧਾਰਮਿਕ ਰਵਾਇਤਾਂ ਨੂੰ ਇੱਕੋ ਜਿਹਾ ਨਹੀਂ ਬਣਾਉਂਦੀ; ਹਰ ਥਾਂ ਨੂੰ ਉਸ ਦੇ ਆਪਣੇ ਭਾਈਚਾਰੇ ਵੱਲੋਂ ਮੰਨੀ ਸ਼ਬਦਾਵਲੀ ਅਤੇ ਇਤਿਹਾਸ ਨਾਲ ਦਰਸਾਇਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।",
  "Examples across the region": "ਪੂਰੇ ਖੇਤਰ ਦੀਆਂ ਉਦਾਹਰਨਾਂ",
  "In Amritsar, the Sri Harmandir Sahib complex is a major Sikh sacred site; UNESCO holds a nomination dossier describing its architectural and historical setting. Across Pakistani Punjab, official tourism material identifies Sikh landmarks as well as Hindu temple complexes and Sufi centres such as Multan and Uch Sharif. These examples show why an archive of Punjab should not reduce spiritual heritage to a single faith or a single side of today’s border.": "ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦਾ ਕੰਪਲੈਕਸ ਸਿੱਖ ਧਰਮ ਦਾ ਪ੍ਰਮੁੱਖ ਪਵਿੱਤਰ ਅਸਥਾਨ ਹੈ; UNESCO ਕੋਲ ਇਸ ਦੀ ਇਮਾਰਤੀ ਅਤੇ ਇਤਿਹਾਸਕ ਪਿਛੋਕੜ ਬਾਰੇ ਨਾਮਜ਼ਦਗੀ ਦਸਤਾਵੇਜ਼ ਮੌਜੂਦ ਹੈ। ਪਾਕਿਸਤਾਨੀ ਪੰਜਾਬ ਵਿੱਚ ਸਰਕਾਰੀ ਸੈਰ-ਸਪਾਟਾ ਜਾਣਕਾਰੀ ਸਿੱਖ ਧਾਰਮਿਕ ਅਸਥਾਨਾਂ ਦੇ ਨਾਲ ਹਿੰਦੂ ਮੰਦਰ ਕੰਪਲੈਕਸਾਂ ਅਤੇ ਮੁਲਤਾਨ ਤੇ ਉੱਚ ਸ਼ਰੀਫ਼ ਵਰਗੇ ਸੂਫ਼ੀ ਕੇਂਦਰਾਂ ਦਾ ਜ਼ਿਕਰ ਕਰਦੀ ਹੈ। ਇਹ ਉਦਾਹਰਨਾਂ ਦੱਸਦੀਆਂ ਹਨ ਕਿ ਪੰਜਾਬ ਦਾ ਪੁਰਾਲੇਖ ਅਧਿਆਤਮਿਕ ਵਿਰਾਸਤ ਨੂੰ ਇੱਕ ਧਰਮ ਜਾਂ ਅੱਜ ਦੀ ਸਰਹੱਦ ਦੇ ਇੱਕ ਪਾਸੇ ਤੱਕ ਸੀਮਿਤ ਨਹੀਂ ਕਰ ਸਕਦਾ।",
  "Documenting a sacred place respectfully": "ਪਵਿੱਤਰ ਥਾਂ ਦਾ ਸਤਿਕਾਰ ਨਾਲ ਰਿਕਾਰਡ ਬਣਾਉਣਾ",
  "Record the recognised name, location, community custodianship, historical period, architectural features, living practices and any access or photography restrictions. Ask before photographing worshippers or ceremonies. Distinguish a community’s sacred tradition or oral account from claims established by archival or archaeological evidence.": "ਮੰਨਿਆ ਹੋਇਆ ਨਾਂ, ਥਾਂ, ਦੇਖਭਾਲ ਕਰਨ ਵਾਲਾ ਭਾਈਚਾਰਾ, ਇਤਿਹਾਸਕ ਸਮਾਂ, ਇਮਾਰਤੀ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ, ਜੀਵੰਤ ਰਵਾਇਤਾਂ ਅਤੇ ਦਾਖ਼ਲੇ ਜਾਂ ਫ਼ੋਟੋਗ੍ਰਾਫ਼ੀ ਦੀਆਂ ਪਾਬੰਦੀਆਂ ਦਰਜ ਕਰੋ। ਸ਼ਰਧਾਲੂਆਂ ਜਾਂ ਸਮਾਗਮਾਂ ਦੀ ਤਸਵੀਰ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਇਜਾਜ਼ਤ ਲਵੋ। ਭਾਈਚਾਰੇ ਦੀ ਪਵਿੱਤਰ ਰਵਾਇਤ ਜਾਂ ਮੌਖਿਕ ਬਿਆਨ ਨੂੰ ਪੁਰਾਤੱਤਵ ਜਾਂ ਪੁਰਾਲੇਖੀ ਸਬੂਤਾਂ ਨਾਲ ਸਥਾਪਿਤ ਦਾਅਵਿਆਂ ਤੋਂ ਵੱਖ ਰੱਖੋ।",
  "Sources & further reading": "ਸਰੋਤ ਅਤੇ ਹੋਰ ਪੜ੍ਹਾਈ",
  "These references support the historical context above. Local accounts and oral testimony are treated separately and are not presented as independently verified facts.": "ਇਹ ਹਵਾਲੇ ਉੱਪਰ ਦਿੱਤੇ ਇਤਿਹਾਸਕ ਸੰਦਰਭ ਦਾ ਸਮਰਥਨ ਕਰਦੇ ਹਨ। ਸਥਾਨਕ ਬਿਆਨਾਂ ਅਤੇ ਮੌਖਿਕ ਗਵਾਹੀਆਂ ਨੂੰ ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਦਰਜ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਆਪਣੇ ਆਪ ਵਿੱਚ ਪ੍ਰਮਾਣਿਤ ਤੱਥ ਨਹੀਂ ਦੱਸਿਆ ਜਾਂਦਾ।",
  "Government of Punjab — Culture": "ਪੰਜਾਬ ਸਰਕਾਰ — ਸੱਭਿਆਚਾਰ",
  "District Sangrur — Fairs and Festivals": "ਜ਼ਿਲ੍ਹਾ ਸੰਗਰੂਰ — ਮੇਲੇ ਅਤੇ ਤਿਉਹਾਰ",
  "Journal of Social Sciences and Development — Living Heritage in Transition: District Gujrat, Punjab": "ਜਰਨਲ ਆਫ਼ ਸੋਸ਼ਲ ਸਾਇੰਸਜ਼ ਐਂਡ ਡਿਵੈਲਪਮੈਂਟ — ਗੁਜਰਾਤ ਜ਼ਿਲ੍ਹੇ ਦੀ ਬਦਲਦੀ ਜੀਵੰਤ ਵਿਰਾਸਤ",
  "Farina Mir — The Social Space of Language: Vernacular Culture in British Colonial Punjab": "ਫ਼ਰੀਨਾ ਮੀਰ — ਭਾਸ਼ਾ ਦਾ ਸਮਾਜਿਕ ਸਥਾਨ: ਬ੍ਰਿਟਿਸ਼ ਕਾਲ ਦੇ ਪੰਜਾਬ ਦੀ ਲੋਕ-ਭਾਸ਼ਾਈ ਸੱਭਿਆਚਾਰ",
  "Ministry of Culture, Government of India — Dictionary of Martyrs (1857–1947)": "ਭਾਰਤ ਸਰਕਾਰ ਦਾ ਸੱਭਿਆਚਾਰ ਮੰਤਰਾਲਾ — ਸ਼ਹੀਦਾਂ ਦਾ ਕੋਸ਼ (1857–1947)",
  "District Amritsar, Government of Punjab — History": "ਜ਼ਿਲ੍ਹਾ ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ ਸਰਕਾਰ — ਇਤਿਹਾਸ",
  "Punjabi University — Eminent Freedom Fighters of Punjab (catalogue record)": "ਪੰਜਾਬੀ ਯੂਨੀਵਰਸਿਟੀ — ਪੰਜਾਬ ਦੇ ਪ੍ਰਮੁੱਖ ਆਜ਼ਾਦੀ ਘੁਲਾਟੀਏ (ਕੈਟਾਲਾਗ ਰਿਕਾਰਡ)",
  "The National Archives (UK) — Partition of British India: original documents, maps and oral testimony": "ਦ ਨੈਸ਼ਨਲ ਆਰਕਾਈਵਜ਼ (ਯੂਕੇ) — ਬ੍ਰਿਟਿਸ਼ ਭਾਰਤ ਦੀ ਵੰਡ: ਅਸਲ ਦਸਤਾਵੇਜ਼, ਨਕਸ਼ੇ ਅਤੇ ਮੌਖਿਕ ਗਵਾਹੀ",
  "The National Archives — Panjab 1947: A Heart Divided": "ਦ ਨੈਸ਼ਨਲ ਆਰਕਾਈਵਜ਼ — ਪੰਜਾਬ 1947: ਵੰਡਿਆ ਹੋਇਆ ਦਿਲ",
  "The 1947 Partition Archive — oral histories and community archive": "1947 ਪਾਰਟੀਸ਼ਨ ਆਰਕਾਈਵ — ਮੌਖਿਕ ਇਤਿਹਾਸ ਅਤੇ ਭਾਈਚਾਰਕ ਪੁਰਾਲੇਖ",
  "UCLA — Select Research Bibliography on the Partition of India": "UCLA — ਭਾਰਤ ਦੀ ਵੰਡ ਬਾਰੇ ਚੁਣੀ ਹੋਈ ਖੋਜ-ਸੂਚੀ",
  "UNESCO World Heritage Centre — Sri Harimandir Sahib nomination dossier": "UNESCO ਵਿਸ਼ਵ ਵਿਰਾਸਤ ਕੇਂਦਰ — ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਨਾਮਜ਼ਦਗੀ ਦਸਤਾਵੇਜ਼",
  "Tourism Development Corporation of Punjab, Pakistan — Historical and Archaeological Tourism": "ਟੂਰਿਜ਼ਮ ਡਿਵੈਲਪਮੈਂਟ ਕਾਰਪੋਰੇਸ਼ਨ ਆਫ਼ ਪੰਜਾਬ, ਪਾਕਿਸਤਾਨ — ਇਤਿਹਾਸਕ ਅਤੇ ਪੁਰਾਤੱਤਵ ਸੈਰ-ਸਪਾਟਾ",
  "National Mission on Monuments and Antiquities — Punjab built heritage inventory": "ਰਾਸ਼ਟਰੀ ਸਮਾਰਕ ਅਤੇ ਪੁਰਾਤਨ ਵਸਤਾਂ ਮਿਸ਼ਨ — ਪੰਜਾਬ ਦੀ ਇਮਾਰਤੀ ਵਿਰਾਸਤ ਸੂਚੀ"
});

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
    function renderPlaces(){const filtered=data.places.filter(p=>placeRegion==='all'||p.region===placeRegion);placesRoot.innerHTML=filtered.map(p=>{const tag=p.href?'a':'article';const href=p.href?' href="'+p.href+'"':'';return '<'+tag+' class="place-chip"'+href+'><span>'+ (p.region==='charda'?'CHARDĀ · INDIA':'LEHNDĀ · PAKISTAN')+'</span><b>'+p.name+'</b><small>'+p.kind+'</small>'+(p.href?'<em>Open place profile ↗</em>':'')+'</'+tag+'>';}).join('');}
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
    // Keep each page's declared stylesheet version; do not override its cache key.
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
    const closeMenu = () => {
      nav.classList.remove('is-open');
      setMenuIcon();
    };
    button?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      nav.classList.toggle('is-open');
      setMenuIcon();
    });
    nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        button?.focus();
      }
    });
    document.addEventListener('click', event => {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !button?.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700 && nav.classList.contains('is-open')) closeMenu();
    }, {passive:true});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();


/* Premium heritage interactions: mega menu, branded preloader and gentle story reveals. */
(() => {
  const addMegaMenu = () => {
    const nav = document.querySelector('.main-nav');
    if (!nav || nav.querySelector('.heritage-mega')) return;
    const wrap = document.createElement('div');
    wrap.className = 'heritage-mega';
    wrap.innerHTML = '<button class="heritage-mega-trigger" type="button" aria-expanded="false">Heritage <span>⌄</span></button><div class="heritage-mega-panel"><div class="heritage-mega-intro"><small>EXPLORE THE ARCHIVE</small><strong>Many stories.<br>One shared heritage.</strong><a href="/punjab-roots/explore.html">Explore everything ↗</a></div><div class="heritage-mega-links"><a href="/punjab-roots/stories/traditional-fairs-markets.html"><small>01</small><span>Fairs, Markets &amp; Bazaars</span><b>↗</b></a><a href="/punjab-roots/stories/beliefs-customs-social-traditions.html"><small>02</small><span>Beliefs &amp; Traditions</span><b>↗</b></a><a href="/punjab-roots/stories/historical-personalities-freedom-fighters.html"><small>03</small><span>Personalities &amp; Freedom Fighters</span><b>↗</b></a><a href="/punjab-roots/stories/partition-history-memories.html"><small>04</small><span>Partition History &amp; Memories</span><b>↗</b></a><a href="/punjab-roots/stories/religious-spiritual-heritage.html"><small>05</small><span>Religious &amp; Spiritual Heritage</span><b>↗</b></a><a href="/punjab-roots/heritage-atlas.html"><small>06</small><span>Places &amp; Living Memory</span><b>↗</b></a></div></div>';
    const anchor = [...nav.querySelectorAll('a')].find(a => /explore/i.test(a.textContent));
    if (anchor) anchor.after(wrap); else nav.prepend(wrap);
    if (document.documentElement.lang === 'pa' && window.PH_SET_LANGUAGE) window.PH_SET_LANGUAGE('pa');
    const trigger = wrap.querySelector('button');
    trigger.addEventListener('click', () => {
      const open = wrap.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) { wrap.classList.remove('is-open'); trigger.setAttribute('aria-expanded','false'); } });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { wrap.classList.remove('is-open'); trigger.setAttribute('aria-expanded','false'); } });
  };
  const addLoader = () => {
    if (document.querySelector('.heritage-loader') || document.body.dataset.skipHeritageLoader === 'true') return;
    const loader = document.createElement('div');
    loader.className = 'heritage-loader';
    loader.setAttribute('aria-hidden','true');
    loader.innerHTML = '<div class="heritage-loader-mark">PR</div><span>PUNJAB ROOTS</span><i></i>';
    document.body.prepend(loader);
    const dismiss = () => { loader.classList.add('is-hidden'); window.setTimeout(() => loader.remove(), 700); };
    if (document.readyState === 'complete') window.setTimeout(dismiss, 220);
    else window.addEventListener('load', () => window.setTimeout(dismiss, 220), {once:true});
    window.setTimeout(dismiss, 1800);
  };
  const addReveals = () => {
    const targets = document.querySelectorAll('.intro-grid,.section-heading,.collection-card,.object-card,.manifesto-content,.story-feature,.explore-card,.gallery-item,.detail-intro');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    targets.forEach(el => el.classList.add('heritage-reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold:.12,rootMargin:'0px 0px -35px 0px'});
    targets.forEach(el => observer.observe(el));
  };
  const init = () => { addMegaMenu(); addLoader(); addReveals(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
