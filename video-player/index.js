import {
  playOrPause,
  stop,
  fastForward,
  rewind,
  toggleMute,
  updateVolume,
  setCurrentTime,
  currentTime,
  // setBufferedBar,
  toggleFullScreen,
  setVideoTime,
} from "./modules/functions.js";
import state from "./modules/state.js";

const videoContainer = document.querySelector(".video-player__container");
const videoPlayer = videoContainer.querySelector(".video-player");
const playPauseBtn = videoContainer.querySelector(".play-pause");
const playPauseIcon = videoContainer.querySelector(".play-pause i");
const fastForwardBtn = videoContainer.querySelector(".fast-forward");
const rewindBtn = videoContainer.querySelector(".rewind");
const stopBtn = videoContainer.querySelector(".stop");
const volumeBtn = videoContainer.querySelector(".volume");
const volumeIcon = videoContainer.querySelector(".volume i");
const volumeBar = videoContainer.querySelector(".volume__bar");
const volumeLevel = videoContainer.querySelector(".volume__level");
const progress = videoContainer.querySelector(".progress");
// const bufferBar = videoContainer.querySelector(".buffered");
const fullScreenBtn = videoContainer.querySelector(".fullscreen");
const fullScreenIcon = videoContainer.querySelector(".fullscreen i");
const progressCurrentTime = videoContainer.querySelector(
  ".current-time > .timer"
);
const progressDuration = videoContainer.querySelector(".duration > .timer");

videoPlayer.volume = 1;

playPauseBtn.addEventListener("click", () => {
  playOrPause(videoPlayer, playPauseIcon);
});

stopBtn.addEventListener("click", () => {
  stop(videoPlayer, playPauseIcon);
});

fastForwardBtn.addEventListener("click", () => {
  fastForward(videoPlayer);
});

rewindBtn.addEventListener("click", () => {
  rewind(videoPlayer);
});

volumeBtn.addEventListener("click", () => {
  toggleMute(videoPlayer, volumeIcon, volumeLevel);
});

volumeBar.addEventListener("mousedown", e => {
  const { offsetX: position, button } = e;

  if (button === 0) {
    const volumeBarWidth = volumeBar.offsetWidth;

    updateVolume({
      videoPlayer,
      volumeBarWidth,
      volumeLevel,
      volumeIcon,
      position,
    });
    state.volumeScrubbing = true;
  }
});

volumeBar.addEventListener("mouseup", () => {
  state.volumeScrubbing = false;
});

volumeBar.addEventListener("mousemove", e => {
  if (state.volumeScrubbing) {
    const { offsetX: position } = e;
    const volumeBarWidth = volumeBar.offsetWidth;

    updateVolume({
      videoPlayer,
      volumeBarWidth,
      volumeLevel,
      volumeIcon,
      position,
    });
  }
});

videoPlayer.addEventListener("timeupdate", () => {
  setCurrentTime(videoPlayer, progress);
  setVideoTime(videoPlayer, progressDuration, progressCurrentTime);
});

videoPlayer.addEventListener("contextmenu", e => {
  e.preventDefault();
});

videoPlayer.addEventListener("ended", () => {
  playPauseIcon.className = "fas fa-redo-alt";
});

progress.addEventListener("input", e => {
  currentTime(videoPlayer, e.target.value, playPauseIcon);
});

// videoPlayer.addEventListener("progress", () => {
//   setBufferedBar(videoPlayer, bufferBar);
// });

fullScreenBtn.addEventListener("click", () => {
  if (document.fullscreenEnabled) {
    toggleFullScreen(videoContainer);
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullScreenIcon.className = "fas fa-compress";
  } else {
    fullScreenIcon.className = "fas fa-expand";
  }
});
