# Journal de recherche

> Chaque recherche utile : ce que vous cherchiez, où (cours, [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript), [Node.js](https://nodejs.org/api/), un camarade, une IA…), ce que vous avez compris. Ce que vous gardez, vous devez pouvoir l'expliquer.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
| --- | --- | --- | --- |
| comprendre une fonction asynchrone | vidéo youTube |elle permet de lancer une tache longue sans bloqué le reste du programme | src/stockage.js|
| Comment résoudre l'erreur undefined sur la longueur lors du chargement du fichier JSON |Documentation Node.js & IA| |Une fonction asynchrone renvoie une promesse ; il faut obligatoirement utiliser await pour attendre la résolution des données avant d'exploiter leur propriété .length |
| Comment valider proprement les entrées textuelles de l'utilisateur par rapport au dictionnaire de données. | |Centraliser les règles de validation dans un module dédié permet de générer un tableau d'erreurs structuré, garantissant qu'aucune donnée invalide | src/registre.js et app.js|