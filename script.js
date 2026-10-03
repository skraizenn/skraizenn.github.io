const overlay = document.getElementById("enter-overlay");
const music = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volume-slider");
const muteBtn = document.getElementById("mute-btn");
const content = document.querySelectorAll(".volume-control, .profile-card");

music.volume = 0.5;

content.forEach((el) => el.setAttribute("inert", ""));

function enter() {
  if (overlay.classList.contains("hidden")) return;

  music.play().catch((err) => console.error("Ses oynatma hatası:", err));
  overlay.classList.add("hidden");
  content.forEach((el) => el.removeAttribute("inert"));
}

overlay.addEventListener("click", enter);

volumeSlider.addEventListener("input", (e) => {
  music.volume = Number(e.target.value);
  music.muted = false;
  muteBtn.setAttribute("aria-pressed", "false");
  muteBtn.style.opacity = "1";
});

function toggleMute() {
  music.muted = !music.muted;
  muteBtn.setAttribute("aria-pressed", String(music.muted));
  muteBtn.style.opacity = music.muted ? "0.3" : "1";
}

muteBtn.addEventListener("click", toggleMute);

muteBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMute();
  }
});
