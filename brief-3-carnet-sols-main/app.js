// Carnet d'observation des sols — point d'entrée : le menu.
// Fiches/3-ajouter-lister.md & fiches/7-bonus.md
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';
import { supprimerObservation, modifierObservation, trierParPhDecroissant, textureLaPlusFrequente } from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/observations.json';

async function main() {
  ouvrirSaisie();
  
  // En-tête encadré conforme au modèle
  console.log("==================================================");
  console.log("   CARNET D'OBSERVATION DES SOLS");
  console.log("   Ferme pédagogique");
  console.log("==================================================");

  // 1. Chargement sécurisé des données
  let observations = await chargerJson(FICHIER_DONNEES) || [];
  console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}.`);

  let choix = '';

  // 2. Boucle principale du menu
  while (choix !== '0') {
    console.log('\n--------------------- MENU ---------------------');
    console.log('1. Ajouter une observation');
    console.log('2. Lister les observations');
    console.log('3. Rechercher (point, parcelle, texture)');
    console.log('4. Trier par pH');
    console.log('5. Synthèse des observations');
    console.log('6. Supprimer une observation (Bonus)');
    console.log('7. Modifier une observation (Bonus)');
    console.log('0. Quitter');

    choix = await demander('Votre choix : ');

    switch (choix) {
      case '1': {
        console.log('\n--- Ajouter une observation ---');
        const id = await demander('Identifiant : ');
        const parcelle = await demander('Parcelle : ');
        const texture = await demander(`Texture (${TEXTURES.join(', ')}) : `);
        const pH = await demander('pH (0-14) : ');
        const etatHumidite = await demander(`État d'humidité (${HUMIDITES.join(', ')}) : `);

        const saisie = { id, parcelle, texture, pH, etatHumidite };
        const erreurs = ajouterObservation(observations, saisie);

        if (erreurs.length > 0) {
          console.log('Erreur(s) lors de l\'ajout :');
          erreurs.forEach(err => console.log(`- ${err}`));
        } else {
          enregistrerJson(FICHIER_DONNEES, observations);
          console.log('Observation ajoutée et enregistrée avec succès !');
        }
        break;
      }
      case '2': {
        console.log('\n--- Liste des observations ---');
        console.log(listerObservations(observations));
        break;
      }
      case '3': {
        console.log('\n--- Recherche (point, parcelle, texture) ---');
        console.log('a. Filtrer par parcelle');
        console.log('b. Filtrer par texture');
        const sousChoix = await demander('Votre choix de filtre : ');

        if (sousChoix === 'a') {
          const parcelleRecherchee = await demander('Nom de la parcelle : ');
          const resultat = filtrerParParcelle(observations, parcelleRecherchee);
          console.log(listerObservations(resultat));
        } else if (sousChoix === 'b') {
          const textureRecherchee = await demander(`Texture (${TEXTURES.join(', ')}) : `);
          const resultat = filtrerParTexture(observations, textureRecherchee);
          console.log(listerObservations(resultat));
        } else {
          console.log('Choix de filtre invalide.');
        }
        break;
      }
      case '4': {
        console.log('\n--- Trier par pH ---');
        console.log('a. pH croissant');
        console.log('b. pH décroissant (Bonus)');
        const triChoix = await demander('Votre choix de tri : ');
        
        if (triChoix === 'a') {
          const resultat = trierParPh(observations);
          console.log(listerObservations(resultat));
        } else if (triChoix === 'b') {
          const resultat = trierParPhDecroissant(observations);
          console.log(listerObservations(resultat));
        } else {
          console.log('Choix de tri invalide.');
        }
        break;
      }
      case '5': {
        console.log('\n--- Synthèse des observations ---');
        const minMax = phMinMax(observations);
        if (minMax) {
          console.log(`pH Min : ${minMax.min} | pH Max : ${minMax.max}`);
        } else {
          console.log('Aucune donnée de pH disponible.');
        }

        console.log('Comptage par texture :', compterParTexture(observations));

        const plusFreq = textureLaPlusFrequente(observations);
        if (plusFreq) {
          console.log(`Texture la plus fréquente : ${plusFreq.texture} (${plusFreq.nombre} observation(s))`);
        }

        const aDiscuter = pointsADiscuter(observations, SEUIL_PH_A_DISCUTER);
        console.log(`Points à discuter avec le coach (pH < ${SEUIL_PH_A_DISCUTER}) : ${aDiscuter.length} observation(s)`);
        break;
      }
      case '6': {
        console.log('\n--- Supprimer une observation ---');
        const idASupprimer = await demander('Identifiant de l\'observation à supprimer : ');
        const supprimee = supprimerObservation(observations, idASupprimer);
        if (supprimee) {
          enregistrerJson(FICHIER_DONNEES, observations);
          console.log(`Observation '${idASupprimer}' supprimée avec succès !`);
        } else {
          console.log('Identifiant introuvable.');
        }
        break;
      }
      case '7': {
        console.log('\n--- Modifier une observation ---');
        const idAModifier = await demander('Identifiant de l\'observation à modifier : ');
        const champAModifier = await demander('Champ à modifier (parcelle, texture, pH, etatHumidite) : ');
        const nouvelleValeur = await demander('Nouvelle valeur : ');

        const erreursModif = modifierObservation(observations, idAModifier, champAModifier, nouvelleValeur);
        if (erreursModif.length > 0) {
          console.log('Erreur(s) lors de la modification :');
          erreursModif.forEach(erreur => console.log(`- ${erreur}`));
        } else {
          enregistrerJson(FICHIER_DONNEES, observations);
          console.log('Observation modifiée et enregistrée avec succès !');
        }
        break;
      }
      case '0': {
        console.log('Fermeture du carnet de sols. Au revoir !');
        break;
      }
      default: {
        console.log('Option invalide, veuillez choisir une option valide du menu.');
        break;
      }
    }
  }

  fermerSaisie();
}

main();