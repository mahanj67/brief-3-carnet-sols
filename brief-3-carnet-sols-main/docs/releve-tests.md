# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. ✏️

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Règle refusée (pH hors limites = 15) |Message d'erreur signalant que le pH doit être compris entre 0 et 14 |Conforme : rejet de la saisie et affichage des erreurs |moi même |
| Recherche introuvable | Affichage d'une liste vide sans provoquer de plantage de l'application | Conforme : retour d'un tableau vide et affichage correct| moi même|
| Tri par pH (croissant et décroissant) | Réordonnancement correct des observations du plus petit au plus grand pH (et inversement)| Conforme : affichage trié selon l'ordre numérique attendu|moi même  |
| Affichage de la synthèse |Calcul et affichage des pH min/max, du comptage par texture, de la texture la plus fréquente et des points à discuter |Conforme : statistiques affichées avec succès |moi même |
| Choix d'une option invalide dans le menu (ex: option 9)| Message d'avertissement indiquant que l'option est invalide et réaffichage du menu| Conforme : message d'erreur affiché et rebouclage propre|moi même |
| Ajout valide d'une observation (P11, Parcelle Nord, limoneux, 6.5, humide) | |Conforme : l'observation est ajoutée au fichier JSON et retrouvée après relance |moi même |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
