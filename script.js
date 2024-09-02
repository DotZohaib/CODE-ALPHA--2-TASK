let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));

// Update song list if needed
let songs = [
  "songs/1.mp3",
  "songs/1 (2).mp3",
  "songs/1 (3).mp3",
  "songs/1 (4).mp3",
  "songs/1 (5).mp3",
  "songs/1 (6).mp3",
  "songs/1 (7).mp3",
  "songs/1 (8).mp3",
  "songs/1 (9).mp3",
  "songs/2.mp3",
];

function playSong() {
  audioElement.src = songs[songIndex];
  masterSongName.innerText = `Song ${songIndex + 1}`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;

  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
}

function pauseSong() {
  audioElement.pause();
  gif.style.opacity = 0;
  masterPlay.classList.remove('fa-pause-circle');

  masterPlay.classList.add('fa-play-circle');
}

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    pauseSong();
  }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
  // Update Seekbar
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Make all plays pause except the current one
function makeAllPlays() {
  songItems.forEach((element) => {
    element.classList.remove('fa-pause-circle');

    element.classList.add('fa-play-circle');
  });
}

// Handle song play from list
songItems.forEach((element, i) => {
  element.addEventListener('click', () => {
    makeAllPlays();
    songIndex = i;

    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle');
    playSong();
  });
});

// Next and Previous controls
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong();
});

document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong();
});
