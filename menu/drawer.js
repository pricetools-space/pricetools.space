(() => {
  const css = `
    * { box-sizing:border-box; margin:0; padding:0; }
    #drawer-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,0.85);
      opacity:0; visibility:hidden; transition:opacity .3s ease;
      z-index:9998; pointer-events:none;
    }
    #drawer-overlay.open { opacity:1; visibility:visible; pointer-events:all; }
    #drawer {
      position:fixed; inset:0; background:#000; z-index:9999;
      transform:translateY(100%);
      transition:transform .45s cubic-bezier(.16,1,.3,1);
      display:flex; flex-direction:column; min-height:100dvh;
      overflow-y:auto; overscroll-behavior:contain;
    }
    #drawer.open { transform:translateY(0); }
    .drawer-content {
      flex:1; display:flex; flex-direction:column; justify-content:center;
      width:100%; max-width:360px; padding:40px 1rem 2vh;
      text-align:center; margin:0 auto;
    }
    .buttons {
      display:flex; gap:21px; margin-bottom:42px; justify-content:center;
    }
    .buttons a {
      display:flex; flex-direction:column; align-items:center;
      text-decoration:none;
    }
    .buttons img { width:83px; margin-bottom:16px; }
    .buttons .text { font-size:14px; color:#aaa; font-weight:bold; transition:color .2s; }
    .buttons a:hover .text { color:#fff; }
    .buttons a:hover img { transform:scale(1.1); transition:transform .2s; }
    .drawer-menu {
      display:flex; flex-direction:column; align-items:center;
      width:100%; gap:45px;
    }
    .drawer-menu a {
      width:100%; color:#aaa; font-weight:bold;
      text-decoration:none; text-align:center; transition:color .2s;
    }
    .drawer-menu a:hover { color:#fff; }
    .menu-about { font-size:18px; display:flex; align-items:center; justify-content:center; gap:12px; }
    .about-separator { width:1px; height:32px; background:#666; opacity:1; flex-shrink:0; }
    .menu-items {
      display:grid;
      grid-template-columns: minmax(170px, 1fr) minmax(170px, 1fr);
      gap:24px 48px;
      width:100%;
      max-width:400px;
      margin:0 auto;
      justify-content:center;
      align-content:center;
      justify-items:center;
      text-align:center;
    }
    .menu-items a {
      font-size:16px;
      line-height:1.3;
      white-space:nowrap;
      opacity:0.9;
    }
    .menu-items a:hover { opacity:1; color:#fff; }
    .close-x {
      all:unset;
      padding:2vh 0;
      font-size:3rem; font-weight:100; color:#666;
      cursor:pointer; transition:color .5s ease;
      line-height:1; display:flex; align-items:center; justify-content:center;
      width:100%; background:transparent;
    }
    .close-x:hover { color:#fff; background:transparent; }
    .close-x svg { width:1em; height:1em; stroke:currentColor; stroke-width:0.5; stroke-linecap:round; }
    [data-open-drawer] { cursor:pointer; }
    #donateModal {
      display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92);
      z-index:10000; align-items:center; justify-content:center;
    }
    .modal-content {
      background:#000; border:1px solid #555; border-radius:12px;
      padding:2.5rem 1.8rem; width:90%; max-width:420px; position:relative;
      color:#eee; text-align:center; z-index:10001;
    }
    .close-btn {
      position:absolute; top:10px; right:14px; background:none; border:none;
      color:#666; font-size:3rem; font-weight:100; line-height:1;
      cursor:pointer; transition:color .5s ease;
    }
    .close-btn:hover { color:#fff; }
    .close-btn svg { width:1em; height:1em; stroke:currentColor; stroke-width:0.5; stroke-linecap:round; }
    h3 { font-size:1.3rem; margin-bottom:2rem; color:#ddd; }
    .modal-text {
      color:#888; margin-bottom:2.5rem; font-size:1rem;
      word-break:break-all; text-align:center;
    }
    .qr { width:240px; height:240px; margin:1.5rem auto 2.5rem; background:#fff;
      padding:8px; border:1px solid #444; border-radius:10px; display:block; }
    .copy-btn { background:#111; color:#eee; border:1px solid #555;
      padding:0.9rem 1.6rem; border-radius:10px; font-size:1rem;
      cursor:pointer; transition:background .15s; }
    .copy-btn:hover, .copy-btn:active { background:#222; }
    @media(min-width:768px) { .drawer-content { max-width:400px; } }
  `;
  const html = `
    <div id="drawer-overlay"></div>
    <div id="drawer">
      <div class="drawer-content">
        <div class="buttons">
          <a href="/past" aria-label="Past Price Tool">
            <img src="/-/images/r.svg" alt="">
            <span class="text">Past</span>
          </a>
          <a href="/usd-to-btc" aria-label="USD to BTC">
            <img src="/-/images/cal.svg" alt="">
            <span class="text">USD to BTC</span>
          </a>
          <a href="/future" aria-label="Future Price Tool">
            <img src="/-/images/ff.svg" alt="">
            <span class="text">Future</span>
          </a>
        </div>
        <div class="drawer-menu">
          <div class="menu-about">
            <a href="/about">About</a>
            <div class="about-separator"></div>
            <a href="#" onclick="openDonateModal(event)">Donate</a>
          </div>
          <div class="menu-items">
            <a href="/usd-to-sats">USD to Sats</a>
            <a href="/btc-by-price">BTC by Price</a>
            <a href="/btc-by-date">BTC by Date</a>
            <a href="/supply">Total Supply</a>
            <a href="/compound">Compound</a>
            <a href="/mining">Mining</a>
            <a href="/debasement">Debasement</a>
            <a href="/interest">Interest</a>
            <a href="/lending">Lending</a>
          </div>
        </div>
      </div>
      <button class="close-x" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6 L6 18 M6 6 l12 12"/>
        </svg>
      </button>
    </div>
    <div id="donateModal" onclick="closeDonateModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <button class="close-btn" onclick="closeDonateModal()" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6 L6 18 M6 6 l12 12"/>
          </svg>
        </button>
        <h3>Donate</h3>
        <p class="modal-text">Lightning: pricetools@getalby.com</p>
        <img src="/-/images/qr-donate.svg" alt="Lightning QR" class="qr">
        <button class="copy-btn" onclick="navigator.clipboard.writeText('pricetools@getalby.com'); alert('Lightning address copied!')">Copy Address</button>
      </div>
    </div>
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  document.body.insertAdjacentHTML('beforeend', html);
  const overlay = document.getElementById('drawer-overlay');
  const drawer = document.getElementById('drawer');
  const closeBtn = document.querySelector('.close-x');
  const donateModal = document.getElementById('donateModal');
  const open = () => { overlay.classList.add('open'); drawer.classList.add('open'); };
  const close = () => { overlay.classList.remove('open'); drawer.classList.remove('open'); };
  overlay.onclick = close;
  closeBtn.onclick = close;
  document.addEventListener('keydown', e => e.key === 'Escape' && (close(), closeDonateModal()));
  document.addEventListener('click', e => e.target.closest('[data-open-drawer]') && open());
  window.openDonateModal = function(e) {
    e.preventDefault();
    donateModal.style.display = 'flex';
  };
  window.closeDonateModal = function() {
    donateModal.style.display = 'none';
  };
})();