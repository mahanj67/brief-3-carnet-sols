// Ajouter et lister les observations de sol.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { versNombre } from './outils.js';

// Listes fermées des classes d'exercice, validées par le coach agronomie.
export const TEXTURES = ['sableux', 'limoneux', 'argileux'];
export const HUMIDITES = ['sec', 'intermédiaire', 'humide'];

// Renvoie une ligne de texte qui décrit l'observation.
// Exemple : 'S01 | P1 | sableux | pH 5.2 | sec'
export function formaterObservation(observation) {
  return `${observation.id} | ${observation.parcelle} | ${observation.texture} | pH ${observation.pH} | ${observation.etatHumidite}`
}
// Renvoie un texte avec une observation par ligne (lignes séparées par '\n'),
// ou 'Aucune observation enregistrée.' si la liste est vide.
export function listerObservations(observations) {
  if (!observations || observations.length === 0) {
    return 'Aucune observation enregistrée.';
  }
  return observations.map(obs => formaterObservation(obs)).join('\n');
}


// Renvoie l'observation qui a cet identifiant de point, ou undefined si elle n'existe pas.
export function trouverParId(observations, id) {
  if (!observations) return undefined;
  return observations.find(observation => observation.id === id);
}


// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'S11', parcelle: 'P6', texture: 'limoneux', pH: '5,8', etatHumidite: 'humide' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · parcelle obligatoire (n'importe quel texte non vide)
// · texture présente dans TEXTURES · pH nombre entre 0 et 14 (bornes comprises)
// · etatHumidite présent dans HUMIDITES. N'ajoutez aucune autre règle que celles-ci.
export function verifierObservation(saisie, observations) {
  const erreurs = [];
// ID obligatoire et unique
  if (!saisie.id || saisie.id.trim() === '') {
    erreurs.push("L'identifiant (id) est obligatoire.");
  } else if (trouverParId(observations, saisie.id)) {
    erreurs.push("L'identifiant (id) doit être unique.");
  }

  // Parcelle obligatoire
  if (!saisie.parcelle || saisie.parcelle.trim() === '') {
    erreurs.push("La parcelle est obligatoire.");
  }

  // Texture présente dans TEXTURES
  if (!TEXTURES.includes(saisie.texture)) {
    erreurs.push("La texture est invalide.");
  }
  // pH nombre entre 0 et 14 (bornes comprises)
  const phNombre = versNombre(saisie.pH);
  if (isNaN(phNombre) || phNombre < 0 || phNombre > 14) {
    erreurs.push("Le pH doit être un nombre entre 0 et 14.");
  }

  // etatHumidite présent dans HUMIDITES
  if (!HUMIDITES.includes(saisie.etatHumidite)) {
    erreurs.push("L'état d'humidité est invalide.");
  }

  return erreurs;
}

// Fabrique l'observation à enregistrer à partir d'une saisie VALIDE : pH devient un nombre.
export function creerObservation(saisie) {
 return {
    id: saisie.id,
    parcelle: saisie.parcelle,
    texture: saisie.texture,
    pH: versNombre(saisie.pH),
    etatHumidite: saisie.etatHumidite
  };
}

// Ajoute la saisie au carnet si elle est valide (verifierObservation, puis creerObservation).
// Renvoie les erreurs : [] si l'observation a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterObservation(observations, saisie) {
  const erreurs = verifierObservation(saisie, observations);
  if (erreurs.length > 0) {
    return erreurs;
  }
  const nouvelleObs = creerObservation(saisie);
  observations.push(nouvelleObs);
  return [];
}
