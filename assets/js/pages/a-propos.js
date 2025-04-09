//Code a été pris dans le cours 17 et 18
import navigation from "../components/navigation.js";
import boiteModale from "../components/boiteModale.js";
import carrousel from "../components/carrousel.js";
import ScrollAnimator from "../classes/ScrollAnimator.js";

// Variables
//AUCUNE

// Sélections
const conteneurBoiteModale = document.querySelector("[data-boite-modale]");
const cartesAfficher = document.querySelectorAll(".carte-grille");

// Fonctions
/*
* Fonction qui permet d'initialiser navigation, carrousel et popup
*/
function init() {
    // afficher texte avec le scroll de la souris
    const objet1 = (new ScrollAnimator(null, cartesAfficher));
    
    // afficher la boite modale après 5 secondes
    setTimeout(demarrerPopup, 5000);
    
    // initialiser la navigation et le carroussel
    navigation();
    carrousel();
    
}

/**
* Fonction qui permet d'afficher la boite modale
*/
function demarrerPopup() {
    boiteModale(conteneurBoiteModale, "🎉🎉 Abonnez-vous à notre infolettre et profitez de 15% de réduction sur votre prochaine commande ! 🎉🎉", "ERREUR");
}


init();
