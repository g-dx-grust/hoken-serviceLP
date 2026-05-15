import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  /** 静止画モード */
  src?: string;
  alt: string;
  /** 動画モード: webm + mp4 fallback */
  videoWebm?: string;
  videoMp4?: string;
  videoPoster?: string;
  url?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * 控えめなブラウザシェル。スクリーンショット／デモ動画を業務ツール感に見せるための薄い枠。
 * macOSドット・URLバーともに低コントラストで配置し、コンテンツを主役にする。
 */
export function BrowserFrame({
  src,
  alt,
  videoWebm,
  videoMp4,
  videoPoster,
  url = "hokena-crm.app",
  width = 1440,
  height = 900,
  className,
  priority = false,
}: Props) {
  const isVideo = Boolean(videoWebm || videoMp4);

  return (
    <div
      className={cn(
        "relative bg-[var(--color-bg)] border border-[var(--color-border-strong)] rounded-[6px] overflow-hidden shadow-[0_24px_60px_-30px_rgba(12,20,36,0.25),0_2px_8px_rgba(12,20,36,0.05)]",
        className,
      )}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 h-9 px-3.5 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-1.5">
          <span className="block w-2.5 h-2.5 rounded-full bg-[#e6e8ee] border border-[var(--color-border-strong)]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#e6e8ee] border border-[var(--color-border-strong)]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#e6e8ee] border border-[var(--color-border-strong)]" />
        </div>
        <div className="ml-3 flex-1 max-w-[460px] mx-auto">
          <div className="h-5 px-2.5 flex items-center bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[3px]">
            <span className="text-[10.5px] num text-[var(--color-fg-subtle)] truncate tracking-wide">
              {url}
            </span>
          </div>
        </div>
        <div className="w-[58px]" />
      </div>

      {/* コンテンツ: 動画 or 静止画 */}
      <div className="relative bg-[var(--color-bg)]">
        {isVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster}
            aria-label={alt}
            className="w-full h-auto block"
          >
            {videoWebm && <source src={videoWebm} type="video/webm" />}
            {videoMp4 && <source src={videoMp4} type="video/mp4" />}
          </video>
        ) : src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-auto block"
            sizes="(min-width: 1024px) 720px, 100vw"
          />
        ) : null}
      </div>
    </div>
  );
}
