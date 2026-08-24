(() => {
  const css = `
    * { box-sizing:border-box; margin:0; padding:0; }
    #menu-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,0.85);
      opacity:0; visibility:hidden; transition:opacity .3s ease;
      z-index:9998; pointer-events:none;
    }
    #menu-overlay.open { opacity:1; visibility:visible; pointer-events:all; }
    #menu {
      position:fixed; inset:0; background:#000; z-index:9999;
      transform:translateY(100%);
      transition:transform .45s cubic-bezier(.16,1,.3,1);
      display:flex; flex-direction:column; min-height:100dvh;
      overflow-y:auto; overscroll-behavior:contain;
    }
    #menu.open { transform:translateY(0); }
    .menu-content {
      flex:1; display:flex; flex-direction:column; justify-content:center;
      width:100%; max-width:360px; padding:40px 1rem 150px;
      text-align:center; margin:0 auto;
    }
    .menu-body { display:flex; flex-direction:column; align-items:center; width:100%; gap:45px; }
    .menu-body a { width:100%; color:#aaa; font-weight:bold; text-decoration:none; text-align:center; transition:color .2s; }
    .menu-body a:hover { color:#fff; }
    .menu-about { font-size:18px; display:flex; align-items:center; justify-content:center; gap:12px; }
    .about-separator { width:1px; height:32px; background:#666; flex-shrink:0; }
    .menu-items {
      display:grid;
      grid-template-columns: minmax(170px, 1fr) minmax(170px, 1fr);
      gap:24px 48px; width:100%; max-width:400px; margin:0 auto;
      justify-content:center; align-content:center; justify-items:center; text-align:center;
    }
    .menu-items a { font-size:16px; line-height:1.3; white-space:nowrap; opacity:0.9; }
    .menu-items a:hover { opacity:1; color:#fff; }
    #nav {
      position:fixed; left:50%; bottom:2vh; transform:translateX(-50%);
      z-index:10001; display:flex; flex-direction:column; align-items:center; gap:12px;
    }
    #menu-toggle {
      height:3rem; width:3rem; display:flex; align-items:center; justify-content:center;
      font-size:3rem; font-weight:100; line-height:1; color:#666;
      cursor:pointer; text-decoration:none;
      animation:pulse-glow 3s infinite ease-in-out;
      transition:color .6s ease, filter .6s ease;
    }
    #menu-toggle:hover { color:#fff; filter:drop-shadow(0 0 14px rgba(255,255,255,0.8)); animation:none; }
    #menu-toggle svg { width:1em; height:1em; stroke:currentColor; stroke-width:0.5; stroke-linecap:round; }
    @keyframes pulse-glow {
      0% { color:#666; filter:drop-shadow(0 0 2px rgba(255,255,255,0)); }
      50% { color:#aaa; filter:drop-shadow(0 0 10px rgba(255,255,255,0.45)); }
      100% { color:#666; filter:drop-shadow(0 0 2px rgba(255,255,255,0)); }
    }
    [data-open-menu] { cursor:pointer; }
    #donateModal {
      display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92);
      z-index:10002; align-items:center; justify-content:center;
    }
    .modal-content {
      background:#000; border:1px solid #555; border-radius:12px;
      padding:1rem 1.8rem 2.5rem; width:90%; max-width:420px;
      color:#eee; text-align:center;
    }
    .modal-topbar { display:flex; justify-content:flex-end; margin:0 -0.4rem 0.25rem 0; }
    .modal-close {
      width:3rem; height:3rem; padding:0; margin:0;
      display:flex; align-items:center; justify-content:center;
      background:none; border:none; color:#666; cursor:pointer;
      transition:color .5s ease; -webkit-appearance:none; appearance:none;
    }
    .modal-close:hover { color:#fff; }
    .modal-close svg { width:3rem; height:3rem; display:block; stroke:currentColor; stroke-width:0.5; stroke-linecap:round; }
    h3 { font-size:1.3rem; margin-bottom:2rem; color:#ddd; }
    .modal-text { color:#888; margin-bottom:2.5rem; font-size:1rem; word-break:break-all; text-align:center; }
    .qr { width:240px; height:240px; margin:1.5rem auto 2.5rem; background:#fff; padding:8px; border:1px solid #444; border-radius:10px; display:block; }
    .copy-btn { background:#111; color:#eee; border:1px solid #555; padding:0.9rem 1.6rem; border-radius:10px; font-size:1rem; cursor:pointer; transition:background .15s; }
    .copy-btn:hover, .copy-btn:active { background:#222; }
    @media(min-width:768px) { .menu-content { max-width:400px; } }
  `;
  const xIcon = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"><path d="M18 6 L6 18 M6 6 l12 12"/></svg>';
  const hamburger = '≡';
  const html = `
    <div id="menu-overlay"></div>
    <div id="menu">
      <div class="menu-content">
        <div class="menu-body">
          <div class="menu-about">
            <a href="/about">About</a>
            <div class="about-separator"></div>
            <a href="#" onclick="openDonateModal(event)">Donate</a>
          </div>
          <div class="menu-items">
            <a href="/past">Past</a>
            <a href="/future">Future</a>
            <a href="/">USD to BTC</a>
            <a href="/usd-to-sats">USD to Sats</a>
            <a href="/btc-by-price">BTC by Price</a>
            <a href="/btc-by-date">BTC by Date</a>
            <a href="/gbp-to-sats">GBP to Sats</a>
            <a href="/supply">Total Supply</a>
            <a href="/compound">Compound</a>
            <a href="/mining">Mining</a>
            <a href="/interest">Interest</a>
            <a href="/lending">Lending</a>
          </div>
        </div>
      </div>
    </div>
    <div id="nav">
      <a id="menu-toggle" role="button" tabindex="0" aria-label="Menu">${hamburger}</a>
    </div>
    <div id="donateModal" onclick="closeDonateModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-topbar">
          <button class="modal-close" onclick="closeDonateModal()" aria-label="Close">${xIcon}</button>
        </div>
        <h3>Donate</h3>
        <p class="modal-text">Lightning: pricetools@getalby.com</p>
        <img src="/assets/images/qr-donate.svg" alt="Lightning QR" class="qr">
        <button class="copy-btn" onclick="navigator.clipboard.writeText('pricetools@getalby.com'); alert('Lightning address copied!')">Copy Address</button>
      </div>
    </div>
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  document.body.insertAdjacentHTML('beforeend', html);
  const overlay = document.getElementById('menu-overlay');
  const menu = document.getElementById('menu');
  const toggle = document.getElementById('menu-toggle');
  const donateModal = document.getElementById('donateModal');
  let isOpen = false;
  const open = () => { isOpen = true; overlay.classList.add('open'); menu.classList.add('open'); toggle.innerHTML = xIcon; toggle.setAttribute('aria-label', 'Close'); };
  const close = () => { isOpen = false; overlay.classList.remove('open'); menu.classList.remove('open'); toggle.innerHTML = hamburger; toggle.setAttribute('aria-label', 'Menu'); };
  toggle.onclick = () => (isOpen ? close() : open());
  overlay.onclick = close;
  document.addEventListener('keydown', e => e.key === 'Escape' && (close(), closeDonateModal()));
  document.addEventListener('click', e => { const t = e.target.closest('[data-open-menu]'); if (t) { e.preventDefault(); open(); } });
  if (location.hash === '#menu') open();
  window.addEventListener('hashchange', () => location.hash === '#menu' && open());
  window.openDonateModal = function(e) { if (e) e.preventDefault(); donateModal.style.display = 'flex'; };
  window.closeDonateModal = function() { donateModal.style.display = 'none'; };
})();
