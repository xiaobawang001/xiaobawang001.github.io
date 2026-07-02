#!/usr/bin/env bash
# 一键检查 CMS 线上部署所需配置
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG="$ROOT/vitepress/docs/public/admin/config.yml"

echo "==> CMS 部署检查"
echo ""

if grep -qE '^  base_url:' "$CONFIG" 2>/dev/null; then
  BASE_URL=$(rg '^  base_url:' "$CONFIG" | sed 's/.*: *//')
  echo "[OK] config.yml 已配置 base_url: $BASE_URL"
  echo "     OAuth 回调: ${BASE_URL}/callback"
else
  echo "[待办] config.yml 尚未配置 base_url"
  echo "       需先部署 OAuth Worker（见下方）"
fi

echo ""
echo "==> GitHub 仓库 Secrets（Settings → Secrets and variables → Actions）"
echo "  CLOUDFLARE_API_TOKEN      Cloudflare API Token（Workers 编辑权限）"
echo "  CLOUDFLARE_ACCOUNT_ID     Cloudflare Account ID"
echo "  CMS_OAUTH_CLIENT_ID     GitHub OAuth App Client ID"
echo "  CMS_OAUTH_CLIENT_SECRET GitHub OAuth App Client Secret"
echo ""
echo "==> 推荐部署顺序"
echo "  0. 在 Cloudflare 注册 workers.dev 子域（一次性）"
echo "     https://dash.cloudflare.com/?to=/:account/workers/onboarding"
echo "  1. 在 Cloudflare 创建 API Token: https://dash.cloudflare.com/profile/api-tokens"
echo "  2. 将 CLOUDFLARE_* 写入 GitHub Secrets"
echo "  3. 推送代码后运行 Actions: Deploy CMS OAuth Worker"
echo "  4. 在 workflow Summary 复制 Worker URL，创建 GitHub OAuth App:"
echo "     https://github.com/settings/applications/new"
echo "     回调地址填: <Worker URL>/callback"
echo "  5. 将 CMS_OAUTH_* 写入 GitHub Secrets，再次运行 workflow"
echo "  6. 推送站点到 master，访问 https://xiaobawang001.github.io/blog/admin/"
echo ""
echo "==> 本地写作（无需 OAuth）"
echo "  cd vitepress && npm run cms:server   # 终端 1"
echo "  cd vitepress && npm run docs:dev     # 终端 2"
echo "  打开 http://localhost:5173/blog/admin/"
