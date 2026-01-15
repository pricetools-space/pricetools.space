#!/bin/bash
MINING_CSV="/home/YOURUSERNAMEHERE/pricetools.space/-/data/mining-data.csv"
TIMESTAMP=$(date -u +%Y-%m-%d)
HASHRATE_JSON=$(curl -s "https://mempool.space/api/v1/mining/hashrate/3d")
CURRENT_HASHRATE=$(echo "$HASHRATE_JSON" | grep -o '"currentHashrate":[0-9.e+-]*' | cut -d: -f2)
if [ -z "$CURRENT_HASHRATE" ]; then
    echo "Failed to fetch current hashrate"
    exit 1
fi
REWARD_JSON=$(curl -s "https://mempool.space/api/v1/mining/blocks/rewards/24h")
LATEST_REWARD_SATS=$(echo "$REWARD_JSON" | grep -o '"avgRewards":[0-9]*' | head -1 | cut -d: -f2)
if [ -z "$LATEST_REWARD_SATS" ]; then
    echo "Failed to fetch latest block reward"
    exit 1
fi
printf "%s,%s,%s\n" "$TIMESTAMP" "$CURRENT_HASHRATE" "$LATEST_REWARD_SATS" > "$MINING_CSV"