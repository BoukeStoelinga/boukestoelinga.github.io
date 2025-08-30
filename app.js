// Entry point


let countdownStarted = false;

function startCountdown() {
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('countdown').style.display = 'block';
  countdownStarted = true;
  setInterval(updateCountdown, 1000);
  updateCountdown();
  checkAndPlaySound();
}

function updateCountdown() {
const targetDate = new Date(new Date().getFullYear(), 8, 5, 18, 0, 0, 0); // September is month 8 (0-based), 5th day, 18:00
  const now = new Date();
  let diff = targetDate - now;
  const countdownDiv = document.getElementById('countdown');
  if (diff < 0) {
    countdownDiv.textContent = "Countdown finished!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  // Pad hours, minutes, seconds with one leading zero
  const paddedDays = days < 10 ? '0' + days : days;
  const paddedHours = hours < 10 ? '0' + hours : hours;
  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const paddedSeconds = seconds < 10 ? '0' + seconds : seconds;
  countdownDiv.innerHTML =
    `<div id="time">${paddedDays}:${paddedHours}:${paddedMinutes}:${paddedSeconds}</div>`;
}

let nextSoundTime = Date.now() + 10000 + Math.floor(Math.random() * 10000 - 5000);
const audioFiles = [
  './sound1.mp3',
  './sound2.mp3',
  './sound3.mp3',
  './sound4.mp3',
  './sound5.mp3',
  './sound6.mp3',
  './sound7.mp3',
  './sound8.mp3',
  './sound9.mp3',
  './sound10.mp3'
]; // Add your sound file paths here

window.onload = function() {
  document.getElementById('countdown').style.display = 'none';
  const btn = document.createElement('button');
  btn.id = 'start-btn';
  btn.textContent = '???';
  btn.onclick = startCountdown;
  document.body.insertBefore(btn, document.getElementById('countdown'));
};

function getRandomAudio() {
    const idx = Math.floor(Math.random() * audioFiles.length);
    return new Audio(audioFiles[idx]);
}

function checkAndPlaySound() {
    if (Date.now() >= nextSoundTime) {
    const audio = getRandomAudio();
    audio.play();
    nextSoundTime = Date.now() + 15000 + Math.floor(Math.random() * 10000 - 5000);
    }
    requestAnimationFrame(checkAndPlaySound);
}
// Start sound playback immediately (may be blocked by browser until user interacts)
checkAndPlaySound();
setInterval(updateCountdown, 1000);
updateCountdown();