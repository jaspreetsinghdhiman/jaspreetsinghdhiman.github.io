document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]'); if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav');
  if (toggle && nav) { toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? '×' : '☰'; }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='☰'; })); }
  const search = document.getElementById('collection-search'); const cards = [...document.querySelectorAll('.explore-card')]; const count = document.getElementById('result-count'); const empty = document.getElementById('empty-state');
  if (search) search.addEventListener('input', () => { const q = search.value.trim().toLowerCase(); let visible = 0; cards.forEach(card => { const match = (card.dataset.search + ' ' + card.textContent).toLowerCase().includes(q); card.hidden = !match; if (match) visible++; }); if (count) count.textContent = visible + (visible === 1 ? ' collection' : ' collections'); if (empty) empty.hidden = visible !== 0; });
  const lang = document.querySelector('.language-toggle');
  const paText = {
    'Home':'ਮੁੱਖ ਪੰਨਾ','Explore':'ਖੋਜੋ','Objects':'ਵਸਤਾਂ','Stories':'ਕਹਾਣੀਆਂ','Gallery':'ਤਸਵੀਰਾਂ','Our mission':'ਸਾਡਾ ਮਕਸਦ','Contribute':'ਯੋਗਦਾਨ ਪਾਓ','Contact':'ਸੰਪਰਕ',
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
    'A woven cot used for sitting and sleeping, commonly associated with courtyards and open-air domestic life.':'ਬੁਣਿਆ ਹੋਇਆ ਮੰਜਾ, ਜਿਸ ਉੱਤੇ ਬੈਠਿਆ ਅਤੇ ਸੁੱਤਾ ਜਾਂਦਾ ਸੀ; ਇਹ ਵਿਹੜੇ ਅਤੇ ਖੁੱਲ੍ਹੇ ਘਰੇਲੂ ਜੀਵਨ ਨਾਲ ਜੁੜਿਆ ਹੈ।'
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
      const metaDescription=document.querySelector('meta[name="description"]');
      if(metaDescription) metaDescription.content=item.summary_en;
      const canonical=document.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'canonical'}));
      canonical.href=window.location.origin+window.location.pathname+'?id='+encodeURIComponent(id);
      const ogTitle=document.querySelector('meta[property="og:title"]');
      if(ogTitle) ogTitle.content=document.title;
      const ogDescription=document.querySelector('meta[property="og:description"]');
      if(ogDescription) ogDescription.content=item.summary_en;
      let structured=document.getElementById('object-jsonld');
      if(!structured){structured=document.createElement('script');structured.id='object-jsonld';structured.type='application/ld+json';document.head.appendChild(structured);}
      structured.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Thing','name':item.name_en,'alternateName':item.name_pa,'description':item.description_en,'category':item.category_en,'url':canonical.href});
      detailRoot.innerHTML = '<section class="page-hero"><div class="container"><p class="eyebrow">OBJECT RECORD · '+item.category_en.toUpperCase()+' · '+item.category_pa+'</p><h1>'+item.name_en+' <em>— '+item.name_pa+'</em></h1><p>'+item.summary_en+'</p><p class="punjabi-copy" lang="pa">'+item.summary_pa+'</p><div class="breadcrumb"><a href="index.html">Home</a> / <a href="objects.html">Objects</a> / '+item.name_en+'</div></div></section><section class="section-pad"><div class="container object-record"><div class="record-art" aria-label="Punjabi name of the object">'+item.name_pa+'</div><div class="record-copy"><p class="eyebrow">THE STORY & ITS USE</p><h2>'+item.name_en+'<span>'+item.name_pa+'</span></h2><p>'+item.description_en+'</p><p class="punjabi-copy" lang="pa">'+item.description_pa+'</p><div class="record-facts"><div><small>TRADITIONAL MATERIALS · ਸਮੱਗਰੀ</small><b>'+item.materials_en+'</b><span class="punjabi-copy" lang="pa">'+item.materials_pa+'</span></div><div><small>EVERYDAY USE · ਵਰਤੋਂ</small><b>'+item.use_en+'</b><span class="punjabi-copy" lang="pa">'+item.use_pa+'</span></div></div><div class="record-verification"><strong>Research status:</strong> '+item.verification+' Please share local variations or source material through the contribution page.</div>'+(item.source_url?'<p class="record-source"><strong>Reference:</strong> <a href="'+item.source_url+'" target="_blank" rel="noopener">'+item.source_label+' ↗</a></p>':'')+'<div class="record-nav"><a href="objects.html">← All objects</a><a href="contribute.html">Share a correction or memory ↗</a></div></div></div></section>';
      if (window.PH_SET_LANGUAGE) window.PH_SET_LANGUAGE(currentLanguage);
    }).catch(()=>{detailRoot.innerHTML='<section class="section-pad"><div class="container"><h2>Record not found</h2><p>This object record may have moved. <a class="text-link" href="objects.html">Return to the objects archive →</a></p></div></section>';});
  }

});