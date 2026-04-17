<template>
  <section id="osteopathie" class="section section--alt osteo">
    <p class="section__subtitle">Thérapie manuelle</p>
    <h2 class="section__title">L'ostéopathie animale</h2>
    <hr class="section__divider" />
    <p>
      L'ostéopathie animale est une thérapie manuelle visant à harmoniser les structures du corps via le diagnostic et le traitement de troubles fonctionnels.
    </p>
    <p>
      L'objectif est de restaurer l'équilibre global du corps afin d'améliorer le bien-être de l'animal.
    </p>
    <blockquote class="osteo__quote">
      <span class="osteo__quote-icon">❝</span>
      L'ostéopathie ne soigne pas, elle donne les clés au corps pour qu'il s'auto-guérisse.
    </blockquote>
    <div class="osteo__grid">
      <div class="osteo__grid-item">
        <img src="@/assets/images/osteo-vache.jpg" alt="Ostéopathie sur une vache" />
      </div>
      <div class="osteo__grid-item">
        <img src="@/assets/images/osteo-veau.jpg" alt="Ostéopathie sur un veau" />
      </div>
      <div class="osteo__grid-item">
        <img src="@/assets/images/osteo-cheval-dos.jpg" alt="Ostéopathie sur un cheval" />
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'OsteopathieSection' }
</script>

<style scoped>
.osteo__quote {
  position: relative;
  max-width: 500px;
  margin: 2.5rem auto;
  padding: 2rem 2.5rem;
  background: rgba(48, 15, 22, 0.06);
  border-radius: 12px;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-style: italic;
  text-align: center;
  line-height: 1.6;
}
.osteo__quote-icon {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  line-height: 1;
  display: block;
  margin-bottom: 0.5rem;
  opacity: 0.3;
}
.osteo__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 3rem;
}
.osteo__grid-item {
  overflow: hidden;
  border-radius: 10px;
}
.osteo__grid-item img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.osteo__grid-item:hover img {
  transform: scale(1.05);
}
@media (max-width: 520px) {
  .osteo__grid {
    grid-template-columns: 1fr;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (min-width: 768px) {
  .osteo__quote {
    max-width: 560px;
    font-size: 1.2rem;
    padding: 2.5rem 3rem;
  }
  .osteo__grid {
    gap: 1.5rem;
  }
}
</style>
