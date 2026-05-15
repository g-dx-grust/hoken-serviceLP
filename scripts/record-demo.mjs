// HOKENA CRM Hero デモ動画録画スクリプト
// usage: node scripts/record-demo.mjs
// 出力: public/demo/hero-demo.webm / .mp4 / -poster.jpg
import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";
import { statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMO_DIR = join(__dirname, "..", "public", "demo");
const TEMP_DIR = join(__dirname, "..", ".tmp-record");

const CRM_URL = process.env.CRM_URL ?? "https://insurance-crm-gilt.vercel.app";
const EMAIL = process.env.CRM_EMAIL ?? "demo@n-lic-crm.local";
const PASSWORD = process.env.CRM_PASSWORD ?? "Nlic2026demo!";
const HERO_DURATION_SEC = 24;

const READY = {
  dashboard: { name: "dashboard", readyText: "ダッシュボード", readySelector: "table" },
  customers: { name: "customers", readyText: "顧客管理", readySelector: "table" },
  intentions: { name: "intentions", readyText: "意向把握", readySelector: "table" },
  intentionWizard: {
    name: "intention-wizard",
    readyText: "Step 1",
    readySelector: "input, select, textarea",
  },
  contracts: { name: "contracts", readyText: "契約管理", readySelector: "table" },
};

// ページ遷移後に毎回カーソルを再注入するための initScript
const CURSOR_INIT = `
(function() {
  function setupCursor() {
    if (document.getElementById('__demo_cursor__')) return;
    const el = document.createElement('div');
    el.id = '__demo_cursor__';
    el.style.cssText = [
      'position:fixed',
      'width:22px',
      'height:22px',
      'border:1.5px solid rgba(15,30,70,0.5)',
      'border-radius:50%',
      'pointer-events:none',
      'z-index:2147483647',
      'left:-30px',
      'top:-30px',
      'transform:translate(-50%,-50%) scale(1)',
      'transition:transform 0.12s ease,border-color 0.12s ease,opacity 0.15s ease',
      'opacity:0',
      'will-change:left,top',
    ].join(';');

    document.body.appendChild(el);

    document.addEventListener('mousemove', (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.opacity = '0.85';
    }, { passive: true });

    document.addEventListener('mousedown', () => {
      el.style.transform = 'translate(-50%,-50%) scale(1.7)';
      el.style.borderColor = 'rgba(15,30,70,0.75)';
      el.style.transition = 'transform 0.07s ease,border-color 0.07s ease';
    });
    document.addEventListener('mouseup', () => {
      el.style.transform = 'translate(-50%,-50%) scale(1)';
      el.style.borderColor = 'rgba(15,30,70,0.5)';
      el.style.transition = 'transform 0.3s ease,border-color 0.25s ease';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCursor);
  } else {
    setupCursor();
  }
})();
`;

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function glide(page, x, y, steps = 18) {
  await page.mouse.move(x, y, { steps });
  await wait(60);
}

async function click(page, x, y) {
  await glide(page, x, y, 14);
  await wait(180);
  await page.mouse.click(x, y);
  await wait(320);
}

async function clickLocator(page, locator, fallbackUrl) {
  try {
    const box = await locator.first().boundingBox({ timeout: 5000 });
    if (box) {
      await click(page, box.x + box.width / 2, box.y + box.height / 2);
      return true;
    }
  } catch {}
  if (fallbackUrl) {
    await page.goto(fallbackUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
  }
  return false;
}

async function networkIdle(page) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 12000 });
  } catch {
    // proceed anyway
  }
}

function seconds(value) {
  return Number(value).toFixed(3);
}

async function debugScreenshot(page, name) {
  await mkdir(TEMP_DIR, { recursive: true });
  const file = join(TEMP_DIR, `_debug-${name}-${Date.now()}.png`);
  await page.screenshot({ path: file, fullPage: false }).catch(() => {});
  return file;
}

async function loadingState(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const loadingText = Array.from(document.querySelectorAll("body *"))
      .filter(visible)
      .some((el) => {
        const text = (el.textContent || "").trim();
        return /^(Loading|Loading\.\.\.|読み込み中|ローディング|ロード中)$/i.test(text);
      });

    const busy = Array.from(
      document.querySelectorAll(
        '[aria-busy="true"], [data-loading="true"], [data-state="loading"], .animate-pulse',
      ),
    ).filter(visible).length;

    return {
      loadingText,
      busy,
      bodyTextLength: document.body?.innerText?.trim().length ?? 0,
    };
  });
}

async function waitForNoLoading(page, name, timeout = 15000) {
  const start = Date.now();
  let state = await loadingState(page).catch(() => ({
    loadingText: false,
    busy: 0,
    bodyTextLength: 0,
  }));

  while (
    Date.now() - start < timeout &&
    (state.loadingText || state.busy > 0 || state.bodyTextLength < 30)
  ) {
    await wait(250);
    state = await loadingState(page).catch(() => state);
  }

  if (state.loadingText || state.busy > 0 || state.bodyTextLength < 30) {
    const file = await debugScreenshot(page, name);
    throw new Error(
      `画面が安定しませんでした (${name}). loading=${state.loadingText} busy=${state.busy} text=${state.bodyTextLength}. Debug: ${file}`,
    );
  }
}

async function waitForAppReady(page, ready) {
  await page.waitForLoadState("domcontentloaded", { timeout: 25000 });
  await networkIdle(page);

  if (ready.readySelector) {
    try {
      await page.locator(ready.readySelector).first().waitFor({
        state: "visible",
        timeout: 15000,
      });
    } catch (err) {
      const file = await debugScreenshot(page, ready.name);
      throw new Error(
        `${ready.readySelector} が表示されませんでした (${ready.name}). Debug: ${file}. ${err.message}`,
      );
    }
  }

  if (ready.readyText) {
    try {
      await page.getByText(ready.readyText, { exact: false }).first().waitFor({
        state: "visible",
        timeout: 15000,
      });
    } catch (err) {
      const file = await debugScreenshot(page, ready.name);
      throw new Error(
        `${ready.readyText} が表示されませんでした (${ready.name}). Debug: ${file}. ${err.message}`,
      );
    }
  }

  await waitForNoLoading(page, ready.name);
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await wait(450);
  await waitForNoLoading(page, ready.name, 3000);
}

async function warmupRoute(browser, storageState, path, ready) {
  const ctx = await browser.newContext({
    storageState,
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });
  const page = await ctx.newPage();
  await page.goto(`${CRM_URL}${path}`, {
    waitUntil: "domcontentloaded",
    timeout: 25000,
  });
  await waitForAppReady(page, ready);
  await ctx.close();
}

function mediaDuration(file) {
  return execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`,
    { encoding: "utf8" },
  ).trim();
}

async function run() {
  await mkdir(DEMO_DIR, { recursive: true });
  await mkdir(TEMP_DIR, { recursive: true });

  const setupBrowser = await chromium.launch({
    headless: true,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--no-sandbox",
    ],
  });

  // =====================
  // Step 0: 非録画でログインとウォームアップ
  // =====================
  console.log("[0/6] Login and warmup...");
  const loginCtx = await setupBrowser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });
  const loginPage = await loginCtx.newPage();

  await loginPage.goto(`${CRM_URL}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(1000);
  const emailInput = loginPage.locator('input[type="email"], input[name="email"], input[placeholder*="メール"], input[placeholder*="mail"]').first();
  await emailInput.fill(EMAIL);
  const pwInput = loginPage.locator('input[type="password"]').first();
  await pwInput.fill(PASSWORD);
  await loginPage.locator('button[type="submit"]').first().click();

  try {
    await loginPage.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 30000 });
  } catch {
    const failImg = join(TEMP_DIR, "_login-failed.png");
    await loginPage.screenshot({ path: failImg });
    throw new Error(`ログイン遷移失敗。${failImg} を確認してください。`);
  }
  await waitForAppReady(loginPage, READY.dashboard);
  const storageState = await loginCtx.storageState();
  await loginCtx.close();

  await warmupRoute(setupBrowser, storageState, "/", READY.dashboard);
  await warmupRoute(setupBrowser, storageState, "/customers", READY.customers);
  await warmupRoute(setupBrowser, storageState, "/intentions", READY.intentions);
  await warmupRoute(setupBrowser, storageState, "/intentions/new", READY.intentionWizard);
  await warmupRoute(setupBrowser, storageState, "/contracts", READY.contracts);
  await setupBrowser.close();

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--no-sandbox",
    ],
  });

  const ctx = await browser.newContext({
    storageState,
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
    recordVideo: {
      dir: TEMP_DIR,
      size: { width: 1440, height: 900 },
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  // ナビゲーションのたびにカーソルを自動注入
  await ctx.addInitScript(CURSOR_INIT);

  const page = await ctx.newPage();
  const recordStartedAt = Date.now();
  await page.goto(`${CRM_URL}/`, { waitUntil: "domcontentloaded", timeout: 25000 });
  await waitForAppReady(page, READY.dashboard);
  const readyAt = Date.now();
  const trimStartSec = Math.max(0, (readyAt - recordStartedAt) / 1000 - 0.25);

  // =====================
  // Step 2: ダッシュボード閲覧
  // =====================
  console.log("[2/6] Dashboard...");
  await glide(page, 900, 280);
  await wait(600);
  await glide(page, 650, 380);
  await wait(500);
  await glide(page, 1100, 450);
  await wait(500);
  await glide(page, 750, 550);
  await wait(600);

  // =====================
  // Step 3: 顧客一覧
  // =====================
  console.log("[3/6] Customers...");
  await clickLocator(
    page,
    page.locator('a[href="/customers"], nav a:has-text("顧客"), a:has-text("顧客一覧")'),
    `${CRM_URL}/customers`,
  );
  await waitForAppReady(page, READY.customers);

  // リスト行をホバー
  await glide(page, 720, 300);
  await wait(400);
  await glide(page, 720, 380);
  await wait(350);
  await glide(page, 720, 460);
  await wait(350);
  await glide(page, 720, 540);
  await wait(400);

  // =====================
  // Step 4: 意向把握一覧 → 新規ウィザード
  // =====================
  console.log("[4/6] Intentions...");
  await clickLocator(
    page,
    page.locator('a[href="/intentions"], nav a:has-text("意向"), a:has-text("意向把握")'),
    `${CRM_URL}/intentions`,
  );
  await waitForAppReady(page, READY.intentions);

  // 「新規」ボタンを探してクリック
  const newIntentionBtn = page.locator(
    'a[href="/intentions/new"], button:has-text("新規"), a:has-text("新規意向"), a:has-text("意向把握を開始")',
  );
  const clicked = await clickLocator(page, newIntentionBtn, `${CRM_URL}/intentions/new`);
  if (!clicked) {
    // フォールバック: URLで直接
    await page.goto(`${CRM_URL}/intentions/new`, { waitUntil: "domcontentloaded", timeout: 20000 });
  }
  await waitForAppReady(page, READY.intentionWizard);

  // ウィザードのフォームフィールドを操作（最大3項目）
  const inputs = await page
    .locator('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select')
    .all();
  let filled = 0;
  for (const input of inputs) {
    if (filled >= 3) break;
    const box = await input.boundingBox().catch(() => null);
    if (!box || box.height < 10) continue;
    const tag = await input.evaluate((el) => el.tagName.toLowerCase()).catch(() => "input");
    await glide(page, box.x + box.width / 2, box.y + box.height / 2);
    await wait(200);
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await wait(300);
    if (tag === "select") {
      await input.selectOption({ index: 1 }).catch(() => {});
    } else {
      const inputType = await input.getAttribute("type").catch(() => "text");
      if (inputType === "date" || inputType === "datetime-local") {
        await input.fill("2026-05-15").catch(() => {});
      } else {
        await page.keyboard.type("テスト入力", { delay: 35 });
      }
    }
    await wait(350);
    filled++;
  }
  await glide(page, 900, 500);
  await wait(700);

  // =====================
  // Step 5: 契約一覧
  // =====================
  console.log("[5/6] Contracts...");
  await clickLocator(
    page,
    page.locator('a[href="/contracts"], nav a:has-text("契約"), a:has-text("契約一覧")'),
    `${CRM_URL}/contracts`,
  );
  await waitForAppReady(page, READY.contracts);

  await glide(page, 700, 320);
  await wait(400);
  await glide(page, 700, 420);
  await wait(350);
  await glide(page, 700, 500);
  await wait(400);

  // =====================
  // Step 6: ダッシュボードに戻る
  // =====================
  console.log("[6/6] Back to Dashboard...");
  await clickLocator(
    page,
    page.locator('a[href="/"], a[href="/dashboard"], nav a:has-text("ダッシュボード"), nav a:has-text("ホーム")'),
    `${CRM_URL}/`,
  );
  await waitForAppReady(page, READY.dashboard);
  await wait(1000);

  // =====================
  // 動画の保存と変換
  // =====================
  const video = page.video();
  await ctx.close();
  await browser.close();

  if (!video) throw new Error("Video object not found");
  const rawPath = await video.path();
  console.log(`\nRaw video: ${rawPath}`);

  const webmOut = join(DEMO_DIR, "hero-demo.webm");
  const mp4Out = join(DEMO_DIR, "hero-demo.mp4");
  const posterOut = join(DEMO_DIR, "hero-demo-poster.jpg");
  const posterAtSec = trimStartSec + 1.5;
  const vf =
    "scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2,setsar=1";

  console.log(`Trim start: ${seconds(trimStartSec)} sec`);

  // -- webm (VP9, target < 1.5MB) --
  console.log("\nEncoding webm (VP9)...");
  execSync(
    `ffmpeg -y -ss ${seconds(trimStartSec)} -i "${rawPath}" -t ${HERO_DURATION_SEC} \
      -c:v libvpx-vp9 -b:v 0 -crf 40 \
      -deadline good -cpu-used 2 \
      -an \
      -vf "${vf}" \
      "${webmOut}"`,
    { stdio: "inherit" },
  );

  let webmSize = statSync(webmOut).size;
  console.log(`webm: ${(webmSize / 1024 / 1024).toFixed(2)} MB`);

  // サイズオーバーなら CRF を上げる
  if (webmSize > 1.5 * 1024 * 1024) {
    console.log("Re-encoding with higher CRF=50...");
    execSync(
      `ffmpeg -y -ss ${seconds(trimStartSec)} -i "${rawPath}" -t ${HERO_DURATION_SEC} \
        -c:v libvpx-vp9 -b:v 0 -crf 50 \
        -deadline good -cpu-used 4 \
        -an \
        -vf "${vf}" \
        "${webmOut}"`,
      { stdio: "inherit" },
    );
    webmSize = statSync(webmOut).size;
    console.log(`webm (re): ${(webmSize / 1024 / 1024).toFixed(2)} MB`);
  }

  // -- mp4 (H.264) --
  console.log("\nEncoding mp4 (H.264)...");
  execSync(
    `ffmpeg -y -ss ${seconds(trimStartSec)} -i "${rawPath}" -t ${HERO_DURATION_SEC} \
      -c:v libx264 -crf 30 -preset slow \
      -an -movflags +faststart \
      -vf "${vf}" \
      "${mp4Out}"`,
    { stdio: "inherit" },
  );
  const mp4Size = statSync(mp4Out).size;
  console.log(`mp4: ${(mp4Size / 1024 / 1024).toFixed(2)} MB`);

  // -- poster (1.5秒フレーム) --
  console.log("\nExtracting poster...");
  execSync(
    `ffmpeg -y -ss ${seconds(posterAtSec)} -i "${rawPath}" -vframes 1 -update 1 -q:v 3 "${posterOut}"`,
    { stdio: "inherit" },
  );
  console.log(`poster: ${(statSync(posterOut).size / 1024).toFixed(0)} KB`);
  console.log(`webm duration: ${Number(mediaDuration(webmOut)).toFixed(1)}s`);
  console.log(`mp4 duration: ${Number(mediaDuration(mp4Out)).toFixed(1)}s`);

  // 一時ディレクトリ削除
  await rm(TEMP_DIR, { recursive: true, force: true });

  console.log("\n=== Done ===");
  console.log(`  webm   : ${webmOut}`);
  console.log(`  mp4    : ${mp4Out}`);
  console.log(`  poster : ${posterOut}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
