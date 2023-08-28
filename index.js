// let classes=(classes)=>document.querySelector(".classes");

// const { url } = require("inspector");

let now_playing=document.querySelector(".now_playing");
let track_art=document.querySelector(".track_art");
let track_name=document.querySelector(".track_name");
let track_artist=document.querySelector(".track_artist");


let playpause_btn=document.querySelector(".playpause_track");
let prev_btn=document.querySelector(".prev_track");
let next_btn=document.querySelector(".next_track");

let seek_slider=document.querySelector(".seek_slider");
let volume_slider=document.querySelector(".volume_slider");
let current_time=document.querySelector(".current_time");
let total_duration=document.querySelector(".total_duration");

let wave=document.getElementById("wave");
let randomIcon=document.querySelector(".fa-shuffle");
let current_track=document.createElement('audio');

let track_index=0;
let isPlaying=false;
let isRandom=false;
let updateTimer;

const music_list=[

    {
        img :"images/Mastaru.jpg",
        name : 'Mastaru Mastaru',
        artist : 'Shweta Mohan',
        music:'music/Mastaru Mastaru.mp3'
    },
    {
        img : 'images/Emai_pothane.jpg',
        name : 'Emai Potane',
        artist : 'Praveen Lakkaraju',
        music:'music/Emai Pothane.mp3'
    },
  
    {
        img : "images/Beleiver.jpg",
        name : 'Believer',
        artist :'Imagine Dragons',
        music:'music/Believer.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    current_track.src=music_list[track_index].music;
    current_track.load();

    track_art.style.backgroundImage = "url("+music_list[track_index].img+")";
    track_name.textContent=music_list[track_index].name;
    track_artist.textContent=music_list[track_index].artist;
    now_playing.textContent="Playing music "+(track_index+1)+" of "+music_list.length;

    updateTimer = setInterval(setUpdate,1000);
    current_track.addEventListener('ended',nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    let a;

    function populate(a){
        for (let i=0;i<6;i++){
            let x=Math.round(Math.random() *14);
            let y=hex[x];
            a+=y;
        }
        return a;
    }
    let color1=populate('#');
    let color2=populate('#');
    var angle='to right';

    let gradient = 'linear-gradient('+ angle + "," + color1 + "," + color2+ ")";
    document.body.style.background=gradient;
} 

function reset(){
    current_time.textContent="00.00";
    total_duration.textContent="00.00";
    seek_slider.value=0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom=true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom=false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let current_index=track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    current_track.play();
    isPlaying=true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML=`<i class="fa-solid fa-circle-pause fa-4x"></i>`;
}

function pauseTrack(){
    current_track.pause();
    isPlaying=false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML='<i class="fa-solid fa-circle-play fa-4x"></i>';
}

function nextTrack(){
    if(track_index < music_list.length-1 && isRandom === false){
        track_index+=1;
    }
    else if(track_index < music_list.length-1 && isRandom === true){
        let random_index=Number.parseInt(Math.random()*music_list.length);
        track_index=random_index;
    }
    else{
        track_index=0;
    }
    loadTrack(track_index);
    playTrack(); 
}

function prevTrack(){
    if(track_index>0){
        track_index-=1;
    }
    else {
        track_index = music_list.length-1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto=current_track.duration *(seek_slider.value/100);
    current_track.currentTime = seekto;
}

function setVolume(){
    current_track.volume = volume_slider.value/100;
}

function setUpdate(){
    let seekPosition=0;
    if(!isNaN(current_track.duration)){
        seekPosition = current_track.currentTime*(100/current_track.duration);
        seek_slider.value=seekPosition;

        let currentMinutes = Math.floor(current_track.currentTime/60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes*60);
        let durationMinutes = Math.floor(current_track.duration/60);
        let durationSeconds = Math.floor(current_track.duration - durationMinutes*60);

        if(currentSeconds<10){
            currentSeconds="0"+currentSeconds;
        }
        if(durationSeconds<10){
            durationSeconds="0"+durationSeconds;
        }
        if(currentMinutes<10){
            currentMinutes="0"+currentMinutes;
        }
        if(durationMinutes<10){
            durationMinutes="0"+durationMinutes;
        }

        current_time.textContent=currentMinutes + ":" + currentSeconds;
        total_duration.textContent=durationMinutes + ":" +durationSeconds;

    }
}
