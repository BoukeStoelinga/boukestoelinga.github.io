// Entry point


let countdownStarted = false;
let countdownEnded = false;
let finalAudio;

function startCountdown() {
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('countdown').style.display = 'block';
  countdownStarted = true;
  setInterval(updateCountdown, 1000);
  updateCountdown();
  checkAndPlaySound();
  // Prepare finalAudio so it's allowed to play later
  finalAudio = new Audio('./final_song.mp3');
  finalAudio.loop = true;
  finalAudio.volume = 0.7;

}

function updateCountdown() {
const targetDate = new Date(new Date().getFullYear(), 8, 5, 18, 0, 0, 0); // September is month 8 (0-based), 5th day, 17:25
  const now = new Date();
  let diff = targetDate - now;
  const countdownDiv = document.getElementById('countdown');
  if (diff < 0) {
    countdownEnded = true;
    if (!countdownDiv.querySelector('#ready-btn')) {
      const readyBtn = document.createElement('button');
      readyBtn.id = 'ready-btn';
      readyBtn.textContent = 'ready for it';
      readyBtn.style.display = 'block';
      readyBtn.style.margin = '20px auto';
      countdownDiv.appendChild(readyBtn);

      readyBtn.onclick = function() {
        // The rest of the post-countdown stuff
        const img = document.createElement('img');
        if (!countdownDiv.querySelector('img')) {
          img.src = './raveyard.jpg';
          img.alt = 'Raveyard';
          img.style.display = 'block';
          img.style.margin = '20px auto';
          img.style.maxWidth = '90vw';
          img.style.height = 'auto';
          img.style.maxHeight = '70vh';
          countdownDiv.appendChild(img);

          const revealBtn = document.createElement('instabutton');
          revealBtn.textContent = 'More info';
          revealBtn.style.display = 'block';
          revealBtn.style.margin = '20px auto';
          revealBtn.onclick = function() {
            window.location.href = 'https://www.instagram.com/mixupdelft';
          };
          countdownDiv.appendChild(revealBtn);
          document.body.style.background = 'black';

          if (!finalAudio) {
            console.log('Final audio not initialized!');
          }
          if (finalAudio && finalAudio.paused) {
            finalAudio.play().catch(e => console.log('Audio play error:', e));
          }
        }

        countdownDiv.style.position = 'fixed';
        countdownDiv.style.top = '0';
        countdownDiv.style.left = '0';
        countdownDiv.style.width = '100vw';
        countdownDiv.style.background = 'rgba(0,0,0,0.85)';
        countdownDiv.style.zIndex = '9999';
        countdownDiv.style.textAlign = 'center';
        countdownDiv.style.padding = '30px 0';

        readyBtn.style.display = 'none'; // Hide the button after pressed
      };
    }
    
    // countdownDiv.textContent = "Countdown finished!";
    // const img = document.createElement('img');
    // if (!countdownDiv.querySelector('img')) {
    //   img.src = './raveyard.jpg';
    //   img.alt = 'Raveyard';
    //   img.style.display = 'block';
    //   img.style.margin = '20px auto';
    //   img.style.maxWidth = '90vw';
    //   img.style.height = 'auto';
    //   img.style.maxHeight = '70vh';
    //   countdownDiv.appendChild(img);


    //   const revealBtn = document.createElement('instabutton');
    //   revealBtn.textContent = 'More info';
    //   revealBtn.style.display = 'block';
    //   revealBtn.style.margin = '20px auto';
    //   revealBtn.onclick = function() {
    //     window.location.href = 'https://www.instagram.com/mixupdelft';
    //   };
    //   countdownDiv.appendChild(revealBtn);
    //   document.body.style.background = 'black';

    //         // Play final_song.mp3 on loop
    // // Play final_song.mp3 on loop (now allowed by user interaction)
    // // if (!finalAudio) {
    // //   finalAudio = 
    // //   finalAudio.loop = true;
    // //   finalAudio.volume = 0.7;
    // // }
    // if (!finalAudio) {
    //   console.log('Final audio not initialized!');
    // }
    // if (finalAudio && finalAudio.paused) {
    //   finalAudio.play().catch(e => console.log('Audio play error:', e));
    // }
    //   // Store reference so it doesn't get garbage collected
    //   // window.finalAudio = finalAudio;
    // }

    // // Move the countdownDiv to the top of the page
    // countdownDiv.style.position = 'fixed';
    // countdownDiv.style.top = '0';
    // countdownDiv.style.left = '0';
    // countdownDiv.style.width = '100vw';
    // countdownDiv.style.background = 'rgba(0,0,0,0.85)';
    // countdownDiv.style.zIndex = '9999';
    // countdownDiv.style.textAlign = 'center';
    // countdownDiv.style.padding = '30px 0';

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
  if (countdownEnded) return;
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
  './sound10.mp3',
  './sound11.mp3',
  './sound12.mp3',
  './sound13.mp3',
  './sound14.mp3',
  './sound15.mp3',
  './sound16.mp3'
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
    if (countdownEnded) return; // Stop playing sound after countdown ends
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

(function () {
  function placeMysts() {
    for (let i = 1; i <= 9; i++) {
      const img = document.createElement('img');
      img.src = `./myst${i}.svg`;
      img.alt = `myst${i}`;
      img.style.position = 'absolute';
      img.style.pointerEvents = 'none';
      img.style.userSelect = 'none';
      img.style.zIndex = '0';

      const size = Math.floor(60 + Math.random() * 120); // 60-180px
      img.style.width = `${size}px`;
      img.style.transformOrigin = '50% 50%';
      img.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;

      img.addEventListener('load', () => {
        const w = img.clientWidth;
        const h = img.clientHeight || w; // fallback if height not ready
        const maxLeft = Math.max(0, window.innerWidth - w);
        const maxTop = Math.max(0, window.innerHeight - h);
        const left = Math.floor(Math.random() * (maxLeft + 1));
        const top = Math.floor(Math.random() * (maxTop + 1));
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;
      });

      document.body.appendChild(img);
    }
  }

  window.addEventListener('load', placeMysts);
})();