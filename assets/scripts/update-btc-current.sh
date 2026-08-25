#!/bin/bash
NOW=$(date '+%Y-%m-%d %H:%M:%S')
RAW=$(wget -qO- "https://mempool.space/api/v1/prices")

extract_price() {
  local key=$1
  echo "$RAW" | grep -o "\"$key\":[0-9]*" | sed 's/.*://' | head -1
}

USD=$(extract_price USD | awk '{printf "%.0f", $1}')
GBP=$(extract_price GBP | awk '{printf "%.0f", $1}')
EUR=$(extract_price EUR | awk '{printf "%.0f", $1}')

BASE="/home/YOURUSERNAMEHERE/pricetools.space/assets/data"
echo "$NOW,$USD" > "$BASE/bitcoin-current-data.csv"
echo "$NOW,$GBP" > "$BASE/bitcoin-current-data-gbp.csv"
echo "$NOW,$EUR" > "$BASE/bitcoin-current-data-eur.csv"
