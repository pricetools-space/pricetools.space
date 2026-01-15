# pricetools.space

Simple, real-time Bitcoin price tools: USD to BTC/Sats converter, historical purchase value tracker (with date/range support), price projection modeler, catch-up calculator, sats pricing, total supply info, and tax estimator. 100% static site, no trackers, no cookies, no personal data collected.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features
- **USD to BTC/Sats Converter**: Instant live conversions, including direct USD to Sats.
- **Price History Tool**: Track current value of past purchases by date or range; view historical prices.
- **Price Projection Tool**: Model future prices based on trends.
- **More Tools**: Catch-up on missed gains, sats-denominated pricing, total BTC supply, tax calculations.

## Setup & Usage
1. Download all files/folders from this repo.
2. Upload everything to your web host root (e.g., via FTP/FileZilla to `/public_html/` or equivalent).
3. Open `index.html` — fully client-side, works offline after first load.

## Data Updates
- `update.sh`: Daily fetch of yesterday's close price (appends to `/-/data/bitcoin-data.csv`).
- `update-current.sh`: Frequent current price refresh (overwrites `/-/data/bitcoin-current-data.csv`).
- Edit scripts: Replace `YOURUSERNAMEHERE` and path placeholders.
- Example cron (daily historical at 1am UTC): `0 1 * * * /bin/bash /home/YOURUSERNAMEHERE/pricetools.space/-/scripts/update.sh > /dev/null 2>&1`
- Current price example: `*/10 * * * * /bin/bash /home/YOURUSERNAMEHERE/pricetools.space/-/scripts/update-current.sh > /dev/null 2>&1`

## License
MIT © pricetools-space — free to use, modify, and distribute.
