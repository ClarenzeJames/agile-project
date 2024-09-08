const socket = io();
const video = document.getElementById('movieVideo');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

socket.on('syncTime', (time) => {
    if (Math.abs(video.currentTime - time) > 0.5) {
        video.currentTime = time;
    }
});

socket.on('playPauseUpdate', (isPlaying) => {
    if (isPlaying) {
        video.play();
    } else {
        video.pause();
    }
});

playBtn.addEventListener('click', () => {
    socket.emit('play');
    console.log('play button pressed')
});

pauseBtn.addEventListener('click', () => {
    socket.emit('pause');
    console.log('pause button pressed')
});

video.addEventListener('seeked', () => {
    socket.emit('seek', video.currentTime);
});

