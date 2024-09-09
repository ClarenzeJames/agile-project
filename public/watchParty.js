// /public/watchParty.js

const socket = io('http://localhost:3000');
const videoPlayer = document.getElementById('movieVideo');

// Emit the video time periodically
setInterval(() => {
  if (!videoPlayer.paused) {
    socket.emit('video-time', videoPlayer.currentTime);
  }
}, 1000);

// Update the video time when receiving from server
socket.on('sync-video-time', (time) => {
  videoPlayer.currentTime = time;
});

// Synchronize play/pause actions
videoPlayer.addEventListener('play', () => socket.emit('play'));
videoPlayer.addEventListener('pause', () => socket.emit('pause'));

// Receive play/pause commands
socket.on('play', () => videoPlayer.play());
socket.on('pause', () => videoPlayer.pause());