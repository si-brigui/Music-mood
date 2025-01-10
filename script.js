const audioPlayer = new Audio(); // Audio object for playback
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume-control");
const playlistItems = document.querySelectorAll("#playlist li");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

let currentTrackIndex = 0; // Current track index

// Function to load a track
function loadTrack(index) {
  const track = playlistItems[index].dataset.track; // Get track from data attribute
  const artistName = playlistItems[index].textContent; // Get artist name from text content
  audioPlayer.src = track; // Set the audio source
  document.getElementById("artist-name").textContent = artistName; // Update artist name
  audioPlayer.play(); // Start playing
  updatePlayPauseButton(); // Ensure button reflects playing state

  // Highlight the current track
  playlistItems.forEach((item, i) => {
    item.classList.toggle("playing", i === index);
  });
}

// Update Play/Pause Button
function updatePlayPauseButton() {
  playPauseButton.textContent = audioPlayer.paused ? "▶️" : "⏸️";
}

// Play/Pause button functionality
playPauseButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play(); // Play
  } else {
    audioPlayer.pause(); // Pause
  }
  updatePlayPauseButton();
});

// Next button functionality
nextButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length; // Cycle to next track
  loadTrack(currentTrackIndex);
});

// Previous button functionality
prevButton.addEventListener("click", () => {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlistItems.length) % playlistItems.length; // Cycle to previous track
  loadTrack(currentTrackIndex);
});

// Click functionality for playlist items
playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentTrackIndex = index; // Update current track index
    loadTrack(currentTrackIndex);
  });
});

// Update progress bar as audio plays
audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value =
    (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;

  // Update time display
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

// Update duration once metadata is loaded
audioPlayer.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audioPlayer.duration);
});

// Seek functionality for progress bar
progressBar.addEventListener("input", () => {
  if (audioPlayer.duration) {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
  }
});

// Volume control functionality
volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;
});

// Format time to MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Load the first track on page load
loadTrack(currentTrackIndex);
