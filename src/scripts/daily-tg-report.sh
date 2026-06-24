#!/bin/bash
# ShelbyCN 每日 TG 数据播报
# 配置: 在 GitHub Secrets 中设置 TG_BOT_TOKEN, TG_CHANNEL_ID
# 运行: bash src/scripts/daily-tg-report.sh

set -euo pipefail

MSG="📊 Shelby 日报 | $(date +%Y.%m.%d)

🔗 测试网:
  explorer.shelby.xyz/shelbynet

📖 今日推荐阅读:
  shelbycn.com/learn/testnet-guide

💬 中文社区:
  t.me/ShelbyCN_Chat"

if [ -n "${TG_BOT_TOKEN:-}" ] && [ -n "${TG_CHANNEL_ID:-}" ]; then
  curl -s "https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage" \
    -d "chat_id=${TG_CHANNEL_ID}" \
    -d "text=${MSG}" \
    -d "parse_mode=Markdown" \
    -d "disable_web_page_preview=true"
fi
