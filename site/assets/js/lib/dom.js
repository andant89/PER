/* Mini-helpers DOM — évite une dépendance à un framework. */

export function h(tag, props = {}, ...enfants) {
  const el = document.createElement(tag);
  for (const [cle, valeur] of Object.entries(props || {})) {
    if (valeur === null || valeur === undefined || valeur === false) continue;
    if (cle === "class") el.className = valeur;
    else if (cle === "style" && typeof valeur === "object") Object.assign(el.style, valeur);
    else if (cle === "html") el.innerHTML = valeur;
    else if (cle.startsWith("on") && typeof valeur === "function") {
      el.addEventListener(cle.slice(2).toLowerCase(), valeur);
    } else if (cle === "dataset") {
      Object.assign(el.dataset, valeur);
    } else el.setAttribute(cle, valeur === true ? "" : String(valeur));
  }
  ajouter(el, enfants);
  return el;
}

function ajouter(parent, enfants) {
  for (const enfant of enfants.flat(Infinity)) {
    if (enfant === null || enfant === undefined || enfant === false) continue;
    parent.appendChild(enfant instanceof Node ? enfant : document.createTextNode(String(enfant)));
  }
}

export function vider(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function remplacer(el, ...enfants) {
  vider(el);
  ajouter(el, enfants);
  return el;
}
