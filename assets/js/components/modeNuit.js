// Code a été pris dans le cours 17 - 18

// Variables
//AUCUNE

// Sélection HTML
const parentHTML = document.querySelector("[data-mode]");
const boutonsHTML = document.querySelectorAll("[data-mode-option]");

// Fonctions
/**
 * Fonction de permet de garder en stockage le theme choisi
 */
export default function init() {
    if (parentHTML != null) {
        const modeEnregistre = localStorage.getItem("theme") || "nuit";

        changerMode(modeEnregistre);
        parentHTML.addEventListener("click", auClicBouton);
    }
}

/**
 * Fonction qui permet la propagation d'événements par le clic
 * @param {*} evenement 
 */
function auClicBouton(evenement) {
    const elementClic = evenement.target;
    const bouton = elementClic.closest("[data-mode-option]");

    if (bouton) {
        const mode = bouton.dataset.modeOption;

        enregistrerMode(mode);
    }
}
/**
 * Fonction qui fait changer d'apparence les boutons
 * @param {*} nouveauMode 
 */
function changerApparenceBoutons(nouveauMode) {
    if (boutonsHTML) {
        boutonsHTML.forEach(function (boutonHTML) {
            const mode = boutonHTML.dataset.modeOption || "jour";
            boutonHTML.classList.toggle("invisible", mode == nouveauMode);
        });
    }
}

/**
 * Fonction qui sert à modifier le mode nuit
 * @param {String} mode
 */
function changerMode(mode) {
    document.body.dataset.theme = mode;
    changerApparenceBoutons(mode);
}

/**
 *Fonction qui enregistre un nouveau mode
 * @param {String} nouveauMode
 */
function enregistrerMode(nouveauMode) {
    changerMode(nouveauMode);
    localStorage.setItem("theme", nouveauMode);
}
