#!/bin/bash
NOW=$(date '+%Y-%m-%d %H:%M:%S')
RAW=$(wget -qO- "https://mempool.space/api/v1/prices")

extract_price() {
  local key=$1
  echo "$RAW" | grep -o "\"$key\":[0-9]*" | sed 's/.*://' | head -1
}

USD=$(extract_price USD | awk '{printf "%.0f", $1}')

BASE="/home/YOURUSERNAMEHERE/pricetools.space/assets/data"
echo "$NOW,$USD" > "$BASE/bitcoin-current-data.csv"
