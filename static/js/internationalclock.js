/*document.addEventListener('DOMContentLoaded', function() {
  const editableName = document.getElementById('note-name');
  const editableContent = document.querySelector('.note-content');

  function setPlaceholderText(element, defaultText) {
    if (element.textContent.trim() === '') {
      element.textContent = defaultText; // Set default text
      element.classList.add('placeholder'); // Add a class to style it as a placeholder
    }

    element.addEventListener('focus', function() {
      if (this.textContent.trim() === defaultText) {
        this.textContent = ''; // Clear the placeholder text
        this.classList.remove('placeholder');
      }
    });

    element.addEventListener('blur', function() {
      if (!this.textContent.trim()) {
        this.textContent = defaultText; // Reapply placeholder text
        this.classList.add('placeholder');
      }
    });
  }

  // Initialize placeholders
  setPlaceholderText(editableName, 'Note to Self');
  setPlaceholderText(editableContent, 'Type your note here...');

  function updateDateTime() {
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const hours = String(now.getHours()).padStart(2, '0'); // 24-hour format
    const minutes = ('0' + now.getMinutes()).slice(-2);

    document.getElementById('current-date').innerText = `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    document.getElementById('current-time').innerText = `${hours}:${minutes}`;
  }

  // Update the clock and date every second
  setInterval(updateDateTime, 1000);
  updateDateTime(); // Initialize immediately
});*/