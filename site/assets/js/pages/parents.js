import { h, remplacer } from "../lib/dom.js";
import { EXERCICES } from "../data/exercices.js";
import { FICHES } from "../data/fiches.js";
import { domaineParId, META } from "../data/per.js";
import { profil, majProfil, progression, progressionExercice, reinitialiser, totalEtoiles } from "../lib/store.js";
import { syntheseDisponible } from "../lib/speech.js";

export function rendre() {
  const page = h("div", { class: "page" });
  dessiner(page);
  return page;
}

function dessiner(page) {
  const p = profil();
  const suivi = progression();
  const joues = Object.keys(suivi).length;

  remplacer(
    page,
    h("h1", {}, "Espace parents"),
    h("p", { class: "chapeau" }, "Réglages de l'application, suivi des jeux sur écran et procédure de vérification des contenus PER."),

    h(
      "div",
      { class: "note", style: { marginBottom: "2rem" } },
      h("span", { class: "note-icone" }, "🖨️"),
      h(
        "div",
        {},
        h("strong", {}, `${FICHES.length} fiches à imprimer`),
        h(
          "p",
          { style: { margin: ".25rem 0 .75rem" } },
          "Les fiches papier ne laissent pas de trace dans l'application : la progression ci-dessous ne " +
            "concerne que les jeux sur écran. Sur papier, c'est le cahier de votre enfant qui fait foi."
        ),
        h("a", { class: "bouton", href: "#/fiches" }, "Ouvrir les fiches")
      )
    ),

    /* --- Réglages ------------------------------------------------------ */
    h(
      "section",
      {},
      h("h2", {}, "Réglages"),
      h(
        "div",
        { class: "carte" },
        champTexte("Prénom de l'enfant", p.prenom, (valeur) => {
          majProfil({ prenom: valeur });
        }, "Utilisé pour les encouragements et le jeu « Mon prénom ». Reste sur cet appareil."),
        h(
          "label",
          { class: "interrupteur", style: { marginTop: "1rem" } },
          h("input", {
            type: "checkbox",
            checked: p.sonActif,
            onchange: (e) => {
              majProfil({ sonActif: e.target.checked });
              dessiner(page);
            }
          }),
          h("span", {}, "Consignes lues à voix haute et sons de retour")
        ),
        syntheseDisponible()
          ? null
          : h("p", { style: { color: "var(--rouge)", marginTop: ".75rem", fontSize: ".9rem" } },
              "⚠️ Ce navigateur ne propose pas de synthèse vocale : les consignes resteront écrites."),
        h(
          "p",
          { style: { marginTop: "1rem", marginBottom: 0, fontSize: ".9rem", color: "var(--encre-douce)" } },
          "Aucune donnée ne quitte l'appareil : ni compte, ni serveur, ni statistique. Tout est stocké dans le navigateur."
        )
      )
    ),

    /* --- Progression --------------------------------------------------- */
    h(
      "section",
      {},
      h("h2", {}, "Progression (jeux sur écran)"),
      h(
        "div",
        { class: "carte grille grille-3", style: { marginBottom: "1.25rem" } },
        h("div", { class: "stat" }, h("div", { class: "valeur" }, String(totalEtoiles())), h("div", { class: "libelle" }, `étoiles sur ${EXERCICES.length * 3}`)),
        h("div", { class: "stat" }, h("div", { class: "valeur" }, `${joues}/${EXERCICES.length}`), h("div", { class: "libelle" }, "jeux essayés")),
        h("div", { class: "stat" },
          h("div", { class: "valeur" }, String(Object.values(suivi).reduce((s, x) => s + (x.parties || 0), 0))),
          h("div", { class: "libelle" }, "parties jouées"))
      ),
      h(
        "div",
        { class: "carte tableau-wrap" },
        h(
          "table",
          { class: "tableau-cycles" },
          h("thead", {}, h("tr", {},
            h("th", {}, "Jeu"),
            h("th", {}, "Compétence travaillée"),
            h("th", {}, "Objectifs PER"),
            h("th", {}, "Étoiles"),
            h("th", {}, "Parties")
          )),
          h(
            "tbody",
            {},
            ...EXERCICES.map((ex) => {
              const s = progressionExercice(ex.id);
              const domaine = domaineParId(ex.domaine);
              return h(
                "tr",
                {},
                h("td", {}, h("a", { href: `#/jeu/${ex.id}`, style: { fontWeight: "700", textDecoration: "none" } }, `${ex.emoji} ${ex.titre}`),
                  h("div", { style: { fontSize: ".8rem", color: domaine ? domaine.couleur : "inherit" } }, domaine ? domaine.nom : "Capacités transversales")),
                h("td", { style: { fontSize: ".9rem" } }, ex.competence,
                  h("div", { style: { color: "var(--encre-douce)", fontSize: ".85rem", marginTop: ".25rem" } }, "💡 ", ex.conseil)),
                h("td", {}, ex.objectifs.length ? ex.objectifs.map((c) => h("div", {}, h("code", {}, c))) : "—"),
                h("td", { style: { whiteSpace: "nowrap" } }, "⭐".repeat(s.etoiles) + "☆".repeat(3 - s.etoiles)),
                h("td", {}, String(s.parties || 0))
              );
            })
          )
        )
      ),
      h(
        "p",
        { style: { marginTop: "1rem" } },
        h(
          "button",
          {
            class: "bouton bouton-danger",
            type: "button",
            onclick: () => {
              if (confirm("Effacer toute la progression et les réglages ?")) {
                reinitialiser();
                dessiner(page);
              }
            }
          },
          "Effacer la progression"
        )
      )
    ),

    /* --- Vérification des contenus ------------------------------------- */
    h(
      "section",
      {},
      h("h2", {}, "Vérifier les contenus PER"),
      h(
        "div",
        { class: "note" },
        h("span", { class: "note-icone" }, "📚"),
        h(
          "div",
          {},
          h("strong", {}, "À faire avant de considérer les textes comme fiables"),
          h("p", { style: { margin: ".35rem 0" } }, META.avertissement),
          h(
            "ol",
            { style: { margin: ".5rem 0 0", paddingLeft: "1.2rem" } },
            h("li", {}, "Ouvrir ", h("a", { href: "https://www.plandetudes.ch", target: "_blank", rel: "noopener" }, "plandetudes.ch"), " et sélectionner le cycle et le domaine."),
            h("li", {}, "Comparer chaque code et chaque intitulé avec le fichier ", h("code", {}, "site/assets/js/data/per.js"), "."),
            h("li", {}, "Corriger si besoin, puis passer ", h("code", {}, "verifie: true"), " sur l'objectif : un ✓ apparaît dans l'application."),
            h("li", {}, "Renseigner ", h("code", {}, "META.derniereRelecture"), " avec la date de relecture.")
          ),
          META.derniereRelecture
            ? h("p", { style: { marginTop: ".75rem", marginBottom: 0 } }, "Dernière relecture : ", h("strong", {}, META.derniereRelecture))
            : h("p", { style: { marginTop: ".75rem", marginBottom: 0 } }, "Aucune relecture enregistrée pour l'instant.")
        )
      )
    )
  );
}

function champTexte(libelle, valeur, onChange, aide) {
  const input = h("input", { type: "text", value: valeur || "", maxlength: "20", placeholder: "Prénom" });
  input.addEventListener("change", () => onChange(input.value.trim()));
  input.addEventListener("blur", () => onChange(input.value.trim()));
  return h("label", { class: "champ" }, h("span", {}, libelle), input,
    aide ? h("small", { style: { color: "var(--encre-douce)" } }, aide) : null);
}
