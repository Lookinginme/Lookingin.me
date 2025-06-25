document.addEventListener('DOMContentLoaded', function () {
  function updateDateTime() {
    const now = new Date();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    const time = `${hours}:${minutes}:${seconds} ${ampm}`;
    const date = `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    document.getElementById('current-date').textContent = date;
    document.getElementById('current-time').textContent = time;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
});
