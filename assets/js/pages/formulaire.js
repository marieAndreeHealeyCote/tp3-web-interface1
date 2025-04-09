import navigation from "../components/navigation.js";

// Variables
let indexSectionActuelle;

// Sélections HTML
const barreProgression = document.querySelector(
  ".barre-progression__remplissage"
);
const formulaireHTML = document.querySelector("form");
const sectionsHTML = formulaireHTML.querySelectorAll("section[data-page]");
const boutonsNavFormulaireHTML =
  formulaireHTML.querySelectorAll("[data-direction]");
const champsHTML = formulaireHTML.querySelectorAll("[name]");
const sectionResumeHTML = formulaireHTML.querySelector(".resume");
const dateHTML = formulaireHTML.querySelector("[name='date']");
const boutonSuivantHTML = formulaireHTML.querySelector("#bouton-suivant");
const boutonEnvoi = formulaireHTML.querySelector("input[type='submit']");

// Fonctions

//  Événement //

// Créer un fonction qui permet montrer une section à la fois
function init() {
  navigation();
  
  indexSectionActuelle = 0;
  cacherTout();
  afficherSection(0);

  // Navigation entre section avec un clic sur les boutons
  boutonsNavFormulaireHTML.forEach(function (bouton) {
    bouton.addEventListener("click", clicNavigation);
  });

  // Au changement de champs
  champsHTML.forEach(function (champHTML) {
    champHTML.addEventListener("change", validerChamp);
  });

  validerSection(indexSectionActuelle);
}

// Créer une fonction pour permettre de tout cacher
function cacherTout() {
  for (let i = 0; i < sectionsHTML.length; i++) {
    let sectionHTML = sectionsHTML[i];

    // Ajouter la classe invisible
    sectionHTML.classList.add("invisible");
  }
}

// Créer une fonction qui permet de naviguer entre les différentes sections du formulaire
function clicNavigation(evenement) {
  const declencheur = evenement.currentTarget;
  const direction = Number(declencheur.dataset.direction);

  if (
    indexSectionActuelle + direction >= 0 &&
    indexSectionActuelle + direction < sectionsHTML.length
  ) {
    indexSectionActuelle += direction;
    cacherTout();
    afficherSection(indexSectionActuelle);
    validerSection(indexSectionActuelle);
    modifierBarreProgression(indexSectionActuelle);
  }

  if (indexSectionActuelle == 2) {
    boutonSuivantHTML.innerText = "Confirmer la commande";
  } else {
    boutonSuivantHTML.innerText = "Suivant";
  }
  if (indexSectionActuelle == 3) {
    boutonsNavFormulaireHTML.forEach(function (bouton) {
      bouton.remove();
    });
  }
}

// Créer une fonction pour afficher une barre de progression
function modifierBarreProgression(indexSectionActuelle) {
  barreProgression.classList.remove(
    "barre-progression__remplissage__33",
    "barre-progression__remplissage__66",
    "barre-progression__remplissage__100"
  );
  switch (indexSectionActuelle) {
    case 1:
      barreProgression.classList.add("barre-progression__remplissage__33");
      break;
    case 2:
      barreProgression.classList.add("barre-progression__remplissage__66");
      break;
    case 3:
      barreProgression.classList.add("barre-progression__remplissage__100");
      break;
  }
}

// Créer une fonction pour pouvoir changer de section
function clicBoutonSection(evenement) {
  const declencheur = evenement.currentTarget;
  const numeroSection = Number(declencheur.dataset.section);

  cacherTout();
  afficherSection(numeroSection);
}

function clicAfficherPremier() {
  cacherTout();
  afficherSection(0);
}

function clicAfficherDeuxieme() {
  cacherTout();
  afficherSection(1);
}

// Créer une fonction qui permet d'afficher section par section
function afficherSection(indexSection) {
  const sectionHTML = sectionsHTML[indexSection];

  sectionHTML.classList.remove("invisible");

  if (indexSection == 0) {
    boutonsNavFormulaireHTML[0].classList.add("inactif");
  } else if (indexSection == sectionsHTML.length - 1) {
    boutonsNavFormulaireHTML[1].classList.add("inactif");
  } else {
    boutonsNavFormulaireHTML[0].classList.remove("inactif");
    boutonsNavFormulaireHTML[1].classList.remove("inactif");
  }
  boutonsNavFormulaireHTML[0].classList.toggle("inactif", indexSection == 0);
  boutonsNavFormulaireHTML[1].classList.toggle(
    "inactif",
    indexSection == sectionsHTML.length - 1
  );
}

// Créer une fonction pour ne pas envoyer le formulaire
function onEnvoiFormulaire(evenement) {
  evenement.preventDefault();

  if (validerFormulaire()) {
    //Envoyer le formulaire
    // console.log("Le formulaire a été envoyé");
    // formulaireHTML.submit();
  }
}

// Créer une fonction qui fait afficher le résumé
function modifierResume(champHTML) {
  // Déduire l'ID du résumé en fonction du nom du champ HTML
  const idResume = `resume-${champHTML.name}`;
  const resumeElement = document.getElementById(idResume);

  if (resumeElement) {
    // Si le champ est valide
    resumeElement.innerText = champHTML.value;
  } else {
    console.warn(`L'élément avec l'ID "${idResume}" n'existe pas.`);
  }
}

//===========================================

// Validation //

// Créer une fonction pour valider champs
function validerChamp(event) {
  const champHTML = event.target;

  if (champHTML.validity.valueMissing) {
    switch (champHTML.name) {
      case "quantite":
        champHTML.setCustomValidity("Veuillez sélectionner une quantité.");
        break;
      case "date":
        champHTML.setCustomValidity("Veuillez sélectionner une date.");
        break;
      case "produit":
        champHTML.setCustomValidity("Veuillez sélectionner un produit.");
        break;
      default:
        champHTML.setCustomValidity("Veuillez remplir correctement ce champ.");
        break;
    }
  } else if (
    champHTML.name == "telephone" &&
    champHTML.validity.patternMismatch
  ) {
    champHTML.setCustomValidity(
      "Le numéro de téléphone ne respecte pas le format (555)-555-5555."
    );
  } else if (champHTML.name == "produit") {
    const champQuantite = document.querySelector('[name="quantite"]');
    if (champHTML.value == "salopette") {
      champHTML.setCustomValidity("Désolé. L'article n'est plus disponible.");
      champQuantite.disabled = true;
    } else {
      champQuantite.disabled = false;
      champHTML.setCustomValidity("");
    }
  } else {
    champHTML.setCustomValidity("");
  }
  //On vérifie si le champ est valide
  const estValide = champHTML.checkValidity();

  champHTML.classList.toggle("erreur", estValide == false);
  if (estValide == false) {
    const messageErreur = champHTML.parentNode.querySelector(".message-erreur");
    messageErreur.innerText = champHTML.validationMessage;
  }

  modifierResume(champHTML);
  validerSection(indexSectionActuelle);
}

// Créer une fonction pour valider section
function validerSection(indexSection) {
  // On récupère la section et les champs dans section
  const sectionHTML = sectionsHTML[indexSection];
  const champsDansSection = sectionHTML.querySelectorAll("[name]");

  const tableauValidation = [];

  for (let i = 0; i < champsDansSection.length; i++) {
    const element = champsDansSection[i];
    tableauValidation.push(element.checkValidity());
  }

  const estInvalide = tableauValidation.includes(false);
  boutonSuivantHTML.classList.toggle("inactif", estInvalide == true);
}

// Créer une fonction pour valider formulaire
function validerFormulaire() {
  const estValide = formulaireHTML.checkValidity();

  if (estValide == false) {
    //On désactive le bouton submit
    boutonEnvoi.disabled = "true";
  } else {
    //On active le bouton submit
    boutonEnvoi.removeAttribute("disabled");
  }

  return estValide;
}

//===========================================
// Exécution
init();
