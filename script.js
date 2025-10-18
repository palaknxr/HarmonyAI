// --- Basic AI-style random melody generator ---
const generateBtn = document.getElementById("generateBtn");
const melodyOutput = document.getElementById("melodyOutput");

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const durations = [0.3, 0.4, 0.5, 0.6];
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Helper: convert note name to frequency (Hz)
function noteToFreq(note) {
  const A4 = 440;
  const notesMap = {C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2};
  const octave = parseInt(note[note.length - 1]);
  const semitone = notesMap[note[0]] + (octave - 4) * 12;
  return A4 * Math.pow(2, semitone / 12);
}

// Play a sequence of notes
function playMelody(melody) {
  let startTime = audioCtx.currentTime;
  melody.forEach((note, i) => {
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = noteToFreq(note.note);
    gain.gain.setValueAtTime(0.1, startTime + i * note.duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime + i * note.duration);
    osc.stop(startTime + (i + 1) * note.duration);
  });
}

// Generate melody
generateBtn.addEventListener("click", () => {
  let melody = [];
  let melodyNotes = [];

  for (let i = 0; i < 8; i++) {
    let note = notes[Math.floor(Math.random() * notes.length)];
    let duration = durations[Math.floor(Math.random() * durations.length)];
    melody.push({ note, duration });
    melodyNotes.push(note);
  }

  melodyOutput.textContent = "🎶 Melody: " + melodyNotes.join(" - ");
  playMelody(melody);
});
