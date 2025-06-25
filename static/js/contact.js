document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const thankYouMessage = document.getElementById("thankYouMessage");

  // Mic buttons
  document.querySelectorAll(".mic-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const input = document.getElementById(targetId);

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => {
        button.textContent = "🎙️ Listening...";
        button.disabled = true;
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        alert("Microphone error: " + event.error);
      };

      recognition.onend = () => {
        button.textContent = "🎤";
        button.disabled = false;
      };

      recognition.start();
    });
  });

  // Form handling
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    thankYouMessage.style.display = "block";
    setTimeout(() => {
      thankYouMessage.style.display = "none";
    }, 4000);
  });
});
