# pricetools.space

Simple, real-time Bitcoin price tools: USD to BTC/Sats converter, historical purchase value tracker, price projection modeler, compound growth, lending & interest tools, and mining calculation tools. 100% static site, no trackers, no cookies, no personal data collected.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features
- **USD to BTC/Sats Converter**: Instant live conversions, including direct USD to Sats.
- **Currency Converters**: GBP and EUR to Sats.
- **Price History Tool**: Track current value of past purchases by date or range; view historical prices.
- **Price Projection Tool**: Model future prices based on selected growth rate.
- **Allocation Tool**: Split bitcoin holdings into stacks and see the percentage of each.
- **More Tools**: Compound growth, lending & interest calculators, mining stats, total BTC supply.

## Setup & Usage
1. Download all files/folders from this repo.
2. Upload everything to your web host root (e.g., via FTP/FileZilla to `/public_html/` or equivalent).
3. Open `index.html` — fully client-side, works offline after first load.

## Data Updates
- `update-btc.sh`: Daily fetch of yesterday's close price (appends to `/assets/data/bitcoin-data.csv`).
- `update-btc-current.sh`: Frequent current price refresh (overwrites `/assets/data/bitcoin-current-data.csv`).
- `update-mining.sh`: Updates mining stats (`/assets/data/mining-data.csv`).
- Edit scripts: Replace `YOURUSERNAMEHERE` and path placeholders.
- Example cron (daily historical at 1am UTC): `0 1 * * * /bin/bash /home/YOURUSERNAMEHERE/pricetools.space/assets/scripts/update-btc.sh > /dev/null 2>&1`
- Current price example: `*/10 * * * * /bin/bash /home/YOURUSERNAMEHERE/pricetools.space/assets/scripts/update-btc-current.sh > /dev/null 2>&1`

## License
MIT © pricetools-space — free to use, modify, and distribute.