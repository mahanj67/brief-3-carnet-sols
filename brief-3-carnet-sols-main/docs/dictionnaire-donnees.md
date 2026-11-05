# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |S04
| --- | --- | --- | --- | --- | --- |
| id | Identifiant unique | texte | non vide,V absent des données | — | S03 |
| parcelle| |texte | non vide, dois correspondre à une parcelle existant| — | P2|
| PH |niveau d'acidité du sol|nombre décimal |nombre de 0 à 14 | sans unité | 5.5 |
| Etat d'Humidité|taux d'humidité du sol | décimal | compris entre 0 et 1 ou entre 0 et 100 | — |70.4 |
| texture | la répartition granulométrique des particules minérales | texte| valeur parmi la liste autorisée | sans unité | sableux |

**Listes de valeurs autorisées** : 
texture : sableux; limouneux; argileux
ph : 0 à 14
Etat d'humidité : sec; intermédiaire; humide
**Sources** : données/observations.Json
