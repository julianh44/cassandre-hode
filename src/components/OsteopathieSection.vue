<template>
  <section id="osteopathie" class="section osteo">
    <h2 class="section__title">L'ostéopathie animale</h2>
    <hr class="section__divider" />
    <p>
      L'ostéopathie animale est une thérapie manuelle visant à harmoniser les structures du corps via le diagnostic et le traitement de troubles fonctionnels.
    </p>
    <p>
      L'objectif est de restaurer l'équilibre global du corps afin d'améliorer le bien-être de l'animal.
    </p>
    <blockquote class="osteo__quote">
      <span class="osteo__quote-mark">&ldquo;</span>
      L'ostéopathie ne soigne pas, elle donne les clés au corps pour qu'il s'auto-guérisse.
      <span class="osteo__quote-mark osteo__quote-mark--end">&rdquo;</span>
    </blockquote>
    <div class="osteo__grid">
      <img src="@/assets/images/osteo-vache.jpg" alt="Ostéopathie sur une vache" />
      <img src="@/assets/images/osteo-veau.jpg" alt="Ostéopathie sur un veau" />
      <img src="@/assets/images/osteo-cheval-dos.jpg" alt="Ostéopathie sur un cheval" />
    </div>
  </section>
</template>

<script>
export default { name: 'OsteopathieSection' }
</script>

<style scoped>
.osteo__quote {
  position: relative;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  border: 2px solid var(--color-dark);
  border-radius: 2rem;
  font-style: italic;
}
.osteo__quote-mark {
  font-family: var(--font-serif);
  font-size: 2rem;
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  background: var(--color-bg);
  padding: 0 0.3rem;
  line-height: 1;
}
.osteo__quote-mark--end {
  left: auto;
  right: 1rem;
  top: auto;
  bottom: -0.5rem;
}
.osteo__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-top: 2rem;
}
.osteo__grid img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
}
@media (max-width: 520px) {
  .osteo__grid { grid-template-columns: 1fr; max-width: 320px; margin-left: auto; margin-right: auto; }
}
@media (min-width: 768px) {
  .osteo__quote {
    max-width: 560px;
    font-size: 1.05rem;
  }
  .osteo__grid {
    gap: 0.5rem;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
