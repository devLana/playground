import state from "./state.js";

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

export const toggleMute = (videoPlayer, volumeIcon, volumeSlider) => {
  if (videoPlayer.volume > 0) {
    videoPlayer.volume = 0;
    volumeIcon.className = "fas fa-volume-mute";
    volumeSlider.value = 0;
  } else {
    videoPlayer.volume = state.volume;
    volumeIcon.className = "fas fa-volume-up";
    volumeSlider.value = state.volume * 100;
  }
};

export const updateVolume = (videoPlayer, value, volumeIcon) => {
  const newValue = +value / 100;

  state.volume = newValue;
  videoPlayer.volume = newValue;
  volumeIcon.className =
    newValue === 0 ? "fas fa-volume-mute" : "fas fa-volume-up";
};

export const setCurrentTime = ({
  videoPlayer,
  progressBar,
  progress,
  knob,
}) => {
  const { currentTime, duration } = videoPlayer;
  const progressBarWidth = progressBar.offsetWidth;
  const scaledTime = (currentTime * progressBarWidth) / duration;

  state.currentTime = scaledTime;
  progress.style.width = `${scaledTime}px`;
  knob.style.left = `${scaledTime - 6}px`;
};

export const currentTime = ({
  videoPlayer,
  position,
  width,
  playPauseIcon,
}) => {
  const videoTime = (position * videoPlayer.duration) / width;

  if (videoPlayer.paused && position < width) {
    playPauseIcon.className = "fas fa-play";
  } else if (videoPlayer.ended) {
    playPauseIcon.className = "fas fa-redo-alt";
  } else {
    playPauseIcon.className = "fas fa-pause";
  }

  state.currentTime = position;
  videoPlayer.currentTime = videoTime;
};
