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
