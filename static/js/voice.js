// voices.js

let mediaRecorder;
let recordedChunks = [];

const startBtn = document.getElementById('startRecording');
const stopBtn = document.getElementById('stopRecording');
const playback = document.getElementById('playback');

if (startBtn && stopBtn && playback) {
  startBtn.addEventListener('click', async () => {
    recordedChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        const audioURL = URL.createObjectURL(blob);
        playback.src = audioURL;
        playback.style.display = 'block';
        playback.load();

        // For EmailJS usage
        playback.dataset.blob = audioURL;
        playback.blobData = blob;
      };

      mediaRecorder.start();
      startBtn.disabled = true;
      stopBtn.disabled = false;
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      alert("❌ Could not access your microphone.");
    }
  });

  stopBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
}
