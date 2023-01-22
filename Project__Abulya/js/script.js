"use strict";

jarallax(document.querySelectorAll('.jarallax'), {
	speed: -0.2,
});

const playerAudio = document.querySelector('.player__audio'),
		playBtn = document.querySelector('.player__play-pause'),
		prevBtn = document.querySelector('.prev'),
		nextBtn = document.querySelector('.next'),
		audio = document.querySelectorAll('audio'),
		subTitle = document.querySelector('.player__subtitle'),
		title = document.querySelector('.player__title'),
		progressContainer = document.querySelector('.player__progress-container'),
		progress = document.querySelector('.player__progress'),
		volumeContainer = document.querySelector('.player__volume-container'),
		volumeSelect = document.querySelector('.player__volume'),
		imgSrc = document.querySelector('.resume'),
		playerUl = document.querySelector('.player__ul')

const allList = playerUl.querySelectorAll('.player__li');
let songIndex = 0;

for (let i = 0; i < allList.length; i++) {
	allList[i].addEventListener('click', function(e) {
		pauseSong(0);
		
		songIndex = i;
		playSong();
	});
};

// Init
function loadSong(song) {
	title.innerHTML = song.querySelector('.player__audioname').innerHTML;
	subTitle.innerHTML = song.querySelector('.player__author').innerHTML;
}
loadSong(allList[songIndex]);

// Play
function playSong() {
	loadSong(allList[songIndex]);
	playerAudio.classList.add('play');
	allList[songIndex].querySelector('audio').play();
	imgSrc.src = './img/button-stop.png';
}
// Pause
function pauseSong(zero = allList[songIndex].querySelector('audio').currentTime) {
	playerAudio.classList.remove('play');
	allList[songIndex].querySelector('audio').pause();
	imgSrc.src = './img/button-resume.png';
	allList[songIndex].querySelector('audio').currentTime = zero;
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
	pauseSong(0);
	loadSong(allList[songIndex]);
	
	songIndex++;

	if (songIndex > allList.length - 1) {
		songIndex = 0;
	}

	playSong();
}
nextBtn.addEventListener('click', nextSong);

// Prev song
function prevSong() {
	pauseSong(0);
	loadSong(allList[songIndex]);
	songIndex--;

	if (songIndex < 0) {
		songIndex = allList.length - 1;
	}

	playSong();
}
prevBtn.addEventListener('click', prevSong);

// Progressbar
function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = ( currentTime / duration ) * 100;
	progress.style.width = `${progressPercent}%`;
}
for (let i = 0; i < allList.length; i++) {
	allList[i].querySelector('audio').addEventListener('timeupdate', updateProgress);
}

// Set progress
function setProgress (e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = allList[songIndex].querySelector('audio').duration;

	allList[songIndex].querySelector('audio').currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('mousedown', function () {
	progressContainer.addEventListener('mousemove', setProgress);
});
progressContainer.addEventListener('mouseup', function () {
	progressContainer.removeEventListener('mousemove', setProgress);
})
progressContainer.addEventListener('mouseleave', function () {
	progressContainer.removeEventListener('mousemove', setProgress);
})
progressContainer.addEventListener('mousedown', setProgress);

// Set Volume
function setVolume (e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;

	console.log(width, clickX)

	for (let key of audio) {
		key.volume = (clickX / width);
	}
	volumeSelect.style.width = `${(clickX / width) * 100}%`;
	console.log(allList[songIndex].querySelector('audio').volume);
}

volumeContainer.addEventListener('mousedown', function() {
	volumeContainer.addEventListener('mousemove', setVolume);
});
volumeContainer.addEventListener('mouseup', function() {
	volumeContainer.removeEventListener('mousemove', setVolume);
})
volumeContainer.addEventListener('mouseleave', function() {
	volumeContainer.removeEventListener('mousemove', setVolume);
})
volumeContainer.addEventListener('mousedown', setVolume);


// Autoplay
allList[songIndex].querySelector('audio').addEventListener('ended', nextSong);