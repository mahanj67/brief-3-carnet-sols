// Rechercher et trier les observations.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les observations de cette parcelle (éventuellement vide).
export function filtrerParParcelle(observations, parcelle) {
  if (!observations) return [];
  return observations.filter(observation => observation.parcelle === parcelle);
}

// Renvoie un NOUVEAU tableau avec les observations de cette texture (éventuellement vide).
export function filtrerParTexture(observations, texture) {
  if (!observations) return [];
  return observations.filter(observations => observations.texture === texture);
}

// Renvoie une COPIE triée par pH croissant, avec un comparateur numérique.
// Le tableau reçu ne doit pas changer d'ordre. Deux observations de même pH gardent leur ordre d'origine.
export function trierParPh(observations) {
  if (!observations) return [];
  return [...observations].sort((a, b) => a.pH - b.pH);
}
