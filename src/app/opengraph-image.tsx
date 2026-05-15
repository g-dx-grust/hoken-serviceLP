import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND_COLORS } from "@/lib/brand-tokens";

export const alt = "HOKENA CRM｜2026年6月、意向把握はもう「記憶」では守れない。";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

const colors = {
  bg: BRAND_COLORS.bg,
  fg: BRAND_COLORS.fg,
  muted: BRAND_COLORS.mutedOnBg,
  subtle: BRAND_COLORS.subtleOnBg,
  accent: BRAND_COLORS.accent,
};

// Font source: https://github.com/notofonts/noto-cjk
// License: SIL Open Font License 1.1
async function loadNotoSansJP() {
  const fontData = await readFile(
    join(process.cwd(), "src/app/_assets/NotoSansJP-Bold.otf"),
  );
  return fontData.buffer.slice(
    fontData.byteOffset,
    fontData.byteOffset + fontData.byteLength,
  );
}

function Logomark() {
  return (
    <div
      style={{
        position: "relative",
        width: 88,
        height: 88,
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 16,
          top: 14,
          width: 14,
          height: 60,
          background: colors.fg,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 16,
          top: 14,
          width: 14,
          height: 60,
          background: colors.fg,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          top: 38,
          height: 12,
          background: colors.accent,
        }}
      />
    </div>
  );
}

export default async function Image() {
  const fontData = await loadNotoSansJP();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.bg,
          color: colors.fg,
          padding: "76px 84px 64px",
          fontFamily: "Noto Sans JP",
          fontWeight: 700,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -160,
            width: 520,
            height: 520,
            border: `1px solid ${colors.subtle}`,
            borderRadius: 260,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            position: "relative",
          }}
        >
          <Logomark />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 48, lineHeight: 1.05 }}>HOKENA CRM</div>
            <div
              style={{
                fontSize: 19,
                lineHeight: 1.35,
                color: colors.muted,
              }}
            >
              INSURANCE AGENCY OPERATIONS
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            maxWidth: 920,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              lineHeight: 1.24,
              letterSpacing: 0,
            }}
          >
            <span>2026年6月、意向把握はもう</span>
            <span>「記憶」では守れない。</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 26,
              lineHeight: 1.4,
              color: colors.muted,
            }}
          >
            <span>業務記録</span>
            <span style={{ color: colors.accent }}>／</span>
            <span>監査ログ</span>
            <span style={{ color: colors.accent }}>／</span>
            <span>電子署名</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            color: colors.muted,
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          <span>HOKENA CRM ／ 保険代理店向け改正対応CRM</span>
          <span>hokena-crm.jp</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
