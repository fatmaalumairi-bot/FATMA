
// إنشاء الأصوات باستخدام المتصفح
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playTone(frequency, duration, type = "sine", volume = 0.12) {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

function birdSound() {
    playTone(1200, 0.12);
    setTimeout(() => playTone(1600, 0.15), 180);
    setTimeout(() => playTone(1350, 0.12), 350);
}

function stepSound() {
    playTone(110, 0.08, "triangle", 0.2);
}

function successSound() {
    playTone(523, 0.2);
    setTimeout(() => playTone(659, 0.2), 180);
    setTimeout(() => playTone(784, 0.4), 360);
}

function wrongSound() {
    playTone(220, 0.3, "triangle");
}

function treasureSound() {
    playTone(784, 0.2);
    setTimeout(() => playTone(988, 0.2), 180);
    setTimeout(() => playTone(1175, 0.5), 360);
}

// زر لتجربة أصوات الغابة
function playForestSounds() {
    birdSound();
    setTimeout(stepSound, 700);
    setTimeout(stepSound, 1200);
    setTimeout(successSound, 1800);
}
