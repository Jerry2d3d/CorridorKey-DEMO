import { siteConfig } from "@/site.config";

// Renders a responsive YouTube embed. If no id is provided yet, it shows a
// tasteful placeholder that links to the channel.
export function VideoEmbed({
  youtubeId,
  title,
}: {
  youtubeId?: string;
  title?: string;
}) {
  if (!youtubeId) {
    return (
      <a
        href={siteConfig.youtubeUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex aspect-video w-full items-center justify-center rounded-xl border border-line bg-panel"
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink transition-transform group-hover:scale-110">
            <span className="ml-1 text-xl">▶</span>
          </div>
          <p className="mt-3 text-sm text-muted">Video coming soon — visit the channel</p>
        </div>
      </a>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-line bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title ?? "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
