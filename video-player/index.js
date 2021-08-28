const videoPlayer = document.querySelector(".video-player");
const playPauseBtn = document.querySelector(".play-pause");
const fastForwardBtn = document.querySelector(".fast-forward");
const rewindBtn = document.querySelector(".rewind");
const stopBtn = document.querySelector(".stop");
const volumeBtn = document.querySelector(".volume");
// const playPauseButton = document.querySelector(".play-pause");

// console.log(videoPlayer.duration);

playPauseBtn.addEventListener("click", () => {
  const icon = document.querySelector(".play-pause i");

  if (videoPlayer.paused) {
    videoPlayer.play();
    icon.className = "fas fa-play";
  } else {
    videoPlayer.pause();
    icon.className = "fas fa-pause";
  }
});

stopBtn.addEventListener("click", () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
});

fastForwardBtn.addEventListener("click", () => {
  if (videoPlayer.currentTime < Math.floor(videoPlayer.duration)) {
    videoPlayer.currentTime += 5;
  }
});

rewindBtn.addEventListener("click", () => {
  videoPlayer.currentTime -= 5;
});
