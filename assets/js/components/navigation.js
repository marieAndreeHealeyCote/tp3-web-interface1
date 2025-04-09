import modeNuit from "./modeNuit.js";

//Variables
let navigationLiens = [
  {
    nom: "index",
    texte: "Accueil",
  },
  {
    nom: "formulaire",
    texte: "Formulaire",
  },
  {
    nom: "contact",
    texte: "Contact",
  },
  {
    nom: "a-propos",
    texte: "À propos",
  },
];

//Sélection HTML
const conteneurNavLiensHTML = document.querySelector(
  "#nav-principale ul.nav-liste"
);

//Fonctions

/**
 * Fonction pour initialiser la navigation
 * @returns {void}
 */
export default function init() {
  modeNuit();
  creerNavigation();
}

//Générer les onglets de la navigation dynamiquement à partir du tableau
function creerNavigation() {
  //Pour chaque lien, créer un élément li avec un lien a
  for (let i = 0; i < navigationLiens.length; i++) {
    const lien = navigationLiens[i]["nom"];
    const texte = navigationLiens[i]["texte"];
    const lienFormatte = formatterLien(lien);

    let actif = verifierPageActive(lien);

    //Créer le  template HTML et insérer dans le conteneur
    const template = `<li><a href="${lienFormatte}" class="${actif}">${texte}</a></li>`;
    conteneurNavLiensHTML.insertAdjacentHTML("beforeend", template);
  }
}
//Vérifier si page est active
function verifierPageActive(lien) {
  let actif = "";
  if (conteneurNavLiensHTML.classList.contains("index") && lien == "index") {
    actif = "actif";
  }
  if (
    conteneurNavLiensHTML.classList.contains("formulaire") &&
    lien == "formulaire"
  ) {
    actif = "actif";
  }
  if (
    conteneurNavLiensHTML.classList.contains("a-propos") &&
    lien == "a-propos"
  ) {
    actif = "actif";
  }
  if (
    conteneurNavLiensHTML.classList.contains("contact") &&
    lien == "contact"
  ) {
    actif = "actif";
  }

  return actif;
}

//Formater un lien pour être utilisé dans un URL
function formatterLien(lien) {
  lien = lien.trim(); //Enlever les espaces du début et de la fin
  lien = lien.toLowerCase(); //Mettre tout en minuscule
  lien = lien.replaceAll("é", "e"); //Remplacer les caractères accentués
  lien = lien.replaceAll(" ", "-"); //Remplacer les espaces par des tirets

  const url = `${lien}.html`; //Ajouter l'extension .html

  return url;
}
