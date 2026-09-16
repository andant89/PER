/* Vérifie que chaque fiche se génère sans erreur et tient sur une page A4.
   Usage : npx http-server site -p 8099 &  puis  node outils/verifier-fiches.mjs
   Voir docs/TESTS.md. */

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const BASE = 'http://127.0.0.1:8099/';
const SP = process.env.SORTIE || 'sortie';
mkdirSync(SP, { recursive: true });
import { FICHES } from '../site/assets/js/data/fiches.js';
const IDS = FICHES.map((f) => f.id);
const nav = await chromium.launch();
const page = await (await nav.newContext({ viewport: { width: 1200, height: 1400 } })).newPage();
const erreurs = [];
page.on('pageerror', e => erreurs.push('[pageerror] ' + e.message));
page.on('console', m => { if (m.type() === 'error') erreurs.push('[console] ' + m.text()); });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.setItem('mon-per:v1', JSON.stringify({ profil: { prenom: 'Léo', sonActif: false, niveau: 2 }, progression: {}, cahier: [] })));
await page.reload({ waitUntil: 'networkidle' });

for (const id of IDS) {
  const avant = erreurs.length;
  await page.goto(BASE + '#/fiche/' + id, { waitUntil: 'networkidle' });
  const ok = await page.waitForSelector('.fiche', { timeout: 6000 }).then(() => true).catch(() => false);
  await page.waitForTimeout(250);
  const boite = ok ? await page.locator('.fiche').boundingBox() : null;
  if (ok) await page.locator('.fiche').screenshot({ path: `${SP}/fiche-${id}.png` });
  const debord = boite ? Math.round(boite.height) : 0;
  const trop = debord > 1026 ? ' ⚠️ DÉBORDE LA PAGE' : '';
  console.log(`${ok ? '✅' : '❌'} ${id.padEnd(20)} hauteur=${debord}px erreurs=${erreurs.length - avant}${trop}`);
  erreurs.slice(avant).forEach(e => console.log('     ' + e.slice(0, 150)));
}

// PDF du cahier complet, pour vérifier la pagination réelle
await page.evaluate((ids) => {
  const brut = JSON.parse(localStorage.getItem('mon-per:v1'));
  brut.cahier = ids;
  localStorage.setItem('mon-per:v1', JSON.stringify(brut));
}, IDS);
await page.goto(BASE + '#/cahier', { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('.fiche', { timeout: 8000 });
await page.waitForTimeout(800);
const nbFiches = await page.locator('.fiche').count();
await page.pdf({ path: `${SP}/cahier.pdf`, format: 'A4', printBackground: true, margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } });
console.log(`\ncahier : ${nbFiches} fiches → cahier.pdf`);
await nav.close();
console.log('erreurs totales :', erreurs.length);
