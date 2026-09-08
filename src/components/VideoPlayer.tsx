import { useEffect, useRef, useState, useCallback } from "react";
import { useApp } from "../lib/store";
import type { Video } from "../lib/types";
import { Icon } from "./icons";
import { cn } from "./ui";

interface VideoPlayerProps {
  video: Video;
  className?: string;
}

// Helper to detect YouTube URLs
function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

// Helper to detect Vimeo URLs
function isVimeoUrl(url: string): boolean {
  return url.includes("vimeo.com");
}

export function VideoPlayer({ video, className }: VideoPlayerProps) {
  const app = useApp();
  const { st } = app;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.duration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const progress = st?.videoProgress[video.id];
  
  // Detect video provider
  const isYouTube = isYouTubeUrl(video.videoUrl);
  const isVimeo = isVimeoUrl(video.videoUrl);
  const isExternalPlayer = isYouTube || isVimeo;

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Save progress with debouncing
  const saveProgress = useCallback(() => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const position = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    app.updateVideoProgress(video.id, position, dur);
  }, [video.id, app]);

  // Debounced progress save
  const debouncedSaveProgress = useCallback(() => {
    if (progressSaveTimer.current) {
      clearTimeout(progressSaveTimer.current);
    }
    progressSaveTimer.current = setTimeout(saveProgress, 2000);
  }, [saveProgress]);

  // Load video and resume position (only for HTML5 video)
  useEffect(() => {
    if (isExternalPlayer) return; // Skip for YouTube/Vimeo
    
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      setDuration(videoEl.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime);
      debouncedSaveProgress();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      app.completeVideo(video.id);
    };
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("play", handlePlay);
    videoEl.addEventListener("pause", handlePause);
    videoEl.addEventListener("ended", handleEnded);
    videoEl.addEventListener("error", handleError);
    videoEl.addEventListener("waiting", handleWaiting);
    videoEl.addEventListener("canplay", handleCanPlay);

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("play", handlePlay);
      videoEl.removeEventListener("pause", handlePause);
      videoEl.removeEventListener("ended", handleEnded);
      videoEl.removeEventListener("error", handleError);
      videoEl.removeEventListener("waiting", handleWaiting);
      videoEl.removeEventListener("canplay", handleCanPlay);
      saveProgress();
      if (progressSaveTimer.current) {
        clearTimeout(progressSaveTimer.current);
      }
    };
  }, [video.id, debouncedSaveProgress, saveProgress, app, isExternalPlayer]);

  // Toggle play/pause (only for HTML5 video)
  const togglePlay = () => {
    if (!videoRef.current || isExternalPlayer) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  // Seek to position (only for HTML5 video)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || isExternalPlayer) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Volume control (only for HTML5 video)
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || isExternalPlayer) return;
    const vol = parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  // Toggle mute (only for HTML5 video)
  const toggleMute = () => {
    if (!videoRef.current || isExternalPlayer) return;
    if (isMuted) {
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Change playback speed (only for HTML5 video)
  const changePlaybackRate = () => {
    if (!videoRef.current || isExternalPlayer) return;
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  // Keyboard controls (only for HTML5 video)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isExternalPlayer) return;
    
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
      }
    } else if (e.key === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key === "f") {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  // Hide controls after inactivity (only for HTML5 video)
  useEffect(() => {
    if (isExternalPlayer) return;
    
    let timeout: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(timeout);
    };
  }, [isPlaying, isExternalPlayer]);

  // Error state
  if (hasError) {
    return (
      <div className={cn("card-ink bg-card p-8 text-center", className)}>
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
            <Icon name="flag" size={24} />
          </div>
          <h3 className="font-display text-base font-bold">Unable to load this video</h3>
          <p className="text-sm text-mute">Please try again or contact support if the problem persists.</p>
          <button
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className="btn btn-primary mt-2"
          >
            <Icon name="refresh" size={14} /> Retry
          </button>
        </div>
      </div>
    );
  }

  // YouTube/Vimeo iframe player
  if (isExternalPlayer) {
    return (
      <div className={cn("card-ink overflow-hidden bg-ink relative", className)}>
        <div className="relative aspect-video bg-black">
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            frameBorder="0"
          />
        </div>
        
        {/* Video completion indicator */}
        {progress?.completed && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-se px-3 py-1 text-xs font-semibold text-white">
            <Icon name="check" size={12} />
            Completed
          </div>
        )}
      </div>
    );
  }

  // HTML5 video player for direct video URLs
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        "card-ink overflow-hidden bg-ink relative group",
        className,
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Video element */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="h-full w-full"
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          preload="metadata"
          playsInline
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span className="text-xs text-white/80">Loading...</span>
            </div>
          </div>
        )}

        {/* Play button overlay (when paused) */}
        {!isPlaying && !isLoading && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
            aria-label="Play video"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform hover:scale-110">
              <Icon name="play" size={32} />
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity",
          showControls || !isPlaying ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Progress bar */}
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand"
            style={{
              background: `linear-gradient(to right, #0e7c6b ${progressPercentage}%, rgba(255,255,255,0.3) ${progressPercentage}%)`,
            }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-3 text-white">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="hover:text-brand transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <Icon name={isPlaying ? "pause" : "play"} size={20} />
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="hover:text-brand transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              <Icon name={isMuted ? "volumeOff" : "volume"} size={18} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>

          {/* Time */}
          <div className="text-xs font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Playback speed */}
          <button
            onClick={changePlaybackRate}
            className="text-xs font-mono hover:text-brand transition-colors px-2 py-1 rounded bg-white/10"
            aria-label="Change playback speed"
          >
            {playbackRate}x
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hover:text-brand transition-colors"
            aria-label="Toggle fullscreen"
          >
            <Icon name={isFullscreen ? "minimize" : "maximize"} size={18} />
          </button>
        </div>
      </div>

      {/* Video completion indicator */}
      {progress?.completed && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-se px-3 py-1 text-xs font-semibold text-white">
          <Icon name="check" size={12} />
          Completed
        </div>
      )}
    </div>
  );
}
