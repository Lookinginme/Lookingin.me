// static/js/americanclock.js

function updateamericanclock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById("liveTime").textContent = timeString;
}

setInterval(updateamericanclock, 1000); // Update every second
updateamericanclock(); // Initial call
