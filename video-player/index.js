import {
  playOrPause,
  stop,
  fastForward,
  rewind,
  toggleMute,
  updateVolume,
  setCurrentTime,
  currentTime,
} from "./modules/functions.js";

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
const knob = document.querySelector(".progress__bar__knob");

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
  setCurrentTime({ videoPlayer, progressBar, progress, knob });
});

videoPlayer.addEventListener("ended", () => {
  playPauseIcon.className = "fas fa-redo-alt";
});

progressBar.addEventListener("mousedown", e => {
  const { offsetX: position, button } = e;

  if (button === 0) {
    const width = progressBar.offsetWidth;
    currentTime({ videoPlayer, position, width, playPauseIcon });
  }
});
