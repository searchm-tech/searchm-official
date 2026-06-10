#!/bin/bash

# 로컬 빌드 + /dev FTP 배포 스크립트
# 사용법: ./deploy-dev.sh

set -e

FTP_HOST="searchm.co.kr"
FTP_USER="searchm"

echo "🔨 빌드 시작..."
npm run build

echo "📡 FTP 배포 시작 → /dev"
read -s -p "FTP 비밀번호: " FTP_PASS
echo ""

lftp -c "
  set ftp:ssl-allow no;
  set ftp:passive-mode on;
  set net:timeout 30;
  open -u $FTP_USER,$FTP_PASS ftp://$FTP_HOST;
  cd dev;
  mirror -R --delete --parallel=5 --verbose ./dist/ .;
"

echo "✅ 배포 완료 → https://searchm.co.kr/dev/"
