<template>
  <section id="biomecaniste" class="section">
    <p class="section__subtitle">Mon approche</p>
    <h2 class="section__title">La méthode biomécaniste</h2>
    <hr class="section__divider" />
    <div class="bio__cards">
      <div class="bio__card">
        <div class="bio__card-icon">◎</div>
        <h3>Analytique &amp; précise</h3>
        <p>Une vision détaillée des phénomènes recrutés, pour un diagnostic ciblé.</p>
      </div>
      <div class="bio__card">
        <div class="bio__card-icon">◉</div>
        <h3>Globalisante</h3>
        <p>Prendre en compte l'animal dans sa globalité et en lien avec son environnement.</p>
      </div>
    </div>
    <p class="bio__conclusion">
      Cette complémentarité permet d'élaborer le diagnostic et le projet de prise en charge lors de la consultation.
    </p>
  </section>
</template>

<script>
export default { name: 'BiomecanisteSection' }
</script>

<style scoped>
.bio__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.bio__card {
  background: rgba(48, 15, 22, 0.05);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
}
.bio__card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  opacity: 0.5;
}
.bio__card h3 {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  letter-spacing: 0.04em;
}
.bio__card p {
  font-size: 0.9rem !important;
  margin: 0;
  opacity: 0.85;
}
.bio__conclusion {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-style: italic;
  opacity: 0.8;
}
@media (min-width: 520px) {
  .bio__cards {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 768px) {
  .bio__card {
    padding: 2.5rem 2rem;
  }
  .bio__card h3 {
    font-size: 1.3rem;
  }
}
</style>
