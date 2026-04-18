<template>
  <section id="presentation" class="section">
    <p class="section__subtitle">À propos</p>
    <h2 class="section__title">Présentation</h2>
    <hr class="section__divider" />
    <div class="presentation__content">
      <img src="@/assets/images/presentation-cassandre.jpg" alt="Cassandre Hodé, ostéopathe animalier" class="presentation__photo" />
      <div class="presentation__text">
        <p>
          Je m'appelle Cassandre Hodé, après 5 années d'études à Biopraxia Rennes j'ai obtenu mon diplôme d'ostéopathe animalier en 2025 puis validé mes compétences auprès du Conseil de l'Ordre National des Vétérinaires en 2026.
        </p>
        <p>
          Je suis installée sur le secteur d'Ancenis et me déplace dans un rayon de 1h aux alentours, comprenant les départements du 44, 49, 85 &amp; 53.
        </p>
        <p class="presentation__species">
          Je pratique sur toutes les espèces :<br />
          <strong>cheval, vache, chien, chat, NACS, petits ruminants.</strong>
        </p>
        <p class="presentation__reg">
          <span class="presentation__reg-badge">Inscrite au Registre National d'Aptitudes — n° OA2381</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'PresentationSection' }
</script>

<style scoped>
.presentation__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
.presentation__photo {
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 12px;
}
.presentation__text {
  text-align: center;
}
.presentation__species {
  margin-top: 0.5rem;
}
.presentation__reg {
  margin-top: 1.5rem;
  text-align: center;
}
.presentation__reg-badge {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 0.5rem 1.2rem;
  border: 1.5px solid var(--color-dark);
  border-radius: 20px;
  opacity: 0.75;
}
@media (min-width: 768px) {
  .presentation__content {
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;
  }
  .presentation__photo {
    min-width: 280px;
    max-width: 320px;
    aspect-ratio: 3/4;
  }
  .presentation__text,
  .presentation__reg {
    text-align: left;
  }
}
</style>
