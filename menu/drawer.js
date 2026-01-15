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
      grid-template-columns:1fr 1fr;
      gap:20px 40px;
      width:100%;
      align-items:center;
      justify-items:center;
    }
    .menu-items a { font-size:16px; opacity:0.9; }
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
    @media(min-width:768px) { .drawer-content { max-width:360px; } }
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
            <a href="#" onclick="copyAddress(event)">Donate</a>
          </div>
          <div class="menu-items">
            <a href="/usd-to-sats">USD to Sats</a>
            <a href="/eur-to-sats">EUR to Sats</a>
            <a href="/gbp-to-sats">GBP to Sats</a>
            <a href="/aud-to-sats">AUD to Sats</a>
            <a href="/btc-by-date">BTC by Date</a>
            <a href="/btc-by-price">BTC by Price</a>
            <a href="/date-range">Date Range</a>
            <a href="/supply">Total Supply</a>
            <a href="/catch-up">Catch Up Cost</a>
            <a href="/compound">Compound</a>
            <a href="/tax">Taxes</a>
            <a href="/mining">Mining</a>
            <a href="/inflation">Inflation</a>
            <a href="/interest">Interest</a>
          </div>
        </div>
      </div>
      <button class="close-x" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6 L6 18 M6 6 l12 12"/>
        </svg>
      </button>
    </div>
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  document.body.insertAdjacentHTML('beforeend', html);
  const overlay = document.getElementById('drawer-overlay');
  const drawer = document.getElementById('drawer');
  const closeBtn = document.querySelector('.close-x');
  const open = () => { overlay.classList.add('open'); drawer.classList.add('open'); };
  const close = () => { overlay.classList.remove('open'); drawer.classList.remove('open'); };
  overlay.onclick = close;
  closeBtn.onclick = close;
  document.addEventListener('keydown', e => e.key === 'Escape' && close());
  document.addEventListener('click', e => e.target.closest('[data-open-drawer]') && open());
  window.copyAddress = function(e) {
    e.preventDefault();
    if (confirm('Copy lightning address: pricetools@getalby.com to clipboard?')) {
      navigator.clipboard.writeText('pricetools@getalby.com');
    }
  };
})();