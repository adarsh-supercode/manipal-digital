// utils/videoUtils.js

export const handleVideoClick = (videoRef, isMuted, setIsMuted) => {
    const video = videoRef.current;
    if (video) {
      const newMuteState = !isMuted;
      video.muted = newMuteState;
      setIsMuted(newMuteState);
      video.play().catch(() => {});
    }
  };
  