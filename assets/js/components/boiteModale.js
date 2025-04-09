// Code a été pris dans le cours 17

// Variables globales
let elementHTML;
let conteneurHTML;

// Sélection HTML
// AUCUNE

// Fonctions
/**
 * Fonction qui permet d'initialiser la boîte modale
 * @param {String} conteneur 
 * @param {String} message 
 * @param {String} type 
 */
function init(conteneur, message, type) {
    conteneurHTML = conteneur;
    
    // if (!localStorage.getItem("promotion")) {
        injecterHTML(message, type);

        //Ajouter un délai
        afficherModale();
    // }
}

/**
 * Fonction servant à fermer au clic une boite modale
 * @param {Event} evenement
 */
function onClicModale(evenement) {
    cacherModale();
    localStorage.setItem("promotion", true);
}

/**
 * Fonction servant à injecter le HTML sur la page
 * @param {String} message
 * @param {String} type
 */
function injecterHTML(message, type) {
    let gabarit = `
    <div class="boite-modale invisible" data-type=${type}>
        <p>${message}</p>
        <div class="bouton">OK</div>
    </div>`;

    conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    elementHTML = conteneurHTML.lastElementChild;
    elementHTML.addEventListener("click", onClicModale);
}

/**
 * Fonction servant à afficher la boite modale
 */
function afficherModale() {
    elementHTML.classList.remove("invisible");
}

/**
 * Fonction servant à cacher la boite modale
 */
function cacherModale() {
    elementHTML.classList.add("invisible");
    //ou la supprimer de la page
}

// Exécution
//Aucune
export default init;
