# pricetools.space

Simple, real-time Bitcoin price tools: live BTC/USD ticker, instant converter, compare historical data, project future price models, and more. 100% static site, no trackers or  cookies.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features
- Simple distraction-free tools
- BTC ↔ USD instant converter
- Compare historical price data
- Project future price
- Fully client-side, privacy-focused

## Usage
Host provided files and Open `index.html` in any browser.


## How to run the site
1. Clone or download this repo  
2. Upload **all files and folders exactly as they are** to your web host (via FTP, Vercel, Netlify, Cloudflare Pages, etc.)  
3. In "update.sh" file, replace "YOURUSERNAMEHERE" with your server's username and replace ROOTFOLDERNAMEHERE with your folder name that is holding the site
4. In terminal: bash /home/YOURUSERNAMEHERE/ROOTFOLDERNAMEHERE/update.sh
5. To run daily at 1am UTC, in cron: 0 1 * * * /home/YOURUSERNAMEHERE/ROOTFOLDERNAMEHERE/update.sh >/dev/null 2>&1
6. Script will update price daily in csv file in /-/data/ folder
7. Open index.html file in browser. 
   
## License
MIT © pricetools-space — free to use, modify, and distribute.
