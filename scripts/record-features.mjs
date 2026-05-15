// HOKENA CRM 機能別デモ動画録画スクリプト
// usage: node scripts/record-features.mjs
// 出力: public/demo/{name}.webm / .mp4 / -poster.jpg
import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";
import { statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMO_DIR = join(__dirname, "..", "public", "demo");
const TEMP_DIR = join(__dirname, "..", ".tmp-features");

const CRM_URL = process.env.CRM_URL ?? "https://insurance-crm-gilt.vercel.app";
const EMAIL = process.env.CRM_EMAIL ?? "demo@n-lic-crm.local";
const PASSWORD = process.env.CRM_PASSWORD ?? "Nlic2026demo!";
const SELECTED_SCENES = (process.env.SCENES ?? "")
  .split(",")
  .map((name) => name.trim())
  .filter(Boolean);

const CURSOR_INIT = `
(function() {
  function setupCursor() {
    if (document.getElementById('__demo_cursor__')) return;
    const el = document.createElement('div');
    el.id = '__demo_cursor__';
    el.style.cssText = [
      'position:fixed','width:22px','height:22px',
      'border:1.5px solid rgba(15,30,70,0.5)',
      'border-radius:50%','pointer-events:none',
      'z-index:2147483647','left:-30px','top:-30px',
      'transform:translate(-50%,-50%) scale(1)',
      'transition:transform 0.12s ease,border-color 0.12s ease,opacity 0.15s ease',
      'opacity:0','will-change:left,top',
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

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function seconds(value) {
  return Number(value).toFixed(3);
}

async function glide(page, x, y, steps = 18) {
  await page.mouse.move(x, y, { steps });
  await wait(60);
}

async function networkIdle(page) {
  try { await page.waitForLoadState("networkidle", { timeout: 12000 }); } catch {}
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

async function waitForAppReady(page, scene) {
  await page.waitForLoadState("domcontentloaded", { timeout: 25000 });
  await networkIdle(page);

  if (scene.readySelector) {
    try {
      await page.locator(scene.readySelector).first().waitFor({
        state: "visible",
        timeout: 15000,
      });
    } catch (err) {
      const file = await debugScreenshot(page, scene.name);
      throw new Error(
        `${scene.readySelector} が表示されませんでした (${scene.name}). Debug: ${file}. ${err.message}`,
      );
    }
  }

  if (scene.readyText) {
    try {
      await page.getByText(scene.readyText, { exact: false }).first().waitFor({
        state: "visible",
        timeout: 15000,
      });
    } catch (err) {
      const file = await debugScreenshot(page, scene.name);
      throw new Error(
        `${scene.readyText} が表示されませんでした (${scene.name}). Debug: ${file}. ${err.message}`,
      );
    }
  }

  await waitForNoLoading(page, scene.name);
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await wait(450);
  await waitForNoLoading(page, scene.name, 3000);
}

async function warmupRoute(browser, storageState, scene) {
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
  await page.goto(`${CRM_URL}${scene.path}`, {
    waitUntil: "domcontentloaded",
    timeout: 25000,
  });
  await waitForAppReady(page, scene);
  await ctx.close();
}

function mediaDuration(file) {
  return execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`,
    { encoding: "utf8" },
  ).trim();
}

// =====================
// 各シーンの操作定義
// =====================
const SCENES = [
  {
    name: "customers",
    path: "/customers",
    label: "顧客管理",
    readyText: "顧客管理",
    readySelector: "table",
    durationSec: 10,
    async interact(page) {
      // リスト行を上から下にゆっくりホバー
      for (let y = 260; y <= 620; y += 50) {
        await glide(page, 760, y, 20);
        await wait(280);
      }
      // 少し左に寄せて上に戻る
      await glide(page, 400, 400, 20);
      await wait(400);
      await glide(page, 760, 300, 22);
      await wait(350);
      // 行クリック（詳細が開く場合に備え控えめに）
      await glide(page, 760, 340, 14);
      await wait(500);
    },
  },
  {
    name: "calendar",
    path: "/calendar",
    label: "面談カレンダー",
    readyText: "カレンダー",
    readySelector: 'button:has-text("月"), button:has-text("週")',
    durationSec: 10,
    async interact(page) {
      // カレンダー中央エリアをゆっくりホバー
      await glide(page, 800, 350, 20);
      await wait(400);
      await glide(page, 600, 450, 20);
      await wait(350);
      await glide(page, 1000, 400, 20);
      await wait(350);
      await glide(page, 700, 550, 20);
      await wait(350);
      await glide(page, 850, 300, 20);
      await wait(400);
      await glide(page, 650, 380, 20);
      await wait(300);
    },
  },
  {
    name: "reports",
    path: "/reports",
    label: "レポート",
    readyText: "月次新規契約推移",
    readySelector: "svg",
    durationSec: 10,
    async interact(page) {
      // チャートエリアをゆっくりホバー
      await glide(page, 500, 350, 20);
      await wait(400);
      await glide(page, 700, 300, 20);
      await wait(350);
      await glide(page, 900, 400, 20);
      await wait(350);
      await glide(page, 600, 500, 20);
      await wait(350);
      await glide(page, 800, 450, 20);
      await wait(400);
      await glide(page, 650, 350, 20);
      await wait(300);
    },
  },
  {
    name: "settlement",
    path: "/settlement",
    label: "決算・精算管理",
    readyText: "月次手数料推移",
    readySelector: "table",
    durationSec: 10,
    async interact(page) {
      // テーブル行をホバーしながらスクロール方向に動く
      for (let y = 280; y <= 580; y += 60) {
        await glide(page, 720, y, 18);
        await wait(300);
      }
      await glide(page, 400, 450, 20);
      await wait(400);
      await glide(page, 720, 350, 20);
      await wait(350);
    },
  },
  {
    name: "intention-wizard",
    path: "/intentions/new",
    label: "意向把握ウィザード",
    readyText: "Step 1",
    readySelector: "input, select, textarea",
    durationSec: 11,
    async interact(page) {
      // フォームフィールドを順番に操作（最大3項目）
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
        await wait(250);
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await wait(300);
        if (tag === "select") {
          await input.selectOption({ index: 1 }).catch(() => {});
        } else {
          const type = await input.getAttribute("type").catch(() => "text");
          if (type === "date" || type === "datetime-local") {
            await input.fill("2026-05-15").catch(() => {});
          } else {
            await page.keyboard.type("テスト", { delay: 40 });
          }
        }
        await wait(400);
        filled++;
      }
      await glide(page, 900, 550, 18);
      await wait(600);
    },
  },
  {
    name: "contracts",
    path: "/contracts",
    label: "契約管理",
    readyText: "契約管理",
    readySelector: "table",
    durationSec: 10,
    async interact(page) {
      for (let y = 270; y <= 600; y += 55) {
        await glide(page, 740, y, 18);
        await wait(280);
      }
      await glide(page, 450, 430, 20);
      await wait(380);
      await glide(page, 740, 320, 20);
      await wait(330);
    },
  },
  {
    name: "intentions",
    path: "/intentions",
    label: "意向把握一覧",
    readyText: "意向把握",
    readySelector: "table",
    durationSec: 10,
    async interact(page) {
      for (let y = 270; y <= 580; y += 55) {
        await glide(page, 740, y, 18);
        await wait(270);
      }
      await glide(page, 450, 400, 20);
      await wait(380);
      await glide(page, 740, 310, 20);
      await wait(330);
    },
  },
];

async function recordScene(browser, storageState, scene) {
  const sceneDir = join(TEMP_DIR, scene.name);
  await mkdir(sceneDir, { recursive: true });

  const ctx = await browser.newContext({
    storageState,
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
    recordVideo: { dir: sceneDir, size: { width: 1440, height: 900 } },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });
  await ctx.addInitScript(CURSOR_INIT);

  const page = await ctx.newPage();
  const recordStartedAt = Date.now();

  await page.goto(`${CRM_URL}${scene.path}`, {
    waitUntil: "domcontentloaded",
    timeout: 25000,
  });
  await waitForAppReady(page, scene);
  const readyAt = Date.now();
  const trimStartSec = Math.max(0, (readyAt - recordStartedAt) / 1000 - 0.25);

  await scene.interact(page);

  // 末尾に静止フレームを足してループの繋ぎを自然にする
  await wait(1800);
  const minContentSec = scene.minContentSec ?? 8.2;
  const contentSec = (Date.now() - readyAt) / 1000 + 0.25;
  if (contentSec < minContentSec) {
    await wait((minContentSec - contentSec) * 1000);
  }

  const video = page.video();
  await ctx.close();

  const rawPath = await video.path();
  return { rawPath, trimStartSec };
}

async function encode(rawPath, name, durationSec = 12, trimStartSec = 0) {
  const webmOut = join(DEMO_DIR, `${name}.webm`);
  const mp4Out = join(DEMO_DIR, `${name}.mp4`);
  const posterOut = join(DEMO_DIR, `${name}-poster.jpg`);
  const posterAtSec = trimStartSec + 1.2;
  const vf =
    "scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2,setsar=1";

  execSync(
    `ffmpeg -y -ss ${seconds(trimStartSec)} -i "${rawPath}" -t ${durationSec} \
      -c:v libvpx-vp9 -b:v 0 -crf 42 \
      -deadline good -cpu-used 3 -an \
      -vf "${vf}" \
      "${webmOut}"`,
    { stdio: "pipe" },
  );

  execSync(
    `ffmpeg -y -ss ${seconds(trimStartSec)} -i "${rawPath}" -t ${durationSec} \
      -c:v libx264 -crf 30 -preset medium -an -movflags +faststart \
      -vf "${vf}" \
      "${mp4Out}"`,
    { stdio: "pipe" },
  );

  execSync(
    `ffmpeg -y -ss ${seconds(posterAtSec)} -i "${rawPath}" -vframes 1 -update 1 -q:v 3 "${posterOut}"`,
    { stdio: "pipe" },
  );

  const webmMB = (statSync(webmOut).size / 1024 / 1024).toFixed(2);
  const mp4MB = (statSync(mp4Out).size / 1024 / 1024).toFixed(2);
  const webmDuration = Number(mediaDuration(webmOut)).toFixed(1);
  const mp4Duration = Number(mediaDuration(mp4Out)).toFixed(1);
  return { webmMB, mp4MB, webmDuration, mp4Duration, trimStartSec };
}

async function run() {
  await mkdir(DEMO_DIR, { recursive: true });
  await mkdir(TEMP_DIR, { recursive: true });

  // =====================
  // Step 1: ログインしてセッションを取得
  // =====================
  console.log("[login] Logging in to CRM...");
  const loginBrowser = await chromium.launch({ headless: true });
  const loginCtx = await loginBrowser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
  });
  const loginPage = await loginCtx.newPage();

  await loginPage.goto(`${CRM_URL}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(800);

  await loginPage.locator('input[type="email"]').fill(EMAIL);
  await loginPage.locator('input[type="password"]').fill(PASSWORD);
  await loginPage.locator('button[type="submit"]').click();

  try {
    await loginPage.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 30000 });
  } catch {
    const p = join(TEMP_DIR, "_login-failed.png");
    await loginPage.screenshot({ path: p });
    throw new Error(`ログイン失敗。${p} を確認してください。`);
  }
  await networkIdle(loginPage);
  await wait(1000);

  const storageState = await loginCtx.storageState();
  await loginCtx.close();
  await loginBrowser.close();
  console.log("[login] Session saved.\n");

  // =====================
  // Step 2: 各シーンを順番に録画
  // =====================
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const scenes = SELECTED_SCENES.length
    ? SCENES.filter((scene) => SELECTED_SCENES.includes(scene.name))
    : SCENES;

  if (SELECTED_SCENES.length && scenes.length !== SELECTED_SCENES.length) {
    const available = SCENES.map((scene) => scene.name).join(", ");
    throw new Error(`Unknown SCENES value. Available: ${available}`);
  }

  for (const scene of scenes) {
    console.log(`[warmup] ${scene.name} (${scene.label})...`);
    await warmupRoute(browser, storageState, scene);

    console.log(`[record] ${scene.name} (${scene.label})...`);
    let result;
    try {
      result = await recordScene(browser, storageState, scene);
    } catch (err) {
      console.warn(`  Skip ${scene.name}: ${err.message}`);
      continue;
    }

    console.log(`  raw: ${result.rawPath}`);
    console.log(`  trim: ${seconds(result.trimStartSec)} sec`);
    console.log("  encoding...");
    const { webmMB, mp4MB, webmDuration, mp4Duration } = await encode(
      result.rawPath,
      scene.name,
      scene.durationSec,
      result.trimStartSec,
    );
    console.log(
      `  webm: ${webmMB} MB (${webmDuration}s) / mp4: ${mp4MB} MB (${mp4Duration}s)\n`,
    );
  }

  await browser.close();

  // 一時ディレクトリ削除
  await rm(TEMP_DIR, { recursive: true, force: true });

  console.log("=== All Done ===");
  console.log("Output:", DEMO_DIR);
  const files = scenes.flatMap((s) => [
    `  ${s.name}.webm`,
    `  ${s.name}.mp4`,
    `  ${s.name}-poster.jpg`,
  ]);
  console.log(files.join("\n"));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
