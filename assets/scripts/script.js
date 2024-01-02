let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let track_writer = document.querySelector('.track-writer');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let repeat_btn = document.querySelector('.repeat-track')

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let loopIcon = document.querySelector('.fa-repeat')
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isLoop = false;
let updateTimer;

const music_list = [
  {
    title: 'ဗါး',
    artist: 'ခွန်ခွန်ကျော်ဦး',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/music1.mp3',
  },
  {
    title: 'ထွားနုဲင်းရုဲင်းတဝ်း',
    writer:'တဲမ်း-ခွန်တင်ဦး',
    artist: 'ရွှစ်-ခွန်ပျူ',
    coverPath: 'assets/images/cover100.jpg',
    discPath: 'assets/music/music2.mp3',
  },
  
  {
    title: 'စွꩻခွင်ꩻဗဲင်းမွိုင်',
    artist: 'ခွန်အောင်သိုက်',
    coverPath: 'assets/images/cover300.jpg',
    discPath: 'assets/music/music3.mp3',
    writer: 'တဲမ်း-ခွန်ဇိုလ်',
  },
  {
    title: 'အုံဟဝ်နေႏမွိုး',
    artist: 'ခွန်ပဒဲကော',
    coverPath: 'assets/images/cover400.jpg',
    discPath: 'assets/music/music4.mp3',
    writer: 'တဲမ်း-ခွန်ပဒဲကော',
  },
  {
    title: 'နားဟွိုန်ꩻ',
    artist: 'ခွန်တကီးတဘဲ',
    coverPath: 'assets/images/cover5.jpg',
    discPath: 'assets/music/music5.mp3',
    writer: 'တဲမ်း-ခွန်တကီးတဘဲ',
  },
  {
    title: 'နာꩻဒေါ့ꩻ',
    artist: 'ရွှစ်-ခွန်စောနိုင်',
    coverPath: 'assets/images/cover6.jpg',
    discPath: 'assets/music/music6.mp3',
    writer: 'တဲမ်း-ခွန်ပဒဲကော',
  },
  {
    title: 'အွဥ်ဝင်ꩻစွီꩻစူ',
    artist: 'ရွှစ်-ခွန်ပျူ+နန်းမိုခမ်း',
    coverPath: 'assets/images/cover7.jpg',
    discPath: 'assets/music/music7.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'အရက်ꩻသွတ်ꩻခွေꩻအလောင်း',
    artist: 'ခွန်အောင်သိုက်',
    coverPath: 'assets/images/cover8.jpg',
    discPath: 'assets/music/music8.mp3',
    writer: 'တဲမ်း-ခွန်အောင်သိုက်',
  },
  {
    title: 'နွန်ႏ',
    artist: 'ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover9.jpg',
    discPath: 'assets/music/music9.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'ရက်ꩻမွေးမွေးလဲဥ်းနာꩻ',
    artist: 'ခွန်စောနိုင်',
    coverPath: 'assets/images/cover10.jpg',
    discPath: 'assets/music/music10.mp3',
    writer: 'တဲမ်း-ခွန်ဇေလတ်',
  },
  {
    title: 'တူနယ်တဲနယ်',
    artist: 'ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover11.jpg',
    discPath: 'assets/music/music11.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'အပဲစ်ꩻကင်ꩻထာꩻရက်ꩻ',
    artist: 'ခွန်ကျော်စိုး',
    coverPath: 'assets/images/cover12.jpg',
    discPath: 'assets/music/music12.mp3',
    writer: 'တဲမ်း-ခွန်ကျော်စိုး',
  },
  {
    title: 'နီဖာဗွေႏ',
    artist: 'ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover13.jpg',
    discPath: 'assets/music/music13.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'နာꩻထန်ႏထိုႏ',
    artist: 'ခွန်ဇော်ခက်',
    coverPath: 'assets/images/cover140.jpg',
    discPath: 'assets/music/music14.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].discPath;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].coverPath+ ")";
    track_name.textContent = music_list[track_index].title;
    track_artist.textContent = music_list[track_index].artist;
    track_writer.textContent = music_list[track_index].writer;
    

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
   
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    pauseLoop();
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function playLoop(){
  isLoop = true;
  loopIcon.classList.add('loopActive')
}
function pauseLoop(){
  isLoop = false;
  loopIcon.classList.remove('loopActive')
}
function repeatTrack(){
     pauseRandom();
    if(curr_track.loop != true ){
      curr_track.loop = true;
      curr_track.play();
      playLoop();
    } else{
      curr_track.loop = false;
      pauseLoop();
    }
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}




