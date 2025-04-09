/* La plupart du script a été pris du codepen suivant
* @see https://codepen.io/Maxel88/pen/zYrdNeK 
*/
import Slider from "../classes/Slider.js";
// Variables
// aucune

// Sélections
const carrousel = document.querySelector('.carrousel');

// Fonctions
/**
 * fonction qui permet d'initialiser le comportement 'slider' qui permet de se déplacer dans le carrousel
 */
export default function init() {
    new Slider(carrousel, {
        slidesToShow: 2,
        slidesToScroll: 1
    });
}