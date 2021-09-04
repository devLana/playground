import {
  playOrPause,
  stop,
  fastForward,
  rewind,
  toggleMute,
  updateVolume,
  setCurrentTime,
  currentTime,
  scrubber,
  setBufferedBar,
} from "./modules/functions.js";
import state from "./modules/state.js";

const videoPlayer = document.querySelector(".video-player");
const playPauseBtn = document.querySelector(".play-pause");
const playPauseIcon = document.querySelector(".play-pause i");
const fastForwardBtn = document.querySelector(".fast-forward");
const rewindBtn = document.querySelector(".rewind");
const stopBtn = document.querySelector(".stop");
const volumeBtn = document.querySelector(".volume");
const volumeIcon = document.querySelector(".volume i");
const volumeSlider = document.querySelector(".volume__slider");
const progressBar = document.querySelector(".progress__bar");
const progress = document.querySelector(".progress");
const bufferBar = document.querySelector(".buffered");

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
  toggleMute(videoPlayer, volumeIcon, volumeSlider);
});

volumeSlider.addEventListener("input", e => {
  const { value } = e.target;
  updateVolume(videoPlayer, value, volumeIcon);
});

videoPlayer.addEventListener("timeupdate", () => {
  setCurrentTime(videoPlayer, progress);
});

videoPlayer.addEventListener("ended", () => {
  playPauseIcon.className = "fas fa-redo-alt";
});

progressBar.addEventListener("mousedown", e => {
  const { offsetX: position, button } = e;

  if (button === 0) {
    const progressBarWidth = progressBar.offsetWidth;

    currentTime({ videoPlayer, position, progressBarWidth, playPauseIcon });
    state.scrubbing = true;
  }
});

progressBar.addEventListener("mousemove", e => {
  if (state.scrubbing) {
    const { offsetX: position } = e;
    const progressBarWidth = progressBar.offsetWidth;

    scrubber({
      videoPlayer,
      progressBarWidth,
      progress,
      position,
      playPauseIcon,
    });
  }
});

progressBar.addEventListener("mouseup", () => {
  state.scrubbing = false;
});

videoPlayer.addEventListener("progress", () => {
  setBufferedBar(videoPlayer, bufferBar);
});
