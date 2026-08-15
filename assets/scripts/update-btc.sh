#!/bin/bash
CSV="/home/YOURUSERNAMEHERE/pricetools.space/assets/data/bitcoin-data.csv"
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
YESTERDAY_EPOCH=$(date -d "$YESTERDAY" +%s)
YESTERDAY_MDY=$(date -d "yesterday" +%-m/%-d/%y)
if [ ! -f "$CSV" ] || [ ! -s "$CSV" ]; then
    RAW=$(wget -qO- "https://mempool.space/api/v1/prices")
    CLOSE=$(echo "$RAW" | grep -o '"USD":[0-9]*' | sed 's/.*://' | awk '{printf "%.0f",$1}')
    echo "$YESTERDAY_MDY,$CLOSE" > "$CSV"
    exit 0
fi
FIRST_LINE=$(head -n1 "$CSV")
DATE_STR=$(echo "$FIRST_LINE" | cut -d, -f1)
IFS=/ read -r M D YY <<< "$DATE_STR"
M=${M#0}; D=${D#0}; Y=20$YY
LAST_DATE=$(printf "%04d-%02d-%02d" "$Y" "$M" "$D")
LAST_EPOCH=$(date -d "$LAST_DATE" +%s)
if [ "$LAST_EPOCH" -ge "$YESTERDAY_EPOCH" ]; then
    exit 0
fi
NEW_LINES=""
CURRENT_EPOCH=$((LAST_EPOCH + 86400))
while [ "$CURRENT_EPOCH" -le "$YESTERDAY_EPOCH" ]; do
    DAY_TS=$((CURRENT_EPOCH + 90300))
    RAW=$(wget -qO- "https://mempool.space/api/v1/historical-price?currency=USD&timestamp=${DAY_TS}")
    CLOSE=$(echo "$RAW" | grep -o '"USD":[0-9]*' | sed 's/.*://' | head -1 | awk '{printf "%.0f",$1}')
    if [ -z "$CLOSE" ] || [ "$CLOSE" = "0" ]; then
        exit 1
    fi
    MDY=$(date -d "@$CURRENT_EPOCH" +%-m/%-d/%y)
    NEW_LINES="$MDY,$CLOSE\n$NEW_LINES"
    CURRENT_EPOCH=$((CURRENT_EPOCH + 86400))
    sleep 1
done
[ -n "$NEW_LINES" ] && printf "%b" "$NEW_LINES" > "$CSV.new" && cat "$CSV" >> "$CSV.new" && mv "$CSV.new" "$CSV"