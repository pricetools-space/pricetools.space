#!/bin/bash
CSV="/home/YOURUSERNAMEHERE/pricetools.space/-/data/bitcoin-data.csv"
YESTERDAY=$(date -d 'yesterday' '+%d-%m-%Y')
RAW=$(wget -qO- "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${YESTERDAY}")
CLOSE=$(echo "$RAW" | grep -o '"usd":[ ]*[0-9.]*' | head -1 | cut -d: -f2 | tr -d ' ' | awk '{printf "%.0f", $1}')
YESTERDAY_MDY=$(date -d 'yesterday' '+%-m/%-d/%y')
echo "$YESTERDAY_MDY,$CLOSE" | cat - "$CSV" > "$CSV.new" && mv "$CSV.new" "$CSV"