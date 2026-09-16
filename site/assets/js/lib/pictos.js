/* Dessins au trait pour les fiches imprimables.
   Contraintes : noir et blanc, traits épais, formes simples, coloriables par
   l'enfant. Chaque picto est décrit dans un repère 0–100 et n'utilise que des
   contours (`stroke`), jamais d'aplat — sauf les petits points (yeux, pois). */

const D = {
  /* --- formes géométriques ------------------------------------------- */
  rond: `<circle cx="50" cy="50" r="33"/>`,
  carre: `<rect x="17" y="17" width="66" height="66" rx="4"/>`,
  triangle: `<path d="M50 15 85 82H15Z"/>`,
  etoile: `<path d="M50 14 58 40 84 41 64 57 71 82 50 67 29 82 36 57 16 41 42 40Z"/>`,
  coeur: `<path d="M50 85C29 69 16 55 16 40c0-12 9-19 19-19 6 0 12 3 15 9 3-6 9-9 15-9 10 0 19 7 19 19 0 15-13 29-34 45z"/>`,

  /* --- objets et animaux ---------------------------------------------- */
  pomme: `<path d="M50 34c-7-9-20-9-27-1-9 10-6 28 2 40 6 9 16 17 25 17s19-8 25-17c8-12 11-30 2-40-7-8-20-8-27-1z"/><path d="M50 34V19"/><path d="M50 26c4-9 14-12 19-10 1 7-6 14-15 14z"/>`,
  poisson: `<path d="M14 50c11-18 33-26 53-20 9 3 15 9 17 20-2 11-8 17-17 20-20 6-42-2-53-20z"/><path d="M84 50 96 34v32z"/><circle cx="32" cy="44" r="3.5" fill="currentColor" stroke="none"/><path d="M62 32c6 10 6 26 0 36"/>`,
  fleur: `<ellipse cx="50" cy="26" rx="10" ry="17"/><ellipse cx="73" cy="40" rx="10" ry="17" transform="rotate(60 73 40)"/><ellipse cx="73" cy="66" rx="10" ry="17" transform="rotate(120 73 66)"/><ellipse cx="50" cy="80" rx="10" ry="17"/><ellipse cx="27" cy="66" rx="10" ry="17" transform="rotate(60 27 66)"/><ellipse cx="27" cy="40" rx="10" ry="17" transform="rotate(120 27 40)"/><circle cx="50" cy="53" r="11"/>`,
  ballon: `<ellipse cx="50" cy="40" rx="25" ry="29"/><path d="M50 69l-6 9h12z"/><path d="M50 78c7 5 7 11 0 15s-7 10 0 13"/>`,
  bateau: `<path d="M12 62h76L76 84H24z"/><path d="M50 62V14"/><path d="M50 20l28 36H50z"/>`,
  maison: `<path d="M16 50 50 20 84 50"/><path d="M26 48v36h48V48"/><path d="M42 84V62h16v22"/>`,
  arbre: `<path d="M45 88V58h10v30"/><path d="M50 12c-14 0-25 9-27 20-8 3-13 10-13 18 0 11 9 19 21 19h38c12 0 21-8 21-19 0-8-5-15-13-18-2-11-13-20-27-20z"/>`,
  sapin: `<path d="M50 12 32 40h36z"/><path d="M50 30 26 58h48z"/><path d="M50 46 18 78h64z"/><path d="M43 78v10h14V78"/>`,
  soleil: `<circle cx="50" cy="50" r="21"/><path d="M50 8v14M50 78v14M8 50h14M78 50h14M20 20l10 10M70 70l10 10M80 20 70 30M30 70 20 80"/>`,
  lune: `<path d="M64 14a37 37 0 1 0 0 72 31 31 0 0 1 0-72z"/>`,
  nuage: `<path d="M30 74a17 17 0 0 1 2-34 21 21 0 0 1 39-7 16 16 0 0 1 8 41z"/>`,
  montagne: `<path d="M6 80 36 26l17 28 11-17 30 43z"/><path d="M36 26l9 16H27z"/>`,

  chat: `<circle cx="50" cy="56" r="27"/><path d="M30 39 27 17l19 11M70 39l3-22-19 11"/><circle cx="40" cy="52" r="3.5" fill="currentColor" stroke="none"/><circle cx="60" cy="52" r="3.5" fill="currentColor" stroke="none"/><path d="M50 62l-5 4h10z"/><path d="M45 68h10M20 60h14M20 70l14-4M80 60H66M80 70l-14-4"/>`,
  lapin: `<circle cx="50" cy="62" r="23"/><ellipse cx="38" cy="28" rx="8" ry="21" transform="rotate(-12 38 28)"/><ellipse cx="62" cy="28" rx="8" ry="21" transform="rotate(12 62 28)"/><circle cx="42" cy="58" r="3.5" fill="currentColor" stroke="none"/><circle cx="58" cy="58" r="3.5" fill="currentColor" stroke="none"/><path d="M50 66l-4 4h8z"/>`,
  souris: `<ellipse cx="54" cy="62" rx="26" ry="19"/><circle cx="46" cy="40" r="13"/><circle cx="46" cy="40" r="6"/><path d="M28 62c-10 1-16 4-16 6s6 5 16 6"/><circle cx="13" cy="68" r="3" fill="currentColor" stroke="none"/><path d="M80 66c14 2 17 12 8 18"/>`,
  papillon: `<ellipse cx="50" cy="52" rx="5" ry="23"/><ellipse cx="30" cy="38" rx="17" ry="14" transform="rotate(-18 30 38)"/><ellipse cx="30" cy="68" rx="14" ry="12" transform="rotate(18 30 68)"/><ellipse cx="70" cy="38" rx="17" ry="14" transform="rotate(18 70 38)"/><ellipse cx="70" cy="68" rx="14" ry="12" transform="rotate(-18 70 68)"/><path d="M48 31 40 16M52 31 60 16"/>`,
  escargot: `<circle cx="58" cy="42" r="23"/><circle cx="58" cy="42" r="14"/><circle cx="58" cy="42" r="6"/><path d="M30 60H18c-8 0-14 6-14 12h64c6 0 10-4 10-8"/><path d="M12 60 6 48M22 58l-2-12"/>`,
  coccinelle: `<ellipse cx="50" cy="58" rx="27" ry="25"/><path d="M50 33v50"/><circle cx="50" cy="28" r="11"/><circle cx="36" cy="50" r="4" fill="currentColor" stroke="none"/><circle cx="64" cy="50" r="4" fill="currentColor" stroke="none"/><circle cx="37" cy="68" r="4" fill="currentColor" stroke="none"/><circle cx="63" cy="68" r="4" fill="currentColor" stroke="none"/><path d="M44 19 38 8M56 19 62 8"/>`,
  tortue: `<path d="M12 62a33 26 0 0 1 66 0z"/><path d="M12 62h66"/><circle cx="86" cy="54" r="8"/><path d="M45 36v26M28 44 22 62M62 44l6 18"/><path d="M26 62v10M64 62v10"/><path d="M12 60 4 64"/>`,
  oiseau: `<ellipse cx="44" cy="60" rx="24" ry="18"/><circle cx="68" cy="40" r="13"/><path d="M81 40 93 44 81 48"/><circle cx="71" cy="36" r="3" fill="currentColor" stroke="none"/><path d="M34 52c11-6 21-1 23 9-9 6-19 3-23-9z"/><path d="M38 78v10M54 78v10"/>`,

  voiture: `<path d="M10 64V52l14-3 10-15h32l10 15 14 3v12z"/><circle cx="30" cy="66" r="9"/><circle cx="70" cy="66" r="9"/><path d="M40 34v15M60 34v15"/>`,
  velo: `<circle cx="24" cy="62" r="18"/><circle cx="76" cy="62" r="18"/><path d="M24 62 42 32h20l-12 30M42 32h20M62 32l14 30"/><path d="M38 28h12"/>`,
  moto: `<circle cx="22" cy="66" r="15"/><circle cx="78" cy="66" r="15"/><path d="M22 66h20l10-18h20l6 18"/><path d="M42 48h22"/><path d="M52 48 44 32h14"/>`,
  train: `<path d="M14 72V38h24v34z"/><path d="M38 72V50h42v22z"/><path d="M19 44h14"/><path d="M62 50V36h10v14"/><circle cx="26" cy="78" r="7"/><circle cx="50" cy="78" r="7"/><circle cx="70" cy="78" r="7"/><path d="M6 88h88"/>`,
  avion: `<path d="M50 12c6 0 10 11 10 25v9l30 17v11l-30-9v16l11 9v6l-21-6-21 6v-6l11-9V65l-30 9V63l30-17v-9c0-14 4-25 10-25z"/>`,
  parapluie: `<path d="M10 56a40 40 0 0 1 80 0z"/><path d="M10 56c9-11 16-11 24 0 8-11 16-11 24 0 8-11 15-11 24 0"/><path d="M50 56v24a9 9 0 0 1-18 0"/><path d="M50 16v-6"/>`,
  robot: `<rect x="31" y="20" width="38" height="28" rx="5"/><rect x="24" y="52" width="52" height="32" rx="5"/><circle cx="42" cy="34" r="4" fill="currentColor" stroke="none"/><circle cx="58" cy="34" r="4" fill="currentColor" stroke="none"/><path d="M42 42h16M50 20v-8M24 62H10M76 62h14M36 84v8M64 84v8"/>`,
  cle: `<circle cx="27" cy="50" r="17"/><circle cx="27" cy="50" r="6"/><path d="M44 50h44M74 50v14M62 50v11"/>`,
  de: `<rect x="20" y="20" width="60" height="60" rx="8"/><circle cx="36" cy="36" r="5" fill="currentColor" stroke="none"/><circle cx="50" cy="50" r="5" fill="currentColor" stroke="none"/><circle cx="64" cy="64" r="5" fill="currentColor" stroke="none"/>`,
  tasse: `<path d="M20 32h46v32a23 23 0 0 1-46 0z"/><path d="M66 40h6a13 13 0 0 1 0 26h-6"/><path d="M12 84h62"/>`,
  livre: `<path d="M50 32C40 23 24 22 14 26v44c10-4 26-3 36 6 10-9 26-10 36-6V26c-10-4-26-3-36 6z"/><path d="M50 32v44"/>`,
  echelle: `<path d="M30 12v76M70 12v76M30 30h40M30 48h40M30 66h40"/>`,
  rateau: `<path d="M50 10v42"/><path d="M20 52h60"/><path d="M25 52v18M38 52v18M50 52v18M62 52v18M75 52v18"/>`,
  fourchette: `<path d="M32 12v24M50 12v24M68 12v24"/><path d="M32 36h36v10a18 18 0 0 1-18 18v22"/>`,
  glace: `<path d="M32 46 50 92 68 46z"/><path d="M34 58h32M31 48h38"/><path d="M28 46a22 22 0 0 1 44 0z"/><circle cx="50" cy="18" r="8"/><path d="M50 26v-4"/>`,
  chapeau: `<path d="M24 64a26 26 0 0 1 52 0z"/><path d="M10 64h80"/><path d="M26 56h48"/>`,
  gateau: `<path d="M18 82V52h64v30z"/><path d="M18 52c8-6 13 2 21-2s13 4 21 0 14 2 22 2"/><path d="M34 52V38M50 52V34M66 52V38"/><path d="M34 38c-4-4 0-8 0-8s4 4 0 8M50 34c-4-4 0-8 0-8s4 4 0 8M66 38c-4-4 0-8 0-8s4 4 0 8"/>`,
  pain: `<ellipse cx="50" cy="52" rx="37" ry="20" transform="rotate(-12 50 52)"/><path d="M28 46l7 11M43 41l7 11M58 37l7 11"/>`,

  banane: `<path d="M18 38c2 26 22 44 47 42 9-1 13-7 10-12-19 2-36-13-36-33 0-5-8-6-13-4-5 2-8 4-8 7z"/>`,
  citron: `<ellipse cx="50" cy="52" rx="33" ry="22"/><path d="M17 52 8 49M83 52l9-3"/><path d="M50 30v44"/>`,
  carotte: `<path d="M50 88 33 42h34z"/><path d="M50 42V24"/><path d="M50 32c-9-11-18-11-20-6 5 7 14 9 20 6zM50 32c9-11 18-11 20-6-5 7-14 9-20 6z"/><path d="M40 60h20M44 72h12"/>`,
  cerise: `<circle cx="34" cy="70" r="15"/><circle cx="68" cy="70" r="15"/><path d="M34 55C36 36 44 24 58 18"/><path d="M68 55c-3-14-6-25-10-37"/><path d="M58 18c10-6 18-2 20 2-7 5-15 4-20-2z"/>`,
  ananas: `<ellipse cx="50" cy="62" rx="23" ry="28"/><path d="M34 46 66 78M66 46 34 78M50 34v56M27 62h46"/><path d="M50 34V16"/><path d="M50 24c-9-10-18-9-20-4 6 6 15 7 20 4zM50 24c9-10 18-9 20-4-6 6-15 7-20 4z"/>`,
  champignon: `<path d="M14 56a36 30 0 0 1 72 0z"/><path d="M38 56v22a12 9 0 0 0 24 0V56"/><circle cx="36" cy="42" r="5" fill="currentColor" stroke="none"/><circle cx="60" cy="38" r="6" fill="currentColor" stroke="none"/><circle cx="68" cy="50" r="4" fill="currentColor" stroke="none"/>`,
  fraise: `<path d="M50 90C30 78 22 60 24 46c14-8 38-8 52 0 2 14-6 32-26 44z"/><path d="M24 46 37 36l13 8 13-8 13 10"/><path d="M50 44V28"/><circle cx="40" cy="60" r="2.5" fill="currentColor" stroke="none"/><circle cx="60" cy="60" r="2.5" fill="currentColor" stroke="none"/><circle cx="50" cy="72" r="2.5" fill="currentColor" stroke="none"/>`
};

export const IDS_PICTOS = Object.keys(D);

/** Construit un <svg> autonome pour un picto. */
export function picto(id, { taille = 60, trait = 4.5, titre = "" } = {}) {
  const contenu = D[id];
  if (!contenu) {
    console.warn("Picto inconnu :", id);
    return svgVide(taille);
  }
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", taille);
  svg.setAttribute("height", taille);
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", trait);
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("role", titre ? "img" : "presentation");
  if (titre) svg.setAttribute("aria-label", titre);
  svg.innerHTML = contenu;
  return svg;
}

function svgVide(taille) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", taille);
  svg.setAttribute("height", taille);
  return svg;
}

export function existe(id) {
  return Boolean(D[id]);
}
