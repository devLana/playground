import state from "./modules/state.js";
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
  setCurrentTime(videoPlayer, progressBar);
});

videoPlayer.addEventListener("ended", () => {
  playPauseIcon.className = "fas fa-redo-alt";
});

progressBar.addEventListener("input", e => {
  const { value } = e.target;
  currentTime(videoPlayer, value, playPauseIcon);
});
