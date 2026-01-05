const pianoNotes = [
  // -------- OCTAVE 1 --------
  { note: "C", octave: 1, src: "./audio/C1.mp3" },
  { note: "C#", octave: 1, src: "./audio/CS1.mp3" },
  { note: "D", octave: 1, src: "./audio/D1.mp3" },
  { note: "D#", octave: 1, src: "./audio/DS1.mp3" },
  { note: "E", octave: 1, src: "./audio/E1.mp3" },
  { note: "F", octave: 1, src: "./audio/F1.mp3" },
  { note: "F#", octave: 1, src: "./audio/FS1.mp3" },
  { note: "G", octave: 1, src: "./audio/G1.mp3" },
  { note: "G#", octave: 1, src: "./audio/GS1.mp3" },
  { note: "A", octave: 1, src: "./audio/A1.mp3" },
  { note: "A#", octave: 1, src: "./audio/AS1.mp3" },
  { note: "B", octave: 1, src: "./audio/B1.mp3" },

  // -------- OCTAVE 2 --------
  { note: "C", octave: 2, src: "./audio/C2.mp3" },
  { note: "C#", octave: 2, src: "./audio/CS2.mp3" },
  { note: "D", octave: 2, src: "./audio/D2.mp3" },
  { note: "D#", octave: 2, src: "./audio/DS2.mp3" },
  { note: "E", octave: 2, src: "./audio/E2.mp3" },
  { note: "F", octave: 2, src: "./audio/F2.mp3" },
  { note: "F#", octave: 2, src: "./audio/FS2.mp3" },
  { note: "G", octave: 2, src: "./audio/G2.mp3" },
  { note: "G#", octave: 2, src: "./audio/GS2.mp3" },
  { note: "A", octave: 2, src: "./audio/A2.mp3" },
  { note: "A#", octave: 2, src: "./audio/AS2.mp3" },
  { note: "B", octave: 2, src: "./audio/B2.mp3" },

  // -------- OCTAVE 3 --------
  { note: "C", octave: 3, src: "./audio/C3.mp3" },
  { note: "C#", octave: 3, src: "./audio/CS3.mp3" },
  { note: "D", octave: 3, src: "./audio/D3.mp3" },
  { note: "D#", octave: 3, src: "./audio/DS3.mp3" },
  { note: "E", octave: 3, src: "./audio/E3.mp3" },
  { note: "F", octave: 3, src: "./audio/F3.mp3" },
  { note: "F#", octave: 3, src: "./audio/FS3.mp3" },
  { note: "G", octave: 3, src: "./audio/G3.mp3" },
  { note: "G#", octave: 3, src: "./audio/GS3.mp3" },
  { note: "A", octave: 3, src: "./audio/A3.mp3" },
  { note: "A#", octave: 3, src: "./audio/AS3.mp3" },
  { note: "B", octave: 3, src: "./audio/B3.mp3" },
];

const keyboardMap = {
  // OCTAVE 1
  q: { note: "C", octave: 1 },
  2: { note: "C#", octave: 1 },
  w: { note: "D", octave: 1 },
  3: { note: "D#", octave: 1 },
  e: { note: "E", octave: 1 },
  r: { note: "F", octave: 1 },
  5: { note: "F#", octave: 1 },
  t: { note: "G", octave: 1 },
  6: { note: "G#", octave: 1 },
  y: { note: "A", octave: 1 },
  7: { note: "A#", octave: 1 },
  u: { note: "B", octave: 1 },

  // OCTAVE 2
  i: { note: "C", octave: 2 },
  9: { note: "C#", octave: 2 },
  o: { note: "D", octave: 2 },
  0: { note: "D#", octave: 2 },
  p: { note: "E", octave: 2 },
  "[": { note: "F", octave: 2 },
  "=": { note: "F#", octave: 2 },
  "]": { note: "G", octave: 2 },
  "backspace": { note: "G#", octave: 2 },
  "\\": { note: "A", octave: 2 },
  ";": { note: "A#", octave: 2 },
  ".": { note: "B", octave: 2 },

  // OCTAVE 3
  z: { note: "C", octave: 3 },
  s: { note: "C#", octave: 3 },
  x: { note: "D", octave: 3 },
  d: { note: "D#", octave: 3 },
  c: { note: "E", octave: 3 },
  v: { note: "F", octave: 3 },
  g: { note: "F#", octave: 3 },
  b: { note: "G", octave: 3 },
  h: { note: "G#", octave: 3 },
  n: { note: "A", octave: 3 },
  j: { note: "A#", octave: 3 },
  m: { note: "B", octave: 3 },
};

const notesLayer = document.querySelector(".music-notes-layer");
const speakers = document.querySelectorAll(".speakers");
const musicSymbols = ["♪", "♫", "♬", "♩"];
const keys = document.querySelectorAll(".key");

pianoNotes.forEach(function (note) {
  note.audio = new Audio(note.src);
  note.audio.preload = "auto";
});

function getPianoNote(note, octave) {
  return pianoNotes.find(function (item) {
    return item.note === note && item.octave === Number(octave);
  });
}

function playKey(keyEl) {
  const note = keyEl.dataset.note;
  const octave = keyEl.dataset.octave;

  const pianoNote = getPianoNote(note, octave);
  if (!pianoNote) return;

  pianoNote.audio.currentTime = 0;
  pianoNote.audio.play();
  spawnMusicNoteFromSpeaker();

  keyEl.classList.add("active");
}

keys.forEach((key) => {
  key.addEventListener("mousedown", () => playKey(key));
  key.addEventListener("mouseup", () => key.classList.remove("active"));
  key.addEventListener("mouseleave", () => key.classList.remove("active"));
});

function getKeyElement(note, octave) {
  return document.querySelector(
    `.key[data-note="${note}"][data-octave="${octave}"]`
  );
}

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  const map = keyboardMap[e.key.toLowerCase()];
  if (!map) return;

  const pianoNote = getPianoNote(map.note, map.octave);
  if (!pianoNote) return;

  pianoNote.audio.currentTime = 0;
  pianoNote.audio.play();
  spawnMusicNoteFromSpeaker();

  const keyEl = getKeyElement(map.note, map.octave);
  if (keyEl) keyEl.classList.add("active");
});

document.addEventListener("keyup", (e) => {
  const map = keyboardMap[e.key.toLowerCase()];
  if (!map) return;

  const keyEl = getKeyElement(map.note, map.octave);
  if (keyEl) keyEl.classList.remove("active");
});

function spawnMusicNoteFromSpeaker() {
  const speaker = speakers[Math.floor(Math.random() * speakers.length)];
  if (!speaker) return;

  const speakerRect = speaker.getBoundingClientRect();
  const pianoRect = notesLayer.getBoundingClientRect();

  const noteEl = document.createElement("div");
  noteEl.className = "music-note";

  noteEl.textContent =
    musicSymbols[Math.floor(Math.random() * musicSymbols.length)];

  const startX =
    speakerRect.left + speakerRect.width / 2 - pianoRect.left;
  const startY =
    speakerRect.top + speakerRect.height / 2 - pianoRect.top;

  noteEl.style.left = `${startX}px`;
  noteEl.style.top = `${startY}px`;

  const x = (Math.random() - 0.5) * 160;
  const y = -120 - Math.random() * 120;
  const rot = (Math.random() - 0.5) * 80;
  const scale = 0.8 + Math.random() * 0.9;

  noteEl.style.setProperty("--x", `${x}px`);
  noteEl.style.setProperty("--y", `${y}px`);
  noteEl.style.setProperty("--rot", `${rot}deg`);
  noteEl.style.setProperty("--scale", scale);

  notesLayer.appendChild(noteEl);

  noteEl.addEventListener("animationend", () => {
    noteEl.remove();
  });
}
