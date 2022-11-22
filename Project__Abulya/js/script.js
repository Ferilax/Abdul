"use strict";

jarallax(document.querySelectorAll('.jarallax'), {
	speed: -0.2,
});

const playerAudio = document.querySelector('.player__audio'),
		playBtn = document.querySelector('.player__play-pause'),
		prevBtn = document.querySelector('.prev'),
		nextBtn = document.querySelector('.next'),
		audio = document.querySelector('.audio'),
		subTitle = document.querySelector('.player__subtitle'),
		title = document.querySelector('.player__title'),
		progressContainer = document.querySelector('.player__progress-container'),
		progress = document.querySelector('.player__progress'),
		imgSrc = document.querySelector('.resume')


// Name
const songs = ['fdfdfd', 'footsteps-shoes-stomp-leaves-pile_fjgebp4u']

let songIndex = 0;

// Init
function loadSong(song) {
	title.innerHTML = song;
	audio.src = `audio/${song}.mp3`; 
	
}
loadSong(songs[songIndex]);

// Play
function playSong() {
	playerAudio.classList.add('play');
	audio.play();
	imgSrc.src = './img/button-stop.png';
}
// Pause
function pauseSong() {
	playerAudio.classList.remove('play');
	audio.pause();
	imgSrc.src = './img/button-resume.png';
}

playBtn.addEventListener('click', () => {
	const isPlaying = playerAudio.classList.contains('play');
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Next song
function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}
nextBtn.addEventListener('click', nextSong);

// Prev song
function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}
prevBtn.addEventListener('click', prevSong);

// Progressbar
function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = ( currentTime / duration ) * 100;
	progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress);

// Set progress
function setProgress (e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

// Autoplay
audio.addEventListener('ended', nextSong);