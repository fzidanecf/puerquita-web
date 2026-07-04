// Floating hearts background
function createHeart() {
    const container = document.getElementById('hearts-bg');
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.innerHTML = ['❤️', '💕', '💗', '💖', '🌸', '✨'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 5) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 13000);
}

setInterval(createHeart, 500);

// Reveal hidden message
function revealMessage() {
    const hidden = document.getElementById('hidden-msg');
    const revealed = document.getElementById('revealed-msg');
    hidden.classList.add('hidden');
    revealed.classList.remove('hidden');
    revealed.style.animation = 'fadeIn 1s ease';
}

// Reasons list
const reasons = [
    'Porque eres divertida y muy graciosa 😄',
    'Porque eres una excelente mujer 💪',
    'Porque siempre quieres con el corazon ❤️',
    'Porque eres el amor de mi vida 🌹'
];

let lastReason = -1;

function showReason() {
    let index;
    do {
        index = Math.floor(Math.random() * reasons.length);
    } while (index === lastReason && reasons.length > 1);
    lastReason = index;

    const reasonText = document.getElementById('reason-text');
    reasonText.textContent = reasons[index];
    reasonText.style.animation = 'none';
    setTimeout(() => {
        reasonText.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Photo modal
const photos = [
    'imagenes/imagen1.jpeg',
    'imagenes/imagen2.jpeg',
    'imagenes/WhatsApp Image 2026-07-04 at 10.38.33.jpeg',
    'imagenes/WhatsApp Image 2026-07-04 at 10.40.16.jpeg'
];

function showPhoto(num) {
    const modal = document.getElementById('photo-modal');
    const img = document.getElementById('modal-img');
    img.src = photos[num - 1];
    modal.classList.add('show');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('photo-modal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

// Close modal on outside click
window.onclick = function(e) {
    const modal = document.getElementById('photo-modal');
    if (e.target === modal) {
        closeModal();
    }
}

// Audio Player - YOKO de Álvaro Díaz
const audio = document.getElementById('audio-player');
const spPlay = document.getElementById('sp-play');
const spMute = document.getElementById('sp-mute');
const spProgress = document.getElementById('sp-progress');
const spCurrent = document.getElementById('sp-current');
const spDuration = document.getElementById('sp-duration');

function fmt(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

audio.addEventListener('loadedmetadata', () => {
    spDuration.textContent = fmt(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        spProgress.style.width = pct + '%';
        spCurrent.textContent = fmt(audio.currentTime);
    }
});

audio.addEventListener('ended', () => {
    spPlay.textContent = '▶';
});

function togglePlay() {
    if (!audio) return;
    if (audio.paused) {
        audio.play();
        spPlay.textContent = '⏸';
    } else {
        audio.pause();
        spPlay.textContent = '▶';
    }
}

function toggleMute() {
    if (!audio) return;
    audio.muted = !audio.muted;
    spMute.textContent = audio.muted ? '🔇' : '🔊';
}

function seekAudio(e) {
    if (!audio.duration) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
}
