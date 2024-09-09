// /public/videoControls.js

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('movieVideo');
    // const playPauseBtn = document.getElementById('playPauseBtn');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.querySelector('.volume-slider');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');

    // playPauseBtn.addEventListener('click', togglePlayPause);
    playBtn.addEventListener('click', playVideo);
    pauseBtn.addEventListener('click', pauseVideo);
    muteBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', changeVolume);
    video.addEventListener('timeupdate', updateProgress);
    progress.addEventListener('click', seek);

    function playVideo(){
        video.play();
    }

    function pauseVideo(){
        video.pause();
    }

    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '&#10074;&#10074;'; // pause symbol
        } else {
            video.pause();
            playPauseBtn.innerHTML = '&#9654;'; // play symbol
        }
    }

    function toggleMute() {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '&#128263;' : '&#128266;';
    }

    function changeVolume() {
        video.volume = volumeSlider.value;
        video.muted = (video.volume === 0);
        muteBtn.innerHTML = (video.volume === 0) ? '&#128263;' : '&#128266;';
    }

    function updateProgress() {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function seek(e) {
        const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = seekTime;
    }
});