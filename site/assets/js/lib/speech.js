/* Synthèse vocale (lecture des consignes) + petits sons de retour.
   Tout est généré par le navigateur : aucun fichier audio à héberger. */

import { profil } from "./store.js";

let voixFr = null;

function choisirVoix() {
  if (!("speechSynthesis" in window)) return null;
  const voix = window.speechSynthesis.getVoices();
  if (!voix.length) return null;
  voixFr =
    voix.find((v) => v.lang === "fr-CH") ||
    voix.find((v) => v.lang === "fr-FR") ||
    voix.find((v) => v.lang && v.lang.startsWith("fr")) ||
    null;
  return voixFr;
}

if ("speechSynthesis" in window) {
  choisirVoix();
  window.speechSynthesis.addEventListener("voiceschanged", choisirVoix);
}

export function syntheseDisponible() {
  return "speechSynthesis" in window;
}

export function dire(texte, { force = false } = {}) {
  if (!texte) return;
  if (!force && !profil().sonActif) return;
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance(texte);
    message.lang = "fr-FR";
    if (voixFr || choisirVoix()) message.voice = voixFr;
    message.rate = 0.92; // un peu lent : l'enfant doit avoir le temps de comprendre
    message.pitch = 1.1;
    window.speechSynthesis.speak(message);
  } catch (err) {
    console.warn("Synthèse vocale indisponible.", err);
  }
}

export function stopper() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

/* --- Petits sons synthétiques ------------------------------------------- */

let contexte = null;

function ctxAudio() {
  if (!contexte) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    contexte = new AC();
  }
  if (contexte.state === "suspended") contexte.resume();
  return contexte;
}

function jouerNotes(notes) {
  if (!profil().sonActif) return;
  const ctx = ctxAudio();
  if (!ctx) return;
  let debut = ctx.currentTime;
  for (const [frequence, duree] of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = frequence;
    gain.gain.setValueAtTime(0.0001, debut);
    gain.gain.exponentialRampToValueAtTime(0.25, debut + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, debut + duree);
    osc.connect(gain).connect(ctx.destination);
    osc.start(debut);
    osc.stop(debut + duree + 0.02);
    debut += duree;
  }
}

export const sons = {
  reussite: () => jouerNotes([[660, 0.12], [880, 0.18]]),
  erreur: () => jouerNotes([[300, 0.16]]),
  fanfare: () => jouerNotes([[523, 0.12], [659, 0.12], [784, 0.12], [1046, 0.28]])
};
