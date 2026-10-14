(() => {
    const css = `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        #menu-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            opacity: 0;
            visibility: hidden;
            transition: opacity .3s ease;
            z-index: 9998;
            pointer-events: none;
        }

        #menu-overlay.open {
            opacity: 1;
            visibility: visible;
            pointer-events: all;
        }

        #menu {
            position: fixed;
            inset: 0;
            background: #000;
            z-index: 9999;
            transform: translateY(100%);
            transition: transform .45s cubic-bezier(.16, 1, .3, 1);
            display: flex;
            flex-direction: column;
            min-height: 100dvh;
            overflow-y: auto;
            overscroll-behavior: contain;
        }

        #menu.open {
            transform: translateY(0);
        }

        .menu-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            max-width: 360px;
            padding: 40px 1rem 150px;
            text-align: center;
            margin: 0 auto;
        }

        .menu-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            gap: 45px;
        }

        .menu-body a {
            width: 100%;
            color: #aaa;
            font-weight: bold;
            text-decoration: none;
            text-align: center;
            transition: color .2s;
        }

        .menu-body a:hover {
            color: #fff;
        }

        .menu-about {
            font-size: 18px;
            display: grid;
            grid-template-columns: 1fr 1px 1fr;
            align-items: center;
            gap: 12px;
        }

        .menu-about a:first-child {
            text-align: right;
        }

        .menu-about a:last-child {
            text-align: left;
        }

        #menu.open #cheers-link {
            animation: cheers-glow 3s ease-in-out;
        }

        #menu.open #cheers-link:hover, #menu.open #cheers-link:focus-visible {
            animation: none;
            color: #fff;
            text-shadow: none;
        }

        @keyframes cheers-glow {
            0%, 100% {
                color: #aaa;
                text-shadow: 0 0 0 transparent;
            }

            50% {
                color: #ddd;
                text-shadow: 0 0 6px #ffffff44;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #menu.open #cheers-link {
                animation: none;
            }
        }

        .about-separator {
            width: 1px;
            height: 32px;
            background: #666;
            flex-shrink: 0;
        }

        .menu-items {
            display: grid;
            grid-template-columns: minmax(170px, 1fr) minmax(170px, 1fr);
            gap: 24px 48px;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            justify-content: center;
            align-content: center;
            justify-items: center;
            text-align: center;
        }

        .menu-items a {
            font-size: 16px;
            line-height: 1.3;
            white-space: nowrap;
            opacity: 0.9;
        }

        .menu-items a:hover {
            opacity: 1;
            color: #fff;
        }

        #nav {
            position: fixed;
            left: 50%;
            bottom: 2vh;
            transform: translateX(-50%);
            z-index: 10001;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }

        #menu-toggle {
            position: relative;
            height: 3rem;
            width: 3rem;
            display: block;
            color: #666;
            cursor: pointer;
            text-decoration: none;
            animation: pulse-glow 3s infinite ease-in-out;
            transition: color .6s ease, filter .6s ease;
        }

        #menu-toggle:hover {
            color: #ccc;
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.22));
            animation: none;
        }

        #menu-toggle:focus {
            outline: none;
        }

        #menu-toggle:focus-visible {
            outline: 1px solid #555;
            border-radius: 10px;
        }

        #menu-toggle .bar {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 26px;
            height: 1.5px;
            margin-left: -13px;
            background: currentColor;
            border-radius: 2px;
            transition: transform .4s cubic-bezier(.16, 1, .3, 1), opacity .25s ease;
        }

        #menu-toggle .bar1 {
            transform: translateY(-6px);
        }

        #menu-toggle .bar3 {
            transform: translateY(6px);
        }

        #menu-toggle.open .bar1 {
            transform: rotate(45deg);
        }

        #menu-toggle.open .bar2 {
            opacity: 0;
        }

        #menu-toggle.open .bar3 {
            transform: rotate(-45deg);
        }

        @keyframes pulse-glow {
            0% {
                color: #666;
                filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
            }

            50% {
                color: #888;
                filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.14));
            }

            100% {
                color: #666;
                filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
            }
        }

        [data-open-menu] {
            cursor: pointer;
        }

        #donateModal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.92);
            z-index: 10002;
            align-items: center;
            justify-content: center;
        }

        #donateModal .tips-flash {
            position: absolute;
            inset: 0;
            background: #fff;
            opacity: 0;
            pointer-events: none;
            animation: tips-flash .7s linear both;
            transform: translateZ(0);
        }

        @keyframes tips-flash {
            0% {
                opacity: 0;
            }
            4% {
                opacity: .055;
            }
            10% {
                opacity: .008;
            }
            15% {
                opacity: .035;
            }
            30%, 100% {
                opacity: 0;
            }
        }

        .tips-lightning {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            pointer-events: none;
            filter: drop-shadow(0 0 3px #fff) drop-shadow(0 0 12px rgba(255, 255, 255, .9)) drop-shadow(0 0 32px rgba(255, 255, 255, .65));
            animation: tips-strike .7s linear both;
        }

        .tips-lightning.mirrored {
            transform: scaleX(-1);
        }

        @keyframes tips-flash-mobile {
            0% {
                opacity: 0;
            }
            4%, 8% {
                opacity: .1;
            }
            12% {
                opacity: .005;
            }
            16%, 20% {
                opacity: .07;
            }
            32%, 100% {
                opacity: 0;
            }
        }

        @keyframes tips-strike-mobile {
            0% {
                opacity: 0;
            }
            3% {
                opacity: .9;
            }
            11% {
                opacity: .7;
            }
            18% {
                opacity: .3;
            }
            40% {
                opacity: .18;
            }
            65% {
                opacity: .07;
            }
            100% {
                opacity: 0;
            }
        }

        @media (max-width: 600px) {
            #donateModal .tips-flash {
                animation-name: tips-flash-mobile;
                animation-delay: .06s;
            }
            .tips-lightning {
                animation-name: tips-strike-mobile;
                animation-duration: .95s;
                animation-delay: .06s;
            }
        }

        @keyframes tips-strike {
            0% {
                opacity: 0;
            }
            4% {
                opacity: .9;
            }
            10% {
                opacity: .12;
            }
            15% {
                opacity: .7;
            }
            24% {
                opacity: .18;
            }
            45% {
                opacity: .07;
            }
            100% {
                opacity: 0;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #donateModal .tips-flash, .tips-lightning {
                animation: none;
            }
        }

        .modal-content {
            position: relative;
            background: #000;
            border: 1px solid #555;
            border-radius: 12px;
            padding: 2.2rem 1.8rem 2.2rem;
            width: 90%;
            max-width: 420px;
            color: #eee;
            text-align: center;
        }

        .modal-close {
            position: relative;
            width: 3rem;
            height: 3rem;
            padding: 0;
            margin: 2.2rem auto 0;
            display: block;
            background: none;
            border: none;
            outline: none;
            color: #666;
            cursor: pointer;
            transition: color .5s ease;
            -webkit-appearance: none;
            appearance: none;
        }

        .modal-close:hover {
            color: #fff;
        }

        .modal-close .bar {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 26px;
            height: 1.5px;
            margin-left: -13px;
            background: currentColor;
            border-radius: 2px;
        }

        .modal-close .bar1 {
            transform: rotate(45deg);
        }

        .modal-close .bar2 {
            transform: rotate(-45deg);
        }

        #donateModal h3 {
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 2rem;
            color: #ddd;
        }

        .modal-text {
            color: #888;
            margin-bottom: 2.5rem;
            font-size: 1rem;
            word-break: break-all;
            text-align: center;
        }

        .qr {
            width: 240px;
            height: 240px;
            margin: 1.5rem auto 2.5rem;
            background: #fff;
            padding: 8px;
            border: 1px solid #444;
            border-radius: 10px;
            display: block;
        }

        .copy-btn {
            background: #111;
            color: #eee;
            border: 1px solid #555;
            padding: 0.9rem 1.6rem;
            width: 10rem;
            border-radius: 10px;
            font-size: 1rem;
            cursor: pointer;
            transition: background .15s;
        }

        .copy-btn:hover, .copy-btn:active {
            background: #222;
        }

        @media (max-width: 600px) {
            #donateModal .modal-content {
                width: 82%;
                max-width: 340px;
                padding: 1.7rem 1rem 1.3rem;
            }

            #donateModal h3 {
                margin-bottom: 1rem;
            }
            #donateModal .modal-text {
                margin-bottom: 1.2rem;
            }
            #donateModal .qr {
                width: 180px;
                height: 180px;
                margin: 0 auto 1.4rem;
            }
            #donateModal .modal-close {
                margin-top: 1rem;
            }
        }

        @media (max-width: 480px) {
            .menu-items {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                column-gap: 24px;
            }
        }

        @media (max-height: 600px) {
            body {
                height: 100dvh;
                padding-bottom: calc(3rem + 2vh + 1rem);
            }

            body > .content {
                max-height: calc(100dvh - 3rem - 2vh - 1rem);
                flex-shrink: 0;
                overflow-y: auto;
            }

            #menu {
                min-height: 0;
                bottom: calc(3rem + 2vh + 1rem);
                transform: translateY(calc(100% + 3rem + 2vh + 1rem));
            }

            .menu-content {
                padding-bottom: 2rem;
            }
        }

        @media (min-width: 768px) {
            .menu-content {
                max-width: 400px;
            }
        }
    `;

    const toggleBars = '<span class="bar bar1"></span><span class="bar bar2"></span><span class="bar bar3"></span>';

    const html = `
        <div id="menu-overlay"></div>
        <div id="menu">
            <div class="menu-content">
                <div class="menu-body">
                    <div class="menu-about">
                        <a href="/about">About</a>
                        <div class="about-separator"></div>
                        <a id="cheers-link" href="#" onclick="openDonateModal(event)">Tips</a>
                    </div>
                    <div class="menu-items">
                        <a href="/">USD to BTC</a>
                        <a href="/usd-to-sats">USD to Sats</a>
                        <a href="/past">Past Price</a>
                        <a href="/future">Future Price</a>
                        <a href="/btc-by-price">BTC by Price</a>
                        <a href="/btc-by-date">BTC by Date</a>
                        <a href="/gbp-to-sats">GBP to Sats</a>
                        <a href="/eur-to-sats">EUR to Sats</a>
                        <a href="/allocation">Allocation</a>
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
            <a id="menu-toggle" role="button" tabindex="0" aria-label="Menu">${toggleBars}</a>
        </div>
        <div id="donateModal" onclick="closeDonateModal()">
            <div class="tips-flash" aria-hidden="true"></div>
            <svg
                class="tips-lightning"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M610 -10 L568 105 L585 139 L527 235 L553 260 L478 398 L512 429 L443 568 L475 594 L429 729 L455 752 L395 1010"
                    fill="none"
                    stroke="white"
                    stroke-width="2.6"
                    vector-effect="non-scaling-stroke"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M568 105 L642 157 L672 236 M429 729 L369 773 L349 859 M590 45 L551 65 L545 87 L523 102 M600 17 L625 34 L620 51 L659 71 L672 98 M418 910 L454 934 L447 954 L483 984 M406 963 L382 978 L364 973 L339 1008"
                    fill="none"
                    stroke="white"
                    stroke-opacity=".55"
                    stroke-width=".75"
                    vector-effect="non-scaling-stroke"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M551 65 L520 57 L494 69 L468 65 M642 157 L667 146 L698 163 L713 160 M620 51 L589 68 L584 83 M369 773 L338 782 L325 808 L296 820 M454 934 L482 923 L495 944 L521 949"
                    fill="none"
                    stroke="white"
                    stroke-opacity=".3"
                    stroke-width=".4"
                    vector-effect="non-scaling-stroke"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <div class="modal-content" onclick="event.stopPropagation()">
                <h3>Tips of any amount are appreciated</h3>
                <p class="modal-text">Lightning: pricetools@getalby.com</p>
                <img src="/assets/images/qr-donate.svg" alt="Lightning QR" class="qr">
                <button
                    class="copy-btn"
                    aria-live="polite"
                >Copy Address</button>
                <button class="modal-close" onclick="closeDonateModal()" aria-label="Close">
                    <span class="bar bar1"></span>
                    <span class="bar bar2"></span>
                </button>
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
    const copyButton = donateModal.querySelector('.copy-btn');
    const lightning = donateModal.querySelector('.tips-lightning');
    const flash = donateModal.querySelector('.tips-flash');
    let copyResetTimer;

    const playLightning = (direction = 0) => {
        lightning.classList.toggle('mirrored', direction === 1);
        lightning.querySelectorAll('path').forEach(path => {
            path.setAttribute('transform', direction === 2 ? 'matrix(1 0 .21 1 -108 0)' : '');
        });
        lightning.style.animation = 'none';
        flash.style.animation = 'none';
        void donateModal.offsetWidth;
        lightning.style.animation = '';
        flash.style.animation = '';
    };

    copyButton.onclick = async () => {
        playLightning(Math.floor(Math.random() * 3));
        clearTimeout(copyResetTimer);
        copyButton.disabled = true;

        try {
            await navigator.clipboard.writeText('pricetools@getalby.com');
            copyButton.textContent = 'Copied';
        } catch {
            copyButton.textContent = 'Copy failed';
        } finally {
            copyButton.disabled = false;
        }

        copyResetTimer = setTimeout(() => {
            copyButton.textContent = 'Copy Address';
        }, 2000);
    };

    let isOpen = false;

    const open = () => {
        isOpen = true;
        overlay.classList.add('open');
        menu.classList.add('open');
        toggle.classList.add('open');
        toggle.setAttribute('aria-label', 'Close');
    };

    const close = () => {
        isOpen = false;
        overlay.classList.remove('open');
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-label', 'Menu');
    };

    toggle.onclick = () => (isOpen ? close() : open());

    toggle.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.onclick();
        }
    });

    overlay.onclick = close;

    document.addEventListener('keydown', e =>
        e.key === 'Escape' && (close(), closeDonateModal())
    );

    document.addEventListener('click', e => {
        const t = e.target.closest('[data-open-menu]');

        if (t) {
            e.preventDefault();
            open();
        }
    });

    if (location.hash === '#menu') open();

    window.addEventListener('hashchange', () =>
        location.hash === '#menu' && open()
    );

    window.openDonateModal = function(e) {
        if (e) e.preventDefault();
        donateModal.style.display = 'flex';
        playLightning();
    };

    window.closeDonateModal = function() {
        donateModal.style.display = 'none';
    };
})();
