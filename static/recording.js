// static/js/recording.js

// ✅ General voice recording toggle
function toggleRecording(target) {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert("🚫 Speech recognition not supported in this browser.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onstart = () => {
    alert("🎤 Listening... Speak now.");
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    alert("❌ Speech recognition failed.");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (target === 'notepad') {
      const notes = document.getElementById('notes');
      notes.value += (notes.value ? '\n' : '') + transcript;
    } else if (target === 'calendar') {
      alert(`🗓️ Calendar memo captured: "${transcript}"`);
      // You can expand this to log or store calendar voice memos
    }
  };

  recognition.start();
}
