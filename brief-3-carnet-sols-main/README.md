# Carnet d'observation des sols

## Contexte

Dans la gestion agricole moderne, exploitant agricole  doit réaliser régulièrement des observations sur terrain pour suivre l'évolution des sols. Sa mission consiste à évaluer avec rigueur les caractéristiques physico-chimiques de chaque parcelle afin de garantir un suivi de qualité. Face au besoin de centraliser et d'archiver ces informations sans risque d'erreur, il utilise notre outil en ligne de commande. Pour ce faire, il saisit l'identifiant du point, la parcelle, la texture du sol, la valeur du pH et l'état d'humidité. Le programme valide ces données en temps réel, bloque les saisies incorrectes et lui affiche des listes structurées, des tris par pH ainsi que des synthèses statistiques. Il est important de noter que cet outil d'aide à la décision ne remplace pas une analyse de laboratoire et ne produit aucun conseil de fertilisation.  


## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
cd brief-3-carnet-sols
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

 *Cochez seulement ce qui marche : `- [x]`.*

- `[x]` Données lues et enregistrées dans `donnees/observations.json`
- `[x]` Ajouter une observation, saisies invalides refusées sans arrêter le programme
- `[x]` Lister les observations, message si le carnet est vide
- `[x]` Rechercher par point ou par parcelle ; filtrer par texture
- `[x]` Trier par pH
- `[x]` Synthèse : pH minimum et maximum, nombre par texture, points à discuter (pH < 5,5)
- [ ] Bonus : supprimer et modifier une observation (choix 6 et 7)
- [ ] Bonus : tri par pH décroissant, texture la plus fréquente

## Données

L'application s'appuie sur un fichier de stockage persistant au format JSON situé dans donnees/observations.json.
Le jeu de données initial comporte plusieurs observations fictives structurées selon les critères de la ferme pédagogique (voir docs/dictionnaire-donnees.md). 

Chaque observation est caractérisée par un identifiant unique, le nom d'une parcelle, une texture de sol normalisée, un pH mesuré compris entre 0 et 14 et un état d'humidité.

l'ensemble de ces données est strictement fictif et sert de support pédagogique aux travaux pratiques de la formation.

## Limites
 
le carnet repère des valeurs à discuter, mais ne produit aucun diagnostic de fertilisation.

Toutes les analyses reposent sur un fichier JSON stocké localement, sans connexion à des capteurs de terrain en temps réel ou à une base de données distante.

Chaque point de prélèvement ne comporte qu'une seule observation à un instant donné, sans historique temporel permettant d'étudier l'évolution de la parcelle au fil des saisons. 

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
Jean Marc Mahan, mahanj67. 
j'ai été aidé par