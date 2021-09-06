import state from "./state.js";
import appendZero from "./util.js";

export const playOrPause = (videoPlayer, playPauseIcon) => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseIcon.className = "fas fa-pause";
  } else {
    videoPlayer.pause();
    playPauseIcon.className = "fas fa-play";
  }
};

export const stop = (videoPlayer, playPauseIcon) => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  playPauseIcon.className = "fas fa-play";
  state.currentTime = 0;
};

export const fastForward = videoPlayer => {
  if (videoPlayer.currentTime < Math.floor(videoPlayer.duration)) {
    videoPlayer.currentTime += 5;
  }
};

export const rewind = videoPlayer => {
  videoPlayer.currentTime -= 5;
};

export const toggleMute = (videoPlayer, volumeIcon, volumeLevel) => {
  if (videoPlayer.volume > 0) {
    videoPlayer.volume = 0;
    volumeIcon.className = "fas fa-volume-mute";
    volumeLevel.style.width = `${0}%`;
  } else {
    videoPlayer.volume = state.volume / 100;
    volumeIcon.className = "fas fa-volume-up";
    volumeLevel.style.width = `${state.volume}%`;
  }
};

export const updateVolume = ({
  videoPlayer,
  volumeBarWidth,
  volumeLevel,
  volumeIcon,
  position,
}) => {
  if (position <= volumeBarWidth) {
    const scaledVolume = position / volumeBarWidth;

    state.volume = scaledVolume * 100;
    videoPlayer.volume =
      scaledVolume < 0 ? 0 : scaledVolume > 1 ? 1 : scaledVolume;
    volumeLevel.style.width = `${scaledVolume * 100}%`;
    volumeIcon.className =
      scaledVolume <= 0 ? "fas fa-volume-mute" : "fas fa-volume-up";
  }
};

export const setCurrentTime = (videoPlayer, progress) => {
  const { currentTime, duration } = videoPlayer;
  const scaledTime = (currentTime * 100) / duration;

  state.currentTime = scaledTime;
  progress.style.width = `${scaledTime}%`;
};

export const currentTime = ({
  videoPlayer,
  position,
  progressBarWidth,
  playPauseIcon,
}) => {
  const scaledPosition = (position / progressBarWidth) * 100;
  const videoTime = (scaledPosition / 100) * videoPlayer.duration;

  if (videoPlayer.paused && position < progressBarWidth) {
    playPauseIcon.className = "fas fa-play";
  } else if (videoPlayer.ended) {
    playPauseIcon.className = "fas fa-redo-alt";
  } else {
    playPauseIcon.className = "fas fa-pause";
  }

  state.currentTime = scaledPosition;
  videoPlayer.currentTime = videoTime;
};

export const scrubber = ({
  videoPlayer,
  progressBarWidth,
  progress,
  position,
  playPauseIcon,
}) => {
  const scaledPosition = (position / progressBarWidth) * 100;

  if (position <= progressBarWidth) {
    currentTime({
      videoPlayer,
      position,
      progressBarWidth,
      playPauseIcon,
    });
    progress.style.width = `${scaledPosition}%`;
  }
};

export const setBufferedBar = (videoPlayer, bufferBar) => {
  const { duration, buffered, currentTime } = videoPlayer;

  if (duration > 0) {
    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(buffered.length - 1 - i) < currentTime) {
        bufferBar.style.width = `${
          (buffered.end(buffered.length - 1 - i) / duration) * 100
        }%`;
        break;
      }
    }
  }
};

export const toggleFullScreen = videoContainer => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

export const setVideoTime = (
  videoPlayer,
  progressDuration,
  progressCurrentTime
) => {
  const { duration, currentTime } = videoPlayer;

  const durationMinute = Math.floor(duration / 60);
  const durationSecond = Math.floor((duration / 60 - durationMinute) * 60);
  const durationOutput = `${durationMinute}:${appendZero(durationSecond)}`;

  const currentTimeMInute = Math.floor(currentTime / 60);
  const currentTimeSecond = Math.floor(currentTime - currentTimeMInute * 60);
  const currentTimeOutput = `${currentTimeMInute}:${appendZero(
    currentTimeSecond
  )}`;

  progressDuration.innerHTML = durationOutput;
  progressCurrentTime.innerHTML = currentTimeOutput;
};
