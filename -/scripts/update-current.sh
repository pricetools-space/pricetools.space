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
CAD=$(extract_price CAD | awk '{printf "%.0f", $1}')
AUD=$(extract_price AUD | awk '{printf "%.0f", $1}')
JPY=$(extract_price JPY | awk '{printf "%.0f", $1}')

echo "$NOW,$USD" > "/home/YOURUSERNAMEHERE/pricetools.space/-/data/bitcoin-current-data.csv"
echo "$NOW,$GBP" > "/home/YOURUSERNAMEHERE/pricetools.space/-/data/bitcoin-current-data-gbp.csv"
echo "$NOW,$EUR" > "/home/YOURUSERNAMEHERE/pricetools.space/-/data/bitcoin-current-data-eur.csv"
echo "$NOW,$CAD" > "/home/YOURUSERNAMEHERE/pricetools.space/-/data/bitcoin-current-data-cad.csv"
echo "$NOW,$AUD" > "/home/YOURUSERNAMEHERE/pricetools.space/-/data/bitcoin-current-data-aud.csv"
echo "$NOW,$JPY" > "/home/YOURUSERNAMEHERE/pricetools.space/-/data/bitcoin-current-data-jpy.csv"