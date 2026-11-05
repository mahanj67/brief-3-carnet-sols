import { versNombre } from './outils.js';
import { trouverParId, verifierObservation } from './registre.js';
import { compterParTexture } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['parcelle', 'texture', 'pH', 'etatHumidite'];

// Supprime du carnet l'observation qui a cet identifiant.
// Renvoie l'observation supprimée, ou undefined si elle n'existe pas (le carnet ne change pas).
export function supprimerObservation(observations, id) {
  const index = observations.findIndex(obs => obs.id === id);
  if (index === -1) {
    return undefined;
  }
  const [supprimee] = observations.splice(index, 1);
  return supprimee;
}

// Modifie UN champ d'une observation. La nouvelle valeur arrive sous forme de TEXTE et suit
// les mêmes règles qu'à l'ajout. Renvoie les erreurs : [] si la modification est faite ;
// sinon les messages, et l'observation ne change pas. Le pH modifié est enregistré comme un nombre.
// Erreurs : identifiant introuvable · champ 'id' (non modifiable) · champ absent de CHAMPS_MODIFIABLES
//           · valeur refusée par les règles de l'ajout.
export function modifierObservation(observations, id, champ, valeur) {
  const observation = trouverParId(observations, id);
  if (!observation) {
    return ['Identifiant introuvable'];
  }

  if (champ === 'id' || !CHAMPS_MODIFIABLES.includes(champ)) {
    return [`Champ '${champ}' non modifiable ou absent de la liste des champs autorisés.`];
  }

  // On simule l'objet mis à jour pour valider avec les règles d'ajout/vérification
  const observationSimulee = { ...observation };
  if (champ === 'pH') {
    observationSimulee[champ] = versNombre(valeur);
  } else {
    observationSimulee[champ] = valeur;
  }

  const erreurs = verifierObservation(observationSimulee);
  if (erreurs.length > 0) {
    return erreurs;
  }

  // Si aucune erreur, on applique la modification effective
  if (champ === 'pH') {
    observation[champ] = versNombre(valeur);
  } else {
    observation[champ] = valeur;
  }

  return [];
}

// Renvoie une COPIE triée par pH décroissant. Le tableau reçu ne doit pas changer d'ordre.
export function trierParPhDecroissant(observations) {
  // Utilisation de l'opérateur spread [...] pour créer une copie et éviter de muter le tableau d'origine
  return [...observations].sort((a, b) => b.pH - a.pH);
}

// Renvoie { texture, nombre } pour la texture la plus fréquente, ou null si la liste est vide.
// En cas d'égalité, la première texture rencontrée l'emporte.
export function textureLaPlusFrequente(observations) {
  if (!observations || observations.length === 0) {
    return null;
  }

  const comptage = compterParTexture(observations);
  let textureMax = null;
  let nombreMax = -1;

  for (const [texture, nombre] of Object.entries(comptage)) {
    if (nombre > nombreMax) {
      nombreMax = nombre;
      textureMax = texture;
    }
  }

  if (nombreMax === -1) {
    return null;
  }

  return { texture: textureMax, nombre: nombreMax };
}