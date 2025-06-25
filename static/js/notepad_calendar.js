// 📌 EmailJS Setup
emailjs.init("PCMZRmlHWoBESksvm");

// ✅ Save note to localStorage
function saveNote() {
  const note = document.getElementById('noteText').value;
  localStorage.setItem('dailyNote', note);
  alert("💾 Note saved!");
}

// ✅ Load note from localStorage
function loadNote() {
  const saved = localStorage.getItem('dailyNote');
  document.getElementById('noteText').value = saved || '';
}

// 🔊 Text-to-Speech
function speakNote() {
  const note = document.getElementById('noteText').value;
  const msg = new SpeechSynthesisUtterance(note);
  window.speechSynthesis.speak(msg);
}

// 🎙️ Speech-to-Text
function startDictation() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert("🎙️ Speech recognition is not supported in this browser.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('noteText').value += transcript;
  };

  recognition.onerror = function(event) {
    alert("❌ Speech recognition error: " + event.error);
  };
}

// 📧 Send note via Email
function emailNote() {
  const noteContent = document.getElementById('noteText').value;
  const userEmail = document.getElementById('userEmail').value;

  if (!userEmail || !noteContent) {
    alert("❗ Please enter both your note and email.");
    return;
  }

  emailjs.send("service_xyz123", "template_abcd99", {
    note: noteContent,
    to_email: userEmail
  }).then(() => {
    alert("📨 Your note has been sent!");
  }).catch((error) => {
    console.error("Email send error:", error);
    alert("❌ Failed to send email.");
  });
}

// 🕒 Live Clock
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
  document.getElementById('current-date').textContent = now.toDateString();
  document.getElementById('current-time').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// 🚀 Load note on page load
window.addEventListener('DOMContentLoaded', () => {
  loadNote();

  const noteTitle = document.getElementById('note-name');

  function showPlaceholderIfEmpty() {
    if (noteTitle.textContent.trim() === '') {
      noteTitle.textContent = 'Note to Self';
      noteTitle.classList.add('placeholder');
    }
  }

  noteTitle.addEventListener('focus', () => {
    if (noteTitle.textContent === 'Note to Self') {
      noteTitle.textContent = '';
      noteTitle.classList.remove('placeholder');
    }
  });

  noteTitle.addEventListener('blur', showPlaceholderIfEmpty);

  showPlaceholderIfEmpty();
});
