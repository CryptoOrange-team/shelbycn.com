#!/bin/bash
# ShelbyNet 测试网每日自动交互脚本
# 每天 3 次（GitHub Actions cron 触发）
# 注意: 仅用于了解协议功能，不鼓励女巫攻击

set -euo pipefail

echo "[$(date)] Starting ShelbyNet daily interaction..."

# 检查 shelby CLI 是否安装
if ! command -v shelby &> /dev/null; then
  echo "shelby CLI not installed. Run: npm install -g @shelby-protocol/cli"
  exit 1
fi

# 生成随机测试文件
SIZE=$(( (RANDOM % 500) + 10 ))  # 10-510 KB
FILE="/tmp/shelby-test-$(date +%Y%m%d-%H%M%S).bin"
dd if=/dev/urandom of="$FILE" bs=1024 count="$SIZE" 2>/dev/null

# 上传到 ShelbyNet
shelby upload "$FILE" --name "test-$(date +%Y%m%d-%H%M%S)"

# 清理
rm -f "$FILE"

echo "[$(date)] Done. Uploaded ${SIZE}KB test file."
