import navigation from "../components/navigation.js";

//Variables
const produit = {
  nom: "salopette",
  prix: 110,
  description: "Une salopette de jeans de couleur bleu pâle.",
  src: "assets/img/produits/salopette.jpg",
};

const produits = [
  {
    id: 1,
    nom: "salopette",
    prix: 110,
    description: "Une salopette de jeans de couleur bleu pâle.",
  },
  {
    id: 2,
    nom: "cargo",
    prix: 200,
    description: "Une paire de pantalon cargo de couleur terre.",
  },
  {
    id: 3,
    nom: "casquette",
    prix: 80,
    description:
      "Une casquette rose assortit d'une bourse de couleur similaire.",
  },
  {
    id: 4,
    nom: "collier",
    prix: 90,
    description: "Un collier noir au cou avec des pierres semi-précieuses.",
  },
  {
    id: 5,
    nom: "jeans",
    prix: 250,
    description: "Une paire de jeans tout-aller de couleur pâle.",
  },
  {
    id: 6,
    nom: "chemisier",
    prix: 150,
    description: "Un chemisier de jeans délavé de couleur brun.",
  },
];

//Sélection HTML
const listeProduitsHTML = document.querySelector(".liste-produits");
const sectionProduitsHTML = document.querySelector(".section-produits");
const boutonsTriPrixHTML = document.querySelector(".tri-prix");
const boutonsTriAlphabetiqueAZHTML = document.querySelector(
  ".tri-alpha-croissant"
);
const boutonsTriAlphabetiqueZAHTML = document.querySelector(
  ".tri-alpha-decroissant"
);

//Fonctions

//Créer une fonction pour initialiser la page
function init() {
  navigation();
  
  //Afficher une liste de produits
  afficherProduits(produits);

  //Afficher une liste de produits en ordre
  boutonsTriPrixHTML.addEventListener("click", clicTriParPrix);
  boutonsTriAlphabetiqueAZHTML.addEventListener("click", clicTriAlphabetiqueAZ);
  boutonsTriAlphabetiqueZAHTML.addEventListener("click", clicTriAlphabetiqueZA);
}

// Créer une fonction qui formatte le chemin des images
function formatteSrcProduit(nomProduit) {
  nomProduit = nomProduit.trim();
  //Mettre en minuscule
  nomProduit = nomProduit.toLowerCase();
  //Remplacer les espaces
  nomProduit = nomProduit.replaceAll(" ", "_");
  //Ajouter l'extension du fichier
  let srcComplet = `assets/img/produits/${nomProduit}.jpg`;

  //Retourner le chemin complet
  return srcComplet;
}

// Créer une fonction qui génère le gabarit HTML (contenu liste produits)
function genererProduitHTML(nomProduit, prixProduit, id) {
  let srcImage = formatteSrcProduit(nomProduit);

  // Insérer le template
  const template = `
  <div class="produit" id="${id}">
      <img src="${srcImage}" alt="${nomProduit}" />
      <p>${nomProduit} - ${prixProduit} $CA</p>
  </div>`;
  listeProduitsHTML.insertAdjacentHTML("beforeend", template);

  const ajoutHTML = listeProduitsHTML.lastElementChild;
  ajoutHTML.addEventListener("click", clicProduit);
}

// Créer une fonction qui affiche les produits au chargement de la page
function afficherProduits(produits) {
  //Vider la liste
  listeProduitsHTML.innerHTML = "";

  for (let i = 0; i < produits.length; i++) {
    let nomProduit = produits[i].nom;
    let prixProduit = produits[i].prix;
    let idProduit = produits[i].id;
    genererProduitHTML(nomProduit, prixProduit, idProduit);
  }
}

// Créer un fonction pour afficher détails du produit au clic
function clicProduit(evenement) {
  const declencheur = evenement.currentTarget;
  const id = declencheur.id;

  // Retirer .actif d'un élément précédemment cliqué
  supprimerElementActif();

  // Ajouter .actif sur élément cliqué
  declencheur.classList.add("actif");

  // Supprimer section détails
  supprimerSectionDetail();

  // Afficher le détail du produit
  genererProduitDetailHTML(id);
}

// Créer une fonction pour supprimer événement actif
function supprimerElementActif() {
  const produitActif = document.querySelector(".produit.actif");

  // Déterminer si actif
  if (produitActif != null) {
    produitActif.classList.remove("actif");
  }
}

// Créer une fonction pour supprimer section détails
function supprimerSectionDetail() {
  const element = document.querySelector(".section-detail");

  //Déterminer si actif
  if (element != null) {
    element.remove();
  }
}

// Créer une fonction qui génère le gabarit HTML (contenu détail produit)
function genererProduitDetailHTML(id) {
  let produitsTrouve = produits.filter(function (element) {
    return element.id == id;
  });

  // Pour récupérer le dernier élément du tableau, trouver le produit
  let produitTrouve = produitsTrouve.pop();

  let nomProduit = produitTrouve.nom;
  let prixProduit = produitTrouve.prix;
  let descriptionProduit = produitTrouve.description;
  let srcImage = formatteSrcProduit(nomProduit);

  // Insérer le template
  const template = `
  <aside class="section-detail">
      <div>
          <img src="${srcImage}" alt="${nomProduit}">
      </div>
      <div>
          <h2>Design Kimberly Nguyen</h2>
          <ul>
              <li>nom: ${nomProduit}</li>
              <li>prix: ${prixProduit} $CA</li>
              <li>description: ${descriptionProduit}</li>
          </ul>
      </div>
      <div id="bouton-panier" class="styliser">Ajouter au panier</div>
  </aside>`;
  sectionProduitsHTML.insertAdjacentHTML("beforebegin", template);

  // Créer un événement clic au bouton panier
  const boutonPanier = sectionProduitsHTML.querySelector("#bouton-panier");
  boutonPanier.addEventListener("click", clicRedirectionFormulaire());
}

// Créer une fonction qui permet de redigirer vers le formulaire
function clicRedirectionFormulaire(evenement) {
  window.location.href = "/formulaire.html";
}

// Créer une fonction qui permet de faire le tri au clic
function clicTriAlphabetiqueAZ(evenement) {
  //Vider la liste
  listeProduitsHTML.innerHTML = "";

  //Générer une nouvelle liste triée
  const produitsTriesAZ = trierAlphabetiquement(produits, "ascendant");

  afficherProduits(produitsTriesAZ);
}

function clicTriAlphabetiqueZA(evenement) {
  //Vider la liste
  listeProduitsHTML.innerHTML = "";

  //Générer une nouvelle liste triée
  const produitsTriesZA = trierAlphabetiquement(produits, "descendant");
  afficherProduits(produitsTriesZA);
}

function clicTriParPrix(evenement) {
  //Vider la liste
  listeProduitsHTML.innerHTML = "";

  //Générer une nouvelles liste
  const produitsTriesPrix = trierParPrix(produits);
  afficherProduits(produitsTriesPrix);
}

// Créer une fonction qui fait le tri alphabétique A-Z
function trierAlphabetiquement(tableau, ordre) {
  let copie = [...tableau];

  // Pour établir un tri ascendant
  copie.sort(function (a, b) {
    if (a.nom < b.nom) {
      return -1;
    } else if (a.nom > b.nom) {
      return 1;
    } else {
      return 0;
    }
  });

  // Pour inverser le tri, pour avoir un tri descendant
  if (ordre == "descendant") {
    return copie.reverse();
  }
  return copie;
}

//Créer une fonction qui fait le tri par prix en ordre croissant
function trierParPrix(tableau) {
  let copie = [...tableau];

  copie.sort(function (a, b) {
    if (a.prix < b.prix) {
      return -1;
    } else if (a.prix > b.prix) {
      return 1;
    } else {
      return 0;
    }
  });

  return copie;
}

// Exécution
init();
