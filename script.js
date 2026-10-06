const overlay = document.getElementById("enter-overlay");
const music = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volume-slider");
const muteBtn = document.getElementById("mute-btn");
const clock = document.getElementById("clock");
const bootOverlay = document.getElementById("boot-overlay");
const bootLog = document.getElementById("boot-log");
const content = document.querySelectorAll(".volume-control, .profile-card");

music.volume = 0.5;

content.forEach((el) => el.setAttribute("inert", ""));
overlay.setAttribute("inert", "");

const bootLines = [
  "> boot sequence initiated",
  "> loading assets ......... ok",
  "> initializing audio ..... ok",
  "> mounting interface ..... ok",
  ">",
  "> ready.",
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const bootStep = reduceMotion ? 0 : 300;

bootLines.forEach((line, i) => {
  setTimeout(() => {
    bootLog.textContent += (i === 0 ? "" : "\n") + line;
  }, bootStep * (i + 1));
});

setTimeout(() => {
  bootOverlay.classList.add("done");
  overlay.removeAttribute("inert");
  setTimeout(() => bootOverlay.remove(), 800);
}, bootStep * bootLines.length + (reduceMotion ? 0 : 550));

function updateClock() {
  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = now.toLocaleTimeString("en-GB", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

updateClock();
setInterval(updateClock, 1000);

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
