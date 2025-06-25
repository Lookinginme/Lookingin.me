// 🟢 Handle the form submission and Nurse Betty's response
function handleBettyForm(event) {
  event.preventDefault();

  const userInputField = document.getElementById('userInput');
  const userInput = userInputField.value.trim();
  if (!userInput) return;

  userInputField.value = ''; // Clear input

  const chatHistory = document.getElementById('chatHistory');

  // ⌛ Add typing dots
  const typingBubble = document.createElement('div');
  typingBubble.className = 'bubble typing';
  typingBubble.innerHTML = '<span class="dots"><span>.</span><span>.</span><span>.</span></span>';
  chatHistory.appendChild(typingBubble);

  // 🔔 Optional pop sound
  const sound = document.getElementById('bubbleSound');
  if (sound) sound.play();

  // ⏳ Simulate processing delay
  setTimeout(() => {
    typingBubble.remove();

    const answer = generateNurseBettyAnswer(userInput);

    // 💬 Show answer bubble
    const responseDiv = document.createElement('div');
    responseDiv.className = answer.length < 250 ? 'bubble' : 'textbox';
    responseDiv.innerText = answer;
    chatHistory.appendChild(responseDiv);

    // 🔊 Speak the answer
    speak(answer);

    // 📧 Add email button
    const emailBtn = document.createElement('button');
    emailBtn.innerText = "📧 Email this answer";
    emailBtn.className = "email-btn";
    emailBtn.onclick = () => sendEmail(userInput, answer);
    chatHistory.appendChild(emailBtn);

    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 1200);
}

// 💡 Generate answer (basic logic for now)
function generateNurseBettyAnswer(question) {
  if (!question) return "I'm here when you're ready to ask something.";
  if (question.length < 20) return "Be sure to check your levels before bed, sweetie.";

  return "According to the latest findings by Mayo Clinic, consistent glucose monitoring combined with low-carb intake can improve overnight regulation and reduce the risk of hypoglycemia. Always consult with your healthcare team for a personalized plan.";
}

// 🔊 Speak the answer using Web Speech API
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

// 📧 Send the answer via EmailJS (✅ Fully Configured)
function sendEmail(question, answer) {
  const toEmail = prompt("Enter your email address:");
  if (!toEmail) return;

  emailjs.send('service_8atkglr', 'template_h8rdqsh', {
    user_question: question,
    betty_answer: answer,
    to_email: toEmail
  }, 'PCMZRmlHWoBESksvm')
  .then(() => {
    alert("✅ Answer sent to your inbox!");
  }, (error) => {
    alert("❌ Oops! Something went wrong.\n" + error.text);
  });
}

// 🎙️ Voice-to-text with Web Speech API
const micButton = document.getElementById("micButton");

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  micButton.addEventListener('click', () => {
    micButton.innerText = '🎤 Listening...';
    recognition.start();
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('userInput').value = transcript;
    micButton.innerText = '🎙️';
  });

  recognition.addEventListener('end', () => {
    micButton.innerText = '🎙️';
  });
} else {
  micButton.disabled = true;
  micButton.title = 'Speech not supported in this browser';
}
