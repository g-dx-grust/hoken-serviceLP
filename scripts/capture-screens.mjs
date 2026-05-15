// HOKENA CRM スクリーンショット取得スクリプト
// usage: pnpm screens
// 前提: insurance-crm が http://localhost:3000 で起動していること
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "screens");

const CRM_URL = process.env.CRM_URL ?? "http://localhost:3000";
const EMAIL = process.env.CRM_EMAIL ?? "demo@n-lic-crm.local";
const PASSWORD = process.env.CRM_PASSWORD ?? "Nlic2026demo!";

const TARGETS = [
  { path: "/", file: "dashboard.png", waitForText: null },
  { path: "/customers", file: "customers.png", waitForText: "顧客" },
  { path: "/intentions", file: "intentions.png", waitForText: "意向" },
  { path: "/intentions/new", file: "intention-wizard.png", waitForText: "意向" },
  { path: "/contracts", file: "contracts.png", waitForText: "契約" },
  { path: "/opportunities", file: "opportunities.png", waitForText: null },
  { path: "/calendar", file: "calendar.png", waitForText: null },
  { path: "/reports", file: "reports.png", waitForText: null },
  { path: "/settlement", file: "settlement.png", waitForText: null },
  { path: "/financial-checks", file: "financial-checks.png", waitForText: null },
];

async function run() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
  });
  const page = await ctx.newPage();

  // ---- ログイン ----
  console.log(`[login] ${CRM_URL}/login`);
  await page.goto(`${CRM_URL}/login`, { waitUntil: "domcontentloaded" });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  // Supabase auth completes via SPA route change; click then poll URL.
  await page.click('button[type="submit"]');
  try {
    await page.waitForURL((url) => !url.pathname.startsWith("/login"), {
      timeout: 30000,
    });
  } catch (err) {
    const debug = join(OUT, "_login-failed.png");
    await page.screenshot({ path: debug, fullPage: false });
    throw new Error(
      `ログイン後の遷移が確認できませんでした。${debug} を確認してください。元エラー: ${err.message}`,
    );
  }
  console.log(`[login] redirected -> ${page.url()}`);
  await page.waitForTimeout(1200);

  // ---- 画面キャプチャ ----
  let success = 0;
  for (const t of TARGETS) {
    const url = `${CRM_URL}${t.path}`;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
      // フォントレンダ・遷移の余裕
      await page.waitForTimeout(900);
      if (t.waitForText) {
        try {
          await page.getByText(t.waitForText, { exact: false }).first().waitFor({ timeout: 4000 });
        } catch {
          // テキストが無くても続行（画面差異吸収）
        }
      }
      const out = join(OUT, t.file);
      await page.screenshot({ path: out, fullPage: false });
      console.log(`[ok ] ${t.path} -> ${t.file}`);
      success++;
    } catch (err) {
      console.warn(`[skip] ${t.path}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\nDone. ${success}/${TARGETS.length} captured -> ${OUT}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
