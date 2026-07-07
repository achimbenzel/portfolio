import { type ChangeEvent, type CSSProperties, useRef, useState } from "react";
import Avatar from "./Avatar";
import Media from "./Media";
import { ImagePlaceholderIcon, PauseIcon, PlayIcon } from "./icons/LucideIcons";
import type { ProjectContentBlock, ProjectVideoBlock } from "../types/project";

type ProjectContentRendererProps = {
  content: ProjectContentBlock[];
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function ProjectVideoPlayer({ poster, src, title, ratio }: ProjectVideoBlock) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const scrubberStyle = {
    "--video-progress": `${progress}%`,
  } as CSSProperties;
  const playerStyle = ratio ? ({ "--media-ratio": ratio } as CSSProperties) : undefined;

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    video.pause();
  };

  const syncVideoTime = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setCurrentTime(video.currentTime);
  };

  const syncVideoDuration = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    setCurrentTime(video.currentTime);
  };

  const seekVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const nextTime = Number(event.currentTarget.value);

    setCurrentTime(nextTime);

    if (video) {
      video.currentTime = nextTime;
    }
  };

  if (hasError) {
    return (
      <figure className="content-video">
        <div
          className="video-player video-player-fallback"
          role="img"
          aria-label={title}
          style={playerStyle}
        >
          <ImagePlaceholderIcon className="media-fallback-icon" />
          <span className="media-fallback-label">{title}</span>
        </div>
        <figcaption>{title}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="content-video">
      <div className="video-player" style={playerStyle}>
        <video
          loop
          playsInline
          poster={poster}
          preload="metadata"
          ref={videoRef}
          src={src}
          title={title}
          onDurationChange={syncVideoDuration}
          onLoadedMetadata={syncVideoDuration}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onTimeUpdate={syncVideoTime}
          onError={() => setHasError(true)}
        />
        <div className="video-controls" aria-label="Video Steuerung">
          <button
            className="video-control"
            type="button"
            aria-label={isPlaying ? "Video pausieren" : "Video abspielen"}
            onClick={togglePlayback}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <span className="video-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <input
            className="video-scrubber"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            aria-label="Video vorspulen"
            disabled={duration <= 0}
            style={scrubberStyle}
            onChange={seekVideo}
          />
        </div>
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}

export default function ProjectContentRenderer({ content }: ProjectContentRendererProps) {
  return (
    <div className="project-content">
      {content.map((block, index) => {
        if (block.type === "text") {
          const hasHead = Boolean(block.eyebrow || block.headline);

          return (
            <section
              className={hasHead ? "content-text" : "content-text content-text-plain"}
              key={`${block.type}-${index}`}
            >
              {hasHead ? (
                <div className="content-text-head">
                  {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
                  {block.headline ? <h2>{block.headline}</h2> : null}
                </div>
              ) : null}
              <div className="content-text-body">
                <p>{block.body}</p>
              </div>
            </section>
          );
        }

        if (block.type === "image") {
          return (
            <figure className="content-image" key={`${block.type}-${index}`}>
              <Media src={block.src} alt={block.alt} />
            </figure>
          );
        }

        if (block.type === "testimonial") {
          return (
            <section className="content-testimonial" key={`${block.type}-${index}`}>
              <div className="testimonial-aside">
                <Avatar className="testimonial-photo" src={block.photo} name={block.name} />
                <p className="testimonial-attribution">
                  <strong>{block.name}</strong>
                  <span>{block.role}</span>
                </p>
              </div>
              <div className="testimonial-body">
                <span className="eyebrow">Kundenstimme</span>
                <blockquote>{block.quote}</blockquote>
              </div>
            </section>
          );
        }

        if (block.type === "video") {
          return <ProjectVideoPlayer key={`${block.type}-${index}`} {...block} />;
        }

        if (block.type === "imageGrid") {
          const gridStyle = block.ratio
            ? ({ "--media-ratio": block.ratio } as CSSProperties)
            : undefined;

          return (
            <div
              className={
                block.ratio ? "content-image-grid content-image-grid-fixed" : "content-image-grid"
              }
              style={gridStyle}
              key={`${block.type}-${index}`}
            >
              {block.images.map((image) => (
                <figure key={image.src}>
                  <Media src={image.src} alt={image.alt} />
                </figure>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
