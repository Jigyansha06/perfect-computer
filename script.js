/* PERFECT COMPUTER - interactions. Edit the SERVICES / PRODUCTS arrays to change content. */
(() => {
  'use strict';
  const BUSINESS_EMAIL = 'perfectcomputer465@gmail.com';
  const CATS = { comp: 'Computers & Printing', sec: 'Security & Networking', av: 'Audio, Video & Displays', app: 'Air Conditioning' };
  // [title, icon, description, category, image file in images/]
  const SERVICES = [
    ['CCTV Sales and Service', 'fa-video', 'Camera systems for homes, offices, and campuses, supplied, installed, and maintained.', 'sec', 'cctv 1'],
    ['Networking Sales and Service', 'fa-network-wired', 'Wired and wireless network setup, equipment, and ongoing support.', 'sec', 'networking'],
    ['Hardware Troubleshooting', 'fa-screwdriver-wrench', 'Diagnosis and repair for computer hardware faults and upgrades.', 'comp', 'hardware'],
    ['Laptop Sales and Service', 'fa-laptop', 'Laptops for work and study, with servicing and repair support.', 'comp', 'laptops'],
    ['Desktop Sales and Service', 'fa-desktop', 'Desktop computers and workstations, with servicing and upgrades.', 'comp', 'desktop'],
    ['Complete Video Conferencing Setup', 'fa-users-viewfinder', 'Cameras, audio, and displays set up for clear meetings.', 'av', 'conferencing'],
    ['Air Conditioner Sales and Service', 'fa-snowflake', 'Air conditioner supply, installation, and servicing.', 'app', 'ac'],
    ['Printer Sales and Service', 'fa-print', 'Printers for office and home use, with servicing support.', 'comp', 'printers'],
    ['Projector Sales and Service', 'fa-film', 'Projectors for classrooms and meeting rooms, with service.', 'av', 'projector'],
    ['Interactive Display', 'fa-chalkboard', 'Touch displays for teaching, training, and presentations.', 'av', 'interactive-display'],
    ['Active LED Display', 'fa-tv', 'Large LED display solutions for visibility and impact.', 'av', 'led-display'],
    ['Attendance System', 'fa-fingerprint', 'Attendance tracking systems for offices and institutions.', 'sec', 'attendance'],
    ['Sound System', 'fa-volume-high', 'Sound setups for halls, classrooms, and business spaces.', 'av', 'sound']
  ];
  
  // [group, [[name, Simple Icons slug or '', hex colour]]]. Missing logos fall back to the brand name as text.
  const BRANDS = [
    ['Computers, Laptops & Processors', [['Intel', 'intel', '0071C5'], ['HP', 'hp', '0096D6'], ['Dell', 'dell', '007DB8'], ['Lenovo', 'lenovo', 'E2231A'], ['Acer', 'acer', '83B81A'], ['Apple', 'apple', '000000'], ['NVIDIA', 'nvidia', '76B900'], ['AMD Ryzen', 'ryzen', 'F26522']]],
    ['Networking & Connectivity', [['TP-Link', 'tplink', '4ACBD6'], ['D-Link', 'dlink', '0050A0'], ['Cisco', 'cisco', '1BA0D7'], ['NETGEAR', 'netgear', '333333']]],
    ['Displays, Electronics & Appliances', [['LG', 'lg', 'A50034'], ['Samsung', 'samsung', '1428A0'], ['Panasonic', 'panasonic', '0041C0']]],
    ['Audio, Video & Security', [['Sennheiser', 'sennheiser', '000000'], ['Bosch', 'bosch', 'E20015'], ['Honeywell', 'honeywell', 'E92D2D'], ['Adonis AV', '', ''], ['Ahuja', '', ''], ['Studiomaster', '', '']]]
  ];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---- Build content from data ---- */
  const enqLink = t => `<a class="enq" href="#enquiry" data-service="${esc(t)}">Enquire Now</a>`;
  $('#filters').innerHTML = '<button data-f="all" aria-pressed="true">All Services</button>' +
    Object.entries(CATS).map(([k, v]) => `<button data-f="${k}" aria-pressed="false">${esc(v)}</button>`).join('');

  $('#serviceGrid').innerHTML = SERVICES.map(([t, ic, d, c, file]) => `
    <article class="card pcard tilt-card" data-cat="${c}">
      <div class="thumb"><i class="fa-solid ${ic}" aria-hidden="true"></i>
        <img src="images/${file}.jpg" alt="${esc(t)}" loading="lazy" width="400" height="300" onerror="this.remove()"></div>
      <div class="pbody"><span class="tag">${esc(CATS[c])}</span><h3>${esc(t)}</h3><p>${esc(d)}</p>${enqLink(t)}</div>
    </article>`).join('');

  /* Service filtering */
  const pcards = $$('.pcard');
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
    pcards.forEach(c => {
      const show = b.dataset.f === 'all' || c.dataset.cat === b.dataset.f;
      c.classList.toggle('hide', !show);
      if (show && !reduced) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    });
  });

  const brandTile = ([n, slug, hex]) => `
    <div class="brand"${slug ? '' : ' style="color:var(--od)"'} title="${esc(n)}">${slug
      ? `<img src="https://cdn.simpleicons.org/${slug}/${hex}" alt="${esc(n)}" height="30" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:this.alt,style:'color:#${hex}'}))">`
      : esc(n)}</div>`;
  /* Rolling brand line: the list is rendered twice so the loop is seamless */
  const brandRow = BRANDS.flatMap(g => g[1]).map(brandTile).join('');
  $('#brandGrid').innerHTML = `<div class="marquee reveal" aria-label="Technology brands"><div class="track">${brandRow}<div class="dup" aria-hidden="true">${brandRow}</div></div></div>`;

  $('#footServices').innerHTML = SERVICES.map(([t]) =>
    `<li><a href="#enquiry" data-service="${esc(t)}">${esc(t)}</a></li>`).join('');

  $('#service').innerHTML = '<option value="">Select a service</option>' +
    SERVICES.map(([t]) => `<option>${esc(t)}</option>`).join('') + '<option>Other / General Enquiry</option>';

  $('#year').textContent = new Date().getFullYear();

  /* ---- Header, menu, back-to-top ---- */
  const header = $('#header'), toTop = $('#toTop'), menu = $('#menu'), burger = $('#menuBtn');
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 10);
    toTop.classList.toggle('show', scrollY > 600);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  const setMenu = open => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Highlight current section in the menu */
  const links = $$('.menu a[href^="#"]:not(.btn)');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(l => { const s = $(l.getAttribute('href')); if (s) spy.observe(s); });

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => reduced ? el.classList.add('in') : io.observe(el));

  /* ---- Card tilt (desktop only) and hero parallax ---- */
  if (canHover && !reduced) {
    $$('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(700px) rotateX(${(-y * 8).toFixed(1)}deg) rotateY(${(x * 8).toFixed(1)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
    const stage = $('#stage'), scene = $('#scene');
    stage.addEventListener('mousemove', e => {
      const r = stage.getBoundingClientRect();
      scene.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 24 - 6).toFixed(1) + 'deg');
      scene.style.setProperty('--rx', ((.5 - (e.clientY - r.top) / r.height) * 16 + 6).toFixed(1) + 'deg');
    });
    stage.addEventListener('mouseleave', () => { scene.style.removeProperty('--ry'); scene.style.removeProperty('--rx'); });
  }

  /* ---- Enquiry: preselect service ---- */
  $$('[data-service]').forEach(a => a.addEventListener('click', () => {
    const sel = $('#service'); sel.value = a.dataset.service; if (!sel.value) sel.value = 'Other / General Enquiry';
    setTimeout(() => $('#name').focus({ preventScroll: true }), 600);
  }));

  /* ---- Form validation and mailto flow ---- */
  const form = $('#enquiry'), status = $('#status'), btn = $('#submitBtn');
  const rules = {
    name: v => v.trim().length >= 2 || 'Enter your full name.',
    phone: v => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '').replace(/^\+?91/, m => m)) || 'Enter a valid 10-digit Indian mobile number.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email address.',
    service: v => !!v || 'Choose a service.',
    message: v => v.trim().length >= 10 || 'Write at least 10 characters.'
  };
  const check = id => {
    const f = $('#' + id), res = rules[id](f.value);
    f.classList.toggle('invalid', res !== true);
    f.setAttribute('aria-invalid', res !== true);
    $(`[data-for="${id}"]`).textContent = res === true ? '' : res;
    return res === true;
  };
  Object.keys(rules).forEach(id => $('#' + id).addEventListener('blur', () => check(id)));

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (btn.disabled) return;
    const ok = Object.keys(rules).map(check).every(Boolean);
    status.className = 'status';
    if (!ok) { status.textContent = 'Please fix the highlighted fields.'; status.classList.add('bad'); return; }
    const d = Object.fromEntries(new FormData(form));
    const body = `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nService: ${d.service}\n\n${d.message}`;
    btn.disabled = true;
    status.textContent = 'Opening your email app. Press Send there to deliver your enquiry.';
    status.classList.add('ok');
    location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent('Enquiry: ' + d.service)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => { btn.disabled = false; }, 5000);
  });

  /* ---- Loader: hides once the page has loaded (never blocks longer than 4s) ---- */
  const loader = $('#loader'), t0 = performance.now();
  const hideLoader = () => {
    if (!loader || loader.classList.contains('done')) return;
    loader.classList.add('done');
    document.body.classList.remove('loading');
    setTimeout(() => loader.remove(), 700);
  };
  const ready = () => setTimeout(hideLoader, Math.max(0, 700 - (performance.now() - t0)));
  document.readyState === 'complete' ? ready() : addEventListener('load', ready);
  setTimeout(hideLoader, 4000);
})();