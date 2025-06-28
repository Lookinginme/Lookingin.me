// 🔊 Play or pause Nurse Betty’s MP3
function toggleBettyAudio() {
  const audio = document.getElementById("bettyAudio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

// 💬 Voice greeting on page load
window.onload = () => {
  const greeting = new SpeechSynthesisUtterance(
    "Hello sweetheart, this is Nurse Betty. I'm just checking in to help you feel safe. You're doing great. Let's take a look together."
  );

  const setVoice = () => {
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(voice =>
      voice.name.includes("Google") ||
      voice.name.includes("Samantha") ||
      voice.name.includes("Microsoft")
    );

    if (preferred) {
      greeting.voice = preferred;
      greeting.pitch = 1.2;
      greeting.rate = 0.9;
      greeting.volume = 1;
      speechSynthesis.speak(greeting);
    } else {
      setTimeout(setVoice, 200); // Retry in case voices not loaded yet
    }
  };

  setVoice();
};
