// 🌟 Section Reveal Animation
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// ⬆️ Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 🔊 Play Article Audio Button
function playConfidenceArticle() {
  const audio = document.getElementById('confAudio');
  if (audio) {
    audio.play();
  }
}

// 📧 EmailJS – Send Article by Email
function sendArticleEmail() {
  const userEmail = prompt("Enter your email to receive the article:");
  if (!userEmail) return;

  emailjs.send("your_service_id", "your_template_id", {
    user_email: userEmail,
    article_subject: "Managing Type 1 Diabetes with Confidence",
    article_body: `Living with Type 1 Diabetes means understanding how to balance insulin, meals, and activity...`,
    mp3_link: window.location.origin + "/static/audio/managing-type-1-diabetes-with-confidence.mp3"
  }).then(function () {
    alert("✅ Sent! Check your inbox 💙");
  }, function (error) {
    alert("⚠️ Oops! Email failed.");
    console.error("EmailJS error:", error);
  });
}
