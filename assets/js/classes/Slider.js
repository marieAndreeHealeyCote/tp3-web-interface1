/* La plupart du script a été pris du codepen suivant
* @see https://codepen.io/Maxel88/pen/zYrdNeK 
*/

/*
* Cette classe permet d'afficher les éléments par un carrousel (en loop ou par les flèches)
*/
class Slider {
    elements;
    buttons;
    position = 0;
    movePosition;
    maxPosition;
    
    /*
     * Cette fonction fait office de init 
     */
    constructor(wrapper, config) {
        this.elements = {
            container: wrapper.querySelector('.carrousel__conteneur'),
            track: wrapper.querySelector('.carrousel__liste'),
            items: wrapper.querySelectorAll('.carrousel__image-conteneur')
        };
        
        this.buttons = {
            prev: wrapper.querySelector('.carrousel__controles__precedent'),
            next: wrapper.querySelector('.carrousel__controles__suivant'),
        };
        
        const itemWidth = this.elements.container.clientWidth / config.slidesToShow
        this.movePosition = config.slidesToScroll * itemWidth;
        this.maxPosition = -(this.elements.items.length * itemWidth - config.slidesToShow * itemWidth);
        this.elements.items.forEach((item) => item.style.minWidth = `${itemWidth}px`);
        this.buttons.prev.addEventListener('click', () => this.handlePrevClick());
        this.buttons.next.addEventListener('click', () => this.handleNextClick());
        
        //autoplay 
        setInterval(() => {
            this.handleNextClick();
        }, 3000);
    }
    /**
     * Fonction qui permet de déplacer à gauche les éléments et d'avoir un loop 
     */
    handlePrevClick() {
        if(this.position == 0) {
            this.position = this.maxPosition;
        }
        this.position += this.movePosition;
        
        this.setPosition();
    }
   /**
     * Fonction qui permet de déplacer à droite les éléments et d'avoir un loop 
     */
    handleNextClick() {
        this.position -= this.movePosition;
        if(this.position == this.maxPosition) {
            this.position = 0;
        }
        
        this.setPosition();

    }
    /**
     * Fonction qui permet le déplacement par une translation
     */
    setPosition() {
        this.elements.track.style.transform = `translateX(${this.position}px)`
    }
    
}
export default Slider;