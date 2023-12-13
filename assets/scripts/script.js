const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'ဗါး',
    artist: 'တဲမ်း/ရွှစ်-ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/music1.mp3',
    duration: '4:11',
  },
  {
    title: 'ထွားနုဲင်းရုဲင်းတဝ်း',
    artist: 'တဲမ်း-ခွန်တင်ဦး / ရွှစ်-ခွန်ပျူ',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/music2.mp3',
    duration: '4:11',
  },
  
  {
    title: 'စွꩻခွင်ꩻဗဲင်းမွိုင်',
    artist: 'တဲမ်း-ခွန်ဇိုလ် / ရွှစ်-ခွန်အောင်သိုက်',
    coverPath: 'assets/images/cover3.jpg',
    discPath: 'assets/music/music3.mp3',
    duration: '4:50',
  },
  {
    title: 'အုံဟဝ်နေႏမွိုး',
    artist: 'တဲမ်း/ရွှစ်-ခွန်ပဒဲကော',
    coverPath: 'assets/images/cover4.jpg',
    discPath: 'assets/music/music4.mp3',
    duration: '4:50',
  },
  {
    title: 'နားဟွိုန်ꩻ',
    artist: 'တဲမ်း/ရွှစ်-ခွန်တကီးတဘဲ',
    coverPath: 'assets/images/cover5.jpg',
    discPath: 'assets/music/music5.mp3',
    duration: '4:28',
  },
  {
    title: 'နာꩻဒေါ့ꩻ',
    artist: 'တဲမ်း-ခွန်ပဒဲကော / ရွှစ်-ခွန်စောနိုင်',
    coverPath: 'assets/images/cover6.jpg',
    discPath: 'assets/music/music6.mp3',
    duration: '4:37',
  },
  {
    title: 'အွဥ်ဝင်ꩻစွီꩻစူ',
    artist: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး / ရွှစ်-ခွန်ပျူ+နန်းမိုခမ်း',
    coverPath: 'assets/images/cover7.jpg',
    discPath: 'assets/music/music7.mp3',
    duration: '4:41',
  },
  {
    title: 'အရက်ꩻသွတ်ꩻခွေꩻအလောင်း',
    artist: 'တဲမ်း/ရွှစ်-ခွန်အောင်သိုက်',
    coverPath: 'assets/images/cover8.jpg',
    discPath: 'assets/music/music8.mp3',
    duration: '4:20',
  },
  {
    title: 'နွန်ႏ',
    artist: 'တဲမ်း/ရွှစ်-ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover9.jpg',
    discPath: 'assets/music/music9.mp3',
    duration: '5:03',
  },
  {
    title: 'ရက်ꩻမွေးမွေးလဲဥ်းနာꩻ',
    artist: 'တဲမ်း-ခွန်ဇေလတ် / ရွှစ်-ခွန်စောနိုင်',
    coverPath: 'assets/images/cover10.jpg',
    discPath: 'assets/music/music10.mp3',
    duration: '4:19',
  },
  {
    title: 'တူနယ်တဲနယ်',
    artist: 'တဲမ်း/ရွှစ်-ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover11.jpg',
    discPath: 'assets/music/music11.mp3',
    duration: '3:49',
  },
  {
    title: 'အပဲစ်ꩻကင်ꩻထာꩻရက်ꩻ',
    artist: 'တဲမ်း/ရွှစ်-ခွန်ကျော်စိုး',
    coverPath: 'assets/images/cover12.jpg',
    discPath: 'assets/music/music12.mp3',
    duration: '4:17',
  },
  {
    title: 'နီဖာဗွေႏ',
    artist: 'တဲမ်း/ရွှစ်-ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover13.jpg',
    discPath: 'assets/music/music13.mp3',
    duration: '4:14',
  },
  {
    title: 'ဝါးပေꩻဗွါ',
    artist: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး / ရွှစ်-ခွန်ဇော်ခက်',
    coverPath: 'assets/images/cover14.jpg',
    discPath: 'assets/music/music14.mp3',
    duration: '5:04',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
